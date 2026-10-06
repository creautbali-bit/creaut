'use client'

import { useState, useEffect, useRef } from 'react'

export default function Footer() {
  const year = new Date().getFullYear()
  const [isMobile, setIsMobile] = useState(false)
  const footerRef = useRef(null)

  // ── Responsive ──────────────────────────────────────────────────────────────
  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  // ── Parallax: scroll-driven rise effect ─────────────────────────────────────
  useEffect(() => {
    const el = footerRef.current
    if (!el) return
    let rafId = null

    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3)

    const tick = () => {
      const rect = el.getBoundingClientRect()
      const wh = window.innerHeight

      const raw = Math.min(
        1,
        Math.max(0, (wh - rect.top) / (wh * 0.55))
      )

      const p = easeOutCubic(raw)
      const ty = (80 * (1 - p)).toFixed(2)

      el.style.transform = `translateY(${ty}px)`
    }

    const onScroll = () => {
      if (rafId) cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(tick)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    tick()

    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  // ── Data ─────────────────────────────────────────────────────────────────────
  const serviceLinks = [
    { label: 'Video Production', href: '/services/video-production' },
    { label: 'Social Media Management', href: '/services/social-media' },
    { label: 'Visual Photography', href: '/services/visual-photography' },
    { label: 'Branding', href: '/services/branding' },
  ]

  const companyLinks = [
    { label: 'About Us', href: '#about' },
    { label: 'Our Work', href: '/our-work' },
    { label: 'Headquarter', href: '/headquarter' },
  ]

  const socials = [
    {
      label: 'IG',
      full: 'Instagram',
      href: 'https://www.instagram.com/',
    },
    {
      label: 'YT',
      full: 'YouTube',
      href: 'https://www.youtube.com/',
    },
  ]

  // ── Render ───────────────────────────────────────────────────────────────────
  return (
    <footer
      ref={footerRef}
      style={{
        background: '#fff',
        borderRadius: '28px 28px 0 0',
        marginTop: '-3rem',
        position: 'relative',
        zIndex: 10,
        willChange: 'transform',
      }}
    >
      {/* ── Drag-handle pill ── */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          paddingTop: '0.9rem',
          paddingBottom: '0.1rem',
        }}
      >
        <div
          style={{
            width: 38,
            height: 4,
            borderRadius: 2,
            background: 'rgba(0,0,0,0.10)',
          }}
        />
      </div>

      {/* ── Main grid ── */}
      <div
        style={{
          padding:
            'clamp(2.5rem, 5vw, 4rem) clamp(1.5rem, 5vw, 4rem) 2.5rem',
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1.6fr 1fr 1fr',
          gap: isMobile ? '2.5rem' : 'clamp(2rem, 5vw, 4rem)',
        }}
      >
        {/* ── Brand col ── */}
        <div>
          {/* LOGO */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '1.25rem',
            }}
          >
            <img
              src="/image/logo/logoteks.webp"
              alt="Creaut Bali"
              style={{
                width: isMobile ? '95px' : '115px',
                height: 'auto',
                display: 'block',
                objectFit: 'contain',
              }}
            />
          </div>

          <p
            style={{
              fontSize: '0.875rem',
              color: '#888',
              lineHeight: 1.75,
              maxWidth: 260,
              marginBottom: '1.25rem',
            }}
          >
            Bali-based creative agency crafting visual stories that move,
            inspire, and convert.
          </p>

          <p
            style={{
              fontSize: '0.8rem',
              color: '#aaa',
              lineHeight: 1.7,
              marginBottom: '1.5rem',
            }}
          >
            Bali, Indonesia
            <br />
            creautbali@gmail.com
          </p>

          {/* Socials */}
          <div
            style={{
              display: 'flex',
              gap: '0.5rem',
              flexWrap: 'wrap',
            }}
          >
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                title={s.full}
                style={{
                  width: 34,
                  height: 34,
                  border: '1.5px solid rgba(0,0,0,0.12)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.6rem',
                  fontWeight: 700,
                  color: '#999',
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#5de0e6'
                  e.currentTarget.style.color = '#004aad'
                  e.currentTarget.style.background =
                    'rgba(93,224,230,0.08)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor =
                    'rgba(0,0,0,0.12)'
                  e.currentTarget.style.color = '#999'
                  e.currentTarget.style.background = 'transparent'
                }}
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        {/* ── Services col ── */}
        <div>
          <h4
            style={{
              fontSize: '0.68rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#bbb',
              marginBottom: '1.25rem',
            }}
          >
            Services
          </h4>

          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
            }}
          >
            {serviceLinks.map((link) => (
              <li
                key={link.label}
                style={{
                  marginBottom: '0.6rem',
                }}
              >
                <a
                  href={link.href}
                  style={{
                    fontSize: '0.875rem',
                    color: '#666',
                    textDecoration: 'none',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = '#0a0a0a')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = '#666')
                  }
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Company col ── */}
        <div>
          <h4
            style={{
              fontSize: '0.68rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#bbb',
              marginBottom: '1.25rem',
            }}
          >
            Company
          </h4>

          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
            }}
          >
            {companyLinks.map((link) => (
              <li
                key={link.label}
                style={{
                  marginBottom: '0.6rem',
                }}
              >
                <a
                  href={link.href}
                  style={{
                    fontSize: '0.875rem',
                    color: '#666',
                    textDecoration: 'none',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = '#0a0a0a')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = '#666')
                  }
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div
        style={{
          borderTop: '1px solid rgba(0,0,0,0.07)',
        }}
      >
        <div
          style={{
            padding: '1.25rem clamp(1.5rem, 5vw, 4rem)',
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'space-between',
            alignItems: isMobile ? 'flex-start' : 'center',
            gap: '1rem',
          }}
        >
          <p
            style={{
              fontSize: '0.75rem',
              color: '#bbb',
              margin: 0,
            }}
          >
            ©{year} Creaut Bali · All rights reserved
          </p>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: isMobile ? '1rem' : '1.5rem',
              alignItems: 'center',
            }}
          >
            {['Privacy Policy', 'Terms of Use', 'FAQ'].map((item) => (
              <a
                key={item}
                href="#"
                style={{
                  fontSize: '0.72rem',
                  color: '#bbb',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = '#0a0a0a')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = '#bbb')
                }
              >
                {item}
              </a>
            ))}

            <button
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth',
                })
              }
              style={{
                background: '#f5f5f5',
                border: '1.5px solid rgba(0,0,0,0.12)',
                color: '#666',
                cursor: 'pointer',
                padding: '0.35rem 0.85rem',
                fontSize: '0.72rem',
                fontWeight: 500,
                borderRadius: '6px',
                fontFamily: 'inherit',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#5de0e6'
                e.currentTarget.style.color = '#004aad'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor =
                  'rgba(0,0,0,0.12)'
                e.currentTarget.style.color = '#666'
              }}
            >
              ↑ Top
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}