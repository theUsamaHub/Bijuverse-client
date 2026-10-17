# Admin frontend preview

Implemented 2026-10-17 on `codex/admin-panel`.

## Routes
Base path: `/studio`. Login preview: `/studio-access`, with a separate link into the admin design (no credentials required for the preview).

| Route | Screen |
| --- | --- |
| /studio | Dashboard: sample content totals, book shortcuts, moderation/inbox counts, session activity |
| /studio/books | Book list, search, status filter, archive/restore |
| /studio/books/new | New book form |
| /studio/books/:id | Book metadata, cover selection, visibility and display order |
| /studio/books/:bookId/chapters | Add, archive/restore and reorder chapters |
| /studio/books/:bookId/chapters/:id | Tiptap writing desk, draft saves, image picker, reading preview and publish-preview snapshot |
| /studio/artworks | Artwork list; /new and /:id forms with ordered multi-image selection |
| /studio/projects | Project list; /new and /:id forms with cover and optional HTTPS video URL |
| /studio/media | Local image preview library, multi-file selection, metadata and alt-text editing |
| /studio/comments | Shared item-specific comment moderation, search and status filters |
| /studio/inbox | Sample contact messages; read, replied, archive and restore states |
| /studio/profile | Public About content and portrait editor, separate from the admin account |
| /studio/socials | 15 platform choices + Other; matching icons, URLs, placement flags, order and active status |
| /studio/seo | Search/share title, descriptions, OG media, canonical URL and noindex for main public pages |
| /studio/analytics | Honest empty analytics state and period selector; no invented visitor numbers |
| /studio/settings | Account and security design; real credential changes deliberately unavailable |

Sample writing desk: `/studio/books/book-embers/chapters/chapter-dawn`.

## What works in the preview
- All preview data lives in a React provider shared across admin routes. Reloading or leaving the admin app resets it. No localStorage, cookies, APIs, authentication or database writes.
- Public fixtures are cloned. Saving/publishing/moderating in the admin does not change public pages.
- Book/artwork/project forms validate titles and duplicate slugs; published slugs remain fixed. Content is archived, not destroyed. Reordering chapters changes sort_order, not chapter_number.
- Tiptap v3: paragraphs, H2/H3, bold, italic, underline, strike, lists, blockquotes, scene breaks, links, alignment, undo/redo. Multiple images insert at the cursor; selecting an image exposes alt text, caption, width and alignment. Images can be dragged between blocks.
- The draft title/document auto-save in memory after a short pause; navigation flushes the latest draft. Explicit Publish preview copies a separate snapshot. Missing media blocks preview publication. Backend validation and concurrency are not simulated.
- The chapter reading preview uses the same editor schema in read-only mode with an optional phone-width sheet. Final integration with the public renderer must cover text alignment and any extra editor nodes before production publishing is enabled.
- Image additions use browser blob URLs, accept JPEG/PNG/WebP, check 10 MB and 25 megapixel limits, and show errors for rejected files. No uploads leave the device. Blob URLs are revoked on leaving the admin app; serialized chapter documents keep media IDs rather than blob URLs.
- Comments and contacts are explicitly labeled sample data. Mark replied only changes status; it sends no email. No visitor data is collected.
- No admin self-delete or registration controls exist. Account/security controls explain the pending backend connection.

## Still required before production
Server-side authentication and authorization; generic 404 handling for unauthorized admin requests; sessions/recovery; API and database integration; real storage/media authorization; schema validation and sanitization; draft concurrency checks; publication and media-reference transactions; contact delivery/spam controls; comment moderation API; real analytics; SEO rendering on the server. The route name is not security.

## Verification
- `npm run lint`
- `npm run build` (admin and Tiptap are lazy-loaded separately; the existing public entry still has a size warning around 509 kB)
- `node --test tests/*.test.js`: five tests pass, including draft/published isolation and removal of temporary image URLs from stored editor JSON.
- Browser: create/save book and chapter, multi-image insertion, caption/width controls, preview publication, platform icon selection, approval count update, inbox read/replied, mobile navigation, dashboard/inbox at 390px without horizontal overflow.
- `npm audit fix` applied compatible transitive fixes to brace-expansion and source-map-js. Audit reports zero vulnerabilities.

Editor references: https://tiptap.dev/docs/editor/getting-started/install/react and https://tiptap.dev/docs/editor/extensions/functionality/starterkit . Only open-source editor packages are used; no paid editor service.
