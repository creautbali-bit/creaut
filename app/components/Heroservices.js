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

const NAV_LINKS = [
  { label: 'About',       href: '/about'       },
  { label: 'Our Work',    href: '/our-work'    },
  { label: 'Headquarter', href: '/headquarter' },
]

// ─────────────────────────────────────────────────────────────────────────────
// ServiceCard
// ─────────────────────────────────────────────────────────────────────────────

function ServiceCard({ service, compact = false }) {
  const plusRef    = useRef(null)
  const titleRef   = useRef(null)
  const overlayRef = useRef(null)
  const thumbRef   = useRef(null)
  const [active, setActive] = useState(false)

  const activate = () => {
    setActive(true)
    gsap.to(thumbRef.current,   { scale: 1.06, duration: 0.6,  ease: 'power2.out'   })
    gsap.to(overlayRef.current, { opacity: 1,  duration: 0.45, ease: 'power2.out'   })
    gsap.to(titleRef.current,   { y: -4,       duration: 0.35, ease: 'power2.out'   })
    gsap.to(plusRef.current,    { rotate: 45, scale: 1.1, duration: 0.35, ease: 'power2.out' })
  }

  const deactivate = () => {
    setActive(false)
    gsap.to(thumbRef.current,   { scale: 1,   duration: 0.5,  ease: 'power2.inOut' })
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.4,  ease: 'power2.inOut' })
    gsap.to(titleRef.current,   { y: 0,       duration: 0.35, ease: 'power2.inOut' })
    gsap.to(plusRef.current,    { rotate: 0,  scale: 1, duration: 0.35, ease: 'power2.inOut' })
  }

  const btnSz    = compact ? 36 : 48
  const pad      = compact ? '0.85rem 1rem' : '1.4rem 1.75rem'
  const subLabel = compact ? service.sub.split('·')[0].trim() : service.sub

  return (
    <a
      href={service.href}
      onMouseEnter={activate}
      onMouseLeave={deactivate}
      onTouchStart={activate}
      onTouchEnd={() => setTimeout(deactivate, 380)}
      style={{
        display:        'block',
        position:       'relative',
        width:          '100%',
        height:         '100%',
        overflow:       'hidden',
        background:     '#0a0a0a',
        textDecoration: 'none',
        cursor:         'pointer',
        WebkitTapHighlightColor: 'transparent',
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
        position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
        background: 'linear-gradient(to top, rgba(0,0,0,0.84) 0%, rgba(0,0,0,0.08) 55%, transparent 100%)',
      }} />

      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: pad,
        display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
        zIndex: 4,
      }}>
        <div ref={titleRef} style={{ flex: 1, willChange: 'transform', minWidth: 0, paddingRight: '0.5rem' }}>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: compact ? '0.52rem' : '0.62rem',
            fontWeight: 500, letterSpacing: '0.13em',
            textTransform: 'uppercase', margin: '0 0 0.22rem',
            transition: 'color 0.3s',
            color: active ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.5)',
          }}>
            {subLabel}
          </p>
          <h3 style={{
            fontFamily: 'Inter, sans-serif', fontWeight: 700,
            fontSize: compact
              ? 'clamp(0.82rem, 4vw, 1.55rem)'
              : 'clamp(1.05rem, 2.2vw, 2.4rem)',
            color: '#fff', letterSpacing: '-0.025em', lineHeight: 1.1, margin: 0,
          }}>
            {service.title}
          </h3>
        </div>

        <div
          ref={plusRef}
          style={{
            width: btnSz, height: btnSz, borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0, willChange: 'transform', backdropFilter: 'blur(8px)',
            transition: 'background 0.35s, box-shadow 0.35s',
            background: active
              ? 'linear-gradient(135deg, #5de0e6, #004aad)'
              : 'rgba(255,255,255,0.10)',
            boxShadow: active
              ? '0 0 28px rgba(93,224,230,0.55), 0 0 8px rgba(0,74,173,0.4)'
              : 'inset 0 0 0 1.5px rgba(255,255,255,0.35)',
          }}
        >
          <span style={{
            color: '#fff',
            fontSize: compact ? '1.25rem' : '1.5rem',
            lineHeight: 1, fontWeight: 300, userSelect: 'none',
            display: 'block', marginTop: '-2px',
          }}>+</span>
        </div>
      </div>

      <div style={{
        position: 'absolute',
        top: compact ? '0.85rem' : '1.25rem',
        right: compact ? '1rem' : '1.5rem',
        zIndex: 4,
        fontFamily: 'Inter, sans-serif', fontSize: '0.58rem', fontWeight: 600,
        letterSpacing: '0.12em', transition: 'color 0.3s',
        color: active ? 'rgba(93,224,230,0.8)' : 'rgba(255,255,255,0.3)',
      }}>
        0{service.id}
      </div>
    </a>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// HeroServices
// ─────────────────────────────────────────────────────────────────────────────

export default function HeroServices() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // ── Desktop refs ──
  const containerRef   = useRef(null)
  const curtainRef     = useRef(null)
  const heroBgRef      = useRef(null)
  const heroContentRef = useRef(null)
  const cardWrappers   = useRef([null, null, null, null])

  // ── Mobile refs ──
  const mobCurtainRef = useRef(null)
  const mobCenterRef  = useRef(null)
  const mobBottomRef  = useRef(null)
  const mobHeaderRef  = useRef(null)
  const mobCardRefs   = useRef([null, null, null, null])
  // We don't animate topbar natively anymore so it doesn't shift around during scroll/intro
  
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })
    lenis.on('scroll', ScrollTrigger.update)
    const updateLenis = (time) => { lenis.raf(time * 1000) }
    gsap.ticker.add(updateLenis)
    gsap.ticker.lagSmoothing(0)

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      // DESKTOP
      mm.add('(min-width: 768px)', () => {
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
          .to(cardWrappers.current.filter(Boolean), {
            opacity: 1, stagger: 0.08, duration: 0.6, ease: 'power2.out',
          }, '-=0.4')

        const el       = containerRef.current
        const W        = el.offsetWidth
        const H        = el.offsetHeight
        const HG       = 16
        const marginX  = W * 0.04
        const marginY  = H * 0.04
        const maxGridW = W - marginX * 2
        const maxGridH = H - marginY * 2
        const cardW    = (maxGridW - HG) / 2
        const cardH    = (maxGridH - HG) / 2

        const stackW = 700, stackH = 400
        const SL = (W - stackW) / 2
        const ST = H - stackH - W * 0.03

        const STACKS = [
          { dx:  0,  dy:  0,  rot:  1.5, z: 4, sh: '0 20px 40px rgba(0,0,0,0.55)' },
          { dx: -10, dy:  8,  rot: -3.0, z: 3, sh: '0 15px 30px rgba(0,0,0,0.45)' },
          { dx:  15, dy:  15, rot:  4.5, z: 2, sh: '0 10px 20px rgba(0,0,0,0.38)' },
          { dx:  -6, dy:  22, rot: -1.5, z: 1, sh: '0 5px 15px rgba(0,0,0,0.30)'  },
        ]
        const FINALS = [
          { x: marginX,              y: marginY              },
          { x: marginX + cardW + HG, y: marginY              },
          { x: marginX,              y: marginY + cardH + HG },
          { x: marginX + cardW + HG, y: marginY + cardH + HG },
        ]

        STACKS.forEach((s, i) => {
          gsap.set(cardWrappers.current[i], {
            position: 'absolute', left: SL + s.dx, top: ST + s.dy,
            width: stackW, height: stackH, rotation: s.rot,
            zIndex: s.z, opacity: 0, transformOrigin: 'center center', boxShadow: s.sh,
          })
        })

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current, start: 'top top',
            end: '+=200%', pin: true, scrub: 1.2, anticipatePin: 1,
          },
        })

        tl.to([heroBgRef.current, heroContentRef.current], {
          y: -H * 1.15, duration: 0.8, ease: 'power2.inOut',
        }, 0)

        FINALS.forEach((f, i) => {
          tl.to(cardWrappers.current[i], {
            left: f.x, top: f.y, width: cardW, height: cardH,
            rotation: 0, boxShadow: 'none', zIndex: i + 1,
            duration: 0.8, ease: 'power2.inOut',
          }, i * 0.06)
        })
      })

      // MOBILE
      mm.add('(max-width: 767px)', () => {
        cardWrappers.current.forEach(el => { if (el) gsap.set(el, { clearProps: 'all' }) })

        const heroEls = [mobCenterRef.current, mobBottomRef.current].filter(Boolean)
        gsap.set(heroEls, { opacity: 0, y: 24 })
        gsap.to(mobCurtainRef.current, { opacity: 0, duration: 1.5, ease: 'power2.inOut' })

        gsap.to(heroEls, {
          opacity: 1, y: 0,
          stagger: 0.18, duration: 0.9, delay: 0.65, ease: 'power3.out',
        })

        if (mobHeaderRef.current) {
          gsap.set(mobHeaderRef.current, { opacity: 0, y: 20 })
          gsap.to(mobHeaderRef.current, {
            opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
            scrollTrigger: { trigger: mobHeaderRef.current, start: 'top 90%' },
          })
        }

        mobCardRefs.current.forEach((el) => {
          if (!el) return
          gsap.set(el, { opacity: 0, y: 50, scale: 0.96 })
          gsap.to(el, {
            opacity: 1, y: 0, scale: 1,
            duration: 0.75, ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 88%' },
          })
        })
      })
    })

    return () => {
      ctx.revert()
      gsap.ticker.remove(updateLenis)
      lenis.destroy()
    }
  }, [])

  return (
    <div className="relative w-full">
      <style>{`
        @keyframes hs-pulse { 0%, 100% { opacity: 1 } 50% { opacity: 0.38 } }

        .hs-nav-link {
          font-family: 'Inter', sans-serif;
          font-size: 0.78rem; font-weight: 600; color: #000;
          text-decoration: none; text-transform: uppercase;
          letter-spacing: 0.06em; transition: color 0.3s;
        }
        .hs-nav-link:hover { color: #004aad; }

        .hs-mob-section { display: none !important; }

        @media (max-width: 767px) {
          .hs-hero-services-wrapper { display: none !important; }
          .hs-mob-section           { display: block !important; }

          /* ── Hero ── */
          .hs-mob-hero {
            position: relative; width: 100%; height: 100svh; min-height: 580px;
            background: #fff; overflow: hidden; box-sizing: border-box;
            display: flex; flex-direction: column;
            padding: 1.5rem 1.5rem 2rem;
          }

          /* ── Fixed Mobile Topbar ── */
          .hs-mob-topbar {
            display: flex; justify-content: space-between; align-items: center;
            position: relative; z-index: 1000; flex-shrink: 0;
          }
          .hs-mob-logo {
            font-family: 'Inter', sans-serif; font-weight: 800;
            font-size: 1rem; letter-spacing: -0.03em;
            color: #000; text-decoration: none;
          }

          .hs-mob-center {
            flex: 1; display: flex; flex-direction: column;
            justify-content: center;
            position: relative; z-index: 2;
          }
          .hs-mob-giant {
            font-family: 'Inter', sans-serif; font-weight: 800;
            font-size: clamp(3.5rem, 26vw, 6.5rem);
            letter-spacing: -0.06em; line-height: 0.85; margin: 0;
            user-select: none; pointer-events: none;
          }
          .hs-mob-tagline {
            font-family: 'Inter', sans-serif; font-weight: 600;
            font-size: clamp(0.88rem, 3.8vw, 1.1rem);
            color: #000; margin: 1.5rem 0 0;
            line-height: 1.25; letter-spacing: -0.02em;
          }

          .hs-mob-bottombar {
            display: flex; justify-content: space-between; align-items: flex-end;
            position: relative; z-index: 2; flex-shrink: 0;
          }
          .hs-mob-location p {
            font-family: 'Inter', sans-serif; font-weight: 700;
            font-size: 0.68rem; letter-spacing: 0.08em;
            color: #000; text-transform: uppercase; margin: 0 0 0.45rem;
          }
          .hs-mob-gradient-bar {
            width: 28px; height: 2px; border-radius: 2px;
            background: linear-gradient(90deg, #5de0e6, #004aad);
          }
          .hs-mob-right-bottom {
            display: flex; flex-direction: column;
            align-items: flex-end; gap: 0.6rem;
          }
          .hs-mob-showreel {
            display: flex; align-items: center; gap: 0.45rem; cursor: pointer;
          }
          .hs-mob-pulse-dot {
            width: 8px; height: 8px; border-radius: 50%;
            background: #5de0e6; box-shadow: 0 0 8px #5de0e6;
            animation: hs-pulse 2s ease-in-out infinite; flex-shrink: 0;
          }
          .hs-mob-showreel span {
            font-family: 'Inter', sans-serif; font-weight: 700;
            font-size: 0.7rem; letter-spacing: 0.1em; color: #000;
          }
          .hs-mob-scroll-hint {
            font-family: 'Inter', sans-serif; font-weight: 700;
            font-size: 0.58rem; letter-spacing: 0.1em;
            color: rgba(0,0,0,0.3); text-transform: uppercase;
          }

          .hs-mob-services { background: #ffffff; }

          .hs-mob-svc-header {
            padding: 2rem 1.25rem 1.25rem;
            display: flex; align-items: center; gap: 1rem;
          }
          .hs-mob-svc-label {
            font-family: 'Inter', sans-serif; font-weight: 700;
            font-size: 0.58rem; letter-spacing: 0.2em;
            color: rgba(255,255,255,0.38); text-transform: uppercase; white-space: nowrap;
          }
          .hs-mob-svc-line {
            flex: 1; height: 1px;
            background: linear-gradient(90deg, rgba(93,224,230,0.38), transparent);
          }

          .hs-mob-cards {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-template-areas: "a a" "b c" "d d";
            gap: 3px; padding: 0 3px 3px;
          }
          .hs-mob-card-a { grid-area: a; aspect-ratio: 16 / 9;  overflow: hidden; }
          .hs-mob-card-b { grid-area: b; aspect-ratio:  3 / 4;  overflow: hidden; }
          .hs-mob-card-c { grid-area: c; aspect-ratio:  3 / 4;  overflow: hidden; }
          .hs-mob-card-d { grid-area: d; aspect-ratio: 16 / 9;  overflow: hidden; }

          .hs-mob-nav-footer {
            padding: 1.75rem 1.25rem 3rem;
            border-top: 1px solid rgba(255,255,255,0.06);
          }
          .hs-mob-nav-footer-label {
            font-family: 'Inter', sans-serif; font-weight: 700;
            font-size: 0.58rem; letter-spacing: 0.2em;
            color: rgba(255,255,255,0.22); text-transform: uppercase;
            margin: 0 0 1.25rem;
          }
          .hs-mob-nav-grid {
            display: grid; grid-template-columns: 1fr 1fr; gap: 0.9rem;
          }
          .hs-mob-nav-link {
            font-family: 'Inter', sans-serif; font-weight: 600;
            font-size: 0.72rem; letter-spacing: 0.07em;
            color: rgba(255,255,255,0.5); text-decoration: none;
            text-transform: uppercase; transition: color 0.3s;
          }
          .hs-mob-nav-link:active { color: #5de0e6; }
        }
      `}</style>

      {/* ── Desktop Hero ── */}
      <section
        ref={containerRef}
        className="hs-hero-services-wrapper"
        style={{
          position: 'relative', width: '100%', height: '100vh',
          overflow: 'hidden', background: '#ffffff',
        }}
      >
        <div ref={heroBgRef} style={{ position: 'absolute', inset: 0, zIndex: 1, background: '#ffffff', willChange: 'transform' }}>
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'radial-gradient(ellipse at center, rgba(93,224,230,0.06) 0%, rgba(0,74,173,0.03) 45%, transparent 70%)',
          }} />
        </div>

        <div ref={curtainRef} style={{ position: 'absolute', inset: 0, background: '#000000', zIndex: 30, pointerEvents: 'none' }} />

        <div ref={heroContentRef} style={{ position: 'absolute', inset: 0, zIndex: 5, willChange: 'transform' }}>
          <h1 style={{
            position: 'absolute', top: '5vh', left: '50%', transform: 'translateX(-50%)',
            fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: '21vw',
            letterSpacing: '-0.06em', color: '#000', lineHeight: 0.85,
            margin: 0, whiteSpace: 'nowrap', pointerEvents: 'none', userSelect: 'none',
          }}>
            <span style={{
              background: 'linear-gradient(to right, #5de0e6, #004aad)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text', color: 'transparent',
              padding: '0.05em', display: 'inline-block',
            }}>C</span>REAUT
          </h1>

          <div style={{ position: 'absolute', left: '4vw', top: '50%', transform: 'translateY(-50%)' }}>
            <p style={{
              fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '0.82rem',
              letterSpacing: '0.07em', color: '#000', margin: 0, textTransform: 'uppercase',
            }}>BALI, INDONESIA</p>
            <div style={{ width: 28, height: 2, borderRadius: 2, marginTop: '0.5rem', background: 'linear-gradient(90deg, #5de0e6, #004aad)' }} />
          </div>

          <div style={{ position: 'absolute', left: '4vw', bottom: '3vw', maxWidth: 420 }}>
            <h2 style={{
              fontFamily: 'Inter, sans-serif', fontWeight: 600,
              fontSize: 'clamp(1.05rem, 1.65vw, 1.65rem)',
              color: '#000', margin: '0 0 1rem', lineHeight: 1.1, letterSpacing: '-0.02em',
            }}>
              CRAFTING IMPACTFUL<br />DIGITAL INNOVATIONS.
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', cursor: 'pointer' }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#5de0e6', boxShadow: '0 0 8px #5de0e6', animation: 'hs-pulse 2s ease-in-out infinite' }} />
              <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.1em', color: '#000' }}>SHOWREEL</span>
            </div>
          </div>

          <div style={{ position: 'absolute', right: '4vw', bottom: '3vw', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '2.5rem' }}>
            <nav>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '0.52rem' }}>
                {NAV_LINKS.map(({ label, href }) => (
                  <li key={label}><a href={href} className="hs-nav-link">{label}</a></li>
                ))}
              </ul>
            </nav>
            <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.1em', color: 'rgba(0,0,0,0.38)', margin: 0 }}>
              SCROLL FOR MORE ↓
            </p>
          </div>
        </div>

        {services.map((service, i) => (
          <div
            key={service.id}
            ref={el => { cardWrappers.current[i] = el }}
            style={{ position: 'absolute', zIndex: 10 }}
          >
            <ServiceCard service={service} />
          </div>
        ))}
      </section>

      {/* ── Mobile View ── */}
      <div className="hs-mob-section">
        
        {/* Mobile Slide-in Menu (Using your styling) */}
        <div style={{
          position: 'fixed',
          inset: 0,
          background: '#fff',
          zIndex: 999, // under the topbar
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '2rem',
          transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.45s cubic-bezier(0.77,0,0.175,1)',
        }}>
          {NAV_LINKS.map(link => (
            <a key={link.label} href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '2rem',
                fontWeight: 700,
                color: '#000',
                textDecoration: 'none',
              }}>
              {link.label}
            </a>
          ))}
          <a href="https://wa.me/6287780594231" target="_blank" rel="noreferrer" style={{
            marginTop: '0.5rem',
            padding: '0.8rem 2.5rem',
            background: 'linear-gradient(90deg, #5de0e6, #004aad)',
            color: '#fff',
            textDecoration: 'none',
            fontSize: '0.9rem',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 600,
            borderRadius: '8px',
          }}>
            Let's Talk
          </a>
        </div>

        <div className="hs-mob-hero">
          <div ref={mobCurtainRef} style={{ position: 'absolute', inset: 0, background: '#000', zIndex: 30, pointerEvents: 'none' }} />

          <div style={{
            position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
            background: 'radial-gradient(ellipse at 28% 58%, rgba(93,224,230,0.07) 0%, transparent 62%)',
          }} />

          {/* Top bar with Animated Hamburger */}
          <div className="hs-mob-topbar">
            <a href="/" className="hs-mob-logo">
              <span style={{
                background: 'linear-gradient(to right, #5de0e6, #004aad)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>C</span>REAUT
            </a>
            
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                display: 'flex', flexDirection: 'column', gap: '5px', padding: '4px',
              }}
              aria-label="Toggle menu"
            >
              {[0, 1, 2].map(i => (
                <span key={i} style={{
                  display: 'block', width: 22, height: 2, background: '#000',
                  borderRadius: '2px', transition: 'all 0.3s',
                  transform:
                    isMobileMenuOpen && i === 0 ? 'rotate(45deg) translate(5px, 5px)' :
                    isMobileMenuOpen && i === 2 ? 'rotate(-45deg) translate(5px, -5px)' :
                    'none',
                  opacity: isMobileMenuOpen && i === 1 ? 0 : 1,
                }} />
              ))}
            </button>
          </div>

          <div ref={mobCenterRef} className="hs-mob-center">
            <h1 className="hs-mob-giant">
              <span style={{
                background: 'linear-gradient(to right, #5de0e6, #004aad)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                backgroundClip: 'text', display: 'inline-block', padding: '0.05em',
              }}>C</span>REAUT
            </h1>
            <p className="hs-mob-tagline">
              CRAFTING IMPACTFUL<br />DIGITAL INNOVATIONS.
            </p>
          </div>

          <div ref={mobBottomRef} className="hs-mob-bottombar">
            <div className="hs-mob-location">
              <p>BALI, INDONESIA</p>
              <div className="hs-mob-gradient-bar" />
            </div>
            <div className="hs-mob-right-bottom">
              <div className="hs-mob-showreel">
                <div className="hs-mob-pulse-dot" />
                <span>SHOWREEL</span>
              </div>
              <span className="hs-mob-scroll-hint">SCROLL FOR MORE ↓</span>
            </div>
          </div>
        </div>

        <div className="hs-mob-services">
          <div ref={mobHeaderRef} className="hs-mob-svc-header">
            <span className="hs-mob-svc-label">OUR SERVICES</span>
            <div className="hs-mob-svc-line" />
          </div>

          <div className="hs-mob-cards">
            {services.map((service, i) => {
              const areaClass = ['hs-mob-card-a', 'hs-mob-card-b', 'hs-mob-card-c', 'hs-mob-card-d'][i]
              const isCompact = i === 1 || i === 2 
              return (
                <div
                  key={service.id}
                  ref={el => { mobCardRefs.current[i] = el }}
                  className={areaClass}
                >
                  <ServiceCard service={service} compact={isCompact} />
                </div>
              )
            })}
          </div>

          <div className="hs-mob-nav-footer">
            <p className="hs-mob-nav-footer-label">QUICK LINKS</p>
            <div className="hs-mob-nav-grid">
              {NAV_LINKS.map(({ label, href }) => (
                <a key={label} href={href} className="hs-mob-nav-link">{label}</a>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}