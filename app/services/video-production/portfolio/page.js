'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '../../../components/navbar'
import Footer from '../../../components/footer'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ─────────────────────────────────────────────────────────────────────────────
   DATA — 12 CATEGORIES
   ───────────────────────────────────────────────────────────────────────────── */
const TABS = [
  { id: 'all',           label: 'All' },
  { id: 'fnb',           label: 'Food & Beverage' },
  { id: 'fashion',       label: 'Fashion & Clothing' },
  { id: 'hospitality',   label: 'Hospitality' },
  { id: 'beauty',        label: 'Beauty & Wellness' },
  { id: 'property',      label: 'Property & Real Estate' },
  { id: 'auto',          label: 'Automotive & Adventure' },
  { id: 'env',           label: 'Environmental' },
  { id: 'health',        label: 'Healthcare & Medical' },
  { id: 'edu',           label: 'Education & Training' },
  { id: 'entertainment', label: 'Entertainment & Events' },
  { id: 'retail',        label: 'Retail & E-Commerce' },
  { id: 'corporate',     label: 'Corporate & Professional' },
]

const PORTFOLIO = [
  { id: 1, category: 'fashion', title: 'Artisan Coffee Brand Film', client: 'Advish Konveksi', likes: '16.8K', comments: '234', duration: '2:30', url: 'https://www.instagram.com/reel/DWiizGKEcxH/?utm_source=ig_web_button_share_sheet', image: '/image/advish1.jpg' },
  { id: 2, category: 'fashion', title: 'Restaurant Promo Film', client: 'Advish Konveksi', likes: '9.2K', comments: '145', duration: '0:60', url: 'https://www.instagram.com/reel/DWqkjpVERdv/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==', image: '/image/advish2.jpg' },
  { id: 3, category: 'fashion', title: 'Craft Beverage Commercial', client: 'Advish Konveksi', likes: '7.4K', comments: '98', duration: '0:30', url: 'https://www.instagram.com/reel/DVsyXhoicaI/?utm_source=ig_web_button_share_sheet', image: '/image/advish3.jpg' },
  { id: 4, category: 'fashion', title: 'Luxury Batik Lookbook', client: 'Advish Konveksi', likes: '21.3K', comments: '412', duration: '1:45', url: 'https://www.instagram.com/reel/DVBIaq6ES1Z/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==', image: '/image/advish4.jpg' },
  { id: 5, category: 'fashion', title: 'Streetwear Campaign', client: 'Advish Konveksi', likes: '14.6K', comments: '278', duration: '3:10', url: 'https://www.instagram.com/reel/DVORbN6E2wg/?igsh=MTk0ZXZka3puYTNqNQ%3D%3D', image: '/image/advish5.jpg' },
  { id: 6, category: 'entertainment', title: 'Luxury Villa Brand Film', client: 'Bali Entertainments Agency', likes: '18.4K', comments: '321', duration: '4:00', url: 'https://www.instagram.com/reel/DUVOzZwEzx4/?igsh=ZmgwdW9haTh6a3Ex', image: '/image/ba1.jpg' },
  { id: 7, category: 'entertainment', title: 'Boutique Hotel Promo', client: 'Bali Entertainments Agency', likes: '11.2K', comments: '198', duration: '1:00', url: 'https://www.instagram.com/reel/DT4_bXxE4vJ/?igsh=MTNweWExY3l2YjRtag==', image: '/image/ba2.jpg' },
  { id: 8, category: 'entertainment', title: 'Skincare Product Film', client: 'Bali Entertainments Agency', likes: '13.7K', comments: '256', duration: '0:45', url: 'https://www.instagram.com/reel/DR4L3-2k5It/?igsh=MXJyaTAzc2tnamNkeg==', image: '/image/ba3.jpg' },
  { id: 9, category: 'env', title: 'Wellness Retreat Film', client: 'Enviromas', likes: '8.9K', comments: '134', duration: '3:20', url: 'https://www.instagram.com/reel/DTw3lxMkoAn/?igsh=MTU0czVzdnl2cTQ4Zg==', image: '/image/enviro1.jpg' },
  { id: 10, category: 'env', title: 'Clifftop Estate Showcase', client: 'Enviromas', likes: '22.1K', comments: '398', duration: '5:00', url: 'https://www.instagram.com/reel/DUuqrbWEuqR/?igsh=bTRwZ2lxYXJtZ2Fq', image: '/image/enviro2.jpg' },
  { id: 11, category: 'env', title: 'Apartment Development Film', client: 'Amanaid', likes: '7.8K', comments: '112', duration: '2:00', url: 'https://www.instagram.com/reel/DQTYri3E0UH/?igsh=MWQ1NGNzdmF3cWl1bw%3D%3D', image: '/image/amanaid1.jpg' },
  { id: 12, category: 'env', title: 'Off-Road Adventure Series', client: 'Amanaid', likes: '31.4K', comments: '567', duration: '6:30', url: 'https://www.instagram.com/reel/DW5f1edSwIn/?igsh=YTdheG5sczh4dG9i', image: '/image/amanaid2.jpg' },
  { id: 13, category: 'env', title: 'Surfing Lifestyle Film', client: 'Amanaid', likes: '19.6K', comments: '342', duration: '2:15', url: 'https://www.instagram.com/reel/DVp8PY9E4A6/?igsh=czFxcG1vYmRmdWRx     ', image: '/image/amanaid3.jpg' },
  { id: 14, category: 'auto', title: 'Ocean Conservation Doc', client: 'ATV Raka Adventure', likes: '27.3K', comments: '489', duration: '8:00', url: 'https://www.instagram.com/reel/DUkBlSdET7r/?igsh=YmphMGd6enJ5eGo1', image: '/image/raka1.jpg' },
  { id: 15, category: 'auto', title: 'Reforestation Campaign', client: 'ATV Raka Adventure', likes: '15.2K', comments: '276', duration: '4:30', url: 'https://www.instagram.com/reel/DSj8FaaEdUa/?igsh=MWt2aGg4cTJqYmdubg==', image: '/image/raka2.jpg' },
  { id: 16, category: 'fnb', title: 'Hospital Profile Film', client: 'My Cocotte Bali', likes: '6.4K', comments: '89', duration: '3:00', url: 'https://www.instagram.com/reel/DVAW7fXD3yJ/?igsh=ejFhZHd4ZmN4dDJs', image: '/image/mcc1.jpg' },
  { id: 17, category: 'fnb', title: 'Online Course Promo', client: 'My Cocotte Bali', likes: '8.1K', comments: '134', duration: '1:30', url: 'https://www.instagram.com/reel/DSPIFE5Dx5q/?igsh=OXQyM2Y3MDFkbGlh', image: '/image/mcc2.jpg' },
  { id: 18, category: 'fnb', title: 'Campus Brand Identity', client: 'My Cocotte Bali', likes: '5.3K', comments: '78', duration: '2:45', url: 'https://www.instagram.com/reel/DScQoQ5D0pc/?igsh=MXc3czg5YXRyMmlncw==', image: '/image/mcc3.jpg' },
  { id: 19, category: 'property', title: 'Music Festival Highlight', client: 'Amartya Bali', likes: '38.7K', comments: '712', duration: '5:20', url: 'https://www.instagram.com/reel/DSMuSwMkv3r/?igsh=cnl3dG8yOW41a2li', image: '/image/amartya1.jpg' },
  { id: 20, category: 'property', title: 'Corporate Gala Coverage', client: 'Amartya Bali', likes: '4.9K', comments: '67', duration: '3:45', url: 'https://www.instagram.com/reel/DPghplTkaAv/?igsh=MWJsc2R4am04N3Rvbw==', image: '/image/amartya2.jpg' },
  { id: 21, category: 'property', title: 'E-Commerce Brand Film', client: 'Amartya Bali', likes: '12.4K', comments: '198', duration: '1:00', url: 'https://www.instagram.com/reel/DX_HUI1yrDG/?igsh=dXpxam90emd6a3V4', image: '/image/amartya3.jpg' },
  { id: 22, category: 'hospitality', title: 'Annual Report Film', client: 'Uma Wellness Center', likes: '5.6K', comments: '78', duration: '4:00', url: 'https://www.instagram.com/reel/DMSM0sKRwbp/?igsh=NzFqZXUzcXppenpy', image: '/image/uma1.jpg' },
  { id: 23, category: 'hospitality', title: 'Company Profile Film', client: 'Uma Wellness Center', likes: '9.3K', comments: '143', duration: '3:30', url: 'https://www.instagram.com/reel/DF-ITG6zjGw/?igsh=MTFzeW4xaGI5YmwwNw==', image: '/image/uma2.jpg' },
  { id: 24, category: 'hospitality', title: 'Testimonial Series', client: 'Uma Wellness Center', likes: '6.1K', comments: '94', duration: '1:20', url: 'https://www.instagram.com/reel/DHu-A-mNmYM/?igsh=MW1yZGg2ZGEzanMycA==', image: '/image/uma3.jpg' },
]

/* ─────────────────────────────────────────────────────────────────────────────
   PORTFOLIO CARD — mobile-aware
   ───────────────────────────────────────────────────────────────────────────── */
function PortfolioCard({ item, index }) {
  const [hovered, setHovered] = useState(false)
  const cardRef = useRef(null)
  const isIG = item.platform === 'IG'

  // Per-card scroll reveal
  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    gsap.fromTo(el,
      { opacity: 0, y: 40, scale: 0.96 },
      {
        opacity: 1, y: 0, scale: 1,
        duration: 0.7,
        ease: 'power3.out',
        delay: (index % 6) * 0.07, // stagger by column position
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      }
    )
    return () => ScrollTrigger.getAll().forEach(st => {
      if (st.trigger === el) st.kill()
    })
  }, [index])

  return (
    <a
      ref={cardRef}
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        display: 'block',
        width: '100%',
        aspectRatio: '9 / 14',
        overflow: 'hidden',
        background: '#0a0a0a',
        textDecoration: 'none',
        cursor: 'pointer',
        borderRadius: 0,
        outline: hovered ? '1.5px solid rgba(93,224,230,0.5)' : '1.5px solid transparent',
        outlineOffset: '-1.5px',
        transition: 'outline-color 0.3s ease',
        opacity: 0, // start hidden, GSAP will reveal
      }}
    >
      {/* Thumbnail */}
      <img
        src={item.image}
        alt={item.title}
        draggable={false}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />

      {/* Base gradient */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.08) 55%, transparent 100%)', zIndex: 1 }} />

      {/* Play icon — center, hover only */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: `translate(-50%, -50%) scale(${hovered ? 1 : 0.7})`,
        zIndex: 3, width: 48, height: 48,
        background: 'rgba(255, 255, 255, 0.12)',
        backdropFilter: 'blur(10px)',
        border: '1.5px solid rgba(255,255,255,0.25)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.3s ease, transform 0.35s cubic-bezier(0.22,1,0.36,1)',
      }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>

      {/* Bottom content */}
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 3,
        padding: 'clamp(8px, 2vw, 14px)',
        transform: hovered ? 'translateY(0)' : 'translateY(4px)',
        transition: 'transform 0.4s ease',
      }}>
        <p style={{
          margin: '0 0 3px',
          fontSize: 'clamp(0.48rem, 1.1vw, 0.55rem)',
          fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#5de0e6',
        }}>
          {item.client}
        </p>
        <h3 style={{
          margin: '0 0 7px',
          fontSize: 'clamp(0.7rem, 1.5vw, 0.9rem)',
          fontWeight: 700, color: '#fff', lineHeight: 1.2, letterSpacing: '-0.02em',
        }}>
          {item.title}
        </h3>

        {/* Divider line */}
        <div style={{
          width: hovered ? '100%' : '0%', height: 1,
          background: 'linear-gradient(90deg, #5de0e6, #004aad)',
          marginBottom: '7px',
          transition: 'width 0.5s cubic-bezier(0.22,1,0.36,1)',
        }} />

        {/* Stats */}
        <div style={{
          display: 'flex', gap: '10px',
          opacity: hovered ? 1 : 0,
          transform: hovered ? 'translateY(0)' : 'translateY(6px)',
          transition: 'opacity 0.3s ease 0.05s, transform 0.35s ease 0.05s',
        }}>
          <span style={{ fontSize: 'clamp(0.48rem, 1.1vw, 0.6rem)', color: 'rgba(255,255,255,0.55)', fontWeight: 600 }}>♡ {item.likes}</span>
          <span style={{ fontSize: 'clamp(0.48rem, 1.1vw, 0.6rem)', color: 'rgba(255,255,255,0.35)' }}>·</span>
          <span style={{ fontSize: 'clamp(0.48rem, 1.1vw, 0.6rem)', color: 'rgba(255,255,255,0.55)', fontWeight: 600 }}>{item.comments} cmts</span>
        </div>
      </div>
    </a>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   TAB BAR — mobile-friendly
   ───────────────────────────────────────────────────────────────────────────── */
function TabBar({ active, onSelect, counts }) {
  const allTabs = TABS
  const mainTab = allTabs[0]
  const restTabs = allTabs.slice(1)

  const TabButton = ({ tab }) => {
    const isActive = active === tab.id
    const count = tab.id === 'all' ? PORTFOLIO.length : (counts[tab.id] || 0)
    return (
      <button
        onClick={() => onSelect(tab.id)}
        style={{
          padding: '0 0 10px',
          border: 'none', background: 'transparent',
          color: isActive ? '#000' : 'rgba(0,0,0,0.38)',
          fontSize: 'clamp(0.65rem, 1.8vw, 0.7rem)',
          fontWeight: isActive ? 700 : 500,
          cursor: 'pointer', letterSpacing: '0.02em',
          whiteSpace: 'nowrap', position: 'relative',
          transition: 'color 0.2s',
          display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0,
          minHeight: 44, // touch target
        }}
        onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = '#000' }}
        onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = 'rgba(0,0,0,0.38)' }}
      >
        {tab.label}
        <span style={{
          fontSize: 'clamp(0.5rem, 1.4vw, 0.55rem)', fontWeight: 600,
          color: isActive ? '#5de0e6' : 'rgba(0,0,0,0.25)', transition: 'color 0.2s',
        }}>
          {count}
        </span>
        <span style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px',
          background: 'linear-gradient(90deg,#5de0e6,#004aad)',
          opacity: isActive ? 1 : 0, transition: 'opacity 0.2s',
        }} />
      </button>
    )
  }

  return (
    <div style={{ borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
      <div style={{
        maxWidth: 1400, margin: '0 auto',
        padding: '0 clamp(1rem, 4vw, 2rem)',
        display: 'flex', alignItems: 'flex-end',
        gap: 'clamp(1rem, 3vw, 2rem)',
        overflowX: 'auto', scrollbarWidth: 'none',
        WebkitOverflowScrolling: 'touch',
      }}>
        <TabButton tab={mainTab} />
        <div style={{ width: 1, height: 16, background: 'rgba(0,0,0,0.12)', flexShrink: 0, marginBottom: 10 }} />
        {restTabs.map(tab => <TabButton key={tab.id} tab={tab} />)}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   CTA STRIP — mobile-adjusted
   ───────────────────────────────────────────────────────────────────────────── */
function CTAStrip() {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(contentRef.current.querySelectorAll('.cta-item'),
      { y: 36, opacity: 0 },
      {
        y: 0, opacity: 1, stagger: 0.1, duration: 0.85, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' },
      }
    )
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        background: '#fff',
        borderTop: '1px solid rgba(0,0,0,0.06)',
        padding: 'clamp(5rem, 10vw, 8rem) clamp(1rem, 4vw, 2rem)',
        overflow: 'hidden', position: 'relative',
      }}
    >
      <div style={{
        position: 'absolute', top: '-40%', left: '50%',
        transform: 'translateX(-50%)',
        width: '80%', height: '180%',
        background: 'radial-gradient(ellipse at center, rgba(93,224,230,0.07) 0%, rgba(0,74,173,0.04) 45%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      <div style={{ position: 'relative', zIndex: 1, width: '100%' }}>
        <div ref={contentRef} style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center' }}>

          <div className="cta-item" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            border: '1px solid rgba(0,0,0,0.15)', borderRadius: '999px',
            padding: '0.35rem 0.9rem', marginBottom: '1.75rem', background: '#fafafa',
          }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'linear-gradient(90deg, #5de0e6, #004aad)', flexShrink: 0 }} />
            <span style={{ fontSize: 'clamp(0.6rem, 1.5vw, 0.72rem)', fontWeight: 700, color: 'rgba(0,0,0,0.45)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              Interested in working together?
            </span>
          </div>

          <h2 className="cta-item" style={{
            fontSize: 'clamp(2rem, 8vw, 4rem)',
            fontWeight: 800, letterSpacing: '-0.04em', color: '#000', lineHeight: 1.05, marginBottom: '2.5rem',
          }}>
            Let's create your{' '}
            <span style={{ background: 'linear-gradient(90deg, #5de0e6, #004aad)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              next film.
            </span>
          </h2>

          <div className="cta-item" style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="https://wa.me/62818160664"
              target="_blank" rel="noreferrer"
              style={{
                padding: 'clamp(0.75rem, 2vw, 0.9rem) clamp(1.5rem, 4vw, 2.25rem)',
                background: 'linear-gradient(90deg, #5de0e6, #004aad)',
                color: '#fff', textDecoration: 'none',
                fontSize: 'clamp(0.8rem, 2vw, 0.875rem)', fontWeight: 600,
                borderRadius: '8px', display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                transition: 'opacity 0.2s', boxShadow: '0 4px 24px rgba(0,74,173,0.18)',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              Contact Us ↗
            </a>
            <Link
              href="/services/video-production"
              style={{
                padding: 'clamp(0.75rem, 2vw, 0.9rem) clamp(1.5rem, 4vw, 2.25rem)',
                background: '#fff', border: '1.5px solid rgba(0,0,0,0.15)',
                color: '#000', textDecoration: 'none',
                fontSize: 'clamp(0.8rem, 2vw, 0.875rem)', fontWeight: 600,
                borderRadius: '8px', display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                transition: 'border-color 0.2s, color 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#5de0e6'; e.currentTarget.style.color = '#004aad' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.15)'; e.currentTarget.style.color = '#000' }}
            >
              ← Back to Services
            </Link>
          </div>

        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   PAGE
   ───────────────────────────────────────────────────────────────────────────── */
export default function VideoPortfolioPage() {
  const [activeTab, setActiveTab] = useState('all')
  const [filteredItems, setFilteredItems] = useState(PORTFOLIO)

  const heroRef     = useRef(null)
  const heroTextRef = useRef(null)
  const overlayRef  = useRef(null)
  const gridRef     = useRef(null)
  const countRowRef = useRef(null)

  const counts = PORTFOLIO.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1
    return acc
  }, {})

  useEffect(() => {
    setFilteredItems(activeTab === 'all' ? PORTFOLIO : PORTFOLIO.filter(p => p.category === activeTab))
  }, [activeTab])

  /* Hero entrance animation */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .fromTo(overlayRef.current,
          { scaleY: 1 },
          { scaleY: 0, duration: 1.2, ease: 'power4.inOut', transformOrigin: 'top' }
        )
        .fromTo(heroTextRef.current.querySelectorAll('.hero-line'),
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.1, duration: 0.9 },
          '-=0.4'
        )
    }, heroRef)
    return () => ctx.revert()
  }, [])

  /* Count row reveal on filter change */
  useEffect(() => {
    if (!countRowRef.current) return
    gsap.fromTo(countRowRef.current,
      { opacity: 0, x: -16 },
      { opacity: 1, x: 0, duration: 0.45, ease: 'power2.out' }
    )
  }, [filteredItems])

  return (
    <>
      <style>{`
        html { scroll-behavior: smooth; }
        *, *::before, *::after { box-sizing: border-box; }
        ::-webkit-scrollbar { display: none; }

        @keyframes grid-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        /* ── RESPONSIVE GRID ── */
        .portfolio-grid {
          display: grid;
          gap: 1px;
          background: rgba(0,0,0,0.06);
          animation: grid-in 0.4s ease;
          /* Default: 6 columns (desktop) */
          grid-template-columns: repeat(6, 1fr);
        }

        /* Tablet: 3 columns */
        @media (max-width: 1024px) {
          .portfolio-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        /* Mobile: 2 columns */
        @media (max-width: 600px) {
          .portfolio-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        /* Hero heading responsive */
        @media (max-width: 600px) {
          .hero-heading {
            font-size: clamp(3.5rem, 20vw, 5rem) !important;
          }
        }

        /* Platform badge — show full label on tablet+, short on mobile */
        @media (max-width: 600px) {
          .platform-label-full { display: none; }
          .platform-label-short { display: inline; }
        }
        @media (min-width: 601px) {
          .platform-label-full { display: inline; }
          .platform-label-short { display: none; }
        }

        /* Stats tooltip on mobile: hide comments */
        @media (max-width: 400px) {
          .stat-comments { display: none; }
        }
      `}</style>

      <Navbar />

      <main>

        {/* ── HERO ──────────────────────────────────────────────── */}
        <section ref={heroRef} style={{
          position: 'relative', width: '100%',
          height: '100vh', minHeight: 520,
          background: '#ffffff', overflow: 'hidden',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{
            position: 'absolute', inset: 0, zIndex: 0, background: '#fff',
            backgroundImage: `
              radial-gradient(circle at 25% 55%, rgba(93,224,230,0.07) 0%, transparent 45%),
              radial-gradient(circle at 78% 28%, rgba(0,74,173,0.09) 0%, transparent 45%)
            `,
          }} />

          <div ref={overlayRef} style={{
            position: 'absolute', inset: 0, zIndex: 10,
            background: 'linear-gradient(135deg, #5de0e6, #004aad)',
            transformOrigin: 'top', pointerEvents: 'none',
          }} />

          <div ref={heroTextRef} style={{
            position: 'relative', zIndex: 2,
            padding: 'clamp(1.5rem, 5vw, 4rem)',
            width: '100%', maxWidth: 860, textAlign: 'center',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(1rem, 3vw, 1.5rem)',
          }}>
            {/* Breadcrumb — hide on small mobile */}
            <div className="hero-line" style={{
              display: 'flex', alignItems: 'center', gap: '0.4rem',
              flexWrap: 'wrap', justifyContent: 'center',
            }}>
              <Link href="/" style={{ fontSize: 'clamp(0.6rem, 1.5vw, 0.72rem)', fontWeight: 500, color: 'rgba(0,0,0,0.4)', textDecoration: 'none', letterSpacing: '0.1em', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#5de0e6'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(0,0,0,0.4)'}
              >Creaut Bali</Link>
              <span style={{ color: 'rgba(0,0,0,0.2)' }}>·</span>
              <Link href="/services" style={{ fontSize: 'clamp(0.6rem, 1.5vw, 0.72rem)', fontWeight: 500, color: 'rgba(0,0,0,0.4)', textDecoration: 'none', letterSpacing: '0.1em', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#5de0e6'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(0,0,0,0.4)'}
              >Services</Link>
              <span style={{ color: 'rgba(0,0,0,0.2)' }}>·</span>
              <span style={{ fontSize: 'clamp(0.6rem, 1.5vw, 0.72rem)', fontWeight: 600, color: '#5de0e6', letterSpacing: '0.1em' }}>Portfolio</span>
            </div>

            {/* Label */}
            <div className="hero-line" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: 22, height: 2, borderRadius: 2, background: 'linear-gradient(90deg, #5de0e6, #004aad)' }} />
              <span style={{ fontSize: 'clamp(0.58rem, 1.5vw, 0.68rem)', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)', textAlign: 'center' }}>
                {PORTFOLIO.length} Projects · 12 Industries
              </span>
              <div style={{ width: 22, height: 2, borderRadius: 2, background: 'linear-gradient(90deg, #004aad, #5de0e6)' }} />
            </div>

            {/* Heading */}
            <h1 className="hero-line hero-heading" style={{
              fontWeight: 800,
              fontSize: 'clamp(3.5rem, 13vw, 10rem)',
              color: '#000000',
              letterSpacing: '-0.04em', lineHeight: 0.9, margin: 0,
            }}>
              Our<br />
              <span style={{ background: 'linear-gradient(90deg, #5de0e6, #004aad)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Work.
              </span>
            </h1>

            {/* Desc */}
            <p className="hero-line" style={{
              fontSize: 'clamp(0.82rem, 2vw, 1.05rem)',
              color: 'rgba(0,0,0,0.5)', lineHeight: 1.75,
              maxWidth: 480, margin: 0, padding: '0 0.5rem',
            }}>
              Cinematic productions spanning every industry — from intimate brand stories to large-scale commercial campaigns.
            </p>
          </div>

          {/* Scroll hint */}
          <div style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.25)' }}>Scroll</span>
            <div style={{ width: 1, height: 36, background: 'linear-gradient(180deg, rgba(93,224,230,0.6), transparent)', borderRadius: 1 }} />
          </div>
        </section>

        {/* ── FILTER + GRID ─────────────────────────────────────────────────── */}
        <section id="portfolio" style={{ background: '#fff', borderTop: '1px solid rgba(0,0,0,0.06)' }}>

          {/* Sticky Tab Bar */}
          <div style={{
            position: 'sticky', top: 0, zIndex: 50,
            background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(12px)',
          }}>
            <div style={{ maxWidth: 1400, margin: '0 auto', padding: 'clamp(0.75rem, 2vw, 1rem) clamp(1rem, 4vw, 2rem) 0' }}>
              <TabBar active={activeTab} onSelect={setActiveTab} counts={counts} />
            </div>
          </div>

          {/* Grid area */}
          <div style={{ padding: '0 0 clamp(3rem, 8vw, 5rem)' }}>
            <div style={{ maxWidth: 1800, margin: '0 auto', padding: '0 clamp(0.75rem, 3vw, 2rem)' }}>
              {filteredItems.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '6rem 0', color: 'rgba(0,0,0,0.2)' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🎬</div>
                  <p style={{ fontSize: '0.9rem', fontWeight: 600 }}>No projects in this category yet.</p>
                </div>
              ) : (
                <>
                  {/* Count row */}
                  <div
                    ref={countRowRef}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '0.6rem',
                      padding: 'clamp(1.25rem, 3vw, 1.75rem) 0 clamp(1rem, 2.5vw, 1.25rem)',
                    }}
                  >
                    <div style={{ width: 18, height: 1.5, background: 'linear-gradient(90deg,#5de0e6,#004aad)' }} />
                    <span style={{ fontSize: 'clamp(0.58rem, 1.5vw, 0.62rem)', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#004aad' }}>
                      {filteredItems.length} {filteredItems.length === 1 ? 'Project' : 'Projects'}
                    </span>
                  </div>

                  {/* Responsive grid via CSS class */}
                  <div ref={gridRef} className="portfolio-grid">
                    {filteredItems.map((item, i) => (
                      <PortfolioCard
                        key={`${activeTab}-${item.id}`}
                        item={item}
                        index={i}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </section>

        {/* ── CTA STRIP ────────────────────────────────────────────────────── */}
        <CTAStrip />

        <Footer />
      </main>
    </>
  )
}