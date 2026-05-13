'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from '@/lib/firebase/auth'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await signIn(email, password)
      router.replace('/admin/dashboard')
    } catch {
      setError('E-posta veya şifre hatalı.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#111827' }}>
      <div className="w-full max-w-sm px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#C9A84C]">Odhun</h1>
          <p className="text-gray-400 text-sm mt-2">Admin Paneli Girişi</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-gray-800 rounded-2xl p-8 space-y-4">
          {error && (
            <div className="bg-red-900/30 border border-red-700 text-red-400 text-sm px-4 py-3 rounded-lg">
              {error}
            </div>
          )}
          <div>
            <label className="block text-gray-300 text-sm mb-2">E-posta</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#C9A84C] transition-colors"
              placeholder="admin@example.com"
            />
          </div>
          <div>
            <label className="block text-gray-300 text-sm mb-2">Şifre</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#C9A84C] transition-colors"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#C9A84C] hover:bg-[#b8963e] text-gray-900 font-semibold rounded-lg py-3 text-sm transition-colors disabled:opacity-50 mt-2"
          >
            {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
          </button>
        </form>
      </div>
    </div>
  )
}
