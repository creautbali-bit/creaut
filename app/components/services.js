'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    id: 1,
    title: 'Video Production',
    sub: 'Commercial · Corporate · Documentary',
    href: '/services/video-production',
    bg: '#fff',
    gif: '/image/vdgp.gif',
  },
  {
    id: 2,
    title: 'Social Media Management',
    sub: 'Strategy · Content · Community',
    href: '/services/social-media-management',
    bg: '#fff',
    gif: '/image/smm.gif',
  },
  {
    id: 3,
    title: 'Visual Photography',
    sub: 'Editorial · Product · Lifestyle',
    href: '/services/visual-photography',
    bg: '#fff',
    gif: '/image/ptgp.gif',
  },
  {
    id: 4,
    title: 'Branding',
    sub: 'Identity · Logo · Guidelines',
    href: '/services/branding',
    bg: '#fff',
    gif: '/image/branding.gif', 
  },
]

function ServiceCard({ service, index }) {
  const cardRef    = useRef(null)
  const plusRef    = useRef(null)
  const titleRef   = useRef(null)
  const overlayRef = useRef(null)
  const thumbRef   = useRef(null)
  const borderRef  = useRef(null)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    gsap.fromTo(cardRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0,
        duration: 0.75,
        delay: (index % 2) * 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: cardRef.current, start: 'top 88%' },
      }
    )
  }, [index])

  const handleEnter = () => {
    setHovered(true)
    gsap.to(thumbRef.current,   { scale: 1.06, duration: 0.6,  ease: 'power2.out' })
    gsap.to(overlayRef.current, { opacity: 1,  duration: 0.45, ease: 'power2.out' })
    gsap.to(borderRef.current,  { opacity: 1,  duration: 0.35, ease: 'power2.out' })
    gsap.to(titleRef.current,   { y: -5,       duration: 0.35, ease: 'power2.out' })
    gsap.to(plusRef.current,    { rotate: 45,  scale: 1.1, duration: 0.35, ease: 'power2.out' })
  }

  const handleLeave = () => {
    setHovered(false)
    gsap.to(thumbRef.current,   { scale: 1,   duration: 0.5,  ease: 'power2.inOut' })
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.4,  ease: 'power2.inOut' })
    gsap.to(borderRef.current,  { opacity: 0, duration: 0.3,  ease: 'power2.inOut' })
    gsap.to(titleRef.current,   { y: 0,       duration: 0.35, ease: 'power2.inOut' })
    gsap.to(plusRef.current,    { rotate: 0,  scale: 1, duration: 0.35, ease: 'power2.inOut' })
  }

  return (
    <a
      ref={cardRef}
      href={service.href}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{
        display: 'block',
        position: 'relative',
        overflow: 'hidden',
        background: service.bg,
        textDecoration: 'none',
        height: '90vh',
        minHeight: 270,
        cursor: 'pointer',
      }}
    >
      <div
        ref={thumbRef}
        style={{
          position: 'absolute', inset: 0, zIndex: 0,
          transformOrigin: 'center',
          willChange: 'transform',
        }}
      >
        <img
          src={service.gif}
          alt={service.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </div>

      {/* Gradient overlay — muncul saat hover */}
      <div
        ref={overlayRef}
        style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: 'linear-gradient(135deg, rgba(93,224,230,0.18) 0%, rgba(0,74,173,0.32) 100%)',
          opacity: 0,
          willChange: 'opacity',
        }}
      />

      {/* Bottom bar */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '2rem 2.5rem',
        display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
        zIndex: 4,
      }}>
        <div ref={titleRef} style={{ flex: 1, willChange: 'transform' }}>
          <p style={{
            fontSize: '0.68rem', fontWeight: 500,
            letterSpacing: '0.16em', textTransform: 'uppercase',
            color: hovered ? '#ffffff' : 'rgba(255, 255, 255, 0.55)',
            margin: '0 0 0.4rem 0',
            transition: 'color 0.35s ease',
          }}>
            {service.sub}
          </p>
          <h3 style={{
            fontWeight: 700,
            fontSize: 'clamp(2.6rem, 5vw, 4rem)',
            color: '#ffffff',
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            margin: 0,
          }}>
            {service.title}
          </h3>
        </div>

        {/* Plus button */}
        <div
          ref={plusRef}
          style={{
            width: 52, height: 52,
            borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0, marginLeft: '1.5rem',
            willChange: 'transform',
            background: hovered
              ? 'linear-gradient(135deg, #5de0e6, #004aad)'
              : 'linear-gradient(135deg, #5ddfe67e, #004bad65)',
            boxShadow: hovered
              ? '0 0 28px rgba(93,224,230,0.55), 0 0 8px rgba(0,74,173,0.4)'
              : 'inset 0 0 0 1.5px rgba(255,255,255,0.35)',
            backdropFilter: 'blur(8px)',
            transition: 'background 0.35s ease, box-shadow 0.35s ease',
          }}
        >
          <span style={{
            color: '#000', fontSize: '1.6rem',
            lineHeight: 1, fontWeight: 300,
            userSelect: 'none', display: 'block', marginTop: '-1px',
          }}>
            +
          </span>
        </div>
      </div>

      {/* Index number */}
      <div style={{
        position: 'absolute', top: '1.5rem', right: '2rem', zIndex: 4,
        fontSize: '0.68rem', fontWeight: 600,
        color: hovered ? 'rgba(93,224,230,0.7)' : 'rgba(255,255,255,0.3)',
        letterSpacing: '0.12em',
        transition: 'color 0.35s ease',
      }}>
        0{service.id}
      </div>
    </a>
  )
}

export default function Services() {
  const headerRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(headerRef.current,
      { opacity: 0, y: 24 },
      {
        opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: headerRef.current, start: 'top 82%' },
      }
    )
  }, [])

  return (
    <section id="services" style={{ background: '#fff', padding: 0 }}>

      {/* 2-column grid — full width, edge to edge */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '10px',
        borderRadius: '50px',
        background: '#fff',
      }}>
        {services.map((service, i) => (
          <ServiceCard key={service.id} service={service} index={i} />
        ))}
      </div>

    </section>
  )
}