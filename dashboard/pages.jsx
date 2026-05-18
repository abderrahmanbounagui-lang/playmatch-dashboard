// PlayMatch Dashboard — Pages
// Uses globals from dashboard/core.jsx via window.DashboardCore

const { D, OWNER, PITCHES, BOOKINGS, Card, Btn, Badge, SectionHead, BarChart, LineChart, Sparkline } = window.DashboardCore;
const { useState: useS, useMemo: useM } = React;

// ─────────────────────────────────────────────────
//   OVERVIEW
// ─────────────────────────────────────────────────
const KPI = ({ label, value, delta, deltaPositive = true, spark, tone = 'green' }) => {
  const toneColor = tone === 'green' ? D.green : tone === 'amber' ? D.amber : tone === 'blue' ? D.blue : D.text;
  return (
    <Card style={{ padding: 20 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
        <span style={{ fontSize: 12, color: D.textSec, fontWeight: 500 }}>{label}</span>
        {spark && <Sparkline data={spark} color={toneColor} />}
      </div>
      <div style={{ fontFamily: D.font, fontSize: 30, fontWeight: 700, color: D.text, letterSpacing: -1, lineHeight: 1 }}>
        {value}
      </div>
      {delta != null && (
        <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 3,
            padding: '2px 8px', borderRadius: 6,
            background: deltaPositive ? D.greenSoft : D.redSoft,
            color: deltaPositive ? D.green : D.red,
            fontSize: 11, fontWeight: 700, fontFamily: D.mono,
          }}>
            <svg width="9" height="9" viewBox="0 0 12 12" fill="currentColor" style={{ transform: deltaPositive ? 'none' : 'rotate(180deg)' }}>
              <path d="M6 2l4 6H2z"/>
            </svg>
            {delta}
          </span>
          <span style={{ fontSize: 11, color: D.textTer }}>vs last week</span>
        </div>
      )}
    </Card>
  );
};

const OverviewPage = () => {
  const weekly = [
    { l: 'Mon', v: 18 }, { l: 'Tue', v: 22 }, { l: 'Wed', v: 26 },
    { l: 'Thu', v: 31 }, { l: 'Fri', v: 38, highlight: true }, { l: 'Sat', v: 42, highlight: true }, { l: 'Sun', v: 35 },
  ];
  const revenue = [
    { l: 'W1', v: 4200 }, { l: 'W2', v: 4800 }, { l: 'W3', v: 5400 },
    { l: 'W4', v: 5100 }, { l: 'W5', v: 6200 }, { l: 'W6', v: 7100 }, { l: 'W7', v: 8450 },
  ];
  const todays = BOOKINGS.filter(b => b.date === '2026-05-15' && b.status !== 'cancelled');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Welcome strip */}
      <div style={{
        padding: '20px 24px', borderRadius: 16,
        background: `linear-gradient(135deg, ${D.greenSoft}, transparent 70%), ${D.surface}`,
        border: `1px solid ${D.green}33`, position: 'relative', overflow: 'hidden',
        display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap',
      }}>
        <svg style={{ position: 'absolute', right: -40, top: -20, opacity: 0.06 }} width="280" height="180" viewBox="0 0 200 130">
          <rect x="2" y="2" width="196" height="126" fill="none" stroke={D.green} strokeWidth="1.4"/>
          <line x1="100" y1="2" x2="100" y2="128" stroke={D.green} strokeWidth="1.4"/>
          <circle cx="100" cy="65" r="22" stroke={D.green} fill="none" strokeWidth="1.4"/>
          <rect x="2" y="40" width="26" height="50" fill="none" stroke={D.green} strokeWidth="1.4"/>
          <rect x="172" y="40" width="26" height="50" fill="none" stroke={D.green} strokeWidth="1.4"/>
        </svg>
        <div style={{ flex: 1, minWidth: 240 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: D.green, animation: 'pulse 1.4s infinite' }} />
            <span style={{ fontSize: 11, fontWeight: 700, color: D.green, letterSpacing: 1.4 }}>LIVE</span>
          </div>
          <div style={{ fontSize: 22, fontWeight: 700, color: D.text, letterSpacing: -0.5, marginBottom: 4 }}>
            Salam, {OWNER.name.split(' ')[0]} — you have <span style={{ color: D.green }}>{todays.length} bookings today</span>.
          </div>
          <div style={{ fontSize: 13, color: D.textSec }}>
            Next match: <span style={{ color: D.text, fontWeight: 600 }}>{todays[0]?.start} · {todays[0]?.pitch}</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Btn kind="quiet" icon="cal">View calendar</Btn>
          <Btn icon="plus">New booking</Btn>
        </div>
      </div>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }} className="kpi-grid">
        <KPI label="Today's bookings" value="12" delta="+18%" spark={[5, 7, 6, 9, 8, 11, 12]} tone="green" />
        <KPI label="Total revenue" value="MAD 8,450" delta="+24%" spark={[3, 4, 5, 4, 6, 7, 9]} tone="green" />
        <KPI label="Occupancy rate" value="78%" delta="+6%" spark={[60, 64, 68, 72, 74, 76, 78]} tone="blue" />
        <KPI label="Upcoming matches" value="5" delta="-2" deltaPositive={false} spark={[8, 7, 7, 6, 6, 5, 5]} tone="amber" />
      </div>

      {/* Charts */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 16 }} className="charts-grid">
        <Card>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: D.text, letterSpacing: -0.2 }}>Weekly bookings</div>
              <div style={{ fontSize: 12, color: D.textSec, marginTop: 2 }}>May 9 — May 15, 2026</div>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              {['7d', '30d', '90d'].map((p, i) => (
                <button key={p} style={{
                  padding: '5px 10px', borderRadius: 7,
                  background: i === 0 ? D.surface2 : 'transparent',
                  border: `1px solid ${i === 0 ? D.hairlineStrong : 'transparent'}`,
                  color: i === 0 ? D.text : D.textSec,
                  fontSize: 11, fontWeight: 600, fontFamily: D.font, cursor: 'pointer',
                }}>{p}</button>
              ))}
            </div>
          </div>
          <BarChart data={weekly} color={D.green} height={200} />
        </Card>
        <Card>
          <div style={{ marginBottom: 18 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: D.text, letterSpacing: -0.2 }}>Revenue (7 weeks)</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginTop: 6 }}>
              <span style={{ fontSize: 24, fontWeight: 700, color: D.text, fontFamily: D.font, letterSpacing: -0.8 }}>MAD 41,250</span>
              <Badge tone="success" dot>+32% YoY</Badge>
            </div>
          </div>
          <LineChart data={revenue} color={D.green} height={200} />
        </Card>
      </div>

      {/* Today's schedule + Recent activity */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 16 }} className="charts-grid">
        <Card style={{ padding: 0 }}>
          <div style={{ padding: '18px 20px 14px', borderBottom: `1px solid ${D.hairline}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: D.text }}>Today's schedule</div>
              <div style={{ fontSize: 12, color: D.textSec, marginTop: 2 }}>{todays.length} matches confirmed</div>
            </div>
            <Btn kind="ghost" size="sm">View all</Btn>
          </div>
          <div>
            {todays.map((b, i) => (
              <div key={b.id} style={{
                padding: '14px 20px',
                borderBottom: i < todays.length - 1 ? `1px solid ${D.hairline}` : 'none',
                display: 'flex', alignItems: 'center', gap: 14,
              }}>
                <div style={{
                  width: 54, height: 54, borderRadius: 12,
                  background: D.surface2, border: `1px solid ${D.hairline}`,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{ fontFamily: D.mono, fontSize: 15, fontWeight: 700, color: D.text, letterSpacing: -0.4 }}>{b.start}</span>
                  <span style={{ fontSize: 9, color: D.textTer, fontWeight: 600, letterSpacing: 0.5 }}>{b.end}</span>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: D.text, letterSpacing: -0.2, marginBottom: 2 }}>{b.name}</div>
                  <div style={{ fontSize: 12, color: D.textSec, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Icon name="pin" size={11}/>{b.pitch}
                  </div>
                </div>
                <Badge tone={b.status === 'confirmed' ? 'success' : 'warning'} dot>{b.status}</Badge>
                <span style={{ fontFamily: D.mono, fontSize: 13, fontWeight: 700, color: D.text }}>{b.price} DH</span>
              </div>
            ))}
          </div>
        </Card>

        <Card style={{ padding: 0 }}>
          <div style={{ padding: '18px 20px 14px', borderBottom: `1px solid ${D.hairline}` }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: D.text }}>Recent activity</div>
            <div style={{ fontSize: 12, color: D.textSec, marginTop: 2 }}>Live updates</div>
          </div>
          <div style={{ padding: '8px 0' }}>
            {[
              { tone: 'success', icon: 'check', t: 'New booking confirmed', s: 'Atlas FC · Pitch 2 · 19:30', ago: '2m' },
              { tone: 'info',    icon: 'chat',  t: 'New message from Mehdi A.', s: 'Re: rescheduling tomorrow', ago: '12m' },
              { tone: 'warning', icon: 'flame', t: 'Pitch 1 has 3 hours unbooked', s: 'Tonight 19:00–22:00', ago: '34m' },
              { tone: 'danger',  icon: 'x',     t: 'Booking cancelled', s: 'Beach Ballers · Tomorrow 20:00', ago: '1h' },
              { tone: 'success', icon: 'plus',  t: 'New team registered', s: 'Hay Hassani United', ago: '2h' },
            ].map((a, i) => (
              <div key={i} style={{ padding: '10px 20px', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 8, flexShrink: 0,
                  background: a.tone === 'success' ? D.greenSoft : a.tone === 'warning' ? D.amberSoft : a.tone === 'danger' ? D.redSoft : D.blueSoft,
                  color: a.tone === 'success' ? D.green : a.tone === 'warning' ? D.amber : a.tone === 'danger' ? D.red : D.blue,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon name={a.icon} size={14} strokeWidth={2.4} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, color: D.text, fontWeight: 600, letterSpacing: -0.1 }}>{a.t}</div>
                  <div style={{ fontSize: 11, color: D.textSec, marginTop: 1 }}>{a.s}</div>
                </div>
                <span style={{ fontSize: 11, color: D.textTer, fontFamily: D.mono }}>{a.ago}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────
//   MY PITCHES
// ─────────────────────────────────────────────────
const PitchCard = ({ p }) => (
  <Card style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
    <div style={{
      height: 140, position: 'relative',
      background: `linear-gradient(135deg, ${D.surface2}, ${D.bg})`,
      borderBottom: `1px solid ${D.hairline}`, overflow: 'hidden',
    }}>
      <svg style={{ position: 'absolute', inset: 0 }} width="100%" height="100%" viewBox="0 0 360 140" preserveAspectRatio="xMidYMid slice">
        <rect x="20" y="14" width="320" height="112" fill="none" stroke={D.green} strokeWidth="1.5" opacity="0.4"/>
        <line x1="180" y1="14" x2="180" y2="126" stroke={D.green} strokeWidth="1.5" opacity="0.4"/>
        <circle cx="180" cy="70" r="22" fill="none" stroke={D.green} strokeWidth="1.5" opacity="0.4"/>
        <rect x="20" y="44" width="32" height="52" fill="none" stroke={D.green} strokeWidth="1.5" opacity="0.4"/>
        <rect x="308" y="44" width="32" height="52" fill="none" stroke={D.green} strokeWidth="1.5" opacity="0.4"/>
      </svg>
      <div style={{ position: 'absolute', top: 12, left: 12, display: 'flex', gap: 6 }}>
        <Badge tone={p.status === 'active' ? 'success' : 'warning'} dot>{p.status}</Badge>
        <Badge tone="info">{p.format}</Badge>
      </div>
      <div style={{
        position: 'absolute', bottom: 12, right: 12,
        padding: '6px 10px', borderRadius: 8,
        background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)',
        fontFamily: D.mono, fontSize: 12, fontWeight: 700, color: D.text,
      }}>{p.price} DH/h</div>
    </div>
    <div style={{ padding: 18, flex: 1, display: 'flex', flexDirection: 'column' }}>
      <div style={{ fontSize: 16, fontWeight: 700, color: D.text, letterSpacing: -0.3, marginBottom: 4 }}>{p.name}</div>
      <div style={{ fontSize: 12, color: D.textSec, display: 'flex', alignItems: 'center', gap: 6, marginBottom: 14 }}>
        <Icon name="pin" size={12}/>{p.loc}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 14 }}>
        <div style={{ padding: 10, borderRadius: 10, background: D.surface2 }}>
          <div style={{ fontSize: 10, color: D.textTer, fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase' }}>Bookings</div>
          <div style={{ fontSize: 16, fontWeight: 700, color: D.text, fontFamily: D.mono, marginTop: 2 }}>{p.bookings}</div>
        </div>
        <div style={{ padding: 10, borderRadius: 10, background: D.surface2 }}>
          <div style={{ fontSize: 10, color: D.textTer, fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase' }}>Occupancy</div>
          <div style={{ fontSize: 16, fontWeight: 700, color: p.occ > 70 ? D.green : D.text, fontFamily: D.mono, marginTop: 2 }}>{p.occ}%</div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 8, marginTop: 'auto' }}>
        <Btn kind="quiet" size="sm" style={{ flex: 1 }}>Manage</Btn>
        <Btn kind="ghost" size="sm" icon="cal">Calendar</Btn>
      </div>
    </div>
  </Card>
);

const PitchesPage = () => (
  <div>
    <SectionHead
      title="My Pitches"
      sub={`${PITCHES.filter(p => p.status === 'active').length} active · ${PITCHES.length} total`}
      right={<div style={{ display: 'flex', gap: 8 }}>
        <Btn kind="ghost" icon="filter">Filter</Btn>
        <Btn icon="plus">Add pitch</Btn>
      </div>}
    />
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
      {PITCHES.map(p => <PitchCard key={p.id} p={p} />)}
      <div style={{
        border: `1.5px dashed ${D.hairlineStrong}`, borderRadius: 16,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: 40, gap: 12, cursor: 'pointer', minHeight: 280, color: D.textSec,
      }}>
        <div style={{
          width: 52, height: 52, borderRadius: 14, background: D.greenSoft,
          color: D.green, display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon name="plus" size={24} strokeWidth={2.4} />
        </div>
        <div style={{ fontSize: 14, fontWeight: 700, color: D.text, letterSpacing: -0.2 }}>Add a new pitch</div>
        <div style={{ fontSize: 12, color: D.textSec, textAlign: 'center', maxWidth: 200 }}>List a new pitch to start receiving bookings.</div>
      </div>
    </div>
  </div>
);

// ─────────────────────────────────────────────────
//   BOOKINGS
// ─────────────────────────────────────────────────
const BookingsPage = () => {
  const [filter, setFilter] = useS('all');
  const [search, setSearch] = useS('');
  const filtered = BOOKINGS.filter(b => {
    if (filter !== 'all' && b.status !== filter) return false;
    if (search && !b.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const tabs = [
    { id: 'all',       label: 'All',       count: BOOKINGS.length },
    { id: 'confirmed', label: 'Confirmed', count: BOOKINGS.filter(b => b.status === 'confirmed').length },
    { id: 'pending',   label: 'Pending',   count: BOOKINGS.filter(b => b.status === 'pending').length },
    { id: 'cancelled', label: 'Cancelled', count: BOOKINGS.filter(b => b.status === 'cancelled').length },
  ];

  return (
    <div>
      <SectionHead
        title="Bookings"
        sub="All bookings across your pitches"
        right={<div style={{ display: 'flex', gap: 8 }}>
          <Btn kind="ghost" icon="cal">May 15, 2026</Btn>
          <Btn kind="ghost" icon="send">Export</Btn>
          <Btn icon="plus">New booking</Btn>
        </div>}
      />

      {/* Tabs */}
      <div style={{
        display: 'flex', gap: 4, padding: 4, marginBottom: 16,
        background: D.surface, borderRadius: 12, border: `1px solid ${D.hairline}`,
        width: 'fit-content',
      }}>
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setFilter(tab.id)} style={{
            padding: '8px 14px', borderRadius: 8,
            background: filter === tab.id ? D.surface2 : 'transparent',
            border: `1px solid ${filter === tab.id ? D.hairlineStrong : 'transparent'}`,
            color: filter === tab.id ? D.text : D.textSec,
            fontFamily: D.font, fontSize: 12.5, fontWeight: 600, cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            {tab.label}
            <span style={{
              padding: '1px 7px', borderRadius: 999,
              background: filter === tab.id ? D.greenSoft : 'rgba(255,255,255,0.06)',
              color: filter === tab.id ? D.green : D.textTer,
              fontSize: 10, fontWeight: 700, fontFamily: D.mono,
            }}>{tab.count}</span>
          </button>
        ))}
      </div>

      <Card style={{ padding: 0, overflow: 'hidden' }}>
        {/* Toolbar */}
        <div style={{
          padding: '12px 16px', borderBottom: `1px solid ${D.hairline}`,
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <div style={{
            height: 34, padding: '0 12px', borderRadius: 9, flex: 1, maxWidth: 320,
            background: D.surface2, border: `1px solid ${D.hairline}`,
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <Icon name="search" size={14} color={D.textSec} />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search customer..."
              style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: D.text, fontSize: 12.5, fontFamily: D.font }} />
          </div>
          <span style={{ flex: 1 }}/>
          <span style={{ fontSize: 12, color: D.textTer, fontFamily: D.mono }}>{filtered.length} results</span>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: D.font }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${D.hairline}`, background: 'rgba(0,0,0,0.2)' }}>
                {['Customer', 'Phone', 'Date', 'Time', 'Pitch', 'Status', 'Price', ''].map(h => (
                  <th key={h} style={{
                    padding: '11px 16px', textAlign: h === 'Price' ? 'right' : 'left',
                    fontSize: 11, fontWeight: 700, color: D.textTer, letterSpacing: 0.8, textTransform: 'uppercase',
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((b, i) => (
                <tr key={b.id} style={{ borderBottom: i < filtered.length - 1 ? `1px solid ${D.hairline}` : 'none', transition: 'background .15s' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{
                        width: 32, height: 32, borderRadius: 8,
                        background: D.surface2, border: `1px solid ${D.hairline}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 11, fontWeight: 700, color: D.text, fontFamily: D.mono,
                      }}>{b.name.split(' ').map(w => w[0]).slice(0, 2).join('')}</div>
                      <span style={{ fontSize: 13, fontWeight: 600, color: D.text, letterSpacing: -0.1 }}>{b.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: '14px 16px', fontSize: 12.5, color: D.textSec, fontFamily: D.mono }}>{b.phone}</td>
                  <td style={{ padding: '14px 16px', fontSize: 12.5, color: D.text, fontFamily: D.mono }}>{b.date}</td>
                  <td style={{ padding: '14px 16px', fontSize: 12.5, color: D.text, fontFamily: D.mono, fontWeight: 600 }}>{b.start} → {b.end}</td>
                  <td style={{ padding: '14px 16px', fontSize: 12.5, color: D.text }}>{b.pitch}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <Badge tone={b.status === 'confirmed' ? 'success' : b.status === 'pending' ? 'warning' : 'danger'} dot>{b.status}</Badge>
                  </td>
                  <td style={{ padding: '14px 16px', fontSize: 13, color: D.text, fontFamily: D.mono, fontWeight: 700, textAlign: 'right' }}>{b.price} DH</td>
                  <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: 4 }}>
                      <button style={iconBtn}><Icon name="arr" size={14}/></button>
                      <button style={iconBtn}><Icon name="x" size={14}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div style={{
          padding: '12px 16px', borderTop: `1px solid ${D.hairline}`,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <span style={{ fontSize: 12, color: D.textTer }}>Showing 1–{filtered.length} of {filtered.length}</span>
          <div style={{ display: 'flex', gap: 6 }}>
            <Btn kind="ghost" size="sm" disabled>Previous</Btn>
            <Btn kind="ghost" size="sm">Next</Btn>
          </div>
        </div>
      </Card>
    </div>
  );
};
const iconBtn = {
  width: 28, height: 28, borderRadius: 7,
  background: D.surface2, border: `1px solid ${D.hairline}`,
  color: D.textSec, cursor: 'pointer',
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
};

// ─────────────────────────────────────────────────
//   CALENDAR
// ─────────────────────────────────────────────────
const CalendarPage = () => {
  const [pitch, setPitch] = useS(PITCHES[0].id);
  const [selectedDay, setSelectedDay] = useS(15);

  // Build month grid for May 2026 (starts on a Friday in 2026)
  const monthDays = Array.from({ length: 35 }, (_, i) => {
    const day = i - 3; // May 1 = day 1, offset so it appears on Friday (col 4)
    return day >= 1 && day <= 31 ? day : null;
  });

  // Generate mock bookings per day (just for demo intensity)
  const dayLoad = (day) => {
    if (!day) return 0;
    const seed = (day * 7 + pitch.length * 3) % 11;
    return Math.min(seed, 8);
  };

  // Time slots 8-23
  const slots = Array.from({ length: 16 }, (_, i) => 8 + i);
  // Mock day bookings for selected day
  const dayBookings = BOOKINGS
    .filter(b => b.pitch.startsWith(PITCHES.find(p => p.id === pitch)?.name.split(' ·')[0]))
    .filter(b => parseInt(b.date.split('-')[2]) === selectedDay);

  return (
    <div>
      <SectionHead
        title="Calendar"
        sub="Booking schedule per pitch"
        right={<div style={{ display: 'flex', gap: 8 }}>
          <select value={pitch} onChange={e => setPitch(e.target.value)} style={{
            height: 38, padding: '0 14px', borderRadius: 10,
            background: D.surface, border: `1px solid ${D.hairlineStrong}`,
            color: D.text, fontFamily: D.font, fontSize: 13, fontWeight: 600,
          }}>
            {PITCHES.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
          <Btn kind="ghost" icon="plus">Block time</Btn>
        </div>}
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 16 }} className="cal-grid">
        {/* Month grid */}
        <Card>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 18, fontWeight: 700, color: D.text, letterSpacing: -0.4 }}>May 2026</div>
              <div style={{ fontSize: 12, color: D.textSec, marginTop: 2 }}>{PITCHES.find(p => p.id === pitch)?.name}</div>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              <button style={navBtn}><Icon name="chev" size={14} style={{ transform: 'rotate(180deg)' }}/></button>
              <button style={navBtn}><Icon name="chev" size={14}/></button>
              <Btn kind="quiet" size="sm">Today</Btn>
            </div>
          </div>

          {/* Weekday headers */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 6, marginBottom: 8 }}>
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
              <div key={d} style={{
                textAlign: 'center', fontSize: 10, fontWeight: 700,
                color: D.textTer, letterSpacing: 1, textTransform: 'uppercase', padding: '6px 0',
              }}>{d}</div>
            ))}
          </div>

          {/* Days */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 6 }}>
            {monthDays.map((day, i) => {
              const load = dayLoad(day);
              const isSelected = day === selectedDay;
              const isToday = day === 15;
              const intensity = load / 8;
              return (
                <button key={i} disabled={!day} onClick={() => day && setSelectedDay(day)}
                  style={{
                    aspectRatio: '1', borderRadius: 10,
                    background: !day ? 'transparent' : isSelected ? D.green : `oklch(0.32 0.08 142 / ${intensity * 0.6 + 0.05})`,
                    border: isSelected ? 'none' : isToday ? `1.5px solid ${D.green}` : `1px solid ${day ? D.hairline : 'transparent'}`,
                    color: isSelected ? D.greenInk : day ? D.text : 'transparent',
                    cursor: day ? 'pointer' : 'default',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2,
                    padding: 6, fontFamily: D.font, position: 'relative',
                  }}>
                  <span style={{ fontSize: 15, fontWeight: 700, fontFamily: D.mono, letterSpacing: -0.3 }}>{day}</span>
                  {day && load > 0 && (
                    <span style={{
                      fontSize: 9, fontWeight: 700,
                      color: isSelected ? D.greenInk : D.textSec,
                      fontFamily: D.mono,
                    }}>{load}</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div style={{ marginTop: 18, paddingTop: 14, borderTop: `1px solid ${D.hairline}`, display: 'flex', alignItems: 'center', gap: 14, fontSize: 11, color: D.textSec, fontWeight: 500 }}>
            <span>Bookings load:</span>
            {[0.1, 0.3, 0.6, 0.9].map((op, i) => (
              <div key={i} style={{
                width: 18, height: 18, borderRadius: 5,
                background: `oklch(0.32 0.08 142 / ${op})`,
                border: `1px solid ${D.hairline}`,
              }}/>
            ))}
            <span style={{ marginLeft: 'auto', fontFamily: D.mono, fontSize: 11, color: D.textTer }}>● TODAY · ▮ SELECTED</span>
          </div>
        </Card>

        {/* Day schedule */}
        <Card style={{ padding: 0 }}>
          <div style={{ padding: '18px 20px 14px', borderBottom: `1px solid ${D.hairline}` }}>
            <div style={{ fontSize: 11, color: D.textTer, fontWeight: 700, letterSpacing: 1.2, marginBottom: 4 }}>SELECTED DAY</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: D.text, letterSpacing: -0.5 }}>May {selectedDay}, 2026</div>
            <div style={{ fontSize: 12, color: D.textSec, marginTop: 4 }}>
              {dayBookings.length} bookings · {16 - dayBookings.length} open slots
            </div>
          </div>
          <div style={{ maxHeight: 480, overflowY: 'auto' }}>
            {slots.map((h, i) => {
              const booking = dayBookings.find(b => parseInt(b.start) === h);
              return (
                <div key={h} style={{
                  display: 'flex', alignItems: 'stretch',
                  borderBottom: i < slots.length - 1 ? `1px solid ${D.hairline}` : 'none',
                  minHeight: 52,
                }}>
                  <div style={{
                    width: 56, padding: '12px 0', textAlign: 'center',
                    fontFamily: D.mono, fontSize: 12, fontWeight: 700, color: D.textTer,
                    borderRight: `1px solid ${D.hairline}`, flexShrink: 0,
                  }}>{String(h).padStart(2, '0')}:00</div>
                  <div style={{ flex: 1, padding: 8 }}>
                    {booking ? (
                      <div style={{
                        height: '100%', padding: '8px 12px', borderRadius: 8,
                        background: booking.status === 'confirmed' ? D.greenSoft : D.amberSoft,
                        border: `1px solid ${booking.status === 'confirmed' ? D.green : D.amber}55`,
                        display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 2,
                      }}>
                        <div style={{ fontSize: 12.5, fontWeight: 700, color: D.text, letterSpacing: -0.1 }}>{booking.name}</div>
                        <div style={{ fontSize: 10.5, color: D.textSec, fontFamily: D.mono }}>
                          {booking.start}–{booking.end} · {booking.price} DH
                        </div>
                      </div>
                    ) : (
                      <button style={{
                        width: '100%', height: '100%',
                        background: 'transparent', border: `1px dashed ${D.hairline}`,
                        borderRadius: 8, color: D.textTer, cursor: 'pointer',
                        fontFamily: D.font, fontSize: 11, fontWeight: 500,
                      }}>+ Available</button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
};
const navBtn = {
  width: 32, height: 32, borderRadius: 8,
  background: D.surface, border: `1px solid ${D.hairline}`,
  color: D.text, cursor: 'pointer',
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
};

// ─────────────────────────────────────────────────
//   REVENUE
// ─────────────────────────────────────────────────
const RevenuePage = () => {
  const [range, setRange] = useS('week');
  const monthly = [
    { l: 'Jan', v: 22400 }, { l: 'Feb', v: 24800 }, { l: 'Mar', v: 28600 },
    { l: 'Apr', v: 32100 }, { l: 'May', v: 41250, highlight: true },
  ];
  const byPitch = [
    { name: 'Anfa Pitch 1', rev: 14580, share: 35, change: '+18%' },
    { name: 'Anfa Pitch 2', rev: 12400, share: 30, change: '+22%' },
    { name: 'Maarif 5-a-side', rev: 9870, share: 24, change: '+9%' },
    { name: 'Sidi Maarouf Arena', rev: 4400, share: 11, change: '−' },
  ];

  return (
    <div>
      <SectionHead
        title="Revenue"
        sub="Income across all pitches"
        right={<div style={{ display: 'flex', gap: 4, padding: 4, background: D.surface, borderRadius: 10, border: `1px solid ${D.hairline}` }}>
          {['day', 'week', 'month', 'year'].map(r => (
            <button key={r} onClick={() => setRange(r)} style={{
              padding: '7px 14px', borderRadius: 7,
              background: range === r ? D.surface2 : 'transparent',
              border: `1px solid ${range === r ? D.hairlineStrong : 'transparent'}`,
              color: range === r ? D.text : D.textSec,
              fontFamily: D.font, fontSize: 12, fontWeight: 600, cursor: 'pointer',
              textTransform: 'capitalize',
            }}>{r}</button>
          ))}
        </div>}
      />

      {/* Hero stat */}
      <Card style={{ marginBottom: 16, padding: 28, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: -100, top: -50, width: 320, height: 320, borderRadius: '50%', background: `radial-gradient(circle, ${D.greenSoft}, transparent 70%)` }}/>
        <div style={{ position: 'relative' }}>
          <div style={{ fontSize: 12, color: D.textSec, fontWeight: 500, marginBottom: 12 }}>Total revenue · this month</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 10 }}>
            <span style={{ fontFamily: D.font, fontSize: 48, fontWeight: 700, color: D.text, letterSpacing: -2 }}>MAD 41,250</span>
            <Badge tone="success" dot>+28.5% vs Apr</Badge>
          </div>
          <div style={{ fontSize: 13, color: D.textSec }}>
            <span style={{ fontFamily: D.mono, fontWeight: 700, color: D.text }}>366</span> bookings · avg <span style={{ fontFamily: D.mono, fontWeight: 700, color: D.text }}>MAD 112</span> per booking
          </div>
        </div>
      </Card>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 16 }} className="rev-grid">
        <Card>
          <div style={{ marginBottom: 18 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: D.text, letterSpacing: -0.2 }}>Monthly revenue</div>
            <div style={{ fontSize: 12, color: D.textSec, marginTop: 2 }}>Trailing 5 months · MAD</div>
          </div>
          <LineChart data={monthly} color={D.green} height={260} />
        </Card>

        <Card style={{ padding: 0 }}>
          <div style={{ padding: '18px 20px 14px', borderBottom: `1px solid ${D.hairline}` }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: D.text }}>Revenue by pitch</div>
            <div style={{ fontSize: 12, color: D.textSec, marginTop: 2 }}>This month</div>
          </div>
          <div style={{ padding: '8px 0' }}>
            {byPitch.map((p, i) => (
              <div key={i} style={{ padding: '12px 20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: D.text, letterSpacing: -0.1 }}>{p.name}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: D.text, fontFamily: D.mono }}>MAD {p.rev.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ flex: 1, height: 6, background: D.surface2, borderRadius: 3, overflow: 'hidden' }}>
                    <div style={{ width: `${p.share}%`, height: '100%', background: D.green, borderRadius: 3 }}/>
                  </div>
                  <span style={{ fontSize: 11, color: D.textTer, fontFamily: D.mono, fontWeight: 600, width: 36, textAlign: 'right' }}>{p.share}%</span>
                  <span style={{ fontSize: 11, color: p.change.startsWith('+') ? D.green : D.textTer, fontFamily: D.mono, fontWeight: 700, width: 38, textAlign: 'right' }}>{p.change}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginTop: 16 }} className="rev-bottom">
        <KPI label="Avg. booking" value="MAD 112" delta="+8%" tone="green" />
        <KPI label="Peak hour" value="19:00–21:00" tone="amber" />
        <KPI label="Top day" value="Saturday" tone="blue" />
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────
//   SETTINGS
// ─────────────────────────────────────────────────
const Field = ({ label, value, hint, type = 'text' }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
    <label style={{ fontSize: 12, fontWeight: 600, color: D.text, letterSpacing: -0.1 }}>{label}</label>
    <input type={type} defaultValue={value} style={{
      height: 40, padding: '0 14px', borderRadius: 10,
      background: D.surface2, border: `1px solid ${D.hairline}`,
      color: D.text, fontFamily: D.font, fontSize: 13.5,
    }} />
    {hint && <span style={{ fontSize: 11, color: D.textTer }}>{hint}</span>}
  </div>
);

const Toggle = ({ label, sub, value, defaultOn }) => {
  const [on, setOn] = useS(defaultOn);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 0', borderBottom: `1px solid ${D.hairline}` }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13.5, fontWeight: 600, color: D.text, letterSpacing: -0.1 }}>{label}</div>
        {sub && <div style={{ fontSize: 12, color: D.textSec, marginTop: 2 }}>{sub}</div>}
      </div>
      <button onClick={() => setOn(!on)} style={{
        width: 42, height: 24, borderRadius: 14, position: 'relative',
        background: on ? D.green : D.surface2,
        border: `1px solid ${on ? D.green : D.hairlineStrong}`,
        cursor: 'pointer', transition: 'background .2s',
      }}>
        <span style={{
          position: 'absolute', top: 2, left: on ? 20 : 2,
          width: 18, height: 18, borderRadius: '50%',
          background: on ? D.greenInk : D.text,
          transition: 'left .2s',
        }}/>
      </button>
    </div>
  );
};

const SettingsPage = () => {
  const [tab, setTab] = useS('profile');
  const tabs = [
    { id: 'profile', label: 'Profile', icon: 'user' },
    { id: 'business', label: 'Business info', icon: 'shield' },
    { id: 'hours', label: 'Working hours', icon: 'clock' },
    { id: 'notifications', label: 'Notifications', icon: 'bolt' },
  ];

  return (
    <div>
      <SectionHead
        title="Settings"
        sub="Manage your account, business, and preferences"
      />

      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 24 }} className="settings-grid">
        {/* Side nav */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              padding: '10px 12px', borderRadius: 9, textAlign: 'left',
              background: tab === t.id ? D.surface : 'transparent',
              border: `1px solid ${tab === t.id ? D.hairline : 'transparent'}`,
              color: tab === t.id ? D.text : D.textSec,
              fontFamily: D.font, fontSize: 13, fontWeight: tab === t.id ? 600 : 500,
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <Icon name={t.icon} size={15} strokeWidth={tab === t.id ? 2.4 : 2} />
              {t.label}
            </button>
          ))}
        </nav>

        {/* Panel */}
        <Card style={{ padding: 28 }}>
          {tab === 'profile' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28, paddingBottom: 20, borderBottom: `1px solid ${D.hairline}` }}>
                <div style={{
                  width: 64, height: 64, borderRadius: 16,
                  background: `linear-gradient(135deg, ${D.green}, ${D.greenDim})`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: D.greenInk, fontWeight: 800, fontSize: 22, fontFamily: D.mono,
                }}>{OWNER.initials}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 18, fontWeight: 700, color: D.text, letterSpacing: -0.4 }}>{OWNER.name}</div>
                  <div style={{ fontSize: 13, color: D.textSec, marginTop: 2 }}>Owner since 2024 · {OWNER.city}</div>
                </div>
                <Btn kind="ghost" size="sm">Change photo</Btn>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
                <Field label="Full name" value={OWNER.name} />
                <Field label="Email" value={OWNER.email} type="email" />
                <Field label="Phone" value={OWNER.phone} />
                <Field label="City" value={OWNER.city} />
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <Btn>Save changes</Btn>
                <Btn kind="ghost">Cancel</Btn>
              </div>
            </div>
          )}

          {tab === 'business' && (
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, color: D.text, marginBottom: 18, letterSpacing: -0.3 }}>Business information</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
                <Field label="Business name" value={OWNER.business} />
                <Field label="Tax ID (ICE)" value="002145678901234" />
                <Field label="Business email" value="contact@anfasports.ma" type="email" />
                <Field label="Business phone" value="+212 522 12 34 56" />
              </div>
              <Field label="Address" value="Bd. de la Corniche, Anfa, Casablanca" hint="Used for invoices and customer-facing receipts." />
              <div style={{ display: 'flex', gap: 8, marginTop: 20 }}>
                <Btn>Save changes</Btn>
                <Btn kind="ghost">Cancel</Btn>
              </div>
            </div>
          )}

          {tab === 'hours' && (
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, color: D.text, marginBottom: 4, letterSpacing: -0.3 }}>Working hours per pitch</div>
              <div style={{ fontSize: 12, color: D.textSec, marginBottom: 24 }}>Set when each pitch is available for booking.</div>
              {PITCHES.filter(p => p.status === 'active').map(p => (
                <div key={p.id} style={{ padding: '16px 0', borderBottom: `1px solid ${D.hairline}` }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: D.text }}>{p.name}</div>
                      <div style={{ fontSize: 11, color: D.textTer, marginTop: 2 }}>{p.format} · {p.surface}</div>
                    </div>
                    <Btn kind="ghost" size="sm">Edit per-day</Btn>
                  </div>
                  <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center' }}>
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
                      <div key={d} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                        <span style={{ fontSize: 10, color: D.textTer, fontWeight: 700, letterSpacing: 0.6 }}>{d.toUpperCase()}</span>
                        <span style={{ fontSize: 12, fontFamily: D.mono, fontWeight: 600, color: D.text, padding: '4px 10px', borderRadius: 6, background: D.surface2, border: `1px solid ${D.hairline}` }}>08–23</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === 'notifications' && (
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, color: D.text, marginBottom: 4, letterSpacing: -0.3 }}>Notification preferences</div>
              <div style={{ fontSize: 12, color: D.textSec, marginBottom: 12 }}>How we should reach you about bookings.</div>
              <Toggle label="New booking · WhatsApp" sub="Send WhatsApp message when a customer books" defaultOn={true} />
              <Toggle label="New booking · Email" sub="Email confirmation to your business inbox" defaultOn={true} />
              <Toggle label="Cancellations · WhatsApp" sub="Notify me when a customer cancels" defaultOn={true} />
              <Toggle label="Daily summary email" sub="Each morning at 8:00 with the day's bookings" defaultOn={false} />
              <Toggle label="Weekly revenue report" sub="Sundays at 18:00" defaultOn={true} />
              <Toggle label="Marketing tips" sub="Occasional tips to grow your bookings" defaultOn={false} />
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

window.DashboardPages = {
  OverviewPage, PitchesPage, BookingsPage, CalendarPage, RevenuePage, SettingsPage,
};
