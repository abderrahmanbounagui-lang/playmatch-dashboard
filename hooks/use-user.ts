'use client'

import type { MockUser } from '@/components/auth/user-provider'

const MOCK_USER: MockUser = {
  id: 'mock-owner-1',
  email: 'reda@anfasports.ma',
  user_metadata: {
    role: 'owner',
    full_name: 'Reda Bensaid',
    business_name: 'Anfa Sports Group',
  },
}

export function useUser() {
  return { user: MOCK_USER, loading: false }
}
