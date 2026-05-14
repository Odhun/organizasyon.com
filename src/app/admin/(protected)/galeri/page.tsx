'use client'
import { useEffect, useState } from 'react'
import { getAllGalleryItems, updateGalleryItem, deleteGalleryItem, createGalleryItem } from '@/lib/firebase/gallery'
import { seedGallery } from '@/lib/seed'
import type { GalleryItem } from '@/types/models'

const CATEGORIES = [
  { value: 'dugun', label: 'Düğün / Nişan / Kına' },
  { value: 'dogum_gunu', label: 'Doğum Günü / Baby Shower' },
  { value: 'kurumsal', label: 'Kurumsal / Açılış' },
  { value: 'mezuniyet', label: 'Mezuniyet / Sünnet' },
]

type FormState = {
  titleTr: string
  titleEn: string
  category: string
  coverImage: string
  images: string
  order: number
  active: boolean
}

const emptyForm: FormState = { titleTr: '', titleEn: '', category: 'dugun', coverImage: '', images: '', order: 0, active: true }

function itemToForm(item: GalleryItem): FormState {
  return { titleTr: item.title.tr, titleEn: item.title.en, category: item.category, coverImage: item.coverImage, images: item.images.join('\n'), order: item.order, active: item.active }
}

export default function GaleriPage() {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState<'add' | 'edit' | null>(null)
  const [editTarget, setEditTarget] = useState<GalleryItem | null>(null)
  const [form, setForm] = useState<FormState>(emptyForm)
  const [saving, setSaving] = useState(false)
  const [seeding, setSeeding] = useState(false)

  useEffect(() => { load() }, [])

  async function load() {
    setLoading(true)
    setItems(await getAllGalleryItems())
    setLoading(false)
  }

  function openAdd() { setForm(emptyForm); setEditTarget(null); setModal('add') }
  function openEdit(item: GalleryItem) { setForm(itemToForm(item)); setEditTarget(item); setModal('edit') }
  function closeModal() { setModal(null); setEditTarget(null) }
  function f(key: keyof FormState, val: string | number | boolean) { setForm((prev) => ({ ...prev, [key]: val })) }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    const data = {
      title: { tr: form.titleTr, en: form.titleEn || form.titleTr },
      category: form.category,
      coverImage: form.coverImage,
      images: form.images.split('\n').map((s) => s.trim()).filter(Boolean),
      order: form.order,
      active: form.active,
    }
    if (modal === 'edit' && editTarget) {
      await updateGalleryItem(editTarget.id, data)
    } else {
      await createGalleryItem(data)
    }
    await load()
    closeModal()
    setSaving(false)
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

  const ic = "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#E11D48] transition-colors"
  const lc = "block text-sm font-medium text-gray-700 mb-1"

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Galeri</h1>
        <button onClick={openAdd} className="bg-[#E11D48] hover:bg-[#BE123C] text-white font-semibold px-4 py-2 rounded-lg text-sm transition-colors">
          + Yeni Ekle
        </button>
      </div>

      {loading ? (
        <div className="text-gray-500">Yükleniyor...</div>
      ) : items.length === 0 ? (
        <div className="bg-white rounded-xl p-8 text-center border border-gray-100">
          <p className="text-gray-500 mb-4">Galeri öğesi bulunamadı.</p>
          <button
            onClick={async () => { setSeeding(true); await seedGallery(); await load(); setSeeding(false) }}
            disabled={seeding}
            className="bg-[#E11D48] hover:bg-[#BE123C] disabled:opacity-50 text-white font-semibold px-5 py-2 rounded-lg text-sm transition-colors"
          >
            {seeding ? 'İçe Aktarılıyor...' : 'Örnek Galeriyi İçe Aktar'}
          </button>
        </div>
      ) : (
        <div className="grid gap-3">
          {items.map((item) => (
            <div key={item.id} className={`bg-white rounded-xl p-4 shadow-sm border flex items-center gap-4 ${!item.active ? 'opacity-60 border-gray-200' : 'border-gray-100'}`}>
              {item.coverImage && <img src={item.coverImage} alt={item.title.tr} className="w-16 h-16 object-cover rounded-lg shrink-0" />}
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 text-sm">{item.title.tr}</p>
                <p className="text-gray-400 text-xs mt-0.5">
                  {CATEGORIES.find((c) => c.value === item.category)?.label ?? item.category}
                  {' · '}{item.images.length} görsel
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button onClick={() => openEdit(item)} className="px-3 py-1.5 bg-[#E11D48] text-white hover:bg-[#BE123C] rounded-lg text-xs font-medium transition-colors">
                  Düzenle
                </button>
                <button onClick={() => handleToggleActive(item)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${item.active ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                  {item.active ? 'Aktif' : 'Pasif'}
                </button>
                <button onClick={() => handleDelete(item.id)} className="px-3 py-1.5 bg-red-100 text-red-700 hover:bg-red-200 rounded-lg text-xs font-medium transition-colors">
                  Sil
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-900">{modal === 'add' ? 'Yeni Galeri Öğesi' : 'Galeri Öğesini Düzenle'}</h2>
                <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">✕</button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className={lc}>Başlık (TR) *</label>
                  <input value={form.titleTr} onChange={(e) => f('titleTr', e.target.value)} required className={ic} />
                </div>
                <div>
                  <label className={lc}>Başlık (EN)</label>
                  <input value={form.titleEn} onChange={(e) => f('titleEn', e.target.value)} className={ic} placeholder="Boş bırakılırsa TR kullanılır" />
                </div>
                <div>
                  <label className={lc}>Kategori</label>
                  <select value={form.category} onChange={(e) => f('category', e.target.value)} className={ic}>
                    {CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                  </select>
                </div>

                <div>
                  <label className={lc}>Kapak Görsel URL *</label>
                  <input value={form.coverImage} onChange={(e) => f('coverImage', e.target.value)} required className={ic} placeholder="https://..." />
                  {form.coverImage && <img src={form.coverImage} alt="" className="mt-2 h-24 w-auto rounded-lg object-cover" />}
                </div>

                <div>
                  <label className={lc}>Galeri Görselleri — her satıra bir URL</label>
                  <textarea value={form.images} onChange={(e) => f('images', e.target.value)} rows={5} className={ic} placeholder={'https://...\nhttps://...\nhttps://...'} />
                  {form.images.trim() && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {form.images.split('\n').map((s) => s.trim()).filter(Boolean).map((url, i) => (
                        <img key={i} src={url} alt="" className="h-16 w-16 object-cover rounded-lg" />
                      ))}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={lc}>Sıra</label>
                    <input type="number" value={form.order} onChange={(e) => f('order', parseInt(e.target.value) || 0)} className={ic} />
                  </div>
                  <div className="flex items-end pb-1">
                    <div className="flex items-center gap-2">
                      <button type="button" onClick={() => f('active', !form.active)}
                        className={`relative w-12 h-6 rounded-full overflow-hidden transition-colors ${form.active ? 'bg-[#E11D48]' : 'bg-gray-200'}`}>
                        <span className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${form.active ? 'translate-x-5' : 'translate-x-0'}`} />
                      </button>
                      <span className="text-sm font-medium text-gray-700">Aktif</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={closeModal} className="flex-1 border border-gray-200 text-gray-600 rounded-lg py-2.5 text-sm font-medium hover:bg-gray-50 transition-colors">İptal</button>
                  <button type="submit" disabled={saving} className="flex-1 bg-[#E11D48] hover:bg-[#BE123C] text-white font-semibold rounded-lg py-2.5 text-sm transition-colors disabled:opacity-50">
                    {saving ? 'Kaydediliyor...' : modal === 'add' ? 'Ekle' : 'Güncelle'}
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
