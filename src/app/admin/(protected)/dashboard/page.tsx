'use client'
import { useEffect, useState } from 'react'
import { getAllReservations } from '@/lib/firebase/reservations'
import { getAllTestimonials } from '@/lib/firebase/testimonials'
import { getAllServices } from '@/lib/firebase/services'
import { getAllGalleryItems } from '@/lib/firebase/gallery'
import type { Reservation } from '@/types/models'
import Link from 'next/link'
import { CalendarDays, Bell, Star, Sparkles, Images } from 'lucide-react'

const STATUS_LABELS: Record<Reservation['status'], string> = {
  new: 'Yeni', in_review: 'İnceleniyor', approved: 'Onaylandı', cancelled: 'İptal',
}
const STATUS_COLORS: Record<Reservation['status'], string> = {
  new: 'bg-blue-50 text-blue-600',
  in_review: 'bg-amber-50 text-amber-600',
  approved: 'bg-emerald-50 text-emerald-600',
  cancelled: 'bg-red-50 text-red-500',
}

export default function DashboardPage() {
  const [stats, setStats] = useState({ reservations: 0, newReservations: 0, pendingTestimonials: 0, activeServices: 0, galleryItems: 0 })
  const [recent, setRecent] = useState<Reservation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const [reservations, testimonials, services, gallery] = await Promise.all([
        getAllReservations(), getAllTestimonials(), getAllServices(), getAllGalleryItems(),
      ])
      setStats({
        reservations: reservations.length,
        newReservations: reservations.filter((r) => r.status === 'new').length,
        pendingTestimonials: testimonials.filter((t) => !t.approved).length,
        activeServices: services.filter((s) => s.active).length,
        galleryItems: gallery.length,
      })
      const sorted = [...reservations].sort((a, b) => (b.createdAt?.toMillis?.() ?? 0) - (a.createdAt?.toMillis?.() ?? 0))
      setRecent(sorted.slice(0, 5))
      setLoading(false)
    }
    load()
  }, [])

  const cards = [
    { label: 'Toplam Rezervasyon', value: stats.reservations, color: '#6366F1', bg: '#EEF2FF', Icon: CalendarDays, href: '/admin/rezervasyonlar' },
    { label: 'Yeni Rezervasyon', value: stats.newReservations, color: '#E11D48', bg: '#FFF1F2', Icon: Bell, href: '/admin/rezervasyonlar' },
    { label: 'Onay Bekleyen Yorum', value: stats.pendingTestimonials, color: '#F59E0B', bg: '#FFFBEB', Icon: Star, href: '/admin/yorumlar' },
    { label: 'Aktif Hizmet', value: stats.activeServices, color: '#10B981', bg: '#ECFDF5', Icon: Sparkles, href: '/admin/hizmetler' },
    { label: 'Galeri Öğesi', value: stats.galleryItems, color: '#8B5CF6', bg: '#F5F3FF', Icon: Images, href: '/admin/galeri' },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Gösterge Paneli</h1>
        <p className="text-slate-400 text-sm mt-1">Güncel durumunuz.</p>
      </div>

      {loading ? (
        <div className="flex items-center gap-2 text-slate-400 text-sm">
          <div className="w-4 h-4 border-2 border-[#E11D48] border-t-transparent rounded-full animate-spin" />
          Yükleniyor...
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-10">
            {cards.map((card) => {
              const Icon = card.Icon
              return (
                <Link
                  key={card.label}
                  href={card.href}
                  className="bg-white rounded-2xl p-5 border border-slate-100 hover:shadow-md hover:border-slate-200 transition-all duration-200 cursor-pointer group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: card.bg }}>
                      <Icon size={18} style={{ color: card.color }} strokeWidth={2} />
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-slate-800 mb-1">{card.value}</p>
                  <p className="text-slate-400 text-xs leading-snug">{card.label}</p>
                </Link>
              )
            })}
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-slate-800">Son Rezervasyonlar</h2>
              <Link href="/admin/rezervasyonlar" className="text-[#E11D48] text-sm font-medium hover:underline cursor-pointer">
                Tümünü gör →
              </Link>
            </div>

            {recent.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 text-center text-slate-400 border border-slate-100 text-sm">
                Henüz rezervasyon yok.
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-100">
                      <th className="px-5 py-3.5 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Müşteri</th>
                      <th className="px-5 py-3.5 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Etkinlik</th>
                      <th className="px-5 py-3.5 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Tarih</th>
                      <th className="px-5 py-3.5 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Durum</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {recent.map((r) => (
                      <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-5 py-4">
                          <div className="font-medium text-slate-800 text-sm">{r.customerName}</div>
                          <div className="text-slate-400 text-xs">{r.email}</div>
                        </td>
                        <td className="px-5 py-4 text-sm text-slate-600">{r.eventType}</td>
                        <td className="px-5 py-4 text-sm text-slate-400">
                          {r.createdAt?.toDate?.()?.toLocaleDateString('tr-TR') ?? '—'}
                        </td>
                        <td className="px-5 py-4">
                          <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[r.status]}`}>
                            {STATUS_LABELS[r.status]}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
