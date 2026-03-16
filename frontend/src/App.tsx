import { useEffect } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './App.css'
import { Hero } from './components/Hero'
import { Circuit } from './components/Circuit'
import { Features } from './components/Features'
import { Cars } from './components/Cars'
import { CarBanner } from './components/CarBanner'
import { AuthSection } from './components/AuthSection'
import { Gallery } from './components/Gallery'
import { AboutSection } from './components/AboutSection'
import { Footer } from './components/Footer'
import { GamingLogo } from './components/GamingLogo'

function App() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      gsap.to('.scroll-progress', {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="relative min-h-screen bg-[#050608] text-slate-100">
      <div className="scroll-progress fixed left-0 top-0 z-40 h-1 w-full origin-left scale-x-0 bg-gradient-to-r from-rose-400 via-red-500 to-orange-400" />

      <header className="fixed left-0 right-0 top-0 z-30 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-full border border-white/10 bg-black/60 px-6 py-3 shadow-glow">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 overflow-hidden rounded-full border border-white/15 bg-white/5 p-1 shadow-neon">
                <GamingLogo className="h-full w-full" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-rose-100">HYPER RACING</p>
                <p className="text-sm text-slate-300">Cinematic racing brand</p>
              </div>
            </div>
          </div>
          <nav className="hidden items-center gap-5 text-sm text-slate-200 sm:flex">
            {[
              { label: 'Home', href: '#hero' },
              { label: 'Cars', href: '#cars' },
              { label: 'Categories', href: '#categories' },
              { label: 'Performance', href: '#performance' },
              { label: 'Gallery', href: '#gallery' },
              { label: 'About', href: '#about' },
              { label: 'Buy', href: '#buy' },
            ].map((item) => (
              <a key={item.href} href={item.href} className="transition hover:text-rose-100">
                {item.label}
              </a>
            ))}
          </nav>
          <motion.a
            href="#buy"
            className="neon-button inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-rose-100"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            Book a build <span className="h-2 w-2 rounded-full bg-rose-300 animate-pulsefast" />
          </motion.a>
        </div>
      </header>

      <main className="relative pt-24">
        <Hero />
        <Cars />
        <Circuit />
        <Features />
        <Gallery />
        <AboutSection />
        <CarBanner />
        <AuthSection />
      </main>

      <Footer />
    </div>
  )
}

export default App
