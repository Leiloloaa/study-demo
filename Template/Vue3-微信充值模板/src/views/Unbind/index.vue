<template>
  <van-notice-bar
    left-icon="volume-o"
    wrapable
    :scrollable="false"
    text="请注意！解绑前请确保余额已退还！"
    color="#1989fa"
    background="#ecf9ff"
    v-if="!unbind"
  />
  <div class="finish_details" v-if="!unbind">
    <p class="finish_title">账户信息</p>
    <p class="finish_item">
      <span>姓名</span><span>{{ realname }}</span>
    </p>
    <p class="finish_item">
      <span>工号</span><span>{{ empno }}</span>
    </p>
    <p class="finish_item">
      <span>余额</span><span>￥{{ sliceNumber(balance) }}</span>
    </p>
  </div>

  <van-button
    color="linear-gradient(to right, #0396FF, #ABDCFF)"
    class="myBtn"
    @click="unbindMember"
    v-if="!unbind"
  >
    确认解绑
  </van-button>
  <p v-if="unbind" style="text-align: center; margin-top: 40vh; font-size: 20px">
    该账户已解绑
  </p>
</template>
<script lang="ts">
import { reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import register from "../../api/model/register";
import login from "../../api/model/login";
import { Notify } from "vant";
import { sliceNumber } from "../../utils/sliceNumber";

export default {
  setup() {
    const router = useRouter();
    const tenancyname = router.currentRoute.value.query.tenancyname;
    // @ts-ignore
    localStorage.setItem("tenancyname", tenancyname);
    const data = reactive({
      realname: "",
      empno: "",
      balance: "",
      unbind: false,
    });

    const unbindMember = () => {
      register.UnBindMember().then((res: any) => {
        if (res.success) {
          Notify({ type: "success", message: "解绑成功" });
          data.unbind = true;
          localStorage.removeItem("token");
        }
      });
    };

    async function getCurrentInfo() {
      await login.GetCurrentMember().then((res: any) => {
        if (res.result.user.id === 0) {
          router.push("/login");
          localStorage.setItem("unbind", "unbind");
        } else if (res.result.user.memberId == null || res.result.user.memberId == 0) {
          router.push("/register");
          localStorage.setItem("unbind", "unbind");
        } else {
          data.realname = res.result.member.realname;
          data.empno = res.result.member.empno;
          data.balance = res.result.memberAccounts[0].balance;
        }
      });
    }

    getCurrentInfo();
    return { ...toRefs(data), unbindMember, sliceNumber };
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
    border-bottom: 1px solid #ccc;
    font-size: 20px;
    font-weight: 600;
    text-align: center;
  }

  .finish_item {
    display: flex;
    justify-content: space-between;
    margin: 20px 0;
    font-size: 15px;
    // color: #ccc;
  }
}
</style>
