# 新旅行模板

这个目录用于创建下一份 Travel Atlas 旅行手册。

## 推荐流程

1. 复制参考实现的页面结构：

```text
public/trips/2026/09-24-phuket/index.html
```

到新目录，例如：

```text
public/trips/2026/11-03-tokyo/index.html
```

2. 用 `trip.example.json` 先整理新旅行资料。
3. 在**新的 `index.html`** 中一次性替换：
   - 目的地 / 日期 / 星期 / 时区
   - 航班 / 车次 / 酒店 / 已确认订单
   - DAY1～DAYN 时间轴
   - 此刻关注 events 数据
   - 交通卡数据
   - localStorage key
   - Day 颜色（如需要）
   - 实用提示
4. 生成基于真实地理位置关系的手绘地图，保存为正常静态图片。
5. 检查 Sticky Tab：

```text
DAY1 → DAY2 → ... → DAYN → 待办
```

6. 在 `src/worker.js` 只注册新短路径；**不要在 Worker 里写目的地 UI / 行程数据**：

```js
const TRIPS = {
  "/2026/09-24-phuket": "/trips/2026/09-24-phuket/index.html",
  "/2026/11-03-tokyo": "/trips/2026/11-03-tokyo/index.html"
};
```

7. 如果希望首次打开后离线回看地图，把新 trip 入口和关键图片加入 Service Worker `PRECACHE`。
8. 更新 `public/index.html` 总入口。
9. 按 `docs/TRAVEL_GUIDE_STANDARD.md` 的发布验收清单检查。

## 单次旅行目录

```text
public/trips/2026/11-03-tokyo/
├── index.html
├── tokyo-journey-map.webp
└── assets/
    ├── hotel-area.webp
    └── rail-guide.png
```

原则：**一个 trip 只有一个页面源 `index.html`。** 不创建 `base.html`，也不要由页面再 fetch 另一个 HTML 来拼装。

## 不要直接继承的内容

复制参考实现时，以下信息必须重新确认：

- 航班 / 车次
- 酒店
- 日期 / 星期 / 时区
- 入境政策
- 营业时间 / 闭馆日
- 天气季节提示
- 现金 / 交通规则
- Google Maps 地址
- localStorage key
- Service Worker 预缓存资源

## 图片规则

- 图片放 trip 目录或 `assets/`
- 使用正常 PNG / WebP / JPEG 静态文件
- GitHub 中应可直接预览
- 不把大图转成 Base64 塞进 txt / HTML
- 页面使用相对路径引用，例如：

```html
<img src="./tokyo-journey-map.webp" alt="东京六日手绘行程总览地图">
```

## 数据模板

`trip.example.json` 是 AI / 人工整理信息的输入模板，不是运行时依赖。页面发布后不需要再 fetch JSON；最终用户访问的是自包含的 `index.html` + 静态图片资源。
