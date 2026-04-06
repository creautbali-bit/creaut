'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import Navbar from '../components/navbar'
import Footer from '../components/footer'

gsap.registerPlugin(ScrollTrigger)

const contacts = [
  { label: 'WhatsApp',  value: '+62 877-8059-4231',      href: 'https://wa.me/6287780594231'},
{   label: 'Email',     value: 'creautbali@gmail.com',   href: 'mailto:creautbali@gmail.com' },
  { label: 'Instagram', value: '@creautbali',            href: 'https://www.instagram.com/'},
  { label: 'YouTube',   value: 'Creaut Bali',            href: 'https://www.youtube.com/'},
]

export default function HeadquarterPage() {
  const heroRef    = useRef(null)
  const textRef    = useRef(null)
  const overlayRef = useRef(null)
  const mapRef     = useRef(null)
  const infoRef    = useRef(null)

  /* Hero entrance */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .fromTo(overlayRef.current,
          { scaleY: 1 },
          { scaleY: 0, duration: 1.2, ease: 'power4.inOut', transformOrigin: 'top' }
        )
        .fromTo(textRef.current.querySelectorAll('.hero-line'),
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.1, duration: 0.9 },
          '-=0.4'
        )
    }, heroRef)
    return () => ctx.revert()
  }, [])

  /* Map + info reveal */
  useEffect(() => {
    if (!mapRef.current || !infoRef.current) return

    gsap.fromTo(infoRef.current.querySelectorAll('.info-item'),
      { opacity: 0, y: 28 },
      {
        opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: infoRef.current, start: 'top 78%' },
      }
    )
    gsap.fromTo(mapRef.current,
      { opacity: 0, y: 32 },
      {
        opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: mapRef.current, start: 'top 80%' },
      }
    )
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
          {/* BG */}
          <div style={{
            position: 'absolute', inset: 0, zIndex: 0,
            background: '#fff',
            backgroundImage: `
              radial-gradient(circle at 20% 60%, rgba(93,224,230,0.06) 0%, transparent 45%),
              radial-gradient(circle at 80% 25%, rgba(0,74,173,0.08) 0%, transparent 45%)
            `,
          }} />

          {/* Curtain */}
          <div ref={overlayRef} style={{
            position: 'absolute', inset: 0, zIndex: 10,
            background: 'linear-gradient(135deg, #5de0e6, #004aad)',
            transformOrigin: 'top', pointerEvents: 'none',
          }} />

          {/* Text */}
          <div ref={textRef} style={{
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
              <span style={{ color: 'rgba(255,255,255,0.2)' }}>·</span>
              <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#5de0e6', letterSpacing: '0.1em' }}>Headquarter</span>
            </div>

            {/* Label */}
            <div className="hero-line" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: 28, height: 2, borderRadius: 2, background: 'linear-gradient(90deg, #5de0e6, #004aad)' }} />
              <span style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(0, 0, 0, 0.4)' }}>
                Bali, Indonesia
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
              Head
              <span style={{
                background: 'linear-gradient(90deg, #5de0e6, #004aad)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>
                quarter
              </span>
            </h1>

            {/* Address preview */}
            <p className="hero-line" style={{
              fontSize: 'clamp(0.875rem, 1.5vw, 1rem)',
              color: 'rgba(0, 0, 0, 0.45)',
              lineHeight: 1.8, margin: 0, textAlign: 'center',
            }}>
              Jl. Kusuma Bangsa No.3 Pemecutan Kaja, Denpasar Utara<br />
              Kota Denpasar, Bali 80118
            </p>
          </div>

          {/* Scroll hint */}
          <div style={{ position: 'absolute', bottom: '2.5rem', left: '50%', transform: 'translateX(-50%)', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(0, 0, 0, 0.25)' }}>Scroll</span>
            <div style={{ width: 1, height: 40, background: 'linear-gradient(180deg, rgba(93,224,230,0.6), transparent)', borderRadius: 1 }} />
          </div>
        </section>

        {/* ── MAP + INFO ────────────────────────────────────────── */}
        <section style={{
          background: '#fff',
          padding: 'clamp(4rem, 7vw, 6rem) clamp(1.75rem, 5vw, 4rem)',
        }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 'clamp(2.5rem, 5vw, 5rem)',
              alignItems: 'start',
            }}>

              {/* ── LEFT: address + contacts ── */}
              <div ref={infoRef}>
                {/* Label */}
                <div className="info-item" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  <div style={{ width: 28, height: 2, borderRadius: 2, background: 'linear-gradient(90deg, #5de0e6, #004aad)' }} />
                  <span style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#004aad' }}>
                    Our Location
                  </span>
                </div>

                {/* Company name */}
                <h2 className="info-item" style={{
                  fontWeight: 800,
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  color: '#0a0a0a',
                  letterSpacing: '-0.04em',
                  lineHeight: 1.05,
                  margin: '0 0 0.5rem 0',
                }}>
                  Creaut Bali
                </h2>
                <p className="info-item" style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.35)', margin: '0 0 2rem 0' }}>
                  Creative Agency
                </p>

                {/* Address block */}
                <div className="info-item" style={{
                  padding: '1.5rem',
                  background: '#f8f8f8',
                  borderRadius: '12px',
                  borderLeft: '3px solid transparent',
                  borderImage: 'linear-gradient(180deg, #5de0e6, #004aad) 1',
                  marginBottom: '2rem',
                }}>
                  <p style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)', margin: '0 0 0.75rem 0' }}>
                    Address
                  </p>
                  <p style={{ fontSize: '1rem', color: '#0a0a0a', lineHeight: 1.8, margin: '0 0 1rem 0', fontWeight: 500 }}>
                    Jl. Kusuma Bangsa No.3 Pemecutan Kaja, Denpasar Utara <br/>
                    Kota Denpasar, Bali 80118
                  </p>
                  <a
                    href="https://www.google.com/maps/dir/?api=1&destination=Creaut+Bali"
                    target="_blank" rel="noreferrer"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                      fontSize: '0.78rem', fontWeight: 600,
                      background: 'linear-gradient(90deg, #5de0e6, #004aad)',
                      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                      textDecoration: 'none', transition: 'opacity 0.2s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
                    onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                  >
                    Open in Google Maps ↗
                  </a>
                </div>

                {/* Contact list */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                  {contacts.map((c, i) => (
                    <div key={c.label} className="info-item" style={{
                      display: 'flex', alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '1rem 0',
                      borderBottom: i < contacts.length - 1 ? '1px solid rgba(0,0,0,0.07)' : 'none',
                      gap: '1rem',
                    }}>
                      <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.35)', flexShrink: 0 }}>
                        {c.label}
                      </span>
                      <a href={c.href} target="_blank" rel="noreferrer" style={{
                        fontSize: '0.9rem', fontWeight: 600,
                        color: '#0a0a0a', textDecoration: 'none',
                        transition: 'color 0.2s', textAlign: 'right',
                      }}
                        onMouseEnter={e => {
                          e.currentTarget.style.background = 'linear-gradient(90deg, #5de0e6, #004aad)'
                          e.currentTarget.style.WebkitBackgroundClip = 'text'
                          e.currentTarget.style.WebkitTextFillColor = 'transparent'
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.background = 'none'
                          e.currentTarget.style.WebkitTextFillColor = '#0a0a0a'
                        }}
                      >
                        {c.value}
                      </a>
                    </div>
                  ))}
                </div>

                {/* CTA button */}
                <div className="info-item" style={{ marginTop: '2rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <a href="https://wa.me/6287780594231" target="_blank" rel="noreferrer" style={{
                    padding: '0.9rem 2rem',
                    background: 'linear-gradient(90deg, #5de0e6, #004aad)',
                    color: '#fff', textDecoration: 'none',
                    fontSize: '0.875rem', fontWeight: 600,
                    borderRadius: '8px', transition: 'opacity 0.2s',
                    boxShadow: '0 4px 20px rgba(0,74,173,0.2)',
                    display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                  }}
                    onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                    onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                  >
                    Interested in Working Together? ↗
                  </a>
                </div>
              </div>

              {/* ── RIGHT: Google Maps embed ── */}
              <div ref={mapRef}>
                <div className="info-item" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  <div style={{ width: 28, height: 2, borderRadius: 2, background: 'linear-gradient(90deg, #5de0e6, #004aad)' }} />
                  <span style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#004aad' }}>
                    Find Us
                  </span>
                </div>

                {/* Map iframe */}
                <div style={{
                  borderRadius: '14px',
                  overflow: 'hidden',
                  boxShadow: '0 8px 40px rgba(0,74,173,0.12)',
                  border: '1px solid rgba(0,0,0,0.07)',
                  position: 'relative',
                }}>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3744.2183690483407!2d115.2029084!3d-8.6413856!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd23fdd30e255c5%3A0xcc361f7313e3c225!2sCREAUT%20BALI%20-%20Creative%20Authentic%20Bali!5e1!3m2!1sen!2sid!4v1775460536215!5m2!1sen!2sid"
                    width="100%"
                    height="460"
                    style={{ display: 'block', border: 'none' }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Creaut Bali Location"
                  />

                  {/* Gradient overlay strip at bottom */}
                  <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0,
                    height: 4,
                    background: 'linear-gradient(90deg, #5de0e6, #004aad)',
                  }} />
                </div>

                {/* Open in maps link */}
                <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
                  <a
                    href="https://maps.app.goo.gl/7TjExxZDccXoAGxJ9"
                    target="_blank" rel="noreferrer"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                      fontSize: '0.78rem', fontWeight: 600,
                      color: 'rgba(0,0,0,0.45)', textDecoration: 'none',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = '#004aad'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(0,0,0,0.45)'}
                  >
                    🗺 Open in Google Maps ↗
                  </a>
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  )
}