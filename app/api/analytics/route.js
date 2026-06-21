import { BetaAnalyticsDataClient } from '@google-analytics/data';
import { NextResponse } from 'next/server';

// Initialize the client with environment variables
const analyticsDataClient = new BetaAnalyticsDataClient({
  credentials: {
    client_email: process.env.GA_CLIENT_EMAIL,
    private_key: process.env.GA_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
});

export async function GET() {
  const propertyId = process.env.GA_PROPERTY_ID;

  try {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [
        {
          startDate: '7daysAgo',
          endDate: 'today',
        },
      ],
      dimensions: [
        { name: 'date' } // Grabs the date of the traffic
      ],
      metrics: [
        { name: 'activeUsers' }, // Grabs the visitor count
        { name: 'screenPageViews' } // Grabs the total page views
      ],
    });

    // --- STEP 2: DATA TRANSFORMATION ---
    // GA4 returns data in a deeply nested rows/values format. 
    // We map it here into a flat array of objects that Recharts natively expects.
    const formattedData = response.rows?.map((row) => {
      // GA4 returns dates as 'YYYYMMDD'. Let's make it look nicer (e.g., 'MM/DD')
      const rawDate = row.dimensionValues?.[0]?.value || '';
      const formattedDate = rawDate 
        ? `${rawDate.substring(4, 6)}/${rawDate.substring(6, 8)}` 
        : '';

      return {
        date: formattedDate,
        activeUsers: parseInt(row.metricValues?.[0]?.value || '0', 10),
        pageViews: parseInt(row.metricValues?.[1]?.value || '0', 10),
      };
    });

    // Recharts handles chronological order best, so sort by date ascending
    const sortedData = formattedData?.sort((a, b) => a.date.localeCompare(b.date)) || [];

    return NextResponse.json(sortedData);
  } catch (error) {
  console.error('GA4 API Error:', error);
  console.error('Error details:', JSON.stringify(error, null, 2));
  return NextResponse.json({ error: 'Failed to fetch analytics data', details: error.message }, { status: 500 });
  }
}