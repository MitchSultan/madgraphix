'use client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { InvoicePDF } from '@/components/shared/invoice-pdf';
import { toast } from 'sonner';
import { useState } from 'react';
import { recordPayment, createInvoice } from '@/lib/actions/invoices';
import { PaymentDialog } from './payment-dialog';

export function InvoiceDetail({ invoice } ) {
  const [loading, setLoading] = useState(false);
  const items = invoice.metadata?.items || [];
  const subtotal = Number(invoice.subtotal);
  const discount = Number(invoice.discount_amount);
  const tax = Number(invoice.tax_amount);
  const total = Number(invoice.total_amount);
  const paid = Number(invoice.paid_amount);
  const balance = total - paid;

  const handleSend = async () => {
    setLoading(true);
    try {
      const result = await createInvoice(invoice.id);
      if (result?.error) throw result.error;
      await navigator.clipboard.writeText(result.shareLink);
      toast.success('Shareable link copied to clipboard!');
    } catch (err) {
      toast.error(err.message || 'Failed to generate share link');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold">Invoice #{invoice.invoice_number}</h1>
          <div className="flex gap-2 mt-2">
            <Badge variant >{invoice.invoice_status}</Badge>
            <Badge variant >{invoice.payment_status}</Badge>
          </div>
        </div>
        <div className="flex gap-2">
          <PDFDownloadLink
            document={<InvoicePDF invoice={invoice} items={items} />}
            fileName={`invoice-${invoice.invoice_number}.pdf`}
          >
            {({ loading: pdfLoading }) => (
              <Button variant="outline" disabled={pdfLoading}>
                {pdfLoading ? 'Generating...' : 'Download PDF'}
              </Button>
            )}
          </PDFDownloadLink>
          <Button variant="secondary" onClick={handleSend} disabled={loading}>
            {loading ? 'Generating link...' : 'Send / Copy Link'}
          </Button>
          <Button asChild variant="outline">
            <a href={`/invoices/${invoice.id}/edit`}>Edit</a>
          </Button>
          <PaymentDialog invoice={invoice} />
        </div>
      </div>

      <Card className="mb-6">
        <CardHeader><CardTitle>Client Details</CardTitle></CardHeader>
        <CardContent>
          <p><strong>{invoice.client_name}</strong></p>
          <p>{invoice.client_email}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Items</CardTitle></CardHeader>
        <CardContent>
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left">Description</th>
                <th className="text-right">Qty</th>
                <th className="text-right">Unit Price</th>
                <th className="text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item , idx) => (
                <tr key={idx} className="border-b">
                  <td>{item.description}</td>
                  <td className="text-right">{item.quantity}</td>
                  <td className="text-right">${Number(item.unit_price).toFixed(2)}</td>
                  <td className="text-right">${(item.quantity * item.unit_price).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 space-y-1 text-right">
            <div>Subtotal: ${subtotal.toFixed(2)}</div>
            <div>Discount: -${discount.toFixed(2)}</div>
            <div>Tax ({invoice.tax_rate}%): ${tax.toFixed(2)}</div>
            <Separator className="my-2" />
            <div className="font-bold text-lg">Total: ${total.toFixed(2)}</div>
            <div className="text-sm text-muted-foreground">Paid: ${paid.toFixed(2)}</div>
            <div className="text-sm font-semibold">Balance: ${balance.toFixed(2)}</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}