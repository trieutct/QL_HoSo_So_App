<template>
  <el-container class="min-h-screen">
    <SideBar />
    <el-main
      class="w-full"
      style="background-color: #f1f4fb; width: 100%; min-height: 100vh"
    >
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script lang="ts" setup>
import SideBar from "./components/SildeBar.vue";
</script>

<style>
.el-menu-item:hover {
  background-color: #eee !important;
  color: #4764c3;
  font-weight: 700;
}

.scrollbar-none::-webkit-scrollbar {
  width: 0;
}

.scrollbar-none {
  scrollbar-width: none;
}
</style>
