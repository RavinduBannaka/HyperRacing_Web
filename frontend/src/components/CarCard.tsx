import { motion } from 'framer-motion'
import type { Ref } from 'react'
import type { Car } from '../data/cars'

type CarCardProps = {
  car: Car
  tiltRef?: Ref<HTMLDivElement>
}

export const CarCard = ({ car, tiltRef }: CarCardProps) => {
  return (
    <motion.div
      ref={tiltRef}
      className="group glass-panel relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-glow"
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 220, damping: 18 }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-black/50" aria-hidden />
      <div className="relative h-52 overflow-hidden">
        <img
          src={car.image}
          alt={car.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <span className="absolute left-3 top-3 rounded-full border border-white/15 bg-black/55 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-rose-100 backdrop-blur">
          {car.status}
        </span>
      </div>
      <div className="relative p-4">
        <div className="flex items-center justify-between text-xs uppercase tracking-[0.24em] text-rose-100">
          <span>{car.class}</span>
          <span className="rounded-full border border-white/15 bg-white/5 px-2 py-0.5 text-[11px] text-slate-200">
            {car.color}
          </span>
        </div>
        <h3 className="mt-2 font-display text-xl text-white">{car.name}</h3>
        <p className="text-sm text-slate-300">Top speed {car.speed}</p>
        <p className="mt-2 text-sm text-slate-200/80">{car.blurb}</p>
        <div className="mt-4 grid grid-cols-3 gap-2 text-xs text-slate-200">
          <div className="rounded-lg border border-white/10 bg-white/5 px-2 py-2">
            <p className="uppercase tracking-[0.18em] text-rose-100">Speed</p>
            <p className="mt-1 font-semibold text-white">{car.speed}</p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/5 px-2 py-2">
            <p className="uppercase tracking-[0.18em] text-rose-100">Handle</p>
            <p className="mt-1 font-semibold text-white">{car.handling}</p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/5 px-2 py-2">
            <p className="uppercase tracking-[0.18em] text-rose-100">Accel</p>
            <p className="mt-1 font-semibold text-white">{car.acceleration}</p>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-rose-100">Coin price</p>
            <p className="text-lg font-semibold text-white">{car.price.toLocaleString()} RS</p>
          </div>
          <button className="neon-button rounded-full bg-gradient-to-r from-rose-500 via-red-500 to-orange-400 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white">
            {car.status === 'Unlocked' ? 'Select' : 'Unlock'}
          </button>
        </div>
      </div>
    </motion.div>
  )
}
