'use client';

export default function ServiceTicker() {
  const services1 = [
    "Website Design",
    "Brand Identity",
    "Logo Design",
    "Motion Graphics",
    "Digital Marketing",
    "UI/UX Design",
    "Illustration",
    "Product Design",
  ];

  const services2 = [
    "Over 100+ Clients",
    "5+ Years Experience",
    "Brand Strategy",
    "Content Creation",
    "Social Media Design",
    "Print Design",
    "Creative Direction",
    "Digital Advertising",
  ];

  return (
    <section className="relative w-full h-48 md:h-64 overflow-hidden bg-gray-100">
      {/* Orange Band - Top to Bottom Diagonal */}
      <div className="absolute inset-0 flex items-center">
        <div 
          className="relative w-full overflow-hidden"
          style={{
            transform: 'rotate(-4deg) translateY(-20%)',
            height: '120%',
          }}
        >
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 py-8 shadow-2xl">
            <div className="flex animate-scroll-left whitespace-nowrap">
              {/* Duplicate for seamless loop */}
              {[...services1, ...services1, ...services1].map((service, index) => (
                <div key={index} className="inline-flex items-center mx-8">
                  <span className="text-white text-2xl md:text-4xl font-bold">
                    {service}
                  </span>
                  <span className="text-white text-3xl md:text-5xl mx-8">✦</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Black Band - Bottom to Top Diagonal */}
      <div className="absolute inset-0 flex items-center">
        <div 
          className="relative w-full overflow-hidden"
          style={{
            transform: 'rotate(-4deg) translateY(20%)',
            height: '120%',
          }}
        >
          <div className="bg-gradient-to-r from-gray-900 to-black py-8 shadow-2xl">
            <div className="flex animate-scroll-right whitespace-nowrap">
              {/* Duplicate for seamless loop */}
              {[...services2, ...services2, ...services2].map((service, index) => (
                <div key={index} className="inline-flex items-center mx-8">
                  <span className="text-white text-2xl md:text-4xl font-bold">
                    {service}
                  </span>
                  <span className="text-orange-500 text-3xl md:text-5xl mx-8">✦</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.33%);
          }
        }

        @keyframes scroll-right {
          0% {
            transform: translateX(-33.33%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .animate-scroll-left {
          animation: scroll-left 30s linear infinite;
        }

        .animate-scroll-right {
          animation: scroll-right 30s linear infinite;
        }
      `}</style>
    </section>
  );
}
