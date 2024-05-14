<template>
  <el-table border :data="tableData" style="width: 100%" header-row-class-name="table-header">
    <el-table-column prop="groupName" label="Date" width="150" />
    <el-table-column prop="name" label="Name" width="120" />
    <el-table-column v-for="(i) in 4" :key="i" :label="i" width="120" :class-name="`custom-red-background-${i % 2}`">
      <el-table-column prop="type" :label="i + 1" width="120">
        <template #default="scope">
          {{ scope.row }}
          {{ i }}
        </template>
      </el-table-column>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
const tableData = [
  {
    groupName: "Công việc",
    name: "Làm task",
    type: "point1",
    value: "4",
  },
  {
    groupName: "Công việc",
    name: "Task vượt level",
    type: "point2",
    value: "4",
  },
  {
    groupName: "Thái độ",
    name: "Thái độ xử lý vấn đề",
    type: "point3",
    value: "4",
  },
  {
    groupName: "Thái độ",
    name: "Đề xuất cả tiến",
    type: "point4",
    value: "4",
  },
];
</script>
<style scoped lang="scss">
:deep(.table-header) {
  .custom-red-background-1 {
    background-color: #687182 !important;
    color: white;
  }

  .custom-red-background-0 {
    background-color: #faad14 !important;
    color: white;
  }
}
</style>
