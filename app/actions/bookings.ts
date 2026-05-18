'use server'

import { revalidatePath } from 'next/cache'

export type BookingActionResult =
  | { success: true;  bookingId: string }
  | { success: false; error: string; field?: keyof BookingInput }

export interface BookingInput {
  pitchId:       string
  customerName:  string
  customerPhone?: string
  date:          string
  startTime:     string
  endTime:       string
  totalPrice:    number
}

function validate(input: BookingInput): { error: string; field: keyof BookingInput } | null {
  if (!input.pitchId)                              return { error: 'Pitch is required',                 field: 'pitchId' }
  if (!input.customerName.trim())                  return { error: 'Customer name is required',          field: 'customerName' }
  if (!input.date.match(/^\d{4}-\d{2}-\d{2}$/))   return { error: 'Invalid date format',                field: 'date' }
  if (!input.startTime.match(/^\d{2}:\d{2}$/))    return { error: 'Invalid start time format',          field: 'startTime' }
  if (!input.endTime.match(/^\d{2}:\d{2}$/))      return { error: 'Invalid end time format',            field: 'endTime' }
  if (input.startTime >= input.endTime)            return { error: 'End time must be after start time',  field: 'endTime' }
  if (input.totalPrice < 0)                        return { error: 'Price cannot be negative',           field: 'totalPrice' }
  return null
}

export async function createBooking(input: BookingInput): Promise<BookingActionResult> {
  const validationError = validate(input)
  if (validationError) return { success: false, ...validationError }

  revalidatePath('/dashboard/bookings')
  revalidatePath('/dashboard')
  return { success: true, bookingId: `mock-${Date.now()}` }
}

export interface RescheduleInput {
  bookingId: string
  date:      string
  startTime: string
  endTime:   string
}

export async function rescheduleBooking(input: RescheduleInput): Promise<BookingActionResult> {
  if (input.startTime >= input.endTime) {
    return { success: false, error: 'End time must be after start time', field: 'endTime' as keyof BookingInput }
  }

  revalidatePath('/dashboard/bookings')
  revalidatePath('/dashboard')
  return { success: true, bookingId: input.bookingId }
}

export async function updateBookingStatus(
  bookingId: string,
  _status: 'confirmed' | 'pending' | 'cancelled',
): Promise<BookingActionResult> {
  revalidatePath('/dashboard/bookings')
  revalidatePath('/dashboard')
  return { success: true, bookingId }
}
