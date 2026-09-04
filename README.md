# Travel Atlas

个人旅行手册集合。每次旅行独立存放，统一由一个 Cloudflare Worker 发布。

## 命名规则

每一份旅行手册都用 **出发月-日** 做前缀，年份放在上一级目录：

`public/trips/<YYYY>/<MM-DD>-<destination>/index.html`

例如：

- `public/trips/2026/09-24-phuket/index.html`
- `public/trips/2026/11-03-tokyo/index.html`
- `public/trips/2026/12-28-hokkaido/index.html`
- `public/trips/2027/01-18-osaka/index.html`

这样一年去很多次也不会冲突，并且在 GitHub 中会自然按出发日期排序。

公开访问路径：

`/trips/<YYYY>/<MM-DD>-<destination>/`

本次普吉岛：

`/trips/2026/09-24-phuket/`

## 目录结构

```text
travel-atlas/
├── public/
│   ├── index.html                 # 所有旅行的总入口
│   └── trips/
│       └── 2026/
│           └── 09-24-phuket/
│               └── index.html
├── src/
│   └── worker.js
├── wrangler.jsonc
└── README.md
```

旅行详情页保持单 HTML、零第三方前端依赖；Cloudflare Workers Static Assets 负责公开访问，Service Worker 为已经访问过的页面提供离线回看。