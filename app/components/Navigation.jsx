'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
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
        { href: '/Services/web-design', label: 'Web Design ' },
        { href: '/Services/brand-identity', label: 'Brand Identity' },
        { href: '/Services/logo-design', label: 'Logo Design' },
        { href: '/Services/Packaging-designs', label: 'Packaging Design' },
        { href: '/Services/print-design', label: 'Print Design' },
      ],
    },
    { href: '/CaseStudies', label: 'Case Studies' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 shadow-md py-3' : 'bg-transparent py-5'
        } backdrop-blur-md`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <img src="/logos/mad.png" alt="MAD" className="h-10 w-auto" />
            <span className="font-bold text-xl text-primary tracking-tight">M.A.D Graphix</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const hasChildren = !!link.children;
              if (!hasChildren) {
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="relative font-semibold text-primary transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                );
              }

              // Desktop dropdown using pure CSS
              return (
                <div key={link.href} className="relative group py-2">
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-1.5 font-semibold text-primary transition-colors hover:text-accent"
                  >
                    {link.label}
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="transition-transform duration-200 transform group-hover:rotate-180 text-primary group-hover:text-accent"
                    >
                      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>

                  <div className="absolute left-0 top-full mt-0 min-w-[240px] rounded-2xl shadow-xl opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto transition-all duration-200 origin-top bg-white border border-purple-50">
                    <div className="w-full rounded-2xl py-3 flex flex-col">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="px-5 py-2.5 text-sm font-medium text-primary hover:bg-surface-soft hover:text-accent transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </nav>
          
          <div className="hidden md:flex">
             <Link href="/contact" className="bg-primary text-white hover:bg-accent px-6 py-2.5 rounded-pill font-bold shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5">
               Get Started
             </Link>
          </div>

          {/* Mobile toggle */}
          <div className="md:hidden flex items-center">
            <button
              aria-label="Toggle menu"
              onClick={() => setMobileOpen((s) => !s)}
              className="p-2 rounded-md transition-colors text-primary"
            >
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
      <div ref={mobileMenuRef} className="md:hidden bg-white shadow-xl absolute top-full left-0 w-full rounded-b-2xl border-t border-purple-50">
        <div className="px-6 pt-4 pb-6 space-y-1">
          {navLinks.map((link) => {
            const hasChildren = !!link.children;
            if (!hasChildren) {
                return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block w-full text-left text-primary font-bold hover:text-accent transition-colors py-3"
                >
                  {link.label}
                </Link>
                );
            }

            return (
              <div key={link.href} className="w-full">
                <button
                  onClick={() => setMobileServicesOpen((s) => !s)}
                  className="w-full flex items-center justify-between text-primary font-bold hover:text-accent transition-colors py-3"
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
                  <div className="pl-4 border-l-2 border-surface-soft my-2">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => {
                          setMobileOpen(false);
                          setMobileServicesOpen(false);
                        }}
                        className="block py-2.5 text-sm font-medium text-gray-600 hover:text-accent"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
          <div className="pt-4 mt-2 border-t border-surface-soft">
             <Link 
               href="/contact" 
               onClick={() => setMobileOpen(false)}
               className="block w-full text-center bg-primary text-white hover:bg-accent px-6 py-3 rounded-pill font-bold shadow-md transition-all"
             >
               Get Started
             </Link>
          </div>
        </div>
      </div>
    </header>
  );
}