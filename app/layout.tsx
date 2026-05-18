import type { Metadata } from 'next'
import { UserProvider } from '@/components/auth/user-provider'
import './globals.css'

export const metadata: Metadata = {
  title: 'PlayMatch — Owner Dashboard',
  description: 'Manage your football pitches, bookings, and revenue.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  )
}
