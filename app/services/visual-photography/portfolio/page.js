'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import Navbar from '../../../components/navbar'
import Footer from '../../../components/footer'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

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
        lenis = new Lenis({ duration: 1.35, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true, wheelMultiplier: 0.9 })
        lenisRef.current = lenis
        gsap.ticker.add(time => lenis.raf(time * 1000))
        gsap.ticker.lagSmoothing(0)
        lenis.on('scroll', ScrollTrigger.update)
      } catch { /* native fallback */ }
    }
    init()
    return () => { gsap.ticker.remove(time => lenis?.raf(time * 1000)); lenis?.destroy() }
  }, [])
  return lenisRef
}

/* ─────────────────────────────────────────────────────────────────────────────
   DATA — TABS
   ───────────────────────────────────────────────────────────────────────────── */
const TABS = [
  { id: 'all',        label: 'All' },
  { id: 'editorial',  label: 'Editorial' },
  { id: 'product',    label: 'Product' },
  { id: 'lifestyle',  label: 'Lifestyle' },
  { id: 'corporate',  label: 'Corporate' },
  { id: 'event',      label: 'Event' },
  { id: 'studio',     label: 'Studio' },
  { id: 'keyvisual',  label: 'Key Visual' },
]

/* ─────────────────────────────────────────────────────────────────────────────
   DATA — PORTFOLIO
   ───────────────────────────────────────────────────────────────────────────── */
const PORTFOLIO = [
{ id: 1,  category: 'editorial',  caption: 'Golden Hour Session',    client: 'Creaut Editorial',  layout: 'portrait',  src: '/image/pho14.jpg' },
{ id: 2,  category: 'product',    caption: 'Skincare Campaign',      client: 'Beauty Brand Co.',  layout: 'landscape', src: '/image/pho3.jpg' },
{ id: 3,  category: 'lifestyle',  caption: 'Bali Morning Ritual',    client: 'Wellness Studio',   layout: 'landscape', src: '/image/pho19.jpg' },
{ id: 4,  category: 'editorial',  caption: 'Fashion Forward',        client: 'Vogue Indonesia',   layout: 'portrait',  src: '/image/pho7.jpg' },
{ id: 5,  category: 'product',    caption: 'Jewelry Collection',     client: 'Sela Jewels',       layout: 'portrait',  src: '/image/pho22.jpg' },
{ id: 6,  category: 'corporate',  caption: 'Brand Identity Shoot',   client: 'Finhub Corp',       layout: 'landscape', src: '/image/pho11.jpg' },
{ id: 7,  category: 'event',      caption: 'Sunset Gala Highlights', client: 'Amanusa Resort',    layout: 'landscape', src: '/image/pho24.jpg' },
{ id: 8,  category: 'studio',     caption: 'Monochrome Series',      client: 'Arthaus Studio',    layout: 'portrait',  src: '/image/pho5.jpg' },
{ id: 9,  category: 'keyvisual',  caption: 'Fragrance Campaign',     client: 'Bali Scents Co.',   layout: 'landscape', src: '/image/pho17.jpg' },
{ id: 10, category: 'lifestyle',  caption: 'Rice Field Morning',     client: 'Slow Living Mag',   layout: 'portrait',  src: '/image/pho9.jpg' },
{ id: 11, category: 'editorial',  caption: 'Batik Haute Couture',    client: 'Suku Textile',      layout: 'portrait',  src: '/image/pho21.jpg' },
{ id: 12, category: 'product',    caption: 'Organic Tea Ritual',     client: 'Bumi Herb Co.',     layout: 'landscape', src: '/image/pho2.jpg' },
{ id: 13, category: 'corporate',  caption: 'Executive Portraits',    client: 'PT. Nusantara',     layout: 'portrait',  src: '/image/pho16.jpg' },
{ id: 14, category: 'event',      caption: 'Cultural Ceremony',      client: 'Bali Arts Board',   layout: 'landscape', src: '/image/pho8.jpg' },
{ id: 15, category: 'studio',     caption: 'Ikat Fashion Story',     client: 'Tenun House',       layout: 'portrait',  src: '/image/pho23.jpg' },
{ id: 16, category: 'keyvisual',  caption: 'Villa Launch Campaign',  client: 'Seminyak Estates',  layout: 'landscape', src: '/image/pho4.jpg' },
{ id: 17, category: 'lifestyle',  caption: 'Surf & Soul',            client: 'Canggu Co.',        layout: 'portrait',  src: '/image/pho18.jpg' },
{ id: 18, category: 'editorial',  caption: 'Linen Summer Edit',      client: 'Kain Magazine',     layout: 'landscape', src: '/image/pho10.jpg' },
{ id: 19, category: 'product',    caption: 'Artisan Pottery',        client: 'Gerabah Studio',    layout: 'portrait',  src: '/image/pho1.jpg' },
{ id: 20, category: 'corporate',  caption: 'Annual Report Cover',    client: 'BankBali Group',    layout: 'landscape', src: '/image/pho20.jpg' },
{ id: 21, category: 'event',      caption: 'Wedding at Tanah Lot',   client: 'Sacred Vow Agency', layout: 'portrait',  src: '/image/pho6.jpg' },
{ id: 22, category: 'studio',     caption: 'Jewellery Close-ups',    client: 'Emas Bali',         layout: 'landscape', src: '/image/pho13.jpg' },
{ id: 23, category: 'keyvisual',  caption: 'Skincare Hero Shot',     client: 'Pura Skin Lab',     layout: 'portrait',  src: '/image/pho15.jpg' },
{ id: 24, category: 'lifestyle',  caption: 'Ubud Forest Retreat',    client: 'Satu Wellness',     layout: 'landscape', src: '/image/pho12.jpg' },
]

/* ─────────────────────────────────────────────────────────────────────────────
   LIGHTBOX
   ───────────────────────────────────────────────────────────────────────────── */
function Lightbox({ items, index, onClose, onNav }) {
  const overlayRef = useRef(null)
  const imgRef     = useRef(null)
  const item       = items[index]

  useEffect(() => {
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' })
    gsap.fromTo(imgRef.current, { scale: 0.94, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: 'power3.out' })
  }, [])

  useEffect(() => {
    if (!imgRef.current) return
    gsap.fromTo(imgRef.current, { opacity: 0, x: 20 }, { opacity: 1, x: 0, duration: 0.3, ease: 'power2.out' })
  }, [index])

  useEffect(() => {
    const h = e => {
      if (e.key === 'Escape')     onClose()
      if (e.key === 'ArrowRight') onNav(1)
      if (e.key === 'ArrowLeft')  onNav(-1)
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [onClose, onNav])

  const btn = { border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }

  return (
    <div ref={overlayRef} onClick={e => { if (e.target === e.currentTarget) onClose() }}
      style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(8px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 'clamp(1.5rem, 5vw, 4rem)', gap: '1rem' }}>

      {/* Top bar */}
      <div style={{ width: '100%', maxWidth: 1100, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <div>
          <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(93,224,230,0.85)', margin: '0 0 0.2rem 0' }}>{item.caption}</p>
          <p style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', margin: 0, letterSpacing: '0.1em' }}>
            {String(index + 1).padStart(2,'0')} / {String(items.length).padStart(2,'0')} · {item.client}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button onClick={onClose} style={{ ...btn, width: 40, height: 40, borderRadius: '8px', background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,60,60,0.5)'; e.currentTarget.style.color = '#fff' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)' }}>✕</button>
        </div>
      </div>

      {/* Image + arrows */}
      <div style={{ width: '100%', maxWidth: 1100, display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 1 }}>
        <button onClick={() => onNav(-1)} style={{ ...btn, flexShrink: 0, width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', border: '1.5px solid rgba(255,255,255,0.15)', color: '#fff', fontSize: '1.3rem' }}
          onMouseEnter={e => e.currentTarget.style.background = 'linear-gradient(135deg,#5de0e6,#004aad)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}>‹</button>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.03)', borderRadius: '10px', overflow: 'hidden' }}>
          <img ref={imgRef} src={item.src} alt={item.caption} style={{ maxWidth: '100%', maxHeight: '65vh', width: 'auto', height: 'auto', display: 'block', borderRadius: '8px', objectFit: 'contain' }} />
        </div>
        <button onClick={() => onNav(1)} style={{ ...btn, flexShrink: 0, width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', border: '1.5px solid rgba(255,255,255,0.15)', color: '#fff', fontSize: '1.3rem' }}
          onMouseEnter={e => e.currentTarget.style.background = 'linear-gradient(135deg,#5de0e6,#004aad)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}>›</button>
      </div>

      {/* Thumbnail strip */}
      <div style={{ width: '100%', maxWidth: 1100, display: 'flex', gap: '4px', overflowX: 'auto', flexShrink: 0, scrollbarWidth: 'none' }}>
        {items.map((p, i) => (
          <button key={p.id} onClick={() => onNav(i - index)} style={{ flexShrink: 0, width: 'clamp(60px,8vw,100px)', aspectRatio: '16/9', padding: 0, border: 'none', cursor: 'pointer', borderRadius: '5px', overflow: 'hidden', outline: 'none', boxShadow: index === i ? 'inset 0 0 0 2px #5de0e6' : 'none', transition: 'box-shadow 0.2s', background: '#111' }}>
            <img src={p.src} alt={p.caption} draggable={false} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', opacity: index === i ? 1 : 0.4, transition: 'opacity 0.25s' }} />
          </button>
        ))}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   PHOTO CARD — Abstract Masonry Bento (No Load Animations)
   ───────────────────────────────────────────────────────────────────────────── */
function PhotoCard({ item, onOpen, colCount }) {
  const [hovered, setHovered] = useState(false)

  // LOGIKA BENTO GRID ABSTRAK
  let colSpan = 1;
  let rowSpan = 1;

  if (colCount >= 4) {
    // Desktop: Sangat Abstrak
    if (item.layout === 'landscape') {
      colSpan = 2; rowSpan = 1;
      // Beri fitur gambar super besar sesekali
      if (item.id % 6 === 0) { colSpan = 2; rowSpan = 2; }
    } else {
      colSpan = 1; rowSpan = 2;
      // Gambar portrait sesekali memakan 2 kolom juga
      if (item.id % 9 === 0) { colSpan = 2; rowSpan = 2; }
    }
  } else if (colCount === 3) {
    // Layar Menengah
    if (item.layout === 'landscape') {
      colSpan = 2; rowSpan = 1;
    } else {
      colSpan = 1; rowSpan = 2;
    }
  } else if (colCount === 2) {
    // Tablet
    if (item.layout === 'landscape') { colSpan = 2; rowSpan = 1; }
    else { colSpan = 1; rowSpan = 2; }
  } else {
    // Mobile
    colSpan = 1; rowSpan = 1;
  }

  const spanStyle = {
    gridColumn: `span ${colSpan}`,
    gridRow: `span ${rowSpan}`
  }

  return (
    <div
      onClick={() => onOpen()}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        overflow: 'hidden',
        cursor: 'zoom-in',
        background: '#0d0d0d',
        height: '100%',
        width: '100%',
        ...spanStyle,
      }}
    >
      {/* Image */}
      <img src={item.src} alt={item.caption} draggable={false}
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover',
          transition: 'transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94)',
          transform: hovered ? 'scale(1.06)' : 'scale(1)',
        }}
      />

      {/* Hover gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(135deg, rgba(93,224,230,0.10) 0%, rgba(0,74,173,0.35) 100%)',
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.45s ease',
      }} />

      {/* Bottom scrim */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '55%',
        background: 'linear-gradient(0deg, rgba(0,8,24,0.82) 0%, transparent 100%)',
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.45s ease',
      }} />

      {/* Caption slide-up */}
      <div style={{
        position: 'absolute', bottom: 'clamp(0.85rem, 2vw, 1.25rem)', left: 'clamp(0.85rem, 2vw, 1.5rem)',
        opacity: hovered ? 1 : 0,
        transform: hovered ? 'translateY(0)' : 'translateY(10px)',
        transition: 'all 0.4s ease',
      }}>
        <div style={{ width: 20, height: 2, borderRadius: 2, background: 'linear-gradient(90deg, #5de0e6, #004aad)', marginBottom: '0.35rem' }} />
        <p style={{ fontSize: 'clamp(0.55rem, 1.2vw, 0.62rem)', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(93,224,230,0.9)', margin: '0 0 0.2rem 0' }}>
          {item.client}
        </p>
        <p style={{ fontSize: 'clamp(0.75rem, 1.8vw, 0.95rem)', fontWeight: 700, color: '#fff', margin: 0, letterSpacing: '-0.02em', lineHeight: 1.2 }}>
          {item.caption}
        </p>
      </div>

      {/* Category badge — always visible */}
      <div style={{
        position: 'absolute', top: 'clamp(0.6rem, 1.5vw, 0.85rem)', left: 'clamp(0.6rem, 1.5vw, 0.85rem)',
        background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(8px)',
        border: '1px solid rgba(255,255,255,0.1)',
        padding: '0.25rem 0.6rem', borderRadius: '4px',
        opacity: hovered ? 1 : 0.6,
        transition: 'opacity 0.3s',
      }}>
        <span style={{ fontSize: 'clamp(0.48rem, 1vw, 0.55rem)', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.75)' }}>
          {item.category}
        </span>
      </div>

      {/* Zoom icon */}
      <div style={{
        position: 'absolute', top: 'clamp(0.6rem, 1.5vw, 0.85rem)', right: 'clamp(0.6rem, 1.5vw, 0.85rem)',
        opacity: hovered ? 1 : 0, transition: 'opacity 0.3s',
        background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(6px)',
        borderRadius: '50%', width: 34, height: 34,
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem',
      }}>🔍</div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   TAB BAR
   ───────────────────────────────────────────────────────────────────────────── */
function TabBar({ active, onSelect, counts }) {
  return (
    <div style={{ borderBottom: '1px solid rgba(0,0,0,0.08)', background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(12px)' }}>
      <div style={{
        maxWidth: 1400, margin: '0 auto',
        padding: '0 clamp(1rem, 4vw, 2rem)',
        display: 'flex', alignItems: 'flex-end',
        gap: 'clamp(1rem, 3vw, 2rem)',
        overflowX: 'auto', scrollbarWidth: 'none',
        WebkitOverflowScrolling: 'touch',
      }}>
        {TABS.map((tab, i) => {
          const isActive = active === tab.id
          const count = tab.id === 'all' ? PORTFOLIO.length : (counts[tab.id] || 0)
          return (
            <button
              key={tab.id}
              onClick={() => onSelect(tab.id)}
              style={{
                padding: '0 0 10px', border: 'none', background: 'transparent',
                color: isActive ? '#000' : 'rgba(0,0,0,0.38)',
                fontSize: 'clamp(0.65rem, 1.8vw, 0.72rem)',
                fontWeight: isActive ? 700 : 500,
                cursor: 'pointer', letterSpacing: '0.02em',
                whiteSpace: 'nowrap', position: 'relative',
                transition: 'color 0.2s',
                display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0,
                minHeight: 44,
              }}
              onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = '#000' }}
              onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = 'rgba(0,0,0,0.38)' }}
            >
              {i === 1 && (
                <span style={{ position: 'absolute', left: 'calc(-1 * clamp(0.5rem, 1.5vw, 1rem))', bottom: 10, width: 1, height: 14, background: 'rgba(0,0,0,0.12)', display: 'block' }} />
              )}
              {tab.label}
              <span style={{ fontSize: 'clamp(0.5rem, 1.2vw, 0.55rem)', fontWeight: 600, color: isActive ? '#5de0e6' : 'rgba(0,0,0,0.25)', transition: 'color 0.2s' }}>
                {count}
              </span>
              <span style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg,#5de0e6,#004aad)', opacity: isActive ? 1 : 0, transition: 'opacity 0.2s' }} />
            </button>
          )
        })}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   PAGE
   ───────────────────────────────────────────────────────────────────────────── */
export default function VisualPhotographyPortfolioPage() {
  useLenis()

  const heroRef     = useRef(null)
  const heroTextRef = useRef(null)
  const overlayRef  = useRef(null)
  const countRowRef = useRef(null)

  const [activeTab,     setActiveTab]     = useState('all')
  const [filteredItems, setFilteredItems] = useState(PORTFOLIO)
  const [lightboxIdx,   setLightboxIdx]   = useState(null)
  const [cols,          setCols]          = useState(4)

  /* Responsive cols update untuk memicu Bento sizing */
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth
      if (w < 600)       setCols(1)
      else if (w < 960)  setCols(2)
      else if (w < 1200) setCols(3)
      else               setCols(4)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  /* Filter */
  useEffect(() => {
    setFilteredItems(activeTab === 'all' ? PORTFOLIO : PORTFOLIO.filter(p => p.category === activeTab))
  }, [activeTab])

  /* Count row flash on filter change */
  useEffect(() => {
    if (!countRowRef.current) return
    gsap.fromTo(countRowRef.current, { opacity: 0, x: -12 }, { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' })
  }, [filteredItems])

  /* Hero entrance */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .fromTo(overlayRef.current, { scaleY: 1 }, { scaleY: 0, duration: 1.2, ease: 'power4.inOut', transformOrigin: 'top' })
        .fromTo(heroTextRef.current.querySelectorAll('.hero-line'), { y: 60, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, duration: 0.9 }, '-=0.4')
    }, heroRef)
    return () => ctx.revert()
  }, [])

  const counts = PORTFOLIO.reduce((acc, item) => { acc[item.category] = (acc[item.category] || 0) + 1; return acc }, {})

  const lightboxNav = useCallback((delta) => {
    setLightboxIdx(prev => {
      if (prev === null) return null
      return ((prev + delta) % filteredItems.length + filteredItems.length) % filteredItems.length
    })
  }, [filteredItems.length])

  return (
    <>
      <style>{`
        html { scroll-behavior: auto !important; }
        *, *::before, *::after { box-sizing: border-box; }
        
        /* Custom Elegant Scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #fafafa;
        }
        ::-webkit-scrollbar-thumb {
          background: #d1d1d1;
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #004aad;
        }

        .photo-grid {
          display: grid;
          gap: 6px;
          grid-template-columns: repeat(4, 1fr);
          grid-auto-rows: 340px; /* Ukuran base row diperbesar */
          grid-auto-flow: dense; /* Mengunci bento grid rapat */
        }
        @media (max-width: 1200px) {
          .photo-grid {
            grid-template-columns: repeat(3, 1fr);
            grid-auto-rows: 320px;
          }
        }
        @media (max-width: 960px) {
          .photo-grid {
            grid-template-columns: repeat(2, 1fr);
            grid-auto-rows: 300px;
          }
        }
        @media (max-width: 600px) {
          .photo-grid {
            grid-template-columns: 1fr;
            grid-auto-rows: 360px;
          }
        }

        html.lenis { height: auto; }
        .lenis.lenis-smooth { scroll-behavior: auto; }
        .lenis.lenis-stopped { overflow: hidden; }
      `}</style>

      <Navbar />

      {lightboxIdx !== null && (
        <Lightbox
          items={filteredItems}
          index={lightboxIdx}
          onClose={() => setLightboxIdx(null)}
          onNav={lightboxNav}
        />
      )}

      <main>

        {/* ── HERO ──────────────────────────────────────────────────────────── */}
        <section ref={heroRef} style={{
          position: 'relative', width: '100%',
          height: '100vh', minHeight: 520,
          background: '#ffffff', overflow: 'hidden',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{
            position: 'absolute', inset: 0, zIndex: 0,
            background: '#fff',
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
            {/* Breadcrumb */}
            <div className="hero-line" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Link href="/" style={{ fontSize: 'clamp(0.6rem,1.5vw,0.72rem)', fontWeight: 500, color: 'rgba(0,0,0,0.4)', textDecoration: 'none', letterSpacing: '0.1em', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#5de0e6'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(0,0,0,0.4)'}
              >Creaut Bali</Link>
              <span style={{ color: 'rgba(0,0,0,0.2)' }}>·</span>
              <Link href="/services/visual-photography" style={{ fontSize: 'clamp(0.6rem,1.5vw,0.72rem)', fontWeight: 500, color: 'rgba(0,0,0,0.4)', textDecoration: 'none', letterSpacing: '0.1em', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#5de0e6'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(0,0,0,0.4)'}
              >Visual Photography</Link>
              <span style={{ color: 'rgba(0,0,0,0.2)' }}>·</span>
              <span style={{ fontSize: 'clamp(0.6rem,1.5vw,0.72rem)', fontWeight: 600, color: '#5de0e6', letterSpacing: '0.1em' }}>Portfolio</span>
            </div>

            {/* Label */}
            <div className="hero-line" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: 22, height: 2, borderRadius: 2, background: 'linear-gradient(90deg, #5de0e6, #004aad)' }} />
              <span style={{ fontSize: 'clamp(0.58rem,1.5vw,0.68rem)', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)' }}>
                {PORTFOLIO.length} Photos · {TABS.length - 1} Categories
              </span>
              <div style={{ width: 22, height: 2, borderRadius: 2, background: 'linear-gradient(90deg, #004aad, #5de0e6)' }} />
            </div>

            {/* Heading */}
            <h1 className="hero-line" style={{
              fontWeight: 800,
              fontSize: 'clamp(3.5rem, 13vw, 10rem)',
              color: '#000000', letterSpacing: '-0.04em', lineHeight: 0.9, margin: 0,
            }}>
              Our<br />
              <span style={{ background: 'linear-gradient(90deg, #5de0e6, #004aad)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Lens.
              </span>
            </h1>

            {/* Desc */}
            <p className="hero-line" style={{
              fontSize: 'clamp(0.82rem,2vw,1.05rem)',
              color: 'rgba(0,0,0,0.5)', lineHeight: 1.75, maxWidth: 480, margin: 0, padding: '0 0.5rem',
            }}>
              A curated collection of editorial, product, lifestyle and corporate photography — each frame told with intention.
            </p>
          </div>

          {/* Scroll hint */}
          <div style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.25)' }}>Scroll</span>
            <div style={{ width: 1, height: 36, background: 'linear-gradient(180deg, rgba(93,224,230,0.6), transparent)', borderRadius: 1 }} />
          </div>
        </section>

        {/* ── FILTER + GRID ──────────────────────────────────────────────────── */}
        <section id="portfolio" style={{ background: '#fff', borderTop: '1px solid rgba(0,0,0,0.06)' }}>

          {/* Sticky Tab Bar */}
          <div style={{ position: 'sticky', top: 0, zIndex: 50 }}>
            <div style={{ maxWidth: 1400, margin: '0 auto', padding: 'clamp(0.75rem,2vw,1rem) clamp(1rem,4vw,2rem) 0' }}>
              <TabBar active={activeTab} onSelect={setActiveTab} counts={counts} />
            </div>
          </div>

          {/* Grid area */}
          <div style={{ padding: '0 0 clamp(3rem,8vw,5rem)' }}>
            <div style={{ maxWidth: 1800, margin: '0 auto', padding: '0 clamp(0.75rem,3vw,2rem)' }}>

              {filteredItems.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '6rem 0', color: 'rgba(0,0,0,0.2)' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📷</div>
                  <p style={{ fontSize: '0.9rem', fontWeight: 600 }}>No photos in this category yet.</p>
                </div>
              ) : (
                <>
                  {/* Count row */}
                  <div ref={countRowRef} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: 'clamp(1.25rem,3vw,1.75rem) 0 clamp(1rem,2.5vw,1.25rem)' }}>
                    <div style={{ width: 18, height: 1.5, background: 'linear-gradient(90deg,#5de0e6,#004aad)' }} />
                    <span style={{ fontSize: 'clamp(0.58rem,1.5vw,0.62rem)', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#004aad' }}>
                      {filteredItems.length} {filteredItems.length === 1 ? 'Photo' : 'Photos'}
                    </span>
                  </div>

                  {/* Masonry grid */}
                  <div className="photo-grid">
                    {filteredItems.map((item, i) => (
                      <PhotoCard
                        key={`${activeTab}-${item.id}`}
                        item={item}
                        colCount={cols}
                        onOpen={() => setLightboxIdx(i)}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </section>

        {/* ── BOTTOM CTA ─────────────────────────────────────────────────────── */}
        <section style={{
          background: '#fff',
          borderTop: '1px solid rgba(0,0,0,0.06)',
          padding: 'clamp(5rem,10vw,8rem) clamp(1rem,4vw,2rem)',
          overflow: 'hidden', position: 'relative',
        }}>
          <div style={{
            position: 'absolute', top: '-40%', left: '50%', transform: 'translateX(-50%)',
            width: '80%', height: '180%',
            background: 'radial-gradient(ellipse at center, rgba(93,224,230,0.07) 0%, rgba(0,74,173,0.04) 45%, transparent 70%)',
            pointerEvents: 'none', zIndex: 0,
          }} />

          <div style={{ position: 'relative', zIndex: 1, maxWidth: 640, margin: '0 auto', textAlign: 'center' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              border: '1px solid rgba(0,0,0,0.15)', borderRadius: '999px',
              padding: '0.35rem 0.9rem', marginBottom: '1.75rem', background: '#fafafa',
            }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'linear-gradient(90deg, #5de0e6, #004aad)', flexShrink: 0 }} />
              <span style={{ fontSize: 'clamp(0.6rem,1.5vw,0.72rem)', fontWeight: 700, color: 'rgba(0,0,0,0.45)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                Ready to collaborate?
              </span>
            </div>

            <h2 style={{
              fontSize: 'clamp(2rem,8vw,4rem)',
              fontWeight: 800, letterSpacing: '-0.04em', color: '#000', lineHeight: 1.05, marginBottom: '2.5rem',
            }}>
              Let's capture your{' '}
              <span style={{ background: 'linear-gradient(90deg, #5de0e6, #004aad)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                story.
              </span>
            </h2>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="https://wa.me/6287780594231" target="_blank" rel="noreferrer" style={{
                padding: 'clamp(0.75rem,2vw,0.9rem) clamp(1.5rem,4vw,2.25rem)',
                background: 'linear-gradient(90deg, #5de0e6, #004aad)',
                color: '#fff', textDecoration: 'none',
                fontSize: 'clamp(0.8rem,2vw,0.875rem)', fontWeight: 600,
                borderRadius: '8px', transition: 'opacity 0.2s', boxShadow: '0 4px 24px rgba(0,74,173,0.18)',
              }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >Book a Session ↗</a>
              <Link href="/services/visual-photography" style={{
                padding: 'clamp(0.75rem,2vw,0.9rem) clamp(1.5rem,4vw,2.25rem)',
                background: '#fff', border: '1.5px solid rgba(0,0,0,0.15)',
                color: '#000', textDecoration: 'none',
                fontSize: 'clamp(0.8rem,2vw,0.875rem)', fontWeight: 600,
                borderRadius: '8px', transition: 'border-color 0.2s, color 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#5de0e6'; e.currentTarget.style.color = '#004aad' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.15)'; e.currentTarget.style.color = '#000' }}
              >← Back to Photography</Link>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  )
}