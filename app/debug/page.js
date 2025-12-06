'use client';

import { useEffect, useState } from 'react';
import { supabaseBrowser } from '@/lib/supabase/client';

export default function DebugPage() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkStatus();
  }, []);

  const checkStatus = async () => {
    const supabase = supabaseBrowser();
    
    // Check auth user
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);

    if (user) {
      // Check profile
      const { data: profileData } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      setProfile(profileData);
    }

    setLoading(false);
  };

  const makeAdmin = async () => {
    if (!user) return;
    
    const supabase = supabaseBrowser();
    const { error } = await supabase
      .from('user_profiles')
      .update({ is_admin: true })
      .eq('id', user.id);

    if (error) {
      alert('Error: ' + error.message);
    } else {
      alert('Admin access granted! Refresh the page.');
      checkStatus();
    }
  };

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-6">Admin Access Debug</h1>
        
        {!user ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <p className="font-bold">Not Logged In</p>
            <p>Please <a href="/login" className="underline">login first</a></p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded">
              <p className="font-bold">✓ Logged In</p>
              <p className="text-sm">Email: {user.email}</p>
              <p className="text-sm">ID: {user.id}</p>
            </div>

            {profile ? (
              <div className={`border px-4 py-3 rounded ${profile.is_admin ? 'bg-green-100 border-green-400 text-green-700' : 'bg-yellow-100 border-yellow-400 text-yellow-700'}`}>
                <p className="font-bold">{profile.is_admin ? '✓ Admin Access' : '⚠ No Admin Access'}</p>
                <p className="text-sm">is_admin: {String(profile.is_admin)}</p>
                <p className="text-sm">Name: {profile.full_name || 'Not set'}</p>
                <p className="text-sm">Created: {new Date(profile.created_at).toLocaleDateString()}</p>
                
                {!profile.is_admin && (
                  <div className="mt-4">
                    <p className="text-sm mb-2">Grant yourself admin access:</p>
                    <button
                      onClick={makeAdmin}
                      className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded"
                    >
                      Make Me Admin
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                <p className="font-bold">✗ No Profile Found</p>
                <p className="text-sm">User profile doesn't exist in database</p>
              </div>
            )}

            <div className="mt-6">
              <a href="/admin" className="text-blue-600 underline">Try accessing admin dashboard →</a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
