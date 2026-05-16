'use client'

import { useState, useEffect } from 'react'

export default function Footer() {
  const year = new Date().getFullYear()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const serviceLinks = [
    { label: 'Video Production',   href: '/services/video-production' },
    { label: 'Social Media Management',  href: '/services/social-media' },
    { label: 'Visual Photography', href: '/services/visual-photography' },
    { label: 'Branding',           href: '/services/branding' },
  ]

  const companyLinks = [
    { label: 'About Us',    href: '#about' },
    { label: 'Our Work',    href: '#portfolio' },
    { label: 'Headquarter', href: '/headquarter' },
  ]

  const socials = [
    { label: 'IG', full: 'Instagram', href: 'https://www.instagram.com/' },
    { label: 'YT', full: 'YouTube',   href: 'https://www.youtube.com/' },
  ]

  return (
    <footer style={{ background: '#fff', borderTop: '1px solid rgba(0,0,0,0.08)' }}>

      {/* Main grid */}
      <div style={{
        padding: 'clamp(3rem, 6vw, 5rem) clamp(1.5rem, 5vw, 4rem) 2.5rem',
        display: 'grid',
        /* Desktop: 3 kolom | Mobile: 1 kolom */
        gridTemplateColumns: isMobile ? '1fr' : '1.6fr 1fr 1fr',
        gap: isMobile ? '2.5rem' : 'clamp(2rem, 5vw, 4rem)',
      }}>

        {/* ── Brand col ── */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', marginBottom: '1.25rem' }}>
            <div style={{
              width: 34, height: 34, borderRadius: '8px',
              background: 'linear-gradient(135deg, #5de0e6, #004aad)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#fff' }}>CB</span>
            </div>
            <span style={{ fontWeight: 700, fontSize: '1rem', color: '#0a0a0a', letterSpacing: '-0.03em' }}>
              Creaut Bali
            </span>
          </div>

          <p style={{ fontSize: '0.875rem', color: '#888', lineHeight: 1.75, maxWidth: 260, marginBottom: '1.25rem' }}>
            Bali-based creative agency crafting visual stories that move, inspire, and convert.
          </p>

          <p style={{ fontSize: '0.8rem', color: '#aaa', lineHeight: 1.7, marginBottom: '1.5rem' }}>
            Bali, Indonesia<br />creautbali@gmail.com
          </p>

          {/* Socials */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {socials.map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" title={s.full}
                style={{
                  width: 34, height: 34,
                  border: '1.5px solid rgba(0,0,0,0.12)',
                  borderRadius: '8px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.6rem', fontWeight: 700, color: '#999',
                  textDecoration: 'none', transition: 'all 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = '#5de0e6'
                  e.currentTarget.style.color = '#004aad'
                  e.currentTarget.style.background = 'rgba(93,224,230,0.08)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(0,0,0,0.12)'
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
          <h4 style={{
            fontSize: '0.68rem', fontWeight: 700,
            letterSpacing: '0.12em', textTransform: 'uppercase',
            color: '#bbb', marginBottom: '1.25rem',
          }}>
            Services
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {serviceLinks.map(link => (
              <li key={link.label} style={{ marginBottom: '0.6rem' }}>
                <a href={link.href} style={{
                  fontSize: '0.875rem', color: '#666',
                  textDecoration: 'none', transition: 'color 0.2s',
                }}
                  onMouseEnter={e => e.currentTarget.style.color = '#0a0a0a'}
                  onMouseLeave={e => e.currentTarget.style.color = '#666'}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Company col ── */}
        <div>
          <h4 style={{
            fontSize: '0.68rem', fontWeight: 700,
            letterSpacing: '0.12em', textTransform: 'uppercase',
            color: '#bbb', marginBottom: '1.25rem',
          }}>
            Company
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {companyLinks.map(link => (
              <li key={link.label} style={{ marginBottom: '0.6rem' }}>
                <a href={link.href} style={{
                  fontSize: '0.875rem', color: '#666',
                  textDecoration: 'none', transition: 'color 0.2s',
                }}
                  onMouseEnter={e => e.currentTarget.style.color = '#0a0a0a'}
                  onMouseLeave={e => e.currentTarget.style.color = '#666'}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* ── Bottom bar ── */}
      <div style={{ borderTop: '1px solid rgba(0,0,0,0.07)' }}>
        <div style={{
          padding: '1.25rem clamp(1.5rem, 5vw, 4rem)',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between',
          alignItems: isMobile ? 'flex-start' : 'center',
          gap: '1rem',
        }}>
          <p style={{ fontSize: '0.75rem', color: '#bbb', margin: 0 }}>
            ©{year} Creaut Bali · All rights reserved
          </p>

          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: isMobile ? '1rem' : '1.5rem',
            alignItems: 'center',
          }}>
            {['Privacy Policy', 'Terms of Use', 'FAQ'].map(item => (
              <a key={item} href="#" style={{
                fontSize: '0.72rem', color: '#bbb',
                textDecoration: 'none', transition: 'color 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.color = '#0a0a0a'}
                onMouseLeave={e => e.currentTarget.style.color = '#bbb'}
              >
                {item}
              </a>
            ))}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              style={{
                background: '#f5f5f5',
                border: '1.5px solid rgba(0,0,0,0.12)',
                color: '#666', cursor: 'pointer',
                padding: '0.35rem 0.85rem',
                fontSize: '0.72rem', fontWeight: 500,
                borderRadius: '6px', fontFamily: 'inherit',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = '#5de0e6'
                e.currentTarget.style.color = '#004aad'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(0,0,0,0.12)'
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