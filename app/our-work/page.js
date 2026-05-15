'use client'

import { useEffect, useRef, useState, useCallback, useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import Navbar from '../components/navbar'
import CTA from '../components/cta'
import Footer from '../components/footer'

gsap.registerPlugin(ScrollTrigger)

/* ─────────────────────────────────────────────────────────────────────────────
   LENIS SMOOTH SCROLL
   ───────────────────────────────────────────────────────────────────────────── */
function useLenis() {
  const lenisRef = useRef(null)
  useEffect(() => {
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
        gsap.ticker.add((time) => lenis.raf(time * 1000))
        gsap.ticker.lagSmoothing(0)
        lenis.on('scroll', ScrollTrigger.update)
      } catch {}
    }
    init()
    return () => {
      gsap.ticker.remove((time) => lenis?.raf(time * 1000))
      lenis?.destroy()
      lenisRef.current = null
    }
  }, [])
  return lenisRef
}

/* ─────────────────────────────────────────────────────────────────────────────
   DATA  — 10 images per category card
   ───────────────────────────────────────────────────────────────────────────── */

// Pool of 10 Unsplash images for each category's slideshow
const SLIDESHOW_IMAGES = {
  social: [
    'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=800&q=80',
    'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&q=80',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80',
    'https://images.unsplash.com/photo-1512314889357-e157c22f938d?w=800&q=80',
    'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80',
    'https://images.unsplash.com/photo-1611944212129-29977ae1398c?w=800&q=80',
    'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80',
    'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80',
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80',
  ],
  photo: [
    'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800&q=80',
    'https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=800&q=80',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&q=80',
    'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80',
    'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&q=80',
    'https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=800&q=80',
    'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80',
  ],
  video: [
    'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80',
    'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80',
    'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&q=80',
    'https://images.unsplash.com/photo-1536240478700-b869ad10e128?w=800&q=80',
    'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80',
    'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&q=80',
    'https://images.unsplash.com/photo-1601506521793-dc748fc80b67?w=800&q=80',
    'https://images.unsplash.com/photo-1578022761797-b8636ac1773c?w=800&q=80',
    'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=800&q=80',
    'https://images.unsplash.com/photo-1524712245354-2c4e5e7121c0?w=800&q=80',
  ],
  branding: [
    'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=800&q=80',
    'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80',
    'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
    'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80',
    'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&q=80',
    'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80',
    'https://images.unsplash.com/photo-1542744094-24638eff58bb?w=800&q=80',
    'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80',
    'https://images.unsplash.com/photo-1493421419110-74f4e85ba126?w=800&q=80',
    'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80',
  ],
}

const CATEGORIES = [
  {
    id: 'social',
    label: 'Social Media Management',
    shortLabel: 'Social Media',
    accentColor: '#E1306C',
    gradientTo: '#833ab4',
    description: 'Driving engagement & brand awareness across all major platforms.',
    stats: '120+ campaigns',
    cards: [
      { id: 1, src: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=800&q=80', caption: 'Brand Awareness Campaign', platform: 'IG', likes: '12.4K', comments: '234' },
      { id: 2, src: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&q=80', caption: 'Content Calendar Strategy', platform: 'FB', likes: '5.2K', comments: '97' },
      { id: 3, src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80', caption: 'Analytics & Growth Report', platform: 'IG', likes: '9.1K', comments: '145' },
      { id: 4, src: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80', caption: 'Influencer Collaboration', platform: 'TT', likes: '21K', comments: '412' },
      { id: 5, src: 'https://images.unsplash.com/photo-1512314889357-e157c22f938d?w=800&q=80', caption: 'Instagram Story Series', platform: 'IG', likes: '7.3K', comments: '88' },
      { id: 6, src: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80', caption: 'Reels Production', platform: 'IG', likes: '33K', comments: '567' },
      { id: 7, src: 'https://images.unsplash.com/photo-1611944212129-29977ae1398c?w=800&q=80', caption: 'Community Management', platform: 'TW', likes: '4.9K', comments: '76' },
    ]
  },
  {
    id: 'photo',
    label: 'Visual Photography',
    shortLabel: 'Photography',
    accentColor: '#5de0e6',
    gradientTo: '#004aad',
    description: 'Capturing the essence of your brand through stunning imagery.',
    stats: '200+ shoots',
    cards: [
      { id: 1, src: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800&q=80', caption: 'Product Still Life', platform: 'IG', likes: '14.2K', comments: '198' },
      { id: 2, src: 'https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=800&q=80', caption: 'Portrait Session', platform: 'IG', likes: '22.1K', comments: '341' },
      { id: 3, src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80', caption: 'Aerial Landscape', platform: 'IG', likes: '41K', comments: '892' },
      { id: 4, src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80', caption: 'Food Photography', platform: 'IG', likes: '18.7K', comments: '267' },
      { id: 5, src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', caption: 'Fashion Editorial', platform: 'IG', likes: '25K', comments: '445' },
      { id: 6, src: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&q=80', caption: 'Architectural Study', platform: 'IG', likes: '11.3K', comments: '178' },
      { id: 7, src: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80', caption: 'Travel & Lifestyle', platform: 'IG', likes: '29K', comments: '512' },
    ]
  },
  {
    id: 'video',
    label: 'Video Production',
    shortLabel: 'Video',
    accentColor: '#004aad',
    gradientTo: '#5de0e6',
    description: 'Cinematic storytelling that elevates your brand narrative.',
    stats: '80+ productions',
    cards: [
      { id: 1, src: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80', caption: 'Commercial Shoot', platform: 'YT', likes: '16.8K', comments: '234' },
      { id: 2, src: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80', caption: 'Behind The Scenes', platform: 'IG', likes: '9.2K', comments: '145' },
      { id: 3, src: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&q=80', caption: 'Director on Set', platform: 'IG', likes: '7.4K', comments: '98' },
      { id: 4, src: 'https://images.unsplash.com/photo-1536240478700-b869ad10e128?w=800&q=80', caption: 'Color Grading Session', platform: 'YT', likes: '12.1K', comments: '187' },
      { id: 5, src: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80', caption: 'Camera Setup', platform: 'IG', likes: '5.8K', comments: '76' },
      { id: 6, src: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&q=80', caption: 'Corporate Film', platform: 'YT', likes: '8.3K', comments: '112' },
      { id: 7, src: 'https://images.unsplash.com/photo-1601506521793-dc748fc80b67?w=800&q=80', caption: 'Documentary Feature', platform: 'YT', likes: '19.5K', comments: '328' },
    ]
  },
  {
    id: 'branding',
    label: 'Branding',
    shortLabel: 'Branding',
    accentColor: '#f59e0b',
    gradientTo: '#ef4444',
    description: 'Building distinctive identities that resonate and endure.',
    stats: '50+ brands',
    cards: [
      { id: 1, src: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=800&q=80', caption: 'Brand Identity System', platform: 'BH', likes: '11.7K', comments: '189' },
      { id: 2, src: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80', caption: 'Logo Design', platform: 'BH', likes: '8.4K', comments: '134' },
      { id: 3, src: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80', caption: 'Brand Guidelines', platform: 'BH', likes: '6.2K', comments: '87' },
      { id: 4, src: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80', caption: 'Packaging Design', platform: 'BH', likes: '15.3K', comments: '234' },
      { id: 5, src: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&q=80', caption: 'Brand Collaterals', platform: 'BH', likes: '7.8K', comments: '112' },
      { id: 6, src: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80', caption: 'Visual Identity', platform: 'BH', likes: '9.1K', comments: '145' },
      { id: 7, src: 'https://images.unsplash.com/photo-1542744094-24638eff58bb?w=800&q=80', caption: 'Brand Strategy', platform: 'BH', likes: '13.4K', comments: '201' },
    ]
  },
]

/* ─────────────────────────────────────────────────────────────────────────────
   INSTAGRAM-STYLE CARD  — with hover slideshow (10 images, 1s each)
   ───────────────────────────────────────────────────────────────────────────── */
function InstaCard({ card, accent, categoryId }) {
  const [isHovered, setIsHovered] = useState(false)
  const [slideIndex, setSlideIndex] = useState(0)
  const intervalRef = useRef(null)
  const slideshowImages = SLIDESHOW_IMAGES[categoryId] || [card.src]

  const startSlideshow = () => {
    setIsHovered(true)
    setSlideIndex(0)
    intervalRef.current = setInterval(() => {
      setSlideIndex(prev => (prev + 1) % slideshowImages.length)
    }, 500)
  }

  const stopSlideshow = () => {
    setIsHovered(false)
    setSlideIndex(0)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  const currentSrc = isHovered ? slideshowImages[slideIndex] : card.src

  return (
    <div
      onMouseEnter={startSlideshow}
      onMouseLeave={stopSlideshow}
      style={{
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        background: '#111',
        height: '100%',
      }}
    >
      {/* IMAGE — crossfade via opacity transition */}
      <img
        key={currentSrc}
        src={currentSrc}
        alt={card.caption}
        draggable={false}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          transform: 'scale(1.03)',
          transition: 'opacity 0.25s ease, transform 0.8s ease',
          animation: isHovered ? 'fadeInSlide 0.25s ease' : 'none',
        }}
      />

      {/* SLIDESHOW DOT INDICATORS — only on hover */}
      {isHovered && (
        <div style={{
          position: 'absolute',
          bottom: '3.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '4px',
          zIndex: 5,
        }}>
          {slideshowImages.map((_, i) => (
            <div key={i} style={{
              width: i === slideIndex ? 14 : 5,
              height: 5,
              borderRadius: 999,
              background: i === slideIndex ? '#fff' : 'rgba(255,255,255,0.4)',
              transition: 'all 0.3s ease',
            }} />
          ))}
        </div>
      )}

      {/* DARK GRADIENT */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(
            to top,
            rgba(0,0,0,0.82) 0%,
            rgba(0,0,0,0.35) 35%,
            rgba(0,0,0,0.05) 60%,
            rgba(0,0,0,0.0) 100%
          )`,
        }}
      />

      {/* TOP BAR */}
      <div
        style={{
          position: 'absolute',
          top: '0.75rem',
          left: '0.75rem',
          right: '0.75rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            background: 'rgba(255,255,255,0.12)',
            backdropFilter: 'blur(14px)',
            border: '1px solid rgba(255,255,255,0.08)',
            color: '#fff',
            padding: '0.3rem 0.6rem',
            borderRadius: '999px',
            fontSize: '0.6rem',
            fontWeight: 700,
            letterSpacing: '0.08em',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          {card.platform}
        </div>
        <div
          style={{
            width: 7,
            height: 7,
            borderRadius: '999px',
            background: accent,
            boxShadow: `0 0 10px ${accent}`,
          }}
        />
      </div>

      {/* BOTTOM CONTENT */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '0.85rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#fff', fontSize: '0.72rem', fontWeight: 600, fontFamily: 'Inter, sans-serif' }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="#fff">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            {card.likes}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#fff', fontSize: '0.72rem', fontWeight: 600, fontFamily: 'Inter, sans-serif' }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            {card.comments}
          </div>
        </div>
        <div>
          <p style={{ color: '#fff', fontSize: '0.78rem', fontWeight: 600, lineHeight: 1.4, margin: 0, fontFamily: 'Inter, sans-serif', letterSpacing: '-0.01em' }}>
            {card.caption}
          </p>
          <p style={{ color: 'rgba(255,255,255,0.52)', fontSize: '0.65rem', marginTop: '0.25rem', marginBottom: 0, fontFamily: 'Inter, sans-serif' }}>
            View insights →
          </p>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   SEE MORE CARD — unified blue gradient across ALL categories
   ───────────────────────────────────────────────────────────────────────────── */
function SeeMoreCard({ category }) {
  // Always blue, regardless of category accent color
  const BLUE_FROM = '#5de0e6'
  const BLUE_TO   = '#004aad'

  return (
    <div
      style={{
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.8rem',
        padding: '1rem',
        background: `linear-gradient(135deg, ${BLUE_FROM}, ${BLUE_TO})`,
        transition: 'filter 0.3s ease',
      }}
      onMouseEnter={e => (e.currentTarget.style.filter = 'brightness(1.12)')}
      onMouseLeave={e => (e.currentTarget.style.filter = 'brightness(1)')}
      onClick={() => console.log(`Navigate to ${category}`)}
    >
      {/* Decorative blurred orb */}
      <div style={{
        position: 'absolute',
        width: '70%',
        height: '70%',
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.08)',
        filter: 'blur(28px)',
        top: '-15%',
        right: '-15%',
        pointerEvents: 'none',
      }} />

      {/* Arrow icon circle */}
      <div style={{
        background: 'rgba(255,255,255,0.2)',
        backdropFilter: 'blur(10px)',
        padding: 'max(1rem, 1.8vw)',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
        border: '1px solid rgba(255,255,255,0.25)',
        position: 'relative',
        zIndex: 1,
      }}>
        <svg
          width="24" height="24"
          viewBox="0 0 24 24"
          fill="none" stroke="#fff" strokeWidth="2.5"
          strokeLinecap="round" strokeLinejoin="round"
          style={{ width: 'min(24px, 4vw)', height: 'min(24px, 4vw)' }}
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </div>

      {/* Labels */}
      <span style={{
        color: '#fff',
        fontWeight: 700,
        fontSize: 'clamp(0.65rem, 1.2vw, 0.85rem)',
        fontFamily: 'Inter, sans-serif',
        letterSpacing: '0.05em',
        whiteSpace: 'nowrap',
        position: 'relative',
        zIndex: 1,
      }}>
        See More
      </span>
      <span style={{
        color: 'rgba(255,255,255,0.6)',
        fontSize: '0.6rem',
        fontFamily: 'Inter, sans-serif',
        textTransform: 'uppercase',
        letterSpacing: '0.18em',
        position: 'relative',
        zIndex: 1,
      }}>
        {category}
      </span>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   PAGE
   ───────────────────────────────────────────────────────────────────────────── */
export default function OurWorkPage() {
  const lenisRef = useLenis()
  const [activeTab, setActiveTab] = useState(0)

  const heroRef      = useRef(null)
  const heroInnerRef = useRef(null)
  const heroTextRef  = useRef(null)
  const overlayRef   = useRef(null)
  const workRef      = useRef(null)
  const trackRef     = useRef(null)
  const footerRef    = useRef(null)

  /* ── Hero entrance curtain ── */
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

  /* ── Scroll orchestration ── */
  useLayoutEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(min-width: 1px)', () => {
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: 'top top',
        end: () => `+=${window.innerHeight * 1.2}`,
        pin: true,
        pinSpacing: false,
        anticipatePin: 1,
        id: 'hero-pin',
      })
      gsap.to(heroInnerRef.current, {
        y: -80, opacity: 0, scale: 0.97, ease: 'none',
        scrollTrigger: {
          trigger: workRef.current,
          start: 'top 85%',
          end: 'top 10%',
          scrub: 1.2,
        },
      })
      gsap.fromTo(workRef.current,
        { y: 120, clipPath: 'inset(6% 0% 0% 0% round 18px 18px 0px 0px)' },
        {
          y: 0, clipPath: 'inset(0% 0% 0% 0% round 0px 0px 0px 0px)',
          ease: 'none',
          scrollTrigger: {
            trigger: workRef.current,
            start: 'top 92%',
            end: 'top 5%',
            scrub: 1,
          },
        }
      )
      gsap.to(trackRef.current, {
        x: () => -(trackRef.current.scrollWidth - window.innerWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: workRef.current,
          start: 'top top',
          end: () => `+=${window.innerHeight * 1.3 * (CATEGORIES.length - 1)}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.9,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          id: 'work-horizontal',
          onUpdate: (self) => {
            const idx = Math.round(self.progress * (CATEGORIES.length - 1))
            setActiveTab(idx)
          },
        },
      })
      gsap.fromTo(footerRef.current,
        { y: 60, clipPath: 'inset(8% 0% 0% 0% round 24px 24px 0px 0px)' },
        {
          y: 0, clipPath: 'inset(0% 0% 0% 0% round 0px 0px 0px 0px)', ease: 'none',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 92%',
            end: 'top 15%',
            scrub: 1,
          },
        }
      )
      return () => ScrollTrigger.getAll().forEach(t => t.kill())
    })
    return () => mm.revert()
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
        @keyframes fadeInSlide {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        html { scroll-behavior: auto !important; }
        *, *::before, *::after { box-sizing: border-box; }

        :root {
          --navbar-h:  65px;
          --tabbar-h:  52px;
        }
        @media (max-width: 768px) {
          :root {
            --navbar-h: 60px;
            --tabbar-h: 48px;
          }
        }

        .panel-hero   { position: relative; z-index: 1; }
        .panel-work   { position: relative; z-index: 2; will-change: transform, clip-path; }
        .panel-footer { position: relative; z-index: 3; will-change: transform, clip-path; }

        html.lenis { height: auto; }
        .lenis.lenis-smooth { scroll-behavior: auto; }
        .lenis.lenis-stopped { overflow: hidden; }
        .lenis.lenis-scrolling iframe { pointer-events: none; }

        .tab-strip::-webkit-scrollbar { display: none; }
        .tab-strip { scrollbar-width: none; }

        .cat-panel-inner {
          width: 100vw;
          height: 100%;
          display: flex;
          flex-direction: column;
          padding: calc(var(--navbar-h) + var(--tabbar-h) + 1rem) 1.75rem 1.4rem 1.75rem;
          gap: 0.85rem;
        }
        @media (max-width: 768px) {
          .cat-panel-inner {
            padding: calc(var(--navbar-h) + var(--tabbar-h) + 0.75rem) 0.9rem 0.9rem 0.9rem;
            gap: 0.6rem;
          }
        }

        .cat-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          flex-shrink: 0;
          gap: 1rem;
        }
        @media (max-width: 768px) {
          .cat-header { align-items: flex-start; }
          .cat-header .cat-desc { display: none; }
          .cat-header h2 { font-size: 0.95rem !important; }
        }

        /* Card grid — 4×2 desktop, 2×2 mobile (last slot = see more) */
        .card-grid {
          flex: 1;
          min-height: 0;
          display: grid;
          gap: 5px;
          grid-template-columns: repeat(4, 1fr);
          grid-template-rows: 1fr 1fr;
        }

        @media (max-width: 768px) {
          .card-grid {
            grid-template-columns: repeat(2, 1fr);
            grid-template-rows: 1fr 1fr;
            overflow: hidden !important;
          }
          .hide-on-mobile { display: none !important; }
        }

        .tab-btn {
          position: relative;
          padding: 0 1.4rem;
          height: 100%;
          border: none;
          background: transparent;
          cursor: pointer;
          font-family: Inter, sans-serif;
          white-space: nowrap;
          flex-shrink: 0;
          transition: color 0.28s ease;
        }
        @media (max-width: 768px) {
          .tab-btn { padding: 0 0.85rem; font-size: 0.72rem !important; }
        }
        @media (max-width: 480px) {
          .tab-btn { padding: 0 0.6rem; font-size: 0.68rem !important; }
        }
      `}</style>

      <Navbar />

      <main style={{ overflow: 'hidden' }}>

        {/* ═══════ HERO PANEL ═══════ */}
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
            position: 'relative', zIndex: 2,
            width: '100%', height: '100%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transformOrigin: 'center center',
          }}>
            <div ref={heroTextRef} style={{
              padding: 'clamp(2rem, 5vw, 4rem)',
              width: '100%', maxWidth: 860, textAlign: 'center',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem',
            }}>
              <div className="hero-line" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                <Link href="/"
                  style={{ fontSize: '0.72rem', fontWeight: 500, color: 'rgba(0,0,0,0.4)', textDecoration: 'none', letterSpacing: '0.1em', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#5de0e6'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(0,0,0,0.4)'}>
                  Creaut Bali
                </Link>
                <span style={{ color: 'rgba(0,0,0,0.2)' }}>·</span>
                <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#5de0e6', letterSpacing: '0.1em' }}>Our Work</span>
              </div>

              <div className="hero-line" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                <div style={{ width: 28, height: 2, borderRadius: 2, background: 'linear-gradient(90deg, #5de0e6, #004aad)', flexShrink: 0 }} />
                <span style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)' }}>
                  Social · Photography · Video · Branding
                </span>
                <div style={{ width: 28, height: 2, borderRadius: 2, background: 'linear-gradient(90deg, #004aad, #5de0e6)', flexShrink: 0 }} />
              </div>

              <h1 className="hero-line" style={{
                fontWeight: 800,
                fontSize: 'clamp(3.5rem, 10vw, 9rem)',
                color: '#000000',
                letterSpacing: '-0.04em',
                lineHeight: 0.9,
                margin: 0,
              }}>
                Our<br />
                <span style={{ background: 'linear-gradient(90deg, #5de0e6, #004aad)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  Work
                </span>
              </h1>

              <p className="hero-line" style={{ fontSize: '1rem', color: 'rgba(0,0,0,0.45)', lineHeight: 1.8, maxWidth: 440, margin: 0 }}>
                A curated selection of our finest projects — from social campaigns to cinematic productions.
              </p>

              <div className="hero-line" style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                <a href="#our-work"
                  style={{ padding: '0.9rem 2.25rem', background: 'linear-gradient(90deg, #5de0e6, #004aad)', color: '#fff', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 600, borderRadius: '8px', transition: 'opacity 0.2s', boxShadow: '0 4px 24px rgba(93,224,230,0.25)' }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '0.82'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
                  Explore Portfolio ↓
                </a>
                <a href="https://wa.me/62818160664" target="_blank" rel="noreferrer"
                  style={{ padding: '0.9rem 2.25rem', background: 'transparent', border: '1.5px solid rgba(0,0,0,0.2)', color: 'rgba(0,0,0,0.75)', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 600, borderRadius: '8px', transition: 'border-color 0.2s, color 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#5de0e6'; e.currentTarget.style.color = '#5de0e6' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.2)'; e.currentTarget.style.color = 'rgba(0,0,0,0.75)' }}>
                  Work With Us ↗
                </a>
              </div>
            </div>
          </div>

          <div style={{ position: 'absolute', bottom: '2.5rem', left: '50%', transform: 'translateX(-50%)', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.25)' }}>Scroll</span>
            <div style={{ width: 1, height: 40, background: 'linear-gradient(180deg, rgba(93,224,230,0.6), transparent)', borderRadius: 1 }} />
          </div>
        </section>

        {/* ═══════ WORK PANEL — horizontal scroll ═══════ */}
        <div
          id="our-work"
          ref={workRef}
          className="panel-work"
          style={{
            width: '100%',
            height: '100vh',
            overflow: 'hidden',
            background: '#fff',
            boxShadow: '0 -32px 80px rgba(0,0,0,0.18), 0 -4px 20px rgba(0,0,0,0.12)',
          }}
        >
          {/* Tab bar */}
          <div
            className="tab-strip"
            style={{
              position: 'absolute',
              top: 'var(--navbar-h)',
              left: 0, right: 0,
              zIndex: 20,
              height: 'var(--tabbar-h)',
              background: 'rgb(255,255,255)',
              backdropFilter: 'blur(18px)',
              borderBottom: '1px solid rgba(0,0,0,0.07)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0 1rem',
              overflowX: 'auto',
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
                  position: 'absolute',
                  bottom: 0,
                  left: '1.4rem', right: '1.4rem',
                  height: 2,
                  borderRadius: '2px 2px 0 0',
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
            }}
          >
            {CATEGORIES.map((cat, ci) => {
              const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false
              const maxItems = isMobile ? 3 : 7  // 3 cards + 1 see more = 4 (mobile), 7 + 1 = 8 (desktop)
              const visibleCards = cat.cards.slice(0, maxItems)

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
                        fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 800, letterSpacing: '-0.05em',
                        margin: '0 0 0.1rem 0', lineHeight: 1,
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

                  {/* Card grid — 7 InstaCards + 1 See More (last slot) */}
                  <div className="card-grid">
                    {visibleCards.map((card) => (
                      <InstaCard
                        key={card.id}
                        card={card}
                        accent={cat.accentColor}
                        categoryId={cat.id}
                      />
                    ))}
                    {/* See More — always last, always blue */}
                    <SeeMoreCard category={cat.shortLabel} />
                  </div>

                </div>
              )
            })}
          </div>
        </div>

        <CTA />

        <div
          ref={footerRef}
          className="panel-footer"
          style={{ boxShadow: '0 -20px 50px rgba(0,0,0,0.10)' }}
        >
          <Footer />
        </div>

      </main>
    </>
  )
}