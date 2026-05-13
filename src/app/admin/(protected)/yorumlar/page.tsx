'use client'
import { useEffect, useState } from 'react'
import { getAllTestimonials, approveTestimonial, rejectTestimonial, deleteTestimonial, updateTestimonial } from '@/lib/firebase/testimonials'
import type { Testimonial } from '@/types/models'

const EVENT_TYPES = ['Düğün', 'Nişan', 'Kına', 'Doğum Günü', 'Baby Shower', 'Kurumsal', 'Açılış', 'Mezuniyet', 'Sünnet', 'Diğer']

type EditForm = {
  customerName: string
  eventType: string
  rating: 1 | 2 | 3 | 4 | 5
  commentTr: string
  commentEn: string
  approved: boolean
}

export default function YorumlarPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'pending' | 'approved' | 'all'>('pending')
  const [editTarget, setEditTarget] = useState<Testimonial | null>(null)
  const [form, setForm] = useState<EditForm>({ customerName: '', eventType: '', rating: 5, commentTr: '', commentEn: '', approved: false })
  const [saving, setSaving] = useState(false)
  const [hoverRating, setHoverRating] = useState(0)

  useEffect(() => { load() }, [])

  async function load() {
    setLoading(true)
    const data = await getAllTestimonials()
    setTestimonials(data)
    setLoading(false)
  }

  function openEdit(t: Testimonial) {
    setForm({ customerName: t.customerName, eventType: t.eventType, rating: t.rating, commentTr: t.comment.tr, commentEn: t.comment.en ?? '', approved: t.approved })
    setEditTarget(t)
  }

  function closeEdit() { setEditTarget(null) }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    if (!editTarget) return
    setSaving(true)
    await updateTestimonial(editTarget.id, {
      customerName: form.customerName,
      eventType: form.eventType,
      rating: form.rating,
      comment: { tr: form.commentTr, en: form.commentEn || undefined },
      approved: form.approved,
    })
    await load()
    closeEdit()
    setSaving(false)
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

  const ic = "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#E11D48] transition-colors"
  const lc = "block text-sm font-medium text-gray-700 mb-1"

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
                ? 'bg-[#E11D48] text-white'
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
                  {t.comment.en && <p className="text-gray-400 text-xs mt-1 italic">{t.comment.en}</p>}
                </div>
                <div className="flex flex-col gap-2 shrink-0">
                  <button
                    onClick={() => openEdit(t)}
                    className="px-3 py-1.5 bg-[#E11D48] text-white hover:bg-[#BE123C] rounded-lg text-xs font-medium transition-colors"
                  >
                    Düzenle
                  </button>
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

      {/* Edit modal */}
      {editTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold text-gray-900">Yorumu Düzenle</h2>
                <button onClick={closeEdit} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">✕</button>
              </div>
              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className={lc}>Müşteri Adı</label>
                  <input value={form.customerName} onChange={(e) => setForm({ ...form, customerName: e.target.value })} required className={ic} />
                </div>
                <div>
                  <label className={lc}>Etkinlik Türü</label>
                  <select value={form.eventType} onChange={(e) => setForm({ ...form, eventType: e.target.value })} className={ic}>
                    {EVENT_TYPES.map((et) => <option key={et} value={et}>{et}</option>)}
                  </select>
                </div>
                <div>
                  <label className={lc}>Puan</label>
                  <div className="flex gap-1 mt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => setForm({ ...form, rating: star as 1 | 2 | 3 | 4 | 5 })}
                        className="text-2xl transition-colors"
                      >
                        <span className={(hoverRating || form.rating) >= star ? 'text-yellow-400' : 'text-gray-300'}>★</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className={lc}>Yorum (TR)</label>
                  <textarea value={form.commentTr} onChange={(e) => setForm({ ...form, commentTr: e.target.value })} required rows={3} className={ic} />
                </div>
                <div>
                  <label className={lc}>Yorum (EN) — isteğe bağlı</label>
                  <textarea value={form.commentEn} onChange={(e) => setForm({ ...form, commentEn: e.target.value })} rows={3} className={ic} />
                </div>
                <div className="flex items-center gap-3">
                  <button type="button" onClick={() => setForm({ ...form, approved: !form.approved })}
                    className={`relative w-12 h-6 rounded-full transition-colors ${form.approved ? 'bg-[#E11D48]' : 'bg-gray-200'}`}>
                    <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${form.approved ? 'translate-x-7' : 'translate-x-1'}`} />
                  </button>
                  <span className="text-sm font-medium text-gray-700">Onaylı</span>
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={closeEdit} className="flex-1 border border-gray-200 text-gray-600 rounded-lg py-2.5 text-sm font-medium hover:bg-gray-50 transition-colors">İptal</button>
                  <button type="submit" disabled={saving} className="flex-1 bg-[#E11D48] hover:bg-[#BE123C] text-white font-semibold rounded-lg py-2.5 text-sm transition-colors disabled:opacity-50">
                    {saving ? 'Kaydediliyor...' : 'Güncelle'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
