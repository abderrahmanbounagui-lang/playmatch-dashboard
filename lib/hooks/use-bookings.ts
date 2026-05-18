'use client'

import { useMemo } from 'react'
import { getFilteredBookings } from '@/lib/mock-db'
import type { Booking } from '@/lib/db/types'
import type { BookingFilters } from '@/lib/mock-db'

export type { BookingFilters }

export function useBookings(filters: BookingFilters = {}) {
  const bookings = useMemo<Booking[]>(
    () => getFilteredBookings(filters),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filters.pitchId, filters.date, filters.status],
  )
  return { bookings, loading: false, error: null }
}
