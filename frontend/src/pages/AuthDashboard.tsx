import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { PageShell } from '../components/PageShell'
import { useGame } from '../context/GameContext'

type AuthLog = {
  id: string
  type: 'success' | 'error' | 'info'
  message: string
}

export const AuthDashboard = () => {
  const { login, register } = useGame()
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const [logs, setLogs] = useState<AuthLog[]>([
    { id: 'log-ready', type: 'info', message: 'Auth dashboard ready for login or registration.' },
  ])

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

  const addLog = (type: AuthLog['type'], message: string) => {
    setLogs((prev) => [{ id: crypto.randomUUID(), type, message }, ...prev].slice(0, 6))
  }

  const switchMode = (nextMode: 'login' | 'register') => {
    setMode(nextMode)
    setError('')
    setSuccess('')
    addLog('info', `Switched to ${nextMode} mode.`)
  }

  const handleRegisterChange = (key: keyof typeof registerData, value: string) => {
    setRegisterData((prev) => ({ ...prev, [key]: value }))
  }

  const onLoginSubmit = async (event: FormEvent) => {
    event.preventDefault()
    if (!loginEmail.trim() || !loginPassword) {
      setError('Please enter both email and password to login.')
      setSuccess('')
      addLog('error', 'Login blocked: missing email or password.')
      return
    }

    try {
      setLoading(true)
      setError('')
      setSuccess('')
      addLog('info', `Login requested for ${loginEmail.trim()}.`)
      await login(loginEmail.trim(), loginPassword)
      setSuccess('Login successful. Auth dashboard session is active.')
      addLog('success', `Login successful for ${loginEmail.trim()}.`)
    } catch (err) {
      const message = (err as Error).message || 'Unable to login. Please check your credentials.'
      setError(message)
      addLog('error', message)
    } finally {
      setLoading(false)
    }
  }

  const onRegisterSubmit = async (event: FormEvent) => {
    event.preventDefault()
    if (!registerData.displayName.trim() || !registerData.email.trim() || !registerData.password || !registerData.confirm) {
      setError('Username, email, password, and confirm password are required.')
      setSuccess('')
      addLog('error', 'Registration blocked: required fields are missing.')
      return
    }
    if (registerData.password !== registerData.confirm) {
      setError('Passwords must match.')
      setSuccess('')
      addLog('error', 'Registration blocked: passwords do not match.')
      return
    }
    if (registerData.password.length < 8) {
      setError('Password must be at least 8 characters.')
      setSuccess('')
      addLog('error', 'Registration blocked: password is too short.')
      return
    }

    try {
      setLoading(true)
      setError('')
      setSuccess('')
      addLog('info', `Registration requested for ${registerData.email.trim()}.`)
      await register({
        displayName: registerData.displayName.trim(),
        age: Number(registerData.age) || 18,
        bio: registerData.bio || 'New racer joining the Hyper grid.',
        email: registerData.email.trim(),
        password: registerData.password,
      })
      setSuccess('Registration successful. Auth dashboard session is active.')
      addLog('success', `Registration successful for ${registerData.displayName.trim()}.`)
    } catch (err) {
      const message = (err as Error).message || 'Unable to register. Please try again.'
      setError(message)
      addLog('error', message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageShell
      eyebrow="Dashboard"
      title="Auth Center"
      subtitle="Login or register from one premium Hyper Racing dashboard."
      backgroundImage="https://images.unsplash.com/photo-1518977956816-a5b221364623?auto=format&fit=crop&w=2000&q=80&sat=-10"
      cta={
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => switchMode('login')}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              mode === 'login' ? 'bg-rose-500 text-white' : 'bg-white/10 text-slate-200 hover:bg-white/15'
            }`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => switchMode('register')}
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
                  required
                />
              </div>
              <div>
                <label className="text-sm text-slate-200">Password</label>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="mt-2 w-full rounded-2xl border border-white/15 bg-black/30 px-4 py-3 text-white outline-none ring-rose-400/40 focus:ring"
                  placeholder="********"
                  required
                />
              </div>
              {error ? <p className="text-sm text-rose-200">{error}</p> : null}
              {success ? <p className="text-sm text-emerald-200">{success}</p> : null}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={loading}
                className="neon-button w-full rounded-3xl bg-gradient-to-r from-rose-500 via-red-500 to-orange-400 px-5 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? 'Signing in...' : 'Sign in to dashboard'}
              </motion.button>
            </form>
          ) : (
            <form onSubmit={onRegisterSubmit} className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-sm text-slate-200">Username</label>
                  <input
                    value={registerData.displayName}
                    onChange={(e) => handleRegisterChange('displayName', e.target.value)}
                    className="mt-2 w-full rounded-2xl border border-white/15 bg-black/30 px-4 py-3 text-white outline-none ring-rose-400/40 focus:ring"
                    placeholder='Ava "Driftline"'
                    required
                  />
                </div>
                <div>
                  <label className="text-sm text-slate-200">Age</label>
                  <input
                    type="number"
                    value={registerData.age}
                    onChange={(e) => handleRegisterChange('age', e.target.value)}
                    className="mt-2 w-full rounded-2xl border border-white/15 bg-black/30 px-4 py-3 text-white outline-none ring-rose-400/40 focus:ring"
                    placeholder="18"
                    min={1}
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
                  required
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
                    placeholder="********"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm text-slate-200">Confirm Password</label>
                  <input
                    type="password"
                    value={registerData.confirm}
                    onChange={(e) => handleRegisterChange('confirm', e.target.value)}
                    className="mt-2 w-full rounded-2xl border border-white/15 bg-black/30 px-4 py-3 text-white outline-none ring-rose-400/40 focus:ring"
                    placeholder="********"
                    required
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
              {success ? <p className="text-sm text-emerald-200">{success}</p> : null}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={loading}
                className="neon-button w-full rounded-3xl bg-gradient-to-r from-rose-500 via-red-500 to-orange-400 px-5 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? 'Creating profile...' : 'Create dashboard profile'}
              </motion.button>
            </form>
          )}
        </div>

        <div className="space-y-4">
          <div className="glass-panel rounded-3xl border border-white/10 bg-white/5 p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-rose-100">Unified flow</p>
            <h3 className="mt-2 text-xl font-semibold text-white">Login + register together</h3>
            <p className="mt-3 text-sm text-slate-200">
              Both forms update the same player session and keep racers inside the Auth Center.
            </p>
          </div>
          <div className="glass-panel rounded-3xl border border-white/10 bg-white/5 p-5">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.24em] text-rose-100">Auth Log</p>
              <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] uppercase text-slate-300">Live</span>
            </div>
            <div className="mt-3 space-y-2">
              {logs.map((log) => (
                <div key={log.id} className="rounded-xl border border-white/10 bg-black/25 px-3 py-2 text-sm text-slate-200">
                  <span
                    className={
                      log.type === 'success'
                        ? 'text-emerald-200'
                        : log.type === 'error'
                          ? 'text-rose-200'
                          : 'text-cyan-100'
                    }
                  >
                    {log.type.toUpperCase()}
                  </span>
                  <span className="text-slate-400"> - </span>
                  {log.message}
                </div>
              ))}
            </div>
          </div>
          <div className="glass-panel rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 via-white/10 to-transparent p-5">
            <h4 className="text-sm uppercase tracking-[0.24em] text-cyan-100">Backend ready</h4>
            <p className="mt-2 text-sm text-slate-200">
              If the API is offline, the app uses a local demo session so you can still test the dashboard.
            </p>
          </div>
        </div>
      </div>
    </PageShell>
  )
}
