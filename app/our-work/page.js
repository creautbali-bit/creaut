'use client'

import { useEffect, useRef, useState, useCallback, useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import Navbar from '../components/navbar'
import CTA from '../components/cta'
import Footer from '../components/footer'

gsap.registerPlugin(ScrollTrigger)

function useLenis() {
  const lenisRef = useRef(null)
  
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

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
        lenis.scrollTo(0, { immediate: true })
        gsap.ticker.add((time) => lenis.raf(time * 1000))
        gsap.ticker.lagSmoothing(0)
        lenis.on('scroll', ScrollTrigger.update)
      } catch {}
    }

    window.scrollTo(0, 0)
    init()

    return () => {
      if (lenis) {
        lenis.scrollTo(0, { immediate: true })
      }
      gsap.ticker.remove((time) => lenis?.raf(time * 1000))
      lenis?.destroy()
      lenisRef.current = null
    }
  }, [])
  
  return lenisRef
}

const CATEGORIES = [
  {
    id: 'social',
    label: 'Social Media Management',
    shortLabel: 'Social Media',
    href: '/services/social-media-management',
    accentColor: '#E1306C',
    gradientTo: '#833ab4',
    description: 'Driving engagement & brand awareness across all major platforms.',
    stats: '120+ campaigns',
    cards: [
      {
        id: 1, caption: 'Brand Awareness Campaign',
        src: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=800&q=80',
        images: [
          'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=800&q=80',
          'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&q=80',
          'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
          'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80',
          'https://images.unsplash.com/photo-1512314889357-e157c22f938d?w=800&q=80',
          'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80',
          'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80',
        ],
      },
      {
        id: 2, caption: 'Content Calendar Strategy',
        src: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80',
        images: [
          'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80',
          'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80',
          'https://images.unsplash.com/photo-1542626991-cbc4e32524cc?w=800&q=80',
          'https://images.unsplash.com/photo-1553484771-371a605b060b?w=800&q=80',
          'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80',
          'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80',
          'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=800&q=80',
        ],
      },
      {
        id: 3, caption: 'Analytics & Growth Report',
        src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
        images: [
          'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
          'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
          'https://images.unsplash.com/photo-1543286386-713bdd548da4?w=800&q=80',
          'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=80',
          'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80',
          'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80',
          'https://images.unsplash.com/photo-1487611272516-5b43c1a69e7f?w=800&q=80',
        ],
      },
      {
        id: 4, caption: 'Influencer Collaboration',
        src: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80',
        images: [
          'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80',
          'https://images.unsplash.com/photo-1602233158242-3ba0ac4d2167?w=800&q=80',
          'https://images.unsplash.com/photo-1543269664-56d93b45f48a?w=800&q=80',
          'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80',
          'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80',
          'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800&q=80',
          'https://images.unsplash.com/photo-1511985117068-0da62e6bf038?w=800&q=80',
        ],
      },
      {
        id: 5, caption: 'Instagram Story Series',
        src: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80',
        images: [
          'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80',
          'https://images.unsplash.com/photo-1512314889357-e157c22f938d?w=800&q=80',
          'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=800&q=80',
          'https://images.unsplash.com/photo-1611944212129-29977ae1398c?w=800&q=80',
          'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80',
          'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80',
          'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80',
        ],
      },
      {
        id: 6, caption: 'Reels Production',
        src: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80',
        images: [
          'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80',
          'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80',
          'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&q=80',
          'https://images.unsplash.com/photo-1536240478700-b869ad10e128?w=800&q=80',
          'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&q=80',
          'https://images.unsplash.com/photo-1601506521793-dc748fc80b67?w=800&q=80',
          'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80',
        ],
      },
      {
        id: 7, caption: 'Community Management',
        src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
        images: [
          'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
          'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80',
          'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80',
          'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80',
          'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80',
          'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80',
          'https://images.unsplash.com/photo-1543269664-56d93b45f48a?w=800&q=80',
        ],
      },
    ],
  },
  {
    id: 'photo',
    label: 'Visual Photography',
    shortLabel: 'Photography',
    href: '/services/visual-photography/portfolio',
    accentColor: '#5de0e6',
    gradientTo: '#004aad',
    description: 'Capturing the essence of your brand through stunning imagery.',
    stats: '200+ shoots',
    cards: [
      {
        id: 1, caption: 'Entertainments',
        src: 'image/raka1.webp',
        images: [
          'https://images.unsplash.com/photo-1540039155733-5bb30b4f332e?w=800&q=80',
          'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800&q=80',
          'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800&q=80',
          'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80',
          'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80',
          'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&q=80',
          'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=800&q=80',
        ],
      },
      {
        id: 2, caption: 'Personal Branding',
        src: 'image/pho7.webp',
        images: [
          'image/pho8.webp',
          'image/pho9.webp',
          'image/pho10.webp',
          'image/pho11.webp',
          'image/pho12.webp',
          'image/pho13.webp',
        ],
      },
      {
        id: 3, caption: 'Katalog',
        src: 'image/pho14.webp',
        images: [
          'image/pho14.webp',
          'image/pho15.webp',
          'image/pho16.webp',
        ],
      },
      {
        id: 4, caption: 'F&B',
        src: 'image/pho17.webp',
        images: [
          'image/pho17.webp',
          'image/pho18.webp',
          'image/pho19.webp',
          'image/pho23.webp',
          'image/pho24.webp',
        ],
      },
      {
        id: 5, caption: 'Beauty',
        src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
        images: [
          'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
          'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=80',
          'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800&q=80',
          'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&q=80',
          'https://images.unsplash.com/photo-1501746877-14782df58970?w=800&q=80',
          'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80',
          'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80',
        ],
      },
      {
        id: 6, caption: 'Environment',
        src: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80',
        images: [
          'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80',
          'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80',
          'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80',
          'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80',
          'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
          'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
          'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80',
        ],
      },
      {
        id: 7, caption: 'Adventure',
        src: 'https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=800&q=80',
        images: [
          'https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=800&q=80',
          'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80',
          'https://images.unsplash.com/photo-1528543606781-2f6e8759bc48?w=800&q=80',
          'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=800&q=80',
          'https://images.unsplash.com/photo-1522163182402-834f871fd851?w=800&q=80',
          'https://images.unsplash.com/photo-1502791451862-7bd8c1df43a7?w=800&q=80',
          'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80',
        ],
      },
    ],
  },
  {
    id: 'video',
    label: 'Video Production',
    shortLabel: 'Video',
    href: '/services/video-production/portfolio',
    accentColor: '#004aad',
    gradientTo: '#5de0e6',
    description: 'Cinematic storytelling that elevates your brand narrative.',
    stats: '80+ productions',
    cards: [
      {
        id: 1, caption: 'Entertainments',
        src: 'image/ba1.webp',
        images: [
          'image/ba2.webp',
          'image/ba3.webp',
          'image/ba1.webp',
          'image/ba2.webp',
          'image/ba3.webp',
          'image/ba1.webp',
          'image/ba2.webp',
        ],
      },
      {
        id: 2, caption: 'Food & Beverage',
        src: 'image/mcc1.webp',
        images: [
          'image/mcc2.webp',
          'image/mcc3.webp',
          'image/mcc1.webp',
          'image/mcc2.webp',
          'image/mcc3.webp',
        ],
      },
      {
        id: 3, caption: 'Fashion & Clothing',
        src: 'image/advish1.webp',
        images: [
          'image/advish2.webp',
          'image/advish3.webp',
          'image/advish4.webp',
          'image/advish5.webp',
        ],
      },
      {
        id: 4, caption: 'Property & Real Estate',
        src: 'image/amartya1.webp',
        images: [
          'image/amartya2.webp',
          'image/amartya3.webp',
          'image/amartya1.webp',
          'image/amartya2.webp',
          'image/amartya3.webp',
        ],
      },
      {
        id: 5, caption: 'Hospitality',
        src: 'image/uma1.webp',
        images: [
          'image/uma1.webp',
          'image/uma2.webp',
          'image/uma3.webp',
          'image/uma1.webp',
          'image/uma2.webp',
          'image/uma3.webp',
        ],
      },
      {
        id: 6, caption: 'Environment',
        src: 'image/amanaid1.webp',
        images: [
          'image/amanaid2.webp',
          'image/amanaid3.webp',
        ],
      },
      {
        id: 7, caption: 'Adventure',
        src: 'image/raka1.webp',
        images: [
          'image/raka2.webp',
        ],
      },
    ],
  },
  {
    id: 'branding',
    label: 'Branding',
    shortLabel: 'Branding',
    href: '/services/branding/portfolio',
    accentColor: '#f59e0b',
    gradientTo: '#ef4444',
    description: 'Building distinctive identities that resonate and endure.',
    stats: '50+ brands',
    cards: [
      {
        id: 1, caption: 'Entertainments',
        src: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=800&q=80',
        images: [
          'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=800&q=80',
          'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80',
          'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
          'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80',
          'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&q=80',
          'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80',
          'https://images.unsplash.com/photo-1542744094-24638eff58bb?w=800&q=80',
        ],
      },
      {
        id: 2, caption: 'Personal Branding',
        src: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80',
        images: [
          'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80',
          'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
          'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=800&q=80',
          'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80',
          'https://images.unsplash.com/photo-1493421419110-74f4e85ba126?w=800&q=80',
          'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80',
          'https://images.unsplash.com/photo-1542744094-24638eff58bb?w=800&q=80',
        ],
      },
      {
        id: 3, caption: 'Katalog',
        src: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
        images: [
          'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
          'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&q=80',
          'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=800&q=80',
          'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80',
          'https://images.unsplash.com/photo-1542744094-24638eff58bb?w=800&q=80',
          'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80',
          'https://images.unsplash.com/photo-1493421419110-74f4e85ba126?w=800&q=80',
        ],
      },
      {
        id: 4, caption: 'F&B',
        src: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80',
        images: [
          'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80',
          'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=800&q=80',
          'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80',
          'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
          'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&q=80',
          'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80',
          'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80',
        ],
      },
      {
        id: 5, caption: 'Beauty',
        src: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&q=80',
        images: [
          'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&q=80',
          'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80',
          'https://images.unsplash.com/photo-1493421419110-74f4e85ba126?w=800&q=80',
          'https://images.unsplash.com/photo-1542744094-24638eff58bb?w=800&q=80',
          'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80',
          'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80',
          'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=800&q=80',
        ],
      },
      {
        id: 6, caption: 'Environment',
        src: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80',
        images: [
          'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80',
          'https://images.unsplash.com/photo-1542744094-24638eff58bb?w=800&q=80',
          'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80',
          'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=800&q=80',
          'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
          'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80',
          'https://images.unsplash.com/photo-1493421419110-74f4e85ba126?w=800&q=80',
        ],
      },
      {
        id: 7, caption: 'Adventure',
        src: 'https://images.unsplash.com/photo-1542744094-24638eff58bb?w=800&q=80',
        images: [
          'https://images.unsplash.com/photo-1542744094-24638eff58bb?w=800&q=80',
          'https://images.unsplash.com/photo-1493421419110-74f4e85ba126?w=800&q=80',
          'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80',
          'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&q=80',
          'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80',
          'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80',
          'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=800&q=80',
        ],
      },
    ],
  },
]

function InstaCard({ card, accent }) {
  const [isHovered, setIsHovered] = useState(false)
  const [slideIndex, setSlideIndex] = useState(0)
  const intervalRef = useRef(null)
  const slideshowImages = card.images || [card.src]

  const startSlideshow = () => {
    setIsHovered(true)
    setSlideIndex(0)
    intervalRef.current = setInterval(() => {
      setSlideIndex(prev => (prev + 1) % slideshowImages.length)
    }, 500)
  }

  const stopSlideshow = () => {
    setIsHovered(false)
    setSlideIndex(0)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  const currentSrc = isHovered ? slideshowImages[slideIndex] : card.src

  return (
    <div
      onMouseEnter={startSlideshow}
      onMouseLeave={stopSlideshow}
      style={{
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        background: '#111',
        width: '100%',
        aspectRatio: '9 / 16',
      }}
    >
      <img
        key={currentSrc}
        src={currentSrc}
        alt={card.caption}
        draggable={false}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          transform: 'scale(1.03)',
          transition: 'transform 0.8s ease',
        }}
      />

      {isHovered && (
        <div style={{
          position: 'absolute',
          bottom: '3.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '4px',
          zIndex: 5,
        }}>
          {slideshowImages.map((_, i) => (
            <div key={i} style={{
              width: i === slideIndex ? 14 : 5,
              height: 5,
              borderRadius: 999,
              background: i === slideIndex ? '#fff' : 'rgba(255,255,255,0.4)',
              transition: 'all 0.3s ease',
            }} />
          ))}
        </div>
      )}

      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(
            to top,
            rgba(0,0,0,0.82) 0%,
            rgba(0,0,0,0.35) 35%,
            rgba(0,0,0,0.05) 60%,
            rgba(0,0,0,0.0) 100%
          )`,
        }}
      />

      <div
        style={{
          position: 'absolute',
          top: '0.75rem',
          left: '0.75rem',
          right: '0.75rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            background: 'rgba(255,255,255,0.12)',
            backdropFilter: 'blur(14px)',
            border: '1px solid rgba(255,255,255,0.08)',
            color: '#fff',
            padding: '0.3rem 0.6rem',
            borderRadius: '999px',
            fontSize: '0.6rem',
            fontWeight: 700,
            letterSpacing: '0.08em',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          {card.platform}
        </div>
        <div
          style={{
            width: 7,
            height: 7,
            borderRadius: '999px',
            background: accent,
            boxShadow: `0 0 10px ${accent}`,
          }}
        />
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '0.85rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
        </div>
        <div>
          <p style={{ color: '#fff', fontSize: '0.78rem', fontWeight: 600, lineHeight: 1.4, margin: 0, fontFamily: 'Inter, sans-serif', letterSpacing: '-0.01em' }}>
            {card.caption}
          </p>
        </div>
      </div>
    </div>
  )
}

function SeeMoreCard({ category, href }) {
  const BLUE_FROM = '#5de0e6'
  const BLUE_TO   = '#004aad'

  return (
    <Link
      href={href}
      className="see-more-card"
      style={{
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        width: '100%',
        aspectRatio: '9 / 16',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.8rem',
        padding: '1rem',
        background: `linear-gradient(135deg, ${BLUE_FROM}, ${BLUE_TO})`,
        transition: 'filter 0.3s ease',
        textDecoration: 'none',
      }}
      onMouseEnter={e => (e.currentTarget.style.filter = 'brightness(1.12)')}
      onMouseLeave={e => (e.currentTarget.style.filter = 'brightness(1)')}
    >
      <div style={{
        position: 'absolute',
        width: '70%',
        height: '70%',
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.08)',
        filter: 'blur(28px)',
        top: '-15%',
        right: '-15%',
        pointerEvents: 'none',
      }} />

      <div style={{
        background: 'rgba(255,255,255,0.2)',
        backdropFilter: 'blur(10px)',
        padding: 'max(1rem, 1.8vw)',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
        border: '1px solid rgba(255,255,255,0.25)',
        position: 'relative',
        zIndex: 1,
      }}>
        <svg
          width="24" height="24"
          viewBox="0 0 24 24"
          fill="none" stroke="#fff" strokeWidth="2.5"
          strokeLinecap="round" strokeLinejoin="round"
          style={{ width: 'min(24px, 4vw)', height: 'min(24px, 4vw)' }}
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </div>

      <span style={{
        color: '#fff',
        fontWeight: 700,
        fontSize: 'clamp(0.65rem, 1.2vw, 0.85rem)',
        fontFamily: 'Inter, sans-serif',
        letterSpacing: '0.05em',
        whiteSpace: 'nowrap',
        position: 'relative',
        zIndex: 1,
      }}>
        See More
      </span>
      <span style={{
        color: 'rgba(255,255,255,0.6)',
        fontSize: '0.6rem',
        fontFamily: 'Inter, sans-serif',
        textTransform: 'uppercase',
        letterSpacing: '0.18em',
        position: 'relative',
        zIndex: 1,
      }}>
        {category}
      </span>
    </Link>
  )
}

export default function OurWorkPage() {
  const lenisRef = useLenis()
  const [activeTab, setActiveTab] = useState(0)

  const workContainerRef = useRef(null)

  const heroRef      = useRef(null)
  const heroInnerRef = useRef(null)
  const heroTextRef  = useRef(null)
  const overlayRef   = useRef(null)
  const workRef      = useRef(null)
  const trackRef     = useRef(null)
  const footerRef    = useRef(null)

  useLayoutEffect(() => {
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
    const mm = gsap.matchMedia()
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
        y: -80, opacity: 0, scale: 0.97, ease: 'none',
        scrollTrigger: {
          trigger: workContainerRef.current,
          start: 'top 85%',
          end: 'top 10%',
          scrub: 1.2,
        },
      })
      
      gsap.fromTo(workRef.current,
        { y: 120, clipPath: 'inset(6% 0% 0% 0% round 18px 18px 0px 0px)' },
        {
          y: 0, clipPath: 'inset(0% 0% 0% 0% round 0px 0px 0px 0px)',
          ease: 'none',
          scrollTrigger: {
            trigger: workContainerRef.current,
            start: 'top 92%',
            end: 'top 5%',
            scrub: 1,
          },
        }
      )
      
      gsap.to(trackRef.current, {
        x: () => -(trackRef.current.scrollWidth - window.innerWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: workContainerRef.current,
          start: 'top top',
          end: () => `+=${window.innerHeight * 1.3 * (CATEGORIES.length - 1)}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.9,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          id: 'work-horizontal',
          onUpdate: (self) => {
            const idx = Math.round(self.progress * (CATEGORIES.length - 1))
            setActiveTab(idx)
          },
        },
      })
      
      gsap.fromTo(footerRef.current,
        { y: 60, clipPath: 'inset(8% 0% 0% 0% round 24px 24px 0px 0px)' },
        {
          y: 0, clipPath: 'inset(0% 0% 0% 0% round 0px 0px 0px 0px)', ease: 'none',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 92%',
            end: 'top 15%',
            scrub: 1,
          },
        }
      )
      
      ScrollTrigger.refresh()
      
      return () => ScrollTrigger.getAll().forEach(t => t.kill())
    })
    
    const timer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 100)

    return () => {
      mm.revert()
      clearTimeout(timer)
    }
  }, [])

  const handleTabClick = useCallback((idx) => {
    const st = ScrollTrigger.getById('work-horizontal')
    if (!st) return
    const progress = idx === 0 ? 0 : idx / (CATEGORIES.length - 1)
    const target   = st.start + progress * (st.end - st.start)
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, { duration: 1.4 })
    } else {
      window.scrollTo({ top: target, behavior: 'smooth' })
    }
  }, [lenisRef])

  return (
    <>
      <style>{`
        @keyframes fadeInSlide {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        html { scroll-behavior: auto !important; }
        *, *::before, *::after { box-sizing: border-box; }

        :root {
          --navbar-h:  65px;
          --tabbar-h:  52px;
        }
        @media (max-width: 768px) {
          :root {
            --navbar-h: 60px;
            --tabbar-h: 48px;
          }
        }
        
        nav, header { z-index: 9999 !important; }

        .panel-hero   { position: relative; z-index: 1; }
        .panel-work   { position: relative; will-change: transform, clip-path; }
        .panel-footer { position: relative; z-index: 3; will-change: transform, clip-path; }

        html.lenis { height: auto; }
        .lenis.lenis-smooth { scroll-behavior: auto; }
        .lenis.lenis-stopped { overflow: hidden; }
        .lenis.lenis-scrolling iframe { pointer-events: none; }

        .tab-strip::-webkit-scrollbar { display: none; }
        .tab-strip { scrollbar-width: none; }

        .cat-panel-inner {
          width: 100vw;
          height: 100%;
          display: flex;
          flex-direction: column;
          padding: calc(var(--navbar-h) + var(--tabbar-h) + 1rem) 1.75rem 1.4rem 1.75rem;
          gap: 0.85rem;
          overflow: hidden;
        }
        @media (max-width: 768px) {
          .cat-panel-inner {
            padding: calc(var(--navbar-h) + var(--tabbar-h) + 0.75rem) 0.9rem 0.9rem 0.9rem;
            gap: 0.6rem;
          }
        }

        .cat-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          flex-shrink: 0;
          gap: 1rem;
        }
        @media (max-width: 768px) {
          .cat-header { align-items: flex-start; }
          .cat-header .cat-desc { display: none; }
          .cat-header h2 { font-size: 0.95rem !important; }
        }

        .card-grid {
          display: grid;
          gap: 5px;
          grid-template-columns: repeat(4, 1fr);
          overflow: hidden;
          align-items: start;
        }

        @media (max-width: 768px) {
          .card-grid {
            grid-template-columns: repeat(2, 1fr);
            overflow: hidden !important;
          }
          .see-more-card {
            grid-column: span 2 !important;
            aspect-ratio: unset !important;
            height: 72px !important;
            border-radius: 10px;
          }
          .hide-on-mobile { display: none !important; }
        }

        .tab-btn {
          position: relative;
          padding: 0 1.4rem;
          height: 100%;
          border: none;
          background: transparent;
          cursor: pointer;
          font-family: Inter, sans-serif;
          white-space: nowrap;
          flex-shrink: 0;
          transition: color 0.28s ease;
        }
        @media (max-width: 768px) {
          .tab-btn { padding: 0 0.85rem; font-size: 0.72rem !important; }
        }
        @media (max-width: 480px) {
          .tab-btn { padding: 0 0.6rem; font-size: 0.68rem !important; }
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
                <Link href="/"
                  style={{ fontSize: '0.72rem', fontWeight: 500, color: 'rgba(0,0,0,0.4)', textDecoration: 'none', letterSpacing: '0.1em', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#5de0e6'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(0,0,0,0.4)'}>
                  Creaut Bali
                </Link>
                <span style={{ color: 'rgba(0,0,0,0.2)' }}>·</span>
                <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#5de0e6', letterSpacing: '0.1em' }}>Our Work</span>
              </div>

              <div className="hero-line" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                <div style={{ width: 28, height: 2, borderRadius: 2, background: 'linear-gradient(90deg, #5de0e6, #004aad)', flexShrink: 0 }} />
                <span style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)' }}>
                  Social · Photography · Video · Branding
                </span>
                <div style={{ width: 28, height: 2, borderRadius: 2, background: 'linear-gradient(90deg, #004aad, #5de0e6)', flexShrink: 0 }} />
              </div>

              <h1 className="hero-line" style={{
                fontWeight: 800,
                fontSize: 'clamp(3.5rem, 10vw, 9rem)',
                color: '#000000',
                letterSpacing: '-0.04em',
                lineHeight: 0.9,
                margin: 0,
              }}>
                Our<br />
                <span style={{ background: 'linear-gradient(90deg, #5de0e6, #004aad)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  Work
                </span>
              </h1>

              <p className="hero-line" style={{ fontSize: '1rem', color: 'rgba(0,0,0,0.45)', lineHeight: 1.8, maxWidth: 440, margin: 0 }}>
                A curated selection of our finest projects — from social campaigns to cinematic productions.
              </p>

              <div className="hero-line" style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                <a href="#our-work"
                  style={{ padding: '0.9rem 2.25rem', background: 'linear-gradient(90deg, #5de0e6, #004aad)', color: '#fff', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 600, borderRadius: '8px', transition: 'opacity 0.2s', boxShadow: '0 4px 24px rgba(93,224,230,0.25)' }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '0.82'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
                  Explore Portfolio ↓
                </a>
                <a href="https://wa.me/62818160664" target="_blank" rel="noreferrer"
                  style={{ padding: '0.9rem 2.25rem', background: 'transparent', border: '1.5px solid rgba(0,0,0,0.2)', color: 'rgba(0,0,0,0.75)', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 600, borderRadius: '8px', transition: 'border-color 0.2s, color 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#5de0e6'; e.currentTarget.style.color = '#5de0e6' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.2)'; e.currentTarget.style.color = 'rgba(0,0,0,0.75)' }}>
                  Work With Us ↗
                </a>
              </div>
            </div>
          </div>

          <div style={{ position: 'absolute', bottom: '2.5rem', left: '50%', transform: 'translateX(-50%)', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.25)' }}>Scroll</span>
            <div style={{ width: 1, height: 40, background: 'linear-gradient(180deg, rgba(93,224,230,0.6), transparent)', borderRadius: 1 }} />
          </div>
        </section>

        <div ref={workContainerRef} style={{ position: 'relative', width: '100%', zIndex: 2 }}>
          <div
            id="our-work"
            ref={workRef}
            className="panel-work"
            style={{
              width: '100%',
              height: '100vh',
              overflow: 'hidden',
              background: '#fff',
              boxShadow: '0 -32px 80px rgba(0,0,0,0.18), 0 -4px 20px rgba(0,0,0,0.12)',
            }}
          >
            <div
              className="tab-strip"
              style={{
                position: 'absolute',
                top: 'var(--navbar-h, 65px)',
                left: 0, right: 0,
                zIndex: 999,
                height: 'var(--tabbar-h, 52px)',
                background: 'rgb(255,255,255)',
                backdropFilter: 'blur(18px)',
                borderBottom: '1px solid rgba(0,0,0,0.07)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0 1rem',
                overflowX: 'auto',
              }}
            >
              {CATEGORIES.map((cat, i) => (
                <button
                  key={cat.id}
                  className="tab-btn"
                  onClick={() => handleTabClick(i)}
                  style={{
                    fontSize: '0.8rem',
                    fontWeight: activeTab === i ? 700 : 500,
                    color: activeTab === i ? '#0a0a0a' : 'rgba(0,0,0,0.38)',
                    letterSpacing: activeTab === i ? '0.01em' : '0',
                  }}
                >
                  {cat.label}
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: '1.4rem', right: '1.4rem',
                    height: 2,
                    borderRadius: '2px 2px 0 0',
                    background: `linear-gradient(90deg, ${cat.accentColor}, ${cat.gradientTo})`,
                    transform: activeTab === i ? 'scaleX(1)' : 'scaleX(0)',
                    transformOrigin: 'left',
                    transition: 'transform 0.38s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  }} />
                </button>
              ))}
            </div>

            <div
              ref={trackRef}
              style={{
                display: 'flex',
                width: `${CATEGORIES.length * 100}vw`,
                height: '100%',
                willChange: 'transform',
              }}
            >
              {CATEGORIES.map((cat, ci) => {
                const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false
                const maxItems = isMobile ? 2 : 3
                const visibleCards = cat.cards.slice(0, maxItems)

                return (
                  <div key={cat.id} className="cat-panel-inner">
                    <div className="cat-header">
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.2rem' }}>
                          <div style={{ width: 16, height: 2, borderRadius: 2, background: `linear-gradient(90deg, ${cat.accentColor}, ${cat.gradientTo})` }} />
                          <span style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: cat.accentColor, fontFamily: 'Inter, sans-serif' }}>
                            {cat.shortLabel}
                          </span>
                        </div>
                        <h2 style={{ fontWeight: 800, fontSize: 'clamp(1.1rem, 1.8vw, 1.45rem)', color: '#0a0a0a', letterSpacing: '-0.03em', margin: '0 0 0.2rem 0', fontFamily: 'Inter, sans-serif' }}>
                          {cat.label}
                        </h2>
                        <p className="cat-desc" style={{ fontSize: '0.76rem', color: 'rgba(0,0,0,0.38)', margin: 0, fontFamily: 'Inter, sans-serif' }}>
                          {cat.description}
                        </p>
                      </div>
                      <div style={{ textAlign: 'right', flexShrink: 0 }}>
                        <p style={{
                          fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 800, letterSpacing: '-0.05em',
                          margin: '0 0 0.1rem 0', lineHeight: 1,
                          background: `linear-gradient(135deg, ${cat.accentColor}, ${cat.gradientTo})`,
                          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                          fontFamily: 'Inter, sans-serif',
                        }}>
                          {String(ci + 1).padStart(2, '0')}{' '}
                          <span style={{ fontSize: '0.45em', opacity: 0.5 }}>/ {String(CATEGORIES.length).padStart(2, '0')}</span>
                        </p>
                        <p style={{ fontSize: '0.65rem', color: 'rgba(0,0,0,0.3)', margin: 0, fontFamily: 'Inter, sans-serif', letterSpacing: '0.06em' }}>
                          {cat.stats}
                        </p>
                      </div>
                    </div>

                    <div className="card-grid">
                      {visibleCards.map((card) => (
                        <InstaCard
                          key={card.id}
                          card={card}
                          accent={cat.accentColor}
                        />
                      ))}
                      <SeeMoreCard category={cat.shortLabel} href={cat.href} />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <CTA />

        <div
          ref={footerRef}
          className="panel-footer"
          style={{ boxShadow: '0 -20px 50px rgba(0,0,0,0.10)' }}
        >
          <Footer />
        </div>

      </main>
    </>
  )
}