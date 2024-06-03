<template>
  <el-menu class="w-[380px] min-h-screen font-semibold relative" background-color="#4764c3"
    menu-active-background-color="white" active-text-color="#ffd04c" text-color="rgb(250 250 250)"
    :collapse="isCollapse">
    <el-button type="primary" style="
        background-color: #4764c3 !important;
        border-color: rgb(255 255 255);
      " :icon="CaretRight" @click="isCollapse = !isCollapse" circle :class="!isCollapse
        ? 'absolute right-[-18px] top-4 rotate-180'
        : 'absolute right-[-18px] top-2'
        " />
    <!-- <img class="w-[80%] m-4" src="https://tokyotechlab.ttloffice.com/assets/sidebar-logo-0f38fc94.svg" alt=""> -->
    <div class="w-[80%] m-4 text-white text-3xl flex justify-center" style="font-family: cursive">
      QLHSLT
    </div>
    <div class="overflow-y-auto h-[calc(100vh-20%)] scrollbar-none">
      <el-menu-item index="1" @click="routerURL('/admin/dashboard')">
        <el-icon>
          <i class="ri-dashboard-fill "></i>
        </el-icon>
        <span class="font-light ml-2">Thống kê</span>
      </el-menu-item>
      <el-sub-menu v-for="(item, index) in modules" :key="index" :index="index + 1">
        <template #title>
          <el-icon>
            <i :class="item.icon"></i>
          </el-icon>
          <span class="font-light ml-2" v-if="!isCollapse">{{
            item.name
          }}</span>
        </template>
        <div class="flex justify-around">
          <div v-if="!isCollapse" class="w-[3px] bg-white ml-6 rounded-s-md"></div>
          <div :class="!isCollapse ? 'w-[80%] mr-2' : 'w-full'">
            <el-menu-item v-for="i in item.operations" :key="i.id" @click="routerURL(i.url)" :class="!isCollapse
              ? 'rounded-md font-normal'
              : 'rounded-none font-normal'
              " style="height: 40px" :index="'1-4-1-' + i.id">{{ i.name }}</el-menu-item>
          </div>
        </div>
      </el-sub-menu>
      <div class="w-full bottom-0 h-[100px] absolute flex justify-around"
        style="background-color: rgb(83, 109, 193, 1)">
        <div class="flex justify-center items-center">
          <div>
            <img @click="showMenuUser = !showMenuUser" class="rounded-full cursor-pointer" width="60" height="60"
              :src="localStorageAuthService.getLoginUser().avatar" alt="" />
          </div>
          <div v-if="!isCollapse" class="ml-2 text-white">
            <p class="text-sm font-normal">
              {{ localStorageAuthService.getLoginUser().email }}
            </p>
            <p class="text-sm font-normal">
              {{ localStorageAuthService.getLoginUser().name }}
            </p>
          </div>
        </div>
        <div class="relative flex justify-center items-center">
          <div v-if="!isCollapse">
            <i class="ri-more-2-line text-lg text-white cursor-pointer" @click="showMenuUser = !showMenuUser"></i>
          </div>
          <div v-if="showMenuUser"
            class="w-48 duration-700 shadow-xl absolute right-[-200px] bottom-1 text-white font-normal text-sm z-20"
            style="background-color: #4764c3">
            <p class="block hover:bg-blue-hover px-4 py-2 cursor-pointer">
              <i class="ri-user-line mr-2"></i>Hồ sơ của tôi
            </p>
            <p class="block hover:bg-blue-hover px-4 py-2 cursor-pointer">
              <i class="fa-solid fa-key mr-2"></i>Đổi mật khẩu
            </p>
            <!-- <a class="block hover:bg-blue-hover px-4 py-2"><i class="ri-global-line  mr-2"></i>Ngôn ngữ</a> -->
            <el-dropdown :hide-on-click="false">
              <span class="px-4 py-2 text-white">
                <i class="ri-global-line mr-2"></i>Ngôn ngữ
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item v-for="item in Languages" @click="onChangeLanguage(item.value)" :key="item"
                    class="px-4 py-2"><img width="25" height="25" :src="item.img" />
                    <p class="ml-2">{{ item.name }}</p>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
            <p class="block hover:bg-blue-hover px-4 py-2 cursor-pointer" @click="logOut">
              <i class="fa-solid fa-arrow-right-from-bracket mr-2"></i>Đăng xuất
            </p>
          </div>
        </div>
      </div>
    </div>
  </el-menu>
</template>
<script setup>
import { PageName, SupportLanguage } from "../../common/contants/contants";
import { ref, onMounted, computed } from "vue";
import { CaretRight } from "@element-plus/icons-vue";
import { moduleServiceApi } from "../../features/module/service/module.service";
import router from "../../plugins/vue-router";
import localStorageAuthService from "../../common/storages/authStorage";
const routerURL = (name) => {
  router.push({ path: name });
};
const showMenuUser = ref(false);
const isCollapse = ref(false);

const modules = ref([]);
const getmodules = async () => {
  const res = await moduleServiceApi.getMouduleByToken();
  if (res.success) modules.value = res.data;
};
onMounted(async () => {
  getmodules();
});

import { useI18n } from "vue-i18n";

const { t, locale } = useI18n({ useScope: "global" });

const onChangeLanguage = (language) => {
  localStorageAuthService.setLanguage(language);
  locale.value = language;
};
const Languages = computed(() => {
  return [
    {
      name: t("app.header.languages.en"),
      img: "https://tse4.mm.bing.net/th?id=OIP.bsAUet3tu20BMiLW93wTqQHaE3&pid=Api&P=0&h=220",
      value: SupportLanguage.EN,
    },
    {
      name: t("app.header.languages.vi"),
      img: "https://tse1.explicit.bing.net/th?id=OIP.dR1wHZnKnzai7BDYhts1uwHaFj&pid=Api&P=0&h=220ss",
      value: SupportLanguage.VI,
    },
  ];
});

function logOut() {
  localStorageAuthService.removeAll();
  router.push({ name: PageName.LOGIN_PAGE });
}
</script>
