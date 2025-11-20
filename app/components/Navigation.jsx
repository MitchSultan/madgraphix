'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';




export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const mobileMenuRef = useRef(null);
  const mobileServicesRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // initialize hidden states
  useEffect(() => {
    if (mobileMenuRef.current) {
      gsap.set(mobileMenuRef.current, { height: 0, autoAlpha: 0, display: 'none' });
    }
    if (mobileServicesRef.current) {
      gsap.set(mobileServicesRef.current, { height: 0, autoAlpha: 0, display: 'none' });
    }
  }, []);

  // animate mobile menu open/close using GSAP (only animations done with GSAP)
  useEffect(() => {
    const el = mobileMenuRef.current;
    if (!el) return;
    if (mobileOpen) {
      gsap.killTweensOf(el);
      gsap.set(el, { display: 'block' });
      gsap.fromTo(el, { height: 0, autoAlpha: 0, y: -8 }, { height: 'auto', autoAlpha: 1, y: 0, duration: 0.35, ease: 'power2.out' });
    } else {
      gsap.killTweensOf(el);
      gsap.to(el, {
        height: 0,
        autoAlpha: 0,
        y: -8,
        duration: 0.28,
        ease: 'power2.in',
        onComplete() {
          gsap.set(el, { display: 'none' });
        },
      });
      // also close mobile submenu
      setMobileServicesOpen(false);
    }
  }, [mobileOpen]);

  // animate mobile services submenu
  useEffect(() => {
    const el = mobileServicesRef.current;
    if (!el) return;
    gsap.killTweensOf(el);
    if (mobileServicesOpen) {
      gsap.set(el, { display: 'block' });
      gsap.fromTo(el, { height: 0, autoAlpha: 0 }, { height: 'auto', autoAlpha: 1, duration: 0.28, ease: 'power2.out' });
    } else {
      gsap.to(el, {
        height: 0,
        autoAlpha: 0,
        duration: 0.22,
        ease: 'power2.in',
        onComplete() {
          gsap.set(el, { display: 'none' });
        },
      });
    }
  }, [mobileServicesOpen]);

  const navLinks = [
    { href: '/About', label: 'About' },
    {
      href: '/Services',
      label: 'Services',
      children: [
        { href: '/Services/branding', label: 'Branding' },
        { href: '/services/design', label: 'Design' },
        { href: '/services/web', label: 'Web Development' },
        { href: '/services/marketing', label: 'Marketing' },
      ],
    },
    { href: '/CaseStudies', label: 'Case Studies' },
    { href: '/partners', label: 'Partners' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 shadow-md' : 'bg-transparent'
      } backdrop-blur-sm`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          <a href="/" className={`flex items-center gap-3 ${isScrolled ? '' : 'text-white'}`}>
            <img src="/logos/mad.png" alt="MAD" className="h-10 w-auto" />
            <span className={`font-bold text-lg ${isScrolled ? 'text-slate-900' : 'text-white'}`}>MAD Graphix</span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              const hasChildren = !!link.children;
              if (!hasChildren) {
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    className={`relative px-2 py-1 font-medium transition-colors hover:text-emerald-500 ${
                      isScrolled ? 'text-slate-700' : 'text-white'
                    }`}
                  >
                    {link.label}
                  </a>
                );
              }

              // Desktop dropdown using pure CSS (no GSAP required per spec)
              return (
                <div key={link.href} className="relative group">
                  <a
                    href={link.href}
                    className={`px-2 py-1 inline-flex items-center gap-2 font-medium transition-colors hover:text-emerald-500 ${
                      isScrolled ? 'text-slate-700' : 'text-white'
                    }`}
                  >
                    {link.label}
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className={`transition-transform duration-200 transform group-hover:rotate-180 ${isScrolled ? 'text-slate-700' : 'text-white'}`}
                    >
                      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>

                  <div className="absolute left-0 mt-2 min-w-52 rounded-md shadow-lg opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto transition-all duration-150 origin-top">
                    <div className="bg-white w-full rounded-md py-2 ring-1 ring-black/5">
                      {link.children.map((child) => (
                        <a
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                        >
                          {child.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </nav>

          {/* Mobile toggle */}
          <div className="md:hidden flex items-center">
            <button
              aria-label="Toggle menu"
              onClick={() => setMobileOpen((s) => !s)}
              className={`p-2 rounded-md transition-colors ${isScrolled ? 'text-slate-900' : 'text-white'}`}
            >
              {/* simple hamburger / close icon */}
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                {mobileOpen ? (
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu - GSAP animates this container */}
      <div ref={mobileMenuRef} className="md:hidden bg-white shadow-md">
        <div className="px-4 pt-4 pb-6 space-y-2">
          {navLinks.map((link) => {
            const hasChildren = !!link.children;
            if (!hasChildren) {
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block w-full text-left text-slate-700 font-medium hover:text-emerald-500 transition-colors py-2"
                >
                  {link.label}
                </a>
              );
            }

            return (
              <div key={link.href} className="w-full">
                <button
                  onClick={() => setMobileServicesOpen((s) => !s)}
                  className="w-full flex items-center justify-between text-slate-700 font-medium hover:text-emerald-500 transition-colors py-2"
                >
                  <span>{link.label}</span>
                  <svg
                    className={`w-4 h-4 transition-transform ${mobileServicesOpen ? 'rotate-180' : 'rotate-0'}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
                  </svg>
                </button>

                <div ref={mobileServicesRef} className="overflow-hidden">
                  <div className="pl-4">
                    {link.children.map((child) => (
                      <a
                        key={child.href}
                        href={child.href}
                        onClick={() => {
                          setMobileOpen(false);
                          setMobileServicesOpen(false);
                        }}
                        className="block py-2 text-slate-600 hover:text-emerald-500"
                      >
                        {child.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </header>
  );
}