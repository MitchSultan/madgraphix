'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Plus, ReceiptText, Trash2, X } from 'lucide-react';
import PdfInvoiceDownload from '../components/PdfInvoiceDownload';

const PAYMENT_METHODS = ['M-Pesa', 'Cash', 'Bank Transfer', 'Card'];

function dateInputValue(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

function addDays(date, days) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function money(value) {
  return Number(value || 0).toLocaleString('en-KE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function toNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
}

function invoiceTotal(invoice) {
  return toNumber(invoice?.total_amount ?? invoice?.amount);
}

function invoicePaid(invoice) {
  return toNumber(invoice?.paid_amount);
}

function invoiceBalance(invoice) {
  return Math.max(invoiceTotal(invoice) - invoicePaid(invoice), 0);
}

function orderUnitPrice(order) {
  const quantity = Math.max(toNumber(order?.quantity), 1);
  const total = toNumber(order?.total_amount ?? order?.total_price ?? order?.amount);
  const unit = toNumber(order?.unit_price ?? order?.price);
  return unit || (total ? total / quantity : 0);
}

function describeOrder(order) {
  return [
    order?.job_type,
    order?.material,
    order?.dimensions,
  ].filter(Boolean).join(' - ') || 'Print order item';
}

function makeOrderItem(order) {
  return {
    productName: describeOrder(order),
    description: order?.notes || '',
    quantity: String(order?.quantity || 1),
    unitPrice: String(orderUnitPrice(order)),
  };
}

function makeDefaultForm() {
  const today = new Date();

  return {
    orderId: '',
    invoiceNumber: '',
    issueDate: dateInputValue(today),
    dueDate: dateInputValue(addDays(today, 7)),
    taxRate: '16',
    discountAmount: '0',
    paymentMethod: PAYMENT_METHODS[0],
    notes: '',
    items: [{
      productName: '',
      description: '',
      quantity: '1',
      unitPrice: '0',
    }],
  };
}

function statusClass(status) {
  if (status === 'Fully Paid') return 'bg-emerald-100 text-emerald-700';
  if (status === 'Partial') return 'bg-amber-100 text-amber-700';
  return 'bg-rose-100 text-rose-700';
}

export default function InvoiceHubClient({ initialInvoices, availableOrders = [] }) {
  const [invoices, setInvoices] = useState(initialInvoices ?? []);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState(initialInvoices?.[0]?.id || null);
  const [createOpen, setCreateOpen] = useState(false);
  const [invoiceForm, setInvoiceForm] = useState(makeDefaultForm);
  const [paymentForm, setPaymentForm] = useState({
    amount: '',
    paymentMethod: PAYMENT_METHODS[0],
    reference: '',
  });
  const [statusMessage, setStatusMessage] = useState('');
  const [createStatus, setCreateStatus] = useState('');

  const selectedInvoice = invoices.find((invoice) => invoice.id === selectedInvoiceId) || invoices[0] || null;
  const selectedOrder = availableOrders.find((order) => order.id === invoiceForm.orderId);

  const formTotals = useMemo(() => {
    const subtotal = invoiceForm.items.reduce((sum, item) => (
      sum + toNumber(item.quantity) * toNumber(item.unitPrice)
    ), 0);
    const taxAmount = subtotal * toNumber(invoiceForm.taxRate) / 100;
    const discountAmount = toNumber(invoiceForm.discountAmount);
    const grandTotal = Math.max(subtotal + taxAmount - discountAmount, 0);

    return { subtotal, taxAmount, discountAmount, grandTotal };
  }, [invoiceForm]);

  const stats = useMemo(() => {
    return invoices.reduce((acc, invoice) => {
      const total = invoiceTotal(invoice);
      const paid = invoicePaid(invoice);
      const balance = Math.max(total - paid, 0);

      acc.totalRevenue += total;
      acc.paid += paid;
      acc.pending += balance;
      if (invoice?.due_date && balance > 0 && new Date(invoice.due_date) < new Date()) {
        acc.overdue += balance;
      }
      return acc;
    }, { totalRevenue: 0, paid: 0, pending: 0, overdue: 0 });
  }, [invoices]);

  const payments = [...(selectedInvoice?.payments || [])].sort((a, b) => (
    new Date(b.paid_at || b.created_at) - new Date(a.paid_at || a.created_at)
  ));

  function updateForm(key, value) {
    setInvoiceForm((prev) => ({ ...prev, [key]: value }));
  }

  function updateItem(index, key, value) {
    setInvoiceForm((prev) => ({
      ...prev,
      items: prev.items.map((item, itemIndex) => (
        itemIndex === index ? { ...item, [key]: value } : item
      )),
    }));
  }

  function addItem() {
    setInvoiceForm((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        { productName: '', description: '', quantity: '1', unitPrice: '0' },
      ],
    }));
  }

  function removeItem(index) {
    setInvoiceForm((prev) => ({
      ...prev,
      items: prev.items.length === 1
        ? prev.items
        : prev.items.filter((_, itemIndex) => itemIndex !== index),
    }));
  }

  function handleOrderChange(orderId) {
    const order = availableOrders.find((item) => item.id === orderId);
    setInvoiceForm((prev) => ({
      ...prev,
      orderId,
      items: order ? [makeOrderItem(order)] : prev.items,
      notes: order?.notes || prev.notes,
    }));
  }

  function closeCreateModal() {
    setCreateOpen(false);
    setInvoiceForm(makeDefaultForm());
    setCreateStatus('');
  }

  async function handleCreateInvoice(event) {
    event.preventDefault();
    setCreateStatus('');

    const cleanItems = invoiceForm.items
      .map((item) => ({
        productName: item.productName.trim(),
        description: item.description.trim(),
        quantity: toNumber(item.quantity),
        unitPrice: toNumber(item.unitPrice),
      }))
      .filter((item) => item.productName && item.quantity > 0);

    if (!invoiceForm.orderId) {
      setCreateStatus('Select the print order this invoice belongs to.');
      return;
    }

    if (cleanItems.length === 0) {
      setCreateStatus('Add at least one invoice item.');
      return;
    }

    setCreateStatus('Creating invoice...');

    const response = await fetch('/api/invoices', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        orderId: invoiceForm.orderId,
        invoiceNumber: invoiceForm.invoiceNumber || undefined,
        issueDate: invoiceForm.issueDate,
        dueDate: invoiceForm.dueDate,
        taxRate: toNumber(invoiceForm.taxRate),
        discountAmount: toNumber(invoiceForm.discountAmount),
        paymentMethod: invoiceForm.paymentMethod,
        notes: invoiceForm.notes,
        items: cleanItems,
      }),
    });

    const payload = await response.json();
    if (!response.ok) {
      setCreateStatus(payload.error || 'Unable to create invoice.');
      return;
    }

    setInvoices((prev) => [payload.invoice, ...prev]);
    setSelectedInvoiceId(payload.invoice.id);
    setStatusMessage('Invoice created successfully.');
    closeCreateModal();
  }

  async function recordPayment() {
    if (!selectedInvoice || !paymentForm.amount) return;

    setStatusMessage('Recording payment...');
    const response = await fetch('/api/invoices/payment', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        invoiceId: selectedInvoice.id,
        amount: toNumber(paymentForm.amount),
        paymentMethod: paymentForm.paymentMethod,
        reference: paymentForm.reference || undefined,
      }),
    });

    const payload = await response.json();
    if (!response.ok) {
      setStatusMessage(payload.error || 'Unable to record payment.');
      return;
    }

    setInvoices((prev) => prev.map((invoice) => (
      invoice.id === payload.invoice.id ? payload.invoice : invoice
    )));
    setPaymentForm({ amount: '', paymentMethod: PAYMENT_METHODS[0], reference: '' });
    setStatusMessage('Payment recorded successfully.');
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Invoice & Billing Hub</h1>
          <p className="text-sm text-gray-500">Generate invoices from print orders, track balances, and record payments.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setCreateOpen(true)}
            className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            <Plus size={16} />
            New Invoice
          </button>
          {selectedInvoice ? <PdfInvoiceDownload invoice={selectedInvoice} /> : null}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Total Invoices</p>
          <p className="mt-2 text-2xl font-semibold text-slate-900">{invoices.length}</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Revenue</p>
          <p className="mt-2 text-2xl font-semibold text-slate-900">KES {money(stats.totalRevenue)}</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Paid</p>
          <p className="mt-2 text-2xl font-semibold text-emerald-700">KES {money(stats.paid)}</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Outstanding</p>
          <p className="mt-2 text-2xl font-semibold text-amber-700">KES {money(stats.pending)}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.6fr_1fr]">
        <section className="rounded-lg border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between gap-4 border-b border-slate-200 p-5">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Invoices</h2>
              <p className="text-sm text-slate-500">Select an invoice to view balances and payment history.</p>
            </div>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
              Overdue KES {money(stats.overdue)}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm text-slate-700">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-5 py-4">Invoice</th>
                  <th className="px-5 py-4">Customer</th>
                  <th className="px-5 py-4">Total</th>
                  <th className="px-5 py-4">Balance</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Due</th>
                  <th className="px-5 py-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {invoices.length > 0 ? invoices.map((invoice) => (
                  <tr
                    key={invoice.id}
                    className={`transition hover:bg-slate-50 ${selectedInvoice?.id === invoice.id ? 'bg-slate-50' : ''}`}
                  >
                    <td className="px-5 py-4">
                      <button
                        type="button"
                        onClick={() => setSelectedInvoiceId(invoice.id)}
                        className="font-mono text-xs font-semibold text-slate-900"
                      >
                        {invoice.invoice_number}
                      </button>
                    </td>
                    <td className="px-5 py-4">
                      <p className="font-medium text-slate-900">{invoice.print_orders?.customers?.name || 'N/A'}</p>
                      <p className="text-xs text-slate-500">{invoice.print_orders?.customers?.email}</p>
                    </td>
                    <td className="px-5 py-4">KES {money(invoiceTotal(invoice))}</td>
                    <td className="px-5 py-4">KES {money(invoiceBalance(invoice))}</td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide ${statusClass(invoice.payment_status)}`}>
                        {invoice.payment_status || 'Unpaid'}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-xs text-slate-500">
                      {invoice.due_date ? new Date(invoice.due_date).toLocaleDateString('en-KE') : '-'}
                    </td>
                    <td className="px-5 py-4">
                      <Link href={`/dashboard/invoices/${invoice.id}`} className="text-xs font-semibold text-blue-700 hover:underline">
                        View
                      </Link>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={7} className="px-5 py-10 text-center text-slate-500">No invoices found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <aside className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          {selectedInvoice ? (
            <div className="space-y-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">Payment History</h2>
                  <p className="text-sm text-slate-500">{selectedInvoice.invoice_number}</p>
                </div>
                <ReceiptText className="text-slate-400" size={20} />
              </div>

              <div className="grid grid-cols-3 gap-3 text-sm">
                <div className="rounded-lg bg-slate-50 p-3">
                  <p className="text-xs text-slate-500">Total</p>
                  <p className="mt-1 font-semibold text-slate-900">KES {money(invoiceTotal(selectedInvoice))}</p>
                </div>
                <div className="rounded-lg bg-slate-50 p-3">
                  <p className="text-xs text-slate-500">Paid</p>
                  <p className="mt-1 font-semibold text-emerald-700">KES {money(invoicePaid(selectedInvoice))}</p>
                </div>
                <div className="rounded-lg bg-slate-50 p-3">
                  <p className="text-xs text-slate-500">Balance</p>
                  <p className="mt-1 font-semibold text-amber-700">KES {money(invoiceBalance(selectedInvoice))}</p>
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-medium text-slate-700">Record Payment</label>
                <div className="grid gap-3 sm:grid-cols-2">
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={paymentForm.amount}
                    onChange={(event) => setPaymentForm((prev) => ({ ...prev, amount: event.target.value }))}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-slate-400"
                    placeholder="Amount"
                  />
                  <select
                    value={paymentForm.paymentMethod}
                    onChange={(event) => setPaymentForm((prev) => ({ ...prev, paymentMethod: event.target.value }))}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-slate-400"
                  >
                    {PAYMENT_METHODS.map((method) => <option key={method} value={method}>{method}</option>)}
                  </select>
                </div>
                <input
                  value={paymentForm.reference}
                  onChange={(event) => setPaymentForm((prev) => ({ ...prev, reference: event.target.value }))}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-slate-400"
                  placeholder="Reference"
                />
                <button
                  type="button"
                  onClick={recordPayment}
                  className="w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Apply Payment
                </button>
                {statusMessage ? <p className="text-sm text-slate-600">{statusMessage}</p> : null}
              </div>

              <div className="space-y-3">
                {payments.length > 0 ? payments.map((payment) => (
                  <div key={payment.id} className="rounded-lg border border-slate-200 p-3 text-sm">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-semibold text-slate-900">KES {money(payment.amount)}</p>
                      <p className="text-xs text-slate-500">
                        {new Date(payment.paid_at || payment.created_at).toLocaleDateString('en-KE')}
                      </p>
                    </div>
                    <p className="mt-1 text-xs text-slate-500">
                      {payment.payment_method}{payment.reference ? ` - ${payment.reference}` : ''}
                    </p>
                  </div>
                )) : (
                  <p className="rounded-lg bg-slate-50 p-4 text-sm text-slate-500">No payments recorded yet.</p>
                )}
              </div>
            </div>
          ) : (
            <p className="text-sm text-slate-500">Create or select an invoice to manage payments.</p>
          )}
        </aside>
      </div>

      {createOpen ? (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/45 px-4 py-8">
          <div className="mx-auto w-full max-w-5xl rounded-lg bg-white shadow-2xl">
            <div className="flex items-start justify-between gap-4 border-b border-slate-200 p-5">
              <div>
                <h3 className="text-xl font-semibold text-slate-900">Generate Invoice from Order</h3>
                <p className="text-sm text-slate-500">Select a print order, confirm line items, and calculate the final amount.</p>
              </div>
              <button
                type="button"
                onClick={closeCreateModal}
                className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                aria-label="Close invoice form"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateInvoice} className="space-y-6 p-5">
              <div className="grid gap-4 md:grid-cols-3">
                <label className="space-y-2 text-sm font-medium text-slate-700 md:col-span-2">
                  Print Order
                  <select
                    value={invoiceForm.orderId}
                    onChange={(event) => handleOrderChange(event.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-slate-400"
                    required
                  >
                    <option value="">Select an uninvoiced order</option>
                    {availableOrders.map((order) => (
                      <option key={order.id} value={order.id}>
                        {describeOrder(order)} - {order.customers?.name || 'Unknown customer'}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="space-y-2 text-sm font-medium text-slate-700">
                  Invoice Number
                  <input
                    value={invoiceForm.invoiceNumber}
                    onChange={(event) => updateForm('invoiceNumber', event.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-slate-400"
                    placeholder="Auto generated"
                  />
                </label>
              </div>

              {selectedOrder ? (
                <div className="rounded-lg border border-blue-100 bg-blue-50 p-4 text-sm text-blue-900">
                  <p className="font-semibold">{selectedOrder.customers?.name || 'Customer'}</p>
                  <p>{selectedOrder.customers?.email}{selectedOrder.customers?.company ? ` - ${selectedOrder.customers.company}` : ''}</p>
                  <p className="mt-1 text-blue-700">{describeOrder(selectedOrder)}</p>
                </div>
              ) : null}

              <div className="grid gap-4 md:grid-cols-4">
                <label className="space-y-2 text-sm font-medium text-slate-700">
                  Issue Date
                  <input
                    type="date"
                    value={invoiceForm.issueDate}
                    onChange={(event) => updateForm('issueDate', event.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-slate-400"
                    required
                  />
                </label>
                <label className="space-y-2 text-sm font-medium text-slate-700">
                  Due Date
                  <input
                    type="date"
                    value={invoiceForm.dueDate}
                    onChange={(event) => updateForm('dueDate', event.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-slate-400"
                    required
                  />
                </label>
                <label className="space-y-2 text-sm font-medium text-slate-700">
                  Tax %
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={invoiceForm.taxRate}
                    onChange={(event) => updateForm('taxRate', event.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-slate-400"
                  />
                </label>
                <label className="space-y-2 text-sm font-medium text-slate-700">
                  Discount
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={invoiceForm.discountAmount}
                    onChange={(event) => updateForm('discountAmount', event.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-slate-400"
                  />
                </label>
              </div>

              <div className="overflow-x-auto rounded-lg border border-slate-200">
                <table className="min-w-full text-sm">
                  <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
                    <tr>
                      <th className="px-4 py-3">Item</th>
                      <th className="px-4 py-3">Description</th>
                      <th className="px-4 py-3">Qty</th>
                      <th className="px-4 py-3">Unit Price</th>
                      <th className="px-4 py-3">Line Total</th>
                      <th className="px-4 py-3" />
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {invoiceForm.items.map((item, index) => (
                      <tr key={index}>
                        <td className="px-4 py-3">
                          <input
                            value={item.productName}
                            onChange={(event) => updateItem(index, 'productName', event.target.value)}
                            className="w-56 rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400"
                            placeholder="Item name"
                            required
                          />
                        </td>
                        <td className="px-4 py-3">
                          <input
                            value={item.description}
                            onChange={(event) => updateItem(index, 'description', event.target.value)}
                            className="w-64 rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400"
                            placeholder="Optional"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <input
                            type="number"
                            min="0.01"
                            step="0.01"
                            value={item.quantity}
                            onChange={(event) => updateItem(index, 'quantity', event.target.value)}
                            className="w-24 rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400"
                            required
                          />
                        </td>
                        <td className="px-4 py-3">
                          <input
                            type="number"
                            min="0"
                            step="0.01"
                            value={item.unitPrice}
                            onChange={(event) => updateItem(index, 'unitPrice', event.target.value)}
                            className="w-32 rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400"
                            required
                          />
                        </td>
                        <td className="px-4 py-3 font-semibold text-slate-900">
                          KES {money(toNumber(item.quantity) * toNumber(item.unitPrice))}
                        </td>
                        <td className="px-4 py-3">
                          <button
                            type="button"
                            onClick={() => removeItem(index)}
                            className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                            aria-label="Remove invoice item"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <button
                  type="button"
                  onClick={addItem}
                  className="inline-flex w-fit items-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  <Plus size={16} />
                  Add Item
                </button>

                <div className="w-full max-w-sm space-y-2 rounded-lg bg-slate-50 p-4 text-sm">
                  <div className="flex justify-between"><span>Subtotal</span><strong>KES {money(formTotals.subtotal)}</strong></div>
                  <div className="flex justify-between"><span>Tax</span><strong>KES {money(formTotals.taxAmount)}</strong></div>
                  <div className="flex justify-between"><span>Discount</span><strong>KES {money(formTotals.discountAmount)}</strong></div>
                  <div className="flex justify-between border-t border-slate-200 pt-2 text-base"><span>Grand Total</span><strong>KES {money(formTotals.grandTotal)}</strong></div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-[1fr_2fr]">
                <label className="space-y-2 text-sm font-medium text-slate-700">
                  Preferred Payment Method
                  <select
                    value={invoiceForm.paymentMethod}
                    onChange={(event) => updateForm('paymentMethod', event.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-slate-400"
                  >
                    {PAYMENT_METHODS.map((method) => <option key={method} value={method}>{method}</option>)}
                  </select>
                </label>
                <label className="space-y-2 text-sm font-medium text-slate-700">
                  Notes
                  <textarea
                    value={invoiceForm.notes}
                    onChange={(event) => updateForm('notes', event.target.value)}
                    className="min-h-24 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-slate-400"
                    placeholder="Payment terms, delivery notes, or production notes"
                  />
                </label>
              </div>

              {createStatus ? <p className="text-sm text-slate-600">{createStatus}</p> : null}

              <div className="sticky bottom-0 -mx-5 flex flex-col gap-3 border-t border-slate-200 bg-white p-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeCreateModal}
                  className="rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Create Invoice
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}
