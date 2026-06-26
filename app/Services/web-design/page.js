import React from 'react';
import Navigation from '../../components/Navigation';
import WebDesignStack from '@/app/components/web-design';
import WebDesignServices from '@/app/components/web-designn/WebDesignServices';
import HowWeWork from '@/app/components/howWeWork';
import HeroBlog from '@/app/components/heroBlog';
import Banner from '@/app/components/Banner';
import Footer from '../../components/Footer';

export default function WebDesignPage() {
  return (
    <div className='overflow-x-hidden'>
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative bg-[url(/mockups/pln.jpeg)] bg-left bg-cover bg-no-repeat px-6 min-h-[80vh] flex items-start  pt-32 pb-20 md:px-24">
       
       <div className='absolute top-0 left-0 w-full h-full bg-black/50 z-0'></div>
        <div className="max-w-5xl z-10  text-left">
          <h1 className="text-4xl font-normal max-w-xl md:text-6xl lg:text-7xl  mb-6 leading-tight text-gray-200">
            High-performing web solutions built to grow with your brand
          </h1>
          <p className="text-xl md:text-2xl text-gray-100 max-w-sm mx-auto">
        How does your brand show up online? With our Webflow-certified experts, you get fast, scalable web experiences, designed and optimized to convert across every screen, segment, and stage of the funnel.  </p>
        
        <button className='btn-slide'>
          <span className="ta">Learn More</span>
                  <span className="tb">Let's Talk →</span>
        </button>
        </div>
      </section>
      <WebDesignStack/>

      {/* Service Details */}
      {/* <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
         


         
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
      </section> */}
      <WebDesignServices/>
      <HowWeWork/>
      {/* <HeroBlog/> */}
      <Banner/>

      <Footer />
      {/* <webDesignServices/> */}
    </div>
  );
}
