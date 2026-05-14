'use client'
import { useEffect, useState } from 'react'
import { createBackup, getBackups, deleteBackup, restoreBackup, type BackupMeta } from '@/lib/firebase/backups'
import { Download, Trash2, RotateCcw, CloudUpload, Loader2, CheckCircle, AlertCircle, Database } from 'lucide-react'

const COL_LABELS: Record<string, string> = {
  services: 'Hizmetler',
  gallery: 'Galeri',
  testimonials: 'Müşteri Yorumları',
  reservations: 'Rezervasyonlar',
  siteSettings: 'Site Ayarları',
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB'
}

function formatDate(ts: BackupMeta['createdAt']) {
  if (!ts) return '—'
  const d = new Date((ts as unknown as { seconds: number }).seconds * 1000)
  return d.toLocaleString('tr-TR')
}

export default function YedeklemePage() {
  const [backups, setBackups] = useState<BackupMeta[]>([])
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const [msg, setMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null)

  // Restore modal state
  const [restoreTarget, setRestoreTarget] = useState<BackupMeta | null>(null)
  const [selectedCols, setSelectedCols] = useState<string[]>([])
  const [restoring, setRestoring] = useState(false)

  useEffect(() => { load() }, [])

  async function load() {
    setLoading(true)
    try {
      const data = await getBackups()
      setBackups(data)
    } catch (err) {
      setMsg({ type: 'err', text: 'Yedekler yüklenemedi: ' + String(err) })
    } finally {
      setLoading(false)
    }
  }

  async function handleCreate() {
    setCreating(true)
    setMsg(null)
    try {
      const meta = await createBackup()
      setMsg({ type: 'ok', text: `Yedekleme tamamlandı — ${Object.values(meta.counts).reduce((a, b) => a + b, 0)} kayıt` })
      await load()
    } catch (err) {
      setMsg({ type: 'err', text: 'Yedekleme hatası: ' + String(err) })
    } finally {
      setCreating(false)
    }
  }

  async function handleDelete(backup: BackupMeta) {
    if (!confirm('Bu yedeği kalıcı olarak silmek istiyor musunuz?')) return
    try {
      await deleteBackup(backup)
      await load()
    } catch (err) {
      setMsg({ type: 'err', text: 'Silinemedi: ' + String(err) })
    }
  }

  function openRestore(backup: BackupMeta) {
    setRestoreTarget(backup)
    setSelectedCols(Object.keys(backup.counts))
  }

  async function handleRestore() {
    if (!restoreTarget || selectedCols.length === 0) return
    setRestoring(true)
    try {
      await restoreBackup(restoreTarget, selectedCols)
      setMsg({ type: 'ok', text: `Geri yükleme tamamlandı — ${selectedCols.length} koleksiyon` })
      setRestoreTarget(null)
    } catch (err) {
      setMsg({ type: 'err', text: 'Geri yükleme hatası: ' + String(err) })
    } finally {
      setRestoring(false)
    }
  }

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-bold text-gray-800">Veri Yedekleme</h1>
        <button
          onClick={handleCreate}
          disabled={creating}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#E11D48] hover:bg-[#BE123C] text-white font-semibold rounded-xl text-sm transition-colors disabled:opacity-50"
        >
          {creating ? <Loader2 size={15} className="animate-spin" /> : <CloudUpload size={15} />}
          {creating ? 'Yedekleniyor...' : 'Yeni Yedek Al'}
        </button>
      </div>
      <p className="text-gray-400 text-sm mb-6">Tüm koleksiyonlar Firebase Storage&apos;a yüklenir.</p>

      {msg && (
        <div className={`flex items-center gap-2 p-4 rounded-xl text-sm mb-5 ${msg.type === 'ok' ? 'bg-green-50 border border-green-200 text-green-700' : 'bg-red-50 border border-red-200 text-red-700'}`}>
          {msg.type === 'ok' ? <CheckCircle size={15} /> : <AlertCircle size={15} />}
          {msg.text}
        </div>
      )}

      {loading ? (
        <div className="text-gray-400 text-sm">Yükleniyor...</div>
      ) : backups.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 p-10 text-center text-gray-400 text-sm">
          Henüz yedek yok. İlk yedeği almak için &ldquo;Yeni Yedek Al&rdquo; butonuna tıklayın.
        </div>
      ) : (
        <div className="space-y-3">
          {backups.map((b) => (
            <div key={b.id} className="bg-white rounded-xl border border-gray-100 p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-800 mb-1">{formatDate(b.createdAt)}</p>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {Object.entries(b.counts).map(([col, count]) => (
                      <span key={col} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                        {COL_LABELS[col] ?? col}: {count}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-gray-400 flex items-center gap-1">
                    <Database size={11} /> {formatBytes(b.size)}
                  </p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <a
                    href={b.downloadURL}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors"
                  >
                    <Download size={13} /> İndir
                  </a>
                  <button
                    onClick={() => openRestore(b)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-xs font-medium transition-colors"
                  >
                    <RotateCcw size={13} /> Geri Yükle
                  </button>
                  <button
                    onClick={() => handleDelete(b)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-xs font-medium transition-colors"
                  >
                    <Trash2 size={13} /> Sil
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Restore modal */}
      {restoreTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-1">Geri Yükleme</h2>
            <p className="text-sm text-gray-500 mb-5">
              Seçilen koleksiyonlardaki mevcut tüm veriler silinip yedekten geri yazılacak.
              <span className="block mt-1 font-semibold text-red-600">Bu işlem geri alınamaz.</span>
            </p>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Geri yüklenecek koleksiyonlar</p>
            <div className="space-y-2 mb-6">
              {Object.keys(restoreTarget.counts).map((col) => (
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
                  <span className="text-xs text-gray-400 ml-auto">{restoreTarget.counts[col]} kayıt</span>
                </label>
              ))}
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setRestoreTarget(null)}
                disabled={restoring}
                className="flex-1 border border-gray-200 text-gray-600 rounded-lg py-2.5 text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                İptal
              </button>
              <button
                onClick={handleRestore}
                disabled={restoring || selectedCols.length === 0}
                className="flex-1 bg-[#E11D48] hover:bg-[#BE123C] text-white font-semibold rounded-lg py-2.5 text-sm transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {restoring ? <><Loader2 size={14} className="animate-spin" /> Yükleniyor...</> : 'Geri Yükle'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
