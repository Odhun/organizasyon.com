'use client'
import { useEffect, useState } from 'react'
import { getSiteSettings, updateSiteSettings } from '@/lib/firebase/siteSettings'
import type { SiteSettings } from '@/types/models'

type Tab = 'contact' | 'social' | 'seo'

export default function AyarlarPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [activeTab, setActiveTab] = useState<Tab>('contact')

  const [contact, setContact] = useState({
    phone: '', whatsapp: '', email: '',
    addressTr: '', addressEn: '',
    workingHoursTr: '', workingHoursEn: '',
    mapsEmbedUrl: '',
  })
  const [social, setSocial] = useState({
    instagram: '', facebook: '', youtube: '', tiktok: '', pinterest: '',
  })
  const [seo, setSeo] = useState({
    defaultTitleTr: '', defaultTitleEn: '',
    defaultDescriptionTr: '', defaultDescriptionEn: '',
    keywordsTr: '', keywordsEn: '', ogImage: '',
  })

  useEffect(() => { load() }, [])

  async function load() {
    setLoading(true)
    const data = await getSiteSettings()
    if (data) {
      setSettings(data)
      setContact({
        phone: data.contact.phone ?? '',
        whatsapp: data.contact.whatsapp ?? '',
        email: data.contact.email ?? '',
        addressTr: data.contact.address.tr ?? '',
        addressEn: data.contact.address.en ?? '',
        workingHoursTr: data.contact.workingHours.tr ?? '',
        workingHoursEn: data.contact.workingHours.en ?? '',
        mapsEmbedUrl: data.contact.mapsEmbedUrl ?? '',
      })
      setSocial({
        instagram: data.social.instagram ?? '',
        facebook: data.social.facebook ?? '',
        youtube: data.social.youtube ?? '',
        tiktok: data.social.tiktok ?? '',
        pinterest: data.social.pinterest ?? '',
      })
      setSeo({
        defaultTitleTr: data.seo.defaultTitle.tr ?? '',
        defaultTitleEn: data.seo.defaultTitle.en ?? '',
        defaultDescriptionTr: data.seo.defaultDescription.tr ?? '',
        defaultDescriptionEn: data.seo.defaultDescription.en ?? '',
        keywordsTr: data.seo.keywords.tr ?? '',
        keywordsEn: data.seo.keywords.en ?? '',
        ogImage: data.seo.ogImage ?? '',
      })
    }
    setLoading(false)
  }

  async function handleSave() {
    setSaving(true)
    await updateSiteSettings({
      contact: {
        phone: contact.phone,
        whatsapp: contact.whatsapp,
        email: contact.email,
        address: { tr: contact.addressTr, en: contact.addressEn },
        workingHours: { tr: contact.workingHoursTr, en: contact.workingHoursEn },
        mapsEmbedUrl: contact.mapsEmbedUrl,
      },
      social: {
        instagram: social.instagram || undefined,
        facebook: social.facebook || undefined,
        youtube: social.youtube || undefined,
        tiktok: social.tiktok || undefined,
        pinterest: social.pinterest || undefined,
      },
      seo: {
        defaultTitle: { tr: seo.defaultTitleTr, en: seo.defaultTitleEn },
        defaultDescription: { tr: seo.defaultDescriptionTr, en: seo.defaultDescriptionEn },
        keywords: { tr: seo.keywordsTr, en: seo.keywordsEn },
        ogImage: seo.ogImage,
      },
    })
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
    setSaving(false)
  }

  const ic = "w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#C9A84C] transition-colors"
  const lc = "block text-sm font-medium text-gray-700 mb-1"

  const tabs: { key: Tab; label: string }[] = [
    { key: 'contact', label: 'İletişim' },
    { key: 'social', label: 'Sosyal Medya' },
    { key: 'seo', label: 'SEO' },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Site Ayarları</h1>
        <button
          onClick={handleSave}
          disabled={saving || loading}
          className={`font-semibold px-6 py-2.5 rounded-lg text-sm transition-colors disabled:opacity-50 ${
            saved
              ? 'bg-green-500 text-white'
              : 'bg-[#C9A84C] hover:bg-[#b8963e] text-gray-900'
          }`}
        >
          {saving ? 'Kaydediliyor...' : saved ? '✓ Kaydedildi' : 'Kaydet'}
        </button>
      </div>

      {loading ? (
        <div className="text-gray-500">Yükleniyor...</div>
      ) : !settings ? (
        <div className="bg-white rounded-xl p-8 text-center text-gray-500 border border-gray-100">
          Site ayarları henüz oluşturulmamış. Firebase&apos;de &apos;siteSettings/main&apos; dokümanını oluşturun.
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="flex border-b border-gray-100">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-6 py-4 text-sm font-medium transition-colors border-b-2 -mb-px ${
                  activeTab === tab.key
                    ? 'border-[#C9A84C] text-[#C9A84C]'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === 'contact' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={lc}>Telefon</label>
                  <input value={contact.phone} onChange={(e) => setContact({ ...contact, phone: e.target.value })} className={ic} placeholder="+90 555 000 00 00" />
                </div>
                <div>
                  <label className={lc}>WhatsApp</label>
                  <input value={contact.whatsapp} onChange={(e) => setContact({ ...contact, whatsapp: e.target.value })} className={ic} placeholder="+90 555 000 00 00" />
                </div>
                <div className="md:col-span-2">
                  <label className={lc}>E-posta</label>
                  <input type="email" value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} className={ic} />
                </div>
                <div>
                  <label className={lc}>Adres (TR)</label>
                  <textarea value={contact.addressTr} onChange={(e) => setContact({ ...contact, addressTr: e.target.value })} rows={3} className={ic} />
                </div>
                <div>
                  <label className={lc}>Adres (EN)</label>
                  <textarea value={contact.addressEn} onChange={(e) => setContact({ ...contact, addressEn: e.target.value })} rows={3} className={ic} />
                </div>
                <div>
                  <label className={lc}>Çalışma Saatleri (TR)</label>
                  <input value={contact.workingHoursTr} onChange={(e) => setContact({ ...contact, workingHoursTr: e.target.value })} className={ic} placeholder="Hft. içi 09:00–18:00" />
                </div>
                <div>
                  <label className={lc}>Çalışma Saatleri (EN)</label>
                  <input value={contact.workingHoursEn} onChange={(e) => setContact({ ...contact, workingHoursEn: e.target.value })} className={ic} placeholder="Mon–Fri 09:00–18:00" />
                </div>
                <div className="md:col-span-2">
                  <label className={lc}>Google Maps Embed URL</label>
                  <input value={contact.mapsEmbedUrl} onChange={(e) => setContact({ ...contact, mapsEmbedUrl: e.target.value })} className={ic} placeholder="https://www.google.com/maps/embed?..." />
                </div>
              </div>
            )}

            {activeTab === 'social' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { key: 'instagram', label: 'Instagram', placeholder: 'https://instagram.com/hesabiniz' },
                  { key: 'facebook', label: 'Facebook', placeholder: 'https://facebook.com/sayfaniz' },
                  { key: 'youtube', label: 'YouTube', placeholder: 'https://youtube.com/@kanaliniz' },
                  { key: 'tiktok', label: 'TikTok', placeholder: 'https://tiktok.com/@hesabiniz' },
                  { key: 'pinterest', label: 'Pinterest', placeholder: 'https://pinterest.com/hesabiniz' },
                ].map(({ key, label, placeholder }) => (
                  <div key={key}>
                    <label className={lc}>{label}</label>
                    <input
                      value={social[key as keyof typeof social]}
                      onChange={(e) => setSocial({ ...social, [key]: e.target.value })}
                      className={ic}
                      placeholder={placeholder}
                    />
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'seo' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={lc}>Varsayılan Başlık (TR)</label>
                  <input value={seo.defaultTitleTr} onChange={(e) => setSeo({ ...seo, defaultTitleTr: e.target.value })} className={ic} />
                </div>
                <div>
                  <label className={lc}>Varsayılan Başlık (EN)</label>
                  <input value={seo.defaultTitleEn} onChange={(e) => setSeo({ ...seo, defaultTitleEn: e.target.value })} className={ic} />
                </div>
                <div>
                  <label className={lc}>Meta Açıklama (TR)</label>
                  <textarea value={seo.defaultDescriptionTr} onChange={(e) => setSeo({ ...seo, defaultDescriptionTr: e.target.value })} rows={3} className={ic} />
                </div>
                <div>
                  <label className={lc}>Meta Açıklama (EN)</label>
                  <textarea value={seo.defaultDescriptionEn} onChange={(e) => setSeo({ ...seo, defaultDescriptionEn: e.target.value })} rows={3} className={ic} />
                </div>
                <div>
                  <label className={lc}>Anahtar Kelimeler (TR)</label>
                  <input value={seo.keywordsTr} onChange={(e) => setSeo({ ...seo, keywordsTr: e.target.value })} className={ic} placeholder="düğün, organizasyon, nişan..." />
                </div>
                <div>
                  <label className={lc}>Anahtar Kelimeler (EN)</label>
                  <input value={seo.keywordsEn} onChange={(e) => setSeo({ ...seo, keywordsEn: e.target.value })} className={ic} placeholder="wedding, event, organization..." />
                </div>
                <div className="md:col-span-2">
                  <label className={lc}>OG / Sosyal Paylaşım Görseli URL</label>
                  <input value={seo.ogImage} onChange={(e) => setSeo({ ...seo, ogImage: e.target.value })} className={ic} placeholder="https://..." />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
