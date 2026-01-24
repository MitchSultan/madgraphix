"use client";

import { useRef, useState, useEffect } from "react";

export default function WorkShowcase({ works = [] }) {
  const sliderRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Fallback if no works are passed (optional, or just render nothing/message)
  if (!works || works.length === 0) {
    // You might want to handle the empty state, or just return null
    // For now, let's keep the hook calls valid by returning early AFTER hooks
    // But hooks are already called above.
    // If we really want to be safe we can use a default empty array in props which we did.
  }

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
    <section className="w-full py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="mb-12 flex flex-col md:flex-row items-center md:justify-between ">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">Our Work</h2>
          <p className="text-gray-600 text-lg">
            A showcase of the digital experiences we’ve crafted for brands across different industries.
          </p>
        </div>

        {/* Carousel */}
        <div
          ref={sliderRef}
          className="flex gap-6 overflow-x-scroll no-scrollbar cursor-grab active:cursor-grabbing py-4"
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
              className="min-w-[280px] md:min-w-[350px] bg-gray-100 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition"
            >
              <div className="relative w-full h-52 overflow-hidden">
                <img
                  src={work.image}
                  alt={work.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h5 className="text-xl font-semibold mb-2">{work.title}</h5>
                <a href={work.link} className="text-blue-600 hover:underline">
                  View Case Study &rarr;
                </a>
              </div>

              {/* Ticker */}
              <div className="w-full overflow-hidden  py-2">
                <div className="flex whitespace-nowrap animate-scroll text-black text-sm gap-10 px-4">
                  {work.services.map((s, i) => (
                    <span key={i} className="opacity-90">
                      {s} •
                    </span>
                  ))}
                  {/* Duplicate for smooth loop */}
                  {work.services.map((s, i) => (
                    <span key={"dup-" + i} className="opacity-90">
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
