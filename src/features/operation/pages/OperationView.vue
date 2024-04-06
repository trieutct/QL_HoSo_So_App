<template>
  <el-dialog  width="1000">
    <div class="w-full ">
      <el-button @click="openDialog" class="mb-2 mr-5" type="primary">
        <i class="ri-add-line text-xl font-bold"></i>
      </el-button>
    </div>
    <el-table fixed :data="operations">
      <el-table-column prop="name" label="Tên Thao Tác" width="200" />
      <el-table-column prop="location" label="Vị Trí" width="200" />
      <el-table-column prop="url" label="Đường dẫn" width="160" />
      <el-table-column prop="isShow" label="Hiển Thị" width="280">
        <template #default="scope">
          <p v-if="scope.row.isShow" class="text-green-500 font-bold">Hiển thị</p>
          <p v-else class="text-yellow-500 font-bold">Ẩn</p>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="Hành Động" width="150">
        <template #default="scope">
          <el-button type="warning" :icon="Edit" circle  @click="handleEdit(scope.row)"/>
                    <el-button type="danger" :icon="Delete" circle  @click="idDelete=scope.row.id;showDialogDelete=true"/>
        </template>
      </el-table-column>
    </el-table>
    <DialogView v-model="showDialog" :moduleId="props.itemid" :itemEdit="idEdit" @close="closeDialog" @loadData="loadData" />
    <ConfirmView v-model="showDialogDelete" @deleteItem="deleteKho" :idDelete="idDelete" @close="closeDialog"/>
  </el-dialog>
</template>
<script lang="ts" setup>
import ConfirmView from '../../../layouts/components/ConfirmView.vue'
import DialogView from './DialogView.vue';
import { Edit, Delete } from '@element-plus/icons-vue'
import { watch,ref } from 'vue'
import { useOpearation } from '../operation';
import { operationerviceApi } from '../service/operation.service';
import { showErrorNotification, showSuccessNotification } from '../../../common/helper/helpers';
const { operations, getDataOperations } = useOpearation()
const idEdit=ref(null)
const idDelete=ref(null)
const showDialog = ref(false)
const showDialogDelete = ref(false)
const props = defineProps(['itemid'])
watch(() => props.itemid, async (newVal: string) => {
  if (newVal != null) {
    await loadData(newVal)
  }

})
const loadData = async (id: string) => {
  const res = await getDataOperations(id)
  if (res) {
    operations.value = res;
    return
  }
  operations.value = []
}

const deleteKho=async(id:string)=>{
    try{
        const res:any=await operationerviceApi._delete(id)
        if(res.success)
        {
            showSuccessNotification(res.message)
            await loadData(props.itemid)
            closeDialog()
        }
        else
        {
            showErrorNotification(res.message)
        }
    }catch(error:any){
        showErrorNotification(error.message)
    }
}

const handleEdit=(item:any)=>{
    showDialog.value=true
    idEdit.value=(item.id)
}

const openDialog=()=>{
    showDialog.value=true
    idEdit.value=null
}
const closeDialog=()=>{
    showDialog.value=false
    idEdit.value=null
    showDialogDelete.value=false
}
</script>