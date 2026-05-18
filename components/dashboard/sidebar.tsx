'use client'

import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { D } from '@/lib/design-tokens'
import { LogoutButton } from '@/components/auth/logout-button'

interface SidebarProfile {
  name: string
  business: string
  initials: string
  email: string
}

const NAV = [
  { id: 'overview', label: 'Overview',   href: '/dashboard',          icon: HomeIcon },
  { id: 'pitches',  label: 'My Pitches', href: '/dashboard/pitches',  icon: ShieldIcon },
  { id: 'bookings', label: 'Bookings',   href: '/dashboard/bookings', icon: CalIcon },
  { id: 'calendar', label: 'Calendar',   href: '/dashboard/calendar', icon: ClockIcon },
  { id: 'revenue',  label: 'Revenue',    href: '/dashboard/revenue',  icon: BoltIcon },
  { id: 'settings', label: 'Settings',   href: '/dashboard/settings', icon: UserIcon },
]

export default function Sidebar({ profile }: { profile: SidebarProfile }) {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const w = collapsed ? 72 : 248

  return (
    <aside style={{
      width: w, flexShrink: 0, height: '100vh', position: 'sticky', top: 0,
      background: D.panel, borderRight: `1px solid ${D.hairline}`,
      display: 'flex', flexDirection: 'column', transition: 'width .25s ease',
      fontFamily: D.font, zIndex: 20, overflow: 'hidden',
    }}>
      {/* Brand */}
      <div style={{ padding: '20px 16px', display: 'flex', alignItems: 'center', gap: 10, height: 72, flexShrink: 0 }}>
        <PMLogo size={36} />
        {!collapsed && (
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 16, fontWeight: 800, letterSpacing: -0.5, color: D.text, whiteSpace: 'nowrap' }}>PlayMatch</div>
            <div style={{ fontSize: 10, color: D.textTer, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase' }}>Owner Console</div>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav style={{ padding: '4px 12px', display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>
        {!collapsed && (
          <div style={{ fontSize: 10, fontWeight: 700, color: D.textTer, letterSpacing: 1.4, padding: '12px 12px 6px' }}>MANAGE</div>
        )}
        {NAV.map(n => {
          const isActive = n.href === '/dashboard' ? pathname === '/dashboard' : pathname.startsWith(n.href)
          const Icon = n.icon
          return (
            <button key={n.id} onClick={() => router.push(n.href)}
              title={collapsed ? n.label : undefined}
              style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '11px 12px',
                justifyContent: collapsed ? 'center' : 'flex-start',
                borderRadius: 10, cursor: 'pointer',
                background: isActive ? D.greenSoft : 'transparent',
                border: 'none', color: isActive ? D.green : D.textSec,
                fontFamily: D.font, fontSize: 13.5, fontWeight: isActive ? 600 : 500,
                letterSpacing: -0.1, transition: 'background .15s, color .15s',
                width: '100%',
              }}
              onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.04)' }}
              onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLButtonElement).style.background = 'transparent' }}>
              <Icon size={18} strokeWidth={isActive ? 2.4 : 2} />
              {!collapsed && <span>{n.label}</span>}
              {!collapsed && isActive && <span style={{ marginLeft: 'auto', width: 6, height: 6, borderRadius: '50%', background: D.green }} />}
            </button>
          )
        })}
      </nav>

      {/* Owner card */}
      <div style={{ padding: 12, borderTop: `1px solid ${D.hairline}`, flexShrink: 0 }}>
        {collapsed ? (
          <div style={{
            width: 44, height: 44, margin: '0 auto', borderRadius: 12,
            background: `linear-gradient(135deg, ${D.green}, ${D.greenDim})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: D.greenInk, fontWeight: 800, fontSize: 14, fontFamily: D.mono,
          }}>{profile.initials}</div>
        ) : (
          <div style={{
            padding: 10, borderRadius: 12, background: D.surface,
            display: 'flex', alignItems: 'center', gap: 10, border: `1px solid ${D.hairline}`,
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10, flexShrink: 0,
              background: `linear-gradient(135deg, ${D.green}, ${D.greenDim})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: D.greenInk, fontWeight: 800, fontSize: 13, fontFamily: D.mono,
            }}>{profile.initials}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: D.text, letterSpacing: -0.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{profile.name}</div>
              <div style={{ fontSize: 11, color: D.textSec, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{profile.business || profile.email}</div>
            </div>
          </div>
        )}
        <button onClick={() => setCollapsed(c => !c)} style={{
          width: '100%', marginTop: 8, padding: '8px', borderRadius: 8,
          background: 'transparent', border: `1px solid ${D.hairline}`,
          color: D.textTer, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            style={{ transform: collapsed ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }}>
            <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <LogoutButton style={{
          width: '100%', marginTop: 6, padding: '8px', borderRadius: 8,
          background: 'transparent', border: `1px solid ${D.hairline}`,
          color: D.textTer, cursor: 'pointer', fontFamily: D.font,
          fontSize: 12, display: 'flex', alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'flex-start',
          gap: 6,
        }}>
          {!collapsed && 'Sign out'}
        </LogoutButton>
      </div>
    </aside>
  )
}

// ─── PM Logo ──────────────────────────────────────────────────────────────────
function PMLogo({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none" style={{ flexShrink: 0 }}>
      <defs>
        <linearGradient id="pm-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={D.green} />
          <stop offset="100%" stopColor={D.greenDim} />
        </linearGradient>
      </defs>
      <rect x="20" y="20" width="160" height="160" rx="44" fill="#0F1410" stroke={`${D.green}66`} strokeWidth="1.5" />
      <path d="M55 55 L55 145 M55 55 L100 55 Q128 55 128 82 Q128 109 100 109 L55 109"
        stroke="url(#pm-grad)" strokeWidth="14" fill="none" strokeLinecap="square" />
      <path d="M105 145 L105 105 L122 130 L139 105 L139 145"
        stroke="url(#pm-grad)" strokeWidth="10" fill="none" strokeLinecap="square" strokeLinejoin="miter" />
      <circle cx="148" cy="60" r="6" fill={D.amber} />
    </svg>
  )
}

// ─── Icons ────────────────────────────────────────────────────────────────────
function HomeIcon({ size = 20, strokeWidth = 2 }: { size?: number; strokeWidth?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l9-8 9 8v9a2 2 0 01-2 2h-4v-7H9v7H5a2 2 0 01-2-2v-9z" /></svg>
}
function ShieldIcon({ size = 20, strokeWidth = 2 }: { size?: number; strokeWidth?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l8 3v6c0 5-3.5 9-8 11-4.5-2-8-6-8-11V5l8-3z" /></svg>
}
function CalIcon({ size = 20, strokeWidth = 2 }: { size?: number; strokeWidth?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></svg>
}
function ClockIcon({ size = 20, strokeWidth = 2 }: { size?: number; strokeWidth?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
}
function BoltIcon({ size = 20, strokeWidth = 2 }: { size?: number; strokeWidth?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" /></svg>
}
function UserIcon({ size = 20, strokeWidth = 2 }: { size?: number; strokeWidth?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0116 0" /></svg>
}
