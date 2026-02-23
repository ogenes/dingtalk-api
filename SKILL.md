---
name: dingtalk-api
description: 调用钉钉开放平台API，支持用户搜索/详情/查询、部门管理（搜索/详情/子部门/用户列表/父部门）、机器人单聊消息发送、群聊消息发送、群内机器人列表查询、离职记录查询。Use when needing to search DingTalk users or departments, get user/department details, send robot messages, list group bots, or query resigned employees.
---

# DingTalk API Skill

用于调用钉钉开放平台 API 的技能，支持用户搜索/详情/查询、部门管理（搜索/详情/子部门/用户列表/父部门）、机器人消息发送、群内机器人查询、离职记录查询等功能。

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

### 9. 查询用户详情 (get-user)

获取指定用户的详细信息，包括姓名、手机号、邮箱、部门列表等。

```bash
npx ts-node scripts/get-user.ts "<userId>" [--debug]
```

输出：

```json
{
  "success": true,
  "user": {
    "userid": "user001",
    "name": "张三",
    "mobile": "138****1234",
    "email": "zhangsan@example.com",
    "dept_id_list": [12345, 67890]
  }
}
```

### 10. 获取用户父部门列表 (list-user-parent-departments)

获取指定用户所属的所有父部门列表，从直接部门到根部门。

```bash
npx ts-node scripts/list-user-parent-departments.ts "<userId>" [--debug]
```

输出：

```json
{
  "success": true,
  "userId": "user001",
  "parentIdList": [12345, 67890, 1]
}
```

### 11. 获取部门父部门列表 (list-department-parents)

获取指定部门的所有父部门列表，第一个是自身，最后一个是根部门。

```bash
npx ts-node scripts/list-department-parents.ts <deptId> [--debug]
```

输出：

```json
{
  "success": true,
  "deptId": 12345,
  "parentIdList": [12345, 67890, 1]
}
```

### 12. 获取部门用户ID列表 (list-department-user-ids)

获取指定部门下所有用户的 userid 列表。

```bash
npx ts-node scripts/list-department-user-ids.ts <deptId> [--debug]
```

输出：

```json
{
  "success": true,
  "deptId": 12345,
  "userIds": ["user001", "user002", "user003"]
}
```

### 13. 获取部门用户详情分页版 (list-department-user-details)

分页获取部门用户详细信息，支持自定义 cursor 和 size。

```bash
npx ts-node scripts/list-department-user-details.ts <deptId> [--cursor <cursor>] [--size <size>] [--debug]
```

输出：

```json
{
  "success": true,
  "deptId": 12345,
  "users": [
    { "userid": "user001", "name": "张三" },
    { "userid": "user002", "name": "李四" }
  ],
  "hasMore": true,
  "nextCursor": 100
}
```

### 14. 获取员工人数 (get-user-count)

获取企业员工总数，可选择是否仅统计已激活员工。

```bash
npx ts-node scripts/get-user-count.ts [--onlyActive] [--debug]
```

输出：

```json
{
  "success": true,
  "onlyActive": false,
  "count": 150
}
```

### 15. 根据手机号查询用户 (get-user-by-mobile)

根据手机号查询用户 userid。仅企业内部应用可用，只能查询在职员工。

```bash
npx ts-node scripts/get-user-by-mobile.ts "<mobile>" [--debug]
```

输出：

```json
{
  "success": true,
  "mobile": "13800138000",
  "userId": "user001"
}
```

### 16. 根据 unionid 查询用户 (get-user-by-unionid)

根据 unionid 获取用户 userid。

```bash
npx ts-node scripts/get-user-by-unionid.ts "<unionid>" [--debug]
```

输出：

```json
{
  "success": true,
  "unionid": "xxxxx",
  "userId": "user001"
}
```

### 17. 获取未登录用户列表 (list-inactive-users)

获取指定日期未登录钉钉的员工列表。只能查询一个月内数据，每天9点后调用才能确保获取前一天数据。

```bash
npx ts-node scripts/list-inactive-users.ts "<queryDate>" [--deptIds "id1,id2"] [--offset <offset>] [--size <size>] [--debug]
```

输出：

```json
{
  "success": true,
  "queryDate": "20240115",
  "userIds": ["user001", "user002"],
  "hasMore": false
}
```

### 18. 查询离职记录列表 (list-resigned-users)

查询指定时间范围内的离职员工记录。仅企业内部应用可用。

```bash
npx ts-node scripts/list-resigned-users.ts "<startTime>" ["<endTime>"] [--nextToken <token>] [--maxResults <max>] [--debug]
```

输出：

```json
{
  "success": true,
  "startTime": "2024-01-01T00:00:00+08:00",
  "endTime": "2024-02-01T00:00:00+08:00",
  "records": [
    {
      "userId": "user001",
      "name": "张三",
      "leaveTime": "2024-01-15T10:00:00Z",
      "leaveReason": "个人原因"
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
