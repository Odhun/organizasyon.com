'use client'
import { useEffect, useState } from 'react'
import { getAllTestimonials, approveTestimonial, rejectTestimonial, deleteTestimonial } from '@/lib/firebase/testimonials'
import type { Testimonial } from '@/types/models'

export default function YorumlarPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'pending' | 'approved' | 'all'>('pending')

  useEffect(() => { load() }, [])

  async function load() {
    setLoading(true)
    const data = await getAllTestimonials()
    setTestimonials(data)
    setLoading(false)
  }

  async function handleApprove(id: string) {
    await approveTestimonial(id)
    await load()
  }

  async function handleReject(id: string) {
    await rejectTestimonial(id)
    await load()
  }

  async function handleDelete(id: string) {
    if (!confirm('Bu yorumu kalıcı olarak silmek istediğinize emin misiniz?')) return
    await deleteTestimonial(id)
    await load()
  }

  const filtered = testimonials.filter((t) => {
    if (filter === 'pending') return !t.approved
    if (filter === 'approved') return t.approved
    return true
  })

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Müşteri Yorumları</h1>

      <div className="flex gap-2 mb-6 flex-wrap">
        {[
          { key: 'pending', label: 'Onay Bekleyen', count: testimonials.filter((t) => !t.approved).length },
          { key: 'approved', label: 'Onaylananlar', count: testimonials.filter((t) => t.approved).length },
          { key: 'all', label: 'Tümü', count: testimonials.length },
        ].map(({ key, label, count }) => (
          <button
            key={key}
            onClick={() => setFilter(key as typeof filter)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === key
                ? 'bg-[#C9A84C] text-gray-900'
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            {label} ({count})
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-gray-500">Yükleniyor...</div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-xl p-8 text-center text-gray-500 border border-gray-100">
          Yorum bulunamadı.
        </div>
      ) : (
        <div className="grid gap-4">
          {filtered.map((t) => (
            <div key={t.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <span className="font-semibold text-gray-900">{t.customerName}</span>
                    <span className="text-gray-400 text-sm">· {t.eventType}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      t.approved ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {t.approved ? 'Onaylı' : 'Bekliyor'}
                    </span>
                  </div>
                  <div className="text-yellow-400 mb-2 text-sm">
                    {'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{t.comment.tr}</p>
                </div>
                <div className="flex flex-col gap-2 shrink-0">
                  {!t.approved ? (
                    <button
                      onClick={() => handleApprove(t.id)}
                      className="px-3 py-1.5 bg-green-100 text-green-700 hover:bg-green-200 rounded-lg text-xs font-medium transition-colors"
                    >
                      Onayla
                    </button>
                  ) : (
                    <button
                      onClick={() => handleReject(t.id)}
                      className="px-3 py-1.5 bg-yellow-100 text-yellow-700 hover:bg-yellow-200 rounded-lg text-xs font-medium transition-colors"
                    >
                      Geri Al
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(t.id)}
                    className="px-3 py-1.5 bg-red-100 text-red-700 hover:bg-red-200 rounded-lg text-xs font-medium transition-colors"
                  >
                    Sil
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
