'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const navLinks = [
    // { label: 'About', href: '/#about' },
    { label: 'Services', href: '/#services' },
    { label: 'Our Work', href: '/our-work' },
    { label: 'Headquarter', href: '/headquarter' },
  ]

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 1000,
        padding: '1rem 2.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        transition: 'all 0.3s ease',
        background: 'rgba(255,255,255,0.15)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        boxShadow: '0 4px 30px rgba(0,0,0,0.05)',
      }}>

        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
          <div style={{
            width: 32,
            height: 32,
            borderRadius: '7px',
            background: 'linear-gradient(135deg, #5de0e6, #004aad)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            <span style={{ fontWeight: 800, fontSize: '0.78rem', color: '#fff' }}>CB</span>
          </div>

          <span style={{
            fontWeight: 700,
            fontSize: '1rem',
            letterSpacing: '-0.03em',
            color: 'var(--text)',
          }}>
            Creaut Bali
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex" style={{
          gap: '2.25rem',
          listStyle: 'none',
          alignItems: 'center',
          margin: 0,
          padding: 0
        }}>
          {navLinks.map(link => (
            <li key={link.label}>
              <a href={link.href} style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.85rem',
                fontWeight: 500,
                color: 'var(--text-muted)',
                textDecoration: 'none',
                transition: 'color 0.3s',
              }}
                onMouseEnter={e => e.target.style.color = 'var(--text)'}
                onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="https://wa.me/6287780594231"
          target="_blank"
          rel="noreferrer"
          className="hidden md:inline-flex"
          style={{
            padding: '0.5rem 1.35rem',
            background: 'linear-gradient(90deg, #5de0e6, #004aad)',
            color: '#fff',
            textDecoration: 'none',
            fontSize: '0.82rem',
            fontWeight: 600,
            borderRadius: '6px',
          }}
        >
          Let's Talk
        </a>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
            padding: '4px'
          }}
        >
          {[0, 1, 2].map(i => (
            <span key={i} style={{
              display: 'block',
              width: 22,
              height: 2,
              background: 'var(--text)',
              borderRadius: '2px',
              transition: 'all 0.3s',
              transform:
                menuOpen && i === 0 ? 'rotate(45deg) translate(5px, 5px)' :
                menuOpen && i === 2 ? 'rotate(-45deg) translate(5px, -5px)' :
                'none',
              opacity: menuOpen && i === 1 ? 0 : 1,
            }} />
          ))}
        </button>
      </nav>

      {/* Mobile menu */}
      <div style={{
        position: 'fixed',
        inset: 0,
        background: '#fff',
        zIndex: 999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2rem',
        transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.45s cubic-bezier(0.77,0,0.175,1)',
      }}>
        {navLinks.map(link => (
          <a key={link.label} href={link.href}
            onClick={() => setMenuOpen(false)}
            style={{
              fontSize: '2rem',
              fontWeight: 700,
              color: 'var(--text)',
              textDecoration: 'none',
            }}>
            {link.label}
          </a>
        ))}

        <a href="https://wa.me/6287780594231" target="_blank" rel="noreferrer" style={{
          marginTop: '0.5rem',
          padding: '0.8rem 2.5rem',
          background: 'linear-gradient(90deg, #5de0e6, #004aad)',
          color: '#fff',
          textDecoration: 'none',
          fontSize: '0.9rem',
          fontWeight: 600,
          borderRadius: '8px',
        }}>
          Let's Talk
        </a>
      </div>
    </>
  )
}