<script setup lang="ts">
import { ref, watch, } from 'vue';
const props = defineProps<{
  msg: string,
  isShow: boolean
}>()

const emits = defineEmits<{
  (e: 'changeShow', value: boolean)
}>()

const show = ref(false)
const a = ref('i love you')

watch(
  () => props.isShow,
  (val, prevVal) => {
    show.value = props.isShow
  }
)

watch(
  () => show.value,
  (val, prevVal) => {
    debounce(changeState, 1000)()
  }
)

function changeState() {
  show.value = false
  emits('changeShow', false)
}

function debounce(fn, delay) {
  let timer = null
  return function () {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    timer = setTimeout(() => {
      fn()
      clearTimeout(timer)
      timer = null
    }, delay);
  }
}

const showLoveYou = function () {
  console.log('do you love me ?');
}

// setup 下要使用 defineExpose 暴露变量
defineExpose({
  a,
  showLoveYou
})
</script>

<template>
  <h1 v-if="show" style="width: 300px;height:50px;color:red">{{ msg }}</h1>
</template>

<style scoped>
a {
  color: #42b983;
}
</style>
