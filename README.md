# Club Alpbach Iraq: website

A one-page portfolio site for **Club Alpbach Iraq (CAI)**, the Iraqi chapter of the Forum Alpbach Network. It is built with React and Vite.

The design follows the CAI brand kit (roll-up, PowerPoint, letterhead and certificate):
- the Dijla & Furat globe
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

Brand images are in `public/brand/`. They were taken from the CAI brand files: `logo-full.png`, `globe.png`, `dijla-furat-map.png` and the two Alpbach photos.

## Sections

1. Hero
2. About
3. European Forum Alpbach (seminars, symposia, fireside chats)
4. Inspiration for the brand identity: Dijla & Furat and values (Trust, One Piece)
5. Scholarship path
6. Board
7. Contact and socials
8. Footer

## Deploy

`.github/workflows/deploy.yml` builds the site and publishes it to GitHub Pages on every push to `main`. To turn it on, go to the repository's **Settings → Pages** and set **Source** to **GitHub Actions**. Asset paths are relative (`base: './'`), so the build also works on any static host such as Netlify or Vercel.
