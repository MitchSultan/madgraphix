'use client';
import React from "react";
import { gsap } from "gsap";
import { use, useRef } from 'react';

import { useGSAP } from '@gsap/react';
    
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger,SplitText,useGSAP);



export default function Hero() {


  const hero = useRef(); 
useGSAP(() => {
gsap.from(hero.current, {
 
 opacity: 0,
 y: 50,
 duration: 3,
 ease: "power3.out",});


 // split all elements with the class "split" into words and characters
let split = SplitText.create(".split", { type: "words, chars" });

// now animate the characters in a staggered fashion
gsap.from(split.chars, {
  scrollTrigger: {
    trigger: '.split',
    start: "top 40%",
    end: "bottom 20%",
    toggleActions: "play none none none"
  },
  duration: 1, 
  y: 100,         // animate from 100px below
  autoAlpha: 0,   // fade in from opacity: 0 and visibility: hidden
  stagger: 0.05,  // 0.05 seconds between each
});



});



  return (
    <>
      <section className="hero-section h-screen pt-32 md:pt-0  flex flex-col md:flex-row       items-center  text-white">
        <div className="container">
          <div className="hero-content p-4 md:p-20">
            <h1 className="hero-title text-2xl md:text-4xl lg:text-6xl font-extrabold split">
              {/*Where Imagination Meets Design:*/} 
              Where Creativity Goes Mad
            </h1>
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
