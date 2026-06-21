'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger, useGSAP)

/**
 * useHeadingReveal
 * Scroll-triggered fade-in from below for any heading element.
 *
 * @param {React.RefObject} ref       - ref attached to the heading element
 * @param {Object}          options
 * @param {number}          options.y          Starting Y offset in px     (default: 40)
 * @param {number}          options.duration   Animation duration in s     (default: 0.8)
 * @param {string}          options.ease       GSAP ease string            (default: 'power3.out')
 * @param {number}          options.delay      Delay before animation in s (default: 0)
 * @param {string}          options.start      ScrollTrigger start pos     (default: 'top 85%')
 */
export function useHeadingReveal(ref, options = {}) {
  const {
    y        = 40,
    duration = 0.8,
    ease     = 'power3.out',
    delay    = 0,
    start    = 'top 85%',
  } = options

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return

      // Respect prefers-reduced-motion — skip animation, just show the element
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(el, { opacity: 1, y: 0 })
        return
      }

      gsap.fromTo(
        el,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration,
          ease,
          delay,
          scrollTrigger: {
            trigger: el,
            start,
            toggleActions: 'play none none none',
          },
        }
      )
    },
    { scope: ref }
  )
}