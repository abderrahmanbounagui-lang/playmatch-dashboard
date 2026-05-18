-- ============================================================
-- Migration: enable Supabase Realtime for the bookings table
-- ============================================================
-- Run this in the Supabase SQL editor BEFORE using the realtime hook.
-- It adds bookings to the replication publication so that postgres_changes
-- events are broadcast to subscribed clients.

ALTER PUBLICATION supabase_realtime ADD TABLE bookings;

-- Verify it was added (optional — run separately to check)
-- SELECT schemaname, tablename FROM pg_publication_tables
-- WHERE pubname = 'supabase_realtime';
