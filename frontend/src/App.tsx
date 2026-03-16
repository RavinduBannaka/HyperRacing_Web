import { useEffect } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Hero } from './components/Hero'
import { Features } from './components/Features'
import { Gameplay } from './components/Gameplay'
import { Cars } from './components/Cars'
import { Leaderboard } from './components/Leaderboard'
import { Community } from './components/Community'
import { Footer } from './components/Footer'

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
    <div className="relative min-h-screen bg-night text-slate-100">
      <div className="scroll-progress fixed left-0 top-0 z-40 h-1 w-full origin-left scale-x-0 bg-gradient-to-r from-cyan-300 via-fuchsia-400 to-blue-400" />

      <header className="fixed left-0 right-0 top-0 z-30 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-full border border-white/10 bg-black/50 px-6 py-3 shadow-glow">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-cyan-400 to-fuchsia-400 shadow-neon" />
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-100">HyperRacing</p>
              <p className="text-sm text-slate-300">Neon velocity platform</p>
            </div>
          </div>
          <nav className="hidden items-center gap-5 text-sm text-slate-200 sm:flex">
            {[{ label: 'Features', href: '#features' }, { label: 'Gameplay', href: '#gameplay' }, { label: 'Cars', href: '#cars' }, { label: 'Leaderboard', href: '#leaderboard' }].map((item) => (
              <a key={item.href} href={item.href} className="transition hover:text-cyan-100">
                {item.label}
              </a>
            ))}
          </nav>
          <motion.a
            href="#leaderboard"
            className="neon-button inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-cyan-100"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            Live Now <span className="h-2 w-2 rounded-full bg-emerald-300 animate-pulsefast" />
          </motion.a>
        </div>
      </header>

      <main className="relative pt-24">
        <Hero />
        <Features />
        <Gameplay />
        <Cars />
        <Leaderboard />
        <Community />
      </main>

      <Footer />
    </div>
  )
}

export default App
