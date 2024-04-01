<template>
  <h2 class="text-main font-semibold">Quản lý tài sản</h2>
  <div class="flex mt-5">
    <div class="w-8/12 flex">
      <el-input v-model="value" style="width: 240px;" size="large" placeholder="Tìm kiếm" :prefix-icon="Search" />
      <el-select class="ml-2" size="large" v-model="value" multiple clearable collapse-tags placeholder="Select"
        popper-class="custom-header" :max-collapse-tags="1" style="width: 240px">
        <template #header>
          <el-checkbox v-model="checkAll" :indeterminate="indeterminate" @change="handleCheckAll">
            All
          </el-checkbox>
        </template>
        <el-option v-for="item in cities" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-select class="ml-2" size="large" v-model="value" multiple clearable collapse-tags placeholder="Select"
        popper-class="custom-header" :max-collapse-tags="1" style="width: 240px">
        <template #header>
          <el-checkbox v-model="checkAll" :indeterminate="indeterminate" @change="handleCheckAll">
            All
          </el-checkbox>
        </template>
        <el-option v-for="item in cities" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </div>
    <div class="w-4/12 flex justify-end">
      <el-button type="primary" size="large">
        <i class="ri-add-line text-xl font-bold"></i>
      </el-button>
    </div>
  </div>
  <!-- <el-row >
    <e-col :span="16" :gutter="20">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input style="width: 240px;" size="large" placeholder="Tìm kiếm" :prefix-icon="Search" />
        </el-col>
        <el-col :span="8">
          <el-select size="large" v-model="value" multiple clearable collapse-tags placeholder="Select"
            popper-class="custom-header" :max-collapse-tags="1" style="width: 240px">
            <template #header>
              <el-checkbox v-model="checkAll" :indeterminate="indeterminate" @change="handleCheckAll">
                All
              </el-checkbox>
            </template>
            <el-option v-for="item in cities" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-col>
        <el-col :span="8">
          <el-select size="large" v-model="value" multiple clearable collapse-tags placeholder="Select"
            popper-class="custom-header" :max-collapse-tags="1" style="width: 240px">
            <template #header>
              <el-checkbox v-model="checkAll" :indeterminate="indeterminate" @change="handleCheckAll">
                All
              </el-checkbox>
            </template>
            <el-option v-for="item in cities" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-col>
      </el-row>


    </e-col>
    <el-col :span="8" style="text-align: right;" >
        <el-button type="primary" size="large">
        <i class="ri-add-line text-xl font-bold"></i>
      </el-button>
    </el-col>
  </el-row> -->
  <div class="custom-table mt-10">
    <el-table :data="tableData" border width="100%">
      <el-table-column fixed type="selection" width="55" />
      <el-table-column prop="date" label="Date" width="150" />
      <el-table-column prop="name" label="Name" width="120" />
      <el-table-column prop="state" label="State" width="120" />
      <el-table-column prop="city" label="City" width="120" />
      <el-table-column prop="address" label="Address" width="600" />
      <el-table-column prop="zip" label="Zip" width="120" />
      <el-table-column fixed="right" label="Operations" width="120">
        <template #default>
          <el-button link type="primary" size="small">Detail</el-button>
          <el-button link type="primary" size="small">Edit</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue'
import { Search } from '@element-plus/icons-vue'
const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Home',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Office',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Home',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Office',
  }, {
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Home',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Office',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Home',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Office',
  },
]




//select all
import type { CheckboxValueType } from 'element-plus'

const checkAll = ref(false)
const indeterminate = ref(false)
const value = ref<CheckboxValueType[]>([])
const cities = ref([
  {
    value: 'Beijing',
    label: 'Beijing',
  },
  {
    value: 'Shanghai',
    label: 'Shanghai',
  },
  {
    value: 'Nanjing',
    label: 'Nanjing',
  },
  {
    value: 'Chengdu',
    label: 'Chengdu',
  },
  {
    value: 'Shenzhen',
    label: 'Shenzhen',
  },
  {
    value: 'Guangzhou',
    label: 'Guangzhou',
  },
])

watch(value, (val) => {
  if (val.length === 0) {
    checkAll.value = false
    indeterminate.value = false
  } else if (val.length === cities.value.length) {
    checkAll.value = true
    indeterminate.value = false
  } else {
    indeterminate.value = true
  }
})

const handleCheckAll = (val: CheckboxValueType) => {
  indeterminate.value = false
  if (val) {
    value.value = cities.value.map((_) => _.value)
  } else {
    value.value = []
  }
}
</script>

<style scoped>
.custom-table .el-table {
  border-radius: 8px;
  overflow: hidden;
}

.custom-table .el-table {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>