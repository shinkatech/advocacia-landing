import { MotionConfig } from 'framer-motion'
import { useState } from 'react'
import About from './components/About'
import Contact from './components/Contact'
import { BackToTop, CursorGlow, CursorRing, Preloader, ScrollProgress, WhatsAppFloat } from './components/Effects'
import Constitution from './components/Constitution'
import History from './components/History'
import OnlineSign from './components/OnlineSign'
import Faq from './components/Faq'
import Footer from './components/Footer'
import GavelSection from './components/GavelSection'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Navbar from './components/Navbar'
import PracticeAreas from './components/PracticeAreas'
import Process from './components/Process'
import Team from './components/Team'
import Values from './components/Values'

export default function App() {
  const [ready, setReady] = useState(false)

  return (
    <MotionConfig reducedMotion="user">
      <Preloader onDone={() => setReady(true)} />
      <ScrollProgress />
      <CursorGlow />
      <CursorRing />
      <Navbar />
      <main>
        <Hero ready={ready} />
        <About />
        <Constitution />
        <Marquee />
        <PracticeAreas />
        <GavelSection />
        <History />
        <Process />
        <OnlineSign />
        <Team />
        <Values />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
      <BackToTop />
    </MotionConfig>
  )
}
