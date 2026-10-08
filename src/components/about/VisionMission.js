'use client'

import { forwardRef } from 'react'
import { useTranslation } from '@/i18n/LanguageProvider'

const GRADIENT = 'linear-gradient(90deg, #5de0e6, #004aad)'

const eyebrowStyle = {
  fontSize: '0.68rem',
  fontWeight: 700,
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
}

/**
 * Section Visi & Misi untuk halaman About.
 * Teks diambil dari kamus i18n (about.vision.*) sehingga ikut berganti bahasa.
 * Elemen `.vm-reveal` dianimasikan oleh halaman About (GSAP).
 */
const VisionMission = forwardRef(function VisionMission(_, ref) {
  const { dict } = useTranslation()
  const c = dict.about.vision

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
        .vm-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: clamp(1rem, 2.5vw, 2rem); align-items: stretch; }
        @media (max-width: 860px) { .vm-grid { grid-template-columns: 1fr; } }
      `}</style>

      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div className="vm-reveal" style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <div style={{ width: 28, height: 2, borderRadius: 2, background: GRADIENT }} />
            <span style={{ ...eyebrowStyle, color: '#004aad' }}>{c.eyebrow}</span>
          </div>
          <h2 style={{ fontWeight: 700, fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', color: '#0a0a0a', letterSpacing: '-0.04em', margin: 0 }}>
            {c.heading}
          </h2>
        </div>

        <div className="vm-grid">
          {/* Vision */}
          <article
            className="vm-reveal"
            style={{
              position: 'relative',
              overflow: 'hidden',
              borderRadius: 14,
              padding: 'clamp(1.75rem, 3.5vw, 2.75rem)',
              background: 'linear-gradient(145deg, #004aad 0%, #0a1f4d 100%)',
              color: '#fff',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              minHeight: 300,
            }}
          >
            <div
              aria-hidden
              style={{ position: 'absolute', top: -90, right: -90, width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle, rgba(93,224,230,0.35) 0%, transparent 70%)' }}
            />
            <span style={{ ...eyebrowStyle, position: 'relative', color: '#5de0e6' }}>{c.visionLabel}</span>
            <p style={{ position: 'relative', margin: 'auto 0 0', fontWeight: 600, fontSize: 'clamp(1.05rem, 1.7vw, 1.4rem)', lineHeight: 1.55, letterSpacing: '-0.01em' }}>
              {c.visionText}
            </p>
          </article>

          {/* Mission */}
          <article
            className="vm-reveal"
            style={{
              position: 'relative',
              overflow: 'hidden',
              borderRadius: 14,
              padding: 'clamp(1.75rem, 3.5vw, 2.75rem)',
              background: '#fff',
              border: '1px solid rgba(0,0,0,0.1)',
              boxShadow: '0 12px 40px rgba(0,74,173,0.06)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              minHeight: 300,
            }}
          >
            <div aria-hidden style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 4, background: 'linear-gradient(180deg, #5de0e6, #004aad)' }} />
            <span style={{ ...eyebrowStyle, color: '#004aad' }}>{c.missionLabel}</span>
            <p style={{ margin: 'auto 0 0', fontWeight: 500, fontSize: 'clamp(1rem, 1.55vw, 1.25rem)', lineHeight: 1.65, color: '#0a0a0a', letterSpacing: '-0.01em' }}>
              {c.missionText}
            </p>
          </article>
        </div>
      </div>
    </section>
  )
})

export default VisionMission
