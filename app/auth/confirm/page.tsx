import { D } from '@/lib/design-tokens'

export default function ConfirmPage() {
  return (
    <div style={{ minHeight: '100vh', background: D.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: D.font }}>
      <div style={{ textAlign: 'center', maxWidth: 400, padding: '0 24px' }}>
        <div style={{ fontSize: 40, marginBottom: 24 }}>📬</div>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: D.text, marginBottom: 12 }}>Check your email</h1>
        <p style={{ fontSize: 15, color: D.textSec, lineHeight: 1.6 }}>
          We sent a confirmation link to your email address. Click it to activate your account and sign in.
        </p>
      </div>
    </div>
  )
}
