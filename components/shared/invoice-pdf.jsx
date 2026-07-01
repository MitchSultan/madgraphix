// import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// const styles = StyleSheet.create({
//   page: { padding: 40, fontSize: 11, fontFamily: 'Helvetica' },
//   header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 },
//   companyName: { fontSize: 20, fontWeight: 'bold' },
//   invoiceTitle: { fontSize: 24, fontWeight: 'bold', color: '#1e40af' },
//   section: { marginBottom: 20 },
//   table: { width: '100%', marginTop: 10 },
//   tableRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#eee', paddingVertical: 4 },
//   tableHeader: { backgroundColor: '#f3f4f6', fontWeight: 'bold' },
//   tableCell: { flex: 1 },
//   totals: { marginTop: 20, alignItems: 'flex-end' },
//   brand: { position: 'absolute', bottom: 30, left: 40, right: 40, textAlign: 'center', color: '#888' },
// });

// export function InvoicePDF({ invoice, items }) {
//   const subtotal = Number(invoice.subtotal);
//   const discount = Number(invoice.discount_amount);
//   const tax = Number(invoice.tax_amount);
//   const total = Number(invoice.total_amount);

//   return (
//     <Document>
//       <Page size="A4" style={styles.page}>
        
//         <View style={styles.header}>
//           <View>
//             <Text style={styles.companyName}>Your Company Ltd.</Text>
//             <Text>123 Business Park, Nairobi</Text>
//             <Text>+254 712 345 678</Text>
//             <Text>info@yourcompany.com</Text>
//           </View>
//           <View>
//             <Text style={styles.invoiceTitle}>INVOICE</Text>
//             <Text>#{invoice.invoice_number}</Text>
//           </View>
//         </View>

        
//         <View style={styles.section}>
//           <Text style={{ fontWeight: 'bold' }}>Bill To:</Text>
//           <Text>{invoice.client_name}</Text>
//           <Text>{invoice.client_email}</Text>
//         </View>

        
//         <View style={{ flexDirection: 'row', gap: 40, marginBottom: 20 }}>
//           <View><Text style={{ fontWeight: 'bold' }}>Issue Date:</Text><Text>{new Date(invoice.issued_at).toLocaleDateString()}</Text></View>
//           <View><Text style={{ fontWeight: 'bold' }}>Due Date:</Text><Text>{new Date(invoice.due_date).toLocaleDateString()}</Text></View>
//         </View>

        
//         <View style={styles.table}>
//           <View style={[styles.tableRow, styles.tableHeader]}>
//             <Text style={[styles.tableCell, { flex: 2 }]}>Description</Text>
//             <Text style={styles.tableCell}>Qty</Text>
//             <Text style={styles.tableCell}>Unit Price</Text>
//             <Text style={styles.tableCell}>Amount</Text>
//           </View>
//           {items.map((item, i) => (
//             <View style={styles.tableRow} key={i}>
//               <Text style={[styles.tableCell, { flex: 2 }]}>{item.description}</Text>
//               <Text style={styles.tableCell}>{item.quantity}</Text>
//               <Text style={styles.tableCell}>{Number(item.unit_price).toFixed(2)}</Text>
//               <Text style={styles.tableCell}>{(item.quantity * item.unit_price).toFixed(2)}</Text>
//             </View>
//           ))}
//         </View>

        
//         <View style={styles.totals}>
//           <Text>Subtotal: {subtotal.toFixed(2)}</Text>
//           <Text>Discount: -{discount.toFixed(2)}</Text>
//           <Text>Tax ({invoice.tax_rate}%): {tax.toFixed(2)}</Text>
//           <Text style={{ fontWeight: 'bold', marginTop: 4 }}>Total: {total.toFixed(2)}</Text>
//         </View>

        
//         <Text style={styles.brand}>Thank you for your business!</Text>
//       </Page>
//     </Document>
//   );
// }




import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// ── Palette ───────────────────────────────────────────────────────
const C = {
  navy:   '#1e3a8a',
  border: '#e5e7eb',
  muted:  '#6b7280',
  body:   '#1f2937',
  altRow: '#f9fafb',
  black:  '#111827',
};

// ── Number formatter (comma-separated, no toLocaleString reliance) ─
const fmt = (value, dp = 2) => {
  const n = Number(value || 0).toFixed(dp);
  const [int, dec] = n.split('.');
  const comma = int.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return dp > 0 ? `${comma}.${dec}` : comma;
};

// ── Date formatter → DD/MM/YYYY ───────────────────────────────────
const fmtDate = (d) => {
  if (!d) return '';
  try {
    const dt = new Date(d);
    const dd   = String(dt.getDate()).padStart(2, '0');
    const mm   = String(dt.getMonth() + 1).padStart(2, '0');
    const yyyy = dt.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  } catch {
    return String(d);
  }
};

// ── Styles ────────────────────────────────────────────────────────
const s = StyleSheet.create({
  page: {
    padding: 44,
    fontSize: 10,
    fontFamily: 'Helvetica',
    backgroundColor: '#ffffff',
  },

  /* ── Header ─────────────────────────────────────── */
  hdr: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingBottom: 16,
    marginBottom: 22,
    borderBottomWidth: 1.5,
    borderBottomColor: C.border,
  },
  coName: {
    fontSize: 15,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 6,
  },
  coMeta: {
    fontSize: 8.5,
    color: C.muted,
    marginTop: 2,
  },
  receiptTitle: {
    fontSize: 22,
    fontFamily: 'Helvetica-Bold',
    color: C.black,
  },

  /* ── Bill-To / Receipt Meta row ──────────────────── */
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  btLabel: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: C.muted,
    marginBottom: 6,
  },
  clName: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 2,
  },
  clCity: {
    fontSize: 10,
    color: '#374151',
  },
  metaLine: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 4,
  },
  mLabel: {
    fontSize: 9,
    color: C.muted,
    marginRight: 8,
    minWidth: 95,
    textAlign: 'right',
  },
  mValue: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    minWidth: 80,
    textAlign: 'right',
  },

  /* ── Table ───────────────────────────────────────── */
  tbl: { width: '100%' },

  tHdr: {
    flexDirection: 'row',
    backgroundColor: C.navy,
    paddingVertical: 7,
    paddingHorizontal: 5,
  },
  tHdrTxt: {
    fontSize: 8.5,
    fontFamily: 'Helvetica-Bold',
    color: '#ffffff',
  },

  tRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingVertical: 6,
    paddingHorizontal: 5,
  },
  tRowAlt: { backgroundColor: C.altRow },
  tTxt: { fontSize: 9, color: C.body },

  // Column definitions — must total 100%
  cSvc: { width: '16%' },
  cDsc: { width: '42%' },
  cQty: { width: '12%', textAlign: 'right' },
  cRte: { width: '15%', textAlign: 'right' },
  cAmt: { width: '15%', textAlign: 'right' },

  /* ── Totals area ─────────────────────────────────── */
  totArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 22,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: C.border,
  },
  tyText: {
    fontSize: 9.5,
    fontFamily: 'Helvetica-Oblique',
    color: C.muted,
  },
  totBlock: { alignItems: 'flex-end' },
  totLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    minWidth: 230,
    marginBottom: 3,
  },
  totKey: {
    fontSize: 10.5,
    fontFamily: 'Helvetica-Bold',
    marginRight: 24,
  },
  totVal: {
    fontSize: 10.5,
    fontFamily: 'Helvetica-Bold',
  },

  /* ── Balance Due ─────────────────────────────────── */
  balRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: C.black,
  },
  balTxt: {
    fontSize: 10.5,
    fontFamily: 'Helvetica-Bold',
  },
});

// ── Component ─────────────────────────────────────────────────────
/**
 * InvoicePDF
 *
 * Props:
 *   invoice {object}
 *     .invoice_number   | .receipt_number   — e.g. "MAD 2026-028"
 *     .issued_at        | .date             — ISO date string or Date
 *     .payment_method                       — e.g. "Cash", "M-Pesa"
 *     .client_name                          — e.g. "BAGWARE LIMITED"
 *     .client_city      | .client_location  — e.g. "NAIROBI"
 *     .total_amount                         — numeric
 *     .balance_due                          — numeric (0 if fully paid)
 *
 *   items {array}
 *     .service     | .service_type | .category — e.g. "Printing"
 *     .description                              — e.g. "Tailor codes Printing"
 *     .quantity                                 — numeric
 *     .unit_price  | .rate                      — numeric
 *     .amount      (optional, calculated if absent)
 *
 *   company {object} (optional — defaults to MadGraphix company)
 *     .name  .country  .phone  .email  .website
 */
export function InvoicePDF({ invoice, items, company }) {
  const total   = Number(invoice.total_amount || 0);
  const balance = Number(invoice.balance_due ?? 0);

  const co = company ?? {
    name:    'Mirror Arts Designs Graphix Ltd',
    country: 'KEN',
    phone:   '+254729929108',
    email:   'mirrorartsdesign@gmail.com',
    website: 'www.madgraphix.co.ke',
  };

  return (
    <Document>
      <Page size="A4" style={s.page}>

        {/* ── HEADER ──────────────────────────────────────── */}
        <View style={s.hdr}>
          <View>
            <Text style={s.coName}>{co.name}</Text>
            <Text style={s.coMeta}>{co.country}</Text>
            <Text style={s.coMeta}>{co.phone}</Text>
            <Text style={s.coMeta}>{co.email}</Text>
            <Text style={s.coMeta}>{co.website}</Text>
          </View>
          <Text style={s.receiptTitle}>SALES RECEIPT</Text>
        </View>

        {/* ── BILL TO + RECEIPT META ───────────────────────── */}
        <View style={s.infoRow}>
          {/* Left: client */}
          <View>
            <Text style={s.btLabel}>BILL TO</Text>
            <Text style={s.clName}>{invoice.client_name}</Text>
            <Text style={s.clCity}>
              {invoice.client_city ?? invoice.client_location ?? ''}
            </Text>
          </View>

          {/* Right: receipt details */}
          <View>
            <View style={s.metaLine}>
              <Text style={s.mLabel}>SALES</Text>
              <Text style={s.mValue}>
                {invoice.invoice_number ?? invoice.receipt_number ?? ''}
              </Text>
            </View>
            <View style={s.metaLine}>
              <Text style={s.mLabel}>DATE</Text>
              <Text style={s.mValue}>
                {fmtDate(invoice.issued_at ?? invoice.date)}
              </Text>
            </View>
            <View style={s.metaLine}>
              <Text style={s.mLabel}>PAYMENT METHOD</Text>
              <Text style={s.mValue}>
                {invoice.payment_method ?? 'Cash'}
              </Text>
            </View>
          </View>
        </View>

        {/* ── ITEMS TABLE ─────────────────────────────────── */}
        <View style={s.tbl}>
          {/* Header row */}
          <View style={s.tHdr}>
            <Text style={[s.tHdrTxt, s.cSvc]}>SERVICE</Text>
            <Text style={[s.tHdrTxt, s.cDsc]}>DESCRIPTION</Text>
            <Text style={[s.tHdrTxt, s.cQty]}>QTY</Text>
            <Text style={[s.tHdrTxt, s.cRte]}>RATE</Text>
            <Text style={[s.tHdrTxt, s.cAmt]}>AMOUNT</Text>
          </View>

          {/* Data rows */}
          {items.map((item, i) => {
            const qty    = Number(item.quantity || 0);
            const rate   = Number(item.unit_price ?? item.rate ?? 0);
            const amount = Number(item.amount ?? qty * rate);
            return (
              <View
                key={i}
                style={[s.tRow, i % 2 === 1 && s.tRowAlt]}
              >
                <Text style={[s.tTxt, s.cSvc]}>
                  {item.service ?? item.service_type ?? item.category ?? ''}
                </Text>
                <Text style={[s.tTxt, s.cDsc]}>{item.description}</Text>
                <Text style={[s.tTxt, s.cQty]}>{fmt(qty, 0)}</Text>
                <Text style={[s.tTxt, s.cRte]}>{fmt(rate)}</Text>
                <Text style={[s.tTxt, s.cAmt]}>{fmt(amount)}</Text>
              </View>
            );
          })}
        </View>

        {/* ── TOTALS ──────────────────────────────────────── */}
        <View style={s.totArea}>
          <Text style={s.tyText}>Thank You for Your Business</Text>
          <View style={s.totBlock}>
            <View style={s.totLine}>
              <Text style={s.totKey}>TOTAL</Text>
              <Text style={s.totVal}>{fmt(total)}</Text>
            </View>
          </View>
        </View>

        {/* ── BALANCE DUE ─────────────────────────────────── */}
        <View style={s.balRow}>
          <Text style={s.balTxt}>BALANCE DUE</Text>
          <Text style={s.balTxt}>Ksh{fmt(balance)}</Text>
        </View>

      </Page>
    </Document>
  );
}