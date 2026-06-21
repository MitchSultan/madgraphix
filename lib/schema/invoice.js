import { z } from 'zod';

export const lineItemSchema = z.object({
  description: z.string().min(1, 'Required'),
  quantity: z.coerce.number().positive(),
  unit_price: z.coerce.number().min(0),
  product_id: z.string().uuid().optional(), // if from products table
});

export const invoiceFormSchema = z.object({
  client_name: z.string().min(1),
  client_email: z.string().email(),
  due_date: z.string(),
  notes: z.string().optional(),
  tax_rate: z.coerce.number().min(0).max(100).default(0),
  discount_amount: z.coerce.number().min(0).default(0),
  items: z.array(lineItemSchema).min(1, 'Add at least one item'),
});