'use client'
import { useEffect, useState } from 'react'
import { getAllReservations, updateReservationStatus } from '@/lib/firebase/reservations'
import type { Reservation } from '@/types/models'

const STATUS_LABELS: Record<Reservation['status'], string> = {
  new: 'Yeni',
  in_review: 'İnceleniyor',
  approved: 'Onaylandı',
  cancelled: 'İptal',
}

const STATUS_COLORS: Record<Reservation['status'], string> = {
  new: 'bg-blue-100 text-blue-800',
  in_review: 'bg-yellow-100 text-yellow-800',
  approved: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
}

export default function RezervasyonlarPage() {
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<Reservation['status'] | 'all'>('all')
  const [selected, setSelected] = useState<Reservation | null>(null)
  const [notes, setNotes] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => { load() }, [])

  async function load() {
    setLoading(true)
    const data = await getAllReservations()
    setReservations(data)
    setLoading(false)
  }

  async function handleStatusUpdate(id: string, status: Reservation['status']) {
    setSaving(true)
    await updateReservationStatus(id, status, notes)
    await load()
    setSelected(null)
    setSaving(false)
  }

  const filtered = filter === 'all' ? reservations : reservations.filter((r) => r.status === filter)

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Rezervasyonlar</h1>

      <div className="flex gap-2 mb-6 flex-wrap">
        {(['all', 'new', 'in_review', 'approved', 'cancelled'] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === s
                ? 'bg-[#C9A84C] text-gray-900'
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            {s === 'all' ? 'Tümü' : STATUS_LABELS[s]}
            <span className="ml-1.5 text-xs opacity-70">
              ({s === 'all' ? reservations.length : reservations.filter((r) => r.status === s).length})
            </span>
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Yükleniyor...</div>
        ) : filtered.length === 0 ? (
          <div className="p-8 text-center text-gray-500">Rezervasyon bulunamadı.</div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Müşteri</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Etkinlik</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Tarih</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Durum</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">İşlem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((r) => (
                <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-4">
                    <div className="font-medium text-gray-900 text-sm">{r.customerName}</div>
                    <div className="text-gray-400 text-xs">{r.email}</div>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600">{r.eventType}</td>
                  <td className="px-4 py-4 text-sm text-gray-600">
                    {r.eventDate?.toDate?.()?.toLocaleDateString('tr-TR') ?? '—'}
                  </td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[r.status]}`}>
                      {STATUS_LABELS[r.status]}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <button
                      onClick={() => { setSelected(r); setNotes(r.internalNotes ?? '') }}
                      className="text-[#C9A84C] hover:text-[#b8963e] text-sm font-medium"
                    >
                      Detay
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">{selected.customerName}</h2>
                  <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium mt-1 ${STATUS_COLORS[selected.status]}`}>
                    {STATUS_LABELS[selected.status]}
                  </span>
                </div>
                <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">✕</button>
              </div>
              <dl className="space-y-3 text-sm mb-6 bg-gray-50 rounded-xl p-4">
                {[
                  { label: 'E-posta', value: selected.email },
                  { label: 'Telefon', value: selected.phone },
                  { label: 'Etkinlik', value: selected.eventType },
                  { label: 'Tarih', value: selected.eventDate?.toDate?.()?.toLocaleDateString('tr-TR') ?? '—' },
                  { label: 'Misafir', value: selected.guestCount ? `${selected.guestCount} kişi` : null },
                  { label: 'Mekan', value: selected.location ?? null },
                  { label: 'Bütçe', value: selected.budget ?? null },
                  { label: 'Mesaj', value: selected.message },
                ].filter((f) => f.value).map(({ label, value }) => (
                  <div key={label} className="flex gap-3">
                    <dt className="text-gray-500 w-20 shrink-0">{label}</dt>
                    <dd className="text-gray-900">{value}</dd>
                  </div>
                ))}
              </dl>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">İç Notlar</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#C9A84C] transition-colors"
                  placeholder="Sadece siz görebilirsiniz..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Durumu Güncelle</label>
                <div className="flex flex-wrap gap-2">
                  {(['new', 'in_review', 'approved', 'cancelled'] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => handleStatusUpdate(selected.id, s)}
                      disabled={saving || selected.status === s}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors disabled:opacity-50 ${
                        selected.status === s
                          ? STATUS_COLORS[s] + ' cursor-default'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {STATUS_LABELS[s]}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
