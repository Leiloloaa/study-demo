<template>
  <h1>about</h1>
  <Todo />
  <AddVuex></AddVuex>
  <!-- 具名插槽 -->
  <Children
    ><template v-slot:header>我是头部</template
    ><template v-slot:default="slotProps">{{ slotProps.str.msg }}</template></Children
  >
  <h1>{{ x }}</h1>
  <h1>{{ y }}</h1>

  <Todolist></Todolist>
</template>

<script setup>
import Children from "../components/Children.vue";
import Todolist from "../components/Todolist.vue";
import Todo from "../components/Todo";
import AddVuex from "../components/AddVuex.vue";

import { useMouse } from "../utils/mouse";

let { x, y } = useMouse();
</script>
