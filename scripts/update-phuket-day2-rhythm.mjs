import { readFile, writeFile } from 'node:fs/promises';

const path = 'public/trips/2026/09-24-phuket/index.html';
let html = await readFile(path, 'utf8');

const day2Start = html.indexOf('<article id="day2"');
const day3Start = html.indexOf('<article id="day3"');
const day4Start = html.indexOf('<article id="day4"');
if (day2Start < 0 || day3Start < 0 || day4Start < 0) throw new Error('Could not locate Day 2/3/4 blocks');

const day2 = `<article id="day2" class="day card" style="--day:var(--d2)">
      <div class="dayhead"><div><h3>Day 2 · 海上项目（可选） / Kata 慢节奏日（默认）</h3><div class="daymeta">9/25 Fri · 默认不早起，按 10:00 起床节奏排</div></div><span class="daybadge">默认 B · 慢节奏</span></div>
      <div class="option-grid">
        <div class="option"><b>方案 A · 海上项目（仅提前确认后）</b>只有在前一晚已经确认正规运营方、接送和当天条件，并且愿意为此早起时才执行。<br><span class="note">海上项目通常无法按“10 点起床、近 12 点出门”的节奏进行；不想早起就直接选 B，不再硬塞南部景点。</span></div>
        <div class="option"><b>方案 B · Kata 慢节奏日（默认）</b>10:00 起床 → 接近 12:00 出门 → Kata 海边 / Kata Surf 受指导体验（以正规教练和当天条件为准）→ 午餐 → 回酒店休息 → Kata / Karon 晚餐。<br><span class="note">不再安排 Karon Viewpoint、Nai Harn、Rawai、Promthep Cape 这些需要上午连续跑点的路线。</span></div>
      </div>
      <div class="event"><div class="t">10:00<span class="tz">普吉 UTC+7</span></div><div><div class="event-title">自然醒、洗漱、化妆</div><div class="event-desc">这一天按你们真实旅行节奏走，不为了打卡景点强行早起。</div></div></div>
      <div class="event"><div class="t">11:45<span class="tz">普吉 UTC+7</span></div><div><div class="event-title">从 Metadee 出门 → Kata Beach 一带</div><div class="event-desc">酒店就在 Kata，减少跨区移动，把时间留给真正想做的体验。</div></div></div>
      <div class="event"><div class="t">12:15—13:15<span class="tz">普吉 UTC+7</span></div><div><div class="event-title"><a class="place-link" target="_blank" rel="noopener" href="https://www.google.com/maps/dir/?api=1&amp;destination=Kata%20Surf%20186%2F6%20Kata%20Road%20Karon%20Phuket&amp;travelmode=driving">Kata Surf</a> · 受指导体验</div><div class="event-desc">当前参考价 1,000 THB / 1 小时。具体时段以店家预约、正规教练评估和当天海况为准；条件不合适就改为 Kata 海边慢逛 / 咖啡休息。</div><div class="flags"><span class="flag book">提前确认</span><span class="flag safe">以现场安全判断为准</span></div></div></div>
      <div class="event"><div class="t">13:40<span class="tz">普吉 UTC+7</span></div><div><div class="event-title">午餐 · <a class="place-link" target="_blank" rel="noopener" href="https://www.google.com/maps/dir/?api=1&amp;destination=Khrua%20Nong%20Bio%20Phuket&amp;travelmode=driving">Khrua Nong Bio Thaifood</a></div><div class="event-desc">放在 Kata / Karon 附近解决，不再为了午餐额外跑远。</div></div></div>
      <div class="event"><div class="t">15:00<span class="tz">普吉 UTC+7</span></div><div><div class="event-title">回 Metadee 冲洗 / 午休 / 自由活动</div><div class="event-desc">下午留足休息，不继续堆景点；想出门就只在 Kata 周边散步、咖啡或海边。</div></div></div>
      <div class="event"><div class="t">18:30<span class="tz">普吉 UTC+7</span></div><div><div class="event-title">晚餐 · <a class="place-link" target="_blank" rel="noopener" href="https://www.google.com/maps/dir/?api=1&amp;destination=Rin%27s%20Kitchen%20202%2F8%20Patak%20Rd%20Karon%20Phuket&amp;travelmode=driving">Rin's Kitchen</a></div><div class="event-desc">点单备忘：冬阴功海鲜汤、炒空心菜、菠萝炒饭、咖喱粉炒海鲜、青木瓜沙拉、咸蛋黄炒鱿鱼、生腌大虾、意大利肉酱面可优先；炸五花肉尽量别点太大块。</div></div></div>
      <div class="plan"><strong>Rin's Kitchen 备忘</strong>店家热情，会中文；喜欢辣可以优先从冬阴功、空心菜和青木瓜沙拉开始。地址：202/8 Patak Rd, Karon, Mueang Phuket District, Phuket 83100。</div>
      <div class="event"><div class="t">20:30<span class="tz">普吉 UTC+7</span></div><div><div class="event-title">Kata / Karon 随意散步 → 回酒店</div><div class="event-desc">第二天是换酒店 + 购物日，今晚不用排到太晚。</div></div></div>
      <details class="route"><summary>展开 Day 2 路线图 ＋</summary><div class="routebox"><svg viewBox="0 0 700 155"><path class="route-path" d="M55 72 C150 30 230 108 330 70 S500 35 650 72"></path><circle cx="55" cy="72" r="8" fill="var(--paper)" stroke="var(--day)" stroke-width="4"></circle><text x="20" y="112" class="route-label">Metadee</text><circle cx="245" cy="72" r="8" fill="var(--paper)" stroke="var(--day)" stroke-width="4"></circle><text x="210" y="112" class="route-label">Kata Surf</text><circle cx="430" cy="72" r="8" fill="var(--paper)" stroke="var(--day)" stroke-width="4"></circle><text x="382" y="112" class="route-label">Nong Bio</text><circle cx="650" cy="72" r="8" fill="var(--paper)" stroke="var(--day)" stroke-width="4"></circle><text x="605" y="112" class="route-label">Rin's Kitchen</text></svg><div class="route-actions"><a class="btn" target="_blank" rel="noopener" href="https://www.google.com/maps/dir/?api=1&amp;origin=Metadee%20Concept%20Hotel%20Phuket&amp;destination=Rin%27s%20Kitchen%20Karon%20Phuket&amp;waypoints=Kata%20Surf%20Phuket%7CKhrua%20Nong%20Bio%20Phuket&amp;travelmode=driving">↗ 默认 B 方案导航</a><span class="btn">A 方案：仅正式预订后执行</span></div></div></details>
    </article>

    `;

const day3 = `<article id="day3" class="day card" style="--day:var(--d3)">
      <div class="dayhead"><div><h3>Day 3 · 退房 → Patong 购物 → Karon</h3><div class="daymeta">9/26 Sat · 上午不塞活动，唯一硬节点是 12:00 前退房</div></div><span class="daybadge">换酒店 + 购物</span></div>
      <div class="event"><div class="t">10:00<span class="tz">普吉 UTC+7</span></div><div><div class="event-title">起床、收拾、化妆</div><div class="event-desc">这天不再安排冲浪或景点。因为 Metadee 12:00 前退房，建议前一晚先把大部分行李收好。</div></div></div>
      <div class="event"><div class="t">11:45<span class="tz">普吉 UTC+7</span></div><div><div class="event-title">Metadee 退房</div><div class="event-desc">贵重物品随身，行李之后一路带到 Centara。</div></div></div>
      <div class="event"><div class="t">12:10<span class="tz">普吉 UTC+7</span></div><div><div class="event-title">Kata / Karon 简单午餐</div><div class="event-desc">不锁死餐厅；如果 Day 2 没吃到 Khrua Nong Bio，也可以顺延到今天。</div></div></div>
      <div class="event"><div class="t">13:10<span class="tz">普吉 UTC+7</span></div><div><div class="event-title">Kata / Karon → Patong</div><div class="event-desc">周六午后按 25—40 分钟预留，路况慢就顺延购物时间。</div></div></div>
      <div class="event"><div class="t">14:00<span class="tz">普吉 UTC+7</span></div><div><div class="event-title"><a class="place-link" target="_blank" rel="noopener" href="https://www.google.com/maps/dir/?api=1&amp;destination=Jungceylon%20Shopping%20Center%20Phuket&amp;travelmode=driving">Jungceylon 江西冷</a> + <a class="place-link" target="_blank" rel="noopener" href="https://www.google.com/maps/dir/?api=1&amp;destination=Big%20C%20Extra%20Jungceylon%20Phuket&amp;travelmode=driving">Big C</a></div><div class="event-desc">药妆、零食、伴手礼集中在今天解决，返程日上午不再绕芭东。</div></div></div>
      <div class="event"><div class="t">18:10<span class="tz">普吉 UTC+7</span></div><div><div class="event-title">离开 Patong → Kata / Karon</div><div class="event-desc">不在芭东拖太晚，把晚餐放回住宿方向，路线更顺。</div></div></div>
      <div class="event"><div class="t">18:50<span class="tz">普吉 UTC+7</span></div><div><div class="event-title">晚餐 · <a class="place-link" target="_blank" rel="noopener" href="https://www.google.com/maps/dir/?api=1&amp;destination=Kwong%20Shop%20Seafood%20Restaurant%2067%20Taina%20Rd%20Karon%20Phuket&amp;travelmode=driving">Kwong Shop Seafood Restaurant</a></div><div class="event-desc">地址：67 Taina Rd, Karon, Mueang Phuket District, Phuket 83100。吃完再去 Centara，避免入住后重新折返。</div></div></div>
      <div class="event"><div class="t">20:20<span class="tz">普吉 UTC+7</span></div><div><div class="event-title">前往 <a class="place-link" target="_blank" rel="noopener" href="https://www.google.com/maps/dir/?api=1&amp;destination=Centara%20Karon%20Resort%20Phuket&amp;travelmode=driving">Centara Karon Resort Phuket</a></div></div></div>
      <div class="event"><div class="t">20:40<span class="tz">普吉 UTC+7</span></div><div><div class="event-title">入住 Centara，休息</div></div></div>
      <details class="route"><summary>展开 Day 3 路线图 ＋</summary><div class="routebox"><svg viewBox="0 0 700 155"><path class="route-path" d="M55 72 C180 25 310 108 435 70 S560 42 650 72"></path><circle cx="55" cy="72" r="8" fill="var(--paper)" stroke="var(--day)" stroke-width="4"></circle><text x="20" y="112" class="route-label">Metadee</text><circle cx="330" cy="70" r="8" fill="var(--paper)" stroke="var(--day)" stroke-width="4"></circle><text x="286" y="112" class="route-label">Jungceylon</text><circle cx="520" cy="70" r="8" fill="var(--paper)" stroke="var(--day)" stroke-width="4"></circle><text x="483" y="112" class="route-label">Kwong</text><circle cx="650" cy="72" r="8" fill="var(--paper)" stroke="var(--day)" stroke-width="4"></circle><text x="615" y="112" class="route-label">Centara</text></svg><div class="route-actions"><a class="btn" target="_blank" rel="noopener" href="https://www.google.com/maps/dir/?api=1&amp;origin=Metadee%20Concept%20Hotel%20Phuket&amp;destination=Centara%20Karon%20Resort%20Phuket&amp;waypoints=Jungceylon%20Shopping%20Center%20Phuket%7CKwong%20Shop%20Seafood%20Restaurant%20Phuket&amp;travelmode=driving">↗ 全天多点导航</a></div></div></details>
    </article>


    `;

html = html.slice(0, day2Start) + day2 + day3 + html.slice(day4Start);

html = html.replace(
  '{iso:"2026-09-25T07:00:00+07:00",title:"Day 2 · 海况最终确认",tz:"Asia/Bangkok",label:"普吉 UTC+7"},',
  '{iso:"2026-09-25T11:45:00+07:00",title:"Day 2 · Kata 慢节奏日出门",tz:"Asia/Bangkok",label:"普吉 UTC+7"},\n{iso:"2026-09-25T12:15:00+07:00",title:"Kata Surf · 受指导体验（条件适合时）",tz:"Asia/Bangkok",label:"普吉 UTC+7"},\n{iso:"2026-09-25T18:30:00+07:00",title:"Rin\'s Kitchen 晚餐",tz:"Asia/Bangkok",label:"普吉 UTC+7"},'
);
html = html.replace('{iso:"2026-09-26T08:00:00+07:00",title:"Metadee 早餐",tz:"Asia/Bangkok",label:"普吉 UTC+7"},', '{iso:"2026-09-26T10:00:00+07:00",title:"Day 3 · 起床、收拾、准备退房",tz:"Asia/Bangkok",label:"普吉 UTC+7"},');
html = html.replace(/\n\{iso:"2026-09-26T09:30:00\+07:00",title:"Kata Surf · 1 小时体验",tz:"Asia\/Bangkok",label:"普吉 UTC\+7"\},/, '');

html = html.replace('<b>Day 2 海况：</b>看最新天气与正规运营方通知，决定跳岛还是南部海岸 B 方案。', '<b>Day 2 选择：</b>前一晚决定是否真的参加需要早起的海上项目；不参加就按中午出门的 Kata 慢节奏 B 方案。');
html = html.replace('<b>Day 2 B 方案：</b>海况不佳就走 Karon Viewpoint → Nai Harn → Rawai → Promthep Cape。', '<b>Day 2 B 方案：</b>默认 10:00 起床、接近 12:00 出门，以 Kata 周边轻松安排为主，不再跑南部连续景点。');
html = html.replace('<b>餐厅：</b>Day 2 Rin\'s Kitchen；Day 3 Khrua Nong Bio Thaifood + Kwong Shop Seafood Restaurant。出发前再看当天营业状态。', '<b>餐厅：</b>Day 2 Khrua Nong Bio Thaifood + Rin\'s Kitchen；Day 3 Kwong Shop Seafood Restaurant。出发前再看当天营业状态。');
html = html.replace('<b>Kata Surf：</b>提前确认 9/26 上午的 1 小时安排、最终价格和当天是否适合开展课程。', '<b>Kata Surf：</b>提前确认 9/25 中午后的可预约时段、最终价格，以及正规教练是否认为当天条件适合开展课程。');
html = html.replace('<li><b>Promthep Cape：</b>9/25 普吉日落约 18:20，所以南部海岸线安排为 16:45 左右抵达，而不是行程图里的 14:00。</li>', '<li><b>Day 2 节奏：</b>不去海上项目时不再跑 Karon Viewpoint / Nai Harn / Rawai / Promthep Cape；默认 10:00 起床、接近中午出门，把时间留在 Kata。</li>');
html = html.replace('<li><b>Kata Surf：</b>安排在 Day 3 上午，当前参考价 1,000 THB / 1 小时；出发前确认最终课程内容和当天条件。</li>', '<li><b>Kata Surf：</b>改到 Day 2 中午后，当前参考价 1,000 THB / 1 小时；仅在正规教练和当天条件确认适合时参加。</li>');
html = html.replace('<li><b>Kata / Karon 餐厅：</b>Day 2 晚餐优先 Rin\'s Kitchen；Day 3 午餐 Khrua Nong Bio Thaifood，购物后回程在 Kwong Shop Seafood Restaurant 吃晚餐。</li>', '<li><b>Kata / Karon 餐厅：</b>Day 2 午餐 Khrua Nong Bio Thaifood、晚餐 Rin\'s Kitchen；Day 3 购物后回程在 Kwong Shop Seafood Restaurant 吃晚餐。</li>');

await writeFile(path, html, 'utf8');
console.log('Updated Day 2 to late-start Kata rhythm and simplified Day 3 morning');
