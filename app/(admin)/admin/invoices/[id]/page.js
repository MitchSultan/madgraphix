import { createServerClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import { InvoiceDetail } from './invoice-detail';
import { getInvoiceById } from '@/lib/data';

export default async function InvoicePage({ params }) {
    const { id } = await params;  // ← await it first
  const invoice = await getInvoiceById(id);
//   const invoice = await getInvoiceById(params.id);
  if (!invoice) notFound();
  return <InvoiceDetail invoice={invoice} />;
}