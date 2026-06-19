"use client";

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const services = [
  {
    title: 'Web Design ',
    href: '/Services/web-design',
    description: 'We make digital experiences smooth and enjoyable.',
  },
  {
    title: 'Brand Identity',
    href: '/Services/brand-identity',
    description: 'Your brand deserves a unique personality.',
  },
  {
    title: 'Logo Design',
    href: '/Services/logo-design',
    description: 'Your message deserves to be seen.',
  },
  {
    title: 'Packaging designs',
    href: '/Services/packaging-designs',
    description: 'Add life and movement to your brand.',
  },
  {
    title: 'Print Design',
    href: '/Services/print-design',
    description:
      'From custom art pieces to digital illustrations, we help you express your brand in a unique and artistic way.',
  },
  
];

export default function ServiceSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const updateActiveIndex = () => {
      const cards = Array.from(carousel.querySelectorAll('[data-service-card]'));
      if (!cards.length) return;

      const scrollLeft = carousel.scrollLeft;
      const distances = cards.map((card) => Math.abs(card.offsetLeft - scrollLeft));
      const closestIndex = distances.indexOf(Math.min(...distances));
      setActiveIndex(closestIndex);
    };

    updateActiveIndex();
    carousel.addEventListener('scroll', updateActiveIndex, { passive: true });
    return () => carousel.removeEventListener('scroll', updateActiveIndex);
  }, []);

  const scrollToCard = (index) => {
    const carousel = carouselRef.current;
    const card = carousel?.querySelector(`[data-service-card='${index}']`);
    if (!carousel || !card) return;

    carousel.scrollTo({ left: card.offsetLeft, behavior: 'smooth' });
  };

  return (
    <section className="w-full py-24 text-gray-800 bg-[#f2f2f2] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="max-w-3xl">
          <p className="font-thin text-sm text-blue-900 uppercase tracking-wide mb-2">
            Services
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-primary tracking-tight leading-tight">
            What We Do
          </h2>
          <div className="mt-5 h-1.5 w-24 rounded-full bg-accent" />
          <p className="mt-6 max-w-2xl text-lg text-gray-600">
            Premium creative experiences built for brands that want a refined presence.
            Every detail is designed with precision, authority, and a polished finish.
          </p>
        </div>

        {/* Desktop grid layout */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 mt-16">
          {services.map((service) => (
            <Link
              key={service.title}
              href={service.href}
              className="group hover:[clip-path:polygon(0_0,calc(100%_-_40px)_0,100%_40px,100%_100%,0_100%)] bg-white border border-purple-50 p-8 min-h-[280px] flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-purple-200"
            >
              <div>
                <span className="inline-flex [clip-path:polygon(0_0,calc(100%_-_10px)_0,100%_10px,100%_100%,0_100%)] bg-[#78a9ff] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white">
                  Mad Graphix
                </span>
                <h3 className="mt-6 text-2xl font-bold text-gray-800 leading-tight group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-gray-600">
                  {service.description}
                </p>
              </div>
              <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-blue transition-all duration-300 group-hover:gap-3">
                <span className="border-b-2 border-accent border-dashed pb-0.5">Explore</span>
                <span aria-hidden="true" className="text-lg">→</span>
              </div>
            </Link>
          ))}
          <div className='bg-white p-8 min-h-[280px] flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-purple-200'>
            <h3 >Need something custom</h3>
            <p>Reach out to us today and we will deliver. </p>
            <button className='border border-1 '>Reach Out</button>
          </div>
        </div>

        {/* Mobile carousel layout */}
        <div className="md:hidden mt-12">
          <div
            ref={carouselRef}
            className="mobile-scroll-x no-scrollbar snap-x -mx-6 px-6 flex gap-5 pb-6"
          >
            {services.map((service, index) => (
              <Link
                key={service.title}
                href={service.href}
                data-service-card={index}
                className="snap-start shrink-0 w-[85vw] min-w-[85vw] rounded-3xl bg-white border border-purple-50 p-8 flex flex-col justify-between transition-all duration-300 shadow-md"
              >
                <div>
                  <span className="inline-flex rounded-full bg-purple-50 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-primary">
                    Mad Graphix
                  </span>
                
                </div>
                <div className="mt-8 flex flex-col items-start gap-2 text-sm font-bold text-blue">
                    <h3 className="mt-6 text-2xl font-bold text-gray-800 leading-tight">
                    {service.title}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-gray-600">
                    {service.description}
                  </p>
                  <div className=" flex  items-center justify-between gap-2 text-sm font-semibold text-blue transition-all duration-300 group-hover:gap-3">
                  <span className=" border-blue border-dashed pb-0.5">Explore</span>
                  <span aria-hidden="true" className="text-lg">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Scroll indicator dots */}
          <div className="mt-6 flex items-center justify-center gap-3">
            {services.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => scrollToCard(index)}
                aria-label={`Go to service ${index + 1}`}
                className={`h-3 w-3 rounded-full transition-all duration-300 ${
                  activeIndex === index ? 'bg-primary scale-125' : 'bg-purple-200'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
