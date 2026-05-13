'use client'
import { useEffect, useState } from 'react'
import { getAllReservations } from '@/lib/firebase/reservations'
import { getAllTestimonials } from '@/lib/firebase/testimonials'
import { getAllServices } from '@/lib/firebase/services'
import { getAllGalleryItems } from '@/lib/firebase/gallery'
import Link from 'next/link'

export default function DashboardPage() {
  const [stats, setStats] = useState({
    reservations: 0,
    newReservations: 0,
    pendingTestimonials: 0,
    activeServices: 0,
    galleryItems: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const [reservations, testimonials, services, gallery] = await Promise.all([
        getAllReservations(),
        getAllTestimonials(),
        getAllServices(),
        getAllGalleryItems(),
      ])
      setStats({
        reservations: reservations.length,
        newReservations: reservations.filter((r) => r.status === 'new').length,
        pendingTestimonials: testimonials.filter((t) => !t.approved).length,
        activeServices: services.filter((s) => s.active).length,
        galleryItems: gallery.length,
      })
      setLoading(false)
    }
    load()
  }, [])

  const cards = [
    { label: 'Toplam Rezervasyon', value: stats.reservations, color: '#3b82f6', icon: '📅', href: '/admin/rezervasyonlar' },
    { label: 'Yeni Rezervasyon', value: stats.newReservations, color: '#f59e0b', icon: '🔔', href: '/admin/rezervasyonlar' },
    { label: 'Onay Bekleyen Yorum', value: stats.pendingTestimonials, color: '#8b5cf6', icon: '⭐', href: '/admin/yorumlar' },
    { label: 'Aktif Hizmet', value: stats.activeServices, color: '#10b981', icon: '✨', href: '/admin/hizmetler' },
    { label: 'Galeri Öğesi', value: stats.galleryItems, color: '#C9A84C', icon: '🖼️', href: '/admin/galeri' },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Gösterge Paneli</h1>
      <p className="text-gray-500 text-sm mb-8">Hoş geldiniz. İşte güncel durumunuz.</p>
      {loading ? (
        <div className="text-gray-500">Yükleniyor...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card) => (
            <Link
              key={card.label}
              href={card.href}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">{card.label}</p>
                  <p className="text-4xl font-bold mt-1" style={{ color: card.color }}>{card.value}</p>
                </div>
                <span className="text-4xl opacity-80">{card.icon}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
