import { motion } from 'framer-motion'
import { useGame } from '../context/GameContext'

type CoinPackage = {
  label: string
  amount: number
  price: string
  badge: string
}

const coinPackages: CoinPackage[] = [
  { label: 'Pit Stop', amount: 300, price: '$2.99', badge: 'Quick refill' },
  { label: 'Race Pack', amount: 800, price: '$6.99', badge: 'Best starter' },
  { label: 'Apex Vault', amount: 1800, price: '$12.99', badge: 'Most value' },
]

type BuyCoinsModalProps = {
  open: boolean
  onClose: () => void
}

export const BuyCoinsModal = ({ open, onClose }: BuyCoinsModalProps) => {
  const { coins, purchaseCoins } = useGame()

  if (!open) return null

  const buyPackage = (pack: CoinPackage) => {
    purchaseCoins(pack.amount, `${pack.label} coin pack`)
    onClose()
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.96, y: 12, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.96, y: 12, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 24 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl overflow-hidden rounded-2xl border border-white/15 bg-[#08090d] shadow-[0_0_60px_rgba(244,63,94,0.25)]"
      >
        <div className="border-b border-white/10 bg-gradient-to-r from-rose-500/15 via-white/5 to-slate-300/10 p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-rose-100">Hyper Racing Vault</p>
              <h2 className="mt-1 text-2xl font-semibold text-white">Buy Coins</h2>
              <p className="mt-1 text-sm text-slate-300">Balance updates instantly after purchase.</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-sm text-slate-100 transition hover:border-rose-200/60 hover:text-white"
            >
              Close
            </button>
          </div>
          <div className="mt-4 inline-flex rounded-full border border-white/15 bg-black/35 px-4 py-2 text-sm font-semibold text-white">
            Current balance: {coins.toLocaleString()} coins
          </div>
        </div>

        <div className="grid gap-3 p-5 sm:grid-cols-3">
          {coinPackages.map((pack) => (
            <motion.button
              key={pack.label}
              type="button"
              whileHover={{ y: -4, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => buyPackage(pack)}
              className="group rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-left transition hover:border-rose-300/60 hover:bg-white/[0.07]"
            >
              <p className="text-xs uppercase tracking-[0.22em] text-rose-100">{pack.badge}</p>
              <h3 className="mt-2 text-xl font-semibold text-white">{pack.amount.toLocaleString()} coins</h3>
              <p className="mt-1 text-sm text-slate-300">{pack.price}</p>
              <span className="mt-4 inline-flex rounded-full bg-gradient-to-r from-rose-500 via-red-500 to-orange-400 px-4 py-2 text-sm font-semibold text-white shadow-[0_0_20px_rgba(244,63,94,0.25)]">
                Buy now
              </span>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
