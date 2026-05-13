'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from '@/lib/firebase/auth'
import { Sparkles, Mail, Lock, ArrowRight } from 'lucide-react'

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
    <div className="min-h-screen flex" style={{ background: '#0F172A' }}>
      {/* Sol dekoratif panel */}
      <div className="hidden lg:flex lg:w-1/2 flex-col items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ background: 'radial-gradient(ellipse at 30% 50%, #E11D48 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, #FB7185 0%, transparent 50%)' }} />
        <div className="relative z-10 text-center">
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ background: '#E11D48' }}>
            <Sparkles size={36} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">Odhun</h1>
          <p className="text-white/50 text-lg">Organizasyon Yönetim Paneli</p>
          <div className="mt-12 grid grid-cols-2 gap-4 max-w-xs mx-auto text-left">
            {['Rezervasyon Yönetimi', 'Galeri & Medya', 'Hizmet Katalog', 'Site Ayarları'].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#E11D48' }} />
                <span className="text-white/60 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sağ login formu */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="lg:hidden text-center mb-10">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ background: '#E11D48' }}>
              <Sparkles size={22} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">Odhun Admin</h1>
          </div>

          <h2 className="text-2xl font-bold text-white mb-1">Giriş Yap</h2>
          <p className="text-white/40 text-sm mb-8">Hesabınıza erişmek için giriş yapın.</p>

          {error && (
            <div className="mb-5 flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-xl">
              <span className="shrink-0">⚠</span> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-white/60 text-xs font-medium mb-2 uppercase tracking-wider">E-posta</label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-white/5 border border-white/10 text-white rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-[#E11D48] focus:bg-white/8 transition-all placeholder:text-white/20"
                  placeholder="admin@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-white/60 text-xs font-medium mb-2 uppercase tracking-wider">Şifre</label>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-white/5 border border-white/10 text-white rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-[#E11D48] focus:bg-white/8 transition-all placeholder:text-white/20"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 text-white font-semibold rounded-xl py-3 text-sm transition-all duration-200 disabled:opacity-50 cursor-pointer mt-2"
              style={{ background: loading ? '#BE123C' : '#E11D48' }}
            >
              {loading ? 'Giriş yapılıyor...' : (
                <>Giriş Yap <ArrowRight size={16} /></>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
