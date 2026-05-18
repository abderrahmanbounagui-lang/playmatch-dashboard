'use client'

import { useMemo } from 'react'
import { D } from '@/lib/design-tokens'

// ─── BarChart ─────────────────────────────────────────────────────────────────
export function BarChart({ data, color = D.green, height = 200 }: {
  data: { l: string; v: number; highlight?: boolean }[]
  color?: string
  height?: number
}) {
  const max = Math.max(...data.map(d => d.v), 1)
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height, padding: '4px 0' }}>
      {data.map((d, i) => (
        <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <div style={{ flex: 1, width: '100%', display: 'flex', alignItems: 'flex-end' }}>
            <div style={{
              width: '100%', height: `${(d.v / max) * 100}%`,
              background: d.highlight ? color : `${color}55`,
              borderRadius: 6, minHeight: 6, transition: 'all .3s',
            }} />
          </div>
          <span style={{ fontSize: 11, color: D.textTer, fontFamily: D.mono, fontWeight: 600 }}>{d.l}</span>
        </div>
      ))}
    </div>
  )
}

// ─── LineChart ────────────────────────────────────────────────────────────────
export function LineChart({ data, color = D.green, height = 200 }: {
  data: { l: string; v: number }[]
  color?: string
  height?: number
}) {
  const max = Math.max(...data.map(d => d.v), 1)
  const min = Math.min(...data.map(d => d.v), 0)
  const range = max - min || 1
  const w = 600
  const h = height
  const pad = { l: 0, r: 0, t: 14, b: 24 }
  const xStep = (w - pad.l - pad.r) / (data.length - 1)
  const yFor = (v: number) => pad.t + (h - pad.t - pad.b) * (1 - (v - min) / range)
  const pts = data.map((d, i) => `${pad.l + i * xStep},${yFor(d.v)}`).join(' ')
  const area = `M ${pad.l},${h - pad.b} L ${pts.split(' ').join(' L ')} L ${pad.l + (data.length - 1) * xStep},${h - pad.b} Z`
  const gradId = useMemo(() => `lg-${Math.random().toString(36).slice(2, 8)}`, [])

  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" height={h} preserveAspectRatio="none" style={{ display: 'block' }}>
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.35" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75].map((p, i) => (
        <line key={i} x1="0" x2={w}
          y1={pad.t + (h - pad.t - pad.b) * p}
          y2={pad.t + (h - pad.t - pad.b) * p}
          stroke={D.hairline} strokeWidth="1" strokeDasharray="3 4" />
      ))}
      <path d={area} fill={`url(#${gradId})`} />
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      {data.map((d, i) => (
        <circle key={i} cx={pad.l + i * xStep} cy={yFor(d.v)} r="3" fill={D.bg} stroke={color} strokeWidth="2" />
      ))}
      {data.map((d, i) => (
        <text key={i} x={pad.l + i * xStep} y={h - 6}
          fill={D.textTer} fontSize="11" fontFamily={D.mono} fontWeight="600" textAnchor="middle">{d.l}</text>
      ))}
    </svg>
  )
}

// ─── Sparkline ────────────────────────────────────────────────────────────────
export function Sparkline({ data, color = D.green, width = 80, height = 28 }: {
  data: number[]
  color?: string
  width?: number
  height?: number
}) {
  const max = Math.max(...data, 1)
  const min = Math.min(...data, 0)
  const range = max - min || 1
  const xStep = width / (data.length - 1)
  const pts = data.map((v, i) => `${i * xStep},${height - (height - 2) * (v - min) / range - 1}`).join(' ')
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
