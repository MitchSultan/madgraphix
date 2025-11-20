"use client";

export default function ServiceSection() {
 

  return (
    <section className="w-full py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between mb-14">
          <h2 className="text-4xl text-black lg:text-5xl font-bold">
            Our Services
          </h2>
          <p className="text-gray-600 mt-3 text-lg">
            Everything you need to build, grow, and scale your digital presence.
          </p>
        </div>

        <div className="grid grid-cols-1  lg:grid-rows-3  lg:grid-cols-4 gap-2">
          <div className=" col-span-2 row-span-1 bg-indigo-100 rounded-md p-10 flex flex-col justify-end bg-[url('/images/hoodie.jpg')] bg-contain bg-no-repeat bg-right
           " >
            <h5>Design</h5>
            <p className="lg:max-w-72">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti
              soluta sapiente expedita quos sint quasi doloremque atque velit
              quia odit.
            </p>
          </div>
          <div className=" col-span-2 md:col-span-1 row-span-2 shadow-md  rounded-md p-10 flex flex-col justify-end  bg-[url('/images/CAAP.png')] bg-contain bg-no-repeat bg-top  ">
            <h4>Brand Identity</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti
              soluta sapiente expedita quos sint quasi doloremque atque velit
              quia odit.
            </p>
          </div>
          <div className=" col-span-2 md:col-span-1 row-span-1 bg-blue-300 rounded-md p-10  ">
             <h3>Marketing</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti
              soluta sapiente expedita quos sint quasi doloremque atque velit
              quia odit.
            </p>
          </div>
          <div className=" col-span-2 md:col-span-1 row-span-2 shadow-lg rounded-md p-10 flex flex-col justify-end bg-[url('/mockups/top-phn.png)] bg-center bg-no-repeat bg-contain ">
            <h3>Motion Graphics</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti
              soluta sapiente expedita quos sint quasi doloremque atque velit
              quia odit.
            </p>
          </div>
          <div className=" col-span-2 md:col-span-1 row-span-1 bg-blue-300 rounded-md p-10 ">
            <h3>Illustration</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti
              soluta sapiente expedita quos sint quasi doloremque atque velit
              quia odit.
            </p>
          </div>
          <div className=" col-span-1 row-span-1 grad rounded-md p-10 ">
           
          </div>
          <div className=" col-span-1 row-span-1  rounded-md p-10 bg-[url('/images/bg.png')] bg-center bg-no-repeat bg-contain "></div>
          <div className=" col-span-2 row-span-1 shadow-md rounded-md p-10 flex flex-col justify-end bg-[url('/mockups/rt-lap.png')] bg-right bg-no-repeat bg-contain ">
            <h3>Ads</h3>
            <p className="max-w-72">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti
              soluta sapiente expedita quos sint quasi doloremque atque velit
              quia odit.
            </p>
          </div>
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
                  <h3 className="text-2xl font-semibold mb-2">
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
