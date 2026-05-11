# ip.lechu.dev

Minimal static page that shows your public IP address with geo info and a map. Retro/neon style with light/dark toggle.

## Stack

- Pure HTML/CSS/JS — no build step, no dependencies
- Cloudflare Pages + Pages Functions (middleware injects real IP and geo via CF headers)
- Leaflet + OpenStreetMap for the map (no API key needed)

## Features

- Public IP address (click to copy)
- Geo widgets: country (with flag), city, timezone, org
- Client widgets: browser, OS, local timezone (vs IP timezone), connection type, language
- Interactive map pinned to IP location
- Light/dark toggle (persisted in localStorage)
- No browser cache (`Cache-Control: no-store`) — safe for multi-domain VPN use

## Dev

```bash
npx wrangler pages dev . --port 8788
```

Open `http://127.0.0.1:8788` (use `127.0.0.1` to avoid IPv6 loopback).

In local mode, geo data falls back to `ipapi.co/json/`.

## Deploy

Connect the repo in [Cloudflare Pages](https://dash.cloudflare.com) → Create project → select repo. No build command needed.

Or via CLI:

```bash
npx wrangler pages deploy . --project-name ip-lechu-dev
```

## Structure

```
├── index.html            # main page
├── _headers              # security + cache headers
└── functions/
    └── _middleware.js    # injects IP and geo data into HTML
```

## curl

```bash
curl https://ip.lechu.dev/ip          # plain text IP
curl https://ip.lechu.dev/geo         # JSON geo data
```
