# Order Management System - Setup Guide

This guide will help you set up the complete order management system for MAD Graphix.

## Prerequisites

- Supabase account (you already have this)
- Resend API key (already configured: `re_9eQZyLoS_HmC3HVTaArgYJmCBmsrk9Zcq`)
- Supabase CLI (for deploying Edge Functions)

## Step 1: Database Setup

### Run the SQL Schema

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Navigate to **SQL Editor**
4. Copy the contents of `supabase/schema.sql`
5. Paste and click **Run**

This will create:
- All necessary tables (products, orders, order_items, user_profiles)
- Row Level Security policies
- Triggers for auto-generating order numbers
- Indexes for performance

### Make Yourself Admin

After running the schema, you need to set your account as admin:

1. In Supabase Dashboard, go to **Table Editor**
2. Select the `user_profiles` table
3. Find your user record (by your email)
4. Set `is_admin` to `TRUE`

## Step 2: Deploy Edge Function (Email Notifications)

### Install Supabase CLI

```powershell
# Using npm
npm install -g supabase

# Or using scoop
scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
scoop install supabase
```

### Deploy the Edge Function

```powershell
# Navigate to your project directory
cd "c:\Users\Hp\Desktop\MAD Graphix\mad"

# Login to Supabase
supabase login

# Link your project (get project ID from Supabase dashboard)
supabase link --project-ref YOUR_PROJECT_ID

# Deploy the Edge Function
supabase functions deploy send-order-notification
```

### Important: Update Admin Email

Before deploying, edit `supabase/functions/send-order-notification/index.js` and change:

```javascript
const ADMIN_EMAIL = 'admin@madgraphix.co.ke' // Change to YOUR actual email
```

## Step 3: Environment Variables (Already Done ✓)

Your `.env.local` file should have:
```
NEXT_PUBLIC_SUPABASE_URL=your-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key
RESEND_API_KEY=re_9eQZyLoS_HmC3HVTaArgYJmCBmsrk9Zcq
```

These are also set on Vercel.

## Step 4: Test the System

### As Admin:

1. Navigate to `/admin/products`
2. Add a few test products with images, colors, and sizes
3. Navigate to `/admin/orders` to see the orders dashboard

### As Client:

1. Login with a different account (not admin)
2. Navigate to `/products`
3. Click on a product to customize it
4. Add items to cart
5. Submit the order
6. Check `/orders` to see your order history

### Verify Emails:

- Admin should receive an email notification
- Client should receive a confirmation email

## Features Overview

### Admin Features (`/admin`)

- **Product Management** (`/admin/products`):
  - Add/edit/delete products
  - Set colors, sizes, and custom text options
  - Activate/deactivate products
  
- **Order Management** (`/admin/orders`):
  - View all orders with statistics
  - Filter by status
  - View client information
  - Update order status through workflow

### Client Features

- **Product Catalog** (`/products`):
  - Browse active products
  - Customize orders (color, size, quantity, custom text)
  - Shopping cart functionality
  
- **Order History** (`/orders`):
  - View all past orders
  - Track order status with timeline
  - View order details

### Email Notifications

- Admin receives detailed order notification
- Client receives order confirmation
- Professional HTML email templates

## Order Workflow

1. **Pending** - Order just submitted
2. **Confirmed** - Admin reviewed and confirmed
3. **In Production** - Order is being made
4. **Completed** - Order is ready

## Security

- **Row Level Security (RLS)**: Clients can only see their own orders
- **Admin Role**: Only admins can manage products and all orders
- **Google OAuth**: Secure authentication via Supabase

## Troubleshooting

### Edge Function not sending emails?

1. Check Supabase Functions logs in dashboard
2. Verify Resend API key is correct
3. Make sure the function is deployed

### Products not showing?

1. Check if products are set to `is_active = true`
2. Verify RLS policies are applied

### Can't access admin pages?

1. Make sure `is_admin = TRUE` in your user_profiles record
2. Clear cookies and re-login

## Next Steps (Optional)

- Add product image upload to Supabase Storage
- Add order search functionality  
- Add email notifications for status updates
- Add invoice generation
- Add payment integration

## Support

For issues, check the Supabase logs and browser console for errors.
