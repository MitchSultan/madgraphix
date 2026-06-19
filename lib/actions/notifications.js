'use server';

import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

export async function createNotification({ userId, title, body, link }) {
  const { error } = await supabaseAdmin
    .from('notifications')
    .insert({ user_id: userId, title, body, link });
  if (error) throw new Error(error.message);
}