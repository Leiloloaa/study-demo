<template>
  <div>
    <transition name="modal">
      <div class="info-wrapper" v-if="showModal">
        <div class="info">哥，你啥也没输入！</div>
      </div>
    </transition>
    <input type="text" v-model="title" @keydown.enter="addTodo" />
    <button @click="addTodo">添加</button>
    <button v-if="active < all" @click="clear">清理</button>
    <ul v-if="todos.length">
      <transition-group name="flip-list" tag="ul">
        <li v-for="todo in todos">
          <input type="checkbox" v-model="todo.done" />
          <span :class="{ done: todo.done }"> {{ todo.title }}</span>
        </li>
      </transition-group>
    </ul>
    <div v-else>暂无数据</div>
    <div>
      全选<input type="checkbox" v-model="allDone" />
      <span> {{ active }} / {{ all }} </span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useTodo } from "../hooks/useTodo";
let { title, todos, clear, active, all, allDone } = useTodo();
let showModal = ref(false);
function addTodo() {
  if (!title.value) {
    showModal.value = true;
    setTimeout(() => {
      showModal.value = false;
    }, 1500);
    return;
  }
  todos.value.push({ title: title.value, done: false });
  title.value = "";
}
</script>

<style lang="scss">
// $padding: 20px;
// $white: #f0f0f0;
// ul {
//   width: 500px;
//   margin: 0 auto;
//   padding: 0;
//   li {
//     &:hover {
//       cursor: pointer;
//     }
//     list-style-type: none; 
//     margin-bottom: $padding;
//     padding: $padding;
//     background: $white;
//     box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.1);
//   }
// }
.info-wrapper {
  position: fixed;
  top: 20px;
  width: 200px;
}
.info {
  padding: 20px;
  color: white;
  background: #d88986;
}

.modal-enter-active,
.modal-leave-active {
  opacity: 0;
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-enter-to {
  opacity: 0;
  transform: translateY(-80px);
}

.flip-list-move {
  transition: transform 0.8s ease;
}
.flip-list-enter-active,
.flip-list-leave-active {
  transition: all 1s ease;
}
.flip-list-enter-from,
.flip-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
