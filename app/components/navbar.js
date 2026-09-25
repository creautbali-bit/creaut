'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showNavbar, setShowNavbar] = useState(true)

  // Logika Hide/Show Navbar saat Scroll
  useEffect(() => {
    let lastScroll = window.scrollY

    const handleScroll = () => {
      const currentScroll = window.scrollY
      const scrollingUp = lastScroll > currentScroll

      // Tampilkan jika sedang di paling atas, ATAU jika sedang scroll ke atas
      if (currentScroll < 50 || scrollingUp) {
        setShowNavbar(true)
      } else {
        setShowNavbar(false)
      }
      lastScroll = currentScroll
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'About', href: '/about' },
    { label: 'Our Work', href: '/our-work' },
    { label: 'Headquarter', href: '/headquarter' },
  ]

  return (
    <>
      {/* CSS Murni: Lebih stabil dan tidak menyebabkan FOUC (jeda loading style) di Next.js */}
      <style dangerouslySetInnerHTML={{ __html: `
        .nav-container {
          position: fixed; top: 0; left: 0; right: 0;
          z-index: 1000;
          padding: 1rem 2.5rem;
          display: flex; align-items: center; justify-content: space-between;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.05);
          transition: transform 0.3s ease-in-out;
        }
        .nav-hidden { transform: translateY(-100%); }
        .nav-visible { transform: translateY(0); }

        .desktop-nav { display: flex; align-items: center; gap: 2.25rem; margin-left: auto; margin-right: 2rem; }
        .nav-link { font-family: 'Inter', sans-serif; font-size: 0.85rem; font-weight: 500; color: #555; text-decoration: none; transition: color 0.3s; }
        .nav-link:hover { color: #000; }
        
        .btn-cta { 
          padding: 0.5rem 1.35rem; background: linear-gradient(90deg, #5de0e6, #004aad); 
          color: #fff; text-decoration: none; font-size: 0.82rem; font-weight: 600; 
          border-radius: 6px; white-space: nowrap; 
        }

        .hamburger-btn { display: none; flex-direction: column; gap: 5px; background: none; border: none; cursor: pointer; z-index: 1001; padding: 4px; }
        .hamburger-line { width: 22px; height: 2px; background: #000; border-radius: 2px; transition: all 0.3s ease; }

        @media (max-width: 768px) {
          .nav-container { padding: 1rem 1.5rem; }
          .desktop-nav, .desktop-cta { display: none; }
          .hamburger-btn { display: flex; }
        }

        .mobile-menu {
          position: fixed; inset: 0; background: #fff; z-index: 999;
          display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 2rem;
          transition: transform 0.45s cubic-bezier(0.77, 0, 0.175, 1);
        }
        .mobile-hidden { transform: translateX(100%); }
        .mobile-visible { transform: translateX(0); }
        .mobile-link { font-size: 2rem; font-weight: 700; color: #000; text-decoration: none; }
      `}} />

      {/* NAVBAR */}
      <nav className={`nav-container ${showNavbar ? 'nav-visible' : 'nav-hidden'}`}>
        
        {/* LOGO (Style disematkan langsung di elemen agar tidak mungkin membesar di detik awal) */}
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          <img
            src="/image/logo/logoteks.webp"
            alt="Creaut Bali"
            style={{ 
              height: '40px', 
              width: 'auto', 
              objectFit: 'contain',
              display: 'block' 
            }}
          />
        </Link>

        {/* MENU DESKTOP */}
        <div className="desktop-nav">
          {navLinks.map((link) => (
            <Link key={link.label} href={link.href} className="nav-link">
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA DESKTOP */}
        <div className="desktop-cta">
          <a href="https://wa.me/6287780594231" target="_blank" rel="noreferrer" className="btn-cta">
            Let's Talk
          </a>
        </div>

        {/* TOMBOL HAMBURGER MOBILE */}
        <button className="hamburger-btn" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
          <span className="hamburger-line" style={{ transform: isMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
          <span className="hamburger-line" style={{ opacity: isMenuOpen ? 0 : 1 }} />
          <span className="hamburger-line" style={{ transform: isMenuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
        </button>
      </nav>

      {/* MENU FULLSCREEN MOBILE */}
      <div className={`mobile-menu ${isMenuOpen ? 'mobile-visible' : 'mobile-hidden'}`}>
        {navLinks.map((link) => (
          <Link 
            key={link.label} 
            href={link.href} 
            onClick={() => setIsMenuOpen(false)} 
            className="mobile-link"
          >
            {link.label}
          </Link>
        ))}

        <a 
          href="https://wa.me/6287780594231" 
          target="_blank" 
          rel="noreferrer" 
          className="btn-cta" 
          style={{ marginTop: '0.5rem', padding: '0.8rem 2.5rem', fontSize: '0.9rem', borderRadius: '8px' }}
        >
          Let's Talk
        </a>
      </div>
    </>
  )
}