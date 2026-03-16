import { motion } from 'framer-motion'
import { useTilt } from '../hooks/useTilt'
import { useScrollReveal } from '../hooks/useScrollReveal'

const cars = [
  {
    name: 'VX-09 Tempest',
    class: 'Hyper',
    speed: '402 km/h',
    color: 'Crimson Veil',
    image:
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=2400&q=80&sat=-12',
  },
  {
    name: 'Astra Helix',
    class: 'Circuit',
    speed: '376 km/h',
    color: 'Molten Silver',
    image:
      'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=2400&q=80&sat=-18',
  },
  {
    name: 'Nova Specter',
    class: 'Sprint',
    speed: '428 km/h',
    color: 'Shadow Black',
    image:
      'https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=2400&q=80&sat=-18',
  },
  {
    name: 'Mirage Vanta',
    class: 'Time Attack',
    speed: '390 km/h',
    color: 'Scarlet Edge',
    image:
      'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=2400&q=80&sat=-18',
  },
]

export const Cars = () => {
  const sectionRef = useScrollReveal({ y: 32 })

  return (
    <section ref={sectionRef} id="cars" className="relative z-10 px-6 py-20 sm:px-8 lg:px-14">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-rose-100">Featured Cars</p>
            <h2 className="font-display text-3xl text-white sm:text-4xl">Signature hypercars with glassmorphism sheen</h2>
          </div>
          <p className="max-w-xl text-slate-300">
            Hover to tilt each chassis in 3D and reveal specs across our flagship fleet.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {cars.map((car) => {
            const tiltRef = useTilt(12)
            return (
              <motion.div
                key={car.name}
                ref={tiltRef}
                className="group glass-panel relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-glow"
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 220, damping: 18 }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-black/50" aria-hidden />
                <div
                  className="h-48 w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${car.image})` }}
                />
                <div className="relative p-4">
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.24em] text-rose-100">
                    <span>{car.class}</span>
                    <span className="rounded-full border border-white/15 bg-white/5 px-2 py-0.5 text-[11px] text-slate-200">
                      {car.color}
                    </span>
                  </div>
                  <h3 className="mt-2 font-display text-xl text-white">{car.name}</h3>
                  <p className="text-sm text-slate-300">Top speed {car.speed}</p>
                  <div className="mt-4 flex items-center gap-2 text-sm text-rose-100">
                    <span className="h-1 w-8 rounded-full bg-gradient-to-r from-rose-400 to-orange-300" />
                    Adaptive aero + launch tuning
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
