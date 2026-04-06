'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import Navbar from '../../components/navbar'
import Footer from '../../components/footer'

gsap.registerPlugin(ScrollTrigger)

/* ═══════════════════════════════════════════════════════════════════
   TAMBAH / EDIT FOTO DI SINI
   
   src     : '/photography/foto1.jpg' atau URL unsplash
   category: 'Editorial' | 'Product' | 'Lifestyle' | 'Corporate'
   caption : judul foto
   layout  : 'portrait' (1 kolom) | 'landscape' (2 kolom lebar)
═══════════════════════════════════════════════════════════════════ */
const photos = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200&q=80',
    category: 'Editorial',
    caption: 'Golden Hour Session',
    layout: 'portrait',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=1200&q=80',
    category: 'Product',
    caption: 'Skincare Campaign',
    layout: 'landscape',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&q=80',
    category: 'Lifestyle',
    caption: 'Bali Morning Ritual',
    layout: 'landscape',
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80',
    category: 'Editorial',
    caption: 'Fashion Forward',
    layout: 'portrait',
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80',
    category: 'Product',
    caption: 'Jewelry Collection',
    layout: 'portrait',
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=1200&q=80',
    category: 'Corporate',
    caption: 'Brand Identity Shoot',
    layout: 'landscape',
  },
]
/* ═══════════════════════════════════════════════════════════════ */

const serviceTypes = [
  {
    title: 'Event Coverage',
    desc: 'Whatever your event, we can make sure it\'s captured the way you want it to be. The angles, the lighting, the mood — we work with you to understand your requirements and bring them to life.',
  },
  {
    title: 'Social Media',
    desc: 'We excel in providing photography services specifically tailored for social media content, creating visually captivating visuals that effectively communicate brand identity and tell compelling stories.',
  },
  {
    title: 'Studio Photography',
    desc: 'Booking your studio portrait session is simple. Our professional photographers will guarantee you feel comfortable throughout and will produce the best images using a wide range of props and poses.',
  },
  {
    title: 'Key Visual',
    desc: 'We specialize in Key Visual Photography, harnessing the power of compelling and visually captivating images to convey your brand\'s message and showcase the essence of your products.',
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
      if (e.key === 'Escape')      onClose()
      if (e.key === 'ArrowRight')  onNav(1)
      if (e.key === 'ArrowLeft')   onNav(-1)
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

  const btn = {
    border: 'none', cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    transition: 'all 0.2s', fontFamily: 'Inter, sans-serif',
  }

  return (
    <div
      ref={lightboxRef}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(6px)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: 'clamp(1.5rem, 5vw, 4rem)', gap: '1rem',
      }}
    >
      {/* Top bar */}
      <div style={{ width: '100%', maxWidth: 1100, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <div>
          <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(93,224,230,0.85)', margin: '0 0 0.2rem 0' }}>
            {photo.caption}
          </p>
          <p style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', margin: 0, letterSpacing: '0.1em' }}>
            {String(index + 1).padStart(2,'0')} / {String(photos.length).padStart(2,'0')} · {photo.category}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button onClick={enterFullscreen} title="Full Screen" style={{ ...btn, width: 40, height: 40, borderRadius: '8px', background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'linear-gradient(135deg,#5de0e6,#004aad)'; e.currentTarget.style.color = '#fff' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)' }}
          >⛶</button>
          <button onClick={onClose} title="Close (Esc)" style={{ ...btn, width: 40, height: 40, borderRadius: '8px', background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,60,60,0.5)'; e.currentTarget.style.color = '#fff' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)' }}
          >✕</button>
        </div>
      </div>

      {/* Image + arrows */}
      <div style={{ position: 'relative', width: '100%', maxWidth: 1100, display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 1 }}>
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

      {/* Thumbnail strip */}
      <div style={{ width: '100%', maxWidth: 1100, display: 'flex', gap: '4px', overflowX: 'auto', flexShrink: 0, scrollbarWidth: 'none' }}>
        {photos.map((p, i) => (
          <button key={p.id} onClick={() => onNav(i - index)} style={{
            flexShrink: 0, width: 'clamp(60px,8vw,100px)', aspectRatio: '16/9',
            padding: 0, border: 'none', cursor: 'pointer', borderRadius: '5px',
            overflow: 'hidden', outline: 'none',
            boxShadow: index === i ? 'inset 0 0 0 2px #5de0e6' : 'none',
            transition: 'box-shadow 0.2s', background: '#111',
          }}>
            <img src={p.src} alt={p.caption} draggable={false}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', opacity: index === i ? 1 : 0.4, transition: 'opacity 0.25s' }}
            />
          </button>
        ))}
      </div>
    </div>
  )
}

/* ── PAGE ───────────────────────────────────────────────────────── */
export default function VisualPhotographyPage() {
  const heroRef     = useRef(null)
  const heroTextRef = useRef(null)
  const overlayRef  = useRef(null)
  const gridRef     = useRef(null)
  const descRef     = useRef(null)
  const servicesRef = useRef(null)

  const [hoveredId, setHoveredId]     = useState(null)
  const [lightboxIdx, setLightboxIdx] = useState(null)
  const [cols, setCols]               = useState(3)

  /* Responsive cols */
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth
      if (w < 600)      setCols(1)
      else if (w < 960) setCols(2)
      else              setCols(3)
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
    gsap.set(items, { opacity: 0, y: 36 })
    ScrollTrigger.batch(items, {
      start: 'top 88%',
      onEnter: batch => gsap.to(batch, { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out' }),
    })
    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [cols])

  /* Desc reveal */
  useEffect(() => {
    if (!descRef.current) return
    const items = descRef.current.querySelectorAll('.reveal')
    gsap.set(items, { opacity: 0, y: 28 })
    ScrollTrigger.create({
      trigger: descRef.current, start: 'top 78%',
      onEnter: () => gsap.to(items, { opacity: 1, y: 0, duration: 0.75, stagger: 0.1, ease: 'power3.out' }),
    })
  }, [])

  /* Services reveal */
  useEffect(() => {
    if (!servicesRef.current) return
    const cards = servicesRef.current.querySelectorAll('.service-card')
    gsap.set(cards, { opacity: 0, y: 28 })
    ScrollTrigger.create({
      trigger: servicesRef.current, start: 'top 80%',
      onEnter: () => gsap.to(cards, { opacity: 1, y: 0, duration: 0.65, stagger: 0.08, ease: 'power3.out' }),
    })
  }, [])

  const lightboxNav = useCallback((delta) => {
    setLightboxIdx(prev => {
      if (prev === null) return null
      return ((prev + delta) % photos.length + photos.length) % photos.length
    })
  }, [])

  /* Grid span logic — on mobile ignore landscape */
  const getSpan = (photo) => {
    if (cols === 1) return {}
    if (cols === 2) return photo.layout === 'landscape' ? { gridColumn: 'span 2' } : {}
    return photo.layout === 'landscape' ? { gridColumn: 'span 2' } : {}
  }

  const rowHeight = cols === 1 ? '260px' : cols === 2 ? '320px' : '380px'

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
            HERO IMAGE SLOT — uncomment saat foto siap:
            <img src="/photography/hero.jpg" alt="Visual Photography Hero"
              style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', zIndex:0 }} />
          */}

          <div style={{
            position: 'absolute', inset: 0, zIndex: 0,
            background: 'linear-gradient(160deg, #0d1117 0%, #1a1a2e 40%, #0f3460 100%)',
            backgroundImage: `
              radial-gradient(circle at 30% 50%, rgba(93,224,230,0.08) 0%, transparent 50%),
              radial-gradient(circle at 75% 20%, rgba(0,74,173,0.12) 0%, transparent 45%)
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
            width: '100%', maxWidth: 900,
            textAlign: 'center',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem',
          }}>
            {/* Breadcrumb */}
            <div className="hero-line" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Link href="/" style={{ fontSize: '0.72rem', fontWeight: 500, color: 'rgba(0, 0, 0, 0.4)', textDecoration: 'none', letterSpacing: '0.1em', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#5de0e6'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
              >Creaut Bali</Link>
              <span style={{ color: 'rgba(0, 0, 0, 0.2)' }}>·</span>
              <span style={{ fontSize: '0.72rem', color: 'rgba(0, 0, 0, 0.4)', letterSpacing: '0.1em' }}>Services</span>
              <span style={{ color: 'rgba(0, 0, 0, 0.2)' }}>·</span>
              <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#5de0e6', letterSpacing: '0.1em' }}>Visual Photography</span>
            </div>

            {/* Label */}
            <div className="hero-line" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: 28, height: 2, borderRadius: 2, background: 'linear-gradient(90deg, #5de0e6, #004aad)' }} />
              <span style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(0, 0, 0, 0.45)' }}>
                Editorial · Product · Lifestyle
              </span>
              <div style={{ width: 28, height: 2, borderRadius: 2, background: 'linear-gradient(90deg, #004aad, #5de0e6)' }} />
            </div>

            {/* Heading */}
            <h1 className="hero-line" style={{
              fontWeight: 800, fontSize: 'clamp(3rem, 8vw, 7rem)',
              color: '#000000', letterSpacing: '-0.04em',
              lineHeight: 0.95, margin: 0,
            }}>
              Visual<br />
              <span style={{ background: 'linear-gradient(90deg, #5de0e6, #004aad)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Photo
              </span>graphy
            </h1>

            {/* Desc */}
            <p className="hero-line" style={{
              fontSize: 'clamp(0.875rem, 1.5vw, 1.05rem)',
              color: 'rgba(0, 0, 0, 0.5)',
              lineHeight: 1.75, maxWidth: 480, margin: 0, textAlign: 'center',
            }}>
              We capture moments that matter — from editorial fashion shoots to brand product photography. Every frame is intentional, every light considered.
            </p>

            {/* CTA */}
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
                View Gallery ↓
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
                Book a Session ↗
              </a>
            </div>
          </div>

          {/* Scroll hint */}
          <div style={{ position: 'absolute', bottom: '2.5rem', left: '50%', transform: 'translateX(-50%)', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(0, 0, 0, 0.25)' }}>Scroll</span>
            <div style={{ width: 1, height: 40, background: 'linear-gradient(180deg, rgba(93,224,230,0.6), transparent)', borderRadius: 1 }} />
          </div>
        </section>

        {/* ── MASONRY PHOTO GRID ────────────────────────────────── */}
        <section id="grid" style={{ background: '#fff', paddingBottom: 0 }}>
          <div
            ref={gridRef}
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${cols}, 1fr)`,
              gridAutoRows: rowHeight,
              gap: '4px',
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
                  cursor: 'zoom-in',
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
                    transition: 'transform 0.6s ease',
                    transform: hoveredId === photo.id ? 'scale(1.05)' : 'scale(1)',
                  }}
                />

                {/* Hover overlay */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(135deg, rgba(93,224,230,0.12) 0%, rgba(0,74,173,0.32) 100%)',
                  opacity: hoveredId === photo.id ? 1 : 0,
                  transition: 'opacity 0.4s ease',
                }} />

                {/* Bottom scrim */}
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  height: '50%',
                  background: 'linear-gradient(0deg, rgba(0,10,30,0.7) 0%, transparent 100%)',
                  opacity: hoveredId === photo.id ? 1 : 0,
                  transition: 'opacity 0.4s ease',
                }} />

                {/* Caption on hover */}
                <div style={{
                  position: 'absolute', bottom: '1.25rem', left: '1.5rem',
                  opacity: hoveredId === photo.id ? 1 : 0,
                  transform: hoveredId === photo.id ? 'translateY(0)' : 'translateY(10px)',
                  transition: 'all 0.4s ease',
                }}>
                  <div style={{ width: 22, height: 2, borderRadius: 2, background: 'linear-gradient(90deg, #5de0e6, #004aad)', marginBottom: '0.4rem' }} />
                  <p style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(93,224,230,0.9)', margin: '0 0 0.2rem 0' }}>
                    {photo.category}
                  </p>
                  <p style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fff', margin: 0, letterSpacing: '-0.02em' }}>
                    {photo.caption}
                  </p>
                </div>

                {/* Zoom icon */}
                <div style={{
                  position: 'absolute', top: '1rem', right: '1rem',
                  opacity: hoveredId === photo.id ? 1 : 0,
                  transition: 'opacity 0.3s ease',
                  background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(6px)',
                  borderRadius: '50%', width: 36, height: 36,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.85rem',
                }}>
                  🔍
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── DESCRIPTION ───────────────────────────────────────── */}
        <section ref={descRef} style={{
          background: '#fff',
          padding: 'clamp(4rem, 8vw, 7rem) clamp(1.75rem, 5vw, 5rem)',
          borderBottom: '1px solid rgba(0,0,0,0.07)',
        }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem', alignItems: 'center' }}>

            <div>
              <div className="reveal" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{ width: 28, height: 2, borderRadius: 2, background: 'linear-gradient(90deg, #5de0e6, #004aad)' }} />
                <span style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#004aad' }}>What We Do</span>
              </div>
              <h2 className="reveal" style={{ fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3.2rem)', color: '#0a0a0a', letterSpacing: '-0.04em', lineHeight: 1.05, margin: '0 0 1.5rem 0' }}>
                Full-service Visual<br />Photography
              </h2>
              <p className="reveal" style={{ fontSize: '1rem', color: 'rgba(0,0,0,0.55)', lineHeight: 1.85, margin: '0 0 1rem 0', maxWidth: 480 }}>
                A detailed planning of the photography project will establish the cost and the budget, all technical and artistic elements relative to the photography session.
              </p>
              <p className="reveal" style={{ fontSize: '1rem', color: 'rgba(0,0,0,0.55)', lineHeight: 1.85, margin: '0 0 1rem 0', maxWidth: 480 }}>
                The equipment needed, the studio set up, the props and backdrops, and the total number of shots that will be taken by the photographer are the type of decisions that will be discussed together.
              </p>
              <p className="reveal" style={{ fontSize: '0.9rem', color: 'rgba(0,0,0,0.4)', lineHeight: 1.8, maxWidth: 480 }}>
                At this stage, it will also be determined whether the shooting will be outdoors or in the photography studio.
              </p>
            </div>

            {/* Right — capability tags */}
            <div className="reveal">
              <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.35)', marginBottom: '1rem' }}>
                Our Capabilities
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                {[
                  'Editorial', 'Product', 'Lifestyle',
                  'Corporate', 'Event', 'Studio',
                  'Outdoor', 'Drone', 'Post-Processing',
                  'Key Visual', 'Social Media', 'E-Commerce',
                ].map(tag => (
                  <span key={tag} style={{
                    padding: '0.45rem 1rem', borderRadius: '999px',
                    border: '1.5px solid rgba(0,0,0,0.1)',
                    fontSize: '0.78rem', fontWeight: 600,
                    color: '#555', background: '#f8f8f8',
                    transition: 'all 0.2s', cursor: 'default',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'linear-gradient(90deg,#5de0e6,#004aad)'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'transparent' }}
                    onMouseLeave={e => { e.currentTarget.style.background = '#f8f8f8'; e.currentTarget.style.color = '#555'; e.currentTarget.style.borderColor = 'rgba(0,0,0,0.1)' }}
                  >
                    {tag}
                  </span>
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
              // background: 'rgba(0,0,0,0.07)',
              // border: '1px solid rgba(0,0,0,0.07)',
              borderRadius: '12px',
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
              Ready to shoot?
            </p>
            <h3 style={{ fontWeight: 800, fontSize: 'clamp(1.6rem, 3.5vw, 3rem)', color: '#000000', letterSpacing: '-0.04em', lineHeight: 1.05, margin: 0 }}>
              Let's create something{' '}
              <span style={{ background: 'linear-gradient(90deg, #5de0e6, #004aad)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                beautiful.
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
              Book a Session ↗
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
    <div
      className="service-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: 'clamp(1.75rem, 3vw, 2.5rem)',
        background: hovered ? 'rgba(93,224,230,0.03)' : '#fff',
        transition: 'background 0.3s ease',
        cursor: 'default',
      }}
    >
      <div style={{
        fontWeight: 800, fontSize: '2rem',
        letterSpacing: '-0.05em', lineHeight: 1,
        background: 'linear-gradient(90deg, #5de0e6, #004aad)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
        marginBottom: '1rem',
        // opacity: hovered ? 1 : 0.3, transition: 'opacity 0.3s',
      }}>
        {String(index + 1).padStart(2, '0')}
      </div>
      <h4 style={{ fontWeight: 700, fontSize: '1.05rem', color: '#0a0a0a', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.65rem' }}>
        {service.title}
      </h4>
      <p style={{ fontSize: '0.875rem', color: 'rgba(0,0,0,0.45)', lineHeight: 1.75, margin: 0 }}>
        {service.desc}
      </p>
      <div style={{
        marginTop: '1.5rem', height: 2,
        background: 'linear-gradient(90deg, #5de0e6, #004aad)',
        borderRadius: 2,
        transform: hovered ? 'scaleX(1)' : 'scaleX(0)',
        transformOrigin: 'left', transition: 'transform 0.4s ease',
      }} />
    </div>
  )
}