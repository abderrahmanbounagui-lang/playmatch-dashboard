export interface MockUser {
  id: string
  email: string
  user_metadata: {
    role: 'owner' | 'client'
    full_name: string
    business_name?: string | null
  }
}

export const MOCK_USER: MockUser = {
  id: 'mock-owner-1',
  email: 'demo@playmatch.com',
  user_metadata: {
    role: 'owner',
    full_name: 'Demo Owner',
    business_name: 'PlayMatch FC',
  },
}
