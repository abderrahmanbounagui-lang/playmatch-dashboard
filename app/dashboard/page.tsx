'use client'

import { D } from '@/lib/design-tokens'
import { useUserContext } from '@/components/auth/user-provider'
import { useRealtimeBookings } from '@/lib/hooks/use-realtime-bookings'
import { Card, Badge, Btn, SectionHead } from '@/components/ui'
import { BarChart, LineChart, Sparkline } from '@/components/charts'

// Charts use aggregate/historical data — replace with real RPC/views once available
const weekly  = [{ l:'Mon',v:18},{l:'Tue',v:22},{l:'Wed',v:26},{l:'Thu',v:31},{l:'Fri',v:38,highlight:true},{l:'Sat',v:42,highlight:true},{l:'Sun',v:35}]
const revenue = [{ l:'W1',v:4200},{l:'W2',v:4800},{l:'W3',v:5400},{l:'W4',v:5100},{l:'W5',v:6200},{l:'W6',v:7100},{l:'W7',v:8450}]

// Postgres time columns may return 'HH:MM:SS' — trim to 'HH:MM'
function fmt(t: string) { return t.slice(0, 5) }

function KPI({ label, value, delta, deltaPositive = true, spark, tone = 'green' }: {
  label: string; value: string; delta?: string; deltaPositive?: boolean; spark?: number[]; tone?: string
}) {
  const c = tone === 'green' ? D.green : tone === 'amber' ? D.amber : tone === 'blue' ? D.blue : D.text
  return (
    <Card>
      <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:14 }}>
        <span style={{ fontSize:12, color:D.textSec, fontWeight:500 }}>{label}</span>
        {spark && <Sparkline data={spark} color={c} />}
      </div>
      <div style={{ fontSize:30, fontWeight:700, color:D.text, letterSpacing:-1, lineHeight:1 }}>{value}</div>
      {delta && (
        <div style={{ marginTop:10, display:'flex', alignItems:'center', gap:8 }}>
          <span style={{
            display:'inline-flex', alignItems:'center', gap:3,
            padding:'2px 8px', borderRadius:6,
            background: deltaPositive ? D.greenSoft : D.redSoft,
            color: deltaPositive ? D.green : D.red,
            fontSize:11, fontWeight:700, fontFamily:D.mono,
          }}>
            <svg width="9" height="9" viewBox="0 0 12 12" fill="currentColor" style={{ transform: deltaPositive ? 'none' : 'rotate(180deg)' }}>
              <path d="M6 2l4 6H2z" />
            </svg>
            {delta}
          </span>
          <span style={{ fontSize:11, color:D.textTer }}>vs last week</span>
        </div>
      )}
    </Card>
  )
}

export default function OverviewPage() {
  const { user } = useUserContext()
  const today = new Date().toISOString().split('T')[0]

  // Fetch only today's bookings for the schedule — owner isolation via !inner join + RLS
  const { bookings: todaysBookings, loading } = useRealtimeBookings({ date: today })
  const schedule = todaysBookings.filter(b => b.status !== 'cancelled')
    .sort((a, b) => a.start_time.localeCompare(b.start_time))

  // Derive KPIs from real data
  const confirmedToday   = todaysBookings.filter(b => b.status === 'confirmed').length
  const revenueToday     = todaysBookings.filter(b => b.status === 'confirmed').reduce((s, b) => s + b.total_price, 0)
  const upcomingCount    = todaysBookings.filter(b => b.status !== 'cancelled').length

  const firstName = (user?.user_metadata?.full_name ?? user?.email ?? 'there').split(' ')[0]
  const nextMatch = schedule[0]

  return (
    <div className="page-fade" style={{ padding:'28px 32px 60px', display:'flex', flexDirection:'column', gap:20 }}>
      {/* Welcome strip */}
      <div style={{
        padding:'20px 24px', borderRadius:16,
        background:`linear-gradient(135deg, ${D.greenSoft}, transparent 70%), ${D.surface}`,
        border:`1px solid ${D.green}33`, position:'relative', overflow:'hidden',
        display:'flex', alignItems:'center', gap:20, flexWrap:'wrap',
      }}>
        <svg style={{ position:'absolute', right:-40, top:-20, opacity:0.06 }} width="280" height="180" viewBox="0 0 200 130">
          <rect x="2" y="2" width="196" height="126" fill="none" stroke={D.green} strokeWidth="1.4"/>
          <line x1="100" y1="2" x2="100" y2="128" stroke={D.green} strokeWidth="1.4"/>
          <circle cx="100" cy="65" r="22" stroke={D.green} fill="none" strokeWidth="1.4"/>
          <rect x="2" y="40" width="26" height="50" fill="none" stroke={D.green} strokeWidth="1.4"/>
          <rect x="172" y="40" width="26" height="50" fill="none" stroke={D.green} strokeWidth="1.4"/>
        </svg>
        <div style={{ flex:1, minWidth:240 }}>
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:6 }}>
            <span style={{ width:7, height:7, borderRadius:'50%', background:D.green, animation:'pulse 1.4s infinite' }} />
            <span style={{ fontSize:11, fontWeight:700, color:D.green, letterSpacing:1.4 }}>LIVE</span>
          </div>
          <div style={{ fontSize:22, fontWeight:700, color:D.text, letterSpacing:-0.5, marginBottom:4 }}>
            Salam, {firstName} — you have{' '}
            <span style={{ color:D.green }}>
              {loading ? '…' : `${schedule.length} booking${schedule.length !== 1 ? 's' : ''}`} today
            </span>.
          </div>
          <div style={{ fontSize:13, color:D.textSec }}>
            {nextMatch
              ? <>Next match: <span style={{ color:D.text, fontWeight:600 }}>{fmt(nextMatch.start_time)} · {nextMatch.pitch?.name}</span></>
              : <span>No matches scheduled yet.</span>
            }
          </div>
        </div>
        <div style={{ display:'flex', gap:8 }}>
          <Btn kind="quiet">View calendar</Btn>
          <Btn>New booking</Btn>
        </div>
      </div>

      {/* KPIs — today values from real data; sparklines are placeholders pending aggregate queries */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16 }}>
        <KPI label="Today's bookings" value={loading ? '…' : String(confirmedToday)} spark={[5,7,6,9,8,11,confirmedToday]} tone="green" />
        <KPI label="Today's revenue"  value={loading ? '…' : `MAD ${revenueToday.toLocaleString()}`} spark={[3,4,5,4,6,7,9]} tone="green" />
        <KPI label="Upcoming today"   value={loading ? '…' : String(upcomingCount)} spark={[8,7,7,6,6,5,upcomingCount]} tone="blue" />
        <KPI label="Pending approval" value={loading ? '…' : String(todaysBookings.filter(b=>b.status==='pending').length)} deltaPositive={false} spark={[2,3,2,1,2,1,todaysBookings.filter(b=>b.status==='pending').length]} tone="amber" />
      </div>

      {/* Charts — placeholder data; replace with aggregate Supabase RPC/views */}
      <div style={{ display:'grid', gridTemplateColumns:'1.4fr 1fr', gap:16 }}>
        <Card>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:18 }}>
            <div>
              <div style={{ fontSize:14, fontWeight:600, color:D.text }}>Weekly bookings</div>
              <div style={{ fontSize:12, color:D.textSec, marginTop:2 }}>This week</div>
            </div>
            <div style={{ display:'flex', gap:6 }}>
              {['7d','30d','90d'].map((p,i) => (
                <button key={p} style={{ padding:'5px 10px', borderRadius:7, background:i===0?D.surface2:'transparent', border:`1px solid ${i===0?D.hairlineStrong:'transparent'}`, color:i===0?D.text:D.textSec, fontSize:11, fontWeight:600, fontFamily:D.font, cursor:'pointer' }}>{p}</button>
              ))}
            </div>
          </div>
          <BarChart data={weekly} height={200} />
        </Card>
        <Card>
          <div style={{ marginBottom:18 }}>
            <div style={{ fontSize:14, fontWeight:600, color:D.text }}>Revenue (7 weeks)</div>
            <div style={{ display:'flex', alignItems:'baseline', gap:10, marginTop:6 }}>
              <span style={{ fontSize:24, fontWeight:700, color:D.text, letterSpacing:-0.8 }}>MAD 41,250</span>
              <Badge tone="success" dot>+32% YoY</Badge>
            </div>
          </div>
          <LineChart data={revenue} height={200} />
        </Card>
      </div>

      {/* Today's schedule (real data) + Activity */}
      <div style={{ display:'grid', gridTemplateColumns:'1.4fr 1fr', gap:16 }}>
        <Card style={{ padding:0 }}>
          <div style={{ padding:'18px 20px 14px', borderBottom:`1px solid ${D.hairline}`, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <div>
              <div style={{ fontSize:14, fontWeight:600, color:D.text }}>Today&#39;s schedule</div>
              <div style={{ fontSize:12, color:D.textSec, marginTop:2 }}>
                {loading ? 'Loading…' : `${schedule.length} match${schedule.length !== 1 ? 'es' : ''} confirmed`}
              </div>
            </div>
            <Btn kind="ghost" size="sm">View all</Btn>
          </div>
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div key={i} style={{ padding:'14px 20px', borderBottom:`1px solid ${D.hairline}`, display:'flex', gap:14, alignItems:'center' }}>
                  <div style={{ width:54, height:54, borderRadius:12, background:D.surface2, animation:'pulse 1.4s infinite' }} />
                  <div style={{ flex:1 }}>
                    <div style={{ height:14, width:120, borderRadius:4, background:D.surface2, marginBottom:6, animation:'pulse 1.4s infinite' }} />
                    <div style={{ height:12, width:80, borderRadius:4, background:D.surface2, animation:'pulse 1.4s infinite' }} />
                  </div>
                </div>
              ))
            : schedule.length === 0
              ? <div style={{ padding:'40px 20px', textAlign:'center', color:D.textTer, fontSize:13 }}>No bookings today.</div>
              : schedule.map((b, i) => (
                  <div key={b.id} style={{ padding:'14px 20px', borderBottom:i<schedule.length-1?`1px solid ${D.hairline}`:'none', display:'flex', alignItems:'center', gap:14 }}>
                    <div style={{ width:54, height:54, borderRadius:12, background:D.surface2, border:`1px solid ${D.hairline}`, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center' }}>
                      <span style={{ fontFamily:D.mono, fontSize:15, fontWeight:700, color:D.text }}>{fmt(b.start_time)}</span>
                      <span style={{ fontSize:9, color:D.textTer, fontWeight:600 }}>{fmt(b.end_time)}</span>
                    </div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontSize:14, fontWeight:600, color:D.text, marginBottom:2 }}>{b.customer_name}</div>
                      <div style={{ fontSize:12, color:D.textSec }}>{b.pitch?.name ?? '—'}</div>
                    </div>
                    <Badge tone={b.status==='confirmed'?'success':'warning'} dot>{b.status}</Badge>
                    <span style={{ fontFamily:D.mono, fontSize:13, fontWeight:700, color:D.text }}>{b.total_price} DH</span>
                  </div>
                ))
          }
        </Card>

        <Card style={{ padding:0 }}>
          <div style={{ padding:'18px 20px 14px', borderBottom:`1px solid ${D.hairline}` }}>
            <div style={{ fontSize:14, fontWeight:600, color:D.text }}>Recent activity</div>
            <div style={{ fontSize:12, color:D.textSec, marginTop:2 }}>Live updates</div>
          </div>
          <div style={{ padding:'8px 0' }}>
            {[
              { tone:'success' as const, label:'New booking confirmed',        sub:'Atlas FC · Pitch 2 · 19:30', ago:'2m'  },
              { tone:'info'    as const, label:'New message from Mehdi A.',    sub:'Re: rescheduling tomorrow',  ago:'12m' },
              { tone:'warning' as const, label:'Pitch 1 has 3 hours unbooked', sub:'Tonight 19:00–22:00',        ago:'34m' },
              { tone:'danger'  as const, label:'Booking cancelled',            sub:'Beach Ballers · Tomorrow',   ago:'1h'  },
              { tone:'success' as const, label:'New team registered',          sub:'Hay Hassani United',         ago:'2h'  },
            ].map((a, i) => {
              const bgMap = { success:D.greenSoft, warning:D.amberSoft, danger:D.redSoft, info:D.blueSoft, neutral:'rgba(255,255,255,0.06)' }
              const cMap  = { success:D.green,    warning:D.amber,     danger:D.red,     info:D.blue,    neutral:D.textSec }
              return (
                <div key={i} style={{ padding:'10px 20px', display:'flex', gap:12, alignItems:'flex-start' }}>
                  <div style={{ width:32, height:32, borderRadius:8, flexShrink:0, background:bgMap[a.tone], color:cMap[a.tone], display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <span style={{ fontSize:12, fontWeight:700 }}>●</span>
                  </div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:13, color:D.text, fontWeight:600 }}>{a.label}</div>
                    <div style={{ fontSize:11, color:D.textSec, marginTop:1 }}>{a.sub}</div>
                  </div>
                  <span style={{ fontSize:11, color:D.textTer, fontFamily:D.mono }}>{a.ago}</span>
                </div>
              )
            })}
          </div>
        </Card>
      </div>
    </div>
  )
}
