import { getProducts } from '@/lib/data'; // fetch from products table
import { InvoiceForm } from './invoice-form';

export default async function NewInvoicePage() {
  const products = await getProducts(); // { id, name, price }
  return <InvoiceForm products={products} />;
}