import { supabaseServer } from '@/lib/supabase/server';
import Link from 'next/link';
import { PlusCircle, Eye, Edit, Trash2, Briefcase } from 'lucide-react';
import DeleteCaseStudyButton from './DeleteCaseStudyButton';

async function getCaseStudies() {
  const supabase = await supabaseServer();
  
  const { data: caseStudies, error } = await supabase
    .from('case_studies')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching case studies:', error);
    return [];
  }
  
  return caseStudies || [];
}

export default async function CaseStudiesDashboardPage() {
  const caseStudies = await getCaseStudies();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Case Study Management</h1>
          <p className="text-gray-500">Create, edit, and manage your portfolio case studies</p>
        </div>
        <Link
          href="./case-studies/create"
          className="inline-flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
        >
          <PlusCircle size={20} />
          <span>New Case Study</span>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Case Studies"
          value={caseStudies.length}
          icon={Briefcase}
          color="bg-blue-500"
        />
        <StatCard
          title="Published"
          value={caseStudies.filter(c => c.published).length}
          icon={Eye}
          color="bg-green-500"
        />
        <StatCard
          title="Drafts"
          value={caseStudies.filter(c => !c.published).length}
          icon={Edit}
          color="bg-yellow-500"
        />
      </div>

      {/* Case Studies Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-100">
              <tr>
                <th className="px-6 py-3">Title</th>
                <th className="px-6 py-3">Client</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Created</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {caseStudies.length > 0 ? (
                caseStudies.map((study) => (
                  <tr key={study.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{study.title}</div>
                      <div className="text-xs text-gray-500 mt-1">/{study.slug}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-700">{study.client}</td>
                    <td className="px-6 py-4">
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                        {study.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge published={study.published} />
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {new Date(study.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/CaseStudies/${study.slug}`}
                          target="_blank"
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View"
                        >
                          <Eye size={18} />
                        </Link>
                        <Link
                          href={`/admin/case-studies/${study.slug}/edit`}
                          className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit size={18} />
                        </Link>
                        <DeleteCaseStudyButton slug={study.slug} title={study.title} />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    No case studies yet. Create your first one!
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

function StatCard({ title, value, icon: Icon, color }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900 mt-1">{value}</h3>
      </div>
      <div className={`w-12 h-12 rounded-lg ${color} bg-opacity-10 flex items-center justify-center`}>
        <Icon size={24} className={color.replace('bg-', 'text-')} />
      </div>
    </div>
  );
}

function StatusBadge({ published }) {
  return (
    <span
      className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
        published
          ? 'bg-green-100 text-green-700'
          : 'bg-yellow-100 text-yellow-700'
      }`}
    >
      {published ? 'Published' : 'Draft'}
    </span>
  );
}
