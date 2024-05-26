<template>
  <el-dialog
    @close="closeDialog"
    width="850"
    v-model="isShowPopup"
    :title="docStore.selectedDocId ? 'Cập nhật văn bản' : 'Thêm văn bản'"
    align-center
  >
    <el-scrollbar :height="calculatedHeight">
      <el-row :gutter="20">
        <el-col :span="12">
          <p>
            Mã văn bản
            <span class="text-red-500">*</span>
          </p>
          <el-input
            :disabled="docStore.selectedDocId"
            v-model="docForm.docCode"
            size="large"
            style="width: 100%"
            placeholder="Nhập mã văn bản"
          />
          <span class="text-red-500">{{ docForm.errors.docCode }}</span>
        </el-col>
        <el-col :span="12">
          <p>
            Nội dung văn bản
            <span class="text-red-500">*</span>
          </p>
          <el-input
            size="large"
            v-model="docForm.subject"
            style="width: 100%"
            placeholder="Nhập nội dung văn bản"
          />
          <span class="text-red-500">{{ docForm.subjectErro }}</span>
        </el-col>

        <el-col class="mt-4" :span="12">
          <p>
            Hồ sơ
            <span class="text-red-500">*</span>
          </p>
          <el-input
            v-model="nameHoSo"
            readonly
            size="large"
            style="width: 100%"
            placeholder="Chọn hồ sơ"
          />
          <span class="text-red-500">{{ docForm.FileCodeErro }}</span>
        </el-col>
        <el-col class="mt-4" :span="12">
          <p>
            Loại văn bản
            <span class="text-red-500">*</span>
          </p>
          <el-autocomplete
            v-model="loaiVanBan"
            :fetch-suggestions="querySearchLoaiVanBan"
            clearable
            class="inline-input w-50"
            placeholder="Chọn loại văn bản"
            @select="handleSelect"
            size="large"
            style="width: 100%"
          />
          <span class="text-red-500">{{ docForm.LoaiVanBanIdErro }}</span>
        </el-col>
        <el-col class="mt-4" :span="12">
          <p>Số của văn bản</p>
          <el-input
            v-model="docForm.codeNumber"
            size="large"
            style="width: 100%"
            placeholder="Nhập hồ sơ"
          />
          <span class="text-red-500">{{ docForm.codeNumberErro }}</span>
        </el-col>
        <el-col class="mt-4" :span="12">
          <p>Ký hiệu của văn bản</p>
          <el-input
            v-model="docForm.codeNotation"
            size="large"
            style="width: 100%"
            placeholder="Nhập hồ sơ"
          />
          <span class="text-red-500">{{ docForm.codeNotationErro }}</span>
        </el-col>
        <el-col class="mt-4" :span="12">
          <p>
            Tên cơ quan, tổ chức bán hành văn bản
            <span class="text-red-500">*</span>
          </p>
          <el-input
            v-model="docForm.organName"
            size="large"
            style="width: 100%"
            placeholder="Nhập tên cơ quan, tổ chức bán hành văn bản"
          />
          <span class="text-red-500">{{ docForm.organNameErro }}</span>
        </el-col>
        <el-col class="mt-4" :span="12">
          <p>
            Ngày, tháng, năm của văn bản
            <span class="text-red-500">*</span>
          </p>
          <el-date-picker
            v-model="docForm.issuedDate"
            style="width: 100%"
            type="date"
            placeholder="Chọn ngày tháng năm của văn bản"
            size="large"
          />
          <span class="text-red-500">{{ docForm.issuedDateErro }}</span>
        </el-col>
        <el-col class="mt-4" :span="12">
          <p>Từ khóa</p>
          <el-input
            size="large"
            v-model="docForm.keyword"
            style="width: 100%"
            placeholder="Nhập từ khóa"
          />
          <span class="text-red-500">{{ docForm.keywordErro }}</span>
        </el-col>
        <el-col class="mt-4" :span="12">
          <p>Ghi chú</p>
          <el-input
            size="large"
            v-model="docForm.note"
            :rows="4"
            type="textarea"
            style="width: 100%"
            placeholder="Nhập ghi chú"
          />
        </el-col>
        <el-col class="mt-4 mb-10" :span="23">
          <el-upload
            class="upload-demo ml-3"
            :auto-upload="false"
            drag
            :limit="1"
            @change="handleFileChange"
          >
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text">Chọn file <em>Nhấn xác nhận</em></div>
            <template #tip>
              <div class="el-upload__tip">
                <span class="text-red-500">{{ docForm.errors.file }}</span>
              </div>
            </template>
          </el-upload>
        </el-col>
      </el-row>
    </el-scrollbar>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="docStore.setIsShowPopup(false)">Hủy</el-button>
        <el-button type="primary" @click="docForm.handle"> Xác nhận </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import { UploadFilled } from "@element-plus/icons-vue";
import { computed, reactive } from "vue";
import { useDocStore } from "../store/doc.store";
import { UseDocForm } from "../doc.form";
import { onMounted } from "vue";
import { onBeforeUnmount } from "vue";
import { ref, onUpdated } from "vue";
import { loaiVanBanServiceApi } from "../../LoaiVanBan/service/loaivanban.service";
import { hosoServiceApi } from "../../HoSo/service/hoso.service";
import router from "../../../plugins/vue-router/index";
import { PageName } from "../../../common/contants/contants";
import { docServiceApi } from "../service/doc.service";
import { showErrorNotification } from "../../../common/helper/helpers";
const docForm = reactive(UseDocForm());
const docStore = useDocStore();
const isShowPopup = computed(() => docStore.isShowPopup);
function closeDialog() {
  docStore.setIsShowPopup(false);
  docStore.setSelectedDocId("");
}
const windowHeight = ref(window.innerHeight);
const calculatedHeight = computed(() => {
  return `${windowHeight.value * 0.7}px`;
});
onMounted(async () => {
  await getLoaiVanBanDropDown();
  window.addEventListener("resize", handleWindowResize);
});
onUpdated(async () => {
  if (docStore.isShowPopup) {
    await getNameHoSo();
  }
  await getDetailDoc();
}),
  onBeforeUnmount(() => {
    window.removeEventListener("resize", handleWindowResize);
  });
const handleWindowResize = () => {
  windowHeight.value = window.innerHeight;
};
const handleFileChange = (file: any) => {
  docForm.file = file;
};

const nameHoSo = ref<string>("");
async function getNameHoSo() {
  const res: any = await hosoServiceApi._getDetail(docStore.hosoId as string);
  if (res.success) {
    nameHoSo.value = res.data.title;
    docForm.setFileCode(res.data.fileCode);
  } else {
    router.push({ name: PageName.HOSO_PAGE });
  }
}
async function getDetailDoc() {
  if (docStore.selectedDocId) {
    const res: any = await docServiceApi.getDetail(
      docStore.selectedDocId as string
    );
    if (res.success) {
      docForm.resetForm({
        values: {
          docCode: res.data.docCode,
          codeNumber: res.data.codeNumber,
          codeNotation: res.data.codeNotation,
          issuedDate: res.data.issuedDate,
          organName: res.data.organName,
          subject: res.data.subject,
          note: res.data.note,
          keyword: res.data.keyword,
          FileCode: res.data.fileCode,
          LoaiVanBanId: res.data.loaiVanBanId,
        },
      });
      loaiVanBan.value = res.data.loaiVanBanId;
      docStore.setIsShowPopup(true);
    } else {
      showErrorNotification(res.message);
    }
  }
}

const loaiVanBan = ref("");
interface ILoaiVanban {
  id: number;
  value: string;
}
const loaiVanBans = ref<ILoaiVanban[]>([]);
const getLoaiVanBanDropDown = async () => {
  const res: any = await loaiVanBanServiceApi._getDropDown();
  if (res.success) {
    loaiVanBans.value = res?.data;
  }
};
const querySearchLoaiVanBan = (queryString: string, cb: any) => {
  const results = queryString
    ? loaiVanBans.value.filter(createFilterLoaiVanBan(queryString))
    : loaiVanBans.value;
  cb(results);
};
const createFilterLoaiVanBan = (queryString: string) => {
  return (restaurant: ILoaiVanban) => {
    return (
      restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
    );
  };
};
const handleSelect = (item: ILoaiVanban) => {
  docForm.LoaiVanBanId = item.id;
};
</script>
