<template>
    <h2 class="text-main font-semibold text-xl">Quản lý vài trò</h2>
    <div class="flex mt-5">
        <div class="w-8/12 flex">
            <el-input v-model="search" @keyup.enter="searchData" style="width: 30%;" size="large" placeholder="Tìm kiếm"
                :prefix-icon="Search" />
        </div>
        <div class="w-4/12 flex justify-end">
            <el-button @click="openDialog" type="primary" size="large">
                <i class="ri-add-line text-xl font-bold"></i>
            </el-button>
        </div>
    </div>
    <div class="custom-table mt-8">
        <div v-show="multipleSelection.length > 0" class="mb-2 text-xs">
            <span class="text-slate-500 mr-2">{{ multipleSelection.length }} lựa chọn</span>
            <el-button type="danger" @click="deleteMultiple(multipleSelection)" :icon="Delete" circle />
        </div>


        <el-table ref="multipleTableRef" @selection-change="handleSelectionChange" v-loading="loading.isLoading"
            :height="'calc(100vh - 220px)'" :data="roles" border width="100%">
            <!-- <el-table  v-loading="loading.isLoading" :height="'calc(100vh - 220px)'" :data="roles" border width="100%"> -->
            <el-table-column fixed type="selection" width="55" />
            <!-- <el-table-column type="expand">
                <template #default="props">
                    
                </template>
            </el-table-column> -->
            <el-table-column prop="code" label="Mã Quyền" width="200" />
            <el-table-column prop="name" label="Quyền" width="300" />
            <el-table-column fixed="right" label="Hành Động" width="200">
                <template #default="scope">
                    <el-popover lacement="top" :width="100" trigger="hover" content="Cài đặt chức năng">
                        <template #reference>
                            <el-button type="info" :icon="Setting" circle />
                        </template>
                    </el-popover>
                    <el-button type="warning" :icon="Edit" circle @click="handleEdit(scope.row)" />
                    <el-button type="danger" :icon="Delete" circle
                        @click="idDelete = scope.row.id; showDialogDelete = true" />
                </template>
            </el-table-column>
        </el-table>
        <div class="mt-5 flex items-center">
            <div class="w-[15%]">
                <p style="color: #5b6178;" class="text-sm">Tổng số bản ghi: <span style="color: #454a5f">{{
                Total }}</span>
                </p>
            </div>
            <div class="w-full flex justify-end">
                <el-pagination v-model:current-page="page" prev-text background layout="prev, pager, next"
                    :total="TotalKho" />
                <el-select class="ml-2" v-model="selectedPage" style="width: 60px">
                    <el-option v-model="selectedPage" v-for="item in options" :key="item.value" :label="item.label"
                        :value="item.value" />
                </el-select>
                <div class="ml-2 mr-5 flex items-center">
                    <span class="text-sm mr-1" style="color:#5b6178 ">Trang</span>
                    <el-input v-model="page" style="width: 30px" />
                </div>
            </div>
        </div>
        <DialogView v-model="showDialog" :itemEdit="idEdit" @close="closeDialog" @loadData="loadData" />
        <ConfirmView v-model="showDialogDelete" @deleteItem="deleteKho" :idDelete="idDelete" @close="closeDialog" />
    </div>
</template>
<script lang="ts" setup>
import DialogView from './DialogView.vue';
import ConfirmView from '../../../layouts/components/ConfirmView.vue'
import { ref, onMounted, watch } from 'vue'
import { Search, Edit, Delete, Setting } from '@element-plus/icons-vue'
import { DEFAULT_LIMIT_FOR_PAGINATION, OPTION_SELECTED_PAGE } from '../../../common/contants/contants';
import { useRole } from '../role'
import { useLoadingTableStore } from '../../loading/store/loading_table';
import { roleServiceApi } from '../service/role.service';
import { showErrorNotification, showSuccessNotification } from '../../../common/helper/helpers';

const idEdit = ref(null)
const idDelete = ref(null)
const loading = useLoadingTableStore()


const { query, getDataRoles, roles } = useRole()
const showDialog = ref(false)
const showDialogDelete = ref(false)
const options = OPTION_SELECTED_PAGE
const page = ref(1)
const TotalKho = ref(0)
const Total = ref(0)
const selectedPage = ref(DEFAULT_LIMIT_FOR_PAGINATION)
const search = ref(null)




onMounted(async () => {
    query.keyword = undefined
    query.page = 1
    query.limit = selectedPage.value
    loadData()
})
watch(selectedPage, (newVal: any) => {
    query.limit = newVal
    query.page = 1
    page.value = 1
    loadData()
})
watch(page, (newVal: number) => {
    query.page = newVal
    loadData()
})
const loadData = async () => {
    query.keyword = search.value ? search.value : undefined
    const res: any = await getDataRoles()
    if (res.data) {
        roles.value = res.data;
        TotalKho.value = Math.ceil(res.totalItems / selectedPage.value) * 10;
        Total.value = res.totalItems;
        return
    }
    roles.value = []
}

const searchData = async () => {
    if (search.value == null || search.value === '') {
        search.value = null
        query.keyword = search.value ? search.value : undefined
    }
    else
        query.keyword = search.value
    loadData()
}
const deleteKho = async (id: string) => {
    try {
        const res: any = await roleServiceApi._delete(id)
        if (res.success) {
            showSuccessNotification(res.message)
            loadData()
            closeDialog()
        }
        else {
            showErrorNotification(res.message)
        }
    } catch (error: any) {
        showErrorNotification(error.message)
    }
}

const handleEdit = (item: any) => {
    showDialog.value = true
    idEdit.value = (item.id)
}

const openDialog = () => {
    showDialog.value = true
    idEdit.value = null
}
const closeDialog = () => {
    showDialog.value = false
    idEdit.value = null
    showDialogDelete.value = false
}



//xóa multiple
import { ElTable } from 'element-plus'
import { IRole } from '../interface';
const multipleTableRef = ref<InstanceType<typeof ElTable>>()
const multipleSelection = ref<string[] | any>([])
const handleSelectionChange = (val: IRole[]) => {
    multipleSelection.value = val.map(item => item.id);
}

const deleteMultiple = async (list_id: any) => {
    try {
        const res: any = await roleServiceApi._softDeleteMutiple(list_id)
        if (res.success) {
            showSuccessNotification(res.message)
            loadData()
        }
        else {
            showErrorNotification(res.message)
        }
    } catch (error) {
        showErrorNotification("Errro deleteMultiple KhoView page")
    }
}




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