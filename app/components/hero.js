'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Hero() {
  const logoRef = useRef(null)
  const overlayRef = useRef(null)
  const scrollRef = useRef(null)
  const taglineRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.fromTo(overlayRef.current,
        { opacity: 1 },
        { opacity: 0, duration: 1.6, ease: 'power2.inOut' }
      )
      .fromTo(logoRef.current,
        { opacity: 0, scale: 0.92 },
        { opacity: 1, scale: 1, duration: 1.1 },
        '-=0.8'
      )
      .fromTo(taglineRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.5'
      )
      .fromTo(scrollRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        '-=0.2'
      )

      // Scroll indicator bounce
      gsap.to(scrollRef.current, {
        y: 6,
        repeat: -1,
        yoyo: true,
        duration: 1.3,
        ease: 'sine.inOut',
        delay: 2,
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section style={{
      position: 'relative',
      width: '100%',
      height: '100vh',
      minHeight: 560,
      overflow: 'hidden',
      background: '#ffffff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>

      {/* ── VIDEO SLOT ──────────────────────────────────────────────────
           Ganti src dengan path video kamu, misal: /showreel.mp4
           Atau embed YouTube/Vimeo via iframe di sini.
      ─────────────────────────────────────────────────────────────── */}
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
          /* Ganti src saat video sudah siap */
        }}
      >
        {/* <source src="/showreel.mp4" type="video/mp4" /> */}
      </video>

      {/* Dark overlay – gradient bawah lebih gelap untuk teks */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at center, rgba(93,224,230,0.07) 0%, rgba(0,74,173,0.04) 45%, transparent 70%)',
        zIndex: 1,
      }} />

      {/* Curtain intro */}
      <div ref={overlayRef} style={{
        position: 'absolute',
        inset: 0,
        background: '#000',
        zIndex: 10,
        pointerEvents: 'none',
      }} />

      {/* ── CENTER CONTENT ─────────────────────────────────────────── */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        gap: '1.25rem',
        padding: '0 1.5rem',
      }}>
        {/* Logo / Brand name */}
        <div ref={logoRef}>
          <h1 style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(2.8rem, 7vw, 6.5rem)',
            color: '#000000',
            letterSpacing: '-0.04em',
            lineHeight: 1,
            margin: 0,
          }}>
            Creaut{' '}
            <span style={{
              background: 'linear-gradient(90deg, #5de0e6, #004aad)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Bali
            </span>
          </h1>
        </div>

        {/* Tagline */}
        <p ref={taglineRef} style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 400,
          fontSize: 'clamp(0.85rem, 1.4vw, 1.05rem)',
          color: 'rgba(0, 0, 0, 0.72)',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          margin: 0,
        }}>
          Creative Agency · Bali, Indonesia
        </p>

        {/* Gradient divider */}
        <div style={{
          width: 48,
          height: 2,
          borderRadius: 2,
          background: 'linear-gradient(90deg, #5de0e6, #004aad)',
        }} />
      </div>

      {/* ── SCROLL INDICATOR (bottom center) ──────────────────────── */}
      <div ref={scrollRef} style={{
        position: 'absolute',
        bottom: '2.25rem',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem',
      }}>
        <span style={{
          fontSize: '0.62rem',
          fontWeight: 500,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'rgba(0, 0, 0, 0.5)',
          fontFamily: 'Inter, sans-serif',
        }}>
          Scroll
        </span>
        {/* Animated line */}
        <div style={{
          width: 1,
          height: 36,
          background: 'linear-gradient(90deg, #5de0e6, #004aad)',
          borderRadius: 1,
        }} />
      </div>

      {/* ── BOTTOM-LEFT: showreel label ───────────────────────────── */}
      <div style={{
        position: 'absolute',
        bottom: '2.25rem',
        left: '2.5rem',
        zIndex: 2,
        display: 'flex',
        alignItems: 'center',
        gap: '0.6rem',
      }}>
        <div style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: '#5de0e6',
          boxShadow: '0 0 8px #5de0e6',
          animation: 'pulse 2s ease-in-out infinite',
        }} />
        <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
        <span style={{
          fontSize: '0.68rem',
          fontWeight: 500,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'rgba(0, 0, 0, 0.55)',
          fontFamily: 'Inter, sans-serif',
        }}>
          Showreel 2025
        </span>
      </div>

      {/* ── BOTTOM-RIGHT: mute hint ────────────────────────────────── */}
      <div style={{
        position: 'absolute',
        bottom: '2.25rem',
        right: '2.5rem',
        zIndex: 2,
      }}>
        <span style={{
          fontSize: '0.68rem',
          fontWeight: 500,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'rgba(0, 0, 0, 0.4)',
          fontFamily: 'Inter, sans-serif',
        }}>
          🔇 Muted
        </span>
      </div>
    </section>
  )
}