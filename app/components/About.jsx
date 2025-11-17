"use client";

export default function AboutUs() {
  return (
    <section className="w-full py-16 bg-white ">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

        {/* RIGHT — VIDEO */}
        <div className="rounded-xl overflow-hidden shadow-lg">
         <img src="/images/hoodie.jpg"></img>
        </div>
       
        {/* LEFT — TEXT */}
        <div>
          <h2 className="text-4xl text-black lg:text-5xl font-bold mb-6 leading-tight">
            About Us
          </h2>

          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            We are a digital agency focused on building brands that stand out.
            Our approach blends strategy, creativity, and technology—helping
            companies grow through modern websites, strong branding, and
            performance-driven digital experiences.
          </p>

          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            With every project, we aim for clarity, simplicity, and excellence.
            We don’t just design—we build long-term partnerships that support
            your growth and elevate your presence.
          </p>

          <button className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition">
            Learn More
          </button>
        </div>

       

      </div>
    </section>
  );
}
