<template>
  <TopBar
    :title="'充值明细'"
    :left-text="'返回'"
    :changeLeftFun="true"
    @leftFun="leftFun"
  />
  <van-tabs v-model="active" @click="changeBar" sticky offset-top="46px" background="#f7f8fa">
    <van-tab title="已完成" name="1">
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :offset="10"
        :immediate-check="false"
      >
        <div v-for="(item, index) in finishList" :key="index">
          <div class="card">
            <van-cell
              :value="'￥' + item.orderAmount"
              style="border-radius: 8px 8px 0 0"
              class="van-cell-content"
              value-class="van-cell__changeValue"
            >
              <template #title>
                <img
                  src="https://oss.szqan.com/app2/images/balanceIon.svg"
                  alt=""
                  style="
                    display: inline-block;
                    vertical-align: middle;
                    text-align: center;
                    width: 24px;
                    height: 24px;
                    margin-right: 3px;
                    margin-left: 1px;
                    margin-bottom: 2px;
                  "
                />
                <span class="custom-title">余额充值</span>
              </template>
            </van-cell>
            <div class="myitems">
              <div class="myitem">
                <span>{{ item.orderNo }}</span
                ><span>{{ dataTime(item.creationTime) }}</span>
              </div>
              <div class="myitem">
                <span>{{ item.memberCode }}</span
                ><span>已完成</span>
              </div>
            </div>
            <div style="height: 5px"></div>
          </div>
        </div> </van-list
    ></van-tab>
    <van-tab title="未完成" name="2">
      <van-list
        v-model:loading="loading1"
        :finished="finished1"
        :offset="10"
        finished-text="没有更多了"
        @load="onLoad1"
        :immediate-check="false"
      >
        <div v-for="(item, index) in unfinishList" :key="index">
          <div class="card">
            <van-cell
              :value="'￥' + item.orderAmount"
              style="border-radius: 15px 15px 0 0"
              class="van-cell-content"
              value-class="van-cell__changeValue"
            >
              <template #title>
                <img
                  src="https://oss.szqan.com/app2/images/balanceIon1.svg"
                  alt=""
                  style="
                    display: inline-block;
                    vertical-align: middle;
                    text-align: center;
                    width: 22px;
                    height: 24px;
                    margin-right: 5px;
                    margin-left: 1px;
                  "
                />
                <span class="custom-title">余额充值</span>
              </template>
            </van-cell>
            <div class="myitems">
              <div class="myitem">
                <span>{{ item.orderNo }}</span
                ><span>{{ dataTime(item.creationTime) }}</span>
              </div>
              <div class="myitem">
                <span>{{ item.memberCode }}</span
                ><span>未完成</span>
              </div>
            </div>
            <div class="btns">
              <div class="btn">
                <span @click="cancelRecharge(item.orderNo)">订单取消</span>
              </div>
            </div>
          </div>
        </div>
      </van-list>
    </van-tab>
  </van-tabs>
  <van-empty description="暂时没有数据" v-if="showEmpty" />
</template>
<script lang="ts">
import TopBar from "@/components/TopBar.vue";
import { reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import { dataTime } from "../../utils/dataTime";
import order from "../../api/model/order";
import { Notify } from "vant";

export default {
  components: { TopBar },
  setup() {
    const router = useRouter();
    const data = reactive({
      active: "1",
      activeNames: "1",
      finishList: [],
      unfinishList: [],
      skipCount: 0,
      totalCount: 0,
      totalCount1: 0,
      loading: false,
      finished: false,
      loading1: false,
      finished1: false,
      showEmpty: false,
    });

    const leftFun = () => {
      router.push("/recharge");
    };

    const changeBar = (name: number) => {
      data.showEmpty = false;
      if (name == 1) {
        data.finishList = [];
        getMyRechargeOrder();
      }
      if (name == 2) {
        data.unfinishList = [];
        getMyunRechargeOrder();
      }
    };

    function getMyRechargeOrder() {
      data.skipCount = 0;
      order
        .GetMyRechargeOrders({
          OrderStates: 40,
          SkipCount: data.skipCount,
          Sorting: "creationTime desc",
          MaxResultCount: "10",
        })
        .then((res: any) => {
          data.finishList = res.result.items;
          data.totalCount = res.result.totalCount;
          if (data.totalCount == 0) {
            data.showEmpty = true;
          }
        });
    }

    getMyRechargeOrder();

    function getMyunRechargeOrder() {
      data.skipCount = 0;
      order
        .GetMyRechargeOrders({
          OrderStates: 20,
          SkipCount: data.skipCount,
          Sorting: "creationTime desc",
          MaxResultCount: "10",
        })
        .then((res: any) => {
          data.unfinishList = res.result.items;
          data.totalCount1 = res.result.totalCount;
          if (data.totalCount1 == 0) {
            data.showEmpty = true;
          }
        });
    }

    function onLoad() {
      if (data.finishList.length >= data.totalCount) {
        data.finished = true;
      } else {
        data.skipCount += 10;
        order
          .GetMyRechargeOrders({
            OrderStates: 40,
            SkipCount: data.skipCount,
            Sorting: "creationTime desc",
            MaxResultCount: "10",
          })
          .then((res: any) => {
            data.finishList = data.finishList.concat(res.result.items);
          });
        data.loading = false;
      }
    }

    function onLoad1() {
      if (data.unfinishList.length >= data.totalCount1) {
        data.finished1 = true;
      } else {
        data.skipCount += 10;
        order
          .GetMyRechargeOrders({
            OrderStates: 20,
            SkipCount: data.skipCount,
            Sorting: "creationTime desc",
            MaxResultCount: "10",
          })
          .then((res: any) => {
            data.unfinishList = data.unfinishList.concat(res.result.items);
          });
        data.loading1 = false;
      }
    }

    function cancelRecharge(orderNo: string) {
      order.CancelRecharge(orderNo).then((res: any) => {
        if (res.result.code == 0) {
          Notify({ type: "success", message: "充值订单取消成功" });
          getMyunRechargeOrder();
        } else {
          Notify({ type: "danger", message: "充值订单取消失败" });
        }
      });
    }

    return {
      ...toRefs(data),
      leftFun,
      changeBar,
      onLoad,
      onLoad1,
      dataTime,
      cancelRecharge,
    };
  },
};
</script>
<style lang="less" scoped>
.card {
  border-radius: 8px;
  margin: 10px 16px;
  padding-bottom: 8px;
  background-color: #fff;
  border: 1px solid #ebedf0;
}

.myitems {
  margin: 0 15px;
  border-top: 1px solid #ebedf0;
  padding: 5px 0px;

  .myitem {
    display: flex;
    justify-content: space-between;
    padding: 5px 0;
    font-size: 14px;

    span {
      display: inline-block;
    }

    & :nth-child(1) {
      color: #323233;
    }

    & :nth-child(2) {
      color: #969799;
    }
  }
}

.btns {
  width: 100%;
  height: 40px;
  background-color: #fff;
  text-align: right;

  .btn {
    margin-right: 15px;
    margin-left: 15px;
    border-top: 1px solid #ebedf0;

    span {
      display: inline-block;
      padding: 6px 10px;
      margin-top: 10px;
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 8px;
      font-size: 13px;
    }
  }
}
</style>
