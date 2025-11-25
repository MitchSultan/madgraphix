# 🚀 Quick Start Guide - Supabase Integration for MAD Graphix

## ✅ What's Been Set Up

I've successfully integrated Supabase into your Next.js project with the following:

### 📦 Installed Packages
- ✅ `@supabase/ssr` - For server-side Supabase authentication
- ✅ `@supabase/supabase-js` - Already installed

### 📁 Files Created/Updated

1. **`/lib/supabase/client.js`** - Browser client for Supabase
2. **`/lib/supabase/server.js`** - Server client with cookie handling
3. **`/middleware.js`** - Route protection for `/admin` routes
4. **`/app/login/page.js`** - Beautiful login page with glassmorphism
5. **`/app/admin/page.js`** - Comprehensive admin dashboard
6. **`/lib/utils/analytics.js`** - Analytics tracking utilities
7. **`/app/api/items/route.js`** - CRUD API for items
8. **`/app/api/analytics/route.js`** - Analytics API endpoints

## 📝 Next Steps (Follow in Order)

### 1️⃣ Create Supabase Account & Project
1. Go to https://supabase.com
2. Sign up/Login
3. Create a new project named "MAD Graphix"
4. Wait for project to be ready (~2 minutes)

### 2️⃣ Get Your API Credentials
1. In Supabase Dashboard, go to **Settings** → **API**
2. Copy:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public key** (starts with `eyJhbGciOi...`)

### 3️⃣ Create Environment File
Create a file named `.env.local` in your project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
ADMIN_EMAIL=your-email@example.com
```

⚠️ **Important**: Replace the values with your actual Supabase credentials!

### 4️⃣ Set Up Database Tables
In Supabase Dashboard:
1. Go to **SQL Editor**
2. Click **New Query**
3. Copy and paste the SQL from `SUPABASE_SETUP.md`
4. Click **Run**

The schema creates:
- `analytics` table - for tracking page visits and locations
- `items` table - for CRUD operations in the dashboard

### 5️⃣ Create Admin User
1. In Supabase, go to **Authentication** → **Users**
2. Click **Add User** → **Create new user**
3. Enter:
   - **Email**: Same as `ADMIN_EMAIL` in `.env.local`
   - **Password**: Create a secure password
4. Click **Create User**

### 6️⃣ Test Your Setup
1. Make sure your dev server is running: `npm run dev`
2. Visit `http://localhost:3000/login`
3. Login with your admin credentials
4. You should see the admin dashboard! 🎉

## 🎨 Dashboard Features

### Analytics Section
- **Total Page Views** - Track all page visits
- **Unique Visitors** - Count unique users
- **Top Locations** - See where your visitors are from
- **Location Table** - Detailed breakdown with percentages

### CRUD Operations
- **View Items** - See all items in a table
- **Add New** - Create new items
- **Edit** - Update existing items
- **Delete** - Remove items with confirmation

## 📊 Adding Analytics to Your Pages

To track page views on any page, add this code:

```javascript
'use client';
import { useEffect } from 'react';
import { trackPageView } from '@/lib/utils/analytics';

export default function YourPage() {
  useEffect(() => {
    trackPageView(window.location.pathname);
  }, []);

  return (
    // Your page content
  );
}
```

## 🔒 Security Notes

- ✅ Middleware protects `/admin` routes - only authenticated users can access
- ✅ Email verification ensures only your admin email can access the dashboard
- ✅ Row Level Security (RLS) is enabled on all tables
- ✅ API routes check authentication before allowing CRUD operations

## 🛠️ API Endpoints

### Items API (`/api/items`)
- `GET` - Fetch all items
- `POST` - Create new item (requires auth)
- `PUT` - Update item (requires auth)
- `DELETE` - Delete item (requires auth)

### Analytics API (`/api/analytics`)
- `GET` - Fetch analytics data (requires auth)
- `POST` - Track page view (public)

## 🎯 Customization Ideas

1. **Add Charts** - Install `recharts` for data visualization
2. **Real-time Updates** - Use Supabase Realtime subscriptions
3. **File Uploads** - Implement Supabase Storage for images
4. **Email Notifications** - Set up alerts for new visitors
5. **Export Data** - Add CSV/PDF export functionality

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| "Invalid API key" | Check `.env.local` has correct values |
| Can't login | Verify user exists in Supabase Auth |
| Redirect loop | Ensure `ADMIN_EMAIL` matches your user |
| Database errors | Run SQL setup script again |
| Analytics not tracking | Check browser console for errors |

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Supabase SSR Guide](https://supabase.com/docs/guides/auth/server-side/nextjs)

---

Need help? Check `SUPABASE_SETUP.md` for detailed setup instructions.
