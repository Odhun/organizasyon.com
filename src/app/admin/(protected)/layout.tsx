import AuthGuard from '@/components/admin/AuthGuard'
import AdminSidebar from '@/components/admin/AdminSidebar'

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <div className="flex min-h-screen" style={{ background: '#F8FAFC' }}>
        <AdminSidebar />
        <main className="flex-1 ml-64 min-h-screen">
          <div className="p-8 max-w-6xl">
            {children}
          </div>
        </main>
      </div>
    </AuthGuard>
  )
}
