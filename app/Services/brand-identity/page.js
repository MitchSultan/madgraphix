import React from 'react';
import Navigation from '../../components/Navigation';
import WebDesignStack from '@/app/components/web-design';
import { Button } from "@/components/ui/button";
import Footer from '../../components/Footer';

const STEPS = [
  {
    title: "Collaborative Kickoff",
    description:
      "Brand workshops help us align on goals, market context, and creative vision from the very first step.",
  },
  {
    title: "Strategy direction",
    description:
      "Developing messaging, tone, and story to shape your brand's foundation..",
  },
  {
    title: "Visual Exploration",
    description:
      "Concepts, moodboards, and look & feel development to expand or refresh your brand's visual universe..",
  },
  {
    title: "Execution at scale",
    description:
      "Depending on the scope of the project, we deliver brand guidelines, logo, design system, final assets, or anything else your team needs.",
  },
  {
    title: "Ongoing Support",
    description:
      "The best part about Superside? We're not simply a branding studio. We offer creative support far beyond your branding project, turning guidelines into ads, templates, videos, and full campaigns.",
  },
];

export default function BrandIdentityPage() {
  return (
    <>
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-[url(/posters/billb.webp)] bg-center bg-cover bg-no-repeat px-6 min-h-[80vh] flex items-start  pt-32 pb-20 md:px-24">

        <div className='absolute top-0 left-0 w-full h-full bg-black/50 z-0'></div>
        <div className="max-w-5xl z-10  text-left">
          <h1 className="text-4xl font-normal max-w-xl md:text-6xl lg:text-7xl  mb-6 leading-tight text-gray-200">
            Make your brand impossible to ignore, effortless to scale
          </h1>
          <p className="text-xl md:text-2xl text-gray-100 max-w-sm mx-auto">
           Superside helps you build, refresh, or expand your brand identity. From logo and tone of voice to full systems and guidelines, we design brands that flex across every channel.</p>
          <button className='btn-slide'>
            <span className="ta">Learn More</span>
            <span className="tb">Let's Talk →</span>
          </button>
        </div>
      </section>
      {/* <WebDesignStack/> */}
      <div className=' overflow-hidden p-2 max-h-screen md:p-24 flex flex-col gap-4 md:flex-row md:w-screen'>
      <div className=' flex flex-col justify-between md:max-w-1/2 md:space-y-8 '>
        
        <h1 className=' font-normal text-7xl'>Brand consistency performs better</h1>
         <h5 className='font-thin  text-2xl leading-none'>Being on-brand multiplies the power of individual assets by having them work together towards the same goal.</h5>
        <p>Most in-house teams don’t have the bandwidth (or skills) to focus on branding. Then already-busy teams need more rounds of revisions, lose campaign consistency, and see performance take a hit.</p>
      </div>
      <div className='flex items-center justify-center md:max-w-1/2'>
        <img aspect-auto='true' src="/mockups/brand.png" className='rounded-sm  max-h-full'></img>
      </div>
      
    </div>


      {/* <section className="py-20 px-6 bg-white">
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
      </section> */}

      <div className=' p-4 md:p-32 flex flex-col items-center justify-center'>
        <div className=' flex  w-full flex-col justify-center items-center max-w-xl'>
          <h2 className='text-center'>From brand strategy to brand systems, we cover it all</h2>
          <p className='text-center'>Our branding services fuel consistency, speed, and standout creative, whether you're starting from scratch or evolving what exists.  </p></div>
        <div className='grid grid-cols-1 gap-2 md:grid-cols-4'>
          <div className='bg-[url(/mockups/cdf.jpeg)] bg-top bg-cover bg-no-repeat rounded-sm min-h-84 p-4 md:col-span-2 '>
            <h4>Brand Design</h4>
            <p className='max-w-sm'>Logo, typography, colors, and core design elements—all crafted for digital and physical touchpoints</p></div>
          <div className='bg-[#f2f2f2] rounded-sm min-h-84 p-4 '>
            <h4>Brand development</h4>
            <p>Strategic positioning and visual foundations to define and differentiate your brand from day one.</p>
          </div>
          <div className='bg-[url(/mockups/shts.png)] br-no-repeat bg-cover bg-top rounded-sm min-h-84 p-4   col-span-1'>
            <h4 className='text-white'> Branding Guidelines</h4>
            <p className='max-w-sm text-white'>Detailed, actionable documentation to keep internal and external teams executing consistently.

            </p>
          </div>
          {/* <div className='bg-[#f2f2f2] rounded-sm min-h-84 p-4  '>
            <h4>Rebranding Services</h4>
            <p className=' max-w-sm'>From subtle evolution to full reinvention, we help brands refresh for new markets, products, or growth stages..</p>
          </div> */}
          <div className='bg-[#f2f2f2] rounded-sm min-h-84 p-4  '>
            <h4>Rebranding Services</h4>
            <p className=' max-w-sm'>From subtle evolution to full reinvention, we help brands refresh for new markets, products, or growth stages..</p>
         
          </div>
          <div className='bg-[#f2f2f2] rounded-sm min-h-84 p-4  '>
            <h4>Brand Story</h4>
            <p className=' '>Mission, vision, values, tone of voice, and messaging pillars—crafted to align teams and inspire audiences.

.</p>
          </div>
          <div className='bg-[#f2f2f2] rounded-sm min-h-84 p-4 md:col-span-2'>
            <h4>Logo Design</h4>
            <p className='max-w-sm'>Main and sub-brand logo systems with full file kits, responsive variations, and guidance for real-world use.</p>
          </div>
          



        </div>
      </div>

      <section className="bg-[#FCFCFA] py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">

            {/* Left Column: Heading & Paragraph */}
            <div className="lg:col-span-5 space-y-6">
              <h3 className="text-2xl font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Our Process
              </h3>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight font-serif">
                Your plug-in brand team,   <span className="italic font-normal">from kickoff</span> to rollout
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
             We work side-by-side with your team to shape, evolve, and scale your brand, without the slowdowns of traditional agencies.

</p>
              <Button className="btn-slide">
                <span className="ta">Learn More</span>
                <span className="tb">Let's Talk →</span>
              </Button>
            </div>

            {/* Right Column: 5 Steps Timeline */}
            <div className="lg:col-span-7 relative">
              <div className="flex flex-col lg:gap-6">
                {STEPS.map((step, idx) => (
                  <div
                    key={idx}
                    className="relative flex gap-4 py-6 first:pt-0 last:pb-0 lg:py-0"
                  >
                    {/* Number Circle & Connector Line */}
                    <div className="flex flex-col items-center shrink-0">
                      <div className="w-10 h-10 rounded-full border-2 border-muted/30 bg-background text-foreground font-semibold flex items-center justify-center relative z-10 shadow-sm">
                        {idx + 1}
                      </div>
                      {/* Vertical connecting line (hidden on the last step) */}
                      {idx !== STEPS.length - 1 && (
                        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[2px] h-[calc(100%+1rem)] bg-muted/30 rounded-full lg:h-[calc(100%+2rem)]"></div>
                      )}
                    </div>

                    {/* Step Text Content */}
                    <div className="flex-1 pb-2 lg:pb-0">
                      <h4 className="text-lg font-semibold mb-1">{step.title}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed pr-4">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
