'use client'
import { useEffect, useRef, useState } from 'react'
import { generateBackup, restoreFromJSON, type BackupData } from '@/lib/firebase/backups'
import { Download, UploadCloud, RotateCcw, Loader2, CheckCircle, AlertCircle } from 'lucide-react'

const COL_LABELS: Record<string, string> = {
  services: 'Hizmetler',
  gallery: 'Galeri',
  testimonials: 'Müşteri Yorumları',
  reservations: 'Rezervasyonlar',
  siteSettings: 'Site Ayarları',
}

export default function YedeklemePage() {
  const [backing, setBacking] = useState(false)
  const [restoring, setRestoring] = useState(false)
  const [msg, setMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null)
  const [lastBackup, setLastBackup] = useState<string | null>(null)

  // Restore state
  const [parsedBackup, setParsedBackup] = useState<BackupData | null>(null)
  const [selectedCols, setSelectedCols] = useState<string[]>([])
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setLastBackup(localStorage.getItem('odhun_last_backup'))
  }, [])

  async function handleBackup() {
    setBacking(true)
    setMsg(null)
    try {
      const { json, counts } = await generateBackup()
      const blob = new Blob([json], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `odhun-yedek-${new Date().toISOString().split('T')[0]}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      const now = new Date().toISOString()
      localStorage.setItem('odhun_last_backup', now)
      setLastBackup(now)
      const total = Object.values(counts).reduce((a, b) => a + b, 0)
      setMsg({ type: 'ok', text: `Yedek indirildi — ${total} kayıt` })
    } catch (err) {
      setMsg({ type: 'err', text: 'Yedekleme hatası: ' + String(err) })
    } finally {
      setBacking(false)
    }
  }

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target?.result as string) as BackupData
        if (!data.version || !data.data) throw new Error('Geçersiz yedek dosyası')
        setParsedBackup(data)
        setSelectedCols(Object.keys(data.data))
        setMsg(null)
      } catch (err) {
        setMsg({ type: 'err', text: 'Dosya okunamadı: ' + String(err) })
      }
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  async function handleRestore() {
    if (!parsedBackup || selectedCols.length === 0) return
    if (!confirm(`${selectedCols.length} koleksiyon geri yüklenecek. Mevcut veriler silinecek. Emin misiniz?`)) return
    setRestoring(true)
    setMsg(null)
    try {
      await restoreFromJSON(parsedBackup, selectedCols)
      setMsg({ type: 'ok', text: `Geri yükleme tamamlandı — ${selectedCols.length} koleksiyon` })
      setParsedBackup(null)
    } catch (err) {
      setMsg({ type: 'err', text: 'Geri yükleme hatası: ' + String(err) })
    } finally {
      setRestoring(false)
    }
  }

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Veri Yedekleme</h1>
        <p className="text-gray-400 text-sm">Tüm Firestore verisi JSON olarak bilgisayarınıza indirilir.</p>
      </div>

      {msg && (
        <div className={`flex items-center gap-2 p-4 rounded-xl text-sm ${msg.type === 'ok' ? 'bg-green-50 border border-green-200 text-green-700' : 'bg-red-50 border border-red-200 text-red-700'}`}>
          {msg.type === 'ok' ? <CheckCircle size={15} /> : <AlertCircle size={15} />}
          {msg.text}
        </div>
      )}

      {/* Backup */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <h2 className="text-base font-semibold text-gray-800 mb-1">Yedek Al</h2>
        <p className="text-sm text-gray-400 mb-4">
          Hizmetler, galeri, yorumlar, rezervasyonlar ve site ayarları dahil tüm veri indirilir.
        </p>
        {lastBackup && (
          <p className="text-xs text-gray-400 mb-4">
            Son yedekleme: {new Date(lastBackup).toLocaleString('tr-TR')}
          </p>
        )}
        <button
          onClick={handleBackup}
          disabled={backing}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#E11D48] hover:bg-[#BE123C] text-white font-semibold rounded-xl text-sm transition-colors disabled:opacity-50"
        >
          {backing ? <Loader2 size={15} className="animate-spin" /> : <Download size={15} />}
          {backing ? 'Hazırlanıyor...' : 'Yedeği İndir'}
        </button>
      </div>

      {/* Restore */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <h2 className="text-base font-semibold text-gray-800 mb-1">Geri Yükle</h2>
        <p className="text-sm text-gray-400 mb-4">
          Daha önce indirilen <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">.json</code> yedek dosyasını seçin.
          <span className="block mt-1 text-red-500 font-medium">Seçili koleksiyonlardaki mevcut veriler silinir.</span>
        </p>

        <input ref={fileRef} type="file" accept=".json" className="hidden" onChange={handleFileSelect} />
        <button
          onClick={() => fileRef.current?.click()}
          className="flex items-center gap-2 px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl text-sm transition-colors mb-5"
        >
          <UploadCloud size={15} /> Dosya Seç
        </button>

        {parsedBackup && (
          <div className="border border-gray-100 rounded-xl p-4 space-y-3">
            <p className="text-xs text-gray-500">
              Yedek tarihi: <strong>{new Date(parsedBackup.exportedAt).toLocaleString('tr-TR')}</strong>
            </p>
            <div className="space-y-2">
              {Object.keys(parsedBackup.data).map((col) => (
                <label key={col} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedCols.includes(col)}
                    onChange={(e) =>
                      setSelectedCols(e.target.checked
                        ? [...selectedCols, col]
                        : selectedCols.filter((c) => c !== col)
                      )
                    }
                    className="w-4 h-4 accent-[#E11D48]"
                  />
                  <span className="text-sm text-gray-700">{COL_LABELS[col] ?? col}</span>
                  <span className="text-xs text-gray-400 ml-auto">
                    {(parsedBackup.data[col] as unknown[]).length} kayıt
                  </span>
                </label>
              ))}
            </div>
            <button
              onClick={handleRestore}
              disabled={restoring || selectedCols.length === 0}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#E11D48] hover:bg-[#BE123C] text-white font-semibold rounded-xl text-sm transition-colors disabled:opacity-50 mt-2"
            >
              {restoring ? <Loader2 size={15} className="animate-spin" /> : <RotateCcw size={15} />}
              {restoring ? 'Yükleniyor...' : 'Geri Yükle'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
