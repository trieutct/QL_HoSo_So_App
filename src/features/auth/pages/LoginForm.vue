<template>
    <div class="w-full flex h-screen">
        <div class="w-2/5 flex items-center justify-center ">
            <div class="w-3/4">
                <h2 class="font-bold text-3xl text-center">Đăng nhập</h2>
                <div class="rounded-sm mt-8">
                    <el-input
                    class="mt-5"
                    v-model="input"
                    size="large"
                    placeholder="Nhập email"
                    :prefix-icon="Message"
                    />
                    <el-input
                        class="mt-8"
                        v-model="input"
                        size="large"
                        type="password"
                        placeholder="Nhập password"
                        show-password
                        :prefix-icon="WarningFilled"
                    />
                    <el-button  style="color: rgba(0, 0, 0, 0.26);box-shadow: none;background-color: rgba(0, 0, 0, 0.12);" size="large" class="w-full mt-14">Đăng nhập</el-button>
                    <p class="text-center mt-5">Bạn chưa có tài khoản?<span class="text-main font-bold"> Đăng ký</span></p>
                </div>
            </div>
        </div>
        <div class="w-3/5 sm:block right">
            <div class="text-white font-bold text-5xl flex flex-col items-center justify-center h-full">
                <p class="mb-9">Chuyển đổi số</p>
                <p>Quản lý kho hồ sơ số</p>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { Message,WarningFilled } from '@element-plus/icons-vue'
const input=ref('')
</script>
<style scoped>
.right {
    background-image: url('../../../assets/imgae_login.png');
}
</style>