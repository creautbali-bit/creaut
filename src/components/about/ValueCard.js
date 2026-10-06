'use client'

import { useState } from 'react'

export default function ValueCard({ value, index }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      className="value-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ padding: 'clamp(1.75rem, 3vw, 2.5rem)', background: hovered ? 'rgba(93,224,230,0.03)' : '#fff', transition: 'background 0.3s ease', cursor: 'default' }}
    >
      <div style={{ fontWeight: 800, fontSize: '2rem', letterSpacing: '-0.05em', lineHeight: 1, background: 'linear-gradient(90deg, #5de0e6, #004aad)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: '1rem' }}>
        {String(index + 1).padStart(2, '0')}
      </div>
      <h4 style={{ fontWeight: 700, fontSize: '1.05rem', color: '#0a0a0a', textTransform: 'uppercase', letterSpacing: '0.04em', margin: '0 0 0.65rem 0' }}>
        {value.title}
      </h4>
      <p style={{ fontSize: '0.875rem', color: 'rgba(0,0,0,0.45)', lineHeight: 1.75, margin: 0 }}>{value.desc}</p>
      <div style={{ marginTop: '1.5rem', height: 2, background: 'linear-gradient(90deg, #5de0e6, #004aad)', borderRadius: 2, transform: hovered ? 'scaleX(1)' : 'scaleX(0)', transformOrigin: 'left', transition: 'transform 0.4s ease' }} />
    </div>
  )
}
