import { motion } from 'framer-motion'
import { useScrollReveal } from '../hooks/useScrollReveal'

const features = [
  {
    title: 'Hyper Speed',
    description: 'Physics-tuned drifting with adaptive traction and cinematic boosts.',
    icon: '⚡',
    accent: 'from-cyan-400/70 to-emerald-400/60',
  },
  {
    title: 'Multiplayer Arenas',
    description: 'Low-latency matchmaking with squad playlists, ghosts, and crew lobbies.',
    icon: '🛰️',
    accent: 'from-fuchsia-400/70 to-purple-500/60',
  },
  {
    title: 'Custom Tracks',
    description: 'Build neon circuits with modular pieces, climates, and reactive hazards.',
    icon: '🛠️',
    accent: 'from-orange-400/70 to-amber-300/60',
  },
  {
    title: 'Global Leaderboards',
    description: 'Region splits, seasonal resets, anti-cheat, and cinematic replays.',
    icon: '🌐',
    accent: 'from-blue-400/70 to-cyan-300/60',
  },
]

export const Features = () => {
  const sectionRef = useScrollReveal({ y: 40 })

  return (
    <section ref={sectionRef} id="features" className="relative z-10 px-6 py-20 sm:px-8 lg:px-14">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-cyan-100">Core Systems</p>
            <h2 className="font-display text-3xl text-white sm:text-4xl">Engineered for pure velocity</h2>
          </div>
          <p className="max-w-xl text-slate-300">
            Precision-tuned handling, stable netcode, and immersive visuals come together so every race feels
            razor sharp and relentlessly smooth.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              className="group glass-panel relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 shadow-glow"
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 220, damping: 20 }}
            >
              <div
                className={`absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-60 bg-gradient-to-br ${feature.accent}`}
                aria-hidden
              />
              <div className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-xl shadow-neon">
                {feature.icon}
              </div>
              <h3 className="relative mt-4 font-display text-xl text-white">{feature.title}</h3>
              <p className="relative mt-2 text-slate-300">{feature.description}</p>
              <div className="relative mt-4 flex items-center gap-2 text-sm text-cyan-100">
                <span className="h-1 w-6 rounded-full bg-gradient-to-r from-cyan-300 to-fuchsia-300" />
                Learn More
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
