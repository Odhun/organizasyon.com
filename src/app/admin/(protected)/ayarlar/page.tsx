'use client'
import { useEffect, useState } from 'react'
import { getSiteSettings, updateSiteSettings } from '@/lib/firebase/siteSettings'
import { initializeSiteSettings } from '@/lib/seed'
import type { SiteSettings } from '@/types/models'

type Tab = 'brand' | 'hero' | 'contact' | 'social' | 'about' | 'announcement' | 'seo'

const TABS: { key: Tab; label: string }[] = [
  { key: 'brand', label: 'Marka' },
  { key: 'hero', label: 'Hero' },
  { key: 'contact', label: 'İletişim' },
  { key: 'social', label: 'Sosyal Medya' },
  { key: 'about', label: 'Hakkımızda' },
  { key: 'announcement', label: 'Duyuru' },
  { key: 'seo', label: 'SEO' },
]

export default function AyarlarPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [activeTab, setActiveTab] = useState<Tab>('brand')

  const [brand, setBrand] = useState({ nameTr: '', nameEn: '', taglineTr: '', taglineEn: '', logoUrl: '', faviconUrl: '' })
  const [hero, setHero] = useState({ titleLine1Tr: '', titleLine1En: '', titleLine2Tr: '', titleLine2En: '', subtitleTr: '', subtitleEn: '', ctaTextTr: '', ctaTextEn: '', ctaLink: '', backgroundImage: '' })
  const [contact, setContact] = useState({ phone: '', whatsapp: '', email: '', addressTr: '', addressEn: '', workingHoursTr: '', workingHoursEn: '', mapsEmbedUrl: '' })
  const [social, setSocial] = useState({ instagram: '', facebook: '', youtube: '', twitter: '', tiktok: '', pinterest: '' })
  const [about, setAbout] = useState({ titleTr: '', titleEn: '', storyTr: '', storyEn: '', teamPhoto: '' })
  const [announcement, setAnnouncement] = useState({ enabled: false, textTr: '', textEn: '', link: '', style: 'gold' as 'gold' | 'forest' | 'ink', dismissible: true })
  const [seo, setSeo] = useState({ defaultTitleTr: '', defaultTitleEn: '', defaultDescriptionTr: '', defaultDescriptionEn: '', keywordsTr: '', keywordsEn: '', ogImage: '' })

  useEffect(() => { load() }, [])

  async function load() {
    setLoading(true)
    const data = await getSiteSettings()
    if (data) {
      setSettings(data)
      setBrand({ nameTr: data.brand.name.tr ?? '', nameEn: data.brand.name.en ?? '', taglineTr: data.brand.tagline.tr ?? '', taglineEn: data.brand.tagline.en ?? '', logoUrl: data.brand.logoUrl ?? '', faviconUrl: data.brand.faviconUrl ?? '' })
      setHero({ titleLine1Tr: data.hero.titleLine1.tr ?? '', titleLine1En: data.hero.titleLine1.en ?? '', titleLine2Tr: data.hero.titleLine2.tr ?? '', titleLine2En: data.hero.titleLine2.en ?? '', subtitleTr: data.hero.subtitle.tr ?? '', subtitleEn: data.hero.subtitle.en ?? '', ctaTextTr: data.hero.ctaText.tr ?? '', ctaTextEn: data.hero.ctaText.en ?? '', ctaLink: data.hero.ctaLink ?? '', backgroundImage: data.hero.backgroundImage ?? '' })
      setContact({ phone: data.contact.phone ?? '', whatsapp: data.contact.whatsapp ?? '', email: data.contact.email ?? '', addressTr: data.contact.address.tr ?? '', addressEn: data.contact.address.en ?? '', workingHoursTr: data.contact.workingHours.tr ?? '', workingHoursEn: data.contact.workingHours.en ?? '', mapsEmbedUrl: data.contact.mapsEmbedUrl ?? '' })
      setSocial({ instagram: data.social.instagram ?? '', facebook: data.social.facebook ?? '', youtube: data.social.youtube ?? '', twitter: data.social.twitter ?? '', tiktok: data.social.tiktok ?? '', pinterest: data.social.pinterest ?? '' })
      setAbout({ titleTr: data.about.title.tr ?? '', titleEn: data.about.title.en ?? '', storyTr: data.about.story.tr ?? '', storyEn: data.about.story.en ?? '', teamPhoto: data.about.teamPhoto ?? '' })
      setAnnouncement({ enabled: data.announcement.enabled ?? false, textTr: data.announcement.text.tr ?? '', textEn: data.announcement.text.en ?? '', link: data.announcement.link ?? '', style: data.announcement.style ?? 'gold', dismissible: data.announcement.dismissible ?? true })
      setSeo({ defaultTitleTr: data.seo.defaultTitle.tr ?? '', defaultTitleEn: data.seo.defaultTitle.en ?? '', defaultDescriptionTr: data.seo.defaultDescription.tr ?? '', defaultDescriptionEn: data.seo.defaultDescription.en ?? '', keywordsTr: data.seo.keywords.tr ?? '', keywordsEn: data.seo.keywords.en ?? '', ogImage: data.seo.ogImage ?? '' })
    }
    setLoading(false)
  }

  async function handleSave() {
    setSaving(true)
    await updateSiteSettings({
      brand: { name: { tr: brand.nameTr, en: brand.nameEn }, tagline: { tr: brand.taglineTr, en: brand.taglineEn }, logoUrl: brand.logoUrl, faviconUrl: brand.faviconUrl },
      hero: { titleLine1: { tr: hero.titleLine1Tr, en: hero.titleLine1En }, titleLine2: { tr: hero.titleLine2Tr, en: hero.titleLine2En }, subtitle: { tr: hero.subtitleTr, en: hero.subtitleEn }, ctaText: { tr: hero.ctaTextTr, en: hero.ctaTextEn }, ctaLink: hero.ctaLink, backgroundImage: hero.backgroundImage },
      contact: { phone: contact.phone, whatsapp: contact.whatsapp, email: contact.email, address: { tr: contact.addressTr, en: contact.addressEn }, workingHours: { tr: contact.workingHoursTr, en: contact.workingHoursEn }, mapsEmbedUrl: contact.mapsEmbedUrl },
      social: { instagram: social.instagram || undefined, facebook: social.facebook || undefined, youtube: social.youtube || undefined, twitter: social.twitter || undefined, tiktok: social.tiktok || undefined, pinterest: social.pinterest || undefined },
      about: { ...settings!.about, title: { tr: about.titleTr, en: about.titleEn }, story: { tr: about.storyTr, en: about.storyEn }, teamPhoto: about.teamPhoto || undefined },
      announcement: { enabled: announcement.enabled, text: { tr: announcement.textTr, en: announcement.textEn }, link: announcement.link || undefined, style: announcement.style, dismissible: announcement.dismissible },
      seo: { defaultTitle: { tr: seo.defaultTitleTr, en: seo.defaultTitleEn }, defaultDescription: { tr: seo.defaultDescriptionTr, en: seo.defaultDescriptionEn }, keywords: { tr: seo.keywordsTr, en: seo.keywordsEn }, ogImage: seo.ogImage },
    })
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
    setSaving(false)
  }

  const ic = "w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#E11D48] transition-colors"
  const lc = "block text-sm font-medium text-gray-700 mb-1"

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Site Ayarları</h1>
        <button
          onClick={handleSave}
          disabled={saving || loading || !settings}
          className={`font-semibold px-6 py-2.5 rounded-lg text-sm transition-colors disabled:opacity-50 ${saved ? 'bg-green-500 text-white' : 'bg-[#E11D48] hover:bg-[#BE123C] text-white'}`}
        >
          {saving ? 'Kaydediliyor...' : saved ? '✓ Kaydedildi' : 'Kaydet'}
        </button>
      </div>

      {loading ? (
        <div className="text-gray-500">Yükleniyor...</div>
      ) : !settings ? (
        <div className="bg-white rounded-xl p-8 text-center border border-gray-100">
          <p className="text-gray-500 mb-4">Site ayarları henüz oluşturulmamış.</p>
          <button
            onClick={async () => {
              setLoading(true)
              try {
                await initializeSiteSettings()
                await load()
              } catch (err) {
                console.error('Ayarlar oluşturulamadı:', err)
                alert('Hata: ' + String(err))
                setLoading(false)
              }
            }}
            className="bg-[#E11D48] hover:bg-[#BE123C] text-white font-semibold px-6 py-2.5 rounded-lg text-sm transition-colors"
          >
            Varsayılan Ayarları Oluştur
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="flex border-b border-gray-100 overflow-x-auto">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-5 py-4 text-sm font-medium transition-colors border-b-2 -mb-px whitespace-nowrap ${activeTab === tab.key ? 'border-[#E11D48] text-[#E11D48]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === 'brand' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className={lc}>Marka Adı (TR)</label><input value={brand.nameTr} onChange={(e) => setBrand({ ...brand, nameTr: e.target.value })} className={ic} placeholder="Odhun Organizasyon" /></div>
                <div><label className={lc}>Marka Adı (EN)</label><input value={brand.nameEn} onChange={(e) => setBrand({ ...brand, nameEn: e.target.value })} className={ic} placeholder="Odhun Events" /></div>
                <div><label className={lc}>Slogan (TR)</label><input value={brand.taglineTr} onChange={(e) => setBrand({ ...brand, taglineTr: e.target.value })} className={ic} /></div>
                <div><label className={lc}>Slogan (EN)</label><input value={brand.taglineEn} onChange={(e) => setBrand({ ...brand, taglineEn: e.target.value })} className={ic} /></div>
                <div className="md:col-span-2"><label className={lc}>Logo URL</label><input value={brand.logoUrl} onChange={(e) => setBrand({ ...brand, logoUrl: e.target.value })} className={ic} placeholder="https://..." /></div>
                <div className="md:col-span-2"><label className={lc}>Favicon URL</label><input value={brand.faviconUrl} onChange={(e) => setBrand({ ...brand, faviconUrl: e.target.value })} className={ic} placeholder="https://..." /></div>
              </div>
            )}

            {activeTab === 'hero' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className={lc}>Başlık Satır 1 (TR)</label><input value={hero.titleLine1Tr} onChange={(e) => setHero({ ...hero, titleLine1Tr: e.target.value })} className={ic} /></div>
                <div><label className={lc}>Başlık Satır 1 (EN)</label><input value={hero.titleLine1En} onChange={(e) => setHero({ ...hero, titleLine1En: e.target.value })} className={ic} /></div>
                <div><label className={lc}>Başlık Satır 2 (TR)</label><input value={hero.titleLine2Tr} onChange={(e) => setHero({ ...hero, titleLine2Tr: e.target.value })} className={ic} /></div>
                <div><label className={lc}>Başlık Satır 2 (EN)</label><input value={hero.titleLine2En} onChange={(e) => setHero({ ...hero, titleLine2En: e.target.value })} className={ic} /></div>
                <div><label className={lc}>Alt Başlık (TR)</label><textarea value={hero.subtitleTr} onChange={(e) => setHero({ ...hero, subtitleTr: e.target.value })} rows={2} className={ic} /></div>
                <div><label className={lc}>Alt Başlık (EN)</label><textarea value={hero.subtitleEn} onChange={(e) => setHero({ ...hero, subtitleEn: e.target.value })} rows={2} className={ic} /></div>
                <div><label className={lc}>CTA Butonu (TR)</label><input value={hero.ctaTextTr} onChange={(e) => setHero({ ...hero, ctaTextTr: e.target.value })} className={ic} placeholder="Teklif Al" /></div>
                <div><label className={lc}>CTA Butonu (EN)</label><input value={hero.ctaTextEn} onChange={(e) => setHero({ ...hero, ctaTextEn: e.target.value })} className={ic} placeholder="Get a Quote" /></div>
                <div><label className={lc}>CTA Link</label><input value={hero.ctaLink} onChange={(e) => setHero({ ...hero, ctaLink: e.target.value })} className={ic} placeholder="/teklif" /></div>
                <div><label className={lc}>Arka Plan Görsel URL</label><input value={hero.backgroundImage} onChange={(e) => setHero({ ...hero, backgroundImage: e.target.value })} className={ic} placeholder="https://..." /></div>
              </div>
            )}

            {activeTab === 'contact' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className={lc}>Telefon</label><input value={contact.phone} onChange={(e) => setContact({ ...contact, phone: e.target.value })} className={ic} placeholder="+90 555 000 00 00" /></div>
                <div><label className={lc}>WhatsApp</label><input value={contact.whatsapp} onChange={(e) => setContact({ ...contact, whatsapp: e.target.value })} className={ic} placeholder="+90 555 000 00 00" /></div>
                <div className="md:col-span-2"><label className={lc}>E-posta</label><input type="email" value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} className={ic} /></div>
                <div><label className={lc}>Adres (TR)</label><textarea value={contact.addressTr} onChange={(e) => setContact({ ...contact, addressTr: e.target.value })} rows={3} className={ic} /></div>
                <div><label className={lc}>Adres (EN)</label><textarea value={contact.addressEn} onChange={(e) => setContact({ ...contact, addressEn: e.target.value })} rows={3} className={ic} /></div>
                <div><label className={lc}>Çalışma Saatleri (TR)</label><input value={contact.workingHoursTr} onChange={(e) => setContact({ ...contact, workingHoursTr: e.target.value })} className={ic} /></div>
                <div><label className={lc}>Çalışma Saatleri (EN)</label><input value={contact.workingHoursEn} onChange={(e) => setContact({ ...contact, workingHoursEn: e.target.value })} className={ic} /></div>
                <div className="md:col-span-2"><label className={lc}>Google Maps Embed URL</label><input value={contact.mapsEmbedUrl} onChange={(e) => setContact({ ...contact, mapsEmbedUrl: e.target.value })} className={ic} placeholder="https://www.google.com/maps/embed?..." /></div>
              </div>
            )}

            {activeTab === 'social' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {([
                  { key: 'instagram', label: 'Instagram', ph: 'https://instagram.com/hesabiniz' },
                  { key: 'facebook', label: 'Facebook', ph: 'https://facebook.com/sayfaniz' },
                  { key: 'youtube', label: 'YouTube', ph: 'https://youtube.com/@kanaliniz' },
                  { key: 'twitter', label: 'Twitter / X', ph: 'https://x.com/hesabiniz' },
                  { key: 'tiktok', label: 'TikTok', ph: 'https://tiktok.com/@hesabiniz' },
                  { key: 'pinterest', label: 'Pinterest', ph: 'https://pinterest.com/hesabiniz' },
                ] as const).map(({ key, label, ph }) => (
                  <div key={key}>
                    <label className={lc}>{label}</label>
                    <input value={social[key]} onChange={(e) => setSocial({ ...social, [key]: e.target.value })} className={ic} placeholder={ph} />
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'about' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className={lc}>Bölüm Başlığı (TR)</label><input value={about.titleTr} onChange={(e) => setAbout({ ...about, titleTr: e.target.value })} className={ic} /></div>
                <div><label className={lc}>Bölüm Başlığı (EN)</label><input value={about.titleEn} onChange={(e) => setAbout({ ...about, titleEn: e.target.value })} className={ic} /></div>
                <div><label className={lc}>Hikayemiz (TR)</label><textarea value={about.storyTr} onChange={(e) => setAbout({ ...about, storyTr: e.target.value })} rows={6} className={ic} /></div>
                <div><label className={lc}>Hikayemiz (EN)</label><textarea value={about.storyEn} onChange={(e) => setAbout({ ...about, storyEn: e.target.value })} rows={6} className={ic} /></div>
                <div className="md:col-span-2"><label className={lc}>Ekip Fotoğrafı URL</label><input value={about.teamPhoto} onChange={(e) => setAbout({ ...about, teamPhoto: e.target.value })} className={ic} placeholder="https://..." /></div>
              </div>
            )}

            {activeTab === 'announcement' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setAnnouncement({ ...announcement, enabled: !announcement.enabled })}
                    className={`relative w-12 h-6 rounded-full transition-colors ${announcement.enabled ? 'bg-[#E11D48]' : 'bg-gray-200'}`}
                  >
                    <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${announcement.enabled ? 'translate-x-7' : 'translate-x-1'}`} />
                  </button>
                  <span className="text-sm font-medium text-gray-700">Duyuruyu Aktif Et</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div><label className={lc}>Duyuru Metni (TR)</label><input value={announcement.textTr} onChange={(e) => setAnnouncement({ ...announcement, textTr: e.target.value })} className={ic} /></div>
                  <div><label className={lc}>Duyuru Metni (EN)</label><input value={announcement.textEn} onChange={(e) => setAnnouncement({ ...announcement, textEn: e.target.value })} className={ic} /></div>
                  <div><label className={lc}>Link (isteğe bağlı)</label><input value={announcement.link} onChange={(e) => setAnnouncement({ ...announcement, link: e.target.value })} className={ic} placeholder="https://..." /></div>
                  <div>
                    <label className={lc}>Stil</label>
                    <select value={announcement.style} onChange={(e) => setAnnouncement({ ...announcement, style: e.target.value as 'gold' | 'forest' | 'ink' })} className={ic}>
                      <option value="gold">Altın</option>
                      <option value="forest">Orman</option>
                      <option value="ink">Mürekkep</option>
                    </select>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setAnnouncement({ ...announcement, dismissible: !announcement.dismissible })}
                    className={`relative w-12 h-6 rounded-full transition-colors ${announcement.dismissible ? 'bg-[#E11D48]' : 'bg-gray-200'}`}
                  >
                    <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${announcement.dismissible ? 'translate-x-7' : 'translate-x-1'}`} />
                  </button>
                  <span className="text-sm font-medium text-gray-700">Kapatılabilir</span>
                </div>
              </div>
            )}

            {activeTab === 'seo' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className={lc}>Varsayılan Başlık (TR)</label><input value={seo.defaultTitleTr} onChange={(e) => setSeo({ ...seo, defaultTitleTr: e.target.value })} className={ic} /></div>
                <div><label className={lc}>Varsayılan Başlık (EN)</label><input value={seo.defaultTitleEn} onChange={(e) => setSeo({ ...seo, defaultTitleEn: e.target.value })} className={ic} /></div>
                <div><label className={lc}>Meta Açıklama (TR)</label><textarea value={seo.defaultDescriptionTr} onChange={(e) => setSeo({ ...seo, defaultDescriptionTr: e.target.value })} rows={3} className={ic} /></div>
                <div><label className={lc}>Meta Açıklama (EN)</label><textarea value={seo.defaultDescriptionEn} onChange={(e) => setSeo({ ...seo, defaultDescriptionEn: e.target.value })} rows={3} className={ic} /></div>
                <div><label className={lc}>Anahtar Kelimeler (TR)</label><input value={seo.keywordsTr} onChange={(e) => setSeo({ ...seo, keywordsTr: e.target.value })} className={ic} placeholder="düğün, organizasyon, nişan..." /></div>
                <div><label className={lc}>Anahtar Kelimeler (EN)</label><input value={seo.keywordsEn} onChange={(e) => setSeo({ ...seo, keywordsEn: e.target.value })} className={ic} placeholder="wedding, event, organization..." /></div>
                <div className="md:col-span-2"><label className={lc}>OG / Sosyal Paylaşım Görseli URL</label><input value={seo.ogImage} onChange={(e) => setSeo({ ...seo, ogImage: e.target.value })} className={ic} placeholder="https://..." /></div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
