import React from 'react';
import Navigation from '../../components/Navigation';
import { Button } from "@/components/ui/button";
import Footer from '../../components/Footer';

const STEPS = [
  {
    title: "Project Kickoff",
    description:
      "Submit your brief, timelines, and brand guidelines through our platform. Include inspiration or references plus dielines, specs or restrictions.",
  },
  {
    title: "Creative Exploration",
    description:
      "Our designers co-develop concepts with your team, tailored to your needs, audience, and format.",
  },
  {
    title: "First Draft",
    description:
      "You’ll deliver an initial version—built to spark feedback and align early.",
  },
  {
    title: "Refinement & Feddback",
    description:
      "We fine-tune the design based on your input to make sure it’s impactful and ready to go.",
  },
  {
    title: "Print-ready delivery",
    description:
      "Final files are formatted, proofed, and uploaded—ready for production or dispatch.",
  },
];

export default function PackagingDesigns() {
  return (
    <>
      <Navigation />
      
      {/* Hero Section */}

      <section className="relative bg-[url(/posters/tote.PNG)] bg-left bg-cover bg-no-repeat px-6 min-h-[80vh] flex items-start  pt-32 pb-20 md:px-24">
       
       <div className='absolute top-0 left-0 w-full h-full bg-black/50 z-0'></div>
        <div className="max-w-5xl z-10  text-left">
          <h1 className="text-4xl font-normal max-w-xl md:text-6xl lg:text-7xl  mb-6 leading-tight text-gray-200">
            Design for the brand touchpoints you can touch
          </h1>
          <p className="text-xl md:text-2xl text-gray-100 max-w-sm mx-auto">
        Give your brand custom product packaging, merchandising, and branded apparel designs that people remember and want to hold on to. </p>
        
        <button className='btn-slide'>
          <span className="ta">Learn More</span>
                  <span className="tb">Let's Talk →</span>
        </button>
        </div>
      </section>

      <div className=' overflow-hidden p-2 md:p-24 flex flex-col gap-4 md:flex-row md:w-screen'>
      <div className=' flex flex-col justify-space md:max-w-1/2 md:space-y-8 '>
        
        <h1 className=' font-normal text-7xl'>Every giveaway and product is a chance to connect</h1>
         <h5 className='font-thin  text-2xl leading-none'>From retail packaging to company swag, real branding means more than a logo..</h5>
        <p className='max-w-sm'>Our team of expert merch and packaging designers helps you stand out with on-brand creative that’s never boring..</p>
      </div>
      <div className='md:max-w-1/2'>
        <img aspect-auto='true' src="/posters/tote.jfif" className='rounded-sm'></img>
      </div>
      
    </div>

    <div className=' p-4 md:p-32 flex flex-col items-center justify-center'>
      <div className=' flex  w-full flex-col justify-center items-center max-w-xl'>
      <h2 className='text-center'>Custom design for every item on your wishlist</h2>
      <p className='text-center'>No matter what you've been dreaming of, our collaborative design services are built around your brand, goals, and audience.</p>
       </div>
      <div className='grid grid-cols-1 gap-2 md:grid-cols-4'>
        <div className='bg-[url(/mockups/cdf.jpeg)] bg-top bg-cover bg-no-repeat rounded-sm min-h-84 p-4 '>
          <h4>Packaging Design</h4>
          <p>Refreshed or new custom product packaging design that’s eye-catching, practical, and ready for production..</p>
        </div>
        <div className='bg-[#f2f2f2] rounded-sm min-h-84 p-4 '>
          <h4>Event Collateral</h4>
          <p>We offer the best merch design services for enterprise events, sparking interest with memorable giveaways.

</p>
        </div>
        <div className='bg-[url(/mockups/shts.png)] br-no-repeat bg-cover bg-top rounded-sm min-h-84 p-4   md:col-span-2'>
          <h4 className='text-white'> Corporate gifting</h4>
          <p className='max-w-sm text-white'>Thoughtful branded items that show appreciation and build connection.

          </p>
        </div>
        <div className='bg-[#f2f2f2] rounded-sm min-h-84 p-4  md:col-span-2'>
          <h4>Custom Kits</h4>
          <p className=' max-w-sm'>Curated sets of the most popular items for campaigns, onboarding, and more..</p>
        </div>
        <div className='bg-[#f2f2f2] rounded-sm min-h-84 p-4  md:col-span-2'>
          <h4>Merchandising Design</h4>
          <p className=' '> Swag and giveaways that your audience will actually want.</p>
        </div>
        <div className='bg-[#f2f2f2] rounded-sm min-h-84 p-4 '>
          <h4>Apparel Design</h4>
          <p>Branded clothing that feels

premium and on-brand.</p>
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
              From vision to production  <span className="italic font-normal">with seamless</span> collaboration
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
           We make it easy to go from idea to execution with a process that keeps things clear, fast, and on-brand.

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
