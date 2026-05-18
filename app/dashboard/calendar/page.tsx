'use client'

import { useState } from 'react'
import { D } from '@/lib/design-tokens'
import { PITCHES, BOOKINGS } from '@/lib/mock-data'
import { Card, Btn, SectionHead } from '@/components/ui'

// May 2026 starts on Friday — offset 4 cells (Mon=0 … Thu=3, Fri=4)
const MONTH_DAYS = Array.from({ length: 35 }, (_, i) => {
  const day = i - 3
  return day >= 1 && day <= 31 ? day : null
})

const SLOTS = Array.from({ length: 16 }, (_, i) => 8 + i)

const navBtn: React.CSSProperties = { width:32, height:32, borderRadius:8, background:D.surface, border:`1px solid ${D.hairline}`, color:D.text, cursor:'pointer', display:'inline-flex', alignItems:'center', justifyContent:'center' }

export default function CalendarPage() {
  const [pitchId, setPitchId] = useState(PITCHES[0].id)
  const [selectedDay, setSelectedDay] = useState(15)

  const pitch = PITCHES.find(p => p.id === pitchId)!

  const dayLoad = (day: number | null) => {
    if (!day) return 0
    return Math.min((day * 7 + pitchId.length * 3) % 11, 8)
  }

  const dayBookings = BOOKINGS
    .filter(b => b.pitch.startsWith(pitch.name.split(' ·')[0]))
    .filter(b => parseInt(b.date.split('-')[2]) === selectedDay)

  return (
    <div className="page-fade" style={{ padding:'28px 32px 60px' }}>
      <SectionHead
        title="Calendar"
        sub="Booking schedule per pitch"
        right={
          <div style={{ display:'flex', gap:8 }}>
            <select value={pitchId} onChange={e => setPitchId(e.target.value)} style={{ height:38, padding:'0 14px', borderRadius:10, background:D.surface, border:`1px solid ${D.hairlineStrong}`, color:D.text, fontFamily:D.font, fontSize:13, fontWeight:600 }}>
              {PITCHES.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
            <Btn kind="ghost">Block time</Btn>
          </div>
        }
      />

      <div style={{ display:'grid', gridTemplateColumns:'1.5fr 1fr', gap:16 }}>
        {/* Month grid */}
        <Card>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:16 }}>
            <div>
              <div style={{ fontSize:18, fontWeight:700, color:D.text, letterSpacing:-0.4 }}>May 2026</div>
              <div style={{ fontSize:12, color:D.textSec, marginTop:2 }}>{pitch.name}</div>
            </div>
            <div style={{ display:'flex', gap:6 }}>
              <button style={navBtn}>‹</button>
              <button style={navBtn}>›</button>
              <Btn kind="quiet" size="sm">Today</Btn>
            </div>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap:6, marginBottom:8 }}>
            {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d => (
              <div key={d} style={{ textAlign:'center', fontSize:10, fontWeight:700, color:D.textTer, letterSpacing:1, textTransform:'uppercase', padding:'6px 0' }}>{d}</div>
            ))}
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap:6 }}>
            {MONTH_DAYS.map((day, i) => {
              const load      = dayLoad(day)
              const isSelected = day === selectedDay
              const isToday   = day === 15
              const intensity = load / 8
              return (
                <button key={i} disabled={!day} onClick={() => day && setSelectedDay(day)} style={{
                  aspectRatio:'1', borderRadius:10,
                  background: !day ? 'transparent' : isSelected ? D.green : `oklch(0.32 0.08 142 / ${intensity * 0.6 + 0.05})`,
                  border: isSelected ? 'none' : isToday ? `1.5px solid ${D.green}` : `1px solid ${day ? D.hairline : 'transparent'}`,
                  color: isSelected ? D.greenInk : day ? D.text : 'transparent',
                  cursor: day ? 'pointer' : 'default',
                  display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:2,
                  padding:6, fontFamily:D.font,
                }}>
                  <span style={{ fontSize:15, fontWeight:700, fontFamily:D.mono }}>{day}</span>
                  {day && load > 0 && <span style={{ fontSize:9, fontWeight:700, color:isSelected?D.greenInk:D.textSec, fontFamily:D.mono }}>{load}</span>}
                </button>
              )
            })}
          </div>

          <div style={{ marginTop:18, paddingTop:14, borderTop:`1px solid ${D.hairline}`, display:'flex', alignItems:'center', gap:14, fontSize:11, color:D.textSec }}>
            <span>Bookings load:</span>
            {[0.1,0.3,0.6,0.9].map((op,i) => (
              <div key={i} style={{ width:18, height:18, borderRadius:5, background:`oklch(0.32 0.08 142 / ${op})`, border:`1px solid ${D.hairline}` }}/>
            ))}
            <span style={{ marginLeft:'auto', fontFamily:D.mono, fontSize:11, color:D.textTer }}>● TODAY · ▮ SELECTED</span>
          </div>
        </Card>

        {/* Day schedule */}
        <Card style={{ padding:0 }}>
          <div style={{ padding:'18px 20px 14px', borderBottom:`1px solid ${D.hairline}` }}>
            <div style={{ fontSize:11, color:D.textTer, fontWeight:700, letterSpacing:1.2, marginBottom:4 }}>SELECTED DAY</div>
            <div style={{ fontSize:20, fontWeight:700, color:D.text, letterSpacing:-0.5 }}>May {selectedDay}, 2026</div>
            <div style={{ fontSize:12, color:D.textSec, marginTop:4 }}>{dayBookings.length} bookings · {16 - dayBookings.length} open slots</div>
          </div>
          <div style={{ maxHeight:480, overflowY:'auto' }}>
            {SLOTS.map((h, i) => {
              const booking = dayBookings.find(b => parseInt(b.start) === h)
              return (
                <div key={h} style={{ display:'flex', alignItems:'stretch', borderBottom:i<SLOTS.length-1?`1px solid ${D.hairline}`:'none', minHeight:52 }}>
                  <div style={{ width:56, padding:'12px 0', textAlign:'center', fontFamily:D.mono, fontSize:12, fontWeight:700, color:D.textTer, borderRight:`1px solid ${D.hairline}`, flexShrink:0 }}>
                    {String(h).padStart(2,'0')}:00
                  </div>
                  <div style={{ flex:1, padding:8 }}>
                    {booking ? (
                      <div style={{ height:'100%', padding:'8px 12px', borderRadius:8, background:booking.status==='confirmed'?D.greenSoft:D.amberSoft, border:`1px solid ${booking.status==='confirmed'?D.green:D.amber}55`, display:'flex', flexDirection:'column', justifyContent:'center', gap:2 }}>
                        <div style={{ fontSize:12.5, fontWeight:700, color:D.text }}>{booking.name}</div>
                        <div style={{ fontSize:10.5, color:D.textSec, fontFamily:D.mono }}>{booking.start}–{booking.end} · {booking.price} DH</div>
                      </div>
                    ) : (
                      <button style={{ width:'100%', height:'100%', background:'transparent', border:`1px dashed ${D.hairline}`, borderRadius:8, color:D.textTer, cursor:'pointer', fontFamily:D.font, fontSize:11, fontWeight:500 }}>+ Available</button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </Card>
      </div>
    </div>
  )
}
