<template>
    <el-card class="box-card">
        <p class="text-base font-bold">Tổng số hồ sơ hết hạn</p>
        <div class="w-100 flex justify-end">
            <img :src="icon" alt="">
        </div>
        <p class="text-4xl font-bold mt-[-30px]">79</p>
    </el-card>
</template>
<script lang="ts" setup>
import icon from "../../../assets/Icon.svg"
</script>
<style scoped>
.el-card {
    border-radius: 20px;
}

.text-base {
    color: #737992;
}
</style>