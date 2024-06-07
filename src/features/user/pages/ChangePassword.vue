<template>
    <div class="max-w-md mx-auto mt-8">
        <el-card class="change-password-card">
            <div class="change-password-header">
                <h2 class="text-xl font-semibold text-center">Đổi mật khẩu</h2>
            </div>
            <el-form label-width="0" @submit.prevent="form.submit">
                <el-form-item prop="oldPassword">
                    <el-input type="password" v-model="form.oldpassword" size="large" auto-complete="off" clearable
                        placeholder="Mật khẩu cũ" class="password-input"></el-input>
                    <span class="text-red-500 ml-2">{{ form.oldPasswordError }}</span>
                </el-form-item>
                <el-form-item prop="newPassword">
                    <el-input type="password" v-model="form.newpassword" size="large" auto-complete="off" clearable
                        placeholder="Mật khẩu mới" class="password-input"></el-input>
                    <span class="text-red-500 ml-2">{{ form.newPasswordError }}</span>
                </el-form-item>
                <el-form-item prop="confirmPassword">
                    <el-input type="password" v-model="form.cfpassword" size="large" auto-complete="off" clearable
                        placeholder="Nhập lại mật khẩu mới" class="password-input"></el-input>
                    <span class="text-red-500 ml-2">{{ form.cfpasswordError }}</span>
                </el-form-item>
                <el-form-item class="submit-button">
                    <el-button type="primary" size="large" native-type="submit" class="w-full">Đổi mật khẩu</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { useUser } from "../user.form"
import { reactive } from 'vue'
const form = reactive(useUser())
</script>

<style scoped>
.change-password-card {
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.change-password-header {
    padding: 16px;
    border-bottom: 1px solid #e4e7eb;
}

.password-input {
    border-radius: 5px;
}

.submit-button {
    margin-top: 20px;
}

.el-button {
    border-radius: 5px;
}
</style>