'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { number: '7+',   label: 'Years Experience' },
  { number: '200+', label: 'Happy Clients' },
  { number: '500+', label: 'Projects Done' },
  { number: '12',   label: 'Team Members' },
]

const values = [
  { title: 'Creative First',     desc: 'Every project starts with bold ideas before anything else.' },
  { title: 'Story-driven',       desc: 'We craft narratives that connect brands with real people.' },
  { title: 'Always On Time',     desc: 'Deadlines are commitments. We treat them that way.' },
  { title: 'Client-Obsessed',    desc: 'Your success is the only metric that matters to us.' },
]

export default function About() {
  const sectionRef   = useRef(null)
  const labelRef     = useRef(null)
  const headingRef   = useRef(null)
  const bodyRef      = useRef(null)
  const statsRef     = useRef(null)
  const valuesRef    = useRef(null)
  const imgRef       = useRef(null)
  const ctaRef       = useRef(null)
  const dividerRef   = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* ── Left column: label → heading → body → cta ── */
      const leftItems = [
        labelRef.current,
        dividerRef.current,
        headingRef.current,
        bodyRef.current,
        ctaRef.current,
      ]
      gsap.set(leftItems, { opacity: 0, y: 36 })
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 75%',
        onEnter: () => {
          gsap.to(leftItems, {
            opacity: 1, y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power3.out',
          })
        },
      })

      /* ── Right: image panel ── */
      gsap.set(imgRef.current, { opacity: 0, x: 40 })
      ScrollTrigger.create({
        trigger: imgRef.current,
        start: 'top 78%',
        onEnter: () => {
          gsap.to(imgRef.current, { opacity: 1, x: 0, duration: 1, ease: 'power3.out' })
        },
      })

      // /* ── Stats count-up ── */
      // const statEls = statsRef.current.querySelectorAll('.stat-num')
      // gsap.set(statEls, { opacity: 0, y: 20 })
      // ScrollTrigger.create({
      //   trigger: statsRef.current,
      //   start: 'top 82%',
      //   onEnter: () => {
      //     gsap.to(statEls, {
      //       opacity: 1, y: 0,
      //       duration: 0.6,
      //       stagger: 0.1,
      //       ease: 'power3.out',
      //     })
      //   },
      // })

      /* ── Values cards stagger ── */
      const cards = valuesRef.current.querySelectorAll('.value-card')
      gsap.set(cards, { opacity: 0, y: 28 })
      ScrollTrigger.create({
        trigger: valuesRef.current,
        start: 'top 82%',
        onEnter: () => {
          gsap.to(cards, {
            opacity: 1, y: 0,
            duration: 0.65,
            stagger: 0.1,
            ease: 'power3.out',
          })
        },
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about"
      style={{ background: '#fff', borderTop: '1px solid rgba(0,0,0,0.07)' }}
    >

      {/* ── TOP: 2-col intro ───────────────────────────────────────── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        minHeight: '90vh',
      }}>

        {/* Left — text */}
        <div style={{
          padding: 'clamp(4rem, 8vw, 7rem) clamp(2rem, 5vw, 5rem)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '1.75rem',
        }}>

          {/* Label */}
          <div ref={labelRef} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: 28, height: 2, borderRadius: 2,
              background: 'linear-gradient(90deg, #5de0e6, #004aad)',
            }} />
            <span style={{
              fontSize: '0.7rem', fontWeight: 700,
              letterSpacing: '0.18em', textTransform: 'uppercase',
              color: '#004aad',
            }}>
              About Us
            </span>
          </div>

          {/* Heading */}
          <div ref={headingRef}>
            <h2 style={{
              fontWeight: 800,
              fontSize: 'clamp(2.4rem, 5vw, 4.2rem)',
              color: '#0a0a0a',
              letterSpacing: '-0.04em',
              lineHeight: 1.05,
              margin: 0,
            }}>
              We are a{' '}
              <span style={{
                background: 'linear-gradient(90deg, #5de0e6, #004aad)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                creative
              </span>
              <br />powerhouse
              <br />in Bali
            </h2>
          </div>

          {/* Divider */}
          <div ref={dividerRef} style={{
            width: 48, height: 2, borderRadius: 2,
            background: 'linear-gradient(90deg, #5de0e6, #004aad)',
          }} />

          {/* Body */}
          <p ref={bodyRef} style={{
            fontSize: '1rem',
            color: 'rgba(0,0,0,0.55)',
            lineHeight: 1.8,
            maxWidth: 440,
            margin: 0,
          }}>
            Creaut Bali is a full-service creative agency based in the heart of Bali.
            We help brands tell their stories through compelling visual content —
            from high-end video production to strategic social media management.
            <br /><br />
            Our team of creatives, strategists, and storytellers has worked with
            200+ brands across Indonesia and Southeast Asia, delivering work that
            resonates, converts, and endures.
          </p>

          {/* CTA */}
          <div ref={ctaRef} style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <a
              href="#contact"
              style={{
                padding: '0.85rem 2rem',
                background: 'linear-gradient(90deg, #5de0e6, #004aad)',
                color: '#fff', textDecoration: 'none',
                fontSize: '0.875rem', fontWeight: 600,
                borderRadius: '7px',
                transition: 'opacity 0.2s',
                boxShadow: '0 4px 20px rgba(0,74,173,0.2)',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              Work With Us →
            </a>
            <a
              href="#portfolio"
              style={{
                padding: '0.85rem 2rem',
                background: 'transparent',
                border: '1.5px solid rgba(0,0,0,0.14)',
                color: '#0a0a0a', textDecoration: 'none',
                fontSize: '0.875rem', fontWeight: 600,
                borderRadius: '7px',
                transition: 'border-color 0.2s, color 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#5de0e6'; e.currentTarget.style.color = '#004aad' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.14)'; e.currentTarget.style.color = '#0a0a0a' }}
            >
              Our Work
            </a>
          </div>

        </div>

        {/* Right — visual panel */}
        <div
          ref={imgRef}
          style={{
            position: 'relative',
            background: '#f4f4f4',
            overflow: 'hidden',
            minHeight: 480,
          }}
        >

          {/* Placeholder grid pattern */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.06) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }} />

          {/* Gradient wash */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(135deg, rgba(93,224,230,0.08) 0%, rgba(0,74,173,0.12) 100%)',
          }} />

          {/* Center brand mark */}
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            gap: '1rem',
          }}>
            <div style={{
              width: 80, height: 80, borderRadius: '18px',
              background: 'linear-gradient(135deg, #5de0e6, #004aad)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 12px 40px rgba(0,74,173,0.25)',
            }}>
              <span style={{ fontWeight: 800, fontSize: '1.6rem', color: '#fff', letterSpacing: '-0.03em' }}>CB</span>
            </div>
            <p style={{
              fontSize: '0.72rem', fontWeight: 700,
              letterSpacing: '0.18em', textTransform: 'uppercase',
              color: 'rgba(0,0,0,0.3)',
            }}>
              Est. 2017 · Bali, Indonesia
            </p>
          </div>

          {/* Bottom label */}
          <div style={{
            position: 'absolute', bottom: '2rem', left: '2rem', right: '2rem',
            display: 'flex', alignItems: 'center', gap: '0.75rem',
          }}>
            <div style={{
              width: 8, height: 8, borderRadius: '50%',
              background: 'linear-gradient(135deg, #5de0e6, #004aad)',
              flexShrink: 0,
            }} />
            <span style={{
              fontSize: '0.68rem', fontWeight: 600,
              letterSpacing: '0.14em', textTransform: 'uppercase',
              color: 'rgba(0,0,0,0.35)',
            }}>
              Replace with your team photo or video
            </span>
          </div>
        </div>

      </div>

      {/* ── STATS ROW ─────────────────────────────────────────────── */}
      {/* <div
        ref={statsRef}
        style={{
          borderTop: '1px solid rgba(0,0,0,0.07)',
          borderBottom: '1px solid rgba(0,0,0,0.07)',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
        }}
      >
        {stats.map((s, i) => (
          <div
            key={s.label}
            style={{
              padding: 'clamp(2rem, 4vw, 3rem) clamp(1.5rem, 3vw, 2.5rem)',
              borderRight: i < stats.length - 1 ? '1px solid rgba(0,0,0,0.07)' : 'none',
              textAlign: 'center',
            }}
          >
            <div
              className="stat-num"
              style={{
                fontWeight: 800,
                fontSize: 'clamp(2.2rem, 4vw, 3.5rem)',
                letterSpacing: '-0.05em',
                lineHeight: 1,
                background: 'linear-gradient(90deg, #5de0e6, #004aad)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: '0.4rem',
              }}
            >
              {s.number}
            </div>
            <p style={{
              fontSize: '0.75rem', fontWeight: 500,
              letterSpacing: '0.08em', textTransform: 'uppercase',
              color: 'rgba(0,0,0,0.4)',
              margin: 0,
            }}>
              {s.label}
            </p>
          </div>
        ))}
      </div> */}

      {/* ── VALUES GRID ───────────────────────────────────────────── */}
      <div
        ref={valuesRef}
        style={{
          padding: 'clamp(4rem, 7vw, 6rem) clamp(2rem, 5vw, 5rem)',
          maxWidth: 1200, margin: '0 auto',
        }}
      >
        {/* Sub header */}
        <div style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <div style={{ width: 28, height: 2, borderRadius: 2, background: 'linear-gradient(90deg, #5de0e6, #004aad)' }} />
            <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#004aad' }}>
              Our Values
            </span>
          </div>
          <h3 style={{
            fontWeight: 700, fontSize: 'clamp(1.6rem, 3vw, 2.5rem)',
            color: '#0a0a0a', letterSpacing: '-0.03em', margin: 0,
          }}>
            What drives us every day
          </h3>
        </div>

        {/* 4-col cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1px',
          background: 'rgba(0,0,0,0.07)',
          border: '1px solid rgba(0,0,0,0.07)',
          borderRadius: '12px',
          overflow: 'hidden',
        }}>
          {values.map((v, i) => (
            <ValueCard key={v.title} value={v} index={i} />
          ))}
        </div>
      </div>

    </section>
  )
}

function ValueCard({ value, index }) {
  const [hovered, setHovered] = useState(false)
  const cardRef = useRef(null)

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="value-card"
      style={{
        padding: 'clamp(1.75rem, 3vw, 2.5rem)',
        background: hovered ? 'rgba(93,224,230,0.04)' : '#fff',
        transition: 'background 0.3s ease',
        cursor: 'default',
      }}
    >
      {/* Gradient number */}
      <div style={{
        fontWeight: 800, fontSize: '1rem',
        background: 'linear-gradient(90deg, #5de0e6, #004aad)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        marginBottom: '1rem',
        letterSpacing: '0.05em',
        opacity: hovered ? 1 : 0.5,
        transition: 'opacity 0.3s',
      }}>
        0{index + 1}
      </div>

      <h4 style={{
        fontWeight: 700, fontSize: '1.05rem',
        color: '#0a0a0a', letterSpacing: '-0.02em',
        marginBottom: '0.6rem',
        transition: 'color 0.3s',
      }}>
        {value.title}
      </h4>

      <p style={{
        fontSize: '0.875rem',
        color: 'rgba(0,0,0,0.45)',
        lineHeight: 1.7, margin: 0,
      }}>
        {value.desc}
      </p>

      {/* Bottom gradient line — visible on hover */}
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