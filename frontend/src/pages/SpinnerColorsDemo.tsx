import { useState } from 'react'
import { SelectionSpinnerWithColors } from '../components/SelectionSpinnerWithColors'

export const SpinnerColorsDemo = () => {
  const [selectedCoin, setSelectedCoin] = useState<string>('nitro')
  const [selectedColor, setSelectedColor] = useState<string>('Flame')

  const handleSelection = (coinId: string, colorName: string) => {
    setSelectedCoin(coinId)
    setSelectedColor(colorName)
  }

  return (
    <div className="w-full">
      <SelectionSpinnerWithColors
        selectedCoinId={selectedCoin}
        onSelect={handleSelection}
      />

      {/* Display selection info */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-20 rounded-lg border border-white/20 bg-black/80 px-6 py-3 backdrop-blur text-sm">
        <p className="text-slate-300">
          Coin: <span className="font-bold text-white">{selectedCoin}</span>
          <span className="text-white/40 mx-2">•</span>
          Color: <span className="font-bold text-rose-200">{selectedColor}</span>
        </p>
      </div>
    </div>
  )
}

export default SpinnerColorsDemo
