'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormSchema } from '@/lib/validations';
import Navigation from '@/app/components/Navigation';
import { MapPin,Mail, Phone } from 'lucide-react';
import Footer from '@/app/components/Footer';

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setError('');
    
    try {
      const response = await fetch('/api/leads/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Something went wrong');
      }

      setSuccess(true);
      reset();
      
      // Track analytics
      if (typeof window !== 'undefined' && window.gtag) {
           window.gtag('event', 'contact', {
              source: 'contact_form'
          });
      }

    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
    <Navigation />
    <div className="min-h-screen mt-24 w-full bg-[#f2f2f2] flex items-center justify-center p-4 ">
      
      
      <main className=" flex flex-col w-full md:flex-row md:justify-between md:px-48 py-12 ">
        <div className="mb-12 md:mb-0 md:w-1/2 lg:w-2/5">
        <h1 className="text-4xl font-bold mb-6 text-left">What can we do for you?</h1>
        <p className="text-left text-gray-600 mb-10">
          Have a project in mind? Let's talk about it.
        </p>
        <ul className="space-y-6 m-0">
          <li className="flex items-center gap-4 mb-6">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <MapPin className="w-6 h-6 text-blue" />
            </div>
            <div>
              <h4 className="font-semibold  mb-1">Location</h4>
              <p className="text-slate-600">Nairobi, Kenya</p>
            </div>
          </li>
          <li className="flex items-center gap-4 mb-6">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <Mail  className="w-6 h-6 text-blue" />
            </div>
            <div>
              <h4 className="font-semibold  mb-1">Email</h4>
              <p className="text-slate-600">hello@madgraphix.co.ke</p>
            </div>
          </li>
          <li className="flex items-center gap-4 mb-6">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue -100 flex items-center justify-center">
              <Phone className="w-6 h-6 text-blue" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-1">Phone</h4>
              <p className="text-slate-600">+254 700 000 000</p>
            </div>
          </li>
        </ul>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 md:w-1/2 lg:w-2/5">
          {success ? (
            <div className="text-center py-10">
              <div className="text-green-500 text-5xl mb-4">✓</div>
              <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
              <p className="text-gray-600 mb-6">
                Thanks for reaching out. We'll get back to you shortly.
              </p>
              <button 
                onClick={() => setSuccess(false)}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Send Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm border border-red-200">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  {...register('full_name')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="John Doe"
                />
                {errors.full_name && (
                  <p className="text-red-500 text-xs mt-1">{errors.full_name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  {...register('email')}
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  {...register('message')}
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="Tell us about your project..."
                />
                {errors.message && (
                  <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-thin hover:bg-blue-700  transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </main>

      
    </div>
    <Footer />
    </>
  );
}
