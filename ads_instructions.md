# Yalla Live — Ads Control

Ads on the home page are controlled from the admin console:

1. Open `/admin-anis.html` and sign in
2. In **Site Settings**, flip the **Ads on home page** toggle
3. Click **Publish** — the admin commits `site-config.js` to GitHub and your hosting redeploys
4. All visitors see the new state within ~1 minute

The toggle controls every ad slot at once (left + right skyscrapers + bottom match-section banner).

## How it works under the hood

- `site-config.js` exposes `window.SITE_CONFIG.adsEnabled` (a boolean)
- `index.html` loads it in the `<head>`
- Each ad block sits in the page wrapped in `<div data-ad-slot hidden>` with its scripts set to `type="text/plain" data-ad-script`. By default they're inert.
- A small bootstrap at the end of `index.html` checks `SITE_CONFIG.adsEnabled` and, if true, removes the `hidden` attribute and clones each ad script with `type="text/javascript"` so the browser executes it.

## Ad networks in use

- Skyscrapers (4 slots, gutter): highperformanceformat.com — key `ec2e4b0a2aa3fcac5cb428225d0ad9a1`, 160×600 iframe
- Bottom banner: effectivecpmnetwork.com — key `53ad722048fcb45c6570dc61ee07464f`, native script

## Manually editing site-config.js

If you ever need to bypass the admin (token broken, GitHub down, etc.) edit `site-config.js` directly:

```js
window.SITE_CONFIG = {
  adsEnabled: true
};
```

Commit + push to `main`, your hosting will redeploy.

## Adding a new ad slot

1. Add the markup inside `index.html`, wrapped in `<div data-ad-slot hidden>…</div>`
2. Inside that wrapper, mark every ad-network `<script>` as `type="text/plain" data-ad-script`
3. That's it — the existing bootstrap will pick it up automatically when ads are enabled
