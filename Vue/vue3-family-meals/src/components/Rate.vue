<template>
  <div :style="fontstyle">
    <!-- {{ rate }} -->
    <div class="rate" @mouseout="mouseOut">
      <span @mouseover="mouseOver(num)" v-for="num in 5" :key="num">☆</span>
      <span class="hollow" :style="fontwidth">
        <span @click="onRate(num)" @mouseover="mouseOver(num)" v-for="num in 5" :key="num"
          >★</span
        >
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, computed } from "vue";

// 接收父组件传过来的 value 值
let props = defineProps({
  value: { type: Number, default: 1 },
  theme: { type: String, default: "blue" },
});
let rate = computed(() => "★★★★★☆☆☆☆☆".slice(5 - props.value, 10 - props.value));

const themeObj = {
  black: "#00",
  white: "#fff",
  red: "#f5222d",
  orange: "#fa541c",
  yellow: "#fadb14",
  green: "#73d13d",
  blue: "#40a9ff",
};

const fontstyle = computed(() => {
  return `color:${themeObj[props.theme]};`;
});

// 动态的修改 评分 通过 emit 的方式 触发 父组件中的方法
// 评分宽度
let width = ref(props.value);
function mouseOver(i) {
  width.value = i;
}
function mouseOut() {
  width.value = props.value;
}
const fontwidth = computed(() => `width:${width.value}em;`);

let emits = defineEmits("update-rate"); // 定义emits
function onRate(num) {
  emits("update-rate", num);
}
</script>

<style scoped>
.rate {
  position: relative;
  display: inline-block;
}
.rate > span.hollow {
  position: absolute;
  display: inline-block;
  top: 0;
  left: 0;
  width: 0;
  overflow: hidden;
}
</style>
