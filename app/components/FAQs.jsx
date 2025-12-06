'use client';
import React, { useState } from 'react';

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Why choose MAD Graphix for your design needs?",
      answer: "We combine creativity with strategic thinking to deliver designs that not only look amazing but also drive real business results. Our team brings years of experience across multiple industries and we're committed to making your brand stand out."
    },
    {
      question: "How to request a design?",
      answer: "Simply reach out to us via WhatsApp, email, or our contact form. We'll schedule a consultation to understand your needs, provide a detailed quote, and start bringing your vision to life."
    },
    {
      question: "Speed of design delivery?",
      answer: "Pretty quick! Most designs are delivered in 2-5 business days. We prioritize quality without slowing you down. Rush projects can be accommodated with prior arrangement."
    },
    {
      question: "What if I don't like the design?",
      answer: "We offer unlimited revisions until you're 100% satisfied. Your feedback is valuable, and we'll work closely with you to refine the design until it perfectly matches your vision."
    },
    {
      question: "What's the MAD Graphix process like?",
      answer: "Our process is simple: 1) Initial consultation to understand your goals, 2) Research and concept development, 3) Design creation and presentation, 4) Revisions based on your feedback, 5) Final delivery with all necessary files."
    },
    {
      question: "Are there any refunds?",
      answer: "We offer refunds within the first 48 hours if we haven't started work on your project. Once work has begun, we focus on revisions to ensure you're happy with the final result rather than refunds."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-gray-500 text-sm mb-2">(FAQs)</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4">
            Your Questions, Answered
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Helping you understand our process and offerings at MAD Graphix.
          </p>
        </div>

        {/* FAQ Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left p-6 md:p-8 flex justify-between items-start gap-4"
              >
                <span className="text-lg font-semibold text-gray-900 pr-4">
                  {faq.question}
                </span>
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-900 flex items-center justify-center">
                  {openIndex === index ? (
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 12H4"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  )}
                </div>
              </button>
              
              {openIndex === index && (
                <div className="px-6 md:px-8 pb-6 md:pb-8">
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
