import { supabaseServer } from '@/lib/supabase/server';
import {
  createInvoiceSchema,
  formatZodError,
  recordPaymentSchema,
} from '@/validators/invoice.schema';

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function toMoney(value) {
  return Math.round(Number(value || 0) * 100) / 100;
}

function calculateTotals(items, taxRate = 16, discountAmount = 0, fallbackTotal = 0) {
  if (!items?.length) {
    const totalAmount = toMoney(fallbackTotal);

    return {
      subtotal: totalAmount,
      taxAmount: 0,
      discountAmount: 0,
      totalAmount,
    };
  }

  const subtotal = items.reduce((sum, item) => sum + toMoney(item.quantity) * toMoney(item.unitPrice), 0);
  const taxAmount = toMoney(subtotal * toMoney(taxRate) / 100);
  const totalAmount = Math.max(toMoney(subtotal + taxAmount - toMoney(discountAmount)), 0);

  return {
    subtotal: toMoney(subtotal),
    taxAmount,
    discountAmount: toMoney(discountAmount),
    totalAmount,
  };
}

function generateInvoiceNumber() {
  const stamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const suffix = Math.floor(1000 + Math.random() * 9000);
  return `INV-${stamp}-${suffix}`;
}

async function getCurrentUserId(supabase) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user?.id || null;
}

async function logInvoiceEvent(supabase, invoiceId, eventType, metadata = {}) {
  const actorId = await getCurrentUserId(supabase);

  const { error } = await supabase.from('invoice_events').insert({
    invoice_id: invoiceId,
    actor_id: actorId,
    event_type: eventType,
    metadata,
  });

  if (error) throw error;
}

export async function createInvoice(input) {
  const parsed = createInvoiceSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error(formatZodError(parsed.error));
  }

  const payload = parsed.data;
  const supabase = await supabaseServer();
  const invoiceNumber = payload.invoiceNumber || generateInvoiceNumber();
  const totals = calculateTotals(
    payload.items,
    payload.taxRate,
    payload.discountAmount,
    payload.totalAmount
  );

  const { data: invoice, error } = await supabase
    .from('invoices')
    .insert({
      order_id: payload.orderId,
      invoice_number: invoiceNumber,
      issued_at: payload.issueDate?.toISOString(),
      due_date: payload.dueDate?.toISOString(),
      subtotal: totals.subtotal,
      tax_rate: payload.taxRate,
      tax_amount: totals.taxAmount,
      discount_amount: totals.discountAmount,
      total_amount: totals.totalAmount,
      invoice_status: 'draft',
      payment_method: payload.paymentMethod,
      payment_status: 'Unpaid',
      notes: payload.notes,
    })
    .select()
    .single();

  if (error) throw error;

  if (payload.items.length > 0) {
    const rows = payload.items.map((item, index) => ({
      invoice_id: invoice.id,
      product_id: item.productId || null,
      product_name: item.productName,
      description: item.description || null,
      quantity: item.quantity,
      unit_price: item.unitPrice,
      sort_order: index,
    }));

    const { error: itemsError } = await supabase.from('invoice_items').insert(rows);
    if (itemsError) throw itemsError;
  }

  await logInvoiceEvent(supabase, invoice.id, 'invoice_created', {
    invoice_number: invoiceNumber,
    total_amount: totals.totalAmount,
  });

  return getInvoiceById(invoice.id);
}

export async function getInvoiceById(id) {
  if (!UUID_PATTERN.test(String(id || ''))) {
    throw new Error('Invalid invoice id.');
  }

  const supabase = await supabaseServer();
  const { data: invoice, error } = await supabase
    .from('invoices')
    .select(`
      *,
      invoice_items (*),
      payments (*),
      invoice_events (*)
    `)
    .eq('id', id)
    .single();

  if (error) throw error;
  const [order] = await attachOrderData(supabase, [invoice]);
  return order;
}

export async function recordInvoicePayment(input) {
  const parsed = recordPaymentSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error(formatZodError(parsed.error));
  }

  const payload = parsed.data;
  const supabase = await supabaseServer();
  const actorId = await getCurrentUserId(supabase);

  const { data: invoice, error: invoiceError } = await supabase
    .from('invoices')
    .select('id, total_amount, paid_amount, invoice_status')
    .eq('id', payload.invoiceId)
    .single();

  if (invoiceError) throw invoiceError;
  if (invoice.invoice_status === 'void') {
    throw new Error('Payments cannot be recorded against a void invoice.');
  }

  const balance = toMoney(invoice.total_amount) - toMoney(invoice.paid_amount);
  if (payload.amount > balance && balance > 0) {
    throw new Error('Payment amount cannot exceed the outstanding balance.');
  }

  const { data: payment, error: paymentError } = await supabase
    .from('payments')
    .insert({
      invoice_id: payload.invoiceId,
      amount: payload.amount,
      payment_method: payload.paymentMethod,
      reference: payload.reference,
      notes: payload.notes,
      paid_at: payload.paidAt?.toISOString(),
      recorded_by: actorId,
    })
    .select()
    .single();

  if (paymentError) throw paymentError;

  await logInvoiceEvent(supabase, payload.invoiceId, 'payment_recorded', {
    payment_id: payment.id,
    amount: payload.amount,
    payment_method: payload.paymentMethod,
    reference: payload.reference,
  });

  return getInvoiceById(payload.invoiceId);
}

export async function listInvoices() {
  const supabase = await supabaseServer();
  const { data, error } = await supabase
    .from('invoices')
    .select(`
      *,
      invoice_items (*),
      payments (*)
    `)
    .order('issued_at', { ascending: false });

  if (error) throw error;
  return attachOrderData(supabase, data || []);
}

function isMissingTableError(error, tableName) {
  return error?.code === '42P01' || error?.message?.includes(`'public.${tableName}'`);
}

function normalizeLegacyOrder(order) {
  if (!order) return null;

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

async function fetchOrdersByIds(supabase, orderIds) {
  const { data: printOrders, error: printOrdersError } = await supabase
    .from('print_orders')
    .select('*, customers (name, email, phone, company)')
    .in('id', orderIds);

  if (!printOrdersError) {
    return printOrders || [];
  }

  if (!isMissingTableError(printOrdersError, 'print_orders')) {
    throw printOrdersError;
  }

  const { data: orders, error: ordersError } = await supabase
    .from('orders')
    .select('*')
    .in('id', orderIds);

  if (ordersError) throw ordersError;
  return (orders || []).map(normalizeLegacyOrder);
}

async function attachOrderData(supabase, invoices) {
  const orderIds = [...new Set(invoices.map((invoice) => invoice.order_id).filter(Boolean))];

  if (orderIds.length === 0) {
    return invoices.map((invoice) => ({ ...invoice, print_orders: null }));
  }

  const orders = await fetchOrdersByIds(supabase, orderIds);
  const ordersById = new Map((orders || []).map((order) => [order.id, order]));

  return invoices.map((invoice) => ({
    ...invoice,
    print_orders: ordersById.get(invoice.order_id) || null,
  }));
}
