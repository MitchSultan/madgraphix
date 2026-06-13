import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getInvoiceById } from '../../../../lib/supabase/invoices';
import PdfInvoiceDownload from '../../components/PdfInvoiceDownload';

export default async function InvoiceDetailPage({ params }) {
  const { id } = await params;
  const invoice = await getInvoiceById(id).catch((error) => {
    if (error.message === 'Invalid invoice id.' || error.code === 'PGRST116') {
      notFound();
    }

    throw error;
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Invoice {invoice.invoice_number}</h1>
          <p className="text-sm text-slate-500">Review the billing details for this print order.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/dashboard/invoices" className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
            Back to invoices
          </Link>
          <PdfInvoiceDownload invoice={invoice} />
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Billed to</p>
              <p className="mt-3 text-lg font-semibold text-slate-900">{invoice.print_orders?.customers?.name || 'Customer'}</p>
              <p className="text-sm text-slate-500">{invoice.print_orders?.customers?.company}</p>
              <p className="text-sm text-slate-500">{invoice.print_orders?.customers?.email}</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-3xl bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Invoice date</p>
                <p className="mt-2 text-sm font-semibold text-slate-900">{new Date(invoice.issued_at).toLocaleDateString()}</p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Due date</p>
              <p className="mt-2 text-sm font-semibold text-slate-900">{invoice.due_date ? new Date(invoice.due_date).toLocaleDateString() : 'No due date'}</p>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Total</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">KES {Number(invoice.total_amount).toLocaleString()}</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Paid</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">KES {Number(invoice.paid_amount).toLocaleString()}</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Balance</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">KES {Number(invoice.balance ?? (Number(invoice.total_amount || 0) - Number(invoice.paid_amount || 0))).toLocaleString()}</p>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Invoice summary</h2>
          <div className="mt-6 space-y-4 text-sm text-slate-600">
            <div className="rounded-3xl bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Status</p>
              <p className="mt-2 font-semibold text-slate-900">{invoice.payment_status}</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Payment method</p>
              <p className="mt-2 font-semibold text-slate-900">{invoice.payment_method}</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Order</p>
              <p className="mt-2 font-semibold text-slate-900">{invoice.print_orders?.job_type || 'Print order'}</p>
              <p className="text-sm text-slate-500">Qty: {invoice.print_orders?.quantity}</p>
            </div>
          </div>
        </section>
      </div>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Notes</h2>
        <p className="mt-4 text-sm leading-7 text-slate-600">{invoice.notes || 'No notes were added for this invoice.'}</p>
      </section>
    </div>
  );
}
