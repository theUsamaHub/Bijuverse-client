# The Bijuverse — Design Tokens

Source palette: "Electric Chakra Mode" (`#000000`, `#FFD60A`, `#FFEA00`, `#FF3D00`, `#1A1A1A`), expanded into full scales so every future component has a consistent color to reach for instead of picking one-off hex values.

## Chakra Gold
| Token | Hex | Use |
|---|---|---|
| gold-50 | `#FFFBEA` | lightest tint, rarely used directly |
| gold-100 | `#FFF3B0` | subtle highlight backgrounds |
| gold-200 | `#FFEA6B` | hover backgrounds on light surfaces |
| gold-300 | `#FFEA00` | **brand base** — bright yellow |
| gold-400 | `#FFD60A` | **brand base** — gold, primary accent |
| gold-500 | `#F2C200` | pressed/active state |
| gold-600 | `#D9A600` | text-on-light accent (AA contrast) |
| gold-700 | `#B38200` | darker accent text |
| gold-800 | `#8C6400` | rarely used |
| gold-900 | `#664700` | rarely used |

## Chakra Orange
| Token | Hex | Use |
|---|---|---|
| orange-50 | `#FFF1EB` | lightest tint |
| orange-100 | `#FFD2C0` | subtle backgrounds |
| orange-200 | `#FFA680` | hover backgrounds |
| orange-300 | `#FF6B3D` | secondary accent, lighter |
| orange-400 | `#FF3D00` | **brand base** — secondary accent |
| orange-500 | `#E63600` | pressed/active state |
| orange-600 | `#C22D00` | text-on-light accent |
| orange-700 | `#992400` | darker accent text |
| orange-800 | `#701A00` | rarely used |
| orange-900 | `#4D1200` | rarely used |

## Void (neutrals)
Anchored on the two brand darks so grays feel native to the palette rather than a generic gray scale.

| Token | Hex | Use |
|---|---|---|
| void-0 | `#000000` | **brand base** — true black |
| void-50 | `#0D0D0D` | dark-mode surface base |
| void-100 | `#1A1A1A` | **brand base** — dark-mode panels |
| void-200 | `#262626` | dark-mode borders / dividers |
| void-300 | `#333333` | dark-mode raised surfaces |
| void-400 | `#4D4D4D` | light-mode secondary text |
| void-500 | `#6B6B6B` | mid gray, muted text |
| void-600 | `#8C8C8C` | disabled states |
| void-700 | `#ADADAD` | dark-mode secondary text |
| void-800 | `#CFCFCF` | light-mode borders |
| void-900 | `#E8E8E8` | light-mode subtle backgrounds |
| void-1000 | `#FFFFFF` | pure white |

## Semantic roles
| Role | Dark mode | Light mode |
|---|---|---|
| Background | void-0 | `#F7F5F0` (soft warm white, not pure `#FFFFFF`, so glow accents don't look harsh) |
| Surface (glass) | `rgba(26,26,26,0.55)` | `rgba(247,245,240,0.6)` |
| Text primary | void-1000 | void-0 |
| Text secondary | void-700 | void-400 |
| Border | `rgba(255,255,255,0.08)` | `rgba(0,0,0,0.08)` |
| Accent primary | gold-400 | gold-400 |
| Accent secondary | orange-400 | orange-400 |

Accent hues stay constant across themes — only backgrounds, text, and borders flip. This keeps the brand recognizable in both modes instead of two different-feeling palettes.

## Typography
- **Display / headings / logo:** Rajdhani (700) — angular, energetic, reads as "shonen poster" without being cartoonish.
- **Body / UI text:** Manrope (400/600) — clean and legible so it doesn't compete with the display face.

## Files
- `tokens.css` — the CSS custom properties implementing this table.
- `Navbar.jsx` / `Navbar.css` — first component built on these tokens.
