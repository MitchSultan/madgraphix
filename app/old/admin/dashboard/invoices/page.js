import { getAllInvoices, getOpenPrintOrders } from '../../../lib/supabase/invoices';
import InvoiceHubClient from './InvoiceHubClient';

export default async function InvoicesPage() {
  try {
    const [invoices, availableOrders] = await Promise.all([
      getAllInvoices(),
      getOpenPrintOrders(),
    ]);

    return (
      <InvoiceHubClient
        initialInvoices={invoices || []}
        availableOrders={availableOrders || []}
      />
    );
  } catch (error) {
    return (
      <div className="p-6">
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <strong>Error:</strong> {error.message}
        </div>
      </div>
    );
  }
}
