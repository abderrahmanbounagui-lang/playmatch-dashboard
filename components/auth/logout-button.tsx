'use client'

import { logout } from '@/app/actions/auth'
import { useTransition } from 'react'

interface LogoutButtonProps {
  style?: React.CSSProperties
  children?: React.ReactNode
}

export function LogoutButton({ style, children }: LogoutButtonProps) {
  const [isPending, startTransition] = useTransition()

  return (
    <button
      disabled={isPending}
      onClick={() => startTransition(() => logout())}
      style={style}
    >
      {isPending ? 'Signing out…' : (children ?? 'Sign out')}
    </button>
  )
}
