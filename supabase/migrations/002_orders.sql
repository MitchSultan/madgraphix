-- ============================================
-- Migration 002: Orders table with RLS
-- ============================================

-- Create table if it doesn't exist at all (minimal definition)
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY
);

-- Safely add columns one by one in case the table already existed
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS client_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS title TEXT;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS quantity INTEGER NOT NULL DEFAULT 1;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS unit_price NUMERIC(10,2) NOT NULL DEFAULT 0;

-- For generated column, we catch exceptions if it already exists or fails
DO $$ BEGIN
  ALTER TABLE public.orders ADD COLUMN total_price NUMERIC(10,2) GENERATED ALWAYS AS (quantity * unit_price) STORED;
EXCEPTION
  WHEN duplicate_column THEN null;
END $$;

ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'pending';
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS notes TEXT;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS due_date DATE;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT now();
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT now();

-- Indexes
CREATE INDEX IF NOT EXISTS idx_orders_client_id ON public.orders(client_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON public.orders(created_at);

-- Enable RLS
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- ============================================
-- Admin policies: full access to all orders
-- ============================================
DROP POLICY IF EXISTS "admin_select_all_orders" ON public.orders;
CREATE POLICY "admin_select_all_orders" ON public.orders
  FOR SELECT TO authenticated
  USING (
    (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
  );

DROP POLICY IF EXISTS "admin_insert_orders" ON public.orders;
CREATE POLICY "admin_insert_orders" ON public.orders
  FOR INSERT TO authenticated
  WITH CHECK (
    (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
  );

DROP POLICY IF EXISTS "admin_update_orders" ON public.orders;
CREATE POLICY "admin_update_orders" ON public.orders
  FOR UPDATE TO authenticated
  USING (
    (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
  );

DROP POLICY IF EXISTS "admin_delete_orders" ON public.orders;
CREATE POLICY "admin_delete_orders" ON public.orders
  FOR DELETE TO authenticated
  USING (
    (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
  );

-- ============================================
-- Client policies: own orders only (SELECT + INSERT)
-- ============================================
DROP POLICY IF EXISTS "client_select_own_orders" ON public.orders;
CREATE POLICY "client_select_own_orders" ON public.orders
  FOR SELECT TO authenticated
  USING (client_id = auth.uid());

DROP POLICY IF EXISTS "client_insert_own_orders" ON public.orders;
CREATE POLICY "client_insert_own_orders" ON public.orders
  FOR INSERT TO authenticated
  WITH CHECK (client_id = auth.uid());

-- Clients cannot update or delete orders (no policy = denied)

-- ============================================
-- Auto-update updated_at on row change
-- ============================================
CREATE OR REPLACE FUNCTION update_orders_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_orders_updated_at ON public.orders;
CREATE TRIGGER set_orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION update_orders_updated_at();
