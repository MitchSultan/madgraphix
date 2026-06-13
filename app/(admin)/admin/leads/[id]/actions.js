'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LeadActions({ leadId, currentStatus, currentAssignedTo, agents }) {
  const router = useRouter();
  const [status, setStatus] = useState(currentStatus);
  const [assigned, setAssigned] = useState(currentAssignedTo || '');
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);

  const handleStatusChange = async (newStatus) => {
    setLoading(true);
    try {
      await fetch(`/api/leads/${leadId}/status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      setStatus(newStatus);
      router.refresh();
    } catch (e) {
      console.error(e);
      alert('Failed to update status');
    } finally {
      setLoading(false);
    }
  };

  const handleAssign = async (userId) => {
    setLoading(true);
    try {
      await fetch(`/api/leads/${leadId}/assign`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ assigned_to: userId }),
      });
      setAssigned(userId);
      router.refresh();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!note.trim()) return;
    setLoading(true);
    try {
      await fetch(`/api/leads/${leadId}/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: note }),
      });
      setNote('');
      router.refresh();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Status Card */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="font-bold text-gray-900 mb-4">Pipeline Status</h3>
        <div className="space-y-2">
          {['new', 'contacted', 'qualified', 'proposal_sent', 'won', 'lost'].map(s => (
            <button
              key={s}
              onClick={() => handleStatusChange(s)}
              disabled={loading}
              className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors flex justify-between items-center ${
                status === s 
                  ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span className="capitalize">{s.replace('_', ' ')}</span>
              {status === s && <span className="text-blue-600">✓</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Assignment Card */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="font-bold text-gray-900 mb-4">Assignment</h3>
         <select
            value={assigned}
            onChange={(e) => handleAssign(e.target.value)}
            disabled={loading}
            className="w-full px-3 py-2 border rounded-lg text-sm"
          >
            <option value="">Unassigned</option>
            {agents?.map(agent => (
                <option key={agent.id} value={agent.id}>{agent.full_name}</option>
            ))}
          </select>
      </div>

       {/* Add Note Card */}
       <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="font-bold text-gray-900 mb-4">Add Note</h3>
        <form onSubmit={handleAddNote}>
            <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Type a note..."
                className="w-full px-3 py-2 border rounded-lg text-sm mb-3 min-h-[100px]"
            />
            <button
                type="submit"
                disabled={loading || !note.trim()}
                className="w-full bg-black text-white py-2 rounded-lg text-sm font-medium hover:bg-gray-800 disabled:opacity-50"
            >
                Add Note
            </button>
        </form>
      </div>
    </div>
  );
}
