"use client";

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const services = [
  {
    title: 'Web Design & Development',
    href: '/Services/web-design',
    description: 'We make digital experiences smooth and enjoyable.',
  },
  {
    title: 'Brand Identity',
    href: '/Services/brand-identity',
    description: 'Your brand deserves a unique personality.',
  },
  {
    title: 'Marketing & Strategy',
    href: '/Services/marketing',
    description: 'Your message deserves to be seen.',
  },
  {
    title: 'Motion Graphics',
    href: '/Services/motion-graphics',
    description: 'Add life and movement to your brand.',
  },
  {
    title: 'Illustration & Art',
    href: '/Services/illustration',
    description:
      'From custom art pieces to digital illustrations, we help you express your brand in a unique and artistic way.',
  },
  {
    title: 'Digital Advertising',
    href: '/Services/digital-advertising',
    description: 'Get value for money spent with campaigns that convert.',
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
    <section className="w-full  py-16 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.35em] text-fuchsia-400/80 mb-4">
            Services
          </p>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight">
            What We Print
          </h2>
          <div className="mt-5 h-1 w-24 rounded-full bg-fuchsia-400" />
          <p className="mt-6 max-w-2xl text-sm text-slate-300 lg:text-base">
            Premium print experiences built for brands that want a refined, editorial presence.
            Every detail is designed with precision, authority, and a polished finish.
          </p>
        </div>

        {/* Desktop grid layout */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 mt-14">
          {services.map((service) => (
            <Link
              key={service.title}
              href={service.href}
              className="group rounded-[28px] border border-white/10  p-8 min-h-[250px] overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_25px_80px_rgba(0,0,0,0.35)]"
            >
              <div className="flex h-full flex-col justify-between">
                <div>
                  <span className="inline-flex rounded-full bg-fuchsia-500/10 px-3 py-1 text-xs font-thins uppercase tracking-[0.2em] text-fuchsia-300">
                    Mad Graphix
                  </span>
                  <h3 className="mt-6 text-2xltext-slate-500 font-semibold leading-tight  ">
                    {service.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-slate-300">
                    {service.description}
                  </p>
                </div>
                <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-fuchsia-300 transition-all duration-300 group-hover:text-fuchsia-400">
                  <span className="border-b border-fuchsia-400 border-dashed pb-1">Explore</span>
                  <span aria-hidden="true">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile carousel layout */}
        <div className="md:hidden mt-14">
          <div
            ref={carouselRef}
            className="mobile-scroll-x no-scrollbar snap-x -mx-6 px-6 flex gap-4 pb-6"
          >
            {services.map((service, index) => (
              <Link
                key={service.title}
                href={service.href}
                data-service-card={index}
                className="snap-start shrink-0 w-[85vw] min-w-[85vw] rounded-[28px] border border-white/10 bg-[#111111] p-6 transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
              >
                <div className="flex h-full flex-col justify-between gap-6">
                  <div>
                    <span className="inline-flex rounded-full bg-fuchsia-500/10 px-3 py-1 text-[11px] font-thin uppercase tracking-[0.25em] text-fuchsia-300">
                      Mad Graphix
                    </span>
                    <h3 className="mt-6 text-2xl font-semibold leading-tight ">
                      {service.title}
                    </h3>
                    <p className="mt-4 text-sm leading-relaxed text-slate-300">
                      {service.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-fuchsia-300">
                    <span className="border-b border-fuchsia-400 border-dashed pb-1">Explore</span>
                    <span aria-hidden="true">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Scroll indicator dots */}
          <div className="mt-3 flex items-center justify-center gap-2">
            {services.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => scrollToCard(index)}
                aria-label={`Go to service ${index + 1}`}
                className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                  activeIndex === index ? 'bg-fuchsia-400 scale-110' : 'bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
