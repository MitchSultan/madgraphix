"use client";
import React from "react";
import { useState } from "react";

export default function MultiItemCarousel({ children, itemsPerView = 4 }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const totalItems = React.Children.count(children);
  const maxIndex = Math.ceil(totalItems / itemsPerView) - 1;

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
  };

  return (
    <>
      {/* Mobile: native touch-scroll carousel */}
      <div className="md:hidden -mx-4 px-4">
        <div className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory touch-pan-x">
          {React.Children.map(children, (child, i) => (
            <div
              key={`m-${i}`}
              className="snap-start flex-shrink-0"
              style={{ width: '80%' }}
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {/* Desktop/tablet: JS controlled carousel with buttons */}
      <div className="hidden md:block relative w-full overflow-hidden">
        {/* Track */}
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            width: `${(totalItems / itemsPerView) * 100}%`,
          }}
        >
          {React.Children.map(children, (child, i) => (
            <div
              key={`d-${i}`}
              className="w-full flex-shrink-0"
              style={{ width: `${100 / itemsPerView}%` }}
            >
              {child}
            </div>
          ))}

        </div>

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
      </div>
    </>
  );
}
