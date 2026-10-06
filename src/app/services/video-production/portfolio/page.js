'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import VideoModal from '@/components/ui/VideoModal'
import PortfolioCard from '@/components/ui/PortfolioCard'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const TABS = [
  { id: 'all', label: 'All' },
  { id: 'fnb', label: 'Food & Beverage' },
  { id: 'fashion', label: 'Fashion & Clothing' },
  { id: 'hospitality', label: 'Hospitality' },
  { id: 'property', label: 'Property & Real Estate' },
  { id: 'auto', label: 'Automotive & Adventure' },
  { id: 'env', label: 'Environmental' },
  { id: 'entertainment', label: 'Entertainment & Events' },
]

const PORTFOLIO = [
  { id: 1, category: 'fashion', title: '', client: '', duration: '', url: 'https://youtube.com/shorts/pmkDVKcuaKU?si=RphgsO2_1OtFClPm', image: '/image/advish1.webp' },
  { id: 2, category: 'fashion', title: '', client: '', duration: '', url: 'https://youtube.com/shorts/ghj0wlUsHkc?si=y8_cedOkJeaKPUwN', image: '/image/advish2.webp' },
  { id: 3, category: 'fashion', title: '', client: '', duration: '', url: 'https://youtube.com/shorts/JcuqXkYsLnU?si=jAPvtmXvndm39MWA', image: '/image/advish3.webp' },
  { id: 4, category: 'fashion', title: '', client: '', duration: '', url: 'https://youtube.com/shorts/xj8iSDjSzmQ?si=jfapxMb1Pe9rQAJs', image: '/image/advish4.webp' },
  { id: 5, category: 'fashion', title: '', client: '', duration: '', url: 'https://youtube.com/shorts/2PKAxeDKDuw?si=z3kiqq72sR-f0XHv', image: '/image/advish5.webp' },
  { id: 6, category: 'entertainment', title: '', client: '', duration: '', url: 'https://youtube.com/shorts/0qZElaNqcYg?si=zqmd3Emb8-tMZVeU', image: '/image/ba1.webp' },
  { id: 7, category: 'entertainment', title: '', client: '', duration: '', url: 'https://youtube.com/shorts/5sMW2OHwI5g?si=wiwXICYATB5zxh4U', image: '/image/ba2.webp' },
  { id: 8, category: 'entertainment', title: '', client: '', duration: '', url: 'https://youtube.com/shorts/xZgg9ahG9-E?si=MuuKzoXbMCRc9OXZ', image: '/image/ba3.webp' },
  { id: 9, category: 'env', title: '', client: '', duration: '', url: 'https://youtube.com/shorts/klW73hHIOHo?si=V-WAEyeSQAWSVl71', image: '/image/enviro1.webp' },
  { id: 10, category: 'env', title: '', client: '', duration: '', url: 'https://youtube.com/shorts/f9RI4TNhKQk?si=HpaFX_iif0PMG9nr', image: '/image/amanaid1.webp' },
  { id: 11, category: 'env', title: '', client: '', duration: '', url: 'https://youtube.com/shorts/wNeVKC5ap2M?si=OMVUmWvQFO4JcF2d', image: '/image/amanaid2.webp' },
  { id: 12, category: 'env', title: '', client: '', duration: '2:15', url: 'https://youtube.com/shorts/fwuUQtEjNoQ?si=3hhSTIb4BRgr1gGf', image: '/image/amanaid3.webp' },
  { id: 13, category: 'auto', title: '', client: '', duration: '', url: 'https://youtube.com/shorts/REPLACE_ID', image: '/image/raka1.webp' },
  { id: 14, category: 'auto', title: '', client: '', duration: '', url: 'https://youtube.com/shorts/REPLACE_ID', image: '/image/raka2.webp' },
  { id: 15, category: 'fnb', title: '', client: '', duration: '', url: 'https://youtube.com/shorts/REPLACE_ID', image: '/image/mcc1.webp' },
  { id: 16, category: 'fnb', title: '', client: '', duration: '', url: 'https://youtube.com/shorts/REPLACE_ID', image: '/image/mcc2.webp' },
  { id: 17, category: 'fnb', title: '', client: '', duration: '', url: 'https://youtube.com/shorts/REPLACE_ID', image: '/image/mcc3.webp' },
  { id: 18, category: 'property', title: '', client: '', duration: '', url: 'https://youtube.com/shorts/REPLACE_ID', image: '/image/amartya1.webp' },
  { id: 19, category: 'property', title: '', client: '', duration: '', url: 'https://youtube.com/shorts/REPLACE_ID', image: '/image/amartya2.webp' },
  { id: 20, category: 'property', title: '', client: '', duration: '', url: 'https://youtube.com/shorts/REPLACE_ID', image: '/image/amartya3.webp' },
  { id: 21, category: 'hospitality', title: '', client: '', duration: '', url: 'https://youtube.com/shorts/REPLACE_ID', image: '/image/uma1.webp' },
  { id: 22, category: 'hospitality', title: '', client: '', duration: '', url: 'https://youtube.com/shorts/REPLACE_ID', image: '/image/uma2.webp' },
  { id: 23, category: 'hospitality', title: '', client: '', duration: '', url: 'https://youtube.com/shorts/REPLACE_ID', image: '/image/uma3.webp' },
]

function TabBar({ active, onSelect, counts }) {
  const [mainTab, ...restTabs] = TABS

  const TabButton = ({ tab }) => {
    const isActive = active === tab.id
    const count = tab.id === 'all' ? PORTFOLIO.length : (counts[tab.id] || 0)
    
    return (
      <button
        onClick={() => onSelect(tab.id)}
        style={{
          padding: '0 0 10px',
          border: 'none',
          background: 'transparent',
          color: isActive ? '#000' : 'rgba(0,0,0,0.38)',
          fontSize: 'clamp(0.65rem, 1.8vw, 0.7rem)',
          fontWeight: isActive ? 700 : 500,
          cursor: 'pointer',
          letterSpacing: '0.02em',
          whiteSpace: 'nowrap',
          position: 'relative',
          transition: 'color 0.2s',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          flexShrink: 0,
          minHeight: 44,
        }}
        onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = '#000' }}
        onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = 'rgba(0,0,0,0.38)' }}
      >
        {tab.label}
        <span style={{
          fontSize: 'clamp(0.5rem, 1.4vw, 0.55rem)',
          fontWeight: 600,
          color: isActive ? '#5de0e6' : 'rgba(0,0,0,0.25)',
          transition: 'color 0.2s',
        }}>
          {count}
        </span>
        <span style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'linear-gradient(90deg,#5de0e6,#004aad)',
          opacity: isActive ? 1 : 0,
          transition: 'opacity 0.2s',
        }} />
      </button>
    )
  }

  return (
    <div style={{ borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
      <div style={{
        maxWidth: 1400,
        margin: '0 auto',
        padding: '0 clamp(1rem, 4vw, 2rem)',
        display: 'flex',
        alignItems: 'flex-end',
        gap: 'clamp(1rem, 3vw, 2rem)',
        overflowX: 'auto',
        scrollbarWidth: 'none',
        WebkitOverflowScrolling: 'touch',
      }}>
        <TabButton tab={mainTab} />
        <div style={{ width: 1, height: 16, background: 'rgba(0,0,0,0.12)', flexShrink: 0, marginBottom: 10 }} />
        {restTabs.map(tab => <TabButton key={tab.id} tab={tab} />)}
      </div>
    </div>
  )
}

function CTAStrip() {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(contentRef.current.querySelectorAll('.cta-item'),
      { y: 36, opacity: 0 },
      {
        y: 0, opacity: 1, stagger: 0.1, duration: 0.85, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' },
      }
    )
  }, [])

  return (
    <section ref={sectionRef} style={{
      background: '#fff',
      borderTop: '1px solid rgba(0,0,0,0.06)',
      padding: 'clamp(5rem, 10vw, 8rem) clamp(1rem, 4vw, 2rem)',
      overflow: 'hidden',
      position: 'relative',
    }}>
      <div style={{
        position: 'absolute',
        top: '-40%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '80%',
        height: '180%',
        background: 'radial-gradient(ellipse at center, rgba(93,224,230,0.07) 0%, rgba(0,74,173,0.04) 45%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      <div style={{ position: 'relative', zIndex: 1, width: '100%' }}>
        <div ref={contentRef} style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center' }}>
          
          <div className="cta-item" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            border: '1px solid rgba(0,0,0,0.15)',
            borderRadius: '999px',
            padding: '0.35rem 0.9rem',
            marginBottom: '1.75rem',
            background: '#fafafa',
          }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'linear-gradient(90deg, #5de0e6, #004aad)', flexShrink: 0 }} />
            <span style={{ fontSize: 'clamp(0.6rem, 1.5vw, 0.72rem)', fontWeight: 700, color: 'rgba(0,0,0,0.45)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              Interested in working together?
            </span>
          </div>

          <h2 className="cta-item" style={{
            fontSize: 'clamp(2rem, 8vw, 4rem)',
            fontWeight: 800,
            letterSpacing: '-0.04em',
            color: '#000',
            lineHeight: 1.05,
            marginBottom: '2.5rem',
          }}>
            Let's create your{' '}
            <span style={{ background: 'linear-gradient(90deg, #5de0e6, #004aad)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              next film.
            </span>
          </h2>

          <div className="cta-item" style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="https://wa.me/62818160664"
              target="_blank"
              rel="noreferrer"
              style={{
                padding: 'clamp(0.75rem, 2vw, 0.9rem) clamp(1.5rem, 4vw, 2.25rem)',
                background: 'linear-gradient(90deg, #5de0e6, #004aad)',
                color: '#fff',
                textDecoration: 'none',
                fontSize: 'clamp(0.8rem, 2vw, 0.875rem)',
                fontWeight: 600,
                borderRadius: '8px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                transition: 'opacity 0.2s',
                boxShadow: '0 4px 24px rgba(0,74,173,0.18)',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              Contact Us ↗
            </a>
            <Link
              href="/services/video-production"
              style={{
                padding: 'clamp(0.75rem, 2vw, 0.9rem) clamp(1.5rem, 4vw, 2.25rem)',
                background: '#fff',
                border: '1.5px solid rgba(0,0,0,0.15)',
                color: '#000',
                textDecoration: 'none',
                fontSize: 'clamp(0.8rem, 2vw, 0.875rem)',
                fontWeight: 600,
                borderRadius: '8px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                transition: 'border-color 0.2s, color 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#5de0e6'; e.currentTarget.style.color = '#004aad' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.15)'; e.currentTarget.style.color = '#000' }}
            >
              ← Back to Services
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function VideoPortfolioPage() {
  const [activeTab, setActiveTab] = useState('all')
  const [filteredItems, setFilteredItems] = useState(PORTFOLIO)
  const [activeIndex, setActiveIndex] = useState(null)

  const heroRef = useRef(null)
  const heroTextRef = useRef(null)
  const overlayRef = useRef(null)
  const gridRef = useRef(null)
  const countRowRef = useRef(null)

  const counts = PORTFOLIO.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1
    return acc
  }, {})

  useEffect(() => {
    setFilteredItems(activeTab === 'all' ? PORTFOLIO : PORTFOLIO.filter(p => p.category === activeTab))
    setActiveIndex(null)
  }, [activeTab])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .fromTo(overlayRef.current,
          { scaleY: 1 },
          { scaleY: 0, duration: 1.2, ease: 'power4.inOut', transformOrigin: 'top' }
        )
        .fromTo(heroTextRef.current.querySelectorAll('.hero-line'),
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.1, duration: 0.9 },
          '-=0.4'
        )
    }, heroRef)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (!countRowRef.current) return
    gsap.fromTo(countRowRef.current,
      { opacity: 0, x: -16 },
      { opacity: 1, x: 0, duration: 0.45, ease: 'power2.out' }
    )
  }, [filteredItems])

  return (
    <>
      <style>{`
        html { scroll-behavior: smooth; }
        *, *::before, *::after { box-sizing: border-box; }
        ::-webkit-scrollbar { display: none; }

        @keyframes grid-in { from { opacity: 0; } to { opacity: 1; } }

        .portfolio-grid {
          display: grid;
          gap: 1px;
          background: rgba(0,0,0,0.06);
          animation: grid-in 0.4s ease;
          grid-template-columns: repeat(6, 1fr);
        }
        @media (max-width: 1024px) { .portfolio-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 600px)  { .portfolio-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 600px)  { .hero-heading   { font-size: clamp(3.5rem, 20vw, 5rem) !important; } }
      `}</style>

      <Navbar />

      <main>
        <section ref={heroRef} style={{
          position: 'relative',
          width: '100%',
          height: '100vh',
          minHeight: 520,
          background: '#ffffff',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            zIndex: 0,
            background: '#fff',
            backgroundImage: `
              radial-gradient(circle at 25% 55%, rgba(93,224,230,0.07) 0%, transparent 45%),
              radial-gradient(circle at 78% 28%, rgba(0,74,173,0.09) 0%, transparent 45%)
            `,
          }} />

          <div ref={overlayRef} style={{
            position: 'absolute',
            inset: 0,
            zIndex: 10,
            background: 'linear-gradient(135deg, #5de0e6, #004aad)',
            transformOrigin: 'top',
            pointerEvents: 'none',
          }} />

          <div ref={heroTextRef} style={{
            position: 'relative',
            zIndex: 2,
            padding: 'clamp(1.5rem, 5vw, 4rem)',
            width: '100%',
            maxWidth: 860,
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 'clamp(1rem, 3vw, 1.5rem)',
          }}>
            <div className="hero-line" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Link href="/" style={{ fontSize: 'clamp(0.6rem, 1.5vw, 0.72rem)', fontWeight: 500, color: 'rgba(0,0,0,0.4)', textDecoration: 'none', letterSpacing: '0.1em', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#5de0e6'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(0,0,0,0.4)'}>Creaut Bali</Link>
              <span style={{ color: 'rgba(0,0,0,0.2)' }}>·</span>
              <Link href="/services" style={{ fontSize: 'clamp(0.6rem, 1.5vw, 0.72rem)', fontWeight: 500, color: 'rgba(0,0,0,0.4)', textDecoration: 'none', letterSpacing: '0.1em', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#5de0e6'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(0,0,0,0.4)'}>Services</Link>
              <span style={{ color: 'rgba(0,0,0,0.2)' }}>·</span>
              <span style={{ fontSize: 'clamp(0.6rem, 1.5vw, 0.72rem)', fontWeight: 600, color: '#5de0e6', letterSpacing: '0.1em' }}>Portfolio</span>
            </div>

            <div className="hero-line" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: 22, height: 2, borderRadius: 2, background: 'linear-gradient(90deg, #5de0e6, #004aad)' }} />
              <span style={{ fontSize: 'clamp(0.58rem, 1.5vw, 0.68rem)', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)', textAlign: 'center' }}>
                {PORTFOLIO.length} Projects · 12 Industries
              </span>
              <div style={{ width: 22, height: 2, borderRadius: 2, background: 'linear-gradient(90deg, #004aad, #5de0e6)' }} />
            </div>

            <h1 className="hero-line hero-heading" style={{
              fontWeight: 800,
              fontSize: 'clamp(3.5rem, 13vw, 10rem)',
              color: '#000000',
              letterSpacing: '-0.04em',
              lineHeight: 0.9,
              margin: 0,
            }}>
              Our<br />
              <span style={{ background: 'linear-gradient(90deg, #5de0e6, #004aad)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Work.
              </span>
            </h1>

            <p className="hero-line" style={{
              fontSize: 'clamp(0.82rem, 2vw, 1.05rem)',
              color: 'rgba(0,0,0,0.5)',
              lineHeight: 1.75,
              maxWidth: 480,
              margin: 0,
              padding: '0 0.5rem',
            }}>
              Cinematic productions spanning every industry — from intimate brand stories to large-scale commercial campaigns.
            </p>
          </div>

          <div style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.25)' }}>Scroll</span>
            <div style={{ width: 1, height: 36, background: 'linear-gradient(180deg, rgba(93,224,230,0.6), transparent)', borderRadius: 1 }} />
          </div>
        </section>

        <section id="portfolio" style={{ background: '#fff', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
          <div style={{
            position: 'sticky',
            top: 0,
            zIndex: 50,
            background: 'rgba(255,255,255,0.97)',
            backdropFilter: 'blur(12px)',
          }}>
            <div style={{ maxWidth: 1400, margin: '0 auto', padding: 'clamp(0.75rem, 2vw, 1rem) clamp(1rem, 4vw, 2rem) 0' }}>
              <TabBar active={activeTab} onSelect={setActiveTab} counts={counts} />
            </div>
          </div>

          <div style={{ padding: '0 0 clamp(3rem, 8vw, 5rem)' }}>
            <div style={{ maxWidth: 1800, margin: '0 auto', padding: '0 clamp(0.75rem, 3vw, 2rem)' }}>
              {filteredItems.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '6rem 0', color: 'rgba(0,0,0,0.2)' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🎬</div>
                  <p style={{ fontSize: '0.9rem', fontWeight: 600 }}>No projects in this category yet.</p>
                </div>
              ) : (
                <>
                  <div ref={countRowRef} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    padding: 'clamp(1.25rem, 3vw, 1.75rem) 0 clamp(1rem, 2.5vw, 1.25rem)',
                  }}>
                    <div style={{ width: 18, height: 1.5, background: 'linear-gradient(90deg,#5de0e6,#004aad)' }} />
                    <span style={{ fontSize: 'clamp(0.58rem, 1.5vw, 0.62rem)', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#004aad' }}>
                      {filteredItems.length} {filteredItems.length === 1 ? 'Project' : 'Projects'}
                    </span>
                  </div>

                  <div ref={gridRef} className="portfolio-grid">
                    {filteredItems.map((item, i) => (
                      <PortfolioCard
                        key={`${activeTab}-${item.id}`}
                        item={item}
                        index={i}
                        onPlay={setActiveIndex}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </section>

        <CTAStrip />
        <Footer />

        {activeIndex !== null && (
          <VideoModal
            items={filteredItems}
            activeIndex={activeIndex}
            onChange={setActiveIndex}
            onClose={() => setActiveIndex(null)}
          />
        )}

      </main>
    </>
  )
}