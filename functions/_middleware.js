export async function onRequest({ request, next }) {
  const ip  = request.headers.get('CF-Connecting-IP') ?? 'unknown';
  const geo = {
    country: request.headers.get('CF-IPCountry') ?? null,
    city:    request.cf?.city    ?? null,
    region:  request.cf?.region  ?? null,
    lat:     request.cf?.latitude  ?? null,
    lon:     request.cf?.longitude ?? null,
    tz:      request.cf?.timezone  ?? null,
    asn:     request.cf?.asn       ?? null,
    org:     request.cf?.asOrganization ?? null,
  };
  const res  = await next();
  const html = await res.text();
  const injected = html.replace('<script>', `<script>
var __CF_IP="${ip}";
var __CF_GEO=${JSON.stringify(geo)};
`);
  return new Response(injected, {
    headers: { ...Object.fromEntries(res.headers), 'content-type': 'text/html;charset=UTF-8' }
  });
}
