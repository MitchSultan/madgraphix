-- ============================================
-- Migration 003: Populate missing profiles
-- ============================================

-- This ensures that any users created BEFORE the trigger was added
-- will have a corresponding row in the profiles table.
-- We assume existing users are admins (since the old system was just for the shop owner).

INSERT INTO public.profiles (id, full_name, email, role)
SELECT 
  id, 
  COALESCE(raw_user_meta_data->>'full_name', 'Admin User'), 
  email, 
  'admin' -- Assign admin role to existing users
FROM auth.users
WHERE id NOT IN (SELECT id FROM public.profiles);
