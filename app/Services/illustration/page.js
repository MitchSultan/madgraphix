import React from 'react';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';

export default function IllustrationPage() {
  return (
    <>
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-yellow-50 to-amber-100 pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight text-gray-900">
            Illustration & Art
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto">
            Express your brand in a unique and artistic way with custom illustrations
          </p>
        </div>
      </section>

      {/* Service Details */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-4xl font-bold mb-6">Creative Illustrations</h2>
              <p className="text-gray-700 text-lg mb-4">
                Custom illustrations add personality and uniqueness to your brand. Whether you need editorial illustrations, character design, or decorative art, we create visual narratives that resonate.
              </p>
              <p className="text-gray-700 text-lg">
                Our illustrations are crafted to match your brand's tone and communicate your message with artistic flair.
              </p>
            </div>
            <div className="bg-gray-200 rounded-2xl h-96 flex items-center justify-center">
              <img src="/images/services/illustration.jpg" alt="Illustration" className="w-full h-full object-cover rounded-2xl" />
            </div>
          </div>

          {/* What We Offer */}
          <div className="mb-20">
            <h3 className="text-3xl font-bold mb-8 text-center">What We Offer</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-8 rounded-xl">
                <div className="bg-yellow-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold mb-3">Digital Illustrations</h4>
                <p className="text-gray-600">Custom digital artwork for web, print, and marketing materials.</p>
              </div>

              <div className="bg-gray-50 p-8 rounded-xl">
                <div className="bg-yellow-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold mb-3">Character Design</h4>
                <p className="text-gray-600">Memorable characters that become ambassadors for your brand.</p>
              </div>

              <div className="bg-gray-50 p-8 rounded-xl">
                <div className="bg-yellow-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold mb-3">Icon Sets</h4>
                <p className="text-gray-600">Custom icon libraries that enhance your visual communication.</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-yellow-600 to-amber-600 rounded-2xl p-12 text-center text-white">
            <h3 className="text-3xl font-bold mb-4">Ready for custom artwork?</h3>
            <p className="text-xl mb-8 text-white/90">Let's create unique illustrations that tell your story</p>
            <a
              href="https://wa.me/254708779284"
              className="inline-block bg-white text-yellow-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors"
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
