// /components/Testimonials.js
// Next.js React component (JavaScript) - Tailwind CSS required in project
'use client';
import React, { useEffect, useState, useRef } from "react";

const testimonials = [
  {
    id: 1,
    name: "Anthony Smith",
    title: "Founder, The 4 Color",
    quote:
      "The communication and ability to take feedback were incredible. I felt like my vision was not only met but exceeded. I can't think of anything I would have changed about this project.",
    // small identifier to render inside the circle (you can replace with image URL)
    avatarText: "t4c",
    color: "bg-green-200",
  },
  {
    id: 2,
    name: "Kangni Guo",
    title: "Executive Manager Ascendant",
    quote:
      "What impressed us most about this company was their exceptional creativity and ability to deeply understand our brand vision. Their innovative approach to branding set them apart.",
    avatarText: "KG",
    color: "bg-indigo-800 text-white",
  },
  {
    id: 3,
    name: "Aaron Von Kreisler",
    title: "Founder, Modhaus",
    quote:
      "Geo & Numinous delivered an amazing visual identity beyond my expectations – many logo variations, a full brand document, and more.",
    avatarText: "AVK",
    color: "bg-orange-400",
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0); // current slide start index
  const [slidesToShow, setSlidesToShow] = useState(3); // responsive
  const autoSlideRef = useRef(null);
  const containerRef = useRef(null);

  // set slidesToShow based on window width
  useEffect(() => {
    function handleResize() {
      const w = window.innerWidth;
      if (w < 640) setSlidesToShow(1);
      else if (w < 1024) setSlidesToShow(2);
      else setSlidesToShow(3);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // auto slide every 6 seconds
  useEffect(() => {
    stopAuto();
    autoSlideRef.current = setInterval(() => {
      next();
    }, 6000);
    return () => stopAuto();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, slidesToShow]);

  function stopAuto() {
    if (autoSlideRef.current) {
      clearInterval(autoSlideRef.current);
      autoSlideRef.current = null;
    }
  }

  function prev() {
    stopAuto();
    setIndex((prevIndex) => {
      const newIndex = (prevIndex - 1 + testimonials.length) % testimonials.length;
      return newIndex;
    });
  }

  function next() {
    stopAuto();
    setIndex((prevIndex) => {
      const newIndex = (prevIndex + 1) % testimonials.length;
      return newIndex;
    });
  }

  // ensure index always valid (when slidesToShow changes)
  useEffect(() => {
    if (index >= testimonials.length) {
      setIndex(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slidesToShow]);

  // swipe handling
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  function onTouchStart(e) {
    stopAuto();
    touchStartX.current = e.touches[0].clientX;
  }
  function onTouchMove(e) {
    touchEndX.current = e.touches[0].clientX;
  }
  function onTouchEnd() {
    const delta = touchStartX.current - touchEndX.current;
    const threshold = 40;
    if (delta > threshold) {
      next();
    } else if (delta < -threshold) {
      prev();
    }
  }

  // compute transform: we will show "slidesToShow" cards side-by-side.
  // For a simple infinite loop illusion, translate by -(index * (100 / slidesToShow))%
  // We will render the cards in order; because we loop index modulo length, it will wrap.
  const slideWidthPercent = 100 / slidesToShow;
  // Build visible order: show starting at index and then next slidesToShow items (wrap)
  const visible = [];
  for (let i = 0; i < slidesToShow; i++) {
    visible.push(testimonials[(index + i) % testimonials.length]);
  }

  return (
    <section className="w-full py-12 bg-blue-800"  >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-semibold mb-6">
          Real Experiences from
          <br />
          <span className="block">Brands We’ve Transformed</span>
        </h2>

        {/* slider frame */}
        <div className="relative">
          {/* viewport */}
          <div
            ref={containerRef}
            className="overflow-hidden"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            aria-live="polite"
          >
            {/* inner track */}
            <div
              className="flex transition-transform duration-700 ease-in-out bg-cyan-500"
              style={{
                width: `${(visible.length) * slideWidthPercent}%`,
                transform: `translateX(-0%)`, // we show visible array; no extra shifting needed
              }}
            >
              {/* render visible slides */}
              {visible.map((t, i) => (
                <article
                  key={`${t.id}-${i}`}
                  className="p-6"
                  style={{ width: `${slideWidthPercent}%`, boxSizing: "border-box" }}
                >
                  <div className="flex bg-amber-400 items-start gap-6">
                    {/* avatar circle */}
                    <div
                      className={`flex items-center justify-center rounded-full w-16 h-16 flex-shrink-0 ${t.color}`}
                      aria-hidden="true"
                    >
                      <span className={`text-sm font-semibold ${t.color.includes("text-white") ? "" : "text-gray-900"}`}>
                        {t.avatarText}
                      </span>
                    </div>

                    {/* content */}
                    <div className="flex-1">
                      <h3 className="text-lg font-medium">{t.name}</h3>
                      <p className="text-sm text-gray-500 mb-3">{t.title}</p>
                      <blockquote className="text-sm text-gray-600">{`“${t.quote}”`}</blockquote>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Previous / Next buttons */}
          <div className="absolute top-1/2 left-2 transform -translate-y-1/2">
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="bg-white/90 hover:bg-white p-2 rounded-full shadow"
            >
              <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none" stroke="currentColor">
                <path d="M12 15l-5-5 5-5" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
          <div className="absolute top-1/2 right-2 transform -translate-y-1/2">
            <button
              onClick={next}
              aria-label="Next testimonial"
              className="bg-white/90 hover:bg-white p-2 rounded-full shadow"
            >
              <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none" stroke="currentColor">
                <path d="M8 5l5 5-5 5" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* "Reviewed on Clutch" area */}
      
      </div>
    </section>
  );
}
