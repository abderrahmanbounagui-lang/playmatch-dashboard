import { requireRole, getInitials } from '@/lib/auth'
import Sidebar from '@/components/dashboard/sidebar'
import Topbar from '@/components/dashboard/topbar'
import { D } from '@/lib/design-tokens'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  // Redirects to /login if unauthenticated, or /client if wrong role
  const profile = await requireRole('owner')

  const userProfile = {
    name: profile.full_name ?? profile.email ?? 'Owner',
    business: profile.business_name ?? '',
    initials: getInitials(profile.full_name, profile.email),
    email: profile.email ?? '',
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: D.bg, color: D.text, fontFamily: D.font }}>
      <Sidebar profile={userProfile} />
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <Topbar profile={userProfile} />
        <main style={{ flex: 1 }}>
          {children}
        </main>
      </div>
    </div>
  )
}
