import { useState } from 'react'
import { api } from '../services/api'

export const ApiTest = () => {
  const [testResult, setTestResult] = useState<string>('')
  const [loading, setLoading] = useState(false)

  const testConnection = async () => {
    setLoading(true)
    setTestResult('')

    try {
      // Test health endpoint first
      const healthResponse = await api.health()

      if (healthResponse.success) {
        setTestResult(`✅ Backend healthy! Now testing coins...`)

        // Test coins endpoint
        const coinsResponse = await api.coins.get()

        if (coinsResponse.success) {
          setTestResult(`✅ Connected! Coins: ${coinsResponse.data?.amount || coinsResponse.data || 'N/A'}`)
        } else {
          setTestResult(`✅ Health OK, but coins failed: ${coinsResponse.error}`)
        }
      } else {
        setTestResult(`❌ Health check failed: ${healthResponse.error}`)
      }
    } catch (error) {
      setTestResult(`❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setLoading(false)
    }
  }

  const testAuth = async () => {
    setLoading(true)
    setTestResult('')

    try {
      // Test auth endpoint
      const response = await api.auth.login({
        email: 'test@example.com',
        password: 'test123'
      })

      if (response.success) {
        setTestResult(`✅ Auth successful: ${response.message || 'Logged in'}`)
      } else {
        setTestResult(`❌ Auth failed: ${response.error}`)
      }
    } catch (error) {
      setTestResult(`❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setLoading(false)
    }
  }

  const testSpin = async () => {
    setLoading(true)
    setTestResult('')

    try {
      // Test spin endpoint
      const response = await api.spin.execute()

      if (response.success) {
        setTestResult(`✅ Spin successful: ${JSON.stringify(response.data)}`)
      } else {
        setTestResult(`❌ Spin failed: ${response.error}`)
      }
    } catch (error) {
      setTestResult(`❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-bold text-white">Backend API Test</h2>
      <p className="text-slate-300">Testing connection to: <code className="text-cyan-400">192.168.1.5:3000</code></p>

      <div className="flex gap-4">
        <button
          onClick={testConnection}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg transition"
        >
          {loading ? 'Testing...' : 'Test Connection'}
        </button>

        <button
          onClick={testAuth}
          disabled={loading}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white rounded-lg transition"
        >
          {loading ? 'Testing...' : 'Test Auth'}
        </button>

        <button
          onClick={testSpin}
          disabled={loading}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white rounded-lg transition"
        >
          {loading ? 'Testing...' : 'Test Spin'}
        </button>
      </div>

      {testResult && (
        <div className="p-4 bg-slate-800 rounded-lg">
          <pre className="text-sm text-slate-200 whitespace-pre-wrap">{testResult}</pre>
        </div>
      )}

      <div className="text-xs text-slate-400 space-y-1">
        <p><strong>Available API endpoints:</strong></p>
        <ul className="list-disc list-inside space-y-1">
          <li>GET /api/health - Health check</li>
          <li>POST /api/auth/login - User login</li>
          <li>POST /api/auth/register - User registration</li>
          <li>GET /api/profile - Get user profile</li>
          <li>PUT /api/profile - Update user profile</li>
          <li>GET /api/coins - Get user coins</li>
          <li>PUT /api/coins - Update user coins</li>
          <li>GET /api/inventory - Get user inventory</li>
          <li>POST /api/inventory - Add to inventory</li>
          <li>POST /api/spin - Execute spin</li>
          <li>GET /api/spin/history - Get spin history</li>
          <li>GET /api/content - Get content</li>
        </ul>
      </div>
    </div>
  )
}

export default ApiTest