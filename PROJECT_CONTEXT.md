# The Bijuverse — Project Context

## Client & Deal
- Client found via Discord client hunting.
- Anime-inspired  portfolio/Business website for the client's creative work.


## Stack
- **Frontend:** React (fresh project already created), building this first.
- **Backend:** Laravel (11/12/13 — not yet decided, doesn't matter which), built later. Not being worked on yet.

- Animation library: **GSAP** (plus other modern libraries as needed).

## Site Structure (from proposal)
- Navigation Bar
- Hero Section
- Projects Showcase with Video Popup
- Social Links
- Contact Form
- Public Reviews Section (visitor-submitted, admin-approved)
- Per-Artwork View Counter

## Admin Panel (for later, backend phase)
- Secure admin login with custom/configurable routes (not default paths)
- Manage Projects (add/edit/remove artwork/videos)
- Manage Contacts (view/respond to messages)
- Manage Social Links
- Approve/reject Reviews
- Analytics dashboard (total + per-artwork views)

## Theme & Style — "Electric Chakra Mode"
- Inspired by Naruto's Chakra Mode: **yellow & black**, anime-driven identity, chosen because the client is really into anime.
- **UI style:** Modern, **glassmorphism**, fully responsive.
- **Interactivity:** dark/light mode toggle, custom cursor, smooth motion animations, hover glow + underline effects on nav links — must feel "awesome," not generic.
- Design direction: whole site should read as anime-styled, not just accent-colored — colors, motion, and type all reinforce it.
- No client logo yet — using a styled **text logo** (wordmark) for now.

### Color Palette (base)
| Color | Hex |
|---|---|
| Black | `#000000` |
| Gold | `#FFD60A` |
| Yellow | `#FFEA00` |
| Orange-red | `#FF3D00` |
| Near-black gray | `#1A1A1A` |

Full expanded palette (tints/shades + neutral gray scale + dark/light semantic tokens) lives in `tokens.css` / `design-tokens.md`.

### Typography
- **Display / headings / logo:** Rajdhani — angular, energetic, anime-poster feel.
- **Body / UI text:** Manrope — clean, legible, doesn't compete with display type.

### Signature design moment
- Chakra-gradient (gold → orange) glow underline on nav link hover, animated via GSAP.
- Slow idle gradient shimmer on the logo wordmark.
- Chakra-gradient hairline border on the navbar that only appears once the page is scrolled (kept as a single deliberate effect rather than glowing everything).

## Progress So Far
- ✅ Design tokens system built (`tokens.css`, documented in `design-tokens.md`)
- ✅ Navbar component built (`Navbar.jsx` + `Navbar.css`): glass, sticky, GSAP hover glow/underline, dark/light toggle, mobile menu with staggered entrance, text logo, social icons (placeholder links)
- ⬜ Hero Section — not started
- ⬜ Projects Showcase (with video popup) — not started
- ⬜ Reviews Section — not started
- ⬜ Contact Form — not started
- ⬜ Custom cursor — not started
- ⬜ Backend (Laravel) — not started, deliberately deferred

## Open Items / To Confirm With Client
- Final nav link list (currently placeholder: Home, My Projects, Reviews, Contact)
- Real social media URLs (currently placeholder links)
- Whether/when a real logo (vs. text wordmark) will be provided
