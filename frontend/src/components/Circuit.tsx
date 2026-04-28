import { useCallback } from 'react'
import { motion } from 'framer-motion'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { categories as categoryData } from '../data/categories'
import type { Category } from '../data/categories'
import { SectionTitle } from './SectionTitle'
import { useAppwriteCollection } from '../hooks/useAppwriteCollection'
import { appwriteConfig } from '../services/appwriteClient'

type CircuitProps = {
  eyebrow?: string
  title?: string
  description?: string
  limit?: number
}

export const Circuit = ({ eyebrow, title, description, limit }: CircuitProps) => {
  const sectionRef = useScrollReveal({ y: 40 })
  const mapCategoryDocument = useCallback(
    (document: any): Category => ({
      name: document.name,
      distance: document.distance,
      mood: document.mood,
      image: document.image,
      description: document.description,
    }),
    [],
  )
  const { data: liveCategories, loading, error, live } = useAppwriteCollection<Category>(
    appwriteConfig.collections.categories,
    mapCategoryDocument,
    categoryData,
  )
  const circuits = limit ? liveCategories.slice(0, limit) : liveCategories

  return (
    <section
      ref={sectionRef}
      id="categories"
      className="relative z-10 overflow-hidden px-6 py-20 sm:px-8 lg:px-14"
    >
      <div className="absolute inset-x-0 -top-32 h-64 bg-gradient-to-b from-rose-500/10 via-red-500/10 to-transparent blur-3xl" />
      <div className="relative mx-auto max-w-6xl">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <SectionTitle
            eyebrow={eyebrow ?? 'Racing Categories'}
            title={title ?? 'Choose your battleground'}
            description={
              description ??
              'Formula precision, prototype endurance, and sports-car power - choose the garage class that fits your racing style.'
            }
          />
          <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-slate-100 shadow-neon">
            <span className="h-2 w-2 rounded-full bg-rose-300 animate-pulsefast" />
            Live session scanning - {circuits.length} classes loaded
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-300">
          <span className={`rounded-full border px-3 py-1 ${live ? 'border-emerald-300/40 bg-emerald-400/10 text-emerald-100' : 'border-white/10 bg-white/5'}`}>
            {live ? 'Live Appwrite categories' : 'Local dev categories'}
          </span>
          {loading ? <span>Loading Appwrite categories...</span> : null}
          {error ? <span className="text-rose-200">{error}</span> : null}
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {circuits.map((circuit, index) => (
            <motion.div
              key={circuit.name}
              className="group glass-panel relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 shadow-glow"
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 220, damping: 20 }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-black/50" aria-hidden />
              <div className="relative h-44 overflow-hidden rounded-xl">
                <img
                  src={circuit.image}
                  alt={circuit.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
              </div>
              <div className="relative mt-4 flex items-center justify-between gap-3 text-xs uppercase tracking-[0.24em] text-rose-100">
                <span>{circuit.mood}</span>
                <span className="rounded-full border border-white/15 bg-white/5 px-2 py-1 text-[11px] text-slate-200">
                  {circuit.distance}
                </span>
              </div>
              <h3 className="relative mt-2 font-display text-xl text-white">{circuit.name}</h3>
              <p className="relative mt-1 text-sm text-slate-300">{circuit.description}</p>
              <div className="relative mt-4 flex items-center gap-2 text-sm text-rose-100">
                <span className="h-1 w-8 rounded-full bg-gradient-to-r from-rose-400 to-orange-300" />
                Slot {index + 1} - Ready
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
