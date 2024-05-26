<template>
  <el-dialog style="border-radius: 5px !important"
    :title="props.itemEdit ? 'Cập nhật người dùng' : 'Tạo mới người dùng'" width="700" align-center>
    <el-row :gutter="20">
      <el-col :span="12">
        <p>
          Họ và tên
          <span class="text-red-500">*</span>
        </p>
        <el-input v-model="FullName" size="large" style="width: 100%" placeholder="Nhập hộ và tên" />
        <span class="text-red-500 ml-2">{{ FullNameError }}</span>
      </el-col>
      <el-col :span="12">
        <p>
          Email
          <span class="text-red-500">*</span>
        </p>
        <el-input v-model="Email" size="large" style="width: 100%" placeholder="Nhập Email" />
        <span class="text-red-500 ml-2">{{ EmailError }}</span>
      </el-col>
      <el-col class="mt-4" :span="12">
        <p>Ngày sinh</p>
        <el-date-picker v-model="Birthday" style="width: 100%" type="date" placeholder="Chọn ngày tháng năm của văn bản"
          size="large" />
        <span class="text-red-500 ml-2">{{ BirthdayError }}</span>
      </el-col>
      <el-col class="mt-4" :span="12">
        <p>Số điện thoại <span class="text-red-500">*</span></p>
        <el-input v-model="Phone" size="large" style="width: 100%" placeholder="Nhập số điện thoại" />
        <span class="text-red-500 ml-2">{{ PhoneError }}</span>
      </el-col>
      <el-col class="mt-4" :span="12">
        <p>Vai trò<span class="text-red-500">*</span></p>
        <el-select v-model="RoleId" class="w-full" size="large" clearable collapse-tags placeholder="Chọn kho"
          popper-class="custom-header" :max-collapse-tags="1">
          <el-option v-for="item in roleOptions" :key="item.value" :label="item.text" :value="item.value" />
        </el-select>
        <span class="text-red-500 ml-2">{{ RoleIdError }}</span>
      </el-col>
      <el-col class="mt-4" :span="24">
        <el-upload class="upload-demo " :auto-upload="false" drag :limit="1" @change="handleFileChange">
          <el-icon class="el-icon--upload"><upload-filled /></el-icon>
          <div class="el-upload__text">
            Chọn ảnh <em>Chọn file</em>
          </div>
          {{ fileError }}
        </el-upload>
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
<script lang="ts" setup>
import { UploadFilled } from '@element-plus/icons-vue'
import { useForm, useField } from "vee-validate";
import * as yup from "yup";
import { MESSAGE_ERROR, Regex } from "../../../common/contants/contants";
import { userServiceApi } from "../service/user.service"
import { useLoadingStore } from "../../loading/store/index";
import {
  showErrorNotification,
  showSuccessNotification,
  showWarningsNotification,
} from "../../../common/helper/helpers";
import { roleServiceApi } from '../../role/service/role.service';
import { onMounted, ref, watch } from 'vue';
import { ISelectOption } from '../interface'
const props = defineProps(["itemEdit"]);
const emits = defineEmits(["close", "loadData"]);
const roleOptions = ref<ISelectOption>();
const loading = useLoadingStore();
watch(
  () => props.itemEdit,
  (newValue: string) => {
    resetForm();
    if (props.itemEdit !== null) {
      getUserById(newValue as string);
    }
  }
);
onMounted(async () => {
  await getDropDownRole()
})
const { handleSubmit, resetForm } = useForm();


const { value: FullName, errorMessage: FullNameError } = useField(
  "FullName",
  yup
    .string()
    .required(MESSAGE_ERROR.REQUIRE)
    .matches(Regex.NAME_PRODUCT, MESSAGE_ERROR.NAME)
);
const { value: Email, errorMessage: EmailError } = useField(
  "Email",
  yup.string().email("Email không hợp lệ").required(MESSAGE_ERROR.REQUIRE)
);
const { value: Birthday, errorMessage: BirthdayError } = useField(
  "Birthday",
  yup.string().optional()
);
const { value: Phone, errorMessage: PhoneError } = useField(
  "Phone",
  yup.string().matches(/^(?:\+?84|0)(?:\d{9,10})$/, "Số điện thoại không hợp lệ").required(MESSAGE_ERROR.REQUIRE)
);
const { value: RoleId, errorMessage: RoleIdError } = useField(
  "RoleId",
  yup.string().required(MESSAGE_ERROR.REQUIRE)
);
const { value: file, errorMessage: fileError } = useField(
  "file",
  yup.mixed()
);


const getDropDownRole = async () => {
  const res: any = await roleServiceApi._getDropDown();
  if (res.success) {
    roleOptions.value = res.data
  }
}
const getUserById = async (id: string) => {
  try {
    loading.setLoading(true);
    const data: any = await userServiceApi._getDetail(id);
    if (data.success) {
      FullName.value = data.data.fullName;
      Email.value = data.data.email;
      Birthday.value = data.data.birthday;
      Phone.value = data.data.phone;
      RoleId.value = data.data.roleId;
    } else {
      showWarningsNotification(data.message);
    }
  } catch (error) {
    console.error("Error fetching product detail:", error);
  } finally {
    loading.setLoading(false);
  }
};

const submit = handleSubmit(async () => {
  try {
    if (!props.itemEdit) {
      const formData = new FormData();
      formData.append("FullName", FullName.value as string);
      formData.append("Email", Email.value as string);
      formData.append("Birthday", Birthday.value as string);
      formData.append("Phone", Phone.value as string);
      formData.append("RoleId", RoleId.value as string);
      formData.append("file", file.value.raw as any);
      const res = await userServiceApi.create(formData);
      if (res.success) {
        emits("close");
        emits("loadData");
        showSuccessNotification(res.message)
      }
      else {
        showErrorNotification(res.message)
      }
    } else {
      const formData = new FormData();
      formData.append("Id", props.itemEdit as string);
      formData.append("FullName", FullName.value as string);
      formData.append("Email", Email.value as string);
      formData.append("Birthday", Birthday.value as string);
      formData.append("Phone", Phone.value as string);
      formData.append("RoleId", RoleId.value as string);
      formData.append("file", file.value ? file.value.raw : null);
      const res = await userServiceApi.update(props.itemEdit, formData);
      if (res.success) {
        emits("close");
        emits("loadData");
        showSuccessNotification(res.message)
      }
      else {
        showErrorNotification(res.message)
      }
    }
  } catch (error: any) {
    showErrorNotification(error.message)
  }
})


const handleFileChange = (image: any) => {
  file.value = image
};

</script>
