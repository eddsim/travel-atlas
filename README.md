# Travel Atlas

个人旅行手册集合。每次旅行独立存放，统一由一个 Cloudflare Worker 发布。

## 命名规则

旅行目录统一使用：

`trips/<YYYY>/<MM-DD>-<destination>/`

例如：

- `trips/2026/09-24-phuket/`
- `trips/2026/11-03-tokyo/`
- `trips/2026/12-28-hokkaido/`

这样同一年可以有任意多次旅行，并且目录按出发日期自然排序。

公开访问路径统一为：

`/<YYYY>/<MM-DD>-<destination>`

例如本次普吉岛：`/2026/09-24-phuket`

## 目录结构

```text
travel-atlas/
├── index.html
├── trips/
│   └── 2026/
│       └── 09-24-phuket/
│           └── index.html
├── src/
│   └── worker.js
└── wrangler.jsonc
```

旅行手册页面保持单 HTML、零第三方前端依赖；Cloudflare 负责公开访问和离线缓存。