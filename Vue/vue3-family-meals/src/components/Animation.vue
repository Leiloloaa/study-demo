<template>
  <button @click="toggle">click</button>
  <transition name="fade">
    <h1 v-if="showTitle">你好 Vue 3</h1>
  </transition>
</template>

<script setup>
import { ref } from "vue";
let showTitle = ref(true);
function toggle() {
  showTitle.value = !showTitle.value;
}
</script>

<style>
/* 通过 fade-enter-active 和 fade-leave-active 两个 class，去控制动画全程的过渡属性。设置 opacity 有 0.5 秒的过渡时间，并且在元素进入前和离开后设置 opacity 为 0。 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s linear;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
