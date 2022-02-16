<template>
  <div>
    <button @click="add">{{ count }} -- {{ count }}</button>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useStore } from "../store/mini-vuex.js";

let store = useStore();
console.log(store);
let count = computed(() => store.state.count);
// let double = computed(() => store.getters.double);
function add() {
  store.commit("add");
}
</script>
<style lang="less" scoped></style>
