'use client'
import { useEffect, useState } from 'react'
import { getAllServices, updateService, deleteService } from '@/lib/firebase/services'
import type { Service } from '@/types/models'

const CATEGORY_LABELS: Record<string, string> = {
  dugun: 'Düğün / Nişan / Kına',
  dogum_gunu: 'Doğum Günü / Baby Shower',
  kurumsal: 'Kurumsal / Açılış',
  mezuniyet: 'Mezuniyet / Sünnet',
}

export default function HizmetlerPage() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [editingPrice, setEditingPrice] = useState<string | null>(null)
  const [price, setPrice] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => { load() }, [])

  async function load() {
    setLoading(true)
    const data = await getAllServices()
    setServices(data)
    setLoading(false)
  }

  async function handleToggleActive(service: Service) {
    await updateService(service.id, { active: !service.active })
    await load()
  }

  async function handleSavePrice(id: string) {
    setSaving(true)
    await updateService(id, { priceRange: price })
    setEditingPrice(null)
    await load()
    setSaving(false)
  }

  async function handleDelete(id: string) {
    if (!confirm('Bu hizmeti kalıcı olarak silmek istediğinize emin misiniz?')) return
    await deleteService(id)
    await load()
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Hizmetler</h1>
      {loading ? (
        <div className="text-gray-500">Yükleniyor...</div>
      ) : services.length === 0 ? (
        <div className="bg-white rounded-xl p-8 text-center text-gray-500 border border-gray-100">
          Hizmet bulunamadı.
        </div>
      ) : (
        <div className="grid gap-4">
          {services.map((s) => (
            <div
              key={s.id}
              className={`bg-white rounded-xl p-6 shadow-sm border ${!s.active ? 'border-gray-200 opacity-60' : 'border-gray-100'}`}
            >
              <div className="flex items-start gap-4">
                {s.coverImage && (
                  <img src={s.coverImage} alt={s.title.tr} className="w-20 h-20 object-cover rounded-xl shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className="font-semibold text-gray-900">{s.title.tr}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      s.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {s.active ? 'Aktif' : 'Pasif'}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm mb-3">{CATEGORY_LABELS[s.category] ?? s.category}</p>

                  {editingPrice === s.id ? (
                    <div className="flex items-center gap-2 flex-wrap">
                      <input
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-[#C9A84C] w-52"
                        placeholder="örn. 15.000₺ - 30.000₺"
                      />
                      <button
                        onClick={() => handleSavePrice(s.id)}
                        disabled={saving}
                        className="px-3 py-1.5 bg-[#C9A84C] text-gray-900 rounded-lg text-xs font-semibold disabled:opacity-50"
                      >
                        Kaydet
                      </button>
                      <button
                        onClick={() => setEditingPrice(null)}
                        className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium"
                      >
                        İptal
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600 font-medium">
                        {s.priceRange || <span className="text-gray-400 italic">Fiyat belirtilmemiş</span>}
                      </span>
                      <button
                        onClick={() => { setEditingPrice(s.id); setPrice(s.priceRange ?? '') }}
                        className="text-[#C9A84C] text-xs hover:underline font-medium"
                      >
                        Düzenle
                      </button>
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-2 shrink-0">
                  <button
                    onClick={() => handleToggleActive(s)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      s.active
                        ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                    }`}
                  >
                    {s.active ? 'Pasife Al' : 'Aktife Al'}
                  </button>
                  <button
                    onClick={() => handleDelete(s.id)}
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
