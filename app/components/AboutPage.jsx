'use client';
import React from 'react';


export default function AboutPage() {
  return (
    <>
    <div className='mt-20 p-12'>
        <h2>About Us </h2>
        <p> At mad, we are passionate about helping businesses and organizations achieve their digital goals. </p>
    </div>

    <section className="bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className='bg-white p-10'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
            </svg>
          <h3 className="text-3xl font-bold mb-6">Our Mission</h3>
          <p className="text-gray-700 mb-4">
          Our mission is to deliver innovative and effective digital solutions that drive growth and success for our clients. We strive to create user-centric designs and seamless experiences that resonate with audiences and elevate brands.
          </p>
        </div>
        <div className='bg-white p-10'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h1l1 2h13l1-2h1M5 6h14l1 2H4l1-2zM5 18h14l1-2H4l1 2z" />
            </svg>
          <h3 className="text-3xl font-bold mb-6">Our Vision</h3>
          <p className="text-gray-700 mb-4">
          Our vision is to be a leading digital agency known for creativity, excellence, and impact. We aim to empower businesses through cutting-edge technology and design, fostering long-term partnerships that fuel innovation and transformation in the digital landscape.
          </p>
        </div>
      </div>
    </section>



    < section className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <h3 className="text-3xl font-bold mb-6 text-center">Our Values</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 bg-amber-600 p-10 rounded-lg">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h4 className="text-xl font-semibold mb-4">Innovation</h4>
            <p className="text-gray-700">We believe in embracing innovation and constantly pushing the boundaries of what's possible.</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h4 className="text-xl font-semibold mb-4">Quality</h4>
            <p className="text-gray-700">We prioritize quality in everything we do, ensuring that our work meets the highest standards.</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h4 className="text-xl font-semibold mb-4">Collaboration</h4>
            <p className="text-gray-700">We value collaboration and teamwork, working closely with clients and partners to achieve common goals.</p>
          </div>
        </div>
      </div>
    </section>


    <section className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
        <h3 className="text-3xl font-bold mb-6">Meet the Team</h3>
        <p className="text-gray-700 mb-8">
          Our team is made up of talented and dedicated professionals who are passionate about what they do. From designers and developers to strategists and marketers, we work together to deliver exceptional results for our clients.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Joshua - Founder */}
          <div className="group relative rounded-lg overflow-hidden shadow-lg cursor-pointer h-80">
            <img 
              src="/images/team/joshua.jpg" 
              alt="Joshua - Founder" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
              <h4 className="text-2xl font-bold text-white mb-2">Joshua</h4>
              <p className="text-gray-200 text-lg">Founder</p>
            </div>
          </div>

          {/* Nancy - Designer */}
          <div className="group relative rounded-lg overflow-hidden shadow-lg cursor-pointer h-80">
            <img 
              src="/images/team/nancy.jpg" 
              alt="Nancy - Designer" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
              <h4 className="text-2xl font-bold text-white mb-2">Nancy</h4>
              <p className="text-gray-200 text-lg">Designer</p>
            </div>
          </div>

          {/* Mitch - Digital Strategist */}
          <div className="group relative rounded-lg overflow-hidden shadow-lg cursor-pointer h-80">
            <img 
              src="/images/team/mitch.jpg" 
              alt="Mitch - Digital Strategist" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
              <h4 className="text-2xl font-bold text-white mb-2">Mitch</h4>
              <p className="text-gray-200 text-lg">Digital Strategist</p>
            </div>
          </div>

          {/* Felix - Marketer */}
          <div className="group relative rounded-lg overflow-hidden shadow-lg cursor-pointer h-80">
            <img 
              src="/images/team/felix.jpg" 
              alt="Felix - Marketer" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
              <h4 className="text-2xl font-bold text-white mb-2">Felix</h4>
              <p className="text-gray-200 text-lg">Marketer</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Our Approach Section - Timeline */}
    <section className='py-20 px-6 bg-gradient-to-br from-gray-50 to-gray-100'>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Approach</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We take a collaborative and client-focused approach to every project. Here's how we bring your vision to life.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line - Hidden on mobile */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 opacity-30"></div>

          {/* Steps */}
          <div className="space-y-12">
            {/* Step 1 - Discovery */}
            <div className="relative flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2 md:text-right md:pr-12">
                <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                  <div className="flex items-center justify-between mb-4 md:flex-row-reverse">
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <span className="text-white/80 font-bold text-lg">Step 01</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">Discovery & Research</h3>
                  <p className="text-white/90">
                    We start by understanding your business, goals, target audience, and competitors. This deep dive helps us create designs that truly resonate.
                  </p>
                </div>
              </div>
              <div className="hidden md:block w-8 h-8 rounded-full bg-blue-500 border-4 border-white shadow-lg z-10"></div>
              <div className="md:w-1/2"></div>
            </div>

            {/* Step 2 - Strategy */}
            <div className="relative flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2"></div>
              <div className="hidden md:block w-8 h-8 rounded-full bg-purple-500 border-4 border-white shadow-lg z-10"></div>
              <div className="md:w-1/2 md:pl-12">
                <div className="bg-gradient-to-br from-purple-500 to-indigo-500 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-white/80 font-bold text-lg">Step 02</span>
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">Strategy & Planning</h3>
                  <p className="text-white/90">
                    We develop a comprehensive strategy and create a detailed roadmap. Every decision is intentional and aligned with your business objectives.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3 - Design */}
            <div className="relative flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2 md:text-right md:pr-12">
                <div className="bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                  <div className="flex items-center justify-between mb-4 md:flex-row-reverse">
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                      </svg>
                    </div>
                    <span className="text-white/80 font-bold text-lg">Step 03</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">Creative Design</h3>
                  <p className="text-white/90">
                    Our designers bring your vision to life with stunning visuals. We create multiple concepts for you to review and provide feedback on.
                  </p>
                </div>
              </div>
              <div className="hidden md:block w-8 h-8 rounded-full bg-pink-500 border-4 border-white shadow-lg z-10"></div>
              <div className="md:w-1/2"></div>
            </div>

            {/* Step 4 - Refinement */}
            <div className="relative flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2"></div>
              <div className="hidden md:block w-8 h-8 rounded-full bg-amber-500 border-4 border-white shadow-lg z-10"></div>
              <div className="md:w-1/2 md:pl-12">
                <div className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-white/80 font-bold text-lg">Step 04</span>
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">Revision & Refinement</h3>
                  <p className="text-white/90">
                    We refine the designs based on your feedback. This collaborative process continues until you're 100% satisfied with the result.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 5 - Delivery */}
            <div className="relative flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2 md:text-right md:pr-12">
                <div className="bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                  <div className="flex items-center justify-between mb-4 md:flex-row-reverse">
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-white/80 font-bold text-lg">Step 05</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">Delivery & Support</h3>
                  <p className="text-white/90">
                    Final files are delivered in all necessary formats. We provide ongoing support to ensure smooth implementation and answer any questions.
                  </p>
                </div>
              </div>
              <div className="hidden md:block w-8 h-8 rounded-full bg-emerald-500 border-4 border-white shadow-lg z-10"></div>
              <div className="md:w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    </section>


    <section className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
        <h3 className="text-3xl font-bold mb-6">Contact Us</h3>
        <p className="text-gray-700 mb-8">
          Have a question or want to work with us? Reach out to us through our contact form or email us directly.
        </p>
      </div>
    </section>
    </>
  )
}
