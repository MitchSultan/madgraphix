'use server';

import { revalidatePath } from 'next/cache';
import {
  createInvoice as createInvoiceService,
  recordInvoicePayment as recordInvoicePaymentService,
} from '@/app/lib/services/invoice.service';

export async function createInvoice(input) {
  const invoice = await createInvoiceService(input);
  revalidatePath('/dashboard/invoices');
  revalidatePath('/dashboard');
  return invoice;
}

export async function recordInvoicePayment(input) {
  const invoice = await recordInvoicePaymentService(input);
  revalidatePath('/dashboard/invoices');
  revalidatePath(`/dashboard/invoices/${input.invoiceId}`);
  revalidatePath('/dashboard');
  return invoice;
}
