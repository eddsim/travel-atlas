import { readFile, writeFile } from 'node:fs/promises';

const htmlPath = 'public/trips/2026/09-24-phuket/index.html';
const standardPath = 'docs/TRAVEL_GUIDE_STANDARD.md';
let html = await readFile(htmlPath, 'utf8');
let standard = await readFile(standardPath, 'utf8');

const replaceOnce = (source, from, to, label) => {
  if (!source.includes(from)) throw new Error(`Missing target: ${label}`);
  return source.replace(from, to);
};

if (!html.includes('.grab-ride-btn{')) {
  html = replaceOnce(
    html,
    '.copy-place.after-link{margin-left:5px}',
    '.copy-place.after-link{margin-left:5px}.grab-ride-btn{display:inline-flex;align-items:center;justify-content:center;gap:4px;margin-left:6px;padding:4px 8px;border:1px solid color-mix(in srgb,#00b14f 42%,var(--line));border-radius:9px;background:color-mix(in srgb,#00b14f 10%,var(--paper));color:#07883f;font-size:10px;font-weight:950;line-height:1.2;white-space:nowrap;vertical-align:middle;cursor:pointer;transition:.15s transform,.15s border-color,.15s background}.grab-ride-btn:hover{transform:translateY(-1px);border-color:#00b14f;background:color-mix(in srgb,#00b14f 16%,var(--paper))}body.night .grab-ride-btn{color:#64dc91}.grab-ride-note{font-size:10px;color:var(--muted)}',
    'Grab button CSS'
  );
}

if (!html.includes('data-grab-buttons-ready')) {
  const grabScript = `\n<script data-grab-buttons-ready>\n(()=>{\n  const getDestination=(href)=>{\n    try{\n      const u=new URL(href,location.href);\n      if(!/google\\.com\\/maps/.test(u.hostname+u.pathname)) return '';\n      return (u.searchParams.get('destination')||u.searchParams.get('query')||'').trim();\n    }catch(e){return ''}\n  };\n  const makeGrabUrl=(destination)=>{\n    const q=encodeURIComponent(destination);\n    return 'grab://open?screenType=BOOKING&vertical=Car&dropOffAddress='+q+'&dropOffKeywords='+q;\n  };\n  document.querySelectorAll('a.place-link[href*="google.com/maps"]').forEach(link=>{\n    if(link.dataset.grabEnhanced==='1') return;\n    const destination=getDestination(link.href);\n    if(!destination) return;\n    const btn=document.createElement('a');\n    btn.className='grab-ride-btn';\n    btn.href=makeGrabUrl(destination);\n    btn.setAttribute('aria-label','用 Grab 打车到 '+destination);\n    btn.title='打开 Grab，并把这里作为目的地';\n    btn.textContent='🚕 打车';\n    const copy=link.nextElementSibling?.classList?.contains('copy-place')?link.nextElementSibling:null;\n    (copy||link).insertAdjacentElement('afterend',btn);\n    link.dataset.grabEnhanced='1';\n  });\n})();\n</script>`;
  html = replaceOnce(html, '</body></html>', grabScript + '\n</body></html>', 'closing body');
}

if (!standard.includes('### 5.1 Grab 一键打车')) {
  standard = replaceOnce(
    standard,
    '有街道地址时复制完整地址；POI 更适合地图搜索时复制可识别英文 / 当地名称。复制成功使用轻量 toast。',
    `有街道地址时复制完整地址；POI 更适合地图搜索时复制可识别英文 / 当地名称。复制成功使用轻量 toast。\n\n### 5.1 Grab 一键打车\n\n在 Grab 覆盖的目的地，行程时间轴中的可打车地点默认增加轻量 **「🚕 打车」** 按钮，放在地点链接 / 复制按钮右侧。\n\n行为规范：\n\n- 点击后使用 Grab 官方支持的 \\`grab://open?screenType=BOOKING\\` Deep Link 打开 Grab Transport。\n- 尽量把当前 POI / 地址作为 drop-off 目的地带入；Grab 最终识别结果、上车点、车型与价格仍由 App 内确认。\n- 不替用户自动下单，不跳过 Grab App 的最终确认。\n- 桌面端或未安装 Grab 时 Deep Link 可能无法打开；Google Maps 与复制地点必须继续保留为兜底。\n- 一条事件出现多个 POI 时，每个 POI 分别拥有自己的打车按钮，不把多个目的地混成一个按钮。`
    ,
    'location interaction standard'
  );
}

await writeFile(htmlPath, html, 'utf8');
await writeFile(standardPath, standard, 'utf8');
console.log('Added Grab ride buttons to all Google Maps POIs and updated standard');
