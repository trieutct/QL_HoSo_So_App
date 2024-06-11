<template>
  <div>
    <div class="w-full flex justify-between">
      <el-input clearable style="width: 50%" size="large" placeholder="Tìm kiếm" :prefix-icon="Search" />
      <el-button @click="docStore.setIsShowPopup(true)" type="primary" size="large">
        <i class="ri-add-line text-xl font-bold"></i>
      </el-button>
    </div>
  </div>
  <div class="container">
    <div class="flex mt-2">
      <div class="w-full flex text-3xl justify-between">
        <div>
          {{ nameHoSo }}
        </div>
        <div>
          <el-radio-group v-model="typeTable" style="margin-bottom: 30px">
            <el-tooltip class="box-item" effect="dark" content="Bố cục kiểu danh sách" placement="bottom">
              <el-radio-button value="table" size="large">
                <template #default>
                  <i class="ri-check-line" v-if="typeTable === 'table'"></i>
                  <i class="ri-menu-line"></i>
                </template>
              </el-radio-button>
            </el-tooltip>
            <el-tooltip class="box-item" effect="dark" content="Bố cục kiểu lưới" placement="bottom">
              <el-radio-button value="grid" size="large">
                <template #default>
                  <i class="ri-check-line" v-if="typeTable === 'grid'"></i>
                  <i class="ri-layout-grid-2-fill"></i>
                </template>
              </el-radio-button>
            </el-tooltip>
          </el-radio-group>
        </div>
      </div>
    </div>
    <div v-if="typeTable === 'table'">
      <el-table :data="docsData" style="width: 100%" height="480px">
        <el-table-column prop="docCode" label="Tên file" width="400">
          <template #default="scope">
            <i v-if="
              getFileInfoFromPath(scope.row.urlFile).extension === 'docx' ||
              getFileInfoFromPath(scope.row.urlFile).extension === 'doc'
            " class="ri-article-line text-blue-600 text-xl"></i>
            <i v-if="getFileInfoFromPath(scope.row.urlFile).extension === 'pdf'"
              class="ri-file-pdf-line text-orange-500 text-xl"></i>
            {{ getFileInfoFromPath(scope.row.urlFile).fileName }}
          </template>
        </el-table-column>
        <el-table-column prop="docCode" label="Mã văn bản" width="200" />
        <el-table-column prop="subject" label="Nội dung" width="300" />
        <el-table-column prop="pageAmount" label="Số trang" width="100">
          <template #default="scope">
            {{ scope.row.pageAmount }}
          </template>
        </el-table-column>
        <el-table-column prop="codeNumber" label="Số văn bản" width="100">
          <template #default="scope">
            {{
              scope.row.codeNumber != "undefined" ? scope.row.codeNumber : ""
            }}
          </template>
        </el-table-column>
        <el-table-column prop="codeNotation" label="Ký hiệu" width="100">
          <template #default="scope">
            {{
              scope.row.codeNumber != "undefined" ? scope.row.codeNumber : ""
            }}
          </template>
        </el-table-column>
        <el-table-column prop="issuedDate" label="Năm" width="150">
          <template #default="scope">
            {{
              scope.row.issuedDate != "undefined"
                ? formatDateString(scope.row.issuedDate, "DD/MM/YYYY")
                : ""
            }}
          </template>
        </el-table-column>
        <el-table-column label="" fixed="right">
          <template #default="scope">
            <el-tooltip class="box-item" effect="dark" content="Thao tác" placement="top">
              <el-dropdown trigger="click">
                <el-button type="text">
                  <i class="ri-more-2-line text-lg"></i>
                </el-button>

                <template #dropdown>
                  <el-dropdown-menu class="custom-dropdown">
                    <el-dropdown-item @click="showFile(scope.row.urlFile)"><i class="ri-eye-line"></i>
                      <p class="ml-5">Tải xuống</p>
                    </el-dropdown-item>
                    <el-dropdown-item divided @click="editDoc(scope.row.id)">
                      <el-icon>
                        <Edit />
                      </el-icon>
                      <p class="ml-5">Sửa</p>
                    </el-dropdown-item>
                    <el-dropdown-item @click="
                        {
                      showDialogDelete = true;
                      idDelete = scope.row.id;
                    }
                      ">
                      <el-icon>
                        <Delete />
                      </el-icon>
                      <p class="ml-5">Xóa</p>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-if="typeTable === 'grid'">
      <el-scrollbar height="480px">
        <el-row :gutter="20">
          <el-col :span="6" class="mt-4" v-for="(doc, index) in docsData" :key="index">
            <div class="w-full p-3 h-[200px] rounded-xl" style="background-color: #f0f4f9">
              <div class="flex items-center justify-between">
                <div>
                  <i v-if="
                    getFileInfoFromPath(doc.urlFile).extension === 'docx' ||
                    getFileInfoFromPath(doc.urlFile).extension === 'doc'
                  " class="ri-article-line text-blue-600 text-xl"></i>
                  <i v-if="getFileInfoFromPath(doc.urlFile).extension === 'pdf'"
                    class="ri-file-pdf-line text-orange-500 text-xl"></i>
                </div>
                <div class="w-[70%] truncate">
                  <p class="text-sm">
                    {{ getFileInfoFromPath(doc.urlFile).fileName }}
                  </p>
                </div>
                <div>
                  <el-tooltip class="box-item" effect="dark" content="Thao tác" placement="top">
                    <el-dropdown trigger="click">
                      <el-button type="text">
                        <i class="ri-more-2-line text-lg"></i>
                      </el-button>

                      <template #dropdown>
                        <el-dropdown-menu class="custom-dropdown">
                          <el-dropdown-item @click="showFile(doc.urlFile)"><i class="ri-eye-line"></i>
                            <p class="ml-5">Tải xuống</p>
                          </el-dropdown-item>
                          <el-dropdown-item divided @click="editDoc(doc.id)">
                            <el-icon>
                              <Edit />
                            </el-icon>
                            <p class="ml-5">Sửa</p>
                          </el-dropdown-item>
                          <el-dropdown-item @click="
                            {
                            showDialogDelete = true;
                            idDelete = doc.id;
                          }
                            ">
                            <el-icon>
                              <Delete />
                            </el-icon>
                            <p class="ml-5">Xóa</p>
                          </el-dropdown-item>
                        </el-dropdown-menu>
                      </template>
                    </el-dropdown>
                  </el-tooltip>
                </div>
              </div>
              <div class="flex justify-center mt-2 borde">
                <img :src="getFileInfoFromPath(doc.urlFile).extension === 'pdf'
                  ? PDFIMAGE
                  : WORDIMAGE
                  " alt="" class="rounded-lg mb-1" :class="getFileInfoFromPath(doc.urlFile).extension === 'pdf'
                    ? 'max-h-[140px] min-w-[200px]'
                    : 'max-h-[140px]'
                    " />
              </div>
            </div>
          </el-col>
        </el-row>
      </el-scrollbar>
    </div>
  </div>
  <DocPopup />
  <ConfirmView v-model="showDialogDelete" @deleteItem="deleteVanBan" :idDelete="idDelete"
    @close="showDialogDelete = false" />
</template>

<script lang="ts" setup>
import WORDIMAGE from "../../../assets/word.jpg";
import PDFIMAGE from "../../../assets/pdf.png";
import DocPopup from "../components/DocPopup.vue";
import { useDocStore } from "../store/doc.store";
import { Search, Edit, Delete } from "@element-plus/icons-vue";
import ConfirmView from "../../../layouts/components/ConfirmView.vue";
import { getFileInfoFromPath } from "../helper";
import { useRoute } from "vue-router";
import { ref, onBeforeMount } from "vue";
import { hosoServiceApi } from "../../HoSo/service/hoso.service";
import { computed } from "vue";
import {
  formatDateString,
  showErrorNotification,
  showSuccessNotification,
} from "../../../common/helper/helpers";
import { docServiceApi } from "../service/doc.service";
import { UseDocForm } from "../doc.form";
import { reactive } from "vue";
const route = useRoute();
const typeTable = ref("table");
const docStore = useDocStore();
const showDialogDelete = ref(false);
const idDelete = ref("");
const docForm = reactive(UseDocForm());
const nameHoSo = ref<string>("");
onBeforeMount(async () => {
  docStore.setHosoId(route.params.id as string);
  await getFileCodeHoSo();
  await docStore.fetchData(docStore.fileCode as string);
});
async function getFileCodeHoSo() {
  const res: any = await hosoServiceApi._getDetail(docStore.hosoId as string);
  if (res.success) {
    nameHoSo.value = res.data.title;
    docStore.setFileCode(res.data.fileCode);
  }
}
const docsData = computed(() => docStore.listDocs);
function showFile(url: string) {
  window.open(url, "_blank");
}
async function deleteVanBan(id: string) {
  const res: any = await docServiceApi._delete(id);
  if (res.success) {
    docStore.fetchData(docStore.fileCode as string);
    showSuccessNotification(res.message);
    showDialogDelete.value = false;
  } else {
    showErrorNotification(res.message);
  }
}
async function editDoc(id: string) {
  docStore.setSelectedDocId(id as string);
  docStore.setIsShowPopup(true);
}
</script>
<style scoped>
:deep(.el-input__wrapper) {
  background: white;
  height: 50px;
  border-radius: 50px;
}

:deep(.is-focus) {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0);
}

.container {
  background: white;
  margin-top: 10px;
  height: 85vh;
  padding: 15px;
  border-radius: 10px;
}

.custom-dropdown {
  width: 200px;
}

.custom-dropdown .el-dropdown-menu {
  width: 300px;
}
</style>
