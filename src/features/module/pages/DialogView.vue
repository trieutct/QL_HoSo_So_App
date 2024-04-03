<template>
  <el-dialog style="border-radius: 5px !important;" :title="props.itemEdit ? 'Cập nhật chức năng' : 'Tạo mới chức năng'"
    width="700">
    <el-row :gutter="20">
      <el-col :span="12">
        <p>Mã Chức Năng
          <span class="text-red-500">*</span>
        </p>
        <el-input :disabled="props.itemEdit" v-model="MaModule" size="large" style="width: 100%"
          placeholder="Mã chức năng" />
        <span class="text-red-500 ml-2">{{ MaModuleError }}</span>
      </el-col>
      <el-col :span="12">
        <p>Tên Chức Năng
          <span class="text-red-500">*</span>
        </p>
        <el-input v-model="name" size="large" style="width: 100%" placeholder="Tên chức năng" />
        <span class="text-red-500 ml-2">{{ nameError }}</span>
      </el-col>
      <el-col class="mt-4" :span="12">
        <!-- <p>Vị Trí</p>
        <el-input v-model="ViTri" size="large" style="width: 100%" placeholder="Nhập vị trí" />
        <span class="text-red-500 ml-2">{{ ViTriError }}</span> -->
        <p>Hiển Thị</p>
        <el-radio-group v-model="isShow" class="ml-2">
          <el-radio value="true" size="large">Hiển thị</el-radio>
          <el-radio value="false" size="large">Ẩn</el-radio>
        </el-radio-group>
      </el-col>
      <el-col class="mt-4" :span="12">
        <p>Icon
          <span class="text-red-500">*</span>
        </p>
        <el-input v-model="icon" size="large" style="width: 100%" placeholder="Nhập class icon" />
        <span class="text-red-500 ml-2">{{ iconError }}</span>
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

import { useForm, useField } from 'vee-validate';
import * as yup from 'yup';
import { MESSAGE_ERROR, Regex } from '../../../common/contants/contants';
import { showErrorNotification, showSuccessNotification } from '../../../common/helper/helpers';
import { useLoadingStore } from '../../loading/store/index'
import { watch } from 'vue'
import { moduleServiceApi } from '../service/module.service';
const props = defineProps(['itemEdit'])
const emits = defineEmits(['close', 'loadData'])
watch(() => props.itemEdit, (newValue) => {
  resetForm()
  if (props.itemEdit !== null) {
    getKhoById(newValue)
  }
});
const getKhoById = async (id) => {
  try {
    loading.setLoading(true)
    const data = await moduleServiceApi._getDetail(id);
    if (data.success) {
      MaModule.value = data.data.code
      name.value = data.data.name;
      isShow.value = data.data.isShow+"";
      icon.value = data.data.icon;
    }
    else {
      showWarningsNotification(data.message)
    }
  } catch (error) {
    console.error('Error fetching product detail:', error);
  } finally {
    loading.setLoading(false)
  }
}

const loading = useLoadingStore()
const { handleSubmit, resetForm } = useForm();

const { value: MaModule, errorMessage: MaModuleError } = useField(
  'MaModule',
  yup
    .string()
    .required(MESSAGE_ERROR.REQUIRE)
);

const { value: icon, errorMessage: iconError } = useField(
  'icon',
  yup
    .string()
    .required(MESSAGE_ERROR.REQUIRE)
);
const { value: isShow, errorMessage: isShowError } = useField(
  'isShow',
  yup
    .boolean()
    .required(MESSAGE_ERROR.REQUIRE)
);
const { value: name, errorMessage: nameError } = useField(
  'name',
  yup
    .string()
    .required(MESSAGE_ERROR.REQUIRE)
    .matches(Regex.NAME_PRODUCT, MESSAGE_ERROR.NAME)
);
const submit = handleSubmit(async () => {
  try {
    if (props.itemEdit === null) {
      const formData = new FormData();
      formData.append('Code', MaModule.value);
      formData.append('Name', name.value);
      formData.append('IsShow',isShow.value);
      formData.append('Icon', icon.value );
      loading.setLoading(true)
      const res = await moduleServiceApi.create(formData)
      if (res.success) {
        emits('close')
        emits('loadData')
        showSuccessNotification(res.message)
      }
      else {
        showErrorNotification(res.message)
      }
    }
    else {
      const formData = new FormData();
      formData.append('Id', props.itemEdit);
      formData.append('Code', MaModule.value);
      formData.append('Name', name.value);
      formData.append('IsShow',isShow.value);
      formData.append('Icon', icon.value );

      loading.setLoading(true)
      const res = await moduleServiceApi.update(props.itemEdit, formData)
      if (res.success) {
        emits('close')
        emits('loadData')
        showSuccessNotification(res.message)
      }
      else {
        showErrorNotification(res.message)
      }
    }
  } catch (error) {
    showErrorNotification(error.message)
  } finally {
    loading.setLoading(false)
  }
})
</script>