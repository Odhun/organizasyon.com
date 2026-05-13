'use client'
import { useEffect, useState } from 'react'
import { getAllServices, createService, updateService, deleteService } from '@/lib/firebase/services'
import { seedServices } from '@/lib/seed'
import type { Service } from '@/types/models'

const CATEGORIES = [
  { value: 'dugun', label: 'Düğün / Nişan / Kına' },
  { value: 'dogum_gunu', label: 'Doğum Günü / Baby Shower' },
  { value: 'kurumsal', label: 'Kurumsal / Açılış' },
  { value: 'mezuniyet', label: 'Mezuniyet / Sünnet' },
] as const

type Category = typeof CATEGORIES[number]['value']

type FormState = {
  titleTr: string
  titleEn: string
  slug: string
  category: Category
  shortDescTr: string
  shortDescEn: string
  descTr: string
  descEn: string
  featuresTr: string
  featuresEn: string
  priceRange: string
  coverImage: string
  galleryImages: string
  order: number
  active: boolean
}

const emptyForm: FormState = {
  titleTr: '', titleEn: '', slug: '', category: 'dugun',
  shortDescTr: '', shortDescEn: '', descTr: '', descEn: '',
  featuresTr: '', featuresEn: '', priceRange: '', coverImage: '',
  galleryImages: '', order: 0, active: true,
}

function toSlug(s: string) {
  return s.toLowerCase().replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's').replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

function serviceToForm(s: Service): FormState {
  return {
    titleTr: s.title.tr, titleEn: s.title.en, slug: s.slug,
    category: s.category, shortDescTr: s.shortDescription.tr, shortDescEn: s.shortDescription.en,
    descTr: s.description.tr, descEn: s.description.en,
    featuresTr: s.features.tr.join('\n'), featuresEn: s.features.en.join('\n'),
    priceRange: s.priceRange ?? '', coverImage: s.coverImage,
    galleryImages: (s.galleryImages ?? []).join('\n'), order: s.order, active: s.active,
  }
}

export default function HizmetlerPage() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState<'add' | 'edit' | null>(null)
  const [editTarget, setEditTarget] = useState<Service | null>(null)
  const [form, setForm] = useState<FormState>(emptyForm)
  const [saving, setSaving] = useState(false)
  const [seeding, setSeeding] = useState(false)
  const [activeTab, setActiveTab] = useState<'tr' | 'en'>('tr')

  useEffect(() => { load() }, [])

  async function load() {
    setLoading(true)
    setServices(await getAllServices())
    setLoading(false)
  }

  function openAdd() { setForm(emptyForm); setEditTarget(null); setModal('add'); setActiveTab('tr') }
  function openEdit(s: Service) { setForm(serviceToForm(s)); setEditTarget(s); setModal('edit'); setActiveTab('tr') }
  function closeModal() { setModal(null); setEditTarget(null) }

  function f(key: keyof FormState, val: string | number | boolean) {
    setForm((prev) => {
      const next = { ...prev, [key]: val }
      if (key === 'titleTr' && modal === 'add') next.slug = toSlug(val as string)
      return next
    })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    const data = {
      title: { tr: form.titleTr, en: form.titleEn || form.titleTr },
      slug: form.slug || toSlug(form.titleTr),
      category: form.category,
      shortDescription: { tr: form.shortDescTr, en: form.shortDescEn || form.shortDescTr },
      description: { tr: form.descTr, en: form.descEn || form.descTr },
      features: {
        tr: form.featuresTr.split('\n').map((s) => s.trim()).filter(Boolean),
        en: form.featuresEn.split('\n').map((s) => s.trim()).filter(Boolean),
      },
      priceRange: form.priceRange || undefined,
      coverImage: form.coverImage,
      galleryImages: form.galleryImages.split('\n').map((s) => s.trim()).filter(Boolean),
      order: form.order,
      active: form.active,
    }
    if (modal === 'edit' && editTarget) {
      await updateService(editTarget.id, data)
    } else {
      await createService(data)
    }
    await load()
    closeModal()
    setSaving(false)
  }

  async function handleDelete(id: string) {
    if (!confirm('Bu hizmeti kalıcı olarak silmek istediğinize emin misiniz?')) return
    await deleteService(id)
    await load()
  }

  async function handleToggleActive(s: Service) {
    await updateService(s.id, { active: !s.active })
    await load()
  }

  const ic = "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#E11D48] transition-colors"
  const lc = "block text-sm font-medium text-gray-700 mb-1"

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Hizmetler</h1>
        <button onClick={openAdd} className="bg-[#E11D48] hover:bg-[#BE123C] text-white font-semibold px-4 py-2 rounded-lg text-sm transition-colors">
          + Yeni Hizmet
        </button>
      </div>

      {loading ? (
        <div className="text-gray-500">Yükleniyor...</div>
      ) : services.length === 0 ? (
        <div className="bg-white rounded-xl p-8 text-center border border-gray-100">
          <p className="text-gray-500 mb-4">Hizmet bulunamadı.</p>
          <button
            onClick={async () => { setSeeding(true); await seedServices(); await load(); setSeeding(false) }}
            disabled={seeding}
            className="bg-[#E11D48] hover:bg-[#BE123C] disabled:opacity-50 text-white font-semibold px-5 py-2 rounded-lg text-sm transition-colors"
          >
            {seeding ? 'İçe Aktarılıyor...' : 'Örnek Hizmetleri İçe Aktar'}
          </button>
        </div>
      ) : (
        <div className="grid gap-4">
          {services.map((s) => (
            <div key={s.id} className={`bg-white rounded-xl p-6 shadow-sm border ${!s.active ? 'border-gray-200 opacity-60' : 'border-gray-100'}`}>
              <div className="flex items-start gap-4">
                {s.coverImage && <img src={s.coverImage} alt={s.title.tr} className="w-20 h-20 object-cover rounded-xl shrink-0" />}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className="font-semibold text-gray-900">{s.title.tr}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${s.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {s.active ? 'Aktif' : 'Pasif'}
                    </span>
                  </div>
                  <p className="text-gray-400 text-xs mb-1">{CATEGORIES.find((c) => c.value === s.category)?.label ?? s.category}</p>
                  <p className="text-gray-500 text-sm line-clamp-2">{s.shortDescription.tr}</p>
                  {s.priceRange && <p className="text-[#E11D48] text-sm font-medium mt-1">{s.priceRange}</p>}
                </div>
                <div className="flex flex-col gap-2 shrink-0">
                  <button onClick={() => openEdit(s)} className="px-3 py-1.5 bg-[#E11D48] text-white hover:bg-[#BE123C] rounded-lg text-xs font-medium transition-colors">
                    Düzenle
                  </button>
                  <button onClick={() => handleToggleActive(s)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${s.active ? 'bg-gray-100 text-gray-600 hover:bg-gray-200' : 'bg-green-100 text-green-700 hover:bg-green-200'}`}>
                    {s.active ? 'Pasife Al' : 'Aktife Al'}
                  </button>
                  <button onClick={() => handleDelete(s.id)} className="px-3 py-1.5 bg-red-100 text-red-700 hover:bg-red-200 rounded-lg text-xs font-medium transition-colors">
                    Sil
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-900">{modal === 'add' ? 'Yeni Hizmet Ekle' : 'Hizmeti Düzenle'}</h2>
                <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">✕</button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Dil sekmesi */}
                <div className="flex gap-2 border-b border-gray-100 pb-3">
                  {(['tr', 'en'] as const).map((lang) => (
                    <button key={lang} type="button" onClick={() => setActiveTab(lang)}
                      className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${activeTab === lang ? 'bg-[#E11D48] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                      {lang.toUpperCase()}
                    </button>
                  ))}
                </div>

                {activeTab === 'tr' ? (
                  <div className="space-y-4">
                    <div><label className={lc}>Başlık (TR) *</label><input value={form.titleTr} onChange={(e) => f('titleTr', e.target.value)} required className={ic} /></div>
                    <div><label className={lc}>Kısa Açıklama (TR) *</label><textarea value={form.shortDescTr} onChange={(e) => f('shortDescTr', e.target.value)} required rows={2} className={ic} /></div>
                    <div><label className={lc}>Tam Açıklama (TR)</label><textarea value={form.descTr} onChange={(e) => f('descTr', e.target.value)} rows={4} className={ic} /></div>
                    <div><label className={lc}>Özellikler (TR) — her satıra bir tane</label><textarea value={form.featuresTr} onChange={(e) => f('featuresTr', e.target.value)} rows={4} className={ic} placeholder="Kişisel danışman&#10;Dekorasyon dahil&#10;7/24 destek" /></div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div><label className={lc}>Başlık (EN)</label><input value={form.titleEn} onChange={(e) => f('titleEn', e.target.value)} className={ic} placeholder="Boş bırakılırsa TR kullanılır" /></div>
                    <div><label className={lc}>Kısa Açıklama (EN)</label><textarea value={form.shortDescEn} onChange={(e) => f('shortDescEn', e.target.value)} rows={2} className={ic} /></div>
                    <div><label className={lc}>Tam Açıklama (EN)</label><textarea value={form.descEn} onChange={(e) => f('descEn', e.target.value)} rows={4} className={ic} /></div>
                    <div><label className={lc}>Özellikler (EN) — her satıra bir tane</label><textarea value={form.featuresEn} onChange={(e) => f('featuresEn', e.target.value)} rows={4} className={ic} /></div>
                  </div>
                )}

                <div className="border-t border-gray-100 pt-4 grid grid-cols-2 gap-4">
                  <div>
                    <label className={lc}>Slug</label>
                    <input value={form.slug} onChange={(e) => f('slug', e.target.value)} className={ic} placeholder="otomatik oluşturulur" />
                  </div>
                  <div>
                    <label className={lc}>Kategori</label>
                    <select value={form.category} onChange={(e) => f('category', e.target.value)} className={ic}>
                      {CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={lc}>Fiyat Aralığı</label>
                    <input value={form.priceRange} onChange={(e) => f('priceRange', e.target.value)} className={ic} placeholder="15.000₺ – 30.000₺" />
                  </div>
                  <div>
                    <label className={lc}>Sıra</label>
                    <input type="number" value={form.order} onChange={(e) => f('order', parseInt(e.target.value) || 0)} className={ic} />
                  </div>
                  <div className="col-span-2">
                    <label className={lc}>Kapak Görsel URL *</label>
                    <input value={form.coverImage} onChange={(e) => f('coverImage', e.target.value)} required className={ic} placeholder="https://..." />
                  </div>
                  <div className="col-span-2">
                    <label className={lc}>Galeri Görselleri (her satıra bir URL)</label>
                    <textarea value={form.galleryImages} onChange={(e) => f('galleryImages', e.target.value)} rows={3} className={ic} placeholder="https://..." />
                  </div>
                  <div className="col-span-2 flex items-center gap-3">
                    <button type="button" onClick={() => f('active', !form.active)}
                      className={`relative w-12 h-6 rounded-full transition-colors ${form.active ? 'bg-[#E11D48]' : 'bg-gray-200'}`}>
                      <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${form.active ? 'translate-x-7' : 'translate-x-1'}`} />
                    </button>
                    <span className="text-sm font-medium text-gray-700">Aktif</span>
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
