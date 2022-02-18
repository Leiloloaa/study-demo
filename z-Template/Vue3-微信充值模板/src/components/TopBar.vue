<template>
  <div style="height: 46px">
    <van-nav-bar
      :title="title"
      :left-text="leftText"
      :left-arrow="hasArrow"
      @click-left="back"
      :right-text="right_text"
      @click-right="rightFun"
      safe-area-inset-top
    />
  </div>
</template>

<script lang="ts">
import { inject, ref, Ref } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "TopBar",
  props: {
    title: String,
    right_text: String,
    leftText: String,
    changeLeftFun:Boolean,
  },
  setup(props: any, context: any) {
    const router = useRouter();

    let hasArrow = ref(false);

    if (props.leftText) {
      hasArrow.value = true;
    }

    const back = () => {
    //  props.changeLeftFun === true ? context.emit("leftFun"): router.go(-1);
    router.go(-1)
    };

    const rightFun = () => {
      context.emit("rightFun"); //调用父级方法参数
    };

    // let title = inject("title");
    // let right_text = inject("right_text");
    return { props, rightFun, hasArrow, back };
  },
  //   data() {
  //     return {
  //       hasArrow: false,
  //     };
  //   },
  //   created() {
  //     if (this.leftText) {
  //       this.hasArrow = true;
  //     }
  //   },
  //   methods: {
  //     back() {
  //       this.leftClick == true ? this.$parent.leftFun() : this.$router.go(-1);
  //     },
  //     rightFun() {
  //       this.$parent.rightFun();
  //     },
  //   },
  //   props: ["title", "leftText", "rightText", "leftClick"],
};
</script>

<style lang="less" scoped>
::v-deep .van-ellipsis {
  color: #fff !important;
}

::v-deep .van-nav-bar .van-icon {
  color: #fff !important;
}
::v-deep .van-nav-bar__text {
  color: #fff !important;
}

.van-nav-bar__title,
.van-ellipsis {
  color: #ffffff !important;
}

.van-nav-bar {
  height: 46px;
  line-height: 46px;
  background-color: #18b4ed;
  width: 100vw;
  position: fixed;
  top: 0;
  z-index: 999;

  .van-nav-bar__title {
    max-width: 60%;
    margin: 0 auto;
    color: #fff !important;
    font-weight: 460;
    font-size: 16px;
  }
}

.van-nav-bar__title {
  max-width: 60%;
  //   margin: 0 auto;
  color: #fff !important;
  font-weight: 500;
  font-size: 0.42667rem;
}
.van-nav-bar__text {
  color: #fff !important;
}
.van-nav-bar__left,
.van-nav-bar__right {
  position: absolute;
  top: 0;
  bottom: 0;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
  padding: 0 0.42667rem;
  font-size: 0.37333rem;
  cursor: pointer;
  color: #ffffff !important;
}
</style>
