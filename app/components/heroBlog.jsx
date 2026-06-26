// 'use client'
// import { useEffect, useState } from "react";
// import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";

// // Mock data to simulate a database response
// const MOCK_BLOGS = [
//   {
//     id: 1,
//     image: "https://images.unsplash.com/photo-1544551763-46a8723ba342?q=80&w=2070&auto=format&fit=crop",
//     author: "Roger Match",
//     readTime: "14 min read",
//     title: "25+ Creative Brochure Design Ideas for Inspiration in 2026",
//     excerpt: "An eternal marketing favorite, brochures have adapted in the digital era to remain a prevalent way to deliver highly personalized, tangible branding.",
//     tags: ["#Examples", "#Trends"],
//   },
//   {
//     id: 2,
//     image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop",
//     author: "Emanuel Rojas Otero",
//     readTime: "11 min read",
//     title: "The 10 Best Print Design Agencies & Studios of 2026",
//     excerpt: "We live in a digital world, but print is still relevant. From billboards and magazine covers to menus, leaflets, and packaging, print remains powerful.",
//     tags: ["#Creative Partners"],
//   },
//   {
//     id: 3,
//     image: "https://images.unsplash.com/photo-1493225255756-d9584f8606e1?q=80&w=2070&auto=format&fit=crop",
//     author: "Haley Grant",
//     readTime: "4 min read",
//     title: "Woodstock Poster Designs: Then and Now",
//     excerpt: "This month marks the 50th anniversary of the Woodstock Music and Arts Fair, the three-day music festival that took place on a dairy farm in New York.",
//     tags: [],
//   },
// ];

// const BlogCard = ({ blog }) => {
//   return (
//     <Card className="h-full border-0 bg-transparent shadow-none flex flex-col">
//       {/* Image container with rounded top corners */}
//       <div className="overflow-hidden rounded-xl mb-4">
//         <img
//           src={blog.image}
//           alt={blog.title}
//           className="aspect-[16/9] w-full object-cover transition-transform duration-300 hover:scale-105"
//         />
//       </div>

//       <CardContent className="p-0 flex-1 flex flex-col">
//         {/* Author and Read Time */}
//         <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
//           <span>{blog.author}</span>
//           <span className="h-1 w-1 rounded-full bg-muted-foreground"></span>
//           <span>{blog.readTime}</span>
//         </div>

//         {/* Title */}
//         <CardTitle className="text-xl font-semibold tracking-tight line-clamp-2 mb-2 hover:underline cursor-pointer">
//           {blog.title}
//         </CardTitle>

//         {/* Excerpt */}
//         <CardDescription className="text-muted-foreground line-clamp-3">
//           {blog.excerpt}
//         </CardDescription>

//         {/* Tags */}
//         {blog.tags.length > 0 && (
//           <div className="flex flex-wrap gap-2 mt-4 pt-2">
//             {blog.tags.map((tag) => (
//               <Badge
//                 key={tag}
//                 variant="secondary"
//                 className="rounded-full bg-[#EAEAE3] text-[#4A4D47] hover:bg-[#DCDCD5] font-normal text-[10px] md:text-xs px-2.5 py-0.5"
//               >
//                 {tag}
//               </Badge>
//             ))}
//           </div>
//         )}
//       </CardContent>
//     </Card>
//   );
// };

// const HeroBlog = () => {
//   const [blogs, setBlogs] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Simulate fetching latest 3 blogs from a database
//   useEffect(() => {
//     const fetchBlogs = async () => {
//       // In a real app, replace this timeout with an API call (e.g., fetch('/api/blogs/latest'))
//       await new Promise((resolve) => setTimeout(resolve, 500));
//       setBlogs(MOCK_BLOGS);
//       setLoading(false);
//     };

//     fetchBlogs();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center py-24 min-h-[400px] text-muted-foreground">
//         Loading articles...
//       </div>
//     );
//   }

//   return (
//     <section className="bg-[#FCFCFA] py-16 md:py-24">
//       <div className="container mx-auto px-4 md:px-6">
//         {/* Section Header */}
//         <div className="text-center mb-12">
//           <h3 className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground mb-2">
//             Related Articles
//           </h3>
//           <h2 className="text-3xl md:text-4xl font-serif tracking-tight">
//             Read more about <span className="italic font-normal">print design</span>
//           </h2>
//         </div>

//         {/* Desktop Grid (3 Columns) */}
//         <div className="hidden md:grid grid-cols-3 gap-6 lg:gap-8">
//           {blogs.slice(0, 3).map((blog) => (
//             <BlogCard key={blog.id} blog={blog} />
//           ))}
//         </div>

//         {/* Mobile Carousel */}
//         <div className="md:hidden px-1">
//           <Carousel
//             opts={{
//               align: "start",
//               loop: true,
//             }}
//             className="w-full"
//           >
//             <CarouselContent>
//               {blogs.slice(0, 3).map((blog) => (
//                 <CarouselItem key={blog.id} className="pl-4 basis-[85%] sm:basis-[50%]">
//                   <BlogCard blog={blog} />
//                 </CarouselItem>
//               ))}
//             </CarouselContent>
//             <CarouselPrevious className="-left-4 top-1/2 -translate-y-1/2" />
//             <CarouselNext className="-right-4 top-1/2 -translate-y-1/2" />
//           </Carousel>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroBlog;



'use client'
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { createClient } from "@/lib/supabase/client"; // adjust path to your supabase client

// interface Blog {
//   id: number;
//   image: string;
//   author: string;
//   readTime: string;
//   title: string;
//   excerpt: string;
//   tags: string[];
//   // add other fields if needed, e.g., created_at
// }

const BlogCard = ({ blog }) => {
  return (
    <Card className="h-full border-0 bg-transparent shadow-none flex flex-col">
      {/* Image container with rounded top corners */}
      <div className="overflow-hidden rounded-xl mb-4">
        <img
          src={blog.image}
          alt={blog.title}
          className="aspect-[16/9] w-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      <CardContent className="p-0 flex-1 flex flex-col">
        {/* Author and Read Time */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
          <span>{blog.author}</span>
          <span className="h-1 w-1 rounded-full bg-muted-foreground"></span>
          <span>{blog.readTime}</span>
        </div>

        {/* Title */}
        <CardTitle className="text-xl font-semibold tracking-tight line-clamp-2 mb-2 hover:underline cursor-pointer">
          {blog.title}
        </CardTitle>

        {/* Excerpt */}
        <CardDescription className="text-muted-foreground line-clamp-3">
          {blog.excerpt}
        </CardDescription>

        {/* Tags */}
        {blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4 pt-2">
            {blog.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="rounded-full bg-[#EAEAE3] text-[#4A4D47] hover:bg-[#DCDCD5] font-normal text-[10px] md:text-xs px-2.5 py-0.5"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const HeroBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch the latest 3 blogs from Supabase
  useEffect(() => {
    const fetchBlogs = async () => {
      const supabase = createClient();
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('Blog')         // your table name
          .select('*')
          .order('created_at', { ascending: false })
          .limit(3);

        if (error) {
          console.error('Error fetching blogs:', error);
          setBlogs([]);
        } else {
          setBlogs(data || []);
        }
      } catch (err) {
        console.error('Unexpected error:', err);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-24 min-h-[400px] text-muted-foreground">
        Loading articles...
      </div>
    );
  }

  // If no blogs, you might want to show a fallback, but we'll just render empty.
  // The carousel and grid will handle empty gracefully (no items).
  return (
    <section className="bg-[#FCFCFA] py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h3 className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground mb-2">
            Related Articles
          </h3>
          <h2 className="text-3xl md:text-4xl font-serif tracking-tight">
            Read more about <span className="italic font-normal">print design</span>
          </h2>
        </div>

        {/* Desktop Grid (3 Columns) */}
        <div className="hidden md:grid grid-cols-3 gap-6 lg:gap-8">
          {blogs.slice(0, 3).map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden px-1">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {blogs.slice(0, 3).map((blog) => (
                <CarouselItem key={blog.id} className="pl-4 basis-[85%] sm:basis-[50%]">
                  <BlogCard blog={blog} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-4 top-1/2 -translate-y-1/2" />
            <CarouselNext className="-right-4 top-1/2 -translate-y-1/2" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default HeroBlog;