import { readFile, writeFile } from 'node:fs/promises';

const path = 'public/trips/2026/09-24-phuket/index.html';
let html = await readFile(path, 'utf8');

const day2Start = html.indexOf('<article id="day2"');
const day3Start = html.indexOf('<article id="day3"');
if (day2Start < 0 || day3Start < 0) throw new Error('Could not locate Day 2/3 blocks');

const day2 = `<article id="day2" class="day card" style="--day:var(--d2)">
      <div class="dayhead"><div><h3>Day 2 · 海上项目（可选） / Kata 慢节奏日（默认）</h3><div class="daymeta">9/25 Fri · 默认不早起，按 10:00 起床节奏排</div></div><span class="daybadge">默认 B · 慢节奏</span></div>
      <div class="option-grid">
        <div class="option"><b>方案 A · 海上项目（仅提前确认后）</b>只有在前一晚已经确认正规运营方、接送和当天条件，并且愿意为此早起时才执行。<br><span class="note">海上项目通常无法按“10 点起床、近 12 点出门”的节奏进行；不想早起就直接选 B。</span></div>
        <div class="option"><b>方案 B · Kata 慢节奏日（默认）</b>10:00 起床 → 接近 12:00 出门 → 午餐 / 咖啡 → 午休 → 15:30 后 Kata Surf 受指导体验（以正规教练和当天条件为准）→ 回酒店冲洗 → Kata / Karon 晚餐。<br><span class="note">把户外体验放到下午，避开正午曝晒；不再安排 Karon Viewpoint、Nai Harn、Rawai、Promthep Cape 等跑点路线。</span></div>
      </div>
      <div class="event"><div class="t">10:00<span class="tz">普吉 UTC+7</span></div><div><div class="event-title">自然醒、洗漱、化妆</div><div class="event-desc">这一天按你们真实旅行节奏走，不为了打卡景点强行早起。</div></div></div>
      <div class="event"><div class="t">11:45<span class="tz">普吉 UTC+7</span></div><div><div class="event-title">从 Metadee 出门</div><div class="event-desc">中午先安排吃饭和室内 / 阴凉处活动，不把冲浪塞在最晒的时候。</div></div></div>
      <div class="event"><div class="t">12:15<span class="tz">普吉 UTC+7</span></div><div><div class="event-title">午餐 · <a class="place-link" target="_blank" rel="noopener" href="https://www.google.com/maps/dir/?api=1&amp;destination=Khrua%20Nong%20Bio%20Phuket&amp;travelmode=driving">Khrua Nong Bio Thaifood</a></div><div class="event-desc">放在 Kata / Karon 附近解决，吃完不用跨区。</div></div></div>
      <div class="event"><div class="t">13:30<span class="tz">普吉 UTC+7</span></div><div><div class="event-title">回 Metadee 午休 / 咖啡 / 自由活动</div><div class="event-desc">把最热的 13:00—15:00 留给休息，想出门也只在 Kata 周边轻松活动。</div></div></div>
      <div class="event"><div class="t">15:15<span class="tz">普吉 UTC+7</span></div><div><div class="event-title">前往 <a class="place-link" target="_blank" rel="noopener" href="https://www.google.com/maps/dir/?api=1&amp;destination=Kata%20Surf%20186%2F6%20Kata%20Road%20Karon%20Phuket&amp;travelmode=driving">Kata Surf</a></div><div class="event-desc">预留签到和与教练确认当天条件的时间。</div></div></div>
      <div class="event"><div class="t">15:30—16:30<span class="tz">普吉 UTC+7</span></div><div><div class="event-title">Kata Surf · 1 小时受指导体验</div><div class="event-desc">当前参考价 1,000 THB / 1 小时。具体是否开展、时段与内容以正规教练和当天海况判断为准；条件不适合就改成 Kata 海边慢逛 / 咖啡休息。</div><div class="flags"><span class="flag book">提前确认</span><span class="flag safe">以现场安全判断为准</span></div></div></div>
      <div class="event"><div class="t">16:45<span class="tz">普吉 UTC+7</span></div><div><div class="event-title">回 Metadee 冲洗、休息</div><div class="event-desc">留足时间换衣服和休息，晚餐不用赶。</div></div></div>
      <div class="event"><div class="t">18:30<span class="tz">普吉 UTC+7</span></div><div><div class="event-title">晚餐 · <a class="place-link" target="_blank" rel="noopener" href="https://www.google.com/maps/dir/?api=1&amp;destination=Rin%27s%20Kitchen%20202%2F8%20Patak%20Rd%20Karon%20Phuket&amp;travelmode=driving">Rin's Kitchen</a></div><div class="event-desc">点单备忘：冬阴功海鲜汤、炒空心菜、菠萝炒饭、咖喱粉炒海鲜、青木瓜沙拉、咸蛋黄炒鱿鱼、生腌大虾、意大利肉酱面可优先；炸五花肉尽量别点太大块。</div></div></div>
      <div class="plan"><strong>Rin's Kitchen 备忘</strong>店家热情，会中文；喜欢辣可以优先从冬阴功、空心菜和青木瓜沙拉开始。地址：202/8 Patak Rd, Karon, Mueang Phuket District, Phuket 83100。</div>
      <div class="event"><div class="t">20:30<span class="tz">普吉 UTC+7</span></div><div><div class="event-title">Kata / Karon 随意散步 → 回酒店</div><div class="event-desc">第二天是换酒店 + 购物日，今晚不用排到太晚。</div></div></div>
      <details class="route"><summary>展开 Day 2 路线图 ＋</summary><div class="routebox"><svg viewBox="0 0 700 155"><path class="route-path" d="M55 72 C150 30 230 108 330 70 S500 35 650 72"></path><circle cx="55" cy="72" r="8" fill="var(--paper)" stroke="var(--day)" stroke-width="4"></circle><text x="20" y="112" class="route-label">Metadee</text><circle cx="245" cy="72" r="8" fill="var(--paper)" stroke="var(--day)" stroke-width="4"></circle><text x="200" y="112" class="route-label">Nong Bio</text><circle cx="430" cy="72" r="8" fill="var(--paper)" stroke="var(--day)" stroke-width="4"></circle><text x="395" y="112" class="route-label">Kata Surf</text><circle cx="650" cy="72" r="8" fill="var(--paper)" stroke="var(--day)" stroke-width="4"></circle><text x="605" y="112" class="route-label">Rin's Kitchen</text></svg><div class="route-actions"><a class="btn" target="_blank" rel="noopener" href="https://www.google.com/maps/dir/?api=1&amp;origin=Metadee%20Concept%20Hotel%20Phuket&amp;destination=Rin%27s%20Kitchen%20Karon%20Phuket&amp;waypoints=Khrua%20Nong%20Bio%20Phuket%7CMetadee%20Concept%20Hotel%20Phuket%7CKata%20Surf%20Phuket&amp;travelmode=driving">↗ 默认 B 方案导航</a><span class="btn">A 方案：仅正式预订后执行</span></div></div></details>
    </article>

    `;

html = html.slice(0, day2Start) + day2 + html.slice(day3Start);
html = html.replace(
  '{iso:"2026-09-25T12:15:00+07:00",title:"Kata Surf · 受指导体验（条件适合时）",tz:"Asia/Bangkok",label:"普吉 UTC+7"},',
  '{iso:"2026-09-25T12:15:00+07:00",title:"Khrua Nong Bio 午餐",tz:"Asia/Bangkok",label:"普吉 UTC+7"},\n{iso:"2026-09-25T15:30:00+07:00",title:"Kata Surf · 受指导体验（条件适合时）",tz:"Asia/Bangkok",label:"普吉 UTC+7"},'
);
html = html.replace(
  '<li><b>Kata Surf：</b>安排在 Day 2 中午前后，当前参考价 1,000 THB / 1 小时；出发前确认最终课程内容和当天条件。</li>',
  '<li><b>Kata Surf：</b>安排在 Day 2 15:30 后，避开正午曝晒；当前参考价 1,000 THB / 1 小时，出发前确认最终时段和当天条件。</li>'
);
await writeFile(path, html, 'utf8');
console.log('Moved Day 2 Kata Surf to 15:30 and reordered lunch/rest');
