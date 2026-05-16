'use client'

import { useState, useEffect, useRef, useCallback, useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import Navbar from '../../../components/navbar'
import Footer from '../../../components/footer'

gsap.registerPlugin(ScrollTrigger)

/* ═══════════════════════════════════════════════════════════════════
   LENIS SMOOTH SCROLL
═══════════════════════════════════════════════════════════════════ */
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
      } catch { /* native fallback */ }
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

/* ═══════════════════════════════════════════════════════════════════
   TABS
═══════════════════════════════════════════════════════════════════ */
const TABS = [
  { id: 'all',       label: 'All Work' },
  { id: 'identity',  label: 'Identity' },
  { id: 'logo',      label: 'Logo' },
  { id: 'rebrand',   label: 'Rebrand' },
  { id: 'packaging', label: 'Packaging' },
  { id: 'print',     label: 'Print' },
  { id: 'stationery',label: 'Stationery' },
  { id: 'guidelines',label: 'Guidelines' },
]

/* ═══════════════════════════════════════════════════════════════════
   PORTFOLIO DATA — 1080×1350 portrait images
   Ganti src dengan path gambar aslimu
═══════════════════════════════════════════════════════════════════ */
const PORTFOLIO = [
  { id: 1,  category: 'identity',   caption: 'AMANAID',               client: 'Brand Identity System', layout: 'portrait',  src: '/image/bra42.jpg' },
  { id: 2,  category: 'logo',       caption: 'Amartya',               client: 'Logo Design',           layout: 'portrait',  src: '/image/bra15.jpg' },
  { id: 3,  category: 'packaging',  caption: 'Somya',                 client: 'Packaging Design',      layout: 'portrait',  src: '/image/bra8.jpg' },
  { id: 4,  category: 'print',      caption: 'EnviroMas',             client: 'Print Design',          layout: 'portrait',  src: '/image/bra58.jpg' },
  { id: 5,  category: 'rebrand',    caption: 'Creaut Bali',           client: 'Rebranding',            layout: 'landscape', src: '/image/bra23.jpg' },
  { id: 6,  category: 'stationery', caption: 'Pura Architecture',     client: 'Stationery Design',     layout: 'portrait',  src: '/image/bra31.jpg' },
  { id: 7,  category: 'guidelines', caption: 'Nusantara Banking',     client: 'Brand Guidelines',      layout: 'portrait',  src: '/image/bra9.jpg' },
  
  { id: 8,  category: 'identity',   caption: 'Seminyak Estates',      client: 'Brand Identity System', layout: 'portrait',  src: '/image/bra50.jpg' },
  { id: 9,  category: 'logo',       caption: 'Gerabah Studio',        client: 'Logo Design',           layout: 'portrait',  src: '/image/bra17.jpg' },
  { id: 10, category: 'packaging',  caption: 'Emas Bali Jewels',      client: 'Packaging Design',      layout: 'landscape', src: '/image/bra61.jpg' },
  { id: 11, category: 'print',      caption: 'Slow Living Magazine',  client: 'Print Design',          layout: 'portrait',  src: '/image/bra34.jpg' },
  { id: 12, category: 'rebrand',    caption: 'Suku Textile House',    client: 'Rebranding',            layout: 'portrait',  src: '/image/bra52.jpg' },
  { id: 13, category: 'stationery', caption: 'Canggu Creative Labs',  client: 'Stationery Design',     layout: 'portrait',  src: '/image/bra4.jpg' },
  { id: 14, category: 'guidelines', caption: 'Pura Skin Lab',         client: 'Brand Guidelines',      layout: 'portrait',  src: '/image/bra28.jpg' },
  
  { id: 15, category: 'identity',   caption: 'Ubud Wellness Retreat', client: 'Brand Identity System', layout: 'landscape', src: '/image/bra11.jpg' },
  { id: 16, category: 'logo',       caption: 'Sacred Vow Agency',     client: 'Logo Design',           layout: 'portrait',  src: '/image/bra45.jpg' },
  { id: 17, category: 'packaging',  caption: 'Bali Scents Co.',       client: 'Packaging Design',      layout: 'portrait',  src: '/image/bra14.jpg' },
  { id: 18, category: 'print',      caption: 'Arthaus Studio',        client: 'Print Collateral',      layout: 'portrait',  src: '/image/bra49.jpg' },
  { id: 19, category: 'rebrand',    caption: 'Nadi Yoga Studio',      client: 'Rebranding',            layout: 'portrait',  src: '/image/bra2.jpg' },
  { id: 20, category: 'stationery', caption: 'Segara Seafood',        client: 'Stationery Design',     layout: 'landscape', src: '/image/bra39.jpg' },
  { id: 21, category: 'guidelines', caption: 'Banyu Surf',            client: 'Brand Guidelines',      layout: 'portrait',  src: '/image/bra55.jpg' },
  
  { id: 22, category: 'identity',   caption: 'Kopi Kintamani',        client: 'Brand Identity System', layout: 'portrait',  src: '/image/bra21.jpg' },
  { id: 23, category: 'logo',       caption: 'Lontar Books',          client: 'Logo Design',           layout: 'portrait',  src: '/image/bra33.jpg' },
  { id: 24, category: 'packaging',  caption: 'Rattan & Co.',          client: 'Packaging Design',      layout: 'portrait',  src: '/image/bra64.jpg' },
  { id: 25, category: 'print',      caption: 'Alila Villas',          client: 'Print Design',          layout: 'landscape', src: '/image/bra7.jpg' },
  { id: 26, category: 'rebrand',    caption: 'Makna Design',          client: 'Rebranding',            layout: 'portrait',  src: '/image/bra40.jpg' },
  { id: 27, category: 'stationery', caption: 'Loka Local',            client: 'Stationery Design',     layout: 'portrait',  src: '/image/bra18.jpg' },
  { id: 28, category: 'guidelines', caption: 'Vana Eco',              client: 'Brand Guidelines',      layout: 'portrait',  src: '/image/bra59.jpg' },
  
  { id: 29, category: 'identity',   caption: 'Tirta Spa',             client: 'Brand Identity System', layout: 'portrait',  src: '/image/bra26.jpg' },
  { id: 30, category: 'logo',       caption: 'Bayu Wind',             client: 'Logo Design',           layout: 'landscape', src: '/image/bra1.jpg' },
  { id: 31, category: 'packaging',  caption: 'Gili Getaways',         client: 'Packaging Design',      layout: 'portrait',  src: '/image/bra47.jpg' },
  { id: 32, category: 'print',      caption: 'Menjangan Dive',        client: 'Print Design',          layout: 'portrait',  src: '/image/bra36.jpg' },
  { id: 33, category: 'rebrand',    caption: 'Koral Dining',          client: 'Rebranding',            layout: 'portrait',  src: '/image/bra13.jpg' },
  { id: 34, category: 'stationery', caption: 'Senja Lounge',          client: 'Stationery Design',     layout: 'portrait',  src: '/image/bra53.jpg' },
  { id: 35, category: 'guidelines', caption: 'Ombak Wear',            client: 'Brand Guidelines',      layout: 'landscape', src: '/image/bra30.jpg' },
  
  { id: 36, category: 'identity',   caption: 'Karang Villas',         client: 'Brand Identity System', layout: 'portrait',  src: '/image/bra48.jpg' },
  { id: 37, category: 'logo',       caption: 'Jatiluwih Rice',        client: 'Logo Design',           layout: 'portrait',  src: '/image/bra5.jpg' },
  { id: 38, category: 'packaging',  caption: 'Karsa Spa',             client: 'Packaging Design',      layout: 'portrait',  src: '/image/bra22.jpg' },
  { id: 39, category: 'print',      caption: 'Agung Treks',           client: 'Print Design',          layout: 'portrait',  src: '/image/bra60.jpg' },
  { id: 40, category: 'rebrand',    caption: 'Batur Sunrise',         client: 'Rebranding',            layout: 'landscape', src: '/image/bra37.jpg' },
  { id: 41, category: 'stationery', caption: 'Melasti Beach Club',    client: 'Stationery Design',     layout: 'portrait',  src: '/image/bra16.jpg' },
  { id: 42, category: 'guidelines', caption: 'Uluwatu Surf',          client: 'Brand Guidelines',      layout: 'portrait',  src: '/image/bra41.jpg' },
  
  { id: 43, category: 'identity',   caption: 'Jimbaran Catch',        client: 'Brand Identity System', layout: 'portrait',  src: '/image/bra29.jpg' },
  { id: 44, category: 'logo',       caption: 'Nusa Penida Tours',     client: 'Logo Design',           layout: 'portrait',  src: '/image/bra10.jpg' },
  { id: 45, category: 'packaging',  caption: 'Lembongan Retreat',     client: 'Packaging Design',      layout: 'landscape', src: '/image/bra54.jpg' },
  { id: 46, category: 'print',      caption: 'Ceningan Villas',       client: 'Print Design',          layout: 'portrait',  src: '/image/bra32.jpg' },
  { id: 47, category: 'rebrand',    caption: 'Lovina Dolphins',       client: 'Rebranding',            layout: 'portrait',  src: '/image/bra46.jpg' },
  { id: 48, category: 'stationery', caption: 'Pemuteran Coral',       client: 'Stationery Design',     layout: 'portrait',  src: '/image/bra25.jpg' },
  { id: 49, category: 'guidelines', caption: 'Amed Freedive',         client: 'Brand Guidelines',      layout: 'portrait',  src: '/image/bra6.jpg' },
  
  { id: 50, category: 'identity',   caption: 'Tulamben Wreck',        client: 'Brand Identity System', layout: 'landscape', src: '/image/bra57.jpg' },
  { id: 51, category: 'logo',       caption: 'Besakih Temple',        client: 'Logo Design',           layout: 'portrait',  src: '/image/bra35.jpg' },
  { id: 52, category: 'packaging',  caption: 'Tirta Empul',           client: 'Packaging Design',      layout: 'portrait',  src: '/image/bra20.jpg' },
  { id: 53, category: 'print',      caption: 'Campuhan Ridge',        client: 'Print Design',          layout: 'portrait',  src: '/image/bra43.jpg' },
  { id: 54, category: 'rebrand',    caption: 'Tegallalang Swings',    client: 'Rebranding',            layout: 'portrait',  src: '/image/bra63.jpg' },
  { id: 55, category: 'stationery', caption: 'Monkey Forest Ubud',    client: 'Stationery Design',     layout: 'landscape', src: '/image/bra27.jpg' },
  { id: 56, category: 'guidelines', caption: 'Goa Gajah',             client: 'Brand Guidelines',      layout: 'portrait',  src: '/image/bra12.jpg' },
  
  { id: 57, category: 'identity',   caption: 'Sukawati Art',          client: 'Brand Identity System', layout: 'portrait',  src: '/image/bra51.jpg' },
  { id: 58, category: 'logo',       caption: 'Sanur Sunrise',         client: 'Logo Design',           layout: 'portrait',  src: '/image/bra38.jpg' },
  // { id: 59, category: 'packaging',  caption: 'Kuta Sunsets',          client: 'Packaging Design',      layout: 'portrait',  src: '/image/bra24.jpg' },
  { id: 60, category: 'print',      caption: 'Legian Nights',         client: 'Print Design',          layout: 'landscape', src: '/image/bra62.jpg' },
  { id: 61, category: 'rebrand',    caption: 'Seminyak Beach',        client: 'Rebranding',            layout: 'portrait',  src: '/image/bra19.jpg' },
  { id: 62, category: 'stationery', caption: 'Canggu Waves',          client: 'Stationery Design',     layout: 'portrait',  src: '/image/bra73.jpg' },
  { id: 63, category: 'guidelines', caption: 'Brawa Surf',            client: 'Brand Guidelines',      layout: 'portrait',  src: '/image/bra81.jpg' },
  
  // { id: 64, category: 'identity',   caption: 'Pererenan Retreat',     client: 'Brand Identity System', layout: 'portrait',  src: '/image/bra65.jpg' },
  { id: 65, category: 'logo',       caption: 'Seseh Villas',          client: 'Logo Design',           layout: 'landscape', src: '/image/bra77.jpg' },
  { id: 66, category: 'packaging',  caption: 'Tanah Lot Resort',      client: 'Packaging Design',      layout: 'portrait',  src: '/image/bra68.jpg' },
  { id: 67, category: 'print',      caption: 'Kedungu Break',         client: 'Print Design',          layout: 'portrait',  src: '/image/bra70.jpg' },
  { id: 68, category: 'rebrand',    caption: 'Balian Surf',           client: 'Rebranding',            layout: 'portrait',  src: '/image/bra83.jpg' },
  { id: 69, category: 'stationery', caption: 'Medewi Point',          client: 'Stationery Design',     layout: 'portrait',  src: '/image/bra67.jpg' },
  { id: 70, category: 'guidelines', caption: 'Singaraja Heritage',    client: 'Brand Guidelines',      layout: 'landscape', src: '/image/bra79.jpg' },
  
  { id: 71, category: 'identity',   caption: 'Bedugul Lakes',         client: 'Brand Identity System', layout: 'portrait',  src: '/image/bra69.jpg' },
  { id: 72, category: 'logo',       caption: 'Munduk Moding',         client: 'Logo Design',           layout: 'portrait',  src: '/image/bra74.jpg' },
  { id: 73, category: 'packaging',  caption: 'Lovina Sunsets',        client: 'Packaging Design',      layout: 'portrait',  src: '/image/bra82.jpg' },
  { id: 74, category: 'print',      caption: 'Amed Corals',           client: 'Print Design',          layout: 'portrait',  src: '/image/bra72.jpg' },
  { id: 75, category: 'rebrand',    caption: 'Candidasa Palms',       client: 'Rebranding',            layout: 'landscape', src: '/image/bra78.jpg' },
  { id: 76, category: 'stationery', caption: 'Padangbai Piers',       client: 'Stationery Design',     layout: 'portrait',  src: '/image/bra75.jpg' },
  // { id: 77, category: 'guidelines', caption: 'Sidemen Valleys',       client: 'Brand Guidelines',      layout: 'portrait',  src: '/image/bra66.jpg' },

  { id: 78, category: 'identity',   caption: 'Kintamani Views',       client: 'Brand Identity System', layout: 'portrait',  src: '/image/bra76.jpg' },
  { id: 79, category: 'logo',       caption: 'Besakih Slopes',        client: 'Logo Design',           layout: 'portrait',  src: '/image/bra71.jpg' },
  { id: 80, category: 'packaging',  caption: 'Mount Agung Treks',     client: 'Packaging Design',      layout: 'landscape', src: '/image/bra80.jpg' },
  { id: 81, category: 'print',      caption: 'Batur Hot Springs',     client: 'Print Design',          layout: 'portrait',  src: '/image/bra3.jpg' },
  { id: 82, category: 'rebrand',    caption: 'Trunyan Village',       client: 'Rebranding',            layout: 'portrait',  src: '/image/bra44.jpg' },
  { id: 83, category: 'stationery', caption: 'Organic Waste Solutions', client: 'Stationery Design',   layout: 'portrait',  src: '/image/bra56.jpg' }
]

/* ═══════════════════════════════════════════════════════════════════
   LIGHTBOX
═══════════════════════════════════════════════════════════════════ */
function Lightbox({ items, index, onClose, onNav }) {
  const overlayRef = useRef(null)
  const imgRef     = useRef(null)
  const item       = items[index]

  useEffect(() => {
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' })
    gsap.fromTo(imgRef.current,     { scale: 0.94, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: 'power3.out' })
  }, [])

  useEffect(() => {
    if (!imgRef.current) return
    gsap.fromTo(imgRef.current, { opacity: 0, x: 20 }, { opacity: 1, x: 0, duration: 0.3, ease: 'power2.out' })
  }, [index])

  useEffect(() => {
    const h = (e) => {
      if (e.key === 'Escape')     onClose()
      if (e.key === 'ArrowRight') onNav(1)
      if (e.key === 'ArrowLeft')  onNav(-1)
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [onClose, onNav])

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
      {/* Top bar */}
      <div style={{ width: '100%', maxWidth: 860, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <div>
          <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(93,224,230,0.85)', margin: '0 0 0.2rem 0' }}>
            {item.caption}
          </p>
          <p style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.3)', margin: 0, letterSpacing: '0.1em' }}>
            {String(index + 1).padStart(2,'0')} / {String(items.length).padStart(2,'0')} · {item.client}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={onClose}
            style={{ ...btn, width: 40, height: 40, borderRadius: '8px', background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,60,60,0.5)'; e.currentTarget.style.color = '#fff' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)' }}
          >✕</button>
        </div>
      </div>

      {/* Image + arrows */}
      <div style={{ width: '100%', maxWidth: 860, display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 1 }}>
        <button
          onClick={() => onNav(-1)}
          style={{ ...btn, flexShrink: 0, width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', border: '1.5px solid rgba(255,255,255,0.15)', color: '#fff', fontSize: '1.3rem' }}
          onMouseEnter={e => e.currentTarget.style.background = 'linear-gradient(135deg,#5de0e6,#004aad)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
        >‹</button>

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
        >›</button>
      </div>

      {/* Thumbnail strip — portrait thumbs */}
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

/* ═══════════════════════════════════════════════════════════════════
   TAB BAR
═══════════════════════════════════════════════════════════════════ */
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
          const count    = tab.id === 'all' ? PORTFOLIO.length : (counts[tab.id] || 0)
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
              {/* Divider after "All Work" */}
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
              }}>{count}</span>
              {/* Active underline */}
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

/* ═══════════════════════════════════════════════════════════════════
   PORTFOLIO CARD — portrait 4:5 (1080×1350)
═══════════════════════════════════════════════════════════════════ */
function PortfolioCard({ item, onOpen }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onClick={onOpen}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        aspectRatio: '4/5',       /* 1080×1350 native ratio */
        overflow: 'hidden',
        cursor: 'zoom-in',
        background: '#e8e8e8',
        borderRadius: 0,
      }}
    >
      {/* Image */}
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

      {/* Hover gradient */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(160deg, rgba(93,224,230,0.08) 0%, rgba(0,74,173,0.38) 100%)',
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.45s ease',
      }} />

      {/* Bottom scrim */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: '55%',
        background: 'linear-gradient(0deg, rgba(0,8,24,0.85) 0%, transparent 100%)',
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.45s ease',
      }} />

      {/* Caption */}
      <div style={{
        position: 'absolute',
        bottom: 'clamp(1rem, 2vw, 1.4rem)',
        left: 'clamp(1rem, 2vw, 1.4rem)',
        opacity: hovered ? 1 : 0,
        transform: hovered ? 'translateY(0)' : 'translateY(10px)',
        transition: 'all 0.4s ease',
      }}>
        <div style={{
          width: 20, height: 2, borderRadius: 2,
          background: 'linear-gradient(90deg, #5de0e6, #004aad)',
          marginBottom: '0.4rem',
        }} />
        <p style={{
          fontSize: 'clamp(0.52rem, 1.1vw, 0.6rem)',
          fontWeight: 700, letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'rgba(93,224,230,0.9)',
          margin: '0 0 0.2rem 0',
        }}>{item.client}</p>
        <p style={{
          fontSize: 'clamp(0.78rem, 1.6vw, 0.95rem)',
          fontWeight: 700, color: '#fff', margin: 0,
          letterSpacing: '-0.02em', lineHeight: 1.2,
        }}>{item.caption}</p>
      </div>

      {/* Category badge */}
      <div style={{
        position: 'absolute',
        top: 'clamp(0.7rem, 1.5vw, 1rem)',
        left: 'clamp(0.7rem, 1.5vw, 1rem)',
        background: 'rgba(0,0,0,0.42)',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(255,255,255,0.1)',
        padding: '0.22rem 0.55rem', borderRadius: '4px',
        opacity: hovered ? 1 : 0.55,
        transition: 'opacity 0.3s',
      }}>
        <span style={{
          fontSize: 'clamp(0.45rem, 0.9vw, 0.52rem)',
          fontWeight: 700, letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.8)',
        }}>{item.category}</span>
      </div>

      {/* Zoom icon */}
      <div style={{
        position: 'absolute',
        top: 'clamp(0.7rem, 1.5vw, 1rem)',
        right: 'clamp(0.7rem, 1.5vw, 1rem)',
        opacity: hovered ? 1 : 0, transition: 'opacity 0.3s',
        background: 'rgba(0,0,0,0.48)', backdropFilter: 'blur(6px)',
        borderRadius: '50%', width: 34, height: 34,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '0.8rem',
      }}>🔍</div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════════════ */
export default function BrandingPortfolioPage() {
  useLenis()

  const heroRef     = useRef(null)
  const heroTextRef = useRef(null)
  const overlayRef  = useRef(null)
  const countRowRef = useRef(null)

  const [activeTab,     setActiveTab]     = useState('all')
  const [filteredItems, setFilteredItems] = useState(PORTFOLIO)
  const [lightboxIdx,   setLightboxIdx]   = useState(null)

  /* Filter */
  useEffect(() => {
    setFilteredItems(activeTab === 'all' ? PORTFOLIO : PORTFOLIO.filter(p => p.category === activeTab))
  }, [activeTab])

  /* Count-row flash on filter change */
  useEffect(() => {
    if (!countRowRef.current) return
    gsap.fromTo(countRowRef.current,
      { opacity: 0, x: -10 },
      { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' }
    )
  }, [filteredItems])

  /* Hero entrance curtain */
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

        /* ── Portrait Grid — 4 kolom desktop → 3 → 2 → 1 ── */
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

        /* Elegant scrollbar */
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

        {/* ── HERO ───────────────────────────────────────────── */}
        <section
          ref={heroRef}
          style={{
            position: 'relative', width: '100%',
            height: '100vh', minHeight: 520,
            background: '#ffffff', overflow: 'hidden',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          {/* Ambient glow */}
          <div style={{
            position: 'absolute', inset: 0, zIndex: 0,
            backgroundImage: `
              radial-gradient(circle at 25% 55%, rgba(93,224,230,0.07) 0%, transparent 45%),
              radial-gradient(circle at 78% 28%, rgba(0,74,173,0.09) 0%, transparent 45%)
            `,
          }} />

          {/* Curtain reveal */}
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
            {/* Breadcrumb */}
            <div className="hero-line" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Link href="/" style={{ fontSize: '0.72rem', fontWeight: 500, color: 'rgba(0,0,0,0.4)', textDecoration: 'none', letterSpacing: '0.1em', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#5de0e6'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(0,0,0,0.4)'}
              >Creaut Bali</Link>
              <span style={{ color: 'rgba(0,0,0,0.2)' }}>·</span>
              <Link href="/services/branding" style={{ fontSize: '0.72rem', fontWeight: 500, color: 'rgba(0,0,0,0.4)', textDecoration: 'none', letterSpacing: '0.1em', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#5de0e6'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(0,0,0,0.4)'}
              >Branding</Link>
              <span style={{ color: 'rgba(0,0,0,0.2)' }}>·</span>
              <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#5de0e6', letterSpacing: '0.1em' }}>Portfolio</span>
            </div>

            {/* Pill label */}
            <div className="hero-line" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: 24, height: 2, borderRadius: 2, background: 'linear-gradient(90deg, #5de0e6, #004aad)' }} />
              <span style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)' }}>
                {PORTFOLIO.length} Projects · {TABS.length - 1} Categories
              </span>
              <div style={{ width: 24, height: 2, borderRadius: 2, background: 'linear-gradient(90deg, #004aad, #5de0e6)' }} />
            </div>

            {/* Heading */}
            <h1 className="hero-line" style={{
              fontWeight: 800,
              fontSize: 'clamp(4rem, 12vw, 10rem)',
              color: '#000', letterSpacing: '-0.045em', lineHeight: 0.9, margin: 0,
            }}>
              Brand<br />
              <span style={{
                background: 'linear-gradient(90deg, #5de0e6, #004aad)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>Work.</span>
            </h1>

            {/* Desc */}
            <p className="hero-line" style={{
              fontSize: 'clamp(0.875rem, 1.6vw, 1.05rem)',
              color: 'rgba(0,0,0,0.5)', lineHeight: 1.75, maxWidth: 460, margin: 0,
            }}>
              Every brand we've built — from identity systems to packaging, strategy to guidelines.
            </p>

          </div>

          {/* Scroll hint */}
          <div style={{
            position: 'absolute', bottom: '2.5rem', left: '50%', transform: 'translateX(-50%)',
            zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
          }}>
            <span style={{ fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.25)' }}>Scroll</span>
            <div style={{ width: 1, height: 40, background: 'linear-gradient(180deg, rgba(93,224,230,0.6), transparent)', borderRadius: 1 }} />
          </div>
        </section>

        {/* ── FILTER + PORTFOLIO GRID ─────────────────────────── */}
        <section id="portfolio" style={{ background: '#fff', borderTop: '1px solid rgba(0,0,0,0.06)' }}>

          {/* Sticky tab bar */}
          <div style={{ position: 'sticky', top: 0, zIndex: 50 }}>
            <div style={{ maxWidth: 1600, margin: '0 auto', padding: 'clamp(0.75rem,2vw,1rem) clamp(1rem,4vw,2rem) 0' }}>
              <TabBar active={activeTab} onSelect={setActiveTab} counts={counts} />
            </div>
          </div>

          {/* Grid area */}
          <div style={{ padding: '0 0 clamp(3rem,8vw,5rem)' }}>
            <div style={{ maxWidth: 1600, margin: '0 auto', padding: '0 clamp(0.75rem,3vw,2rem)' }}>
              {filteredItems.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '6rem 0', color: 'rgba(0,0,0,0.2)' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🎨</div>
                  <p style={{ fontSize: '0.9rem', fontWeight: 600 }}>No projects in this category yet.</p>
                </div>
              ) : (
                <>
                  {/* Count row */}
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

                  {/* Portrait grid — 4/5 ratio (1080×1350) */}
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

        {/* ── BOTTOM CTA ──────────────────────────────────────── */}
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
              >Start a Project ↗</a>
              <Link href="/services/branding" style={{
                padding: 'clamp(0.75rem,2vw,0.9rem) clamp(1.5rem,4vw,2.25rem)',
                background: '#fff', border: '1.5px solid rgba(0,0,0,0.15)',
                color: '#000', textDecoration: 'none',
                fontSize: 'clamp(0.8rem,2vw,0.875rem)', fontWeight: 600,
                borderRadius: '8px', transition: 'border-color 0.2s, color 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#5de0e6'; e.currentTarget.style.color = '#004aad' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.15)'; e.currentTarget.style.color = '#000' }}
              >← Back to Branding</Link>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  )
}