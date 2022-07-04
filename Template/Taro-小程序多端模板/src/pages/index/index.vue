<template>
  <view>
    <view v-if="!noNeedMoney">
      <view class="container" v-if="!nodata">
        <van-notice-bar
          color="#1989fa"
          background="#ecf9ff"
          left-icon="info-o"
          text="提示：支付完成后请在15分钟内离场，否则另外计费。"
        />

        <view class="orderDetail">
          <view class="orderTitle addbtoBorder">
            <image
              src="//oss.szqan.com/app2/images/daohan.png"
              alt=""
              style="
                display: inline-block;
                vertical-align: middle;
                text-align: center;
                width: 28px;
                height: 28px;
                margin-right: 5px;
              "
            />链支付智慧云停车
          </view>
          <view class="orderAmount">
            <view class="amount"> <view class="sigle">￥</view>30 </view>
            <view class="amountTitle">停车费用</view>
          </view>
          <view class="orderDetailItem addBorder">
            <view>入场时间</view><view>123</view>
          </view>
          <view class="orderDetailItem"> <view>车牌编号</view><view>123</view> </view>
          <view class="orderDetailItem addBorder">
            <view>停车订单</view><view>123</view>
          </view>
          <view class="orderDetailItem"><view>停车类型</view><view>临时停车</view></view>
        </view>

        <view
          style="font-size: 15px; font-weight: normal; color: #969799; margin-left: 10px"
        >
          支付方式
        </view>

        <view class="payMethod" @click="pay()">
          <image
            src="//oss.szqan.com/app2/icon/weixinlogo.svg"
            alt=""
            style="
              display: inline-block;
              vertical-align: middle;
              text-align: center;
              width: 32px;
              height: 30px;
              margin-right: 5px;
            "
          />微信支付
        </view>

        <van-button type="info" size="large" plain class="addBtn" @click="pay()">
          立即支付
        </van-button>
      </view>
    </view>

    <view class="container" v-if="nodata">
      <view class="space"></view>
      <van-empty description="此通道目前还没有车辆出场" />
    </view>
    <view class="container" v-if="noNeedMoney">
      <view class="space"></view>
      <van-empty description="此订单无需支付费用" />
    </view>
  </view>
</template>

<script>
import "./index.scss";

export default {
  data() {
    return {
      title: "停车缴费",
      tenantcode: "",
      physicsno: "",
      paymentChannel: "",
      fresh: "", // 车场预支付过来 不加载
      tenantname: "",
      orderList: [],
      jspack: "",
      nodata: false,
      noNeedMoney: false,
    };
  },
};
</script>
