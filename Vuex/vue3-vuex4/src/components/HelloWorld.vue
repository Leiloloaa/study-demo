<script setup lang="ts">
import { useStore } from 'vuex'

const store = useStore()

const increment = () => {
  // 修改数据 要通过 commit 这和 redux 一样 需要通过 仓库管理员才能修改
  store.commit('increment')
  // 直接修改无效
  // store.state.count++
}

</script>

<template>
  <h1>{{ store.state.count }}</h1>
  <button @click="increment">增加count</button>
</template>

<style scoped>
</style>
