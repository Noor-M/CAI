# Club Alpbach Iraq: website

A one-page portfolio site for **Club Alpbach Iraq (CAI)**, the Iraqi chapter of the Forum Alpbach Network. It is built with React and Vite.

The design follows the CAI brand kit (roll-up, PowerPoint, letterhead and certificate):
- the Tigris & Euphrates globe
- blue `#557FBF`, black type and the grey `#E6E6E6`
- the red-square callouts

The page structure is modelled on [club-alpbach.at/forum](https://www.club-alpbach.at/forum).

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build   # output in dist/
npm run preview
```

## Editing content

All text, links and board members are in [`src/content.js`](src/content.js):
- **Board**: edit the `team` array.
- **Testimonials**: add quotes to `testimonials`. The "Voices" section shows up once the array has at least one entry.
- **Links and email**: edit `links`.

Brand images are in `public/brand/`. They were taken from the CAI brand files: `logo-full.png`, `globe.png`, `tigris-euphrates-map.png` and the two Alpbach photos.

## Sections

1. Hero
2. About
3. European Forum Alpbach (seminars, symposia, fireside chats)
4. Inspiration for the brand identity: Tigris & Euphrates and values (Trust, One Piece)
5. Scholarship path
6. Board
7. Contact and socials
8. Footer

## Deploy

The site is hosted on Vercel (project `cai`). Vercel builds and publishes it automatically whenever new code is pushed to the production branch. Change the production branch under **Vercel → cai → Settings → Git**.

Asset paths are relative (`base: './'`), so the build also works on any other static host.
