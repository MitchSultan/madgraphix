"use client";

export default function ServiceSection() {
  return (
    <section className="w-full py-section bg-canvas">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between mb-14">
          <h2 className="text-display-lg text-ink services-heading">
            Our Services
          </h2>
          <p className="text-ink mt-3 services-subtitle">
            Everything you need to build, grow, and scale your digital presence.
          </p>
        </div>

        <div className="grid grid-cols-1  lg:grid-rows-3  lg:grid-cols-4 gap-2">
          {/* Web Design */}
          <a
            href="/Services/web-design"
            className="col-span-2 row-span-1 rounded-lg p-10 flex flex-col justify-end bg-[url('/images/7.png')] bg-contain bg-no-repeat bg-right transition-transform duration-300 hover:scale-[1.01] cursor-pointer"
          >
            <h5 className="text-card-title font-bold mb-2 text-ink">Web Design & Development</h5>
            <p className="lg:max-w-72 mb-3 text-ink services-copy">
              We make digital experiences smooth and enjoyable.
            </p>
            <span className="text-accent-magenta underline font-semibold">Learn more →</span>
          </a>

          {/* Brand Identity */}
          <a
            href="/Services/brand-identity"
            className="col-span-2 md:col-span-1 row-span-2 rounded-lg p-10 flex flex-col justify-end bg-[url('/images/CAAP.png')] bg-contain bg-no-repeat bg-top transition-transform duration-300 hover:scale-[1.01] cursor-pointer"
          >
            <h5 className="text-card-title font-bold mb-2 text-ink">Brand Identity</h5>
            <p className="mb-3 text-ink services-copy">
              Your brand deserves a unique personality.
            </p>
            <span className="text-accent-magenta underline font-semibold">Learn more →</span>
          </a>

          {/* Marketing */}
          <a
            href="/Services/marketing"
            className="col-span-2 md:col-span-1 row-span-1 rounded-lg p-10 transition-transform duration-300 hover:scale-[1.01] cursor-pointer"
          >
            <h5 className="text-card-title font-bold mb-2 text-ink">Marketing & Strategy</h5>
            <p className="mb-3 text-ink services-copy">
              Your message deserves to be seen.
            </p>
            <span className="text-accent-magenta underline font-semibold">Learn more →</span>
          </a>

          {/* Motion Graphics */}
          <a
            href="/Services/motion-graphics"
            className="col-span-2 md:col-span-1 row-span-2 rounded-lg p-10 flex flex-col justify-end bg-[url('/mockups/bt-phone.png')] bg-contain bg-no-repeat bg-top transition-transform duration-300 hover:scale-[1.01] cursor-pointer"
          >
            <h5 className="text-card-title font-bold mb-2 text-ink">Motion Graphics</h5>
            <p className="mb-3 text-ink services-copy">
              Add life and movement to your brand.
            </p>
            <span className="text-accent-magenta underline font-semibold">Learn more →</span>
          </a>

          {/* Illustration */}
          <a
            href="/Services/illustration"
            className="col-span-2 md:col-span-1 row-span-1 rounded-lg p-10 transition-transform duration-300 hover:scale-[1.01] cursor-pointer"
          >
            <h5 className="text-card-title font-bold mb-2 text-ink">Illustration & Art</h5>
            <p className="mb-3 text-ink services-copy">
              From custom art pieces to digital illustrations, we help you
              express your brand in a unique and artistic way.
            </p>
            <span className="text-accent-magenta underline font-semibold">Learn more →</span>
          </a>

          {/* Product Design - Decorative */}
          <div className="col-span-1 row-span-1 rounded-lg p-10 bg-[url('/mockups/rt-lap.png')] bg-right bg-no-repeat bg-contain"></div>
          
          {/* Content Creation - Decorative */}
          <div className="col-span-1 row-span-1 rounded-lg p-10 bg-[url('/images/bg.png')] bg-center bg-no-repeat bg-contain"></div>

          {/* Digital Advertising */}
          <a
            href="/Services/digital-advertising"
            className="col-span-2 row-span-1 rounded-lg p-10 flex flex-col justify-end bg-[url('/mockups/nf.png')] bg-right bg-no-repeat bg-contain transition-transform duration-300 hover:scale-[1.01] cursor-pointer"
          >
            <h5 className="text-card-title font-bold mb-2 text-ink">Digital Advertising</h5>
            <p className="max-w-72 mb-3 text-ink services-copy">
              Get value for money spent
            </p>
            <span className="text-accent-magenta underline font-semibold">Learn more →</span>
          </a>
        </div>

        {/*}    

        <div class="grid grid-cols-4 md:grid-cols-4 grid-rows-5 md:grid-rows-5 gap-2 md:gap-2 m-4">
          {services.map((service, index) => (
            <div
              key={index}
              className={`
                ${service.bg} 
                text-white p-6 rounded-2xl shadow-lg 
                flex flex-col justify-between 
                transition transform hover:scale-[1.03] hover:shadow-xl duration-300
              `}
            >
              <div class="col-start-1 row-start-1 col-span-2 md:col-start-1 md:row-start-1 md:col-span-2 md:row-span-1 bg-gray-300 rounded-md p-10">
                <div>
                  <h5 className="text-2xl font-semibold mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm opacity-90">{service.desc}</p>
                </div>
                <span className="text-xs mt-4 opacity-80">Learn More →</span>
              </div>
              <div class="col-start-3 row-start-1 col-span-2 md:col-start-3 md:row-start-1 md:col-span-2 md:row-span-1 bg-gray-300 rounded-md p-10">
                1
              </div>
              <div class="col-start-1 row-start-2 row-span-2 md:col-start-1 md:row-start-2 md:col-span-1 md:row-span-2 bg-gray-300 rounded-md p-10">
                2
              </div>
              <div class="col-start-2 row-start-2 md:col-start-2 md:row-start-2 md:col-span-1 md:row-span-1 bg-gray-300 rounded-md p-10">
                3
              </div>
              <div class="col-start-3 row-start-2 col-span-2 row-span-2 md:col-start-3 md:row-start-2 md:col-span-2 md:row-span-2 bg-gray-300 rounded-md p-10">
                4
              </div>
              <div class="col-start-2 row-start-3 row-span-2 md:col-start-2 md:row-start-3 md:col-span-1 md:row-span-2 bg-gray-300 rounded-md p-10">
                5
              </div>
              <div class="col-start-1 row-start-4 md:col-start-1 md:row-start-4 md:col-span-1 md:row-span-1 bg-gray-300 rounded-md p-10">
                6
              </div>
              <div class="col-start-3 row-start-4 row-span-2 md:col-start-3 md:row-start-4 md:col-span-1 md:row-span-2 bg-gray-300 rounded-md p-10">
                7
              </div>
              <div class="col-start-4 row-start-4 row-span-2 md:col-start-4 md:row-start-4 md:col-span-1 md:row-span-2 bg-gray-300 rounded-md p-10">
                8
              </div>
              <div class="col-start-1 row-start-5 md:col-start-1 md:row-start-5 md:col-span-1 md:row-span-1 bg-gray-300 rounded-md p-10">
                9
              </div>
              <div class="col-start-2 row-start-5 md:col-start-2 md:row-start-5 md:col-span-1 md:row-span-1 bg-gray-300 rounded-md p-10">
                10
              </div>
              
            </div>
          ))}
        </div>

        */}
      </div>
    </section>
  );
}
