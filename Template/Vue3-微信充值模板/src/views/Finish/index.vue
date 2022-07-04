<template>
  <TopBar :title="'充值完成'" :left-text="'返回'" />
  <img class="finish_img" src="https://oss.szqan.com/images/recharge-finish.png" alt="" />
  <div class="finish_details">
    <p class="finish_title">充值成功</p>
    <p class="finish_item">
      <span>订单号</span><span>{{ orderNo }}</span>
    </p>
    <p class="finish_item">
      <span>充值金额</span><span>￥{{ orderAmount }}</span>
    </p>
    <p class="finish_item">
      <span>充值时间</span><span>{{ dataTime(creationTime) }}</span>
    </p>
  </div>
</template>
<script lang="ts">
import TopBar from "@/components/TopBar.vue";
import { reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import { dataTime } from "../../utils/dataTime";

export default {
  components: { TopBar },
  setup() {
    const router = useRouter();
    const data = reactive({
      orderNo: router.currentRoute.value.query.orderNo,
      orderAmount: router.currentRoute.value.query.orderAmount,
      creationTime: router.currentRoute.value.query.creationTime,
    });
    return { ...toRefs(data), dataTime };
  },
};
</script>
<style style lang="less" scoped>
.finish_img {
  display: inline-block;
  width: 100vw;
  height: 4.2rem;
}

.finish_details {
  margin: 20px 40px;

  .finish_title {
    padding-bottom: 20px;
    border-bottom: 1px solid #b9b9b9;
    font-size: 20px;
    font-weight: 600;
    text-align: center;
  }

  .finish_item {
    display: flex;
    justify-content: space-between;
    margin: 20px 0;
    font-size: 15px;
    color: #b9b9b9;
  }
}
</style>
