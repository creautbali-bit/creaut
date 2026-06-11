'use client'

import { useState, useEffect, useRef, useCallback, useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import Navbar from '../../../components/navbar'
import Footer from '../../../components/footer'

gsap.registerPlugin(ScrollTrigger)

function useLenis() {
  const lenisRef = useRef(null)

  useEffect(() => {
    let lenis
    const init = async () => {
      try {
        const LenisModule = await import('@studio-freight/lenis')
        const Lenis = LenisModule.default ?? LenisModule.Lenis
        lenis = new Lenis({
          duration: 1.35,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: 'vertical',
          smoothWheel: true,
          wheelMultiplier: 0.9,
          touchMultiplier: 1.8,
          infinite: false,
        })
        lenisRef.current = lenis
        gsap.ticker.add((time) => lenis.raf(time * 1000))
        gsap.ticker.lagSmoothing(0)
        lenis.on('scroll', ScrollTrigger.update)
      } catch {}
    }
    init()
    return () => {
      gsap.ticker.remove((time) => lenis?.raf(time * 1000))
      lenis?.destroy()
      lenisRef.current = null
    }
  }, [])

  return lenisRef
}

const TABS = [
  { id: 'all', label: 'All Work' },
  { id: 'Entertaint', label: 'Dancers & Entertaint' },
  { id: 'Personal', label: 'Personal Branding' },
  { id: 'Beauty', label: 'Beauty' },
  { id: 'Env', label: 'Enviroment' },
  { id: 'Adv', label: 'Adventure' },
  { id: 'Katalog', label: 'Katalog' },
  { id: 'F&B', label: 'F&B' },
]

const PORTFOLIO = [
  { id: 1, category: 'F&B', caption: '', client: '', layout: 'portrait', src: '/image/bra42.webp' },
  { id: 2, category: 'Entertaint', caption: '', client: '', layout: 'portrait', src: '/image/bra15.webp' },
  { id: 3, category: 'Adv', caption: '', client: '', layout: 'portrait', src: '/image/bra8.webp' },
  { id: 4, category: 'Katalog', caption: '', client: '', layout: 'portrait', src: '/image/bra58.webp' },
  { id: 5, category: 'Entertaint', caption: '', client: '', layout: 'landscape', src: '/image/bra23.webp' },
  { id: 6, category: 'Personal', caption: '', client: '', layout: 'portrait', src: '/image/bra31.webp' },
  { id: 7, category: 'Adv', caption: '', client: '', layout: 'portrait', src: '/image/bra9.webp' },
  { id: 8, category: 'F&B', caption: '', client: '', layout: 'portrait', src: '/image/bra50.webp' },
  { id: 9, category: 'Entertaint', caption: '', client: '', layout: 'portrait', src: '/image/bra17.webp' },
  { id: 10, category: 'Katalog', caption: '', client: '', layout: 'landscape', src: '/image/bra61.webp' },
  { id: 11, category: 'F&B', caption: '', client: '', layout: 'portrait', src: '/image/bra34.webp' },
  { id: 12, category: 'Katalog', caption: '', client: '', layout: 'portrait', src: '/image/bra52.webp' },
  { id: 13, category: 'Beauty', caption: '', client: '', layout: 'portrait', src: '/image/bra4.webp' },
  { id: 14, category: 'Personal', caption: '', client: '', layout: 'portrait', src: '/image/bra28.webp' },
  { id: 15, category: 'Adv', caption: '', client: '', layout: 'landscape', src: '/image/bra11.webp' },
  { id: 16, category: 'F&B', caption: '', client: '', layout: 'portrait', src: '/image/bra45.webp' },
  { id: 17, category: 'Katalog', caption: '', client: '', layout: 'portrait', src: '/image/bra14.webp' },
  { id: 18, category: 'F&B', caption: '', client: '', layout: 'portrait', src: '/image/bra49.webp' },
  { id: 19, category: 'Beauty', caption: '', client: '', layout: 'portrait', src: '/image/bra2.webp' },
  { id: 20, category: 'F&B', caption: '', client: '', layout: 'landscape', src: '/image/bra39.webp' },
  { id: 21, category: 'Katalog', caption: '', client: '', layout: 'portrait', src: '/image/bra55.webp' },
  { id: 22, category: 'Entertaint', caption: '', client: '', layout: 'portrait', src: '/image/bra21.webp' },
  { id: 23, category: 'F&B', caption: '', client: '', layout: 'portrait', src: '/image/bra33.webp' },
  { id: 24, category: 'Env', caption: '', client: '', layout: 'portrait', src: '/image/bra64.webp' },
  { id: 25, category: 'Adv', caption: '', client: '', layout: 'landscape', src: '/image/bra7.webp' },
  { id: 26, category: 'F&B', caption: '', client: '', layout: 'portrait', src: '/image/bra40.webp' },
  { id: 27, category: 'Entertaint', caption: '', client: '', layout: 'portrait', src: '/image/bra18.webp' },
  { id: 28, category: 'Katalog', caption: '', client: '', layout: 'portrait', src: '/image/bra59.webp' },
  { id: 29, category: 'Personal', caption: '', client: '', layout: 'portrait', src: '/image/bra26.webp' },
  { id: 30, category: 'Beauty', caption: '', client: '', layout: 'landscape', src: '/image/bra1.webp' },
  { id: 31, category: 'F&B', caption: '', client: '', layout: 'portrait', src: '/image/bra47.webp' },
  { id: 32, category: 'F&B', caption: '', client: '', layout: 'portrait', src: '/image/bra36.webp' },
  { id: 33, category: 'Adv', caption: '', client: '', layout: 'portrait', src: '/image/bra13.webp' },
  { id: 34, category: 'Katalog', caption: '', client: '', layout: 'portrait', src: '/image/bra53.webp' },
  { id: 35, category: 'Personal', caption: '', client: '', layout: 'landscape', src: '/image/bra30.webp' },
  { id: 36, category: 'F&B', caption: '', client: '', layout: 'portrait', src: '/image/bra48.webp' },
  { id: 37, category: 'Adv', caption: '', client: '', layout: 'portrait', src: '/image/bra5.webp' },
  { id: 38, category: 'Entertaint', caption: '', client: '', layout: 'portrait', src: '/image/bra22.webp' },
  { id: 39, category: 'Katalog', caption: '', client: '', layout: 'portrait', src: '/image/bra60.webp' },
  { id: 40, category: 'F&B', caption: '', client: '', layout: 'landscape', src: '/image/bra37.webp' },
  { id: 41, category: 'Entertaint', caption: '', client: '', layout: 'portrait', src: '/image/bra16.webp' },
  { id: 42, category: 'F&B', caption: '', client: '', layout: 'portrait', src: '/image/bra41.webp' },
  { id: 43, category: 'Personal', caption: '', client: '', layout: 'portrait', src: '/image/bra29.webp' },
  { id: 44, category: 'Adv', caption: '', client: '', layout: 'portrait', src: '/image/bra10.webp' },
  { id: 45, category: 'Katalog', caption: '', client: '', layout: 'landscape', src: '/image/bra54.webp' },
  { id: 46, category: 'F&B', caption: '', client: '', layout: 'portrait', src: '/image/bra32.webp' },
  { id: 47, category: 'F&B', caption: '', client: '', layout: 'portrait', src: '/image/bra46.webp' },
  { id: 48, category: 'Entertaint', caption: '', client: '', layout: 'portrait', src: '/image/bra25.webp' },
  { id: 49, category: 'Adv', caption: '', client: '', layout: 'portrait', src: '/image/bra6.webp' },
  { id: 50, category: 'Katalog', caption: '', client: '', layout: 'landscape', src: '/image/bra57.webp' },
  { id: 51, category: 'F&B', caption: '', client: '', layout: 'portrait', src: '/image/bra35.webp' },
  { id: 52, category: 'Entertaint', caption: '', client: '', layout: 'portrait', src: '/image/bra20.webp' },
  { id: 53, category: 'F&B', caption: '', client: '', layout: 'portrait', src: '/image/bra43.webp' },
  { id: 54, category: 'rebrand', caption: '', client: '', layout: 'portrait', src: '/image/bra63.webp' },
  { id: 55, category: 'stationery', caption: '', client: '', layout: 'landscape', src: '/image/bra27.webp' },
  { id: 56, category: 'guidelines', caption: '', client: '', layout: 'portrait', src: '/image/bra12.webp' },
  { id: 57, category: 'F&B', caption: '', client: '', layout: 'portrait', src: '/image/bra51.webp' },
  { id: 58, category: 'logo', caption: '', client: '', layout: 'portrait', src: '/image/bra38.webp' },
  { id: 60, category: 'print', caption: '', client: '', layout: 'landscape', src: '/image/bra62.webp' },
  { id: 61, category: 'rebrand', caption: '', client: '', layout: 'portrait', src: '/image/bra19.webp' },
  { id: 62, category: 'stationery', caption: '', client: '', layout: 'portrait', src: '/image/bra73.webp' },
  { id: 63, category: 'guidelines', caption: '', client: '', layout: 'portrait', src: '/image/bra81.webp' },
  { id: 65, category: 'logo', caption: '', client: '', layout: 'landscape', src: '/image/bra77.webp' },
  { id: 66, category: 'packaging', caption: '', client: '', layout: 'portrait', src: '/image/bra68.webp' },
  { id: 67, category: 'print', caption: '', client: '', layout: 'portrait', src: '/image/bra70.webp' },
  { id: 68, category: 'rebrand', caption: '', client: '', layout: 'portrait', src: '/image/bra83.webp' },
  { id: 69, category: 'stationery', caption: '', client: '', layout: 'portrait', src: '/image/bra67.webp' },
  { id: 70, category: 'guidelines', caption: '', client: '', layout: 'landscape', src: '/image/bra79.webp' },
  { id: 71, category: 'Env', caption: '', client: '', layout: 'portrait', src: '/image/bra69.webp' },
  { id: 72, category: 'Env', caption: '', client: '', layout: 'portrait', src: '/image/bra74.webp' },
  { id: 73, category: 'Env', caption: '', client: '', layout: 'portrait', src: '/image/bra82.webp' },
  { id: 74, category: 'Env', caption: '', client: '', layout: 'portrait', src: '/image/bra72.webp' },
  { id: 75, category: 'Env', caption: '', client: '', layout: 'landscape', src: '/image/bra78.webp' },
  { id: 76, category: 'Env', caption: '', client: '', layout: 'portrait', src: '/image/bra75.webp' },
  { id: 78, category: 'Env', caption: '', client: '', layout: 'portrait', src: '/image/bra76.webp' },
  { id: 79, category: 'Env', caption: '', client: '', layout: 'portrait', src: '/image/bra71.webp' },
  { id: 80, category: 'packaging', caption: '', client: '', layout: 'landscape', src: '/image/bra80.webp' },
  { id: 81, category: 'Beauty', caption: '', client: '', layout: 'portrait', src: '/image/bra3.webp' },
  { id: 82, category: 'F&B', caption: '', client: '', layout: 'portrait', src: '/image/bra44.webp' },
  { id: 83, category: 'Katalog', caption: '', client: '', layout: 'portrait', src: '/image/bra56.webp' }
]

function Lightbox({ items, index, onClose, onNav }) {
  const overlayRef = useRef(null)
  const imgRef = useRef(null)
  const item = items[index]

  useEffect(() => {
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' })
    gsap.fromTo(imgRef.current, { scale: 0.94, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: 'power3.out' })
  }, [])

  useEffect(() => {
    if (!imgRef.current) return
    gsap.fromTo(imgRef.current, { opacity: 0, x: 20 }, { opacity: 1, x: 0, duration: 0.3, ease: 'power2.out' })
  }, [index])

  useEffect(() => {
    const h = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNav(1)
      if (e.key === 'ArrowLeft') onNav(-1)
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [onClose, onNav])

  const enterFullscreen = () => {
    const el = imgRef.current
    if (!el) return
    if (el.requestFullscreen) el.requestFullscreen()
    else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen()
  }

  const btn = {
    border: 'none', cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    transition: 'all 0.2s', fontFamily: 'inherit',
  }

  return (
    <div
      ref={overlayRef}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(0,0,0,0.93)', backdropFilter: 'blur(8px)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: 'clamp(1.5rem, 5vw, 4rem)', gap: '1rem',
      }}
    >
      <div style={{ width: '100%', maxWidth: 860, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <div />
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={enterFullscreen}
            style={{ ...btn, width: 40, height: 40, borderRadius: '8px', background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'linear-gradient(135deg,#5de0e6,#004aad)'; e.currentTarget.style.color = '#fff' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)' }}
          >
            ⛶
          </button>
          <button
            onClick={onClose}
            style={{ ...btn, width: 40, height: 40, borderRadius: '8px', background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,60,60,0.5)'; e.currentTarget.style.color = '#fff' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)' }}
          >
            ✕
          </button>
        </div>
      </div>

      <div style={{ width: '100%', maxWidth: 860, display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 1 }}>
        <button
          onClick={() => onNav(-1)}
          style={{ ...btn, flexShrink: 0, width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', border: '1.5px solid rgba(255,255,255,0.15)', color: '#fff', fontSize: '1.3rem' }}
          onMouseEnter={e => e.currentTarget.style.background = 'linear-gradient(135deg,#5de0e6,#004aad)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
        >
          ‹
        </button>

        <div style={{
          flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(255,255,255,0.02)', borderRadius: '10px', overflow: 'hidden',
          maxHeight: '72vh',
        }}>
          <img
            ref={imgRef}
            src={item.src}
            alt={item.caption}
            style={{
              maxWidth: '100%',
              maxHeight: '72vh',
              width: 'auto',
              height: 'auto',
              display: 'block',
              borderRadius: '8px',
              objectFit: 'contain',
            }}
          />
        </div>

        <button
          onClick={() => onNav(1)}
          style={{ ...btn, flexShrink: 0, width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', border: '1.5px solid rgba(255,255,255,0.15)', color: '#fff', fontSize: '1.3rem' }}
          onMouseEnter={e => e.currentTarget.style.background = 'linear-gradient(135deg,#5de0e6,#004aad)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
        >
          ›
        </button>
      </div>

      <div style={{
        width: '100%', maxWidth: 860,
        display: 'flex', gap: '4px',
        overflowX: 'auto', flexShrink: 0,
        scrollbarWidth: 'none', alignItems: 'flex-end',
      }}>
        {items.map((p, i) => (
          <button
            key={p.id}
            onClick={() => onNav(i - index)}
            style={{
              flexShrink: 0,
              width: 'clamp(40px,5vw,60px)',
              aspectRatio: '4/5',
              padding: 0, border: 'none', cursor: 'pointer',
              borderRadius: '4px', overflow: 'hidden', outline: 'none',
              boxShadow: index === i ? 'inset 0 0 0 2px #5de0e6' : 'none',
              transition: 'box-shadow 0.2s', background: '#111',
            }}
          >
            <img
              src={p.src}
              alt={p.caption}
              draggable={false}
              style={{
                width: '100%', height: '100%', objectFit: 'cover', display: 'block',
                opacity: index === i ? 1 : 0.35, transition: 'opacity 0.25s',
              }}
            />
          </button>
        ))}
      </div>
    </div>
  )
}

function TabBar({ active, onSelect, counts }) {
  return (
    <div style={{
      borderBottom: '1px solid rgba(0,0,0,0.08)',
      background: 'rgba(255,255,255,0.97)',
      backdropFilter: 'blur(14px)',
    }}>
      <div style={{
        maxWidth: 1400, margin: '0 auto',
        padding: '0 clamp(1rem,4vw,2rem)',
        display: 'flex', alignItems: 'flex-end',
        gap: 'clamp(1rem,2.5vw,2rem)',
        overflowX: 'auto', scrollbarWidth: 'none',
        WebkitOverflowScrolling: 'touch',
      }}>
        {TABS.map((tab, i) => {
          const isActive = active === tab.id
          const count = tab.id === 'all' ? PORTFOLIO.length : (counts[tab.id] || 0)
          return (
            <button
              key={tab.id}
              onClick={() => onSelect(tab.id)}
              style={{
                padding: '0 0 10px', border: 'none', background: 'transparent',
                color: isActive ? '#000' : 'rgba(0,0,0,0.38)',
                fontSize: 'clamp(0.62rem,1.6vw,0.7rem)',
                fontWeight: isActive ? 700 : 500,
                cursor: 'pointer', letterSpacing: '0.02em',
                whiteSpace: 'nowrap', position: 'relative',
                transition: 'color 0.2s',
                display: 'flex', alignItems: 'center', gap: '4px',
                flexShrink: 0, minHeight: 44,
              }}
              onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = '#000' }}
              onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = 'rgba(0,0,0,0.38)' }}
            >
              {i === 1 && (
                <span style={{
                  position: 'absolute',
                  left: 'calc(-1 * clamp(0.5rem,1.25vw,1rem))',
                  bottom: 10,
                  width: 1, height: 14,
                  background: 'rgba(0,0,0,0.12)',
                  display: 'block',
                }} />
              )}
              {tab.label}
              <span style={{
                fontSize: 'clamp(0.48rem,1vw,0.54rem)',
                fontWeight: 600,
                color: isActive ? '#5de0e6' : 'rgba(0,0,0,0.22)',
                transition: 'color 0.2s',
              }}>
                {count}
              </span>
              <span style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px',
                background: 'linear-gradient(90deg,#5de0e6,#004aad)',
                opacity: isActive ? 1 : 0,
                transition: 'opacity 0.2s',
                borderRadius: '1px',
              }} />
            </button>
          )
        })}
      </div>
    </div>
  )
}

function PortfolioCard({ item, onOpen }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onClick={onOpen}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        aspectRatio: '4/5',
        overflow: 'hidden',
        cursor: 'zoom-in',
        background: '#e8e8e8',
        borderRadius: 0,
      }}
    >
      <img
        src={item.src}
        alt={item.caption}
        draggable={false}
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover',
          transition: 'transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94)',
          transform: hovered ? 'scale(1.06)' : 'scale(1)',
        }}
      />

      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(160deg, rgba(93,224,230,0.08) 0%, rgba(0,74,173,0.38) 100%)',
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.45s ease',
      }} />

      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: '55%',
        background: 'linear-gradient(0deg, rgba(0,8,24,0.85) 0%, transparent 100%)',
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.45s ease',
      }} />

      <div style={{
        position: 'absolute',
        top: 'clamp(0.7rem, 1.5vw, 1rem)',
        right: 'clamp(0.7rem, 1.5vw, 1rem)',
        opacity: hovered ? 1 : 0, transition: 'opacity 0.3s',
        background: 'rgba(0,0,0,0.48)', backdropFilter: 'blur(6px)',
        borderRadius: '50%', width: 34, height: 34,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '0.8rem',
      }}>
        🔍
      </div>
    </div>
  )
}

export default function BrandingPortfolioPage() {
  useLenis()

  const heroRef = useRef(null)
  const heroTextRef = useRef(null)
  const overlayRef = useRef(null)
  const countRowRef = useRef(null)

  const [activeTab, setActiveTab] = useState('all')
  const [filteredItems, setFilteredItems] = useState(PORTFOLIO)
  const [lightboxIdx, setLightboxIdx] = useState(null)

  useEffect(() => {
    setFilteredItems(activeTab === 'all' ? PORTFOLIO : PORTFOLIO.filter(p => p.category === activeTab))
  }, [activeTab])

  useEffect(() => {
    if (!countRowRef.current) return
    gsap.fromTo(countRowRef.current,
      { opacity: 0, x: -10 },
      { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' }
    )
  }, [filteredItems])

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .fromTo(overlayRef.current,
          { scaleY: 1 },
          { scaleY: 0, duration: 1.2, ease: 'power4.inOut', transformOrigin: 'top' }
        )
        .fromTo(
          heroTextRef.current.querySelectorAll('.hero-line'),
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.1, duration: 0.9 },
          '-=0.4'
        )
    }, heroRef)
    return () => ctx.revert()
  }, [])

  const counts = PORTFOLIO.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1
    return acc
  }, {})

  const lightboxNav = useCallback((delta) => {
    setLightboxIdx(prev => {
      if (prev === null) return null
      return ((prev + delta) % filteredItems.length + filteredItems.length) % filteredItems.length
    })
  }, [filteredItems.length])

  return (
    <>
      <style>{`
        html { scroll-behavior: auto !important; }
        *, *::before, *::after { box-sizing: border-box; }

        .brand-grid {
          display: grid;
          gap: 4px;
          grid-template-columns: repeat(4, 1fr);
        }
        @media (max-width: 1200px) {
          .brand-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 800px) {
          .brand-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 480px) {
          .brand-grid { grid-template-columns: 1fr; }
        }

        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: #fafafa; }
        ::-webkit-scrollbar-thumb { background: #d0d0d0; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #004aad; }

        html.lenis { height: auto; }
        .lenis.lenis-smooth { scroll-behavior: auto; }
        .lenis.lenis-stopped { overflow: hidden; }
      `}</style>

      <Navbar />

      {lightboxIdx !== null && (
        <Lightbox
          items={filteredItems}
          index={lightboxIdx}
          onClose={() => setLightboxIdx(null)}
          onNav={lightboxNav}
        />
      )}

      <main>
        <section
          ref={heroRef}
          style={{
            position: 'relative', width: '100%',
            height: '100vh', minHeight: 520,
            background: '#ffffff', overflow: 'hidden',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <div style={{
            position: 'absolute', inset: 0, zIndex: 0,
            backgroundImage: `
              radial-gradient(circle at 25% 55%, rgba(93,224,230,0.07) 0%, transparent 45%),
              radial-gradient(circle at 78% 28%, rgba(0,74,173,0.09) 0%, transparent 45%)
            `,
          }} />

          <div ref={overlayRef} style={{
            position: 'absolute', inset: 0, zIndex: 10,
            background: 'linear-gradient(135deg, #5de0e6, #004aad)',
            transformOrigin: 'top', pointerEvents: 'none',
          }} />

          <div
            ref={heroTextRef}
            style={{
              position: 'relative', zIndex: 2,
              padding: 'clamp(2rem, 5vw, 4rem)',
              width: '100%', maxWidth: 860, textAlign: 'center',
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              gap: 'clamp(1rem, 2.5vw, 1.5rem)',
            }}
          >
            <div className="hero-line" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Link href="/" style={{ fontSize: '0.72rem', fontWeight: 500, color: 'rgba(0,0,0,0.4)', textDecoration: 'none', letterSpacing: '0.1em', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#5de0e6'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(0,0,0,0.4)'}
              >
                Creaut Bali
              </Link>
              <span style={{ color: 'rgba(0,0,0,0.2)' }}>·</span>
              <Link href="/services/branding" style={{ fontSize: '0.72rem', fontWeight: 500, color: 'rgba(0,0,0,0.4)', textDecoration: 'none', letterSpacing: '0.1em', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#5de0e6'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(0,0,0,0.4)'}
              >
                Branding
              </Link>
              <span style={{ color: 'rgba(0,0,0,0.2)' }}>·</span>
              <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#5de0e6', letterSpacing: '0.1em' }}>Portfolio</span>
            </div>

            <div className="hero-line" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: 24, height: 2, borderRadius: 2, background: 'linear-gradient(90deg, #5de0e6, #004aad)' }} />
              <span style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)' }}>
                {PORTFOLIO.length} Projects · {TABS.length - 1} Categories
              </span>
              <div style={{ width: 24, height: 2, borderRadius: 2, background: 'linear-gradient(90deg, #004aad, #5de0e6)' }} />
            </div>

            <h1 className="hero-line" style={{
              fontWeight: 800,
              fontSize: 'clamp(4rem, 12vw, 10rem)',
              color: '#000', letterSpacing: '-0.045em', lineHeight: 0.9, margin: 0,
            }}>
              Brand<br />
              <span style={{
                background: 'linear-gradient(90deg, #5de0e6, #004aad)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>
                Work.
              </span>
            </h1>

            <p className="hero-line" style={{
              fontSize: 'clamp(0.875rem, 1.6vw, 1.05rem)',
              color: 'rgba(0,0,0,0.5)', lineHeight: 1.75, maxWidth: 460, margin: 0,
            }}>
              Every brand we've built — from identity systems to packaging, strategy to guidelines.
            </p>
          </div>

          <div style={{
            position: 'absolute', bottom: '2.5rem', left: '50%', transform: 'translateX(-50%)',
            zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
          }}>
            <span style={{ fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.25)' }}>Scroll</span>
            <div style={{ width: 1, height: 40, background: 'linear-gradient(180deg, rgba(93,224,230,0.6), transparent)', borderRadius: 1 }} />
          </div>
        </section>

        <section id="portfolio" style={{ background: '#fff', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
          <div style={{ position: 'sticky', top: 0, zIndex: 50 }}>
            <div style={{ maxWidth: 1600, margin: '0 auto', padding: 'clamp(0.75rem,2vw,1rem) clamp(1rem,4vw,2rem) 0' }}>
              <TabBar active={activeTab} onSelect={setActiveTab} counts={counts} />
            </div>
          </div>

          <div style={{ padding: '0 0 clamp(3rem,8vw,5rem)' }}>
            <div style={{ maxWidth: 1600, margin: '0 auto', padding: '0 clamp(0.75rem,3vw,2rem)' }}>
              {filteredItems.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '6rem 0', color: 'rgba(0,0,0,0.2)' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🎨</div>
                  <p style={{ fontSize: '0.9rem', fontWeight: 600 }}>No projects in this category yet.</p>
                </div>
              ) : (
                <>
                  <div ref={countRowRef} style={{
                    display: 'flex', alignItems: 'center', gap: '0.6rem',
                    padding: 'clamp(1.25rem,3vw,1.75rem) 0 clamp(1rem,2.5vw,1.25rem)',
                  }}>
                    <div style={{ width: 18, height: 1.5, background: 'linear-gradient(90deg,#5de0e6,#004aad)', borderRadius: 2 }} />
                    <span style={{
                      fontSize: 'clamp(0.58rem,1.5vw,0.62rem)',
                      fontWeight: 700, letterSpacing: '0.18em',
                      textTransform: 'uppercase', color: '#004aad',
                    }}>
                      {filteredItems.length} {filteredItems.length === 1 ? 'Project' : 'Projects'}
                    </span>
                  </div>

                  <div className="brand-grid">
                    {filteredItems.map((item, i) => (
                      <PortfolioCard
                        key={`${activeTab}-${item.id}`}
                        item={item}
                        onOpen={() => setLightboxIdx(i)}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </section>

        <section style={{
          background: '#fff',
          borderTop: '1px solid rgba(0,0,0,0.06)',
          padding: 'clamp(5rem,10vw,8rem) clamp(1rem,4vw,2rem)',
          overflow: 'hidden', position: 'relative',
        }}>
          <div style={{
            position: 'absolute', top: '-40%', left: '50%', transform: 'translateX(-50%)',
            width: '80%', height: '180%',
            background: 'radial-gradient(ellipse at center, rgba(93,224,230,0.07) 0%, rgba(0,74,173,0.04) 45%, transparent 70%)',
            pointerEvents: 'none', zIndex: 0,
          }} />

          <div style={{ position: 'relative', zIndex: 1, maxWidth: 620, margin: '0 auto', textAlign: 'center' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              border: '1px solid rgba(0,0,0,0.14)', borderRadius: '999px',
              padding: '0.35rem 0.9rem', marginBottom: '1.75rem', background: '#fafafa',
            }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'linear-gradient(90deg, #5de0e6, #004aad)', flexShrink: 0 }} />
              <span style={{ fontSize: '0.68rem', fontWeight: 700, color: 'rgba(0,0,0,0.45)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                Ready to build your brand?
              </span>
            </div>

            <h2 style={{
              fontSize: 'clamp(2rem, 7vw, 4rem)',
              fontWeight: 800, letterSpacing: '-0.04em', color: '#000', lineHeight: 1.05, marginBottom: '2.5rem',
            }}>
              Let's create a brand{' '}
              <span style={{ background: 'linear-gradient(90deg, #5de0e6, #004aad)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                that lasts.
              </span>
            </h2>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="https://wa.me/62818160664" target="_blank" rel="noreferrer" style={{
                padding: 'clamp(0.75rem,2vw,0.9rem) clamp(1.5rem,4vw,2.25rem)',
                background: 'linear-gradient(90deg, #5de0e6, #004aad)',
                color: '#fff', textDecoration: 'none',
                fontSize: 'clamp(0.8rem,2vw,0.875rem)', fontWeight: 600,
                borderRadius: '8px', transition: 'opacity 0.2s',
                boxShadow: '0 4px 24px rgba(0,74,173,0.18)',
              }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                Start a Project ↗
              </a>
              <Link href="/services/branding" style={{
                padding: 'clamp(0.75rem,2vw,0.9rem) clamp(1.5rem,4vw,2.25rem)',
                background: '#fff', border: '1.5px solid rgba(0,0,0,0.15)',
                color: '#000', textDecoration: 'none',
                fontSize: 'clamp(0.8rem,2vw,0.875rem)', fontWeight: 600,
                borderRadius: '8px', transition: 'border-color 0.2s, color 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#5de0e6'; e.currentTarget.style.color = '#004aad' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.15)'; e.currentTarget.style.color = '#000' }}
              >
                ← Back to Branding
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  )
}