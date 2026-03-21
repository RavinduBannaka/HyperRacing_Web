import { motion } from 'framer-motion'
import { PageShell } from '../components/PageShell'
import { GlowCard } from '../components/GlowCard'
import { useGame } from '../context/GameContext'

const storeBg =
  'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=2100&q=80&sat=-8'

const packages = [
  { label: 'Starter', amount: 100, bonus: '+0%', price: '$1.20' },
  { label: 'Racer', amount: 500, bonus: '+10%', price: '$5.40' },
  { label: 'Elite', amount: 1000, bonus: '+18%', price: '$9.80' },
  { label: 'Mythic', amount: 5000, bonus: '+28%', price: '$44.00' },
]

export const CoinStore = () => {
  const { coins, purchaseCoins } = useGame()

  return (
    <PageShell
      eyebrow="Economy"
      title="Coin Store"
      subtitle="Top up your racing wallet with premium bundles built for spins, cards, and events."
      backgroundImage={storeBg}
    >
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <GlowCard eyebrow="Balance" title="Current reserve" tone="info">
          <div className="flex items-center justify-between text-3xl font-semibold text-white">
            <span>{coins.toLocaleString()} coins</span>
            <span className="text-sm text-rose-100">Secure vault</span>
          </div>
        </GlowCard>

        <div className="grid gap-4 md:grid-cols-2">
          {packages.map((pack) => (
            <motion.div
              key={pack.label}
              whileHover={{ y: -4, scale: 1.01 }}
              className="glass-panel relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 shadow-glow"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 opacity-70" aria-hidden />
              <div className="relative flex flex-col gap-2">
                <p className="text-xs uppercase tracking-[0.24em] text-rose-100">{pack.label}</p>
                <h3 className="text-2xl font-semibold text-white">{pack.amount.toLocaleString()} Coins</h3>
                <p className="text-sm text-slate-300">{pack.bonus} bonus • {pack.price}</p>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => purchaseCoins(pack.amount, `${pack.label} pack`)}
                  className="neon-button mt-2 rounded-xl bg-gradient-to-r from-rose-500 via-red-500 to-orange-400 px-4 py-2 text-sm font-semibold text-white"
                >
                  Buy now
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </PageShell>
  )
}
