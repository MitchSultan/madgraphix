'use client';

import { useState } from 'react';
import Link from 'next/link';
import PdfInvoiceDownload from '../components/PdfInvoiceDownload';

const PAYMENT_METHODS = ['M-Pesa', 'Cash', 'Bank Transfer', 'Card'];
const DEFAULT_INVOICE_FORM = {
  orderId: '',
  invoiceNumber: '',
  totalAmount: '',
  paymentMethod: PAYMENT_METHODS[0],
  dueDate: '',
  notes: '',
};

export default function InvoiceHubClient({ initialInvoices, availableOrders = [] }) {
  const [invoices, setInvoices] = useState(initialInvoices ?? []);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState(invoices?.[0]?.id || null);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [createOpen, setCreateOpen] = useState(false);
  const [invoiceForm, setInvoiceForm] = useState(DEFAULT_INVOICE_FORM);
  const [createStatus, setCreateStatus] = useState('');

  const selectedInvoice = invoices.find((invoice) => invoice.id === selectedInvoiceId) || invoices[0];

  const selectedOrder = availableOrders.find((order) => order.id === invoiceForm.orderId);

  const invoiceNumberPreview = invoiceForm.invoiceNumber || 'INV-YYYYMMDD-001';

  const handleFieldChange = (key, value) => {
    setInvoiceForm((prev) => ({ ...prev, [key]: value }));
  };

  const resetInvoiceForm = () => {
    setInvoiceForm(DEFAULT_INVOICE_FORM);
    setCreateStatus('');
  };

  async function handleCreateInvoice(event) {
    event.preventDefault();
    if (!invoiceForm.orderId || !invoiceForm.totalAmount) {
      setCreateStatus('Please select an order and enter a total amount.');
      return;
    }

    setCreateStatus('Creating invoice...');

    const response = await fetch('/api/invoices', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        orderId: invoiceForm.orderId,
        invoiceNumber: invoiceForm.invoiceNumber,
        totalAmount: Number(invoiceForm.totalAmount),
        paymentMethod: invoiceForm.paymentMethod,
        dueDate: invoiceForm.dueDate || undefined,
        notes: invoiceForm.notes,
      }),
    });

    const payload = await response.json();
    if (!response.ok) {
      setCreateStatus(payload.error || 'Unable to create invoice.');
      return;
    }

    setInvoices((prev) => [payload.invoice, ...prev]);
    setSelectedInvoiceId(payload.invoice.id);
    setCreateOpen(false);
    setStatusMessage('Invoice created successfully.');
    resetInvoiceForm();
  }

  async function recordPayment() {
    if (!selectedInvoice || !paymentAmount) return;
    setStatusMessage('Recording payment...');

    const response = await fetch('/api/invoices/payment', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ invoiceId: selectedInvoice.id, amount: Number(paymentAmount) }),
    });

    const payload = await response.json();
    if (!response.ok) {
      setStatusMessage(payload.error || 'Unable to record payment');
      return;
    }

    setInvoices((prev) => prev.map((invoice) => (invoice.id === payload.invoice.id ? payload.invoice : invoice)));
    setPaymentAmount('');
    setStatusMessage('Payment recorded successfully.');
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Invoice & Billing Hub</h1>
          <p className="text-sm text-gray-500">Monitor payments, update balances, and generate invoices for print jobs.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setCreateOpen(true)}
            className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            New Invoice
          </button>
          {selectedInvoice ? <PdfInvoiceDownload invoice={selectedInvoice} /> : null}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.7fr_1fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Invoices</h2>
              <p className="mt-1 text-sm text-slate-500">Click an invoice row to review details and update payment status.</p>
            </div>
            <div className="rounded-full bg-slate-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-600">
              {invoices.length} total
            </div>
          </div>

          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full text-left divide-y divide-slate-200 text-sm text-slate-700">
              <thead className="bg-slate-50 text-xs uppercase tracking-[0.3em] text-slate-500">
                <tr>
                  <th className="px-5 py-4">Invoice</th>
                  <th className="px-5 py-4">Customer</th>
                  <th className="px-5 py-4">Total</th>
                  <th className="px-5 py-4">Balance</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {invoices?.length > 0 ? invoices.map((invoice) => (
                  <tr
                    key={invoice.id}
                    className={`transition hover:bg-slate-50 ${selectedInvoiceId === invoice.id ? 'bg-slate-100' : ''}`}
                  >
                    <td
                      className="px-5 py-4 font-medium text-slate-900 cursor-pointer"
                      onClick={() => setSelectedInvoiceId(invoice.id)}
                    >
                      {invoice.invoice_number}
                    </td>
                    <td className="px-5 py-4">{invoice.print_orders?.customers?.name || 'N/A'}</td>
                    <td className="px-5 py-4">KES {Number(invoice.total_amount).toLocaleString()}</td>
                    <td className="px-5 py-4">KES {Number(invoice.balance).toLocaleString()}</td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] ${
                        invoice.payment_status === 'Fully Paid'
                          ? 'bg-emerald-100 text-emerald-700'
                          : invoice.payment_status === 'Partial'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-rose-100 text-rose-700'
                      }`}>
                        {invoice.payment_status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <Link href={`/dashboard/invoices/${invoice.id}`} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 transition hover:bg-slate-200">
                        View
                      </Link>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={6} className="px-5 py-10 text-center text-slate-500">No invoices found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {selectedInvoice ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Invoice Details</h2>
            <div className="mt-5 space-y-4 text-sm text-slate-600">
              <div className="rounded-3xl bg-slate-50 p-4">
                <p className="text-slate-500">Invoice Number</p>
                <p className="mt-1 font-semibold text-slate-900">{selectedInvoice.invoice_number}</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-slate-50 p-4">
                  <p className="text-slate-500">Total Amount</p>
                  <p className="mt-1 font-semibold text-slate-900">KES {Number(selectedInvoice.total_amount).toLocaleString()}</p>
                </div>
                <div className="rounded-3xl bg-slate-50 p-4">
                  <p className="text-slate-500">Paid</p>
                  <p className="mt-1 font-semibold text-slate-900">KES {Number(selectedInvoice.paid_amount).toLocaleString()}</p>
                </div>
              </div>
              <div className="rounded-3xl bg-slate-50 p-4">
                <p className="text-slate-500">Remaining Balance</p>
                <p className="mt-1 text-2xl font-semibold text-slate-900">KES {Number(selectedInvoice.balance).toLocaleString()}</p>
              </div>
              <div className="space-y-3">
                <label className="block text-sm font-medium text-slate-700">Record Partial Payment</label>
                <div className="flex gap-3">
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-slate-400"
                    placeholder="Amount"
                  />
                  <button
                    type="button"
                    onClick={recordPayment}
                    className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                  >
                    Apply
                  </button>
                </div>
                <p className="text-xs text-slate-500">This will update the invoice balance and payment status.</p>
              </div>
              {statusMessage ? (
                <p className="text-sm text-emerald-700">{statusMessage}</p>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>

      {createOpen ? (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-900/40 px-4 py-10">
          <div className="w-full max-w-3xl rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="text-xl font-semibold text-slate-900">Create New Invoice</h3>
                <p className="text-sm text-slate-500">Connect the invoice to a print order and set up the billing details.</p>
              </div>
              <button type="button" onClick={() => setCreateOpen(false)} className="text-slate-400 hover:text-slate-700">Close</button>
            </div>

            <form onSubmit={handleCreateInvoice} className="mt-8 space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <label className="space-y-2 text-sm text-slate-700">
                  Print Order
                  <select
                    value={invoiceForm.orderId}
                    onChange={(e) => handleFieldChange('orderId', e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-slate-400"
                    required
                  >
                    <option value="">Select an order</option>
                    {availableOrders.map((order) => (
                      <option key={order.id} value={order.id}>
                        {order.job_type} • {order.customers?.name || 'Unknown'}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="space-y-2 text-sm text-slate-700">
                  Invoice Number
                  <input
                    value={invoiceForm.invoiceNumber}
                    onChange={(e) => handleFieldChange('invoiceNumber', e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-slate-400"
                    placeholder={invoiceNumberPreview}
                  />
                </label>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <label className="space-y-2 text-sm text-slate-700">
                  Total Amount
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={invoiceForm.totalAmount}
                    onChange={(e) => handleFieldChange('totalAmount', e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-slate-400"
                    required
                  />
                </label>
                <label className="space-y-2 text-sm text-slate-700">
                  Due Date
                  <input
                    type="date"
                    value={invoiceForm.dueDate}
                    onChange={(e) => handleFieldChange('dueDate', e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-slate-400"
                  />
                </label>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <label className="space-y-2 text-sm text-slate-700">
                  Payment Method
                  <select
                    value={invoiceForm.paymentMethod}
                    onChange={(e) => handleFieldChange('paymentMethod', e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-slate-400"
                  >
                    {PAYMENT_METHODS.map((method) => (
                      <option key={method} value={method}>{method}</option>
                    ))}
                  </select>
                </label>
                <label className="space-y-2 text-sm text-slate-700">
                  Notes
                  <textarea
                    value={invoiceForm.notes}
                    onChange={(e) => handleFieldChange('notes', e.target.value)}
                    className="min-h-[120px] w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-slate-400"
                    placeholder="Add any invoice notes here"
                  />
                </label>
              </div>

              {selectedOrder ? (
                <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-700">
                  <p className="font-semibold text-slate-900">Selected Order</p>
                  <p>{selectedOrder.job_type}</p>
                  <p>{selectedOrder.customers?.name || 'Customer name unavailable'}</p>
                </div>
              ) : null}

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setCreateOpen(false);
                    resetInvoiceForm();
                  }}
                  className="rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Create Invoice
                </button>
              </div>

              {createStatus ? (
                <p className="text-sm text-slate-500">{createStatus}</p>
              ) : null}
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}
