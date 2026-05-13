'use client'
import { useEffect, useState } from 'react'
import { getAllGalleryItems, updateGalleryItem, deleteGalleryItem, createGalleryItem } from '@/lib/firebase/gallery'
import type { GalleryItem } from '@/types/models'

const CATEGORIES = [
  { value: 'dugun', label: 'Düğün / Nişan / Kına' },
  { value: 'dogum_gunu', label: 'Doğum Günü / Baby Shower' },
  { value: 'kurumsal', label: 'Kurumsal / Açılış' },
  { value: 'mezuniyet', label: 'Mezuniyet / Sünnet' },
]

const emptyForm = {
  titleTr: '',
  titleEn: '',
  category: 'dugun',
  coverImage: '',
  images: '',
  order: 0,
}

export default function GaleriPage() {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [showAdd, setShowAdd] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)

  useEffect(() => { load() }, [])

  async function load() {
    setLoading(true)
    const data = await getAllGalleryItems()
    setItems(data)
    setLoading(false)
  }

  async function handleToggleActive(item: GalleryItem) {
    await updateGalleryItem(item.id, { active: !item.active })
    await load()
  }

  async function handleDelete(id: string) {
    if (!confirm('Bu galeri öğesini kalıcı olarak silmek istediğinize emin misiniz?')) return
    await deleteGalleryItem(id)
    await load()
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    await createGalleryItem({
      title: { tr: form.titleTr, en: form.titleEn || form.titleTr },
      category: form.category,
      coverImage: form.coverImage,
      images: form.images.split('\n').map((s) => s.trim()).filter(Boolean),
      order: form.order,
      active: true,
    })
    setShowAdd(false)
    setForm(emptyForm)
    await load()
    setSaving(false)
  }

  const inputClass = "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#C9A84C] transition-colors"

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Galeri</h1>
        <button
          onClick={() => setShowAdd(true)}
          className="bg-[#C9A84C] hover:bg-[#b8963e] text-gray-900 font-semibold px-4 py-2 rounded-lg text-sm transition-colors"
        >
          + Yeni Ekle
        </button>
      </div>

      {loading ? (
        <div className="text-gray-500">Yükleniyor...</div>
      ) : items.length === 0 ? (
        <div className="bg-white rounded-xl p-8 text-center text-gray-500 border border-gray-100">
          Galeri öğesi bulunamadı.
        </div>
      ) : (
        <div className="grid gap-3">
          {items.map((item) => (
            <div
              key={item.id}
              className={`bg-white rounded-xl p-4 shadow-sm border flex items-center gap-4 ${!item.active ? 'opacity-60 border-gray-200' : 'border-gray-100'}`}
            >
              {item.coverImage && (
                <img src={item.coverImage} alt={item.title.tr} className="w-16 h-16 object-cover rounded-lg shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 text-sm">{item.title.tr}</p>
                <p className="text-gray-400 text-xs mt-0.5">
                  {CATEGORIES.find((c) => c.value === item.category)?.label ?? item.category}
                  {' · '}{item.images.length} görsel
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => handleToggleActive(item)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    item.active
                      ? 'bg-green-100 text-green-700 hover:bg-green-200'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {item.active ? 'Aktif' : 'Pasif'}
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="px-3 py-1.5 bg-red-100 text-red-700 hover:bg-red-200 rounded-lg text-xs font-medium transition-colors"
                >
                  Sil
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-900">Yeni Galeri Öğesi</h2>
                <button onClick={() => setShowAdd(false)} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">✕</button>
              </div>
              <form onSubmit={handleAdd} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Başlık (TR) *</label>
                  <input value={form.titleTr} onChange={(e) => setForm({ ...form, titleTr: e.target.value })} required className={inputClass} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Başlık (EN)</label>
                  <input value={form.titleEn} onChange={(e) => setForm({ ...form, titleEn: e.target.value })} className={inputClass} placeholder="Boş bırakılırsa TR başlık kullanılır" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                  <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className={inputClass}>
                    {CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Kapak Görsel URL *</label>
                  <input value={form.coverImage} onChange={(e) => setForm({ ...form, coverImage: e.target.value })} required className={inputClass} placeholder="https://..." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Görsel URL'leri (her satıra bir tane)</label>
                  <textarea value={form.images} onChange={(e) => setForm({ ...form, images: e.target.value })} rows={4} className={inputClass} placeholder="https://..." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sıra Numarası</label>
                  <input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) || 0 })} className={inputClass} />
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setShowAdd(false)} className="flex-1 border border-gray-200 text-gray-600 rounded-lg py-2.5 text-sm font-medium hover:bg-gray-50 transition-colors">
                    İptal
                  </button>
                  <button type="submit" disabled={saving} className="flex-1 bg-[#C9A84C] hover:bg-[#b8963e] text-gray-900 font-semibold rounded-lg py-2.5 text-sm transition-colors disabled:opacity-50">
                    {saving ? 'Kaydediliyor...' : 'Kaydet'}
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
