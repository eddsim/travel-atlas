# 新旅行模板

这个目录不是公开页面，而是创建下一份旅行手册时的起点。

## 推荐做法

1. 复制当前参考实现：

```text
public/trips/2026/09-24-phuket/
```

到新的旅行目录，例如：

```text
public/trips/2026/11-03-tokyo/
```

2. 用 `trip.example.json` 整理新旅行资料。
3. 替换 `base.html` 中的目的地、航班 / 车次、酒店、DAY 行程、实用提示。
4. 生成新的真实地理底图手绘地图，并作为静态图片放在当前 trip 目录。
5. 修改 `index.html` 中：
   - 地图资源路径
   - localStorage key
   - 缓存版本号
   - 目的地特有待办
6. 在 `src/worker.js` 注册新短路径，例如：

```js
const TRIPS = {
  "/2026/09-24-phuket": "/trips/2026/09-24-phuket/index.html",
  "/2026/11-03-tokyo": "/trips/2026/11-03-tokyo/index.html"
};
```

7. Sticky Tab 必须保持：

```text
DAY1 → DAY2 → ... → DAYN → 待办
```

8. 按 `docs/TRAVEL_GUIDE_STANDARD.md` 的“发布验收清单”逐项检查。

## 不要复制的内容

复制参考页面时，以下信息必须重新确认，不能因为模板里有就沿用：

- 航班 / 车次
- 酒店
- 日期 / 星期 / 时区
- 入境政策
- 营业时间 / 闭馆日
- 天气季节提示
- 现金 / 交通规则
- Google Maps 地址

## 图片规则

地图和其他图片直接作为静态资源存储，例如：

```text
public/trips/2026/11-03-tokyo/
├── index.html
├── base.html
├── trip-map.webp
└── assets/
    ├── hotel-area.webp
    └── rail-pass.png
```

不要把大图转成 Base64 再塞进 txt / HTML。

## 数据模板

`trip.example.json` 用来帮助 AI / 人工先整理信息，再生成页面。它目前不是运行时必须读取的配置文件，因此可以按目的地扩展字段，但核心字段名称尽量保持一致。