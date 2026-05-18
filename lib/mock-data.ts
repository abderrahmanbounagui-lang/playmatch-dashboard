export const OWNER = {
  name: 'Reda Bensaid',
  business: 'Anfa Sports Group',
  initials: 'RB',
  email: 'reda@anfasports.ma',
  phone: '+212 661 23 45 67',
  city: 'Casablanca',
}

export const PITCHES = [
  { id: 'p1', name: 'Anfa Stadium · Pitch 1', loc: 'Bd. de la Corniche, Anfa',        price: 60, format: '5v5', surface: 'Synthetic', status: 'active',      bookings: 142, occ: 84 },
  { id: 'p2', name: 'Anfa Stadium · Pitch 2', loc: 'Bd. de la Corniche, Anfa',        price: 60, format: '5v5', surface: 'Synthetic', status: 'active',      bookings: 128, occ: 78 },
  { id: 'p3', name: 'Maarif 5-a-side',        loc: 'Rue Ibn Battouta, Maarif',        price: 50, format: '5v5', surface: 'Indoor',    status: 'active',      bookings: 96,  occ: 62 },
  { id: 'p4', name: 'Sidi Maarouf Arena',     loc: "Route d'El Jadida, Sidi Maarouf", price: 55, format: '5v5', surface: 'Synthetic', status: 'maintenance', bookings: 0,   occ: 0  },
]

export const BOOKINGS = [
  { id: 'b1', name: 'Youssef El Amrani', phone: '+212 661 12 34 56', date: '2026-05-15', start: '18:00', end: '19:00', pitch: 'Anfa Stadium · Pitch 1', status: 'confirmed', price: 60 },
  { id: 'b2', name: 'Team Atlas FC',     phone: '+212 662 23 45 67', date: '2026-05-15', start: '19:30', end: '20:30', pitch: 'Anfa Stadium · Pitch 2', status: 'confirmed', price: 60 },
  { id: 'b3', name: 'Mehdi Alaoui',      phone: '+212 663 34 56 78', date: '2026-05-15', start: '20:00', end: '21:00', pitch: 'Maarif 5-a-side',        status: 'pending',   price: 50 },
  { id: 'b4', name: 'Hay Mohammadi FC',  phone: '+212 664 45 67 89', date: '2026-05-15', start: '21:00', end: '22:00', pitch: 'Anfa Stadium · Pitch 1', status: 'confirmed', price: 60 },
  { id: 'b5', name: 'Omar Tazi',         phone: '+212 665 56 78 90', date: '2026-05-15', start: '22:00', end: '23:00', pitch: 'Maarif 5-a-side',        status: 'confirmed', price: 50 },
  { id: 'b6', name: 'Anas Karim',        phone: '+212 666 67 89 01', date: '2026-05-16', start: '18:30', end: '19:30', pitch: 'Anfa Stadium · Pitch 2', status: 'confirmed', price: 60 },
  { id: 'b7', name: 'Beach Ballers',     phone: '+212 667 78 90 12', date: '2026-05-16', start: '20:00', end: '21:00', pitch: 'Anfa Stadium · Pitch 1', status: 'cancelled', price: 60 },
  { id: 'b8', name: 'Karim Belhaj',      phone: '+212 668 89 01 23', date: '2026-05-16', start: '21:00', end: '22:00', pitch: 'Maarif 5-a-side',        status: 'confirmed', price: 50 },
]

export type Pitch   = typeof PITCHES[number]
export type Booking = typeof BOOKINGS[number]
