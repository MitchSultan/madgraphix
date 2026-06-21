'use client';
import { useFieldArray, useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { invoiceFormSchema } from '@/lib/schema/invoice';
import { Button } from '@/components/ui/button';
import { Field, FieldLabel, FieldDescription } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Plus, Trash2 } from 'lucide-react';
import { createInvoice } from '@/lib/actions/invoices';
import { useTransition } from 'react';
import { toast } from 'sonner';

export function InvoiceForm({ products }) {
  const [isPending, startTransition] = useTransition();
  const form = useForm({
    resolver: zodResolver(invoiceFormSchema),
    defaultValues: { items: [{ description: '', quantity: 1, unit_price: 0 }] },
  });
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'items',
  });

  const onSubmit = (values) => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, val]) => {
      if (key === 'items') formData.append(key, JSON.stringify(val));
      else formData.append(key, val);
    });
    startTransition(async () => {
      const result = await createInvoice(formData);
      if (result?.error) toast.error('Failed to create invoice');
      else toast.success('Invoice created');
    });
  };

  const subtotal =
    form
      .watch('items')
      ?.reduce((sum, item) => sum + (item.quantity * item.unit_price || 0), 0) || 0;
  const discount = form.watch('discount_amount') || 0;
  const taxRate = form.watch('tax_rate') || 0;
  const tax = (subtotal - discount) * (taxRate / 100);
  const total = subtotal - discount + tax;

  return (
    
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Client info */}
        <div className="grid grid-cols-2 gap-4">
          <Field
            control={form.control}
            name="client_name"
            rules={{ required: 'Client name is required' }}
          >
            <FieldLabel>Client Name</FieldLabel>
        
              <Input />
            
            
          </Field>

          <Field
            control={form.control}
            name="client_email"
            rules={{ required: 'Client email is required' }}
          >
            <FieldLabel>Client Email</FieldLabel>
        
              <Input type="email" />
            
            
          </Field>
        </div>

        {/* Due date */}
        <Field
          control={form.control}
          name="due_date"
          rules={{ required: 'Due date is required' }}
        >
          <FieldLabel>Due Date</FieldLabel>
        
            <Input type="date" />
          
          
        </Field>

        {/* Line items */}
        <div className="space-y-2">
          <h3 className="font-semibold">Items</h3>
          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-2 items-end">
              <Field
                control={form.control}
                name={`items.${index}.description`}
                rules={{ required: 'Item description is required' }}
              >
                <div className="flex-1">
                
                    <Input placeholder="Item description" />
                  
                  
                </div>
              </Field>

              <Field
                control={form.control}
                name={`items.${index}.quantity`}
                rules={{ required: 'Qty required' }}
              >
            
                  <Input type="number" className="w-20" />
                
                
              </Field>

              <Field
                control={form.control}
                name={`items.${index}.unit_price`}
                rules={{ required: 'Price required' }}
              >
            
                  <Input type="number" step="0.01" className="w-24" />
                
                
              </Field>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => remove(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => append({ description: '', quantity: 1, unit_price: 0 })}
          >
            <Plus className="mr-1 h-4 w-4" /> Add Item
          </Button>
        </div>

        {/* Totals */}
        <div className="grid grid-cols-2 gap-4 max-w-md ml-auto">
          <div>Subtotal:</div>
          <div>${subtotal.toFixed(2)}</div>

          <Field
            control={form.control}
            name="discount_amount"
            rules={{ required: 'Discount is required' }}
          >
            <div>Discount:</div>
        
              <Input type="number" step="0.01" className="w-24" />
            
            
          </Field>

          <Field
            control={form.control}
            name="tax_rate"
            rules={{ required: 'Tax rate is required' }}
          >
            <div>Tax Rate (%):</div>
        
              <Input type="number" className="w-24" />
            
            
          </Field>

          <div>Tax Amount:</div>
          <div>${tax.toFixed(2)}</div>
          <div className="font-bold">Total:</div>
          <div className="font-bold">${total.toFixed(2)}</div>
        </div>

        <Field control={form.control} name="notes">
          <FieldLabel>Notes</FieldLabel>
        
            <Input />
          
          
        </Field>

        <Button type="submit" disabled={isPending}>
          Create Invoice
        </Button>
      </form>
    </FormProvider>
    
  );
}