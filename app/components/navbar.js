'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    let prevScrollPos = window.scrollY

    const handleScroll = () => {
      const currentScrollPos = window.scrollY
      const isScrollingUp = prevScrollPos > currentScrollPos

      if (currentScrollPos < 50) {
        setIsVisible(true)
      } else {
        setIsVisible(isScrollingUp)
      }

      prevScrollPos = currentScrollPos
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const navLinks = [
    { label: 'About', href: '/about' },
    { label: 'Our Work', href: '/our-work' },
    { label: 'Headquarter', href: '/headquarter' },
  ]

  return (
    <>
      {/* RESPONSIVE NAVBAR CSS */}
      <style jsx>{`
        .desktop-nav {
          display: flex;
          align-items: center;
          gap: 2.25rem;
          margin-left: auto;
          margin-right: 2rem;
        }

        .desktop-cta {
          display: inline-flex;
        }

        .mobile-menu-button {
          display: none;
        }

        .mobile-menu {
          display: none;
        }

        .navbar-logo {
          height: 40px;
          width: auto;
          object-fit: contain;
          display: block;
        }

        @media (max-width: 767px) {
          .desktop-nav {
            display: none;
          }

          .desktop-cta {
            display: none;
          }

          .mobile-menu-button {
            display: flex;
          }

          .mobile-menu {
            display: flex;
          }

          .navbar-logo {
            height: 34px;
          }
        }
      `}</style>

      {/* NAVBAR */}
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,

          padding: '1rem 2.5rem',

          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',

          transition: 'transform 0.3s ease',

          transform: isVisible
            ? 'translateY(0)'
            : 'translateY(-100%)',

          background: 'rgba(255,255,255,0.15)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',

          boxShadow: '0 4px 30px rgba(0,0,0,0.05)',
        }}
      >
        {/* LOGO */}
        <Link
          href="/"
          style={{
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            flexShrink: 0,
          }}
        >
          <img
            src="/image/logo/logoteks.webp"
            alt="Creaut Bali"
            className="navbar-logo"
          />
        </Link>

        {/* DESKTOP NAVIGATION */}
        <div className="desktop-nav">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.85rem',
                fontWeight: 500,
                color: 'var(--text-muted)',
                textDecoration: 'none',
                transition: 'color 0.3s',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--text)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--text-muted)'
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* DESKTOP CTA */}
        <a
          href="https://wa.me/6287780594231"
          target="_blank"
          rel="noreferrer"
          className="desktop-cta"
          style={{
            padding: '0.5rem 1.35rem',
            background: 'linear-gradient(90deg, #5de0e6, #004aad)',
            color: '#fff',
            textDecoration: 'none',
            fontSize: '0.82rem',
            fontWeight: 600,
            borderRadius: '6px',
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}
        >
          Let's Talk
        </a>

        {/* MOBILE HAMBURGER */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="mobile-menu-button"
          aria-label="Open menu"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            flexDirection: 'column',
            gap: '5px',
            padding: '4px',
          }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: 'block',
                width: 22,
                height: 2,
                background: 'var(--text)',
                borderRadius: '2px',
                transition: 'all 0.3s',

                transform:
                  menuOpen && i === 0
                    ? 'rotate(45deg) translate(5px, 5px)'
                    : menuOpen && i === 2
                    ? 'rotate(-45deg) translate(5px, -5px)'
                    : 'none',

                opacity: menuOpen && i === 1 ? 0 : 1,
              }}
            />
          ))}
        </button>
      </nav>

      {/* MOBILE MENU */}
      <div
        className="mobile-menu"
        style={{
          position: 'fixed',
          inset: 0,
          background: '#fff',
          zIndex: 999,

          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '2rem',

          transform: menuOpen
            ? 'translateX(0)'
            : 'translateX(100%)',

          transition:
            'transform 0.45s cubic-bezier(0.77,0,0.175,1)',
        }}
      >
        {navLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            onClick={() => setMenuOpen(false)}
            style={{
              fontSize: '2rem',
              fontWeight: 700,
              color: 'var(--text)',
              textDecoration: 'none',
            }}
          >
            {link.label}
          </Link>
        ))}

        <a
          href="https://wa.me/6287780594231"
          target="_blank"
          rel="noreferrer"
          style={{
            marginTop: '0.5rem',
            padding: '0.8rem 2.5rem',
            background: 'linear-gradient(90deg, #5de0e6, #004aad)',
            color: '#fff',
            textDecoration: 'none',
            fontSize: '0.9rem',
            fontWeight: 600,
            borderRadius: '8px',
          }}
        >
          Let's Talk
        </a>
      </div>
    </>
  )
}