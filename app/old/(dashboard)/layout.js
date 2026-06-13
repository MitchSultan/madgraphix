'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Mail,
  Settings,
  LogOut,
  Menu,
  X,
  Package,
  FileText,
  ShoppingBag,
  BookOpen,
  Activity
} from 'lucide-react';
import { supabaseBrowser } from '../../../lib/supabase/client';
import { cn } from '../../../lib/utils';
import BottomNavbar from './dashboard/components/BottomNavbar'; // Import the new BottomNavbar

// All possible sidebar items with role visibility
const ALL_SIDEBAR_ITEMS = [
  { label: 'Overview',      href: '/dashboard',              icon: LayoutDashboard, roles: ['admin', 'agent'] },
  { label: 'Analytics',     href: '/dashboard/analytics',    icon: Activity,        roles: ['admin'] },
  { label: 'Client Home',   href: '/client',                 icon: LayoutDashboard, roles: ['client'] },
  { label: 'Orders',        href: '/dashboard/orders',       icon: ShoppingBag,     roles: ['admin', 'agent'] },
  { label: 'Inventory',     href: '/dashboard/inventory',    icon: Package,         roles: ['admin'] },
  { label: 'Clients',       href: '/dashboard/clients',      icon: Users,           roles: ['admin'] },
  { label: 'Products',      href: '/dashboard/products',     icon: ShoppingBag,     roles: ['admin'] },
  { label: 'System Logs',   href: '/dashboard/logs',         icon: FileText,        roles: ['admin'] },
  { label: 'Leads',         href: '/dashboard/leads',        icon: Users,           roles: ['admin', 'agent'] },
  { label: 'Subscribers',   href: '/dashboard/subscribers',  icon: Mail,            roles: ['admin', 'agent'] },
  { label: 'Invoices',      href: '/dashboard/invoices',     icon: FileText,        roles: ['admin', 'agent'] },
  { label: 'Case-studies',  href: '/dashboard/case-studies', icon: BookOpen,        roles: ['admin', 'agent'] },
  { label: 'Blogs',         href: '/dashboard/blogs',        icon: FileText,        roles: ['admin', 'agent'] },
  { label: 'My Orders',     href: '/client/orders',          icon: ShoppingBag,     roles: ['client'] },
  { label: 'Catalogue',     href: '/client/products',        icon: Package,         roles: ['client'] },
  { label: 'Settings',      href: '/dashboard/settings',     icon: Settings,        roles: ['admin', 'agent', 'client'] },
];

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profile, setProfile] = useState(null);
  const pathname = usePathname();
  const router = useRouter();

  // Fetch user profile for role-based nav
  useEffect(() => {
    async function loadProfile() {
      const supabase = supabaseBrowser();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from('profiles')
        .select('id, full_name, email, role')
        .eq('id', user.id)
        .single();

      if (data) setProfile(data);
    }
    loadProfile();
  }, []);

  const userRole = profile?.role || 'admin';

  // Filter sidebar items by role
  const sidebarItems = ALL_SIDEBAR_ITEMS.filter(item =>
    item.roles.includes(userRole)
  );

  const handleLogout = async () => {
    const supabase = supabaseBrowser();
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col lg:flex-row">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Hidden on mobile, visible on large screens */}
      <aside className={cn(
        "fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out lg:translate-x-0 hidden lg:block", // Added hidden lg:block
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="h-full flex flex-col">
          <div className="h-16 flex items-center px-6 border-b border-gray-200">
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {userRole === 'admin' ? 'Admin Panel' : 'My Dashboard'}
            </span>
            <button 
              className="ml-auto lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X size={20} />
            </button>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-1">
            {sidebarItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              
              return (
                <Link
                  key={item.href + item.label}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                    isActive 
                      ? "bg-blue-50 text-blue-700" 
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  <Icon size={20} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* User info + Logout */}
          <div className="p-4 border-t border-gray-200 space-y-3">
            {profile && (
              <div className="px-4 py-2">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {profile.full_name || profile.email || 'User'}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className={cn(
                    "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
                    userRole === 'admin'
                      ? "bg-purple-100 text-purple-700"
                      : "bg-blue-100 text-blue-700"
                  )}>
                    {userRole}
                  </span>
                  {profile.email && (
                    <span className="text-xs text-gray-500 truncate">{profile.email}</span>
                  )}
                </div>
              </div>
            )}
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 w-full text-left text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut size={20} />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden pb-16 lg:pb-0"> {/* Added pb-16 for mobile spacing */}
        {/* Topbar - Only visible on mobile */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center px-4 lg:px-8 justify-between lg:hidden"> {/* Added lg:hidden */}
          <button
            className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={20} />
          </button>

          <div className="flex items-center gap-4 ml-auto">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-sm font-medium text-white">
              {profile?.full_name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-4 lg:p-8">
          {children}
        </main>
      </div>

      <BottomNavbar /> {/* Render the BottomNavbar */}
    </div>
  );
}
