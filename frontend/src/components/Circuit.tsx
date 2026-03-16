import { motion } from 'framer-motion'
import { useScrollReveal } from '../hooks/useScrollReveal'

const circuits = [
  {
    name: 'Circuit / Grand Prix',
    distance: '5-7 km',
    mood: 'Technical apex mastery',
    image:
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=2200&q=80&sat=-12',
  },
  {
    name: 'Sprint / Street',
    distance: '3-5 km',
    mood: 'Tight city night run',
    image:
      'https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=2200&q=80&sat=-18',
  },
  {
    name: 'Drift / Exhibition',
    distance: 'Custom',
    mood: 'Smoke, lights, precision',
    image:
      'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=2200&q=80&sat=-18',
  },
]

export const Circuit = () => {
  const sectionRef = useScrollReveal({ y: 40 })

  return (
    <section
      ref={sectionRef}
      id="categories"
      className="relative z-10 overflow-hidden px-6 py-20 sm:px-8 lg:px-14"
    >
      <div className="absolute inset-x-0 -top-32 h-64 bg-gradient-to-b from-rose-500/10 via-red-500/10 to-transparent blur-3xl" />
      <div className="max-w-6xl mx-auto relative">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.28em] text-rose-100">Racing Categories</p>
            <h2 className="font-display text-3xl text-white sm:text-4xl">Choose your battleground</h2>
            <p className="max-w-xl text-slate-300">
              Circuit domination, sprint aggression, or smoke-filled drift arenas—scroll to pick how you rewrite the
              leaderboard.
            </p>
          </div>
          <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-slate-100 shadow-neon">
            <span className="h-2 w-2 rounded-full bg-rose-300 animate-pulsefast" />
            Live session scanning · 3 formats loaded
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {circuits.map((circuit, index) => (
            <motion.div
              key={circuit.name}
              className="group glass-panel relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 shadow-glow"
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 220, damping: 20 }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-black/50" aria-hidden />
              <div
                className="h-40 rounded-xl bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${circuit.image})` }}
              />
              <div className="relative mt-4 flex items-center justify-between text-xs uppercase tracking-[0.24em] text-rose-100">
                <span>{circuit.mood}</span>
                <span className="rounded-full border border-white/15 bg-white/5 px-2 py-1 text-[11px] text-slate-200">
                  {circuit.distance}
                </span>
              </div>
              <h3 className="relative mt-2 font-display text-xl text-white">{circuit.name}</h3>
              <p className="relative mt-1 text-sm text-slate-300">Tap the lap bar to preview banking and lighting.</p>
              <div className="relative mt-4 flex items-center gap-2 text-sm text-rose-100">
                <span className="h-1 w-8 rounded-full bg-gradient-to-r from-rose-400 to-orange-300" />
                Slot {index + 1} • Ready
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
