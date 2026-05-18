'use client'

import { useState } from 'react'
import { D } from '@/lib/design-tokens'
import { PITCHES, OWNER } from '@/lib/mock-data'
import { Card, Btn, SectionHead } from '@/components/ui'

type Tab = 'profile' | 'business' | 'hours' | 'notifications'

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: 'profile',       label: 'Profile',       icon: '👤' },
  { id: 'business',      label: 'Business info',  icon: '🏢' },
  { id: 'hours',         label: 'Working hours',  icon: '🕐' },
  { id: 'notifications', label: 'Notifications',  icon: '🔔' },
]

function Field({ label, value, hint, type = 'text' }: { label: string; value: string; hint?: string; type?: string }) {
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
      <label style={{ fontSize:12, fontWeight:600, color:D.text }}>{label}</label>
      <input type={type} defaultValue={value} style={{ height:40, padding:'0 14px', borderRadius:10, background:D.surface2, border:`1px solid ${D.hairline}`, color:D.text, fontFamily:D.font, fontSize:13.5, outline:'none' }} />
      {hint && <span style={{ fontSize:11, color:D.textTer }}>{hint}</span>}
    </div>
  )
}

function Toggle({ label, sub, defaultOn }: { label: string; sub?: string; defaultOn?: boolean }) {
  const [on, setOn] = useState(!!defaultOn)
  return (
    <div style={{ display:'flex', alignItems:'center', gap:14, padding:'14px 0', borderBottom:`1px solid ${D.hairline}` }}>
      <div style={{ flex:1 }}>
        <div style={{ fontSize:13.5, fontWeight:600, color:D.text }}>{label}</div>
        {sub && <div style={{ fontSize:12, color:D.textSec, marginTop:2 }}>{sub}</div>}
      </div>
      <button onClick={() => setOn(v => !v)} style={{ width:42, height:24, borderRadius:14, position:'relative', background:on?D.green:D.surface2, border:`1px solid ${on?D.green:D.hairlineStrong}`, cursor:'pointer', transition:'background .2s', flexShrink:0 }}>
        <span style={{ position:'absolute', top:2, left:on?20:2, width:18, height:18, borderRadius:'50%', background:on?D.greenInk:D.text, transition:'left .2s' }}/>
      </button>
    </div>
  )
}

export default function SettingsPage() {
  const [tab, setTab] = useState<Tab>('profile')

  return (
    <div className="page-fade" style={{ padding:'28px 32px 60px' }}>
      <SectionHead title="Settings" sub="Manage your account, business, and preferences" />

      <div style={{ display:'grid', gridTemplateColumns:'220px 1fr', gap:24 }}>
        {/* Side nav */}
        <nav style={{ display:'flex', flexDirection:'column', gap:2 }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{ padding:'10px 12px', borderRadius:9, textAlign:'left', background:tab===t.id?D.surface:'transparent', border:`1px solid ${tab===t.id?D.hairline:'transparent'}`, color:tab===t.id?D.text:D.textSec, fontFamily:D.font, fontSize:13, fontWeight:tab===t.id?600:500, cursor:'pointer', display:'flex', alignItems:'center', gap:10 }}>
              <span style={{ fontSize:15 }}>{t.icon}</span> {t.label}
            </button>
          ))}
        </nav>

        {/* Panel */}
        <Card style={{ padding:28 }}>
          {tab === 'profile' && (
            <div>
              <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:28, paddingBottom:20, borderBottom:`1px solid ${D.hairline}` }}>
                <div style={{ width:64, height:64, borderRadius:16, background:`linear-gradient(135deg, ${D.green}, ${D.greenDim})`, display:'flex', alignItems:'center', justifyContent:'center', color:D.greenInk, fontWeight:800, fontSize:22, fontFamily:D.mono }}>{OWNER.initials}</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:18, fontWeight:700, color:D.text, letterSpacing:-0.4 }}>{OWNER.name}</div>
                  <div style={{ fontSize:13, color:D.textSec, marginTop:2 }}>Owner since 2024 · {OWNER.city}</div>
                </div>
                <Btn kind="ghost" size="sm">Change photo</Btn>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:20 }}>
                <Field label="Full name" value={OWNER.name} />
                <Field label="Email" value={OWNER.email} type="email" />
                <Field label="Phone" value={OWNER.phone} />
                <Field label="City" value={OWNER.city} />
              </div>
              <div style={{ display:'flex', gap:8 }}>
                <Btn>Save changes</Btn>
                <Btn kind="ghost">Cancel</Btn>
              </div>
            </div>
          )}

          {tab === 'business' && (
            <div>
              <div style={{ fontSize:16, fontWeight:700, color:D.text, marginBottom:18, letterSpacing:-0.3 }}>Business information</div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:20 }}>
                <Field label="Business name" value={OWNER.business} />
                <Field label="Tax ID (ICE)" value="002145678901234" />
                <Field label="Business email" value="contact@anfasports.ma" type="email" />
                <Field label="Business phone" value="+212 522 12 34 56" />
              </div>
              <Field label="Address" value="Bd. de la Corniche, Anfa, Casablanca" hint="Used for invoices and customer-facing receipts." />
              <div style={{ display:'flex', gap:8, marginTop:20 }}>
                <Btn>Save changes</Btn>
                <Btn kind="ghost">Cancel</Btn>
              </div>
            </div>
          )}

          {tab === 'hours' && (
            <div>
              <div style={{ fontSize:16, fontWeight:700, color:D.text, marginBottom:4 }}>Working hours per pitch</div>
              <div style={{ fontSize:12, color:D.textSec, marginBottom:24 }}>Set when each pitch is available for booking.</div>
              {PITCHES.filter(p => p.status === 'active').map(p => (
                <div key={p.id} style={{ padding:'16px 0', borderBottom:`1px solid ${D.hairline}` }}>
                  <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:12 }}>
                    <div>
                      <div style={{ fontSize:14, fontWeight:700, color:D.text }}>{p.name}</div>
                      <div style={{ fontSize:11, color:D.textTer, marginTop:2 }}>{p.format} · {p.surface}</div>
                    </div>
                    <Btn kind="ghost" size="sm">Edit per-day</Btn>
                  </div>
                  <div style={{ display:'flex', gap:14, flexWrap:'wrap', alignItems:'center' }}>
                    {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d => (
                      <div key={d} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:4 }}>
                        <span style={{ fontSize:10, color:D.textTer, fontWeight:700, letterSpacing:0.6 }}>{d.toUpperCase()}</span>
                        <span style={{ fontSize:12, fontFamily:D.mono, fontWeight:600, color:D.text, padding:'4px 10px', borderRadius:6, background:D.surface2, border:`1px solid ${D.hairline}` }}>08–23</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === 'notifications' && (
            <div>
              <div style={{ fontSize:16, fontWeight:700, color:D.text, marginBottom:4 }}>Notification preferences</div>
              <div style={{ fontSize:12, color:D.textSec, marginBottom:12 }}>How we should reach you about bookings.</div>
              <Toggle label="New booking · WhatsApp"  sub="Send WhatsApp message when a customer books"   defaultOn />
              <Toggle label="New booking · Email"     sub="Email confirmation to your business inbox"      defaultOn />
              <Toggle label="Cancellations · WhatsApp" sub="Notify me when a customer cancels"            defaultOn />
              <Toggle label="Daily summary email"     sub="Each morning at 8:00 with the day's bookings"              />
              <Toggle label="Weekly revenue report"   sub="Sundays at 18:00"                              defaultOn />
              <Toggle label="Marketing tips"          sub="Occasional tips to grow your bookings"                     />
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
