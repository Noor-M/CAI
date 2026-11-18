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
3. European Forum Alpbach (Seminar Week, Conference Week, Fireside Chats)
4. Inspiration for the brand identity: Tigris & Euphrates and values (Trust, One Piece)
5. Scholarship path
6. Board
7. Contact and socials
8. Footer

## Events

The site has two kinds of page:
- **Home (`/`)**: all the sections described above.
- **Events (`/events`)**: a list of events. Clicking an event opens its own page at `/events/<id>`, with the details and an RSVP form.

Events are listed in `events` in `src/content.js`. To add one, copy the existing entry and change its `id`, text, dates and RSVP settings. Each event moves through three stages based on its dates:
- **Upcoming:** the RSVP form is open.
- **RSVP closed:** after `rsvpClosesAt`, the form is replaced with a "closed" message.
- **Past event:** after `endsAt`, the event moves to "Past events".

### RSVP and Google Sheets

The CAI Alumni Gathering 2026 RSVP form sends replies to the **CAI Gathering 26 RSVP** Google Sheet. It goes through a Google Apps Script web app that runs under the club.iraq@alpbach.network account. The script's code is in [`google-apps-script/rsvp.gs`](google-apps-script/rsvp.gs), and its URL is in `rsvp.endpoint` for the event (or in `VITE_RSVP_ENDPOINT`). Each reply is added as a row on the sheet's `RSVPs` tab.

If you change the script, choose **Deploy → Manage deployments → Edit → Version: New version** in Apps Script. That keeps the same URL, so the website doesn't need updating.

## Deploy

The site is hosted on Vercel (project `cai`). Vercel builds and publishes it automatically whenever new code is pushed to the production branch. Change the production branch under **Vercel → cai → Settings → Git**.

`vercel.json` sends every route to `index.html`, so links such as `/events/alumni-gathering-2026` load directly. Any other host needs the same single-page-app fallback.
