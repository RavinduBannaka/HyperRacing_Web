import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useParallax } from '../hooks/useParallax'
import { ParticleField } from './ParticleField'
import { GamingLogo } from './GamingLogo'
import { Link } from 'react-router-dom'
import { HeroCarCanvas } from './HeroCarCanvas'

const heroBackground =
  'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=2400&q=80&sat=-12'

const sprintClassCar =
  'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=2200&q=80&sat=-18'

export const Hero = () => {
  const sectionRef = useRef<HTMLElement | null>(null)
  const backgroundRef = useParallax(18)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.fromTo(
        '.hero-title',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
      )
        .fromTo(
          '.hero-sub',
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9 },
          '-=0.45',
        )
        .fromTo(
          '.hero-cta',
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, stagger: 0.1 },
          '-=0.4',
        )
        .fromTo(
          '.hero-card',
          { scale: 0.96, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1, ease: 'power4.out' },
          '-=0.4',
        )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleRipple = (event: React.PointerEvent<HTMLButtonElement>) => {
    const target = event.currentTarget
    const rect = target.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * 100
    const y = ((event.clientY - rect.top) / rect.height) * 100
    target.style.setProperty('--x', `${x}%`)
    target.style.setProperty('--y', `${y}%`)
  }

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen overflow-hidden px-6 py-16 sm:px-8 lg:px-14 flex items-center"
    >
      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        <div
          ref={backgroundRef}
          className="absolute -inset-12 scale-110 bg-cover bg-center opacity-80"
          style={{ backgroundImage: `url(${heroBackground})` }}
        />
        <div className="speed-lines" />
        <div className="hyper-grid absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/75 to-night" />
      <div className="absolute top-10 right-10 w-64 h-64 rounded-full glow-ring" />
    </div>

      <ParticleField count={26} />

      <div className="relative z-10 grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] max-w-7xl mx-auto w-full">
        <div className="space-y-8">
          <motion.div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm uppercase tracking-[0.24em] text-rose-100 shadow-neon">
            <div className="flex items-center gap-2">
              <GamingLogo className="h-6 w-10" />
              <span className="font-semibold text-white">HYPER RACING</span>
            </div>
            <span className="hidden sm:inline text-slate-200/80">Elite racing division</span>
          </motion.div>

          <motion.h1 className="hero-title font-display text-4xl leading-[1.04] text-white drop-shadow-[0_10px_50px_rgba(255,46,64,0.45)] sm:text-5xl lg:text-6xl">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-red-400 to-slate-200">
              HYPER RACING
            </span>
            <span className="mt-2 block text-slate-200">Carbon-sculpted hypercars. Cinematic light. Built to overtake.</span>
          </motion.h1>

          <motion.p className="hero-sub max-w-2xl text-lg text-slate-300 sm:text-xl">
            A premium racing universe tuned for velocity purists—wind-tunnel aero, telemetry-grade visuals, and
            championship-ready cockpit feel in every interaction.
          </motion.p>

          <div className="hero-cta flex flex-wrap gap-4">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/cars"
                onPointerMove={handleRipple as any}
                className="neon-button inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-rose-500/80 via-red-500/80 to-orange-400/80 px-7 py-3 font-semibold text-white shadow-glow ring-1 ring-rose-400/60 transition hover:-translate-y-0.5 hover:shadow-neon"
              >
                Start your engine
                <span className="text-base">→</span>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/categories"
                onPointerMove={handleRipple as any}
                className="neon-button inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 font-semibold text-slate-100 transition hover:-translate-y-0.5 hover:border-rose-300/60"
              >
                View garage
              </Link>
            </motion.div>
          </div>

          <div className="hero-cta grid gap-4 sm:grid-cols-3">
            {[
              { label: '0-200 KM/H', value: '4.8 seconds flat' },
              { label: 'Downforce', value: '1,200 kg @ 280 km/h' },
              { label: 'Circuit wins', value: '92 podiums worldwide' },
            ].map((item) => (
              <div
                key={item.label}
                className="glass-panel relative overflow-hidden rounded-2xl p-4 shadow-glow"
              >
                <div className="absolute right-3 top-3 h-10 w-10 rounded-full bg-rose-400/10 blur-2xl" />
                <p className="text-sm uppercase tracking-[0.18em] text-rose-100/90">{item.label}</p>
                <p className="mt-2 text-lg font-semibold text-white">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <motion.div
          className="hero-card relative glass-panel overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 tilt-shadow"
          whileHover={{ boxShadow: '0 0 40px rgba(255, 46, 64, 0.38)' }}
        >
          <div className="absolute inset-0 bg-animated opacity-70" />
          <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 via-transparent to-orange-400/5" />
          <div className="relative z-10 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-rose-100">Immersive Garage</p>
                <p className="text-2xl font-semibold text-white">VX-09 Tempest · HYPER</p>
                <p className="mt-1 text-sm text-slate-300">Live orbit view · Cinematic lighting · Interactive aero sweep</p>
              </div>
              <div className="rounded-full border border-rose-300/60 bg-rose-300/10 px-4 py-2 text-sm font-semibold text-rose-100 shadow-neon">
                Drag to rotate
              </div>
            </div>

            <div className="hidden sm:block">
              <HeroCarCanvas />
            </div>
            <div className="sm:hidden relative overflow-hidden rounded-2xl border border-white/10 bg-black/50">
              <div
                className="h-[280px] bg-cover bg-center opacity-95"
                style={{ backgroundImage: `url(${sprintClassCar})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-slate-100">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-rose-100">Mobile preview</p>
                  <p className="font-semibold text-white">Static render for speed</p>
                </div>
                <div className="flex items-center gap-2 text-rose-100">
                  <span className="h-2 w-2 rounded-full bg-rose-400 animate-pulsefast" />
                  3D on desktop
                </div>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { label: 'Powertrain', value: 'Hybrid V8 · 1,050 hp' },
                { label: 'Downforce package', value: 'Active aero + DRS' },
                { label: 'Render mode', value: 'Cinematic • Neon garage' },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-3">
                  <p className="text-xs uppercase tracking-[0.2em] text-rose-100">{item.label}</p>
                  <p className="mt-1 text-sm text-slate-200">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
