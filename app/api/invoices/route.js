import { NextResponse } from 'next/server';
import { createInvoice } from '@/lib/supabase/invoices';

export async function POST(request) {
  const body = await request.json();
  const { orderId, invoiceNumber, totalAmount, paymentMethod, dueDate, notes } = body;

  if (!orderId || !totalAmount) {
    return NextResponse.json(
      { error: 'An order and total amount are required to create an invoice.' },
      { status: 400 }
    );
  }

  try {
    const invoice = await createInvoice({
      orderId,
      invoiceNumber,
      totalAmount,
      paymentMethod,
      dueDate,
      notes,
    });

    return NextResponse.json({ invoice });
  } catch (error) {
    return NextResponse.json({ error: error.message || 'Unable to create invoice.' }, { status: 500 });
  }
}
