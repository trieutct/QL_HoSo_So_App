<template>
  <el-dialog
    style="border-radius: 5px !important"
    :title="props.itemEdit ? 'Cập nhật thao tác' : 'Tạo mới thao tác'"
    width="500"
  >
    <el-row :gutter="20">
      <el-col :span="24">
        <p>
          Tên thao tác
          <span class="text-red-500">*</span>
        </p>
        <el-input
          v-model="name"
          size="large"
          style="width: 100%"
          placeholder="Nhập tên thao tác"
        />
        <span class="text-red-500 ml-2">{{ nameError }}</span>
      </el-col>
      <el-col class="mt-4" :span="24">
        <p>
          Đường dẫn
          <span class="text-red-500">*</span>
        </p>
        <el-input
          v-model="url"
          size="large"
          style="width: 100%"
          placeholder="Nhập đường dẫn"
        />
        <span class="text-red-500 ml-2">{{ urlError }}</span>
      </el-col>
      <el-col class="mt-4" :span="24">
        <p>Hiển Thị <span class="text-red-500">*</span></p>
        <el-radio-group v-model="isShow" class="ml-2">
          <el-radio value="true" size="large">Hiển thị</el-radio>
          <el-radio value="false" size="large">Ẩn</el-radio>
        </el-radio-group>
        <p class="text-red-500 ml-2">{{ isShowError }}</p>
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
import { useLoadingStore } from "../../loading/store/index";
import { watch } from "vue";
import { operationerviceApi } from "../service/operation.service";
const props = defineProps(["itemEdit", "moduleId"]);
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
    const data = await operationerviceApi._getDetail(id);
    if (data.success) {
      url.value = data.data.url;
      name.value = data.data.name;
      isShow.value = data.data.isShow + "";
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
const { value: url, errorMessage: urlError } = useField(
  "url",
  yup.string().required(MESSAGE_ERROR.REQUIRE)
);
const { value: isShow, errorMessage: isShowError } = useField(
  "isShow",
  yup.boolean().required(MESSAGE_ERROR.REQUIRE)
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
      formData.append("Name", name.value);
      formData.append("IsShow", isShow.value);
      formData.append("URL", url.value);
      formData.append("ModuleId", props.moduleId);
      loading.setLoading(true);
      const res = await operationerviceApi.create(formData);
      if (res.success) {
        emits("close");
        emits("loadData", props.moduleId);
        showSuccessNotification(res.message);
      } else {
        showErrorNotification(res.message);
      }
    } else {
      const formData = new FormData();
      formData.append("Id", props.itemEdit);
      formData.append("Name", name.value);
      formData.append("IsShow", isShow.value);
      formData.append("URL", url.value);
      formData.append("ModuleId", props.moduleId);
      loading.setLoading(true);
      const res = await operationerviceApi.update(props.itemEdit, formData);
      if (res.success) {
        emits("close");
        emits("loadData", props.moduleId);
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
</script>
