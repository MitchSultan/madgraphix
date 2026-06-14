import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase/server';

export async function POST(request) {
  const body = await request.json();
  const { customer, order } = body;

  if (!customer?.email || !order?.jobType) {
    return NextResponse.json({ error: 'Missing required order data' }, { status: 400 });
  }

  const supabase = await supabaseServer();

  const { data: existingCustomer } = await supabase
    .from('customers')
    .select('id')
    .eq('email', customer.email)
    .single();

  const { data: customerData, error: customerError } = await supabase
    .from('customers')
    .upsert([
      {
        id: existingCustomer?.id,
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        company: customer.company,
      },
    ], { onConflict: 'email' })
    .select()
    .single();

  if (customerError) {
    return NextResponse.json({ error: customerError.message }, { status: 500 });
  }

  const { data: orderData, error: orderError } = await supabase
    .from('print_orders')
    .insert([
      {
        customer_id: customerData.id,
        job_type: order.jobType,
        dimensions: order.dimensions,
        material: order.material,
        quantity: order.quantity,
        finishing_options: order.finishingOptions,
        design_status: order.designStatus,
        production_status: order.productionStatus,
        design_references: order.designReferences,
        notes: order.notes,
      },
    ])
    .select(`*, customers (name, email, phone, company)`)
    .single();

  if (orderError) {
    return NextResponse.json({ error: orderError.message }, { status: 500 });
  }

  return NextResponse.json({ order: orderData });
}
