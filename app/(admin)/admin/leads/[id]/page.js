import { supabaseServer } from '@/app/lib/supabase/server';
import { notFound } from 'next/navigation';
import { ArrowLeft, Mail, Phone, Building, Calendar, Tag } from 'lucide-react';
import Link from 'next/link';
import LeadActions from './actions'; // Client component for interactive parts

export default async function LeadDetailPage({ params }) {
  const { id } = await params;
  const supabase = await supabaseServer();

  const { data: lead } = await supabase
    .from('leads')
    .select('*, profiles(full_name)')
    .eq('id', id)
    .single();

  if (!lead) notFound();

  // Fetch activities/timeline
  const { data: activities } = await supabase
    .from('activities')
    .select('*, profiles(full_name)')
    .eq('lead_id', id)
    .order('created_at', { ascending: false });

  // Fetch notes
  const { data: notes } = await supabase
    .from('notes')
    .select('*, profiles(full_name)')
    .eq('lead_id', id)
    .order('created_at', { ascending: false });

    // Fetch agents for assignment dropdown
    const { data: agents } = await supabase
    .from('profiles')
    .select('id, full_name');


  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/leads" className="text-gray-500 hover:text-gray-900">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Lead Details</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">{lead.full_name}</h2>
                <div className="flex items-center gap-2 text-gray-500 mt-1">
                  <Mail size={16} />
                  <span>{lead.email}</span>
                </div>
                {lead.phone && (
                   <div className="flex items-center gap-2 text-gray-500 mt-1">
                   <Phone size={16} />
                   <span>{lead.phone}</span>
                 </div>
                )}
              </div>
              <StatusBadge status={lead.status} />
            </div>

            <div className="grid grid-cols-2 gap-4 py-4 border-t border-gray-100">
              <div>
                <span className="text-sm text-gray-500 block">Company</span>
                <span className="font-medium">{lead.company || '-'}</span>
              </div>
              <div>
                <span className="text-sm text-gray-500 block">Source</span>
                <span className="font-medium capitalize">{lead.source?.replace('_', ' ')}</span>
              </div>
              <div>
                <span className="text-sm text-gray-500 block">Service Interest</span>
                <span className="font-medium">{lead.service_interest || '-'}</span>
              </div>
              <div>
                <span className="text-sm text-gray-500 block">Budget Range</span>
                <span className="font-medium">{lead.budget_range || '-'}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <span className="text-sm text-gray-500 block mb-2">Message</span>
              <p className="text-gray-700 bg-gray-50 p-4 rounded-lg text-sm whitespace-pre-wrap">
                {lead.message || 'No message provided.'}
              </p>
            </div>
          </div>

          {/* Activity Timeline */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-6">Activity Timeline</h3>
            <div className="space-y-6 relative before:absolute before:left-[15px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gray-100">
              {activities?.map((activity) => (
                <div key={activity.id} className="relative pl-10">
                  <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 z-10">
                    <div className="w-2 h-2 bg-current rounded-full" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {formatActivityType(activity.type)}
                      {activity.type === 'status_changed' && <span className="text-gray-500 font-normal"> to {activity.metadata?.new_status}</span>}
                      {activity.type === 'note_added' && <span className="text-gray-500 font-normal"> added a note</span>}
                    </p>
                    <p className="text-xs text-gray-500">
                      {activity.profiles?.full_name || 'System'} • {new Date(activity.created_at).toLocaleString()}
                    </p>
                    {activity.type === 'note_added' && (
                       <NoteContent noteId={activity.metadata?.note_id} notes={notes} />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Actions */}
        <div className="space-y-6">
          <LeadActions leadId={lead.id} currentStatus={lead.status} currentAssignedTo={lead.assigned_to} agents={agents} />
          
           {/* Notes Widget */}
           <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4">Internal Notes</h3>
                {/* Note input is inside Actions component for now or needs separate client component */}
                <div className="space-y-4 max-h-[300px] overflow-y-auto mb-4">
                  {notes?.map(note => (
                    <div key={note.id} className="bg-yellow-50 p-3 rounded text-sm border border-yellow-100">
                        <p className="text-gray-800">{note.content}</p>
                        <p className="text-xs text-gray-500 mt-2 text-right">- {note.profiles?.full_name}, {new Date(note.created_at).toLocaleDateString()}</p>
                    </div>
                  ))}
                  {notes?.length === 0 && <p className="text-gray-500 text-sm italic">No notes yet.</p>}
                </div>
           </div>
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

function formatActivityType(type) {
  return type.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

function NoteContent({ noteId, notes }) {
    const note = notes?.find(n => n.id === noteId);
    if (!note) return null;
    return <div className="mt-1 text-sm bg-gray-50 p-2 rounded text-gray-600 italic">"{note.content}"</div>;
}
