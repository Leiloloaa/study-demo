<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import { ref, watch, onMounted } from 'vue';

const msg = ref('456')
const show = ref(false)
const childRefs = ref<{ a: string, showLoveYou: () => void } | null>(null)

onMounted(() => {
  console.log(childRefs.value?.a);
  childRefs.value?.showLoveYou();
})

function showMsg() {
  msg.value = '错误 500'
  changeShow(true)
}

function changeShow(target = false) {
  show.value = target
}

watch(
  () => show.value,
  (val, prevVal) => {
    console.log(`show is: ` + val)
  }
)
</script>

<template>
  <button @click="showMsg">showMsg</button>
  <HelloWorld :msg="msg" :isShow="show" @changeShow="changeShow" ref="childRefs" />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
