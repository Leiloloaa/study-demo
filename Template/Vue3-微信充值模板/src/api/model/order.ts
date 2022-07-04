import { request } from "../request";

const order = {
  // 余额订单初始化
  RechargeInit(orderAmount: any, accountId: any, paymentChannel: any) {
    return request({
      url: "/api/services/app/Members/RechargeInit",
      method: "post",
      data: {
        accountType: 10,
        paymentChannel,
        orderAmount,
        accountId
      }
    });
  },
  // 余额订单确认
  RechargeAck(orderNo: any, orderAmount: any, actualAmount: any, accountId: any, paymentChannel: any) {
    return request({
      url: "/api/services/app/Members/RechargeAck",
      method: "post",
      data: {
        accountType: 10,
        orderNo,
        paymentChannel,
        orderAmount,
        accountId,
        actualAmount
      }
    });
  },
  // 余额订单完成
  RechargeFinish(orderNo: any, paymentChannel: any) {
    return request({
      url: "/api/services/app/Members/RechargeFinish",
      method: "post",
      data: {
        accountType: 10,
        orderNo,
        paymentChannel,
      }
    });
  },
  // 订单取消
  CancelRecharge(orderNo: any) {
    return request({
      url: "/api/services/app/Members/CancelRecharge",
      method: "post",
      data: { orderNo }
    });
  },
  // 获取充值订单
  GetMyRechargeOrders(params: any) {
    return request({
      url: "/api/services/app/Members/GetMyRechargeOrders",
      method: "get",
      params: params
    });
  },
};
export default order;
