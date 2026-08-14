-- Run this file in the Supabase SQL Editor to create the store database.
create extension if not exists "pgcrypto";

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'customer' check (role in ('customer', 'admin')),
  created_at timestamptz not null default now()
);

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id) values (new.id);
  return new;
end;
$$;

create trigger on_auth_user_created after insert on auth.users
for each row execute procedure public.handle_new_user();

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role = 'admin');
$$;

create table public.categories (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  image_url text,
  created_at timestamptz not null default now()
);

create table public.products (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references public.categories(id) on delete set null,
  name text not null,
  slug text unique not null,
  description text,
  price numeric(10,2) not null check (price >= 0),
  image_url text,
  sizes text[] default '{}',
  is_featured boolean not null default false,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  customer_email text not null,
  status text not null default 'pending' check (status in ('pending','paid','fulfilled','cancelled')),
  total numeric(10,2) not null check (total >= 0),
  created_at timestamptz not null default now()
);

create table public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  product_name text not null,
  quantity integer not null check (quantity > 0),
  unit_price numeric(10,2) not null check (unit_price >= 0)
);

alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.profiles enable row level security;

create policy "Public can view categories" on public.categories for select using (true);
create policy "Public can view active products" on public.products for select using (is_active = true);
create policy "Admins can manage categories" on public.categories for all using (public.is_admin()) with check (public.is_admin());
create policy "Admins can manage products" on public.products for all using (public.is_admin()) with check (public.is_admin());
create policy "Users can view their own role" on public.profiles for select using (auth.uid() = id);
-- Orders are deliberately not publicly writable. Create orders through a protected server-side function or Edge Function after checkout.

insert into public.categories (slug, name) values
('jeans','Jeans'), ('bottoms-shorts','Bottoms & Shorts'), ('tops','T-Shirts & Shirts'),
('formal-trousers','Formal Trousers'), ('hats','Caps & Bucket Hats'),
('tracksuits-jackets','Tracksuits & Jackets'), ('footwear','Slides & Sneakers');
