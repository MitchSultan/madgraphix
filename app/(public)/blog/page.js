// import Link from 'next/link';
// import { Calendar, User, ArrowRight } from 'lucide-react';
// import Navigation from '@/app/components/Navigation';
// import MultiItemCarousel from '@/app/components/card';
// import Footer from '@/app/components/Footer';

// export const metadata = {
//   title: 'Blog - MAD Graphix | Design Insights & Web Development Tips',
//   description: 'Explore articles on web design, branding, SEO, motion graphics, and digital marketing from the MAD Graphix team.',
// };

// async function getBlogs(page = 1) {
//   const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
//   const res = await fetch(`${baseUrl}/api/blogs?page=${page}&limit=12`, {
//     cache: 'no-store',
//   });
  
//   if (!res.ok) {
//     throw new Error('Failed to fetch blogs');
//   }
  
//   return res.json();
// }

// export default async function BlogPage(props) {
//   const searchParams = await props.searchParams;
//   const page = parseInt(searchParams?.page || '1');
//   const { blogs, pagination } = await getBlogs(page);

//   return (
//     <main className="min-h-screen ">
//       <Navigation />
//       {/* Hero Section */}
//       <section className="bg-gray-100 text-white py-20">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6">
//           <div className="text-center">
//             <h1 className="text-4xl md:text-5xl font-bold mb-4">
//               Design Insights & Web Tips
//             </h1>
//             <p className="text-xl text-gray-900  mx-auto">
//               Expert articles on web design, branding, SEO, and digital marketing to help your business thrive online.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Blog Grid */}
//       {/* Blog Grid */}
// <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">  {/* ← max-w-7xl, remove max-w-full */}
//   {blogs && blogs.length > 0 ? (
//     <>
//       <MultiItemCarousel itemsPerView={3}>   {/* ← stays as-is */}
//         {blogs.map((blog) => (
//           <BlogCard key={blog.id} blog={blog} />
//         ))}
//       </MultiItemCarousel>

//       {pagination.totalPages > 1 && (
//         <Pagination currentPage={page} totalPages={pagination.totalPages} />
//       )}
//     </>
//   ) : (
//     <div className="text-center py-12">
//       <p className="text-gray-500 text-lg">No blog posts found.</p>
//     </div>
//   )}
// </section>
//       <Footer />
//     </main>
//   );
// }

// function BlogCard({ blog }) {
//   return (
//     <Link 
//       href={`/blog/${blog.slug}`}
//       className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
//     >
//       {/* Featured Image */}
//       {blog.featured_image && (
//         <div className="relative h-48 bg-gray-200 overflow-hidden">
//           <img
//             src={blog.featured_image}
//             alt={blog.title}
//             className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//           />
//         </div>
//       )}

//       <div className="p-6 flex flex-col flex-grow">
//         {/* Tags */}
//         {blog.tags && blog.tags.length > 0 && (
//           <div className="flex flex-wrap gap-2 mb-3">
//             {blog.tags.slice(0, 2).map((tag, idx) => (
//               <span
//                 key={idx}
//                 className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full"
//               >
//                 {tag}
//               </span>
//             ))}
//           </div>
//         )}

//         {/* Title */}
//         <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors line-clamp-2">
//           {blog.title}
//         </h4>

//         {/* Excerpt */}
//         <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">
//           {blog.excerpt}
//         </p>

//         {/* Meta Info */}
//         <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
//           <div className="flex items-center gap-4">
//             <div className="flex items-center gap-1">
//               <Calendar size={14} />
//               <span>{new Date(blog.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
//             </div>
//           </div>
          
//           <div className="flex items-center gap-1 text-emerald-600 font-medium group-hover:gap-2 transition-all">
//             <span>Read</span>
//             <ArrowRight size={16} />
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// }

// function Pagination({ currentPage, totalPages }) {
//   const pages = [];
//   const maxVisible = 5;
  
//   let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
//   let endPage = Math.min(totalPages, startPage + maxVisible - 1);
  
//   if (endPage - startPage + 1 < maxVisible) {
//     startPage = Math.max(1, endPage - maxVisible + 1);
//   }
  
//   for (let i = startPage; i <= endPage; i++) {
//     pages.push(i);
//   }

//   return (
//     <div className="flex justify-center items-center gap-2 mt-12">
//       {/* Previous */}
//       {currentPage > 1 && (
//         <Link
//           href={`/blog?page=${currentPage - 1}`}
//           className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
//         >
//           Previous
//         </Link>
//       )}

//       {/* Page Numbers */}
//       {startPage > 1 && (
//         <>
//           <Link
//             href="/blog?page=1"
//             className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
//           >
//             1
//           </Link>
//           {startPage > 2 && <span className="text-gray-400">...</span>}
//         </>
//       )}

//       {pages.map((page) => (
//         <Link
//           key={page}
//           href={`/blog?page=${page}`}
//           className={`px-4 py-2 rounded-lg border transition-colors ${
//             page === currentPage
//               ? 'bg-emerald-600 text-white border-emerald-600'
//               : 'border-gray-300 text-gray-700 hover:bg-gray-50'
//           }`}
//         >
//           {page}
//         </Link>
//       ))}

//       {endPage < totalPages && (
//         <>
//           {endPage < totalPages - 1 && <span className="text-gray-400">...</span>}
//           <Link
//             href={`/blog?page=${totalPages}`}
//             className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
//           >
//             {totalPages}
//           </Link>
//         </>
//       )}

//       {/* Next */}
//       {currentPage < totalPages && (
//         <Link
//           href={`/blog?page=${currentPage + 1}`}
//           className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
//         >
//           Next
//         </Link>
//       )}
//     </div>
//   );
// }


import Link from 'next/link';
import { Calendar, ArrowRight } from 'lucide-react';
import Navigation from '@/app/components/Navigation';
import Footer from '@/app/components/Footer';

// shadcn components
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const metadata = {
  title: 'Blog - MAD Graphix | Design Insights & Web Development Tips',
  description:
    'Explore articles on web design, branding, SEO, motion graphics, and digital marketing from the MAD Graphix team.',
};

async function getBlogs(page = 1) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/blogs?page=${page}&limit=12`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch blogs');
  }

  return res.json();
}

export default async function BlogPage(props) {
  const searchParams = await props.searchParams;
  const page = parseInt(searchParams?.page || '1');
  const { blogs, pagination } = await getBlogs(page);

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-muted/50 py-20 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            Design Insights & Web Tips
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Expert articles on web design, branding, SEO, and digital marketing to help your business thrive online.
          </p>
        </div>
      </section>

      {/* Blog Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        {blogs && blogs.length > 0 ? (
          <>
            {/* ---- Mobile Carousel (visible < md) ---- */}
            <div className="block md:hidden">
              <Carousel
                opts={{
                  align: 'start',
                  loop: false,
                  dragFree: true,
                }}
                className="w-full relative"
              >
                <CarouselContent className="-ml-4">
                  {blogs.map((blog) => (
                    <CarouselItem
                      key={blog.id}
                      className="pl-4 basis-[85%] sm:basis-[70%]"
                    >
                      <BlogCard blog={blog} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="flex justify-center gap-4 mt-6">
                  <CarouselPrevious className="static translate-y-0" />
                  <CarouselNext className="static translate-y-0" />
                </div>
              </Carousel>
            </div>

            {/* ---- Desktop Grid (hidden < md) ---- */}
            <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <Pagination currentPage={page} totalPages={pagination.totalPages} />
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">No blog posts found.</p>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}

/* ── BlogCard using shadcn Card ── */
function BlogCard({ blog }) {
  return (
    <Link href={`/blog/${blog.slug}`} className="group block h-full">
      <Card className="overflow-hidden h-full transition-all duration-300 border border-border/50 hover:border-primary/50 hover:shadow-lg flex flex-col">
        {/* Image */}
        {blog.featured_image && (
          <div className="relative h-48 overflow-hidden">
            <img
              src={blog.featured_image}
              alt={blog.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}

        <CardContent className="p-6 flex flex-col flex-1">
          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {blog.tags.slice(0, 2).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs font-medium">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Title */}
          <h4 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {blog.title}
          </h4>

          {/* Excerpt */}
          <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
            {blog.excerpt}
          </p>
        </CardContent>

        <CardFooter className="px-6 pb-5 pt-0 flex items-center justify-between text-sm text-muted-foreground border-t border-border/50 mt-3 pt-4">
          <div className="flex items-center gap-1">
            <Calendar size={14} />
            <span>
              {new Date(blog.created_at).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
          </div>
          <div className="flex items-center gap-1 text-primary font-medium group-hover:gap-2 transition-all">
            <span>Read</span>
            <ArrowRight size={16} />
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}

/* ── Pagination (unchanged, but styled) ── */
function Pagination({ currentPage, totalPages }) {
  const pages = [];
  const maxVisible = 5;

  let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
  let endPage = Math.min(totalPages, startPage + maxVisible - 1);

  if (endPage - startPage + 1 < maxVisible) {
    startPage = Math.max(1, endPage - maxVisible + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="flex justify-center items-center gap-2 mt-12">
      {currentPage > 1 && (
        <Link
          href={`/blog?page=${currentPage - 1}`}
          className="px-4 py-2 rounded-lg border border-border text-sm font-medium hover:bg-muted transition-colors"
        >
          Previous
        </Link>
      )}

      {startPage > 1 && (
        <>
          <Link
            href="/blog?page=1"
            className="px-4 py-2 rounded-lg border border-border text-sm font-medium hover:bg-muted transition-colors"
          >
            1
          </Link>
          {startPage > 2 && <span className="text-muted-foreground">...</span>}
        </>
      )}

      {pages.map((page) => (
        <Link
          key={page}
          href={`/blog?page=${page}`}
          className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
            page === currentPage
              ? 'bg-primary text-primary-foreground border-primary'
              : 'border-border hover:bg-muted'
          }`}
        >
          {page}
        </Link>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && (
            <span className="text-muted-foreground">...</span>
          )}
          <Link
            href={`/blog?page=${totalPages}`}
            className="px-4 py-2 rounded-lg border border-border text-sm font-medium hover:bg-muted transition-colors"
          >
            {totalPages}
          </Link>
        </>
      )}

      {currentPage < totalPages && (
        <Link
          href={`/blog?page=${currentPage + 1}`}
          className="px-4 py-2 rounded-lg border border-border text-sm font-medium hover:bg-muted transition-colors"
        >
          Next
        </Link>
      )}
    </div>
  );
}