'use client';
import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

export default function Loader({ onLoadComplete }) {
  const loaderRef = useRef();
  const aShapeRef = useRef();
  const [currentShapeIndex, setCurrentShapeIndex] = useState(0);

  // Different SVG shapes that resemble the letter 'A'
  const aShapes = [
    // Triangle
    <svg key="triangle" width="60" height="80" viewBox="0 0 60 80" className="inline-block">
      <path d="M30 10 L55 70 L5 70 Z" fill="currentColor" stroke="currentColor" strokeWidth="3"/>
      <rect x="20" y="50" width="20" height="5" fill="#000"/>
    </svg>,
    // Pyramid
    <svg key="pyramid" width="60" height="80" viewBox="0 0 60 80" className="inline-block">
      <polygon points="30,10 55,70 5,70" fill="currentColor" stroke="currentColor" strokeWidth="2"/>
      <line x1="15" y1="50" x2="45" y2="50" stroke="#000" strokeWidth="4"/>
    </svg>,
    // Angular A
    <svg key="angular" width="60" height="80" viewBox="0 0 60 80" className="inline-block">
      <path d="M10 70 L30 10 L50 70 M18 50 L42 50" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>,
    // Modern A
    <svg key="modern" width="60" height="80" viewBox="0 0 60 80" className="inline-block">
      <path d="M15 70 L30 15 L45 70" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/>
      <path d="M20 48 L40 48" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/>
    </svg>,
    // Bold A
    <svg key="bold" width="60" height="80" viewBox="0 0 60 80" className="inline-block">
      <path d="M12 70 L30 12 L48 70 M20 46 L40 46" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ];

  // Cycle through shapes
  useGSAP(() => {
    const timeline = gsap.timeline({ repeat: -1 });
    
    aShapes.forEach((_, index) => {
      timeline.call(() => setCurrentShapeIndex(index), null, index * 0.5);
    });
  }, []);

  // Loader exit animation
  useGSAP(() => {
    const timer = setTimeout(() => {
      gsap.to(loaderRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.8,
        ease: 'power3.inOut',
        onComplete: () => {
          if (onLoadComplete) onLoadComplete();
        }
      });
    }, 3000); // Show loader for 3 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      ref={loaderRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
    >
      <div className="flex items-center gap-2 text-white">
        <span className="text-8xl font-extrabold">M</span>
        <span ref={aShapeRef} className="inline-flex items-center justify-center w-20 h-20 text-white">
          {aShapes[currentShapeIndex]}
        </span>
        <span className="text-8xl font-extrabold">D</span>
      </div>
    </div>
  );
}
