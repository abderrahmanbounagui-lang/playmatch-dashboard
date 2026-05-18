'use client'

import { DB_PITCHES } from '@/lib/mock-db'
import type { PitchWithStats } from '@/lib/db/types'

export function usePitches() {
  const pitches: PitchWithStats[] = DB_PITCHES
  return { pitches, loading: false, error: null }
}
