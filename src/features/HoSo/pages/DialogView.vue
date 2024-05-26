<template>
  <el-dialog
    align-center
    style="border-radius: 5px !important"
    :title="props.itemEdit ? 'Cập nhật hồ sơ' : 'Tạo mới hồ sơ'"
    width="800"
  >
    <el-row :gutter="20">
      <el-col :span="12">
        <p>
          Mã hồ sơ
          <span class="text-red-500">*</span>
        </p>
        <el-input
          :disabled="props.itemEdit"
          v-model="FileCode"
          size="large"
          style="width: 100%"
          placeholder="Nhập mã hồ sơ"
        />
        <span class="text-red-500 ml-2">{{ FileCodeError }}</span>
      </el-col>
      <el-col :span="12">
        <p>
          Loại hồ sơ
          <span class="text-red-500">*</span>
        </p>
        <el-select
          v-model="LoaiHoSoId"
          class="w-full"
          size="large"
          clearable
          collapse-tags
          placeholder="Chọn loại hồ sơ"
          popper-class="custom-header"
          :max-collapse-tags="1"
        >
          <el-option
            v-for="item in loaiHoSoDropDown"
            :key="item.name"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
        <span class="text-red-500 ml-2">{{ LoaiHoSoIdError }}</span>
      </el-col>
      <el-col class="mt-4" :span="12">
        <p>
          Tên kho
          <span class="text-red-500">*</span>
        </p>
        <el-select
          v-model="MaKho"
          class="w-full"
          size="large"
          clearable
          collapse-tags
          placeholder="Chọn kho"
          popper-class="custom-header"
          :max-collapse-tags="1"
        >
          <el-option
            v-for="item in kho_dropdown"
            :key="item.value"
            :label="item.text"
            :value="item.value"
          />
        </el-select>
        <span class="text-red-500 ml-2">{{ MaKhoError }}</span>
      </el-col>
      <el-col class="mt-4" :span="12">
        <p>
          Tên dãy
          <span class="text-red-500">*</span>
        </p>
        <el-select
          v-model="MaDay"
          class="w-full"
          size="large"
          clearable
          collapse-tags
          placeholder="Chọn dãy"
          popper-class="custom-header"
          :max-collapse-tags="1"
        >
          <el-option
            v-for="item in Day_dropdown"
            :key="item.value"
            :label="item.text"
            :value="item.value"
          />
        </el-select>
        <span class="text-red-500 ml-2">{{ MaDayError }}</span>
      </el-col>
      <el-col class="mt-4" :span="12">
        <p>
          Tên kệ
          <span class="text-red-500">*</span>
        </p>
        <el-select
          v-model="MaKe"
          class="w-full"
          size="large"
          clearable
          collapse-tags
          placeholder="Chọn kệ"
          popper-class="custom-header"
          :max-collapse-tags="1"
        >
          <el-option
            v-for="item in ke_dropdown"
            :key="item.value"
            :label="item.text"
            :value="item.value"
          />
        </el-select>
        <span class="text-red-500 ml-2">{{ MaKeError }}</span>
      </el-col>
      <el-col class="mt-4" :span="12">
        <p>
          Tên hộp
          <span class="text-red-500">*</span>
        </p>
        <el-autocomplete
          v-model="MaHop"
          :fetch-suggestions="queryHop"
          size="large"
          clearable
          class="inline-input w-full"
          placeholder="Chọn hộp hồ sơ"
          @select="handleSelect"
        />
        <span class="text-red-500 ml-2">{{ MaHopError }}</span>
      </el-col>
      <el-col class="mt-4" :span="12">
        <p>
          Mục lục số, năm hình thành hố sơ
          <span class="text-red-500">*</span>
        </p>
        <el-input
          v-model="FileCatalog"
          size="large"
          style="width: 100%"
          placeholder="Nhập mục lục số, năm hình thành hố sơ"
        />
        <span class="text-red-500 ml-2">{{ FileCatalogError }}</span>
      </el-col>
      <el-col class="mt-4" :span="12">
        <p>
          Số và kí hiệu hồ sơ
          <span class="text-red-500">*</span>
        </p>
        <el-input
          v-model="FileNotation"
          size="large"
          style="width: 100%"
          placeholder="Nhập số và kí hiệu hồ sơ"
        />
        <span class="text-red-500 ml-2">{{ FileNotationError }}</span>
      </el-col>
      <el-col class="mt-4" :span="12">
        <p>
          Tiêu đề hồ sơ
          <span class="text-red-500">*</span>
        </p>
        <el-input
          v-model="Title"
          size="large"
          style="width: 100%"
          placeholder="Nhập tiêu đề hồ sơ"
        />
        <span class="text-red-500 ml-2">{{ TitleError }}</span>
      </el-col>
      <el-col class="mt-4" :span="12">
        <p>Ngôn ngữ <span class="text-red-500">*</span></p>
        <!-- <el-input v-model="Language" size="large" style="width: 100%" placeholder="Ngôn ngữ" /> -->
        <el-select v-model="Language" placeholder="Ngôn ngữ" size="large">
          <el-option
            v-for="item in languages"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          />
        </el-select>
        <span class="text-red-500 ml-2">{{ LanguageError }}</span>
      </el-col>
      <el-col class="mt-4" :span="12">
        <p>
          Thời gian bắt đầu
          <span class="text-red-500">*</span>
        </p>
        <el-date-picker
          style="width: 100%"
          v-model="StartDate"
          type="date"
          placeholder="Ngày bắt đầu"
          size="large"
        />
        <span class="text-red-500 ml-2">{{ StartDateError }}</span>
      </el-col>
      <el-col class="mt-4" :span="12">
        <p>
          Thời gian hết hạn
          <span class="text-red-500">*</span>
        </p>
        <el-date-picker
          style="width: 100%"
          v-model="EndDate"
          type="date"
          placeholder="Ngày hết hạn"
          size="large"
        />
        <span class="text-red-500 ml-2">{{ EndDateError }}</span>
      </el-col>

      <el-col class="mt-4" :span="12">
        <p>
          Từ khóa
          <span class="text-red-500">*</span>
        </p>
        <el-input
          v-model="Keyword"
          size="large"
          style="width: 100%"
          placeholder="Nhập từ khóa"
        />
        <span class="text-red-500 ml-2">{{ KeywordError }}</span>
      </el-col>

      <el-col class="mt-4" :span="12">
        <p>Mô tả</p>
        <el-input
          v-model="Description"
          :rows="4"
          type="textarea"
          size="large"
          style="width: 100%"
          placeholder="Nhập mô tả"
        />
        <span class="text-red-500 ml-2">{{ DescriptionError }}</span>
      </el-col>
    </el-row>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="emits('close')">Cancel</el-button>
        <el-button @click="submit" type="primary">
          {{ props.itemEdit ? "Cập nhật" : "Tạo mới" }}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script setup>
import { ref, onMounted, computed } from "vue";
import { useForm, useField } from "vee-validate";
import * as yup from "yup";
import {
  MESSAGE_ERROR,
  Regex,
  SupportLanguage,
} from "../../../common/contants/contants";
import {
  showErrorNotification,
  showSuccessNotification,
} from "../../../common/helper/helpers";
import { hosoServiceApi } from "../service/hoso.service";
import { KhoServiceApi } from "../../Kho/service/kho.service";
import { useLoadingStore } from "../../loading/store/index";
import { watch } from "vue";
import { hopServiceApi } from "../../Hop/service/hop.service";
import { loaiHoSoHoSoServiceApi } from "../../LoaiHoSo/service/LoaiHoSo.service";
import { dayServiceApi } from "../../Day/service/day.service";
import { keServiceApi } from "../../Ke/service/ke.service";
const props = defineProps(["itemEdit"]);
const emits = defineEmits(["close", "loadData"]);
watch(
  () => props.itemEdit,
  (newValue) => {
    resetForm();
    if (props.itemEdit !== null) {
      getKhoById(newValue);
    }
  }
);

onMounted(async () => {
  await Promise.all([getLoaiHoSoDropDown(), getKho_dropdown()]);
});
const getKhoById = async (id) => {
  try {
    loading.setLoading(true);
    const data = await hosoServiceApi._getDetail(id);
    if (data.success) {
      FileCode.value = data.data.fileCode;
      FileCatalog.value = data.data.fileCatalog;
      FileNotation.value = data.data.fileNotation;
      Title.value = data.data.title;
      Language.value = data.data.language;
      StartDate.value = data.data.startDate;
      EndDate.value = data.data.endDate;
      Keyword.value = data.data.keyword;
      MaHop.value = data.data.maHop;
      Description.value = data.data.description;
      LoaiHoSoId.value = data.data.loaiHoSoId;
      MaKho.value = data.data.maKho;
      MaDay.value = data.data.maDay;
      MaKe.value = data.data.maKe;
    } else {
      showWarningsNotification(data.message);
    }
  } catch (error) {
    console.error("Error fetching product detail:", error);
  } finally {
    loading.setLoading(false);
  }
};

const loading = useLoadingStore();
const { handleSubmit, resetForm } = useForm();

const { value: FileCode, errorMessage: FileCodeError } = useField(
  "FileCode",
  yup.string().required(MESSAGE_ERROR.REQUIRE)
);
const { value: FileCatalog, errorMessage: FileCatalogError } = useField(
  "FileCatalog",
  yup.string().required(MESSAGE_ERROR.REQUIRE)
);
const { value: FileNotation, errorMessage: FileNotationError } = useField(
  "FileNotation",
  yup.string().required(MESSAGE_ERROR.REQUIRE)
);
const { value: Title, errorMessage: TitleError } = useField(
  "Title",
  yup.string().required(MESSAGE_ERROR.REQUIRE)
);

const { value: Language, errorMessage: LanguageError } = useField(
  "Language",
  yup.string().required(MESSAGE_ERROR.REQUIRE)
);
const { value: StartDate, errorMessage: StartDateError } = useField(
  "StartDate",
  yup.string().required(MESSAGE_ERROR.REQUIRE)
);
const { value: EndDate, errorMessage: EndDateError } = useField(
  "EndDate",
  yup.string().required(MESSAGE_ERROR.REQUIRE)
);

const { value: Description, errorMessage: DescriptionError } = useField(
  "Description",
  yup.string()
);

const { value: Keyword, errorMessage: KeywordError } = useField(
  "Keyword",
  yup.string().required(MESSAGE_ERROR.REQUIRE)
);
const { value: MaHop, errorMessage: MaHopError } = useField(
  "MaHop",
  yup.string().required(MESSAGE_ERROR.REQUIRE)
);
const { value: LoaiHoSoId, errorMessage: LoaiHoSoIdError } = useField(
  "LoaiHoSoId",
  yup.string().required(MESSAGE_ERROR.REQUIRE)
);
const { value: MaKho, errorMessage: MaKhoError } = useField(
  "MaKho",
  yup.string().required(MESSAGE_ERROR.REQUIRE)
);
const { value: MaDay, errorMessage: MaDayError } = useField(
  "MaDay",
  yup.string().required(MESSAGE_ERROR.REQUIRE)
);
const { value: MaKe, errorMessage: MaKeError } = useField(
  "MaKe",
  yup.string().required(MESSAGE_ERROR.REQUIRE)
);
const submit = handleSubmit(async () => {
  console.log(EndDate.value);
  try {
    if (props.itemEdit === null) {
      const formData = new FormData();
      formData.append("FileCode", FileCode.value);
      formData.append("FileCatalog", FileCatalog.value);
      formData.append("FileNotation", FileNotation.value);
      formData.append("Title", Title.value);
      formData.append("Language", Language.value);
      formData.append("StartDate", StartDate.value);
      formData.append("EndDate", EndDate.value);
      formData.append("Keyword", Keyword.value);
      formData.append("MaHop", MaHop.value);
      formData.append("LoaiHoSoId", LoaiHoSoId.value);
      formData.append(
        "Description",
        Description.value ? Description.value : ""
      );
      loading.setLoading(true);
      const res = await hosoServiceApi.create(formData);
      if (res.success) {
        emits("close");
        emits("loadData");
        showSuccessNotification("Tạo mới kho thành công");
      } else {
        showErrorNotification(res.message);
      }
    } else {
      const formData = new FormData();
      formData.append("Id", props.itemEdit);
      formData.append("FileCode", FileCode.value);
      formData.append("FileCatalog", FileCatalog.value);
      formData.append("FileNotation", FileNotation.value);
      formData.append("Title", Title.value);
      formData.append("Language", Language.value);
      formData.append("StartDate", StartDate.value);
      formData.append("EndDate", EndDate.value);
      formData.append("Keyword", Keyword.value);
      formData.append("MaHop", MaHop.value);
      formData.append("LoaiHoSoId", LoaiHoSoId.value);
      formData.append(
        "Description",
        Description.value ? Description.value : ""
      );

      loading.setLoading(true);
      const res = await hosoServiceApi.update(props.itemEdit, formData);
      if (res.success) {
        emits("close");
        emits("loadData");
        showSuccessNotification(res.message);
      } else {
        showErrorNotification(res.message);
      }
    }
  } catch (error) {
    showErrorNotification(error.message);
  } finally {
    loading.setLoading(false);
  }
});
const hop_dropdown = ref(null);
const get_hopDropDown = async (make) => {
  const res = await hopServiceApi._getDropDownByMa(make);
  hop_dropdown.value = res.data;
  console.log(hop_dropdown.value);
};
const queryHop = (queryString, cb) => {
  const results = queryString
    ? hop_dropdown.value.filter(createFilter(queryString))
    : hop_dropdown.value;
  cb(results);
};
const handleSelect = (item) => {
  console.log(MaHop.value);
};

const languages = computed(() => {
  return [
    {
      name: "Tiếng Việt",
      value: "Tiếng Việt",
    },
    {
      name: "English",
      value: "English",
    },
  ];
});
const loaiHoSoDropDown = ref(null);
const getLoaiHoSoDropDown = async () => {
  const { data } = await loaiHoSoHoSoServiceApi.getAll();
  loaiHoSoDropDown.value = data;
};
const kho_dropdown = ref(null);
const getKho_dropdown = async () => {
  const res = await KhoServiceApi._getDropDown();
  if (res.success) {
    kho_dropdown.value = res.data;
  }
};

const Day_dropdown = ref(null);
const getDay_dropdown = async (maKho) => {
  const res = await dayServiceApi._getDropDownByMa(maKho);
  if (res.success) {
    Day_dropdown.value = res.data;
  }
};
watch(MaKho, async () => {
  await getDay_dropdown(MaKho.value);
});
const ke_dropdown = ref(null);
const getKe_dropdown = async (maKho) => {
  const res = await keServiceApi._getDropDownByMa(maKho);
  if (res.success) {
    ke_dropdown.value = res.data;
  }
};
watch(MaDay, async () => {
  await getKe_dropdown(MaDay.value);
});

watch(MaKe, async () => {
  await get_hopDropDown(MaKe.value);
});
</script>
