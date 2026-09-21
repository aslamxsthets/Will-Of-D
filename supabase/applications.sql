create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text,
  department text,
  year_of_study text,
  student_id text,
  interests text,
  skills text,
  experience text,
  projects text,
  certifications text,
  github text,
  linkedin text,
  portfolio text,
  motivation text,
  available_days text,
  start_time text,
  end_time text,
  agreement boolean not null default false,
  reference_id text unique,
  submitted_at timestamptz not null default now()
);

alter table public.applications enable row level security;

drop policy if exists "Allow public application inserts" on public.applications;
create policy "Allow public application inserts"
on public.applications
for insert
to anon, authenticated
with check (true);
