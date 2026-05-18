// Matches the Supabase `pitches` table schema
export interface Pitch {
  id: string
  owner_id: string
  name: string
  location: string | null
  price_per_hour: number
  format: string         // e.g. '5v5', '7v7'
  surface: string        // e.g. 'Synthetic', 'Indoor', 'Grass'
  status: 'active' | 'maintenance'
  created_at: string
}

// Pitch augmented with a booking count from an embedded aggregate query
export interface PitchWithStats extends Pitch {
  booking_count: number
}

// Input shape for creating a booking (mirrors BookingInput in app/actions/bookings.ts)
export interface BookingInsert {
  pitchId:        string
  customerName:   string
  customerPhone?: string
  date:           string   // 'YYYY-MM-DD'
  startTime:      string   // 'HH:MM'
  endTime:        string   // 'HH:MM'
  totalPrice:     number
}

// Matches the Supabase `bookings` table schema
export interface Booking {
  id: string
  pitch_id: string
  customer_name: string
  customer_phone: string | null
  date: string        // 'YYYY-MM-DD'
  start_time: string  // 'HH:MM' or 'HH:MM:SS' from Postgres time type
  end_time: string
  status: 'confirmed' | 'pending' | 'cancelled'
  total_price: number
  created_at: string
  pitch?: { id: string; name: string }
}
