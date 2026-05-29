'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import LogoMarquee from './LogoMarquee';


export default function Partners() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="partners" className='' >
      
        <LogoMarquee/>

     
          
        
      
    </section>
  );
}
