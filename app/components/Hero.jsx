'use client';

import { motion } from 'framer-motion';
//import { Button } from './ui/button';

export default function Hero() {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-6 text-center relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-6"
        >
          <h1 className="text-6xl md:text-8xl font-bold mb-4 tracking-tight">
            Mirror Arts Designs
          </h1>
          <div className="text-2xl md:text-3xl font-light mb-2 text-slate-300">
            M.A.D Graphix
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-xl md:text-3xl mb-8 text-slate-200 font-light italic"
        >
          Art Straight from the Heart
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button
            onClick={scrollToContact}
            size="lg"
            className="bg-emerald-500 hover:bg-emerald-600 text-white text-lg px-8 py-6 rounded-full shadow-2xl hover:shadow-emerald-500/50 transition-all duration-300 transform hover:scale-105"
          >
            Work With Us
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-16 flex justify-center gap-8 text-sm text-slate-400"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span>Creative Excellence</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span>Professional Quality</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
