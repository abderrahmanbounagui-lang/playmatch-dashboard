// PlayMatch Owner Dashboard
// Single-file React-in-Babel prototype. Reuses tokens/icons from screens/tokens.jsx.
// Uses globals: T, Icon

const { useState, useMemo, useEffect } = React;

// ─────────────── Dashboard-specific tokens ───────────────
const D = {
  bg: '#0A0E0C',
  panel: '#111613',
  surface: '#161D1A',
  surface2: '#1C2521',
  hairline: 'rgba(255,255,255,0.07)',
  hairlineStrong: 'rgba(255,255,255,0.14)',
  text: '#E8EDEB',
  textSec: 'rgba(232,237,235,0.62)',
  textTer: 'rgba(232,237,235,0.38)',
  green: 'oklch(0.78 0.18 142)',
  greenDim: 'oklch(0.62 0.14 142)',
  greenSoft: 'oklch(0.32 0.08 142 / 0.35)',
  greenInk: '#0A0E0C',
  amber: 'oklch(0.82 0.16 75)',
  amberSoft: 'oklch(0.32 0.08 75 / 0.3)',
  red: 'oklch(0.68 0.20 25)',
  redSoft: 'oklch(0.32 0.10 25 / 0.3)',
  blue: 'oklch(0.74 0.13 240)',
  blueSoft: 'oklch(0.32 0.08 240 / 0.3)',
  font: '"Inter Tight", -apple-system, system-ui, sans-serif',
  mono: '"JetBrains Mono", ui-monospace, monospace',
};

// ─────────────── Mock data ───────────────
const OWNER = {
  name: 'Reda Bensaid',
  business: 'Anfa Sports Group',
  initials: 'RB',
  email: 'reda@anfasports.ma',
  phone: '+212 661 23 45 67',
  city: 'Casablanca',
};

const PITCHES = [
  { id: 'p1', name: 'Anfa Stadium · Pitch 1', loc: 'Bd. de la Corniche, Anfa', price: 60, format: '5v5', surface: 'Synthetic', status: 'active', bookings: 142, occ: 84 },
  { id: 'p2', name: 'Anfa Stadium · Pitch 2', loc: 'Bd. de la Corniche, Anfa', price: 60, format: '5v5', surface: 'Synthetic', status: 'active', bookings: 128, occ: 78 },
  { id: 'p3', name: 'Maarif 5-a-side', loc: 'Rue Ibn Battouta, Maarif', price: 50, format: '5v5', surface: 'Indoor', status: 'active', bookings: 96, occ: 62 },
  { id: 'p4', name: 'Sidi Maarouf Arena', loc: 'Route d\'El Jadida, Sidi Maarouf', price: 55, format: '5v5', surface: 'Synthetic', status: 'maintenance', bookings: 0, occ: 0 },
];

const BOOKINGS = [
  { id: 'b1', name: 'Youssef El Amrani', phone: '+212 661 12 34 56', date: '2026-05-15', start: '18:00', end: '19:00', pitch: 'Anfa Stadium · Pitch 1', status: 'confirmed', price: 60 },
  { id: 'b2', name: 'Team Atlas FC',     phone: '+212 662 23 45 67', date: '2026-05-15', start: '19:30', end: '20:30', pitch: 'Anfa Stadium · Pitch 2', status: 'confirmed', price: 60 },
  { id: 'b3', name: 'Mehdi Alaoui',       phone: '+212 663 34 56 78', date: '2026-05-15', start: '20:00', end: '21:00', pitch: 'Maarif 5-a-side',      status: 'pending',   price: 50 },
  { id: 'b4', name: 'Hay Mohammadi FC',   phone: '+212 664 45 67 89', date: '2026-05-15', start: '21:00', end: '22:00', pitch: 'Anfa Stadium · Pitch 1', status: 'confirmed', price: 60 },
  { id: 'b5', name: 'Omar Tazi',          phone: '+212 665 56 78 90', date: '2026-05-15', start: '22:00', end: '23:00', pitch: 'Maarif 5-a-side',      status: 'confirmed', price: 50 },
  { id: 'b6', name: 'Anas Karim',         phone: '+212 666 67 89 01', date: '2026-05-16', start: '18:30', end: '19:30', pitch: 'Anfa Stadium · Pitch 2', status: 'confirmed', price: 60 },
  { id: 'b7', name: 'Beach Ballers',      phone: '+212 667 78 90 12', date: '2026-05-16', start: '20:00', end: '21:00', pitch: 'Anfa Stadium · Pitch 1', status: 'cancelled', price: 60 },
  { id: 'b8', name: 'Karim Belhaj',       phone: '+212 668 89 01 23', date: '2026-05-16', start: '21:00', end: '22:00', pitch: 'Maarif 5-a-side',      status: 'confirmed', price: 50 },
];

// ─────────────── Primitives ───────────────
const Card = ({ children, style, className, ...rest }) => (
  <div className={className} style={{
    background: D.surface, border: `1px solid ${D.hairline}`,
    borderRadius: 16, padding: 20, ...style,
  }} {...rest}>{children}</div>
);

const Btn = ({ children, kind = 'primary', icon, size = 'md', style, ...rest }) => {
  const sizes = {
    sm: { height: 32, padding: '0 12px', fontSize: 12, gap: 6 },
    md: { height: 38, padding: '0 16px', fontSize: 13, gap: 8 },
    lg: { height: 44, padding: '0 22px', fontSize: 14, gap: 8 },
  };
  const kinds = {
    primary: { background: D.green, color: D.greenInk, border: 'none' },
    ghost:   { background: 'transparent', color: D.text, border: `1px solid ${D.hairlineStrong}` },
    quiet:   { background: D.surface2, color: D.text, border: `1px solid ${D.hairline}` },
    danger:  { background: D.redSoft, color: D.red, border: `1px solid ${D.red}33` },
  };
  return (
    <button style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      borderRadius: 10, fontWeight: 600, letterSpacing: -0.1,
      fontFamily: D.font, cursor: 'pointer', whiteSpace: 'nowrap',
      ...sizes[size], ...kinds[kind], ...style,
    }} {...rest}>
      {icon && <Icon name={icon} size={size === 'sm' ? 13 : 15} strokeWidth={2.2} />}
      {children}
    </button>
  );
};

const Badge = ({ children, tone = 'neutral', dot, style }) => {
  const tones = {
    success: { bg: D.greenSoft, color: D.green, ring: `${D.green}44` },
    warning: { bg: D.amberSoft, color: D.amber, ring: `${D.amber}44` },
    danger:  { bg: D.redSoft, color: D.red, ring: `${D.red}44` },
    info:    { bg: D.blueSoft, color: D.blue, ring: `${D.blue}44` },
    neutral: { bg: 'rgba(255,255,255,0.06)', color: D.textSec, ring: D.hairline },
  };
  const t = tones[tone];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '3px 9px', borderRadius: 999,
      background: t.bg, color: t.color,
      border: `1px solid ${t.ring}`,
      fontSize: 11, fontWeight: 700, letterSpacing: 0.2,
      fontFamily: D.font, ...style,
    }}>
      {dot && <span style={{ width: 6, height: 6, borderRadius: '50%', background: t.color }} />}
      {children}
    </span>
  );
};

const SectionHead = ({ title, sub, right }) => (
  <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16, marginBottom: 20, flexWrap: 'wrap' }}>
    <div style={{ flex: 1, minWidth: 0 }}>
      <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: D.text, letterSpacing: -0.6 }}>{title}</h2>
      {sub && <div style={{ marginTop: 4, fontSize: 13, color: D.textSec }}>{sub}</div>}
    </div>
    {right}
  </div>
);

// ─────────────── Charts ───────────────
const BarChart = ({ data, color = D.green, height = 200 }) => {
  const max = Math.max(...data.map(d => d.v), 1);
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height, padding: '4px 0' }}>
        {data.map((d, i) => (
          <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <div style={{ flex: 1, width: '100%', display: 'flex', alignItems: 'flex-end' }}>
              <div style={{
                width: '100%', height: `${(d.v / max) * 100}%`,
                background: d.highlight ? color : `${color}55`,
                borderRadius: 6,
                minHeight: 6,
                transition: 'all .3s',
              }} />
            </div>
            <span style={{ fontSize: 11, color: D.textTer, fontFamily: D.mono, fontWeight: 600 }}>{d.l}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const LineChart = ({ data, color = D.green, height = 200, fill = true }) => {
  const max = Math.max(...data.map(d => d.v), 1);
  const min = Math.min(...data.map(d => d.v), 0);
  const range = max - min || 1;
  const w = 600;
  const h = height;
  const pad = { l: 0, r: 0, t: 14, b: 24 };
  const xStep = (w - pad.l - pad.r) / (data.length - 1);
  const yFor = (v) => pad.t + (h - pad.t - pad.b) * (1 - (v - min) / range);
  const pts = data.map((d, i) => `${pad.l + i * xStep},${yFor(d.v)}`).join(' ');
  const area = `M ${pad.l},${h - pad.b} L ${pts.split(' ').join(' L ')} L ${pad.l + (data.length - 1) * xStep},${h - pad.b} Z`;

  const gradId = useMemo(() => `lg-${Math.random().toString(36).slice(2, 8)}`, []);

  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" height={h} preserveAspectRatio="none" style={{ display: 'block' }}>
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.35"/>
          <stop offset="100%" stopColor={color} stopOpacity="0"/>
        </linearGradient>
      </defs>
      {/* gridlines */}
      {[0.25, 0.5, 0.75].map((p, i) => (
        <line key={i} x1="0" x2={w} y1={pad.t + (h - pad.t - pad.b) * p} y2={pad.t + (h - pad.t - pad.b) * p}
          stroke={D.hairline} strokeWidth="1" strokeDasharray="3 4" />
      ))}
      {fill && <path d={area} fill={`url(#${gradId})`} />}
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      {data.map((d, i) => (
        <g key={i}>
          <circle cx={pad.l + i * xStep} cy={yFor(d.v)} r="3" fill={D.bg} stroke={color} strokeWidth="2" />
        </g>
      ))}
      {/* x labels */}
      {data.map((d, i) => (
        <text key={i} x={pad.l + i * xStep} y={h - 6}
          fill={D.textTer} fontSize="11" fontFamily={D.mono} fontWeight="600" textAnchor="middle">{d.l}</text>
      ))}
    </svg>
  );
};

const Sparkline = ({ data, color = D.green, width = 80, height = 28 }) => {
  const max = Math.max(...data, 1);
  const min = Math.min(...data, 0);
  const range = max - min || 1;
  const xStep = width / (data.length - 1);
  const pts = data.map((v, i) => `${i * xStep},${height - (height - 2) * (v - min) / range - 1}`).join(' ');
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

// ─────────────── Sidebar ───────────────
const NAV = [
  { id: 'overview', label: 'Overview', icon: 'home' },
  { id: 'pitches',  label: 'My Pitches', icon: 'shield' },
  { id: 'bookings', label: 'Bookings', icon: 'cal' },
  { id: 'calendar', label: 'Calendar', icon: 'clock' },
  { id: 'revenue',  label: 'Revenue', icon: 'bolt' },
  { id: 'settings', label: 'Settings', icon: 'user' },
];

const Sidebar = ({ active, onNav, collapsed, setCollapsed }) => {
  const w = collapsed ? 72 : 248;
  return (
    <aside style={{
      width: w, flexShrink: 0, height: '100vh', position: 'sticky', top: 0,
      background: D.panel, borderRight: `1px solid ${D.hairline}`,
      display: 'flex', flexDirection: 'column', transition: 'width .25s ease',
      fontFamily: D.font, zIndex: 20,
    }}>
      {/* Brand */}
      <div style={{ padding: '20px 16px', display: 'flex', alignItems: 'center', gap: 10, height: 72 }}>
        <PMLogo size={36} />
        {!collapsed && (
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 16, fontWeight: 800, letterSpacing: -0.5, color: D.text }}>PlayMatch</div>
            <div style={{ fontSize: 10, color: D.textTer, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase' }}>Owner Console</div>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav style={{ padding: '4px 12px', display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>
        {!collapsed && <div style={{ fontSize: 10, fontWeight: 700, color: D.textTer, letterSpacing: 1.4, padding: '12px 12px 6px' }}>MANAGE</div>}
        {NAV.map(n => {
          const isActive = active === n.id;
          return (
            <button key={n.id} onClick={() => onNav(n.id)}
              title={collapsed ? n.label : undefined}
              style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: collapsed ? '11px 12px' : '11px 12px',
                justifyContent: collapsed ? 'center' : 'flex-start',
                borderRadius: 10, cursor: 'pointer',
                background: isActive ? D.greenSoft : 'transparent',
                border: 'none', color: isActive ? D.green : D.textSec,
                fontFamily: D.font, fontSize: 13.5, fontWeight: isActive ? 600 : 500,
                letterSpacing: -0.1, transition: 'background .15s, color .15s',
              }}
              onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
              onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}>
              <Icon name={n.icon} size={18} strokeWidth={isActive ? 2.4 : 2} />
              {!collapsed && <span>{n.label}</span>}
              {!collapsed && isActive && <span style={{ marginLeft: 'auto', width: 6, height: 6, borderRadius: '50%', background: D.green }} />}
            </button>
          );
        })}
      </nav>

      {/* Owner card */}
      <div style={{ padding: 12, borderTop: `1px solid ${D.hairline}` }}>
        {collapsed ? (
          <div style={{
            width: 44, height: 44, margin: '0 auto', borderRadius: 12,
            background: `linear-gradient(135deg, ${D.green}, ${D.greenDim})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: D.greenInk, fontWeight: 800, fontSize: 14, fontFamily: D.mono,
          }}>{OWNER.initials}</div>
        ) : (
          <div style={{
            padding: 10, borderRadius: 12, background: D.surface,
            display: 'flex', alignItems: 'center', gap: 10, border: `1px solid ${D.hairline}`,
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: `linear-gradient(135deg, ${D.green}, ${D.greenDim})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: D.greenInk, fontWeight: 800, fontSize: 13, fontFamily: D.mono,
            }}>{OWNER.initials}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: D.text, letterSpacing: -0.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{OWNER.name}</div>
              <div style={{ fontSize: 11, color: D.textSec, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{OWNER.business}</div>
            </div>
            <Icon name="chev" size={14} color={D.textTer} />
          </div>
        )}
        <button onClick={() => setCollapsed(c => !c)} style={{
          width: '100%', marginTop: 8,
          padding: '8px', borderRadius: 8,
          background: 'transparent', border: `1px solid ${D.hairline}`,
          color: D.textTer, cursor: 'pointer', display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          fontFamily: D.font, fontSize: 11, fontWeight: 600,
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            style={{ transform: collapsed ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }}>
            <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </aside>
  );
};

const PMLogo = ({ size = 36 }) => {
  const id = `pm-${size}`;
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none" style={{ flexShrink: 0 }}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={D.green}/>
          <stop offset="100%" stopColor={D.greenDim}/>
        </linearGradient>
      </defs>
      <rect x="20" y="20" width="160" height="160" rx="44" fill="#0F1410" stroke={`${D.green}66`} strokeWidth="1.5"/>
      <path d="M55 55 L55 145 M55 55 L100 55 Q128 55 128 82 Q128 109 100 109 L55 109"
        stroke={`url(#${id})`} strokeWidth="14" fill="none" strokeLinecap="square"/>
      <path d="M105 145 L105 105 L122 130 L139 105 L139 145"
        stroke={`url(#${id})`} strokeWidth="10" fill="none" strokeLinecap="square" strokeLinejoin="miter"/>
      <circle cx="148" cy="60" r="6" fill={D.amber}/>
    </svg>
  );
};

// ─────────────── Topbar ───────────────
const Topbar = ({ title, onSearch }) => (
  <header style={{
    height: 72, padding: '0 32px',
    background: D.bg,
    borderBottom: `1px solid ${D.hairline}`,
    display: 'flex', alignItems: 'center', gap: 16,
    position: 'sticky', top: 0, zIndex: 10,
    backdropFilter: 'blur(20px)',
  }}>
    <div>
      <div style={{ fontSize: 11, color: D.textTer, fontWeight: 600, letterSpacing: 1, marginBottom: 2 }}>OWNER · CASABLANCA</div>
      <h1 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: D.text, letterSpacing: -0.4 }}>{title}</h1>
    </div>
    <div style={{ flex: 1 }} />
    {/* Search */}
    <div style={{
      height: 38, width: 320, padding: '0 14px', borderRadius: 10,
      background: D.surface, border: `1px solid ${D.hairline}`,
      display: 'flex', alignItems: 'center', gap: 10,
    }}>
      <Icon name="search" size={15} color={D.textSec} />
      <input placeholder="Search bookings, customers..." style={{
        flex: 1, background: 'transparent', border: 'none', outline: 'none',
        color: D.text, fontSize: 13, fontFamily: D.font,
      }} />
      <span style={{
        fontFamily: D.mono, fontSize: 10, color: D.textTer,
        padding: '2px 6px', borderRadius: 5, border: `1px solid ${D.hairline}`,
      }}>⌘K</span>
    </div>
    {/* Actions */}
    <button style={{
      width: 38, height: 38, borderRadius: 10,
      background: D.surface, border: `1px solid ${D.hairline}`,
      color: D.text, position: 'relative', cursor: 'pointer',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <Icon name="chat" size={17} />
      <span style={{ position: 'absolute', top: 8, right: 9, width: 7, height: 7, borderRadius: '50%', background: D.amber, border: `2px solid ${D.bg}` }} />
    </button>
    <button style={{
      width: 38, height: 38, borderRadius: 10,
      background: D.surface, border: `1px solid ${D.hairline}`,
      color: D.text, position: 'relative', cursor: 'pointer',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 8a6 6 0 0112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 21a2 2 0 004 0"/>
      </svg>
      <span style={{ position: 'absolute', top: 7, right: 8, minWidth: 14, height: 14, padding: '0 4px', borderRadius: 7, background: D.green, color: D.greenInk, fontSize: 9, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: D.mono }}>3</span>
    </button>
    <div style={{ width: 1, height: 24, background: D.hairline }} />
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
      <div style={{
        width: 36, height: 36, borderRadius: 10,
        background: `linear-gradient(135deg, ${D.green}, ${D.greenDim})`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: D.greenInk, fontWeight: 800, fontSize: 13, fontFamily: D.mono,
      }}>{OWNER.initials}</div>
      <div>
        <div style={{ fontSize: 13, fontWeight: 700, color: D.text, letterSpacing: -0.2 }}>{OWNER.name}</div>
        <div style={{ fontSize: 11, color: D.textSec }}>{OWNER.business}</div>
      </div>
      <Icon name="chevDown" size={14} color={D.textSec} />
    </div>
  </header>
);

window.DashboardCore = {
  D, OWNER, PITCHES, BOOKINGS,
  Card, Btn, Badge, SectionHead,
  BarChart, LineChart, Sparkline,
  Sidebar, Topbar, NAV, PMLogo,
};
