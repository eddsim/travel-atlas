import { readFile, writeFile } from 'node:fs/promises';

const path = 'public/trips/2026/09-24-phuket/index.html';
let html = await readFile(path, 'utf8');

const kataSurfHref = 'https://www.google.com/maps/dir/?api=1&destination=Kata%20Surf%20186%2F6%20Kata%20Road%20Karon%20Phuket&travelmode=driving';
const rinsHref = 'https://www.google.com/maps/dir/?api=1&destination=Rin%27s%20Kitchen%20202%2F8%20Patak%20Rd%20Karon%20Phuket&travelmode=driving';
const nongBioHref = 'https://www.google.com/maps/dir/?api=1&destination=Khrua%20Nong%20Bio%20Phuket&travelmode=driving';
const kwongHref = 'https://www.google.com/maps/dir/?api=1&destination=Kwong%20Shop%20Seafood%20Restaurant%2067%20Taina%20Rd%20Karon%20Phuket&travelmode=driving';

// Day 2: keep the weather-dependent A/B plan and add a Kata-area dinner after both variants return.
html = html.replace(
  /(<article id="day2"[\s\S]*?)(\s*<details class="route">)/,
  (m, before, details) => {
    if (before.includes("Rin's Kitchen")) return m;
    const dinner = `\n      <div class="event"><div class="t">19:45<span class="tz">普吉 UTC+7</span></div><div><div class="event-title"><a class="place-link" target="_blank" rel="noopener" href="${rinsHref}">Rin's Kitchen</a></div><div class="event-desc">Day 2 不论走海上 A 方案还是南部海岸 B 方案，回到 Kata / Karon 后都适合安排这顿晚餐。你的点单备忘：冬阴功海鲜汤、炒空心菜、菠萝炒饭、咖喱粉炒海鲜、青木瓜沙拉、咸蛋黄炒鱿鱼、生腌大虾、意大利肉酱面可优先；炸五花肉尽量别点太大块。</div></div></div>\n      <div class="plan"><strong>Rin's Kitchen 备忘</strong>店家热情，会中文；喜欢辣可以优先从冬阴功、空心菜和青木瓜沙拉开始。地址：202/8 Patak Rd, Karon, Mueang Phuket District, Phuket 83100。</div>`;
    return before + dinner + details;
  }
);

// Day 3: remove the old Tiger stop and use the freed morning for Kata Surf, local lunch, Patong shopping and a Karon/Kata seafood dinner.
const day3 = `    <article id="day3" class="day card" style="--day:var(--d3)">
      <div class="dayhead"><div><h3>Day 3 · Kata Surf → Patong → Karon</h3><div class="daymeta">9/26 Sat · 冲浪 + 购物 + 换酒店</div></div><span class="daybadge">体验 + 换酒店</span></div>
      <div class="event"><div class="t">08:00<span class="tz">普吉 UTC+7</span></div><div><div class="event-title">Metadee 早餐</div><div class="event-desc">第一家酒店含早餐，吃完再去海边，上午节奏不赶。</div></div></div>
      <div class="event"><div class="t">09:15<span class="tz">普吉 UTC+7</span></div><div><div class="event-title">前往 <a class="place-link" target="_blank" rel="noopener" href="${kataSurfHref}">Kata Surf</a></div><div class="event-desc">Kata Beach 一带，地址 186/6 Kata Rd, Karon, Mueang Phuket District, Phuket 83100。</div></div></div>
      <div class="event"><div class="t">09:30—10:30<span class="tz">普吉 UTC+7</span></div><div><div class="event-title">Kata Surf · 1 小时冲浪体验</div><div class="event-desc">你当前拿到的价格为 1,000 THB / 1 小时。以店家最终确认的课程内容、教练安排和当天海况为准；条件不适合就改成 Kata 海边慢逛，不硬上。</div><div class="flags"><span class="flag book">提前确认</span><span class="flag safe">以现场安全条件为准</span></div></div></div>
      <div class="event"><div class="t">10:45<span class="tz">普吉 UTC+7</span></div><div><div class="event-title">回 Metadee 冲洗、收拾行李</div><div class="event-desc">预留约 1 小时，不把冲浪后直接拖着湿衣服去购物。</div></div></div>
      <div class="event"><div class="t">11:45<span class="tz">普吉 UTC+7</span></div><div><div class="event-title">Metadee 退房</div><div class="event-desc">贵重物品随身，行李之后一路带到 Centara。</div></div></div>
      <div class="event"><div class="t">12:10<span class="tz">普吉 UTC+7</span></div><div><div class="event-title">午餐 · <a class="place-link" target="_blank" rel="noopener" href="${nongBioHref}">Khrua Nong Bio Thaifood</a></div><div class="event-desc">就在 Kata / Karon 一带，作为冲浪后的正餐比绕去其他区域更顺路。</div></div></div>
      <div class="event"><div class="t">13:20<span class="tz">普吉 UTC+7</span></div><div><div class="event-title">Kata → Patong</div><div class="event-desc">周六午后按 25—40 分钟预留，路况慢就顺延购物开始时间。</div></div></div>
      <div class="event"><div class="t">14:00<span class="tz">普吉 UTC+7</span></div><div><div class="event-title"><a class="place-link" target="_blank" rel="noopener" href="https://www.google.com/maps/dir/?api=1&destination=Jungceylon%20Shopping%20Center%20Phuket&travelmode=driving">Jungceylon 江西冷</a> + <a class="place-link" target="_blank" rel="noopener" href="https://www.google.com/maps/dir/?api=1&destination=Big%20C%20Extra%20Jungceylon%20Phuket&travelmode=driving">Big C</a></div><div class="event-desc">药妆、零食、伴手礼集中在今天解决，返程日上午不再绕芭东。</div></div></div>
      <div class="event"><div class="t">18:10<span class="tz">普吉 UTC+7</span></div><div><div class="event-title">离开 Patong → Kata / Karon</div><div class="event-desc">避开继续留在芭东吃晚饭，把晚餐放回住宿方向，路线更顺。</div></div></div>
      <div class="event"><div class="t">18:50<span class="tz">普吉 UTC+7</span></div><div><div class="event-title">晚餐 · <a class="place-link" target="_blank" rel="noopener" href="${kwongHref}">Kwong Shop Seafood Restaurant</a></div><div class="event-desc">地址：67 Taina Rd, Karon, Mueang Phuket District, Phuket 83100。海鲜和泰餐放在购物后吃，吃完再去 Centara。</div></div></div>
      <div class="event"><div class="t">20:20<span class="tz">普吉 UTC+7</span></div><div><div class="event-title">前往 <a class="place-link" target="_blank" rel="noopener" href="https://www.google.com/maps/dir/?api=1&destination=Centara%20Karon%20Resort%20Phuket&travelmode=driving">Centara Karon Resort Phuket</a></div></div></div>
      <div class="event"><div class="t">20:40<span class="tz">普吉 UTC+7</span></div><div><div class="event-title">入住 Centara，休息</div></div></div>
      <details class="route"><summary>展开 Day 3 路线图 ＋</summary><div class="routebox"><svg viewBox="0 0 700 155"><path class="route-path" d="M45 76 C118 28 177 106 244 70 S345 35 410 74 S520 104 655 70"></path><circle cx="45" cy="76" r="8" fill="var(--paper)" stroke="var(--day)" stroke-width="4"></circle><text x="7" y="116" class="route-label">Metadee</text><circle cx="180" cy="70" r="8" fill="var(--paper)" stroke="var(--day)" stroke-width="4"></circle><text x="146" y="116" class="route-label">Kata Surf</text><circle cx="310" cy="70" r="8" fill="var(--paper)" stroke="var(--day)" stroke-width="4"></circle><text x="260" y="116" class="route-label">Nong Bio</text><circle cx="455" cy="72" r="8" fill="var(--paper)" stroke="var(--day)" stroke-width="4"></circle><text x="410" y="116" class="route-label">Jungceylon</text><circle cx="570" cy="72" r="8" fill="var(--paper)" stroke="var(--day)" stroke-width="4"></circle><text x="535" y="116" class="route-label">Kwong</text><circle cx="655" cy="70" r="8" fill="var(--paper)" stroke="var(--day)" stroke-width="4"></circle><text x="620" y="116" class="route-label">Centara</text></svg><div class="route-actions"><a class="btn" target="_blank" rel="noopener" href="https://www.google.com/maps/dir/?api=1&origin=Metadee%20Concept%20Hotel%20Phuket&destination=Centara%20Karon%20Resort%20Phuket&waypoints=Kata%20Surf%20Phuket%7CKhrua%20Nong%20Bio%20Phuket%7CJungceylon%20Shopping%20Center%20Phuket%7CKwong%20Shop%20Seafood%20Restaurant%20Phuket&travelmode=driving">↗ 全天多点导航</a></div></div></details>
    </article>
`;
html = html.replace(/\s*<article id="day3"[\s\S]*?(?=\s*<article id="day4")/, '\n' + day3 + '\n');

// Checklist: restaurant choices are now concrete; add a surf confirmation item while preserving existing localStorage IDs.
html = html.replace('已完成 0 / 29', '已完成 0 / 30');
html = html.replace(
  '<li data-check-id="restaurants"><label class="prep-check"><input type="checkbox"><span class="prep-copy"><b>餐厅：</b>目前按区域留白，等后续补具体餐厅再锁定。</span></label></li>',
  '<li data-check-id="restaurants"><label class="prep-check"><input type="checkbox"><span class="prep-copy"><b>餐厅：</b>Day 2 Rin\'s Kitchen；Day 3 Khrua Nong Bio Thaifood + Kwong Shop Seafood Restaurant。出发前再看当天营业状态。</span></label></li><li data-check-id="surf-recheck"><label class="prep-check"><input type="checkbox"><span class="prep-copy"><b>Kata Surf：</b>提前确认 9/26 上午的 1 小时安排、最终价格和当天是否适合开展课程。</span></label></li>'
);

// Tips: remove the old Tiger note and add the new surf / restaurant notes.
html = html.replace(/\s*<li><b>Tiger Kingdom：<\/b>[\s\S]*?<\/li>/, '');
html = html.replace(
  '<li><b>Jungceylon：</b>',
  '<li><b>Kata Surf：</b>安排在 Day 3 上午，当前参考价 1,000 THB / 1 小时；出发前确认最终课程内容和当天条件。</li>\n    <li><b>Kata / Karon 餐厅：</b>Day 2 晚餐优先 Rin\'s Kitchen；Day 3 午餐 Khrua Nong Bio Thaifood，购物后回程在 Kwong Shop Seafood Restaurant 吃晚餐。</li>\n    <li><b>Jungceylon：</b>'
);

// Countdown / next-event timeline follows the revised Day 3 schedule.
html = html.replace('{iso:"2026-09-26T09:00:00+07:00",title:"Metadee 早餐、退房",tz:"Asia/Bangkok",label:"普吉 UTC+7"},', '{iso:"2026-09-26T08:00:00+07:00",title:"Metadee 早餐",tz:"Asia/Bangkok",label:"普吉 UTC+7"},');
html = html.replace('{iso:"2026-09-26T10:30:00+07:00",title:"Tiger Kingdom · 餐厅 / 观赏区",tz:"Asia/Bangkok",label:"普吉 UTC+7"},', '{iso:"2026-09-26T09:30:00+07:00",title:"Kata Surf · 1 小时体验",tz:"Asia/Bangkok",label:"普吉 UTC+7"},\n{iso:"2026-09-26T11:45:00+07:00",title:"Metadee 退房",tz:"Asia/Bangkok",label:"普吉 UTC+7"},');
html = html.replace('{iso:"2026-09-26T13:30:00+07:00",title:"Jungceylon + Big C 购物",tz:"Asia/Bangkok",label:"普吉 UTC+7"},', '{iso:"2026-09-26T14:00:00+07:00",title:"Jungceylon + Big C 购物",tz:"Asia/Bangkok",label:"普吉 UTC+7"},\n{iso:"2026-09-26T18:50:00+07:00",title:"Kwong Shop Seafood 晚餐",tz:"Asia/Bangkok",label:"普吉 UTC+7"},');
html = html.replace('{iso:"2026-09-26T21:00:00+07:00",title:"Centara Karon 入住",tz:"Asia/Bangkok",label:"普吉 UTC+7"},', '{iso:"2026-09-26T20:40:00+07:00",title:"Centara Karon 入住",tz:"Asia/Bangkok",label:"普吉 UTC+7"},');

// Safety and consistency assertions for this public guide.
if (html.includes('Tiger Kingdom')) throw new Error('Old Tiger stop still present');
if (!html.includes("Rin's Kitchen") || !html.includes('Kata Surf') || !html.includes('Kwong Shop Seafood Restaurant')) throw new Error('Expected revised itinerary markers missing');

await writeFile(path, html, 'utf8');
console.log('Updated Phuket itinerary safely');
