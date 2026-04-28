import { motion } from 'framer-motion'
import { useScrollReveal } from '../hooks/useScrollReveal'
import blackFormulaCar from '../assets/gallery/black-formula-racing-car.png'
import redFormulaCar from '../assets/gallery/red-formula-racing-car.png'
import yellowFormulaCar from '../assets/gallery/yellow-formula-racing-car.png'
import redBlackPrototypeCar from '../assets/gallery/red-black-prototype-racing-car.png'
import yellowSportsCar from '../assets/gallery/yellow-sports-racing-car.png'
import redSportsCar from '../assets/gallery/red-sports-racing-car.png'

const gallery = [
  {
    title: 'Black Formula Racing Car',
    caption: 'Carbon-black open wheel machine built for late-brake precision.',
    image: blackFormulaCar,
  },
  {
    title: 'Red Formula Racing Car',
    caption: 'Scarlet aero package with aggressive circuit stance.',
    image: redFormulaCar,
  },
  {
    title: 'Yellow Formula Racing Car',
    caption: 'High-visibility formula racer tuned for apex speed.',
    image: yellowFormulaCar,
  },
  {
    title: 'Red/Black Prototype Racing Car',
    caption: 'Endurance prototype silhouette with hybrid-track attitude.',
    image: redBlackPrototypeCar,
  },
  {
    title: 'Yellow Sports Racing Car',
    caption: 'Wide-body sports racer with bright GT-class energy.',
    image: yellowSportsCar,
  },
  {
    title: 'Red Sports Racing Car',
    caption: 'Red track weapon with low-slung aero and bronze wheels.',
    image: redSportsCar,
  },
]

export const Gallery = () => {
  const sectionRef = useScrollReveal({ y: 32 })

  return (
    <section ref={sectionRef} id="gallery" className="relative z-10 px-6 py-20 sm:px-8 lg:px-14">
      <div className="section-shell overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(244,63,94,0.14),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.06),transparent_42%)]" />
        <div className="relative flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-rose-100">Gallery</p>
            <h2 className="font-display text-3xl text-white sm:text-4xl">HYPER RACING Gallery</h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-slate-300 sm:text-base">
            Six cinematic racing machines, staged as premium track cards for the Hyper Racing grid.
          </p>
        </div>

        <div className="relative mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {gallery.map((car, idx) => (
            <motion.article
              key={car.title}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/45 shadow-[0_0_40px_rgba(244,63,94,0.12)]"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: idx * 0.05 }}
              whileHover={{ y: -6, scale: 1.01 }}
            >
              <div className="relative aspect-[1.52/1] overflow-hidden">
                <img
                  src={car.image}
                  alt={car.title}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
                <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
                  <div className="absolute inset-0 bg-gradient-to-r from-rose-500/18 via-transparent to-slate-200/10" />
                </div>
                <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-rose-100 backdrop-blur">
                  Legend {idx + 1}
                </div>
              </div>

              <div className="relative border-t border-white/10 bg-gradient-to-br from-white/[0.06] via-white/[0.03] to-transparent p-4">
                <h3 className="text-lg font-semibold text-white">{car.title}</h3>
                <p className="mt-1 text-sm leading-5 text-slate-300">{car.caption}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
