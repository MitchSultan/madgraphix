// /components/PartnershipTestimonials.js
// Fully working testimonial carousel — JavaScript + Tailwind
'use client';   
import React, { useState, useEffect } from "react";

const testimonials = [
  {
    text: [
      "“The 500 Designs’ team was nothing but highly professional when it came to our project.",
      { highlight: "They were incredibly efficient, quick to respond, and organized." },
      "We are ecstatic about the finished product &",
      { highlight: "would definitely recommend them." },
      "”",
    ],
    author: "Cyrus Kiani",
    role: "EveryTable, Director of Product",
    avatar: "/images/avatar1.png", // replace with your image
  },
  {
    text: [
      "“Working with this team exceeded every expectation.",
      { highlight: "Their communication was flawless" },
      "and their eye for design was exceptional.",
      { highlight: "We will absolutely work with them again!" },
      "”",
    ],
    author: "Mara Reed",
    role: "Brand Strategist, Nova Labs",
    avatar: "/images/avatar2.png",
  },
  {
    text: [
      "“Superb creative direction and top-tier professionalism.",
      { highlight: "They delivered ahead of schedule" },
      "and guided us through every step.",
      { highlight: "Highly recommended." },
      "”",
    ],
    author: "Daniel M.",
    role: "Founder, Vortex",
    avatar: "/images/avatar3.png",
  },
];

export default function PartnershipTestimonials() {
  const [index, setIndex] = useState(0);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-slide every 7 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full bg-gray-100 py-20 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

        {/* Left Heading */}
        <div>
          <h2 className="text-5xl font-semibold text-[#3a2413] leading-tight">
            Forming<br />lasting<br />partnerships
          </h2>
        </div>

        {/* Right Content */}
        <div className="relative">
          <div className="transition-opacity duration-500">
            {/* Testimonial Text */}
            <p className="text-2xl leading-relaxed text-[#3a2413] mb-10">
              {testimonials[index].text.map((part, i) =>
                typeof part === "string" ? (
                  <span key={i}>{part} </span>
                ) : (
                  <mark
                    key={i}
                    className="px-1 py-0.5 bg-amber-200 rounded-sm"
                  >
                    {part.highlight}
                  </mark>
                )
              )}
            </p>

            {/* Divider */}
            <div className="w-full border-t border-gray-400 my-8"></div>

            {/* Author Info */}
            <div className="flex items-center gap-4">
              <img
                src={testimonials[index].avatar}
                className="w-14 h-14 rounded-full bg-gray-200 object-cover"
                alt="avatar"
              />
              <div>
                <p className="text-lg font-semibold text-[#3a2413]">
                  {testimonials[index].author}
                </p>
                <p className="text-sm text-gray-600">{testimonials[index].role}</p>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-4 mt-10">
            <button
              onClick={prevSlide}
              className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-600 text-gray-700 hover:bg-gray-200 transition"
            >
              <span className="text-2xl">&larr;</span>
            </button>

            <button
              onClick={nextSlide}
              className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-600 text-gray-700 hover:bg-gray-200 transition"
            >
              <span className="text-2xl">&rarr;</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
