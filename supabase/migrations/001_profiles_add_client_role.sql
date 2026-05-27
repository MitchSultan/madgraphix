-- ============================================
-- Migration 001: Create or update profiles
-- ============================================

-- 1. Create profiles table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.profiles (
  id         UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name  TEXT,
  email      TEXT,
  role       TEXT NOT NULL DEFAULT 'client',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Ensure the columns exist if the table was already there
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS email TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'client';

-- 3. If role was previously an enum, cast it to TEXT
DO $$ BEGIN
  ALTER TABLE public.profiles ALTER COLUMN role TYPE TEXT USING role::text;
EXCEPTION
  WHEN others THEN null;
END $$;

-- 4. Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 5. Policies
DROP POLICY IF EXISTS "own_profile_select" ON public.profiles;
CREATE POLICY "own_profile_select" ON public.profiles
  FOR SELECT TO authenticated
  USING (id = auth.uid());

DROP POLICY IF EXISTS "own_profile_update" ON public.profiles;
CREATE POLICY "own_profile_update" ON public.profiles
  FOR UPDATE TO authenticated
  USING (id = auth.uid());

DROP POLICY IF EXISTS "admin_read_profiles" ON public.profiles;
CREATE POLICY "admin_read_profiles" ON public.profiles
  FOR SELECT TO authenticated
  USING (
    (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
  );

-- 6. Trigger: auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, role)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'role', 'client')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

