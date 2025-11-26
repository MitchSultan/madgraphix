// Email templates for order notifications

/**
 * Admin email template - sent when new order is placed
 */
export function getAdminOrderNotificationEmail(order) {
  const itemsList = order.order_items
    .map(item => `
      <tr style="border-bottom: 1px solid #e5e7eb;">
        <td style="padding: 12px 8px;">${item.products?.name || 'Unknown Product'}</td>
        <td style="padding: 12px 8px;">${item.quantity}</td>
        <td style="padding: 12px 8px;">${item.color || '-'}</td>
        <td style="padding: 12px 8px;">${item.size || '-'}</td>
        <td style="padding: 12px 8px;">${item.custom_text || '-'}</td>
      </tr>
    `)
    .join('')

  return {
    subject: `🔔 New Order: ${order.order_number}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #374151; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #3b82f6, #2563eb); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">New Order Received!</h1>
        </div>
        
        <div style="background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
          <h2 style="color: #1f2937; margin-top: 0;">Order ${order.order_number}</h2>
          
          <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="margin-top: 0; color: #1f2937;">Client Information</h3>
            <p style="margin: 5px 0;"><strong>Name:</strong> ${order.user_profiles?.full_name || 'N/A'}</p>
            <p style="margin: 5px 0;"><strong>Email:</strong> ${order.user_profiles?.email}</p>
            ${order.user_profiles?.company_name ? `<p style="margin: 5px 0;"><strong>Company:</strong> ${order.user_profiles.company_name}</p>` : ''}
            ${order.user_profiles?.phone ? `<p style="margin: 5px 0;"><strong>Phone:</strong> ${order.user_profiles.phone}</p>` : ''}
          </div>
          
          <h3 style="color: #1f2937;">Order Items</h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <thead>
              <tr style="background: #f3f4f6; text-align: left;">
                <th style="padding: 12px 8px; font-weight: 600; color: #6b7280;">Product</th>
                <th style="padding: 12px 8px; font-weight: 600; color: #6b7280;">Qty</th>
                <th style="padding: 12px 8px; font-weight: 600; color: #6b7280;">Color</th>
                <th style="padding: 12px 8px; font-weight: 600; color: #6b7280;">Size</th>
                <th style="padding: 12px 8px; font-weight: 600; color: #6b7280;">Custom Text</th>
              </tr>
            </thead>
            <tbody>
              ${itemsList}
            </tbody>
          </table>
          
          ${order.notes ? `
            <div style="background: #fef3c7; padding: 15px; border-radius: 8px; border-left: 4px solid #f59e0b;">
              <h4 style="margin-top: 0; color: #92400e;">Special Notes</h4>
              <p style="margin-bottom: 0; color: #78350f;">${order.notes}</p>
            </div>
          ` : ''}
          
          <div style="margin-top: 30px; text-align: center;">
            <a href="https://www.madgraphix.co.ke/admin/orders" 
               style="display: inline-block; background: linear-gradient(135deg, #3b82f6, #2563eb); color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; font-weight: 600;">
              View in Dashboard
            </a>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 20px; color: #9ca3af; font-size: 14px;">
          <p>MAD Graphix Order Management System</p>
        </div>
      </body>
      </html>
    `
  }
}

/**
 * Client confirmation email template
 */
export function getClientConfirmationEmail(order) {
  const itemsList = order.order_items
    .map(item => `
      <li style="margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid #e5e7eb;">
        <strong style="color: #1f2937; font-size: 16px;">${item.products?.name}</strong><br>
        <span style="color: #6b7280; font-size: 14px;">
          Quantity: ${item.quantity}
          ${item.color ? ` • Color: ${item.color}` : ''}
          ${item.size ? ` • Size: ${item.size}` : ''}
          ${item.custom_text ? `<br>Custom Text: "${item.custom_text}"` : ''}
        </span>
      </li>
    `)
    .join('')

  return {
    subject: `✅ Order Confirmation: ${order.order_number}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #374151; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #10b981, #059669); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">Thank You for Your Order!</h1>
        </div>
        
        <div style="background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
          <p style="font-size: 16px; color: #1f2937;">Hi ${order.user_profiles?.full_name || 'there'},</p>
          
          <p style="font-size: 16px; color: #374151;">We've received your order and will review it shortly. You'll receive a confirmation and invoice once we've processed your request.</p>
          
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="margin-top: 0; color: #1f2937; font-size: 20px;">Order ${order.order_number}</h2>
            <p style="margin: 5px 0; color: #6b7280;">Status: <span style="background: #fef3c7; color: #92400e; padding: 4px 12px; border-radius: 12px; font-size: 14px; font-weight: 600;">Pending</span></p>
          </div>
          
          <h3 style="color: #1f2937; margin-top: 25px;">Your Items</h3>
          <ul style="list-style: none; padding: 0; margin: 0;">
            ${itemsList}
          </ul>
          
          ${order.notes ? `
            <div style="background: #eff6ff; padding: 15px; border-radius: 8px; margin-top: 20px; border-left: 4px solid #3b82f6;">
              <h4 style="margin-top: 0; color: #1e40af;">Your Notes</h4>
              <p style="margin-bottom: 0; color: #1e3a8a;">${order.notes}</p>
            </div>
          ` : ''}
          
          <div style="margin-top: 30px; text-align: center;">
            <a href="https://www.madgraphix.co.ke/orders" 
               style="display: inline-block; background: linear-gradient(135deg, #3b82f6, #2563eb); color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; font-weight: 600;">
              Track Your Order
            </a>
          </div>
          
          <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin-top: 30px; border: 1px solid #e5e7eb;">
            <h4 style="margin-top: 0; color: #1f2937;">Next Steps</h4>
            <ol style="margin: 10px 0; padding-left: 20px; color: #6b7280;">
              <li>We'll review your order details</li>
              <li>You'll receive an invoice for confirmation</li>
              <li>Once confirmed, we'll start production</li>
              <li>You'll be notified when your order is ready</li>
            </ol>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 20px; color: #9ca3af; font-size: 14px;">
          <p>MAD Graphix - Quality Printing Services</p>
          <p>Questions? Reply to this email or call us!</p>
        </div>
      </body>
      </html>
    `
  }
}
