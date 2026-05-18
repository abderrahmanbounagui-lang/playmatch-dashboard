'use client'

import { D } from '@/lib/design-tokens'
import { usePitches } from '@/lib/hooks/use-pitches'
import type { PitchWithStats } from '@/lib/db/types'
import { Card, Badge, Btn, SectionHead } from '@/components/ui'

function PitchCard({ p }: { p: PitchWithStats }) {
  return (
    <Card style={{ padding:0, overflow:'hidden', display:'flex', flexDirection:'column' }}>
      {/* Pitch illustration */}
      <div style={{ height:140, position:'relative', background:`linear-gradient(135deg, ${D.surface2}, ${D.bg})`, borderBottom:`1px solid ${D.hairline}`, overflow:'hidden' }}>
        <svg style={{ position:'absolute', inset:0 }} width="100%" height="100%" viewBox="0 0 360 140" preserveAspectRatio="xMidYMid slice">
          <rect x="20" y="14" width="320" height="112" fill="none" stroke={D.green} strokeWidth="1.5" opacity="0.4"/>
          <line x1="180" y1="14" x2="180" y2="126" stroke={D.green} strokeWidth="1.5" opacity="0.4"/>
          <circle cx="180" cy="70" r="22" fill="none" stroke={D.green} strokeWidth="1.5" opacity="0.4"/>
          <rect x="20" y="44" width="32" height="52" fill="none" stroke={D.green} strokeWidth="1.5" opacity="0.4"/>
          <rect x="308" y="44" width="32" height="52" fill="none" stroke={D.green} strokeWidth="1.5" opacity="0.4"/>
        </svg>
        <div style={{ position:'absolute', top:12, left:12, display:'flex', gap:6 }}>
          <Badge tone={p.status==='active'?'success':'warning'} dot>{p.status}</Badge>
          <Badge tone="info">{p.format}</Badge>
        </div>
        <div style={{ position:'absolute', bottom:12, right:12, padding:'6px 10px', borderRadius:8, background:'rgba(0,0,0,0.5)', backdropFilter:'blur(8px)', fontFamily:D.mono, fontSize:12, fontWeight:700, color:D.text }}>{p.price_per_hour} DH/h</div>
      </div>

      <div style={{ padding:18, flex:1, display:'flex', flexDirection:'column' }}>
        <div style={{ fontSize:16, fontWeight:700, color:D.text, letterSpacing:-0.3, marginBottom:4 }}>{p.name}</div>
        <div style={{ fontSize:12, color:D.textSec, marginBottom:14 }}>📍 {p.location ?? '—'}</div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginBottom:14 }}>
          <div style={{ padding:10, borderRadius:10, background:D.surface2 }}>
            <div style={{ fontSize:10, color:D.textTer, fontWeight:600, letterSpacing:0.5, textTransform:'uppercase' }}>Bookings</div>
            <div style={{ fontSize:16, fontWeight:700, color:D.text, fontFamily:D.mono, marginTop:2 }}>{p.booking_count}</div>
          </div>
          <div style={{ padding:10, borderRadius:10, background:D.surface2 }}>
            <div style={{ fontSize:10, color:D.textTer, fontWeight:600, letterSpacing:0.5, textTransform:'uppercase' }}>Surface</div>
            <div style={{ fontSize:13, fontWeight:700, color:D.text, marginTop:4 }}>{p.surface}</div>
          </div>
        </div>
        <div style={{ display:'flex', gap:8, marginTop:'auto' }}>
          <Btn kind="quiet" size="sm" style={{ flex:1 }}>Manage</Btn>
          <Btn kind="ghost" size="sm">Calendar</Btn>
        </div>
      </div>
    </Card>
  )
}

export default function PitchesPage() {
  const { pitches, loading, error } = usePitches()

  return (
    <div className="page-fade" style={{ padding:'28px 32px 60px' }}>
      <SectionHead
        title="My Pitches"
        sub={loading ? 'Loading…' : `${pitches.filter(p=>p.status==='active').length} active · ${pitches.length} total`}
        right={
          <div style={{ display:'flex', gap:8 }}>
            <Btn kind="ghost">Filter</Btn>
            <Btn>Add pitch</Btn>
          </div>
        }
      />

      {error && (
        <div style={{ padding:'12px 16px', borderRadius:10, background:D.redSoft, color:D.red, fontSize:13, marginBottom:16 }}>
          Failed to load pitches: {error}
        </div>
      )}

      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(300px,1fr))', gap:16 }}>
        {loading
          ? Array.from({ length: 3 }).map((_, i) => (
              <div key={i} style={{ height:320, borderRadius:16, background:D.surface, border:`1px solid ${D.hairline}`, animation:'pulse 1.4s infinite' }} />
            ))
          : pitches.map(p => <PitchCard key={p.id} p={p} />)
        }
        {/* Add pitch placeholder */}
        <div style={{ border:`1.5px dashed ${D.hairlineStrong}`, borderRadius:16, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:40, gap:12, cursor:'pointer', minHeight:280, color:D.textSec }}>
          <div style={{ width:52, height:52, borderRadius:14, background:D.greenSoft, color:D.green, display:'flex', alignItems:'center', justifyContent:'center', fontSize:28, fontWeight:300 }}>+</div>
          <div style={{ fontSize:14, fontWeight:700, color:D.text }}>Add a new pitch</div>
          <div style={{ fontSize:12, color:D.textSec, textAlign:'center', maxWidth:200 }}>List a new pitch to start receiving bookings.</div>
        </div>
      </div>
    </div>
  )
}
