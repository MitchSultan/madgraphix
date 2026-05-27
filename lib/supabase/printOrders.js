import { supabaseServer } from '@/lib/supabase/server';

export async function getDashboardPrintMetrics() {
  const supabase = await supabaseServer();

  const [{ data: allInvoices }, { data: activeOrders }, { data: pendingDesigns }, { data: unpaidInvoices }, { data: productionQueue }] = await Promise.all([
    supabase.from('invoices').select('total_amount'),
    supabase.from('print_orders').select('id').in('production_status', ['Queued', 'Printing']),
    supabase.from('print_orders').select('id').in('design_status', ['Pending Design', 'Awaiting Feedback']),
    supabase.from('invoices').select('id').neq('payment_status', 'Fully Paid'),
    supabase.from('print_orders')
      .select('id, job_type, production_status, customer_id, customers(name, company)')
      .in('production_status', ['Queued', 'Printing'])
      .order('updated_at', { ascending: true })
      .limit(5),
  ]);

  const totalRevenue = allInvoices?.reduce((sum, invoice) => sum + parseFloat(invoice.total_amount || 0), 0) || 0;

  return {
    totalRevenue,
    activeJobs: activeOrders?.length || 0,
    pendingDesigns: pendingDesigns?.length || 0,
    unpaidInvoices: unpaidInvoices?.length || 0,
    productionQueue: productionQueue || [],
  };
}

export async function getAllPrintOrders() {
  const supabase = await supabaseServer();
  const { data, error } = await supabase
    .from('print_orders')
    .select(`
      *,
      customers (name, email, phone, company),
      invoices (invoice_number, payment_status, total_amount, paid_amount, balance)
    `)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function getPrintOrderById(id) {
  const supabase = await supabaseServer();
  const { data, error } = await supabase
    .from('print_orders')
    .select(`
      *,
      customers (name, email, phone, company),
      invoices (invoice_number, payment_status, total_amount, paid_amount, balance)
    `)
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

export async function getCustomerList() {
  const supabase = await supabaseServer();
  const { data, error } = await supabase
    .from('customers')
    .select('id, name, email, company')
    .order('name', { ascending: true });

  if (error) throw error;
  return data;
}

export async function createPrintOrder(payload) {
  const supabase = await supabaseServer();

  const { customer, order } = payload;

  // Create or reuse the customer record
  const { data: existingCustomer, error: customerQueryError } = await supabase
    .from('customers')
    .select('id')
    .eq('email', customer.email)
    .single();

  if (customerQueryError && customerQueryError.code !== 'PGRST116') {
    throw customerQueryError;
  }

  const customerId = existingCustomer?.id;
  const { data: customerData, error: customerCreateError } = await supabase
    .from('customers')
    .upsert([
      {
        id: customerId,
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        company: customer.company,
      },
    ], { onConflict: 'email' })
    .select()
    .single();

  if (customerCreateError) throw customerCreateError;

  const { data: newOrder, error: orderError } = await supabase
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

  if (orderError) throw orderError;
  return newOrder;
}

export async function updatePrintOrder(id, updates) {
  const supabase = await supabaseServer();

  const { data, error } = await supabase
    .from('print_orders')
    .update(updates)
    .eq('id', id)
    .select(`*, customers (name, email, phone, company)`)
    .single();

  if (error) throw error;
  return data;
}
