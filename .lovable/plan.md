# Luxora — Luxury Boutique Website

This is a very large build (customer site + private collection + cart + WhatsApp checkout + full admin dashboard + password management + demo data). To ship it at "premium agency" quality, I'll build it in focused phases and iterate. Below is Phase 1, which delivers a production-ready foundation with the signature hero, catalogue, product detail, cart, WhatsApp checkout, private collection, and a working admin shell with product/category/password management + demo data. Phases 2–3 refine and complete the remaining admin modules.

## Phase 1 — Foundation & Customer Site (this turn)

**Design system** (`src/styles.css`)
- Warm white `#FBF9F5`, soft beige `#EFE7D8`, luxury gold `#B8935A`, charcoal `#1B1B1B`, soft gray tokens — all oklch.
- Cormorant Garamond (headings) + Inter (body) loaded via `<link>` in `__root.tsx`.
- Rounded corners, soft shadows, gold accent, glass utility, luxury easing tokens.

**Libraries**: framer-motion, gsap (+ScrollTrigger), lenis, zustand (cart/wishlist/auth), react-hook-form, zod.

**Demo data** (`src/data/`): 48 products across watches / handbags / clothing / private-collection. Uses the 5 uploaded product photos + generated hero/category imagery. Categories, reviews, orders, customers, analytics seed.

**Routes** (TanStack file routes under `src/routes/`):
- `/` — hero with 20 floating product cards + GSAP ScrollTrigger "products fly into category cards" signature animation, then Categories, Featured, New Arrivals, Best Sellers, Trending, Private Collection Preview (locked), Reviews, Instagram grid, Newsletter, Footer.
- `/collections` and `/collections/$slug` — full catalogue with search, filters (category, brand, price slider, color, size, material, availability, badges), sort, grid/list, pagination, skeletons, empty state, breadcrumbs.
- `/product/$id` — editorial PDP with gallery, zoom, tabs, related, recently viewed, WhatsApp enquiry.
- `/private` — password gate (validates against admin-managed password list in localStorage) → unlocked catalogue.
- `/about`, `/contact`, `/cart`, `/checkout` (multi-step, final step opens WhatsApp with pre-filled order).
- `/admin` — sidebar dashboard with Dashboard, Products, Categories, Private Collection, Orders, Customers, Passwords, Website Settings, Analytics.

**Global**: sticky nav (transparent over hero → solid), cart drawer, wishlist drawer, floating WhatsApp button, Lenis smooth scroll, page transitions, magnetic buttons, hover lift.

## Phase 2 — Admin depth
Banners, Coupons, Reviews moderation, bulk CSV import/export, drag-drop image upload UI, print-invoice placeholder, customer detail drawer, low-stock alerts.

## Phase 3 — Polish pass
Micro-interactions audit, mobile refinements, accessibility, SEO per route (unique head() metadata), performance (route-level code splitting, image lazy-loading).

## Notes / trade-offs
- Data is client-side (zustand + localStorage) so the admin, cart, private-collection passwords and orders all persist without a backend. When you're ready, we can move it to Lovable Cloud (Postgres + auth) without changing the UI.
- WhatsApp number is a placeholder (`+91 98765 43210`) — editable in Admin → Website Settings.
- Product prices are demo INR values.

Shall I proceed with Phase 1?