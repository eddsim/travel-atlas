const TRIPS = {
  "/2026/09-24-phuket": "/trips/2026/09-24-phuket/index.html"
};

const SW = `
const CACHE = "travel-atlas-v4";
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
      fetch(req, { cache: "no-store" })
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

const DAY_NAV_CSS = `.day-nav{position:sticky;top:8px;z-index:30;display:flex;gap:8px;overflow-x:auto;padding:10px 4px;margin:-14px 0 24px;scrollbar-width:none;backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px)}.day-nav::-webkit-scrollbar{display:none}.day-nav a{flex:0 0 auto;display:inline-flex;align-items:center;gap:6px;padding:8px 12px;border:1px solid var(--line);border-radius:999px;background:color-mix(in srgb,var(--paper) 92%,transparent);box-shadow:0 6px 18px rgba(0,0,0,.06);font-size:12px;font-weight:950;transition:.18s transform,.18s border-color,.18s background}.day-nav a::before{content:"";width:8px;height:8px;border-radius:50%;background:var(--tag)}.day-nav a:hover{transform:translateY(-1px)}.day-nav a.active{border-color:var(--tag);background:color-mix(in srgb,var(--tag) 14%,var(--paper));color:var(--tag)}.day{scroll-margin-top:84px}`;

const DAY_NAV_HTML = `<nav class="day-nav" aria-label="按天快速导航">
  <a href="#day1" data-day="day1" style="--tag:var(--d1)">DAY1 · 9/24</a>
  <a href="#day2" data-day="day2" style="--tag:var(--d2)">DAY2 · 9/25</a>
  <a href="#day3" data-day="day3" style="--tag:var(--d3)">DAY3 · 9/26</a>
  <a href="#day4" data-day="day4" style="--tag:var(--d4)">DAY4 · 9/27</a>
  <a href="#day5" data-day="day5" style="--tag:var(--d5)">DAY5 · 9/28</a>
</nav>`;

const DAY_NAV_SCRIPT = `<script>(()=>{const links=[...document.querySelectorAll('.day-nav a')],days=[...document.querySelectorAll('.day[id]')];const active=id=>{links.forEach(a=>a.classList.toggle('active',a.dataset.day===id));const current=links.find(a=>a.dataset.day===id);if(current)current.scrollIntoView({behavior:'smooth',block:'nearest',inline:'center'})};links.forEach(a=>a.addEventListener('click',()=>active(a.dataset.day)));if(days.length&&'IntersectionObserver'in window){const ob=new IntersectionObserver(entries=>{const v=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];if(v)active(v.target.id)},{rootMargin:'-24% 0px -55% 0px',threshold:[0,.15,.35,.6]});days.forEach(d=>ob.observe(d))}if(location.hash&&/^#day[1-5]$/.test(location.hash))active(location.hash.slice(1))})();<\/script>`;

function enhancePhuketGuide(html) {
  if (html.includes('class="day-nav"')) return html;

  html = html.replace('</style>', `${DAY_NAV_CSS}</style>`);

  const mapSection = '<section>\n  <div class="section-title"><h2>行程总览地图</h2>';
  html = html.replace(mapSection, `${DAY_NAV_HTML}\n\n${mapSection}`);

  for (let i = 1; i <= 5; i++) {
    html = html.replace(
      `<article class="day card" style="--day:var(--d${i})">`,
      `<article id="day${i}" class="day card" style="--day:var(--d${i})">`
    );
  }

  html = html.replace('</body>', `${DAY_NAV_SCRIPT}\n</body>`);
  return html;
}

async function fetchAsset(request, env, target = null) {
  const url = new URL(request.url);
  const assetRequest = target
    ? new Request(new URL(target, url.origin), request)
    : request;
  const response = await env.ASSETS.fetch(assetRequest);

  const isPhuket = url.pathname === "/2026/09-24-phuket" || url.pathname === "/2026/09-24-phuket/" || url.pathname.includes("/trips/2026/09-24-phuket/");
  const contentType = response.headers.get("content-type") || "";
  if (!isPhuket || !contentType.includes("text/html")) return response;

  const headers = new Headers(response.headers);
  headers.delete("content-length");
  headers.set("cache-control", "no-cache, max-age=0");
  headers.set("x-travel-atlas-nav", "v4");
  return new Response(enhancePhuketGuide(await response.text()), {
    status: response.status,
    statusText: response.statusText,
    headers
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

    const normalized = url.pathname.length > 1 && url.pathname.endsWith("/")
      ? url.pathname.slice(0, -1)
      : url.pathname;

    const target = TRIPS[normalized];
    return fetchAsset(request, env, target || null);
  }
};
