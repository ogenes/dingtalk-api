# DingTalk API Skill

[![ClawHub](https://img.shields.io/badge/ClawHub-已发布-blue)](https://clawhub.com/ogenes/dingtalk-api)

钉钉开放平台 API 调用技能，支持用户搜索/详情/查询、部门管理（搜索/详情/子部门/用户列表/父部门）、机器人单聊/群聊消息发送、群内机器人列表查询、离职记录查询等功能。

> **已发布到 [ClawHub](https://clawhub.com/ogenes/dingtalk-api)**，可通过 `clawhub install dingtalk-api` 一键安装。

## 功能特性

### 用户管理
- **用户搜索** - 根据姓名搜索用户，返回 UserId 列表
- **用户详情** - 获取指定用户的详细信息
- **用户所属部门** - 获取指定用户的所有父部门列表
- **手机号查用户** - 根据手机号查询用户 userid
- **unionid查用户** - 根据 unionid 查询用户 userid
- **员工人数** - 获取企业员工总数（可选仅已激活）
- **未登录用户** - 获取未登录钉钉的员工列表
- **离职记录** - 查询离职员工记录列表

### 部门管理
- **部门搜索** - 根据名称搜索部门，返回部门 ID 列表
- **部门详情** - 获取指定部门的详细信息
- **父部门列表** - 获取指定部门的所有父部门列表
- **子部门列表** - 获取指定部门下的子部门 ID 列表
- **部门用户列表** - 获取指定部门下的用户列表
- **部门用户ID列表** - 获取指定部门下所有用户的 userid 列表

### 消息与机器人
- **单聊消息** - 通过机器人向指定用户发送单聊消息
- **群聊消息** - 通过机器人向指定群会话发送消息
- **机器人列表** - 查询群内已配置的机器人列表

### 技术特性
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

### 2. 搜索部门

```bash
npm run search-department -- "技术部"
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

### 3. 获取部门详情

```bash
npm run get-department -- 12345
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

### 4. 获取子部门列表

```bash
npm run list-sub-departments -- 1
```

输出：

```json
{
  "success": true,
  "deptId": 1,
  "subDepartmentIds": [12345, 67890, 11111]
}
```

### 5. 获取部门用户列表

```bash
npm run list-department-users -- 12345
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

### 6. 发送单聊消息

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

### 7. 发送群聊消息

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

### 8. 获取群内机器人列表

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

所有命令支持 `--debug` 参数查看完整 API 响应。

### 9. 获取用户详情

```bash
npm run get-user -- "user001"
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

### 10. 获取用户父部门列表

```bash
npm run list-user-parent-departments -- "user001"
```

输出：

```json
{
  "success": true,
  "userId": "user001",
  "parentIdList": [12345, 67890, 1]
}
```

### 11. 获取部门父部门列表

```bash
npm run list-department-parents -- 12345
```

输出：

```json
{
  "success": true,
  "deptId": 12345,
  "parentIdList": [12345, 67890, 1]
}
```

### 12. 获取部门用户ID列表

```bash
npm run list-department-user-ids -- 12345
```

输出：

```json
{
  "success": true,
  "deptId": 12345,
  "userIds": ["user001", "user002", "user003"]
}
```

### 13. 获取部门用户详情（分页）

```bash
npm run list-department-user-details -- 12345 --cursor 0 --size 50
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

### 14. 获取员工人数

```bash
npm run get-user-count
npm run get-user-count -- --onlyActive
```

输出：

```json
{
  "success": true,
  "onlyActive": false,
  "count": 150
}
```

### 15. 根据手机号查询用户

```bash
npm run get-user-by-mobile -- "13800138000"
```

输出：

```json
{
  "success": true,
  "mobile": "13800138000",
  "userId": "user001"
}
```

### 16. 根据 unionid 查询用户

```bash
npm run get-user-by-unionid -- "xxxxx"
```

输出：

```json
{
  "success": true,
  "unionid": "xxxxx",
  "userId": "user001"
}
```

### 17. 获取未登录用户列表

```bash
npm run list-inactive-users -- "20240115" --deptIds "12345,67890" --offset 0 --size 100
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

### 18. 查询离职记录列表

```bash
npm run list-resigned-users -- "2024-01-01T00:00:00+08:00" "2024-02-01T00:00:00+08:00"
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

## 前置要求

1. **钉钉应用**
   - 在 [钉钉开放平台](https://open.dingtalk.com/) 创建企业内部应用
   - 添加权限：通讯录搜索、通讯录部门信息读权限、机器人发送消息等
   - 获取 **AppKey** 和 **AppSecret**

2. **环境**
   - Node.js >= 16

## 项目结构

```
dingtalk-api/
├── scripts/
│   ├── search-user.ts                  # 用户搜索
│   ├── get-user.ts                     # 用户详情
│   ├── list-user-parent-departments.ts # 用户父部门列表
│   ├── get-user-by-mobile.ts           # 手机号查用户
│   ├── get-user-by-unionid.ts          # unionid查用户
│   ├── get-user-count.ts               # 员工人数
│   ├── list-inactive-users.ts          # 未登录用户列表
│   ├── list-resigned-users.ts          # 离职记录列表
│   ├── search-department.ts            # 部门搜索
│   ├── get-department.ts               # 部门详情
│   ├── list-department-parents.ts      # 部门父部门列表
│   ├── list-sub-departments.ts         # 子部门列表
│   ├── list-department-users.ts        # 部门用户列表
│   ├── list-department-user-ids.ts     # 部门用户ID列表
│   ├── list-department-user-details.ts # 部门用户详情（分页）
│   ├── send-user-message.ts            # 单聊消息发送
│   ├── send-group-message.ts           # 群聊消息发送
│   └── get-bot-list.ts                 # 群内机器人列表
├── types/
│   └── dingtalk.d.ts               # 钉钉 SDK 类型定义
├── SKILL.md                        # Skill 文档
├── README.md
├── package.json
└── tsconfig.json
```

## API 文档

### 用户管理
- [搜索用户](https://open.dingtalk.com/document/orgapp/you-can-call-this-operation-to-query-users)
- [查询用户详情](https://open.dingtalk.com/document/orgapp/query-user-details)
- [查询部门用户父部门路径](https://open.dingtalk.com/document/orgapp/query-the-parent-department-path-of-a-department-user)
- [查询指定用户的所有父部门列表](https://open.dingtalk.com/document/orgapp/query-the-list-of-all-parent-departments-of-a-specified-user)
- [根据手机号获取用户信息](https://open.dingtalk.com/document/orgapp/query-users-by-phone-number)
- [根据unionid获取userid](https://open.dingtalk.com/document/orgapp/query-a-user-by-the-unionid)
- [获取员工人数](https://open.dingtalk.com/document/orgapp/obtain-the-number-of-employees-v2)
- [查询企业未登录钉钉的员工列表](https://open.dingtalk.com/document/orgapp/queries-the-list-of-employees-who-have-not-logged-on-to-dingtalk)
- [查询离职记录列表](https://open.dingtalk.com/document/isvapp-server/employee_resignation_records)

### 部门管理
- [搜索部门](https://open.dingtalk.com/document/orgapp/search-department)
- [获取部门详情](https://open.dingtalk.com/document/orgapp/query-department-details0-v2)
- [获取指定部门的所有父部门列表](https://open.dingtalk.com/document/orgapp/obtain-the-list-of-all-parent-departments-of-a-department)
- [获取子部门 ID 列表](https://open.dingtalk.com/document/orgapp/obtain-a-sub-department-id-list-v2)
- [获取部门用户基础信息](https://open.dingtalk.com/document/orgapp/queries-the-simple-information-of-a-department-user)
- [获取部门用户userid列表](https://open.dingtalk.com/document/orgapp/obtain-the-list-of-department-userids)

### 消息与机器人
- [机器人发送单聊消息](https://open.dingtalk.com/document/orgapp/chatbots-send-one-on-one-chat-messages-in-batches)
- [机器人发送群消息](https://open.dingtalk.com/document/orgapp/the-robot-sends-a-group-message)
- [获取群内机器人列表](https://open.dingtalk.com/document/orgapp/obtain-the-list-of-robots-in-the-group)

### 认证
- [获取企业内部应用的 accessToken](https://open.dingtalk.com/document/orgapp/obtain-the-access_token-of-an-internal-app)

## 许可证

MIT
