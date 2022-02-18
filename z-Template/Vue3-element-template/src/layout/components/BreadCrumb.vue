<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group appear name="breadcrumb">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/table' }">活动管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/number' }">活动列表</el-breadcrumb-item>
      <!-- <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
        <span
          v-if="item.redirect === 'noRedirect' || index == levelList.length - 1"
          class="no-redirect"
          >{{ $t(item.meta.title) }}</span
        >
        <a v-else @click.prevent="handleLink(item)">{{ $t(item.meta.title) }}</a>
      </el-breadcrumb-item> -->
    </transition-group>
  </el-breadcrumb>
</template>

<script lang="ts">
import { ref, reactive, toRefs } from "vue";
export default {
  components: {},
  setup() {
    return {};
  },
};
</script>
<style lang="scss" scoped></style>
