export async function onRequest({ request, next }) {
  const url = new URL(request.url);
  const ip = request.headers.get('CF-Connecting-IP') ?? 'unknown';
  const ua = (request.headers.get('User-Agent') || '').toLowerCase();
  const isCurl = ua.includes('curl') || ua.includes('wget') || ua.includes('httpie');
  const renderTime = Date.now().toString();

  // 1. Direct IP endpoint (fastest)
  if (url.pathname === '/ip') {
    return new Response(ip + '\n', {
      headers: { 
        'content-type': 'text/plain;charset=UTF-8',
        'cache-control': 'no-store, no-cache, must-revalidate',
        'pragma': 'no-cache',
        'x-render-time': renderTime
      }
    });
  }

  const cf = request.cf || {};
  const countryCode = cf.country || request.headers.get('CF-IPCountry') || 'XX';
  let countryName = 'Earth'; 
  
  try {
    if (countryCode && countryCode !== 'XX' && countryCode !== 'T1') {
      countryName = new Intl.DisplayNames(['en'], { type: 'region' }).of(countryCode);
    } else if (countryCode === 'T1') {
      countryName = 'Tor Exit Node';
    }
  } catch (e) {
    countryName = countryCode;
  }

  const geo = {
    ip:      ip,
    country: countryCode,
    country_name: countryName,
    city:    cf.city    ?? 'Remote City',
    region:  cf.region  ?? 'Remote Region',
    lat:     cf.latitude  ?? '0',
    lon:     cf.longitude ?? '0',
    tz:      cf.timezone  ?? 'UTC',
    asn:     cf.asn       ?? 'N/A',
    org:     cf.asOrganization ?? 'Internet Provider',
  };

  // 2. Data endpoints
  if (url.pathname === '/geo') {
    return new Response(JSON.stringify(geo, null, 2) + '\n', {
      headers: { 
        'content-type': 'application/json;charset=UTF-8',
        'cache-control': 'no-store, no-cache, must-revalidate',
        'pragma': 'no-cache',
        'x-render-time': renderTime
      }
    });
  }

  // 3. Handle curl/CLI for root path
  if (isCurl && (url.pathname === '/' || url.pathname === '')) {
    const text = `IP:      ${geo.ip}
Country: ${geo.country_name} (${geo.country})
City:    ${geo.city}
Org:     ${geo.org}
TZ:      ${geo.tz}
Loc:     ${geo.lat},${geo.lon}
`;
    return new Response(text, {
      headers: { 
        'content-type': 'text/plain;charset=UTF-8',
        'cache-control': 'no-store, no-cache, must-revalidate',
        'pragma': 'no-cache',
        'x-render-time': renderTime
      }
    });
  }

  // 4. Regular HTML response with injection
  const res  = await next();
  const html = await res.text();
  
  const injected = html.replace('<script>', `<script>
var __CF_IP="${ip}";
var __CF_GEO=${JSON.stringify(geo)};
`);

  return new Response(injected, {
    headers: { 
      ...Object.fromEntries(res.headers), 
      'content-type': 'text/html;charset=UTF-8',
      'cache-control': 'no-store, no-cache, must-revalidate',
      'pragma': 'no-cache',
      'x-render-time': renderTime
    }
  });
}
