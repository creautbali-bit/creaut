'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import Navbar from '../../components/navbar'
import Footer from '../../components/footer'

gsap.registerPlugin(ScrollTrigger)

/* ═══════════════════════════════════════════════════════════════════
   BRANDING PORTFOLIO PHOTOS
   Ganti src dengan foto asli kamu.

   size: 'sm'  → kotak kecil (1×1)
         'md'  → tinggi sedang (1×2 baris)
         'lg'  → lebar (2 kolom)
═══════════════════════════════════════════════════════════════════ */
const photos = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?w=800&q=85',
    caption: 'Brand Identity System',
    size: 'md',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=85',
    caption: 'Logo Design',
    size: 'sm',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1636955840493-f43a02bfa064?w=800&q=85',
    caption: 'Packaging Design',
    size: 'sm',
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=1200&q=85',
    caption: 'Brand Guidelines',
    size: 'lg',
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=800&q=85',
    caption: 'Stationery Design',
    size: 'sm',
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&q=85',
    caption: 'Print Design',
    size: 'sm',
  },
]

const serviceTypes = [
  {
    title: 'Brand Identity',
    desc: 'Your brand identity is a visual system of branded elements that work together to identify your business. These elements form your brand guidelines, which can be used to communicate your brand identity in the future.',
  },
  {
    title: 'Rebranding',
    desc: 'Rebranding a company is an important decision. However, if your company has outgrown its current brand, or there\'s been a change in strategy or direction, then it\'s time to rebrand.',
  },
  {
    title: 'Logo Design',
    desc: 'Your logo design is the unique mark that people instantly associate with your business. Just like Nike\'s tick, your logo should be the most simple visual mark that identifies your business.',
  },
  {
    title: 'Stationery Design',
    desc: 'Your stationery design plays a key role in building brand consistency. When you hand out your business card, it\'s important they work to enhance your brand messaging and leave a lasting impression.',
  },
  {
    title: 'Print Design',
    desc: 'Print design such as brochures is a great way to communicate with your customers while giving them something physical to keep. It needs to communicate your brand without you being there.',
  },
  {
    title: 'Packaging Design',
    desc: 'If your business makes a physical product, professionally branded packaging not only helps your product stand out from the crowd, but also helps it to sell and builds brand recognition.',
  },
]

/* ── LIGHTBOX ───────────────────────────────────────────────────── */
function Lightbox({ photos, index, onClose, onNav }) {
  const lightboxRef = useRef(null)
  const imgRef      = useRef(null)
  const photo       = photos[index]

  useEffect(() => {
    gsap.fromTo(lightboxRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' })
    gsap.fromTo(imgRef.current, { scale: 0.94, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: 'power3.out' })
  }, [])

  useEffect(() => {
    if (!imgRef.current) return
    gsap.fromTo(imgRef.current, { opacity: 0, x: 20 }, { opacity: 1, x: 0, duration: 0.3, ease: 'power2.out' })
  }, [index])

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape')     onClose()
      if (e.key === 'ArrowRight') onNav(1)
      if (e.key === 'ArrowLeft')  onNav(-1)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose, onNav])

  const enterFullscreen = () => {
    const el = imgRef.current
    if (!el) return
    if (el.requestFullscreen)            el.requestFullscreen()
    else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen()
  }

  const btn = { border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s', fontFamily: 'Inter, sans-serif' }

  return (
    <div ref={lightboxRef} onClick={e => { if (e.target === e.currentTarget) onClose() }}
      style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(6px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 'clamp(1.5rem, 5vw, 4rem)', gap: '1rem' }}
    >
      <div style={{ width: '100%', maxWidth: 1100, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <div>
          <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(93,224,230,0.85)', margin: '0 0 0.2rem 0' }}>{photo.caption}</p>
          <p style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', margin: 0, letterSpacing: '0.1em' }}>{String(index + 1).padStart(2,'0')} / {String(photos.length).padStart(2,'0')}</p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button onClick={enterFullscreen} style={{ ...btn, width: 40, height: 40, borderRadius: '8px', background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'linear-gradient(135deg,#5de0e6,#004aad)'; e.currentTarget.style.color = '#fff' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)' }}
          >⛶</button>
          <button onClick={onClose} style={{ ...btn, width: 40, height: 40, borderRadius: '8px', background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,60,60,0.5)'; e.currentTarget.style.color = '#fff' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)' }}
          >✕</button>
        </div>
      </div>

      <div style={{ width: '100%', maxWidth: 1100, display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 1 }}>
        <button onClick={() => onNav(-1)} style={{ ...btn, flexShrink: 0, width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', border: '1.5px solid rgba(255,255,255,0.15)', color: '#fff', fontSize: '1.3rem' }}
          onMouseEnter={e => e.currentTarget.style.background = 'linear-gradient(135deg,#5de0e6,#004aad)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
        >‹</button>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.03)', borderRadius: '10px', overflow: 'hidden' }}>
          <img ref={imgRef} src={photo.src} alt={photo.caption}
            style={{ maxWidth: '100%', maxHeight: '65vh', width: 'auto', height: 'auto', display: 'block', borderRadius: '8px', objectFit: 'contain' }}
          />
        </div>
        <button onClick={() => onNav(1)} style={{ ...btn, flexShrink: 0, width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', border: '1.5px solid rgba(255,255,255,0.15)', color: '#fff', fontSize: '1.3rem' }}
          onMouseEnter={e => e.currentTarget.style.background = 'linear-gradient(135deg,#5de0e6,#004aad)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
        >›</button>
      </div>

      <div style={{ width: '100%', maxWidth: 1100, display: 'flex', gap: '4px', overflowX: 'auto', flexShrink: 0, scrollbarWidth: 'none' }}>
        {photos.map((p, i) => (
          <button key={p.id} onClick={() => onNav(i - index)} style={{ flexShrink: 0, width: 'clamp(60px,8vw,100px)', aspectRatio: '16/9', padding: 0, border: 'none', cursor: 'pointer', borderRadius: '5px', overflow: 'hidden', outline: 'none', boxShadow: index === i ? 'inset 0 0 0 2px #5de0e6' : 'none', transition: 'box-shadow 0.2s', background: '#111' }}>
            <img src={p.src} alt={p.caption} draggable={false} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', opacity: index === i ? 1 : 0.4, transition: 'opacity 0.25s' }} />
          </button>
        ))}
      </div>
    </div>
  )
}

/* ── PAGE ───────────────────────────────────────────────────────── */
export default function BrandingPage() {
  const heroRef     = useRef(null)
  const heroTextRef = useRef(null)
  const overlayRef  = useRef(null)
  const gridRef     = useRef(null)
  const descRef     = useRef(null)
  const servicesRef = useRef(null)

  const [hoveredId, setHoveredId]     = useState(null)
  const [lightboxIdx, setLightboxIdx] = useState(null)
  const [cols, setCols]               = useState(4)

  /* Responsive cols for the small masonry */
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth
      if (w < 600)      setCols(2)
      else if (w < 900) setCols(3)
      else              setCols(4)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  /* Hero entrance */
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

  /* Grid scroll-enter */
  useEffect(() => {
    if (!gridRef.current) return
    const items = gridRef.current.querySelectorAll('.grid-item')
    gsap.set(items, { opacity: 0, y: 28 })
    ScrollTrigger.batch(items, {
      start: 'top 88%',
      onEnter: batch => gsap.to(batch, { opacity: 1, y: 0, duration: 0.65, stagger: 0.07, ease: 'power3.out' }),
    })
    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [cols])

  /* Desc + Services reveal */
  useEffect(() => {
    if (!descRef.current) return
    const items = descRef.current.querySelectorAll('.reveal')
    gsap.set(items, { opacity: 0, y: 24 })
    ScrollTrigger.create({
      trigger: descRef.current, start: 'top 78%',
      onEnter: () => gsap.to(items, { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out' }),
    })
  }, [])

  useEffect(() => {
    if (!servicesRef.current) return
    const cards = servicesRef.current.querySelectorAll('.service-card')
    gsap.set(cards, { opacity: 0, y: 24 })
    ScrollTrigger.create({
      trigger: servicesRef.current, start: 'top 80%',
      onEnter: () => gsap.to(cards, { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out' }),
    })
  }, [])

  const lightboxNav = useCallback((delta) => {
    setLightboxIdx(prev => {
      if (prev === null) return null
      return ((prev + delta) % photos.length + photos.length) % photos.length
    })
  }, [])

  /* Grid span per size */
  const getSpan = (photo) => {
    if (cols <= 2) return {}
    if (photo.size === 'lg') return { gridColumn: 'span 2' }
    if (photo.size === 'md') return { gridRow: 'span 2' }
    return {}
  }

  return (
    <>
      <Navbar />

      {lightboxIdx !== null && (
        <Lightbox
          photos={photos}
          index={lightboxIdx}
          onClose={() => setLightboxIdx(null)}
          onNav={lightboxNav}
        />
      )}

      <main>

        {/* ── HERO ──────────────────────────────────────────────── */}
        <section ref={heroRef} style={{
          position: 'relative', width: '100%',
          height: '100vh', minHeight: 560,
          background: '#ffffff', overflow: 'hidden',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {/*
            HERO IMAGE SLOT:
            <img src="/branding/hero.jpg" alt="Branding Hero"
              style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', zIndex:0 }} />
          */}
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
            padding: 'clamp(2rem, 5vw, 4rem)',
            width: '100%', maxWidth: 860,
            textAlign: 'center',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem',
          }}>
            {/* Breadcrumb */}
            <div className="hero-line" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Link href="/" style={{ fontSize: '0.72rem', fontWeight: 500, color: 'rgba(0, 0, 0, 0.4)', textDecoration: 'none', letterSpacing: '0.1em', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#5de0e6'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(0, 0, 0, 0.4)'}
              >Creaut Bali</Link>
              <span style={{ color: 'rgba(0, 0, 0, 0.2)' }}>·</span>
              <span style={{ fontSize: '0.72rem', color: 'rgba(0, 0, 0, 0.4)', letterSpacing: '0.1em' }}>Services</span>
              <span style={{ color: 'rgba(0, 0, 0, 0.2)' }}>·</span>
              <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#5de0e6', letterSpacing: '0.1em' }}>Branding</span>
            </div>

            {/* Label */}
            <div className="hero-line" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: 28, height: 2, borderRadius: 2, background: 'linear-gradient(90deg, #5de0e6, #004aad)' }} />
              <span style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(0, 0, 0, 0.4)' }}>
                Identity · Logo · Guidelines
              </span>
              <div style={{ width: 28, height: 2, borderRadius: 2, background: 'linear-gradient(90deg, #004aad, #5de0e6)' }} />
            </div>

            {/* Heading */}
            <h1 className="hero-line" style={{
              fontWeight: 800,
              fontSize: 'clamp(4rem, 11vw, 10rem)',
              color: '#000000',
              letterSpacing: '-0.04em',
              lineHeight: 0.9,
              margin: 0,
            }}>
              <span style={{
                background: 'linear-gradient(90deg, #5de0e6, #004aad)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>Brand</span>ing
            </h1>

            {/* Desc */}
            <p className="hero-line" style={{
              fontSize: 'clamp(0.875rem, 1.5vw, 1.05rem)',
              color: 'rgba(0, 0, 0, 0.5)',
              lineHeight: 1.75, maxWidth: 500, margin: 0,
            }}>
              We build brands that people remember. From discovery to delivery — strategy, identity, and everything in between.
            </p>

            {/* CTAs */}
            <div className="hero-line" style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <a href="#grid" style={{
                padding: '0.9rem 2.25rem',
                background: 'linear-gradient(90deg, #5de0e6, #004aad)',
                color: '#fff', textDecoration: 'none',
                fontSize: '0.875rem', fontWeight: 600,
                borderRadius: '8px', transition: 'opacity 0.2s',
                boxShadow: '0 4px 24px rgba(93,224,230,0.25)',
              }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.82'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                View Work ↓
              </a>
              <a href="https://wa.me/62818160664" target="_blank" rel="noreferrer" style={{
                padding: '0.9rem 2.25rem', background: 'transparent',
                border: '1.5px solid rgba(0, 0, 0, 0.2)',
                color: 'rgba(0, 0, 0, 0.75)', textDecoration: 'none',
                fontSize: '0.875rem', fontWeight: 600,
                borderRadius: '8px', transition: 'border-color 0.2s, color 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#5de0e6'; e.currentTarget.style.color = '#5de0e6' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.2)'; e.currentTarget.style.color = 'rgba(0, 0, 0, 0.75)' }}
              >
                Start a Project ↗
              </a>
            </div>
          </div>

          {/* Scroll hint */}
          <div style={{ position: 'absolute', bottom: '2.5rem', left: '50%', transform: 'translateX(-50%)', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(0, 0, 0, 0.25)' }}>Scroll</span>
            <div style={{ width: 1, height: 40, background: 'linear-gradient(180deg, rgba(93,224,230,0.6), transparent)', borderRadius: 1 }} />
          </div>
        </section>

        {/* ── PORTFOLIO GRID — small mixed sizes ────────────────── */}
        <section id="grid" style={{ background: '#ffffff', padding: 'clamp(3rem, 5vw, 4.5rem) clamp(1.5rem, 5vw, 4rem)' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>

            {/* Section label */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
              <div style={{ width: 28, height: 2, borderRadius: 2, background: 'linear-gradient(90deg, #5de0e6, #004aad)' }} />
              <span style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#004aad' }}>Portfolio</span>
            </div>

            {/* Grid */}
            <div
              ref={gridRef}
              style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${cols}, 1fr)`,
                gridAutoRows: '200px',
                gap: '8px',
              }}
            >
              {photos.map((photo, i) => (
                <div
                  key={photo.id}
                  className="grid-item"
                  onClick={() => setLightboxIdx(i)}
                  onMouseEnter={() => setHoveredId(photo.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  style={{
                    position: 'relative', overflow: 'hidden',
                    borderRadius: '8px', cursor: 'zoom-in',
                    background: '#ddd',
                    ...getSpan(photo),
                  }}
                >
                  <img
                    src={photo.src}
                    alt={photo.caption}
                    style={{
                      position: 'absolute', inset: 0,
                      width: '100%', height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.55s ease',
                      transform: hoveredId === photo.id ? 'scale(1.06)' : 'scale(1)',
                    }}
                  />

                  {/* Hover overlay */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(135deg, rgba(93,224,230,0.14) 0%, rgba(0,74,173,0.34) 100%)',
                    opacity: hoveredId === photo.id ? 1 : 0,
                    transition: 'opacity 0.4s ease',
                  }} />

                  {/* Bottom scrim */}
                  <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0,
                    height: '55%',
                    background: 'linear-gradient(0deg, rgba(0,10,30,0.72) 0%, transparent 100%)',
                    opacity: hoveredId === photo.id ? 1 : 0,
                    transition: 'opacity 0.4s ease',
                  }} />

                  {/* Caption */}
                  <div style={{
                    position: 'absolute', bottom: '1rem', left: '1rem',
                    opacity: hoveredId === photo.id ? 1 : 0,
                    transform: hoveredId === photo.id ? 'translateY(0)' : 'translateY(8px)',
                    transition: 'all 0.35s ease',
                  }}>
                    <div style={{ width: 18, height: 2, borderRadius: 2, background: 'linear-gradient(90deg, #5de0e6, #004aad)', marginBottom: '0.35rem' }} />
                    <p style={{ fontSize: '0.78rem', fontWeight: 700, color: '#fff', margin: 0, letterSpacing: '-0.01em' }}>
                      {photo.caption}
                    </p>
                  </div>

                  {/* Zoom icon */}
                  <div style={{
                    position: 'absolute', top: '0.75rem', right: '0.75rem',
                    opacity: hoveredId === photo.id ? 1 : 0,
                    transition: 'opacity 0.3s ease',
                    background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(6px)',
                    borderRadius: '50%', width: 30, height: 30,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.75rem',
                  }}>
                    🔍
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── DESCRIPTION ───────────────────────────────────────── */}
        <section ref={descRef} style={{
          background: '#fff',
          padding: 'clamp(4rem, 8vw, 7rem) clamp(1.75rem, 5vw, 5rem)',
          borderBottom: '1px solid rgba(0,0,0,0.07)',
        }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem', alignItems: 'flex-start' }}>

            {/* Left — main copy */}
            <div>
              <div className="reveal" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{ width: 28, height: 2, borderRadius: 2, background: 'linear-gradient(90deg, #5de0e6, #004aad)' }} />
                <span style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#004aad' }}>Our Process</span>
              </div>
              <h2 className="reveal" style={{ fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3.2rem)', color: '#0a0a0a', letterSpacing: '-0.04em', lineHeight: 1.05, margin: '0 0 1.5rem 0' }}>
                How We Build<br />Your Brand
              </h2>
              <p className="reveal" style={{ fontSize: '1rem', color: 'rgba(0,0,0,0.55)', lineHeight: 1.85, margin: '0 0 1.1rem 0', maxWidth: 480 }}>
                The first step in any branding project at Creaut Bali is your Brand Discovery Session. We'll learn about your business, your goals and objectives, ideal customers, current positioning, and more.
              </p>
              <p className="reveal" style={{ fontSize: '1rem', color: 'rgba(0,0,0,0.55)', lineHeight: 1.85, margin: '0 0 1.1rem 0', maxWidth: 480 }}>
                The partnership we have with our clients is key to the success of our projects. Your Discovery Session gives us a great insight into your business.
              </p>
              <p className="reveal" style={{ fontSize: '1rem', color: 'rgba(0,0,0,0.55)', lineHeight: 1.85, margin: '0 0 1.1rem 0', maxWidth: 480 }}>
                Once we've collected our thoughts and put pen to paper, it's time to share our ideas and thinking with you. As your branding project progresses, we design, deliver, and iterate — you'll have different paths to choose from and options to explore.
              </p>
              <p className="reveal" style={{ fontSize: '0.9rem', color: 'rgba(0,0,0,0.4)', lineHeight: 1.8, maxWidth: 480 }}>
                Once the direction for your brand has been decided, we'll start bringing it to life. Your brand will be wrapped up into a presentation document, showing you exactly how your brand should be used across all touchpoints.
              </p>
            </div>

            {/* Right — process steps */}
            <div className="reveal">
              <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.35)', marginBottom: '1.25rem' }}>
                Brand Process
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                {[
                  { num: '01', step: 'Discovery', desc: 'Brand audit, competitor analysis, audience research' },
                  { num: '02', step: 'Strategy',  desc: 'Positioning, messaging, brand personality' },
                  { num: '03', step: 'Design',    desc: 'Logo, color palette, typography, visual system' },
                  { num: '04', step: 'Deliver',   desc: 'Brand guidelines, assets, and final handoff' },
                ].map((p, i, arr) => (
                  <div key={p.num} style={{
                    display: 'flex', gap: '1rem',
                    padding: '1.1rem 0',
                    borderBottom: i < arr.length - 1 ? '1px solid rgba(0,0,0,0.07)' : 'none',
                    alignItems: 'flex-start',
                  }}>
                    <div style={{
                      fontWeight: 800, fontSize: '0.9rem',
                      background: 'linear-gradient(90deg, #5de0e6, #004aad)',
                      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                      flexShrink: 0, width: 28,
                    }}>{p.num}</div>
                    <div>
                      <p style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0a0a0a', margin: '0 0 0.2rem 0', letterSpacing: '-0.01em' }}>{p.step}</p>
                      <p style={{ fontSize: '0.8rem', color: 'rgba(0,0,0,0.4)', margin: 0, lineHeight: 1.6 }}>{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* ── SERVICE TYPES ─────────────────────────────────────── */}
        <section ref={servicesRef} style={{
          background: '#fff',
          padding: 'clamp(4rem, 7vw, 6rem) clamp(1.75rem, 5vw, 5rem)',
        }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ marginBottom: '3rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <div style={{ width: 28, height: 2, borderRadius: 2, background: 'linear-gradient(90deg, #5de0e6, #004aad)' }} />
                <span style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#004aad' }}>Service Types</span>
              </div>
              <h2 style={{ fontWeight: 700, fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', color: '#0a0a0a', letterSpacing: '-0.04em', margin: 0 }}>
                What We Offer
              </h2>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1px',
              background: 'rgba(255, 255, 255, 0.07)',
              // border: '1px solid rgba(0,0,0,0.07)',
              // borderRadius: '12px',
              overflow: 'hidden',
            }}>
              {serviceTypes.map((s, i) => (
                <ServiceCard key={s.title} service={s} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ── BOTTOM CTA ────────────────────────────────────────── */}
        <section style={{
          background: '#ffffff',
          padding: 'clamp(3.5rem, 6vw, 5rem) clamp(1.75rem, 4vw, 4rem)',
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem',
        }}>
          <div>
            <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(0, 0, 0, 0.35)', marginBottom: '0.6rem' }}>
              Ready to build your brand?
            </p>
            <h3 style={{ fontWeight: 800, fontSize: 'clamp(1.6rem, 3.5vw, 3rem)', color: '#000000', letterSpacing: '-0.04em', lineHeight: 1.05, margin: 0 }}>
              Let's create a brand{' '}
              <span style={{ background: 'linear-gradient(90deg, #5de0e6, #004aad)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                that lasts.
              </span>
            </h3>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <a href="https://wa.me/62818160664" target="_blank" rel="noreferrer" style={{
              padding: '0.9rem 2.25rem',
              background: 'linear-gradient(90deg, #5de0e6, #004aad)',
              color: '#fff', textDecoration: 'none',
              fontSize: '0.875rem', fontWeight: 600,
              borderRadius: '8px', transition: 'opacity 0.2s',
              boxShadow: '0 4px 20px rgba(93,224,230,0.25)',
            }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              Start a Project ↗
            </a>
            <Link href="/" style={{
              padding: '0.9rem 2.25rem', background: 'transparent',
              border: '1.5px solid rgba(0, 0, 0, 0.15)',
              color: 'rgba(0, 0, 0, 0.7)', textDecoration: 'none',
              fontSize: '0.875rem', fontWeight: 600, borderRadius: '8px',
              transition: 'border-color 0.2s, color 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#5de0e6'; e.currentTarget.style.color = '#5de0e6' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.15)'; e.currentTarget.style.color = 'rgba(0, 0, 0, 0.7)' }}
            >
              ← Back to Home
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}

/* ── SERVICE CARD ───────────────────────────────────────────────── */
function ServiceCard({ service, index }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div className="service-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ padding: 'clamp(1.75rem, 3vw, 2.5rem)', background: hovered ? 'rgba(93,224,230,0.03)' : '#fff', transition: 'background 0.3s ease', cursor: 'default' }}
    >
      <div style={{ fontWeight: 800, fontSize: '2rem', letterSpacing: '-0.05em', lineHeight: 1, background: 'linear-gradient(90deg, #5de0e6, #004aad)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: '1rem' }}>
        {String(index + 1).padStart(2, '0')}
      </div>
      <h4 style={{ fontWeight: 700, fontSize: '1.05rem', color: '#0a0a0a', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.65rem' }}>
        {service.title}
      </h4>
      <p style={{ fontSize: '0.875rem', color: 'rgba(0,0,0,0.45)', lineHeight: 1.75, margin: 0 }}>
        {service.desc}
      </p>
      <div style={{ marginTop: '1.5rem', height: 2, background: 'linear-gradient(90deg, #5de0e6, #004aad)', borderRadius: 2, transform: hovered ? 'scaleX(1)' : 'scaleX(0)', transformOrigin: 'left', transition: 'transform 0.4s ease' }} />
    </div>
  )
}