import { createContext, useContext, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { api, type AuthResponse, type UserData, setAuthToken } from '../services/api'

type UserProfile = {
  displayName: string
  age: number
  bio: string
  email: string
  avatar: string
  stats: {
    races: number
    wins: number
    spins: number
    cards: number
  }
}

type Transaction = {
  id: string
  type: 'coins' | 'spin' | 'card' | 'map'
  title: string
  amount: number
  coinsDelta: number
  timestamp: string
}

type Card = {
  id: string
  name: string
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary'
  price: number
  image: string
}

type MapPack = {
  id: string
  name: string
  region: string
  description: string
  tier: 'Standard' | 'Premium'
  category: 'Urban' | 'Night' | 'Desert' | 'Mountain' | 'Coastal' | 'Volcanic'
  rarity: 'Rare' | 'Epic' | 'Legendary' | 'Exclusive'
  price: number
  image: string
}

type Message = {
  id: string
  user: string
  avatar: string
  time: string
  content: string
}

type SpinResult = {
  id: string
  reward: string
  coins: number
  rarity: 'Bonus' | 'Rare' | 'Premium' | 'Special'
  timestamp: string
}

type SpinRewardPayload = {
  id: string
  label: string
  type: 'coins' | 'skin' | 'map'
  coins?: number
}

type GameContextShape = {
  user: UserProfile
  coins: number
  inventory: Card[]
  maps: MapPack[]
  messages: Message[]
  transactions: Transaction[]
  spins: SpinResult[]
  login: (email: string, password: string) => Promise<void>
  register: (data: { displayName: string; age: number; bio: string; email: string; password: string; avatar?: string }) => Promise<void>
  updateProfile: (payload: Partial<UserProfile>) => void
  purchaseCoins: (amount: number, label: string) => void
  buyCard: (card: Card) => void
  buyMapPack: (pack: MapPack) => void
  sendMessage: (content: string) => void
  spinWheel: (reward: SpinRewardPayload, cost: number) => SpinResult
}

const now = () => new Date().toISOString()

const starterCards: Card[] = [
  {
    id: 'vx-tempest',
    name: 'VX-09 Tempest',
    rarity: 'Epic',
    price: 1200,
    image:
      'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1400&q=80&sat=-12',
  },
  {
    id: 'phantom-gt',
    name: 'Phantom GT',
    rarity: 'Legendary',
    price: 2200,
    image:
      'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1400&q=80&sat=-10',
  },
  {
    id: 'nova-r',
    name: 'Nova R',
    rarity: 'Rare',
    price: 800,
    image:
      'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1400&q=80&sat=-18',
  },
  {
    id: 'ion-vortex',
    name: 'ION Vortex',
    rarity: 'Common',
    price: 360,
    image:
      'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1200&q=80&sat=-10',
  },
]

const starterMaps: MapPack[] = [
  {
    id: 'neon-city',
    name: 'Neon City Circuit',
    region: 'Night sprint',
    description: 'Chromed skyscraper canyons, dynamic rain FX, tight chicanes lit by holo-ads.',
    tier: 'Premium',
    category: 'Urban',
    rarity: 'Exclusive',
    price: 480,
    image:
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1800&q=80&sat=-14',
  },
]

const defaultUser: UserProfile = {
  displayName: 'Ava “Driftline” Cole',
  age: 27,
  bio: 'Circuit analyst, night sprint addict, and telemetry tinkerer. Chasing clean lines + negative splits.',
  email: 'ava@hyper.gg',
  avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80',
  stats: {
    races: 184,
    wins: 72,
    spins: 24,
    cards: 8,
  },
}

const defaultMessages: Message[] = [
  {
    id: 'm-1',
    user: 'Ava “Driftline”',
    avatar: defaultUser.avatar,
    time: '21:04',
    content: 'Telemetry looks clean—apex entry is 2kph hotter tonight.',
  },
  {
    id: 'm-2',
    user: 'Rex “Turbo”',
    avatar: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=400&q=80',
    time: '21:06',
    content: 'Boost maps swapped. Expect harder shove in 3rd.',
  },
  {
    id: 'm-3',
    user: 'Lena “Nitro”',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80',
    time: '21:08',
    content: 'Lobby reset after quali. Invite sent.',
  },
]

const GameContext = createContext<GameContextShape | null>(null)

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile>(defaultUser)
  const [coins, setCoins] = useState(2400)
  const [inventory, setInventory] = useState<Card[]>(starterCards.slice(0, 2))
  const [maps, setMaps] = useState<MapPack[]>(starterMaps)
  const [messages, setMessages] = useState<Message[]>(defaultMessages)
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: 't-1', type: 'coins', title: 'Starter bonus', amount: 2000, coinsDelta: 2000, timestamp: now() },
    { id: 't-2', type: 'card', title: 'VX-09 Tempest', amount: 1200, coinsDelta: -1200, timestamp: now() },
    { id: 't-3', type: 'spin', title: 'Spin reward', amount: 180, coinsDelta: 180, timestamp: now() },
  ])
  const [spins, setSpins] = useState<SpinResult[]>([
    { id: 's-1', reward: 'Bonus 180 coins', coins: 180, rarity: 'Bonus', timestamp: now() },
    { id: 's-2', reward: 'Rare card skin', coins: 0, rarity: 'Rare', timestamp: now() },
  ])

  const login = async (email: string, password: string) => {
    const response = await api.auth.login({ email, password })
    const canUseLocalFallback =
      !response.success &&
      Boolean(response.error?.toLowerCase().includes('network') || response.error?.toLowerCase().includes('fetch'))

    if (!response.success && !canUseLocalFallback) {
      throw new Error(response.error || 'Login failed')
    }

    const authData = response.data as AuthResponse | undefined
    setAuthToken(authData?.token ?? `local-${crypto.randomUUID()}`)
    
    if (authData?.token) {
      const userResponse = await api.auth.me()
      if (userResponse.success && userResponse.data) {
      const userData = userResponse.data as UserData
      setUser((prev) => ({
        ...prev,
        email: userData.email,
        displayName: userData.displayName,
      }))
      setCoins(userData.coinBalance || 0)
      return
      }
    }
    
    setUser((prev) => ({ ...prev, email, displayName: authData?.user?.displayName ?? email.split('@')[0] ?? prev.displayName }))
  }

  const register = async (data: { displayName: string; age: number; bio: string; email: string; password: string; avatar?: string }) => {
    const response = await api.auth.register(data)
    const canUseLocalFallback =
      !response.success &&
      Boolean(response.error?.toLowerCase().includes('network') || response.error?.toLowerCase().includes('fetch'))

    if (!response.success && !canUseLocalFallback) {
      throw new Error(response.error || 'Registration failed')
    }

    const authData = response.data as AuthResponse | undefined
    setAuthToken(authData?.token ?? `local-${crypto.randomUUID()}`)
    setUser((prev) => ({
      ...prev,
      displayName: data.displayName,
      email: data.email,
      bio: data.bio,
      age: data.age,
      avatar: data.avatar || prev.avatar,
    }))
    setCoins(authData?.user?.coinBalance || 500)
  }

  const updateProfile = (payload: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...payload, stats: { ...prev.stats, ...(payload.stats ?? {}) } }))
  }

  const purchaseCoins = (amount: number, label: string) => {
    setCoins((c) => c + amount)
    setTransactions((tx) => [
      { id: crypto.randomUUID(), type: 'coins', title: label, amount, coinsDelta: amount, timestamp: now() },
      ...tx,
    ])
  }

  const buyCard = (card: Card) => {
    setCoins((c) => Math.max(0, c - card.price))
    setInventory((prev) => (prev.find((c) => c.id === card.id) ? prev : [...prev, card]))
    setTransactions((tx) => [
      { id: crypto.randomUUID(), type: 'card', title: card.name, amount: card.price, coinsDelta: -card.price, timestamp: now() },
      ...tx,
    ])
    setUser((prev) => ({ ...prev, stats: { ...prev.stats, cards: prev.stats.cards + 1 } }))
  }

  const buyMapPack = (pack: MapPack) => {
    setCoins((c) => Math.max(0, c - pack.price))
    setMaps((prev) => (prev.find((m) => m.id === pack.id) ? prev : [...prev, pack]))
    setTransactions((tx) => [
      { id: crypto.randomUUID(), type: 'map', title: pack.name, amount: pack.price, coinsDelta: -pack.price, timestamp: now() },
      ...tx,
    ])
  }

  const sendMessage = (content: string) => {
    if (!content.trim()) return
    const message: Message = {
      id: crypto.randomUUID(),
      user: user.displayName,
      avatar: user.avatar,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      content,
    }
    setMessages((msgs) => [...msgs, message])
  }

  const spinWheel = (reward: SpinRewardPayload, cost: number) => {
    const rewardCoins = reward.type === 'coins' ? reward.coins ?? 0 : 0
    const result: SpinResult = {
      id: crypto.randomUUID(),
      reward: reward.label,
      coins: rewardCoins,
      rarity: reward.type === 'coins' ? 'Bonus' : reward.type === 'map' ? 'Premium' : 'Rare',
      timestamp: now(),
    }

    setCoins((c) => Math.max(0, c - cost + rewardCoins))

    if (reward.type === 'skin') {
      const skinCard: Card = {
        id: reward.id,
        name: reward.label,
        rarity: 'Epic',
        price: 0,
        image: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1200&q=80&sat=-12',
      }
      setInventory((prev) => (prev.some((card) => card.id === skinCard.id) ? prev : [...prev, skinCard]))
    }

    if (reward.type === 'map') {
      const premiumMap: MapPack = {
        id: reward.id,
        name: reward.label,
        region: 'Reward Circuit',
        description: 'Premium map unlocked from the Hyper Racing spin wheel.',
        tier: 'Premium',
        category: 'Night',
        rarity: 'Legendary',
        price: 0,
        image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1800&q=80&sat=-14',
      }
      setMaps((prev) => (prev.some((map) => map.id === premiumMap.id) ? prev : [...prev, premiumMap]))
    }

    setSpins((s) => [{ ...result }, ...s])
    setTransactions((tx) => [
      { id: crypto.randomUUID(), type: 'spin', title: result.reward, amount: cost, coinsDelta: rewardCoins - cost, timestamp: now() },
      ...tx,
    ])
    setUser((prev) => ({ ...prev, stats: { ...prev.stats, spins: prev.stats.spins + 1 } }))
    return result
  }

  const value = useMemo(
    () => ({
      user,
      coins,
      inventory,
      maps,
      messages,
      transactions,
      spins,
      login,
      register,
      updateProfile,
      purchaseCoins,
      buyCard,
      buyMapPack,
      sendMessage,
      spinWheel,
    }),
    [user, coins, inventory, maps, messages, transactions, spins],
  )

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}

export const useGame = () => {
  const ctx = useContext(GameContext)
  if (!ctx) throw new Error('useGame must be used within GameProvider')
  return ctx
}
