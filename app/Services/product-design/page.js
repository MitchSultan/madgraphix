import React from 'react';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';

export default function ProductDesignPage() {
  return (
    <>
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-cyan-50 to-blue-100 pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight text-gray-900">
            Product Design
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto">
            Design intuitive digital products that users love and businesses trust
          </p>
        </div>
      </section>

      {/* Service Details */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div className="bg-gray-200 rounded-2xl h-96 flex items-center justify-center">
              <img src="/images/services/product.jpg" alt="Product Design" className="w-full h-full object-cover rounded-2xl" />
            </div>
            <div>
              <h2 className="text-4xl font-bold mb-6">User-Centered Design</h2>
              <p className="text-gray-700 text-lg mb-4">
                Great product design goes beyond aesthetics. We create intuitive, user-friendly interfaces that solve real problems and deliver exceptional experiences across all touchpoints.
              </p>
              <p className="text-gray-700 text-lg">
                From mobile apps to SaaS platforms, we design products that users enjoy and businesses depend on.
              </p>
            </div>
          </div>

          {/* What We Offer */}
          <div className="mb-20">
            <h3 className="text-3xl font-bold mb-8 text-center">What We Offer</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-8 rounded-xl">
                <div className="bg-cyan-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold mb-3">Mobile App Design</h4>
                <p className="text-gray-600">Beautiful, intuitive iOS and Android app interfaces.</p>
              </div>

              <div className="bg-gray-50 p-8 rounded-xl">
                <div className="bg-cyan-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold mb-3">Web Applications</h4>
                <p className="text-gray-600">Powerful, user-friendly interfaces for web-based products.</p>
              </div>

              <div className="bg-gray-50 p-8 rounded-xl">
                <div className="bg-cyan-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold mb-3">UX Research</h4>
                <p className="text-gray-600">User testing and research to validate design decisions.</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl p-12 text-center text-white">
            <h3 className="text-3xl font-bold mb-4">Ready to design your product?</h3>
            <p className="text-xl mb-8 text-white/90">Let's create digital products that users will love</p>
            <a
              href="https://wa.me/254708779284"
              className="inline-block bg-white text-cyan-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors"
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
