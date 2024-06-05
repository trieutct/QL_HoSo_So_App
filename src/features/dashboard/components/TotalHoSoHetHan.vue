<template>
    <el-card class="box-card">
        <p class="text-base font-bold">Tổng số hồ sơ hết hạn</p>
        <div class="w-100 flex justify-end">
            <img :src="icon" alt="" height="50" width="50">
        </div>
        <p class="text-4xl font-bold mt-[-20px]">{{ expricedHoSo.length }}</p>
    </el-card>
</template>
<script lang="ts" setup>
import icon from "../../../assets/expired.png"

import { useDashboardDocStore } from "../store/dashboard.store"
import { computed } from 'vue'
const dashboardDocStore = useDashboardDocStore();
const expricedHoSo = computed(() => dashboardDocStore.expricedHoSo);
</script>
<style scoped>
.el-card {
    border-radius: 20px;
}

.text-base {
    color: #737992;
}
</style>