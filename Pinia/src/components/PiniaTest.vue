<template>
  <h2>{{ store.helloWorld }}</h2>
  <h2>{{ store.count }}</h2>
  <h2>{{ store.phoneNumber }}</h2>
  <div>
    <button @click="handleClick">点击增加</button>
    <button @click="handleClickChangePhone">更改手机号</button>
    <button @click="handleClickGetList">获取 list</button>
  </div>
  <h2>{{ helloWorld }}</h2>
  <h2>{{ count }}</h2>
  <h2>{{ phoneHidden }}</h2>
</template>

<script lang='ts' setup>
import { mainStore } from '../store/index';
import { storeToRefs } from 'pinia';

// 执行这个实例
const store = mainStore()
// 解构使用需注意 需要使用 storeToRefs 不然变量不会变成响应式
const { helloWorld, count, phoneHidden } = storeToRefs(store)

const handleClick = function () {
  // 修改状态数据的方式
  // 第一种
  // store.count++
  // 第二种
  // $patch 的方式是经过优化的，会加快修改速度，对程序的性能有很大的好处。所以如果你是多条数据同时更新状态数据，推荐使用 $patch 方式更新。
  // store.$patch({
  //   count: store.count + 1,
  //   helloWorld: store.helloWorld === 'Pinia' ? 'Vue3' : 'Pinia'
  // })
  // 第三种
  // 在 actions 中写好逻辑 再调用 actions
  store.changeState()
}

// 点击按钮的对应函数
const handleClickChangePhone = () => {
  store.phoneNumber = 18797894672;
};

const handleClickGetList = function () {
  store.getList()
}
</script>

<style lang='less' scoped>
</style>