'use client'

import Heroservices from '@/components/sections/HeroServices'
import CTA from '@/components/sections/CTA'
import Footer from '@/components/layout/Footer'

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