'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Sparkles, Heart, Target } from 'lucide-react';

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-slate-900">
            About M.A.D Graphix
          </h2>

          <div className="w-24 h-1 bg-emerald-500 mx-auto mb-12"></div>

          <p className="text-xl text-slate-700 leading-relaxed mb-8">
            At Mirror Arts Designs, we believe that great design is more than just aesthetics—it's about
            storytelling, emotion, and creating lasting impressions. Our team of passionate designers
            brings your vision to life with creativity that comes straight from the heart.
          </p>

          <p className="text-lg text-slate-600 leading-relaxed mb-12">
            We specialize in crafting unique visual identities that reflect your brand's essence.
            From bold logos to comprehensive brand systems, every project is approached with dedication,
            innovation, and an unwavering commitment to excellence.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 mb-4">
                <Sparkles className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-slate-900">Creative Innovation</h3>
              <p className="text-slate-600">Pushing boundaries with fresh, original ideas</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 mb-4">
                <Heart className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-slate-900">Passionate Craft</h3>
              <p className="text-slate-600">Every design crafted with care and dedication</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 mb-4">
                <Target className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-slate-900">Strategic Vision</h3>
              <p className="text-slate-600">Design solutions that drive real results</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
