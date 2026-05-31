-- ============================================
-- 1. ENUMS EXTENSIONS
-- ============================================
DO $$ BEGIN
    CREATE TYPE public.user_role AS ENUM ('admin', 'agent');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

ALTER TYPE public.user_role ADD VALUE IF NOT EXISTS 'client';

DO $$ BEGIN
    CREATE TYPE public.material_type AS ENUM ('Raw Material', 'Finished Good', 'Consumable');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE public.log_level AS ENUM ('info', 'warning', 'error', 'security');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- ============================================
-- 2. NEW TABLES
-- ============================================

-- SUPPLIERS
CREATE TABLE IF NOT EXISTS public.suppliers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    contact_name TEXT,
    email TEXT,
    phone TEXT,
    lead_time_days INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- INVENTORY (IMS)
CREATE TABLE IF NOT EXISTS public.inventory (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    material_id TEXT UNIQUE, -- e.g., 'PAP-001'
    name TEXT NOT NULL,
    type public.material_type NOT NULL DEFAULT 'Raw Material',
    unit_of_measure TEXT NOT NULL, -- e.g., 'kg', 'sheets', 'liters'
    current_stock NUMERIC NOT NULL DEFAULT 0,
    reorder_point NUMERIC NOT NULL DEFAULT 0,
    cost_per_unit NUMERIC(12,2) DEFAULT 0,
    location TEXT,
    supplier_id UUID REFERENCES public.suppliers(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- INVENTORY TRANSACTIONS
CREATE TABLE IF NOT EXISTS public.inventory_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    inventory_id UUID NOT NULL REFERENCES public.inventory(id) ON DELETE CASCADE,
    change_amount NUMERIC NOT NULL, -- positive for addition, negative for deduction
    reason TEXT NOT NULL, -- e.g., 'Received shipment', 'Consumed in production', 'Manual adjustment'
    order_id UUID, -- Optional link to print_orders
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- CLIENT COMMUNICATIONS
CREATE TABLE IF NOT EXISTS public.client_communications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    author_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    type TEXT NOT NULL, -- 'Email', 'Phone', 'Meeting', 'Note'
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- PRODUCTS
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    price NUMERIC(12,2) NOT NULL DEFAULT 0,
    image_url TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- SYSTEM LOGS
CREATE TABLE IF NOT EXISTS public.system_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    action TEXT NOT NULL, -- e.g., 'login', 'create_order', 'adjust_inventory'
    resource TEXT NOT NULL, -- e.g., 'auth', 'orders', 'inventory'
    metadata JSONB DEFAULT '{}'::jsonb,
    ip_address TEXT,
    level public.log_level DEFAULT 'info',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 3. TRIGGERS & FUNCTIONS
-- ============================================

-- Update triggers for updated_at
DROP TRIGGER IF EXISTS update_suppliers_updated_at ON public.suppliers;
CREATE TRIGGER update_suppliers_updated_at
    BEFORE UPDATE ON public.suppliers
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_inventory_updated_at ON public.inventory;
CREATE TRIGGER update_inventory_updated_at
    BEFORE UPDATE ON public.inventory
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_products_updated_at ON public.products;
CREATE TRIGGER update_products_updated_at
    BEFORE UPDATE ON public.products
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Function to handle inventory balance on transactions
CREATE OR REPLACE FUNCTION process_inventory_transaction()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE public.inventory
    SET current_stock = current_stock + NEW.change_amount,
        updated_at = NOW()
    WHERE id = NEW.inventory_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS on_inventory_transaction ON public.inventory_transactions;
CREATE TRIGGER on_inventory_transaction
    AFTER INSERT ON public.inventory_transactions
    FOR EACH ROW
    EXECUTE FUNCTION process_inventory_transaction();

-- ============================================
-- 4. RLS POLICIES
-- ============================================

-- Enable RLS
ALTER TABLE public.suppliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_communications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_logs ENABLE ROW LEVEL SECURITY;

-- Admins can manage everything
CREATE POLICY "Admins can manage suppliers" ON public.suppliers FOR ALL USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "Admins can manage inventory" ON public.inventory FOR ALL USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "Admins can manage inventory_transactions" ON public.inventory_transactions FOR ALL USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "Admins can manage client_communications" ON public.client_communications FOR ALL USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "Admins can manage products" ON public.products FOR ALL USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "Admins can manage system_logs" ON public.system_logs FOR ALL USING (is_admin()) WITH CHECK (is_admin());

-- Clients can read active products
CREATE POLICY "Clients can read active products" ON public.products 
    FOR SELECT 
    USING (
        is_active = TRUE 
        AND EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND role = 'client'
        )
    );

-- Clients can read their own communications
CREATE POLICY "Clients can read own communications" ON public.client_communications
    FOR SELECT
    USING (auth.uid() = client_id);
