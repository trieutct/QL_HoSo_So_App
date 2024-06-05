<template>
    <div class="dashboard">
        <h2 class="text-main font-semibold text-xl">Thống kê</h2>
        <div class="mt-5 ">
            <el-row :gutter="20" class="mb-10">
                <el-col :span="24">
                    <el-row :gutter="20">
                        <el-col :span="6">
                            <TotalUser />
                        </el-col>
                        <el-col :span="6">
                            <TotalKho />
                        </el-col>
                        <el-col :span="6">
                            <TotalHoSo />
                        </el-col>
                        <el-col :span="6">
                            <TotalHoSoHetHan />
                        </el-col>
                    </el-row>
                </el-col>
                <el-col class="mt-4" :span="12">
                    <DashboardByLoaiHoSo />
                </el-col>
                <el-col class="mt-4" :span="12">
                    <DashboardByLoaiVanBan />
                </el-col>
                <el-col class="mt-4" :span="24">
                    <DashBoardByRole />
                </el-col>
                <el-col class="mt-4" :span="24">
                    <TableHoSoHetHan />
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script lang="ts" setup>
import DashboardByLoaiHoSo from '../components/DashboardByLoaiHoSo.vue'
import DashboardByLoaiVanBan from '../components/DashboardByLoaiVanBan.vue'
import TotalUser from '../components/TotalUser.vue'
import TotalHoSo from '../components/TotalHoSo.vue'
import TotalHoSoHetHan from '../components/TotalHoSoHetHan.vue'
import TotalKho from '../components/TotalKho.vue'
import TableHoSoHetHan from '../components/TableHoSoHetHan.vue'
import DashBoardByRole from '../components/DashBoardByRole.vue'


import { useDashboardDocStore } from "../store/dashboard.store"
import { onMounted } from 'vue'
const dashboardDocStore = useDashboardDocStore();
onMounted(async () => {
    await dashboardDocStore.getInfoDashboard()
});
</script>
<style scoped>
.dashboard {
    max-height: 80vh;
}
</style>