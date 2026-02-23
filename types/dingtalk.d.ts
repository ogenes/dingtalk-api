// 钉钉 SDK 类型声明文件

declare module '@alicloud/dingtalk/contact_1_0' {
  export class SearchUserHeaders {
    xAcsDingtalkAccessToken: string;
    constructor(init?: Partial<SearchUserHeaders>);
  }
  
  export class SearchUserRequest {
    queryWord?: string;
    offset?: number;
    size?: number;
    constructor(init?: Partial<SearchUserRequest>);
  }
  
  export interface SearchUserResponseBody {
    list?: string[];  // 返回的是 userid 列表
    totalCount?: number;
    hasMore?: boolean;
  }
  
  export interface SearchUserResponse {
    body?: SearchUserResponseBody;
  }
  
  export default class Client {
    constructor(config: any);
    searchUserWithOptions(
      request: SearchUserRequest,
      headers: SearchUserHeaders,
      runtime: any
    ): Promise<SearchUserResponse>;
  }
}

declare module '@alicloud/dingtalk/oauth2_1_0' {
  export class GetAccessTokenRequest {
    appKey?: string;
    appSecret?: string;
    constructor(init?: Partial<GetAccessTokenRequest>);
  }
  
  export interface GetAccessTokenResponseBody {
    accessToken?: string;
    expireIn?: number;
  }
  
  export interface GetAccessTokenResponse {
    body?: GetAccessTokenResponseBody;
  }
  
  export default class Client {
    constructor(config: any);
    getAccessToken(request: GetAccessTokenRequest): Promise<GetAccessTokenResponse>;
  }
}

declare module '@alicloud/dingtalk/robot_1_0' {
  export class BatchSendOTOHeaders {
    xAcsDingtalkAccessToken: string;
    constructor(init?: Partial<BatchSendOTOHeaders>);
  }

  export class BatchSendOTORequest {
    robotCode?: string;
    userIds?: string[];
    msgKey?: string;
    msgParam?: string;
    constructor(init?: Partial<BatchSendOTORequest>);
  }

  export interface BatchSendOTOResponseBody {
    processQueryKey?: string;
    flowControlledStaffIdList?: string[];
    invalidStaffIdList?: string[];
  }

  export interface BatchSendOTOResponse {
    body?: BatchSendOTOResponseBody;
  }

  export class OrgGroupSendHeaders {
    xAcsDingtalkAccessToken: string;
    constructor(init?: Partial<OrgGroupSendHeaders>);
  }

  export class OrgGroupSendRequest {
    openConversationId?: string;
    robotCode?: string;
    msgKey?: string;
    msgParam?: string;
    constructor(init?: Partial<OrgGroupSendRequest>);
  }

  export interface OrgGroupSendResponseBody {
    processQueryKey?: string;
  }

  export interface OrgGroupSendResponse {
    body?: OrgGroupSendResponseBody;
  }

  export class GetBotListInGroupHeaders {
    xAcsDingtalkAccessToken: string;
    constructor(init?: Partial<GetBotListInGroupHeaders>);
  }

  export class GetBotListInGroupRequest {
    openConversationId?: string;
    constructor(init?: Partial<GetBotListInGroupRequest>);
  }

  export interface GetBotListInGroupResponseBody {
    chatbotInstanceVOList?: any[];
  }

  export interface GetBotListInGroupResponse {
    body?: GetBotListInGroupResponseBody;
  }

  export default class Client {
    constructor(config: any);
    batchSendOTOWithOptions(
      request: BatchSendOTORequest,
      headers: BatchSendOTOHeaders,
      runtime: any
    ): Promise<BatchSendOTOResponse>;
    orgGroupSendWithOptions(
      request: OrgGroupSendRequest,
      headers: OrgGroupSendHeaders,
      runtime: any
    ): Promise<OrgGroupSendResponse>;
    getBotListInGroupWithOptions(
      request: GetBotListInGroupRequest,
      headers: GetBotListInGroupHeaders,
      runtime: any
    ): Promise<GetBotListInGroupResponse>;
  }
}
