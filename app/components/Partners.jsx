'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import LogoTicker from './LogoTicker';

const partners = [
  {
    name: 'TechCorp',
    logo: 'https://images.pexels.com/photos/1629212/pexels-photo-1629212.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    name: 'Creative Studio',
    logo: 'https://images.pexels.com/photos/1684398/pexels-photo-1684398.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    name: 'Innovate Inc',
    logo: 'https://images.pexels.com/photos/1181534/pexels-photo-1181534.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    name: 'Brand Solutions',
    logo: 'https://images.pexels.com/photos/3183172/pexels-photo-3183172.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    name: 'Digital Wave',
    logo: 'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    name: 'Future Designs',
    logo: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
];

export default function Partners() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="partners" className="py-24 bg-gray-900">
      <div className="container mx-auto px-6">
        
        <LogoTicker/>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-slate-600">
            Join over <span className="font-bold text-emerald-600">200+ clients</span> who trust us with their creative vision
          </p>
        </motion.div>
      </div>
    </section>
  );
}
