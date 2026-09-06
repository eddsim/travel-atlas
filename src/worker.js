const TRIPS = {
  "/2026/09-24-phuket": "/trips/2026/09-24-phuket/index.html"
};

const SW = `
const CACHE = "travel-atlas-v6";
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

const ENHANCE_CSS = `
.day-nav{position:sticky;top:8px;z-index:30;display:flex;gap:8px;overflow-x:auto;padding:10px 4px;margin:-14px 0 24px;scrollbar-width:none;backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px)}
.day-nav::-webkit-scrollbar{display:none}
.day-nav a{flex:0 0 auto;display:inline-flex;align-items:center;gap:6px;padding:8px 12px;border:1px solid var(--line);border-radius:999px;background:color-mix(in srgb,var(--paper) 92%,transparent);box-shadow:0 6px 18px rgba(0,0,0,.06);font-size:12px;font-weight:950;transition:.18s transform,.18s border-color,.18s background}
.day-nav a::before{content:"";width:8px;height:8px;border-radius:50%;background:var(--tag)}
.day-nav a:hover{transform:translateY(-1px)}
.day-nav a.active{border-color:var(--tag);background:color-mix(in srgb,var(--tag) 14%,var(--paper));color:var(--tag)}
.day{scroll-margin-top:84px}
.focus-transport{display:none;margin-top:14px;padding:14px;border:1px solid var(--line);border-radius:18px;background:color-mix(in srgb,var(--paper) 90%,var(--chip));overflow:hidden}
.focus-transport.show{display:block}
.focus-transport-top{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:10px}
.focus-transport-kind{display:inline-flex;align-items:center;gap:7px;font-size:12px;font-weight:950;color:var(--accent)}
.focus-transport-status{font-size:10px;font-weight:950;padding:4px 8px;border-radius:999px;background:color-mix(in srgb,var(--accent) 13%,var(--paper));color:var(--accent)}
.focus-transport-main{display:grid;grid-template-columns:minmax(0,1fr) auto minmax(0,1fr);align-items:center;gap:10px}
.focus-stop{min-width:0}
.focus-stop.right{text-align:right}
.focus-stop .time{font-size:23px;line-height:1;font-weight:950;font-variant-numeric:tabular-nums}
.focus-stop .code{font-size:17px;font-weight:950;margin-top:5px}
.focus-stop .name{font-size:11px;color:var(--muted);margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.focus-stop .zone{font-size:9px;color:var(--muted);font-weight:800}
.focus-route-mid{text-align:center;color:var(--muted);min-width:68px}
.focus-route-mid .number{font-size:12px;font-weight:950;color:var(--ink);white-space:nowrap}
.focus-route-mid .arrow{font-size:20px;line-height:1;margin:2px 0}
.focus-route-mid .duration{font-size:9px;white-space:nowrap}
.focus-transport-extra{display:flex;flex-wrap:wrap;gap:6px;margin-top:11px;padding-top:10px;border-top:1px dashed var(--line)}
.focus-transport-extra span{font-size:10px;font-weight:850;padding:4px 7px;border-radius:999px;background:var(--chip);color:var(--muted)}
.copy-inline{display:inline-flex;align-items:center;justify-content:flex-end;gap:6px;min-width:0;text-align:right}
.copy-inline>:first-child{min-width:0}
.copy-place{appearance:none;-webkit-appearance:none;display:inline-flex;align-items:center;justify-content:center;gap:4px;flex:0 0 auto;border:1px solid var(--line);border-radius:9px;background:var(--chip);color:var(--muted);padding:4px 7px;font:inherit;font-size:10px;font-weight:900;line-height:1.2;cursor:pointer;vertical-align:middle;transition:.15s transform,.15s border-color,.15s color,.15s background}
.copy-place:hover{transform:translateY(-1px);border-color:var(--accent);color:var(--accent)}
.copy-place.copied{border-color:var(--accent);background:color-mix(in srgb,var(--accent) 12%,var(--paper));color:var(--accent)}
.copy-place.after-link{margin-left:5px}
.focus-stop .copy-place{margin-top:5px;padding:3px 6px;font-size:9px}
.copy-toast{position:fixed;left:50%;bottom:max(22px,env(safe-area-inset-bottom));z-index:999;transform:translate(-50%,12px);max-width:min(88vw,520px);padding:9px 13px;border:1px solid var(--line);border-radius:999px;background:color-mix(in srgb,var(--paper) 94%,transparent);color:var(--ink);box-shadow:0 12px 36px rgba(0,0,0,.18);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);font-size:12px;font-weight:850;opacity:0;pointer-events:none;transition:.18s opacity,.18s transform;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.copy-toast.show{opacity:1;transform:translate(-50%,0)}
@media(max-width:520px){.focus-stop .time{font-size:20px}.focus-stop .code{font-size:15px}.focus-route-mid{min-width:58px}.focus-transport{padding:12px}.copy-place{padding:4px 6px}.copy-place.after-link{margin-left:4px}}
`;

const DAY_NAV_HTML = `<nav class="day-nav" aria-label="按天快速导航">
  <a href="#day1" data-day="day1" style="--tag:var(--d1)">DAY1 · 9/24</a>
  <a href="#day2" data-day="day2" style="--tag:var(--d2)">DAY2 · 9/25</a>
  <a href="#day3" data-day="day3" style="--tag:var(--d3)">DAY3 · 9/26</a>
  <a href="#day4" data-day="day4" style="--tag:var(--d4)">DAY4 · 9/27</a>
  <a href="#day5" data-day="day5" style="--tag:var(--d5)">DAY5 · 9/28</a>
</nav>`;

const FOCUS_TRANSPORT_HTML = `<div id="focusTransport" class="focus-transport" aria-live="polite"></div>`;

const PAGE_SCRIPT = `<script>(()=>{
  const links=[...document.querySelectorAll('.day-nav a')],days=[...document.querySelectorAll('.day[id]')];
  const active=id=>{links.forEach(a=>a.classList.toggle('active',a.dataset.day===id));const current=links.find(a=>a.dataset.day===id);if(current)current.scrollIntoView({behavior:'smooth',block:'nearest',inline:'center'})};
  links.forEach(a=>a.addEventListener('click',()=>active(a.dataset.day)));
  if(days.length&&'IntersectionObserver'in window){const ob=new IntersectionObserver(entries=>{const v=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];if(v)active(v.target.id)},{rootMargin:'-24% 0px -55% 0px',threshold:[0,.15,.35,.6]});days.forEach(d=>ob.observe(d))}
  if(location.hash&&/^#day[1-5]$/.test(location.hash))active(location.hash.slice(1));

  let toastTimer=null;
  const ensureToast=()=>{let t=document.getElementById('copyToast');if(!t){t=document.createElement('div');t.id='copyToast';t.className='copy-toast';t.setAttribute('role','status');t.setAttribute('aria-live','polite');document.body.appendChild(t)}return t};
  const showToast=text=>{const t=ensureToast();t.textContent='已复制：'+text;t.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove('show'),1800)};
  const copyText=async text=>{text=(text||'').trim();if(!text)return false;try{if(navigator.clipboard&&window.isSecureContext){await navigator.clipboard.writeText(text)}else{const ta=document.createElement('textarea');ta.value=text;ta.setAttribute('readonly','');ta.style.position='fixed';ta.style.opacity='0';document.body.appendChild(ta);ta.select();document.execCommand('copy');ta.remove()}showToast(text);return true}catch(e){return false}};
  const destinationFromHref=href=>{try{const u=new URL(href,location.href);return (u.searchParams.get('destination')||u.searchParams.get('query')||'').trim()}catch(e){return ''}};
  const makeCopyButton=(text,label='地址')=>{const b=document.createElement('button');b.type='button';b.className='copy-place';b.innerHTML='⧉ <span>复制</span>';b.setAttribute('aria-label','复制'+label);b.dataset.copyText=text;b.addEventListener('click',async e=>{e.preventDefault();e.stopPropagation();const ok=await copyText(b.dataset.copyText);if(ok){const old=b.innerHTML;b.innerHTML='✓ <span>已复制</span>';b.classList.add('copied');setTimeout(()=>{b.innerHTML=old;b.classList.remove('copied')},1200)}});return b};
  const enhanceCopyButtons=()=>{
    document.querySelectorAll('.row').forEach(row=>{if(row.dataset.copyReady)return;const first=row.children[0],value=row.children[1];if(!first||!value||!first.textContent.includes('地址'))return;const text=(value.textContent||'').trim();if(!text)return;const wrap=document.createElement('span');wrap.className='copy-inline';value.replaceWith(wrap);wrap.appendChild(value);wrap.appendChild(makeCopyButton(text,'地址'));row.dataset.copyReady='1'});
    document.querySelectorAll('a.place-link[href*="google.com/maps"],a.maplink[href*="google.com/maps"]').forEach(a=>{if(a.dataset.copyReady)return;let text=destinationFromHref(a.href);if(!text)return;let u;try{u=new URL(a.href,location.href)}catch(e){return}if(u.searchParams.get('waypoints')||(a.textContent||'').includes('全天'))return;const parentRow=a.closest('.row');if(parentRow&&parentRow.children[0]&&parentRow.children[0].textContent.includes('地址'))return;const b=makeCopyButton(text,'地点');b.classList.add('after-link');a.insertAdjacentElement('afterend',b);a.dataset.copyReady='1'});
  };

  const transport={
    CZ6063:{kind:'✈️ 航班',status:'已出票',carrier:'南方航空',number:'CZ6063',from:{time:'12:55',code:'CAN T2',name:'广州白云国际机场',zone:'UTC+8',copy:'广州白云国际机场 T2'},to:{time:'15:40',code:'HKT',name:'普吉国际机场 · 国际航站楼',zone:'UTC+7',copy:'Phuket International Airport International Terminal'},duration:'3时45分',extras:['A321 NEO','有餐食','9月24日']},
    CZ6064:{kind:'✈️ 航班',status:'已出票',carrier:'南方航空',number:'CZ6064',from:{time:'16:40',code:'HKT',name:'普吉国际机场 · 国际航站楼',zone:'UTC+7',copy:'Phuket International Airport International Terminal'},to:{time:'21:40',code:'CAN T2',name:'广州白云国际机场',zone:'UTC+8',copy:'广州白云国际机场 T2'},duration:'4时',extras:['A320-200 NEO','有餐食','9月28日']}
  };
  const esc=s=>String(s||'').replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  const box=document.getElementById('focusTransport'),title=document.getElementById('nextTitle');
  const findTransport=t=>{if(!t)return null;if(t.includes('CZ6063')||t.includes('抵达普吉 HKT'))return transport.CZ6063;if(t.includes('CZ6064')||t.includes('抵达广州白云 T2'))return transport.CZ6064;return null};
  const render=()=>{if(!box||!title)return;const item=findTransport(title.textContent||'');if(!item){box.classList.remove('show');box.innerHTML='';return}box.innerHTML='<div class="focus-transport-top"><div class="focus-transport-kind">'+item.kind+' · '+item.carrier+'</div><div class="focus-transport-status">'+item.status+'</div></div><div class="focus-transport-main"><div class="focus-stop"><div class="time">'+item.from.time+'</div><div class="code">'+item.from.code+'</div><div class="name">'+item.from.name+'</div><div class="zone">'+item.from.zone+'</div><button type="button" class="copy-place" data-copy-text="'+esc(item.from.copy)+'">⧉ <span>复制地点</span></button></div><div class="focus-route-mid"><div class="number">'+item.number+'</div><div class="arrow">→</div><div class="duration">'+item.duration+'</div></div><div class="focus-stop right"><div class="time">'+item.to.time+'</div><div class="code">'+item.to.code+'</div><div class="name">'+item.to.name+'</div><div class="zone">'+item.to.zone+'</div><button type="button" class="copy-place" data-copy-text="'+esc(item.to.copy)+'">⧉ <span>复制地点</span></button></div></div><div class="focus-transport-extra">'+item.extras.map(x=>'<span>'+x+'</span>').join('')+'</div>';box.classList.add('show');box.querySelectorAll('[data-copy-text]').forEach(b=>b.addEventListener('click',async e=>{e.preventDefault();e.stopPropagation();const ok=await copyText(b.dataset.copyText);if(ok){const old=b.innerHTML;b.innerHTML='✓ <span>已复制</span>';b.classList.add('copied');setTimeout(()=>{b.innerHTML=old;b.classList.remove('copied')},1200)}}))};
  if(title&&'MutationObserver'in window)new MutationObserver(render).observe(title,{childList:true,characterData:true,subtree:true});
  render();enhanceCopyButtons();
  new MutationObserver(()=>enhanceCopyButtons()).observe(document.body,{childList:true,subtree:true});
  setInterval(render,1000);
})();<\/script>`;

function enhancePhuketGuide(html) {
  if (!html.includes('class="day-nav"')) {
    html = html.replace('</style>', `${ENHANCE_CSS}</style>`);
    const mapSection = '<section>\n  <div class="section-title"><h2>行程总览地图</h2>';
    html = html.replace(mapSection, `${DAY_NAV_HTML}\n\n${mapSection}`);
    for (let i = 1; i <= 5; i++) {
      html = html.replace(
        `<article class="day card" style="--day:var(--d${i})">`,
        `<article id="day${i}" class="day card" style="--day:var(--d${i})">`
      );
    }
  } else if (!html.includes('.copy-place{')) {
    html = html.replace('</style>', `${ENHANCE_CSS}</style>`);
  }

  if (!html.includes('id="focusTransport"')) {
    html = html.replace('<div id="nextTime" class="focus-time">—</div>', `<div id="nextTime" class="focus-time">—</div>\n  ${FOCUS_TRANSPORT_HTML}`);
  }

  if (!html.includes('const makeCopyButton=')) {
    html = html.replace('</body>', `${PAGE_SCRIPT}\n</body>`);
  }
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
  headers.set("x-travel-atlas-enhance", "v6");
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
