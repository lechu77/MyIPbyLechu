# Memory / Decision Log

## Decisions

- **No build step**: pure HTML/CSS/JS. Cloudflare Pages serves it as-is.
- **IP injection via middleware**: avoids client-side API calls for the primary data. The IP is in the HTML when it arrives.
- **Leaflet + OSM**: free map, no API key, no usage limits.
- **ipapi.co as local fallback**: single request returns IP + full geo. Not used in production.
- **No ASN widget**: removed to keep widget count even (3×3 grid).
- **No `region` widget**: removed (redundant with city) to make room for `connection` + `language`.
- **`no-store` cache header**: added to `_headers` and explicitly enforced in `_middleware.js` to bypass Cloudflare edge cache and browser cache.
- **Full country names**: implemented using `Intl.DisplayNames` in `_middleware.js` (production) and `country_name` from `ipapi.co` (local dev).
- **curl support**: added detection in `_middleware.js` to return plain text. Added `/ip` (text) and `/geo` (JSON) endpoints.
