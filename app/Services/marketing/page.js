import React from 'react';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';

export default function MarketingPage() {
  return (
    <>
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-green-50 to-teal-100 pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight text-gray-900">
            Marketing & Strategy
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto">
            Your message deserves to be seen by the right audience at the right time
          </p>
        </div>
      </section>

      {/* Service Details */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-4xl font-bold mb-6">Strategic Growth Marketing</h2>
              <p className="text-gray-700 text-lg mb-4">
                We develop data-driven marketing strategies that drive real business results. From brand awareness to lead generation, we create campaigns that resonate with your target audience.
              </p>
              <p className="text-gray-700 text-lg">
                Our holistic approach combines digital marketing, content strategy, and analytics to maximize your ROI.
              </p>
            </div>
            <div className="bg-gray-200 rounded-2xl h-96 flex items-center justify-center">
              <img src="/images/services/marketing.jpg" alt="Marketing" className="w-full h-full object-cover rounded-2xl" />
            </div>
          </div>

          {/* What We Offer */}
          <div className="mb-20">
            <h3 className="text-3xl font-bold mb-8 text-center">What We Offer</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-8 rounded-xl">
                <div className="bg-green-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold mb-3">Digital Strategy</h4>
                <p className="text-gray-600">Comprehensive digital marketing strategies tailored to your goals.</p>
              </div>

              <div className="bg-gray-50 p-8 rounded-xl">
                <div className="bg-green-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold mb-3">Social Media</h4>
                <p className="text-gray-600">Engaging social media campaigns that build communities.</p>
              </div>

              <div className="bg-gray-50 p-8 rounded-xl">
                <div className="bg-green-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold mb-3">SEO & Analytics</h4>
                <p className="text-gray-600">Data-driven optimization for maximum visibility and growth.</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl p-12 text-center text-white">
            <h3 className="text-3xl font-bold mb-4">Ready to grow your business?</h3>
            <p className="text-xl mb-8 text-white/90">Let's create a winning marketing strategy together</p>
            <a
              href="https://wa.me/254708779284"
              className="inline-block bg-white text-green-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors"
            >
              Get Started
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
