<script setup lang="ts">
import HelloWorld from "./components/HelloWorld.vue";
import { ref, watch, onMounted } from "vue";
import StyleBind from "./components/StyleBind.vue";

const msg = ref("456");
const show = ref(false);
const childRefs = ref<{ a: string; showLoveYou: () => void } | null>(null);

onMounted(() => {
  console.log(childRefs.value?.a);
  childRefs.value?.showLoveYou();
});

function showMsg() {
  msg.value = "错误 500";
  changeShow(true);
}

function changeShow(target = false) {
  show.value = target;
}

watch(
  () => show.value,
  (val, prevVal) => {
    console.log(`show is: ` + val);
  }
);

// 顶层 await
// 使用了 await setup 函数 会自动加上 async
const post = await fetch(
  `https://api.uomg.com/api/get.kg?songurl=https://node.kg.qq.com/play?s=YaCv8EYfJunVWYcH`
).then((r) => r.json());

console.log(post);

// style module
// const css = useCssModule();
// console.log(css);

// 状态驱动 css
// const color = ref("red");

// setTimeout(() => {
//   color.value = "blue";
// }, 2000);
</script>

<template>
  <button @click="showMsg">showMsg</button>
  <HelloWorld :msg="msg" :isShow="show" @changeShow="changeShow" ref="childRefs" />

  <p>状态驱动 css</p>
  <StyleBind />
</template>

<style scoped>
/* p {
  color: v-bind(color);
} */
</style>
