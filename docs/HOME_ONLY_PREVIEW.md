# Client preview

The active app now shows Home (`/`), My Work (`/work`) and Artwork (`/artwork`). Both desktop and mobile navigation and the footer expose these three pages.

Home retains all its existing sections. Explore My Work and Explore all work open My Work; Enter the gallery opens Artwork. Cards remain non-navigation previews because individual book, chapter, artwork and project detail pages are still paused. The artwork contact invitation points to the footer socials.

Search and category filters operate on the local sample content. The loader replays when the pathname changes, but not when changing filters. The shared theme toggle and sword cursor remain available.

All other URLs redirect to Home, including About, Contact, login, studio and error previews. Full-site source is preserved in `src/FullSiteApp.jsx`. To restore it, replace `src/App.jsx` with:

```jsx
export { default } from './FullSiteApp';
```

This is a frontend preview, not server-side access control. The earlier home-page design Word document describes the previous home-only review stage. Current client-facing descriptions for this release are in `docs/client/Work_and_Artwork_Preview.md`.
