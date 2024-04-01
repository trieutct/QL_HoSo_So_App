<template>
  <el-dialog align-center
    title="Xác nhận"
    width="500"
  >
    <span class="text-red-500">
      Bạn có chắc chắn muốn xóa không?
    </span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="emits('close')">Hủy</el-button>
        <el-button type="primary" @click="emits('deleteItem',props.idDelete)">
          Xóa
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script setup>
const props = defineProps(['idDelete'])
const emits = defineEmits(['close','deleteItem'])
</script>