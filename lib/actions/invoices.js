// 'use server';

// import { revalidatePath } from 'next/cache';
// import {
//   createInvoice as createInvoiceService,
//   recordInvoicePayment as recordInvoicePaymentService,
// } from '@/app/lib/services/invoice.service';

// export async function createInvoice(input) {
//   const invoice = await createInvoiceService(input);
//   revalidatePath('/dashboard/invoices');
//   revalidatePath('/dashboard');
//   return invoice;
// }

// export async function recordInvoicePayment(input) {
//   const invoice = await recordInvoicePaymentService(input);
//   revalidatePath('/dashboard/invoices');
//   revalidatePath(`/dashboard/invoices/${input.invoiceId}`);
//   revalidatePath('/dashboard');
//   return invoice;
// }


'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { invoiceFormSchema } from '@/lib/schema/invoice';
import { randomUUID } from 'crypto';

export async function createInvoice(data) {
  const raw = Object.fromEntries(data);
  // Need to parse items (comes as JSON string from form)
  const parsed = invoiceFormSchema.safeParse({
    ...raw,
    items: JSON.parse(raw.items ),
    tax_rate: Number(raw.tax_rate),
    discount_amount: Number(raw.discount_amount),
  });
  if (!parsed.success) return { error: parsed.error.flatten() };

  const supabase = await createClient();
  const { client_name, client_email, due_date, notes, tax_rate, discount_amount, items } = parsed.data;

  // Calculate totals
  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.unit_price, 0);
  const tax_amount = (subtotal - discount_amount) * (tax_rate / 100);
  const total_amount = subtotal - discount_amount + tax_amount;

  // Generate invoice number (custom logic – e.g., INV-2025-0001)
  const invoice_number = await generateInvoiceNumber(supabase);

  const { error } = await supabase.from('invoices').insert({
    invoice_number,
    client_name,
    client_email,
    subtotal,
    discount_amount,
    tax_rate,
    tax_amount,
    total_amount,
    amount: subtotal, // or ignore
    paid_amount: 0,
    payment_status: 'Unpaid',
    invoice_status: 'draft',
    due_date,
    notes,
    metadata: { items }, // store line items inside metadata
  });

  if (error) return { error: error.message };
  revalidatePath('/invoices');
  return { success: true };
}
export async function recordPayment(invoiceId, amount, method) {
  const supabase = await createClient();

  // 1. Get the current invoice
  const { data: invoice, error: fetchError } = await supabase
    .from('invoices')
    .select('paid_amount, total_amount, invoice_status')
    .eq('id', invoiceId)
    .single();

  if (fetchError) return { error: fetchError.message };
  if (!invoice) return { error: 'Invoice not found' };

  // 2. Calculate new paid amount and derive payment status
  const oldPaid = Number(invoice.paid_amount);
  const newPaid = oldPaid + Number(amount);
  const total = Number(invoice.total_amount);

  let paymentStatus;
  if (newPaid >= total) paymentStatus = 'Fully Paid';
  else if (newPaid > 0) paymentStatus = 'Partial';
  else paymentStatus = 'Unpaid';

  // 3. Optionally set invoice_status to 'paid' if fully paid
  let newInvoiceStatus = invoice.invoice_status;
  if (paymentStatus === 'Fully Paid') {
    newInvoiceStatus = 'paid';
  }

  // 4. Update the invoice
  const { error: updateError } = await supabase
    .from('invoices')
    .update({
      paid_amount: newPaid,
      payment_status: paymentStatus,
      payment_method: method,
      paid_at: new Date().toISOString(),
      invoice_status: newInvoiceStatus,
    })
    .eq('id', invoiceId);

  if (updateError) return { error: updateError.message };

  revalidatePath(`/admin/invoices/${invoiceId}`);
  return { success: true };
}

async function generateInvoiceNumber(supabase) {
  const year = new Date().getFullYear();
  const { data, error } = await supabase.rpc('next_invoice_number', { year });
  if (error || !data) {
    // fallback: simple count
    const { count } = await supabase.from('invoices').select('*', { count: 'exact', head: true });
    return `INV-${year}-${String((count ?? 0) + 1).padStart(4, '0')}`;
  }
  return data;
}