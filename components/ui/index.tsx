'use client'

import { D } from '@/lib/design-tokens'
import type { CSSProperties, ReactNode, ButtonHTMLAttributes } from 'react'

// ─── Card ───────────────────────────────────────────────────────────────────
export function Card({ children, style, className }: { children: ReactNode; style?: CSSProperties; className?: string }) {
  return (
    <div className={className} style={{ background: D.surface, border: `1px solid ${D.hairline}`, borderRadius: 16, padding: 20, ...style }}>
      {children}
    </div>
  )
}

// ─── Button ─────────────────────────────────────────────────────────────────
type BtnKind = 'primary' | 'ghost' | 'quiet' | 'danger'
type BtnSize = 'sm' | 'md' | 'lg'

const btnSizes: Record<BtnSize, CSSProperties> = {
  sm: { height: 32, padding: '0 12px', fontSize: 12, gap: 6 },
  md: { height: 38, padding: '0 16px', fontSize: 13, gap: 8 },
  lg: { height: 44, padding: '0 22px', fontSize: 14, gap: 8 },
}
const btnKinds: Record<BtnKind, CSSProperties> = {
  primary: { background: D.green,    color: D.greenInk, border: 'none' },
  ghost:   { background: 'transparent', color: D.text,  border: `1px solid ${D.hairlineStrong}` },
  quiet:   { background: D.surface2,   color: D.text,   border: `1px solid ${D.hairline}` },
  danger:  { background: D.redSoft,    color: D.red,    border: `1px solid ${D.red}33` },
}

interface BtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  kind?: BtnKind
  size?: BtnSize
  icon?: ReactNode
}

export function Btn({ children, kind = 'primary', size = 'md', icon, style, ...rest }: BtnProps) {
  return (
    <button style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      borderRadius: 10, fontWeight: 600, letterSpacing: -0.1,
      fontFamily: D.font, cursor: 'pointer', whiteSpace: 'nowrap',
      ...btnSizes[size], ...btnKinds[kind], ...style,
    }} {...rest}>
      {icon && <span style={{ display: 'flex', flexShrink: 0 }}>{icon}</span>}
      {children}
    </button>
  )
}

// ─── Badge ───────────────────────────────────────────────────────────────────
type BadgeTone = 'success' | 'warning' | 'danger' | 'info' | 'neutral'

const badgeTones: Record<BadgeTone, { bg: string; color: string; ring: string }> = {
  success: { bg: D.greenSoft,              color: D.green, ring: `${D.green}44` },
  warning: { bg: D.amberSoft,              color: D.amber, ring: `${D.amber}44` },
  danger:  { bg: D.redSoft,                color: D.red,   ring: `${D.red}44` },
  info:    { bg: D.blueSoft,               color: D.blue,  ring: `${D.blue}44` },
  neutral: { bg: 'rgba(255,255,255,0.06)', color: D.textSec, ring: D.hairline },
}

export function Badge({ children, tone = 'neutral', dot, style }: { children: ReactNode; tone?: BadgeTone; dot?: boolean; style?: CSSProperties }) {
  const t = badgeTones[tone]
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '3px 9px', borderRadius: 999,
      background: t.bg, color: t.color, border: `1px solid ${t.ring}`,
      fontSize: 11, fontWeight: 700, letterSpacing: 0.2,
      fontFamily: D.font, ...style,
    }}>
      {dot && <span style={{ width: 6, height: 6, borderRadius: '50%', background: t.color, flexShrink: 0 }} />}
      {children}
    </span>
  )
}

// ─── SectionHead ─────────────────────────────────────────────────────────────
export function SectionHead({ title, sub, right }: { title: string; sub?: string; right?: ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16, marginBottom: 20, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: D.text, letterSpacing: -0.6 }}>{title}</h2>
        {sub && <p style={{ margin: '4px 0 0', fontSize: 13, color: D.textSec }}>{sub}</p>}
      </div>
      {right}
    </div>
  )
}
