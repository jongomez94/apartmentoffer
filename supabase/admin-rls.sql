-- Run in Supabase SQL Editor after enabling Auth for your admin user.
-- 1) Create an admin user in Authentication (email/password or invite).
-- 2) Copy their UUID from Authentication → Users.
-- 3) INSERT INTO public.admin_users (user_id) VALUES ('<uuid>');
--
-- Public site continues to use anon + existing SELECT policies for published rows.
-- Authenticated users listed in admin_users get full CRUD on events + guest_stories.

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;

-- Admins can see only their own allowlist row (enough to verify access patterns in dev).
drop policy if exists "admin_users_select_own" on public.admin_users;
create policy "admin_users_select_own" on public.admin_users
  for select
  to authenticated
  using (auth.uid() = user_id);

-- No API insert/update on admin_users — add rows manually in SQL as superuser / dashboard.

-- Events: admin write access (SELECT/INSERT/UPDATE/DELETE)
drop policy if exists "events_admin_select" on public.events;
create policy "events_admin_select" on public.events
  for select
  to authenticated
  using (
    exists (select 1 from public.admin_users a where a.user_id = auth.uid())
  );

drop policy if exists "events_admin_insert" on public.events;
create policy "events_admin_insert" on public.events
  for insert
  to authenticated
  with check (
    exists (select 1 from public.admin_users a where a.user_id = auth.uid())
  );

drop policy if exists "events_admin_update" on public.events;
create policy "events_admin_update" on public.events
  for update
  to authenticated
  using (
    exists (select 1 from public.admin_users a where a.user_id = auth.uid())
  )
  with check (
    exists (select 1 from public.admin_users a where a.user_id = auth.uid())
  );

drop policy if exists "events_admin_delete" on public.events;
create policy "events_admin_delete" on public.events
  for delete
  to authenticated
  using (
    exists (select 1 from public.admin_users a where a.user_id = auth.uid())
  );

-- Guest stories: admin write access
drop policy if exists "guest_stories_admin_select" on public.guest_stories;
create policy "guest_stories_admin_select" on public.guest_stories
  for select
  to authenticated
  using (
    exists (select 1 from public.admin_users a where a.user_id = auth.uid())
  );

drop policy if exists "guest_stories_admin_insert" on public.guest_stories;
create policy "guest_stories_admin_insert" on public.guest_stories
  for insert
  to authenticated
  with check (
    exists (select 1 from public.admin_users a where a.user_id = auth.uid())
  );

drop policy if exists "guest_stories_admin_update" on public.guest_stories;
create policy "guest_stories_admin_update" on public.guest_stories
  for update
  to authenticated
  using (
    exists (select 1 from public.admin_users a where a.user_id = auth.uid())
  )
  with check (
    exists (select 1 from public.admin_users a where a.user_id = auth.uid())
  );

drop policy if exists "guest_stories_admin_delete" on public.guest_stories;
create policy "guest_stories_admin_delete" on public.guest_stories
  for delete
  to authenticated
  using (
    exists (select 1 from public.admin_users a where a.user_id = auth.uid())
  );
