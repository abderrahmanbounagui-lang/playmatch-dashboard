'use client'

import { usePathname } from 'next/navigation'
import { D } from '@/lib/design-tokens'

interface TopbarProfile {
  name: string
  business: string
  initials: string
}

const PAGE_TITLES: Record<string, string> = {
  '/dashboard':          'Overview',
  '/dashboard/pitches':  'My Pitches',
  '/dashboard/bookings': 'Bookings',
  '/dashboard/calendar': 'Calendar',
  '/dashboard/revenue':  'Revenue',
  '/dashboard/settings': 'Settings',
}

export default function Topbar({ profile }: { profile: TopbarProfile }) {
  const pathname = usePathname()
  const title = PAGE_TITLES[pathname] ?? 'Dashboard'

  return (
    <header style={{
      height: 72, padding: '0 32px',
      background: D.bg, borderBottom: `1px solid ${D.hairline}`,
      display: 'flex', alignItems: 'center', gap: 16,
      position: 'sticky', top: 0, zIndex: 10,
      backdropFilter: 'blur(20px)',
      flexShrink: 0,
    }}>
      <div>
        <div style={{ fontSize: 11, color: D.textTer, fontWeight: 600, letterSpacing: 1, marginBottom: 2 }}>OWNER · CASABLANCA</div>
        <h1 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: D.text, letterSpacing: -0.4 }}>{title}</h1>
      </div>
      <div style={{ flex: 1 }} />

      {/* Search */}
      <div style={{
        height: 38, width: 320, padding: '0 14px', borderRadius: 10,
        background: D.surface, border: `1px solid ${D.hairline}`,
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <SearchIcon />
        <input placeholder="Search bookings, customers..." style={{
          flex: 1, background: 'transparent', border: 'none', outline: 'none',
          color: D.text, fontSize: 13, fontFamily: D.font,
        }} />
        <span style={{
          fontFamily: D.mono, fontSize: 10, color: D.textTer,
          padding: '2px 6px', borderRadius: 5, border: `1px solid ${D.hairline}`,
        }}>⌘K</span>
      </div>

      {/* Notification bell */}
      <button style={{
        width: 38, height: 38, borderRadius: 10,
        background: D.surface, border: `1px solid ${D.hairline}`,
        color: D.text, position: 'relative', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <BellIcon />
        <span style={{ position: 'absolute', top: 7, right: 8, minWidth: 14, height: 14, padding: '0 4px', borderRadius: 7, background: D.green, color: D.greenInk, fontSize: 9, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: D.mono }}>3</span>
      </button>

      <div style={{ width: 1, height: 24, background: D.hairline }} />

      {/* Profile */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10,
          background: `linear-gradient(135deg, ${D.green}, ${D.greenDim})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: D.greenInk, fontWeight: 800, fontSize: 13, fontFamily: D.mono,
        }}>{profile.initials}</div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: D.text, letterSpacing: -0.2 }}>{profile.name}</div>
          <div style={{ fontSize: 11, color: D.textSec }}>{profile.business}</div>
        </div>
        <ChevDownIcon />
      </div>
    </header>
  )
}

function SearchIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: D.textSec, flexShrink: 0 }}>
      <circle cx="11" cy="11" r="7" /><path d="M20 20l-4-4" />
    </svg>
  )
}
function BellIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 8a6 6 0 0112 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10 21a2 2 0 004 0" />
    </svg>
  )
}
function ChevDownIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: D.textSec }}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  )
}
