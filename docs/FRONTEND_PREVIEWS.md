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
