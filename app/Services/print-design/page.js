import React from 'react';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import { Button } from "@/components/ui/button";

const STEPS = [
  {
    title: "Brief",
    description:
      "Start by sharing your goals and timeline. Depending on the scope of the project, share any dielines, specs, guidelines, and any content that you already have.",
  },
  {
    title: "Estimate & plan",
    description:
      "Your project manager scopes the work and sets expectations up front..",
  },
  {
    title: "First Draft",
    description:
      "We deliver a layout so you can visualize the final piece early.",
  },
  {
    title: "Revisions",
    description:
      "We collaborate closely to refine the design, making sure every detail aligns with your vision and brand standards.",
  },
  {
    title: "Final Delivery",
    description:
      "Approved files are prepped for print, exported to spec, and uploaded to our platform.",
  },
];

export default function DigitalAdsPage() {
  return (
    <>
      <Navigation />
      
      {/* Hero Section */}
       <section className="relative bg-[url(/posters/magaz.jfif)] bg-left bg-cover bg-no-repeat px-6 min-h-[80vh] flex items-start  pt-32 pb-20 md:px-24">
       
       <div className='absolute top-0 left-0 w-full h-full bg-black/50 z-0'></div>
        <div className="max-w-5xl z-10  text-left">
          <h1 className="text-4xl font-normal max-w-xl md:text-6xl lg:text-7xl  mb-6 leading-tight text-gray-200">
            Big ideas deserve
beautiful print design
          </h1>
          <p className="text-xl md:text-2xl text-gray-100 max-w-sm mx-auto">
       From brochures to billboards, if it's important enough for physical printing, you want to get it right. Our print design services deliver high-impact creative built for brand consistency at any scale or specifications.</p> 
        <button className='btn-slide'>
          <span className="ta">Learn More</span>
                  <span className="tb">Let's Talk →</span>
        </button>
        </div>
      </section>

      {/* Service Details */}
      <div className=' overflow-hidden p-2 md:p-24 flex flex-col gap-4 md:flex-row md:w-screen'>
      <div className=' flex flex-col justify-between md:max-w-1/2 md:space-y-8 '>
        
        <h3 className=' font-normal text-7xl'>Focus on the big picture, not the production details</h3>
         <h5 className='font-thin  text-2xl leading-none'>Magazine ad spreads and direct mail, business cards and menus: printed materials come in all shapes and sizes.
</h5> 
<p>If you're thinking of printing, we make the design process easy with expert designers, dedicated project managers, and seamless collaboration.</p>
</div>
      <div className='md:max-w-1/2'>
        <img aspect-auto='true' src="/posters/poster7.PNG" className='rounded-sm'></img>
      </div>
      
    </div>

    <div className=' p-4 md:p-32 flex flex-col items-center justify-center'>
      <div className=' flex  w-full flex-col justify-center items-center max-w-xl'>
      <h2 className='text-center'>Designed to impress in every format</h2>
      <p className='text-center'>Whether it's one-off event signage or leave-behinds for every sales meeting, we bring modern speed and polish to every print project.

</p> </div>
      <div className='grid grid-cols-1 grig-rows-6 md:grid-rows-2 gap-2 md:grid-cols-4'>
        <div className='bg-[url(/mockups/cdf.jpeg)] bg-top bg-cover bg-no-repeat rounded-sm min-h-84 p-4 '>
          <h4>Print Ads</h4>
          <p>Sharp, on-brand layouts tailored for paid media in newspapers or glossy magazines.</p>
        </div>
        <div className='bg-[#f2f2f2] rounded-sm min-h-84 p-4 '>
          <h4>Brochures</h4>
          <p>A sophisticated but punchy showcase made to educate and entice.</p>
        </div>
        <div className='bg-[url(/mockups/shts.png)] br-no-repeat bg-contain md:bg-cover bg-top  rounded-sm min-h-84 p-4   '>
          <h4 className='text-white'> Posters</h4>
          <p className='max-w-sm text-white'>High-impact visuals for retail promotions or OOH campaigns.

          </p>
        </div>
        <div className='bg-[#f2f2f2] rounded-sm min-h-84 p-4  md:row-span-2'>
          <h4>Stationary Design</h4>
          <p className=' max-w-sm'>Custom business cards, office letterheads, and branded materials.</p>
        </div>
        <div className='bg-[#f2f2f2] rounded-sm min-h-84 p-4  md:col-span-2'>
          <h4>Event Collateral</h4>
          <p className=' '>Booths, signage, flyers and more for trade shows and conferences..</p>
        </div>
        <div className='bg-[#f2f2f2] rounded-sm min-h-84 p-4  '>
          <h4>Editorial Content</h4>
          <p>Spreads that elevate long-form content and draw readers in.</p>
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
                  A process built for clarity,   <span className="italic font-normal">speed,</span> and brand control
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                We make it easy to move from raw content to polished, print-ready design without the friction.

</p>
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
