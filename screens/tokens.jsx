// Design tokens for Pitch — 5v5 football app
const T = {
  // Surfaces
  bg: '#0A0E0C',
  surface: '#141A17',
  surface2: '#1C2521',
  surface3: '#242F2A',
  hairline: 'rgba(255,255,255,0.08)',
  hairlineStrong: 'rgba(255,255,255,0.14)',

  // Text
  text: '#F2F5F3',
  textSec: 'rgba(242,245,243,0.62)',
  textTer: 'rgba(242,245,243,0.38)',

  // Brand — pitch green
  green: 'oklch(0.78 0.18 142)',
  greenDim: 'oklch(0.62 0.14 142)',
  greenSoft: 'oklch(0.32 0.08 142 / 0.35)',
  greenInk: '#0A0E0C',

  // Urgency / waiting
  amber: 'oklch(0.78 0.16 75)',
  amberSoft: 'oklch(0.32 0.08 75 / 0.35)',

  // Status
  red: 'oklch(0.68 0.20 25)',
  blue: 'oklch(0.72 0.13 240)',

  // Type
  font: '"Inter Tight", -apple-system, system-ui, sans-serif',
  mono: '"JetBrains Mono", ui-monospace, monospace',
};

// Tiny line-icon set (Lucide-style, 24 viewBox)
const Icon = ({ name, size = 20, color = 'currentColor', strokeWidth = 2, style }) => {
  const paths = {
    map: <><path d="M9 4l-6 2v14l6-2 6 2 6-2V4l-6 2-6-2z"/><path d="M9 4v14M15 6v14"/></>,
    pin: <><path d="M12 21s7-7.5 7-12a7 7 0 10-14 0c0 4.5 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/></>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    users: <><path d="M16 19v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="3.5"/><path d="M21 19v-2a4 4 0 00-3-3.87"/><path d="M16 4.13a4 4 0 010 7.75"/></>,
    plus: <><path d="M12 5v14M5 12h14"/></>,
    search: <><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></>,
    filter: <><path d="M3 5h18l-7 9v6l-4-2v-4L3 5z"/></>,
    chat: <><path d="M21 15a3 3 0 01-3 3H8l-5 4V6a3 3 0 013-3h12a3 3 0 013 3v9z"/></>,
    bolt: <><path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z"/></>,
    shield: <><path d="M12 2l8 3v6c0 5-3.5 9-8 11-4.5-2-8-6-8-11V5l8-3z"/></>,
    home: <><path d="M3 11l9-8 9 8v9a2 2 0 01-2 2h-4v-7H9v7H5a2 2 0 01-2-2v-9z"/></>,
    user: <><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0116 0"/></>,
    cal: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></>,
    chev: <><path d="M9 6l6 6-6 6"/></>,
    chevDown: <><path d="M6 9l6 6 6-6"/></>,
    arr: <><path d="M5 12h14M13 6l6 6-6 6"/></>,
    check: <><path d="M5 12l4 4 10-10"/></>,
    x: <><path d="M6 6l12 12M18 6L6 18"/></>,
    flame: <><path d="M12 2c1 4 5 5 5 10a5 5 0 11-10 0c0-2 1-3 1-5 2 1 3 0 4-5z"/></>,
    whatsapp: <><path d="M3 21l1.5-5A8 8 0 1112 20a8 8 0 01-4-1L3 21z"/><path d="M8.5 9.5c.5 2 2 3.5 4 4l1.5-1 2 1.5c-.5 1.5-2 2-3 2-3 0-6-3-6-6 0-1 .5-2.5 2-3l1.5 2-1 1.5z" fill={color} stroke="none"/></>,
    send: <><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></>,
    target: <><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5" fill={color} stroke="none"/></>,
    zap: <><path d="M13 2L3 14h7l-1 8 11-14h-8l1-6z"/></>,
    contacts: <><rect x="4" y="3" width="16" height="18" rx="2"/><circle cx="12" cy="11" r="2.5"/><path d="M8 17a4 4 0 018 0"/></>,
    ball: <><circle cx="12" cy="12" r="9"/><path d="M12 3l3 5-3 4-3-4 3-5zM3 12l5-1 4 1-4 4-5-3zM21 12l-5-1-4 1 4 4 5-3zM12 21l-3-5 3-4 3 4-3 5z"/></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" style={style}>
      {paths[name] || null}
    </svg>
  );
};

window.T = T;
window.Icon = Icon;
