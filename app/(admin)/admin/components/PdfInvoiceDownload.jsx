'use client';

export default function PdfInvoiceDownload({ invoice }) {
  const buildInvoiceHtml = () => {
    const issueDate = new Date(invoice.issued_at || invoice.created_at || Date.now()).toLocaleDateString();
    const dueDate = invoice.due_date ? new Date(invoice.due_date).toLocaleDateString() : 'N/A';
    const amount = Number(invoice.total_amount || 0).toLocaleString();
    const paid = Number(invoice.paid_amount || 0).toLocaleString();

    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Invoice ${invoice.invoice_number}</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; margin: 32px; color: #111827; }
          .invoice-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 32px; }
          .invoice-title { font-size: 28px; font-weight: 700; margin: 0; }
          .invoice-subtitle { margin: 8px 0 0; color: #6b7280; }
          .section { margin-bottom: 24px; }
          .section h2 { font-size: 14px; text-transform: uppercase; letter-spacing: 0.15em; color: #6b7280; margin-bottom: 12px; }
          .section p, .section div { margin: 0; line-height: 1.6; }
          .summary { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; }
          .summary-card { padding: 16px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 18px; }
          .summary-card strong { display: block; font-size: 12px; text-transform: uppercase; letter-spacing: 0.12em; color: #6b7280; margin-bottom: 8px; }
          .summary-card span { display: block; font-size: 20px; font-weight: 700; color: #111827; }
          .notes { margin-top: 24px; color: #374151; }
        </style>
      </head>
      <body>
        <div class="invoice-header">
          <div>
            <p class="invoice-title">Invoice ${invoice.invoice_number}</p>
            <p class="invoice-subtitle">Print and design services invoice</p>
          </div>
          <div style="text-align: right;">
            <p><strong>Issued:</strong> ${issueDate}</p>
            <p><strong>Due:</strong> ${dueDate}</p>
          </div>
        </div>

        <div class="section">
          <h2>Billed to</h2>
          <p>${invoice.print_orders?.customers?.name || 'Customer Name'}</p>
          <p>${invoice.print_orders?.customers?.company || ''}</p>
          <p>${invoice.print_orders?.customers?.email || ''}</p>
        </div>

        <div class="section summary">
          <div class="summary-card">
            <strong>Total</strong>
            <span>KES ${amount}</span>
          </div>
          <div class="summary-card">
            <strong>Paid</strong>
            <span>KES ${paid}</span>
          </div>
        </div>

        <div class="section">
          <h2>Invoice notes</h2>
          <div class="notes">${invoice.notes || 'No additional notes.'}</div>
        </div>

        <div class="section">
          <h2>Order details</h2>
          <div class="notes">${invoice.print_orders?.job_type || 'Print order details not available.'}</div>
        </div>
      </body>
      </html>
    `;
  };

  const openPrintableInvoice = () => {
    const invoiceHtml = buildInvoiceHtml();
    const popup = window.open('', '_blank');
    if (!popup) return;
    popup.document.open();
    popup.document.write(invoiceHtml);
    popup.document.close();
    popup.focus();
  };

  return (
    <button
      type="button"
      onClick={openPrintableInvoice}
      className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
    >
      Export PDF
    </button>
  );
}
