'use client'

import Navbar from './components/navbar'
import Hero from './components/hero'
import Services from './components/services'
import CTA from './components/cta'
import Footer from './components/footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <CTA />
      </main>
      <Footer />
    </>
  )
}