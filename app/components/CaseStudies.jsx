// /components/CaseStudies.js
// Responsive Case Studies Section (JavaScript + Tailwind)
'use client';
import React from "react";
import MultiItemCarousel from '@/app/components/card';

const caseStudies = [
  {
    id: 1,
    tag: "The City of Leipzig",
    title:
      "More than a rebranding: Leipzig’s brand and citizen portal – built together for everyday life.",
    image: "/images/book.jpg", // replace with actual image
  },
  {
    id: 2,
    tag: "Stiftung Warentest",
    title: "Rebranding the most trusted brand in Germany",
    image: "/images/gggg.jpg",
  },
  {
    id: 3,
    tag: "Article",
    title:
      "100,000 Subscribers by 2026: Powerful Relaunch for an Iconic Brand",
    image: "/images/nb.png",
  },
];

export default function CaseStudies() {
  return (
    <section className="w-full py-section bg-canvas">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Heading */}
        <h2 className="text-headline font-semibold text-ink mb-8 case-study-heading">
          Case Studies and Insights
        </h2>

        {/* Cards */}
        <MultiItemCarousel itemsPerView={3}>
          {caseStudies.map((item) => (
            <div key={item.id} className="group cursor-pointer">
              <div className="w-full h-56 overflow-hidden rounded-md mb-4 bg-surface-soft">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <p className="text-eyebrow font-medium mb-2 uppercase case-study-eyebrow">
                {item.tag}
              </p>

              <h5 className="text-card-title font-semibold leading-snug text-ink group-hover:underline case-study-title">
                {item.title}
              </h5>
            </div>
          ))}
        </MultiItemCarousel>

        {/* CTA Link */}
        <div className="mt-10 ">
          <a
            href="#"
            className="text-accent-magenta font-medium inline-flex items-center gap-1 hover:underline"
            onClick={(e) => e.preventDefault()}
          >
            Read all About Us
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
