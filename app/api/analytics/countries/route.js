// app/api/analytics/countries/route.js
import { BetaAnalyticsDataClient } from '@google-analytics/data';
import { NextResponse } from 'next/server';

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
      dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
      dimensions: [{ name: 'country' }],
      metrics: [{ name: 'activeUsers' }],
      orderBys: [
        {
          metric: { metricName: 'activeUsers' },
          desc: true,
        },
      ],
      limit: 20, // top 20 countries
    });

    const countries = response.rows?.map(row => ({
      country: row.dimensionValues?.[0]?.value,
      activeUsers: parseInt(row.metricValues?.[0]?.value || '0', 10),
    })) || [];

    return NextResponse.json(countries);
  } catch (error) {
    console.error('GA4 Countries Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}