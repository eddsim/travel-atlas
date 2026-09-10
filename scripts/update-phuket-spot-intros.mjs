import { readFile, writeFile } from 'node:fs/promises';

const htmlPath = 'public/trips/2026/09-24-phuket/index.html';
const standardPath = 'docs/TRAVEL_GUIDE_STANDARD.md';
let html = await readFile(htmlPath, 'utf8');
let standard = await readFile(standardPath, 'utf8');

const replaceOnce = (source, from, to, label) => {
  if (!source.includes(from)) throw new Error(`Missing target: ${label}`);
  return source.replace(from, to);
};

if (!html.includes('.spot-note{')) {
  html = replaceOnce(
    html,
    '.event-desc{font-size:13px;color:var(--muted)}.flags{display:flex;gap:6px;flex-wrap:wrap}',
    '.event-desc{font-size:13px;color:var(--muted)}.spot-note{margin-top:8px;padding:10px 11px;border-left:3px solid var(--day);border-radius:12px;background:color-mix(in srgb,var(--day) 7%,var(--paper));font-size:12px;color:var(--muted)}.spot-note b{display:block;margin-bottom:3px;color:var(--ink);font-size:12px}.spot-tags{display:flex;gap:5px;flex-wrap:wrap;margin-top:7px}.spot-tag{display:inline-flex;align-items:center;padding:3px 7px;border-radius:999px;background:var(--chip);color:var(--muted);font-size:10px;font-weight:850}.flags{display:flex;gap:6px;flex-wrap:wrap}',
    'spot-note css'
  );
}

html = html.replace(
  '<div class="section-title"><h2>逐日行程</h2><small>按你之前的行程图重排，并修正时间冲突</small></div>',
  '<div class="section-title"><h2>逐日行程</h2><small>时间轴 + 景点 / 活动介绍 + 特色说明</small></div>'
);

const upgrades = [
  [
    '<div class="event-title">Kwong Shop Seafood · 晚餐</div><div class="event-desc">落地日不再把夜市当正餐，先好好吃饭；出发前再确认当天营业状态。</div>',
    '<div class="event-title">Kwong Shop Seafood · 晚餐</div><div class="event-desc">落地日不再把夜市当正餐，先好好吃饭；出发前再确认当天营业状态。</div><div class="spot-note"><b>✨ 这里有什么特色？</b>把它当作抵达普吉后的第一顿正式海鲜晚餐更合适：能坐下来慢慢吃，比落地后直接靠夜市小吃填肚子更舒服，也顺手把原本 Day 3 会产生折返的餐厅提前解决。<div class="spot-tags"><span class="spot-tag">海鲜晚餐</span><span class="spot-tag">落地第一餐</span><span class="spot-tag">Kata / Karon</span></div></div>'
  ],
  [
    '<div class="event-title">体力允许再去 <a class="place-link" target="_blank" rel="noopener" href="https://www.google.com/maps/dir/?api=1&amp;destination=Kata%20Night%20Market%20Phuket&amp;travelmode=driving" data-copy-ready="1">Kata Night Market</a><button type="button" class="copy-place after-link" aria-label="复制地点" data-copy-text="Kata Night Market Phuket">⧉ <span>复制</span></button></div><div class="event-desc">这里只当饭后散步、买水果和小吃；如果落地太累或下雨，直接回酒店，不影响主线。</div>',
    '<div class="event-title">体力允许再去 <a class="place-link" target="_blank" rel="noopener" href="https://www.google.com/maps/dir/?api=1&amp;destination=Kata%20Night%20Market%20Phuket&amp;travelmode=driving" data-copy-ready="1">Kata Night Market</a><button type="button" class="copy-place after-link" aria-label="复制地点" data-copy-text="Kata Night Market Phuket">⧉ <span>复制</span></button></div><div class="event-desc">这里只当饭后散步、买水果和小吃；如果落地太累或下雨，直接回酒店，不影响主线。</div><div class="spot-note"><b>🌙 这是一个什么地方？</b>卡塔一带的轻量夜市，适合随便走走、买水果、饮料和小吃，感受第一晚的海岛夜生活气氛。它不是必须打卡的“大景点”，所以落地累了完全可以跳过。<div class="spot-tags"><span class="spot-tag">夜市</span><span class="spot-tag">水果小吃</span><span class="spot-tag">可随时取消</span></div></div>'
  ],
  [
    '<div class="event-title">午餐 · <a class="place-link" target="_blank" rel="noopener" href="https://www.google.com/maps/dir/?api=1&amp;destination=Khrua%20Nong%20Bio%20Phuket&amp;travelmode=driving">Khrua Nong Bio Thaifood</a></div><div class="event-desc">放在 Kata / Karon 附近解决，吃完再往 Rawai 方向走。</div>',
    '<div class="event-title">午餐 · <a class="place-link" target="_blank" rel="noopener" href="https://www.google.com/maps/dir/?api=1&amp;destination=Khrua%20Nong%20Bio%20Phuket&amp;travelmode=driving">Khrua Nong Bio Thaifood</a></div><div class="event-desc">放在 Kata / Karon 附近解决，吃完再往 Rawai 方向走。</div><div class="spot-note"><b>🍚 为什么放这家？</b>偏轻松、家常的泰式午餐定位，重点是离 Kata / Karon 活动区近、吃完能顺着路线继续往 Rawai，不为了“网红餐厅”额外跨区。<div class="spot-tags"><span class="spot-tag">泰式家常</span><span class="spot-tag">午餐</span><span class="spot-tag">顺路</span></div></div>'
  ],
  [
    '<div class="event-title">Phuket Shooting Range · 商业体验</div><div class="event-desc">按你当前拿到的价格做预算：步枪 1,090 THB / 10 发；手枪 1,280 THB / 10 发。最终项目、价格和现场规则以场馆当天确认为准。</div>',
    '<div class="event-title">Phuket Shooting Range · 商业体验</div><div class="event-desc">按你当前拿到的价格做预算：步枪 1,090 THB / 10 发；手枪 1,280 THB / 10 发。最终项目、价格和现场规则以场馆当天确认为准。</div><div class="spot-note"><b>🎯 这是一个什么体验？</b>Rawai / Patak Rd 一带的正规商业射击体验场馆，可以把它理解成一个约 40 分钟的短时项目：到场后按场馆流程和工作人员安排体验，不需要为它单独空出半天。<div class="spot-tags"><span class="spot-tag">商业体验</span><span class="spot-tag">约 40 分钟</span><span class="spot-tag">现场规则优先</span></div></div>'
  ],
  [
    '<div class="event-title">Kata Surf · 1 小时受指导体验</div><div class="event-desc">当前参考价 1,000 THB / 1 小时。具体是否开展、时段与内容以正规教练和当天海况判断为准；条件不适合就改成 Kata 海边慢逛 / 咖啡休息。</div>',
    '<div class="event-title">Kata Surf · 1 小时受指导体验</div><div class="event-desc">当前参考价 1,000 THB / 1 小时。具体是否开展、时段与内容以正规教练和当天海况判断为准；条件不适合就改成 Kata 海边慢逛 / 咖啡休息。</div><div class="spot-note"><b>🏄 为什么在 Kata 体验冲浪？</b>Kata 在西南季风季会进入比较典型的冲浪时段，因此这里很适合做“第一次体验型”的课程。行程只放 1 小时，不追求强度，重点是有教练带着感受普吉雨季海边的另一种玩法。<div class="spot-tags"><span class="spot-tag">雨季特色</span><span class="spot-tag">1 小时体验</span><span class="spot-tag">教练带领</span></div></div>'
  ],
  [
    '<div class="event-title">晚餐 · <a class="place-link" target="_blank" rel="noopener" href="https://www.google.com/maps/dir/?api=1&amp;destination=Rin%27s%20Kitchen%20202%2F8%20Patak%20Rd%20Karon%20Phuket&amp;travelmode=driving">Rin\'s Kitchen</a></div><div class="event-desc">点单备忘：冬阴功海鲜汤、炒空心菜、菠萝炒饭、咖喱粉炒海鲜、青木瓜沙拉、咸蛋黄炒鱿鱼、生腌大虾、意大利肉酱面可优先；炸五花肉尽量别点太大块。</div>',
    '<div class="event-title">晚餐 · <a class="place-link" target="_blank" rel="noopener" href="https://www.google.com/maps/dir/?api=1&amp;destination=Rin%27s%20Kitchen%20202%2F8%20Patak%20Rd%20Karon%20Phuket&amp;travelmode=driving">Rin\'s Kitchen</a></div><div class="event-desc">点单备忘：冬阴功海鲜汤、炒空心菜、菠萝炒饭、咖喱粉炒海鲜、青木瓜沙拉、咸蛋黄炒鱿鱼、生腌大虾、意大利肉酱面可优先；炸五花肉尽量别点太大块。</div><div class="spot-note"><b>🌶️ 这家为什么值得留？</b>这顿更偏“好吃、好沟通”的泰式家常晚餐：店家热情、会中文，对想吃辣的人比较友好，适合冲浪后回酒店洗完澡再慢慢吃一顿。<div class="spot-tags"><span class="spot-tag">会中文</span><span class="spot-tag">泰式家常</span><span class="spot-tag">适合吃辣</span></div></div>'
  ],
  [
    '<div class="event-title">Kata → <a class="place-link" target="_blank" rel="noopener" href="https://www.google.com/maps/dir/?api=1&amp;destination=Jungceylon%20Shopping%20Center%20Phuket&amp;travelmode=driving">Jungceylon 江西冷</a></div><div class="event-desc">直接带着行李去芭东，正常按 25—40 分钟车程预留。</div>',
    '<div class="event-title">Kata → <a class="place-link" target="_blank" rel="noopener" href="https://www.google.com/maps/dir/?api=1&amp;destination=Jungceylon%20Shopping%20Center%20Phuket&amp;travelmode=driving">Jungceylon 江西冷</a></div><div class="event-desc">直接带着行李去芭东，正常按 25—40 分钟车程预留。</div><div class="spot-note"><b>🛍️ Jungceylon 是什么？</b>芭东核心区的大型综合商场，购物、餐饮、Big C、室内休息和游客服务都能一次解决。对于换酒店这天来说，它的价值不是“逛一个商场”，而是把寄存行李、购物、补货、吃饭集中到一个地方。<div class="spot-tags"><span class="spot-tag">芭东核心</span><span class="spot-tag">室内商场</span><span class="spot-tag">一站式解决</span></div></div>'
  ],
  [
    '<div class="event-title">寄存行李 · <a class="place-link" target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&amp;query=MeSpace%20Locker%20Jungceylon%20Phuket">MeSpace Locker @ Jungceylon</a></div><div class="event-desc">优先找 The Bay Zone G Floor 的 Tourist Service Center / drop-off 一带；商场官方也列有 The Jungle Zone B Floor 的另一处 Locker。寄存好以后当天都不用拖着箱子逛。</div>',
    '<div class="event-title">寄存行李 · <a class="place-link" target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&amp;query=MeSpace%20Locker%20Jungceylon%20Phuket">MeSpace Locker @ Jungceylon</a></div><div class="event-desc">优先找 The Bay Zone G Floor 的 Tourist Service Center / drop-off 一带；商场官方也列有 The Jungle Zone B Floor 的另一处 Locker。寄存好以后当天都不用拖着箱子逛。</div><div class="spot-note"><b>🧳 为什么这个点很关键？</b>它把“换酒店日”从拖着行李到处跑，变成先把箱子放下再自由活动。这样白天可以在芭东慢慢逛，晚上只需要取一次行李，再直接去 Karon 入住。<div class="spot-tags"><span class="spot-tag">行李寄存</span><span class="spot-tag">减少折返</span><span class="spot-tag">换酒店神器</span></div></div>'
  ],
  [
    '<div class="event-title"><a class="place-link" target="_blank" rel="noopener" href="https://www.google.com/maps/dir/?api=1&amp;destination=Jungceylon%20Shopping%20Center%20Phuket&amp;travelmode=driving">Jungceylon 江西冷</a> + <a class="place-link" target="_blank" rel="noopener" href="https://www.google.com/maps/dir/?api=1&amp;destination=Big%20C%20Extra%20Jungceylon%20Phuket&amp;travelmode=driving">Big C</a></div><div class="event-desc">药妆、零食、伴手礼集中处理；行李已经寄存，可以慢慢逛。</div>',
    '<div class="event-title"><a class="place-link" target="_blank" rel="noopener" href="https://www.google.com/maps/dir/?api=1&amp;destination=Jungceylon%20Shopping%20Center%20Phuket&amp;travelmode=driving">Jungceylon 江西冷</a> + <a class="place-link" target="_blank" rel="noopener" href="https://www.google.com/maps/dir/?api=1&amp;destination=Big%20C%20Extra%20Jungceylon%20Phuket&amp;travelmode=driving">Big C</a></div><div class="event-desc">药妆、零食、伴手礼集中处理；行李已经寄存，可以慢慢逛。</div><div class="spot-note"><b>🛒 这里主要买什么？</b>Jungceylon 负责品牌、药妆、餐饮和休息；Big C 更适合集中扫泰国零食、饮料、调料、日用品和伴手礼。雨季遇到阵雨时，这也是整趟行程里最稳的室内半天。<div class="spot-tags"><span class="spot-tag">药妆</span><span class="spot-tag">零食伴手礼</span><span class="spot-tag">雨天友好</span></div></div>'
  ],
  [
    '<div class="event-title">Karon → <a class="place-link" target="_blank" rel="noopener" href="https://www.google.com/maps/dir/?api=1&amp;destination=Phuket%20Old%20Town&amp;travelmode=driving" data-copy-ready="1">Phuket Old Town</a><button type="button" class="copy-place after-link" aria-label="复制地点" data-copy-text="Phuket Old Town">⧉ <span>复制</span></button></div><div class="event-desc">按 35—50 分钟预留，周日进城可能更慢。</div>',
    '<div class="event-title">Karon → <a class="place-link" target="_blank" rel="noopener" href="https://www.google.com/maps/dir/?api=1&amp;destination=Phuket%20Old%20Town&amp;travelmode=driving" data-copy-ready="1">Phuket Old Town</a><button type="button" class="copy-place after-link" aria-label="复制地点" data-copy-text="Phuket Old Town">⧉ <span>复制</span></button></div><div class="event-desc">按 35—50 分钟预留，周日进城可能更慢。</div><div class="spot-note"><b>🏘️ 为什么普吉老镇值得单独一天？</b>这里看的是普吉“海滩之外”的一面：锡矿贸易时代留下的中式、欧洲式混合街屋，叠加华人、印度、欧洲与穆斯林等多元社区历史。现在老建筑里又长出了咖啡店、小店和餐厅，很适合慢慢步行。<div class="spot-tags"><span class="spot-tag">历史街区</span><span class="spot-tag">老建筑</span><span class="spot-tag">咖啡小店</span></div></div>'
  ],
  [
    '<div class="event-title">彩色老屋 / 咖啡 / 小店慢逛</div><div class="event-desc"><a class="place-link" target="_blank" rel="noopener" href="https://www.google.com/maps/dir/?api=1&amp;destination=Soi%20Romanee%20Phuket" data-copy-ready="1">Soi Romanee</a><button type="button" class="copy-place after-link" aria-label="复制地点" data-copy-text="Soi Romanee Phuket">⧉ <span>复制</span></button>、Thalang Rd 一带为主。</div>',
    '<div class="event-title">彩色老屋 / 咖啡 / 小店慢逛</div><div class="event-desc"><a class="place-link" target="_blank" rel="noopener" href="https://www.google.com/maps/dir/?api=1&amp;destination=Soi%20Romanee%20Phuket" data-copy-ready="1">Soi Romanee</a><button type="button" class="copy-place after-link" aria-label="复制地点" data-copy-text="Soi Romanee Phuket">⧉ <span>复制</span></button>、Thalang Rd 一带为主。</div><div class="spot-note"><b>📸 Soi Romanee / Thalang Road 看什么？</b>这一带是老镇最适合拍照和随意走走的街区：彩色立面、百叶窗、骑楼细节和街角壁画都很集中。Soi Romanee 很短，不需要“打卡式赶路”，边走边找喜欢的建筑和咖啡店就够了。<div class="spot-tags"><span class="spot-tag">彩色街屋</span><span class="spot-tag">拍照</span><span class="spot-tag">慢逛</span></div></div>'
  ],
  [
    '<div class="event-title"><a class="place-link" target="_blank" rel="noopener" href="https://www.google.com/maps/dir/?api=1&amp;destination=Phuket%20Thai%20Hua%20Museum" data-copy-ready="1">Phuket Thai Hua Museum</a><button type="button" class="copy-place after-link" aria-label="复制地点" data-copy-text="Phuket Thai Hua Museum">⧉ <span>复制</span></button> / 街头壁画 / 伴手礼</div>',
    '<div class="event-title"><a class="place-link" target="_blank" rel="noopener" href="https://www.google.com/maps/dir/?api=1&amp;destination=Phuket%20Thai%20Hua%20Museum" data-copy-ready="1">Phuket Thai Hua Museum</a><button type="button" class="copy-place after-link" aria-label="复制地点" data-copy-text="Phuket Thai Hua Museum">⧉ <span>复制</span></button> / 街头壁画 / 伴手礼</div><div class="spot-note"><b>🏛️ 这座博物馆讲什么？</b>它的建筑原本是 1934 年建成的华文学校，现在用来讲普吉华人移民、锡矿业、地方饮食与城市发展的故事。看完它，再看老镇那些中葡式街屋，会更容易理解“这些房子为什么会出现在普吉”。<div class="spot-tags"><span class="spot-tag">华人历史</span><span class="spot-tag">旧华文学校</span><span class="spot-tag">约 1 小时</span></div></div>'
  ],
  [
    '<div class="event-title"><a class="place-link" target="_blank" rel="noopener" href="https://www.google.com/maps/dir/?api=1&amp;destination=Phuket%20Sunday%20Walking%20Street%20Thalang%20Road" data-copy-ready="1">Lard Yai · 周日步行街</a><button type="button" class="copy-place after-link" aria-label="复制地点" data-copy-text="Phuket Sunday Walking Street Thalang Road">⧉ <span>复制</span></button></div><div class="event-desc">周日约 16:00 开始，边逛边解决晚饭、买手工艺与小吃。</div>',
    '<div class="event-title"><a class="place-link" target="_blank" rel="noopener" href="https://www.google.com/maps/dir/?api=1&amp;destination=Phuket%20Sunday%20Walking%20Street%20Thalang%20Road" data-copy-ready="1">Lard Yai · 周日步行街</a><button type="button" class="copy-place after-link" aria-label="复制地点" data-copy-text="Phuket Sunday Walking Street Thalang Road">⧉ <span>复制</span></button></div><div class="event-desc">周日约 16:00 开始，边逛边解决晚饭、买手工艺与小吃。</div><div class="spot-note"><b>🎪 为什么一定放在周日？</b>Lard Yai 是 Thalang Road 每周日才出现的步行街：老城街屋会变成夜市背景，整条路同时有南泰小吃、甜品、手工艺、小摊和街头表演。它不是普通夜市，而是“老城 + 市集”合在一起的一晚。<div class="spot-tags"><span class="spot-tag">周日限定</span><span class="spot-tag">街头小吃</span><span class="spot-tag">手工艺 / 表演</span></div></div>'
  ],
  [
    '<div class="event-title"><a class="place-link" target="_blank" rel="noopener" href="https://www.google.com/maps/dir/?api=1&amp;destination=Karon%20Beach%20Phuket&amp;travelmode=walking" data-copy-ready="1">Karon Beach</a><button type="button" class="copy-place after-link" aria-label="复制地点" data-copy-text="Karon Beach Phuket">⧉ <span>复制</span></button> / 酒店最后放松</div>',
    '<div class="event-title"><a class="place-link" target="_blank" rel="noopener" href="https://www.google.com/maps/dir/?api=1&amp;destination=Karon%20Beach%20Phuket&amp;travelmode=walking" data-copy-ready="1">Karon Beach</a><button type="button" class="copy-place after-link" aria-label="复制地点" data-copy-text="Karon Beach Phuket">⧉ <span>复制</span></button> / 酒店最后放松</div><div class="spot-note"><b>🏖️ Karon 和 Patong 最大的区别？</b>Karon 的核心就是“空间感”：海滩更长、更宽，整体节奏比 Patong 松很多，很适合最后一天散步、看看海、拍几张照片再回房收行李。9 月属于季风期，看到红旗或浪大时不下水。<div class="spot-tags"><span class="spot-tag">长海滩</span><span class="spot-tag">更安静</span><span class="spot-tag">慢节奏</span></div></div>'
  ]
];

for (const [from, to] of upgrades) {
  if (!html.includes(to) && html.includes(from)) html = html.replace(from, to);
}

if (!standard.includes('### 4.6.1 景点 / 活动介绍层')) {
  standard = replaceOnce(
    standard,
    '### 4.7 出发前准备 & 待办',
    `### 4.6.1 景点 / 活动介绍层\n\n时间轴不能只写“地点名 + 几点到”。对每个有旅行价值的景点、活动、商场、夜市、餐厅，至少补一层面向第一次看到这个名字的读者的解释。\n\n每个重点 POI / 活动默认回答：\n\n- **这是什么？** 1～2 句解释地点 / 活动性质，避免只堆专有名词。\n- **为什么值得去？** 说明它在这趟旅行里的特色、价值或与其他地点的差异。\n- **怎么玩 / 看什么？** 给出 1～3 个最值得关注的看点，不写百科式长文。\n- **建议停留 / 节奏：** 对博物馆、夜市、体验项目等可给出大致停留感受；交通、退房、取行李等纯执行节点不强制添加。\n\n推荐 UI：在时间轴事件正文下增加轻量“特色说明”块 + 2～3 个标签，例如“周日限定 / 街头小吃 / 手工艺”“历史街区 / 老建筑 / 咖啡小店”。信息密度要高，但不要把每个事件扩成一张大卡片。\n\n介绍的目标是让没做过攻略的人只看本手册，也能理解“这个地方是什么、为什么排进来”。会变化的营业时间、价格、活动规则等仍需临近出发重新核实。\n\n### 4.7 出发前准备 & 待办`,
    'standard POI intro section'
  );
}

standard = standard.replace(
  '- [ ] 每日路线 Google Maps 链接正常\n- [ ] 复制地点正常',
  '- [ ] 每日路线 Google Maps 链接正常\n- [ ] 重点景点 / 活动都有“这是什么 + 为什么值得去”的简短介绍\n- [ ] 复制地点正常'
);

await writeFile(htmlPath, html, 'utf8');
await writeFile(standardPath, standard, 'utf8');
console.log('Added concise spot/activity intros and updated Travel Atlas standard');
