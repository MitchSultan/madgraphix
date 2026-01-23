import { supabaseServer } from '@/lib/supabase/server';
import { Mail } from 'lucide-react';

export default async function SubscribersPage() {
  const supabase = await supabaseServer();

  const { data: subscribers } = await supabase
    .from('subscribers')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Email Subscribers</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-100">
              <tr>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Source</th>
                <th className="px-6 py-3">Subscribed Date</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {subscribers?.length > 0 ? subscribers.map((sub) => (
                <tr key={sub.id} className="hover:bg-gray-50">
                  <td className="px-6 py-3 font-medium text-gray-900 flex items-center gap-2">
                    <Mail size={16} className="text-gray-400" />
                    {sub.email}
                  </td>
                   <td className="px-6 py-3 text-gray-600 capitalize">{sub.source || 'Newsletter'}</td>
                  <td className="px-6 py-3 text-gray-500">{new Date(sub.created_at).toLocaleDateString()}</td>
                  <td className="px-6 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${sub.unsubscribed_at ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                      {sub.unsubscribed_at ? 'Unsubscribed' : 'Active'}
                    </span>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                    No subscribers yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
