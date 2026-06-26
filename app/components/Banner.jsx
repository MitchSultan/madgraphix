import React from 'react'

export default function Banner() {
  return (
    <div className='p-32 rounded-sm  '>
      <section className='p-12 bg-[url(/mockups/bann.png)] bg-left bg-no-repeat bg-cover'>
        <h2 className='text-white max-w-xl'>Go M.A.D for your next project.</h2>
        <p className='max-w-md text-white'>This is just one of many creative services—what you do with them is up to you. Let's chat.</p>
       
       <a href='http://wa.me/0708312456'> <button className='btn-slide'>
          <span className="ta">Learn More</span>
                  <span className="tb">Let's Talk →</span>

        </button>
        </a>
      </section>
    </div>
  )
}
