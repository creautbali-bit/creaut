'use client'

import { useEffect, useRef, useState, useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import useLenis from '@/hooks/useLenis'
import ValueCard from '@/components/about/ValueCard'
import TeamCard from '@/components/about/TeamCard'
import VisionMission from '@/components/about/VisionMission'
import { whoWeAreImages, whoWeAreRoles, values, executives, staffMembers, stats } from '@/data/about'

gsap.registerPlugin(ScrollTrigger)

export default function AboutPage() {
  const lenisRef = useLenis()

  const heroRef = useRef(null)
  const heroTextRef = useRef(null)
  const heroInnerRef = useRef(null)
  const overlayRef = useRef(null)

  const whoWeAreRef = useRef(null)
  const stackedImagesRef = useRef([])
  const rolesListRefs = useRef([])

  const storyRef = useRef(null)
  const visionRef = useRef(null)
  const valuesRef = useRef(null)
  const executivesRef = useRef(null)
  const teamRef = useRef(null)
  const ctaRef = useRef(null)
  const footerRef = useRef(null)

  const scrollToTeam = (e) => {
    e.preventDefault()
    const target = document.getElementById('executives')
    if (!target) return
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, { offset: -20 })
    } else {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  useLayoutEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      gsap.set(overlayRef.current, { scaleY: 0 })
      return
    }

    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .fromTo(overlayRef.current,
          { scaleY: 1 },
          { scaleY: 0, duration: 1.25, ease: 'power4.inOut', transformOrigin: 'top' }
        )
        .fromTo(heroTextRef.current.querySelectorAll('.hero-line'),
          { y: 70, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.1, duration: 0.95 },
          '-=0.45'
        )
    }, heroRef)
    return () => ctx.revert()
  }, [])

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const mm = gsap.matchMedia()

    // 1. ANIMASI UMUM (Jalan di Desktop & Mobile)
    mm.add('(min-width: 1px)', () => {
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: 'top top',
        end: () => `+=${window.innerHeight * 1.2}`,
        pin: true,
        pinSpacing: false,
        anticipatePin: 1,
        id: 'hero-pin',
      })

      gsap.to(heroInnerRef.current, {
        y: -80,
        opacity: 0,
        scale: 0.97,
        ease: 'none',
        scrollTrigger: {
          trigger: whoWeAreRef.current,
          start: 'top 85%',
          end: 'top 10%',
          scrub: 1.2,
        },
      })

      // Animasi masuk clipPath Who We Are
      gsap.fromTo(whoWeAreRef.current,
        { clipPath: 'inset(6% 0% 0% 0% round 18px 18px 0px 0px)' },
        {
          clipPath: 'inset(0% 0% 0% 0% round 0px 0px 0px 0px)',
          ease: 'none',
          scrollTrigger: { trigger: whoWeAreRef.current, start: 'top 92%', end: 'top 5%', scrub: 1 },
        }
      )

      gsap.fromTo(storyRef.current,
        { y: 90, clipPath: 'inset(5% 0% 0% 0% round 16px 16px 0px 0px)' },
        {
          y: 0,
          clipPath: 'inset(0% 0% 0% 0% round 0px 0px 0px 0px)',
          ease: 'none',
          scrollTrigger: { trigger: storyRef.current, start: 'top 90%', end: 'top 5%', scrub: 1 },
        }
      )

      const storyText = storyRef.current.querySelector('.story-text')

      if (storyText) {
        const text = storyText.textContent.trim()
        const words = text.split(/\s+/)

        storyText.innerHTML = words
          .map((word) => `<span class="story-word">${word}</span>`)
          .join(' ')

        const storyWords = storyText.querySelectorAll('.story-word')

        gsap.set(storyWords, {
          opacity: 0.12,
        })

        gsap.to(storyWords, {
          opacity: 1,
          stagger: 0.04,
          ease: 'none',
          scrollTrigger: {
            trigger: storyRef.current,
            start: 'top 70%',
            end: 'bottom 30%',
            scrub: 1,
          },
        })
      }

      // Animasi Vision & Mission
      gsap.fromTo(visionRef.current,
        { y: 80, clipPath: 'inset(4% 0% 0% 0% round 16px 16px 0px 0px)' },
        {
          y: 0,
          clipPath: 'inset(0% 0% 0% 0% round 0px 0px 0px 0px)',
          ease: 'none',
          scrollTrigger: { trigger: visionRef.current, start: 'top 88%', end: 'top 5%', scrub: 1 },
        }
      )

      const vmItems = visionRef.current.querySelectorAll('.vm-reveal')
      gsap.set(vmItems, { opacity: 0, y: 30 })
      ScrollTrigger.create({
        trigger: visionRef.current,
        start: 'top 76%',
        onEnter: () => gsap.to(vmItems, { opacity: 1, y: 0, duration: 0.65, stagger: 0.12, ease: 'power3.out' }),
      })

      gsap.fromTo(valuesRef.current,
        { y: 80, clipPath: 'inset(4% 0% 0% 0% round 16px 16px 0px 0px)' },
        {
          y: 0,
          clipPath: 'inset(0% 0% 0% 0% round 0px 0px 0px 0px)',
          ease: 'none',
          scrollTrigger: { trigger: valuesRef.current, start: 'top 88%', end: 'top 5%', scrub: 1 },
        }
      )

      const valueCards = valuesRef.current.querySelectorAll('.value-card')
      gsap.set(valueCards, { opacity: 0, y: 30 })
      ScrollTrigger.create({
        trigger: valuesRef.current,
        start: 'top 76%',
        onEnter: () => gsap.to(valueCards, { opacity: 1, y: 0, duration: 0.65, stagger: 0.08, ease: 'power3.out' }),
      })

      // Animasi Executives Section
      gsap.fromTo(executivesRef.current,
        { y: 80, clipPath: 'inset(4% 0% 0% 0% round 16px 16px 0px 0px)' },
        {
          y: 0,
          clipPath: 'inset(0% 0% 0% 0% round 0px 0px 0px 0px)',
          ease: 'none',
          scrollTrigger: { trigger: executivesRef.current, start: 'top 88%', end: 'top 5%', scrub: 1 },
        }
      )

      const execCards = executivesRef.current.querySelectorAll('.team-card')
      gsap.set(execCards, { opacity: 0, y: 30 })
      ScrollTrigger.create({
        trigger: executivesRef.current,
        start: 'top 78%',
        onEnter: () => gsap.to(execCards, { opacity: 1, y: 0, duration: 0.65, stagger: 0.08, ease: 'power3.out' }),
      })

      // Animasi Staff Section
      gsap.fromTo(teamRef.current,
        { y: 80, clipPath: 'inset(4% 0% 0% 0% round 16px 16px 0px 0px)' },
        {
          y: 0,
          clipPath: 'inset(0% 0% 0% 0% round 0px 0px 0px 0px)',
          ease: 'none',
          scrollTrigger: { trigger: teamRef.current, start: 'top 88%', end: 'top 5%', scrub: 1 },
        }
      )

      const teamCards = teamRef.current.querySelectorAll('.team-card')
      gsap.set(teamCards, { opacity: 0, y: 30 })
      ScrollTrigger.create({
        trigger: teamRef.current,
        start: 'top 78%',
        onEnter: () => gsap.to(teamCards, { opacity: 1, y: 0, duration: 0.65, stagger: 0.08, ease: 'power3.out' }),
      })

      gsap.fromTo(ctaRef.current,
        { y: 70, clipPath: 'inset(5% 0% 0% 0% round 20px 20px 0px 0px)' },
        {
          y: 0,
          clipPath: 'inset(0% 0% 0% 0% round 0px 0px 0px 0px)',
          ease: 'none',
          scrollTrigger: { trigger: ctaRef.current, start: 'top 88%', end: 'top 5%', scrub: 1 },
        }
      )

      const ctaItems = ctaRef.current.querySelectorAll('.cta-reveal')
      gsap.set(ctaItems, { opacity: 0, y: 28 })
      ScrollTrigger.create({
        trigger: ctaRef.current,
        start: 'top 70%',
        onEnter: () => gsap.to(ctaItems, { opacity: 1, y: 0, duration: 0.75, stagger: 0.12, ease: 'power3.out' }),
      })

      gsap.fromTo(footerRef.current,
        { y: 60, clipPath: 'inset(8% 0% 0% 0% round 24px 24px 0px 0px)' },
        {
          y: 0,
          clipPath: 'inset(0% 0% 0% 0% round 0px 0px 0px 0px)',
          ease: 'none',
          scrollTrigger: { trigger: footerRef.current, start: 'top 92%', end: 'top 15%', scrub: 1 },
        }
      )
    })

    // 2. KHUSUS ANIMASI WHO WE ARE (Hanya jalan di Desktop / Layar > 900px)
    mm.add('(min-width: 901px)', () => {
      const stackImages = stackedImagesRef.current;
      const roleItems = rolesListRefs.current;
      
      if (stackImages.length > 0 && roleItems.length > 0) {
        gsap.set(stackImages, { transformOrigin: 'top center' });
        gsap.set(roleItems, { fontWeight: 400, color: 'rgba(0,0,0,0.4)' });
        gsap.set(roleItems[0], { fontWeight: 700, color: '#0a0a0a' });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: whoWeAreRef.current,
            start: 'top top',
            end: '+=500%',
            scrub: 1.2,
            pin: true,
            anticipatePin: 1,
          }
        });

        stackImages.forEach((img, i) => {
          if (i === 0) {
            gsap.set(img, { zIndex: 1, y: 0, filter: 'brightness(1)' });
            return;
          }
          
          gsap.set(img, { zIndex: i + 1, y: '100vh' });
          
          const stepTime = i;
          
          tl.to(roleItems[i - 1], { fontWeight: 400, color: 'rgba(0,0,0,0.4)', duration: 0.3 }, stepTime);
          tl.to(roleItems[i], { fontWeight: 700, color: '#0a0a0a', duration: 0.3 }, stepTime);
          tl.to(img, { y: 0, ease: 'power2.out' }, stepTime);
          
          for (let j = 0; j < i; j++) {
            tl.to(stackImages[j], {
              scale: 1 - ((i - j) * 0.05),
              y: -((i - j) * 35),
              ease: 'power2.out'
            }, stepTime); 
          }
        });
      }
    });

    return () => mm.revert()
  }, [])

  return (
    <>
      <style>{`
        html { scroll-behavior: auto !important; }
        *,*::before,*::after { box-sizing: border-box; }

        .panel-hero        { position: relative; z-index: 1; }
        .panel-who-we-are  { position: relative; z-index: 2; will-change: transform, clip-path; }
        .panel-story       { position: relative; z-index: 3; will-change: transform, clip-path; }
        .panel-vision      { position: relative; z-index: 4; will-change: transform, clip-path; }
        .panel-values      { position: relative; z-index: 5; will-change: transform, clip-path; }
        .panel-executives  { position: relative; z-index: 6; will-change: transform, clip-path; }
        .panel-team        { position: relative; z-index: 7; will-change: transform, clip-path; }
        .panel-cta         { position: relative; z-index: 8; will-change: transform, clip-path; }
        .panel-footer      { position: relative; z-index: 9; will-change: transform, clip-path; }


        .mobile-only { display: none; }
        .desktop-only { display: flex; }

        .team-grid-executives {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          max-width: 920px;
          margin: 0 auto;
        }

        .team-grid-staff {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.25rem;
        }

        @media (max-width: 900px) {
          .team-grid-staff {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .who-we-are-layout {
          flex-direction: row;
          align-items: center; 
          justify-content: center;
          width: 100%;
          max-width: 1600px;
          margin: 0 auto;
          position: relative;
          min-height: 500px;
        }

        .who-we-are-header {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
          width: 30%;
          gap: 2rem;
          position: absolute;
          left: 0;
          z-index: 10;
          transform: translateY(-40px);
        }

        .who-we-are-header h2 {
          font-weight: 400;
          font-size: clamp(2.5rem, 4vw, 4rem);
          color: #0a0a0a;
          line-height: 1;
          margin: 0;
          font-family: serif;
        }

        .roles-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          text-align: left;
        }

        .roles-list li {
          font-size: 0.75rem;
          letter-spacing: 0.02em;
          transition: all 0.3s ease-out;
        }

        .who-we-are-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
          padding-top:90px;
        }

        .who-we-are-right {
          width: 100%;
          max-width: 1000px; 
          position: relative;
          aspect-ratio: 16 / 9;
        }
        .who-we-are-layout-mobile {
          flex-direction: column;
          align-items: center;
          width: 100%;
          gap: 3rem;
        }
        .mobile-title {
          font-weight: 400;
          font-size: clamp(2.5rem, 8vw, 3.5rem);
          color: #0a0a0a;
          line-height: 1.1;
          margin: 0;
          font-family: serif;
          text-align: center;
        }
        .mobile-list {
          display: flex;
          flex-direction: column;
          width: 100%;
          gap: 3.5rem;
        }
        .mobile-item {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .mobile-label {
          font-size: 1.1rem;
          font-weight: 600;
          color: #0a0a0a;
          margin: 0;
          text-align: left;
          padding-left: 0.5rem;
        }
        .mobile-image-wrapper {
          width: 100%;
          overflow: hidden;
          box-shadow: 0 10px 30px -5px rgba(0,0,0,0.1);
        }
        .mobile-image-wrapper img {
          width: 100%;
          height: auto;
          aspect-ratio: 16/9;
          object-fit: cover;
          display: block;
        }

        @media (min-width: 768px) and (max-width: 1024px) {
          .who-we-are-layout {
            justify-content: space-between;
            gap: 2rem;
          }
          
          .who-we-are-header {
            width: 35%;
            position: relative;
            transform: translateY(0);
          }

          .who-we-are-content {
            width: 60%;
            padding-top: 0;
          }

          .who-we-are-header h2 {
            font-size: clamp(2rem, 5vw, 3rem);
          }
        }

        @media (max-width: 767px) {
          .desktop-only { display: none !important; }
          .mobile-only { display: flex; }
          
          .panel-who-we-are {
            align-items: flex-start !important;
            padding-top: 4.5rem !important;
            padding-bottom: 4.5rem !important;
            height: auto !important; 
            min-height: auto !important;
          }

          .team-grid-executives {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .team-grid-staff {
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
          }
        }

        @media (max-width: 480px) {
          .team-grid-staff {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <Navbar />

      <main style={{ overflow: 'hidden' }}>

        <section
          ref={heroRef}
          className="panel-hero"
          style={{
            width: '100%', height: '100vh', minHeight: 560,
            background: '#ffffff', overflow: 'hidden',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <div style={{
            position: 'absolute', inset: 0, zIndex: 0,
            background: '#ffffff',
            backgroundImage: `
              radial-gradient(circle at 20% 55%, rgba(93,224,230,0.06) 0%, transparent 45%),
              radial-gradient(circle at 80% 30%, rgba(0,74,173,0.09) 0%, transparent 45%)
            `,
          }} />

          <div ref={overlayRef} style={{
            position: 'absolute', inset: 0, zIndex: 10,
            background: 'linear-gradient(135deg, #5de0e6, #004aad)',
            transformOrigin: 'top', pointerEvents: 'none',
          }} />

          <div ref={heroInnerRef} style={{
            position: 'relative', zIndex: 2,
            width: '100%', height: '100%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transformOrigin: 'center center',
          }}>
            <div ref={heroTextRef} style={{
              padding: 'clamp(2rem, 5vw, 4rem)',
              width: '100%', maxWidth: 860, textAlign: 'center',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem',
            }}>
              <div className="hero-line" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                <Link href="/" style={{ fontSize: '0.72rem', fontWeight: 500, color: 'rgba(0,0,0,0.4)', textDecoration: 'none', letterSpacing: '0.1em', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#5de0e6'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(0,0,0,0.4)'}>Creaut Bali</Link>
                <span style={{ color: 'rgba(0,0,0,0.2)' }}>·</span>
                <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#5de0e6', letterSpacing: '0.1em' }}>About Us</span>
              </div>

              <div className="hero-line" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: 28, height: 2, borderRadius: 2, background: 'linear-gradient(90deg, #5de0e6, #004aad)' }} />
                <span style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)' }}>
                  Est. 2015 · Bali, Indonesia
                </span>
                <div style={{ width: 28, height: 2, borderRadius: 2, background: 'linear-gradient(90deg, #004aad, #5de0e6)' }} />
              </div>

              <h1 className="hero-line" style={{ fontWeight: 800, fontSize: 'clamp(3.2rem, 9vw, 8rem)', color: '#000000', letterSpacing: '-0.04em', lineHeight: 0.92, margin: 0 }}>
                We Are<br />
                <span style={{ background: 'linear-gradient(90deg, #5de0e6, #004aad)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  Creaut Bali
                </span>
              </h1>

              <p className="hero-line" style={{ fontSize: 'clamp(0.95rem, 1.5vw, 1.15rem)', color: 'rgba(0,0,0,0.5)', lineHeight: 1.7, maxWidth: 560, margin: 0 }}>
                A full-service video production house telling stories for brands across the globe, one frame at a time.
              </p>

              <div className="hero-line" style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                <a href="#executives" onClick={scrollToTeam} style={{ padding: '0.9rem 2.25rem', background: 'linear-gradient(90deg, #5de0e6, #004aad)', color: '#fff', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 600, borderRadius: '8px', transition: 'opacity 0.2s', boxShadow: '0 4px 24px rgba(93,224,230,0.25)' }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '0.82'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}>Meet The Team ↓</a>
                <a href="https://wa.me/62818160664" target="_blank" rel="noreferrer" style={{ padding: '0.9rem 2.25rem', background: 'transparent', border: '1.5px solid rgba(0,0,0,0.2)', color: 'rgba(0,0,0,0.75)', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 600, borderRadius: '8px', transition: 'border-color 0.2s, color 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#5de0e6'; e.currentTarget.style.color = '#5de0e6' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.2)'; e.currentTarget.style.color = 'rgba(0,0,0,0.75)' }}>Get In Touch ↗</a>
              </div>
            </div>
          </div>

          <div style={{ position: 'absolute', bottom: '2.5rem', left: '50%', transform: 'translateX(-50%)', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.25)' }}>Scroll</span>
            <div style={{ width: 1, height: 40, background: 'linear-gradient(180deg, rgba(93,224,230,0.6), transparent)', borderRadius: 1 }} />
          </div>
        </section>


        <section
          ref={whoWeAreRef}
          className="panel-who-we-are"
          style={{
            background: '#ffffff',
            minHeight: '100vh',
            display: 'flex', 
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'clamp(3rem, 6vw, 6rem) clamp(1.5rem, 5vw, 4rem)',
            boxShadow: '0 -32px 80px rgba(0,0,0,0.10), 0 -4px 20px rgba(0,0,0,0.05)',
            overflow: 'hidden'
          }}
        >

          <div className="who-we-are-layout desktop-only">
            <div className="who-we-are-header">
              <h2>Who We<br />Are?</h2>
              
              <ul className="roles-list">
                {whoWeAreRoles.map((role, i) => (
                  <li key={i} ref={el => rolesListRefs.current[i] = el}>
                    {role}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="who-we-are-content">
              <div className="who-we-are-right">
                {whoWeAreImages.map((src, i) => (
                  <div 
                    key={i}
                    ref={el => stackedImagesRef.current[i] = el}
                    style={{
                      position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                      overflow: 'hidden',
                      boxShadow: '0 -15px 40px -5px rgba(0,0,0,0.15)', willChange: 'transform, filter',
                    }}
                  >
                    <img src={src} alt={`Team ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 2. LAYOUT MOBILE */}
          <div className="who-we-are-layout-mobile mobile-only">
            <h2 className="mobile-title">Who We<br />Are?</h2>
            
            <div className="mobile-list">
              {whoWeAreRoles.map((role, i) => (
                <div key={i} className="mobile-item">
                  <h3 className="mobile-label">{role}</h3>
                  <div className="mobile-image-wrapper">
                    <img src={whoWeAreImages[i]} alt={role} loading="lazy" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- SECTION OUR STORY - AT CREAUT --- */}
        <section
          ref={storyRef}
          className="panel-story"
          style={{
            background: '#fff',
            padding: 'clamp(5rem, 9vw, 8rem) clamp(1.75rem, 5vw, 5rem)',
            borderBottom: '1px solid rgba(0,0,0,0.07)',
            boxShadow: '0 -28px 70px rgba(0,0,0,0.10), 0 -3px 16px rgba(0,0,0,0.08)',
          }}
        >
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ marginBottom: '2rem' }}>
              <h2 style={{ 
                fontWeight: 800, 
                fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', 
                color: '#0a0a0a', 
                letterSpacing: '-0.04em', 
                lineHeight: 1.05, 
                margin: 0,
                textAlign: 'center',
                marginBottom: '0.5rem'
              }}>
                AT CREAUT
              </h2>
            </div>
            <div>
              <p className="story-text" style={{ 
                fontSize: 'clamp(1.1rem, 2.2vw, 1.85rem)', 
                fontWeight: 400, 
                color: '#0a0a0a', 
                lineHeight: 1.75, 
                margin: 0,
                textAlign: 'center',
                maxWidth: '100%'
              }}>
                We are a creative studio where ideas are shaped with intention. By bringing together strategy, design, and innovation, we create distinctive brand identities and experiences that resonate with people, build meaningful connections, and stand the test of time. Every detail is thoughtfully crafted to give brands a clear voice, a strong presence, and a lasting impression in the hearts of their audiences.
              </p>
            </div>
          </div>
        </section>

        <VisionMission ref={visionRef} />

        <section
          ref={valuesRef}
          className="panel-values"
          style={{
            background: '#fff',
            padding: 'clamp(4rem, 7vw, 6rem) clamp(1.75rem, 5vw, 5rem)',
            boxShadow: '0 -24px 60px rgba(0,0,0,0.08), 0 -3px 12px rgba(0,0,0,0.06)',
          }}
        >
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ marginBottom: '3rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <div style={{ width: 28, height: 2, borderRadius: 2, background: 'linear-gradient(90deg, #5de0e6, #004aad)' }} />
                <span style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#004aad' }}>Our Values</span>
              </div>
              <h2 style={{ fontWeight: 700, fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', color: '#0a0a0a', letterSpacing: '-0.04em', margin: 0 }}>
                What Drives Us
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1px', borderRadius: '12px', overflow: 'hidden', background: 'rgba(0,0,0,0.06)' }}>
              {values.map((v, i) => <ValueCard key={v.title} value={v} index={i} />)}
            </div>
          </div>
        </section>

        {/* --- SECTION EXECUTIVE (CEO, KOMISARIS UTAMA & KEDUA) --- */}
        <section
          id="executives"
          ref={executivesRef}
          className="panel-executives"
          style={{
            background: '#fff',
            padding: 'clamp(4rem, 7vw, 6rem) clamp(1.75rem, 5vw, 5rem)',
            boxShadow: '0 -24px 60px rgba(0,0,0,0.08), 0 -3px 12px rgba(0,0,0,0.06)',
          }}
        >
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ marginBottom: '3rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <div style={{ width: 28, height: 2, borderRadius: 2, background: 'linear-gradient(90deg, #5de0e6, #004aad)' }} />
                <span style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#004aad' }}>Leadership</span>
              </div>
              <h2 style={{ fontWeight: 700, fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', color: '#0a0a0a', letterSpacing: '-0.04em', margin: 0 }}>
                Executive Team
              </h2>
            </div>

            <div className="team-grid-executives">
              {executives.map((m) => (
                <TeamCard key={m.name} member={m} isExecutive={true} />
              ))}
            </div>
          </div>
        </section>

        {/* --- SECTION STAFF --- */}
        <section
          id="team"
          ref={teamRef}
          className="panel-team"
          style={{
            background: '#fff',
            padding: 'clamp(4rem, 7vw, 6rem) clamp(1.75rem, 5vw, 5rem)',
            boxShadow: '0 -24px 60px rgba(0,0,0,0.08), 0 -3px 12px rgba(0,0,0,0.06)',
          }}
        >
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ marginBottom: '3rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <div style={{ width: 28, height: 2, borderRadius: 2, background: 'linear-gradient(90deg, #5de0e6, #004aad)' }} />
                <span style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#004aad' }}>Our Staff</span>
              </div>
              <h2 style={{ fontWeight: 700, fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', color: '#0a0a0a', letterSpacing: '-0.04em', margin: 0 }}>
                Creative Team Members
              </h2>
            </div>

            <div className="team-grid-staff">
              {staffMembers.map((m) => (
                <TeamCard key={m.name} member={m} isExecutive={false} />
              ))}
            </div>
          </div>
        </section>

        {/* --- SECTION CTA --- */}
        <section
          ref={ctaRef}
          className="panel-cta"
          style={{
            background: '#ffffff',
            padding: 'clamp(5rem, 10vw, 8rem) clamp(1.75rem, 5vw, 5rem)',
            textAlign: 'center',
            boxShadow: '0 -24px 60px rgba(0,0,0,0.08), 0 -3px 12px rgba(0,0,0,0.06)',
          }}
        >
          <div className="cta-reveal" style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <div style={{ width: 40, height: 2, borderRadius: 2, background: 'linear-gradient(90deg, #5de0e6, #004aad)' }} />
          </div>
          <h2 className="cta-reveal" style={{ fontWeight: 800, fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: '#0a0a0a', letterSpacing: '-0.04em', lineHeight: 1.05, margin: '0 0 1.5rem 0' }}>
            Let's Make<br />Something Real.
          </h2>
          <p className="cta-reveal" style={{ fontSize: '1rem', color: 'rgba(0,0,0,0.5)', maxWidth: 500, margin: '0 auto 2.5rem auto', lineHeight: 1.7 }}>
            Have a story to tell? We have the tools, the team, and the coffee ready.
          </p>
          <div className="cta-reveal">
            <a href="https://wa.me/62818160664" target="_blank" rel="noreferrer" style={{ display: 'inline-block', padding: '1.1rem 3rem', background: 'linear-gradient(90deg, #5de0e6, #004aad)', color: '#fff', textDecoration: 'none', fontSize: '1rem', fontWeight: 600, borderRadius: '8px', transition: 'transform 0.2s, box-shadow 0.2s', boxShadow: '0 10px 30px rgba(93,224,230,0.3)' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 15px 40px rgba(93,224,230,0.4)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(93,224,230,0.3)' }}>
              Start A Project
            </a>
          </div>
        </section>

      </main>

      <Footer />
    </>
  )
}