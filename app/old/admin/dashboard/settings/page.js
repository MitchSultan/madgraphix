import { supabaseServer } from '../../../lib/supabase/server';
import { Shield, User } from 'lucide-react';

export default async function SettingsPage() {
  const supabase = await supabaseServer();
  
  const { data: { user } } = await supabase.auth.getUser();
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  const isAdmin = profile?.role === 'admin';

  let allUsers = [];
  if (isAdmin) {
    const { data } = await supabase.from('profiles').select('*').order('created_at', { ascending: false });
    allUsers = data || [];
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <h1 className="text-2xl font-bold text-gray-900">Settings</h1>

      {/* Configuration Info */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-lg font-bold text-gray-900 mb-4">System Configuration</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
           <div>
             <label className="block text-gray-500 mb-1">Internal Notification Email</label>
             <div className="font-medium">{process.env.INTERNAL_NOTIFICATION_EMAIL || 'Not Configured'}</div>
           </div>
           <div>
             <label className="block text-gray-500 mb-1">Resend From Email</label>
             <div className="font-medium">{process.env.RESEND_FROM_EMAIL || 'Not Configured'}</div>
           </div>
           <div>
             <label className="block text-gray-500 mb-1">GA4 Measurement ID</label>
             <div className="font-medium">{process.env.NEXT_PUBLIC_GA4_ID || 'Not Configured'}</div>
           </div>
           <div>
             <label className="block text-gray-500 mb-1">Supabase URL</label>
             <div className="font-medium text-gray-400 truncate">{process.env.NEXT_PUBLIC_SUPABASE_URL || 'Not Configured'}</div>
           </div>
        </div>
      </div>

       {/* My Profile */}
       <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-lg font-bold text-gray-900 mb-4">My Access</h2>
        <div className="flex items-center gap-4">
             <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                 <User size={24} className="text-gray-600" />
             </div>
             <div>
                 <div className="font-bold text-gray-900">{profile?.full_name || user.email}</div>
                 <div className="text-sm text-gray-500 capitalize flex items-center gap-1">
                    <Shield size={12} />
                    {profile?.role || 'user'} Role
                 </div>
             </div>
        </div>
      </div>

      {/* User Management (Admin Only) */}
      {isAdmin && (
         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
                 <h2 className="text-lg font-bold text-gray-900">User Management</h2>
                 {/* Invite user button could go here - implementing full invite flow is complex (needs edge function or admin API), keeping it read-only list for now */}
            </div>
            
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-600 font-medium">
                        <tr>
                            <th className="px-4 py-2 rounded-l-lg">Name</th>
                            <th className="px-4 py-2">Role</th>
                            <th className="px-4 py-2 rounded-r-lg">Joined</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {allUsers.map(u => (
                            <tr key={u.id}>
                                <td className="px-4 py-3 font-medium">{u.full_name || 'User'}</td>
                                <td className="px-4 py-3 capitalize">
                                    <span className={`px-2 py-0.5 rounded text-xs ${u.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'}`}>
                                        {u.role}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-gray-500">{new Date(u.created_at).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
         </div>
      )}
    </div>
  );
}
