<template>
  <el-container>
    <el-aside width="200px"><Sidebars /></el-aside>
    <el-container>
      <el-header><Headers /></el-header>
      <el-main>
        <Tags /> 
        <div class="content">
          <router-view v-slot="{ Component }">
            <transition name="move" mode="out-in">
                <component :is="Component" />
            </transition>
          </router-view>
          <!-- <el-backtop target=".content"></el-backtop> -->
        </div></el-main
      >
      <el-footer><Footers /></el-footer>
    </el-container>
  </el-container>
</template>
<script lang="ts">
import Headers from "@/layout/components/Header.vue";
import Sidebars from "@/layout/components/Sidebar.vue";
import Footers from "@/layout/components/Footer.vue";
import Tags from "@/layout/components/Tags.vue";
export default {
  components: {
    Headers,
    Sidebars,
    Footers,
    Tags
  },
};
</script>

<style lang="scss" scoped>

// .content {
//     width: auto;
//     // height: 100%;
//     padding: 10px;
//     overflow-y: scroll;
//     box-sizing: border-box;
// }

.el-header{
    height: 76px;
}
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  height: 76px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;

  height: 100vh;
}

.el-main {
  background-color: #e9eef3;
  color: #333;

//   line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
