'use client'

import { useEffect, useRef, useCallback, useState } from 'react'
import { gsap } from 'gsap'

/* ── Extract YouTube video ID from Shorts / watch / youtu.be URLs ── */
function getYouTubeId(url = '') {
  const matchers = [
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/watch\?.*v=([a-zA-Z0-9_-]{11})/,
    /youtu\.be\/([a-zA-Z0-9_-]{11})/,
  ]
  for (const rx of matchers) {
    const m = url.match(rx)
    if (m) return m[1]
  }
  return null
}

/* ── Small nav arrow button ── */
function NavArrow({ onClick, children }) {
  const [hov, setHov] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        flexShrink: 0,
        width: 40, height: 40,
        borderRadius: '50%',
        border: `1.5px solid ${hov ? 'transparent' : 'rgba(255,255,255,0.14)'}`,
        background: hov ? 'linear-gradient(135deg,#5de0e6,#004aad)' : 'rgba(255,255,255,0.07)',
        backdropFilter: 'blur(8px)',
        color: '#fff',
        fontSize: '1.35rem', lineHeight: 1,
        cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all 0.2s',
      }}
    >
      {children}
    </button>
  )
}

/* ── Main modal ── */
export default function VideoModal({ items, activeIndex, onChange, onClose }) {
  const overlayRef = useRef(null)
  const panelRef   = useRef(null)
  const thumbsRef  = useRef(null)

  const total    = items.length
  const item     = items[activeIndex]
  const videoId  = getYouTubeId(item?.url)
  const embedSrc = videoId
    ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`
    : null

  /* Entrance animation */
  useEffect(() => {
    gsap.fromTo(overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.28, ease: 'power2.out' }
    )
    gsap.fromTo(panelRef.current,
      { y: 22, opacity: 0, scale: 0.97 },
      { y: 0, opacity: 1, scale: 1, duration: 0.38, ease: 'power3.out' }
    )
  }, [])

  /* Keep active thumbnail centred in strip */
  useEffect(() => {
    const el = thumbsRef.current
    if (!el) return
    const thumbW = el.scrollWidth / total
    el.scrollTo({
      left: activeIndex * thumbW - el.clientWidth / 2 + thumbW / 2,
      behavior: 'smooth',
    })
  }, [activeIndex, total])

  const goTo = useCallback((i) => {
    onChange(((i % total) + total) % total)
  }, [total, onChange])

  /* Keyboard nav */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape')     onClose()
      if (e.key === 'ArrowRight') goTo(activeIndex + 1)
      if (e.key === 'ArrowLeft')  goTo(activeIndex - 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [activeIndex, goTo, onClose])

  return (
    <>
      <style>{`.vm-thumbs::-webkit-scrollbar{display:none}`}</style>

      <div
        ref={overlayRef}
        onClick={e => e.target === e.currentTarget && onClose()}
        style={{
          position: 'fixed', inset: 0, zIndex: 9999,
          background: 'rgba(0,0,0,0.9)',
          backdropFilter: 'blur(10px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 'clamp(1rem, 3vw, 2rem)',
        }}
      >
        <div
          ref={panelRef}
          style={{
            display: 'flex', flexDirection: 'column',
            alignItems: 'center',
            gap: '0.875rem',
            width: '100%',
          }}
        >

          {/* ── Header: client / title / counter / close ── */}
          <div style={{
            width: '100%', maxWidth: 600,
            display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
            gap: '1rem',
          }}>
            <div>
              <p style={{
                margin: 0,
                fontSize: '0.58rem', fontWeight: 700,
                letterSpacing: '0.14em', textTransform: 'uppercase',
                color: 'rgba(93,224,230,0.85)',
              }}>
                {item?.client}
              </p>
              <h3 style={{
                margin: '0.2rem 0 0',
                fontSize: '0.9rem', fontWeight: 700,
                color: '#fff', lineHeight: 1.3,
              }}>
                {item?.title}
              </h3>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
              <span style={{
                fontSize: '0.58rem', fontWeight: 600,
                color: 'rgba(255,255,255,0.28)', letterSpacing: '0.1em',
              }}>
                {String(activeIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
              </span>

              {/* Close button */}
              <button
                onClick={onClose}
                style={{
                  width: 34, height: 34,
                  border: 'none',
                  background: 'rgba(255,255,255,0.07)',
                  borderRadius: '8px', cursor: 'pointer',
                  color: 'rgba(255,255,255,0.6)',
                  fontSize: '0.9rem',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,45,45,0.38)'; e.currentTarget.style.color = '#fff' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)' }}
              >✕</button>
            </div>
          </div>

          {/* ── Video row: arrow · iframe · arrow ── */}
          {/*
            Height drives the dimension (9:16 portrait).
            Width = height × (9/16) — calculated automatically by aspect-ratio.
          */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <NavArrow onClick={() => goTo(activeIndex - 1)}>‹</NavArrow>

            <div style={{
              height: 'min(58dvh, 460px)',
              aspectRatio: '9 / 16',
              flexShrink: 0,
              background: '#0a0a0a',
              borderRadius: '14px',
              overflow: 'hidden',
              boxShadow: '0 12px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)',
            }}>
              {embedSrc ? (
                <iframe
                  key={item.id}   /* remount = autoplay new video */
                  src={embedSrc}
                  title={item?.title}
                  allow="autoplay; fullscreen; picture-in-picture; web-share"
                  allowFullScreen
                  style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
                />
              ) : (
                <div style={{
                  width: '100%', height: '100%',
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center',
                  gap: '0.5rem', color: 'rgba(255,255,255,0.2)',
                }}>
                  <span style={{ fontSize: '1.5rem' }}>▶</span>
                  <span style={{ fontSize: '0.65rem', letterSpacing: '0.1em', fontWeight: 600 }}>
                    No YouTube URL
                  </span>
                </div>
              )}
            </div>

            <NavArrow onClick={() => goTo(activeIndex + 1)}>›</NavArrow>
          </div>

          {/* ── Thumbnail strip ── */}
          <div
            ref={thumbsRef}
            className="vm-thumbs"
            style={{
              display: 'flex', gap: '4px',
              overflowX: 'auto', scrollbarWidth: 'none',
              maxWidth: 'min(90vw, 600px)',
              padding: '2px',
            }}
          >
            {items.map((it, i) => (
              <button
                key={it.id}
                onClick={() => goTo(i)}
                style={{
                  flexShrink: 0,
                  width: 'clamp(34px, 4.5vw, 50px)',
                  aspectRatio: '9 / 16',
                  padding: 0, border: 'none',
                  cursor: 'pointer',
                  borderRadius: '5px',
                  overflow: 'hidden',
                  outline: 'none',
                  transition: 'box-shadow 0.2s',
                  boxShadow: activeIndex === i
                    ? 'inset 0 0 0 2px #5de0e6'
                    : 'inset 0 0 0 0px transparent',
                  background: '#111',
                }}
              >
                <img
                  src={it.image}
                  alt={it.title}
                  draggable={false}
                  style={{
                    width: '100%', height: '100%',
                    objectFit: 'cover', display: 'block',
                    opacity: activeIndex === i ? 1 : 0.35,
                    transition: 'opacity 0.22s',
                  }}
                />
              </button>
            ))}
          </div>

        </div>
      </div>
    </>
  )
}