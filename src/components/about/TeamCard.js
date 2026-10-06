'use client'

import { useState } from 'react'

export default function TeamCard({ member, isExecutive = false }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="team-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '0.78 / 1',
        borderRadius: '10px',
        overflow: 'hidden',
        cursor: 'default',
        background: '#e8e8e8',
        boxShadow: hovered
          ? '0 14px 30px rgba(0,0,0,0.16)'
          : '0 5px 16px rgba(0,0,0,0.10)',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        transition:
          'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.4s ease',
      }}
    >
      {/* PORTRAIT */}
      <img
        src={member.img}
        alt={member.name}
        draggable={false}
        loading="lazy"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          display: 'block',
          transform: hovered ? 'scale(1.025)' : 'scale(1)',
          transition:
            'transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      />

      {/* SUBTLE PHOTO TONE */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(0,0,0,0) 42%, rgba(0,0,0,0.03) 55%, rgba(0,0,0,0.72) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* BOTTOM INFORMATION */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          padding: isExecutive
            ? '1.1rem 1rem 0.95rem'
            : '0.9rem 0.85rem 0.8rem',
          zIndex: 2,
        }}
      >
        <p
          style={{
            margin: 0,
            color: '#fff',
            fontSize: isExecutive
              ? 'clamp(0.78rem, 1vw, 0.92rem)'
              : 'clamp(0.68rem, 0.85vw, 0.82rem)',
            fontWeight: 600,
            lineHeight: 1.2,
            letterSpacing: '-0.01em',
            textShadow: '0 1px 8px rgba(0,0,0,0.3)',
          }}
        >
          {member.name}
        </p>

        <p
          style={{
            margin: '0.22rem 0 0',
            color: 'rgba(255,255,255,0.72)',
            fontSize: isExecutive ? '0.55rem' : '0.5rem',
            fontWeight: 400,
            lineHeight: 1.25,
            letterSpacing: '0.02em',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            textShadow: '0 1px 6px rgba(0,0,0,0.35)',
          }}
        >
          {member.role}
        </p>
      </div>
    </div>
  )
}
