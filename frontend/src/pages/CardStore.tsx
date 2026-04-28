import { motion } from 'framer-motion'
import { PageShell } from '../components/PageShell'
import { GlowCard } from '../components/GlowCard'
import { useGame } from '../context/GameContext'
import blackFormulaCar from '../assets/gallery/black-formula-racing-car.png'
import redFormulaCar from '../assets/gallery/red-formula-racing-car.png'
import yellowFormulaCar from '../assets/gallery/yellow-formula-racing-car.png'
import redBlackPrototypeCar from '../assets/gallery/red-black-prototype-racing-car.png'
import yellowSportsCar from '../assets/gallery/yellow-sports-racing-car.png'
import redSportsCar from '../assets/gallery/red-sports-racing-car.png'

type StoreCard = {
  id: string
  name: string
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary'
  price: number
  image: string
  description: string
}

const storeCards: StoreCard[] = [
  {
    id: 'obsidian-f36-card',
    name: 'Obsidian F36 Skin',
    rarity: 'Epic',
    price: 1200,
    image: blackFormulaCar,
    description: 'Black formula livery with silver aero accents.',
  },
  {
    id: 'crimson-f36-card',
    name: 'Crimson F36 Skin',
    rarity: 'Legendary',
    price: 2200,
    image: redFormulaCar,
    description: 'Red formula skin built for premium race-night loadouts.',
  },
  {
    id: 'solar-f30-card',
    name: 'Solar F30 Skin',
    rarity: 'Rare',
    price: 800,
    image: yellowFormulaCar,
    description: 'Bright yellow open-wheel card for technical drivers.',
  },
  {
    id: 'apex-prototype-68-card',
    name: 'Apex Prototype 68',
    rarity: 'Legendary',
    price: 2600,
    image: redBlackPrototypeCar,
    description: 'Prototype racer card with endurance-class presence.',
  },
  {
    id: 'veloce-gt-y-card',
    name: 'Veloce GT-Y Skin',
    rarity: 'Epic',
    price: 1500,
    image: yellowSportsCar,
    description: 'Yellow GT skin for sports racing events.',
  },
  {
    id: 'crimson-gt-56-card',
    name: 'Crimson GT-56 Skin',
    rarity: 'Rare',
    price: 980,
    image: redSportsCar,
    description: 'Red sports racer card with black aero trim.',
  },
]

export const CardStore = () => {
  const { coins, inventory, buyCard } = useGame()

  const handleBuy = (card: StoreCard) => {
    buyCard(card)
  }

  return (
    <PageShell
      eyebrow="Marketplace"
      title="Card Store"
      subtitle="Buy premium racing cards and car skins using RS coins for your Hyper Racing garage."
      backgroundImage={redBlackPrototypeCar}
    >
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <GlowCard eyebrow="Reserve" title="Wallet" tone="info">
          <div className="flex items-center justify-between text-3xl font-semibold text-white">
            <span>{coins.toLocaleString()} RS</span>
            <span className="text-sm text-rose-100">Ready to deploy</span>
          </div>
        </GlowCard>

        <GlowCard eyebrow="Collection" title="Owned" tone="success">
          <div className="flex flex-wrap gap-2 text-sm text-slate-200">
            {inventory.map((card) => (
              <span key={card.id} className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-white">
                {card.name}
              </span>
            ))}
            {inventory.length === 0 ? <span className="text-slate-300">No cards yet - buy one to start.</span> : null}
          </div>
        </GlowCard>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {storeCards.map((card) => {
          const owned = inventory.some((c) => c.id === card.id)
          const affordable = coins >= card.price

          return (
            <motion.article
              key={card.id}
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 220, damping: 18 }}
              className="glass-panel group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 shadow-glow"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-black/70" aria-hidden />
              <div className="relative h-44 overflow-hidden rounded-xl">
                <img
                  src={card.image}
                  alt={card.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                <span className="absolute left-3 top-3 rounded-full border border-white/15 bg-black/55 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-rose-100 backdrop-blur">
                  {card.rarity}
                </span>
                <span className="absolute right-3 top-3 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-white backdrop-blur">
                  {owned ? 'Owned' : 'Locked'}
                </span>
              </div>

              <div className="relative mt-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{card.name}</h3>
                    <p className="mt-1 text-sm text-slate-300">{card.description}</p>
                  </div>
                  <p className="whitespace-nowrap text-sm font-semibold text-rose-100">{card.price.toLocaleString()} RS</p>
                </div>
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.97 }}
                  disabled={owned || !affordable}
                  onClick={() => handleBuy(card)}
                  className="neon-button relative mt-4 w-full rounded-xl bg-gradient-to-r from-rose-500 via-red-500 to-orange-400 px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {owned ? 'Owned' : affordable ? 'Buy Card' : 'Not enough RS'}
                </motion.button>
              </div>
            </motion.article>
          )
        })}
      </div>
    </PageShell>
  )
}
