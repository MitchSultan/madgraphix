'use client';
import React from 'react';

export default function AboutPage() {
  const services = [
    {
      title: 'Logo Design',
      description: 'Crafting logos that make your brand unforgettable.',
      icon: (
        <svg className="w-10 h-10 text-[#512396]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.092 2.022-.273 3m-1.52 4.47l-.012.019c-1.536 2.378-4.526 3.125-7.147 1.832-2.62-1.293-3.418-4.14-1.88-6.52l.011-.02m9.467-9.52c1.785-2.054 4.887-2.316 7.15-.558a5.1 5.1 0 011.66 5.86m-9.61 3.56c.712-1.42.712-3.084 0-4.504" />
        </svg>
      )
    },
    {
      title: 'Brand Identity',
      description: 'Building a cohesive and unique look for your brand.',
      icon: (
        <svg className="w-10 h-10 text-[#512396]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      )
    },
    {
      title: 'Web Design',
      description: 'Creating websites that are as functional as they are beautiful.',
      icon: (
        <svg className="w-10 h-10 text-[#512396]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: 'Packaging Design',
      description: 'Designing packaging that catches the eye.',
      icon: (
        <svg className="w-10 h-10 text-[#512396]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      )
    },
    {
      title: 'Print Design',
      description: 'From business cards to brochures, we\'ve got it all.',
      icon: (
        <svg className="w-10 h-10 text-[#512396]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
        </svg>
      )
    }
  ];

  return (
    <div className="font-sans text-gray-800 bg-[#f9f8fc] min-h-screen">
      {/* Hero / About Us Section */}
      <section className="relative bg-[#e9e1f5] pt-32 pb-24 px-6 overflow-hidden">
        {/* Decorative background shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#d1c2eb] rounded-full mix-blend-multiply filter blur-3xl opacity-50 transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#fbd4a1] rounded-full mix-blend-multiply filter blur-3xl opacity-40 transform -translate-x-1/2 translate-y-1/2"></div>

        <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#512396] mb-6 tracking-tight">
              Hey there! <br /> Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#512396] to-[#ff8c00]">M.A.D Graphix!</span>
            </h1>
            <div className="text-lg md:text-xl text-gray-700 space-y-6 max-w-2xl">
              <p>
                We are all about bringing your brand to life with creative and eye-catching designs. At <span className="font-bold text-[#512396]">Mirror Arts Designs Graphix</span>, we mix a love for design with a knack for making your brand pop.
              </p>
              <p>
                Whether it's a fresh logo, a complete brand makeover, or a snazzy new website, we've got you covered. This is where <span className="font-bold italic text-[#ff8c00]">Creativity Goes Mad.</span>
              </p>
              <p>
                Our team is here to turn your ideas into reality. We work closely with you to make sure your brand looks just as awesome as you imagined.
              </p>
            </div>
            
            <div className="mt-10">
              <button className="bg-[#512396] text-white px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 hover:bg-[#3d1a73]">
                Let's Work Together
              </button>
            </div>
          </div>
          
          <div className="flex-1 w-full flex justify-center">
            {/* Visual element placeholder mimicking the hero from screenshot */}
            <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full bg-gradient-to-br from-[#cbb5e8] to-[#fbd4a1] shadow-2xl flex items-center justify-center p-4">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden border-8 border-white shadow-inner">
                <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Creative Design" className="w-full h-full object-cover" />
              </div>
              
              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 bg-white p-4 rounded-xl shadow-lg border border-purple-100 transform rotate-6">
                <span className="font-bold text-[#512396]">100%</span>
                <p className="text-xs text-gray-500">Creative</p>
              </div>
              <div className="absolute bottom-10 -left-10 bg-white p-4 rounded-xl shadow-lg border border-purple-100 transform -rotate-3">
                <span className="font-bold text-[#ff8c00]">Unique</span>
                <p className="text-xs text-gray-500">Designs</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-24 px-6 bg-white relative">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-4">
            <span className="bg-[#f0e6f5] text-[#512396] px-4 py-1.5 rounded-full text-sm font-bold tracking-wider uppercase">Our Purpose</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-[#512396] mb-10">OUR MISSION</h2>
          
          <div className="relative">
            {/* Quote marks */}
            <span className="absolute -top-10 -left-6 md:-left-12 text-6xl md:text-8xl text-[#f0e6f5] font-serif leading-none">"</span>
            <span className="absolute -bottom-16 -right-6 md:-right-12 text-6xl md:text-8xl text-[#f0e6f5] font-serif leading-none">"</span>
            
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-medium italic relative z-10">
              To create designs and brands that resonates with authenticity and emotional depth, capturing the essence of the human experience through every design.
            </p>
            <p className="text-lg md:text-xl text-gray-600 mt-6 relative z-10">
              We are dedicated to not only inspire but also forge a deep connection with our audience, reflecting true passion and creativity in every work we produce.
            </p>
          </div>
          
          <div className="mt-12">
            <span className="text-2xl md:text-3xl font-extrabold text-[#ff8c00] transform -rotate-2 inline-block">
              Art Straight from the Heart! ❤️
            </span>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-24 px-6 bg-[#f9f8fc]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#512396] mb-4">What We Do</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From conception to completion, we offer a comprehensive suite of design services to elevate your brand.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-purple-50 group hover:-translate-y-2"
              >
                <div className="w-16 h-16 bg-[#f0e6f5] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#512396] transition-colors duration-300">
                  <div className="text-[#512396] group-hover:text-white transition-colors duration-300">
                    {service.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
            
            {/* Call to action card to balance the grid (since we have 5 items) */}
            <div className="bg-gradient-to-br from-[#512396] to-[#3d1a73] rounded-3xl p-8 shadow-lg flex flex-col justify-center items-center text-center text-white">
              <h3 className="text-2xl font-bold mb-4">Ready to start?</h3>
              <p className="text-purple-200 mb-8">Let's discuss your next project.</p>
              <button className="bg-white text-[#512396] px-6 py-3 rounded-full font-bold hover:bg-[#ff8c00] hover:text-white transition-colors duration-300 w-full">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
