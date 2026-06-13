"use client";
import React, { useState, useEffect } from "react";

function useItemsPerView(desktopCount) {
  const [items, setItems] = useState(1); // SSR-safe default

  useEffect(() => {
    const update = () =>
      setItems(window.innerWidth >= 768 ? desktopCount : 3);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [desktopCount]);

  return items;
}

export default function MultiItemCarousel({ children, itemsPerView = 3 }) {
  const [current, setCurrent] = useState(0);
  const perView = useItemsPerView(itemsPerView);

  const totalItems = React.Children.count(children);
  const totalPages = Math.ceil(totalItems / perView);
  const page = Math.min(current, totalPages - 1); // clamp on resize

  const goTo = (p) => setCurrent(Math.max(0, Math.min(p, totalPages - 1)));
  const goToPrev = () => goTo(page === 0 ? totalPages - 1 : page - 1);
  const goToNext = () => goTo(page === totalPages - 1 ? 0 : page + 1);

  return (
    <div className="w-full">
      {/* Track */}
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${page * 100}%)`,
            width: `${(totalItems / perView) * 100}%`,
          }}
        >
          {React.Children.map(children, (child, i) => (
            <div
              key={i}
              className="flex-shrink-0 px-2 box-border"
              style={{ width: `${(perView / totalItems) * 100}%` }}
            >
              {child}
            </div>
          ))}
        </div>

        {/* Prev / Next */}
        <button
          onClick={goToPrev}
          aria-label="Previous"
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white border border-gray-200 text-gray-700 w-9 h-9 rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 transition z-10"
        >
          ‹
        </button>
        <button
          onClick={goToNext}
          aria-label="Next"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white border border-gray-200 text-gray-700 w-9 h-9 rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 transition z-10"
        >
          ›
        </button>
      </div>

      {/* Dots */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Page ${i + 1}`}
              className={`rounded-full transition-all ${
                i === page
                  ? "w-4 h-2 bg-emerald-600"
                  : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}