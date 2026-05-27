import InvoiceHubClient from './InvoiceHubClient';
import { getAllInvoices, getOpenPrintOrders } from '@/lib/supabase/invoices';

export default async function InvoiceHubPage() {
  const [invoices, availableOrders] = await Promise.all([
    getAllInvoices(),
    getOpenPrintOrders(),
  ]);

  return (
    <div className="space-y-8 w-full py-12 px-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Invoice Hub</h1>
        <p className="text-gray-500">Billing and payments for printing, finishing, and creative production.</p>
      </div>

      <InvoiceHubClient initialInvoices={invoices} availableOrders={availableOrders} />
    </div>
  );
}
