import { NextResponse } from 'next/server';
import { recordInvoicePayment } from '@/lib/services/invoice.service';

export async function PATCH(request) {
  const body = await request.json();

  try {
    const invoice = await recordInvoicePayment(body);
    return NextResponse.json({ invoice });
  } catch (error) {
    return NextResponse.json({ error: error.message || 'Unable to record payment.' }, { status: 500 });
  }
}
