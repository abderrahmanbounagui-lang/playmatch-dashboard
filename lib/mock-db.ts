import type { PitchWithStats, Booking } from '@/lib/db/types'

export const OWNER_ID = 'mock-owner-1'

export const DB_PITCHES: PitchWithStats[] = [
  {
    id: 'p1',
    owner_id: OWNER_ID,
    name: 'Anfa Stadium · Pitch 1',
    location: 'Bd. de la Corniche, Anfa',
    price_per_hour: 60,
    format: '5v5',
    surface: 'Synthetic',
    status: 'active',
    created_at: '2024-01-01T00:00:00Z',
    booking_count: 142,
  },
  {
    id: 'p2',
    owner_id: OWNER_ID,
    name: 'Anfa Stadium · Pitch 2',
    location: 'Bd. de la Corniche, Anfa',
    price_per_hour: 60,
    format: '5v5',
    surface: 'Synthetic',
    status: 'active',
    created_at: '2024-01-01T00:00:00Z',
    booking_count: 128,
  },
  {
    id: 'p3',
    owner_id: OWNER_ID,
    name: 'Maarif 5-a-side',
    location: 'Rue Ibn Battouta, Maarif',
    price_per_hour: 50,
    format: '5v5',
    surface: 'Indoor',
    status: 'active',
    created_at: '2024-02-01T00:00:00Z',
    booking_count: 96,
  },
  {
    id: 'p4',
    owner_id: OWNER_ID,
    name: 'Sidi Maarouf Arena',
    location: "Route d'El Jadida, Sidi Maarouf",
    price_per_hour: 55,
    format: '5v5',
    surface: 'Synthetic',
    status: 'maintenance',
    created_at: '2024-03-01T00:00:00Z',
    booking_count: 0,
  },
]

export const DB_BOOKINGS: Booking[] = [
  {
    id: 'b1',
    pitch_id: 'p1',
    customer_name: 'Youssef El Amrani',
    customer_phone: '+212 661 12 34 56',
    date: '2026-05-18',
    start_time: '18:00',
    end_time: '19:00',
    status: 'confirmed',
    total_price: 60,
    created_at: '2026-05-17T10:00:00Z',
    pitch: { id: 'p1', name: 'Anfa Stadium · Pitch 1' },
  },
  {
    id: 'b2',
    pitch_id: 'p2',
    customer_name: 'Team Atlas FC',
    customer_phone: '+212 662 23 45 67',
    date: '2026-05-18',
    start_time: '19:30',
    end_time: '20:30',
    status: 'confirmed',
    total_price: 60,
    created_at: '2026-05-17T11:00:00Z',
    pitch: { id: 'p2', name: 'Anfa Stadium · Pitch 2' },
  },
  {
    id: 'b3',
    pitch_id: 'p3',
    customer_name: 'Mehdi Alaoui',
    customer_phone: '+212 663 34 56 78',
    date: '2026-05-18',
    start_time: '20:00',
    end_time: '21:00',
    status: 'pending',
    total_price: 50,
    created_at: '2026-05-18T08:00:00Z',
    pitch: { id: 'p3', name: 'Maarif 5-a-side' },
  },
  {
    id: 'b4',
    pitch_id: 'p1',
    customer_name: 'Hay Mohammadi FC',
    customer_phone: '+212 664 45 67 89',
    date: '2026-05-18',
    start_time: '21:00',
    end_time: '22:00',
    status: 'confirmed',
    total_price: 60,
    created_at: '2026-05-17T12:00:00Z',
    pitch: { id: 'p1', name: 'Anfa Stadium · Pitch 1' },
  },
  {
    id: 'b5',
    pitch_id: 'p3',
    customer_name: 'Omar Tazi',
    customer_phone: '+212 665 56 78 90',
    date: '2026-05-18',
    start_time: '22:00',
    end_time: '23:00',
    status: 'confirmed',
    total_price: 50,
    created_at: '2026-05-17T13:00:00Z',
    pitch: { id: 'p3', name: 'Maarif 5-a-side' },
  },
  {
    id: 'b6',
    pitch_id: 'p2',
    customer_name: 'Anas Karim',
    customer_phone: '+212 666 67 89 01',
    date: '2026-05-16',
    start_time: '18:30',
    end_time: '19:30',
    status: 'confirmed',
    total_price: 60,
    created_at: '2026-05-15T09:00:00Z',
    pitch: { id: 'p2', name: 'Anfa Stadium · Pitch 2' },
  },
  {
    id: 'b7',
    pitch_id: 'p1',
    customer_name: 'Beach Ballers',
    customer_phone: '+212 667 78 90 12',
    date: '2026-05-16',
    start_time: '20:00',
    end_time: '21:00',
    status: 'cancelled',
    total_price: 60,
    created_at: '2026-05-15T10:00:00Z',
    pitch: { id: 'p1', name: 'Anfa Stadium · Pitch 1' },
  },
  {
    id: 'b8',
    pitch_id: 'p3',
    customer_name: 'Karim Belhaj',
    customer_phone: '+212 668 89 01 23',
    date: '2026-05-16',
    start_time: '21:00',
    end_time: '22:00',
    status: 'confirmed',
    total_price: 50,
    created_at: '2026-05-15T11:00:00Z',
    pitch: { id: 'p3', name: 'Maarif 5-a-side' },
  },
]

export interface BookingFilters {
  pitchId?: string
  date?: string
  status?: 'confirmed' | 'pending' | 'cancelled'
}

export function getFilteredBookings(filters: BookingFilters = {}): Booking[] {
  return DB_BOOKINGS.filter(b => {
    if (filters.pitchId && b.pitch_id !== filters.pitchId) return false
    if (filters.date && b.date !== filters.date) return false
    if (filters.status && b.status !== filters.status) return false
    return true
  }).sort((a, b) => {
    if (b.date !== a.date) return b.date.localeCompare(a.date)
    return a.start_time.localeCompare(b.start_time)
  })
}
