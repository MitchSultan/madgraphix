import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 11, fontFamily: 'Helvetica' },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 },
  companyName: { fontSize: 20, fontWeight: 'bold' },
  invoiceTitle: { fontSize: 24, fontWeight: 'bold', color: '#1e40af' },
  section: { marginBottom: 20 },
  table: { width: '100%', marginTop: 10 },
  tableRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#eee', paddingVertical: 4 },
  tableHeader: { backgroundColor: '#f3f4f6', fontWeight: 'bold' },
  tableCell: { flex: 1 },
  totals: { marginTop: 20, alignItems: 'flex-end' },
  brand: { position: 'absolute', bottom: 30, left: 40, right: 40, textAlign: 'center', color: '#888' },
});

export function InvoicePDF({ invoice, items }) {
  const subtotal = Number(invoice.subtotal);
  const discount = Number(invoice.discount_amount);
  const tax = Number(invoice.tax_amount);
  const total = Number(invoice.total_amount);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Brand Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.companyName}>Your Company Ltd.</Text>
            <Text>123 Business Park, Nairobi</Text>
            <Text>+254 712 345 678</Text>
            <Text>info@yourcompany.com</Text>
          </View>
          <View>
            <Text style={styles.invoiceTitle}>INVOICE</Text>
            <Text>#{invoice.invoice_number}</Text>
          </View>
        </View>

        {/* Bill To */}
        <View style={styles.section}>
          <Text style={{ fontWeight: 'bold' }}>Bill To:</Text>
          <Text>{invoice.client_name}</Text>
          <Text>{invoice.client_email}</Text>
        </View>

        {/* Dates */}
        <View style={{ flexDirection: 'row', gap: 40, marginBottom: 20 }}>
          <View><Text style={{ fontWeight: 'bold' }}>Issue Date:</Text><Text>{new Date(invoice.issued_at).toLocaleDateString()}</Text></View>
          <View><Text style={{ fontWeight: 'bold' }}>Due Date:</Text><Text>{new Date(invoice.due_date).toLocaleDateString()}</Text></View>
        </View>

        {/* Items Table */}
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={[styles.tableCell, { flex: 2 }]}>Description</Text>
            <Text style={styles.tableCell}>Qty</Text>
            <Text style={styles.tableCell}>Unit Price</Text>
            <Text style={styles.tableCell}>Amount</Text>
          </View>
          {items.map((item, i) => (
            <View style={styles.tableRow} key={i}>
              <Text style={[styles.tableCell, { flex: 2 }]}>{item.description}</Text>
              <Text style={styles.tableCell}>{item.quantity}</Text>
              <Text style={styles.tableCell}>{Number(item.unit_price).toFixed(2)}</Text>
              <Text style={styles.tableCell}>{(item.quantity * item.unit_price).toFixed(2)}</Text>
            </View>
          ))}
        </View>

        {/* Totals */}
        <View style={styles.totals}>
          <Text>Subtotal: {subtotal.toFixed(2)}</Text>
          <Text>Discount: -{discount.toFixed(2)}</Text>
          <Text>Tax ({invoice.tax_rate}%): {tax.toFixed(2)}</Text>
          <Text style={{ fontWeight: 'bold', marginTop: 4 }}>Total: {total.toFixed(2)}</Text>
        </View>

        {/* Footer */}
        <Text style={styles.brand}>Thank you for your business!</Text>
      </Page>
    </Document>
  );
}