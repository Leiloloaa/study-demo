<template>
  <div class="login">
    <van-notice-bar
      left-icon="volume-o"
      wrapable
      :scrollable="false"
      text="请注意！绑定的工号必须是您本人的工号！绑定错误将会充值到他人账户！"
      color="#1989fa"
      background="#ecf9ff"
    />
    <img class="logo" src="https://oss.szqan.com/logo/lx.jpg" alt="" />
    <div class="login-body">
      <van-field
        v-model="empNo"
        label-class="van-cell__changeLable"
        label="员工号"
        clearable
        right-icon="warning-o"
        placeholder="请输入员工号"
        autofocus="true"
        type="text"
        style="margin-bottom: 10px"
        @focus="showList = false"
      />
      <div style="border: 1px solid #ccccff" v-if="showList">
        <van-cell label-class="van-cell__changeLable" title="请核对您的员工信息">
        </van-cell>
        <van-cell label-class="van-cell__changeLable" title="姓名" value="工号">
        </van-cell>
        <van-cell
          label-class="van-cell__changeLable"
          :title="realName"
          :value="empNo"
          clickable
        >
        </van-cell>
      </div>
    </div>

    <van-button
      color="linear-gradient(to right, #0396FF, #ABDCFF)"
      class="myBtn"
      @click="getNoList"
      v-if="!showList"
    >
      查询
    </van-button>

    <van-button
      color="linear-gradient(to right, #0396FF, #ABDCFF)"
      class="myBtn"
      @click="bindMember"
      v-if="showList"
    >
      确认无误
    </van-button>
  </div>
</template>

<script lang="ts">
import TopBar from "@/components/TopBar.vue";
import { reactive, toRefs } from "@vue/reactivity";
import { useRouter } from "vue-router";
import register from "../../api/model/register";
import { Notify } from "vant";

export default {
  components: { TopBar },
  setup() {
    const router = useRouter();
    const personInfo = reactive({
      empNo: "",
      showList: false,
      realName: "",
    });

    const getNoList = () => {
      if (personInfo.empNo == "") {
        Notify({ type: "primary", message: "输入有误，请检查！" });
        return;
      }
      register.GetMemberInfo(personInfo.empNo).then((res: any) => {
        if (res.result.code == 0) {
          if (res.result.data.isActive) {
            Notify({ type: "danger", message: "该员工号已被绑定，请检查！" });
          } else {
            personInfo.showList = true;
            personInfo.empNo = res.result.data.empNo;
            personInfo.realName = res.result.data.realName;
          }
        }
      });
    };

    const bindMember = () => {
      register.BindMember(personInfo.empNo).then((res: any) => {
        if (res.success) {
          if (localStorage.getItem("unbind")) {
            router.push({
              path: "/unbind",
              query: { tenancyname: localStorage.getItem("tenancyname") },
            });
            return 1;
          }
          router.push({
            path: "/recharge",
            query: { tenancyname: localStorage.getItem("tenancyname") },
          });
        }
      });
    };

    return {
      ...toRefs(personInfo),
      getNoList,
      bindMember,
    };
  },
};
</script>

<style lang="less" scoped>
.notice-swipe {
  height: 40px;
  line-height: 40px;
}

.login {
  .logo {
    width: 110px;
    height: 110px;
    display: block;
    margin: 40px auto 30px;
    border-radius: 50%;
    animation: mylogo 3s;
    -moz-animation: mylogo 3s;
    /* Firefox */
    -webkit-animation: mylogo 3s;
    /* Safari and Chrome */
    -o-animation: mylogo 3s;
    /* Opera */
    animation-iteration-count: infinite;
  }
  .login-body {
    padding: 0 20px;
  }
}

@keyframes mylogo {
  0% {
    transform: rotate(0deg) scale(0.8, 0.8);
    opacity: 1;
  }
  25% {
    transform: rotate(0deg) scale(1, 1);
    opacity: 0.8;
  }
  100% {
    transform: rotate(0deg) scale(0.8, 0.8);
    opacity: 1;
  }
}

@-moz-keyframes mylogo {
  0% {
    transform: rotate(0deg) scale(0.8, 0.8);
    opacity: 1;
  }
  25% {
    transform: rotate(0deg) scale(1, 1);
    opacity: 0.8;
  }
  100% {
    transform: rotate(0deg) scale(0.8, 0.8);
    opacity: 1;
  }
}

@-webkit-keyframes mylogo {
  0% {
    transform: rotate(0deg) scale(0.8, 0.8);
    opacity: 1;
  }
  25% {
    transform: rotate(0deg) scale(1, 1);
    opacity: 0.8;
  }
  100% {
    transform: rotate(0deg) scale(0.8, 0.8);
    opacity: 1;
  }
}

@-o-keyframes mylogo {
  0% {
    transform: rotate(0deg) scale(0.8, 0.8);
    opacity: 1;
  }
  25% {
    transform: rotate(0deg) scale(1, 1);
    opacity: 0.8;
  }
  100% {
    transform: rotate(0deg) scale(0.8, 0.8);
    opacity: 1;
  }
}

.foot {
  position: fixed;
  width: 100vw;
  height: 12vh;
  line-height: 12vh;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  font-size: 14px;
  color: #969799;

  .show {
    display: inline-block;

    .showLine {
      padding-bottom: 2px;
      border-bottom: 1px solid #969799;
      color: #969799 !important;
    }
  }
}
</style>
