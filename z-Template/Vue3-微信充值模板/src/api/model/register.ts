import { request } from "../request";

const register = {
  // 获取工号列表
  GetMemberInfo(empNo: string) {
    return request({
      url: "/api/services/app/Members/GetMemberInfo",
      method: "get",
      params: { empNo }
    });
  },

  // 绑定工号
  BindMember(empNo: string) {
    return request({
      url: "/api/services/app/Members/BindMember?empNo=" + empNo,
      method: "post",
      data: {
        empNo,
      }
    });
  },

  // 解绑工号 
  UnBindMember() {
    return request({
      url: "/api/services/app/Members/UnBindMember",
      method: "post",
    });
  }
};
export default register;
