<template>
  <h2 class="text-main font-semibold text-xl">{{ t("user.title.title") }}</h2>
  <div class="flex mt-5">
    <div class="w-8/12 flex">
      <el-input v-model="search" @keyup.enter="searchData" style="width: 30%" size="large" placeholder="Tìm kiếm"
        :prefix-icon="Search" />
    </div>
    <div class="w-4/12 flex justify-end">
      <el-button @click="showDialog = true" type="primary" size="large">
        <i class="ri-add-line text-xl font-bold"></i>
      </el-button>
    </div>
  </div>
  <div class="custom-table mt-10">
    <div class="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 gap-4 h-[calc(100vh-220px)] overflow-auto ]">
      <div v-for="(user, index) in users" :key="index"
        class="hover-border-red lg:w-3/9 min-h-[200px] rounded-md flex flex-col items-center border border-neutral-300 hover:cursor-pointer relative max-h-[220px]">
        <div class="mt-5 relative">
          <el-avatar style="width: 60px; height: 60px" :src="user.imageUrl" />
          <div class="absolute top-0 right-0 h-3 w-3 bg-dot rounded-full"></div>
        </div>
        <p class="font-bold mt-2">{{ user.fullName }}</p>
        <div class="text-zinc-500 text-sm mt-2 flex flex-col items-center">
          <p>{{ user.email }}</p>
          <p>{{ user.phone }}</p>
        </div>
        <div class="absolute right-1 top-1">
          <div class="flex flex-col">
            <div class="relative">
              <el-button @click="handleEdit(user)" class="w-[5px] h-[5px]" size="small" plain :icon="Edit"
                @mouseover="showContentEdit = true" @mouseleave="showContentEdit = false">
              </el-button>
              <p v-if="showContentEdit" class="button-edit w-[80px] text-xs" style="text-align: center">
                Chỉnh sửa
              </p>
            </div>
            <div class="mt-1">
              <el-button @mouseover="showContentPassword = true" @mouseleave="showContentPassword = false"
                class="w-[5px] h-[5px] relative" size="small" plain>
                <i class="ri-lock-line"></i>
              </el-button>
              <span v-if="showContentPassword" class="button-password w-[120px] text-xs" style="text-align: center">Đặt
                lại mật khẩu</span>
            </div>
            <div class="mt-1">
              <el-button class="w-[5px] h-[5px]" size="small" plain :icon="MoreFilled" />
            </div>
            <div class="mt-1">
              <el-tooltip class="box-item" effect="dark" content="Xóa" placement="top">
                <el-button class="w-[5px] h-[5px]" size="small" plain
                  @click="{ idDelete = user.id; showDialogDelete = true; }">
                  <i class="ri-delete-bin-line"></i>
                </el-button>
              </el-tooltip>

            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-5 flex items-center">
      <div class="w-[15%]">
        <p style="color: #5b6178" class="text-sm">
          Tổng số bản ghi: <span style="color: #454a5f">{{ Total }}</span>
        </p>
      </div>
      <div class="w-full flex justify-end">
        <el-pagination v-model:current-page="page" prev-text background layout="prev, pager, next" :total="TotalUser" />
        <el-select class="ml-2" v-model="selectedPage" style="width: 60px">
          <el-option v-model="selectedPage" v-for="item in options" :key="item.value" :label="item.label"
            :value="item.value" />
        </el-select>
        <div class="ml-2 mr-5 flex items-center">
          <span class="text-sm mr-1" style="color: #5b6178">Trang</span>
          <el-input v-model="page" style="width: 30px" />
        </div>
      </div>
    </div>
    <DialogView v-model="showDialog" :itemEdit="idEdit" @close="closeDialog" @loadData="loadData" />
    <ConfirmView v-model="showDialogDelete" @deleteItem="deleteKho" :idDelete="idDelete" @close="closeDialog" />
  </div>
</template>
<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import ConfirmView from "../../../layouts/components/ConfirmView.vue";
import DialogView from "./DialogView.vue";
import { ref, onMounted, watch } from "vue";
import { Search, Edit, MoreFilled } from "@element-plus/icons-vue";
import { userServiceApi } from "../service/user.service";
import { DEFAULT_LIMIT_FOR_PAGINATION, OPTION_SELECTED_PAGE } from "../../../common/contants/contants";
import { useUser } from "../user.form";
import { showErrorNotification, showSuccessNotification } from "../../../common/helper/helpers";
const showContentEdit = ref(false);
const showContentPassword = ref(false);
const { t } = useI18n();

const showDialog = ref(false);

const selectedPage = ref(DEFAULT_LIMIT_FOR_PAGINATION);


const search = ref(null);
const idEdit = ref(null);
const idDelete = ref<any>(null);
const TotalUser = ref(0);
const Total = ref(0);
const { query, getDataUsers, users } = useUser();
const showDialogDelete = ref(false);
const options = OPTION_SELECTED_PAGE;
const page = ref(1);


watch(selectedPage, (newVal: any) => {
  query.limit = newVal;
  query.page = 1;
  page.value = 1;
  loadData();
});
watch(page, (newVal: number) => {
  query.page = newVal;
  loadData();
});

const loadData = async () => {
  query.keyword = search.value ? search.value : undefined;
  const res: any = await getDataUsers();
  if (res.data) {
    users.value = res.data;
    TotalUser.value = Math.ceil(res.totalItems / selectedPage.value) * 10;
    Total.value = res.totalItems;
    return;
  }
  users.value = [];
};

onMounted(async () => {
  query.keyword = undefined;
  query.page = 1;
  query.limit = selectedPage.value;
  await loadData()
})


const searchData = async () => {
  if (search.value == null || search.value === "") {
    search.value = null;
    query.keyword = search.value ? search.value : undefined;
  } else query.keyword = search.value;
  loadData();
};



const deleteKho = async (id: string) => {
  try {
    const res: any = await userServiceApi._delete(id);
    if (res.success) {
      showSuccessNotification(res.message);
      loadData();
      closeDialog();
    } else {
      showErrorNotification(res.message);
    }
  } catch (error: any) {
    showErrorNotification(error.message);
  }
};

const handleEdit = (item: any) => {
  showDialog.value = true;
  idEdit.value = item.id;
};
const closeDialog = () => {
  showDialog.value = false;
  idEdit.value = null;
  showDialogDelete.value = false;
};

</script>

<style scoped>
.hover-border-red:hover {
  border-color: #00f;
}

.hover-border-red {
  background-color: white;
}

.button-edit {
  display: none;
  position: absolute;
  top: -150% !important;
  left: 0;
  z-index: 10;
  color: white;
  background-color: rgb(49, 47, 47);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  padding: 10px;
}

.button-password {
  display: none;
  position: absolute;
  right: 120% !important;
  z-index: 10;
  color: white;
  background-color: rgb(49, 47, 47);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  padding: 10px;
}

.el-button:hover+.button-edit,
.button-edit:hover {
  display: block;
}

.el-button:hover+.button-password,
.button-password:hover {
  display: inline;
}
</style>
