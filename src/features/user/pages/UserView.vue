<template>
    <h2 class="text-main font-semibold text-xl">{{ t('user.title.title') }}</h2>
    <div class="flex mt-5">
        <div class="w-8/12 flex">
            <el-input v-model="value" style="width: 30%;" size="large" placeholder="Tìm kiếm" :prefix-icon="Search" />
            <el-select class="ml-2" size="large" v-model="value" multiple clearable collapse-tags placeholder="Select"
                popper-class="custom-header" :max-collapse-tags="1" style="width: 30%;">
                <template #header>
                    <el-checkbox v-model="checkAll" :indeterminate="indeterminate" @change="handleCheckAll">
                        All
                    </el-checkbox>
                </template>
                <el-option v-for="item in cities" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
            <el-select class="ml-2" size="large" v-model="value" multiple clearable collapse-tags placeholder="Select"
                popper-class="custom-header" :max-collapse-tags="1" style="width: 30%;">
                <template #header>
                    <el-checkbox v-model="checkAll" :indeterminate="indeterminate" @change="handleCheckAll">
                        All
                    </el-checkbox>
                </template>
                <el-option v-for="item in cities" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
        </div>
        <div class="w-4/12 flex justify-end">
            <el-button @click="showDialog = true" type="primary" size="large">
                <i class="ri-add-line text-xl font-bold"></i>
            </el-button>
        </div>
    </div>
    <div class="custom-table mt-10">
        <div class="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 gap-4 h-[calc(100vh-220px)] overflow-auto">
            <div v-for="i in 10" :key="i"
                class="hover-border-red lg:w-3/9 min-h-[200px] rounded-md flex flex-col items-center border border-neutral-300 hover:cursor-pointer relative">
                <div class="mt-5 relative">
                    <el-avatar style="width: 60px;height: 60px;"
                        src="https://scontent.fhan14-5.fna.fbcdn.net/v/t39.30808-6/431664450_3808572406136738_6223671059774018184_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=5f2048&_nc_ohc=ZW_6ILBTsHAAX83Fn-q&_nc_ht=scontent.fhan14-5.fna&oh=00_AfCwKJRrLGIuWzCy7GOqwGt6Dd3Dcjr8w-MA2kxU5m1eZw&oe=66059010" />
                    <div class="absolute top-0 right-0 h-3 w-3 bg-dot rounded-full "></div>
                </div>
                <p class="font-bold mt-2">Trịnh Công Triệu</p>
                <div class="text-zinc-500 text-sm mt-2 flex flex-col items-center">
                    <p>trinhcongtrieu2972002@gmail.com</p>
                    <p>0941590356</p>
                </div>
                <div class="absolute right-1 top-1">
                    <div class="flex flex-col">
                        <div class="relative">
                            <el-button class="w-[5px] h-[5px]" size="small" plain :icon="Edit"
                                @mouseover="showContentEdit = true" @mouseleave="showContentEdit = false">
                            </el-button>
                            <p v-if="showContentEdit" class="button-edit w-[80px] text-xs" style="text-align: center;">Chỉnh sửa</p>
                        </div>
                        <div class="mt-1">
                            <el-button @mouseover="showContentPassword = true" @mouseleave="showContentPassword = false" class="w-[5px] h-[5px] relative" size="small" plain>
                                <i class="ri-lock-line"></i>
                            </el-button>
                            <span v-if="showContentPassword" class="button-password w-[120px] text-xs" style="text-align: center;">Đặt lại mật khẩu</span>
                        </div>
                        <div class="mt-1">
                            <el-button class="w-[5px] h-[5px]" size="small" plain :icon="MoreFilled" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="mt-5 flex items-center">
            <div class="w-[15%]">
                <p style="color: #5b6178;" class="text-sm">Tổng số bản ghi: <span style="color: #454a5f">13</span></p>
            </div>
            <div class="w-full flex justify-end">
                <el-pagination background layout="prev, pager, next" :total="50" />
                <el-select class="ml-2" v-model="number" style="width: 60px">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    />
                </el-select>
                <div class="ml-2 mr-5 flex items-center">
                    <span class="text-sm mr-1" style="color:#5b6178 ">Trang</span>
                    <el-input v-model="page" style="width: 30px"  />
                </div>
            </div>
        </div>
        <DialogView v-model="showDialog" />
    </div>
</template>
<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
const {t}=useI18n();
import DialogView from './DialogView.vue';
import { ref, watch } from 'vue'
import { Search, Edit, MoreFilled } from '@element-plus/icons-vue'

const showContentEdit = ref(false)
const showContentPassword= ref(false)

const showDialog = ref(false)




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


const number=ref(10)
const page=ref(1)
const options = [
  {
    value: '10',
    label: '10',
  },
  {
    value: '20',
    label: '20',
  }
]
</script>

<style scoped>
.hover-border-red:hover {
    border-color: #00f;
}

.button-edit {
    display: none;
    position: absolute;
    top:-150% !important;
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
    right:120% !important;
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