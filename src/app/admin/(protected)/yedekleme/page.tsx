'use client'
import { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/lib/firebase/config'
import { Download, CheckCircle, AlertCircle, Loader2, Database } from 'lucide-react'

function serializeValue(val: unknown): unknown {
  if (val === null || val === undefined) return val
  if (typeof val !== 'object') return val
  if (Array.isArray(val)) return val.map(serializeValue)
  const obj = val as Record<string, unknown>
  if (typeof obj.seconds === 'number' && typeof obj.nanoseconds === 'number') {
    return new Date(obj.seconds * 1000).toISOString()
  }
  return Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, serializeValue(v)]))
}

const COLLECTIONS = [
  { id: 'services', label: 'Hizmetler', desc: 'Tüm hizmet kayıtları' },
  { id: 'gallery', label: 'Galeri', desc: 'Galeri görselleri ve meta verileri' },
  { id: 'testimonials', label: 'Müşteri Yorumları', desc: 'Onaylı ve bekleyen tüm yorumlar' },
  { id: 'reservations', label: 'Rezervasyonlar', desc: 'Tüm teklif talepleri' },
  { id: 'siteSettings', label: 'Site Ayarları', desc: 'Marka, iletişim, SEO ayarları' },
]

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function YedeklemePage() {
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')
  const [counts, setCounts] = useState<Record<string, number>>({})
  const [lastBackup, setLastBackup] = useState<string | null>(null)

  useEffect(() => {
    setLastBackup(localStorage.getItem('odhun_last_backup'))
  }, [])

  async function handleBackup() {
    setStatus('loading')
    setError('')
    try {
      const backupData: Record<string, unknown> = {}
      const newCounts: Record<string, number> = {}

      for (const col of COLLECTIONS) {
        const snap = await getDocs(collection(db, col.id))
        const docs = snap.docs.map((d) => serializeValue({ id: d.id, ...d.data() }))
        backupData[col.id] = docs
        newCounts[col.id] = snap.docs.length
      }

      const payload = {
        exportedAt: new Date().toISOString(),
        version: '1.0',
        site: 'odhun-organizasyon',
        data: backupData,
      }

      const json = JSON.stringify(payload, null, 2)
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
      setCounts(newCounts)
      setStatus('success')
    } catch (err) {
      setError(String(err))
      setStatus('error')
    }
  }

  const totalDocs = Object.values(counts).reduce((a, b) => a + b, 0)

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Veri Yedekleme</h1>
      <p className="text-gray-500 text-sm mb-8">
        Tüm Firebase veritabanı JSON formatında indirilir. Yedeği güvenli bir yerde saklayın.
      </p>

      {/* Collections list */}
      <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-50 mb-6">
        {COLLECTIONS.map((col) => (
          <div key={col.id} className="flex items-center justify-between px-5 py-4">
            <div className="flex items-center gap-3">
              <Database size={15} className="text-gray-400 shrink-0" />
              <div>
                <p className="text-sm font-medium text-gray-800">{col.label}</p>
                <p className="text-xs text-gray-400">{col.desc}</p>
              </div>
            </div>
            {counts[col.id] !== undefined && (
              <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
                {counts[col.id]} kayıt
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Last backup info */}
      {lastBackup && (
        <p className="text-xs text-gray-400 mb-4">
          Son yedekleme: {new Date(lastBackup).toLocaleString('tr-TR')}
        </p>
      )}

      {/* Status messages */}
      {status === 'success' && (
        <div className="flex items-center gap-2 p-4 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm mb-4">
          <CheckCircle size={16} className="shrink-0" />
          <span>Yedekleme tamamlandı — {totalDocs} kayıt indirildi.</span>
        </div>
      )}
      {status === 'error' && (
        <div className="flex items-start gap-2 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm mb-4">
          <AlertCircle size={16} className="shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* Action button */}
      <button
        onClick={handleBackup}
        disabled={status === 'loading'}
        className="flex items-center gap-2 px-6 py-3 bg-[#E11D48] hover:bg-[#BE123C] text-white font-semibold rounded-xl text-sm transition-colors disabled:opacity-50"
      >
        {status === 'loading' ? (
          <><Loader2 size={16} className="animate-spin" /> Yedekleniyor...</>
        ) : (
          <><Download size={16} /> Tüm Veriyi Yedekle</>
        )}
      </button>

      <p className="mt-4 text-xs text-gray-400">
        Yedek dosyası tarayıcınıza indirilir. Sunucuya yüklenmez.
      </p>
    </div>
  )
}
