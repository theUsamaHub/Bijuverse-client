# Home-only client preview

The active entry is `src/App.jsx`. It shows the existing hero, loader, theme toggle, social links and footer. The hero button scrolls to the featured book section. The original work, artwork, about and contact-invitation sections remain on Home; their links to unavailable pages are hidden. The contact invitation points to the footer socials. Desktop and mobile menus only show Home.

All other URLs redirect to `/`, including the work, artwork, about, contact, login, studio and error-preview URLs. Book and artwork cards remain visible as non-navigation previews.

The previous app is preserved in `src/FullSiteApp.jsx`; its import is commented out in the active entry. All page and admin source files remain intact. They are not imported into this preview build. This is a presentation change, not server-side access control.

To restore the full website, replace the contents of `src/App.jsx` with:

```jsx
export { default } from './FullSiteApp';
```

The sword cursor uses a small SVG and a short gold trail, with no additional packages. It only activates for a mouse on a fine-pointer device. Reduced-motion preferences disable the trail; text fields keep the normal cursor. Its tip follows the exact pointer position and its overlay never captures clicks.
