// import { createClient } from '@/lib/supabase/server'

// export const dynamic = 'force-dynamic'

// export default async function AnalyticsPage() {
//   const supabase = await createClient()

//   const { data: analytics, error } = await supabase
//     .from('analytics')
//     .select('*')
//     .order('created_at', { ascending: false })

//   if (error) {
//     console.error('Error fetching analytics:', error)
//   }

//   // Compute metrics
//   const totalViews = analytics?.length || 0
//   const uniqueVisitors = new Set(analytics?.map((a) => a.visitor_id)).size || 0

//   // Compute Top Pages
//   const pageCounts = analytics?.reduce((acc, item) => {
//     acc[item.page_path] = (acc[item.page_path] || 0) + 1
//     return acc
//   }, {}) || {}
//   const topPages = Object.entries(pageCounts)
//     .sort((a, b) => b[1] - a[1])
//     .slice(0, 5)

//   // Compute Top Locations
//   const locationCounts = analytics?.reduce((acc, item) => {
//     const loc = item.location || 'Unknown'
//     acc[loc] = (acc[loc] || 0) + 1
//     return acc
//   }, {}) || {}
//   const topLocations = Object.entries(locationCounts)
//     .sort((a, b) => b[1] - a[1])
//     .slice(0, 5)

//   const recentActivity = analytics?.slice(0, 10) || []

//   return (
//     <div className=" mx-auto px-4 ">
//       <div>
//         <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Analytics Overview</h1>
//         <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
//           Detailed breakdown of your website traffic and visitor activity.
//         </p>
//       </div>

//       {/* Metrics Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//         <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
//           <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Page Views</p>
//           <p className="mt-2 text-4xl font-bold text-gray-900 dark:text-white">{totalViews}</p>
//         </div>
//         <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
//           <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Unique Visitors</p>
//           <p className="mt-2 text-4xl font-bold text-gray-900 dark:text-white">{uniqueVisitors}</p>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         {/* Top Pages Table */}
//         <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
//           <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
//             <h2 className="text-lg font-medium text-gray-900 dark:text-white">Top Pages</h2>
//           </div>
//           <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
//             <thead className="bg-gray-50 dark:bg-gray-800">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Page Path</th>
//                 <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
//               {topPages.map(([path, count], idx) => (
//                 <tr key={idx}>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">{path}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-500 dark:text-gray-400">{count}</td>
//                 </tr>
//               ))}
//               {topPages.length === 0 && (
//                 <tr><td colSpan="2" className="px-6 py-4 text-center text-sm text-gray-500">No data available</td></tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Top Locations Table */}
//         <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
//           <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
//             <h2 className="text-lg font-medium text-gray-900 dark:text-white">Top Locations</h2>
//           </div>
//           <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
//             <thead className="bg-gray-50 dark:bg-gray-800">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
//                 <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Visitors</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
//               {topLocations.map(([loc, count], idx) => (
//                 <tr key={idx}>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">{loc}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-500 dark:text-gray-400">{count}</td>
//                 </tr>
//               ))}
//               {topLocations.length === 0 && (
//                 <tr><td colSpan="2" className="px-6 py-4 text-center text-sm text-gray-500">No data available</td></tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Recent Activity List */}
//       <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
//         <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
//           <h2 className="text-lg font-medium text-gray-900 dark:text-white">Recent Activity</h2>
//         </div>
//         <ul className="divide-y divide-gray-200 dark:divide-gray-700">
//           {recentActivity.map((activity) => (
//             <li key={activity.id} className="px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
//               <div className="flex items-center gap-4">
//                 <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-500">
//                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
//                 </div>
//                 <div>
//                   <p className="text-sm font-medium text-gray-900 dark:text-white">Viewed <span className="text-indigo-600 dark:text-indigo-400">{activity.page_path}</span></p>
//                   <p className="text-xs text-gray-500 dark:text-gray-400">{activity.location} &bull; {activity.user_agent?.split(' ')[0]}</p>
//                 </div>
//               </div>
//               <div className="mt-2 sm:mt-0 text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
//                 {new Date(activity.created_at).toLocaleString()}
//               </div>
//             </li>
//           ))}
//           {recentActivity.length === 0 && (
//             <li className="px-6 py-4 text-center text-sm text-gray-500">No recent activity</li>
//           )}
//         </ul>
//       </div>
//     </div>
//   )
// }
'use client';

import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// interface ChartData {
//   date: string;
//   activeUsers: number;
//   pageViews: number;
// }

export default function AnalyticsPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/analytics')
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) setData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-6 text-center">Loading Analytics...</div>;
  if (data.length === 0) return <div className="p-6 text-center">No data found.</div>;

  return (
    <div className="w-full h-[400px] bg-white p-4 rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Website Traffic (Past 7 Days)</h3>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          {/* Active Users Line */}
          <Line 
            type="monotone" 
            dataKey="activeUsers" 
            name="Active Users" 
            stroke="#3b82f6" 
            strokeWidth={2}
            activeDot={{ r: 8 }} 
          />
          {/* Page Views Line */}
          <Line 
            type="monotone" 
            dataKey="pageViews" 
            name="Page Views" 
            stroke="#10b981" 
            strokeWidth={2} 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}