// 'use client';
// import React, { useEffect, useRef } from 'react';

// const mockClients = [
//   { id: 1, name: "ToG", img: "/logos/denri.png" },
//   { id: 2, name: "Luxury by Tina", img: "/logos/merishaw.png" },
//   { id: 3, name: "CanvasPile", img: "/logos/fayahh.png" },
//   { id: 4, name: "MadGraphix", img: "/logos/moko.png" },
//   { id: 5, name: "Evolve Sphere", img: "/logos/the.png" },
//   { id: 6, name: "Inner Harbor", img: "/logos/tog.png" },
//   { id: 7, name: "Nesh Collections", img: "/logos/kings.png" },
//   { id: 8, name: "Reuben", img: "/logos/kimuka.png" },
// ];

// export default function LogoMarquee() {
//   const marqueeRef = useRef(null);

//   useEffect(() => {
//     const marquee = marqueeRef.current;
//     if (!marquee) return;

//     // Clone items for seamless loop
//     const items = marquee.querySelectorAll('.marquee-item');
//     items.forEach(item => {
//       const clone = item.cloneNode(true);
//       marquee.appendChild(clone);
//     });
//   }, []);

//   return (
//     <section className="py-12 bg-white overflow-hidden border-y border-gray-100">
//       <style>{`
//         @keyframes scroll {
//           0% {
//             transform: translateX(0);
//           }
//           100% {
//             transform: translateX(-100%);
//           }
//         }

//         .marquee-container {
//           display: flex;
//           animation: scroll 30s linear infinite;
//         }

//         .marquee-container:hover {
//           animation-play-state: paused;
//         }
//       `}</style>

//       <div className="max-w-7xl mx-auto px-4">
//         <p className="text-xs md:text-lg font-medium text-gray-400 uppercase tracking-widest mb-6 md:text-center">
//           Trusted by leading brands
//         </p>

//         <div className="overflow-hidden">
//           <div className="marquee-container" ref={marqueeRef}>
//             {mockClients.map((client) => (
//               <div
//                 key={client.id}
//                 className="marquee-item flex-shrink-0 px-8 sm:px-12"
//               >
//                 <div className="flex items-center justify-center h-32 bg-gray-50 rounded-lg border border-gray-100 px-6 min-w-max">
//                   <img src={client.img} alt={client.name} width={100} height={100} className="object-cover" />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }


"use client";

import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

// Mock logo data – replace the `src` with your actual logo paths
const logos =  [
  { id: 1, alt: "ToG", src: "/logos/denri.png" },
  { id: 2, alt: "Luxury by Tina", src: "/logos/merishaw.png" },
  { id: 3, alt: "CanvasPile", src: "/logos/fayahh.png" },
  { id: 4, alt: "MadGraphix", src: "/logos/moko.png" },
  { id: 5, alt: "Evolve Sphere", src: "/logos/the.png" },
  { id: 6, alt: "Inner Harbor", src: "/logos/tog.png" },
  { id: 7, alt: "Nesh Collections", src: "/logos/kings.png" },
  { id: 8, alt: "Reuben", src: "/logos/kimuka.png" },
];

export default function LogoMarquee() {
  return (
    <section className="py-16 md:py-24 bg-background relative overflow-hidden">
      {/* Optional heading */}
      <div className="max-w-6xl mx-auto mb-10 px-4 text-center">
        <h2 className="text-sm text-black font-semibold uppercase tracking-widest text-muted-foreground">
          Trusted by industry leaders
        </h2>
      </div>

      {/* Carousel container with edge fade overlays */}
      <div className="relative max-w-7xl mx-auto">
        {/* Left fade gradient */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-32 z-10 pointer-events-none bg-gradient-to-r from-background to-transparent" />
        {/* Right fade gradient */}
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-32 z-10 pointer-events-none bg-gradient-to-l from-background to-transparent" />

        <Carousel
          opts={{
            loop: true,
            align: "start",
            dragFree: true,
          }}
          plugins={[
            Autoplay({
              delay: 2000,          // continuous scroll (0 = no pause)
              stopOnInteraction: false,
              stopOnMouseEnter: true,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent className="flex items-center">
            {logos.map((logo, index) => (
              <CarouselItem
                key={index}
                className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 pl-8 first:pl-0" // use pl for consistent gap
              >
                <div className="flex items-center justify-center p-2 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={160}
                    height={60}
                    className="h-8 sm:h-10 md:h-12 w-auto object-contain"
                    // priority={index < 4} optional
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* No navigation buttons – pure marquee */}
        </Carousel>
      </div>
    </section>
  );
}