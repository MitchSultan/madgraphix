import React from "react";
import Navigation from "@/app/components/Navigation";
import Footer from "@/app/components/Footer";



export default function ServicesPage() {
  return (
    <>

    <Navigation />
    <div className="w-full flex flex-col">

      {/* ================= HERO SECTION ================= */}
      <section className="w-full py-24 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-semibold text-gray-900 mb-4">
            Creative Design Services for Modern Brands
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            We craft clean, modern and impactful visual experiences that help brands stand out.
          </p>
        </div>
      </section>

      {/* ================= WEB DESIGN HISTORY ================= */}
      <section className="w-full py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-semibold text-gray-900 mb-6">
            Our Web Design Journey
          </h2>
          <p className="text-gray-700 leading-loose mb-4">
            For years, we’ve helped businesses bring their ideas to life through purposeful,
            well-structured and visually engaging web design. Our approach is simple—
            design with intention, communicate clearly, and build digital experiences that feel natural.
          </p>

          <p className="text-gray-700 leading-loose">
            From small businesses to growing brands, we’ve worked across different industries, 
            creating websites that not only look great but also support real business goals:
            clarity, trust, and user engagement.
          </p>
        </div>
      </section>

      {/* ================= OUR PROCESS ================= */}
      <section className="w-full py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-semibold text-gray-900 mb-10">
            Our Web Design Process
          </h2>

          <div className="space-y-12">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">1. Discovery & Understanding</h3>
              <p className="text-gray-700 leading-loose">
                We begin by understanding your goals, target audience, and the problems your website needs to solve.
                This gives us a clear direction before any design starts.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">2. Wireframing & Structure</h3>
              <p className="text-gray-700 leading-loose">
                We create clean layouts and structures that guide users naturally through your content.
                Everything is placed with intention and easy navigation in mind.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">3. UI Design</h3>
              <p className="text-gray-700 leading-loose">
                We design minimal, modern and visually consistent interfaces that match your brand identity.
                Colors, typography and spacing are chosen to make the experience feel premium and smooth.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">4. Development & Build</h3>
              <p className="text-gray-700 leading-loose">
                Using Next.js and TailwindCSS, we turn the design into a responsive and high-performance website.
                Fast load times, clean UI, and a smooth user experience are our top priority.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">5. Testing & Launch</h3>
              <p className="text-gray-700 leading-loose">
                We test everything—speed, accessibility, device responsiveness and flow.
                After final checks, we launch your website confidently and professionally.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= ADDITIONAL INFO ================= */}
      <section className="w-full py-20 px-6">
        <div className="max-w-5xl mx-auto space-y-6">
          <h2 className="text-3xl font-semibold text-gray-900 mb-6">
            What Makes Our Design Different?
          </h2>

          <p className="text-gray-700 leading-loose">
            We value simplicity, clarity, and clean layouts. Every section is designed to breathe,
            ensuring your users never feel overwhelmed. Our goal is to make your brand look premium
            through thoughtful visual design.
          </p>

          <p className="text-gray-700 leading-loose">
            We also focus heavily on user behaviour—how people read, scroll, click and interact.
            This helps us create designs that feel natural, intuitive, and aligned with your business goals.
          </p>

          <div className="mt-10 p-8 border border-gray-200 rounded-xl">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Ready to Start a Project?</h3>
            <p className="text-gray-700 leading-loose mb-4">
              Let’s build something beautiful and meaningful together.
            </p>
            <a 
              href="/contact"
              className="inline-block px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>

    </div>
    <Footer />

    </>
  );
}
