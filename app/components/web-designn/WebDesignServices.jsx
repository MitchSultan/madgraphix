import React from 'react'

export default function WebDesignServices() {
  return (
    <div className=' p-4 md:p-32 flex flex-col items-center justify-center'>
      <div className=' flex  w-full flex-col justify-center items-center max-w-xl'>
      <h2 className='text-center'>Creative web design, ready to scale and convert</h2>
      <p className='text-center'>Whether you’re optimizing an existing site or launching something entirely new, we give you everything you need to ship confidently, iterate quickly, and drive measurable business results.</p>
       </div>
      <div className='grid grid-cols-1 gap-2 md:grid-cols-4'>
        <div className='bg-[url(/mockups/cdf.jpeg)] bg-top bg-cover bg-no-repeat rounded-sm min-h-84 p-4 '>
          <h4>Web Design</h4>
          <p>Website UX research, wireframes, responsive design, and high-fidelity UI, tailored to your goals.</p>
        </div>
        <div className='bg-[#f2f2f2] rounded-sm min-h-84 p-4 '>
          <h4>Wordpress Design</h4>
          <p>Certified Webflow partner offering flexible, scalable builds with CMS integration.</p>
        </div>
        <div className='bg-[url(/mockups/shts.png)] br-no-repeat bg-cover bg-top rounded-sm min-h-84 p-4   col-span-2'>
          <h4 className='text-white'> Landing Pages</h4>
          <p className='max-w-sm text-white'>Funnel-stage pages that launch fast—fully optimized, mobile first, and on brand. Ideal for product launches, paid media, lifecycle marketing, and SEO.

          </p>
        </div>
        <div className='bg-[#f2f2f2] rounded-sm min-h-84 p-4  col-span-2'>
          <h4>Design systems</h4>
          <p className=' max-w-sm'>Reusable component libraries built following the Atomic design methodology to scale with consistency.</p>
        </div>
        <div className='bg-[#f2f2f2] rounded-sm min-h-84 p-4  '>
          <h4>UX/UI Design</h4>
          <p className=' '>Deep research into conversion leaks and usability gaps, plus expert recs to boost performance..</p>
        </div>
        <div className='bg-[#f2f2f2] rounded-sm min-h-84 p-4 '>
          <h4>Copy Support</h4>
          <p>Full-stack creative including headlines, content hierarchy, microcopy, and animation.</p>
        </div>



      </div>
    </div>
  )
}
