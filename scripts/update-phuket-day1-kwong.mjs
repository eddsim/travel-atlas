import { readFile, writeFile } from 'node:fs/promises';

const path = 'public/trips/2026/09-24-phuket/index.html';
let html = await readFile(path, 'utf8');

const day1Start = html.indexOf('<article id="day1"');
const day2Start = html.indexOf('<article id="day2"');
if (day1Start < 0 || day2Start < 0) throw new Error('Could not locate Day 1/2 blocks');

const day1 = `<article id="day1" class="day card" style="--day:var(--d1)">
      <div class="dayhead"><div><h3>Day 1 · 抵达普吉 → Kwong Shop 晚餐 → Kata 夜市</h3><div class="daymeta">9/24 Thu · 落地后只安排 Kata / Karon 周边</div></div><span class="daybadge">抵达日</span></div>
      <div class="event"><div class="t">12:55<span class="tz">广州 UTC+8</span></div><div><div class="event-title"><a class="place-link" target="_blank" rel="noopener" href="https://www.google.com/maps/dir/?api=1&amp;destination=Guangzhou%20Baiyun%20International%20Airport%20Terminal%202" data-copy-ready="1">广州白云 T2</a><button type="button" class="copy-place after-link" aria-label="复制地点" data-copy-text="Guangzhou Baiyun International Airport Terminal 2">⧉ <span>复制</span></button> 起飞 · CZ6063</div></div></div>
      <div class="event"><div class="t">15:40<span class="tz">普吉 UTC+7</span></div><div><div class="event-title">抵达 <a class="place-link" target="_blank" rel="noopener" href="https://www.google.com/maps/dir/?api=1&amp;destination=Phuket%20International%20Airport" data-copy-ready="1">HKT 普吉国际机场</a><button type="button" class="copy-place after-link" aria-label="复制地点" data-copy-text="Phuket International Airport">⧉ <span>复制</span></button></div><div class="event-desc">入境、取行李、叫车留足缓冲，不在落地后一小时内安排固定预约。</div></div></div>
      <div class="event"><div class="t">17:00<span class="tz">普吉 UTC+7</span></div><div><div class="event-title">机场 → <a class="place-link" target="_blank" rel="noopener" href="https://www.google.com/maps/dir/?api=1&amp;destination=Metadee%20Concept%20Hotel%20Phuket&amp;travelmode=driving" data-copy-ready="1">Metadee Concept Hotel</a><button type="button" class="copy-place after-link" aria-label="复制地点" data-copy-text="Metadee Concept Hotel Phuket">⧉ <span>复制</span></button></div><div class="event-desc">按约 60—90 分钟预留，雨季与晚高峰以当天路况为准。</div></div></div>
      <div class="event"><div class="t">18:30<span class="tz">普吉 UTC+7</span></div><div><div class="event-title">入住、稍作休息</div><div class="event-desc">如果航班、入境或路况明显延误，第一晚就以不赶为原则，后面的夜市可以直接取消。</div></div></div>
      <div class="event"><div class="t">19:15<span class="tz">普吉 UTC+7</span></div><div><div class="event-title">前往 <a class="place-link" target="_blank" rel="noopener" href="https://www.google.com/maps/dir/?api=1&amp;destination=Kwong%20Shop%20Seafood%20Restaurant%2067%20Taina%20Rd%20Karon%20Phuket&amp;travelmode=driving">Kwong Shop Seafood Restaurant</a></div><div class="event-desc">第一晚把这家餐厅直接解决掉，避免后面为了吃饭单独绕路。地址：67 Taina Rd, Karon, Mueang Phuket District, Phuket 83100。</div></div></div>
      <div class="event"><div class="t">19:30—20:30<span class="tz">普吉 UTC+7</span></div><div><div class="event-title">Kwong Shop Seafood · 晚餐</div><div class="event-desc">落地日不再把夜市当正餐，先好好吃饭；出发前再确认当天营业状态。</div></div></div>
      <div class="event"><div class="t">20:45<span class="tz">普吉 UTC+7</span></div><div><div class="event-title">体力允许再去 <a class="place-link" target="_blank" rel="noopener" href="https://www.google.com/maps/dir/?api=1&amp;destination=Kata%20Night%20Market%20Phuket&amp;travelmode=driving" data-copy-ready="1">Kata Night Market</a><button type="button" class="copy-place after-link" aria-label="复制地点" data-copy-text="Kata Night Market Phuket">⧉ <span>复制</span></button></div><div class="event-desc">这里只当饭后散步、买水果和小吃；如果落地太累或下雨，直接回酒店，不影响主线。</div></div></div>
      <div class="event"><div class="t">21:45<span class="tz">普吉 UTC+7</span></div><div><div class="event-title">返回酒店休息</div></div></div>
      <details class="route"><summary>展开 Day 1 路线图 ＋</summary><div class="routebox"><svg viewBox="0 0 760 150"><path class="route-path" d="M45 72 C160 25 265 110 370 68 S535 35 715 72"></path><circle cx="45" cy="72" r="8" fill="var(--paper)" stroke="var(--day)" stroke-width="4"></circle><text x="25" y="111" class="route-label">HKT</text><circle cx="310" cy="70" r="8" fill="var(--paper)" stroke="var(--day)" stroke-width="4"></circle><text x="265" y="111" class="route-label">Metadee</text><circle cx="515" cy="70" r="8" fill="var(--paper)" stroke="var(--day)" stroke-width="4"></circle><text x="475" y="111" class="route-label">Kwong</text><circle cx="715" cy="72" r="8" fill="var(--paper)" stroke="var(--day)" stroke-width="4"></circle><text x="662" y="111" class="route-label">Night Market</text></svg><div class="route-actions"><a class="btn" target="_blank" rel="noopener" href="https://www.google.com/maps/dir/?api=1&amp;origin=Phuket%20International%20Airport&amp;destination=Kata%20Night%20Market%20Phuket&amp;waypoints=Metadee%20Concept%20Hotel%20Phuket%7CKwong%20Shop%20Seafood%20Restaurant%20Phuket&amp;travelmode=driving">↗ 全天多点导航</a></div></div></details>
    </article>

    `;

html = html.slice(0, day1Start) + day1 + html.slice(day2Start);

html = html.replace(
  '<div class="plan"><strong>Kwong Shop Seafood</strong>不再固定塞进 Day 3。它保留为 Karon 区备选餐厅，哪天想吃、时间合适再去，比为了吃一顿饭多打一段车更合理。</div>',
  '<div class="plan"><strong>Day 3 晚餐策略</strong>Kwong Shop Seafood 已移到 Day 1。Day 3 晚餐继续留在 Jungceylon / Patong 步行范围解决，吃完取行李后直接去 Centara，不增加额外打车。</div>'
);

html = html.replace(
  /<li data-check-id="restaurants">[\s\S]*?<\/li>/,
  '<li data-check-id="restaurants"><label class="prep-check"><input type="checkbox"><span class="prep-copy"><b>餐厅：</b>Day 1 Kwong Shop Seafood；Day 2 Khrua Nong Bio Thaifood + Rin\'s Kitchen。出发前再看当天营业状态。</span></label></li>'
);

html = html.replace(
  '<li><b>Kata Night Market：</b>放在 Day 1 19:30，适合作为落地后的轻量晚餐/夜市，不额外跨区。</li>',
  '<li><b>Day 1 晚餐：</b>优先 Kwong Shop Seafood，19:30 左右吃饭；Kata Night Market 改为 20:45 后的可选饭后散步，不再承担正餐。</li>'
);

html = html.replace(
  /<li><b>Kata \/ Karon 餐厅：<\/b>[\s\S]*?<\/li>/,
  '<li><b>Kata / Karon 餐厅：</b>Day 1 Kwong Shop Seafood；Day 2 午餐 Khrua Nong Bio Thaifood、晚餐 Rin\'s Kitchen；Day 3 不再为了餐厅额外绕路。</li>'
);

html = html.replace(
  '{iso:"2026-09-24T19:30:00+07:00",title:"Kata Night Market",tz:"Asia/Bangkok",label:"普吉 UTC+7"},',
  '{iso:"2026-09-24T19:30:00+07:00",title:"Kwong Shop Seafood · 晚餐",tz:"Asia/Bangkok",label:"普吉 UTC+7"},\n{iso:"2026-09-24T20:45:00+07:00",title:"Kata Night Market · 可选饭后散步",tz:"Asia/Bangkok",label:"普吉 UTC+7"},'
);

await writeFile(path, html, 'utf8');
console.log('Moved Kwong Shop Seafood to Day 1 dinner and made night market optional');
