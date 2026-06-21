import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { supabaseServer } from '@/lib/supabase/server';

const invoiceStatusVariant = {
  draft: 'secondary',
  sent: 'default',        // blue
  paid: 'success',        // green
  overdue: 'destructive', // red
  cancelled: 'outline',
};

const paymentStatusVariant = {
  Unpaid: 'secondary',
  Partial: 'warning',     // yellow – you may need to define a custom variant
  'Fully Paid': 'success',
};

export default async function AdminInvoicesPage() {
  const supabase =  await supabaseServer();
  const { data: invoices, error } = await supabase
    .from('invoices')
    .select('*')
    .order('created_at', { ascending: false });
    if (error) throw new Error(error.message)
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Invoices</h1>
        <div>
        <Button asChild>
          <Link href="/admin/invoices/new">Create Invoice</Link>
        </Button>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice #</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Invoice Status</TableHead>
            <TableHead>Payment Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices?.map((inv) => (
            <TableRow key={inv.id}>
              <TableCell>
                <Link href={`/admin/invoices/${inv.id}`} className="font-medium underline">
                  {inv.invoice_number}
                </Link>
              </TableCell>
              <TableCell>
                <div>{inv.client_name}</div>
                <div className="text-sm text-muted-foreground">{inv.client_email}</div>
              </TableCell>
              <TableCell>${Number(inv.total_amount).toFixed(2)}</TableCell>
              <TableCell>{new Date(inv.due_date).toLocaleDateString()}</TableCell>
              <TableCell>
                <Badge variant={invoiceStatusVariant[inv.invoice_status]}>{inv.invoice_status}</Badge>
              </TableCell>
              <TableCell>
                <Badge variant={paymentStatusVariant[inv.payment_status]}>
                  {inv.payment_status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}