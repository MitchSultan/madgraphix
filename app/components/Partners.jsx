'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import LogoTicker from './LogoTicker';


export default function Partners() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="partners" className='flex flex-col items-center justify-center' >
      
        
        <LogoTicker/>

     
          <p className="text-lg text-slate-600">
            Join over <span className="font-bold text-emerald-600">200+ clients</span> who trust us with their creative vision
          </p>
        
      
    </section>
  );
}
