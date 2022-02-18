/**
 * api接口的统一出口
 */
// 模块接口
import login from "../api/model/login";
import register from "../api/model/register";
import order from "../api/model/order";

// 导出接口
export default {
  login,
  register,
  order
};
