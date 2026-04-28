import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ColorVariant {
  name: string
  color: string
  glowColor: string
}

interface CoinWithColors {
  id: string
  label: string
  colors: ColorVariant[]
}

interface SelectionSpinnerWithColorsProps {
  coins?: CoinWithColors[]
  onSelect?: (coinId: string, colorName: string) => void
  selectedCoinId?: string
}

const defaultCoins: CoinWithColors[] = [
  {
    id: 'nitro',
    label: 'Nitro',
    colors: [
      { name: 'Flame', color: 'from-red-500 to-rose-500', glowColor: 'shadow-red-500/60' },
      { name: 'Blaze', color: 'from-orange-500 to-amber-600', glowColor: 'shadow-orange-500/60' },
      { name: 'Inferno', color: 'from-red-600 to-red-700', glowColor: 'shadow-red-600/60' },
    ],
  },
  {
    id: 'turbo',
    label: 'Turbo',
    colors: [
      { name: 'Sky', color: 'from-cyan-400 to-blue-500', glowColor: 'shadow-cyan-400/60' },
      { name: 'Ocean', color: 'from-blue-500 to-indigo-600', glowColor: 'shadow-blue-500/60' },
      { name: 'Frost', color: 'from-cyan-300 to-blue-300', glowColor: 'shadow-cyan-300/60' },
    ],
  },
  {
    id: 'plasma',
    label: 'Plasma',
    colors: [
      { name: 'Volt', color: 'from-purple-500 to-pink-500', glowColor: 'shadow-purple-500/60' },
      { name: 'Neon', color: 'from-pink-500 to-purple-600', glowColor: 'shadow-pink-500/60' },
      { name: 'Cosmic', color: 'from-violet-600 to-purple-700', glowColor: 'shadow-violet-600/60' },
    ],
  },
  {
    id: 'quantum',
    label: 'Quantum',
    colors: [
      { name: 'Lime', color: 'from-lime-400 to-green-500', glowColor: 'shadow-lime-400/60' },
      { name: 'Emerald', color: 'from-emerald-500 to-teal-600', glowColor: 'shadow-emerald-500/60' },
      { name: 'Neon Green', color: 'from-green-400 to-lime-300', glowColor: 'shadow-green-400/60' },
    ],
  },
  {
    id: 'apex',
    label: 'Apex',
    colors: [
      { name: 'Gold', color: 'from-yellow-400 to-amber-500', glowColor: 'shadow-yellow-400/60' },
      { name: 'Solar', color: 'from-amber-500 to-orange-500', glowColor: 'shadow-amber-500/60' },
      { name: 'Radiant', color: 'from-yellow-500 to-yellow-600', glowColor: 'shadow-yellow-500/60' },
    ],
  },
]

export const SelectionSpinnerWithColors = ({
  coins = defaultCoins,
  onSelect,
  selectedCoinId,
}: SelectionSpinnerWithColorsProps) => {
  const [selectedCoin, setSelectedCoin] = useState<string>(selectedCoinId || coins[0]?.id || '')
  const [selectedColorIndex, setSelectedColorIndex] = useState<number>(0)
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const currentCoin = coins.find((c) => c.id === selectedCoin)
  const currentColor = currentCoin?.colors[selectedColorIndex]

  const handleSelectCoin = (coinId: string) => {
    setSelectedCoin(coinId)
    setSelectedColorIndex(0)
  }

  const handleSelectColor = (colorIndex: number) => {
    setSelectedColorIndex(colorIndex)
    if (currentCoin) {
      onSelect?.(selectedCoin, currentCoin.colors[colorIndex].name)
    }
  }

  const isSelected = (coinId: string) => selectedCoin === coinId
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
        <motion.div className="relative h-[700px] w-[320px]">
          {/* Glassmorphic container */}
          <div className="absolute inset-0 rounded-3xl border border-white/20 bg-white/5 shadow-2xl backdrop-blur-xl" />

          {/* Content */}
          <div className="relative flex h-full flex-col items-center justify-between p-8">
            {/* Title */}
            <div className="text-center space-y-1">
              <h2 className="font-display text-xl font-bold text-white">Select Power</h2>
              <p className="text-xs uppercase tracking-[0.2em] text-rose-100">
                {selectedCoin && coins.find((c) => c.id === selectedCoin)?.label}
              </p>
            </div>

            {/* Spinner ring container */}
            <div className="relative flex h-80 w-full items-center justify-center">
              {/* Background circle grid */}
              <div className="absolute inset-0 rounded-full border border-white/10 opacity-30" />
              <div className="absolute inset-6 rounded-full border border-white/5" />

              {/* Coins arranged in a circle */}
              <div className="relative h-full w-full">
                {coins.map((coin, index) => {
                  const angle = (index / coins.length) * Math.PI * 2
                  const radius = 100
                  const x = Math.cos(angle - Math.PI / 2) * radius
                  const y = Math.sin(angle - Math.PI / 2) * radius

                  const selected_ = isSelected(coin.id)
                  const hovered = isHovered(coin.id)
                  const coinColor = coin.colors[0] // Default to first color for preview

                  return (
                    <motion.button
                      key={coin.id}
                      className={`group absolute h-20 w-20 rounded-full bg-gradient-to-br ${coinColor.color} transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50`}
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
                      onClick={() => handleSelectCoin(coin.id)}
                      aria-label={`Select ${coin.label}`}
                      aria-pressed={selected_}
                    >
                      {/* Coin glow ring */}
                      <motion.div
                        className={`absolute inset-0 rounded-full border-2 border-white/50 ${coinColor.glowColor}`}
                        initial={false}
                        animate={{
                          opacity: selected_ ? 0.8 : hovered ? 0.5 : 0.2,
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
                          className={`absolute inset-0 rounded-full border-2 border-white/40 ${coinColor.glowColor}`}
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

            {/* Color selector */}
            <AnimatePresence mode="wait">
              {currentCoin && (
                <motion.div
                  key={selectedCoin}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="w-full space-y-2"
                >
                  <p className="text-xs text-center uppercase tracking-[0.2em] text-slate-300">
                    Choose Color
                  </p>
                  <div className="flex gap-2 justify-center">
                    {currentCoin.colors.map((colorVariant, idx) => (
                      <motion.button
                        key={idx}
                        className={`relative h-12 w-12 rounded-full bg-gradient-to-br ${colorVariant.color} border-2 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50`}
                        style={{
                          borderColor:
                            selectedColorIndex === idx ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.2)',
                        }}
                        animate={{
                          scale: selectedColorIndex === idx ? 1.1 : 0.95,
                        }}
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 1 }}
                        onClick={() => handleSelectColor(idx)}
                        title={colorVariant.name}
                        aria-label={`Select ${colorVariant.name} color`}
                      >
                        {selectedColorIndex === idx && (
                          <motion.div
                            className={`absolute inset-0 rounded-full border-2 border-white/60 ${colorVariant.glowColor}`}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1.2, opacity: 0.6 }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                            }}
                          />
                        )}
                      </motion.button>
                    ))}
                  </div>
                  <p className="text-xs text-center text-rose-100">
                    {currentCoin.colors[selectedColorIndex]?.name}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Info display */}
            <motion.div
              key={`${selectedCoin}-${selectedColorIndex}`}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 backdrop-blur text-center"
            >
              <p className="text-xs text-slate-300">
                <span className="font-semibold text-white">{currentCoin?.label}</span>
                <span className="text-white/60"> • </span>
                <span className="font-semibold text-rose-200">{currentColor?.name}</span>
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default SelectionSpinnerWithColors
