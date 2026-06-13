import { z } from 'zod';

const money = z.coerce
  .number({ message: 'Enter a valid amount.' })
  .finite()
  .nonnegative({ message: 'Amount cannot be negative.' });

export const invoiceItemSchema = z.object({
  productId: z.string().uuid().optional().nullable(),
  productName: z.string().trim().min(1, 'Item name is required.'),
  description: z.string().trim().optional().nullable(),
  quantity: z.coerce.number().finite().positive('Quantity must be greater than zero.'),
  unitPrice: z.coerce.number().finite().nonnegative('Unit price cannot be negative.'),
});

export const createInvoiceSchema = z
  .object({
    orderId: z.string().uuid('Select a valid print order.'),
    invoiceNumber: z.string().trim().optional().nullable(),
    paymentMethod: z.enum(['M-Pesa', 'Cash', 'Bank Transfer', 'Card']).default('M-Pesa'),
    issueDate: z.coerce.date().optional(),
    dueDate: z.coerce.date().optional(),
    taxRate: money.default(16),
    discountAmount: money.default(0),
    notes: z.string().trim().optional().nullable(),
    items: z.array(invoiceItemSchema).default([]),
    totalAmount: money.optional(),
  })
  .superRefine((value, ctx) => {
    if (value.issueDate && value.dueDate && value.dueDate <= value.issueDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['dueDate'],
        message: 'Due date must be after the issue date.',
      });
    }

    if (!value.totalAmount && value.items.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['items'],
        message: 'Add at least one item or provide a total amount.',
      });
    }
  });

export const recordPaymentSchema = z.object({
  invoiceId: z.string().uuid('Invoice id is required.'),
  amount: z.coerce.number().finite().positive('Payment amount must be greater than zero.'),
  paymentMethod: z.enum(['M-Pesa', 'Cash', 'Bank Transfer', 'Card']).default('M-Pesa'),
  reference: z.string().trim().optional().nullable(),
  notes: z.string().trim().optional().nullable(),
  paidAt: z.coerce.date().optional(),
});

export function formatZodError(error) {
  return error.issues.map((issue) => issue.message).join(' ');
}
