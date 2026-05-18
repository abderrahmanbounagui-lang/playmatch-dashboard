-- Run this in your Supabase SQL editor (Dashboard → SQL Editor → New query)

create table public.profiles (
  id            uuid primary key references auth.users(id) on delete cascade,
  role          text not null default 'client' check (role in ('owner', 'client')),
  full_name     text,
  business_name text,
  created_at    timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "Users can read own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Auto-create a profile row whenever a new user signs up
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  insert into public.profiles (id, role, full_name, business_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'role', 'client'),
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'business_name'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
