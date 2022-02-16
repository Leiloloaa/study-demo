<template>
  <slot name="header"></slot>

  <h1>我是子组件</h1>
  <slot v-bind:str="data">{{ data.msg }}</slot>
</template>

<script>
export default {
  name: "children",
};
</script>

<script setup>
import { reactive } from "vue";
const data = reactive({ msg: 123, msg2: 456 });
</script>
