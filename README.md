# A digital edition of Samra Mustafa's novel

A frontend-only React + Vite site: home page, episode library with search, a long-form
reader, English / Urdu interface, and WhatsApp PDF inquiries. No backend, database or payments.

## Run it

```bash
npm install
npm run dev        # open the address it prints (usually http://localhost:5173)
```

## Build for deployment

```bash
npm run build      # creates the dist/ folder
npm run preview    # optional: test the built site locally
```

Upload `dist/` to any static host. The site uses real URLs (`/episode/12`), so the host must
send every path to `index.html`. This is already set up for **Netlify / Cloudflare Pages**
(`public/_redirects`) and **Vercel** (`vercel.json`). GitHub Pages needs a `404.html` copy of
`index.html`, or switch `BrowserRouter` to `HashRouter` in `src/main.jsx`.

## Where things live

| To change…                               | Edit…                                       |
| ---------------------------------------- | ------------------------------------------- |
| Novel title, author name, bio            | `src/data/siteConfig.js`                    |
| WhatsApp number, email, social links     | `src/data/siteConfig.js`                    |
| PDF prices (optional)                    | `src/data/siteConfig.js` → `prices`         |
| Top announcement line                    | `src/data/siteConfig.js` → `announcement`   |
| Featured episode on the homepage         | `featuredEpisodeNumber` (null = latest)     |
| Any interface wording (English / Urdu)   | `src/i18n/translations.js`                  |
| Colours                                  | `src/styles/variables.css`                  |

### Replace the cover and author photo
Overwrite `src/assets/images/novel-cover-placeholder.svg` and `author-placeholder.svg`, or
drop in `novel-cover.jpg` / `author.jpg` and change the two `import` lines at the top of
`siteConfig.js`. Use a portrait cover (about 2:3). The episode number is drawn over the cover
with HTML/CSS, so never bake a number into the image.

### WhatsApp
Set `whatsappNumber` to digits only with the country code, e.g. `'923001234567'`.
Until it is set, every purchase button shows a short "not set up yet" note instead of opening
a broken link. Messages are generated in the visitor's interface language and include the
novel title and exact episode number. Payment and PDF delivery happen in WhatsApp, outside
the site.

### Social links and email
Fill in the URLs in `siteConfig.js`. Empty ones are hidden, never shown as dead icons.

## Add Episode 71 (and every later one)

1. Copy any file in `src/data/episodes/` to `episode-071.js` and fill it in:

   ```js
   export default {
     id: 'episode-071',
     number: 71,
     title: '',            // '' if the episode has no title
     language: 'ur',       // language the episode is WRITTEN in: 'ur' or 'en'
     content: [
       { type: 'paragraph', text: 'First paragraph…' },
       { type: 'paragraph', text: 'Second paragraph…' },
       { type: 'break' },                                  // section break ornament
       { type: 'paragraph', text: 'After the break…' },
       // { type: 'heading', text: 'A heading' },          // optional
     ],
   };
   ```
   Do not include `sample: true` for real episodes.

2. Add one line to `src/data/episodeRegistry.js`:

   ```js
   { id: 'episode-071', number: 71, title: '', keywords: [], load: () => import('./episodes/episode-071.js') },
   ```
   Optional fields: `date: '2026-10-09'` (shows a publication date) and
   `excerpt: '…'` (shown on the homepage feature and in list rows).

That is all. Counts, search, the library, the homepage, and previous / next links update
automatically. If the title is set, set it in the registry (the site reads titles from there).

### Episode text and languages
Episode text is shown exactly as written and is never auto-translated, whatever the interface
language. Urdu episodes (`language: 'ur'`) read right-to-left with Nastaliq; English episodes
read left-to-right. If you later have a translation, add it to the same file and a
"Original / Translation" switch appears on that episode:

```js
translation: { language: 'en', content: [{ type: 'paragraph', text: '…' }] },
```

### Delete the demo content
Remove `src/data/sampleText.js`, the five sample episode files, and their lines in the registry.

## Fonts
Loaded from Google Fonts in `index.html` (Cormorant Garamond, Inter, Noto Nastaliq Urdu), with
system fallbacks. For fully offline hosting, self-host these fonts and update the `<link>`.
