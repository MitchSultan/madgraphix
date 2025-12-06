import React from 'react';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';

export default function WebDesignPage() {
  return (
    <>
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight text-gray-900">
            Web Design & Development
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto">
            Creating beautiful, responsive websites that captivate and convert your audience
          </p>
        </div>
      </section>

      {/* Service Details */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-4xl font-bold mb-6">Stunning Websites That Work</h2>
              <p className="text-gray-700 text-lg mb-4">
                We create modern, responsive websites that not only look amazing but deliver exceptional user experiences. Our web solutions are built with the latest technologies to ensure speed, security, and scalability.
              </p>
              <p className="text-gray-700 text-lg">
                Whether you need a corporate website, e-commerce platform, or a custom web application, we've got you covered.
              </p>
            </div>
            <div className="bg-gray-200 rounded-2xl h-96 flex items-center justify-center">
              <img src="/images/services/web-design.jpg" alt="Web Design" className="w-full h-full object-cover rounded-2xl" />
            </div>
          </div>

          {/* What We Offer */}
          <div className="mb-20">
            <h3 className="text-3xl font-bold mb-8 text-center">What We Offer</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-8 rounded-xl">
                <div className="bg-blue-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold mb-3">Responsive Design</h4>
                <p className="text-gray-600">Perfect display on all devices - desktop, tablet, and mobile.</p>
              </div>

              <div className="bg-gray-50 p-8 rounded-xl">
                <div className="bg-blue-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold mb-3">Fast Performance</h4>
                <p className="text-gray-600">Lightning-fast load times for better user experience and SEO.</p>
              </div>

              <div className="bg-gray-50 p-8 rounded-xl">
                <div className="bg-blue-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold mb-3">Custom Solutions</h4>
                <p className="text-gray-600">Tailored to your specific business needs and goals.</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-12 text-center text-white">
            <h3 className="text-3xl font-bold mb-4">Ready to build your dream website?</h3>
            <p className="text-xl mb-8 text-white/90">Let's discuss your project and bring your vision to life</p>
            <a
              href="https://wa.me/254708779284"
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors"
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
