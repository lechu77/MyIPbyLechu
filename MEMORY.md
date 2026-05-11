# Memory / Decision Log

## Decisions

- **No build step**: pure HTML/CSS/JS. Cloudflare Pages serves it as-is.
- **IP injection via middleware**: avoids client-side API calls for the primary data.
- **Hybrid GeoIP Strategy**: 
    1. Middleware uses `request.cf` (fast, server-side).
    2. Frontend checks if data is generic (e.g., country `XX` or "Remote City").
    3. If generic, frontend fetches from `ipapi.co` to ensure accuracy.
- **Full country names**: implemented using `Intl.DisplayNames` in the middleware.
- **Anti-Cache measures**:
    - `Cache-Control: no-store` in `_headers` and middleware.
    - `x-render-time` header added to every response to verify dynamic generation.
- **CLI support**: middleware detects `curl`, `wget`, `httpie` and serves plain text.
- **Endpoints**: Added `/ip` (text) and `/geo` (JSON) for programmatic access.
- **UI Tweaks**:
    - Removed ASN and Region widgets to maintain a clean 3x3 grid.
    - Added mismatch detection for Timezone (Local vs IP).
