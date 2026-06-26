// "use client";

// import { useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { useGSAP } from "@gsap/react";
// import Image from "next/image";

// gsap.registerPlugin(ScrollTrigger, useGSAP);

// // Mock data – 6 services with titles, descriptions, and images
// const services = [
//   {
//     title: "Stunning Websites That Work",
//     description:
//       "We create modern, responsive websites that not only look amazing but deliver exceptional user experiences. Our web solutions are built with the latest technologies to ensure speed, security, and scalability. Whether you need a corporate website, e-commerce platform, or a custom web application, we've got you covered.",
//     image: "/posters/phon.webp",
//   },
//   {
//     title: "SEO Optimised for Growth",
//     description:
//       "Search engine optimisation is baked into every project. From clean code and semantic structure to performance tweaks, we ensure your site ranks well and attracts the right audience.",
//     image: "/posters/phon.webp", // replace with your actual image
//   },
//   {
//     title: "Advanced Analytics Integration",
//     description:
//       "Understand your users with custom analytics dashboards, heatmaps, and conversion tracking. We set up everything you need to make data‑driven decisions.",
//     image: "/posters/phon.webp",
//   },
//   {
//     title: "Design Systems That Scale",
//     description:
//       "Consistent, reusable components and guidelines keep your brand cohesive across every touchpoint. We build systems, not just pages.",
//     image: "/posters/phon.webp",
//   },
//   {
//     title: "Powerful CMS Solutions",
//     description:
//       "Take control of your content with a headless or traditional CMS tailored to your workflow. Easy updates, no developer needed after launch.",
//     image: "/posters/phon.webp",
//   },
//   {
//     title: "Global CDN & Performance",
//     description:
//       "Lightning‑fast load times worldwide thanks to CDN setups, edge caching, and asset optimisation. Your site will be as fast as it is beautiful.",
//     image: "/posters/phon.webp",
//   },
// ];

// export default function WebDesignStack() {
//   const containerRef = useRef();

//   useGSAP(
//     () => {
//       const cards = gsap.utils.toArray(".stack-card");

//       // Use ScrollTrigger.matchMedia to enable pinning only on md+ screens
//       ScrollTrigger.matchMedia({
//         // Large screens: pin each card and animate the next one over it
//         "(min-width: 768px)": function () {
//           cards.forEach((card, i) => {
//             // First card doesn't need to be pinned over anything, but we can still pin it as the first
//             if (i === 0) {
//               ScrollTrigger.create({
//                 trigger: card,
//                 start: "top top",
//                 end: "bottom top",
//                 pin: true,
//                 pinSpacing: false,
//                 // markers: true, // uncomment for debugging
//               });
//             } else {
//               // For subsequent cards: pin the card and also animate the previous card fading out
//               const prevCard = cards[i - 1];

//               // Pin this card
//               ScrollTrigger.create({
//                 trigger: card,
//                 start: "top top",
//                 end: "bottom top",
//                 pin: true,
//                 pinSpacing: false,
//                 // markers: true,
//               });

//               // When this card enters, fade out and scale down the previous card
//               ScrollTrigger.create({
//                 trigger: card,
//                 start: "top 80%",
//                 end: "top top",
//                 scrub: 0.5,
//                 onEnter: () => {
//                   gsap.to(prevCard, {
//                     opacity: 1,
//                     scale: 0.95,
//                     duration: 0.6,
//                     ease: "power2.out",
//                   });
//                 },
//                 onLeaveBack: () => {
//                   // When scrolling back up, restore previous card
//                   gsap.to(prevCard, {
//                     opacity: 1,
//                     scale: 1,
//                     duration: 0.6,
//                     ease: "power2.out",
//                   });
//                 },
//               });
//             }
//           });

//           // Finally, after the last card leaves, unpin it (end trigger does it automatically)
//         },

//         // Small screens: no pinning, just normal scroll
//         "(max-width: 767px)": function () {
//           // Remove any pinning / animations – GSAP does this automatically when matchMedia conditions change
//         },
//       });
//     },
//     { scope: containerRef }
//   );

//   return (
//     <section ref={containerRef} className="relative bg-background">
//       {services.map((service, index) => (
//         <div
//           key={index}
//           className="stack-card w-full min-h-screen flex items-center bg-background border-b border-border/20 last:border-b-0"
//         >
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full py-20 md:py-0">
//             <div className="grid md:grid-cols-2 gap-12 items-center">
//               {/* Text content */}
//               <div className={index % 2 === 0 ? "order-1" : "order-2"}>
//                 <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-6">
//                   {service.title}
//                 </h2>
//                 <p className="text-muted-foreground text-lg leading-relaxed">
//                   {service.description}
//                 </p>
//               </div>
//               {/* Image */}
//               <div
//                 className={`${
//                   index % 2 === 0 ? "order-2" : "order-1"
//                 } bg-muted rounded-2xl overflow-hidden aspect-[4/3] md:aspect-auto md:h-96 relative`}
//               >
//                 <Image
//                   src={service.image}
//                   alt={service.title}
//                   fill
//                   className="object-cover"
//                   sizes="(max-width: 768px) 100vw, 50vw"
//                   priority={index === 0}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       ))}
//     </section>
//   );
// }




import React from 'react'

export default function WebDesignStack() {
  return (
    <div className=' overflow-hidden p-2 md:p-24 flex flex-col gap-4 md:flex-row md:w-screen'>
      <div className=' flex flex-col justify-between md:max-w-1/2 md:space-y-8 '>
        
        <h3 className=' font-normal text-7xl'>Your website isn’t a billboard, it’s a growth engine</h3>
         <h5 className='font-thin  text-2xl leading-none'>Your digital presence is often your audience's first experience of your brand. But too many teams are stuck with outdated, unresponsive websites with no easy way to fix them.</h5>
        <p>Delivering digital experiences that actually convert takes more than pretty visuals. It takes UX strategy, brand consistency, conversion-focused messaging, and the ability to scale quickly. M.A.D brings it all together in one flexible, expert partner.</p>
      </div>
      <div className='md:max-w-1/2'>
        <img aspect-auto='true' src="/mockups/cdf.jpeg" className='rounded-sm'></img>
      </div>
      
    </div>
  )
}
