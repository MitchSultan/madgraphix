import { useEffect, useState } from 'react';
import { supabaseBrowser } from '@/lib/supabase/client';
import { getUser } from '@supabase/supabase-js';

export function useUser() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
        const supabase = supabaseBrowser();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        setUser(user);
        setProfile(profile);
      }
      setIsLoading(false);
    };
    fetchUser();
  }, []);

  return { user, profile, isLoading };
}