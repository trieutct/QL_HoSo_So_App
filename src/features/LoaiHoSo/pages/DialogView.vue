<template>
  <el-dialog
    style="border-radius: 5px !important"
    :title="props.itemEdit ? 'Cập nhật loại hồ sơ' : 'Tạo mới loại hồ sơ'"
    width="700"
  >
    <el-row :gutter="20">
      <el-col :span="24">
        <p>
          Mã loại hồ sơ
          <span class="text-red-500">*</span>
        </p>
        <el-input
          :disabled="props.itemEdit"
          v-model="MaLoaiHoSo"
          size="large"
          style="width: 100%"
          placeholder="Mã loại hồ sơ"
        />
        <span class="text-red-500 ml-2">{{ MaLoaiHoSoError }}</span>
      </el-col>
      <el-col class="mt-4" :span="24">
        <p>
          Tên loại hồ sơ
          <span class="text-red-500">*</span>
        </p>
        <el-input
          v-model="name"
          size="large"
          style="width: 100%"
          placeholder="Tên loại hồ sơ"
        />
        <span class="text-red-500 ml-2">{{ nameError }}</span>
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
import { useForm, useField } from "vee-validate";
import * as yup from "yup";
import { MESSAGE_ERROR, Regex } from "../../../common/contants/contants";
import {
  showErrorNotification,
  showSuccessNotification,
} from "../../../common/helper/helpers";
import { loaiHoSoHoSoServiceApi } from "../service/LoaiHoSo.service";
import { useLoadingStore } from "../../loading/store/index";
import { watch } from "vue";
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
const getKhoById = async (id) => {
  try {
    loading.setLoading(true);
    const data = await loaiHoSoHoSoServiceApi._getDetail(id);
    if (data.success) {
      MaLoaiHoSo.value = data.data.code;
      name.value = data.data.name;
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

const { value: MaLoaiHoSo, errorMessage: MaLoaiHoSoError } = useField(
  "MaLoaiHoSo",
  yup.string().required(MESSAGE_ERROR.REQUIRE)
);

const { value: name, errorMessage: nameError } = useField(
  "name",
  yup
    .string()
    .required(MESSAGE_ERROR.REQUIRE)
    .matches(Regex.NAME_PRODUCT, MESSAGE_ERROR.NAME)
);
const submit = handleSubmit(async () => {
  try {
    if (props.itemEdit === null) {
      const formData = new FormData();
      formData.append("Code", MaLoaiHoSo.value);
      formData.append("Name", name.value);
      loading.setLoading(true);
      const res = await loaiHoSoHoSoServiceApi.create(formData);
      if (res.success) {
        emits("close");
        emits("loadData");
        showSuccessNotification("Tạo mới kho thành công");
        resetForm();
      } else {
        showErrorNotification(res.message);
      }
    } else {
      const formData = new FormData();
      formData.append("Id", props.itemEdit);
      formData.append("Code", MaLoaiHoSo.value);
      formData.append("Name", name.value);
      loading.setLoading(true);
      const res = await loaiHoSoHoSoServiceApi.update(props.itemEdit, formData);
      if (res.success) {
        emits("close");
        emits("loadData");
        showSuccessNotification(res.message);
        resetForm();
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
</script>
