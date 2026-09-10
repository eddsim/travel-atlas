import { readFile, writeFile } from 'node:fs/promises';

const path = 'public/trips/2026/09-24-phuket/index.html';
let html = await readFile(path, 'utf8');

const day3Start = html.indexOf('<article id="day3"');
const day4Start = html.indexOf('<article id="day4"');
if (day3Start < 0 || day4Start < 0) throw new Error('Could not locate Day 3/4 blocks');

const day3 = `<article id="day3" class="day card" style="--day:var(--d3)">
      <div class="dayhead"><div><h3>Day 3 · 退房 → Jungceylon 寄存行李 → 购物 / 晚餐 → Karon</h3><div class="daymeta">9/26 Sat · 行李直接带去芭东，减少折返和打车次数</div></div><span class="daybadge">换酒店 + 购物</span></div>
      <div class="event"><div class="t">10:00<span class="tz">普吉 UTC+7</span></div><div><div class="event-title">起床、收拾、化妆</div><div class="event-desc">这天上午不塞活动，唯一硬节点是 Metadee 12:00 前退房；前一晚先把大部分行李收好会更轻松。</div></div></div>
      <div class="event"><div class="t">11:45<span class="tz">普吉 UTC+7</span></div><div><div class="event-title">Metadee 退房</div><div class="event-desc">贵重物品随身，其余行李直接一起带去 Patong，不先绕去 Centara。</div></div></div>
      <div class="event"><div class="t">12:00<span class="tz">普吉 UTC+7</span></div><div><div class="event-title">Kata → <a class="place-link" target="_blank" rel="noopener" href="https://www.google.com/maps/dir/?api=1&amp;destination=Jungceylon%20Shopping%20Center%20Phuket&amp;travelmode=driving">Jungceylon 江西冷</a></div><div class="event-desc">直接带着行李去芭东，正常按 25—40 分钟车程预留。</div></div></div>
      <div class="event"><div class="t">12:40<span class="tz">普吉 UTC+7</span></div><div><div class="event-title">寄存行李 · <a class="place-link" target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&amp;query=MeSpace%20Locker%20Jungceylon%20Phuket">MeSpace Locker @ Jungceylon</a></div><div class="event-desc">优先找 The Bay Zone G Floor 的 Tourist Service Center / drop-off 一带；商场官方也列有 The Jungle Zone B Floor 的另一处 Locker。寄存好以后当天都不用拖着箱子逛。</div><div class="flags"><span class="flag safe">官方商场寄存点</span></div></div></div>
      <div class="event"><div class="t">13:00<span class="tz">普吉 UTC+7</span></div><div><div class="event-title">Jungceylon / Patong 午餐</div><div class="event-desc">午餐直接在商场或步行范围内解决，不为了餐厅额外叫车。</div></div></div>
      <div class="event"><div class="t">14:00<span class="tz">普吉 UTC+7</span></div><div><div class="event-title"><a class="place-link" target="_blank" rel="noopener" href="https://www.google.com/maps/dir/?api=1&amp;destination=Jungceylon%20Shopping%20Center%20Phuket&amp;travelmode=driving">Jungceylon 江西冷</a> + <a class="place-link" target="_blank" rel="noopener" href="https://www.google.com/maps/dir/?api=1&amp;destination=Big%20C%20Extra%20Jungceylon%20Phuket&amp;travelmode=driving">Big C</a></div><div class="event-desc">药妆、零食、伴手礼集中处理；行李已经寄存，可以慢慢逛。</div></div></div>
      <div class="event"><div class="t">18:30<span class="tz">普吉 UTC+7</span></div><div><div class="event-title">Patong / Jungceylon 晚餐</div><div class="event-desc">晚餐继续留在商场或步行范围内解决，吃完再一次性拿行李去 Karon。</div></div></div>
      <div class="event"><div class="t">20:00<span class="tz">普吉 UTC+7</span></div><div><div class="event-title">取回行李 → 叫车前往 <a class="place-link" target="_blank" rel="noopener" href="https://www.google.com/maps/dir/?api=1&amp;destination=Centara%20Karon%20Resort%20Phuket&amp;travelmode=driving">Centara Karon Resort Phuket</a></div><div class="event-desc">这一天实际只需要两段主要打车：Metadee → Jungceylon、Jungceylon → Centara。</div></div></div>
      <div class="event"><div class="t">20:40—21:00<span class="tz">普吉 UTC+7</span></div><div><div class="event-title">入住 Centara，休息</div><div class="event-desc">周六晚 Patong → Karon 路况有波动，按约 25—40 分钟预留。</div></div></div>
      <div class="plan"><strong>Kwong Shop Seafood</strong>不再固定塞进 Day 3。它保留为 Karon 区备选餐厅，哪天想吃、时间合适再去，比为了吃一顿饭多打一段车更合理。</div>
      <details class="route"><summary>展开 Day 3 路线图 ＋</summary><div class="routebox"><svg viewBox="0 0 700 150"><path class="route-path" d="M65 72 C230 30 395 110 635 72"></path><circle cx="65" cy="72" r="8" fill="var(--paper)" stroke="var(--day)" stroke-width="4"></circle><text x="24" y="112" class="route-label">Metadee</text><circle cx="350" cy="72" r="8" fill="var(--paper)" stroke="var(--day)" stroke-width="4"></circle><text x="297" y="112" class="route-label">Jungceylon</text><circle cx="635" cy="72" r="8" fill="var(--paper)" stroke="var(--day)" stroke-width="4"></circle><text x="595" y="112" class="route-label">Centara</text></svg><div class="route-actions"><a class="btn" target="_blank" rel="noopener" href="https://www.google.com/maps/dir/?api=1&amp;origin=Metadee%20Concept%20Hotel%20Phuket&amp;destination=Centara%20Karon%20Resort%20Phuket&amp;waypoints=Jungceylon%20Shopping%20Center%20Phuket&amp;travelmode=driving">↗ 当天主路线导航</a></div></div></details>
    </article>

    `;

html = html.slice(0, day3Start) + day3 + html.slice(day4Start);

html = html.replace(
  /<li data-check-id="day3-luggage">[\s\S]*?<\/li>/,
  '<li data-check-id="day3-luggage"><label class="prep-check"><input type="checkbox"><span class="prep-copy"><b>Day 3 行李：</b>Metadee 退房后直接带去 Jungceylon，优先寄存在 MeSpace Locker；购物和晚餐结束后取回，再一次性前往 Centara。</span></label></li>'
);

html = html.replace(
  '<li><b>Kata / Karon 餐厅：</b>Day 2 晚餐优先 Rin\'s Kitchen；Day 3 午餐 Khrua Nong Bio Thaifood，购物后回程在 Kwong Shop Seafood Restaurant 吃晚餐。</li>',
  '<li><b>Kata / Karon 餐厅：</b>Day 2 优先 Khrua Nong Bio Thaifood + Rin\'s Kitchen；Kwong Shop Seafood Restaurant 保留为 Karon 区备选，不再为了它单独增加 Day 3 打车。</li>'
);

html = html.replace(
  '<li><b>Jungceylon：</b>主商场通常 11:00—22:00，Big C 约 09:00—23:00；因此购物集中放 Day 3，返程日上午不再绕芭东。</li>',
  '<li><b>Jungceylon：</b>Day 3 退房后直接把行李带去芭东；商场官方提供 MeSpace Locker 行李寄存，寄存后在 Jungceylon / Big C 购物和吃饭，晚上取行李后直接去 Centara，减少折返。</li>'
);

html = html.replace(
  '{iso:"2026-09-26T14:00:00+07:00",title:"Jungceylon + Big C 购物",tz:"Asia/Bangkok",label:"普吉 UTC+7"},\n{iso:"2026-09-26T18:50:00+07:00",title:"Kwong Shop Seafood 晚餐",tz:"Asia/Bangkok",label:"普吉 UTC+7"},\n{iso:"2026-09-26T20:40:00+07:00",title:"Centara Karon 入住",tz:"Asia/Bangkok",label:"普吉 UTC+7"},',
  '{iso:"2026-09-26T12:40:00+07:00",title:"Jungceylon · 寄存行李",tz:"Asia/Bangkok",label:"普吉 UTC+7"},\n{iso:"2026-09-26T14:00:00+07:00",title:"Jungceylon + Big C 购物",tz:"Asia/Bangkok",label:"普吉 UTC+7"},\n{iso:"2026-09-26T18:30:00+07:00",title:"Patong / Jungceylon 晚餐",tz:"Asia/Bangkok",label:"普吉 UTC+7"},\n{iso:"2026-09-26T20:00:00+07:00",title:"取行李 → Centara Karon",tz:"Asia/Bangkok",label:"普吉 UTC+7"},\n{iso:"2026-09-26T20:50:00+07:00",title:"Centara Karon 入住",tz:"Asia/Bangkok",label:"普吉 UTC+7"},'
);

await writeFile(path, html, 'utf8');
console.log('Updated Day 3 to direct Jungceylon luggage-storage flow');
