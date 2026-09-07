# Travel Atlas

个人旅行手册集合。每次旅行独立存放，统一由一个 Cloudflare Worker 发布。

正式域名：

```text
https://travel.606858.xyz
```

## 设计基线

当前 `2026/09-24-phuket` 普吉岛手册作为后续旅行的 UI / UX 参考实现。新国家 / 城市默认沿用同一套页面排版、交互、地图风格、待办逻辑和弱网策略，不需要每次重新设计页面。

完整规范：

- [`docs/TRAVEL_GUIDE_STANDARD.md`](docs/TRAVEL_GUIDE_STANDARD.md) — 页面结构、视觉、交互、地图、隐私、发布验收规范
- [`templates/trip/README.md`](templates/trip/README.md) — 新旅行创建步骤
- [`templates/trip/trip.example.json`](templates/trip/trip.example.json) — 新旅行资料整理模板

## 命名规则

每一份旅行手册都用 **出发月-日** 做前缀，年份放在上一级目录：

```text
public/trips/<YYYY>/<MM-DD>-<destination>/
```

例如：

- `public/trips/2026/09-24-phuket/`
- `public/trips/2026/11-03-tokyo/`
- `public/trips/2026/12-28-hokkaido/`
- `public/trips/2027/01-18-osaka/`

这样一年去很多次也不会冲突，并且在 GitHub 中会自然按出发日期排序。

公开短路径由 `src/worker.js` 注册，例如：

```text
/2026/09-24-phuket
```

## 单次旅行目录建议

```text
public/trips/2026/09-24-phuket/
├── index.html              # 旅行入口 / 增强逻辑
├── base.html               # 主体页面内容
├── phuket-journey-map.png  # 真实地理底图 + 手绘路线总览
└── assets/                 # 可选其他静态资源
```

后续旅行图片统一作为真正的静态资源放在目录中，不再使用 Base64 文本中转。

## 页面固定结构

默认顺序：

1. Hero / 旅行标题
2. 此刻关注 + 实时倒计时
3. Sticky Tab：`DAY1 → ... → DAYN → 待办`
4. 真实地理底图手绘行程总览
5. 已确认交通 / 酒店 / 门票
6. DAY1～DAYN 每日时间轴
7. 出发前准备 & 待办（localStorage 持久勾选）
8. 实用提示

所有酒店、机场 / 车站、景点、餐厅等地点默认支持 Google Maps + 一键复制地点 / 地址。

## 技术原则

- 移动端优先
- 不依赖第三方前端框架
- 静态资源由 Cloudflare Workers Static Assets 提供
- Service Worker / CacheStorage 支持弱网与离线回看
- HTML 更新保持短缓存，避免长期拿到旧行程
- 公开页面不展示护照号、订单号、个人手机号、票号、二维码等敏感信息

## 目录结构

```text
travel-atlas/
├── docs/
│   └── TRAVEL_GUIDE_STANDARD.md
├── templates/
│   └── trip/
│       ├── README.md
│       └── trip.example.json
├── public/
│   ├── index.html
│   └── trips/
│       └── 2026/
│           └── 09-24-phuket/
├── src/
│   └── worker.js
├── wrangler.jsonc
└── README.md
```

创建下一次旅行时，先看 `templates/trip/README.md`，再以普吉岛页面为视觉与交互基线。