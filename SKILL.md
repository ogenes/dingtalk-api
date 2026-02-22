---
name: dingtalk-api
description: 调用钉钉开放平台API，实现用户搜索、部门管理等功能。从系统环境变量读取应用凭证。Use when needing to interact with DingTalk API, search users by name, get user details, or manage organizational contacts.
---

# DingTalk API Skill

用于调用钉钉开放平台API的技能，支持 获取企业内部应用的accessToken、搜索用户userId 等功能。

## 前置要求

- 钉钉应用已创建并拥有以下权限：
  - `qyapi_addresslist_search` - 搜索企业通讯录的权限
- 已获取应用的 **AppKey** 和 **AppSecret**
- 已设置环境变量 `DINGTALK_APP_KEY` 和 `DINGTALK_APP_SECRET`

## 环境变量配置

在使用脚本前，需要导出以下环境变量：

```bash
export DINGTALK_APP_KEY="<your-app-key>"
export DINGTALK_APP_SECRET="<your-app-secret>"
```

或者在一行中执行：

```bash
export DINGTALK_APP_KEY="<your-app-key>" && export DINGTALK_APP_SECRET="<your-app-secret>" && npx ts-node scripts/search-user.ts "搜索关键词"
```

## 功能列表

### 1. 搜索用户 (searchUser)

根据姓名搜索用户，返回匹配的 UserId 列表。脚本会自动获取 access_token。

**使用方式:**

```bash
cd ~/Data/www/dingtalk-api
export DINGTALK_APP_KEY="<your-app-key>"
export DINGTALK_APP_SECRET="<your-app-secret>"
npx ts-node scripts/search-user.ts "<搜索关键词>"
```

**示例:**

```bash
export DINGTALK_APP_KEY="<your-app-key>"
export DINGTALK_APP_SECRET="<your-app-secret>"
npx ts-node scripts/search-user.ts "张三"
```

**输出:**

```json
{
  "success": true,
  "keyword": "<搜索关键词>",
  "totalCount": 3,
  "hasMore": false,
  "userIds": [
    "123456789",
    "987654321",
    "456789123"
  ]
}
```

> **注意:** 钉钉搜索用户 API 返回的是匹配用户的 **userid 列表**。

**错误输出:**

```json
{
  "success": false,
  "error": {
    "code": "MISSING_CREDENTIALS",
    "message": "缺少钉钉应用凭证，请设置环境变量 DINGTALK_APP_KEY 和 DINGTALK_APP_SECRET"
  }
}
```

## 开发指南

### 自动更新 SKILL.md

修改代码后，运行以下命令自动更新 SKILL.md：

```bash
npm run update-skill
```

### 安装 Git Hooks（推荐）

安装 post-commit hook，每次 commit 后自动更新 SKILL.md：

```bash
npm run setup-hooks
```

安装后，每次 `git commit` 会自动：
1. 解析 `scripts/` 目录下的代码变更
2. 自动更新 SKILL.md
3. 将更新后的 SKILL.md 追加到当前 commit

### 手动更新

如果不想安装 hooks，可以在 commit 前手动运行：

```bash
npm run precommit
```

## 技术说明

本技能基于钉钉开放平台官方 SDK (`@alicloud/dingtalk`) 实现，使用 TypeScript 编写。

### 核心依赖

- `@alicloud/dingtalk` - 钉钉官方 SDK
- `@alicloud/tea-util` - 阿里云 Tea 工具库
- `@alicloud/openapi-client` - OpenAPI 客户端

### 认证流程

1. 从系统环境变量读取 `DINGTALK_APP_KEY` 和 `DINGTALK_APP_SECRET`
2. 调用 `oauth2_1_0.getAccessToken` 接口获取 access_token
3. 使用获取到的 access_token 调用业务接口

### API 文档参考

- [钉钉开放平台 - 获取访问凭证](https://open.dingtalk.com/document/isvapp-server/obtain-the-access_token-of-an-internal-app)
- [钉钉开放平台 - 搜索用户](https://open.dingtalk.com/document/isvapp-server/search-for-users)

---
*本文档由 scripts/update-skill-doc.js 自动维护*
