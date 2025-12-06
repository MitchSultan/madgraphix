'use client';
import React from 'react';

export default function ServicePage() {
  const services = [
    {
      title: "Web Design & Development",
      description: "Creating beautiful, responsive websites that captivate and convert.",
      image: "/images/services/web-design.jpg",
      tags: ["UI/UX", "Responsive", "Modern"],
      span: "col-span-2 row-span-1",
      url: "/Services/web-design"
    },
    {
      title: "Brand Identity",
      description: "Your brand deserves a unique personality that stands out.",
      image: "/images/services/branding.jpg",
      tags: ["Logo", "Identity", "Visual"],
      span: "col-span-1 row-span-2",
      url: "/Services/brand-identity"
    },
    {
      title: "Marketing & Strategy",
      description: "Your message deserves to be seen by the right audience.",
      image: "/images/services/marketing.jpg",
      tags: ["Digital", "Strategy", "Growth"],
      span: "col-span-1 row-span-1",
      url: "/Services/marketing"
    },
    {
      title: "Motion Graphics",
      description: "Add life and movement to your brand with stunning animations.",
      image: "/images/services/motion.jpg",
      tags: ["Animation", "Video", "Motion"],
      span: "col-span-1 row-span-2",
      url: "/Services/motion-graphics"
    },
    {
      title: "Illustration & Art",
      description: "Express your brand in a unique and artistic way.",
      image: "/images/services/illustration.jpg",
      tags: ["Custom", "Digital", "Art"],
      span: "col-span-1 row-span-1",
      url: "/Services/illustration"
    },
    {
      title: "Product Design",
      description: "Design intuitive digital products that users love.",
      image: "/images/services/product.jpg",
      tags: ["Apps", "Products", "UX"],
      span: "col-span-1 row-span-1",
      url: "/Services/product-design"
    },
    {
      title: "Content Creation",
      description: "Compelling content that tells your brand story.",
      image: "/images/services/content.jpg",
      tags: ["Copy", "Content", "Story"],
      span: "col-span-1 row-span-1",
      url: "/Services/content-creation"
    },
    {
      title: "Digital Advertising",
      description: "Get value for money spent on strategic ad campaigns.",
      image: "/images/services/ads.jpg",
      tags: ["Ads", "ROI", "Campaigns"],
      span: "col-span-2 row-span-1",
      url: "/Services/digital-advertising"
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">
            Our Creative <span className="text-orange-500">🔥</span> Services
            <br />
            Excellence <span className="text-blue-600">💎</span> Delivered
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
            We transform ideas into reality with cutting-edge design and development solutions
          </p>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-16">What we do</h2>
          
          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-[300px] gap-4">
            {services.map((service, index) => (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer ${service.span}`}
              >
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${service.image})` }}
                >
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                </div>

                {/* Content */}
                <div className="relative h-full flex flex-col justify-end p-6 md:p-8 text-white">
                  {/* Tags */}
                  <div className="flex gap-2 mb-3 flex-wrap">
                    {service.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium border border-white/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl md:text-3xl font-bold mb-3">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-200 text-sm md:text-base mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {service.description}
                  </p>

                  {/* Learn More Link */}
                  <a 
                    href={service.url} 
                    className="text-white font-semibold inline-flex items-center gap-2 hover:gap-3 transition-all"
                  >
                    Learn more 
                    <svg 
                      className="w-5 h-5" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M17 8l4 4m0 0l-4 4m4-4H3" 
                      />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to bring your vision to life?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Let's create something amazing together
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="#contact"
              className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg"
            >
              Get Started
            </a>
            <a
              href="https://wa.me/254708779284"
              className="bg-white/20 backdrop-blur-md text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/30 transition-colors border-2 border-white/50"
            >
              Let's Talk
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
