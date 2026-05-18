'use client'

import { login, type AuthState } from '@/app/actions/auth'
import { D } from '@/lib/design-tokens'
import Link from 'next/link'
import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      style={{
        width: '100%',
        padding: '13px',
        borderRadius: 10,
        border: 'none',
        background: pending ? D.greenDim : D.green,
        color: D.greenInk,
        fontFamily: D.font,
        fontSize: 15,
        fontWeight: 700,
        cursor: pending ? 'not-allowed' : 'pointer',
        transition: 'background .15s, opacity .15s',
        opacity: pending ? 0.7 : 1,
      }}
    >
      {pending ? 'Signing in…' : 'Sign in'}
    </button>
  )
}

export default function LoginForm() {
  const [state, action] = useActionState<AuthState, FormData>(login, null)

  return (
    <div style={{
      minHeight: '100vh',
      background: D.bg,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: D.font,
      padding: '24px',
    }}>
      <div style={{ width: '100%', maxWidth: 400 }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <PMLogo size={48} />
          <div style={{ fontSize: 22, fontWeight: 800, color: D.text, letterSpacing: -0.5, marginTop: 14 }}>
            PlayMatch
          </div>
          <div style={{ fontSize: 13, color: D.textTer, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', marginTop: 4 }}>
            Owner Console
          </div>
        </div>

        {/* Card */}
        <div style={{
          background: D.panel,
          border: `1px solid ${D.hairline}`,
          borderRadius: 16,
          padding: '32px 28px',
        }}>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: D.text, margin: '0 0 4px', letterSpacing: -0.3 }}>
            Welcome back
          </h1>
          <p style={{ fontSize: 14, color: D.textSec, margin: '0 0 28px' }}>
            Sign in to your dashboard
          </p>

          {state?.error && (
            <div style={{
              background: D.redSoft,
              border: `1px solid ${D.red}44`,
              borderRadius: 8,
              padding: '11px 14px',
              marginBottom: 20,
              fontSize: 13.5,
              color: D.red,
            }}>
              {state.error}
            </div>
          )}

          <form action={action} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={{ fontSize: 12.5, fontWeight: 600, color: D.textSec, letterSpacing: 0.2 }}>Email</span>
              <input
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                style={inputStyle}
              />
            </label>

            <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={{ fontSize: 12.5, fontWeight: 600, color: D.textSec, letterSpacing: 0.2 }}>Password</span>
              <input
                name="password"
                type="password"
                required
                autoComplete="current-password"
                placeholder="••••••••"
                style={inputStyle}
              />
            </label>

            <div style={{ marginTop: 6 }}>
              <SubmitButton />
            </div>
          </form>
        </div>

        <p style={{ textAlign: 'center', marginTop: 20, fontSize: 13.5, color: D.textSec }}>
          No account?{' '}
          <Link href="/signup" style={{ color: D.green, fontWeight: 600, textDecoration: 'none' }}>
            Create one
          </Link>
        </p>
      </div>
    </div>
  )
}

const inputStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.10)',
  borderRadius: 9,
  padding: '11px 13px',
  color: '#E8EDEB',
  fontFamily: '"Inter Tight", -apple-system, system-ui, sans-serif',
  fontSize: 14.5,
  outline: 'none',
  width: '100%',
  boxSizing: 'border-box',
  transition: 'border-color .15s',
}

function PMLogo({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none" style={{ display: 'inline-block' }}>
      <defs>
        <linearGradient id="pm-grad-login" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.78 0.18 142)" />
          <stop offset="100%" stopColor="oklch(0.62 0.14 142)" />
        </linearGradient>
      </defs>
      <rect x="20" y="20" width="160" height="160" rx="44" fill="#0F1410" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
      <path d="M55 55 L55 145 M55 55 L100 55 Q128 55 128 82 Q128 109 100 109 L55 109"
        stroke="url(#pm-grad-login)" strokeWidth="14" fill="none" strokeLinecap="square" />
      <path d="M105 145 L105 105 L122 130 L139 105 L139 145"
        stroke="url(#pm-grad-login)" strokeWidth="10" fill="none" strokeLinecap="square" strokeLinejoin="miter" />
      <circle cx="148" cy="60" r="6" fill="oklch(0.82 0.16 75)" />
    </svg>
  )
}
