
import Link from 'next/link';
import { Calendar, User, ArrowLeft, Tag } from 'lucide-react';
import { notFound } from 'next/navigation';

export async function generateMetadata(props) {
  const params = await props.params;
  const { slug } = params;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  
  try {
    const res = await fetch(`${baseUrl}/api/blogs/${slug}`, {
      cache: 'no-store',
    });
    
    if (!res.ok) return { title: 'Blog Post Not Found' };
    
    const blog = await res.json();
    
    return {
      title: `${blog.title} - MAD Graphix Blog`,
      description: blog.excerpt,
      openGraph: {
        title: blog.title,
        description: blog.excerpt,
        type: 'article',
        publishedTime: blog.created_at,
        authors: [blog.author],
        images: blog.featured_image ? [blog.featured_image] : [],
      },
    };
  } catch (error) {
    return { title: 'Blog Post Not Found' };
  }
}

async function getBlog(slug) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/blogs/${slug}`, {
    cache: 'no-store',
  });
  
  if (!res.ok) {
    return null;
  }
  
  return res.json();
}

export default async function BlogPostPage(props) {
  const params = await props.params;
  const { slug } = params;
  const blog = await getBlog(slug);

  if (!blog) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-emerald-600 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Blog</span>
          </Link>
        </div>
      </div>

      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {/* Title */}
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {blog.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 text-gray-600">
            <div className="flex items-center gap-2">
              <User size={18} />
              <span>{blog.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={18} />
              <time dateTime={blog.created_at}>
                {new Date(blog.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </div>
          </div>

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mt-6">
              <Tag size={18} className="text-gray-400" />
              {blog.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-sm font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Featured Image */}
        {blog.featured_image && (
          <div className="mb-10 rounded-xl overflow-hidden shadow-lg">
            <img
              src={blog.featured_image}
              alt={blog.title}
              className="w-full h-auto"
            />
          </div>
        )}

        {/* Excerpt */}
        <div className="bg-emerald-50 border-l-4 border-emerald-600 p-6 mb-10 rounded-r-lg">
          <p className="text-lg text-gray-700 italic">{blog.excerpt}</p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{
              __html: blog.content
                .replace(/\n\n/g, '</p><p>')
                .replace(/\n/g, '<br />')
                .replace(/^(.*)$/gm, '<p>$1</p>')
                .replace(/## (.*?)(?=<br|$)/g, '<h2>$1</h2>')
                .replace(/### (.*?)(?=<br|$)/g, '<h3>$1</h3>')
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\*(.*?)\*/g, '<em>$1</em>')
                .replace(/- (.*?)(?=<br|$)/g, '<li>$1</li>')
                .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
            }}
          />
        </div>

        {/* CTA Section */}
        <div className="mt-12 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-3">Ready to Transform Your Brand?</h3>
          <p className="text-emerald-50 mb-6 max-w-2xl mx-auto">
            Let MAD Graphix bring your vision to life with stunning design and powerful digital solutions.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-emerald-600 font-semibold px-8 py-3 rounded-lg hover:bg-emerald-50 transition-colors"
          >
            Get Started Today
          </Link>
        </div>
      </article>
    </main>
  );
}
