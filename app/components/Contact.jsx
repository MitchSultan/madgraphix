'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
//import { Button } from './ui/button';
//import { Input } from './ui/input';
//import { Textarea } from './ui/textarea';
//import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for reaching out! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', service: '', message: '' });
  };

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-slate-900">
            Let's Work Together
          </h2>
          <div className="w-24 h-1 bg-emerald-500 mx-auto mb-6"></div>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Ready to bring your vision to life? Get in touch with us today
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h3 className="text-3xl font-bold mb-6 text-slate-900">Get In Touch</h3>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Whether you need a complete brand identity, a stunning logo, or any creative design solution,
              we're here to help. Fill out the form and let's start creating something amazing together.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                  <Phone className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-1">Phone</h4>
                  <p className="text-slate-600">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-1">Email</h4>
                  <p className="text-slate-600">hello@madgraphix.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-1">Location</h4>
                  <p className="text-slate-600">Creative District, Design City</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full h-12 px-4 border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
                />
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full h-12 px-4 border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
                />
              </div>

              <div>
              //
              </div>

              <div>
                <textarea
                  placeholder="Tell us about your project..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
                />
              </div>

              <button
                type="submit"
                size="lg"
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white text-lg py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Apply Now
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
