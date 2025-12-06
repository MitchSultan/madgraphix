import React from 'react';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';

export default function BrandIdentityPage() {
  return (
    <>
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-100 pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight text-gray-900">
            Brand Identity Design
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto">
            Your brand deserves a unique personality that stands out in the crowd
          </p>
        </div>
      </section>

      {/* Service Details */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div className="bg-gray-200 rounded-2xl h-96 flex items-center justify-center">
              <img src="/images/services/branding.jpg" alt="Brand Identity" className="w-full h-full object-cover rounded-2xl" />
            </div>
            <div>
              <h2 className="text-4xl font-bold mb-6">Build a Memorable Brand</h2>
              <p className="text-gray-700 text-lg mb-4">
                A strong brand identity is more than just a logo. It's the complete visual language that represents your business values, personality, and promise to customers.
              </p>
              <p className="text-gray-700 text-lg">
                We create cohesive brand identities that resonate with your target audience and leave lasting impressions.
              </p>
            </div>
          </div>

          {/* What We Offer */}
          <div className="mb-20">
            <h3 className="text-3xl font-bold mb-8 text-center">What We Offer</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-8 rounded-xl">
                <div className="bg-purple-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold mb-3">Logo Design</h4>
                <p className="text-gray-600">Unique, memorable logos that capture your brand essence.</p>
              </div>

              <div className="bg-gray-50 p-8 rounded-xl">
                <div className="bg-purple-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold mb-3">Brand Guidelines</h4>
                <p className="text-gray-600">Comprehensive style guides for consistent brand application.</p>
              </div>

              <div className="bg-gray-50 p-8 rounded-xl">
                <div className="bg-purple-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold mb-3">Visual Identity</h4>
                <p className="text-gray-600">Complete visual systems including colors, typography, and patterns.</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-12 text-center text-white">
            <h3 className="text-3xl font-bold mb-4">Ready to create your brand identity?</h3>
            <p className="text-xl mb-8 text-white/90">Let's craft a brand that truly represents you</p>
            <a
              href="https://wa.me/254708779284"
              className="inline-block bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors"
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
