<script setup>
// React 的 useState 不能在 if 或者 函数里面定义，因为它是储存在数组中，为了能够一一对应，所以只能连续定义
// useState 定义响应式变量 返回一个数组 一个是值 另一个是改变这个数组的方法
// 状态要保存在一个数组里面 设置状态的函数也要保存在一个数组里面 并且这两个是一一对应的
// 函数改变值的好处：1. 更加的直观 2. 来源更加清晰

import {useState,useReducer,useReactive} from '../modules';

const [count1 , setCount1] = useState(0)
const [count2 , setCount2] = useState(0)

// useReduce 是 useState 的替代方案
// 在某些场景下，useReducer 会比 useState 更适用，例如 state 逻辑较复杂且包含多个子值，或者下一个 state 依赖于之前的 state 等。
// 并且，使用 useReducer 还能给那些会触发深更新的组件做性能优化，因为你可以向子组件传递 dispatch 而不是回调函数。

// 派发器思想
// 把所有的功能集成，通过一个函数根据不同的类型再去触发对应的操作

const [count3 ,countDispatch] = useReducer((count,setCount,{type})=>{
  switch (type) {
    case 'PLUS':
      setCount(count.value +1)
      break;
   case 'MINUS':
      setCount(count.value -1)
      break;
    default:
      break;
  }
},0)

// useReactive 是接收一个对象

const [info, setInfo] = useReactive({
  name:'zs',
  age:18,
  job:'Engineer'
})
</script>ßßß

<template>
<div>
  <p>
    {{count1}}
  </p>
  <button @click="setCount1(count1-1)">count1 --</button>
  <button @click="setCount1(count => count.value +1)">count1 ++</button>
</div>

<div>
  <p>
    {{count2}}
  </p>
  <button @click="setCount2(count2-1)">count2 --</button>
  <button @click="setCount2(count => count.value +1)">count2 ++</button>
</div>

<div>
  <p>
    {{count3}}
  </p>
  <button @click="countDispatch({type:'MINUS'})">count3 --</button>
  <button @click="countDispatch({type:'PLUS'})">count3 ++</button>
</div>

<div>
  <h1>{{info.name}}</h1>
  <p>{{info.age}}</p>
  <p>{{info.job}}</p>
  <button @click="setInfo('age',36)">set with key</button>
  <button @click="setInfo({name:'ls',age:36,job:'teacher'})">set with all</button>
</div>
</template>

<style>

</style>
