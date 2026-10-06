'use client'

import { forwardRef } from 'react'
import { vision, missions } from '@/data/about'

const GRADIENT = 'linear-gradient(90deg, #5de0e6, #004aad)'

/**
 * Section Visi & Misi untuk halaman About.
 * Konten diambil dari `src/data/about.js` (vision, missions).
 * Elemen `.vm-reveal` dianimasikan oleh halaman About (GSAP).
 */
const VisionMission = forwardRef(function VisionMission(_, ref) {
  return (
    <section
      id="vision-mission"
      ref={ref}
      className="panel-vision"
      style={{
        background: '#fff',
        padding: 'clamp(4rem, 7vw, 6rem) clamp(1.75rem, 5vw, 5rem)',
        boxShadow: '0 -24px 60px rgba(0,0,0,0.08), 0 -3px 12px rgba(0,0,0,0.06)',
      }}
    >
      <style>{`
        .vm-grid { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr); gap: clamp(1.5rem, 3vw, 2.5rem); align-items: stretch; }
        .vm-mission-item { transition: background 0.3s ease; }
        .vm-mission-item:hover { background: rgba(93,224,230,0.04); }
        @media (max-width: 860px) { .vm-grid { grid-template-columns: 1fr; } }
      `}</style>

      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div className="vm-reveal" style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <div style={{ width: 28, height: 2, borderRadius: 2, background: GRADIENT }} />
            <span style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#004aad' }}>
              Vision &amp; Mission
            </span>
          </div>
          <h2 style={{ fontWeight: 700, fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', color: '#0a0a0a', letterSpacing: '-0.04em', margin: 0 }}>
            Where We&apos;re Heading
          </h2>
        </div>

        <div className="vm-grid">
          {/* Vision */}
          <div
            className="vm-reveal"
            style={{
              position: 'relative',
              overflow: 'hidden',
              borderRadius: 12,
              padding: 'clamp(2rem, 4vw, 3rem)',
              background: 'linear-gradient(145deg, #004aad 0%, #0a1f4d 100%)',
              color: '#fff',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '2rem',
              minHeight: 320,
            }}
          >
            <div
              aria-hidden
              style={{ position: 'absolute', top: -80, right: -80, width: 260, height: 260, borderRadius: '50%', background: 'radial-gradient(circle, rgba(93,224,230,0.35) 0%, transparent 70%)' }}
            />
            <span style={{ position: 'relative', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#5de0e6' }}>
              {vision.label}
            </span>
            <p style={{ position: 'relative', margin: 0, fontWeight: 700, fontSize: 'clamp(1.35rem, 2.4vw, 1.9rem)', lineHeight: 1.35, letterSpacing: '-0.02em' }}>
              {vision.statement}
            </p>
          </div>

          {/* Mission */}
          <div
            className="vm-reveal"
            style={{ borderRadius: 12, overflow: 'hidden', background: 'rgba(0,0,0,0.06)', display: 'grid', gap: 1 }}
          >
            {missions.map((m, i) => (
              <div key={m.title} className="vm-mission-item" style={{ background: '#fff', padding: 'clamp(1.25rem, 2.2vw, 1.75rem)', display: 'flex', gap: '1.25rem' }}>
                <div
                  style={{
                    fontWeight: 800, fontSize: '1.5rem', letterSpacing: '-0.05em', lineHeight: 1,
                    background: GRADIENT, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                    minWidth: 36,
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div>
                  <h4 style={{ margin: '0 0 0.4rem 0', fontWeight: 700, fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.04em', color: '#0a0a0a' }}>
                    {m.title}
                  </h4>
                  <p style={{ margin: 0, fontSize: '0.875rem', lineHeight: 1.7, color: 'rgba(0,0,0,0.5)' }}>{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
})

export default VisionMission
