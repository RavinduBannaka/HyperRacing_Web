import { useState } from 'react'
import { SelectionSpinner } from '../components/SelectionSpinner'

// Configuration 1: Racing Power-ups
const racingCoins = [
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
]

// Configuration 2: Car Attributes
const attributeCoins = [
  {
    id: 'speed',
    label: 'Speed',
    color: 'from-red-500 to-orange-500',
    glowColor: 'shadow-red-500/60',
  },
  {
    id: 'handling',
    label: 'Handling',
    color: 'from-blue-500 to-cyan-500',
    glowColor: 'shadow-blue-500/60',
  },
  {
    id: 'acceleration',
    label: 'Acceleration',
    color: 'from-lime-400 to-green-500',
    glowColor: 'shadow-lime-400/60',
  },
  {
    id: 'durability',
    label: 'Durability',
    color: 'from-slate-400 to-gray-500',
    glowColor: 'shadow-slate-400/60',
  },
  {
    id: 'nitro',
    label: 'Nitro Capacity',
    color: 'from-purple-400 to-pink-500',
    glowColor: 'shadow-purple-500/60',
  },
]

// Configuration 3: Game Modes
const gameModeCoins = [
  {
    id: 'solo-race',
    label: 'Solo Race',
    color: 'from-yellow-400 to-amber-500',
    glowColor: 'shadow-yellow-400/60',
  },
  {
    id: 'drift-battle',
    label: 'Drift Battle',
    color: 'from-pink-500 to-red-500',
    glowColor: 'shadow-pink-500/60',
  },
  {
    id: 'team-rally',
    label: 'Team Rally',
    color: 'from-green-400 to-emerald-500',
    glowColor: 'shadow-green-500/60',
  },
  {
    id: 'time-trial',
    label: 'Time Trial',
    color: 'from-violet-500 to-purple-600',
    glowColor: 'shadow-violet-500/60',
  },
]

export const SpinnerDemo = () => {
  const [selected, setSelected] = useState<string>('nitro-boost')
  const [configMode, setConfigMode] = useState<'racing' | 'attributes' | 'gamemodes'>('racing')

  const getCoinsForMode = () => {
    switch (configMode) {
      case 'attributes':
        return attributeCoins
      case 'gamemodes':
        return gameModeCoins
      default:
        return racingCoins
    }
  }

  return (
    <div className="w-full">
      <SelectionSpinner
        coins={getCoinsForMode()}
        selectedId={selected}
        onSelect={setSelected}
      />

      {/* Config selector */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-20 flex gap-2 rounded-lg border border-white/20 bg-black/80 px-4 py-3 backdrop-blur">
        <button
          onClick={() => {
            setConfigMode('racing')
            setSelected('nitro-boost')
          }}
          className={`px-3 py-1 rounded-lg text-xs font-semibold uppercase tracking-wider transition ${
            configMode === 'racing'
              ? 'bg-rose-500/60 text-white'
              : 'bg-white/10 text-slate-300 hover:bg-white/20'
          }`}
        >
          🚗 Racing
        </button>
        <button
          onClick={() => {
            setConfigMode('attributes')
            setSelected('speed')
          }}
          className={`px-3 py-1 rounded-lg text-xs font-semibold uppercase tracking-wider transition ${
            configMode === 'attributes'
              ? 'bg-blue-500/60 text-white'
              : 'bg-white/10 text-slate-300 hover:bg-white/20'
          }`}
        >
          ⚙️ Attributes
        </button>
        <button
          onClick={() => {
            setConfigMode('gamemodes')
            setSelected('solo-race')
          }}
          className={`px-3 py-1 rounded-lg text-xs font-semibold uppercase tracking-wider transition ${
            configMode === 'gamemodes'
              ? 'bg-purple-500/60 text-white'
              : 'bg-white/10 text-slate-300 hover:bg-white/20'
          }`}
        >
          🎮 Game Modes
        </button>
      </div>

      {/* Selection display */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-20 rounded-lg border border-white/20 bg-black/80 px-6 py-3 backdrop-blur">
        <p className="text-xs text-slate-300">
          Selected:{' '}
          <span className="font-bold text-white">
            {getCoinsForMode().find((c) => c.id === selected)?.label}
          </span>
        </p>
      </div>
    </div>
  )
}

export default SpinnerDemo
