'use client';
import React, { useEffect, useRef } from 'react';

const mockClients = [
  { id: 1, name: "ToG", img: "/logos/denri.png" },
  { id: 2, name: "Luxury by Tina", img: "/logos/merishaw.png" },
  { id: 3, name: "CanvasPile", img: "/logos/fayahh.png" },
  { id: 4, name: "MadGraphix", img: "/logos/moko.png" },
  { id: 5, name: "Evolve Sphere", img: "/logos/the.png" },
  { id: 6, name: "Inner Harbor", img: "/logos/tog.png" },
  { id: 7, name: "Nesh Collections", img: "/logos/kings.png" },
  { id: 8, name: "Reuben", img: "/logos/kimuka.png" },
];

export default function LogoMarquee() {
  const marqueeRef = useRef(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    // Clone items for seamless loop
    const items = marquee.querySelectorAll('.marquee-item');
    items.forEach(item => {
      const clone = item.cloneNode(true);
      marquee.appendChild(clone);
    });
  }, []);

  return (
    <section className="py-12 bg-white overflow-hidden border-y border-gray-100">
      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        .marquee-container {
          display: flex;
          animation: scroll 30s linear infinite;
        }

        .marquee-container:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4">
        <p className="text-xs md:text-lg font-medium text-gray-400 uppercase tracking-widest mb-6 md:text-center">
          Trusted by leading brands
        </p>

        <div className="overflow-hidden">
          <div className="marquee-container" ref={marqueeRef}>
            {mockClients.map((client) => (
              <div
                key={client.id}
                className="marquee-item flex-shrink-0 px-8 sm:px-12"
              >
                <div className="flex items-center justify-center h-32 bg-gray-50 rounded-lg border border-gray-100 px-6 min-w-max">
                  <img src={client.img} alt={client.name} width={100} height={100} className="object-cover" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
