'use client'

import { useState } from 'react'
import { D } from '@/lib/design-tokens'
import { useRealtimeBookings } from '@/lib/hooks/use-realtime-bookings'
import { Card, Badge, Btn, SectionHead } from '@/components/ui'

type Filter = 'all' | 'confirmed' | 'pending' | 'cancelled'

const TABS: { id: Filter; label: string }[] = [
  { id: 'all',       label: 'All' },
  { id: 'confirmed', label: 'Confirmed' },
  { id: 'pending',   label: 'Pending' },
  { id: 'cancelled', label: 'Cancelled' },
]

const iconBtn = { width:28, height:28, borderRadius:7, background:D.surface2, border:`1px solid ${D.hairline}`, color:D.textSec, cursor:'pointer', display:'inline-flex', alignItems:'center', justifyContent:'center' }

// Postgres time columns return 'HH:MM:SS' — trim to 'HH:MM'
function fmt(t: string) { return t.slice(0, 5) }

export default function BookingsPage() {
  const [filter, setFilter] = useState<Filter>('all')
  const [search, setSearch] = useState('')

  // Fetch all bookings for owner's pitches — security enforced via !inner join + owner_id filter + RLS
  const { bookings, loading, error } = useRealtimeBookings()

  const filtered = bookings.filter(b => {
    if (filter !== 'all' && b.status !== filter) return false
    if (search && !b.customer_name.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  return (
    <div className="page-fade" style={{ padding:'28px 32px 60px' }}>
      <SectionHead
        title="Bookings"
        sub="All bookings across your pitches"
        right={
          <div style={{ display:'flex', gap:8 }}>
            <Btn kind="ghost">Export</Btn>
            <Btn>New booking</Btn>
          </div>
        }
      />

      {error && (
        <div style={{ padding:'12px 16px', borderRadius:10, background:D.redSoft, color:D.red, fontSize:13, marginBottom:16 }}>
          Failed to load bookings: {error}
        </div>
      )}

      {/* Tabs */}
      <div style={{ display:'flex', gap:4, padding:4, marginBottom:16, background:D.surface, borderRadius:12, border:`1px solid ${D.hairline}`, width:'fit-content' }}>
        {TABS.map(tab => {
          const count = tab.id === 'all' ? bookings.length : bookings.filter(b => b.status === tab.id).length
          const active = filter === tab.id
          return (
            <button key={tab.id} onClick={() => setFilter(tab.id)} style={{
              padding:'8px 14px', borderRadius:8,
              background: active ? D.surface2 : 'transparent',
              border:`1px solid ${active ? D.hairlineStrong : 'transparent'}`,
              color: active ? D.text : D.textSec,
              fontFamily:D.font, fontSize:12.5, fontWeight:600, cursor:'pointer',
              display:'flex', alignItems:'center', gap:8,
            }}>
              {tab.label}
              <span style={{ padding:'1px 7px', borderRadius:999, background:active?D.greenSoft:'rgba(255,255,255,0.06)', color:active?D.green:D.textTer, fontSize:10, fontWeight:700, fontFamily:D.mono }}>{count}</span>
            </button>
          )
        })}
      </div>

      <Card style={{ padding:0, overflow:'hidden' }}>
        {/* Toolbar */}
        <div style={{ padding:'12px 16px', borderBottom:`1px solid ${D.hairline}`, display:'flex', alignItems:'center', gap:12 }}>
          <div style={{ height:34, padding:'0 12px', borderRadius:9, flex:1, maxWidth:320, background:D.surface2, border:`1px solid ${D.hairline}`, display:'flex', alignItems:'center', gap:8 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={D.textSec} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search customer…"
              style={{ flex:1, background:'transparent', border:'none', outline:'none', color:D.text, fontSize:12.5, fontFamily:D.font }} />
          </div>
          <span style={{ flex:1 }} />
          <span style={{ fontSize:12, color:D.textTer, fontFamily:D.mono }}>
            {loading ? '…' : `${filtered.length} results`}
          </span>
        </div>

        {/* Table */}
        <div style={{ overflowX:'auto' }}>
          <table style={{ width:'100%', borderCollapse:'collapse', fontFamily:D.font }}>
            <thead>
              <tr style={{ borderBottom:`1px solid ${D.hairline}`, background:'rgba(0,0,0,0.2)' }}>
                {['Customer','Phone','Date','Time','Pitch','Status','Price',''].map(h => (
                  <th key={h} style={{ padding:'11px 16px', textAlign:h==='Price'?'right':'left', fontSize:11, fontWeight:700, color:D.textTer, letterSpacing:0.8, textTransform:'uppercase' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading
                ? Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i} style={{ borderBottom:`1px solid ${D.hairline}` }}>
                      {Array.from({ length: 8 }).map((_, j) => (
                        <td key={j} style={{ padding:'14px 16px' }}>
                          <div style={{ height:14, borderRadius:4, background:D.surface2, width:j===0?120:j===7?40:80, animation:'pulse 1.4s infinite' }} />
                        </td>
                      ))}
                    </tr>
                  ))
                : filtered.map((b, i) => (
                  <tr key={b.id}
                    style={{ borderBottom:i<filtered.length-1?`1px solid ${D.hairline}`:'none', transition:'background .15s' }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.02)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                    <td style={{ padding:'14px 16px' }}>
                      <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                        <div style={{ width:32, height:32, borderRadius:8, background:D.surface2, border:`1px solid ${D.hairline}`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:700, color:D.text, fontFamily:D.mono }}>
                          {b.customer_name.split(' ').map(w => w[0]).slice(0,2).join('')}
                        </div>
                        <span style={{ fontSize:13, fontWeight:600, color:D.text }}>{b.customer_name}</span>
                      </div>
                    </td>
                    <td style={{ padding:'14px 16px', fontSize:12.5, color:D.textSec, fontFamily:D.mono }}>{b.customer_phone ?? '—'}</td>
                    <td style={{ padding:'14px 16px', fontSize:12.5, color:D.text, fontFamily:D.mono }}>{b.date}</td>
                    <td style={{ padding:'14px 16px', fontSize:12.5, color:D.text, fontFamily:D.mono, fontWeight:600 }}>{fmt(b.start_time)} → {fmt(b.end_time)}</td>
                    <td style={{ padding:'14px 16px', fontSize:12.5, color:D.text }}>{b.pitch?.name ?? '—'}</td>
                    <td style={{ padding:'14px 16px' }}>
                      <Badge tone={b.status==='confirmed'?'success':b.status==='pending'?'warning':'danger'} dot>{b.status}</Badge>
                    </td>
                    <td style={{ padding:'14px 16px', fontSize:13, color:D.text, fontFamily:D.mono, fontWeight:700, textAlign:'right' }}>{b.total_price} DH</td>
                    <td style={{ padding:'14px 16px', textAlign:'right' }}>
                      <div style={{ display:'inline-flex', gap:4 }}>
                        <button style={iconBtn as React.CSSProperties}>→</button>
                        <button style={iconBtn as React.CSSProperties}>✕</button>
                      </div>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div style={{ padding:'12px 16px', borderTop:`1px solid ${D.hairline}`, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <span style={{ fontSize:12, color:D.textTer }}>Showing 1–{filtered.length} of {filtered.length}</span>
          <div style={{ display:'flex', gap:6 }}>
            <Btn kind="ghost" size="sm" disabled>Previous</Btn>
            <Btn kind="ghost" size="sm">Next</Btn>
          </div>
        </div>
      </Card>
    </div>
  )
}
