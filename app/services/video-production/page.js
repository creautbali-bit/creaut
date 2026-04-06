'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import Navbar from '../../components/navbar'
import Footer from '../../components/footer'

gsap.registerPlugin(ScrollTrigger)

/* ═══════════════════════════════════════════════════════════════════
   CAROUSEL IMAGES — Behind The Scene & Alur Produksi
   Ganti src dengan foto asli kamu:
   src: '/bts/shoot-day-01.jpg'

   caption : keterangan singkat foto (opsional)
═══════════════════════════════════════════════════════════════════ */
const carouselImages = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1600&q=85',
    caption: 'On Set — Commercial Shoot',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1600&q=85',
    caption: 'Behind The Scene — Product Film',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1601506521793-dc748fc80b67?w=1600&q=85',
    caption: 'Documentary Production',
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1600&q=85',
    caption: 'Director & Crew',
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1578022761797-b8636ac1773c?w=1600&q=85',
    caption: 'Location Scouting — Bali',
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1536240478700-b869ad10e128?w=1600&q=85',
    caption: 'Post Production — Color Grading',
  },
  {
    id: 7,
    src: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1600&q=85',
    caption: 'Camera Setup',
  },
  {
    id: 8,
    src: 'https://images.unsplash.com/photo-1561089489-f13d5e730d72?w=1600&q=85',
    caption: 'Lighting Rig',
  },
]

/* ── SERVICE TYPES ───────────────────────────────────────────────── */
const serviceTypes = [
  {
    title: 'Web Commercials',
    desc: 'Online video marketing that makes a personal connection with your target audience. From brand recognition to product showcase.',
  },
  {
    title: 'Corporate Video',
    desc: 'High-quality corporate videos that provide a compelling company profile. Video is the best way to showcase your services.',
  },
  {
    title: 'Live Events',
    desc: 'Concert, corporate event, award ceremony, or trade show — we develop bespoke video solutions that enhance your brand identity.',
  },
  {
    title: 'Marketing Videos',
    desc: 'Whether promoting a product, hotel, or region — our team writes, shoots and edits videos that inspire your audience.',
  },
  {
    title: 'Charity Videos',
    desc: 'Our creative team is skilled at telling stories and dealing with sensitive subjects to generate funds and raise awareness.',
  },
  {
    title: 'Safety Videos',
    desc: 'Clear and powerful messages using dramatic reconstructions, motion graphics, and memorable stories.',
  },
]

/* ── LIGHTBOX ───────────────────────────────────────────────────── */
function Lightbox({ images, index, onClose, onNav }) {
  const lightboxRef = useRef(null)
  const imgRef      = useRef(null)
  const img         = images[index]

  /* Animate in */
  useEffect(() => {
    gsap.fromTo(lightboxRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: 'power2.out' }
    )
    gsap.fromTo(imgRef.current,
      { scale: 0.94, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.4, ease: 'power3.out' }
    )
  }, [])

  /* Animate image swap on nav */
  useEffect(() => {
    if (!imgRef.current) return
    gsap.fromTo(imgRef.current,
      { opacity: 0, x: 20 },
      { opacity: 1, x: 0, duration: 0.3, ease: 'power2.out' }
    )
  }, [index])

  /* Keyboard navigation */
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNav(1)
      if (e.key === 'ArrowLeft')  onNav(-1)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose, onNav])

  /* Fase 2 — browser fullscreen */
  const enterFullscreen = () => {
    const el = imgRef.current
    if (!el) return
    if (el.requestFullscreen)            el.requestFullscreen()
    else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen()
  }

  const btnBase = {
    border: 'none', cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    transition: 'all 0.2s',
    fontFamily: 'Inter, sans-serif',
  }

  return (
    /* Backdrop */
    <div
      ref={lightboxRef}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(0,0,0,0.88)',
        backdropFilter: 'blur(6px)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: 'clamp(1.5rem, 5vw, 4rem)',
        gap: '1rem',
      }}
    >
      {/* ── TOP BAR ── */}
      <div style={{
        width: '100%', maxWidth: 1100,
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between',
        flexShrink: 0,
      }}>
        {/* Caption + counter */}
        <div>
          <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(93,224,230,0.8)', margin: '0 0 0.2rem 0' }}>
            {img.caption}
          </p>
          <p style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', margin: 0, letterSpacing: '0.1em' }}>
            {String(index + 1).padStart(2,'0')} / {String(images.length).padStart(2,'0')}
          </p>
        </div>

        {/* Right: fullscreen + close */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {/* Fullscreen button */}
          <button
            onClick={enterFullscreen}
            title="Full Screen"
            style={{
              ...btnBase,
              width: 40, height: 40,
              borderRadius: '8px',
              background: 'rgba(255,255,255,0.08)',
              color: 'rgba(255,255,255,0.7)',
              fontSize: '0.9rem',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #5de0e6, #004aad)'
              e.currentTarget.style.color = '#fff'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
              e.currentTarget.style.color = 'rgba(255,255,255,0.7)'
            }}
          >
            ⛶
          </button>

          {/* Close button */}
          <button
            onClick={onClose}
            title="Close (Esc)"
            style={{
              ...btnBase,
              width: 40, height: 40,
              borderRadius: '8px',
              background: 'rgba(255,255,255,0.08)',
              color: 'rgba(255,255,255,0.7)',
              fontSize: '1.1rem',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(255,60,60,0.5)'
              e.currentTarget.style.color = '#fff'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
              e.currentTarget.style.color = 'rgba(255,255,255,0.7)'
            }}
          >
            ✕
          </button>
        </div>
      </div>

      {/* ── IMAGE + SIDE ARROWS ── */}
      <div style={{
        position: 'relative',
        width: '100%', maxWidth: 1100,
        display: 'flex', alignItems: 'center',
        gap: '0.75rem', flexShrink: 1,
      }}>
        {/* Prev */}
        <button
          onClick={() => onNav(-1)}
          style={{
            ...btnBase,
            flexShrink: 0,
            width: 44, height: 44,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.08)',
            border: '1.5px solid rgba(255,255,255,0.15)',
            color: '#fff', fontSize: '1.3rem',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'linear-gradient(135deg, #5de0e6, #004aad)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
        >‹</button>

        {/* Image */}
        <div style={{
          flex: 1,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(255,255,255,0.03)',
          borderRadius: '10px',
          overflow: 'hidden',
          minHeight: 0,
        }}>
          <img
            ref={imgRef}
            src={img.src}
            alt={img.caption}
            style={{
              maxWidth: '100%',
              maxHeight: '65vh',
              width: 'auto',
              height: 'auto',
              display: 'block',
              borderRadius: '8px',
              objectFit: 'contain',   /* foto tampil penuh — white space dari rasio foto */
            }}
          />
        </div>

        {/* Next */}
        <button
          onClick={() => onNav(1)}
          style={{
            ...btnBase,
            flexShrink: 0,
            width: 44, height: 44,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.08)',
            border: '1.5px solid rgba(255,255,255,0.15)',
            color: '#fff', fontSize: '1.3rem',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'linear-gradient(135deg, #5de0e6, #004aad)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
        >›</button>
      </div>

      {/* ── THUMBNAIL STRIP (dalam lightbox) ── */}
      <div style={{
        width: '100%', maxWidth: 1100,
        display: 'flex', gap: '4px',
        overflowX: 'auto',
        flexShrink: 0,
        scrollbarWidth: 'none',
        paddingBottom: '2px',
      }}>
        {images.map((im, i) => (
          <button
            key={im.id}
            onClick={() => onNav(i - index)}
            style={{
              flexShrink: 0,
              width: 'clamp(60px, 8vw, 100px)',
              aspectRatio: '16/9',
              padding: 0, border: 'none',
              cursor: 'pointer',
              borderRadius: '5px',
              overflow: 'hidden',
              outline: 'none',
              boxShadow: index === i ? 'inset 0 0 0 2px #5de0e6' : 'none',
              transition: 'box-shadow 0.2s',
              background: '#111',
              flexShrink: 0,
            }}
          >
            <img
              src={im.src}
              alt={im.caption}
              draggable={false}
              style={{
                width: '100%', height: '100%',
                objectFit: 'cover', display: 'block',
                opacity: index === i ? 1 : 0.4,
                transition: 'opacity 0.25s',
              }}
            />
          </button>
        ))}
      </div>

    </div>
  )
}

/* ── CAROUSEL ───────────────────────────────────────────────────── */
function Carousel() {
  const [current, setCurrent]     = useState(0)
  const [lightboxIdx, setLightboxIdx] = useState(null)   // null = closed
  const trackRef   = useRef(null)
  const thumbsRef  = useRef(null)
  const timerRef   = useRef(null)
  const currentRef = useRef(0)
  const total      = carouselImages.length

  useEffect(() => { currentRef.current = current }, [current])

  const goTo = useCallback((idx) => {
    const next = ((idx % total) + total) % total
    setCurrent(next)
    currentRef.current = next
    if (thumbsRef.current) {
      const tw = thumbsRef.current.scrollWidth / total
      thumbsRef.current.scrollTo({
        left: next * tw - thumbsRef.current.clientWidth / 2 + tw / 2,
        behavior: 'smooth',
      })
    }
  }, [total])

  const resetTimer = useCallback(() => {
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => goTo(currentRef.current + 1), 5000)
  }, [goTo])

  useEffect(() => {
    resetTimer()
    return () => clearInterval(timerRef.current)
  }, [resetTimer])

  /* Pause auto-advance when lightbox is open */
  useEffect(() => {
    if (lightboxIdx !== null) clearInterval(timerRef.current)
    else resetTimer()
  }, [lightboxIdx, resetTimer])

  useEffect(() => {
    if (!trackRef.current) return
    gsap.to(trackRef.current, {
  x: `-${current * (100 / total)}%`,
  duration: 0.75,
  ease: 'power3.inOut',
})
  }, [current])

  /* Lightbox nav */
  const lightboxNav = useCallback((delta) => {
    setLightboxIdx(prev => {
      if (prev === null) return null
      return ((prev + delta) % total + total) % total
    })
  }, [total])

  return (
    <>
      {/* Lightbox portal */}
      {lightboxIdx !== null && (
        <Lightbox
          images={carouselImages}
          index={lightboxIdx}
          onClose={() => setLightboxIdx(null)}
          onNav={lightboxNav}
        />
      )}

      <div style={{ background: '#0a0a0a', userSelect: 'none' }}>

        {/* ── MAIN IMAGE ── */}
        <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
          <div
            ref={trackRef}
            style={{ display: 'flex', width: `${total * 100}%` }}
          >
            {carouselImages.map((img, i) => (
              <div
                key={img.id}
                onClick={() => { clearInterval(timerRef.current); setLightboxIdx(i) }}
                style={{
                  width: `${100 / total}%`,
                  flexShrink: 0,
                  position: 'relative',
                  aspectRatio: '16/7',
                  cursor: 'zoom-in',
                }}
              >
                <img
                  src={img.src}
                  alt={img.caption}
                  draggable={false}
                  style={{
                    position: 'absolute', inset: 0,
                    width: '100%', height: '100%',
                    objectFit: 'cover', pointerEvents: 'none',
                  }}
                />
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  height: '45%',
                  background: 'linear-gradient(0deg, rgba(0,0,0,0.65) 0%, transparent 100%)',
                  pointerEvents: 'none',
                }} />
                {img.caption && (
                  <p style={{
                    position: 'absolute', bottom: '1.25rem', left: '2rem',
                    fontSize: '0.7rem', fontWeight: 500,
                    letterSpacing: '0.12em', textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.55)',
                    margin: 0, pointerEvents: 'none',
                  }}>
                    {img.caption}
                  </p>
                )}
                <p style={{
                  position: 'absolute', top: '1.25rem', right: '1.5rem',
                  fontSize: '0.65rem', fontWeight: 600,
                  color: 'rgba(255,255,255,0.35)',
                  letterSpacing: '0.1em', margin: 0, pointerEvents: 'none',
                }}>
                  {String(i + 1).padStart(2,'0')} / {String(total).padStart(2,'0')}
                </p>

                {/* Zoom hint overlay */}
                <div style={{
                  position: 'absolute', inset: 0, zIndex: 2,
                  background: 'rgba(93,224,230,0.08)',
                  opacity: 0, transition: 'opacity 0.25s',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  pointerEvents: 'none',
                }}
                  ref={el => {
                    if (!el) return
                    const parent = el.parentElement
                    parent.addEventListener('mouseenter', () => el.style.opacity = '1')
                    parent.addEventListener('mouseleave', () => el.style.opacity = '0')
                  }}
                >
                  <div style={{
                    background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)',
                    borderRadius: '999px', padding: '0.5rem 1.25rem',
                    fontSize: '0.7rem', fontWeight: 600,
                    letterSpacing: '0.12em', textTransform: 'uppercase',
                    color: '#fff', display: 'flex', alignItems: 'center', gap: '0.4rem',
                  }}>
                    <span>🔍</span> Click to preview
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Prev / Next arrows */}
          {[
            { dir: -1, label: '‹', side: 'left' },
            { dir:  1, label: '›', side: 'right' },
          ].map(({ dir, label, side }) => (
            <button
              key={side}
              onClick={() => { goTo(current + dir); resetTimer() }}
              style={{
                position: 'absolute',
                top: '50%', [side]: '1.25rem',
                transform: 'translateY(-50%)',
                zIndex: 5,
                width: 44, height: 44,
                borderRadius: '50%',
                border: '1.5px solid rgba(255,255,255,0.2)',
                background: 'rgba(0,0,0,0.4)',
                backdropFilter: 'blur(8px)',
                color: '#fff',
                fontSize: '1.4rem', lineHeight: 1,
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #5de0e6, #004aad)'
                e.currentTarget.style.borderColor = 'transparent'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(0,0,0,0.4)'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* ── THUMBNAIL STRIP ── */}
        <div
          ref={thumbsRef}
          style={{
            display: 'flex', gap: '3px',
            overflowX: 'auto', padding: '3px',
            background: '#ffffff',
            scrollbarWidth: 'none',
          }}
        >
          <style>{`.thumb-strip::-webkit-scrollbar{display:none}`}</style>
          {carouselImages.map((img, i) => (
            <button
              key={img.id}
              onClick={() => { goTo(i); resetTimer() }}
              style={{
                flexShrink: 0,
                width: 'clamp(80px, 10vw, 130px)',
                aspectRatio: '16/9',
                padding: 0, border: 'none',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                outline: 'none',
                boxShadow: current === i ? 'inset 0 0 0 2.5px #5de0e6' : 'none',
                transition: 'box-shadow 0.25s ease',
                background: '#111',
              }}
            >
              <img
                src={img.src}
                alt={img.caption}
                draggable={false}
                style={{
                  width: '100%', height: '100%',
                  objectFit: 'cover',
                  opacity: current === i ? 1 : 0.45,
                  transition: 'opacity 0.3s ease',
                  display: 'block',
                }}
              />
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                height: 3,
                background: 'linear-gradient(90deg, #5de0e6, #004aad)',
                transform: current === i ? 'scaleX(1)' : 'scaleX(0)',
                transformOrigin: 'left',
                transition: 'transform 0.35s ease',
              }} />
            </button>
          ))}
        </div>

      </div>
    </>
  )
}

/* ── PAGE ───────────────────────────────────────────────────────── */
export default function VideoProductionPage() {
  const heroRef     = useRef(null)
  const heroTextRef = useRef(null)
  const overlayRef  = useRef(null)
  const descRef     = useRef(null)
  const servicesRef = useRef(null)

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

  /* Desc section reveal */
  useEffect(() => {
    if (!descRef.current) return
    const items = descRef.current.querySelectorAll('.reveal')
    gsap.set(items, { opacity: 0, y: 30 })
    ScrollTrigger.create({
      trigger: descRef.current,
      start: 'top 78%',
      onEnter: () => gsap.to(items, { opacity: 1, y: 0, duration: 0.75, stagger: 0.1, ease: 'power3.out' }),
    })
  }, [])

  /* Service cards reveal */
  useEffect(() => {
    if (!servicesRef.current) return
    const cards = servicesRef.current.querySelectorAll('.service-card')
    gsap.set(cards, { opacity: 0, y: 28 })
    ScrollTrigger.create({
      trigger: servicesRef.current,
      start: 'top 80%',
      onEnter: () => gsap.to(cards, { opacity: 1, y: 0, duration: 0.65, stagger: 0.08, ease: 'power3.out' }),
    })
  }, [])

  return (
    <>
      <Navbar />

      <main>

        {/* ── HERO ──────────────────────────────────────────────── */}
        <section ref={heroRef} style={{
          position: 'relative', width: '100%',
          height: '100vh', minHeight: 560,
          background: '#ffffff', overflow: 'hidden',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {/*
            VIDEO SLOT — uncomment saat showreel siap:
            <video autoPlay muted loop playsInline
              style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', zIndex:0 }}>
              <source src="/videos/showreel.mp4" type="video/mp4" />
            </video>
          */}

          {/* BG placeholder */}
          <div style={{
            position: 'absolute', inset: 0, zIndex: 0,
            background: '#ffffff',
            backgroundImage: `
              radial-gradient(circle at 20% 55%, rgba(93,224,230,0.06) 0%, transparent 45%),
              radial-gradient(circle at 80% 30%, rgba(0,74,173,0.09) 0%, transparent 45%)
            `,
          }} />

          {/* Curtain */}
          <div ref={overlayRef} style={{
            position: 'absolute', inset: 0, zIndex: 10,
            background: 'linear-gradient(135deg, #5de0e6, #004aad)',
            transformOrigin: 'top', pointerEvents: 'none',
          }} />

          {/* Hero text */}
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
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
              >Creaut Bali</Link>
              <span style={{ color: 'rgba(0, 0, 0, 0.2)' }}>·</span>
              <span style={{ fontSize: '0.72rem', color: 'rgba(0, 0, 0, 0.4)', letterSpacing: '0.1em' }}>Services</span>
              <span style={{ color: 'rgba(0, 0, 0, 0.2)' }}>·</span>
              <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#5de0e6', letterSpacing: '0.1em' }}>Video Production</span>
            </div>

            {/* Label */}
            <div className="hero-line" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: 28, height: 2, borderRadius: 2, background: 'linear-gradient(90deg, #5de0e6, #004aad)' }} />
              <span style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(0, 0, 0, 0.4)' }}>
                Commercial · Corporate · Documentary
              </span>
              <div style={{ width: 28, height: 2, borderRadius: 2, background: 'linear-gradient(90deg, #004aad, #5de0e6)' }} />
            </div>

            {/* Heading */}
            <h1 className="hero-line" style={{
              fontWeight: 800,
              fontSize: 'clamp(3.5rem, 10vw, 9rem)',
              color: '#000000',
              letterSpacing: '-0.04em',
              lineHeight: 0.9,
              margin: 0,
            }}>
              Video<br />
              <span style={{
                background: 'linear-gradient(90deg, #5de0e6, #004aad)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>
                Production
              </span>
            </h1>

            {/* CTA */}
            <div className="hero-line" style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <a href="#carousel" style={{
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
                See Our Work ↓
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
                Get a Quote ↗
              </a>
            </div>
          </div>

          {/* Scroll hint */}
          <div style={{ position: 'absolute', bottom: '2.5rem', left: '50%', transform: 'translateX(-50%)', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(0, 0, 0, 0.25)' }}>Scroll</span>
            <div style={{ width: 1, height: 40, background: 'linear-gradient(180deg, rgba(93,224,230,0.6), transparent)', borderRadius: 1 }} />
          </div>
        </section>

        {/* ── CAROUSEL — BTS & Alur Produksi ────────────────────── */}
        <div id="carousel">
          <Carousel />
        </div>

        {/* ── DESCRIPTION ───────────────────────────────────────── */}
        <section ref={descRef} style={{
          background: '#fff',
          padding: 'clamp(4rem, 8vw, 7rem) clamp(1.75rem, 5vw, 5rem)',
          borderBottom: '1px solid rgba(0,0,0,0.07)',
        }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem', alignItems: 'center' }}>

            {/* Left — main copy */}
            <div>
              <div className="reveal" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{ width: 28, height: 2, borderRadius: 2, background: 'linear-gradient(90deg, #5de0e6, #004aad)' }} />
                <span style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#004aad' }}>
                  What We Do
                </span>
              </div>
              <h2 className="reveal" style={{ fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3.2rem)', color: '#0a0a0a', letterSpacing: '-0.04em', lineHeight: 1.05, margin: '0 0 1.5rem 0' }}>
                Full-service<br />Video Production
              </h2>
              <p className="reveal" style={{ fontSize: '1rem', color: 'rgba(0,0,0,0.55)', lineHeight: 1.85, margin: '0 0 1rem 0', maxWidth: 480 }}>
                We cover all areas of video production to capture compelling footage and produce the full breadth of content types.
              </p>
              <p className="reveal" style={{ fontSize: '1rem', color: 'rgba(0,0,0,0.55)', lineHeight: 1.85, margin: '0 0 2rem 0', maxWidth: 480 }}>
                From promotional films, product demos, branded content, to training & educational films and a whole lot more.
              </p>
              <p className="reveal" style={{ fontSize: '0.9rem', color: 'rgba(0,0,0,0.4)', lineHeight: 1.8, maxWidth: 480 }}>
                Our services include filming, drones, editing, motion graphics, kit hire, studio, visual effects, sound design, color grading and more.
              </p>
            </div>

            {/* Right — capability tags */}
            <div className="reveal">
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                {[
                  'Filming', 'Drone', 'Editing',
                  'Motion Graphics', 'Color Grading', 'Sound Design',
                  'Visual Effects', 'Studio', 'Kit Hire',
                  'Script Writing', 'Storyboard', 'Direction',
                ].map(tag => (
                  <span key={tag} style={{
                    padding: '0.45rem 1rem',
                    borderRadius: '999px',
                    border: '1.5px solid rgba(0,0,0,0.1)',
                    fontSize: '0.78rem', fontWeight: 600,
                    color: '#555',
                    background: '#f8f8f8',
                    transition: 'all 0.2s',
                    cursor: 'default',
                  }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = 'linear-gradient(90deg, #5de0e6, #004aad)'
                      e.currentTarget.style.color = '#fff'
                      e.currentTarget.style.borderColor = 'transparent'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = '#f8f8f8'
                      e.currentTarget.style.color = '#555'
                      e.currentTarget.style.borderColor = 'rgba(0,0,0,0.1)'
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* ── SERVICE TYPES GRID ────────────────────────────────── */}
        <section ref={servicesRef} style={{
          background: '#fff',
          padding: 'clamp(4rem, 7vw, 6rem) clamp(1.75rem, 5vw, 5rem)',
        }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>

            {/* Header */}
            <div style={{ marginBottom: '3rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <div style={{ width: 28, height: 2, borderRadius: 2, background: 'linear-gradient(90deg, #5de0e6, #004aad)' }} />
                <span style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#004aad' }}>
                  Service Types
                </span>
              </div>
              <h2 style={{ fontWeight: 700, fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', color: '#0a0a0a', letterSpacing: '-0.04em', margin: 0 }}>
                What We Produce
              </h2>
            </div>

            {/* Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1px',
              // background: 'rgba(0,0,0,0.07)',
              // border: '1px solid rgba(0,0,0,0.07)',
              borderRadius: '12px',
              overflow: 'hidden',
            }}>
              {serviceTypes.map((s, i) => (
                <ServiceTypeCard key={s.title} service={s} index={i} />
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
              Ready to create?
            </p>
            <h3 style={{ fontWeight: 800, fontSize: 'clamp(1.6rem, 3.5vw, 3rem)', color: '#000000', letterSpacing: '-0.04em', lineHeight: 1.05, margin: 0 }}>
              Let's make your{' '}
              <span style={{ background: 'linear-gradient(90deg, #5de0e6, #004aad)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                vision real.
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
              Contact Us ↗
            </a>
            <Link href="../" style={{
              padding: '0.9rem 2.25rem', background: 'transparent',
              border: '1.5px solid rgba(0, 0, 0, 0.15)',
              color: 'rgba(0, 0, 0, 0.7)', textDecoration: 'none',
              fontSize: '0.875rem', fontWeight: 600, borderRadius: '8px',
              transition: 'border-color 0.2s, color 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#5de0e6'; e.currentTarget.style.color = '#5de0e6' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.15)'; e.currentTarget.style.color = 'rgba(0, 0, 0, 0.7)' }}
            >
              ← Back to Services
            </Link>
          </div>
        </section>

      </main>

      <Footer />
    </>
  )
}

/* ── SERVICE TYPE CARD ──────────────────────────────────────────── */
function ServiceTypeCard({ service, index }) {
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
        // opacity: hovered ? 1 : 0.3,
        // transition: 'opacity 0.3s',
      }}>
        {String(index + 1).padStart(2, '0')}
      </div>
      <h4 style={{ fontWeight: 700, fontSize: '1.05rem', color: '#0a0a0a', letterSpacing: '-0.02em', marginBottom: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
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
        transformOrigin: 'left',
        transition: 'transform 0.4s ease',
      }} />
    </div>
  )
}