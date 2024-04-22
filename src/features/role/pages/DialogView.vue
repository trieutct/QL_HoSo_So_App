<template>
    <el-dialog style="border-radius: 5px !important;" :title="props.itemEdit ? t('role.form.update') : t('role.form.add')"
        width="700">
        <el-row :gutter="20">
            <el-col :span="24">
                <p>{{ t('role.form.code') }}
                    <span class="text-red-500">*</span>
                </p>
                <el-input :disabled="props.itemEdit" v-model="Code" size="large" style="width: 100%"
                    placeholder="Mã quyền" />
                <span class="text-red-500 ml-2">{{ CodeError }}</span>
            </el-col>
            <el-col class="mt-4" :span="24">
                <p>{{ t('role.form.name') }}
                    <span class="text-red-500">*</span>
                </p>
                <el-input v-model="name" size="large" style="width: 100%" placeholder="Tên quyền" />
                <span class="text-red-500 ml-2">{{ nameError }}</span>
            </el-col>
            <el-col class="mt-4" :span="24">
                <p>{{ t('role.form.operation') }}
                    <span class="text-red-500">*</span>
                </p>
                <el-select size="large" v-model="opeationIds" multiple filterable allow-create default-first-option
                    :reserve-keyword="false" placeholder="Chọn thao tác chức năng">
                    <el-option v-for="item in operations" :key="item.value" :label="item.text" :value="item.value" />
                </el-select>
            </el-col>
        </el-row>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="emits('close')">{{ t('role.button.cancel') }}</el-button>
                <el-button @click="submit" type="primary">
                    {{ props.itemEdit ? t('role.button.update') : t('role.button.create') }}
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>
<script setup>
import { useForm, useField } from 'vee-validate';
import * as yup from 'yup';
import { useI18n } from 'vue-i18n';
import { MESSAGE_ERROR, Regex } from '../../../common/contants/contants';
import { showErrorNotification, showSuccessNotification } from '../../../common/helper/helpers';
import { roleServiceApi } from '../service/role.service';
import { useLoadingStore } from '../../loading/store/index'
import { watch, ref, onMounted } from 'vue'
import { operationerviceApi } from '../../operation/service/operation.service';
const props = defineProps(['itemEdit'])
const emits = defineEmits(['close', 'loadData'])
const { t } = useI18n()
watch(() => props.itemEdit, (newValue) => {
    resetForm()
    if (props.itemEdit !== null) {
        getquyenById(newValue)
    }
});
const getquyenById = async (id) => {
    try {
        loading.setLoading(true)
        const data = await roleServiceApi._getDetail(id);
        console.log(data)
        if (data.success) {
            name.value = data.data.role.name;
            Code.value = data.data.role.code;
            opeationIds.value = data.data.operationIds
        }
        else {
            showWarningsNotification(data.message)
        }
    } catch (error) {
        console.error('Error fetching role detail:', error);
    } finally {
        loading.setLoading(false)
    }
}

const loading = useLoadingStore()
const { handleSubmit, resetForm } = useForm();

const { value: Code, errorMessage: CodeError } = useField(
    'Code',
    yup
        .string()
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
            // console.log(opeationIds.value)
            formData.append('Code', Code.value + "");
            formData.append('Name', name.value + "");
            formData.append('operationIds', opeationIds.value + "");
            loading.setLoading(true)
            const res = await roleServiceApi.create(formData)
            if (res.success) {
                emits('close')
                emits('loadData')
                showSuccessNotification("Tạo mới quyền thành công")
            }
            else {
                showErrorNotification(res.message)
            }
        }
        else {
            const formData = new FormData();
            formData.append('Id', props.itemEdit);
            formData.append('Code', Code.value + "");
            formData.append('Name', name.value + "");
            formData.append('operationIds', opeationIds.value);
            loading.setLoading(true)
            const res = await roleServiceApi.update(props.itemEdit, formData)
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



onMounted(async () => {
    await getDropdownOperations()
})
const opeationIds = ref([])
const operations = ref(null)
const getDropdownOperations = async () => {
    const res = await operationerviceApi._getDropDown();
    if (res?.success)
        operations.value = res?.data
}
</script>