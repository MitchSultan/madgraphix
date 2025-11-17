'use client';
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function LogoTicker() {
  const wrapperRef = useRef(null);
  const trackRef = useRef(null);

  const logos = [
    "/logos/denri.png",
    "/logos/mad.png",
    "/logos/moko.png",
    "/logos/the.png",
    "/logos/tog.png",
  ];

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const baseTrack = trackRef.current;

    // Get base track width
    let trackWidth = baseTrack.scrollWidth;

    // Duplicate horizontally until wrapper is wide enough
    while (wrapper.scrollWidth < window.innerWidth * 2) {
      const clone = baseTrack.cloneNode(true);
      wrapper.appendChild(clone);
      trackWidth += clone.scrollWidth;
    }

    // GSAP infinite scroll
    gsap.to(wrapper.children, {
      x: `-=${trackWidth / 2}`,
      duration: 18,
      ease: "linear",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x) => parseFloat(x) % -(trackWidth / 2)),
      },
    });
  }, []);

  return (
    <div className="overflow-hidden w-full py-8 bg-white">
      {/* Horizontal wrapper for all tracks */}
      <div
        ref={wrapperRef}
        className="flex whitespace-nowrap items-center gap-16"
      >
        {/* Base track */}
        <div ref={trackRef} className="flex items-center gap-16">
          {logos.map((logo, index) => (
            <img
              key={index}
              src={logo}
              alt={`logo-${index}`}
              className="h-12 md:h-16 lg:h-20 w-auto opacity-70 hover:opacity-100 transition object-contain"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
