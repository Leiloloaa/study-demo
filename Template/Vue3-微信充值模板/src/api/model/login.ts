import { request } from "../request";

const login = {
  // 获取当前租户配置
  IsTenantAvailable(data: any) {
    return request({
      url: "/api/services/app/Account/IsTenantAvailable",
      method: "post",
      data: data
    });
  },

  // 扩展登录
  GetExternalAuthenticationProviders(params: any) {
    return request({
      url: "/api/TokenAuth/GetExternalAuthenticationProviders",
      method: "get",
      params: params
    });
  },

  wechatCode(params: any) {
    return request({
      url: "/api/TokenAuth/WechatLogin",
      method: "get",
      params: params
    });
  },

  wechatLogin(
    providerKey: any,
    providerAccessCode: any,
    returnUrl: any,
    authProvider: any
  ) {
    return request({
      url: "/api/TokenAuth/ExternalAuthenticate",
      method: "post",
      data: {
        authProvider,
        providerKey,
        providerAccessCode,
        returnUrl,
        singleSignIn: true
      }
    });
  },

  // 获取用户信息
  GetCurrentMember(params?: any) {
    return request({
      url: "/api/services/app/Members/GetCurrentMember",
      method: "get",
      params: params
    });
  }
};
export default login;
