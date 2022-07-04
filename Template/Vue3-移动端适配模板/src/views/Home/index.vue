<template>
  <van-skeleton title avatar :row="3" :loading="loading">
    <van-row>
      <van-col span="12">中盛科技园</van-col>
      <van-col span="12"> 机器码：100101 </van-col>
    </van-row>
    <van-divider
      :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
    />
    <van-row>
      <van-col span="8"> <img class="img-icon" :src="activeIcon" /></van-col>
      <van-col span="16">
        <van-radio-group v-model="checked">
          <van-cell-group :border="false">
            <van-cell
              title="使用余额支付"
              clickable
              @click="selectMethod('1')"
              :border="false"
            >
              <template #right-icon>
                <van-radio name="1" icon-size="24px">
                  <template #icon="props">
                    <img
                      class="img-icon"
                      :src="props.checked ? activeIcon : inactiveIcon"
                    />
                  </template>
                </van-radio>
              </template>
            </van-cell>
            <van-cell
              title="使用洗车币支付"
              clickable
              @click="selectMethod('2')"
              :border="false"
            >
              <template #right-icon>
                <van-radio name="2" icon-size="24px">
                  <template #icon="props">
                    <img
                      class="img-icon"
                      :src="props.checked ? activeIcon : inactiveIcon"
                    />
                  </template>
                </van-radio>
              </template>
            </van-cell>
          </van-cell-group> </van-radio-group
      ></van-col>
    </van-row>
    <van-row>
      <van-col span="8"></van-col>
      <van-col span="16">
        <transition name="van-slide-up">
          <div>
            <span v-if="showBalance">当前余额:￥9.76</span>
          </div></transition
        >
        <transition name="van-slide-up">
          <div>
            <span v-if="showCoin">当前洗车币:￥9.76</span>
          </div></transition
        >
      </van-col>
    </van-row>
    <van-row>
      <van-col span="8"></van-col>
      <van-col span="16"> 查看余额支持网点 </van-col>
    </van-row>
    <van-divider
      :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
    />
  </van-skeleton>
  <van-button
    icon="https://img.yzcdn.cn/vant/user-active.png"
    type="primary"
    v-if="showBalance"
  >
    ￥开始余额洗车
  </van-button>
  <van-button
    icon="https://img.yzcdn.cn/vant/user-active.png"
    type="primary"
    v-if="showCoin"
  >
    ￥开始洗车币洗车
  </van-button>
  <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }" />
  <van-row gutter="20" v-if="showBalance">
    <van-col span="8">30元</van-col>
    <van-col span="8">88元</van-col>
    <van-col span="8">100元</van-col>
  </van-row>
  <van-row gutter="20" v-if="showCoin">
    <van-col span="8">30元</van-col>
    <van-col span="8">88元</van-col>
    <van-col span="8">100元</van-col>
    <van-col span="8">100元</van-col>
  </van-row>
  <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }" />
  图片
  <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }" />
  <van-skeleton title :row="4" :loading="loading" />
  <div>商家电话：xxxxxxxx</div>
  <div>注意：洗车币购买后，一概不退！</div>
</template>

<script lang="ts">
import { ref, reactive, toRefs } from "vue";

export default {
  setup() {
    const payMethods = reactive({
      showBalance: true,
      showCoin: false,
    });
    const refPayMethods = toRefs(payMethods);
    const loading = ref(true);
    const checked = ref("1");
    const visible = ref(false);
    setTimeout(() => {
      loading.value = false;
    }, 2000);

    const selectMethod = (index: string) => {
      checked.value = index;
      checked.value == "1"
        ? (payMethods.showBalance = true)
        : (payMethods.showBalance = false);
      checked.value == "2" ? (payMethods.showCoin = true) : (payMethods.showCoin = false);
    };
    return {
      ...refPayMethods,
      checked,
      activeIcon: "https://img.yzcdn.cn/vant/user-active.png",
      inactiveIcon: "https://img.yzcdn.cn/vant/user-inactive.png",
      loading,
      visible,
      selectMethod,
    };
    // onMounted(() => {
    //   loading.value = false;
    // });
  },
};
</script>

<style lang="less" scoped>
.van-cell {
  position: relative;
  display: flex;
  box-sizing: border-box;
  width: 100%;
  padding: 0;
  overflow: hidden;
  color: #323233;
  font-size: 0.37333rem;
  line-height: 0.64rem;
  background-color: #fff;
}
.img-icon {
  height: 20px;
}
</style>
