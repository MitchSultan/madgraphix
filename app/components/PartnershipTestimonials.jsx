// components/PartnershipTestimonials.tsx
'use client';

import React, { useState, useEffect } from "react";

const testimonials = [
  {
    text: "The MAD Graphix team was nothing but highly professional. They were incredibly efficient, quick to respond, and organized. We are ecstatic about the finished product and would definitely recommend them.",
    highlight: "would definitely recommend them",
    author: "Cyrus Kiani",
    role: "Director of Product, EveryTable",
    avatar: "/logos/denri.png", // replace with real images
  },
  {
    text: "Working with this team exceeded every expectation. Their communication was flawless and their eye for design was exceptional. We will absolutely work with them again!",
    highlight: "We will absolutely work with them again",
    author: "Mara Reed",
    role: "Brand Strategist, Nova Labs",
    avatar: "/logos/fayahh.png", // replace with real images
  },
  {
    text: "Superb creative direction and top-tier professionalism. They delivered ahead of schedule and guided us through every step. Highly recommended.",
    highlight: "Highly recommended",
    author: "Daniel Martinez",
    role: "Founder, Vortex",
    avatar: "/logos/kings.png",
  },
];

export default function PartnershipTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-slide
  useEffect(() => {
    const interval = setInterval(nextSlide, 6500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full bg-white py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between items-center gap-12 md:items-end mb-16">
          <div className="max-w-lg">
            <p className="text-sm font-thin uppercase tracking-wide text-blue-900 mb-2">Testimonials</p>
            <h2 className="text-5xltext-white md:text-6xl font-bold tracking-tighter ">
              Forming lasting<br />
              <span className="">
                partnerships
              </span>
            </h2>
          </div>
          
          <p className="text-gray-600 text-lg text-right md:max-w-sm">
            Don&apos;t just take our word for it. Here&apos;s what our clients have to say about working with us.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="min-h-[420px] md:min-h-[380px] flex items-center">
            <div 
              className="w-full transition-all duration-700 ease-out flex flex-col md:flex-row justify-between rounded-3xl p-8 bg-slate-900/80 border border-zinc-800 shadow-lg"
              style={{ opacity: 1 }}
            >
              <div className="max-w-4xl">
                {/* Quote Icon */}
                <div className="text-7xl text-blue-500/20 mb-6">“</div>
                
                {/* Testimonial Text */}
                <p className="text-2xl md:text-3xl leading-relaxed text-zinc-200 mb-12">
                  {testimonials[currentIndex].text.split(testimonials[currentIndex].highlight).map((part, i, arr) => (
                    <React.Fragment key={i}>
                      {part}
                      {i < arr.length - 1 && (
                        <span className="text-white font-medium bg-zinc-800 px-1 rounded">
                          {testimonials[currentIndex].highlight}
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                </p>

                {/* Author */}
                <div className="flex items-center gap-5">
                  <img
                    src={testimonials[currentIndex].avatar}
                    alt={testimonials[currentIndex].author}
                    className="w-16 h-16 rounded-2xl object-cover ring-4 ring-zinc-800"
                  />
                  <div>
                    <p className="text-xl font-semibold text-white">
                      {testimonials[currentIndex].author}
                    </p>
                    <p className="text-zinc-400">{testimonials[currentIndex].role}</p>
                  </div>
                </div>
              </div>
              <div>
                <img src={testimonials[currentIndex].companyLogo} alt={testimonials[currentIndex].company} className="w-32 h-16 object-contain" />
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-12 md:mt-8">
            <div className="flex gap-4">
              <button
                onClick={prevSlide}
                className="w-14 h-14 rounded-2xl border border-zinc-700 hover:border-zinc-500 flex items-center justify-center  transition-all hover:bg-zinc-900 active:scale-95"
                aria-label="Previous testimonial"
              >
                ←
              </button>
              <button
                onClick={nextSlide}
                className="w-14 h-14 rounded-2xl border border-zinc-700 hover:border-zinc-500 flex items-center justify-center  transition-all hover:bg-zinc-900 active:scale-95"
                aria-label="Next testimonial"
              >
                →
              </button>
            </div>

            {/* Progress Dots */}
            <div className="flex gap-3">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    idx === currentIndex 
                      ? "bg-blue-500 w-8" 
                      : "bg-zinc-700 hover:bg-zinc-500"
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>

            <div className="text-sm font-mono text-zinc-500 hidden md:block">
              {String(currentIndex + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}