import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import mapAsset from '../assets/maps/hyper-racing-track-map.svg'

type TrackStatus = 'Unlocked' | 'Locked'
type TrackType = 'Drift' | 'Speed' | 'Circuit' | 'Pit'
type Filter = 'all' | 'unlocked' | 'locked' | 'drift' | 'speed'

type TrackLocation = {
  id: string
  name: string
  type: TrackType
  status: TrackStatus
  difficulty: string
  requiredCoins: number
  bestLap: string
  x: number
  y: number
  description: string
}

const trackLocations: TrackLocation[] = [
  {
    id: 'start-grid',
    name: 'Neon Grid Start',
    type: 'Circuit',
    status: 'Unlocked',
    difficulty: 'Pro',
    requiredCoins: 0,
    bestLap: '01:18.442',
    x: 18,
    y: 56,
    description: 'Start and finish sector with launch-control timing gates and grandstand lights.',
  },
  {
    id: 'redline-straight',
    name: 'Redline Straight',
    type: 'Speed',
    status: 'Unlocked',
    difficulty: 'Expert',
    requiredCoins: 0,
    bestLap: '00:24.180',
    x: 46,
    y: 27,
    description: 'A high-speed zone built for full-throttle slipstream battles.',
  },
  {
    id: 'apex-drift',
    name: 'Apex Drift Loop',
    type: 'Drift',
    status: 'Locked',
    difficulty: 'Elite',
    requiredCoins: 900,
    bestLap: '00:38.914',
    x: 38,
    y: 54,
    description: 'Sharp left-right transition zone with scoring gates for controlled slides.',
  },
  {
    id: 'silver-hairpin',
    name: 'Silver Hairpin',
    type: 'Drift',
    status: 'Unlocked',
    difficulty: 'Hard',
    requiredCoins: 0,
    bestLap: '00:31.206',
    x: 24,
    y: 68,
    description: 'Tight hairpin section that rewards braking discipline and throttle patience.',
  },
  {
    id: 'skyline-boost',
    name: 'Skyline Boost Zone',
    type: 'Speed',
    status: 'Locked',
    difficulty: 'Master',
    requiredCoins: 1200,
    bestLap: '00:21.650',
    x: 73,
    y: 45,
    description: 'Neon boost corridor with narrow exits and rapid elevation changes.',
  },
  {
    id: 'pit-command',
    name: 'Pit Command',
    type: 'Pit',
    status: 'Unlocked',
    difficulty: 'Support',
    requiredCoins: 0,
    bestLap: 'Service 08.4s',
    x: 82,
    y: 64,
    description: 'Repair, refuel, and swap tire compounds before the final attack sector.',
  },
]

const filters: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All Tracks' },
  { id: 'unlocked', label: 'Unlocked' },
  { id: 'locked', label: 'Locked' },
  { id: 'drift', label: 'Drift Tracks' },
  { id: 'speed', label: 'Speed Tracks' },
]

const mapStats = [
  { label: 'Route Length', value: '7.8 km' },
  { label: 'Turns', value: '18' },
  { label: 'Speed Zones', value: '2' },
  { label: 'Drift Zones', value: '2' },
]

const RacingMap = () => {
  const [filter, setFilter] = useState<Filter>('all')
  const [hoveredTrack, setHoveredTrack] = useState<TrackLocation | null>(null)
  const [activeTrack, setActiveTrack] = useState<TrackLocation>(trackLocations[0])
  const [modalTrack, setModalTrack] = useState<TrackLocation | null>(null)

  const filteredTracks = useMemo(() => {
    return trackLocations.filter((track) => {
      if (filter === 'unlocked') return track.status === 'Unlocked'
      if (filter === 'locked') return track.status === 'Locked'
      if (filter === 'drift') return track.type === 'Drift'
      if (filter === 'speed') return track.type === 'Speed'
      return true
    })
  }, [filter])

  const selectedTrack = hoveredTrack ?? activeTrack

  const selectTrack = (track: TrackLocation) => {
    setActiveTrack(track)
    setModalTrack(track)
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050608] px-5 py-10 text-slate-100 sm:px-8 lg:px-12">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(244,63,94,0.2),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(226,232,240,0.12),transparent_32%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-rose-300/60 to-transparent" />

      <div className="relative mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-rose-100">World Select</p>
            <h1 className="mt-2 font-display text-4xl text-white sm:text-5xl">Hyper Racing Track Map</h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300 sm:text-base">
              A premium neon circuit map with unlockable sectors, drift routes, speed zones, checkpoints, and pit command.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 shadow-[0_0_45px_rgba(244,63,94,0.12)]">
            <p className="text-xs uppercase tracking-[0.24em] text-rose-100">Track Status</p>
            <p className="mt-1 text-2xl font-semibold text-white">
              {trackLocations.filter((track) => track.status === 'Unlocked').length}/{trackLocations.length} unlocked
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {filters.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setFilter(item.id)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                filter === item.id
                  ? 'border-rose-300/70 bg-rose-500/20 text-white shadow-[0_0_24px_rgba(244,63,94,0.22)]'
                  : 'border-white/15 bg-white/5 text-slate-200 hover:border-rose-200/50 hover:bg-white/10'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[1.45fr_0.55fr]">
          <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/55 p-4 shadow-[0_0_80px_rgba(244,63,94,0.12)] sm:p-6">
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.06] via-transparent to-rose-500/[0.08]" />
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#07090d]">
              <img src={mapAsset} alt="Hyper Racing premium track map" className="block aspect-[16/10] w-full object-cover" />

              <div className="absolute inset-0">
                {filteredTracks.map((track) => (
                  <TrackMarker
                    key={track.id}
                    track={track}
                    active={activeTrack.id === track.id}
                    onClick={() => selectTrack(track)}
                    onMouseEnter={() => setHoveredTrack(track)}
                    onMouseLeave={() => setHoveredTrack(null)}
                  />
                ))}
              </div>

              <AnimatePresence>
                {hoveredTrack ? (
                  <motion.div
                    key={hoveredTrack.id}
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    className="pointer-events-none absolute left-4 top-4 max-w-xs rounded-2xl border border-white/15 bg-black/80 p-4 shadow-[0_0_35px_rgba(244,63,94,0.22)] backdrop-blur"
                  >
                    <p className="text-xs uppercase tracking-[0.22em] text-rose-100">{hoveredTrack.type} sector</p>
                    <h3 className="mt-1 text-lg font-semibold text-white">{hoveredTrack.name}</h3>
                    <p className="mt-1 text-sm text-slate-300">{hoveredTrack.description}</p>
                  </motion.div>
                ) : null}
              </AnimatePresence>

              <div className="absolute bottom-4 left-4 right-4 grid gap-3 sm:grid-cols-4">
                {mapStats.map((stat) => (
                  <div key={stat.label} className="rounded-xl border border-white/10 bg-black/60 px-3 py-2 backdrop-blur">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-rose-100">{stat.label}</p>
                    <p className="text-lg font-semibold text-white">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <aside className="space-y-5">
            <TrackDetails track={selectedTrack} onAction={() => setModalTrack(selectedTrack)} />

            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-[0_0_45px_rgba(244,63,94,0.1)]">
              <p className="text-xs uppercase tracking-[0.24em] text-rose-100">Track Locations</p>
              <div className="mt-4 space-y-3">
                {filteredTracks.map((track) => (
                  <button
                    key={track.id}
                    type="button"
                    onClick={() => setActiveTrack(track)}
                    className={`w-full rounded-2xl border p-3 text-left transition ${
                      activeTrack.id === track.id
                        ? 'border-rose-300/70 bg-rose-500/15'
                        : 'border-white/10 bg-white/5 hover:border-white/25 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-semibold text-white">{track.name}</span>
                      <span className={track.status === 'Unlocked' ? 'text-emerald-200' : 'text-rose-200'}>
                        {track.status}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-slate-300">{track.type} - {track.difficulty}</p>
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>

      <AnimatePresence>
        {modalTrack ? (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalTrack(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 14, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 14, opacity: 0 }}
              onClick={(event) => event.stopPropagation()}
              className="w-full max-w-lg rounded-3xl border border-white/15 bg-[#08090d] p-6 shadow-[0_0_70px_rgba(244,63,94,0.28)]"
            >
              <TrackDetails track={modalTrack} onAction={() => setModalTrack(null)} modal />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

type TrackMarkerProps = {
  track: TrackLocation
  active: boolean
  onClick: () => void
  onMouseEnter: () => void
  onMouseLeave: () => void
}

const TrackMarker = ({ track, active, onClick, onMouseEnter, onMouseLeave }: TrackMarkerProps) => {
  const unlocked = track.status === 'Unlocked'
  const isSpecial = track.type === 'Speed' || track.type === 'Drift'

  return (
    <motion.button
      type="button"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${track.x}%`, top: `${track.y}%` }}
      whileHover={{ scale: 1.16 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Open ${track.name}`}
    >
      <span
        className={`absolute inset-[-12px] rounded-full blur-md ${
          unlocked ? 'bg-rose-500/50' : 'bg-slate-300/35'
        } ${active ? 'opacity-100' : 'opacity-60'}`}
      />
      <span
        className={`relative grid h-11 w-11 place-items-center rounded-full border text-xs font-bold shadow-2xl ${
          unlocked
            ? 'border-rose-200/80 bg-rose-500 text-white shadow-rose-500/40'
            : 'border-slate-200/70 bg-slate-800 text-slate-100 shadow-slate-300/20'
        }`}
      >
        {track.status === 'Locked' ? 'L' : track.type.slice(0, 1)}
      </span>
      {isSpecial ? (
        <motion.span
          className="absolute inset-[-8px] rounded-full border border-white/30"
          animate={{ scale: [1, 1.55, 1], opacity: [0.7, 0, 0.7] }}
          transition={{ duration: 2.2, repeat: Infinity }}
        />
      ) : null}
    </motion.button>
  )
}

type TrackDetailsProps = {
  track: TrackLocation
  onAction: () => void
  modal?: boolean
}

const TrackDetails = ({ track, onAction, modal = false }: TrackDetailsProps) => {
  const unlocked = track.status === 'Unlocked'

  return (
    <div className={modal ? '' : 'rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-[0_0_45px_rgba(244,63,94,0.1)]'}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-rose-100">{track.type} location</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">{track.name}</h2>
        </div>
        <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${unlocked ? 'border-emerald-300/40 bg-emerald-400/10 text-emerald-100' : 'border-rose-300/40 bg-rose-500/10 text-rose-100'}`}>
          {track.status}
        </span>
      </div>

      <p className="mt-3 text-sm leading-6 text-slate-300">{track.description}</p>

      <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
        <InfoMetric label="Difficulty" value={track.difficulty} />
        <InfoMetric label="Required" value={track.requiredCoins ? `${track.requiredCoins.toLocaleString()} RS` : 'Free'} />
        <InfoMetric label="Best Lap" value={track.bestLap} />
        <InfoMetric label="Status" value={track.status} />
      </div>

      <motion.button
        type="button"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onAction}
        className="neon-button mt-5 w-full rounded-xl bg-gradient-to-r from-rose-500 via-red-500 to-orange-400 px-5 py-3 text-sm font-semibold text-white shadow-[0_0_28px_rgba(244,63,94,0.28)]"
      >
        {unlocked ? 'Select Track' : 'Unlock Track'}
      </motion.button>
    </div>
  )
}

const InfoMetric = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
    <p className="text-[10px] uppercase tracking-[0.2em] text-rose-100">{label}</p>
    <p className="mt-1 font-semibold text-white">{value}</p>
  </div>
)

export default RacingMap
