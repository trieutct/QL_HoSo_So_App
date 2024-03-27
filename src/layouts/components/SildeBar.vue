<template>
    <el-menu class="w-[380px] min-h-screen font-semibold relative" background-color="#4764c3"
        menu-active-background-color="white" active-text-color="#ffd04c" text-color="rgb(250 250 250)"
        :collapse="isCollapse" @open="handleOpen" @close="handleClose">
        <el-button type="primary" style="background-color: #4764c3!important;border-color: rgb(255 255 255);"
          :icon="CaretRight" @click="isCollapse = !isCollapse" circle
          :class="!isCollapse ? 'absolute right-[-18px] top-4 rotate-180' : 'absolute right-[-18px] top-2'" />
        <img class="w-[80%] m-4" src="https://hoctest.hrm.sorameet.xyz/assets/sidebar-logo-0f38fc94.svg" alt="">
        <div class="overflow-y-auto h-[calc(100vh-20%)] scrollbar-none">
          <el-sub-menu index="1">
            <template #title>
              <el-icon>
                <!-- <i class="fa-solid fa-users"></i> -->
                <i class="ri-team-line"></i>
              </el-icon>
              <span class="font-light ml-2" v-if="!isCollapse">Quản trị nhân sự</span>
            </template>
            <div class="flex justify-around">
              <div v-if="!isCollapse" class="w-[3px] bg-white ml-6 rounded-s-md"></div>
              <div :class="!isCollapse ? 'w-[80%] mr-2' : 'w-full'">
                <el-menu-item :class="!isCollapse ? 'rounded-md font-normal' : 'rounded-none font-normal'"
                  style="height: 40px;" index="1-4-1">Người dùng</el-menu-item>
                <el-menu-item :class="!isCollapse ? 'rounded-md font-normal' : 'rounded-none font-normal'"
                  style="height: 40px;" index="1-4-2">Hợp đồng</el-menu-item>
                <el-menu-item :class="!isCollapse ? 'rounded-md font-normal' : 'rounded-none font-normal'"
                  style="height: 40px;" index="1-4-3">Lịch làm việc</el-menu-item>
                <el-menu-item :class="!isCollapse ? 'rounded-md font-normal' : 'rounded-none font-normal'"
                  style="height: 40px;" index="1-4-4">Thủ tục gia nhập</el-menu-item>
              </div>
            </div>
          </el-sub-menu>
  
  
          <el-sub-menu index="2">
            <template #title>
              <el-icon>
                <i class="fa-regular fa-calendar"></i>
              </el-icon>
              <span class="font-light ml-2" v-if="!isCollapse">Quản trị chấm công</span>
            </template>
            <div class="flex justify-around">
              <div v-if="!isCollapse" class="w-[3px] bg-white ml-6 rounded-s-md"></div>
              <div :class="!isCollapse ? 'w-[80%] mr-2' : 'w-full'">
                <el-menu-item :class="!isCollapse ? 'rounded-md font-normal' : 'rounded-none font-normal'"
                  style="height: 40px;" index="2-4-1">Chấm công</el-menu-item>
                <el-menu-item :class="!isCollapse ? 'rounded-md font-normal' : 'rounded-none font-normal'"
                  style="height: 40px;" index="2-4-2">Nghỉ phép</el-menu-item>
                <el-menu-item :class="!isCollapse ? 'rounded-md font-normal' : 'rounded-none font-normal'"
                  style="height: 40px;" index="2-4-3">Làm thêm</el-menu-item>
              </div>
            </div>
          </el-sub-menu>
  
          <el-sub-menu index="3">
            <template #title>
              <el-icon>
                <i class="fa-regular fa-calendar"></i>
              </el-icon>
              <span class="font-light ml-2" v-if="!isCollapse">Quản trị chấm công</span>
            </template>
            <div class="flex justify-around">
              <div v-if="!isCollapse" class="w-[3px] bg-white ml-6 rounded-s-md"></div>
              <div :class="!isCollapse ? 'w-[80%] mr-2' : 'w-full'">
                <el-menu-item :class="!isCollapse ? 'rounded-md font-normal' : 'rounded-none font-normal'"
                  style="height: 40px;" index="3-4-1">Chấm công</el-menu-item>
                <el-menu-item :class="!isCollapse ? 'rounded-md font-normal' : 'rounded-none font-normal'"
                  style="height: 40px;" index="3-4-2">Nghỉ phép</el-menu-item>
                <el-menu-item :class="!isCollapse ? 'rounded-md font-normal' : 'rounded-none font-normal'"
                  style="height: 40px;" index="3-4-3">Làm thêm</el-menu-item>
              </div>
            </div>
          </el-sub-menu>
  
          <el-sub-menu index="4">
            <template #title>
              <el-icon>
                <i class="fa-regular fa-calendar"></i>
              </el-icon>
              <span class="font-light ml-2" v-if="!isCollapse">Quản trị chấm công</span>
            </template>
            <div class="flex justify-around">
              <div v-if="!isCollapse" class="w-[3px] bg-white ml-6 rounded-s-md"></div>
              <div :class="!isCollapse ? 'w-[80%] mr-2' : 'w-full'">
                <el-menu-item :class="!isCollapse ? 'rounded-md font-normal' : 'rounded-none font-normal'"
                  style="height: 40px;" index="4-4-1">Chấm công</el-menu-item>
                <el-menu-item :class="!isCollapse ? 'rounded-md font-normal' : 'rounded-none font-normal'"
                  style="height: 40px;" index="4-4-2">Nghỉ phép</el-menu-item>
                <el-menu-item :class="!isCollapse ? 'rounded-md font-normal' : 'rounded-none font-normal'"
                  style="height: 40px;" index="4-4-3">Làm thêm</el-menu-item>
              </div>
            </div>
          </el-sub-menu>
          <div class="w-full bottom-0 h-[100px] absolute flex justify-around"
            style="background-color: rgb(83, 109, 193,1)">
            <div class="flex justify-center items-center">
              <div>
                <img @click="showMenuUser=!showMenuUser" class="rounded-full cursor-pointer" width="60" height="60"
                  src="https://scontent.fhan20-1.fna.fbcdn.net/v/t39.30808-6/431664450_3808572406136738_6223671059774018184_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeE_s3Zh2XObFqrX6brYlze6UEMgYMG-AotQQyBgwb4Ci6iUVuIV-fchB-nK2jPPdzW5l3R6463bFZyOlfI2f0bF&_nc_ohc=1bIOnNjGKEYAX_vtFvA&_nc_ht=scontent.fhan20-1.fna&oh=00_AfDoUTWekgrMwKY1Pv93pVagoIk9-5CGL259HNkov96y9g&oe=65FDA710"
                  alt="">
              </div>
              <div v-if="!isCollapse" class="ml-2 text-white">
                <p class="text-sm font-normal">trinhcongtrieu2972002@gmail.com</p>
                <p class="text-sm font-normal">Trịnh Công Triệu</p>
              </div>
            </div>
            <div class="relative flex justify-center items-center">
              <div v-if="!isCollapse">
                <i class="ri-more-2-line text-lg text-white cursor-pointer " @click="showMenuUser=!showMenuUser"></i>
              </div>
              <div v-if="showMenuUser" class="w-48 duration-700 shadow-xl absolute right-[-200px] bottom-1 text-white font-normal text-sm z-20" style="background-color: #4764c3;">
                  <a href="#" class="block hover:bg-blue-hover px-4 py-2"><i class="ri-user-line mr-2"></i>Hồ sơ của tôi</a>
                  <a href="#" class="block hover:bg-blue-hover px-4 py-2"><i class="fa-solid fa-key mr-2"></i>Đổi mật khẩu</a>
                  <a href="#" class="block hover:bg-blue-hover px-4 py-2"><i class="fa-solid fa-arrow-right-from-bracket mr-2"></i>Đăng xuất</a>
              </div>
            </div>
          </div>
        </div>
      </el-menu>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import {
  CaretRight
} from '@element-plus/icons-vue'
const isCollapse = ref(true)
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}


const showMenuUser=ref(false)
</script>