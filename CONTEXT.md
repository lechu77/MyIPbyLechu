# Project Context

## Purpose

Show the visitor's public IP address. Minimal, fast, and CLI-friendly.
Used for verifying VPN exit nodes across multiple regional domains.

## Architecture

- **Server-side**: Cloudflare Pages Functions (`_middleware.js`) intercept requests.
    - Resolve IP via `CF-Connecting-IP`.
    - Resolve Geo via `request.cf`.
    - Detect CLI clients (curl/wget) to serve text.
    - Inject data into HTML via global variables (`__CF_IP`, `__CF_GEO`).
- **Client-side**: Vanilla JS in `index.html`.
    - Renders widgets and interactive map (Leaflet).
    - Performs fallback GeoIP lookup if server data is generic.
    - Manages dark/light theme persistence.

## Caching Strategy

The tool MUST show real-time data.
- Global `_headers` set `no-store`.
- Middleware reinforces `no-store` and `no-cache`.
- `x-render-time` header provides proof of dynamic execution.
- User may need to set a "Bypass Cache" rule in CF Dashboard if Edge Cache persists.

## Status

- [x] Full country names.
- [x] Curl/CLI plain-text support.
- [x] /ip and /geo endpoints.
- [x] Hybrid GeoIP (Server + Client fallback).
- [x] Cache-buster headers.
