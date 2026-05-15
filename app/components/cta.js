'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function CTA() {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(contentRef.current.querySelectorAll('.cta-item'),
      { y: 36, opacity: 0 },
      {
        y: 0, opacity: 1, stagger: 0.1, duration: 0.85, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' },
      }
    )
  }, [])

  return (
    <section
      ref={sectionRef}
      id="contact"
      style={{
        background: '#fff',
        borderTop: '1px solid var(--border)',
        padding: 'clamp(10rem, 8vw, 7rem) 0',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Soft gradient glow */}
      <div style={{
        position: 'absolute',
        top: '-40%', left: '50%',
        transform: 'translateX(-50%)',
        width: '80%', height: '180%',
        background: 'radial-gradient(ellipse at center, rgba(93,224,230,0.07) 0%, rgba(0,74,173,0.04) 45%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div ref={contentRef} style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center' }}>

          {/* Badge */}
          <div className="cta-item" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            border: '1px solid var(--border-strong)', borderRadius: '999px',
            padding: '0.35rem 0.9rem', marginBottom: '1.75rem',
            background: 'var(--bg-soft)',
          }}>
            <div style={{
              width: 6, height: 6, borderRadius: '50%',
              background: 'linear-gradient(90deg, #5de0e6, #004aad)',
              flexShrink: 0,
            }} />
            <span style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.06em' }}>
              Start a Project
            </span>
          </div>

          {/* Headline */}
          <h2 className="cta-item" style={{
            fontSize: 'clamp(2rem, 5.5vw, 4.5rem)',
            fontWeight: 800,
            letterSpacing: '-0.05em',
            color: 'var(--text)',
            lineHeight: 1.05,
            marginBottom: '1.25rem',
          }}>
            Interested in{' '}
            <span style={{
              background: 'linear-gradient(90deg, #5de0e6, #004aad)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Working Together?
            </span>
          </h2>

          <p className="cta-item" style={{
            fontSize: '1rem', color: 'var(--text-muted)',
            lineHeight: 1.75, marginBottom: '2.5rem',
          }}>
            Tell us about your project. We're always excited for new creative challenges.
          </p>

          {/* Buttons */}
          <div className="cta-item" style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="https://wa.me/6287780594231"
              target="_blank" rel="noreferrer"
              style={{
                padding: '0.9rem 2.25rem',
                background: 'linear-gradient(90deg, #5de0e6, #004aad)',
                color: '#fff', textDecoration: 'none',
                fontSize: '0.875rem', fontWeight: 600,
                borderRadius: '8px',
                display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                transition: 'opacity 0.2s',
                boxShadow: '0 4px 24px rgba(0,74,173,0.18)',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              WhatsApp Us ↗
            </a>
            <a
              href="mailto:ask@creautbali.com"
              style={{
                padding: '0.9rem 2.25rem',
                background: '#fff',
                border: '1.5px solid var(--border-strong)',
                color: 'var(--text)', textDecoration: 'none',
                fontSize: '0.875rem', fontWeight: 600,
                borderRadius: '8px',
                display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                transition: 'border-color 0.2s, color 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#5de0e6'; e.currentTarget.style.color = '#004aad' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-strong)'; e.currentTarget.style.color = 'var(--text)' }}
            >
              Email Us ↗
            </a>
          </div>

          {/* Contact info */}
          <div className="cta-item" style={{
            marginTop: '4rem', paddingTop: '2.5rem',
            borderTop: '1px solid var(--border)',
            display: 'flex', justifyContent: 'center',
            gap: 'clamp(1.5rem, 4vw, 3rem)', flexWrap: 'wrap',
          }}>
            {[
              { label: 'Email',     value: 'creautbali@gmail.com',  href: 'mailto:creautbali@gmail.com' },
              { label: 'WhatsApp',  value: '+62 877-8059-4231',     href: 'https://wa.me/6287780594231' },
              { label: 'Location',  value: 'Bali, Indonesia',       href: 'https://www.google.com/maps/dir/?api=1&destination=Creaut+Bali' },
            ].map(item => (
              <div key={item.label} style={{ textAlign: 'center' }}>
                <p style={{
                  fontSize: '0.62rem', fontWeight: 700,
                  letterSpacing: '0.14em', textTransform: 'uppercase',
                  color: 'var(--text-light)', marginBottom: '0.35rem',
                }}>
                  {item.label}
                </p>
                <a href={item.href} target="_blank" rel="noreferrer" style={{
                  fontSize: '0.875rem', fontWeight: 500,
                  color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s',
                }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                >
                  {item.value}
                </a>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}