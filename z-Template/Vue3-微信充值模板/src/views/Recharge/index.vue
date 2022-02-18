<template>
  <div class="container">
    <div class="header">
      <div class="account">
        <span
          >余额：￥<i style="font-size: 20px">{{ fBalance }}</i
          >.<i style="font-size: 14px">{{ sBalance }}</i></span
        ><span @click="seeDetails">充值明细</span>
      </div>
    </div>
    <div class="rechargeList">
      <p class="rechargeTitle">
        <span>选择充值金额</span><span @click="showInput">手动输入</span>
      </p>
      <div class="list">
        <div class="listContainer" v-for="(item, index) in moneyList" :key="index">
          <span
            class="listItem"
            :class="{ active: index == num }"
            @click="changeAmount(index, item)"
            >充值{{ item }}元</span
          >
        </div>
      </div>
    </div>
    <van-button
      color="linear-gradient(to right,#0396FF, #ABDCFF)"
      class="myBtn"
      @click="confirm()"
    >
      立即充值
    </van-button>
    <p style="width: 100vw; font-size: 13.5px; text-align: center; color: #969795">
      充值即表示同意&nbsp;&nbsp;<span style="color: #f40" @click="showPopup"
        >充值条款</span
      >
    </p>
    <p
      style="
        width: 100%;
        font-size: 13.5px;
        text-align: center;
        color: #969795;
        margin-top: 8px;
      "
    >
      <span
        >充值异常请联系&nbsp;<i style="font-weight: 600">厂区内充值点</i>&nbsp;或&nbsp;
        <a :href="'tel:' + Phone" class="showLine">tel:{{ Phone }}</a></span
      >
    </p>
  </div>
  <van-dialog
    v-model:show="showMask"
    title="请输入整数(最低10元起)"
    show-cancel-button
    confirmButtonColor="#409EFF"
    @confirm="inputOrderInit"
  >
    <div style="height: 15px"></div>
    <van-field
      v-model="inputMoney"
      label-class="van-cell__changeLable"
      type="digit"
      label="充值金额"
      placeholder="请输入"
      :border="false"
      :autofocus="true"
    />
    <div style="height: 15px"></div>
  </van-dialog>
  <van-popup
    v-model:show="show"
    position="bottom"
    round
    closeable
    close-icon-position="top-right"
    :style="{ height: '50%' }"
  >
    <Protocal></Protocal>
  </van-popup>
</template>
<script lang="ts">
import { ref, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import login from "../../api/model/login";
import order from "../../api/model/order";
import Protocal from "@/components/Protocal.vue";
import { Notify } from "vant";
import { sliceNumber } from "../../utils/sliceNumber";

declare var WeixinJSBridge: any;

export default {
  components: { Protocal },
  setup() {
    const router = useRouter();
    const tenancyname = router.currentRoute.value.query.tenancyname;
    // @ts-ignore
    localStorage.setItem("tenancyname", tenancyname);

    const recharge = reactive({
      fBalance: "0",
      sBalance: "00",
      balance: 0.0,
      moneyList: [20, 50, 100, 200],
      num: 0, // 初始索引
      amount: "20",
      accountId: "",
      jspack: "",
      changeAmount: (index: any, item: any) => {
        recharge.num = index;
        recharge.amount = item;
      },
      confirm: () => {
        orderInit();
      },
      inputMoney: "",
      Phone: "15895070591",
    });

    const show = ref(false);
    const showMask = ref(false);

    const showPopup = () => {
      show.value = true;
    };

    function showInput() {
      showMask.value = true;
    }

    function inputOrderInit() {
      if (!recharge.inputMoney) {
        Notify({ type: "success", message: "请输入充值金额" });
        return;
      }
      if (Number(recharge.inputMoney) < 10) {
        recharge.inputMoney = "";
        Notify({ type: "danger", message: "充值金额10元起" });
        return;
      }
      let amount = recharge.inputMoney;
      recharge.amount = amount;
      orderInit();
    }

    async function getCurrentInfo() {
      localStorage.removeItem("unbind");
      await login.GetCurrentMember().then((res: any) => {
        if (res.result.user.id === 0) {
          router.push("/login");
        } else if (res.result.user.memberId == null || res.result.user.memberId == 0) {
          router.push("/register");
        } else {
          recharge.accountId = res.result.memberAccounts[0].id;
          recharge.balance = res.result.memberAccounts[0].balance;
          sliceBalance(recharge.balance);
        }
      });
    }

    getCurrentInfo();

    function seeDetails() {
      router.push("/details");
    }

    function sliceBalance(balance: number): void {
      const xsd = balance.toFixed(2).toString().split(".");
      if (xsd.length === 1) {
        recharge.fBalance = xsd[0];
        return;
      }
      // 大于一位
      if (xsd.length > 1) {
        recharge.fBalance = xsd[0];
        // 小于两位
        if (xsd[1].length < 2) {
          recharge.sBalance = xsd[1] + "0";
        } else {
          recharge.sBalance = xsd[1];
        }
      }
    }

    async function orderInit() {
      await order
        .RechargeInit(
          recharge.amount,
          recharge.accountId,
          localStorage.getItem("paymentChannel")
        )
        .then((res: any) => {
          orderAck(res.result.data.orderNo);
        });
    }

    async function orderAck(orderNo: any) {
      await order
        .RechargeAck(
          orderNo,
          recharge.amount,
          recharge.amount,
          recharge.accountId,
          localStorage.getItem("paymentChannel")
        )
        .then((res: any) => {
          if (res.result && res.result.code === 0) {
            recharge.jspack = JSON.parse(res.result.data.jspack);
            wechatPayReady(orderNo);
          }
        });
    }

    function wechatPayReady(orderNo: any) {
      if (!recharge.jspack) {
        return;
      } else {
        if (typeof WeixinJSBridge == "undefined") {
          document.addEventListener("WeixinJSBridgeReady", onBridgeReady, false);
        } else {
          onBridgeReady(orderNo);
        }
      }
    }

    function onBridgeReady(orderNo: any) {
      WeixinJSBridge.invoke("getBrandWCPayRequest", recharge.jspack, (res: any) => {
        recharge.jspack = "";
        if (res.err_msg == "get_brand_wcpay_request:ok") {
          // 支付成功
          order
            .RechargeFinish(orderNo, localStorage.getItem("paymentChannel"))
            .then((res: any) => {
              if (res.success) {
                router.push({
                  path: "/finish",
                  query: {
                    orderNo: res.result.data.orderNo,
                    orderAmount: res.result.data.orderAmount,
                    creationTime: res.result.data.creationTime,
                  },
                });
              }
            });
        } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
          // 取消支付
        } else {
          // 支付失败
          console.log("支付失败");
        }
      });
    }

    return {
      ...toRefs(recharge),
      seeDetails,
      show,
      showMask,
      showInput,
      showPopup,
      inputOrderInit,
      sliceNumber,
    };
  },
};
</script>
<style style lang="less" scoped>
.header {
  width: 100vw;
  height: 150px;
  background-image: url(https://oss.szqan.com/app2/images/myheader.png);
  background-size: 100% 100%;
  border-radius: 0 0 8px 8px;
}

.account {
  display: flex;
  justify-content: space-between;
  margin: 0 20px;
  height: 80px;
  line-height: 80px;
  font-size: 16.5px;
  font-weight: 600;
  color: #fff;
}

.rechargeList {
  margin-top: -70px;
  margin-left: 20px;
  margin-right: 20px;
  background-color: #fff;
  border-radius: 5px;

  .rechargeTitle {
    display: flex;
    justify-content: space-between;
    height: 30px;
    line-height: 30px;
    padding-top: 10px;
    padding-left: 20px;
    padding-right: 20px;
    font-size: 15.5px;
    font-weight: 600;
  }

  .list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 5px 15px 0 15px;
    padding-bottom: 25px;

    .listContainer {
      display: inline-block;
      width: 45%;
    }

    .listItem {
      display: inline-block;
      width: 100%;
      height: 78px;
      line-height: 78px;
      margin: 8px 0;
      border: 1px solid #22a7f2;
      border-radius: 8px;
      font-size: 17px;
      font-weight: 600;
      text-align: center;
    }
  }
}

.active {
  background-color: #55aff9;
  color: #fff;
}
</style>
