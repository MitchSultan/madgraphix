'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

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
    <section id="partners" className="py-24 bg-slate-50">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-slate-900">
            Our Partners
          </h2>
          <div className="w-24 h-1 bg-emerald-500 mx-auto mb-6"></div>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Trusted by leading brands and creative businesses worldwide
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 max-w-5xl mx-auto">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="relative aspect-square rounded-xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                fill
                className="object-cover p-4 grayscale group-hover:grayscale-0 transition-all duration-300"
              />
            </motion.div>
          ))}
        </div>

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
