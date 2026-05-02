# Thiệp mời cưới — Next.js wedding-invite template

A single-page Vietnamese wedding invitation template built with **Next.js 14
(App Router) + Tailwind CSS + Framer Motion**, modelled on the layout pattern
of common single-page wedding cards.

> **Important — replace placeholder assets before going live.**
> The `src/lib/config.ts` file currently points to image / audio URLs hosted
> on a third-party CDN (`img.cinelove.me`, `assets.cinelove.me`). They are
> only there so you can preview the layout. They belong to the people in the
> sample photos, not to you — you must swap them with your own photos and
> music before publishing or sharing the site publicly.

## Sections

- **Hero** — envelope with wax seal that flips open on tap; photo card slides
  out and a flurry of red hearts bursts upward.
- **Countdown** — live "days / hours / minutes / seconds" timer overlaid on a
  full-bleed couple photo.
- **Invitation** — "INVITATION" label with an underline-grow animation and a
  3-paragraph greeting block.
- **Lễ Thành Hôn** — couple full names in calligraphy, Nhà Trai / Nhà Gái card.
- **Tiệc Mừng Lễ Thành Hôn** — date, venue, schedule, embedded Google Map.
- **Marry Me?** — "MARRY ME?" headline with side photo + "YES! I DO".
- **About Us** — bride / groom portraits with rotated labels.
- **Save the Date** — calendar + photo + a vertical year ribbon.
- **Gallery** — vertical Dancing-Script calligraphy ("Nice / to meet / you forever").
- **RSVP** — name, attendance radio, headcount, blessing, submit button.
- **Hộp quà cưới** — gift section. Tapping the gift box opens a modal with
  live VietQR-generated QR codes for both bank accounts.
- **Thank You** — couple silhouette + "Thank you" calligraphy.

## Animations

All animations are implemented from scratch using either CSS keyframes
(`src/app/globals.css`) or Framer Motion (`src/components/ui/SectionReveal.tsx`):

| Animation | Implementation |
|-----------|----------------|
| Loading splash with spinning 囍 | CSS `happiness-spin` |
| Envelope flap opening | CSS `flap-open` (`rotateX(0 → -185°)`) |
| Photo card sliding out | CSS `letter-rise` (`translateY 0 → -95%`) |
| Heart burst | CSS `heart-float` × 8 hearts with custom `--dx-start/--dx-end` |
| Floating heart-petal background | CSS `petal-drift` × 18 hearts |
| Section reveal on scroll | Framer Motion `whileInView` |
| Underline draw | CSS `underline-grow` (scaleX) |
| Audio-icon spin while playing | CSS `slow-spin` + `pulse-ring` |
| Stamp wobble (Save the Date) | CSS `stamp-rotate` |
| Calligraphy "hand-write" | CSS `clip-path` + `hand-write-in` |
| Auto-scroll | RAF loop in `AutoScroll.tsx` |
| Gift modal | Framer Motion `AnimatePresence` |

## How to customise

1. **Couple, date, venue, family** — edit `src/lib/config.ts`.
2. **Replace photos** — change the URLs in the `photos`, `couple.groom.portrait`,
   `couple.bride.portrait` and `audio.src` keys of `config.ts`. Whitelist new
   image domains in `next.config.mjs > images.remotePatterns`.
3. **Add per-guest invitations** — edit `src/lib/guests.ts`. Each entry is keyed
   by the slug used in `/invite/<slug>` and contains the greeting + display
   name. Unknown slugs fall back to a default greeting.
4. **Change colours / fonts** — `src/app/globals.css`. The theme is driven by
   CSS custom properties (`--bg`, `--primary`, `--accent`, `--text`).
5. **Bank account QR codes** — `config.gifts.accounts`. The QR is generated
   live by [VietQR](https://vietqr.io); the `vietQRSrc()` helper in
   `src/components/sections/Gift.tsx` maps common Vietnamese bank names to
   their VietQR short codes.

## Running locally

```bash
npm install
npm run dev   # http://localhost:3000
```

## Producing a static build

```bash
npm run build           # creates out/
```

The `out/` directory is fully static and can be hosted on any static-file
host (Vercel, Netlify, Cloudflare Pages, GitHub Pages, S3 + CloudFront, etc.).

## URL routing

- `/` — generic invitation. Optional query params:
    - `?g=<slug>` — look up greeting + name in `guests.ts`.
    - `?name=Some%20Name` — override the displayed guest name.
    - `?greeting=Thân%20mời` — override the greeting line.
- `/invite/<slug>/` — same content but the slug is part of the URL. Each
  slug listed in `guests.ts` is statically generated at build time.

## License

Code in this repository is original to this project and licensed MIT.
**Sample photos and audio are NOT included** — replace the placeholder URLs
with your own assets before publishing.
