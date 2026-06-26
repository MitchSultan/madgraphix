import React from 'react'

export default function Numbers() {
  return (
    <div>
      <div className="border-t border-b border-zinc-800 bg-blue-900 py-12">


        <h2 className='text-center text-white mb-12'>A creative partner you can trust</h2>
          <div className="max-w-5xl text-white mx-auto px-6 grid grid-cols-2 divide-x-1 divide-dash divide-white md:grid-cols-4 gap-8 text-center">
            <div className='flex flex-col items-start '>
              <div className="text-5xl font-bold  mb-1">50+</div>
              <div className="text-zinc-400 text-sm tracking-widest">PROJECTS DELIVERED</div>
            </div>
            <div className='flex flex-col items-start '>
              <div className="text-5xl font-bold  mb-1">98%</div>
              <div className="text-zinc-400 text-sm tracking-widest">CLIENT RETENTION</div>
            </div>
            <div className='flex flex-col items-start '>
              <div className="text-5xl font-bold  mb-1">4.9x</div>
              <div className="text-zinc-400 text-sm tracking-widest">AVERAGE ROI</div>
            </div>
            <div className='flex flex-col items-start '>
              <div className="text-5xl font-bold  mb-1">5</div>
              <div className="text-zinc-400 text-sm tracking-widest">COUNTRIES REACHED</div>
            </div>
          </div>
        </div>
    </div>
  )
}
