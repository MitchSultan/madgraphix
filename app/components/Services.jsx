'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Palette, Layers, Globe, Package, Printer, Film, Pen } from 'lucide-react';

const services = [
  {
    icon: Palette,
    title: 'Logo Design',
    description: 'Memorable logos that capture your brand essence and stand the test of time',
  },
  {
    icon: Layers,
    title: 'Brand Identity',
    description: 'Complete brand systems including guidelines, color palettes, and typography',
  },
  {
    icon: Globe,
    title: 'Web Design',
    description: 'Beautiful, responsive websites that engage users and drive conversions',
  },
  {
    icon: Package,
    title: 'Packaging Design',
    description: 'Eye-catching packaging that makes your product stand out on shelves',
  },
  {
    icon: Printer,
    title: 'Print Design',
    description: 'Brochures, flyers, posters, and all print materials with stunning visuals',
  },
  {
    icon: Film,
    title: 'Motion Graphics',
    description: 'Dynamic animations and video content that bring your brand to life',
  },
  {
    icon: Pen,
    title: 'Illustrations',
    description: 'Custom illustrations that add unique character to your brand',
  },
];

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="py-24 bg-slate-50">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-slate-900">
            Our Services
          </h2>
          <div className="w-24 h-1 bg-emerald-500 mx-auto mb-6"></div>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Comprehensive design solutions tailored to elevate your brand
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 group-hover:bg-emerald-500 transition-colors duration-300 mb-6">
                <service.icon className="w-8 h-8 text-emerald-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-slate-900">{service.title}</h3>
              <p className="text-slate-600 leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
