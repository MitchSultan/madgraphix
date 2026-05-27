import { supabaseServer } from '@/lib/supabase/server';

export async function getInvoiceOverview() {
  const supabase = await supabaseServer();

  const [{ data: invoiceRows }, { data: overdueInvoices }] = await Promise.all([
    supabase.from('invoices').select('total_amount,paid_amount,payment_status'),
    supabase.from('invoices').select('id').lt('due_date', new Date().toISOString()).neq('payment_status', 'Fully Paid'),
  ]);

  const totalRevenue = invoiceRows?.reduce((sum, invoice) => sum + parseFloat(invoice.total_amount || 0), 0) || 0;
  const paidTotal = invoiceRows?.reduce((sum, invoice) => sum + parseFloat(invoice.paid_amount || 0), 0) || 0;
  const unpaidCount = invoiceRows?.filter((invoice) => invoice.payment_status !== 'Fully Paid').length || 0;

  return {
    totalRevenue,
    paidTotal,
    unpaidCount,
    overdueCount: overdueInvoices?.length || 0,
  };
}

export async function getAllInvoices() {
  const supabase = await supabaseServer();

  const { data, error } = await supabase
    .from('invoices')
    .select(`
      *,
      print_orders (*, customers (name, email, company))
    `)
    .order('issued_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function getOpenPrintOrders() {
  const supabase = await supabaseServer();

  const { data, error } = await supabase
    .from('print_orders')
    .select(`
      id,
      job_type,
      quantity,
      created_at,
      customers (name, company, email),
      invoices (id)
    `)
    .order('created_at', { ascending: false });

  if (error) throw error;

  return data?.filter((order) => !order.invoices || order.invoices.length === 0) || [];
}

export async function getInvoiceById(id) {
  const supabase = await supabaseServer();
  const { data, error } = await supabase
    .from('invoices')
    .select(`
      *,
      print_orders (*, customers (name, email, company))
    `)
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

export async function createInvoice(payload) {
  const supabase = await supabaseServer();
  const { orderId, invoiceNumber, totalAmount, paymentMethod, dueDate, notes } = payload;

  const finalInvoiceNumber = invoiceNumber || `INV-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(100 + Math.random() * 900)}`;

  const { data, error } = await supabase
    .from('invoices')
    .insert([
      {
        order_id: orderId,
        invoice_number: finalInvoiceNumber,
        total_amount: totalAmount,
        payment_method: paymentMethod,
        due_date: dueDate,
        notes,
      },
    ])
    .select(`*, print_orders (*, customers (name, email, company))`)
    .single();

  if (error) throw error;
  return data;
}

export async function recordInvoicePayment(id, amount) {
  const supabase = await supabaseServer();

  const { data: existingInvoice, error: fetchError } = await supabase
    .from('invoices')
    .select('paid_amount, total_amount')
    .eq('id', id)
    .single();

  if (fetchError) throw fetchError;

  const newPaid = parseFloat(existingInvoice.paid_amount || 0) + parseFloat(amount || 0);
  const paymentStatus = newPaid >= parseFloat(existingInvoice.total_amount || 0)
    ? 'Fully Paid'
    : 'Partial';

  const { data, error } = await supabase
    .from('invoices')
    .update({
      paid_amount: newPaid,
      payment_status: paymentStatus,
    })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}
