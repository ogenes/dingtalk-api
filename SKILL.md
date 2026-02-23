---
name: dingtalk-api
description: 调用钉钉开放平台API，支持用户搜索、部门管理（搜索/详情/子部门/用户列表）、机器人单聊消息发送、群聊消息发送、群内机器人列表查询。Use when needing to search DingTalk users or departments, get department details/sub-departments/user lists, send robot messages to users or groups, or list bots in a group.
---

# DingTalk API Skill

用于调用钉钉开放平台 API 的技能，支持用户搜索、部门管理（搜索/详情/子部门/用户列表）、机器人消息发送、群内机器人查询等功能。

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

### 2. 搜索部门 (search-department)

根据名称搜索部门，返回匹配的部门 ID 列表。

```bash
npx ts-node scripts/search-department.ts "<搜索关键词>" [--debug]
```

输出：

```json
{
  "success": true,
  "keyword": "技术部",
  "totalCount": 2,
  "hasMore": false,
  "departmentIds": [12345, 67890]
}
```

### 3. 获取部门详情 (get-department)

获取指定部门的详细信息。

```bash
npx ts-node scripts/get-department.ts <deptId> [--debug]
```

输出：

```json
{
  "success": true,
  "department": {
    "deptId": 12345,
    "name": "技术部",
    "parentId": 1
  }
}
```

### 4. 获取子部门列表 (list-sub-departments)

获取指定部门下的子部门 ID 列表。根部门 deptId 为 1。

```bash
npx ts-node scripts/list-sub-departments.ts <deptId> [--debug]
```

输出：

```json
{
  "success": true,
  "deptId": 1,
  "subDepartmentIds": [12345, 67890, 11111]
}
```

### 5. 获取部门用户列表 (list-department-users)

获取指定部门下的用户列表（userId + 姓名），自动分页获取全部用户。

```bash
npx ts-node scripts/list-department-users.ts <deptId> [--debug]
```

输出：

```json
{
  "success": true,
  "deptId": 12345,
  "users": [
    { "userId": "user001", "name": "张三" },
    { "userId": "user002", "name": "李四" }
  ]
}
```

### 6. 发送单聊消息 (send-user-message)

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

### 7. 发送群聊消息 (send-group-message)

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

### 8. 获取群内机器人列表 (get-bot-list)

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
