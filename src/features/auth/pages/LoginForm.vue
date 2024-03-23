<template>
    <div class="w-full flex h-screen">
        <div class="w-2/5 flex items-center justify-center ">
            <div class="w-3/4">
                <h2 class="font-bold text-3xl text-center">Đăng nhập</h2>
                <form @submit.prevent="loginform.handleLogin" @keyup.enter="loginform.handleLogin">
                    <div class="rounded-sm mt-8">
                    <el-input
                    class="mt-5"
                    v-model="loginform.email"
                    size="large"
                    placeholder="Nhập email"
                    :prefix-icon="Message"
                    />
                    <span class="text-red-400 text-xs" v-show="loginform.emailError">{{ loginform.emailError }}</span>
                    <el-input
                        class="mt-8"
                        v-model="loginform.password"
                        size="large"
                        type="password"
                        placeholder="Nhập password"
                        show-password
                        :prefix-icon="WarningFilled"
                    />
                    <span class="text-red-400 text-xs" v-show="loginform.passwordError">{{ loginform.passwordError }}</span>
                    <el-button @click="loginform.handleLogin" @keyup.enter="loginform.handleLogin" style="color: white;box-shadow: none;background-color: #4764c3;font-weight: bold;" size="large" class="w-full mt-14">Đăng nhập</el-button>
                    <p class="text-center mt-5">Bạn chưa có tài khoản?<span class="text-main font-bold"> Đăng ký</span></p>
                </div>
                </form>
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
<script setup>
import { ref,reactive } from 'vue';
import { Message,WarningFilled } from '@element-plus/icons-vue'
import {userLoginForm} from '../forms/loginforms'
const loginform = reactive(userLoginForm());
</script>
<style scoped>
.right {
    background-image: url('../../../assets/imgae_login.png');
}
</style>