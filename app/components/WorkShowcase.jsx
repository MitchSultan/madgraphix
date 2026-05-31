"use client";

import { useRef, useState } from "react";
import Link from "next/link";

export default function WorkShowcase({ works = [] }) {
  const sliderRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Drag functionality
  const startDrag = (e) => {
    setIsDragging(true);
    setStartX(e.clientX || e.touches?.[0].clientX);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const onDrag = (e) => {
    if (!isDragging) return;
    const x = e.clientX || e.touches?.[0].clientX;
    const walk = (x - startX) * 1.3;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const stopDrag = () => {
    setIsDragging(false);
  };

  return (
    <section className="w-full py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="mb-16 flex flex-col md:flex-row items-center md:justify-between text-left md:text-left">
          <div>
            <p className="text-sm font-thin uppercase tracking-wide text-blue-900 mb-4">
              Portfolio
            </p>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-primary mb-4">Our Work</h2>
          </div>
          <p className="text-gray-600 text-lg max-w-md">
            A showcase of the beautiful digital experiences we've crafted for brands across different industries.
          </p>
        </div>

        {/* Carousel */}
        <div
          ref={sliderRef}
          className="flex gap-8 overflow-x-scroll no-scrollbar cursor-grab active:cursor-grabbing pb-8 pt-4 px-4 -mx-4"
          onMouseDown={startDrag}
          onMouseMove={onDrag}
          onMouseUp={stopDrag}
          onMouseLeave={stopDrag}
          onTouchStart={startDrag}
          onTouchMove={onDrag}
          onTouchEnd={stopDrag}
        >
          {works.map((work, index) => (
            <div
              key={index}
              className="min-w-[300px] md:min-w-[400px] bg-surface-soft rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-purple-50 group hover:-translate-y-2"
            >
              <div className="relative w-full h-64 overflow-hidden rounded-t-3xl p-4 pb-0">
                <img
                  src={work.image}
                  alt={work.title}
                  className="w-full h-full object-cover rounded-t-2xl transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-8 pb-4">
                <h5 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-primary transition-colors">{work.title}</h5>
                <Link href={work.link} className="inline-flex items-center gap-2 text-accent font-bold hover:gap-3 transition-all">
                  View Case Study <span className="text-lg">&rarr;</span>
                </Link>
              </div>

              {/* Ticker */}
              <div className="w-full overflow-hidden py-4 border-t border-purple-100/50 mt-4">
                <div className="flex whitespace-nowrap animate-scroll text-primary/70 text-xs font-bold uppercase tracking-wider gap-8 px-8">
                  {work.services?.map((s, i) => (
                    <span key={i}>
                      {s} •
                    </span>
                  ))}
                  {/* Duplicate for smooth loop */}
                  {work.services?.map((s, i) => (
                    <span key={"dup-" + i}>
                      {s} •
                    </span>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
