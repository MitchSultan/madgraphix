'use client';

import { useEffect, useState } from 'react';
import { supabaseBrowser } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { 
  LogOut, 
  User, 
  Clock, 
  Shield, 
  Users,
  Activity,
  TrendingUp,
  Mail,
  Calendar,
  Settings,
  Home,
  BarChart3
} from 'lucide-react';

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    lastLogin: null,
    recentLogins: 0,
  });
  const router = useRouter();
  const supabase = supabaseBrowser();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    console.log('1. User from auth:', user);
    
    if (!user) {
      console.log('No user found, redirecting to login');
      router.push('/login');
      return;
    }

    // Check if user is admin
    const { data: profileData, error: profileError } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    console.log('2. Profile data:', profileData);
    console.log('3. Profile error:', profileError);
    console.log('4. is_admin flag:', profileData?.is_admin);

    if (profileError) {
      console.error('Profile query error:', profileError);
      alert('Database error: ' + profileError.message);
      setLoading(false);
      return;
    }

    if (!profileData) {
      console.log('No profile found for user');
      alert('No user profile found. Please visit /debug to set up admin access.');
      setLoading(false);
      return;
    }

    if (!profileData.is_admin) {
      console.log('User is not an admin, redirecting');
      alert('Access denied: You do not have administrator privileges. Visit /debug to grant access.');
      router.push('/');
      return;
    }

    console.log('✓ Admin access granted');

    setUser(user);
    setProfile(profileData);
    await fetchDashboardData();
    setLoading(false);
  };

  const fetchDashboardData = async () => {
    try {
      // Get total user count
      const { count } = await supabase
        .from('user_profiles')
        .select('*', { count: 'exact', head: true });

      // Get current user's last login
      const { data: currentProfile } = await supabase
        .from('user_profiles')
        .select('last_login')
        .eq('id', (await supabase.auth.getUser()).data.user.id)
        .single();

      // Get recent logins (last 7 days)
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      
      const { count: recentCount } = await supabase
        .from('user_profiles')
        .select('*', { count: 'exact', head: true })
        .gte('last_login', sevenDaysAgo.toISOString());

      setStats({
        totalUsers: count || 0,
        lastLogin: currentProfile?.last_login,
        recentLogins: recentCount || 0,
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500 mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-slate-900/50 backdrop-blur-xl border-r border-white/10 z-50">
        <div className="p-6">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Shield className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-white font-bold text-lg">MAD Graphix</h1>
              <p className="text-gray-400 text-xs">Admin Panel</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            <a href="#" className="flex items-center gap-3 px-4 py-3 bg-purple-600/20 border border-purple-500/30 rounded-lg text-purple-300">
              <BarChart3 size={20} />
              <span className="font-medium">Dashboard</span>
            </a>
            <a href="/" className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 rounded-lg text-gray-400 hover:text-white transition">
              <Home size={20} />
              <span>Main Website</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 rounded-lg text-gray-400 hover:text-white transition">
              <Settings size={20} />
              <span>Settings</span>
            </a>
          </nav>
        </div>

        {/* User Profile Section */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
              <User className="text-white" size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate">{profile?.full_name || user?.email}</p>
              <p className="text-gray-400 text-xs truncate">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 text-red-300 hover:text-red-200 rounded-lg transition font-medium"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Welcome back, {profile?.full_name || 'Admin'}!</h2>
          <p className="text-gray-400">Here's what's happening with your platform today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Users */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 border border-blue-500/20 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Users className="text-white" size={24} />
              </div>
              <TrendingUp className="text-blue-200" size={20} />
            </div>
            <h3 className="text-white/80 text-sm font-medium mb-1">Total Users</h3>
            <p className="text-4xl font-bold text-white mb-1">{stats.totalUsers}</p>
            <p className="text-blue-200 text-sm">All registered accounts</p>
          </div>

          {/* Recent Activity */}
          <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl p-6 border border-purple-500/20 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Activity className="text-white" size={24} />
              </div>
              <TrendingUp className="text-purple-200" size={20} />
            </div>
            <h3 className="text-white/80 text-sm font-medium mb-1">Recent Activity</h3>
            <p className="text-4xl font-bold text-white mb-1">{stats.recentLogins}</p>
            <p className="text-purple-200 text-sm">Logins in last 7 days</p>
          </div>

          {/* Admin Status */}
          <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl p-6 border border-emerald-500/20 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Shield className="text-white" size={24} />
              </div>
            </div>
            <h3 className="text-white/80 text-sm font-medium mb-1">Access Level</h3>
            <p className="text-2xl font-bold text-white mb-1">Administrator</p>
            <p className="text-emerald-200 text-sm">Full system access</p>
          </div>

          {/* Last Login */}
          <div className="bg-gradient-to-br from-amber-600 to-amber-700 rounded-2xl p-6 border border-amber-500/20 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Clock className="text-white" size={24} />
              </div>
            </div>
            <h3 className="text-white/80 text-sm font-medium mb-1">Last Login</h3>
            <p className="text-lg font-bold text-white mb-1">
              {stats.lastLogin 
                ? new Date(stats.lastLogin).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })
                : 'First time'}
            </p>
            <p className="text-amber-200 text-sm">
              {stats.lastLogin 
                ? new Date(stats.lastLogin).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })
                : 'Welcome!'}
            </p>
          </div>
        </div>

        {/* Content Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Quick Actions */}
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Calendar size={24} className="text-purple-400" />
              Quick Actions
            </h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-4 bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 rounded-xl text-white transition group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                    <Mail size={20} />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold">Send Announcement</p>
                    <p className="text-sm text-gray-400">Notify all users</p>
                  </div>
                </div>
                <svg className="w-5 h-5 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <a href="/" className="w-full flex items-center justify-between p-4 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 rounded-xl text-white transition group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                    <Home size={20} />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold">Visit Website</p>
                    <p className="text-sm text-gray-400">View public site</p>
                  </div>
                </div>
                <svg className="w-5 h-5 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>

              <button className="w-full flex items-center justify-between p-4 bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 rounded-xl text-white transition group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
                    <Settings size={20} />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold">System Settings</p>
                    <p className="text-sm text-gray-400">Configure platform</p>
                  </div>
                </div>
                <svg className="w-5 h-5 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Account Info */}
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <User size={24} className="text-blue-400" />
              Account Information
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                <span className="text-gray-400">Email</span>
                <span className="text-white font-medium">{user?.email}</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                <span className="text-gray-400">Role</span>
                <span className="px-3 py-1 bg-purple-600 text-white rounded-full text-sm font-medium">Administrator</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                <span className="text-gray-400">Account Status</span>
                <span className="px-3 py-1 bg-emerald-600 text-white rounded-full text-sm font-medium flex items-center gap-1">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  Active
                </span>
              </div>
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                <span className="text-gray-400">Member Since</span>
                <span className="text-white font-medium">
                  {profile?.created_at 
                    ? new Date(profile.created_at).toLocaleDateString('en-US', {
                        month: 'long',
                        year: 'numeric'
                      })
                    : 'N/A'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
