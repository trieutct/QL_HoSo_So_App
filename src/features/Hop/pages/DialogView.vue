<template>
  <el-dialog
    align-center
    style="border-radius: 5px !important"
    :title="props.itemEdit ? 'Cập nhật hộp' : 'Tạo mới hộp'"
    width="700"
  >
    <el-row :gutter="20">
      <el-col :span="12">
        <p>
          Mã hộp
          <span class="text-red-500">*</span>
        </p>
        <el-input
          :disabled="props.itemEdit"
          v-model="MaHop"
          size="large"
          style="width: 100%"
          placeholder="Nhập mã hộp"
        />
        <span class="text-red-500 ml-2">{{ MaHopError }}</span>
      </el-col>

      <el-col :span="12">
        <p>
          Tên hộp
          <span class="text-red-500">*</span>
        </p>
        <el-input
          v-model="name"
          size="large"
          style="width: 100%"
          placeholder="Nhập tên hộp"
        />
        <span class="text-red-500 ml-2">{{ nameError }}</span>
      </el-col>
      <el-col class="mt-4" :span="12">
        <p>
          Tên Kho
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
          Tên Dãy
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
          Tên Kệ
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
        <p>Vị Trí</p>
        <el-input
          v-model="ViTri"
          size="large"
          style="width: 100%"
          placeholder="Nhập vị trí"
        />
        <span class="text-red-500 ml-2">{{ ViTriError }}</span>
      </el-col>
      <el-col class="mt-4" :span="12">
        <p>Mô tả</p>
        <el-input
          v-model="MoTa"
          size="large"
          style="width: 100%"
          placeholder="Nhập mô tả"
        />
        <span class="text-red-500 ml-2">{{ MoTaError }}</span>
      </el-col>
      <el-col class="mt-4" :span="12">
        <p>Ghi chú</p>
        <el-input
          v-model="GhiChu"
          size="large"
          :rows="4"
          type="textarea"
          placeholder="Ghi chú"
        />
        <span class="text-red-500 ml-2">{{ GhiChuError }}</span>
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
import { ref, onMounted } from "vue";
import { useForm, useField } from "vee-validate";
import * as yup from "yup";
import { MESSAGE_ERROR, Regex } from "../../../common/contants/contants";
import {
  showErrorNotification,
  showSuccessNotification,
} from "../../../common/helper/helpers";
import { hopServiceApi } from "../service/hop.service";
import { KhoServiceApi } from "../../Kho/service/kho.service";
import { useLoadingStore } from "../../loading/store/index";
import { watch } from "vue";
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

onMounted(() => {
  getKho_dropdown();
});
const getKhoById = async (id) => {
  try {
    loading.setLoading(true);
    const data = await hopServiceApi._getDetail(id);
    if (data.success) {
      MaKe.value = data.data.maKe;
      MaKho.value = data.data.maKho;
      name.value = data.data.name;
      ViTri.value = data.data.location;
      MoTa.value = data.data.description;
      GhiChu.value = data.data.note;
      MaDay.value = data.data.maDay;
      MaHop.value = data.data.maHop;
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

const { value: MaKho, errorMessage: MaKhoError } = useField(
  "MaKho",
  yup.string().required(MESSAGE_ERROR.REQUIRE)
);
const { value: MaHop, errorMessage: MaHopError } = useField(
  "MaHop",
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
const { value: name, errorMessage: nameError } = useField(
  "name",
  yup
    .string()
    .required(MESSAGE_ERROR.REQUIRE)
    .matches(Regex.NAME_PRODUCT, MESSAGE_ERROR.NAME)
);

const { value: ViTri, errorMessage: ViTriError } = useField(
  "ViTri",
  yup.string()
);

const { value: MoTa, errorMessage: MoTaError } = useField("MoTa", yup.string());
const { value: GhiChu, errorMessage: GhiChuError } = useField(
  "GhiChu",
  yup.string()
);
const submit = handleSubmit(async () => {
  try {
    if (props.itemEdit === null) {
      const formData = new FormData();
      alert(MaKho.value);
      formData.append("MaKe", MaKe.value);
      formData.append("MaHop", MaHop.value);
      formData.append("Name", name.value);
      formData.append("Location", ViTri.value ? ViTri.value : "");
      formData.append("Description", MoTa.value ? MoTa.value : "");
      formData.append("Note", GhiChu.value ? GhiChu.value : "");
      formData.append("MaDay", MaDay.value);
      loading.setLoading(true);
      const res = await hopServiceApi.create(formData);
      if (res.success) {
        emits("close");
        emits("loadData");
        showSuccessNotification(res.message);
      } else {
        showErrorNotification(res.message);
      }
    } else {
      const formData = new FormData();
      formData.append("Id", props.itemEdit);
      formData.append("MaKe", MaKe.value);
      formData.append("MaHop", MaHop.value);
      formData.append("MaDay", MaDay.value);
      formData.append("Name", name.value);
      formData.append("Location", ViTri.value ? ViTri.value : "");
      formData.append("Description", MoTa.value ? MoTa.value : "");
      formData.append("Note", GhiChu.value ? GhiChu.value : "");
      loading.setLoading(true);
      const res = await hopServiceApi.update(props.itemEdit, formData);
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
const kho_dropdown = ref(null);
const getKho_dropdown = async () => {
  const res = await KhoServiceApi._getDropDown();
  if (res.success) {
    kho_dropdown.value = res.data;
  }
};
watch(MaKho, async (newVal) => {
  // alert(newVal)
  await getDay_dropdown(newVal);
});

watch(MaDay, async (newVal) => {
  await getKe_dropdown(newVal);
});
const Day_dropdown = ref(null);
const getDay_dropdown = async (maKho) => {
  const res = await dayServiceApi._getDropDownByMa(maKho);
  if (res.success) {
    Day_dropdown.value = res.data;
  }
};
const ke_dropdown = ref(null);
const getKe_dropdown = async (maDay) => {
  const res = await keServiceApi._getDropDownByMa(maDay);
  if (res.success) {
    ke_dropdown.value = res.data;
  }
};
</script>
