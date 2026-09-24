'use client'

import { useEffect, useRef, useState, useCallback, useLayoutEffect } from 'react'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import Navbar from '../components/navbar'
import CTA from '../components/cta'
import Footer from '../components/footer'

gsap.registerPlugin(ScrollTrigger)

function useLenis() {
  const lenisRef = useRef(null)

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

    let lenis
    const init = async () => {
      try {
        const LenisModule = await import('@studio-freight/lenis')
        const Lenis = LenisModule.default ?? LenisModule.Lenis
        lenis = new Lenis({
          duration: 1.35,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: 'vertical',
          smoothWheel: true,
          wheelMultiplier: 0.9,
          touchMultiplier: 1.8,
          infinite: false,
        })
        lenisRef.current = lenis
        lenis.scrollTo(0, { immediate: true })
        gsap.ticker.add((time) => lenis.raf(time * 1000))
        gsap.ticker.lagSmoothing(0)
        lenis.on('scroll', ScrollTrigger.update)
      } catch {}
    }

    window.scrollTo(0, 0)
    init()

    return () => {
      if (lenis) lenis.scrollTo(0, { immediate: true })
      gsap.ticker.remove((time) => lenis?.raf(time * 1000))
      lenis?.destroy()
      lenisRef.current = null
    }
  }, [])

  return lenisRef
}

const CATEGORIES = [
  {
    id: 'social',
    label: 'Social Media Management',
    shortLabel: 'Social Media',
    href: '/services/social-media-management',
    accentColor: '#E1306C',
    gradientTo: '#833ab4',
    description: 'Driving engagement & brand awareness across all major platforms.',
    stats: '120+ campaigns',
    cards: [
      { id: 1, caption: 'Brand Awareness Campaign', src: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=800&q=80', images: ['https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=800&q=80', 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&q=80', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80', 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80', 'https://images.unsplash.com/photo-1512314889357-e157c22f938d?w=800&q=80', 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80', 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80'] },
      { id: 2, caption: 'Content Calendar Strategy', src: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80', images: ['https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80', 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80', 'https://images.unsplash.com/photo-1542626991-cbc4e32524cc?w=800&q=80', 'https://images.unsplash.com/photo-1553484771-371a605b060b?w=800&q=80', 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80', 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80', 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=800&q=80'] },
      { id: 3, caption: 'Analytics & Growth Report', src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80', images: ['https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80', 'https://images.unsplash.com/photo-1543286386-713bdd548da4?w=800&q=80', 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=80', 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80', 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80', 'https://images.unsplash.com/photo-1487611272516-5b43c1a69e7f?w=800&q=80'] },
      { id: 4, caption: 'Influencer Collaboration', src: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80', images: ['https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80', 'https://images.unsplash.com/photo-1602233158242-3ba0ac4d2167?w=800&q=80', 'https://images.unsplash.com/photo-1543269664-56d93b45f48a?w=800&q=80', 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80', 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800&q=80', 'https://images.unsplash.com/photo-1511985117068-0da62e6bf038?w=800&q=80'] },
      { id: 5, caption: 'Instagram Story Series', src: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80', images: ['https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80', 'https://images.unsplash.com/photo-1512314889357-e157c22f938d?w=800&q=80', 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=800&q=80', 'https://images.unsplash.com/photo-1611944212129-29977ae1398c?w=800&q=80', 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80', 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80', 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80'] },
      { id: 6, caption: 'Reels Production', src: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80', images: ['https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80', 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80', 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&q=80', 'https://images.unsplash.com/photo-1536240478700-b869ad10e128?w=800&q=80', 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&q=80', 'https://images.unsplash.com/photo-1601506521793-dc748fc80b67?w=800&q=80', 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80'] },
      { id: 7, caption: 'Community Management', src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80', images: ['https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80', 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80', 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80', 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80', 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80', 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80', 'https://images.unsplash.com/photo-1543269664-56d93b45f48a?w=800&q=80'] },
    ],
  },
  {
    id: 'photo',
    label: 'Visual Photography',
    shortLabel: 'Photography',
    href: '/services/visual-photography/portfolio',
    accentColor: '#5de0e6',
    gradientTo: '#004aad',
    description: 'Capturing the essence of your brand through stunning imagery.',
    stats: '200+ shoots',
    cards: [
      { id: 1, caption: 'Katalog', src: 'image/photo5.webp', images: ['image/photo5.webp', 'image/photo6.webp'] },
      { id: 2, caption: 'Personal Branding', src: 'image/photo3.webp', images: ['image/photo3.webp', 'image/photo4.webp', 'image/photo1.webp', 'image/photo2.webp'] },
      { id: 3, caption: 'Entertaint', src: 'image/photo21.webp', images: ['image/photo19.webp', 'image/photo20.webp', 'image/photo21.webp', 'image/photo22.webp', 'image/photo23.webp'] },
      { id: 4, caption: 'F&B', src: 'image/pho17.webp', images: ['image/pho17.webp', 'image/pho18.webp', 'image/pho19.webp', 'image/pho23.webp', 'image/pho24.webp'] },
      { id: 5, caption: 'Beauty', src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=80', 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800&q=80', 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&q=80', 'https://images.unsplash.com/photo-1501746877-14782df58970?w=800&q=80', 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80', 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80'] },
      { id: 6, caption: 'Environment', src: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80', images: ['https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80', 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80', 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80', 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80', 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80'] },
      { id: 7, caption: 'Adventure', src: 'https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=800&q=80', images: ['https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=800&q=80', 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80', 'https://images.unsplash.com/photo-1528543606781-2f6e8759bc48?w=800&q=80', 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=800&q=80', 'https://images.unsplash.com/photo-1522163182402-834f871fd851?w=800&q=80', 'https://images.unsplash.com/photo-1502791451862-7bd8c1df43a7?w=800&q=80', 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80'] },
    ],
  },
  {
    id: 'video',
    label: 'Video Production',
    shortLabel: 'Video',
    href: '/services/video-production/portfolio',
    accentColor: '#004aad',
    gradientTo: '#5de0e6',
    description: 'Cinematic storytelling that elevates your brand narrative.',
    stats: '80+ productions',
    cards: [
      { id: 1, caption: 'Entertainments', src: 'image/ba1.webp', images: ['image/ba2.webp', 'image/ba3.webp', 'image/ba1.webp', 'image/ba2.webp', 'image/ba3.webp', 'image/ba1.webp', 'image/ba2.webp'] },
      { id: 2, caption: 'Food & Beverage', src: 'image/mcc1.webp', images: ['image/mcc2.webp', 'image/mcc3.webp', 'image/mcc1.webp', 'image/mcc2.webp', 'image/mcc3.webp'] },
      { id: 3, caption: 'Fashion & Clothing', src: 'image/advish1.webp', images: ['image/advish2.webp', 'image/advish3.webp', 'image/advish4.webp', 'image/advish5.webp'] },
      { id: 4, caption: 'Property & Real Estate', src: 'image/amartya1.webp', images: ['image/amartya2.webp', 'image/amartya3.webp', 'image/amartya1.webp', 'image/amartya2.webp', 'image/amartya3.webp'] },
      { id: 5, caption: 'Hospitality', src: 'image/uma1.webp', images: ['image/uma1.webp', 'image/uma2.webp', 'image/uma3.webp', 'image/uma1.webp', 'image/uma2.webp', 'image/uma3.webp'] },
      { id: 6, caption: 'Environment', src: 'image/amanaid1.webp', images: ['image/amanaid2.webp', 'image/amanaid3.webp'] },
      { id: 7, caption: 'Adventure', src: 'image/raka1.webp', images: ['image/raka2.webp'] },
    ],
  },
  {
    id: 'branding',
    label: 'Branding',
    shortLabel: 'Branding',
    href: '/services/branding/portfolio',
    accentColor: '#f59e0b',
    gradientTo: '#ef4444',
    description: 'Building distinctive identities that resonate and endure.',
    stats: '50+ brands',
    cards: [
      { id: 1, caption: 'Personal Branding', src: '/image/bra34.webp', images: ['/image/bra34.webp', '/image/bra35.webp', '/image/bra36.webp', '/image/bra37.webp', '/image/bra38.webp', '/image/bra39.webp', '/image/bra40.webp', '/image/bra41.webp', '/image/bra42.webp', '/image/bra43.webp', '/image/bra44.webp', '/image/bra45.webp', '/image/bra46.webp', '/image/bra47.webp', '/image/bra48.webp', '/image/bra49.webp', '/image/bra50.webp', '/image/bra51.webp', '/image/bra34.webp'] },
      { id: 2, caption: 'Katalog', src: '/image/bra59.webp', images: ['/image/bra52.webp', '/image/bra53.webp', '/image/bra54.webp', '/image/bra55.webp', '/image/bra56.webp', '/image/bra57.webp', '/image/bra58.webp', '/image/bra60.webp', '/image/bra52.webp'] },
      { id: 3, caption: 'Beauty', src: '/image/bra1.webp', images: ['/image/bra2.webp', '/image/bra3.webp', '/image/bra4.webp', '/image/bra1.webp'] },
      { id: 4, caption: 'F&B', src: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80', images: ['https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80', 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=800&q=80', 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80', 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80', 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&q=80', 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80', 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80'] },
      { id: 5, caption: 'Beauty', src: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&q=80', images: ['https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&q=80', 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80', 'https://images.unsplash.com/photo-1493421419110-74f4e85ba126?w=800&q=80', 'https://images.unsplash.com/photo-1542744094-24638eff58bb?w=800&q=80', 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80', 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80', 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=800&q=80'] },
      { id: 6, caption: 'Environment', src: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80', images: ['https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80', 'https://images.unsplash.com/photo-1542744094-24638eff58bb?w=800&q=80', 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80', 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=800&q=80', 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80', 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80', 'https://images.unsplash.com/photo-1493421419110-74f4e85ba126?w=800&q=80'] },
      { id: 7, caption: 'Adventure', src: 'https://images.unsplash.com/photo-1542744094-24638eff58bb?w=800&q=80', images: ['https://images.unsplash.com/photo-1542744094-24638eff58bb?w=800&q=80', 'https://images.unsplash.com/photo-1493421419110-74f4e85ba126?w=800&q=80', 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80', 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&q=80', 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80', 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80', 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=800&q=80'] },
    ],
  },
]

// ─── CursorPreview ─────────────────────────────────────────────────────────────
// Awwwards-style: single smooth-following preview card with clip-path wipe transitions.
// Replaces the old scattered ImageTrail pool approach.
// Uses only GSAP (already installed) — zero extra dependencies.
// ──────────────────────────────────────────────────────────────────────────────
function CursorPreview() {
  const PW = 165                         // preview width  (px)
  const PH = Math.round(PW * 16 / 9)    // preview height ≈ 293px  (9:16 portrait)

  const wrapRef = useRef(null)   // outer card element  (the thing that moves + scales)
  const imgARef = useRef(null)   // image layer A  (double-buffer)
  const imgBRef = useRef(null)   // image layer B
  const dotRef  = useRef(null)   // custom cursor dot
  const catRef  = useRef(null)   // category label (top-left)
  const capRef  = useRef(null)   // caption        (bottom)
  const dotsRef = useRef(null)   // progress dots  (top-right)

  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (!mounted) return
    // Touch devices OR small screens (tablet/mobile): bail out
    if (window.matchMedia('(hover: none)').matches) return
    if (window.innerWidth < 1024) return

    const wrap = wrapRef.current
    const imgA = imgARef.current
    const imgB = imgBRef.current
    const dot  = dotRef.current

    // ── mouse & lerped-position state ──────────────────────────────────────
    let mx = 0, my = 0   // raw mouse
    let cx = 0, cy = 0   // lerped (current) position
    let pvx = 0          // previous cx, used for velocity-based rotation

    // ── interaction state ──────────────────────────────────────────────────
    let active     = false   // is preview currently visible?
    let prevCard   = null    // last hovered .insta-card element
    let prevIdx    = -1      // last image index shown
    let showing    = 'a'     // which buffer is on top: 'a' | 'b'
    let currentSrc = ''      // src of the image currently being shown
    let curImages  = []      // images[] from the hovered card

    // ── helpers ─────────────────────────────────────────────────────────────

    /** Keep the preview inside the viewport, flipping side when near the edge */
    function clampPos(x, y) {
      const pad = 12
      let px = x + 20         // default: right of cursor
      let py = y - PH / 2     // vertically centred on cursor

      if (px + PW > window.innerWidth  - pad) px = x - 20 - PW   // flip left
      if (py < pad)                            py = pad             // top clamp
      if (py + PH > window.innerHeight - pad) py = window.innerHeight - pad - PH  // bottom clamp

      return [px, py]
    }

    /** Rebuild / update the progress dot strip */
    function buildDots(count, activeIdx) {
      const el = dotsRef.current
      if (!el) return
      const cap = Math.min(count, 8)   // show max 8 dots

      // Only rebuild DOM when the count changes
      if (el.children.length !== cap) {
        el.innerHTML = ''
        for (let i = 0; i < cap; i++) {
          const d = document.createElement('div')
          Object.assign(d.style, {
            height: '3px',
            borderRadius: '999px',
            flexShrink: '0',
            transition: 'width 0.22s ease, background 0.22s ease',
          })
          el.appendChild(d)
        }
      }

      // Update each dot's active / inactive style
      Array.from(el.children).forEach((d, i) => {
        d.style.width      = i === activeIdx ? '16px'              : '4px'
        d.style.background = i === activeIdx ? '#ffffff'           : 'rgba(255,255,255,0.35)'
      })
    }

    /**
     * Double-buffer image swap with awwwards-style clip-path wipe.
     * The incoming image reveals from top → bottom (expo.out snappy ease).
     * The outgoing image fades beneath with a short delay.
     *
     * `immediate = true`: sets image instantly, used on card entry so the
     * card-entrance scale animation masks the first load.
     */
    function swapTo(src, immediate = false) {
      if (!src || src === currentSrc) return
      currentSrc = src

      const front = showing === 'a' ? imgA : imgB
      const back  = showing === 'a' ? imgB : imgA

      gsap.killTweensOf([front, back])

      if (immediate) {
        front.src = src
        gsap.set(front, { opacity: 1, zIndex: 2, clipPath: 'inset(0% 0% 0% 0%)' })
        gsap.set(back,  { opacity: 0, zIndex: 1, clipPath: 'inset(0% 0% 0% 0%)' })
        return
        // NOTE: no `showing` flip needed — front stays on top, no animation
      }

      // Put new image on back layer (hidden, fully clipped from bottom)
      back.src = src
      gsap.set(back,  { opacity: 1, zIndex: 2, clipPath: 'inset(0% 0% 100% 0%)' })
      // Ensure front has no stale clipPath from a previously interrupted swap
      gsap.set(front, { opacity: 1, zIndex: 1, clipPath: 'inset(0% 0% 0% 0%)' })

      // Reveal back: clip shrinks top→bottom (expo snappy feel)
      gsap.to(back,  { clipPath: 'inset(0% 0% 0% 0%)',  duration: 0.52, ease: 'expo.out'   })
      // Fade out front beneath, slight delay so it's not abrupt
      gsap.to(front, { opacity: 0,                       duration: 0.38, ease: 'power2.in', delay: 0.06 })

      showing = showing === 'a' ? 'b' : 'a'
    }

    // ── RAF ticker: lerp position + velocity rotation ────────────────────
    function tick() {
      cx += (mx - cx) * 0.09    // adjust for snappier (↑) or dreamier (↓) follow
      cy += (my - cy) * 0.09

      const vx = cx - pvx
      pvx = cx

      const [px, py] = clampPos(cx, cy)
      const rot = gsap.utils.clamp(-5, 5, vx * 1.1)   // tilt on fast moves

      gsap.set(wrap, { x: px, y: py, rotation: rot, force3D: true })
      if (dot) gsap.set(dot, { x: mx, y: my, force3D: true })
    }
    gsap.ticker.add(tick)

    // ── mouse handler ────────────────────────────────────────────────────
    function onMove(e) {
      mx = e.clientX
      my = e.clientY

      const card = e.target.closest('.insta-card')

      // ── Cursor left all cards ────────────────────────────────────────
      if (!card) {
        if (active) {
          active = false
          prevCard = null
          prevIdx  = -1
          gsap.to(wrap, { opacity: 0, scale: 0.8, duration: 0.3, ease: 'power3.in' })
          if (dot) gsap.to(dot, { opacity: 0, duration: 0.2 })
        }
        return
      }

      // ── Cursor entered a card (from nothing) ─────────────────────────
      if (!active) {
        active = true
        // Scale-up entrance — card starts slightly small for a "pop" feel
        gsap.fromTo(wrap,
          { scale: 0.72 },
          { opacity: 1, scale: 1, duration: 0.56, ease: 'expo.out' }
        )
        if (dot) gsap.to(dot, { opacity: 1, duration: 0.22 })
      }

      // ── Switched to a different card ─────────────────────────────────
      if (card !== prevCard) {
        prevCard   = card
        prevIdx    = -1
        currentSrc = ''
        showing    = 'a'

        // Reset both image buffers to a clean slate
        gsap.killTweensOf([imgA, imgB])
        gsap.set([imgA, imgB], { opacity: 0, clipPath: 'inset(0% 0% 0% 0%)', zIndex: 1 })

        // Read new card's data
        curImages = JSON.parse(card.getAttribute('data-trail') || '[]')

        // Animate category label in
        if (catRef.current) {
          gsap.set(catRef.current, { y: 5, opacity: 0 })
          catRef.current.textContent = card.getAttribute('data-category') || ''
          gsap.to(catRef.current, { y: 0, opacity: 1, duration: 0.28, ease: 'power2.out', delay: 0.04 })
        }

        // Animate caption in (slightly offset for stagger feel)
        if (capRef.current) {
          gsap.set(capRef.current, { y: 8, opacity: 0 })
          capRef.current.textContent = card.getAttribute('data-caption') || ''
          gsap.to(capRef.current, { y: 0, opacity: 1, duration: 0.34, ease: 'power2.out', delay: 0.09 })
        }

        // Load first image immediately (hidden under the entrance scale)
        if (curImages.length > 0) {
          swapTo(curImages[0], true)
          buildDots(curImages.length, 0)
        }
      }

      if (!curImages.length) return

      // ── Map cursor X position → image index ─────────────────────────
      const rect = card.getBoundingClientRect()
      const rel  = Math.max(0, Math.min(e.clientX - rect.left, rect.width)) / rect.width
      const idx  = Math.min(Math.floor(rel * curImages.length), curImages.length - 1)

      if (idx !== prevIdx) {
        prevIdx = idx
        swapTo(curImages[idx])
        buildDots(curImages.length, idx)
      }
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      gsap.ticker.remove(tick)
    }
  }, [mounted])

  if (!mounted) return null

  return createPortal(
    <>
      {/* ── Custom cursor dot ───────────────────────────────────────────── */}
      {/* mix-blend-mode:difference gives the classic white inversion effect */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed', top: 0, left: 0,
          width: 10, height: 10, borderRadius: '50%',
          background: '#fff',
          mixBlendMode: 'difference',
          pointerEvents: 'none',
          opacity: 0,
          zIndex: 9999,
          willChange: 'transform',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* ── Preview card ────────────────────────────────────────────────── */}
      <div
        ref={wrapRef}
        style={{
          position: 'fixed', top: 0, left: 0,
          width: PW, height: PH,
          borderRadius: 0,
          overflow: 'hidden',
          pointerEvents: 'none',
          opacity: 0,
          zIndex: 9997,
          willChange: 'transform, opacity',
          background: '#0a0a0a',
          boxShadow: '0 8px 32px rgba(0,0,0,0.35), 0 24px 64px rgba(0,0,0,0.45)',
        }}
      >
        {/* Image layer A */}
        <img
          ref={imgARef}
          alt=""
          draggable={false}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover',
            zIndex: 1,
          }}
        />
        {/* Image layer B */}
        <img
          ref={imgBRef}
          alt=""
          draggable={false}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover',
            opacity: 0,
            zIndex: 1,
          }}
        />

        {/* Bottom vignette for text legibility */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none',
          background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.06) 52%, transparent 72%)',
        }} />

        {/* ── Top row: category label (left) + progress dots (right) ──── */}
        <div style={{
          position: 'absolute', top: '0.8rem', left: '0.85rem', right: '0.85rem',
          zIndex: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          pointerEvents: 'none',
        }}>
          <p
            ref={catRef}
            style={{
              margin: 0,
              color: 'rgba(255,255,255,0.55)',
              fontSize: '0.5rem',
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              fontFamily: 'Inter, sans-serif',
            }}
          />
          <div
            ref={dotsRef}
            style={{ display: 'flex', gap: '3px', alignItems: 'center' }}
          />
        </div>

        {/* ── Bottom: caption ─────────────────────────────────────────── */}
        <div style={{
          position: 'absolute', bottom: '0.9rem', left: '0.85rem', right: '0.85rem',
          zIndex: 4, pointerEvents: 'none',
        }}>
          <p
            ref={capRef}
            style={{
              margin: 0,
              color: '#fff',
              fontSize: '0.74rem',
              fontWeight: 600,
              lineHeight: 1.35,
              fontFamily: 'Inter, sans-serif',
              letterSpacing: '-0.01em',
            }}
          />
        </div>
      </div>
    </>,
    document.body
  )
}

// ─── InstaCard ────────────────────────────────────────────────────────────────
// Simplified: portal preview removed — CursorPreview handles everything globally.
// Added data-caption + data-category so CursorPreview can read them.
// ──────────────────────────────────────────────────────────────────────────────
function InstaCard({ card, accent, platform, className = '' }) {
  const slideshowImages = card.images || [card.src]

  return (
    <div
      className={`insta-card${className ? ' ' + className : ''}`}
      data-trail={JSON.stringify(slideshowImages)}
      data-caption={card.caption}
      data-category={platform}
      style={{
        position: 'relative',
        overflow: 'hidden',
        cursor: 'none',
        background: '#111',
        width: '100%',
        aspectRatio: '9 / 16',
        borderRadius: 0,
      }}
    >
      <img
        src={card.src}
        alt={card.caption}
        draggable={false}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />

      {/* Gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 35%, rgba(0,0,0,0) 60%)',
      }} />

      {/* Top row: platform badge + accent dot */}
      <div style={{
        position: 'absolute', top: '0.75rem', left: '0.75rem', right: '0.75rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        pointerEvents: 'none',
      }}>
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.08)',
          color: '#fff',
          padding: '0.3rem 0.6rem',
          borderRadius: '999px',
          fontSize: '0.6rem',
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          fontFamily: 'Inter, sans-serif',
        }}>
          {platform}
        </div>
        <div style={{
          width: 7, height: 7, borderRadius: '999px',
          background: accent, boxShadow: `0 0 10px ${accent}`,
        }} />
      </div>

      {/* Bottom: caption */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '1rem', pointerEvents: 'none',
      }}>
        <p style={{
          color: '#fff', fontSize: '0.78rem', fontWeight: 600,
          lineHeight: 1.4, margin: 0, fontFamily: 'Inter, sans-serif',
        }}>
          {card.caption}
        </p>
      </div>
    </div>
  )
}

// ─── SeeMoreCard ─────────────────────────────────────────────────────────────
function SeeMoreCard({ category, href }) {
  const BLUE_FROM = '#5de0e6'
  const BLUE_TO   = '#004aad'

  return (
    <Link
      href={href}
      className="see-more-card"
      style={{
        position: 'relative', overflow: 'hidden', cursor: 'pointer',
        width: '100%', aspectRatio: '9 / 16',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', gap: '0.8rem', padding: '1rem',
        background: `linear-gradient(135deg, ${BLUE_FROM}, ${BLUE_TO})`,
        transition: 'filter 0.3s ease', textDecoration: 'none', borderRadius: 0,
      }}
      onMouseEnter={e => (e.currentTarget.style.filter = 'brightness(1.12)')}
      onMouseLeave={e => (e.currentTarget.style.filter = 'brightness(1)')}
    >
      {/* decorative blur blob */}
      <div style={{
        position: 'absolute', width: '70%', height: '70%', borderRadius: '50%',
        background: 'rgba(255,255,255,0.08)', filter: 'blur(28px)',
        top: '-15%', right: '-15%', pointerEvents: 'none',
      }} />

      {/* Arrow circle — className lets CSS shrink it on mobile */}
      <div className="see-more-circle" style={{
        background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)',
        padding: 'max(1rem, 1.8vw)', borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
        border: '1px solid rgba(255,255,255,0.25)',
        position: 'relative', zIndex: 1, flexShrink: 0,
      }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
          stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          style={{ width: 'min(24px, 4vw)', height: 'min(24px, 4vw)' }}
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </div>

      {/* Text group — className lets CSS align left on mobile */}
      <div className="see-more-label" style={{
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', gap: '0.2rem',
        position: 'relative', zIndex: 1,
      }}>
        <span style={{
          color: '#fff', fontWeight: 700, fontSize: 'clamp(0.65rem, 1.2vw, 0.85rem)',
          fontFamily: 'Inter, sans-serif', letterSpacing: '0.05em', whiteSpace: 'nowrap',
        }}>See More</span>
        <span style={{
          color: 'rgba(255,255,255,0.6)', fontSize: '0.6rem',
          fontFamily: 'Inter, sans-serif', textTransform: 'uppercase', letterSpacing: '0.18em',
        }}>{category}</span>
      </div>
    </Link>
  )
}

// ─── OurWorkPage ─────────────────────────────────────────────────────────────
// Only change: <ImageTrail /> → <CursorPreview />
// Everything else identical to original.
// ──────────────────────────────────────────────────────────────────────────────
export default function OurWorkPage() {
  const lenisRef = useLenis()
  const [activeTab, setActiveTab] = useState(0)

  const workContainerRef = useRef(null)
  const heroRef          = useRef(null)
  const heroInnerRef     = useRef(null)
  const heroTextRef      = useRef(null)
  const overlayRef       = useRef(null)
  const workRef          = useRef(null)
  const trackRef         = useRef(null)
  const footerRef        = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .fromTo(overlayRef.current,
          { scaleY: 1 },
          { scaleY: 0, duration: 1.25, ease: 'power4.inOut', transformOrigin: 'top' }
        )
        .fromTo(heroTextRef.current.querySelectorAll('.hero-line'),
          { y: 70, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.1, duration: 0.95 },
          '-=0.45'
        )
    }, heroRef)
    return () => ctx.revert()
  }, [])

  useLayoutEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(min-width: 1px)', () => {
      ScrollTrigger.create({
        trigger: heroRef.current, start: 'top top',
        end: () => `+=${window.innerHeight * 1.2}`,
        pin: true, pinSpacing: false, anticipatePin: 1, id: 'hero-pin',
      })

      gsap.to(heroInnerRef.current, {
        y: -80, opacity: 0, scale: 0.97, ease: 'none',
        scrollTrigger: {
          trigger: workContainerRef.current,
          start: 'top 85%', end: 'top 10%', scrub: 1.2,
        },
      })

      gsap.fromTo(workRef.current,
        { y: 120, clipPath: 'inset(6% 0% 0% 0% round 18px 18px 0px 0px)' },
        {
          y: 0, clipPath: 'inset(0% 0% 0% 0% round 0px 0px 0px 0px)', ease: 'none',
          scrollTrigger: {
            trigger: workContainerRef.current,
            start: 'top 92%', end: 'top 5%', scrub: 1,
          },
        }
      )

      gsap.to(trackRef.current, {
        x: () => -(trackRef.current.scrollWidth - window.innerWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: workContainerRef.current,
          start: 'top top',
          end: () => `+=${window.innerHeight * 1.3 * (CATEGORIES.length - 1)}`,
          pin: true, pinSpacing: true, scrub: 0.9, anticipatePin: 1,
          invalidateOnRefresh: true, id: 'work-horizontal',
          onUpdate: (self) => setActiveTab(Math.round(self.progress * (CATEGORIES.length - 1))),
        },
      })

      gsap.fromTo(footerRef.current,
        { y: 60, clipPath: 'inset(8% 0% 0% 0% round 24px 24px 0px 0px)' },
        {
          y: 0, clipPath: 'inset(0% 0% 0% 0% round 0px 0px 0px 0px)', ease: 'none',
          scrollTrigger: {
            trigger: footerRef.current, start: 'top 92%', end: 'top 15%', scrub: 1,
          },
        }
      )

      ScrollTrigger.refresh()
      return () => ScrollTrigger.getAll().forEach(t => t.kill())
    })

    const timer = setTimeout(() => ScrollTrigger.refresh(), 100)
    return () => { mm.revert(); clearTimeout(timer) }
  }, [])

  const handleTabClick = useCallback((idx) => {
    const st = ScrollTrigger.getById('work-horizontal')
    if (!st) return
    const progress = idx === 0 ? 0 : idx / (CATEGORIES.length - 1)
    const target   = st.start + progress * (st.end - st.start)
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, { duration: 1.4 })
    } else {
      window.scrollTo({ top: target, behavior: 'smooth' })
    }
  }, [lenisRef])

  return (
    <>
      <style>{`
        @keyframes fadeInSlide { from { opacity: 0; } to { opacity: 1; } }
        html { scroll-behavior: auto !important; }
        *, *::before, *::after { box-sizing: border-box; }
        :root { --navbar-h: 65px; --tabbar-h: 52px; }
        @media (max-width: 768px) { :root { --navbar-h: 60px; --tabbar-h: 48px; } }
        nav, header { z-index: 9999 !important; }
        .panel-hero { position: relative; z-index: 1; }
        .panel-work { position: relative; will-change: transform, clip-path; }
        .panel-footer { position: relative; z-index: 3; will-change: transform, clip-path; }
        html.lenis { height: auto; }
        .lenis.lenis-smooth { scroll-behavior: auto; }
        .lenis.lenis-stopped { overflow: hidden; }
        .lenis.lenis-scrolling iframe { pointer-events: none; }
        .tab-strip::-webkit-scrollbar { display: none; }
        .tab-strip { scrollbar-width: none; }
        .cat-panel-inner {
          width: 100vw; height: 100%; display: flex; flex-direction: column;
          padding: calc(var(--navbar-h) + var(--tabbar-h) + 1rem) 1.75rem 1.4rem 1.75rem;
          gap: 0.85rem; overflow: visible;
        }
        @media (max-width: 768px) {
          .cat-panel-inner {
            padding: calc(var(--navbar-h) + var(--tabbar-h) + 0.75rem) 0.9rem 0.9rem 0.9rem;
            gap: 0.6rem;
          }
        }
        .cat-header {
          display: flex; align-items: flex-end; justify-content: space-between;
          flex-shrink: 0; gap: 1rem;
        }
        @media (max-width: 768px) {
          .cat-header { align-items: flex-start; }
          .cat-header .cat-desc { display: none; }
          .cat-header h2 { font-size: 0.95rem !important; }
        }
        .card-grid {
          display: grid; gap: 8px;
          grid-template-columns: repeat(4, 1fr);
          overflow: visible; align-items: start;
        }
        @media (max-width: 768px) {
          .card-grid { grid-template-columns: repeat(2, 1fr); overflow: visible !important; }

          /* See More: horizontal strip on mobile */
          .see-more-card {
            grid-column: span 2 !important;
            aspect-ratio: unset !important;
            height: 60px !important;
            flex-direction: row !important;
            justify-content: flex-start !important;
            align-items: center !important;
            padding: 0 1.2rem !important;
            gap: 0.85rem !important;
          }
          .see-more-circle { padding: 0.65rem !important; }
          .see-more-label  { align-items: flex-start !important; }

          .hide-on-mobile { display: none !important; }
        }
        .tab-btn {
          position: relative; padding: 0 1.4rem; height: 100%; border: none;
          background: transparent; cursor: pointer; font-family: Inter, sans-serif;
          white-space: nowrap; flex-shrink: 0; transition: color 0.28s ease;
        }
        @media (max-width: 768px)  { .tab-btn { padding: 0 0.85rem; font-size: 0.72rem !important; } }
        @media (max-width: 480px)  { .tab-btn { padding: 0 0.6rem;  font-size: 0.68rem !important; } }
      `}</style>

      <Navbar />

      {/* ── Awwwards cursor preview (replaces scattered ImageTrail) ────── */}
      <CursorPreview />

      <main style={{ overflow: 'hidden' }}>

        {/* ── Hero ──────────────────────────────────────────────────────── */}
        <section
          ref={heroRef}
          className="panel-hero"
          style={{
            width: '100%', height: '100vh', minHeight: 560,
            background: '#ffffff', overflow: 'hidden',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <div ref={overlayRef} style={{
            position: 'absolute', inset: 0, zIndex: 10,
            background: 'linear-gradient(135deg, #5de0e6, #004aad)',
            transformOrigin: 'top', pointerEvents: 'none',
          }} />

          <div ref={heroInnerRef} style={{
            position: 'relative', zIndex: 2, width: '100%', height: '100%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transformOrigin: 'center center',
          }}>
            <div ref={heroTextRef} style={{
              padding: 'clamp(2rem, 5vw, 4rem)', width: '100%', maxWidth: 860,
              textAlign: 'center', display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: '1.5rem',
            }}>
              <div className="hero-line" style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                flexWrap: 'wrap', justifyContent: 'center',
              }}>
                <Link
                  href="/"
                  style={{ fontSize: '0.72rem', fontWeight: 500, color: 'rgba(0,0,0,0.4)', textDecoration: 'none', letterSpacing: '0.1em', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#5de0e6'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(0,0,0,0.4)'}
                >Creaut Bali</Link>
                <span style={{ color: 'rgba(0,0,0,0.2)' }}>·</span>
                <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#5de0e6', letterSpacing: '0.1em' }}>Our Work</span>
              </div>

              <div className="hero-line" style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem',
                flexWrap: 'wrap', justifyContent: 'center',
              }}>
                <div style={{ width: 28, height: 2, borderRadius: 2, background: 'linear-gradient(90deg, #5de0e6, #004aad)', flexShrink: 0 }} />
                <span style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)' }}>
                  Social · Photography · Video · Branding
                </span>
                <div style={{ width: 28, height: 2, borderRadius: 2, background: 'linear-gradient(90deg, #004aad, #5de0e6)', flexShrink: 0 }} />
              </div>

              <h1 className="hero-line" style={{
                fontWeight: 800, fontSize: 'clamp(3.5rem, 10vw, 9rem)',
                color: '#000000', letterSpacing: '-0.04em', lineHeight: 0.9, margin: 0,
              }}>
                Our<br />
                <span style={{ background: 'linear-gradient(90deg, #5de0e6, #004aad)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  Work
                </span>
              </h1>

              <p className="hero-line" style={{
                fontSize: '1rem', color: 'rgba(0,0,0,0.45)', lineHeight: 1.8,
                maxWidth: 440, margin: 0,
              }}>
                A curated selection of our finest projects — from social campaigns to cinematic productions.
              </p>

              <div className="hero-line" style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                <a
                  href="#our-work"
                  style={{
                    padding: '0.9rem 2.25rem',
                    background: 'linear-gradient(90deg, #5de0e6, #004aad)',
                    color: '#fff', textDecoration: 'none', fontSize: '0.875rem',
                    fontWeight: 600, borderRadius: '8px', transition: 'opacity 0.2s',
                    boxShadow: '0 4px 24px rgba(93,224,230,0.25)',
                  }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '0.82'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                >
                  Explore Portfolio ↓
                </a>
                <a
                  href="https://wa.me/62818160664"
                  target="_blank" rel="noreferrer"
                  style={{
                    padding: '0.9rem 2.25rem', background: 'transparent',
                    border: '1.5px solid rgba(0,0,0,0.2)', color: 'rgba(0,0,0,0.75)',
                    textDecoration: 'none', fontSize: '0.875rem', fontWeight: 600,
                    borderRadius: '8px', transition: 'border-color 0.2s, color 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#5de0e6'; e.currentTarget.style.color = '#5de0e6' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.2)'; e.currentTarget.style.color = 'rgba(0,0,0,0.75)' }}
                >
                  Work With Us ↗
                </a>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div style={{
            position: 'absolute', bottom: '2.5rem', left: '50%',
            transform: 'translateX(-50%)', zIndex: 2,
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
          }}>
            <span style={{ fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.25)' }}>Scroll</span>
            <div style={{ width: 1, height: 40, background: 'linear-gradient(180deg, rgba(93,224,230,0.6), transparent)', borderRadius: 1 }} />
          </div>
        </section>

        {/* ── Work (horizontal scroll) ──────────────────────────────────── */}
        <div ref={workContainerRef} style={{ position: 'relative', width: '100%', zIndex: 2 }}>
          <div
            id="our-work"
            ref={workRef}
            className="panel-work"
            style={{
              width: '100%', height: '100vh', overflow: 'visible',
              background: '#fff',
              boxShadow: '0 -32px 80px rgba(0,0,0,0.18), 0 -4px 20px rgba(0,0,0,0.12)',
            }}
          >
            {/* Tab strip */}
            <div
              className="tab-strip"
              style={{
                position: 'absolute', top: 'var(--navbar-h, 65px)', left: 0, right: 0,
                zIndex: 9999, height: 'var(--tabbar-h, 52px)',
                background: 'rgb(255,255,255)', backdropFilter: 'blur(18px)',
                borderBottom: '1px solid rgba(0,0,0,0.07)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '0 1rem', overflowX: 'auto',
              }}
            >
              {CATEGORIES.map((cat, i) => (
                <button
                  key={cat.id}
                  className="tab-btn"
                  onClick={() => handleTabClick(i)}
                  style={{
                    fontSize: '0.8rem',
                    fontWeight: activeTab === i ? 700 : 500,
                    color: activeTab === i ? '#0a0a0a' : 'rgba(0,0,0,0.38)',
                    letterSpacing: activeTab === i ? '0.01em' : '0',
                  }}
                >
                  {cat.label}
                  <div style={{
                    position: 'absolute', bottom: 0, left: '1.4rem', right: '1.4rem',
                    height: 2, borderRadius: '2px 2px 0 0',
                    background: `linear-gradient(90deg, ${cat.accentColor}, ${cat.gradientTo})`,
                    transform: activeTab === i ? 'scaleX(1)' : 'scaleX(0)',
                    transformOrigin: 'left',
                    transition: 'transform 0.38s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  }} />
                </button>
              ))}
            </div>

            {/* Horizontal track */}
            <div
              ref={trackRef}
              style={{
                display: 'flex',
                width: `${CATEGORIES.length * 100}vw`,
                height: '100%',
                willChange: 'transform',
                overflow: 'visible',
              }}
            >
              {CATEGORIES.map((cat, ci) => {
                // Always render 3 cards on both server and client (avoids hydration mismatch).
                // The 3rd card gets `hide-on-mobile` so CSS hides it on small screens.
                const visibleCards = cat.cards.slice(0, 3)

                return (
                  <div key={cat.id} className="cat-panel-inner">
                    {/* Category header */}
                    <div className="cat-header">
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.2rem' }}>
                          <div style={{ width: 16, height: 2, borderRadius: 2, background: `linear-gradient(90deg, ${cat.accentColor}, ${cat.gradientTo})` }} />
                          <span style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: cat.accentColor, fontFamily: 'Inter, sans-serif' }}>
                            {cat.shortLabel}
                          </span>
                        </div>
                        <h2 style={{ fontWeight: 800, fontSize: 'clamp(1.1rem, 1.8vw, 1.45rem)', color: '#0a0a0a', letterSpacing: '-0.03em', margin: '0 0 0.2rem 0', fontFamily: 'Inter, sans-serif' }}>
                          {cat.label}
                        </h2>
                        <p className="cat-desc" style={{ fontSize: '0.76rem', color: 'rgba(0,0,0,0.38)', margin: 0, fontFamily: 'Inter, sans-serif' }}>
                          {cat.description}
                        </p>
                      </div>
                      <div style={{ textAlign: 'right', flexShrink: 0 }}>
                        <p style={{
                          fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 800,
                          letterSpacing: '-0.05em', margin: '0 0 0.1rem 0', lineHeight: 1,
                          background: `linear-gradient(135deg, ${cat.accentColor}, ${cat.gradientTo})`,
                          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                          fontFamily: 'Inter, sans-serif',
                        }}>
                          {String(ci + 1).padStart(2, '0')}{' '}
                          <span style={{ fontSize: '0.45em', opacity: 0.5 }}>/ {String(CATEGORIES.length).padStart(2, '0')}</span>
                        </p>
                        <p style={{ fontSize: '0.65rem', color: 'rgba(0,0,0,0.3)', margin: 0, fontFamily: 'Inter, sans-serif', letterSpacing: '0.06em' }}>
                          {cat.stats}
                        </p>
                      </div>
                    </div>

                    {/* Cards grid */}
                    <div className="card-grid">
                      {visibleCards.map((card, i) => (
                        <InstaCard
                          key={card.id}
                          card={card}
                          accent={cat.accentColor}
                          platform={cat.shortLabel}
                          className={i === 2 ? 'hide-on-mobile' : ''}
                        />
                      ))}
                      <SeeMoreCard category={cat.shortLabel} href={cat.href} />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <CTA />
        <div ref={footerRef} className="panel-footer" style={{ boxShadow: '0 -20px 50px rgba(0,0,0,0.10)' }}>
          <Footer />
        </div>
      </main>
    </>
  )
}