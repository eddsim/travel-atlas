# Cloudflare Workers 自动部署

本仓库已按 Cloudflare Workers Builds（GitHub 集成）准备。

## 一次性连接步骤

1. 登录 Cloudflare Dashboard。
2. 进入 **Workers & Pages** → **Create application**。
3. 在 **Import a repository** 选择 **Get started**。
4. 首次使用时授权 **Cloudflare Workers and Pages** GitHub App。
5. 选择仓库 `eddsim/travel-atlas`。
6. Worker 名称使用 `travel-atlas`（必须与 `wrangler.jsonc` 的 `name` 一致）。
7. Production branch 选择 `main`。
8. Build command 留空；Deploy command 使用默认 `npx wrangler deploy`。
9. 保存并部署。

完成一次 GitHub App 授权与 Worker 创建后，后续每次 push 到 `main` 都会自动触发 Cloudflare 构建和发布。

> 这是 Cloudflare 账户侧的一次性授权，不能由仓库内代码代替。不要把 Cloudflare API Token、密码或其他密钥提交到仓库。