"use client";
import { useState, useEffect } from "react";

const slides = [
  {
    title: "Logo Design",
    content: "We craft unforgettable logos that make your brand pop.",
    bg: "bg-pink-500"
  },
  {
    title: "Web Design",
    content: "We build websites that are beautiful, functional, and responsive.",
    bg: "bg-indigo-500"
  },
  {
    title: "Brand Identity",
    content: "We create cohesive brand systems that resonate with your audience.",
    bg: "bg-green-500"
  },
];

export default function SectionCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-change every 4s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === slides.length - 1 ? 0 : prev + 1
      );
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const goToPrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prev) =>
      prev === slides.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto h-64 flex items-center justify-center overflow-hidden rounded-2xl shadow-lg">
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute w-full h-full flex flex-col items-center justify-center text-white text-center transition-opacity duration-700 ease-in-out p-6 ${slide.bg}`}
          style={{ opacity: i === currentIndex ? 1 : 0 }}
        >
          <h2 className="text-2xl font-bold mb-2">{slide.title}</h2>
          <p className="text-lg">{slide.content}</p>
        </div>
      ))}

      {/* Controls */}
      <button
        onClick={goToPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full"
      >
        ‹
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full"
      >
        ›
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`w-3 h-3 rounded-full ${
              i === currentIndex ? "bg-white" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
