import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useParallax } from '../hooks/useParallax'
import { ParticleField } from './ParticleField'
import { GamingLogo } from './GamingLogo'
import { Link } from 'react-router-dom'
import { HeroCarCanvas } from './HeroCarCanvas'

const heroVideo = '/media/hyper-racing-hero.mp4'
const heroPoster =
  'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=2400&q=90&sat=-14&exp=-8'

const sprintClassCar =
  'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=3840&q=90&sat=-14'

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
          '.hero-stage',
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
        <div ref={backgroundRef} className="absolute -inset-12 scale-[1.04]">
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster={heroPoster}
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
        </div>
        <div className="speed-lines" />
        <div className="hyper-grid absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/72 to-black" />
        <div className="absolute top-10 right-10 w-64 h-64 rounded-full glow-ring" />
        <div className="absolute inset-0 hero-aurora" />
      </div>

      <ParticleField count={32} />

      <div className="relative z-10 max-w-7xl mx-auto w-full space-y-12">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <motion.div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.24em] text-rose-50 shadow-neon">
            <GamingLogo className="h-6 w-10" />
            <span className="font-semibold text-white">Hyper Racing</span>
            <span className="hidden sm:inline text-slate-200/80">Cinematic performance lab</span>
          </motion.div>

          <div className="glass-panel flex items-center gap-3 rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.22em] text-slate-100/80">
            <span className="flex h-2 w-2 items-center justify-center rounded-full bg-emerald-400 animate-pulsefast" />
            Season 07 · Live telemetry
            <span className="relative h-1 w-24 overflow-hidden rounded-full bg-white/10">
              <span className="absolute inset-y-0 left-0 w-2/3 animate-[pulse_2.8s_ease_infinite] rounded-full bg-gradient-to-r from-rose-400 via-amber-300 to-white" />
            </span>
          </div>
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-8">
            <motion.p className="hero-sub inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-2 text-xs uppercase tracking-[0.32em] text-rose-100">
              <span className="h-2 w-2 rounded-full bg-rose-400" />
              Velocity studio · Built for racing obsessives
            </motion.p>

            <motion.h1 className="hero-title font-display text-4xl leading-[1.05] text-white drop-shadow-[0_10px_50px_rgba(255,46,64,0.38)] sm:text-5xl lg:text-6xl">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-rose-300 via-white to-blue-200">
                HYPER RACING / VX-09 TEMPEST
              </span>
              <span className="mt-2 block text-slate-100">Cinematic showroom. Interactive aero. Night-attack visuals.</span>
            </motion.h1>

            <motion.p className="hero-sub max-w-2xl text-lg text-slate-200/90 sm:text-xl">
              Experience the flagship hypercar in a premium garage—responsive orbit controls, neon-grade lighting, and
              racing telemetry stitched into every pixel.
            </motion.p>

            <div className="hero-cta flex flex-wrap items-center gap-3">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/cars"
                  onPointerMove={handleRipple as any}
                  className="neon-button inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-rose-500 via-red-500 to-orange-400 px-7 py-3 font-semibold text-white shadow-glow ring-1 ring-rose-400/60 transition hover:-translate-y-0.5 hover:shadow-neon"
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
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-200/80">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulsefast" />
                Live 3D · Drag to rotate
              </div>
            </div>

            <div className="hero-cta grid gap-3 sm:grid-cols-3">
              {[
                { label: '0-200 KM/H', value: '4.8 s · launch calibrated' },
                { label: 'Downforce', value: '1,200 kg @ 280 km/h' },
                { label: 'Telemetry', value: '92 global podiums' },
              ].map((item) => (
                <div key={item.label} className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="absolute right-3 top-3 h-10 w-10 rounded-full bg-rose-400/10 blur-2xl" />
                  <p className="text-xs uppercase tracking-[0.2em] text-rose-100/90">{item.label}</p>
                  <p className="mt-2 text-lg font-semibold text-white">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <motion.div
            className="hero-stage relative space-y-4"
            whileHover={{ y: -4 }}
            transition={{ type: 'spring', stiffness: 120, damping: 14 }}
          >
            <div className="absolute -left-10 top-6 hidden h-10 w-10 rounded-full border border-white/15 bg-white/5 backdrop-blur sm:block" />
            <div className="absolute -right-6 -top-8 hidden h-24 w-24 rounded-full bg-gradient-to-br from-rose-500/30 via-red-500/10 to-transparent blur-3xl sm:block" />
            <div className="absolute -inset-8 -z-10 opacity-60">
              <div className="h-full w-full rounded-[40px] border border-white/10 bg-gradient-to-br from-white/5 via-white/0 to-white/5 blur-overlay" />
            </div>

            <div className="hidden sm:block">
              <HeroCarCanvas />
            </div>

            <div className="sm:hidden relative overflow-hidden rounded-3xl border border-white/10 bg-black/60">
              <div
                className="h-[320px] bg-cover bg-center opacity-95"
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
                { label: 'Aero kit', value: 'Active aero + DRS' },
                { label: 'Render mode', value: 'Cinematic · Neon garage' },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-3">
                  <p className="text-xs uppercase tracking-[0.2em] text-rose-100">{item.label}</p>
                  <p className="mt-1 text-sm text-slate-200">{item.value}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[ 
            { label: 'Dynamic orbit', value: 'Drag to steer · inertia tuned', accent: 'from-rose-400/15 to-transparent' },
            { label: 'Studio lighting', value: 'Dual-color spots + city HDRI', accent: 'from-blue-400/15 to-transparent' },
            { label: 'Reflective floor', value: 'Mirror finish · cinematic shadow', accent: 'from-emerald-400/15 to-transparent' },
            { label: 'Performance ready', value: 'Adaptive dpr · WebGL fallback', accent: 'from-amber-300/15 to-transparent' },
          ].map((item) => (
            <div
              key={item.label}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${item.accent}`} aria-hidden />
              <div className="relative z-10 space-y-1">
                <p className="text-xs uppercase tracking-[0.24em] text-rose-100">{item.label}</p>
                <p className="text-sm text-slate-100">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
