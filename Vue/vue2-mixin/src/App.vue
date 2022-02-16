<template>
  <div id="app">
    {{ message }}
    <button @click="mixinTest">按钮</button>
  </div>
</template>

<script>
import test from "./mixins/test.js";
import test2 from "./mixins/test2.js";

export default {
  name: "App",
  mixins: [test, test2],
  data() {
    return {};
  },
  created() {
    this.mixinTest();
    console.log(this.message);
  },
  methods: {
    mixinTest() {
      console.log(123);
    },
  },
};
</script>

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
