const PRIMARY_HOST = "travel.606858.xyz";
const PRIMARY_ORIGIN = "https://travel.606858.xyz";

// Clean public URLs -> static trip entry files.
// Trip-specific UI/data belongs inside each trip's index.html, not in the Worker.
const TRIPS = {
  "/2026/09-24-phuket": "/trips/2026/09-24-phuket/index.html"
};

const SW = `
const CACHE = "travel-atlas-v14";
const PRECACHE = [
  "/",
  "/index.html",
  "/2026/09-24-phuket",
  "/trips/2026/09-24-phuket/index.html",
  "/trips/2026/09-24-phuket/phuket-journey-map.png"
];
const wait = ms => new Promise(resolve => setTimeout(() => resolve(null), ms));

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

async function offlineFallback(req) {
  const hit = await caches.match(req, { ignoreSearch: true });
  if (hit) return hit;
  const path = new URL(req.url).pathname;
  if (path.includes("09-24-phuket")) {
    return (await caches.match("/2026/09-24-phuket")) ||
      (await caches.match("/trips/2026/09-24-phuket/index.html"));
  }
  return caches.match("/");
}

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  const req = event.request;
  const url = new URL(req.url);

  if (req.mode === "navigate") {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE);
      const cached = await cache.match(req, { ignoreSearch: true });
      const network = fetch(req, { cache: "no-store" })
        .then(response => {
          if (response && response.ok) cache.put(req, response.clone());
          return response;
        })
        .catch(() => null);

      if (!cached) return (await network) || (await offlineFallback(req));

      // Fast networks get fresh HTML; weak / cross-border networks fall back quickly.
      const quick = await Promise.race([network, wait(900)]);
      if (quick) return quick;
      event.waitUntil(network.then(() => undefined));
      return cached;
    })());
    return;
  }

  // Trip images are network-first so replacing an image at the same URL does not get
  // stuck behind an old Service Worker cache. If offline, fall back to the last copy.
  if (req.destination === "image" || /\.(?:png|jpe?g|webp|gif|svg)$/i.test(url.pathname)) {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE);
      try {
        const response = await fetch(req, { cache: "no-cache" });
        if (response && response.ok) cache.put(req, response.clone());
        return response;
      } catch (e) {
        return (await cache.match(req)) || Response.error();
      }
    })());
    return;
  }

  // Other static assets can remain cache-first.
  event.respondWith((async () => {
    const cached = await caches.match(req);
    if (cached) return cached;
    try {
      const response = await fetch(req);
      if (response && response.ok) {
        const cache = await caches.open(CACHE);
        cache.put(req, response.clone());
      }
      return response;
    } catch (e) {
      return cached || Response.error();
    }
  })());
});
`;

function htmlHeaders(response) {
  const headers = new Headers(response.headers);
  headers.delete("content-length");
  headers.set("cache-control", "public, max-age=60, stale-while-revalidate=300");
  headers.set("cdn-cache-control", "public, max-age=600, stale-while-revalidate=86400");
  headers.set("x-travel-atlas-architecture", "static-trip-v1");
  return headers;
}

async function fetchAsset(request, env, target = null) {
  const url = new URL(request.url);
  const assetRequest = target
    ? new Request(new URL(target, url.origin), request)
    : request;
  const response = await env.ASSETS.fetch(assetRequest);
  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("text/html")) return response;
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: htmlHeaders(response)
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/sw.js") {
      return new Response(SW, {
        headers: {
          "content-type": "application/javascript; charset=utf-8",
          "cache-control": "no-cache",
          "service-worker-allowed": "/"
        }
      });
    }

    if (url.hostname.endsWith(".workers.dev") && url.hostname !== PRIMARY_HOST) {
      const destination = new URL(url.pathname + url.search + url.hash, PRIMARY_ORIGIN);
      return Response.redirect(destination.toString(), 308);
    }

    const normalized = url.pathname.length > 1 && url.pathname.endsWith("/")
      ? url.pathname.slice(0, -1)
      : url.pathname;

    return fetchAsset(request, env, TRIPS[normalized] || null);
  }
};