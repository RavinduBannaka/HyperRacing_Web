import { Link } from 'react-router-dom'
import { PageShell } from '../components/PageShell'
import { GlowCard } from '../components/GlowCard'
import { useGame } from '../context/GameContext'

const mapBg =
  'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=2100&q=80&sat=-14'

const mapMarkers = [
  { label: 'Neon City', x: '24%', y: '36%', status: 'Hot lap', color: 'bg-rose-400' },
  { label: 'Glacier Run', x: '62%', y: '44%', status: 'Night sprint', color: 'bg-cyan-300' },
  { label: 'Desert Apex', x: '48%', y: '68%', status: 'Drift lobby', color: 'bg-amber-300' },
  { label: 'Harbor Loop', x: '72%', y: '28%', status: 'Quali', color: 'bg-emerald-300' },
]

export const MapPage = () => {
  const { maps } = useGame()
  return (
    <PageShell
      eyebrow="Navigation"
      title="Track Map"
      subtitle="A cinematic control room showing hotspots, lobbies, and live race energy across the Hyper map."
      backgroundImage={mapBg}
      cta={
        <Link
          to="/map-store"
          className="neon-button rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white"
        >
          Buy maps
        </Link>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/60 p-4 shadow-glow">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_60%)]" aria-hidden />
          <div className="relative h-[360px] overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-800 to-black">
            <div className="absolute inset-0 opacity-60" aria-hidden>
              <div className="absolute -left-20 top-10 h-64 w-64 rounded-full bg-rose-500/20 blur-3xl" />
              <div className="absolute right-0 bottom-10 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />
            </div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.08),transparent_38%),radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.08),transparent_38%)]" />
            {mapMarkers.map((marker) => (
              <div
                key={marker.label}
                className="group absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
                style={{ left: marker.x, top: marker.y }}
              >
                <span className={`h-3 w-3 rounded-full ${marker.color} shadow-neon`} />
                <div className="mt-2 rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-xs text-white opacity-0 shadow-lg backdrop-blur group-hover:opacity-100">
                  <p className="font-semibold">{marker.label}</p>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-rose-100">{marker.status}</p>
                </div>
              </div>
            ))}
            <div className="absolute inset-8 rounded-2xl border border-white/10" />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <GlowCard eyebrow="Highlights" title="Live status" tone="info">
            <div className="space-y-2 text-sm text-slate-200">
              <p>• 3 lobbies in quali • 1 drift-only lobby</p>
              <p>• Weather: Mixed dry/overcast • Track temp 28°C</p>
              <p>• Ghost uploads: 12 in last hour</p>
            </div>
          </GlowCard>
          <GlowCard eyebrow="Unlocked" title="Owned maps" tone="success">
            <div className="flex flex-wrap gap-2 text-sm text-slate-200">
              {maps.length ? (
                maps.map((m) => (
                  <span key={m.id} className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-white">
                    {m.name}
                  </span>
                ))
              ) : (
                <span className="text-slate-300">No maps unlocked yet.</span>
              )}
            </div>
          </GlowCard>
          <GlowCard eyebrow="Events" title="Upcoming" tone="warning">
            <div className="space-y-2 text-sm text-slate-200">
              <p>• Neon City sprint | 22:00</p>
              <p>• Glacier Run night rally | 23:30</p>
              <p>• Harbor Loop endurance | 01:00</p>
            </div>
          </GlowCard>
          <GlowCard eyebrow="Telemetry" title="Heatmap" tone="default">
            <div className="flex items-center gap-3">
              <div className="h-2 flex-1 rounded-full bg-gradient-to-r from-emerald-300 via-amber-300 to-rose-400" />
              <span className="text-xs uppercase tracking-[0.2em] text-rose-100">Traffic</span>
            </div>
            <p className="mt-2 text-sm text-slate-200">Peak sessions pulsing across Neon City and Harbor Loop right now.</p>
          </GlowCard>
          <GlowCard eyebrow="Ping" title="Latency" tone="success">
            <div className="flex items-baseline gap-2 text-3xl font-semibold text-white">
              <span>21</span>
              <span className="text-sm text-slate-300">ms avg</span>
            </div>
            <p className="text-sm text-slate-300">Route optimized via edge POPs. Stable for lobby play.</p>
          </GlowCard>
        </div>
      </div>
    </PageShell>
  )
}
