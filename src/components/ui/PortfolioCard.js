'use client'

import { useState } from 'react'

export default function PortfolioCard({ item, index, onPlay }) {
  const [hov, setHov] = useState(false)

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onPlay(index)}
      onKeyDown={e => e.key === 'Enter' && onPlay(index)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: 'relative',
        aspectRatio: '9 / 16',
        cursor: 'pointer',
        overflow: 'hidden',
        background: '#111',
        outline: 'none',
      }}
    >
      {/* Thumbnail */}
      <img
        src={item.image}
        alt={item.title}
        loading="lazy"
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover',
          transform: hov ? 'scale(1.06)' : 'scale(1)',
          transition: 'transform 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}
      />

      {/* Gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: hov
          ? 'linear-gradient(0deg, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.18) 55%, transparent 100%)'
          : 'linear-gradient(0deg, rgba(0,0,0,0.52) 0%, transparent 65%)',
        transition: 'background 0.4s ease',
      }} />

      {/* Play button */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: `translate(-50%, -50%) scale(${hov ? 1 : 0.8})`,
        opacity: hov ? 1 : 0.45,
        transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease',
        width: 48, height: 48,
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.12)',
        backdropFilter: 'blur(10px)',
        border: '1.5px solid rgba(255,255,255,0.28)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {/* YouTube play triangle */}
        <svg width="15" height="15" viewBox="0 0 24 24" fill="white">
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>

      {/* Duration badge */}
      {item.duration && (
        <div style={{
          position: 'absolute', top: '0.5rem', right: '0.5rem',
          padding: '0.18rem 0.42rem',
          background: 'rgba(0,0,0,0.62)',
          backdropFilter: 'blur(6px)',
          borderRadius: '4px',
          fontSize: '0.58rem', fontWeight: 600,
          color: 'rgba(255,255,255,0.8)',
          letterSpacing: '0.05em',
        }}>
          {item.duration}
        </div>
      )}

      {/* Bottom info */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '0.6rem 0.7rem',
        transform: hov ? 'translateY(0)' : 'translateY(2px)',
        transition: 'transform 0.3s ease',
      }}>
        <p style={{
          margin: 0,
          fontSize: '0.56rem', fontWeight: 700,
          color: 'rgba(93,224,230,0.9)',
          letterSpacing: '0.08em', textTransform: 'uppercase',
        }}>
          {item.client}
        </p>
        <p style={{
          margin: '0.15rem 0 0',
          fontSize: '0.68rem', fontWeight: 600,
          color: '#fff', lineHeight: 1.3,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>
          {item.title}
        </p>
      </div>
    </div>
  )
}