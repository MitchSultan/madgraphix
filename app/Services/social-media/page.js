import React from 'react';
import Navigation from '../../components/Navigation';
import { Button } from "@/components/ui/button";
import Footer from '../../components/Footer';

const STEPS = [
  {
    title: "Simple Pricing",
    description:
      "Transparent subscription pricing means you have full control over where your budget is going across different teams and projects.",
  },
  {
    title: "Social experts",
    description:
      "Our creative team is fully versed in the formats, channels, and strategies you need to reach your organic and paid goals.",
  },
  {
    title: "Flexible capacity",
    description:
      "Whether you're planning something big or need to act fast, our flexible capacity lets you add scale when you need it or roll over budget when you don't..",
  },
  {
    title: "Seamless platform",
    description:
      "Brief, approve, and store your project assets in one place. Our creative project management platform seamlessly integrates with Slack, Asana, Monday.com, and Jira.",
  },
  {
    title: "Smooth delivery",
    description:
      "Your Creative Leads ensure every asset is on-brand and on-strategy, even when you need it fast. We're always looking for workflow efficiencies to save you time and money.",
  },
];

export default function MarketingPage() {
  return (
    <>
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative bg-[url(/mockups/pln.jpeg)] bg-left bg-cover bg-no-repeat px-6 min-h-[80vh] flex items-start  pt-32 pb-20 md:px-24">
       
       <div className='absolute top-0 left-0 w-full h-full bg-black/50 z-0'></div>
        <div className="max-w-5xl z-10  text-left">
          <h1 className="text-4xl font-normal max-w-xl md:text-6xl lg:text-7xl  mb-6 leading-tight text-gray-200">
            Scroll-stopping campaigns built fast and on brand
          </h1>
          <p className="text-xl md:text-2xl text-gray-100 max-w-sm mx-auto">
     Get high-performing social creative across every channel, format, and size. From paid LinkedIn ads and educational TikTok content to AR experiences and YouTube pre-roll ads, all with one creative team. </p>
        
        <button className='btn-slide'>
          <span className="ta">Learn More</span>
                  <span className="tb">Let's Talk →</span>
        </button>
        </div>
      </section>

      <div className=' overflow-hidden p-2 md:p-24 flex flex-col gap-4 md:flex-row md:w-screen'>
      <div className=' flex flex-col justify-between md:max-w-1/2 md:space-y-8 '>
        
        <h1 className=' font-normal text-7xl'>Fast & scalable is non-negotiable on social</h1>
         <h5 className='font-thin  text-2xl leading-none'>When you join a trend late, post irregularly, or use old, off-brand ads, your audience and the algorithm will notice</h5>
        <p>Consistency is everything. But even the best teams struggle to outpace content fatigue. Superside helps you keep up—and stay ahead—without the burnout.</p>
      </div>
      <div className='md:max-w-1/2'>
        <img aspect-auto='true' src="/mockups/cdf.jpeg" className='rounded-sm'></img>
      </div>
      
    </div>

    <div className=' p-4 md:p-32 flex flex-col items-center justify-center'>
      <div className=' flex  w-full flex-col justify-center items-center max-w-xl'>
      <h2 className='text-center'>Social media creative built for every platform and goal</h2>
      <p className='text-center'>Our creative experts deliver high-performing social media design and creative that drives clicks, shares, and conversions.</p>
       </div>
      <div className='grid grid-cols-1 gap-2 md:grid-cols-4'>
        <div className='bg-[url(/mockups/cdf.jpeg)] bg-top bg-cover bg-no-repeat rounded-sm min-h-84 p-4 '>
          <h4>Organic social content</h4>
          <p>Engage your audience with compelling storytelling from high-impact static posts to an educational video series..</p>
        </div>
        <div className='bg-[#f2f2f2] rounded-sm min-h-84 p-4 '>
          <h4>Paid social media</h4>
          <p>Test new ideas, multiply what works, and keep the algorithm happy with every size and format.</p>
        </div>
        <div className='bg-[url(/mockups/shts.png)] br-no-repeat bg-cover bg-top rounded-sm min-h-84 p-4   md:col-span-2'>
          <h4 className='text-white'> Videos</h4>
          <p className='max-w-sm text-white'>Motion graphic explainers, UGC-style video ads, in-studio testimonial videos. You name it, we deliver.

          </p>
        </div>
        <div className='bg-[#f2f2f2] rounded-sm min-h-84 p-4  md:col-span-2'>
          <h4>AI Production</h4>
          <p className=' max-w-sm'>Fast, scalable content with AI-assisted edits, voiceovers, and automated translation and localization..</p>
        </div>
        <div className='bg-[#f2f2f2] rounded-sm min-h-84 p-4  md:col-span-2'>
          <h4>Campaign concept</h4>
          <p className=' '>Make individual assets more impactful and connected with a big campaign idea..</p>
        </div>
        <div className='bg-[#f2f2f2] rounded-sm min-h-84 p-4 '>
          <h4>Immersive Experience</h4>
          <p>Scroll-breaking formats like 3D, AR, or interactive content for standout storytelling.</p>
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
                  Scale social output   <span className="italic font-normal">without losing</span> control
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
               Our creative experts and AI-accelerated workflows help you get social campaigns to market fast, without sacrificing coherence or brand consistency. </p>
                <Button  className="btn-slide">
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
