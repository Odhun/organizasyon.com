'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { signOut } from '@/lib/firebase/auth'

const navItems = [
  { href: '/admin/dashboard', label: 'Gösterge Paneli', icon: '📊' },
  { href: '/admin/rezervasyonlar', label: 'Rezervasyonlar', icon: '📅' },
  { href: '/admin/yorumlar', label: 'Müşteri Yorumları', icon: '⭐' },
  { href: '/admin/galeri', label: 'Galeri', icon: '🖼️' },
  { href: '/admin/hizmetler', label: 'Hizmetler', icon: '✨' },
  { href: '/admin/ayarlar', label: 'Site Ayarları', icon: '⚙️' },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  async function handleLogout() {
    await signOut()
    router.replace('/admin/login')
  }

  return (
    <aside className="fixed top-0 left-0 h-full w-64 flex flex-col z-40" style={{ background: '#111827' }}>
      <div className="p-6 border-b border-gray-700">
        <h1 className="text-[#C9A84C] font-bold text-lg leading-tight">Odhun</h1>
        <p className="text-gray-400 text-xs mt-1">Admin Paneli</p>
      </div>
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const active = pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? 'bg-[#C9A84C] text-gray-900'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          )
        })}
      </nav>
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-300 hover:bg-red-900/30 hover:text-red-400 transition-colors"
        >
          <span>🚪</span>
          Çıkış Yap
        </button>
      </div>
    </aside>
  )
}
