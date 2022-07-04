<template>
  <div>
    <div class="loginImg">
      <div class="radar">
        <div class="ripple"></div>
        <div class="ripple"></div>
        <div class="ripple"></div>
      </div>
    </div>
    <div class="loginFont">
      <div class="loader font4">
        <span>L</span>
        <span class="span2">O</span>
        <span class="span3">G</span>
        <span class="span4">I</span>
        <span class="span5">N</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import login from "../../api/model/login";

export default {
  setup() {
    const router = useRouter();
    let returnUrl = window.location.href;
    const tenancyname: any = localStorage.getItem("tenancyname");
    let code: any;

    function getTanentId() {
      login
        .IsTenantAvailable({
          tenancyname: tenancyname,
        })
        .then((res: any) => {
          localStorage.setItem("tenantId", res.result.tenantId);
          localStorage.setItem("tenantname", res.result.name);
          localStorage.setItem("paymentChannel", res.result.paymentChannel);
          getExternalProviders(res.result.tenantId);
        });
    }

    function getExternalProviders(tenantId: number) {
      login.GetExternalAuthenticationProviders({ tenantId }).then((res: any) => {
        startLogin(res.result[0].name, res.result[0].clientId);
      });
    }

    function startLogin(authProvider: any, clientId: any) {
      getCode();
      if (!code) {
        window.location.href =
          "https://lxapi.mzapi.com/api/TokenAuth/WechatLogin?clientId=" +
          clientId +
          "&returnUrl=" +
          returnUrl;
      } else {
        wechatLogin(authProvider);
      }
    }

    function getCode() {
      if (router.currentRoute.value.query.code != null) {
        code = router.currentRoute.value.query.code;
      }
    }

    function wechatLogin(authProvider: any) {
      login.wechatLogin(code, code, returnUrl, authProvider).then((res: any) => {
        localStorage.setItem("token", res.result.accessToken);
        if (localStorage.getItem("unbind")) {
          router.push({
            path: "/unbind",
            query: { tenancyname: localStorage.getItem("tenancyname") },
          });
          return 1;
        }
        router.push({
          path: "/recharge",
          query: { tenancyname: tenancyname },
        });
      });
    }

    getTanentId();
  },
};
</script>

<style lang="less" scoped>
.loginImg {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 40vh;
  margin-top: 50px;

  .radar {
    position: relative;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background-image: url(https://oss.szqan.com/logo/lx.jpg);
    background-size: 100% 100%;

    .ripple {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 120px;
      height: 120px;
      border-radius: 50%;
      border: 10px solid rgb(218, 231, 253);
      animation: ripple 2s linear infinite;
    }
  }

  .radar :nth-child(1) {
    animation-delay: 0.666s;
  }

  .radar :nth-child(2) {
    animation-delay: 1.322s;
  }
}

@keyframes ripple {
  to {
    width: 180px;
    height: 180px;
    opacity: 0;
  }
}

.font4 {
  font-family: "Comic Sans MS", sans-serif;
  font-weight: bold;
}

.loginFont {
  position: relative;
  width: 380px;
  height: 40px;
  margin: 0 auto;

  .loader {
    position: absolute;
    left: 50%;
    top: 50%;
    font-size: 40px;
    overflow: hidden;
    transform: translate(-50%, -50%);
  }
}

.loader span {
  -moz-animation: loading 1s linear infinite -0.8s;
  -webkit-animation: loading 1s linear infinite -0.8s;
  animation: loading 1s linear infinite -0.8s;
  float: left;
}

.loader .span2 {
  -moz-animation: loading 1s linear infinite -0.2s;
  -webkit-animation: loading 1s linear infinite -0.2s;
  animation: loading 1s linear infinite -0.2s;
}

.loader .span3 {
  -moz-animation: loading 1s linear infinite -0.5s;
  -webkit-animation: loading 1s linear infinite -0.5s;
  animation: loading 1s linear infinite -0.5s;
}

.loader .span4 {
  -moz-animation: loading 1s linear infinite -1.1s;
  -webkit-animation: loading 1s linear infinite -1.1s;
  animation: loading 1s linear infinite -1.1s;
}

.loader .span5 {
  -moz-animation: loading 1s linear infinite -0.36s;
  -webkit-animation: loading 1s linear infinite -0.36s;
  animation: loading 1s linear infinite -0.36s;
}

@keyframes loading {
  0%,
  100% {
    -moz-transform: scale(1) rotateZ(0deg);
    -ms-transform: scale(1) rotateZ(0deg);
    -webkit-transform: scale(1) rotateZ(0deg);
    transform: scale(1) rotateZ(0deg);
    opacity: 1;
  }

  26% {
    -moz-transform: scale(1.1) rotateZ(12deg);
    -ms-transform: scale(1.1) rotateZ(12deg);
    -webkit-transform: scale(1.1) rotateZ(12deg);
    transform: scale(1.1) rotateZ(12deg);
    opacity: 0.2;
  }

  76% {
    -moz-transform: scale(0.8) rotateZ(-8deg);
    -ms-transform: scale(0.8) rotateZ(-8deg);
    -webkit-transform: scale(0.8) rotateZ(-8deg);
    transform: scale(0.8) rotateZ(-8deg);
    opacity: 0.6;
  }
}
</style>
