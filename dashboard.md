# PlayMatch Documentation

## 1. Project Overview

PlayMatch is a football pitch booking SaaS platform designed for clubs, pitch owners, and players. It provides a public landing page for customers to discover and book football pitches, while offering a dedicated owner dashboard for pitch managers to control availability, bookings, revenue, and pitch details. The system supports multiple pitch owners and is built with Next.js (App Router), Supabase (auth + database), TailwindCSS, and shadcn/ui.

## 2. Features

### Landing Page
- Hero section with a strong value proposition for players and teams
- How it works content explaining booking flow step-by-step
- Available pitches listing with filters and quick booking actions
- Pricing section for package tiers, hourly rates, or membership options
- CTA buttons for `Book` and `Login`

### Dashboard (Pitch Owner)
- Overview analytics showing bookings, revenue, and occupancy trends
- My pitches management for adding, editing, and disabling venues
- Bookings management for reviewing, approving, and cancelling reservations
- Calendar view highlighting blocked and booked hours per pitch
- Revenue tracking with totals, charts, and recent payout summaries
- Settings page for account details, business settings, and notification preferences

## 3. User Roles

- Client: a public user who browses available pitches and books time slots.
- Owner: a pitch manager who logs into the dashboard to manage pitches, bookings, availability, and revenue.
- Admin: an optional future role for platform-wide oversight, reporting, owner approvals, and global configuration.

## 4. Database Schema (Supabase)

### profiles
- `id` (uuid, primary key)
- `email` (text)
- `name` (text)
- `role` (text, e.g. `client`, `owner`, `admin`)
- `created_at` (timestamp)
- `updated_at` (timestamp)

### pitches
- `id` (uuid, primary key)
- `owner_id` (uuid, references `profiles.id`)
- `name` (text)
- `location` (text)
- `description` (text)
- `price_per_hour` (numeric)
- `capacity` (integer)
- `image_url` (text)
- `is_active` (boolean)
- `created_at` (timestamp)
- `updated_at` (timestamp)

### bookings
- `id` (uuid, primary key)
- `pitch_id` (uuid, references `pitches.id`)
- `client_id` (uuid, references `profiles.id`)
- `start_time` (timestamp)
- `end_time` (timestamp)
- `status` (text, e.g. `pending`, `confirmed`, `cancelled`)
- `total_price` (numeric)
- `created_at` (timestamp)
- `updated_at` (timestamp)

### Relationships
- `owner_id → pitches`: each pitch belongs to a single pitch owner.
- `pitch_id → bookings`: each booking is associated with one pitch.

## 5. Authentication Flow

- Public users access the landing page without logging in.
- Owners log in using Supabase Auth.
- Once authenticated, owners are redirected to `/dashboard`.
- Clients can optionally log in or book as guest depending on product requirements.
- Access control ensures only authenticated owners can reach dashboard routes.

## 6. Booking System Logic

- The booking engine prevents overlapping bookings by validating time ranges before saving.
- Each booking stores `start_time` and `end_time` precisely.
- The system marks unavailable hours per pitch based on confirmed bookings and blocked time slots.
- Booking checks occur on creation and update to ensure the pitch is free for the selected window.
- Calendar views use booked and blocked intervals to render availability clearly.

## 7. Dashboard Structure

```text
/app
  /(public)
  /dashboard
  /dashboard/pitches
  /dashboard/bookings
  /dashboard/calendar
```

- `/app/(public)`: landing page and public marketing pages.
- `/app/dashboard`: owner dashboard shell and protected dashboard layout.
- `/app/dashboard/pitches`: pitch management pages and forms.
- `/app/dashboard/bookings`: booking list, detail, and approval flows.
- `/app/dashboard/calendar`: calendar view for blocked hours and availability.

## 8. UI Design Style

- Modern SaaS design with polished layouts, whitespace, and clear hierarchy.
- Clean interface inspired by Stripe-style simplicity and ease of use.
- Green football theme with sporty accent colors, strong CTA styling, and pitch imagery.
- Mobile responsive design with adaptive cards, collapsible nav, and accessible forms.
- Consistent use of TailwindCSS and shadcn/ui components for scalable UI patterns.

## 9. API / Data Flow

- Frontend components call Supabase client APIs for authentication, data queries, and mutations.
- Listings and dashboard content filter data by `owner_id` so owners only see their own pitches and bookings.
- Booking actions create records in the `bookings` table and update availability state.
- UI components fetch dashboard analytics from Supabase with server-side or client-side data loading.
- Secure RLS policies enforce row-level data access, while the frontend uses owner-specific filters.

## 10. Security

- Supabase Row Level Security (RLS) protects all pitch and booking data.
- Owner policies restrict access so owners can only read and modify their own records.
- Clients are isolated from owner management endpoints.
- Sensitive dashboard actions require authenticated sessions and validation on the server side.
- RLS combined with role-based access prevents unauthorized data exposure.

## 11. Future Improvements

- WhatsApp notifications for booking confirmations, reminders, and owner alerts.
- Stripe payments for booking deposits, payments, and subscriptions.
- Native mobile app for seamless booking and owner management on the go.
- AI pricing system that suggests optimal hourly rates based on demand and availability.
- Tournament management features for leagues, team scheduling, and multi-pitch events.
