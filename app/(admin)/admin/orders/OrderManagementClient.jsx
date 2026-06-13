'use client';

import { useMemo, useState } from 'react';
import { Plus, CalendarCheck, ChevronDown } from 'lucide-react';

const JOB_TYPES = ['Large Format', 'Branding', 'Stationery', 'Digital Print'];
const DESIGN_STATUSES = ['Pending Design', 'Awaiting Feedback', 'Approved by Client', 'Changes Requested'];
const PRODUCTION_STATUSES = ['Queued', 'Printing', 'Finished', 'Delivered'];
const FINISHING_OPTIONS = ['Lamination', 'Die-cut', 'Matte', 'Gloss'];

export default function OrderManagementClient({ initialOrders }) {
  const [orders, setOrders] = useState(initialOrders ?? []);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    customer: { name: '', email: '', phone: '', company: '' },
    jobType: JOB_TYPES[0],
    dimensions: '',
    material: '',
    quantity: 1,
    finishingOptions: [],
    designStatus: DESIGN_STATUSES[0],
    productionStatus: PRODUCTION_STATUSES[0],
    designReferences: '',
    notes: '',
  });
  const [statusMessage, setStatusMessage] = useState('');

  const orderSummary = useMemo(() => {
    return orders.reduce(
      (acc, order) => {
        acc.total += 1;
        if (order.production_status === 'Printing' || order.production_status === 'Queued') {
          acc.active += 1;
        }
        if (order.design_status === 'Pending Design' || order.design_status === 'Awaiting Feedback') {
          acc.pending += 1;
        }
        return acc;
      },
      { total: 0, active: 0, pending: 0 }
    );
  }, [orders]);

  function handleFieldChange(path, value) {
    if (path.startsWith('customer.')) {
      const key = path.split('.')[1];
      setForm((prev) => ({
        ...prev,
        customer: { ...prev.customer, [key]: value },
      }));
      return;
    }

    setForm((prev) => ({ ...prev, [path]: value }));
  }

  const handleFinishingToggle = (option) => {
    setForm((prev) => {
      const exists = prev.finishingOptions.includes(option);
      return {
        ...prev,
        finishingOptions: exists
          ? prev.finishingOptions.filter((item) => item !== option)
          : [...prev.finishingOptions, option],
      };
    });
  };

  async function handleSubmit(event) {
    event.preventDefault();
    setStatusMessage('Creating order...');

    try {
      const response = await fetch('/api/print-orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: form.customer,
          order: {
            jobType: form.jobType,
            dimensions: form.dimensions,
            material: form.material,
            quantity: Number(form.quantity),
            finishingOptions: form.finishingOptions,
            designStatus: form.designStatus,
            productionStatus: form.productionStatus,
            designReferences: form.designReferences ? form.designReferences.split(',').map((item) => item.trim()) : [],
            notes: form.notes,
          },
        }),
      });

      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || 'Failed to create order');

      setOrders((prev) => [payload.order, ...prev]);
      setModalOpen(false);
      setStatusMessage('Order created successfully.');
      setForm({
        customer: { name: '', email: '', phone: '', company: '' },
        jobType: JOB_TYPES[0],
        dimensions: '',
        material: '',
        quantity: 1,
        finishingOptions: [],
        designStatus: DESIGN_STATUSES[0],
        productionStatus: PRODUCTION_STATUSES[0],
        designReferences: '',
        notes: '',
      });
    } catch (error) {
      setStatusMessage(error.message);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Order Management</h1>
          <p className="text-sm text-gray-500">Manage print job workflows, production statuses, and customer order details.</p>
        </div>
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-200/10 transition hover:bg-slate-800"
        >
          <Plus size={16} />
          New Order
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Total Orders</p>
          <p className="mt-4 text-3xl font-semibold text-slate-900">{orderSummary.total}</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Active Jobs</p>
          <p className="mt-4 text-3xl font-semibold text-slate-900">{orderSummary.active}</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Pending Designs</p>
          <p className="mt-4 text-3xl font-semibold text-slate-900">{orderSummary.pending}</p>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50">
          <h2 className="font-semibold text-gray-900">Print Orders</h2>
          <p className="text-sm text-slate-500">Browse and track the order workflow from design to delivery.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left divide-y divide-slate-200">
            <thead className="bg-slate-50 text-xs uppercase tracking-[0.15em] text-slate-500">
              <tr>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Job Type</th>
                <th className="px-6 py-4">Design</th>
                <th className="px-6 py-4">Production</th>
                <th className="px-6 py-4">Qty</th>
                <th className="px-6 py-4">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white text-sm text-slate-700">
              {orders?.length > 0 ? (
                orders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <p className="font-medium text-slate-900">{order.customers?.name || 'Customer'}</p>
                      <p className="text-xs text-slate-500">{order.customers?.company || order.customers?.email}</p>
                    </td>
                    <td className="px-6 py-4">{order.job_type}</td>
                    <td className="px-6 py-4">
                      <span className="rounded-full bg-amber-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-amber-700">
                        {order.design_status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="rounded-full bg-sky-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-sky-700">
                        {order.production_status}
                      </span>
                    </td>
                    <td className="px-6 py-4">{order.quantity}</td>
                    <td className="px-6 py-4 text-slate-500">{new Date(order.created_at).toLocaleDateString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    No orders have been created yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {statusMessage ? (
        <div className="rounded-3xl border border-slate-200 bg-emerald-50 p-4 text-sm text-slate-700">
          {statusMessage}
        </div>
      ) : null}

      {modalOpen ? (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-900/40 px-4 py-10">
          <div className="w-full max-w-3xl rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold text-slate-900">New Print Order</h3>
                <p className="text-sm text-slate-500">Capture the job details and design references for a new order.</p>
              </div>
              <button type="button" onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-700">Close</button>
            </div>
            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <label className="space-y-2 text-sm text-slate-700">
                  Customer Name
                  <input
                    value={form.customer.name}
                    onChange={(e) => handleFieldChange('customer.name', e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-slate-400"
                    required
                  />
                </label>
                <label className="space-y-2 text-sm text-slate-700">
                  Email address
                  <input
                    type="email"
                    value={form.customer.email}
                    onChange={(e) => handleFieldChange('customer.email', e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-slate-400"
                    required
                  />
                </label>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                <label className="space-y-2 text-sm text-slate-700">
                  Phone
                  <input
                    value={form.customer.phone}
                    onChange={(e) => handleFieldChange('customer.phone', e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-slate-400"
                  />
                </label>
                <label className="space-y-2 text-sm text-slate-700">
                  Company
                  <input
                    value={form.customer.company}
                    onChange={(e) => handleFieldChange('customer.company', e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-slate-400"
                  />
                </label>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                <label className="space-y-2 text-sm text-slate-700">
                  Job Type
                  <select
                    value={form.jobType}
                    onChange={(e) => handleFieldChange('jobType', e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-slate-400"
                  >
                    {JOB_TYPES.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </label>
                <label className="space-y-2 text-sm text-slate-700">
                  Quantity
                  <input
                    type="number"
                    min="1"
                    value={form.quantity}
                    onChange={(e) => handleFieldChange('quantity', e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-slate-400"
                    required
                  />
                </label>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                <label className="space-y-2 text-sm text-slate-700">
                  Dimensions / Size
                  <input
                    value={form.dimensions}
                    onChange={(e) => handleFieldChange('dimensions', e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-slate-400"
                    placeholder="e.g. 24x36 in / A3"
                  />
                </label>
                <label className="space-y-2 text-sm text-slate-700">
                  Material / Media
                  <input
                    value={form.material}
                    onChange={(e) => handleFieldChange('material', e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-slate-400"
                    placeholder="Paper, vinyl, canvas"
                  />
                </label>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2 text-sm text-slate-700">
                  <p>Finishing Options</p>
                  <div className="grid grid-cols-2 gap-3">
                    {FINISHING_OPTIONS.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => handleFinishingToggle(option)}
                        className={`rounded-2xl border px-3 py-2 text-sm transition ${form.finishingOptions.includes(option)
                          ? 'border-slate-900 bg-slate-900 text-white'
                          : 'border-slate-200 bg-slate-50 text-slate-700'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2 text-sm text-slate-700">
                  <label className="block">
                    Design Status
                    <select
                      value={form.designStatus}
                      onChange={(e) => handleFieldChange('designStatus', e.target.value)}
                      className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-slate-400"
                    >
                      {DESIGN_STATUSES.map((status) => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </label>
                  <label className="block">
                    Production Status
                    <select
                      value={form.productionStatus}
                      onChange={(e) => handleFieldChange('productionStatus', e.target.value)}
                      className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-slate-400"
                    >
                      {PRODUCTION_STATUSES.map((status) => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </label>
                </div>
              </div>
              <div className="space-y-4 text-sm text-slate-700">
                <label className="block">
                  Design File References
                  <textarea
                    value={form.designReferences}
                    onChange={(e) => handleFieldChange('designReferences', e.target.value)}
                    className="mt-2 min-h-[120px] w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-slate-400"
                    placeholder="Add links or reference IDs separated by commas"
                  />
                </label>
                <label className="block">
                  Notes
                  <textarea
                    value={form.notes}
                    onChange={(e) => handleFieldChange('notes', e.target.value)}
                    className="mt-2 min-h-[120px] w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-slate-400"
                    placeholder="Additional production notes"
                  />
                </label>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  <CalendarCheck size={16} />
                  Assign Order
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}
