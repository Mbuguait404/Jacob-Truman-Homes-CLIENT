# Jacob Truman Homes

A React + Vite prototype for a Nairobi & Eldoret residential real-estate agency site: landing page, listings with URL-based filters, listing detail pages, an about/owner page, buy/sell enquiry forms, and a separate admin portal with its own routes (dashboard, listings, add/edit) — all backed by in-memory state, no real backend/database yet.

## Getting started

Requires [Node.js](https://nodejs.org) 18+.

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually http://localhost:5173).

## Build for production

```bash
npm run build
npm run preview
```

The production build is written to `dist/`, ready to deploy to any static host (Netlify, Vercel, S3, etc). Because this is a client-side-routed single-page app, make sure your host is configured to serve `index.html` for unknown paths (a "SPA fallback" / "rewrite all routes" setting).

## Project structure

```
index.html
package.json
vite.config.js
src/
  main.jsx                     entry point, imports global styles
  App.jsx                      router setup — all routes live here

  context/
    ListingsContext.jsx        shared listings state (read by public pages, written by admin)

  data/
    listings.js                mock listing records + CITIES list
    testimonials.js
    process.js                 "how a sale runs" steps

  utils/
    format.js                  price formatting helper

  styles/
    reset.css                  minimal CSS reset
    global.css                 design tokens + all public-site styles
    admin.css                  admin portal styles (loaded only inside /admin)

  components/
    layout/
      SiteLayout.jsx           wraps public pages: Nav + <Outlet/> + Footer + admin fab
      Nav.jsx
      Footer.jsx
    common/
      ListingCard.jsx
      Img.jsx                  placeholder photography w/ sepia treatment
      Seal.jsx                 the wax-seal monogram used as a signature motif
      SmallBits.jsx            Eyebrow, StatusBadge, SpecRow

  pages/                       public routes
    HomePage.jsx                /
    ListingsPage.jsx            /listings
    ListingDetailPage.jsx       /listings/:id
    AboutPage.jsx                /about
    EnquiryPage.jsx              /sell and /buy (same component, different mode prop)
    NotFoundPage.jsx             *

  admin/                       everything admin-only lives here
    AdminAuthContext.jsx       fake auth (name only, no password) — in-memory
    AdminLayout.jsx             /admin/* — sidebar shell, gates on auth, renders <Outlet/>
    AdminLogin.jsx              shown by AdminLayout when not "logged in"
    routes/
      AdminDashboard.jsx        /admin/dashboard
      AdminListings.jsx         /admin/listings
      AdminListingForm.jsx      /admin/listings/new and /admin/listings/:id/edit
```

## Notes on this version

- **No backend yet.** Listings live in React context (`ListingsContext`), seeded from `data/listings.js`. The admin portal can add/edit/delete listings, but changes reset on page refresh.
- **Admin auth is fake.** `/admin` shows a name-only login (no password) via `AdminAuthContext`. There's no real session, token, or protection — anyone can access `/admin` directly.
- **Routing** uses `react-router-dom` with real URLs (`/listings?city=Nairobi&type=For+Sale`, `/listings/3`, `/admin/listings/3/edit`, etc.), so links, back/forward, and refresh all behave like a normal site.
- **Images** are placeholder photography (via picsum.photos) with a consistent sepia treatment, driven by the `seed` field on each listing. Swap in real photo URLs when you have them — no code changes needed elsewhere.
- **Styling** is plain CSS (no Tailwind/CSS-in-JS) split into `styles/global.css` (design tokens + public site) and `styles/admin.css` (loaded only when the admin portal renders).

## Turning this into a real product

To go from prototype to production you'd want to add:
- A real database (Postgres/Supabase, etc.) and API for listings, so admin changes persist
- Real authentication for the admin portal (sessions, password/OAuth, route protection)
- Image upload/storage (e.g. S3 or Cloudinary) instead of placeholder photos
- A contact-form backend (email or CRM integration) for the buy/sell enquiry forms
- A real map embed (Google Maps/Mapbox) on listing detail pages

Claude Code or Claude Cowork are good next steps for building that backend and wiring it up to this frontend.
