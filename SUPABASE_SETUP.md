# Supabase Database Setup Guide for MAD Graphix

## 1. Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in:
   - **Name**: MAD Graphix
   - **Database Password**: (create a strong password)
   - **Region**: Choose closest to your users
5. Click "Create new project"

## 2. Get Your API Keys

1. Go to **Project Settings** > **API**
2. Copy these values:
   - **Project URL**: `https://xxxxxxxxxxxxx.supabase.co`
   - **anon/public key**: `eyJhbGciOiJIUzI1...`

## 3. Create Environment File

Create a file `.env.local` in your project root with:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
ADMIN_EMAIL=your-admin@email.com
```

## 4. Create Database Tables

Go to **SQL Editor** in Supabase and run these commands:

### Table 1: Analytics (for tracking page visits)

```sql
-- Create analytics table
CREATE TABLE analytics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  visitor_id TEXT NOT NULL,
  location TEXT,
  page_path TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for better performance
CREATE INDEX idx_analytics_visitor_id ON analytics(visitor_id);
CREATE INDEX idx_analytics_created_at ON analytics(created_at);

-- Enable Row Level Security
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts from anyone
CREATE POLICY "Allow public inserts" ON analytics
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create policy to allow authenticated users to read
CREATE POLICY "Allow authenticated reads" ON analytics
  FOR SELECT
  TO authenticated
  USING (true);
```

### Table 2: Items (for CRUD operations)

```sql
-- Create items table
CREATE TABLE items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE items ENABLE ROW LEVEL SECURITY;

-- Allow public to read items
CREATE POLICY "Allow public reads" ON items
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Only authenticated users can insert/update/delete
CREATE POLICY "Allow authenticated inserts" ON items
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated updates" ON items
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated deletes" ON items
  FOR DELETE
  TO authenticated
  USING (true);
```

## 5. Set Up Authentication

1. Go to **Authentication** > **Providers**
2. Enable **Email** provider
3. Go to **Authentication** > **Users**
4. Click "Add User" > "Create new user"
5. Enter your admin email and password
6. This will be your login credentials

## 6. Optional: Create Analytics Tracking Function

Add this to your pages to track visits:

```javascript
// utils/analytics.js
import { supabaseBrowser } from '@/lib/supabase/client';

export async function trackPageView(pagePath) {
  const supabase = supabaseBrowser();
  
  // Get or create visitor ID
  let visitorId = localStorage.getItem('visitor_id');
  if (!visitorId) {
    visitorId = crypto.randomUUID();
    localStorage.setItem('visitor_id', visitorId);
  }

  // Get location (you can use a geolocation API)
  let location = 'Unknown';
  try {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    location = `${data.city}, ${data.country_name}`;
  } catch (error) {
    console.error('Error fetching location:', error);
  }

  // Track the page view
  await supabase.from('analytics').insert({
    visitor_id: visitorId,
    location,
    page_path: pagePath,
    user_agent: navigator.userAgent,
  });
}
```

Then use it in your pages:

```javascript
'use client';
import { useEffect } from 'react';
import { trackPageView } from '@/utils/analytics';

export default function YourPage() {
  useEffect(() => {
    trackPageView(window.location.pathname);
  }, []);

  return (
    // your page content
  );
}
```

## 7. Test Your Setup

1. Run your development server: `npm run dev`
2. Visit `http://localhost:3000/login`
3. Login with your admin credentials
4. You should be redirected to `/admin` dashboard

## Troubleshooting

- **"Invalid API key"**: Double-check your `.env.local` file
- **"Not authenticated"**: Make sure you created a user in Supabase
- **Database errors**: Verify all tables are created correctly
- **Middleware redirect loop**: Check your `ADMIN_EMAIL` matches the user you created

## Next Steps

1. ✅ Customize the dashboard UI
2. ✅ Add more analytics tracking
3. ✅ Create API routes for CRUD operations
4. ✅ Add image upload functionality
5. ✅ Implement data visualization charts
