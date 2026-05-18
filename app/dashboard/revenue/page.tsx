'use client'

import { useState } from 'react'
import { D } from '@/lib/design-tokens'
import { Card, Badge, Btn, SectionHead } from '@/components/ui'
import { LineChart, Sparkline } from '@/components/charts'

const monthly = [{ l:'Jan',v:22400},{l:'Feb',v:24800},{l:'Mar',v:28600},{l:'Apr',v:32100},{l:'May',v:41250}]
const byPitch = [
  { name:'Anfa Pitch 1',      rev:14580, share:35, change:'+18%' },
  { name:'Anfa Pitch 2',      rev:12400, share:30, change:'+22%' },
  { name:'Maarif 5-a-side',   rev:9870,  share:24, change:'+9%'  },
  { name:'Sidi Maarouf Arena',rev:4400,  share:11, change:'−'    },
]

type Range = 'day' | 'week' | 'month' | 'year'

function KPI({ label, value, delta, spark, tone = 'green' }: { label: string; value: string; delta?: string; spark?: number[]; tone?: string }) {
  const c = tone === 'green' ? D.green : tone === 'amber' ? D.amber : tone === 'blue' ? D.blue : D.text
  return (
    <Card>
      <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:14 }}>
        <span style={{ fontSize:12, color:D.textSec }}>{label}</span>
        {spark && <Sparkline data={spark} color={c} />}
      </div>
      <div style={{ fontSize:30, fontWeight:700, color:D.text, letterSpacing:-1, lineHeight:1 }}>{value}</div>
      {delta && (
        <div style={{ marginTop:10 }}>
          <span style={{ padding:'2px 8px', borderRadius:6, background:D.greenSoft, color:D.green, fontSize:11, fontWeight:700, fontFamily:D.mono }}>{delta}</span>
        </div>
      )}
    </Card>
  )
}

export default function RevenuePage() {
  const [range, setRange] = useState<Range>('week')

  return (
    <div className="page-fade" style={{ padding:'28px 32px 60px', display:'flex', flexDirection:'column', gap:16 }}>
      <SectionHead
        title="Revenue"
        sub="Income across all pitches"
        right={
          <div style={{ display:'flex', gap:4, padding:4, background:D.surface, borderRadius:10, border:`1px solid ${D.hairline}` }}>
            {(['day','week','month','year'] as Range[]).map(r => (
              <button key={r} onClick={() => setRange(r)} style={{ padding:'7px 14px', borderRadius:7, background:range===r?D.surface2:'transparent', border:`1px solid ${range===r?D.hairlineStrong:'transparent'}`, color:range===r?D.text:D.textSec, fontFamily:D.font, fontSize:12, fontWeight:600, cursor:'pointer', textTransform:'capitalize' }}>{r}</button>
            ))}
          </div>
        }
      />

      {/* Hero stat */}
      <Card style={{ padding:28, position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', right:-100, top:-50, width:320, height:320, borderRadius:'50%', background:`radial-gradient(circle, ${D.greenSoft}, transparent 70%)` }}/>
        <div style={{ position:'relative' }}>
          <div style={{ fontSize:12, color:D.textSec, marginBottom:12 }}>Total revenue · this month</div>
          <div style={{ display:'flex', alignItems:'baseline', gap:14, marginBottom:10 }}>
            <span style={{ fontSize:48, fontWeight:700, color:D.text, letterSpacing:-2 }}>MAD 41,250</span>
            <Badge tone="success" dot>+28.5% vs Apr</Badge>
          </div>
          <div style={{ fontSize:13, color:D.textSec }}>
            <span style={{ fontFamily:D.mono, fontWeight:700, color:D.text }}>366</span> bookings · avg <span style={{ fontFamily:D.mono, fontWeight:700, color:D.text }}>MAD 112</span> per booking
          </div>
        </div>
      </Card>

      <div style={{ display:'grid', gridTemplateColumns:'1.5fr 1fr', gap:16 }}>
        <Card>
          <div style={{ marginBottom:18 }}>
            <div style={{ fontSize:14, fontWeight:600, color:D.text }}>Monthly revenue</div>
            <div style={{ fontSize:12, color:D.textSec, marginTop:2 }}>Trailing 5 months · MAD</div>
          </div>
          <LineChart data={monthly} height={260} />
        </Card>

        <Card style={{ padding:0 }}>
          <div style={{ padding:'18px 20px 14px', borderBottom:`1px solid ${D.hairline}` }}>
            <div style={{ fontSize:14, fontWeight:600, color:D.text }}>Revenue by pitch</div>
            <div style={{ fontSize:12, color:D.textSec, marginTop:2 }}>This month</div>
          </div>
          {byPitch.map((p, i) => (
            <div key={i} style={{ padding:'12px 20px' }}>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:6 }}>
                <span style={{ fontSize:13, fontWeight:600, color:D.text }}>{p.name}</span>
                <span style={{ fontSize:13, fontWeight:700, color:D.text, fontFamily:D.mono }}>MAD {p.rev.toLocaleString()}</span>
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                <div style={{ flex:1, height:6, background:D.surface2, borderRadius:3, overflow:'hidden' }}>
                  <div style={{ width:`${p.share}%`, height:'100%', background:D.green, borderRadius:3 }}/>
                </div>
                <span style={{ fontSize:11, color:D.textTer, fontFamily:D.mono, fontWeight:600, width:36, textAlign:'right' }}>{p.share}%</span>
                <span style={{ fontSize:11, color:p.change.startsWith('+')?D.green:D.textTer, fontFamily:D.mono, fontWeight:700, width:38, textAlign:'right' }}>{p.change}</span>
              </div>
            </div>
          ))}
        </Card>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16 }}>
        <KPI label="Avg. booking"  value="MAD 112"    delta="+8%"  spark={[80,90,95,100,105,110,112]} tone="green" />
        <KPI label="Peak hour"     value="19:00–21:00"                                                  tone="amber" />
        <KPI label="Top day"       value="Saturday"                                                      tone="blue"  />
      </div>
    </div>
  )
}
