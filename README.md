# ip.lechu.dev

Minimal static page that shows your public IP address. Retro/neon style with light/dark toggle.

## Stack

- Pure HTML/CSS/JS — no build step, no dependencies
- Cloudflare Pages + Pages Functions (middleware injects real IP via `CF-Connecting-IP`)

## Dev

```bash
npx wrangler pages dev . --port 8788
```

Open `http://127.0.0.1:8788` (use `127.0.0.1` to avoid IPv6 loopback).

## Deploy

Connect the repo in [Cloudflare Pages](https://dash.cloudflare.com) → Create project → select repo. No build command needed.

Or via CLI:

```bash
npx wrangler pages deploy . --project-name ip-lechu-dev
```

## Structure

```
├── index.html            # main page
├── _headers              # security headers
└── functions/
    └── _middleware.js    # injects visitor IP into HTML
```
