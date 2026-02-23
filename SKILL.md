---
name: dingtalk-api
description: 调用钉钉开放平台API，支持用户搜索、机器人单聊消息发送、群聊消息发送、群内机器人列表查询。Use when needing to search DingTalk users, send robot messages to users or groups, or list bots in a group.
---

# DingTalk API Skill

用于调用钉钉开放平台 API 的技能，支持用户搜索、机器人消息发送、群内机器人查询等功能。

## 前置要求

- 已设置环境变量 `DINGTALK_APP_KEY` 和 `DINGTALK_APP_SECRET`
- 钉钉应用已创建并拥有相应 API 权限

## 环境变量配置

```bash
export DINGTALK_APP_KEY="<your-app-key>"
export DINGTALK_APP_SECRET="<your-app-secret>"
```

## 功能列表

### 1. 搜索用户 (search-user)

根据姓名搜索用户，返回匹配的 UserId 列表。

```bash
npx ts-node scripts/search-user.ts "<搜索关键词>"
```

输出：

```json
{
  "success": true,
  "keyword": "张三",
  "totalCount": 3,
  "hasMore": false,
  "userIds": ["123456789", "987654321"]
}
```

### 2. 发送单聊消息 (send-user-message)

通过机器人向指定用户发送单聊消息。

```bash
npx ts-node scripts/send-user-message.ts "<userId>" "<robotCode>" "<消息内容>" [--debug]
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
  "message": "消息内容"
}
```

### 3. 发送群聊消息 (send-group-message)

通过机器人向指定群会话发送消息。

```bash
npx ts-node scripts/send-group-message.ts "<openConversationId>" "<robotCode>" "<消息内容>" [--debug]
```

输出：

```json
{
  "success": true,
  "openConversationId": "cid",
  "robotCode": "robot_code",
  "processQueryKey": "query_key",
  "message": "消息内容"
}
```

### 4. 获取群内机器人列表 (get-bot-list)

查询群内已配置的机器人列表。

```bash
npx ts-node scripts/get-bot-list.ts "<openConversationId>" [--debug]
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

## 错误处理

所有脚本在错误时返回统一格式：

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "错误描述"
  }
}
```

常见错误码：
- `MISSING_CREDENTIALS` - 未设置环境变量
- `INVALID_ARGUMENTS` - 参数不足
- `AUTH_FAILED` - access_token 获取失败
- `UNKNOWN_ERROR` - API 调用异常
