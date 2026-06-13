import { supabaseServer } from './server';
import {
  createInvoice as createInvoiceFromService,
  getInvoiceById as getInvoiceByIdFromService,
  listInvoices,
  recordInvoicePayment as recordInvoicePaymentFromService,
} from '../services/invoice.service';

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
  return listInvoices();
}

export async function getOpenPrintOrders() {
  const supabase = await supabaseServer();

  const [{ orders, error: ordersError }, { data: invoiceRows, error: invoicesError }] = await Promise.all([
    getInvoiceableOrders(supabase),
    supabase
      .from('invoices')
      .select('order_id')
      .not('order_id', 'is', null),
  ]);

  if (ordersError) throw ordersError;
  if (invoicesError) throw invoicesError;

  const invoicedOrderIds = new Set((invoiceRows || []).map((invoice) => invoice.order_id));
  return (orders || []).filter((order) => !invoicedOrderIds.has(order.id));
}

function isMissingTableError(error, tableName) {
  return error?.code === '42P01' || error?.message?.includes(`'public.${tableName}'`);
}

function normalizeLegacyOrder(order) {
  return {
    ...order,
    job_type: order.job_type || order.title || order.order_number || 'Order',
    quantity: order.quantity || 1,
    unit_price: order.unit_price || order.price || 0,
    total_amount: order.total_amount || order.total_price || order.amount || order.unit_price || 0,
    customers: {
      name: order.client_name || order.customer_name || order.full_name || 'Customer',
      email: order.client_email || order.customer_email || order.email || '',
      phone: order.client_phone || order.customer_phone || order.phone || '',
      company: order.client_company || order.company_name || order.company || '',
    },
  };
}

async function getInvoiceableOrders(supabase) {
  const { data: printOrders, error: printOrdersError } = await supabase
    .from('print_orders')
    .select(`
      *,
      customers (name, company, email, phone)
    `)
    .order('created_at', { ascending: false });

  if (!printOrdersError) {
    return { orders: printOrders || [], error: null };
  }

  if (!isMissingTableError(printOrdersError, 'print_orders')) {
    return { orders: [], error: printOrdersError };
  }

  const { data: orders, error: ordersError } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false });

  return {
    orders: (orders || []).map(normalizeLegacyOrder),
    error: ordersError,
  };
}

export async function getInvoiceById(id) {
  return getInvoiceByIdFromService(id);
}

export async function createInvoice(payload) {
  return createInvoiceFromService(payload);
}

export async function recordInvoicePayment(id, amount, options = {}) {
  return recordInvoicePaymentFromService({
    invoiceId: id,
    amount,
    paymentMethod: options.paymentMethod,
    reference: options.reference,
    notes: options.notes,
    paidAt: options.paidAt,
  });
}
