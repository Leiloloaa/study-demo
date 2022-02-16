<template>
  <ChageColor />
  <Animation />

  <h1>你的评分是 {{ score }}</h1>
  <!-- theme 不使用 : 的原因 -->
  <!-- 传入 theme 不变量 -->
  <Rate :value="score" @update-rate="update"></Rate>
  <Rate :value="score" theme="orange" @update-rate="update"></Rate>
  <Rate :value="score" theme="yellow" @update-rate="update"></Rate>
</template>

<script setup>
import { ref } from "vue";
import Rate from "../components/Rate.vue";
import ChageColor from "../components/ChageColor.vue";
import Animation from "../components/Animation.vue";
let score = ref(3.5);

function update(num) {
  score.value = num;
}
</script>
