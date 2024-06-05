<template>
    <el-card class="box-card">
        <p class="text-base font-bold">Danh sách hồ sơ hết hạn</p>
        <el-table class="mt-4" :height="'calc(220px)'" :data="expricedHoSo" border width="100%">
            <el-table-column fixed type="selection" width="55" />
            <el-table-column prop="fileCode" label="Mã hồ sơ" width="100" />
            <el-table-column prop="title" label="Tiêu đề" width="300">
                <template #default="scope">
                    <router-link :to="{ name: PageName.DOC_PAGE, params: { id: scope.row.id } }">
                        <p>
                            {{ scope.row.title }}
                        </p>
                    </router-link>
                </template>
            </el-table-column>
            <el-table-column prop="keyword" label="Từ khóa" width="200" />
            <el-table-column prop="fileCatalog" label="Mục lục số" width="150" />
            <el-table-column prop="fileNotation" label="Số và ký hiệu hồ sơ" width="180" />
            <el-table-column prop="maintenance" label="Số lượng tờ" width="150" />
            <el-table-column prop="pageNumber" label="Số lượng trang" width="150" />
            <el-table-column prop="totalDoc" label="Tổng số văn bản" width="150" />
            <el-table-column prop="language" label="Ngôn ngữ" width="150" />
            <el-table-column prop="startDate" label="Thời gian bắt đầu" width="200">
                <template #default="scope">
                    <span>{{ formatDateString(scope.row.startDate, "DD/MM/YYYY") }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="endDate" label="Thời gian kết thúc" width="200">
                <template #default="scope">
                    <span>{{ formatDateString(scope.row.endDate, "DD/MM/YYYY") }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="description" label="Mô tả" width="400" />
            <el-table-column fixed="right" label="Hành Động" align="center" width="120">
                <template #default="scope">
                    <el-button type="danger" :icon="Delete" circle />
                </template>
            </el-table-column>
        </el-table>
    </el-card>
</template>
<script lang="ts" setup>
import { Delete } from "@element-plus/icons-vue";
import { PageName } from '../../../common/contants/contants';
import { formatDateString } from '../../../common/helper/helpers';
import { useDashboardDocStore } from "../store/dashboard.store"
import { computed } from 'vue'
const dashboardDocStore = useDashboardDocStore();
const expricedHoSo = computed(() => dashboardDocStore.expricedHoSo);

</script>
<style scoped>
.text-base {
    color: #737992;
}
</style>