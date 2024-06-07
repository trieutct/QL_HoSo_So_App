<template>
  <h2 class="text-main font-semibold text-xl">Tra cứu hồ sơ</h2>
  <div class="flex mt-5">
    <div class="w-8/12 flex">
      <el-input v-model="search" @keyup.enter="searchData" clearable style="width: 30%" size="large"
        placeholder="Tìm kiếm" :prefix-icon="Search" />
    </div>
    <div class="w-4/12 flex justify-end"></div>
  </div>
  <div class="custom-table mt-8">
    <el-table :height="'calc(100vh - 220px)'" :data="hosos" border width="100%">
      <el-table-column type="index" align="center" label="STT" width="100" />
      <el-table-column prop="fileCode" label="Mã hồ sơ" width="100" />
      <el-table-column prop="title" label="Tiêu đề" width="300">
        <template #default="scope">
          <router-link :to="{ name: PageName.DOC_PAGE, params: { id: scope.row.id } }">
            <p>
              {{ scope.row.title }}
            </p>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column prop="nameLoaiHoSo" label="Loại hồ sơ" width="300" />
      <el-table-column prop="keyword" label="Từ khóa" width="200" />
      <el-table-column prop="fileCatalog" label="Mục lục số" width="150" />
      <el-table-column prop="fileNotation" label="Số và ký hiệu hồ sơ" width="180" />
      <el-table-column prop="maintenance" label="Số lượng tờ" width="150" />
      <el-table-column prop="pageNumber" label="Số lượng trang" width="150" />
      <el-table-column prop="totalDoc" label="Tổng số văn bản" width="150" />
      <el-table-column prop="language" label="Ngôn ngữ" width="150" />
      <el-table-column prop="startDate" label="Thời gian bắt đầu" width="200">
        <template #default="scope">
          <span>{{ formatDateString(scope.row.startDate, "DD/MM/YYYY") }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="endDate" label="Thời gian kết thúc" width="200">
        <template #default="scope">
          <span>{{ formatDateString(scope.row.endDate, "DD/MM/YYYY") }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="description" label="Mô tả" width="400" />
    </el-table>
    <div class="mt-5 flex items-center">
      <div class="w-[15%]">
        <p style="color: #5b6178" class="text-sm">
          Tổng số bản ghi: <span style="color: #454a5f">{{ Total }}</span>
        </p>
      </div>
      <div class="w-full flex justify-end">
        <el-pagination v-model:current-page="page" prev-text background layout="prev, pager, next" :total="TotalKho" />
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
    <ConfirmView v-model="showDialogDelete" @deleteItem="deleteDay" :idDelete="idDelete" @close="closeDialog" />
  </div>
</template>
<script lang="ts" setup>
import DialogView from "./DialogView.vue";
import ConfirmView from "../../../layouts/components/ConfirmView.vue";
import { ref, onMounted, watch } from "vue";
import { formatDateString } from "../../../common/helper/helpers";
import { Search } from "@element-plus/icons-vue";
import {
  DEFAULT_LIMIT_FOR_PAGINATION,
  OPTION_SELECTED_PAGE,
  PageName,
} from "../../../common/contants/contants";
import { useHoso } from "../hoso";
import { useLoadingTableStore } from "../../loading/store/loading_table";
import { hosoServiceApi } from "../service/hoso.service";
import {
  showErrorNotification,
  showSuccessNotification,
} from "../../../common/helper/helpers";

const idEdit = ref(null);
const idDelete = ref(null);
const loading = useLoadingTableStore();

const { query, getDataHosos, hosos } = useHoso();
const showDialog = ref(false);
const showDialogDelete = ref(false);
const options = OPTION_SELECTED_PAGE;
const page = ref(1);
const TotalKho = ref(0);
const Total = ref(0);
const selectedPage = ref(DEFAULT_LIMIT_FOR_PAGINATION);
const search = ref(null);

onMounted(async () => {
  query.keyword = undefined;
  query.page = 1;
  query.limit = selectedPage.value;
  loadData();
});
watch(selectedPage, (newVal: any) => {
  query.limit = newVal;
  query.page = 1;
  page.value = 1;
  loadData();
});
watch(page, (newVal: any) => {
  query.page = newVal;
  loadData();
});
const loadData = async () => {
  query.keyword = search.value ? search.value : undefined;
  const res = await getDataHosos();
  if (res?.data) {
    hosos.value = res?.data;
    TotalKho.value = Math.ceil(res?.totalItems / selectedPage.value) * 10;
    Total.value = res?.totalItems;
    return;
  }
  hosos.value = [];
};

const searchData = async () => {
  if (search.value == null || search.value === "") {
    search.value = null;
    query.keyword = search.value ? search.value : undefined;
  } else query.keyword = search.value;
  loadData();
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
