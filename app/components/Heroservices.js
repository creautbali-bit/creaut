'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

// ─────────────────────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────────────────────

const services = [
  {
    id:    1,
    title: 'Video Production',
    sub:   'Commercial · Corporate · Documentary',
    href:  '/services/video-production',
    gif:   '/image/vdgp.gif',
  },
  {
    id:    2,
    title: 'Social Media Management',
    sub:   'Strategy · Content · Community',
    href:  '/services/social-media-management',
    gif:   '/image/smm.gif',
  },
  {
    id:    3,
    title: 'Visual Photography',
    sub:   'Editorial · Product · Lifestyle',
    href:  '/services/visual-photography',
    gif:   '/image/ptgp.gif',
  },
  {
    id:    4,
    title: 'Branding',
    sub:   'Identity · Logo · Guidelines',
    href:  '/services/branding',
    gif:   '/image/bd.gif',
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// ServiceCard — hover logic via GSAP
// ─────────────────────────────────────────────────────────────────────────────

function ServiceCard({ service }) {
  const plusRef    = useRef(null)
  const titleRef   = useRef(null)
  const overlayRef = useRef(null)
  const thumbRef   = useRef(null)
  const [hovered, setHovered] = useState(false)

  const onEnter = () => {
    setHovered(true)
    gsap.to(thumbRef.current,   { scale: 1.06, duration: 0.6,  ease: 'power2.out'   })
    gsap.to(overlayRef.current, { opacity: 1,  duration: 0.45, ease: 'power2.out'   })
    gsap.to(titleRef.current,   { y: -5,       duration: 0.35, ease: 'power2.out'   })
    gsap.to(plusRef.current,    { rotate: 45,  scale: 1.1, duration: 0.35, ease: 'power2.out' })
  }

  const onLeave = () => {
    setHovered(false)
    gsap.to(thumbRef.current,   { scale: 1,   duration: 0.5,  ease: 'power2.inOut' })
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.4,  ease: 'power2.inOut' })
    gsap.to(titleRef.current,   { y: 0,       duration: 0.35, ease: 'power2.inOut' })
    gsap.to(plusRef.current,    { rotate: 0,  scale: 1, duration: 0.35, ease: 'power2.inOut' })
  }

  return (
    <a
      href={service.href}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        display:        'block',
        position:       'relative',
        width:          '100%',
        height:         '100%',
        overflow:       'hidden',
        background:     '#0a0a0a',
        textDecoration: 'none',
        cursor:         'pointer',
      }}
    >
      <div ref={thumbRef} style={{ position: 'absolute', inset: 0, zIndex: 0, willChange: 'transform' }}>
        <img
          src={service.gif}
          alt={service.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </div>

      <div
        ref={overlayRef}
        style={{
          position: 'absolute', inset: 0, zIndex: 1,
          opacity: 0, willChange: 'opacity',
          background: 'linear-gradient(135deg, rgba(93,224,230,0.18) 0%, rgba(0,74,173,0.32) 100%)',
        }}
      />

      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '100%',
        zIndex: 2, pointerEvents: 'none',
        background: 'linear-gradient(to top, rgba(0,0,0,0.78) 0%, transparent 100%)',
      }} />

      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '1.4rem 1.75rem',
        display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
        zIndex: 4,
      }}>
        <div ref={titleRef} style={{ flex: 1, willChange: 'transform' }}>
          <p style={{
            fontFamily: 'Inter, sans-serif', fontSize: '0.62rem', fontWeight: 500,
            letterSpacing: '0.15em', textTransform: 'uppercase', margin: '0 0 0.28rem',
            transition: 'color 0.3s ease',
            color: hovered ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.55)',
          }}>
            {service.sub}
          </p>
          <h3 style={{
            fontFamily: 'Inter, sans-serif', fontWeight: 700,
            fontSize: 'clamp(1.05rem, 2.2vw, 2.4rem)',
            color: '#ffffff', letterSpacing: '-0.025em', lineHeight: 1.1, margin: 0,
          }}>
            {service.title}
          </h3>
        </div>

        <div
          ref={plusRef}
          style={{
            width: 48, height: 48, borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0, marginLeft: '1rem', willChange: 'transform',
            backdropFilter: 'blur(8px)',
            transition: 'background 0.35s ease, box-shadow 0.35s ease',
            background: hovered
              ? 'linear-gradient(135deg, #5de0e6, #004aad)'
              : 'rgba(255,255,255,0.10)',
            boxShadow: hovered
              ? '0 0 28px rgba(93,224,230,0.55), 0 0 8px rgba(0,74,173,0.4)'
              : 'inset 0 0 0 1.5px rgba(255,255,255,0.35)',
          }}
        >
          <span style={{
            color: '#ffffff', fontSize: '1.5rem', lineHeight: 1,
            fontWeight: 300, userSelect: 'none', display: 'block', marginTop: '-2px',
          }}>+</span>
        </div>
      </div>

      <div style={{
        position: 'absolute', top: '1.25rem', right: '1.5rem', zIndex: 4,
        fontFamily: 'Inter, sans-serif', fontSize: '0.62rem', fontWeight: 600,
        letterSpacing: '0.12em', transition: 'color 0.3s ease',
        color: hovered ? 'rgba(93,224,230,0.8)' : 'rgba(255,255,255,0.3)',
      }}>
        0{service.id}
      </div>
    </a>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// HeroServices — Pinned Section Kombinasi dengan Lenis
// ─────────────────────────────────────────────────────────────────────────────

export default function HeroServices() {
  const containerRef    = useRef(null)
  const curtainRef      = useRef(null)
  const heroBgRef       = useRef(null)
  const heroContentRef  = useRef(null)
  const cardWrappers    = useRef([null, null, null, null])

  useEffect(() => {
    // ── 0. Initialize Lenis & Sync with GSAP ──
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      smoothWheel: true,
    })

    lenis.on('scroll', ScrollTrigger.update)

    const updateLenis = (time) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(updateLenis)
    gsap.ticker.lagSmoothing(0)

    // ── 1. GSAP Context ──
    const ctx = gsap.context(() => {
      // ── Intro animation ──
      const itl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      itl
        .fromTo(curtainRef.current,
          { opacity: 1 },
          { opacity: 0, duration: 1.5, ease: 'power2.inOut' }
        )
        .fromTo(heroContentRef.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 1.2 },
          '-=0.85'
        )
        .to(cardWrappers.current, {
          opacity: 1,
          stagger: 0.08,
          duration: 0.6,
          ease: 'power2.out',
        }, '-=0.4')

      // ── Scroll animation ──
      const mm = gsap.matchMedia()

      // ── DESKTOP (≥ 768 px) ─────────────────────────────────
      mm.add('(min-width: 768px)', () => {
        const el = containerRef.current
        const W  = el.offsetWidth
        const H  = el.offsetHeight
        const HG = 16   // gap antar kartu

        // Margin fix persis mengikuti letak elemen hero
        const marginX = W * 0.04
        const marginY = H * 0.04 

        const maxGridW = W - (marginX * 2)
        const maxGridH = H - (marginY * 2)

        const cardW = (maxGridW - HG) / 2
        const cardH = (maxGridH - HG) / 2

        const startX = marginX
        const startY = marginY

        const stackW = 700
        const stackH = 400
        const SL = (W - stackW) / 2
        const ST = H - stackH - (W * 0.03)

        const STACKS = [
          { dx:  0,  dy:  0,  rot:  1.5, z: 4, sh: '0 20px 40px rgba(0,0,0,0.55)' },
          { dx: -10, dy:  8,  rot: -3.0, z: 3, sh: '0 15px 30px rgba(0,0,0,0.45)' },
          { dx:  15, dy:  15, rot:  4.5, z: 2, sh: '0 10px 20px rgba(0,0,0,0.38)' },
          { dx: -6,  dy:  22, rot: -1.5, z: 1, sh: '0 5px 15px rgba(0,0,0,0.30)' },
        ]

        const FINALS = [
          { x: startX,              y: startY              },  // Top-Left
          { x: startX + cardW + HG, y: startY              },  // Top-Right
          { x: startX,              y: startY + cardH + HG },  // Bottom-Left
          { x: startX + cardW + HG, y: startY + cardH + HG },  // Bottom-Right
        ]

        STACKS.forEach((s, i) => {
          gsap.set(cardWrappers.current[i], {
            position:        'absolute',
            left:            SL + s.dx,
            top:             ST + s.dy,
            width:           stackW,
            height:          stackH,
            rotation:        s.rot,
            zIndex:          s.z,
            opacity:         0, 
            transformOrigin: 'center center',
            boxShadow:       s.sh,
          })
        })

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger:       containerRef.current,
            start:         'top top',
            end:           '+=200%',  
            pin:           true,
            scrub:         1.2,
            anticipatePin: 1,
          },
        })

        tl.to([heroBgRef.current, heroContentRef.current], {
          y: -H * 1.15, 
          duration: 0.8,
          ease: 'power2.inOut',
        }, 0)

        FINALS.forEach((f, i) => {
          tl.to(cardWrappers.current[i], {
            left:      f.x,
            top:       f.y,
            width:     cardW,
            height:    cardH,
            rotation:  0,
            boxShadow: 'none',
            zIndex:    i + 1,
            duration:  0.8,
            ease:      'power2.inOut',
          }, i * 0.06) 
        })
      })

      // ── MOBILE (< 768 px) ────────────────────────────────────
      mm.add('(max-width: 767px)', () => {
        cardWrappers.current.forEach(el => {
          if (el) gsap.set(el, { clearProps: 'all' })
        })
      })
    })

    return () => {
      // ── Cleanup ──
      ctx.revert()
      gsap.ticker.remove(updateLenis)
      lenis.destroy()
    }
  }, [])

  // ─── JSX ───────────────────────────────────────────────────────────────────
  return (
    <div className="relative w-full">
      <style>{`
        @keyframes hs-pulse { 0%, 100% { opacity: 1 } 50% { opacity: 0.38 } }

        .hs-nav-link {
          font-family: 'Inter', sans-serif;
          font-size:   0.78rem;
          font-weight: 600;
          color:       #000000;
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          transition: color 0.3s ease;
        }
        .hs-nav-link:hover { color: #004aad; }

        .hs-mob-grid { display: none; }

        /* ── Mobile overrides ─────────────────────────────── */
        @media (max-width: 767px) {
          .hs-hero-services-wrapper { height: 100svh !important; min-height: 100svh; }
          .hs-giant-text  { font-size: 22vw !important; }
          .hs-left-label  { display: none !important; }
          .hs-right-nav   { display: none !important; }

          .hs-card-desktop { display: none !important; }

          .hs-mob-grid {
            display:               grid    !important;
            grid-template-columns: 1fr;
            gap:                   12px;
            padding:               12px;
            background:            #0a0a0a;
          }
          /* Versi HP dipertahankan 1:1 */
          .hs-mob-card { 
            width: 100%; 
            aspect-ratio: 1 / 1; 
            overflow: hidden; 
          }
        }
      `}</style>

      <section
        ref={containerRef}
        className="hs-hero-services-wrapper"
        style={{
          position:   'relative',
          width:      '100%',
          height:     '100vh',
          overflow:   'hidden',
          background: '#ffff', 
        }}
      >
        <div ref={heroBgRef} style={{ position: 'absolute', inset: 0, zIndex: 1, background: '#ffffff', willChange: 'transform' }}>
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'radial-gradient(ellipse at center, rgba(93,224,230,0.06) 0%, rgba(0,74,173,0.03) 45%, transparent 70%)',
          }} />
        </div>

        <div
          ref={curtainRef}
          style={{
            position: 'absolute', inset: 0,
            background: '#000000', zIndex: 30, pointerEvents: 'none',
          }}
        />

        <div ref={heroContentRef} style={{ position: 'absolute', inset: 0, zIndex: 5, willChange: 'transform' }}>
          
          <h1
            className="hs-giant-text"
            style={{
              position:      'absolute',
              top:           '5vh',
              left:          '50%',
              transform:     'translateX(-50%)',
              fontFamily:    'Inter, sans-serif',
              fontWeight:    800,
              fontSize:      '21vw',
              letterSpacing: '-0.06em',
              color:         '#000000',
              lineHeight:    0.85,
              margin:        0,
              whiteSpace:    'nowrap',
              pointerEvents: 'none',
              userSelect:    'none',
            }}
          >
            <span
            style={{
                background: 'linear-gradient(to right, #5de0e6, #004aad)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                color: 'transparent',
                padding: '0.05em', 
                display: 'inline-block' 
            }}
            >
            C
            </span>
            REAUT
          </h1>

          <div
            className="hs-left-label"
            style={{ position: 'absolute', left: '4vw', top: '50%', transform: 'translateY(-50%)' }}
          >
            <p style={{
              fontFamily: 'Inter, sans-serif', fontWeight: 700,
              fontSize: '0.82rem', letterSpacing: '0.07em',
              color: '#000', margin: 0, textTransform: 'uppercase',
            }}>
              BALI, INDONESIA
            </p>
            <div style={{
              width: 28, height: 2, borderRadius: 2, marginTop: '0.5rem',
              background: 'linear-gradient(90deg, #5de0e6, #004aad)',
            }} />
          </div>

          <div style={{ position: 'absolute', left: '4vw', bottom: '3vw', maxWidth: 420 }}>
            <h2 style={{
              fontFamily: 'Inter, sans-serif', fontWeight: 600,
              fontSize: 'clamp(1.05rem, 1.65vw, 1.65rem)',
              color: '#000', margin: '0 0 1rem',
              lineHeight: 1.1, letterSpacing: '-0.02em',
            }}>
              CRAFTING IMPACTFUL<br />DIGITAL INNOVATIONS.
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', cursor: 'pointer' }}>
              <div style={{
                width: 8, height: 8, borderRadius: '50%',
                background: '#5de0e6', boxShadow: '0 0 8px #5de0e6',
                animation: 'hs-pulse 2s ease-in-out infinite',
              }} />
              <span style={{
                fontFamily: 'Inter, sans-serif', fontWeight: 700,
                fontSize: '0.75rem', letterSpacing: '0.1em', color: '#000',
              }}>
                SHOWREEL
              </span>
            </div>
          </div>

          <div style={{ 
            position: 'absolute', right: '4vw', bottom: '3vw', 
            display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '2.5rem' 
          }}>
            <nav className="hs-right-nav">
              <ul style={{
                listStyle: 'none', margin: 0, padding: 0,
                textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '0.52rem',
              }}>
                {[
                  { label: 'OUR WORK',    href: '/our-work'      },
                  { label: 'ABOUT',       href: '/about'     },
                  { label: 'HEADQUARTER', href: '/headquarter'        },
                  { label: 'CONTACT ↗',  href: '#contact'   },
                ].map(({ label, href }) => (
                  <li key={label}>
                    <a href={href} className="hs-nav-link">{label}</a>
                  </li>
                ))}
              </ul>
            </nav>

            <p style={{
              fontFamily: 'Inter, sans-serif', fontWeight: 700,
              fontSize: '0.72rem', letterSpacing: '0.1em',
              color: 'rgba(0,0,0,0.38)', margin: 0,
            }}>
              SCROLL FOR MORE ↓
            </p>
          </div>

        </div>

        {services.map((service, i) => (
          <div
            key={service.id}
            ref={el => { cardWrappers.current[i] = el }}
            className="hs-card-desktop"
            style={{ position: 'absolute', zIndex: 10 }}
          >
            <ServiceCard service={service} />
          </div>
        ))}
      </section>

      <section className="hs-mob-grid" aria-hidden="true">
        {services.map(service => (
          <div key={`mob-${service.id}`} className="hs-mob-card">
            <ServiceCard service={service} />
          </div>
        ))}
      </section>
    </div>
  )
}