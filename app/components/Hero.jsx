'use client';
import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from '@gsap/react';
import Link from 'next/link';

gsap.registerPlugin(useGSAP);

export default function Hero() {
  const containerRef = useRef();

  useGSAP(() => {
    // Simple entry animation for hero content
    gsap.from(".hero-element", {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out",
      delay: 0.2
    });
    
    // Floating animation for graphic elements
    gsap.to(".floating-circle-1", {
      y: -15,
      duration: 3,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut"
    });
    
    gsap.to(".floating-circle-2", {
      y: 15,
      duration: 4,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
      delay: 1
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative min-h-[90vh] w-full overflow-hidden bg-gradient-to-br from-[#ffffff] via-[#f1f1f1] to-[#f2f2f2]/30 pt-24 pb-12 flex items-center">
      {/* Background Graphic Elements */}
      <div className="absolute top-20 right-10 w-64 h-64 md:w-96 md:h-96 bg-[#d1c2eb] rounded-full mix-blend-multiply filter blur-3xl opacity-60 floating-circle-1"></div>
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-[#fbd4a1] rounded-full mix-blend-multiply filter blur-3xl opacity-50 floating-circle-2"></div>
      
      {/* Decorative Circles matching GoTo Prints style */}
      <div className="hidden lg:block absolute right-[5%] top-[20%] w-80 h-80 rounded-sm border-4 border-white shadow-2xl overflow-hidden floating-circle-1 z-10 bg-white">
        <img src="/posters/stan.webp" alt="Creative Design" className="w-full h-full object-cover" />
      </div>
      <div className="hidden lg:block absolute right-[25%] bottom-[15%] w-60 h-60 rounded-md border-4 border-white shadow-2xl overflow-hidden floating-circle-2 z-20 bg-white">
        <img src="/posters/poster.webp" alt="Brand Identity" className="w-full h-full object-cover" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-30 w-full flex flex-col lg:flex-row items-center">
        {/* Left Content Area */}
        <div className="w-full lg:w-3/5 text-center lg:text-left mt-16 lg:mt-0">
          <div className="hero-element inline-block mb-4">
            <span className="bg-white text-accent px-4 py-1.5 rounded-full text-sm font-thin tracking-wider shadow-sm border border-purple-100 uppercase">
              Your Creative Partner
            </span>
          </div>
          
          <h1 className="hero-element text-5xl md:text-6xl lg:text-7xl font-extrabold text-primary mb-6 leading-tight tracking-tight">
            Where <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-[#8B5CF6]">Creativity</span> <br className="hidden md:block" />
            Goes Mad
          </h1>
          
          <p className="hero-element text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
            At Mirror Arts Designs Graphix, we mix a love for design with a knack for making your brand pop. Let's build something unforgettable.
          </p>
          
          <div className="hero-element flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link 
              href="/CaseStudies" 
              className="bg-primary text-white hover:bg-accent px-8 py-4 rounded-pill font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 text-center"
            >
              Our Work
            </Link>
            <a 
              href="https://wa.me/254708779284" 
              className="bg-white text-primary hover:text-accent border-2 border-primary hover:border-accent px-8 py-4 rounded-pill font-bold text-lg shadow-sm transition-all transform hover:-translate-y-1 text-center flex items-center justify-center gap-2"
            >
              Let's Talk
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
