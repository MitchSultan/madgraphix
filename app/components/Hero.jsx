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
      <section className="hero-section h-screen pt-32 md:pt-0  flex flex-col md:flex-row       items-center  text-white">
        <div className="container">
          <div className="hero-content p-4 md:p-20">
            <div className="relative overflow-hidden" style={{ minHeight: '80px' }}>
              <h1    className=" text-2xl md:text-4xl lg:text-6xl font-extrabold"
             >
              <span>Where </span><br></br>
              <span 
                ref={h1Ref}
                className="hero-title text-2xl md:text-4xl lg:text-6xl font-extrabold"
              >
                Creativity Goes Mad
              </span>
              </h1>
            </div>
            <p className="hero-subtitle text-black split">
              At Mirror Arts Designs Graphix, we mix a
              love for design with a knack for making your brand pop.
            </p>
            <div className=" flex gap-2">
            <button className=" bg-blue-600 px-4 rounded-2xl">
            <a href="#get-started" className="hero-button">
              Our Work
            </a>
            </button>
            <button className=" blue-glass px-4 text-black rounded-2xl">
            <a href="https://wa.me/254708779284" className="hero-button">
              Let's Talk
            </a>
            </button>
            </div>
          </div>
        </div>
        <div className="glass">
          <img src="/images/herr.png" ref={hero} className="max-w-full h-auto"></img>
        </div>
        
      </section>
    </>
  );
}
