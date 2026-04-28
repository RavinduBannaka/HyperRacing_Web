import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { PageShell } from '../components/PageShell'
import { GlowCard } from '../components/GlowCard'
import { BuyCoinsModal } from '../components/BuyCoinsModal'
import { useGame } from '../context/GameContext'

const spinBg =
  'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=2100&q=80&sat=-12'

const SPIN_COST = 120
const FULL_ROTATIONS = 5

type WheelReward = {
  id: string
  label: string
  shortLabel: string
  type: 'coins' | 'skin' | 'map'
  coins?: number
  colorName: string
  gradient: string
  glow: string
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
    gradient: 'from-red-600 via-rose-500 to-orange-500',
    glow: 'shadow-red-500/40',
    description: 'Instant coin payout added to your balance.',
  },
  {
    id: 'spin-blue-car-skin',
    label: 'Car Skin',
    shortLabel: 'Skin',
    type: 'skin',
    colorName: 'Blue',
    gradient: 'from-cyan-400 via-blue-500 to-slate-300',
    glow: 'shadow-cyan-400/40',
    description: 'Unlocks a premium neon car skin in your garage.',
  },
  {
    id: 'spin-gold-premium-map',
    label: 'Premium Map',
    shortLabel: 'Map',
    type: 'map',
    colorName: 'Gold',
    gradient: 'from-amber-300 via-yellow-500 to-stone-200',
    glow: 'shadow-amber-300/40',
    description: 'Adds a premium night circuit to your map vault.',
  },
]

export const SpinWheel = () => {
  const { coins, spinWheel, spins, inventory, maps } = useGame()
  const [rotation, setRotation] = useState(0)
  const [spinning, setSpinning] = useState(false)
  const [message, setMessage] = useState('')
  const [pendingReward, setPendingReward] = useState<WheelReward | null>(null)
  const [result, setResult] = useState<WheelReward | null>(null)
  const [showCoinModal, setShowCoinModal] = useState(false)

  const segmentAngle = 360 / rewards.length

  const wheelBackground = useMemo(
    () =>
      'conic-gradient(from -60deg, #dc2626 0deg 120deg, #0284c7 120deg 240deg, #f59e0b 240deg 360deg)',
    [],
  )

  const spin = () => {
    if (spinning) return

    if (coins < SPIN_COST) {
      setMessage('Not enough coins. Please buy coins to spin.')
      setShowCoinModal(true)
      return
    }

    const winningIndex = Math.floor(Math.random() * rewards.length)
    const reward = rewards[winningIndex]
    const segmentCenter = winningIndex * segmentAngle
    const nextRotation = rotation + FULL_ROTATIONS * 360 + (360 - segmentCenter)

    setMessage('')
    setResult(null)
    setPendingReward(reward)
    setSpinning(true)
    setRotation(nextRotation)
  }

  const finishSpin = () => {
    if (!pendingReward) return

    spinWheel(pendingReward, SPIN_COST)
    setResult(pendingReward)
    setMessage(`${pendingReward.colorName} selected: ${pendingReward.label}`)
    setPendingReward(null)
    setSpinning(false)
  }

  return (
    <PageShell
      eyebrow="Rewards"
      title="Spin Wheel"
      subtitle="Spend coins, hit the neon wheel, and unlock coins, skins, or premium maps for your racer account."
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

      <div className="mt-6 grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="relative flex min-h-[520px] flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-black/55 p-5 shadow-[0_0_80px_rgba(244,63,94,0.14)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(244,63,94,0.16),transparent_45%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent)]" />
          <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-slate-300/30 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 h-16 rounded-full bg-rose-500/10 blur-3xl" />

          <div className="relative flex items-center justify-center">
            <div className="absolute -top-3 z-20 h-12 w-8 rounded-b-full bg-gradient-to-b from-slate-100 via-rose-200 to-red-500 shadow-[0_0_30px_rgba(244,63,94,0.7)]" />
            <div className="absolute inset-[-34px] rounded-full border border-rose-300/15 bg-rose-500/10 blur-2xl" />
            <motion.div
              animate={{ rotate: rotation }}
              transition={{ duration: 3.2, ease: [0.12, 0.72, 0.18, 1] }}
              onAnimationComplete={finishSpin}
              className="relative h-72 w-72 rounded-full border-[10px] border-slate-200/20 shadow-[0_0_65px_rgba(244,63,94,0.35)] sm:h-96 sm:w-96"
              style={{ background: wheelBackground }}
            >
              <div className="absolute inset-4 rounded-full border border-black/45" />
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,transparent_0_34%,rgba(0,0,0,0.2)_35%,transparent_36%)]" />
              {rewards.map((reward, index) => {
                const angle = index * segmentAngle
                return (
                  <div
                    key={reward.id}
                    className="absolute left-1/2 top-1/2 flex h-1/2 w-24 origin-top -translate-x-1/2 justify-center pt-8 text-center sm:w-28 sm:pt-10"
                    style={{ transform: `rotate(${angle}deg)` }}
                  >
                    <div className="flex flex-col items-center gap-1 text-white" style={{ transform: `rotate(${-angle}deg)` }}>
                      <span className={`rounded-full bg-gradient-to-r ${reward.gradient} px-3 py-1 text-xs font-bold uppercase shadow-lg ${reward.glow}`}>
                        {reward.colorName}
                      </span>
                      <span className="text-sm font-semibold drop-shadow">{reward.shortLabel}</span>
                    </div>
                  </div>
                )
              })}
              <div className="absolute left-1/2 top-1/2 grid h-24 w-24 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/25 bg-black/80 text-center shadow-[0_0_30px_rgba(255,255,255,0.15)]">
                <span className="text-xs font-semibold uppercase tracking-[0.22em] text-rose-100">Hyper</span>
              </div>
            </motion.div>
          </div>

          <div className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-3">
            <motion.button
              type="button"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              disabled={spinning}
              onClick={spin}
              className="neon-button rounded-full bg-gradient-to-r from-rose-600 via-red-500 to-orange-400 px-8 py-3 text-sm font-bold uppercase tracking-[0.18em] text-white shadow-[0_0_35px_rgba(244,63,94,0.45)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {spinning ? 'Spinning...' : 'Spin'}
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
                className={`relative z-10 mt-6 rounded-2xl border border-white/15 bg-gradient-to-r ${result.gradient} p-[1px] shadow-2xl ${result.glow}`}
              >
                <div className="rounded-2xl bg-black/75 px-6 py-4 text-center backdrop-blur">
                  <p className="text-xs uppercase tracking-[0.24em] text-rose-100">Reward selected</p>
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
                className="relative z-10 mt-5 rounded-full border border-rose-300/30 bg-rose-500/10 px-4 py-2 text-sm text-rose-100"
              >
                {message}
              </motion.p>
            ) : null}
          </AnimatePresence>
        </section>

        <div className="space-y-5">
          <GlowCard eyebrow="Wheel Sections" title="Possible Rewards" tone="warning">
            <div className="space-y-3">
              {rewards.map((reward) => (
                <div key={reward.id} className="rounded-2xl border border-white/10 bg-white/5 p-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className={`h-10 w-10 rounded-full bg-gradient-to-br ${reward.gradient} shadow-lg ${reward.glow}`} />
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
