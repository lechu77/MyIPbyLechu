# ip.lechu.dev

Minimal static page that shows your public IP address with geo info and a map. Retro/neon style with light/dark toggle.

## Stack

- Pure HTML/CSS/JS — no build step, no dependencies
- Cloudflare Pages + Pages Functions (middleware injects real IP and geo via CF headers)
- Leaflet + OpenStreetMap for the map (no API key needed)

## Features

- **Public IP address**: clickable to copy.
- **Geo Widgets**: Country (with flag and full name), city, timezone, and ISP/Org.
- **Client Widgets**: Browser, OS, local timezone (with mismatch detection), connection type, and language.
- **Interactive Map**: Pinned to IP location using Leaflet.
- **Hybrid GeoIP**: Uses Cloudflare's `request.cf` in production with a client-side fallback to `ipapi.co` if server data is missing or generic.
- **CLI Friendly**: Detects `curl`, `wget`, and `httpie` to return plain text summary.
- **Cache-Proof**: Strict `no-store` headers and custom `x-render-time` header for verification.

## API / CLI

```bash
curl https://ip.lechu.dev/            # plain text summary
curl https://ip.lechu.dev/ip          # plain text IP only
curl https://ip.lechu.dev/geo         # full JSON geo data
```

## Dev

```bash
npx wrangler pages dev . --port 8788
```

Open `http://127.0.0.1:8788`. In local mode, geo data falls back to `ipapi.co/json/`.

## Deploy

Connect the repo in [Cloudflare Pages](https://dash.cloudflare.com) or via CLI:

```bash
npx wrangler pages deploy . --project-name ip-lechu-dev
```

## Structure

```
├── index.html            # main page & client logic
├── _headers              # security + cache headers
└── functions/
    └── _middleware.js    # injection, CLI detection & API endpoints
```
