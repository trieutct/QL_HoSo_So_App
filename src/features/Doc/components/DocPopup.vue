<template>
    <el-dialog v-model="isShowPopup" title="Thêm văn bản" align-center>
        <el-row :gutter="20">
            <el-col :span="12">
                <p>
                    Mã văn bản
                    <span class="text-red-500">*</span>
                </p>
                <el-input size="large" style="width: 100%" placeholder="Nhập mã văn bản" />
            </el-col>
            <el-col :span="12">
                <p>
                    Nội dung văn bản
                    <span class="text-red-500">*</span>
                </p>
                <el-input size="large" style="width: 100%" placeholder="Nhập nội dung văn bản" />
            </el-col>
            <el-col class="mt-4" :span="12">
                <p>
                    Loại hồ sơ
                    <span class="text-red-500">*</span>
                </p>
                <el-input size="large" style="width: 100%" placeholder="Nhập tên hộp" />
            </el-col>
            <el-col class="mt-4" :span="12">
                <p>
                    Loại văn bản
                    <span class="text-red-500">*</span>
                </p>
                <!-- <el-autocomplete v-model="MaHop" :fetch-suggestions="queryHop" size="large" clearable
                    class="inline-input w-full" placeholder="Chọn hộp hồ sơ" @select="handleSelect" /> -->
            </el-col>
            <el-col class="mt-4" :span="12">
                <p>
                    Tên cơ quan, tổ chức bán hành văn bản
                    <span class="text-red-500">*</span>
                </p>
                <el-input size="large" style="width: 100%" placeholder="Nhập tên cơ quan, tổ chức bán hành văn bản" />
            </el-col>
            <el-col class="mt-4" :span="12">
                <p>
                    Từ khóa
                    <!-- <span class="text-red-500">*</span> -->
                </p>
                <el-input size="large" style="width: 100%" placeholder="Nhập từ khóa" />
            </el-col>
            <el-col class="mt-4" :span="24">
                <p>
                    Ghi chú
                    <span class="text-red-500">*</span>
                </p>
                <el-input size="large" :rows="4" type="textarea" style="width: 100%" placeholder="Nhập ghi chú" />
            </el-col>
        </el-row>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="docStore.setIsShowPopup(false)">Hủy</el-button>
                <el-button type="primary">
                    Xác nhận
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useDocStore } from "../store/doc.store";
const docStore = useDocStore();
const isShowPopup = computed(() => docStore.isShowPopup)
</script>