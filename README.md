# Travel Atlas

个人旅行手册集合。每次旅行独立存放，统一由 Cloudflare Worker 发布。

正式域名：

```text
https://travel.606858.xyz
```

## 设计基线

`public/trips/2026/09-24-phuket/` 是当前参考实现。后续新国家 / 城市默认沿用同一套页面排版、交互、地图风格、待办逻辑和弱网策略，不再重复设计页面。

完整规范：

- [`docs/TRAVEL_GUIDE_STANDARD.md`](docs/TRAVEL_GUIDE_STANDARD.md) — 页面结构、视觉、交互、地图、隐私、架构与发布验收
- [`templates/trip/README.md`](templates/trip/README.md) — 新旅行创建步骤
- [`templates/trip/trip.example.json`](templates/trip/trip.example.json) — 新旅行资料整理模板

## 核心架构

从 2026-09 的结构清理开始，**一次旅行只有一个页面源文件 `index.html`**：

```text
public/trips/<YYYY>/<MM-DD>-<destination>/
├── index.html       # 完整页面：内容 + 样式 + 交互
├── trip-map.png     # 行程总览地图
└── assets/          # 可选的其他静态资源
```

不再使用 `base.html → index.html → Worker 再注入` 的多层页面拼装。

职责边界：

- **trip/index.html**：Hero、此刻关注、倒计时、交通卡、Sticky Tab、地图、订单、每日行程、复制地点、待办 localStorage、实用提示。
- **src/worker.js**：短路径路由、正式域名跳转、HTTP 缓存头、Service Worker / 离线缓存；**不注入目的地 UI 或行程数据**。
- **静态图片**：直接存放在 trip 目录 / `assets/` 中，不使用 Base64 文本中转。

这样以后修改某次旅行时，只需要找到对应 trip 的 `index.html` 和资源文件，不需要判断“应该改 base、index 还是 Worker”。

## 命名规则

每一份旅行手册使用出发月-日做前缀，年份放在上一级目录：

```text
public/trips/<YYYY>/<MM-DD>-<destination>/
```

例如：

- `public/trips/2026/09-24-phuket/`
- `public/trips/2026/11-03-tokyo/`
- `public/trips/2026/12-28-hokkaido/`
- `public/trips/2027/01-18-osaka/`

公开短路径在 `src/worker.js` 的 `TRIPS` 中注册，例如：

```text
/2026/09-24-phuket
```

## 页面固定结构

默认顺序：

1. Hero / 旅行标题
2. 此刻关注 + 实时倒计时 + 交通票卡（如适用）
3. Sticky Tab：`DAY1 → ... → DAYN → 待办`
4. 真实地理位置关系的手绘行程总览
5. 已确认交通 / 酒店 / 门票
6. DAY1～DAYN 每日时间轴
7. 出发前准备 & 待办（localStorage 持久勾选）
8. 实用提示

所有酒店、机场 / 车站、景点、餐厅等地点默认支持 Google Maps + 一键复制地点 / 地址。

## 技术原则

- 移动端优先
- 单 trip 单 HTML 页面源
- 不依赖第三方前端框架
- 静态资源由 Cloudflare Workers Static Assets 提供
- Service Worker / CacheStorage 支持弱网与离线回看
- HTML 短缓存，避免长期拿到旧行程
- 公开页面不展示护照号、订单号、个人手机号、票号、二维码等敏感信息

## 项目目录

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
│               ├── index.html
│               └── phuket-journey-map.png
├── src/
│   └── worker.js
├── wrangler.jsonc
└── README.md
```

创建下一次旅行时，先看 `templates/trip/README.md`，再以普吉岛 `index.html` 作为视觉和交互参考实现。
