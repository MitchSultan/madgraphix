import { supabaseServer } from '@/lib/supabase/server';
import { LeadsChart, SourceChart } from './charts';
import Link from 'next/link';
import { ArrowUpRight, Users, Mail, CheckCircle, TrendingUp } from 'lucide-react';


// Simple date formatter without extra dep
function timeAgo(date) {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  const intervals = { year: 31536000, month: 2592000, day: 86400, hour: 3600, minute: 60 };
  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const count = Math.floor(seconds / secondsInUnit);
    if (count >= 1) return `${count} ${unit}${count > 1 ? 's' : ''} ago`;
  }
  return 'just now';
}

async function getDashboardData() {
  const supabase = await supabaseServer();
  
  // Date ranges
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  // 1. KPI Queries
  const { count: totalLeads } = await supabase
    .from('leads')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', thirtyDaysAgo.toISOString());

  const { count: newLeads } = await supabase
    .from('leads')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', sevenDaysAgo.toISOString());

  const { count: totalSubscribers } = await supabase
    .from('subscribers')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', thirtyDaysAgo.toISOString());

  // Conversion rate: (won / total contacted+) * 100 (Simplified: won / total leads)
  const { count: wonLeads } = await supabase
    .from('leads')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'won');
  
  const { count: allTimeLeads } = await supabase
    .from('leads')
    .select('*', { count: 'exact', head: true });

  const conversionRate = allTimeLeads ? Math.round((wonLeads / allTimeLeads) * 100) : 0;

  // 2. Recent Leads
  const { data: recentLeads } = await supabase
    .from('leads')
    .select('id, full_name, email, source, status, created_at')
    .order('created_at', { ascending: false })
    .limit(5);

  // 3. Recent Activities
  const { data: recentActivities } = await supabase
    .from('activities')
    .select('id, type, created_at, leads(full_name)')
    .order('created_at', { ascending: false })
    .limit(5);

  // 4. Chart Data (Leads over time - last 7 days)
  // Note: Doing aggregation in JS since Supabase JS client doesn't support complex group by easily without RPC
  const { data: leadsForChart } = await supabase
    .from('leads')
    .select('created_at')
    .gte('created_at', sevenDaysAgo.toISOString());

  const chartMap = {};
  // Initialize last 7 days
  for (let i = 0; i < 7; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    chartMap[d.toISOString().split('T')[0]] = 0;
  }
  
  leadsForChart?.forEach(lead => {
    const date = lead.created_at.split('T')[0];
    if (chartMap[date] !== undefined) chartMap[date]++;
  });

  const chartData = Object.entries(chartMap)
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => a.date.localeCompare(b.date));

  // 5. Source Data
  const { data: leadsForSource } = await supabase
    .from('leads')
    .select('source')
  
  const sourceMap = {};
  leadsForSource?.forEach(l => {
    sourceMap[l.source] = (sourceMap[l.source] || 0) + 1;
  });
  const sourceData = Object.entries(sourceMap).map(([source, count]) => ({ source, count }));

  return {
    kpis: { totalLeads, newLeads, totalSubscribers, conversionRate },
    recentLeads,
    recentActivities,
    chartData,
    sourceData
  };
}

export default async function DashboardPage() {
  const data = await getDashboardData();
  const { kpis, recentLeads, recentActivities, chartData, sourceData } = data;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-500">Welcome back to your CRM control center.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard title="Total Leads (30d)" value={kpis.totalLeads} icon={Users} color="bg-blue-500" />
        <KpiCard title="New Leads (7d)" value={kpis.newLeads} icon={ArrowUpRight} color="bg-green-500" />
        <KpiCard title="Conversion Rate" value={`${kpis.conversionRate}%`} icon={CheckCircle} color="bg-purple-500" />
        <KpiCard title="Subscribers (30d)" value={kpis.totalSubscribers} icon={Mail} color="bg-indigo-500" />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-6">Leads Over Time (7 Days)</h3>
          <LeadsChart data={chartData} />
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-6">Leads by Source</h3>
          <SourceChart data={sourceData} />
        </div>
      </div>

      {/* Tables Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Leads */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-semibold text-gray-900">Recent Leads</h3>
            <Link href="/dashboard/leads" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              View All
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-100">
                <tr>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Source</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentLeads?.length > 0 ? recentLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-3 font-medium text-gray-900">
                      <Link href={`/dashboard/leads/${lead.id}`} className="hover:underline">
                        {lead.full_name}
                      </Link>
                      <div className="text-gray-500 text-xs font-normal">{lead.email}</div>
                    </td>
                    <td className="px-6 py-3 capitalize">{lead.source.replace('_', ' ')}</td>
                    <td className="px-6 py-3">
                      <StatusBadge status={lead.status} />
                    </td>
                    <td className="px-6 py-3 text-gray-500">{new Date(lead.created_at).toLocaleDateString()}</td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-gray-500">No leads yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h3 className="font-semibold text-gray-900">Recent Activity</h3>
          </div>
          <div className="p-6 space-y-6">
            {recentActivities?.length > 0 ? recentActivities.map((activity) => (
              <div key={activity.id} className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0 text-blue-600">
                  <TrendingUp size={16} />
                </div>
                <div>
                  <p className="text-sm text-gray-900 font-medium">
                    {formatActivityType(activity.type)}
                  </p>
                  <p className="text-xs text-gray-500">
                    {activity.leads?.full_name} • {timeAgo(activity.created_at)}
                  </p>
                </div>
              </div>
            )) : (
              <p className="text-center text-gray-500 text-sm">No activity yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function KpiCard({ title, value, icon: Icon, color }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900 mt-1">{value}</h3>
      </div>
      <div className={`w-12 h-12 rounded-lg ${color} bg-opacity-10 flex items-center justify-center text-${color.replace('bg-', '')}`}>
        <Icon size={24} className={color.replace('bg-', 'text-')} />
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

function formatActivityType(type) {
  return type.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}
