const TRIPS = {
  "/2026/09-24-phuket": "/trips/2026/09-24-phuket/index.html"
};

const SW = `
const CACHE = "travel-atlas-v2";
const PRECACHE = [
  "/",
  "/index.html",
  "/2026/09-24-phuket",
  "/trips/2026/09-24-phuket/index.html"
];

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

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  const req = event.request;

  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req)
        .then(response => {
          const copy = response.clone();
          caches.open(CACHE).then(cache => cache.put(req, copy));
          return response;
        })
        .catch(async () => {
          const hit = await caches.match(req, { ignoreSearch: true });
          if (hit) return hit;
          const url = new URL(req.url);
          if (url.pathname.includes("09-24-phuket")) {
            return (await caches.match("/2026/09-24-phuket")) || (await caches.match("/trips/2026/09-24-phuket/index.html"));
          }
          return caches.match("/");
        })
    );
    return;
  }

  event.respondWith(caches.match(req).then(hit => hit || fetch(req)));
});
`;

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

    const normalized = url.pathname.length > 1 && url.pathname.endsWith("/")
      ? url.pathname.slice(0, -1)
      : url.pathname;

    const target = TRIPS[normalized];
    if (target) {
      const assetUrl = new URL(target, url.origin);
      return env.ASSETS.fetch(new Request(assetUrl, request));
    }

    return env.ASSETS.fetch(request);
  }
};
