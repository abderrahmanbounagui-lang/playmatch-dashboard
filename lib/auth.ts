export type UserRole = 'owner' | 'client'

export interface UserProfile {
  id: string
  role: UserRole
  full_name: string | null
  business_name: string | null
  email: string | undefined
}

const MOCK_PROFILE: UserProfile = {
  id: 'mock-owner-1',
  role: 'owner',
  full_name: 'Reda Bensaid',
  business_name: 'Anfa Sports Group',
  email: 'reda@anfasports.ma',
}

export async function getCurrentUser() {
  return {
    id: MOCK_PROFILE.id,
    email: MOCK_PROFILE.email,
    user_metadata: {
      role: MOCK_PROFILE.role,
      full_name: MOCK_PROFILE.full_name,
      business_name: MOCK_PROFILE.business_name,
    },
  }
}

export async function getUserProfile(): Promise<UserProfile | null> {
  return MOCK_PROFILE
}

export async function requireAuth() {
  return getCurrentUser()
}

export async function requireRole(_role: UserRole) {
  return MOCK_PROFILE
}

export function getInitials(name: string | null | undefined, email?: string): string {
  if (name) {
    return name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()
  }
  return (email?.[0] ?? 'U').toUpperCase()
}
