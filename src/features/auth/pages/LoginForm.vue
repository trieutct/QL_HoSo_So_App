<template>
  <div class="w-full flex h-screen">
    <div class="w-2/5 flex items-center justify-center">
      <div class="w-3/4">
        <h2 class="font-bold text-3xl text-center">Đăng nhập</h2>
        <form @submit.prevent="loginform.handleLogin" @keyup.enter="loginform.handleLogin">
          <div class="rounded-sm mt-8">
            <el-input class="mt-5" v-model="loginform.email" size="large" placeholder="Nhập email"
              :prefix-icon="Message" />
            <span class="text-red-400 text-xs" v-show="loginform.emailError">{{
              loginform.emailError
            }}</span>
            <el-input class="mt-8" v-model="loginform.password" size="large" type="password" placeholder="Nhập password"
              show-password :prefix-icon="WarningFilled" />
            <span class="text-red-400 text-xs" v-show="loginform.passwordError">{{ loginform.passwordError }}</span>
            <el-button @click="loginform.handleLogin" @keyup.enter="loginform.handleLogin" style="
                color: white;
                box-shadow: none;
                background-color: #4764c3;
                font-weight: bold;
              " size="large" class="w-full mt-10">Đăng nhập</el-button>
            <div class="flex items-center justify-between">
              <GoogleLogin class="w-100 mt-5" :callback="callback">
              </GoogleLogin>
              <span class="text-main font-bold mt-5 mr-10">
                Đăng ký</span>
            </div>
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
import { ref, reactive } from "vue";
import { Message, WarningFilled } from "@element-plus/icons-vue";
import { userLoginForm } from "../forms/loginforms";
import { decodeCredential } from 'vue3-google-login'
import { authServiceApi } from "../services/auth.service";
import router from "../../../plugins/vue-router";
import { showSuccessNotification } from "../../../common/helper/helpers";
import localStorageAuthService from "../../../common/storages/authStorage";
import { PageName, Role } from "../../../common/contants/contants";
import { AuthStore } from "../store/auth.store";
const loginform = reactive(userLoginForm());
const authStore = AuthStore();

const callback = async (response) => {
  const userData = decodeCredential(response.credential)
  await loginGoogle(userData.email)
}
async function loginGoogle(email) {
  const res = await authStore.loginGoogle(email);
  if (res) {
    showSuccessNotification("Đăng nhập thành công");
    if (localStorageAuthService.getLoginUser().role === Role.SYSADMIN)
      router.push({ name: PageName.DASHBOARD_PAGE });
    if (localStorageAuthService.getLoginUser().role === Role.THUKHO)
      router.push({ name: PageName.KHO_PAGE });
    if (localStorageAuthService.getLoginUser().role === Role.NHANVIEN)
      router.push({ name: PageName.TRACUU_PAGE });
  }
}
</script>
<style scoped>
.right {
  background-image: url("../../../assets/imgae_login.png");
}
</style>
