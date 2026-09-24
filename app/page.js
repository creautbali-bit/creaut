'use client'

import Heroservices from './components/Heroservices'
import CTA from './components/cta'
import Footer from './components/footer'

export default function Home() {
  return (
    <>
      <main>
        <Heroservices />
        <CTA />
      </main>
      <Footer />
    </>
  )
}