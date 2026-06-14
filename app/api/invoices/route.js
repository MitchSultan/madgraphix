import { NextResponse } from 'next/server';
import { createInvoice } from '@/lib/services/invoice.service';

export async function POST(request) {
  const body = await request.json();

  try {
    const invoice = await createInvoice(body);

    return NextResponse.json({ invoice });
  } catch (error) {
    return NextResponse.json({ error: error.message || 'Unable to create invoice.' }, { status: 500 });
  }
}
