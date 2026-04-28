import { useMemo, useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { cars as carsData } from '../data/cars'
import type { CarCategory } from '../data/cars'
import { SectionTitle } from './SectionTitle'
import { CarCard } from './CarCard'
import { useTilt } from '../hooks/useTilt'

const filters: Array<'All' | CarCategory> = ['All', 'Hyper Cars', 'Formula', 'Drift', 'Rally', 'Police', 'Premium']

type CarsProps = {
  limit?: number
  title?: string
  eyebrow?: string
  description?: string
}

export const Cars = ({ limit, title, eyebrow, description }: CarsProps) => {
  const sectionRef = useScrollReveal({ y: 32 })
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>('All')

  const cars = useMemo(() => {
    const filtered = activeFilter === 'All' ? carsData : carsData.filter((car) => car.class === activeFilter)
    return limit ? filtered.slice(0, limit) : filtered
  }, [activeFilter, limit])

  return (
    <section ref={sectionRef} id="cars" className="relative z-10 px-6 py-20 sm:px-8 lg:px-14">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <SectionTitle
            eyebrow={eyebrow ?? 'Featured Cars'}
            title={title ?? 'Signature hypercars with glassmorphism sheen'}
            description={description ?? 'Hover to tilt each chassis in 3D and reveal specs across our flagship fleet.'}
          />
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                activeFilter === filter
                  ? 'border-rose-300/70 bg-rose-500/20 text-white shadow-[0_0_24px_rgba(244,63,94,0.22)]'
                  : 'border-white/15 bg-white/5 text-slate-200 hover:border-rose-200/50 hover:bg-white/10'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {cars.map((car) => {
            const tiltRef = useTilt(12)
            return <CarCard key={car.name} car={car} tiltRef={tiltRef} />
          })}
        </div>
      </div>
    </section>
  )
}
