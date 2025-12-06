import React from 'react';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';

export default function MotionGraphicsPage() {
  return (
    <>
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-orange-50 to-red-100 pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight text-gray-900">
            Motion Graphics & Animation
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto">
            Add life and movement to your brand with stunning animations and motion design
          </p>
        </div>
      </section>

      {/* Service Details */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div className="bg-gray-200 rounded-2xl h-96 flex items-center justify-center">
              <img src="/images/services/motion.jpg" alt="Motion Graphics" className="w-full h-full object-cover rounded-2xl" />
            </div>
            <div>
              <h2 className="text-4xl font-bold mb-6">Bring Your Brand to Life</h2>
              <p className="text-gray-700 text-lg mb-4">
                Motion graphics and animation capture attention like nothing else. We create engaging animated content that tells your story, explains complex ideas, and captivates your audience.
              </p>
              <p className="text-gray-700 text-lg">
                From explainer videos to social media animations, we make your content move with purpose and style.
              </p>
            </div>
          </div>

          {/* What We Offer */}
          <div className="mb-20">
            <h3 className="text-3xl font-bold mb-8 text-center">What We Offer</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-8 rounded-xl">
                <div className="bg-orange-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold mb-3">Explainer Videos</h4>
                <p className="text-gray-600">Clear, engaging animations that explain your product or service.</p>
              </div>

              <div className="bg-gray-50 p-8 rounded-xl">
                <div className="bg-orange-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold mb-3">Social Media Content</h4>
                <p className="text-gray-600">Eye-catching animations optimized for social platforms.</p>
              </div>

              <div className="bg-gray-50 p-8 rounded-xl">
                <div className="bg-orange-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold mb-3">Logo Animation</h4>
                <p className="text-gray-600">Dynamic logo reveals and brand animations that make an impact.</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-12 text-center text-white">
            <h3 className="text-3xl font-bold mb-4">Ready to animate your brand?</h3>
            <p className="text-xl mb-8 text-white/90">Let's create stunning motion graphics that captivate your audience</p>
            <a
              href="https://wa.me/254708779284"
              className="inline-block bg-white text-orange-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors"
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
