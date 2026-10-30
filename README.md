# Al-Manar ERP — المنار للحج والعمرة

Unified web UI (refonte) for the Al-Manar for Hajj & Umrah internal ERP. The legacy system
was nine separate admin programs with inconsistent layouts; this rebuild puts them behind
**one shell** — a login screen, a module launcher (home), and a shared app layout
(dark navy sidebar + sticky top bar + content area) used by every module.

The UI is **Arabic, RTL** (`<html lang="ar" dir="rtl">`) throughout, and follows the existing
brand chart at `https://bpackages.manarumrah.sa/app` — gold `#AD8C52`, Alexandria font,
Kaaba navy background, Al-Manar logo.

## URLs

- **Local dev**: http://localhost:3000 (redirects to `/login`)
- **Login**: `/login`
- **Home (module launcher)**: `/home`
- **Health/API**: `/api/health`, `/api/modules`

Demo credentials: `w.alshammari` / `manar1448` (also `123456`, `demo`).

## Stack

- **Hono** server-side JSX on **Cloudflare Pages** (Workers runtime)
- **Vite** build (`@hono/vite-build/cloudflare-pages`)
- No frontend framework — one progressive-enhancement script (`/static/js/app.js`)
- Fonts: Google Fonts **Alexandria** (UI) + **Tajawal** (numerals, tabular)
- Imagery: Al-Manar logo + Kaaba `bg.jpg` design assets

## Routing model

| Route | Purpose |
|---|---|
| `/` | Redirect → `/home` (authed) or `/login` |
| `GET /login` | Login screen |
| `POST /login` | Validate credentials, set `manar_session` cookie |
| `GET /logout` | Clear session → `/login` |
| `/home` | Module launcher (9 cards) |
| `/:module` | Redirect → `/:module/dash` |
| `/:module/:page` | Module screen inside the app shell |

All `/:module/*` and `/home` routes require the session cookie.

## Modules (9)

| Module | id | Menu pages |
|---|---|---|
| بلاغات الحجاج | `reports` | dash, new, list, sup, perf, pil, lists (+3 children), texts |
| تسجيل الحجاج | `register` | dash, sites, cancel |
| حجاج المنار | `pilgrims` | dash, nusuk (+3), settings (+3), buses (+2), edits (+2), newb |
| الموقع الإلكتروني | `website` | dash (+2), pages (+3), hajj (+2), media (+2), umrah (+2) |
| حلاقة الحجاج | `haircut` | dash, log, links |
| خدمات الحجاج | `services` | dash, catalog, add, settings |
| رسائل الحجاج | `messages` | dash, setup, updates, view, nat, pil, live |
| إدارة المستخدمين | `users` | dash, new, photo |
| المطبوعات | `printing` | dash, tpl, bg, envtpl, env |

Menu items without a bespoke screen fall back to the shared **generic list page**
(search, filter, 6-column table, pager).

## Bespoke screens

1. **Reports dashboard** — 4 KPIs (navy hero), 7-bar day chart (peak bar in gold),
   CSS/SVG donut by category + legend, latest-reports table with priority/status badges.
2. **New report** — 2-column form (pilgrim search, read-only name, category, priority
   segmented, location, committee, description, dashed attachment dropzone) + pilgrim info side card.
3. **Registration announcements** — pinned announcement card with 260px Kaaba header, hero KPI
   (مسجّلون اليوم), sites KPI, previous-announcements list.
4. **Pilgrims** — 4 KPIs + bookings table (checkbox, booking no., pilgrim + national ID,
   nationality, package, camp, bus, status) with live search / package / status filters and pager.
5. **Website slides** — 2-column slide cards with 180px image header, order badge,
   published/hidden state, edit + overflow actions.
6. **Haircut counter** — navy/bg.jpg card with a 128px tabular counter, glass −/gold +
   controls (step-aware, floor 0), live remaining/resolution-rate KPIs, operations log.
7. **Services** — 4 KPIs, status-segmented filter that actually filters the table,
   most-requested gold progress bars.
8. **Messages** — composer with recipients, channel segmented, template select,
   insertable `{variable}` chips, live character/SMS count (70 chars/SMS), live preview
   bubble with substituted sample values, balance rows.
9. **Users** — staff table with avatar, LTR username, role badge, module permission tiles
   (`+N` overflow), last login, active/suspended state.
10. **Printing** — camp/bus filters, card/envelope segmented, row selection that drives the
    "طباعة المحدد (N)" button count, and a CR80 ID-card preview (white logo band,
    84×100 photo frame with gold border, gold footer band).

## Interactions implemented

Fully server-rendered, enhanced by `/static/js/app.js`:

- Login → session cookie → home; logout clears it
- Module switcher dropdown (click-outside + Esc close)
- Sidebar submenus (click to expand, second click navigates; auto-opens on hash match)
- Mobile off-canvas drawer with scrim
- Segmented controls (navy active pill), status segment filters the services table
- Table search + package/status filters, with an empty state when nothing matches
- Top-bar global search mirrors into the page-level table filter
- Select-all / row checkboxes with indeterminate state and live counts
- Haircut counter arithmetic (step, floor 0, live KPI)
- Message variable chips, live counter, template swapping, live preview
- Required-field validation with red border + toast; toasts for all mock actions
- `fadeUp` 300ms entry animation, home cards stagger 30ms

## Data architecture

- **No persistent store yet.** All figures are **mock data** from the design handoff, defined
  in `src/data.ts` (module registry, names, nationalities, packages, status/role enums).
- The design spec calls for these endpoints to be wired to real APIs:
  reports (+stats by day/category), bookings, Nusuk upload status, announcements,
  website slides/pages, services & requests, messages & balance, users & roles, print queue.
- Recommended production storage on Cloudflare: **D1** for relational ERP data,
  **R2** for card backgrounds / slide imagery / attachments.

## Project layout

```
src/
├── index.tsx              # Hono app: auth, routing, screen registry
├── data.ts                # Module registry + menu trees + mock constants
├── components/
│   ├── icons.tsx          # 60-path inline SVG stroke set (24px, 1.6 stroke)
│   ├── ui.tsx             # Kpi, Donut, Bars, Pager, Who, Badge, PageHead, GenericPage
│   └── shell.tsx          # Login, Home, Sidebar, AppLayout, Logo
└── screens/
    ├── screens-a.tsx      # reports (dash/new), register, pilgrims, website, haircut
    └── screens-b.tsx      # services, messages, users, printing
public/static/
├── css/app.css            # Design tokens + components + responsive rules
├── js/app.js              # Progressive-enhancement interactions
└── img/                   # logo-manar.png, bg.jpg
```

## Design tokens

| Token | Hex | Use |
|---|---|---|
| navy-900 | `#061B3D` | sidebar, dark surfaces |
| navy-800 | `#0A2A5A` | hero KPI, chart bars, active segment |
| navy-700 / 600 | `#123A72` / `#1D4C8C` | navy hover / chart secondary |
| navy-50 | `#EEF2F8` | preview panel |
| **gold** | **`#AD8C52`** | brand primary |
| gold-600 / 700 | `#967641` / `#7A5F33` | hover / text on light |
| gold-300 / 100 / 50 | `#D6C29E` / `#F3ECDF` / `#FAF7F1` | borders / tiles+avatars / table header |
| ink / ink-2 | `#141B2B` / `#3B4254` | primary / secondary text |
| muted / muted-2 | `#6D717F` / `#9AA0AC` | text |
| line / line-2 / bg | `#E8E4DA` / `#F0EDE6` / `#F6F4EF` | borders / dividers / canvas |
| ok / warn / bad / info | `#2F8A5B` / `#B7791F` / `#C0392B` / `#1D4C8C` | status |

Base font 14px. Radii 7–18px (badges pill). Shadows: `0 1px 2px/0 2px 8px rgba(10,42,90,.04)`
and `0 8px 30px rgba(6,27,61,.10)`.

## Responsive

Designed for desktop ≥1280px. KPI grid → 2 cols ≤1400px; home grid → 2 cols and login art
hidden ≤1100px; sidebar → off-canvas drawer <1024px; single-column grids ≤720px.
Verified: no horizontal overflow at 390px.

## Deployment

- **Platform**: Cloudflare Pages (Workers runtime, `dist/_worker.js`)
- **Status**: ✅ Built and verified locally on port 3000
- **Build**: `npm run build` → `dist/`
- **Run**: `pm2 start ecosystem.config.cjs` (`wrangler pages dev dist --port 3000`)
- **Deploy**: `npm run build && wrangler pages deploy dist`

## Not yet implemented

- Real APIs / D1 schema — every number is handoff mock data
- Auth is a demo cookie check, not a real identity provider
- Excel export, printing to a physical device, and SMS/WhatsApp sending are mocked toasts
- Attachment uploads are not persisted
- Counter is not yet broadcast to the public pilgrim link (spec asks for websocket/realtime)
- Role-based module visibility is displayed in the Users screen but not enforced on navigation
