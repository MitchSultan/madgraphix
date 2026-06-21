// components/AnalyticsDashboard.tsx
'use client'

import { useEffect, useState } from 'react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar,
} from 'recharts'

export default function AnalyticsDashboard() {
  const [daily, setDaily] = useState([])
  const [countries, setCountries] = useState([])
  const [pages, setPages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      try {
        const [resDaily, resCountries, resPages] = await Promise.all([
          fetch('/api/analytics'),      // your existing daily route
          fetch('/api/analytics/countries'),
          fetch('/api/analytics/pages'),
        ])

        const dailyData = await resDaily.json()
        const countriesData = await resCountries.json()
        const pagesData = await resPages.json()

        setDaily(dailyData || [])
        setCountries(countriesData || [])
        setPages(pagesData || [])
      } catch (error) {
        console.error('Dashboard fetch error:', error)
      }
      setLoading(false)
    }

    fetchData()
  }, [])

  if (loading) return <div className="p-4">Loading analytics...</div>

  return (
    <div className="p-4 space-y-8">
      <h1 className="text-2xl font-bold">Analytics Dashboard</h1>

      {/* Daily Active Users & Page Views */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Active Users & Page Views (7 days)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={daily}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="activeUsers" stroke="#8884d8" name="Active Users" />
            <Line type="monotone" dataKey="pageViews" stroke="#82ca9d" name="Page Views" />
          </LineChart>
        </ResponsiveContainer>
      </section>

      {/* Users by Country */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Users by Country (Top 20)</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={countries} layout="vertical" margin={{ left: 50 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="country" type="category" />
            <Tooltip />
            <Bar dataKey="activeUsers" fill="#8884d8" name="Active Users" />
          </BarChart>
        </ResponsiveContainer>
      </section>

      {/* Most Visited Pages */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Most Visited Pages (7 days)</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Page Path</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Views</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {pages.map((page, idx) => (
                <tr key={idx}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{page.path}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{page.views.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}