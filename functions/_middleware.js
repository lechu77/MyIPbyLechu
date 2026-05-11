export async function onRequest({ request, next }) {
  const ip = request.headers.get('CF-Connecting-IP') ?? 'unknown';
  const res = await next();
  const html = await res.text();
  // Inject IP as a global before any script runs
  const injected = html.replace('<script>', `<script>var __CF_IP="${ip}";\n`);
  return new Response(injected, {
    headers: { ...Object.fromEntries(res.headers), 'content-type': 'text/html;charset=UTF-8' }
  });
}
