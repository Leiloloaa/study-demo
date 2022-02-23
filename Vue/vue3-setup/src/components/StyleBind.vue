<script setup>
const theme = {
  color: "red",
};
</script>

<template>
  <p>hello 123</p>
</template>

<style scoped>
p {
  color: v-bind("theme.color");
}
</style>
