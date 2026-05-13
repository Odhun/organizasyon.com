'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { onAuthChange } from '@/lib/firebase/auth'
import type { User } from 'firebase/auth'

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [user, setUser] = useState<User | null | undefined>(undefined)

  useEffect(() => {
    return onAuthChange((u) => {
      setUser(u)
      if (u === null) router.replace('/admin/login')
    })
  }, [router])

  if (user === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#111827' }}>
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[#C9A84C] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-gray-400 text-sm">Yükleniyor...</p>
        </div>
      </div>
    )
  }

  if (user === null) return null
  return <>{children}</>
}
