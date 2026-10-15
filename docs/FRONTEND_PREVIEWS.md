# Frontend content, access, and error previews

Implemented on branch `codex/content-login-error-ui` against `docs/DATABASE_PLAN.md`.

## Preview routes

| Route | Experience |
| --- | --- |
| `/work` | Combined collection of separate books, artworks, and projects |
| `/books/house-of-the-whirlpool` | Client book overview; chapters awaiting content |
| `/books/beyond-the-ember-gate` | Labeled original sample book with two published chapters |
| `/books/beyond-the-ember-gate/chapters/the-last-light` | Reader with multiple positioned images and formatting |
| `/artwork/chakra-study` | Artwork with two images, lightbox, and item comments |
| `/projects/motion-study` | Project details, pending-video state, and item comments |
| `/studio-access` | Animated sample admin login; no public menu link |
| `/studio-access/recovery` | Matching email recovery sample |
| `/preview/errors/403`, `/404`, `/500`, `/503` (each under `/preview/errors`) | Forbidden, not found, server error, maintenance designs |
| Any unmatched route or missing public content | Styled 404 |

Old `/work/:slug` links redirect to canonical content routes.

## Database alignment

`src/data/portfolio.js` has separate books, chapters, mediaAssets, artworks, artworkMedia, projects, reviews, socialPlatforms, and socialLinks fixtures. Readable IDs stand in for database UUIDs. `workItems` is a presentation adapter, not a second database table. Chapters read the published snapshot only and require a published parent. A hidden draft fixture exercises visibility filtering.

One `ItemReviews` component builds book_id/artwork_id/project_id payloads with exactly one target. Pending submissions are demo receipts in component memory; they never enter the public list and disappear on navigation/reload. There are no fabricated visitor testimonials. Optional ratings exclude unrated comments from averages. The backend must enforce validation, target publication, moderation, rate limits, and pagination.

The social catalog contains 15 common platforms plus Other. Navbar and footer filter active links using their individual placement flags. Platform keys map to icons; unknown keys use the generic link icon. Discord is deliberately inactive until an official URL is supplied. There is no admin social editor yet.

## Server integration boundary

- Login/recovery validate sample inputs and simulate a short submitting state. They make no network request and do not save credentials or create sessions. Password fields clear after preview submission.
- `src/config/routes.js` centralizes preview paths. These are not secret or protected just because they lack menu links. Replace route configuration and enforce real authentication, singleton admin, session cookies, recovery, and authorization on the server.
- No registration or user-deletion screens exist.
- Error designs are reusable visual states. Vite SPA fallback still returns HTML with HTTP 200; the future server must emit actual 403/404/500/503 statuses. Admin unauthorized requests should use the agreed generic 404 behavior, not expose a login redirect. The 403 design can be used for other forbidden content.
- `ErrorBoundary` presents the 500 design for route-render failures. Future request handlers must map API/network errors explicitly; React boundaries do not catch every asynchronous failure.
- Real 503 pages should support server Retry-After behavior. Error and access samples include noindex metadata and are not linked in public navigation.
- The sample chapter renderer allowlists document nodes, text marks, links, and image presentation. This is not the Tiptap authoring editor or an upload pipeline. Implement those in the admin content module and validate the schema on the server.
- Original SVG illustrations in public/demo are authored preview assets; this does not enable SVG uploads from users.

## Verification

- `npm run build`
- `npm run lint`
- `node --test tests/catalog.test.js`: publication filtering, hidden parent protection, review target isolation, media/parent references, canonical route uniqueness.
- Browser checks: login required-field errors, password visibility, demo submission, recovery navigation, book comments validation/pending receipt, reader text-size controls, two inline images, phone-width/light-mode layout, artwork lightbox navigation, error layouts.

No new packages were installed. Existing React Hook Form, React Icons, React Router, and Yet Another React Lightbox are reused.

## Artwork, About, and Contact modules — 2026-10-15
- `/artwork`: published artwork listing, category/search URL state, reset/empty state, links to series details/lightbox/comments.
- `/about`: sample public biography, decorative portrait placeholder, interests, social links, and links to creative work. Profile fixture is separate from the private admin account; editing via admin remains future work.
- `/contact`: validated name/email/subject/message form with counter, submitting and preview-receipt states. Does not send/store messages or claim delivery.
- Home: artwork preview, About introduction, and contact invitation. Navbar/footer include all new pages; mobile menu breakpoint widened for the longer navigation.
- Sample illustrations remain clearly labeled. Replace biography, portrait, artwork, and official social URLs with client content before launch.
- Verified this module with lint, production build, catalog tests, gallery category/search/reset states, contact required/invalid-email validation and preview receipt, mobile navigation, and 390px/1440px layout checks.

## Remaining modules / integration
1. Admin dashboard and real login/recovery/session enforcement.
2. Content management for books, chapters (Tiptap editor and image uploads), artwork/projects, About/profile, and social links.
3. Contact storage, spam protection, email notifications, inbox and replies.
4. Review submission storage and approval/rejection moderation.
5. Real project videos, client artwork/biography, social URLs, and chapter content.
6. View analytics, admin-editable SEO, server-rendered share metadata, robots.txt and sitemap.
7. Final accessibility/performance/browser checks and deployment/server status mapping. Custom cursor remains optional pending implementation.
