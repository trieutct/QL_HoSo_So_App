<template>
  <h2 class="text-main font-semibold text-xl">Phân quyền vai trò</h2>
  <div class="w-full mt-5">
    <el-collapse class="w-full flex flex-wrap">
      <el-collapse-item
        v-model="list"
        v-for="i in moudle_operations"
        :key="i"
        class="w-1/4"
        :title="i.name"
        :name="i"
      >
        <el-select
          multiple
          filterable
          allow-create
          default-first-option
          :reserve-keyword="false"
          placeholder="Chọn"
          style="width: 240px"
        >
          <el-option
            @click="addValue(item.id)"
            v-for="item in i.operations"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { moduleServiceApi } from "../../module/service/module.service";
const moudle_operations = ref<[] | any>([]);

const load = async () => {
  const res = await moduleServiceApi.getMoudle_Operation();
  moudle_operations.value = res.data;
};
onMounted(() => {
  load();
});
const list = ref<string[]>([]);
const addValue = async (id: string) => {
  list.value.push(id);
};
</script>

<style scoped></style>
