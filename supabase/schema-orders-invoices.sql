-- Print and Invoice Management Schema
-- This migration adds customers, print orders, invoices, and RLS policies for a print/design studio.

-- ENUMS
DO $$ BEGIN
    CREATE TYPE public.job_type AS ENUM ('Large Format', 'Branding', 'Stationery', 'Digital Print');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE public.design_status AS ENUM ('Pending Design', 'Awaiting Feedback', 'Approved by Client', 'Changes Requested');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE public.production_status AS ENUM ('Queued', 'Printing', 'Finished', 'Delivered');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

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

-- TABLES
CREATE TABLE IF NOT EXISTS public.customers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    company TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.print_orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID NOT NULL REFERENCES public.customers(id) ON DELETE CASCADE,
    job_type public.job_type NOT NULL,
    dimensions TEXT,
    material TEXT,
    quantity INTEGER NOT NULL DEFAULT 1,
    finishing_options TEXT[] DEFAULT ARRAY[]::TEXT[],
    design_status public.design_status NOT NULL DEFAULT 'Pending Design',
    production_status public.production_status NOT NULL DEFAULT 'Queued',
    design_references TEXT[] DEFAULT ARRAY[]::TEXT[],
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.invoices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES public.print_orders(id) ON DELETE CASCADE,
    invoice_number TEXT UNIQUE NOT NULL,
    issued_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    due_date TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '7 days'),
    total_amount NUMERIC(12,2) NOT NULL DEFAULT 0,
    paid_amount NUMERIC(12,2) NOT NULL DEFAULT 0,
    balance NUMERIC(12,2) GENERATED ALWAYS AS (total_amount - paid_amount) STORED,
    tax_rate NUMERIC(5,2) NOT NULL DEFAULT 16.00,
    payment_status public.payment_status NOT NULL DEFAULT 'Unpaid',
    payment_method public.payment_method DEFAULT 'M-Pesa',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- INDEXES
CREATE INDEX IF NOT EXISTS idx_customers_email ON public.customers(email);
CREATE INDEX IF NOT EXISTS idx_print_orders_status ON public.print_orders(production_status);
CREATE INDEX IF NOT EXISTS idx_print_orders_design_status ON public.print_orders(design_status);
CREATE INDEX IF NOT EXISTS idx_invoices_payment_status ON public.invoices(payment_status);
CREATE INDEX IF NOT EXISTS idx_invoices_order_id ON public.invoices(order_id);

-- TRIGGERS & FUNCTIONS
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_customers_updated_at ON public.customers;
CREATE TRIGGER update_customers_updated_at
    BEFORE UPDATE ON public.customers
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_print_orders_updated_at ON public.print_orders;
CREATE TRIGGER update_print_orders_updated_at
    BEFORE UPDATE ON public.print_orders
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_invoices_updated_at ON public.invoices;
CREATE TRIGGER update_invoices_updated_at
    BEFORE UPDATE ON public.invoices
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- RLS
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.print_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- CUSTOMERS POLICIES
DROP POLICY IF EXISTS "Admins can manage customers" ON public.customers;
CREATE POLICY "Admins can manage customers" ON public.customers
  FOR ALL
  USING (is_admin())
  WITH CHECK (is_admin());

-- PRINT ORDERS POLICIES
DROP POLICY IF EXISTS "Admins can manage print orders" ON public.print_orders;
CREATE POLICY "Admins can manage print orders" ON public.print_orders
  FOR ALL
  USING (is_admin())
  WITH CHECK (is_admin());

-- INVOICES POLICIES
DROP POLICY IF EXISTS "Admins can manage invoices" ON public.invoices;
CREATE POLICY "Admins can manage invoices" ON public.invoices
  FOR ALL
  USING (is_admin())
  WITH CHECK (is_admin());
