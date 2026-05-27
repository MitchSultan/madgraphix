import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase/server';

export async function PATCH(request) {
  const body = await request.json();
  const { invoiceId, amount } = body;

  if (!invoiceId || !amount) {
    return NextResponse.json({ error: 'Invoice id and payment amount are required' }, { status: 400 });
  }

  const supabase = await supabaseServer();

  const { data: invoice, error: invoiceError } = await supabase
    .from('invoices')
    .select('paid_amount, total_amount')
    .eq('id', invoiceId)
    .single();

  if (invoiceError) {
    return NextResponse.json({ error: invoiceError.message }, { status: 500 });
  }

  const newPaid = parseFloat(invoice.paid_amount || 0) + parseFloat(amount);
  const paymentStatus = newPaid >= parseFloat(invoice.total_amount || 0) ? 'Fully Paid' : 'Partial';

  const { data, error } = await supabase
    .from('invoices')
    .update({ paid_amount: newPaid, payment_status: paymentStatus })
    .eq('id', invoiceId)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ invoice: data });
}
