
-- First, add a unique constraint on user_id to prevent duplicate admin records
ALTER TABLE public.admin_users ADD CONSTRAINT admin_users_user_id_unique UNIQUE (user_id);

-- Now insert admin user record for divinetonyezimchukwu@gmail.com
INSERT INTO public.admin_users (user_id, role, permissions)
SELECT 
  id as user_id,
  'admin' as role,
  '{"blog": true, "users": true, "products": true, "inventory": true, "orders": true, "pos": true, "frontend": true, "activity": true}'::jsonb as permissions
FROM auth.users 
WHERE email = 'divinetonyezimchukwu@gmail.com'
ON CONFLICT (user_id) DO UPDATE SET
  role = 'admin',
  permissions = '{"blog": true, "users": true, "products": true, "inventory": true, "orders": true, "pos": true, "frontend": true, "activity": true}'::jsonb,
  updated_at = now();
