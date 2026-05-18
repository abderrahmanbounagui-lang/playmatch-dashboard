'use client'

import { createContext, useContext } from 'react'

export interface MockUser {
  id: string
  email: string
  user_metadata: {
    role: 'owner' | 'client'
    full_name: string
    business_name?: string | null
  }
}

const MOCK_USER: MockUser = {
  id: 'mock-owner-1',
  email: 'reda@anfasports.ma',
  user_metadata: {
    role: 'owner',
    full_name: 'Reda Bensaid',
    business_name: 'Anfa Sports Group',
  },
}

type UserContextType = { user: MockUser | null; loading: boolean }
const UserContext = createContext<UserContextType>({ user: MOCK_USER, loading: false })

export function UserProvider({
  children,
}: {
  children: React.ReactNode
  initialUser?: MockUser | null
}) {
  return (
    <UserContext.Provider value={{ user: MOCK_USER, loading: false }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUserContext() {
  return useContext(UserContext)
}
