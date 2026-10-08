'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import useLenis from '@/hooks/useLenis'
import useMediaQuery from '@/hooks/useMediaQuery'
import Wordmark from '@/components/ui/Wordmark'
import LanguageSwitcher from '@/components/ui/LanguageSwitcher'
import { useTranslation } from '@/i18n/LanguageProvider'
import { navLinks as NAV_LINKS } from '@/config/site'

gsap.registerPlugin(ScrollTrigger)
// Address bar di mobile muncul/hilang saat scroll → jangan refresh ScrollTrigger tiap kali.
ScrollTrigger.config({ ignoreMobileResize: true })

// ─────────────────────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────────────────────

const services = [
  {
    id:    1,
    key:   'video-production',
    href:  '/services/video-production',
    media: '/video/vdgp',
  },
  {
    id:    2,
    key:   'social-media',
    href:  '/services/social-media-management',
    media: '/video/smm',
  },
  {
    id:    3,
    key:   'visual-photography',
    href:  '/services/visual-photography',
    media: '/video/ptgp',
  },
  {
    id:    4,
    key:   'branding',
    href:  '/services/branding',
    media: '/video/bd',
  },
  {
    id:    5,
    key:   'website',
    href:  '/services/website',
    media: '/video/web',
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// ServiceCard
// ─────────────────────────────────────────────────────────────────────────────

function ServiceCard({ service, compact = false }) {
  const { t } = useTranslation()
  const title = t(`services.${service.key}.title`)
  const sub   = t(`services.${service.key}.sub`)
  const plusRef    = useRef(null)
  const titleRef   = useRef(null)
  const overlayRef = useRef(null)
  const thumbRef   = useRef(null)
  const videoRef   = useRef(null)
  const [active, setActive] = useState(false)

  // Video hanya diputar saat kartu terlihat di layar → hemat CPU/baterai di HP.
  // Pengguna "reduce motion" / "data saver" hanya melihat poster.
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const saveData = navigator.connection?.saveData
    if (reduce || saveData) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {})
        else video.pause()
      },
      { threshold: 0.15 },
    )
    io.observe(video)
    return () => io.disconnect()
  }, [])

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
  const subLabel = compact ? sub.split('·')[0].trim() : sub

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
        <video
          ref={videoRef}
          src={`${service.media}.mp4`}
          poster={`${service.media}.webp`}
          aria-label={title}
          muted
          loop
          playsInline
          preload="metadata"
          disablePictureInPicture
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
            fontFamily: 'var(--font-sans)',
            fontSize: compact ? '0.52rem' : '0.62rem',
            fontWeight: 500, letterSpacing: '0.13em',
            textTransform: 'uppercase', margin: '0 0 0.22rem',
            transition: 'color 0.3s',
            color: active ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.5)',
          }}>
            {subLabel}
          </p>
          <h3 style={{
            fontFamily: 'var(--font-sans)', fontWeight: 700,
            fontSize: compact
              ? 'clamp(0.78rem, 3.5vw, 1.55rem)'
              : 'clamp(1.05rem, 2.2vw, 2.4rem)',
            color: '#fff', letterSpacing: '-0.025em', lineHeight: 1.1, margin: 0,
          }}>
            {title}
          </h3>
        </div>

        <div
          ref={plusRef}
          style={{
            width: btnSz, height: btnSz, borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0, willChange: 'transform',
            transition: 'background 0.35s, box-shadow 0.35s',
            background: active
              ? 'linear-gradient(135deg, #5de0e6, #004aad)'
              : 'rgba(255,255,255,0.18)',
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
        fontFamily: 'var(--font-sans)', fontSize: '0.58rem', fontWeight: 600,
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
  const { t, dict } = useTranslation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [layoutKey, setLayoutKey] = useState(0)
  const isMobile = useMediaQuery('(max-width: 767px)')

  const containerRef   = useRef(null)
  const curtainRef     = useRef(null)
  const heroBgRef      = useRef(null)
  const heroContentRef = useRef(null)
  const cardWrappers   = useRef([null, null, null, null, null])

  useLenis()

  // Hitung ulang layout hanya kalau LEBAR berubah (rotasi / resize).
  // Perubahan tinggi akibat address bar mobile sengaja diabaikan.
  useEffect(() => {
    let lastW = window.innerWidth
    let t
    const onResize = () => {
      clearTimeout(t)
      t = setTimeout(() => {
        if (window.innerWidth !== lastW) {
          lastW = window.innerWidth
          setLayoutKey((k) => k + 1)
        }
      }, 250)
    }
    window.addEventListener('resize', onResize)
    return () => { clearTimeout(t); window.removeEventListener('resize', onResize) }
  }, [])

  // Kunci scroll saat menu mobile terbuka
  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.documentElement.style.overflow = '' }
  }, [menuOpen])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      /**
       * Satu animasi untuk desktop & mobile: kartu menumpuk di bawah hero,
       * lalu saat di-scroll hero naik dan kartu menyebar menjadi grid.
       * Hanya geometri yang berbeda antara desktop dan mobile.
       */
      const build = (mobile) => {
        const el        = containerRef.current
        const W         = el.offsetWidth
        const viewportH = heroContentRef.current.offsetHeight // = 100svh

        // Intro
        gsap.timeline({ defaults: { ease: 'power3.out' } })
          .fromTo(curtainRef.current, { opacity: 1 }, { opacity: 0, duration: 1.5, ease: 'power2.inOut' })
          .fromTo(heroContentRef.current, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 1.2 }, '-=0.85')
          .to(cardWrappers.current.filter(Boolean), {
            opacity: 1, stagger: 0.08, duration: 0.6, ease: 'power2.out',
          }, '-=0.4')

        // ── Geometri grid akhir ──
        const HG       = mobile ? 10 : 16
        const marginX  = W * (mobile ? 0.05 : 0.04)
        const marginY  = viewportH * (mobile ? 0.03 : 0.04)
        const gridW    = W - marginX * 2
        const cardW    = (gridW - HG) / 2

        let cardH, lastH
        if (mobile) {
          lastH = cardW * 0.95
          // minimal portrait; kalau layar tinggi, kartu memanjang agar grid memenuhi 1 layar
          cardH = Math.max(cardW * 1.35, (viewportH - marginY * 2 - lastH - HG * 2) / 2)
        } else {
          cardH = (viewportH - marginY * 2 - HG) / 2
          lastH = cardH
        }
        const totalH = marginY * 2 + cardH * 2 + lastH + HG * 2
        gsap.set(el, { height: Math.max(viewportH, totalH) })

        // ── Geometri tumpukan awal ──
        const stackW = mobile ? W * 0.78 : 700
        const stackH = mobile ? stackW * 0.62 : 400
        const SL     = (W - stackW) / 2
        const ST     = mobile
          ? viewportH - stackH - Math.max(24, viewportH * 0.06)
          : viewportH - stackH - W * 0.03
        const k      = mobile ? 0.6 : 1 // skala offset tumpukan

        const STACKS = [
          { dx:   0, dy:  0, rot:  1.5, z: 5, sh: '0 20px 40px rgba(0,0,0,0.55)' },
          { dx: -10, dy:  8, rot: -3.0, z: 4, sh: '0 15px 30px rgba(0,0,0,0.45)' },
          { dx:  15, dy: 15, rot:  4.5, z: 3, sh: '0 10px 20px rgba(0,0,0,0.38)' },
          { dx:  -6, dy: 22, rot: -1.5, z: 2, sh: '0 5px 15px rgba(0,0,0,0.30)'  },
          { dx:   8, dy: 28, rot:  2.0, z: 1, sh: '0 5px 10px rgba(0,0,0,0.25)'  },
        ]

        const FINALS = [
          { x: marginX,              y: marginY,                    w: cardW,  h: cardH },
          { x: marginX + cardW + HG, y: marginY,                    w: cardW,  h: cardH },
          { x: marginX,              y: marginY + cardH + HG,       w: cardW,  h: cardH },
          { x: marginX + cardW + HG, y: marginY + cardH + HG,       w: cardW,  h: cardH },
          { x: marginX,              y: marginY + (cardH + HG) * 2, w: gridW,  h: lastH }, // baris ke-3 full lebar
        ]

        STACKS.forEach((st, i) => {
          gsap.set(cardWrappers.current[i], {
            position: 'absolute',
            left: SL + st.dx * k, top: ST + st.dy * k,
            width: stackW, height: stackH, rotation: st.rot * (mobile ? 0.8 : 1),
            zIndex: st.z, opacity: 0, transformOrigin: 'center center', boxShadow: st.sh,
          })
        })

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: mobile ? '+=160%' : '+=200%',
            pin: true,
            scrub: mobile ? true : 1.2, // mobile: terikat langsung ke scroll native (tanpa smoothing)
            anticipatePin: 1,
          },
        })

        tl.to([heroBgRef.current, heroContentRef.current], {
          y: -viewportH * 1.15, duration: 0.8, ease: 'power2.inOut',
        }, 0)

        FINALS.forEach((f, i) => {
          tl.to(cardWrappers.current[i], {
            left: f.x, top: f.y, width: f.w, height: f.h,
            rotation: 0, boxShadow: 'none', zIndex: i + 1,
            duration: 0.8, ease: 'power2.inOut',
          }, i * 0.06)
        })
      }

      mm.add('(min-width: 768px)', () => build(false))
      mm.add('(max-width: 767px)', () => build(true))
    })

    return () => ctx.revert()
  }, [layoutKey])

  return (
    <div className="relative w-full">
      <style>{`
        @keyframes hs-pulse { 0%, 100% { opacity: 1 } 50% { opacity: 0.38 } }

        .hs-nav-link {
          font-family: var(--font-sans);
          font-size: 0.78rem; font-weight: 600; color: #000;
          text-decoration: none; text-transform: uppercase;
          letter-spacing: 0.06em; transition: color 0.3s;
        }
        .hs-nav-link:hover { color: #004aad; }

        .hs-hero-services-wrapper { min-height: 100vh; min-height: 100svh; }
        .hs-full { height: 100vh; height: 100svh; }

        /* ── Posisi elemen hero (desktop) ── */
        .hs-wordmark { position: absolute; top: 6vh; left: 50%; transform: translateX(-50%); width: 80vw; margin: 0; pointer-events: none; user-select: none; }
        .hs-loc      { position: absolute; left: 4vw; top: 50%; transform: translateY(-50%); }
        .hs-tag      { position: absolute; left: 4vw; bottom: 3vw; max-width: 420px; }
        .hs-tag-title { font-family: var(--font-sans); font-weight: 600; font-size: clamp(1.05rem, 1.65vw, 1.65rem); color: #000; margin: 0 0 1rem; line-height: 1.1; letter-spacing: -0.02em; }
        .hs-side     { position: absolute; right: 4vw; bottom: 3vw; display: flex; flex-direction: column; align-items: flex-end; gap: 2.5rem; }

        .hs-topbar   { display: none; }
        .hs-lang-desktop { display: block; }
        .hs-mob-menu { display: none; }

        /* ── Mobile: tampilan sama seperti desktop, elemen disusun vertikal ── */
        @media (max-width: 767px) {
          .hs-content {
            display: flex; flex-direction: column; box-sizing: border-box;
            /* ruang untuk tumpukan kartu: tinggi stack (78vw × 0.62) + jarak bawah */
            padding: calc(4.75rem + 5svh) 5vw calc(48.4vw + max(24px, 6svh) + 3rem);
          }
          .hs-topbar {
            display: flex; position: absolute; top: 0; left: 0; right: 0; z-index: 6;
            align-items: center; justify-content: space-between; padding: 1rem 5vw;
          }
          .hs-wordmark  { position: static; transform: none; width: 100%; }
          .hs-loc       { position: static; transform: none; margin-top: 2rem; }
          .hs-tag       { position: static; max-width: none; margin-top: 1.5rem; }
          .hs-tag-title { font-size: clamp(1.1rem, 5.2vw, 1.5rem); }
          .hs-side      { position: static; margin-top: auto; gap: 0; }
          .hs-side nav  { display: none; }
          .hs-lang-desktop { display: none; }

          .hs-mob-menu {
            display: flex; position: fixed; inset: 0; z-index: 999; background: #fff;
            flex-direction: column; align-items: center; justify-content: center; gap: 2rem;
            transition: transform 0.45s cubic-bezier(0.77,0,0.175,1);
          }
        }
      `}</style>

      {/* ── Hero + kartu layanan ── */}
      <section
        ref={containerRef}
        className="hs-hero-services-wrapper"
        style={{ position: 'relative', width: '100%', overflowX: 'clip', background: '#ffffff' }}
      >
        <div ref={heroBgRef} className="hs-full" style={{ position: 'absolute', top: 0, left: 0, width: '100%', zIndex: 1, background: '#ffffff', willChange: 'transform' }}>
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'radial-gradient(ellipse at center, rgba(93,224,230,0.06) 0%, rgba(0,74,173,0.03) 45%, transparent 70%)',
          }} />
        </div>

        <div ref={curtainRef} className="hs-full" style={{ position: 'absolute', top: 0, left: 0, width: '100%', background: '#000000', zIndex: 30, pointerEvents: 'none' }} />

        <div ref={heroContentRef} className="hs-full hs-content" style={{ position: 'absolute', top: 0, left: 0, width: '100%', zIndex: 5, willChange: 'transform' }}>
          {/* Top bar — hanya mobile */}
          <div className="hs-topbar">
            <Link href="/" aria-label="Creaut Bali">
              <img src="/image/logo/logo.png" alt="Creaut Bali" width={44} height={44} style={{ display: 'block', width: 44, height: 44, objectFit: 'contain', mixBlendMode: 'multiply' }} />
            </Link>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <LanguageSwitcher />
            <button
              onClick={() => setMenuOpen(true)}
              aria-label={t('nav.openMenu')}
              style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 5, padding: 4 }}
            >
              {[0, 1, 2].map((i) => (
                <span key={i} style={{ display: 'block', width: 22, height: 2, background: '#000', borderRadius: 2 }} />
              ))}
            </button>
            </div>
          </div>

          <Wordmark as="h1" className="hs-wordmark" priority />

          <div className="hs-loc">
            <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '0.82rem', letterSpacing: '0.07em', color: '#000', margin: 0, textTransform: 'uppercase' }}>
              {t('hero.location')}
            </p>
            <div style={{ width: 28, height: 2, borderRadius: 2, marginTop: '0.5rem', background: 'linear-gradient(90deg, #5de0e6, #004aad)' }} />
          </div>

          <div className="hs-tag">
            <h2 className="hs-tag-title">
              {dict.hero.tagline[0]}<br />{dict.hero.tagline[1]}
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', cursor: 'pointer' }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#5de0e6', boxShadow: '0 0 8px #5de0e6', animation: 'hs-pulse 2s ease-in-out infinite' }} />
              <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.1em', color: '#000' }}>{t('hero.showreel')}</span>
            </div>
          </div>

          <div className="hs-side">
            <div className="hs-lang-desktop"><LanguageSwitcher /></div>
            <nav>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '0.52rem' }}>
                {NAV_LINKS.map(({ key, href }) => (
                  <li key={key}><a href={href} className="hs-nav-link">{t(`nav.${key}`)}</a></li>
                ))}
              </ul>
            </nav>
            <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.1em', color: 'rgba(0,0,0,0.38)', margin: 0 }}>
              {t('hero.scroll')}
            </p>
          </div>
        </div>

        {services.map((service, i) => (
          <div
            key={service.id}
            ref={(el) => { cardWrappers.current[i] = el }}
            style={{ position: 'absolute', zIndex: 10, opacity: 0, contain: 'layout paint style' }}
          >
            <ServiceCard service={service} compact={isMobile} />
          </div>
        ))}
      </section>

      {/* ── Menu fullscreen mobile (di luar section agar tidak ikut ter-transform GSAP) ── */}
      <div className="hs-mob-menu" style={{ transform: menuOpen ? 'translateX(0)' : 'translateX(100%)' }} aria-hidden={!menuOpen}>
        <button
          onClick={() => setMenuOpen(false)}
          aria-label={t('nav.closeMenu')}
          style={{ position: 'absolute', top: '1rem', right: '5vw', background: 'none', border: 'none', cursor: 'pointer', fontSize: '2rem', lineHeight: 1, padding: 8, color: '#000' }}
        >
          ×
        </button>
        {NAV_LINKS.map((link) => (
          <a
            key={link.key}
            href={link.href}
            onClick={() => setMenuOpen(false)}
            style={{ fontFamily: 'var(--font-sans)', fontSize: '2rem', fontWeight: 700, color: '#000', textDecoration: 'none' }}
          >
            {t(`nav.${link.key}`)}
          </a>
        ))}
        <a
          href="https://wa.me/6287780594231" target="_blank" rel="noreferrer"
          style={{
            marginTop: '0.5rem', padding: '0.8rem 2.5rem', background: 'linear-gradient(90deg, #5de0e6, #004aad)',
            color: '#fff', textDecoration: 'none', fontSize: '0.9rem', fontFamily: 'var(--font-sans)', fontWeight: 600, borderRadius: 8,
          }}
        >
          {t('nav.letsTalk')}
        </a>
        <LanguageSwitcher />
      </div>
    </div>
  )
}
