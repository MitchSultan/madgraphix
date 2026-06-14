import { supabaseServer } from '@/lib/supabase/server';
import Link from 'next/link';
import { PlusCircle, Eye, Edit, Trash2, FileText } from 'lucide-react';
import DeleteBlogButton from './DeleteBlogButton';

async function getBlogs() {
  const supabase = await supabaseServer();
  
  // Fetch all blogs (including drafts) for admin
  const { data: blogs, error } = await supabase
    .from('blogs')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }
  
  return blogs || [];
}

export default async function BlogsDashboardPage() {
  const blogs = await getBlogs();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Blog Management</h1>
          <p className="text-gray-500">Create, edit, and manage your blog posts</p>
        </div>
        <Link
          href="/admin/blogs/create"
          className="inline-flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
        >
          <PlusCircle size={20} />
          <span>New Post</span>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Posts"
          value={blogs.length}
          icon={FileText}
          color="bg-blue-500"
        />
        <StatCard
          title="Published"
          value={blogs.filter(b => b.published).length}
          icon={Eye}
          color="bg-green-500"
        />
        <StatCard
          title="Drafts"
          value={blogs.filter(b => !b.published).length}
          icon={Edit}
          color="bg-yellow-500"
        />
      </div>

      {/* Blogs Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-100">
              <tr>
                <th className="px-6 py-3">Title</th>
                <th className="px-6 py-3">Author</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Created</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {blogs.length > 0 ? (
                blogs.map((blog) => (
                  <tr key={blog.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{blog.title}</div>
                      <div className="text-xs text-gray-500 mt-1">/{blog.slug}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-700">{blog.author}</td>
                    <td className="px-6 py-4">
                      <StatusBadge published={blog.published} />
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {new Date(blog.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/blog/${blog.slug}`}
                          target="_blank"
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View"
                        >
                          <Eye size={18} />
                        </Link>
                        <Link
                          href={`/admin/blogs/${blog.slug}/edit`}
                          className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit size={18} />
                        </Link>
                        <DeleteBlogButton slug={blog.slug} title={blog.title} />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    No blog posts yet. Create your first post!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900 mt-1">{value}</h3>
      </div>
      <div className={`w-12 h-12 rounded-lg ${color} bg-opacity-10 flex items-center justify-center`}>
        <Icon size={24} className={color.replace('bg-', 'text-')} />
      </div>
    </div>
  );
}

function StatusBadge({ published }) {
  return (
    <span
      className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
        published
          ? 'bg-green-100 text-green-700'
          : 'bg-yellow-100 text-yellow-700'
      }`}
    >
      {published ? 'Published' : 'Draft'}
    </span>
  );
}
