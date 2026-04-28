import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { PageShell } from '../components/PageShell'
import { useGame } from '../context/GameContext'

export const AuthDashboard = () => {
  const { login, register } = useGame()
  const navigate = useNavigate()
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [error, setError] = useState('')

  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  const [registerData, setRegisterData] = useState({
    displayName: '',
    age: '',
    bio: '',
    email: '',
    password: '',
    confirm: '',
  })

  const handleRegisterChange = (key: keyof typeof registerData, value: string) => {
    setRegisterData((prev) => ({ ...prev, [key]: value }))
  }

  const onLoginSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!loginEmail || !loginPassword) {
      setError('Please enter both email and password to login.')
      return
    }

    try {
      setError('')
      await login(loginEmail, loginPassword)
      navigate('/profile')
    } catch (err) {
      setError((err as Error).message || 'Unable to login. Please check your credentials.')
    }
  }

  const onRegisterSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (
      !registerData.displayName ||
      !registerData.email ||
      !registerData.password ||
      !registerData.confirm ||
      !registerData.age
    ) {
      setError('Complete all fields before creating your dashboard profile.')
      return
    }
    if (registerData.password !== registerData.confirm) {
      setError('Passwords must match.')
      return
    }

    try {
      setError('')
      await register({
        displayName: registerData.displayName,
        age: Number(registerData.age),
        bio: registerData.bio || 'New racer joining the Hyper grid.',
        email: registerData.email,
        password: registerData.password,
      })
      navigate('/profile')
    } catch (err) {
      setError((err as Error).message || 'Unable to register. Please try again.')
    }
  }

  return (
    <PageShell
      eyebrow="Dashboard"
      title="Auth Center"
      subtitle="Use a single dashboard to switch between login and register flows with AppWire authentication."
      backgroundImage="https://images.unsplash.com/photo-1518977956816-a5b221364623?auto=format&fit=crop&w=2000&q=80&sat=-10"
      cta={
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setMode('login')}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              mode === 'login' ? 'bg-rose-500 text-white' : 'bg-white/10 text-slate-200 hover:bg-white/15'
            }`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => setMode('register')}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              mode === 'register' ? 'bg-rose-500 text-white' : 'bg-white/10 text-slate-200 hover:bg-white/15'
            }`}
          >
            Register
          </button>
        </div>
      }
    >
      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="glass-panel rounded-3xl border border-white/10 bg-white/5 p-6 shadow-glow">
          {mode === 'login' ? (
            <form onSubmit={onLoginSubmit} className="space-y-5">
              <div>
                <label className="text-sm text-slate-200">Email</label>
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="mt-2 w-full rounded-2xl border border-white/15 bg-black/30 px-4 py-3 text-white outline-none ring-rose-400/40 focus:ring"
                  placeholder="you@hyper.gg"
                />
              </div>
              <div>
                <label className="text-sm text-slate-200">Password</label>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="mt-2 w-full rounded-2xl border border-white/15 bg-black/30 px-4 py-3 text-white outline-none ring-rose-400/40 focus:ring"
                  placeholder="••••••••"
                />
              </div>
              {error ? <p className="text-sm text-rose-200">{error}</p> : null}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="neon-button w-full rounded-3xl bg-gradient-to-r from-rose-500 via-red-500 to-orange-400 px-5 py-3 text-sm font-semibold text-white"
              >
                Sign in to dashboard
              </motion.button>
            </form>
          ) : (
            <form onSubmit={onRegisterSubmit} className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-sm text-slate-200">Display Name</label>
                  <input
                    value={registerData.displayName}
                    onChange={(e) => handleRegisterChange('displayName', e.target.value)}
                    className="mt-2 w-full rounded-2xl border border-white/15 bg-black/30 px-4 py-3 text-white outline-none ring-rose-400/40 focus:ring"
                    placeholder="Ava “Driftline”"
                  />
                </div>
                <div>
                  <label className="text-sm text-slate-200">Age</label>
                  <input
                    type="number"
                    value={registerData.age}
                    onChange={(e) => handleRegisterChange('age', e.target.value)}
                    className="mt-2 w-full rounded-2xl border border-white/15 bg-black/30 px-4 py-3 text-white outline-none ring-rose-400/40 focus:ring"
                    placeholder="27"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm text-slate-200">Email</label>
                <input
                  type="email"
                  value={registerData.email}
                  onChange={(e) => handleRegisterChange('email', e.target.value)}
                  className="mt-2 w-full rounded-2xl border border-white/15 bg-black/30 px-4 py-3 text-white outline-none ring-rose-400/40 focus:ring"
                  placeholder="you@hyper.gg"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-sm text-slate-200">Password</label>
                  <input
                    type="password"
                    value={registerData.password}
                    onChange={(e) => handleRegisterChange('password', e.target.value)}
                    className="mt-2 w-full rounded-2xl border border-white/15 bg-black/30 px-4 py-3 text-white outline-none ring-rose-400/40 focus:ring"
                    placeholder="••••••••"
                  />
                </div>
                <div>
                  <label className="text-sm text-slate-200">Confirm</label>
                  <input
                    type="password"
                    value={registerData.confirm}
                    onChange={(e) => handleRegisterChange('confirm', e.target.value)}
                    className="mt-2 w-full rounded-2xl border border-white/15 bg-black/30 px-4 py-3 text-white outline-none ring-rose-400/40 focus:ring"
                    placeholder="••••••••"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm text-slate-200">Bio</label>
                <textarea
                  value={registerData.bio}
                  onChange={(e) => handleRegisterChange('bio', e.target.value)}
                  className="mt-2 min-h-[110px] w-full rounded-2xl border border-white/15 bg-black/30 px-4 py-3 text-white outline-none ring-rose-400/40 focus:ring"
                  placeholder="Night sprint addict, telemetry nerd, aero whisperer."
                />
              </div>
              {error ? <p className="text-sm text-rose-200">{error}</p> : null}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="neon-button w-full rounded-3xl bg-gradient-to-r from-rose-500 via-red-500 to-orange-400 px-5 py-3 text-sm font-semibold text-white"
              >
                Create dashboard profile
              </motion.button>
            </form>
          )}
        </div>

        <div className="space-y-4">
          <div className="glass-panel rounded-3xl border border-white/10 bg-white/5 p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-rose-100">Unified flow</p>
            <h3 className="mt-2 text-xl font-semibold text-white">Login + register together</h3>
            <p className="mt-3 text-sm text-slate-200">
              Keep auth consistent with AppWire and let racers access the same dashboard experience for both login and onboarding.
            </p>
          </div>
          <div className="glass-panel rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 via-white/10 to-transparent p-5">
            <h4 className="text-sm uppercase tracking-[0.24em] text-cyan-100">AppWire ready</h4>
            <p className="mt-2 text-sm text-slate-200">
              Add your AppWire project ID and endpoint in a .env file to connect these auth forms to your backend.
            </p>
          </div>
          <div className="glass-panel rounded-3xl border border-white/10 bg-white/5 p-5">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.24em] text-rose-100">Dashboard perks</p>
              <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] uppercase text-slate-300">Fast auth</span>
            </div>
            <ul className="mt-3 space-y-2 text-sm text-slate-200">
              <li>• Shared session model for login and registration</li>
              <li>• Redirect to profile on success</li>
              <li>• Clear error messaging for API failures</li>
            </ul>
          </div>
        </div>
      </div>
    </PageShell>
  )
}
