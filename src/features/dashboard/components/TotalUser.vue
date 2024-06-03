<template>
    <el-card class="box-card">
        <p class="text-base font-bold">Tổng số người dùng</p>
        <div class="w-100 flex justify-end">
            <img :src="icon" alt="">
        </div>
        <p class="text-4xl font-bold mt-[-30px]">{{ totalUser }}</p>
    </el-card>
</template>
<script lang="ts" setup>
import icon from "../../../assets/Icon.svg"

import { useDashboardDocStore } from "../store/dashboard.store"
import { computed } from 'vue'
const dashboardDocStore = useDashboardDocStore();
const totalUser = computed(() => dashboardDocStore.totalUser);
</script>
<style scoped>
.el-card {
    border-radius: 20px;
}

.text-base {
    color: #737992;
}
</style>