'use client';
import React, { useEffect, useRef } from 'react';

export default function Example() {
  const tickerRef = useRef(null);

  // Define the logos in an array to easily duplicate them
  const logos = [
    { alt: 'Transistor', src: '/logos/mad.png' },
    { alt: 'Reform', src: '/logos/mentor.jpg' },
    { alt: 'Tuple', src: '/logos/moko.png' },
    { alt: 'SavvyCal', src: '/logos/the.png' },
    { alt: 'Statamic', src: '/logos/tog.png' },
  ];

  // Duplicate the array so that the scrolling never "snaps" to empty space
  const duplicatedLogos = [...logos, ...logos];

  useEffect(() => {
    const ticker = tickerRef.current;
    let animationFrameId;
    let position = 0;
    const speed = 1; // Adjust this value to make it faster or slower

    const scroll = () => {
      if (ticker) {
        position -= speed;
        // When we have scrolled exactly halfway (the length of the original list), reset to 0
        // We use ticker.scrollWidth / 2 because we duplicated the items
        if (position <= -(ticker.scrollWidth / 2)) {
          position = 0;
        }
        ticker.style.transform = `translateX(${position}px)`;
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    // Cleanup function to prevent memory leaks if the component unmounts
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="py-10 sm:py-10  bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-center text-lg/8 font-semibold text-gray-900">
          Trusted by Kenya’s top Brands
        </h2>

        {/* Wrapper limits the visible area and hides the overflow. 
          Optional: Add a gradient mask to fade the edges.
        */}
        <div 
          className="mt-10 flex overflow-hidden relative"
          style={{
            maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
          }}
        >
          {/* The moving container */}
          <div
            ref={tickerRef}
            className="flex items-center gap-x-16 max-w-full overflow-hidden"
          >
            {duplicatedLogos.map((logo, index) => (
              <img
                key={index}
                alt={logo.alt}
                src={logo.src}
                width={158}
                height={48}
                // Flex-shrink-0 prevents logos from squishing together
                className="max-h-12 w-[158px] object-contain flex-shrink-0"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}