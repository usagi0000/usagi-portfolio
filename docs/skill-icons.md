# Skill icon direction

The HTML and CSS direction is approved. The complete skills section now uses the same SVG illustration language for all 29 skills.

## Design references

The source review covers both route templates, all shared visual components, the global stylesheet, theme handling, scroll reveals, and the mini-game drawing palettes. Generated video projects are outside the website design scope.

The website uses warm paper, pastel accents, rounded surfaces, and soft shadows. Its illustrations use dark plum outlines, round stroke caps and joins, smiling faces, pink cheeks, and small sparkles. The new skill icons follow those illustration conventions within the existing skill tags.

The global theme values are defined at the start of `app/globals.css`:

| Token | Light | Dark |
| --- | --- | --- |
| `--ink` | `#30253a` | `#fbf5ff` |
| `--muted` | `#766b80` | `#c4b8ce` |
| `--paper` | `#fbf8f5` | `#1c1723` |
| `--surface` | `#fffefa` | `#282131` |
| `--surface-soft` | `#f5eff9` | `#342a3e` |
| `--line` | `#e8dfe9` | `#493c55` |
| `--pink` | `#f3a6bd` | `#e58eac` |
| `--pink-deep` | `#c95883` | `#ffb5cc` |
| `--butter` | `#f7df86` | `#f4d879` |
| `--mint` | `#c9e9de` | `#9acfc0` |
| `--lilac` | `#ddd0f4` | `#b9a2db` |
| `--shadow` | `0 18px 55px rgba(62, 39, 73, .10)` | `0 18px 55px rgba(0, 0, 0, .25)` |
| `--radius` | `28px` | Inherits `28px` |
| `--header` | `rgba(255, 254, 250, .88)` | `rgba(31, 25, 39, .9)` |

Typography uses `ui-rounded`, SF Pro Rounded, Segoe UI, and system fallbacks. Georgia provides selected display accents. Component rules define type sizes and spacing directly: the skill tags use `.9rem` text, weight `750`, a `10px` internal gap, and a `16px` corner radius. The skill grid wraps with an `11px` gap. The existing illustration sprite uses a 64 × 64 viewBox, mainly 3-unit outlines, and round caps or joins. Responsive rules adjust layouts at 980, 760, 560, and 480 pixels. Theme values, SVG colors, and component values were reviewed separately because the illustration colors intentionally remain fixed.

| Reference | Existing value | Use in the icons |
| --- | --- | --- |
| Illustration ink / light `--ink` | `#30253a` | Sticker outline and HTML face |
| Light `--surface` | `#fffefa` | Cream sticker border and light details |
| Light `--pink` | `#f3a6bd` | Cheeks and accent dot |
| Light `--butter` | `#f7df86` | Sparkle |
| Light `--lilac` | `#ddd0f4` | Existing surrounding palette |

These are fixed illustration colors, like the existing SVG doodles. The dark theme changes the surrounding surfaces and text while the icon identities stay stable. Brand colors remain recognizable alongside the pastel decorations. Typography, tag borders, spacing, and hover behavior continue to use the existing website styles. Icon hover follows the same small rotation as the original markers, and the global reduced-motion rule disables its transition. Long skill labels can wrap within the tag on narrow screens.

The standalone SVGs use a 64 × 64 viewBox and render at 36 × 36 pixels inside the skill tags. They contain paths and simple shapes, with no scripts, remote resources, embedded fonts, or image filters. The nearby text names each skill, so the images use empty alternative text in the page.

## Identity references

HTML retains the orange shield, two orange tones, and white 5. The numeral is repositioned to leave space for the face. Source: [HTML5 Logo by W3C](https://www.w3.org/html/logo/), licensed [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/). The custom adaptation adds a sticker border, face, and sparkle. Attribution is also embedded in the SVG metadata.

CSS uses the current purple tile rather than the earlier blue CSS3 shield. It retains `rebeccapurple` (`#663399`), the asymmetric corner shape, and the original white letter paths. Source: [CSS-Next logo](https://github.com/CSS-Next/logo.css), released under [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/). The cream sticker border and face make this a custom portfolio adaptation.

The remaining branded icons are custom redraws based on recognizable colors and marks. Faces stay clear of important logo geometry; they are omitted where they would obscure the mark. React Native adds a phone around the atom. Shopify theme and app development add a layout card and a code tile, respectively. Liquid uses an original droplet and template-code motif. The generic design, drawing, mobile, modeling, rendering, and image-processing skills use original illustrations rather than invented brand marks.

Brand references:

- [JavaScript community logo](https://github.com/voodootikigod/logo.js)
- [TypeScript branding](https://www.typescriptlang.org/branding/)
- [React](https://react.dev/) and [React Native](https://reactnative.dev/)
- [Next.js brand mark from Vercel](https://vercel.com/geist/brands)
- [Python logo](https://www.python.org/community/logos/)
- [PHP logo by Colin Viebrock](https://www.php.net/download-logos.php), with the adapted SVG carrying the CC BY-SA 4.0 source attribution
- [Shopify brand assets](https://www.shopify.com/brand-assets)
- [Figma brand resources](https://www.figma.com/brand/)
- [Blender logo](https://www.blender.org/about/logo/)
- [Microsoft Word](https://www.microsoft.com/en-us/microsoft-365/word), [PowerPoint](https://www.microsoft.com/en-us/microsoft-365/powerpoint), and [Excel](https://www.microsoft.com/en-us/microsoft-365/excel)

## Content changes

The skill list lives in `lib/skill-data.ts`, with one label and matching SVG filename per item. The page renders the list through the existing skill-tag pattern.

Dawn Theme and Metafields are removed from the skill lists. Shopify Theme Development and Shopify App Development are added, alongside TypeScript, React, Next.js, React Native, Mobile App Development, and Drawing. The storefront project sidebar also drops the two removed tags and retains Shopify Theme Development. Project descriptions retain factual references to the technologies used in that project.

Language ratings are English 6/6, French 5/6, and Japanese 3/6. Arabic remains 6/6. The visible hearts, accessible labels, and screen-reader text agree. The section subtitle is now “Languages I speak and study.”

## Review criteria

- The skill remains recognizable before reading its label.
- The mark and face remain legible at the actual tag size.
- The decoration fits the existing illustrations without dominating the skill section.
- All icons work on light and dark surfaces and in the mobile layout.

## Verification

- Skill labels and image coverage: CORRECT. The browser DOM contains 29 skill tags and 29 loaded decorative images, with no remaining star markers. Counting uses `#skills .skill-tag`, `#skills .skill-icon`, and `#skills .skill-dot`. The total is re-derived from the original 23 labels, removing two and adding eight.
- Responsive layout: CORRECT. The browser checks all skills on light and dark themes at viewport widths of 1440, 760, 390, and 320 pixels. All images render at 36 × 36 pixels, and neither tags nor labels overflow.
- Language ratings: CORRECT. The browser counts filled and empty hearts for every language and compares them with both accessible text representations.
- SVG structure: CORRECT. All 29 files parse as XML with a 64 × 64 viewBox, title, and description. A focused XML check finds no script, text, image, filter, foreignObject, or event-handler attributes.
- Motion: CORRECT. Hover rotation works, and the global reduced-motion rule reduces the icon transition to `0.01ms`.
- Changed-code TypeScript and lint: CORRECT. `npm run typecheck` and `npx eslint components/home-sections.tsx lib/skill-data.ts lib/project-data.ts` pass. The old apostrophe lint error is fixed with an entity, without changing the displayed sentence.
- Production build: CORRECT. `npm run build` passes, including TypeScript validation and generation of all ten static pages.

Browser evidence is saved in `C:/Users/nasyk/.codex/visualizations/2026/10/03/01a10147-bf23-7ef1-9018-e9451aee9162/all-skills-checks.json`, alongside `review-all-skills.mjs`, contact sheets, and screenshots of the actual skills and language sections. The independent SVG review is recorded in `independent-icon-review.cjs` and `independent-icons-all.png` in the same directory.
