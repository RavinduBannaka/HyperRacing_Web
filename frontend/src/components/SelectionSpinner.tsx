import { useState } from 'react'
import { motion } from 'framer-motion'

interface Coin {
  id: string
  label: string
  color: string
  glowColor: string
}

interface SelectionSpinnerProps {
  coins?: Coin[]
  onSelect?: (coinId: string) => void
  selectedId?: string
}

const defaultCoins: Coin[] = [
  {
    id: 'nitro-boost',
    label: 'Nitro Boost',
    color: 'from-red-500 to-rose-500',
    glowColor: 'shadow-red-500/60',
  },
  {
    id: 'turbo-charger',
    label: 'Turbo Charger',
    color: 'from-orange-400 to-amber-400',
    glowColor: 'shadow-orange-400/60',
  },
  {
    id: 'quantum-speed',
    label: 'Quantum Speed',
    color: 'from-cyan-400 to-blue-500',
    glowColor: 'shadow-cyan-400/60',
  },
  {
    id: 'plasma-drive',
    label: 'Plasma Drive',
    color: 'from-purple-500 to-pink-500',
    glowColor: 'shadow-purple-500/60',
  },
  {
    id: 'hyper-surge',
    label: 'Hyper Surge',
    color: 'from-emerald-400 to-green-500',
    glowColor: 'shadow-emerald-400/60',
  },
  {
    id: 'apex-force',
    label: 'Apex Force',
    color: 'from-yellow-400 to-lime-400',
    glowColor: 'shadow-yellow-400/60',
  },
]

export const SelectionSpinner = ({
  coins = defaultCoins,
  onSelect,
  selectedId,
}: SelectionSpinnerProps) => {
  const [selected, setSelected] = useState<string>(selectedId || coins[0]?.id || '')
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const handleSelect = (coinId: string) => {
    setSelected(coinId)
    onSelect?.(coinId)
  }

  const isSelected = (coinId: string) => selected === coinId
  const isHovered = (coinId: string) => hoveredId === coinId

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-black px-6">
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/4 h-96 w-96 rounded-full bg-rose-500/10 blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl" />
      </div>

      {/* Main container */}
      <div className="relative z-10 flex items-center justify-center">
        <motion.div className="relative h-[600px] w-[280px]">
          {/* Glassmorphic container */}
          <div className="absolute inset-0 rounded-3xl border border-white/20 bg-white/5 shadow-2xl backdrop-blur-xl" />

          {/* Content */}
          <div className="relative flex h-full flex-col items-center justify-center gap-8 p-8">
            {/* Title */}
            <div className="text-center space-y-1">
              <h2 className="font-display text-xl font-bold text-white">Select Power</h2>
              <p className="text-xs uppercase tracking-[0.2em] text-rose-100">
                {selected && coins.find((c) => c.id === selected)?.label}
              </p>
            </div>

            {/* Spinner ring container */}
            <div className="relative flex h-80 w-full items-center justify-center">
              {/* Background circle grid */}
              <div className="absolute inset-0 rounded-full border border-white/10 opacity-30" />
              <div className="absolute inset-6 rounded-full border border-white/5" />

              {/* Coins arranged in a circle or vertical stack */}
              <div className="relative h-full w-full">
                {coins.map((coin, index) => {
                  const angle = (index / coins.length) * Math.PI * 2
                  const radius = 100
                  const x = Math.cos(angle - Math.PI / 2) * radius
                  const y = Math.sin(angle - Math.PI / 2) * radius

                  const selected_ = isSelected(coin.id)
                  const hovered = isHovered(coin.id)

                  return (
                    <motion.button
                      key={coin.id}
                      className={`group absolute h-20 w-20 rounded-full bg-gradient-to-br ${coin.color} transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50`}
                      style={{
                        left: '50%',
                        top: '50%',
                        x: x,
                        y: y,
                      }}
                      initial={false}
                      animate={{
                        scale: selected_ ? 1.3 : hovered ? 1.15 : 1,
                        opacity: selected_ ? 1 : hovered ? 0.9 : 0.6,
                        filter: selected_
                          ? 'brightness(1.2) drop-shadow(0 0 20px rgba(255,255,255,0.4))'
                          : hovered
                            ? 'brightness(1.1) drop-shadow(0 0 12px rgba(255,255,255,0.2))'
                            : 'brightness(0.8) drop-shadow(0 0 8px rgba(0,0,0,0.5))',
                      }}
                      transition={{
                        type: 'spring',
                        stiffness: 300,
                        damping: 20,
                      }}
                      whileTap={{ scale: selected_ ? 1.35 : 1.2 }}
                      onMouseEnter={() => setHoveredId(coin.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      onClick={() => handleSelect(coin.id)}
                      aria-label={`Select ${coin.label}`}
                      aria-pressed={selected_}
                    >
                      {/* Coin glow ring */}
                      <motion.div
                        className={`absolute inset-0 rounded-full border-2 border-white/50 ${coin.glowColor}`}
                        initial={false}
                        animate={{
                          opacity: selected_ ? 0.8 : hovered ? 0.5 : 0.2,
                          boxShadow: selected_
                            ? `0 0 30px ${coin.glowColor.replace('shadow-', 'rgba(').replace('/50', ', 0.7)')}`
                            : hovered
                              ? `0 0 16px ${coin.glowColor.replace('shadow-', 'rgba(').replace('/50', ', 0.5)')}`
                              : `0 0 8px ${coin.glowColor.replace('shadow-', 'rgba(').replace('/50', ', 0.2)')}`,
                        }}
                        transition={{ duration: 0.3 }}
                      />

                      {/* Coin content */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div
                          className={`h-8 w-8 rounded-full bg-white/20 transition-all duration-300 ${
                            selected_ ? 'scale-100 opacity-100' : 'scale-75 opacity-60'
                          }`}
                        />
                      </div>

                      {/* Pulse animation for selected */}
                      {selected_ && (
                        <motion.div
                          className={`absolute inset-0 rounded-full border-2 border-white/40 ${coin.glowColor}`}
                          animate={{
                            scale: [1, 1.15, 1],
                            opacity: [0.8, 0, 0],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                          }}
                        />
                      )}
                    </motion.button>
                  )
                })}
              </div>
            </div>

            {/* Info display */}
            <motion.div
              key={selected}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 backdrop-blur text-center"
            >
              <p className="text-xs text-slate-300">
                <span className="font-semibold text-white">
                  {coins.find((c) => c.id === selected)?.label}
                </span>{' '}
                activated
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default SelectionSpinner
