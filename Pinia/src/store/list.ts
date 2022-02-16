import { defineStore } from 'pinia';

export const goodsStore = defineStore('goods', {
  state: () => {
    return {
      list: ['vue3', 'pinia', 'vuex']
    }
  }
})