import { useCallback, useMemo } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { cars as carsData } from '../data/cars'
import type { Car } from '../data/cars'
import { SectionTitle } from './SectionTitle'
import { CarCard } from './CarCard'
import { useTilt } from '../hooks/useTilt'
import { useAppwriteCollection } from '../hooks/useAppwriteCollection'
import { appwriteConfig } from '../services/appwriteClient'

type CarsProps = {
  limit?: number
  title?: string
  eyebrow?: string
  description?: string
}

export const Cars = ({ limit, title, eyebrow, description }: CarsProps) => {
  const sectionRef = useScrollReveal({ y: 32 })
  const mapCarDocument = useCallback(
    (document: any): Car => ({
      name: document.name,
      class: document.class,
      speed: document.speed,
      handling: String(document.handling),
      acceleration: String(document.acceleration),
      price: Number(document.price ?? 0),
      color: document.color,
      image: document.image,
      blurb: document.blurb ?? document.description ?? '',
      status: document.status ?? 'Locked',
    }),
    [],
  )
  const { data: liveCars, loading, error, live } = useAppwriteCollection<Car>(
    appwriteConfig.collections.cars,
    mapCarDocument,
    carsData,
  )

  const cars = useMemo(() => {
    return limit ? liveCars.slice(0, limit) : liveCars
  }, [limit, liveCars])

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

        <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-slate-300">
          <span className={`rounded-full border px-3 py-1 ${live ? 'border-emerald-300/40 bg-emerald-400/10 text-emerald-100' : 'border-white/10 bg-white/5'}`}>
            {live ? 'Live Appwrite data' : 'Local dev data'}
          </span>
          {loading ? <span>Loading Appwrite cars...</span> : null}
          {error ? <span className="text-rose-200">{error}</span> : null}
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
