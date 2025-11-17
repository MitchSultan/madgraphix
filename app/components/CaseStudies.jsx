// /components/CaseStudies.js
// Responsive Case Studies Section (JavaScript + Tailwind)
'use client';
import React from "react";

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
    <section className="w-full py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Heading */}
        <h2 className="text-lg font-semibold text-red-600 mb-8">
          Case Studies and Insights
        </h2>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {caseStudies.map((item) => (
            <div key={item.id} className="group cursor-pointer">
              {/* Image */}
              <div className="w-full h-56 overflow-hidden rounded-sm mb-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Tag */}
              <p className="text-sm text-red-600 font-medium mb-2">
                {item.tag}
              </p>

              {/* Title */}
              <h5 className="text-xl font-semibold leading-snug text-gray-900 group-hover:underline">
                {item.title}
              </h5>
            </div>
          ))}
        </div>

        {/* CTA Link */}
        <div className="mt-10">
          <a
            href="#"
            className="text-red-600 font-medium inline-flex items-center gap-1 hover:underline"
            onClick={(e) => e.preventDefault()}
          >
            See how we have done it for our clients
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
