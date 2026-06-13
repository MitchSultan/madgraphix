import { supabaseServer } from '@/lib/supabase/server';
import Link from 'next/link';
import { Eye } from 'lucide-react';
import LeadsFilter from './filter';

// Server Component
export default async function LeadsPage({ searchParams }) {
  // Await searchParams for Next.js 15+
  const params = await searchParams;
  const query = params?.q || '';
  const statusFilter = params?.status || 'all';

  const supabase = await supabaseServer();

  let queryBuilder = supabase
    .from('leads')
    .select('id, full_name, email, source, status, created_at, service_interest')
    .order('created_at', { ascending: false });

  if (query) {
    queryBuilder = queryBuilder.or(`full_name.ilike.%${query}%,email.ilike.%${query}%`);
  }

  if (statusFilter !== 'all') {
    queryBuilder = queryBuilder.eq('status', statusFilter);
  }

  const { data: leads } = await queryBuilder;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Leads Management</h1>
        <Link 
          href="/dashboard/leads/new" // Ideally this would exist, but public forms cover it
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition hidden" 
        >
          Add Lead
        </Link>
      </div>

      {/* Filters */}
      <LeadsFilter initialQuery={query} initialStatus={statusFilter} />

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-100">
              <tr>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Service</th>
                <th className="px-6 py-3">Source</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {leads?.length > 0 ? leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-3 font-medium text-gray-900">
                    <div>{lead.full_name}</div>
                    <div className="text-gray-500 text-xs font-normal">{lead.email}</div>
                  </td>
                  <td className="px-6 py-3 text-gray-600">{lead.service_interest || '-'}</td>
                  <td className="px-6 py-3 capitalize">{lead.source.replace('_', ' ')}</td>
                  <td className="px-6 py-3">
                    <StatusBadge status={lead.status} />
                  </td>
                  <td className="px-6 py-3 text-gray-500">{new Date(lead.created_at).toLocaleDateString()}</td>
                  <td className="px-6 py-3 text-right">
                    <Link
                      href={`/dashboard/leads/${lead.id}`}
                      className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
                    >
                      <Eye size={16} />
                    </Link>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    No leads found matching your criteria.
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

function StatusBadge({ status }) {
  const colors = {
    new: 'bg-blue-100 text-blue-700',
    contacted: 'bg-yellow-100 text-yellow-700',
    qualified: 'bg-purple-100 text-purple-700',
    proposal_sent: 'bg-indigo-100 text-indigo-700',
    won: 'bg-green-100 text-green-700',
    lost: 'bg-red-100 text-red-700',
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${colors[status] || 'bg-gray-100 text-gray-700'}`}>
      {status.replace('_', ' ')}
    </span>
  );
}
