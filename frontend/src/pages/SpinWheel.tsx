import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { PageShell } from '../components/PageShell'
import { GlowCard } from '../components/GlowCard'
import { BuyCoinsModal } from '../components/BuyCoinsModal'
import { useGame } from '../context/GameContext'

const spinBg =
  'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=2100&q=80&sat=-12'

const SPIN_COST = 15
const CARD_WIDTH = 156
const CARD_GAP = 16
const SPIN_ROUNDS = 6

type RewardId = 'spin-red-100-coins' | 'spin-blue-car-skin' | 'spin-gold-premium-map'

type WheelReward = {
  id: RewardId
  label: string
  shortLabel: string
  type: 'coins' | 'skin' | 'map'
  coins?: number
  colorName: string
  color: string
  description: string
}

const rewards: WheelReward[] = [
  {
    id: 'spin-red-100-coins',
    label: '100 coins',
    shortLabel: '+100',
    type: 'coins',
    coins: 100,
    colorName: 'Red',
    color: '#ef4444',
    description: 'Instant coin payout added to your balance.',
  },
  {
    id: 'spin-blue-car-skin',
    label: 'Car Skin',
    shortLabel: 'Skin',
    type: 'skin',
    colorName: 'Blue',
    color: '#2563eb',
    description: 'Unlocks a premium neon car skin in your garage.',
  },
  {
    id: 'spin-gold-premium-map',
    label: 'Premium Map',
    shortLabel: 'Map',
    type: 'map',
    colorName: 'Gold',
    color: '#f59e0b',
    description: 'Adds a premium night circuit to your map vault.',
  },
]

const colorToGlow = (color: string) => `0 0 28px ${color}66`

export const SpinWheel = () => {
  const { coins, spinWheel, spins, inventory, maps } = useGame()
  const [spinning, setSpinning] = useState(false)
  const [message, setMessage] = useState('')
  const [pendingReward, setPendingReward] = useState<WheelReward | null>(null)
  const [result, setResult] = useState<WheelReward | null>(null)
  const [showCoinModal, setShowCoinModal] = useState(false)
  const [trackOffset, setTrackOffset] = useState(0)
  const [spinKey, setSpinKey] = useState(0)

  const crateItems = useMemo(() => {
    return Array.from({ length: 36 }, (_, index) => rewards[index % rewards.length])
  }, [])

  const spin = () => {
    if (spinning) return

    if (coins < SPIN_COST) {
      setMessage('Not enough coins. Please buy coins to spin.')
      setShowCoinModal(true)
      return
    }

    const winningIndex = Math.floor(Math.random() * rewards.length)
    const reward = rewards[winningIndex]
    const itemStep = CARD_WIDTH + CARD_GAP
    const targetIndex = SPIN_ROUNDS * rewards.length + winningIndex
    const centerOffset = CARD_WIDTH / 2
    const nextOffset = -(targetIndex * itemStep) + centerOffset

    setMessage('')
    setResult(null)
    setPendingReward(reward)
    setSpinning(true)
    setSpinKey((current) => current + 1)
    setTrackOffset(nextOffset)
  }

  const finishSpin = () => {
    if (!pendingReward) return

    spinWheel(pendingReward, SPIN_COST)
    setResult(pendingReward)
    setMessage(`${pendingReward.colorName} crate selected: ${pendingReward.label}`)
    setPendingReward(null)
    setSpinning(false)
  }

  return (
    <PageShell
      eyebrow="Rewards"
      title="Hyper Reward Drop"
      subtitle="Spend 15 coins, launch the reward drop, and reveal coins, skins, or premium maps."
      backgroundImage={spinBg}
    >
      <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        <GlowCard eyebrow="Wallet" title="Coin Balance" tone="info">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-4xl font-semibold text-white">{coins.toLocaleString()}</p>
              <p className="mt-1 text-sm text-slate-300">{SPIN_COST} coins per spin</p>
            </div>
            <motion.button
              type="button"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setShowCoinModal(true)}
              className="neon-button rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:border-rose-200/60"
            >
              Buy Coins
            </motion.button>
          </div>
        </GlowCard>

        <GlowCard eyebrow="Account Rewards" title="Unlocked Assets" tone="success">
          <div className="grid gap-3 text-sm text-slate-200 sm:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-white/5 p-3">
              <p className="text-xs uppercase tracking-[0.22em] text-rose-100">Skins and cards</p>
              <p className="mt-1 text-2xl font-semibold text-white">{inventory.length}</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-3">
              <p className="text-xs uppercase tracking-[0.22em] text-rose-100">Maps</p>
              <p className="mt-1 text-2xl font-semibold text-white">{maps.length}</p>
            </div>
          </div>
        </GlowCard>
      </div>

      <div className="mt-6 grid items-start gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/65 p-5 shadow-[0_0_80px_rgba(244,63,94,0.14)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(244,63,94,0.2),transparent_48%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent)]" />
          <div className="absolute inset-x-8 top-10 h-px bg-gradient-to-r from-transparent via-amber-200/60 to-transparent" />

          <div className="relative">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-amber-100">Reward Drop</p>
                <h2 className="text-2xl font-semibold text-white">Hyper Racing Lucky Spin</h2>
              </div>
              <span className="rounded-full border border-amber-200/30 bg-amber-300/10 px-4 py-2 text-sm font-semibold text-amber-100">
                Cost: {SPIN_COST} coins
              </span>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#09090b] px-4 py-8 shadow-inner">
              <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#09090b] to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#09090b] to-transparent" />
              <div className="pointer-events-none absolute left-1/2 top-0 z-20 h-full w-[3px] -translate-x-1/2 bg-gradient-to-b from-transparent via-amber-200 to-transparent shadow-[0_0_30px_rgba(251,191,36,0.9)]" />
              <div className="pointer-events-none absolute left-1/2 top-2 z-20 -translate-x-1/2 rounded-b-lg bg-gradient-to-b from-amber-100 to-orange-500 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-black">
                Win
              </div>

              <motion.div
                key={spinKey}
                className="flex items-center gap-4"
                initial={{ x: 0 }}
                animate={{ x: trackOffset }}
                transition={{ duration: 3.6, ease: [0.12, 0.72, 0.12, 1] }}
                onAnimationComplete={finishSpin}
              >
                {crateItems.map((reward, index) => (
                  <div
                    key={`${reward.id}-${index}`}
                    className="relative h-44 shrink-0 rounded-2xl border border-white/10 bg-white/[0.04] p-3"
                    style={{
                      width: CARD_WIDTH,
                      boxShadow: colorToGlow(reward.color),
                    }}
                  >
                    <div
                      className="absolute inset-0 rounded-2xl opacity-20"
                      style={{ background: `radial-gradient(circle at top, ${reward.color}, transparent 60%)` }}
                    />
                    <div className="relative flex h-full flex-col justify-between">
                      <div
                        className="grid h-16 w-16 place-items-center rounded-xl border border-white/15 text-lg font-black text-white"
                        style={{ backgroundColor: reward.color, boxShadow: colorToGlow(reward.color) }}
                      >
                        {reward.shortLabel}
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-slate-300">{reward.colorName}</p>
                        <h3 className="mt-1 text-lg font-semibold text-white">{reward.label}</h3>
                        <p className="mt-1 text-xs uppercase tracking-[0.18em] text-amber-100">{reward.type}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          <div className="relative z-10 mt-6 flex flex-wrap items-center justify-center gap-3">
            <motion.button
              type="button"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              disabled={spinning}
              onClick={spin}
              className="neon-button rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 px-8 py-3 text-sm font-black uppercase tracking-[0.18em] text-white shadow-[0_0_35px_rgba(251,191,36,0.35)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {spinning ? 'Launching drop...' : `Launch drop - ${SPIN_COST} coins`}
            </motion.button>
            <button
              type="button"
              onClick={() => setShowCoinModal(true)}
              className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-slate-200/50 hover:bg-white/10"
            >
              Buy Coins
            </button>
          </div>

          <AnimatePresence mode="wait">
            {result ? (
              <motion.div
                key={result.id}
                initial={{ opacity: 0, y: 16, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                className="relative z-10 mx-auto mt-6 max-w-lg rounded-2xl border border-amber-200/30 bg-black/70 p-[1px] shadow-[0_0_45px_rgba(251,191,36,0.25)]"
              >
                <div className="rounded-2xl px-6 py-4 text-center backdrop-blur" style={{ background: `linear-gradient(135deg, ${result.color}44, rgba(0,0,0,0.78))` }}>
                  <p className="text-xs uppercase tracking-[0.24em] text-amber-100">Crate reward selected</p>
                  <h3 className="mt-1 text-2xl font-semibold text-white">{result.label}</h3>
                  <p className="mt-1 text-sm text-slate-200">{result.description}</p>
                </div>
              </motion.div>
            ) : message ? (
              <motion.p
                key={message}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="relative z-10 mt-5 rounded-full border border-rose-300/30 bg-rose-500/10 px-4 py-2 text-center text-sm text-rose-100"
              >
                {message}
              </motion.p>
            ) : null}
          </AnimatePresence>
        </section>

        <div className="space-y-5">
          <GlowCard eyebrow="Crate Items" title="Possible Rewards" tone="warning">
            <div className="space-y-3">
              {rewards.map((reward) => (
                <div key={reward.id} className="rounded-2xl border border-white/10 bg-white/5 p-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span
                        className="grid h-12 w-12 place-items-center rounded-xl border border-white/20 text-xs font-black text-white shadow-lg"
                        style={{
                          backgroundColor: reward.color,
                          boxShadow: colorToGlow(reward.color),
                        }}
                      >
                        {reward.shortLabel}
                      </span>
                      <div>
                        <p className="font-semibold text-white">{reward.colorName}: {reward.label}</p>
                        <p className="text-sm text-slate-300">{reward.description}</p>
                      </div>
                    </div>
                    <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.16em] text-white">
                      {reward.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </GlowCard>

          <GlowCard eyebrow="Latest Pulls" title="Recent Spin Results" tone="default">
            <div className="space-y-2 text-sm text-slate-200">
              {spins.slice(0, 5).map((spin) => (
                <div key={spin.id} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                  <div>
                    <p className="font-semibold text-white">{spin.reward}</p>
                    <p className="text-xs uppercase tracking-[0.2em] text-rose-100">{spin.rarity}</p>
                  </div>
                  <span className={spin.coins > 0 ? 'text-emerald-200' : 'text-slate-300'}>
                    {spin.coins > 0 ? `+${spin.coins} c` : 'Unlocked'}
                  </span>
                </div>
              ))}
            </div>
          </GlowCard>
        </div>
      </div>

      <AnimatePresence>
        {showCoinModal ? <BuyCoinsModal open={showCoinModal} onClose={() => setShowCoinModal(false)} /> : null}
      </AnimatePresence>
    </PageShell>
  )
}
