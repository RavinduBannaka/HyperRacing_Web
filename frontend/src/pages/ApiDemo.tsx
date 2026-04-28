import { ApiTest } from '../components/ApiTest'

export const ApiDemo = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Backend API Connection</h1>
            <p className="text-slate-300">
              Testing connection to your backend at <code className="text-cyan-400 bg-slate-800 px-2 py-1 rounded">localhost:3000/api</code>
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur rounded-2xl border border-slate-700 p-6">
            <ApiTest />
          </div>

          <div className="mt-8 text-center">
            <h3 className="text-lg font-semibold text-white mb-4">How to Use</h3>
            <div className="text-sm text-slate-300 space-y-2">
              <p>1. Make sure your backend is running on <code className="text-cyan-400">192.168.1.5:3000</code></p>
              <p>2. Click "Test Connection" to verify the API is reachable</p>
              <p>3. Use the <code className="text-cyan-400">api</code> object in your components:</p>
              <pre className="bg-slate-900 p-4 rounded-lg text-left overflow-x-auto mt-4">
{`import { api } from '../services/api'

// Get user coins
const coins = await api.coins.get()

// Login user
const login = await api.auth.login({
  email: 'user@example.com',
  password: 'password123'
})

// Execute spin
const spin = await api.spin.execute()

// Get user profile
const profile = await api.profile.get()

// Get inventory
const inventory = await api.inventory.get()`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ApiDemo