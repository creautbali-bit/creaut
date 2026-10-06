'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const DEFAULT_OPTIONS = {
  duration: 1.35,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: 'vertical',
  smoothWheel: true,
  wheelMultiplier: 0.9,
  touchMultiplier: 1.8,
  infinite: false,
}

/**
 * Smooth scrolling (Lenis) yang tersinkron dengan GSAP ScrollTrigger.
 * Satu-satunya tempat inisialisasi Lenis untuk semua halaman.
 *
 * @param {object}  [config]
 * @param {boolean} [config.resetScroll=false] Paksa scroll ke atas saat mount/unmount.
 * @param {object}  [config.options]           Override opsi Lenis.
 * @returns {{ current: import('lenis').default | null }} ref ke instance Lenis.
 */
export default function useLenis({ resetScroll = false, options } = {}) {
  const lenisRef = useRef(null)

  useEffect(() => {
    let lenis
    let cancelled = false

    if (resetScroll) {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual'
      }
      window.scrollTo(0, 0)
    }

    const tick = (time) => lenis?.raf(time * 1000)

    const init = async () => {
      try {
        const { default: Lenis } = await import('lenis')
        if (cancelled) return

        lenis = new Lenis({ ...DEFAULT_OPTIONS, ...options })
        lenisRef.current = lenis

        if (resetScroll) lenis.scrollTo(0, { immediate: true })

        gsap.ticker.add(tick)
        gsap.ticker.lagSmoothing(0)
        lenis.on('scroll', ScrollTrigger.update)
      } catch {
        // Smooth scroll hanya enhancement — halaman tetap berfungsi tanpanya.
      }
    }

    init()

    return () => {
      cancelled = true
      if (resetScroll && lenis) lenis.scrollTo(0, { immediate: true })
      gsap.ticker.remove(tick)
      lenis?.destroy()
      lenisRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return lenisRef
}
