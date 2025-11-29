'use client';

import { useEffect, useState } from 'react';
import { supabaseBrowser } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { 
  BarChart3, 
  Users, 
  Globe, 
  TrendingUp, 
  LogOut,
  Plus,
  Edit,
  Trash2,
  Eye,
  Calendar
} from 'lucide-react';

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    pageViews: 0,
    uniqueVisitors: 0,
    topLocations: [],
  });
  const [items, setItems] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const router = useRouter();
  const supabase = supabaseBrowser();

  useEffect(() => {
    checkUser();
    fetchDashboardData();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push('/login');
    } else {
      setUser(user);
    }
    setLoading(false);
  };

  const fetchDashboardData = async () => {
    try {
      // Fetch analytics data
      const { data: analytics, error: analyticsError } = await supabase
        .from('analytics')
        .select('*');

      if (!analyticsError && analytics) {
        // Calculate stats
        const totalViews = analytics.length;
        const uniqueVisitors = new Set(analytics.map(a => a.visitor_id)).size;
        const locationCounts = analytics.reduce((acc, item) => {
          acc[item.location] = (acc[item.location] || 0) + 1;
          return acc;
        }, {});
        
        const topLocations = Object.entries(locationCounts)
          .sort(([,a], [,b]) => b - a)
          .slice(0, 5)
          .map(([location, count]) => ({ location, count }));

        setStats({
          pageViews: totalViews,
          uniqueVisitors,
          topLocations,
        });
      }

      // Fetch items (e.g., projects, products, etc.)
      const { data: itemsData } = await supabase
        .from('items')
        .select('*')
        .order('created_at', { ascending: false });

      if (itemsData) setItems(itemsData);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  const handleDeleteItem = async (id) => {
    if (confirm('Are you sure you want to delete this item?')) {
      const { error } = await supabase
        .from('items')
        .delete()
        .eq('id', id);

      if (!error) {
        fetchDashboardData();
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-48">
      {/* Header */}
      <header className="bg-black/40 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">MAD Graphix Dashboard</h1>
              <p className="text-gray-400 text-sm">Welcome back, {user?.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition transform hover:scale-105"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Page Views Card */}
          <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl p-6 shadow-2xl border border-purple-500/20 transform hover:scale-105 transition">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-white/20 p-3 rounded-lg">
                <Eye className="text-white" size={24} />
              </div>
              <TrendingUp className="text-purple-200" size={20} />
            </div>
            <h3 className="text-white/80 text-sm font-medium mb-1">Total Page Views</h3>
            <p className="text-4xl font-bold text-white">{stats.pageViews.toLocaleString()}</p>
          </div>

          {/* Unique Visitors Card */}
          <div className="bg-gradient-to-br from-violet-600 to-violet-800 rounded-2xl p-6 shadow-2xl border border-violet-500/20 transform hover:scale-105 transition">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-white/20 p-3 rounded-lg">
                <Users className="text-white" size={24} />
              </div>
              <TrendingUp className="text-violet-200" size={20} />
            </div>
            <h3 className="text-white/80 text-sm font-medium mb-1">Unique Visitors</h3>
            <p className="text-4xl font-bold text-white">{stats.uniqueVisitors.toLocaleString()}</p>
          </div>

          {/* Top Locations Card */}
          <div className="bg-gradient-to-br from-pink-600 to-pink-800 rounded-2xl p-6 shadow-2xl border border-pink-500/20 transform hover:scale-105 transition">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-white/20 p-3 rounded-lg">
                <Globe className="text-white" size={24} />
              </div>
            </div>
            <h3 className="text-white/80 text-sm font-medium mb-1">Top Location</h3>
            <p className="text-2xl font-bold text-white">
              {stats.topLocations[0]?.location || 'No data'}
            </p>
            {stats.topLocations[0] && (
              <p className="text-white/70 text-sm mt-1">
                {stats.topLocations[0].count} visits
              </p>
            )}
          </div>
        </div>

        {/* Top Locations Table */}
        {stats.topLocations.length > 0 && (
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-white/10 mb-8">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <BarChart3 size={24} />
              Top Visitor Locations
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left text-gray-400 font-medium py-3 px-4">Location</th>
                    <th className="text-right text-gray-400 font-medium py-3 px-4">Visits</th>
                    <th className="text-right text-gray-400 font-medium py-3 px-4">Percentage</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.topLocations.map((loc, index) => (
                    <tr key={index} className="border-b border-white/5 hover:bg-white/5 transition">
                      <td className="py-3 px-4 text-white font-medium">{loc.location}</td>
                      <td className="py-3 px-4 text-right text-gray-300">{loc.count}</td>
                      <td className="py-3 px-4 text-right text-gray-300">
                        {((loc.count / stats.pageViews) * 100).toFixed(1)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* CRUD Section */}
        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-white/10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Calendar size={24} />
              Manage Items
            </h2>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white rounded-lg transition transform hover:scale-105"
            >
              <Plus size={18} />
              Add New
            </button>
          </div>

          {items.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <p>No items yet. Click "Add New" to create one.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left text-gray-400 font-medium py-3 px-4">Title</th>
                    <th className="text-left text-gray-400 font-medium py-3 px-4">Description</th>
                    <th className="text-left text-gray-400 font-medium py-3 px-4">Date</th>
                    <th className="text-right text-gray-400 font-medium py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id} className="border-b border-white/5 hover:bg-white/5 transition">
                      <td className="py-3 px-4 text-white font-medium">{item.title}</td>
                      <td className="py-3 px-4 text-gray-300">{item.description}</td>
                      <td className="py-3 px-4 text-gray-400 text-sm">
                        {new Date(item.created_at).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-end gap-2">
                          <button className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition">
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteItem(item.id)}
                            className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
