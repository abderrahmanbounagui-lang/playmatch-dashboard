-- ============================================================
-- Migration: prevent overlapping bookings for the same pitch
-- ============================================================

-- btree_gist allows mixing scalar operators (=) with range operators (&&)
-- in a single EXCLUDE constraint.
CREATE EXTENSION IF NOT EXISTS btree_gist;


-- ── EXCLUDE constraint ────────────────────────────────────────────────────────
-- Two bookings conflict when, for the same pitch on the same date, their time
-- ranges overlap.  We use a half-open interval [start, end) so that
-- back-to-back slots (18:00-19:00 and 19:00-20:00) are NOT considered overlaps.
-- Cancelled bookings are excluded from the constraint so a cancelled slot can
-- immediately be re-booked without manual cleanup.
ALTER TABLE bookings
  ADD CONSTRAINT no_overlapping_bookings
  EXCLUDE USING gist (
    pitch_id WITH =,
    date     WITH =,
    tsrange(
      (date + start_time)::timestamp,
      (date + end_time)::timestamp,
      '[)'                            -- half-open: start inclusive, end exclusive
    ) WITH &&
  )
  WHERE (status <> 'cancelled');


-- ── Supporting index ─────────────────────────────────────────────────────────
-- The EXCLUDE constraint creates its own GiST index, but this btree index
-- speeds up the pre-insert overlap check query and the owner's bookings list.
CREATE INDEX IF NOT EXISTS idx_bookings_pitch_date
  ON bookings (pitch_id, date);


-- ── Overlap check RPC ─────────────────────────────────────────────────────────
-- Called from the Server Action before insert to return a user-friendly error
-- instead of relying solely on the raw constraint violation message.
--
-- SECURITY DEFINER: runs as the function owner so it can see ALL bookings for
-- a pitch (not just the calling user's), which is required for correct overlap
-- detection in a multi-user system where clients book owner pitches.
--
-- p_exclude_id: pass the booking's own id when rescheduling so the booking
-- doesn't conflict with itself.
CREATE OR REPLACE FUNCTION check_booking_overlap(
  p_pitch_id   uuid,
  p_date       date,
  p_start_time time,
  p_end_time   time,
  p_exclude_id uuid DEFAULT NULL
)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM   bookings
    WHERE  pitch_id  = p_pitch_id
      AND  date      = p_date
      AND  status   <> 'cancelled'
      AND  (p_exclude_id IS NULL OR id <> p_exclude_id)
      -- Classic interval overlap: A starts before B ends AND A ends after B starts
      AND  p_start_time < end_time
      AND  p_end_time   > start_time
  );
$$;

-- Grant execution to authenticated users (Server Actions run as the signed-in user)
GRANT EXECUTE ON FUNCTION check_booking_overlap TO authenticated;


-- ── Available slots RPC ───────────────────────────────────────────────────────
-- Returns taken time ranges for a pitch on a given date so the UI can render
-- a visual slot picker.  Returns rows, not a boolean.
CREATE OR REPLACE FUNCTION get_booked_slots(
  p_pitch_id uuid,
  p_date     date
)
RETURNS TABLE (start_time time, end_time time, status text)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT start_time, end_time, status
  FROM   bookings
  WHERE  pitch_id = p_pitch_id
    AND  date     = p_date
    AND  status  <> 'cancelled'
  ORDER  BY start_time;
$$;

GRANT EXECUTE ON FUNCTION get_booked_slots TO authenticated;
