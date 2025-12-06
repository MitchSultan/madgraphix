'use client';
import React from "react";
import { gsap } from "gsap";
import { useRef, useEffect } from 'react';

import { useGSAP } from '@gsap/react';
    
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger,SplitText,useGSAP);



export default function Hero() {

  const hero = useRef(); 
  const h1Ref = useRef();
  const currentIndexRef = useRef(0);

  const sentences = [
    "Creativity Goes Mad",
    "Imagination Meets Design"
  ];

  useGSAP(() => {
    gsap.from(hero.current, {
      opacity: 0,
      y: 50,
      duration: 3,
      ease: "power3.out",
    });

    // Split all elements with the class "split" into words and characters (for subtitle)

    // Animate the subtitle characters
    

    // Text switching animation for h1
    const animateText = () => {
      const currentText = sentences[currentIndexRef.current];
      const nextIndex = (currentIndexRef.current + 1) % sentences.length;
      const nextText = sentences[nextIndex];

      // Set the text to current
      

      // Split the current text
      const splitCurrent = new SplitText(h1Ref.current, { type: "chars" });
      
      // Create timeline for exit animation
      const tl = gsap.timeline({
        onComplete: () => {
          // Update to next text
          currentIndexRef.current = nextIndex;
          h1Ref.current.textContent = nextText;
          
          // Split the new text
          const splitNext = new SplitText(h1Ref.current, { type: "chars" });
          
          // Animate in from below
          gsap.fromTo(splitNext.chars, 
            { 
              y: 100, 
              autoAlpha: 0 
            },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.8,
              stagger: 0.03,
              ease: "power3.out",
              onComplete: () => {
                splitNext.revert();
                // Wait 3 seconds, then animate to next
                gsap.delayedCall(3, animateText);
              }
            }
          );
        }
      });

      // Animate current text out (moving up)
      tl.to(splitCurrent.chars, {
        y: -100,
        autoAlpha: 0,
        duration: 0.6,
        stagger: 0.02,
        ease: "power3.in",
        onComplete: () => {
          splitCurrent.revert();
        }
      });
    };

    // Start the animation after initial delay
    gsap.delayedCall(1, animateText);

  }, []);



  return (
    <>
      <section className="hero-section relative h-screen w-full overflow-hidden">
        {/* Video Background */}
        <video
          ref={hero}
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src="/videos/madhero.mp4" type="video/mp4" />
          <source src="/videos/madhero.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>

        {/* Dark Overlay for Better Text Readability */}
        <div className="absolute top-0 left-0 w-full h-full bg-black/40"></div>

        {/* Hero Text Content - Bottom Left */}
        <div className="absolute bottom-0 left-0 p-6 md:p-12 lg:p-20 text-white z-10">
          <div className="hero-content max-w-3xl">
            <div className="relative overflow-hidden mb-4" style={{ minHeight: '80px' }}>
              <h1 className="text-3xl text-white md:text-5xl lg:text-7xl font-extrabold">
                <span className="text-white">Where </span><br />
                <span 
                  ref={h1Ref}
                  className="hero-title text-3xl text-white md:text-5xl lg:text-7xl font-extrabold"
                >
                  Creativity Goes Mad
                </span>
              </h1>
            </div>
            <p className="hero-subtitle text-white/90 split text-lg md:text-xl mb-6 max-w-2xl">
              At Mirror Arts Designs Graphix, we mix a
              love for design with a knack for making your brand pop.
            </p>
            <div className="flex gap-4 flex-wrap">
              <button className="bg-blue-600 hover:bg-blue-700 px-6 py-1 rounded-2xl transition-colors">
                <a href="/CaseStudies" className="hero-button">
                  Our Work
                </a>
              </button>
              <button className="bg-white/20 backdrop-blur-md hover:bg-white/30 px-6 py-3 text-white rounded-2xl transition-colors border border-white/30">
                <a href="https://wa.me/254708779284" className="hero-button">
                  Let's Talk
                </a>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
