'use client'

import { signup, type AuthState } from '@/app/actions/auth'
import { D } from '@/lib/design-tokens'
import Link from 'next/link'
import { useActionState, useState } from 'react'
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
        background: pending ? 'oklch(0.62 0.14 142)' : 'oklch(0.78 0.18 142)',
        color: '#0A0E0C',
        fontFamily: D.font,
        fontSize: 15,
        fontWeight: 700,
        cursor: pending ? 'not-allowed' : 'pointer',
        opacity: pending ? 0.7 : 1,
        transition: 'background .15s, opacity .15s',
      }}
    >
      {pending ? 'Creating account…' : 'Create account'}
    </button>
  )
}

export default function SignupForm() {
  const [state, action] = useActionState<AuthState, FormData>(signup, null)
  const [role, setRole] = useState<'owner' | 'client'>('owner')

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
      <div style={{ width: '100%', maxWidth: 440 }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <PMLogo size={48} />
          <div style={{ fontSize: 22, fontWeight: 800, color: D.text, letterSpacing: -0.5, marginTop: 14 }}>
            PlayMatch
          </div>
          <div style={{ fontSize: 13, color: D.textTer, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', marginTop: 4 }}>
            Create account
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
            Get started
          </h1>
          <p style={{ fontSize: 14, color: D.textSec, margin: '0 0 28px' }}>
            Create your PlayMatch account
          </p>

          {state?.error && (
            <div style={{
              background: 'oklch(0.32 0.10 25 / 0.3)',
              border: '1px solid oklch(0.68 0.20 25 / 0.4)',
              borderRadius: 8,
              padding: '11px 14px',
              marginBottom: 20,
              fontSize: 13.5,
              color: 'oklch(0.68 0.20 25)',
            }}>
              {state.error}
            </div>
          )}

          <form action={action} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {/* Role toggle */}
            <div>
              <span style={{ fontSize: 12.5, fontWeight: 600, color: D.textSec, letterSpacing: 0.2, display: 'block', marginBottom: 8 }}>
                I am a…
              </span>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {(['owner', 'client'] as const).map(r => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    style={{
                      padding: '10px 14px',
                      borderRadius: 9,
                      border: `1px solid ${role === r ? 'oklch(0.78 0.18 142 / 0.5)' : 'rgba(255,255,255,0.08)'}`,
                      background: role === r ? 'oklch(0.32 0.08 142 / 0.35)' : 'rgba(255,255,255,0.03)',
                      color: role === r ? 'oklch(0.78 0.18 142)' : D.textSec,
                      fontFamily: D.font,
                      fontSize: 13.5,
                      fontWeight: role === r ? 600 : 500,
                      cursor: 'pointer',
                      transition: 'all .15s',
                    }}
                  >
                    {r === 'owner' ? '🏟 Pitch Owner' : '⚽ Player'}
                  </button>
                ))}
              </div>
              <input type="hidden" name="role" value={role} />
            </div>

            <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={{ fontSize: 12.5, fontWeight: 600, color: D.textSec, letterSpacing: 0.2 }}>Full name</span>
              <input name="full_name" type="text" required autoComplete="name" placeholder="Your full name" style={inputStyle} />
            </label>

            {role === 'owner' && (
              <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <span style={{ fontSize: 12.5, fontWeight: 600, color: D.textSec, letterSpacing: 0.2 }}>Business name</span>
                <input name="business_name" type="text" autoComplete="organization" placeholder="e.g. Anfa Sports Group" style={inputStyle} />
              </label>
            )}

            <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={{ fontSize: 12.5, fontWeight: 600, color: D.textSec, letterSpacing: 0.2 }}>Email</span>
              <input name="email" type="email" required autoComplete="email" placeholder="you@example.com" style={inputStyle} />
            </label>

            <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={{ fontSize: 12.5, fontWeight: 600, color: D.textSec, letterSpacing: 0.2 }}>Password</span>
              <input name="password" type="password" required autoComplete="new-password" placeholder="Min 8 characters" minLength={8} style={inputStyle} />
            </label>

            <div style={{ marginTop: 6 }}>
              <SubmitButton />
            </div>
          </form>
        </div>

        <p style={{ textAlign: 'center', marginTop: 20, fontSize: 13.5, color: D.textSec }}>
          Already have an account?{' '}
          <Link href="/login" style={{ color: 'oklch(0.78 0.18 142)', fontWeight: 600, textDecoration: 'none' }}>
            Sign in
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
        <linearGradient id="pm-grad-signup" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.78 0.18 142)" />
          <stop offset="100%" stopColor="oklch(0.62 0.14 142)" />
        </linearGradient>
      </defs>
      <rect x="20" y="20" width="160" height="160" rx="44" fill="#0F1410" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
      <path d="M55 55 L55 145 M55 55 L100 55 Q128 55 128 82 Q128 109 100 109 L55 109"
        stroke="url(#pm-grad-signup)" strokeWidth="14" fill="none" strokeLinecap="square" />
      <path d="M105 145 L105 105 L122 130 L139 105 L139 145"
        stroke="url(#pm-grad-signup)" strokeWidth="10" fill="none" strokeLinecap="square" strokeLinejoin="miter" />
      <circle cx="148" cy="60" r="6" fill="oklch(0.82 0.16 75)" />
    </svg>
  )
}
