<template>
    <h2 class="text-main font-semibold text-xl">Quản lý dãy</h2>
    <div class="flex mt-5">
        <div class="w-8/12 flex">
            <el-input clearable style="width: 30%" size="large" placeholder="Tìm kiếm" :prefix-icon="Search" />
        </div>
        <div class="w-4/12 flex justify-end">
            <el-button @click="docStore.setIsShowPopup(true)" type="primary" size="large">
                <i class="ri-add-line text-xl font-bold"></i>
            </el-button>
        </div>
    </div>
    <div class="custom-table mt-8">
        <!-- <el-table ref="multipleTableRef" @selection-change="handleSelectionChange" v-loading="loading.isLoading" :height="'calc(100vh - 220px)'" :data="days" border width="100%"> -->
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="date" label="Date" width="180" />
            <el-table-column prop="name" label="Name" width="180" />
            <el-table-column prop="address" label="Address" />
        </el-table>
    </div>
    <DocPopup />
</template>

<script lang="ts" setup>
import DocPopup from "../components/DocPopup.vue";
import { Search } from "@element-plus/icons-vue";
import { useDocStore } from "../store/doc.store";
const docStore = useDocStore();
const tableData = [
    {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
]
</script>