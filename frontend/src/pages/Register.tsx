import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { PageShell } from '../components/PageShell'
import { useGame } from '../context/GameContext'

const registerBg =
  'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=2000&q=80&sat=-10'

export const Register = () => {
  const { register } = useGame()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    displayName: '',
    age: '',
    bio: '',
    email: '',
    password: '',
    confirm: '',
    profilePicUrl: '',
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!form.displayName.trim() || !form.email.trim() || !form.password || !form.confirm) {
      setError('Username, email, password, and confirm password are required.')
      return
    }
    if (form.password !== form.confirm) {
      setError('Passwords must match.')
      return
    }
    if (form.password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }
    if (!agreedToTerms) {
      setError('You must agree to the Terms of Service.')
      return
    }
    setError('')
    setSuccess('')
    setLoading(true)
    try {
      await register({
        displayName: form.displayName.trim(),
        age: Number(form.age) || 18,
        bio: form.bio || 'New racer joining the Hyper grid.',
        email: form.email.trim(),
        password: form.password,
        avatar: form.profilePicUrl || undefined,
      })
      setSuccess('Registration successful. Redirecting to login...')
      window.setTimeout(() => navigate('/login'), 900)
    } catch (err) {
      setError((err as Error).message || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const update = (key: keyof typeof form, value: string) => setForm((f) => ({ ...f, [key]: value }))

  return (
    <PageShell
      eyebrow="Onboard"
      title="Register"
      subtitle="Secure your callsign, set your bio, and sync with the Hyper Racing universe."
      backgroundImage={registerBg}
      cta={<Link to="/login" className="text-sm text-rose-100 underline underline-offset-4">Have an account? Login</Link>}
    >
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-1">
            <label className="text-sm text-slate-200">Username</label>
            <input
              value={form.displayName}
              onChange={(e) => update('displayName', e.target.value)}
              className="mt-1 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white outline-none ring-rose-400/40 focus:ring"
              placeholder='Ava "Driftline"'
            />
          </div>
          <div className="sm:col-span-1">
            <label className="text-sm text-slate-200">Age</label>
            <input
              type="number"
              value={form.age}
              onChange={(e) => update('age', e.target.value)}
              className="mt-1 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white outline-none ring-rose-400/40 focus:ring"
              placeholder="27"
              required
            />
          </div>
          <div className="sm:col-span-2">
            <label className="text-sm text-slate-200">Bio</label>
            <textarea
              value={form.bio}
              onChange={(e) => update('bio', e.target.value)}
              className="mt-1 min-h-[110px] w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white outline-none ring-rose-400/40 focus:ring"
              placeholder="Night sprint addict, data nerd, aero whisperer."
            />
          </div>
          <div className="sm:col-span-2">
            <label className="text-sm text-slate-200">Profile Picture URL <span className="text-slate-400">(optional)</span></label>
            <input
              type="url"
              value={form.profilePicUrl}
              onChange={(e) => update('profilePicUrl', e.target.value)}
              className="mt-1 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white outline-none ring-rose-400/40 focus:ring"
              placeholder="https://images.unsplash.com/photo-..."
            />
          </div>
          <div className="sm:col-span-2">
            <label className="text-sm text-slate-200">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => update('email', e.target.value)}
              className="mt-1 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white outline-none ring-rose-400/40 focus:ring"
              placeholder="you@hyper.gg"
              required
            />
          </div>
          <div className="sm:col-span-1">
            <label className="text-sm text-slate-200">Password</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => update('password', e.target.value)}
              className="mt-1 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white outline-none ring-rose-400/40 focus:ring"
              placeholder="********"
              required
            />
          </div>
          <div className="sm:col-span-1">
            <label className="text-sm text-slate-200">Confirm Password</label>
            <input
              type="password"
              value={form.confirm}
              onChange={(e) => update('confirm', e.target.value)}
              className="mt-1 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white outline-none ring-rose-400/40 focus:ring"
              placeholder="********"
              required
            />
          </div>
          {error ? <p className="sm:col-span-2 text-sm text-rose-200">{error}</p> : null}
          {success ? <p className="sm:col-span-2 text-sm text-emerald-200">{success}</p> : null}
          <div className="sm:col-span-2 flex items-start gap-3">
            <input
              type="checkbox"
              id="terms"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="mt-1 h-5 w-5 rounded border border-white/30 bg-white/5 text-rose-500 outline-none ring-rose-400/40"
            />
            <label htmlFor="terms" className="text-sm text-slate-200">
              I agree to the <a href="#" className="text-rose-300 underline">Terms of Service</a> and <a href="#" className="text-rose-300 underline">Privacy Policy</a>
            </label>
          </div>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
            className="neon-button sm:col-span-2 w-full rounded-xl bg-gradient-to-r from-rose-500 via-red-500 to-orange-400 px-5 py-3 text-center text-sm font-semibold text-white shadow-neon disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Creating profile...' : 'Create racer profile'}
          </motion.button>
        </form>

        <div className="space-y-4">
          <div className="glass-panel rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-rose-100">Preview</p>
            <h3 className="mt-2 text-xl font-semibold text-white">Your Racer Profile</h3>
            <div className="mt-3 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-rose-400 to-orange-400 text-xl">
                {form.displayName ? form.displayName.charAt(0).toUpperCase() : '?'}
              </div>
              <div>
                <p className="font-semibold text-white">{form.displayName || 'Display Name'}</p>
                <p className="text-xs text-slate-300">{form.email || 'you@hyper.gg'}</p>
              </div>
            </div>
            {form.profilePicUrl ? (
              <div className="mt-3">
                <img src={form.profilePicUrl} alt="Profile preview" className="h-20 w-20 rounded-full object-cover" />
              </div>
            ) : null}
          </div>
          <div className="glass-panel rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-rose-100">Premium onboarding</p>
            <h3 className="mt-2 text-xl font-semibold text-white">Included perks</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-200">
              <li>- <span className="text-amber-300">500 bonus coins</span> to start</li>
              <li>- Access to community chat + race lobby</li>
              <li>- Marketplace and card collection</li>
              <li>- Weekly spin wheel rewards</li>
            </ul>
          </div>
          <div className="glass-panel rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 via-white/10 to-transparent p-5">
            <h4 className="text-sm uppercase tracking-[0.24em] text-cyan-100">Security</h4>
            <p className="mt-2 text-sm text-slate-200">Your data is encrypted and stored securely. We never share your information.</p>
          </div>
        </div>
      </div>
    </PageShell>
  )
}
