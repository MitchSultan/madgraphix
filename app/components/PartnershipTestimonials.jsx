// // components/PartnershipTestimonials.tsx
// 'use client';

// import React, { useState, useEffect } from "react";

// const testimonials = [
//   {
//     text: "The MAD Graphix team was nothing but highly professional. They were incredibly efficient, quick to respond, and organized. We are ecstatic about the finished product and would definitely recommend them.",
//     highlight: "would definitely recommend them",
//     author: "Cyrus Kiani",
//     role: "Director of Product, EveryTable",
//     avatar: "/logos/denri.png", // replace with real images
//   },
//   {
//     text: "Working with this team exceeded every expectation. Their communication was flawless and their eye for design was exceptional. We will absolutely work with them again!",
//     highlight: "We will absolutely work with them again",
//     author: "Mara Reed",
//     role: "Brand Strategist, Nova Labs",
//     avatar: "/logos/fayahh.png", // replace with real images
//   },
//   {
//     text: "Superb creative direction and top-tier professionalism. They delivered ahead of schedule and guided us through every step. Highly recommended.",
//     highlight: "Highly recommended",
//     author: "Daniel Martinez",
//     role: "Founder, Vortex",
//     avatar: "/logos/kings.png",
//   },
// ];

// export default function PartnershipTestimonials() {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const nextSlide = () => {
//     setCurrentIndex((prev) => (prev + 1) % testimonials.length);
//   };

//   const prevSlide = () => {
//     setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
//   };

//   // Auto-slide
//   useEffect(() => {
//     const interval = setInterval(nextSlide, 6500);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <section className="w-full bg-white py-24 px-6 overflow-hidden">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="flex flex-col md:flex-row md:justify-between items-center gap-12 md:items-end mb-16">
//           <div className="max-w-lg">
//             <p className="text-sm font-thin uppercase tracking-wide text-blue-900 mb-2">Testimonials</p>
//             <h2 className="text-5xltext-white md:text-6xl font-bold tracking-tighter ">
//               Forming lasting<br />
//               <span className="">
//                 partnerships
//               </span>
//             </h2>
//           </div>
          
//           <p className="text-gray-600 text-lg text-right md:max-w-sm">
//             Don&apos;t just take our word for it. Here&apos;s what our clients have to say about working with us.
//           </p>
//         </div>

//         {/* Carousel */}
//         <div className="relative">
//           <div className="min-h-[420px] md:min-h-[380px] flex items-center">
//             <div 
//               className="w-full transition-all duration-700 ease-out flex flex-col md:flex-row justify-between rounded-3xl p-8  border border-zinc-800 shadow-lg"
//               style={{ opacity: 1 }}
//             >
//               <div className="max-w-4xl">
//                 {/* Quote Icon */}
//                 <div className="text-7xl text-blue-500/20 mb-6">“</div>
                
//                 {/* Testimonial Text */}
//                 <p className="text-2xl md:text-3xl leading-relaxed text-zinc-200 mb-12">
//                   {testimonials[currentIndex].text.split(testimonials[currentIndex].highlight).map((part, i, arr) => (
//                     <React.Fragment key={i}>
//                       {part}
//                       {i < arr.length - 1 && (
//                         <span className="text-white font-medium bg-zinc-800 px-1 rounded">
//                           {testimonials[currentIndex].highlight}
//                         </span>
//                       )}
//                     </React.Fragment>
//                   ))}
//                 </p>

//                 {/* Author */}
//                 <div className="flex items-center gap-5">
//                   <img
//                     src={testimonials[currentIndex].avatar}
//                     alt={testimonials[currentIndex].author}
//                     className="w-16 h-16 rounded-2xl object-cover ring-4 ring-zinc-800"
//                   />
//                   <div>
//                     <p className="text-xl font-semibold text-white">
//                       {testimonials[currentIndex].author}
//                     </p>
//                     <p className="text-zinc-400">{testimonials[currentIndex].role}</p>
//                   </div>
//                 </div>
//               </div>
//               <div>
//                 <img src={testimonials[currentIndex].companyLogo} alt={testimonials[currentIndex].company} className="w-32 h-16 object-contain" />
//               </div>
//             </div>
//             <div></div>
//           </div>

//           {/* Navigation Controls */}
//           <div className="flex items-center justify-between mt-12 md:mt-8">
//             <div className="flex gap-4">
//               <button
//                 onClick={prevSlide}
//                 className="w-14 h-14 rounded-2xl border border-zinc-700 hover:border-zinc-500 flex items-center justify-center  transition-all hover:bg-zinc-900 active:scale-95"
//                 aria-label="Previous testimonial"
//               >
//                 ←
//               </button>
//               <button
//                 onClick={nextSlide}
//                 className="w-14 h-14 rounded-2xl border border-zinc-700 hover:border-zinc-500 flex items-center justify-center  transition-all hover:bg-zinc-900 active:scale-95"
//                 aria-label="Next testimonial"
//               >
//                 →
//               </button>
//             </div>

//             {/* Progress Dots */}
//             <div className="flex gap-3">
//               {testimonials.map((_, idx) => (
//                 <button
//                   key={idx}
//                   onClick={() => setCurrentIndex(idx)}
//                   className={`w-3 h-3 rounded-full transition-all ${
//                     idx === currentIndex 
//                       ? "bg-blue-500 w-8" 
//                       : "bg-zinc-700 hover:bg-zinc-500"
//                   }`}
//                   aria-label={`Go to testimonial ${idx + 1}`}
//                 />
//               ))}
//             </div>

//             <div className="text-sm font-mono text-zinc-500 hidden md:block">
//               {String(currentIndex + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }



"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Mock data – replace with your own images and testimonials
const testimonials = [
  {
    id: 1,
    name: "Jane Wanjiku",
    role: "CEO, TechSavvy Ltd",
    quote:
      "Madgraphix transformed our brand identity. The level of creativity and professionalism is unmatched!",
    image: "https://picsum.photos/id/64/600/800", // placeholder portrait
  },
  {
    id: 2,
    name: "Brian Otieno",
    role: "Founder, Pamoja Foods",
    quote:
      "From logo to full packaging design – they delivered beyond our expectations. Highly recommend!",
    image: "https://picsum.photos/id/65/600/800",
  },
  {
    id: 3,
    name: "Amina Hassan",
    role: "Marketing Lead, Safi Organics",
    quote:
      "The website redesign not only looks stunning but also boosted our conversion rate by 40%.",
    image: "https://picsum.photos/id/66/600/800",
  },
  {
    id: 4,
    name: "David Kimani",
    role: "Entrepreneur",
    quote:
      "Working with Madgraphix felt like having a creative partner. They truly understood our vision.",
    image: "https://picsum.photos/id/67/600/800",
  },
  {
    id: 5,
    name: "Faith Njeri",
    role: "Director, GreenLife Foundation",
    quote:
      "Professional, timely, and incredibly creative. The brand manual they created is now our bible.",
    image: "https://picsum.photos/id/68/600/800",
  },
  {
    id: 6,
    name: "Peter Mwangi",
    role: "Product Manager, InnoCorp",
    quote:
      "Their animation work brought our product demo to life. Engagement skyrocketed after launch!",
    image: "https://picsum.photos/id/69/600/800",
  },
];

export default function PortraitCarousel() {
  const sectionRef = useRef(null);

  // GSAP stagger animation on scroll
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".testimonial-card", {
        opacity: 0,
        y: 60,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert(); // cleanup
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 px-4 md:px-8 bg-background overflow-hidden"
    >
      {/* Heading */}
      <div className="max-w-6xl mx-auto mb-12 ">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
          What Our Clients Say
        </h2>
        <p className="mt-4 text-muted-foreground  max-w-2xl mx-auto text-lg">
          Real feedback from real people who trusted us with their vision.
        </p>
      </div>

      {/* Carousel */}
      <div className="max-w-6xl mx-auto relative">
        <Carousel
          opts={{
            align: "start",
            slidesToScroll: 1,
            containScroll: "trimSnaps",
            // loop: false (default) – avoids clone issues with GSAP
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {testimonials.map((item) => (
              <CarouselItem
                key={item.id}
                className="pl-4 basis-full sm:basis-1/2 lg:basis-1/4 testimonial-card"
              >
                <Card className="relative overflow-hidden h-[420px] border-0 group">
                  {/* Background image */}
                  <div className="absolute inset-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      priority
                    />
                    {/* Gradient overlay – darker at bottom */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10 flex flex-col justify-end h-full p-5 text-white">
                    {/* Quote */}
                    <blockquote className="text-sm md:text-base leading-relaxed mb-4 italic opacity-90">
                      “{item.quote}”
                    </blockquote>
                    {/* Client info */}
                    <div className="mt-auto">
                      <p className="text-xs uppercase tracking-widest text-primary-foreground/70 mb-1">
                        Client
                      </p>
                      <p className="font-semibold text-lg">{item.name}</p>
                      {item.role && (
                        <p className="text-sm text-white/70">{item.role}</p>
                      )}
                    </div>
                  </div>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation arrows – visible on hover / focus */}
          <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background border-0 shadow-lg" />
          <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background border-0 shadow-lg" />
        </Carousel>
      </div>
    </section>
  );
}