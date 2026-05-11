# Project Context

## Purpose

Show the visitor's public IP address. Inspired by ip.me — minimal, no extra services.
Used across multiple domains (mx-ip.lechu.dev, es-ip.lechu.dev, etc.) to verify VPN exit nodes.

## How the IP is resolved

Cloudflare injects `CF-Connecting-IP` on every request. The Pages Function middleware reads it
and injects it as `var __CF_IP` into the HTML before it reaches the browser.
Geo data comes from `request.cf` (Cloudflare's free geo enrichment — no external API needed in production).

In local dev (`wrangler pages dev`), `__CF_IP` is not set, so the page falls back to `ipapi.co/json/`.

## Multi-domain VPN use

The same repo is deployed to multiple Cloudflare Pages projects / custom domains:
- `ip.lechu.dev` — default
- `mx-ip.lechu.dev`, `es-ip.lechu.dev`, etc. — region-specific exit node checks

`Cache-Control: no-store` is set globally so the browser never serves a cached IP from a previous session.

## Pending

- Country full name in production (CF only provides ISO code, e.g. `DE`). Currently shown as `🇩🇪 DE`.
  Fix: add ISO→name lookup table in the middleware or client-side.
- curl-friendly endpoints (`/ip`, `/geo`) not yet implemented.
- Cloudflare edge cache may still cache responses — needs `Cache-Control` verified at CF dashboard level.
