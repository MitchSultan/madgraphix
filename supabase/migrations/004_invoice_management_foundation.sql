-- ============================================
-- Migration 004: Invoice management foundation
-- ============================================
-- Adds invoice line items, payment records, invoice activity, and helper
-- functions without removing the existing print-order invoice columns.

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DO $$ BEGIN
    CREATE TYPE public.payment_status AS ENUM ('Unpaid', 'Partial', 'Fully Paid');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE public.payment_method AS ENUM ('M-Pesa', 'Cash', 'Bank Transfer', 'Card');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

ALTER TABLE public.invoices ADD COLUMN IF NOT EXISTS issued_at TIMESTAMPTZ DEFAULT now();
ALTER TABLE public.invoices ADD COLUMN IF NOT EXISTS due_date TIMESTAMPTZ;
ALTER TABLE public.invoices ADD COLUMN IF NOT EXISTS total_amount NUMERIC(12,2) NOT NULL DEFAULT 0;
ALTER TABLE public.invoices ADD COLUMN IF NOT EXISTS paid_amount NUMERIC(12,2) NOT NULL DEFAULT 0;
ALTER TABLE public.invoices ADD COLUMN IF NOT EXISTS tax_rate NUMERIC(5,2) NOT NULL DEFAULT 16.00;
ALTER TABLE public.invoices ADD COLUMN IF NOT EXISTS payment_status public.payment_status NOT NULL DEFAULT 'Unpaid';
ALTER TABLE public.invoices ADD COLUMN IF NOT EXISTS payment_method public.payment_method DEFAULT 'M-Pesa';
ALTER TABLE public.invoices ADD COLUMN IF NOT EXISTS notes TEXT;
ALTER TABLE public.invoices ADD COLUMN IF NOT EXISTS subtotal NUMERIC(12,2) NOT NULL DEFAULT 0;
ALTER TABLE public.invoices ADD COLUMN IF NOT EXISTS tax_amount NUMERIC(12,2) NOT NULL DEFAULT 0;
ALTER TABLE public.invoices ADD COLUMN IF NOT EXISTS discount_amount NUMERIC(12,2) NOT NULL DEFAULT 0;
ALTER TABLE public.invoices ADD COLUMN IF NOT EXISTS invoice_status TEXT NOT NULL DEFAULT 'draft';
ALTER TABLE public.invoices ADD COLUMN IF NOT EXISTS sent_at TIMESTAMPTZ;
ALTER TABLE public.invoices ADD COLUMN IF NOT EXISTS voided_at TIMESTAMPTZ;
ALTER TABLE public.invoices ADD COLUMN IF NOT EXISTS metadata JSONB NOT NULL DEFAULT '{}'::jsonb;

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'invoices' AND column_name = 'created_at'
  ) THEN
    UPDATE public.invoices
    SET issued_at = COALESCE(issued_at, created_at)
    WHERE issued_at IS NULL;
  END IF;

  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'invoices' AND column_name = 'amount'
  ) THEN
    UPDATE public.invoices
    SET
      total_amount = CASE WHEN total_amount = 0 THEN COALESCE(amount, 0) ELSE total_amount END,
      subtotal = CASE WHEN subtotal = 0 THEN COALESCE(amount, 0) ELSE subtotal END
    WHERE COALESCE(amount, 0) > 0;
  END IF;

  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'invoices' AND column_name = 'status'
  ) THEN
    UPDATE public.invoices
    SET payment_status = CASE
      WHEN lower(status::text) = 'paid' THEN 'Fully Paid'::public.payment_status
      WHEN lower(status::text) IN ('partial', 'partially_paid') THEN 'Partial'::public.payment_status
      ELSE payment_status
    END;

    UPDATE public.invoices
    SET invoice_status = CASE
      WHEN lower(status::text) = 'draft' THEN 'draft'
      WHEN lower(status::text) IN ('sent', 'paid') THEN 'sent'
      WHEN lower(status::text) = 'overdue' THEN 'overdue'
      WHEN lower(status::text) IN ('cancelled', 'void') THEN 'void'
      ELSE invoice_status
    END;
  END IF;
END $$;

DO $$ BEGIN
  ALTER TABLE public.invoices ADD CONSTRAINT invoices_invoice_status_check
    CHECK (invoice_status IN ('draft', 'sent', 'overdue', 'void'));
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS public.invoice_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_id UUID NOT NULL REFERENCES public.invoices(id) ON DELETE CASCADE,
  product_id UUID,
  product_name TEXT NOT NULL,
  description TEXT,
  quantity NUMERIC(12,2) NOT NULL CHECK (quantity > 0),
  unit_price NUMERIC(12,2) NOT NULL CHECK (unit_price >= 0),
  subtotal NUMERIC(12,2) GENERATED ALWAYS AS (quantity * unit_price) STORED,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_id UUID NOT NULL REFERENCES public.invoices(id) ON DELETE CASCADE,
  amount NUMERIC(12,2) NOT NULL CHECK (amount > 0),
  payment_method public.payment_method NOT NULL DEFAULT 'M-Pesa',
  reference TEXT,
  notes TEXT,
  paid_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  recorded_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.invoice_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_id UUID NOT NULL REFERENCES public.invoices(id) ON DELETE CASCADE,
  actor_id UUID REFERENCES public.profiles(id),
  event_type TEXT NOT NULL,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_invoice_items_invoice_id ON public.invoice_items(invoice_id);
CREATE INDEX IF NOT EXISTS idx_payments_invoice_id ON public.payments(invoice_id);
CREATE INDEX IF NOT EXISTS idx_payments_paid_at ON public.payments(paid_at);
CREATE INDEX IF NOT EXISTS idx_invoice_events_invoice_id ON public.invoice_events(invoice_id);
CREATE INDEX IF NOT EXISTS idx_invoice_events_created_at ON public.invoice_events(created_at);
CREATE INDEX IF NOT EXISTS idx_invoices_invoice_status ON public.invoices(invoice_status);
CREATE INDEX IF NOT EXISTS idx_invoices_due_date ON public.invoices(due_date);
CREATE INDEX IF NOT EXISTS idx_invoices_issued_at ON public.invoices(issued_at);

CREATE OR REPLACE FUNCTION public.recalculate_invoice_totals(target_invoice_id UUID)
RETURNS VOID AS $$
DECLARE
  item_total NUMERIC(12,2);
  payment_total NUMERIC(12,2);
  invoice_tax_rate NUMERIC(5,2);
  invoice_discount NUMERIC(12,2);
  computed_tax NUMERIC(12,2);
  computed_total NUMERIC(12,2);
  next_status public.payment_status;
BEGIN
  SELECT COALESCE(SUM(subtotal), 0)
  INTO item_total
  FROM public.invoice_items
  WHERE invoice_id = target_invoice_id;

  SELECT COALESCE(SUM(amount), 0)
  INTO payment_total
  FROM public.payments
  WHERE invoice_id = target_invoice_id;

  SELECT tax_rate, discount_amount
  INTO invoice_tax_rate, invoice_discount
  FROM public.invoices
  WHERE id = target_invoice_id;

  invoice_tax_rate := COALESCE(invoice_tax_rate, 0);
  invoice_discount := COALESCE(invoice_discount, 0);
  IF item_total > 0 THEN
    computed_tax := ROUND(item_total * invoice_tax_rate / 100, 2);
    computed_total := GREATEST(item_total + computed_tax - invoice_discount, 0);
  ELSE
    SELECT total_amount
    INTO computed_total
    FROM public.invoices
    WHERE id = target_invoice_id;

    computed_tax := 0;
    computed_total := GREATEST(COALESCE(computed_total, 0), 0);
  END IF;

  IF payment_total >= computed_total AND computed_total > 0 THEN
    next_status := 'Fully Paid';
  ELSIF payment_total > 0 THEN
    next_status := 'Partial';
  ELSE
    next_status := 'Unpaid';
  END IF;

  UPDATE public.invoices
  SET
    subtotal = CASE WHEN item_total > 0 THEN item_total ELSE computed_total END,
    tax_amount = computed_tax,
    total_amount = computed_total,
    paid_amount = payment_total,
    payment_status = next_status
  WHERE id = target_invoice_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.recalculate_invoice_totals_from_item()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM public.recalculate_invoice_totals(COALESCE(NEW.invoice_id, OLD.invoice_id));
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.recalculate_invoice_totals_from_payment()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM public.recalculate_invoice_totals(COALESCE(NEW.invoice_id, OLD.invoice_id));
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS recalculate_invoice_totals_on_items ON public.invoice_items;
CREATE TRIGGER recalculate_invoice_totals_on_items
  AFTER INSERT OR UPDATE OR DELETE ON public.invoice_items
  FOR EACH ROW EXECUTE FUNCTION public.recalculate_invoice_totals_from_item();

DROP TRIGGER IF EXISTS recalculate_invoice_totals_on_payments ON public.payments;
CREATE TRIGGER recalculate_invoice_totals_on_payments
  AFTER INSERT OR UPDATE OR DELETE ON public.payments
  FOR EACH ROW EXECUTE FUNCTION public.recalculate_invoice_totals_from_payment();

DROP TRIGGER IF EXISTS update_invoice_items_updated_at ON public.invoice_items;
CREATE TRIGGER update_invoice_items_updated_at
  BEFORE UPDATE ON public.invoice_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE public.invoice_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoice_events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins can manage invoice items" ON public.invoice_items;
CREATE POLICY "Admins can manage invoice items" ON public.invoice_items
  FOR ALL USING (is_admin()) WITH CHECK (is_admin());

DROP POLICY IF EXISTS "Admins can manage payments" ON public.payments;
CREATE POLICY "Admins can manage payments" ON public.payments
  FOR ALL USING (is_admin()) WITH CHECK (is_admin());

DROP POLICY IF EXISTS "Admins can manage invoice events" ON public.invoice_events;
CREATE POLICY "Admins can manage invoice events" ON public.invoice_events
  FOR ALL USING (is_admin()) WITH CHECK (is_admin());
