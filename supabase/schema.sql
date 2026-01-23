-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================
-- 1. ENUMS & TYPES
-- ============================================
-- Create enums if they don't exist (using DO block to avoid errors if they do)
DO $$ BEGIN
    CREATE TYPE public.user_role AS ENUM ('admin', 'agent');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE public.lead_status AS ENUM ('new', 'contacted', 'qualified', 'proposal_sent', 'won', 'lost');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE public.lead_source AS ENUM ('contact_form', 'newsletter', 'quote_form', 'other');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- ============================================
-- 2. TABLES
-- ============================================

-- PROFILES
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT,
    role public.user_role DEFAULT 'agent',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- LEADS
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    company TEXT,
    service_interest TEXT,
    budget_range TEXT,
    message TEXT,
    source public.lead_source NOT NULL,
    status public.lead_status NOT NULL DEFAULT 'new',
    assigned_to UUID REFERENCES public.profiles(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- SUBSCRIBERS
CREATE TABLE IF NOT EXISTS public.subscribers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    tags TEXT[] DEFAULT '{}',
    consent BOOLEAN NOT NULL DEFAULT FALSE,
    consent_at TIMESTAMP WITH TIME ZONE,
    unsubscribed_at TIMESTAMP WITH TIME ZONE,
    source TEXT NOT NULL DEFAULT 'newsletter',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ACTIVITIES
CREATE TABLE IF NOT EXISTS public.activities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id UUID REFERENCES public.leads(id) ON DELETE CASCADE,
    actor_id UUID REFERENCES public.profiles(id), -- NULL for system
    type TEXT NOT NULL, -- lead_created, email_sent, status_changed, note_added
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- NOTES
CREATE TABLE IF NOT EXISTS public.notes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id UUID REFERENCES public.leads(id) ON DELETE CASCADE,
    author_id UUID REFERENCES public.profiles(id),
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 3. INDEXES
-- ============================================
CREATE INDEX IF NOT EXISTS idx_leads_email ON public.leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads(created_at);
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_source ON public.leads(source);
CREATE INDEX IF NOT EXISTS idx_activities_lead_id ON public.activities(lead_id);
CREATE INDEX IF NOT EXISTS idx_notes_lead_id ON public.notes(lead_id);

-- ============================================
-- 4. TRIGGERS & FUNCTIONS
-- ============================================

-- Update updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_leads_updated_at ON public.leads;
CREATE TRIGGER update_leads_updated_at
    BEFORE UPDATE ON public.leads
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Handle new user creation (Auth -> Profiles)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, full_name, role)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', 'New User'),
        'agent'::public.user_role -- Default to agent, manually upgrade to admin
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Check if trigger exists before creating to avoid errors in repeated runs
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- 5. RLS POLICIES
-- ============================================

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notes ENABLE ROW LEVEL SECURITY;

-- Helper function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- PROFILES
DROP POLICY IF EXISTS "Users can read own profile" ON public.profiles;
CREATE POLICY "Users can read own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Admins can read all profiles" ON public.profiles;
CREATE POLICY "Admins can read all profiles" ON public.profiles
    FOR SELECT USING (is_admin());

DROP POLICY IF EXISTS "Admins can update all profiles" ON public.profiles;
CREATE POLICY "Admins can update all profiles" ON public.profiles
    FOR UPDATE USING (is_admin());

-- LEADS
DROP POLICY IF EXISTS "Admins and Agents can view leads" ON public.leads;
CREATE POLICY "Admins and Agents can view leads" ON public.leads
    FOR SELECT USING (
        auth.role() = 'authenticated'
    );

DROP POLICY IF EXISTS "Admins can insert leads" ON public.leads;
CREATE POLICY "Admins can insert leads" ON public.leads
    FOR INSERT WITH CHECK (is_admin());

DROP POLICY IF EXISTS "Admins can update everything on leads" ON public.leads;
CREATE POLICY "Admins can update everything on leads" ON public.leads
    FOR UPDATE USING (is_admin());

DROP POLICY IF EXISTS "Agents can update status and assignment" ON public.leads;
CREATE POLICY "Agents can update status and assignment" ON public.leads
    FOR UPDATE USING (auth.role() = 'authenticated'); 

-- SUBSCRIBERS
DROP POLICY IF EXISTS "Admins can view subscribers" ON public.subscribers;
CREATE POLICY "Admins can view subscribers" ON public.subscribers
    FOR SELECT USING (is_admin());

-- ACTIVITIES
DROP POLICY IF EXISTS "Authenticated users can view activities" ON public.activities;
CREATE POLICY "Authenticated users can view activities" ON public.activities
    FOR SELECT USING (auth.role() = 'authenticated');

-- NOTES
DROP POLICY IF EXISTS "Authenticated users can view notes" ON public.notes;
CREATE POLICY "Authenticated users can view notes" ON public.notes
    FOR SELECT USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Users can insert notes" ON public.notes;
CREATE POLICY "Users can insert notes" ON public.notes
    FOR INSERT WITH CHECK (auth.uid() = author_id);
