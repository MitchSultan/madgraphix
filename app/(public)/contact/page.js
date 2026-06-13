'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormSchema } from '../../lib/validations';
import Navigation from '../../components/Navigation';
import { MapPin,Mail, Phone } from 'lucide-react';
import ContactForm from '../../components/ContactForm';
import FAQs from '../../components/FAQs';
import Footer from '../../components/Footer';

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
         <ContactForm 
            register={register}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            errors={errors}
            isSubmitting={isSubmitting}
            success={success}
            error={error}
          />
        </div>
      </main>

      
    </div>
    <FAQs />
    <Footer />
    </>
  );
}
