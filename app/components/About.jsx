"use client";
import { gsap } from "gsap";
import { use, useRef } from 'react';

import { useGSAP } from '@gsap/react';
    
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger,SplitText,useGSAP);




export default function AboutUs() {
const container = useRef();
const content = useRef(); 
useGSAP(() => {
gsap.from(container.current, {
 scrollTrigger: {
   trigger: container.current,
   start: "top 60%",
   end: "bottom 20%",
   toggleActions: "play none none none",
 },
 opacity: 0,
 y: 50,
 duration: 3,
 ease: "power3.out",});


 // split all elements with the class "split" into words and characters
let split = SplitText.create(".split", { type: "words, chars" });

// now animate the characters in a staggered fashion
gsap.from(split.char, {
  scrollTrigger: {
    trigger: '.split',
    start: "top 90%",
    end: "bottom 20%",
    toggleActions: "play none none none"
  },
  duration: 0.7, 
  y: 100,         // animate from 100px below
  autoAlpha: 0,   // fade in from opacity: 0 and visibility: hidden
  stagger: 0.5,  // 0.05 seconds between each
});


let split1 = SplitText.create(".split1", { type: "words, chars" });

// now animate the characters in a staggered fashion
gsap.from(split1.words, {
  scrollTrigger: {
    trigger: '.split1',
    start: "top 60%",
    end: "bottom 20%",
    toggleActions: "play none none none"
  },
  duration: 0.5, 
  y: 100,         // animate from 100px below
  autoAlpha: 0,   // fade in from opacity: 0 and visibility: hidden
  stagger: 0.05,  // 0.05 seconds between each
});


});


  return (
    <section className="w-full py-32 bg-white " >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

        {/* RIGHT — VIDEO */}
        <div className="rounded-xl overflow-hidden shadow-lg box glass  " >
         <img ref={container} src="/mockups/phn.png"></img>
        </div>
       
        {/* LEFT — TEXT */}
        <div>
          <div className="blue-glass flex justify-center items-center py-1 rounded-full w-32">About us</div>
          <h2 className="text-4xl text-black lg:text-5xl font-bold mb-6 leading-tight split" >
             Art Straight from the Heart!
          </h2>

          <p className="text-lg text-gray-700 leading-relaxed mb-4 split1">
            We are a digital agency focused on building brands that stand out.
            Our approach blends strategy, creativity, and technology—helping
            companies grow through modern websites, strong branding, and
            performance-driven digital experiences.
          </p>

          

          <button className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition">
            Learn More
          </button>
        </div>

       

      </div>
    </section>
  );
}
