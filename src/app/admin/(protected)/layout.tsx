import AuthGuard from '@/components/admin/AuthGuard'
import AdminSidebar from '@/components/admin/AdminSidebar'

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <div className="flex min-h-screen" style={{ background: '#f3f4f6' }}>
        <AdminSidebar />
        <main className="flex-1 ml-64 p-8 min-h-screen">
          {children}
        </main>
      </div>
    </AuthGuard>
  )
}
