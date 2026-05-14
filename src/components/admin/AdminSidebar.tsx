'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { signOut } from '@/lib/firebase/auth'
import {
  LayoutDashboard,
  CalendarDays,
  Star,
  Images,
  Sparkles,
  Settings,
  LogOut,
  Download,
} from 'lucide-react'

const navItems = [
  { href: '/admin/dashboard', label: 'Gösterge Paneli', icon: LayoutDashboard },
  { href: '/admin/rezervasyonlar', label: 'Rezervasyonlar', icon: CalendarDays },
  { href: '/admin/yorumlar', label: 'Müşteri Yorumları', icon: Star },
  { href: '/admin/galeri', label: 'Galeri', icon: Images },
  { href: '/admin/hizmetler', label: 'Hizmetler', icon: Sparkles },
  { href: '/admin/ayarlar', label: 'Site Ayarları', icon: Settings },
  { href: '/admin/yedekleme', label: 'Yedekleme', icon: Download },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  async function handleLogout() {
    await signOut()
    router.replace('/admin/login')
  }

  return (
    <aside className="fixed top-0 left-0 h-full w-64 flex flex-col z-40" style={{ background: '#0F172A' }}>
      {/* Logo */}
      <div className="px-6 py-6 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#E11D48' }}>
            <Sparkles size={16} className="text-white" />
          </div>
          <div>
            <p className="text-white font-bold text-sm leading-none">Odhun</p>
            <p className="text-white/40 text-xs mt-0.5">Admin Paneli</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const active = pathname.startsWith(item.href)
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 cursor-pointer ${
                active
                  ? 'text-white'
                  : 'text-white/50 hover:text-white hover:bg-white/5'
              }`}
              style={active ? { background: '#E11D48' } : undefined}
            >
              <Icon size={17} strokeWidth={active ? 2.5 : 2} />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* OdhunSoft */}
      <div className="px-6 py-3 border-t border-white/5">
        <p className="text-[10px] text-white/20 leading-snug">Tasarım & Geliştirme</p>
        <a
          href="https://odhun.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-semibold text-[#E11D48]/70 hover:text-[#E11D48] transition-colors"
        >
          OdhunSoft
        </a>
      </div>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-white/5">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-all duration-150 cursor-pointer"
        >
          <LogOut size={17} strokeWidth={2} />
          Çıkış Yap
        </button>
      </div>
    </aside>
  )
}
