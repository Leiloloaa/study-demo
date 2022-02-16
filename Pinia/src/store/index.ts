import { defineStore } from 'pinia';
import { goodsStore } from './list';

export const mainStore = defineStore('main', {
  state: () => {
    return {
      helloWorld: 'Pinia',
      count: 0,
      phoneNumber: 18797894671
    }
  },
  getters: {
    // 在获取 State 的值时作一些处理
    // Getters 是有缓存特性的
    phoneHidden(state) {
      console.log('PhoneHidden被调用了');
      return state.phoneNumber.toString().replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2')
    }
  },
  actions: {
    // 不能使用箭头函数 因为需要使用 this 
    // 箭头函数绑定的是 外部的 this
    changeState() {
      this.count++
      this.helloWorld = 'Leiloloaa'
    },
    getList() {
      console.log(goodsStore().list);
    }
  }
});