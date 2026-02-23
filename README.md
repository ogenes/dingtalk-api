# DingTalk API Skill

[![ClawHub](https://img.shields.io/badge/ClawHub-已发布-blue)](https://clawhub.com/ogenes/dingtalk-api)

钉钉开放平台 API 调用技能，支持用户搜索、机器人单聊/群聊消息发送、群内机器人列表查询等功能。

> **已发布到 [ClawHub](https://clawhub.com/ogenes/dingtalk-api)**，可通过 `clawhub install dingtalk-api` 一键安装。

## 功能特性

- **用户搜索** - 根据姓名搜索用户，返回 UserId 列表
- **单聊消息** - 通过机器人向指定用户发送单聊消息
- **群聊消息** - 通过机器人向指定群会话发送消息
- **机器人列表** - 查询群内已配置的机器人列表
- **自动认证** - 自动获取 access_token，无需手动管理
- **TypeScript** - 类型安全，代码提示友好

## 安装方式

### 方式一：通过 ClawHub 安装（推荐）

```bash
npm install -g clawhub
clawhub install dingtalk-api
```

### 方式二：通过 Git 安装

```bash
git clone https://github.com/ogenes/dingtalk-api.git
cd dingtalk-api
npm install
```

## 配置环境变量

```bash
export DINGTALK_APP_KEY="<your-app-key>"
export DINGTALK_APP_SECRET="<your-app-secret>"
```

## 使用方法

### 1. 搜索用户

```bash
npm run search-user -- "张三"
```

输出：

```json
{
  "success": true,
  "keyword": "张三",
  "totalCount": 3,
  "hasMore": false,
  "userIds": ["123456789", "987654321", "456789123"]
}
```

### 2. 发送单聊消息

```bash
npm run send-user-message -- "<userId>" "<robotCode>" "你好"
```

输出：

```json
{
  "success": true,
  "userId": "123456",
  "robotCode": "robot_code",
  "processQueryKey": "query_key",
  "flowControlledStaffIdList": [],
  "invalidStaffIdList": [],
  "message": "你好"
}
```

### 3. 发送群聊消息

```bash
npm run send-group-message -- "<openConversationId>" "<robotCode>" "大家好"
```

输出：

```json
{
  "success": true,
  "openConversationId": "cid",
  "robotCode": "robot_code",
  "processQueryKey": "query_key",
  "message": "大家好"
}
```

### 4. 获取群内机器人列表

```bash
npm run get-bot-list -- "<openConversationId>"
```

输出：

```json
{
  "success": true,
  "openConversationId": "cid",
  "botList": [
    {
      "robotCode": "code",
      "robotName": "name",
      "robotAvatar": "url",
      "openRobotType": 1
    }
  ]
}
```

所有命令支持 `--debug` 参数查看完整 API 响应（搜索用户除外）。

## 前置要求

1. **钉钉应用**
   - 在 [钉钉开放平台](https://open.dingtalk.com/) 创建企业内部应用
   - 添加权限：通讯录搜索、机器人发送消息等
   - 获取 **AppKey** 和 **AppSecret**

2. **环境**
   - Node.js >= 16

## 项目结构

```
dingtalk-api/
├── scripts/
│   ├── search-user.ts          # 用户搜索
│   ├── send-user-message.ts    # 单聊消息发送
│   ├── send-group-message.ts   # 群聊消息发送
│   └── get-bot-list.ts         # 群内机器人列表
├── types/
│   └── dingtalk.d.ts           # 钉钉 SDK 类型定义
├── SKILL.md                    # Skill 文档
├── README.md
├── package.json
└── tsconfig.json
```

## API 文档

- [获取企业内部应用的 accessToken](https://open.dingtalk.com/document/orgapp/obtain-the-access_token-of-an-internal-app)
- [搜索用户](https://open.dingtalk.com/document/orgapp/you-can-call-this-operation-to-query-users)
- [机器人发送单聊消息](https://open.dingtalk.com/document/orgapp/chatbots-send-one-on-one-chat-messages-in-batches)
- [机器人发送群消息](https://open.dingtalk.com/document/orgapp/the-robot-sends-a-group-message)
- [获取群内机器人列表](https://open.dingtalk.com/document/orgapp/obtain-the-list-of-robots-in-the-group)

## 许可证

MIT
