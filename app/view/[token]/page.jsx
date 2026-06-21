import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import { InvoicePDF } from '@/components/shared/invoice-pdf';

export default async function ViewInvoicePage({ params }) {
  const supabase = await createClient();
  const { data: invoice } = await supabase
    .from('invoices')
    .select('*')
    .eq('share_token', params.token)
    .single();
  if (!invoice) notFound();

  const items = invoice.metadata?.items || [];
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold">Invoice #{invoice.invoice_number}</h1>
      {/* render same detail as admin but read-only, plus a download button */}
      <PDFDownloadLink
        document={<InvoicePDF invoice={invoice} items={items} />}
        fileName={`invoice-${invoice.invoice_number}.pdf`}
      >
        <Button>Download PDF</Button>
      </PDFDownloadLink>
      {/* ... rest of invoice details ... */}
    </div>
  );
}