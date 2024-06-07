<template>
    <el-card v-if="user" class="user-profile-card" shadow="hover">
        <div class="user-profile-header">
            <el-avatar :src="user.imageUrl" size="large" class="user-avatar" />
            <div class="user-info">
                <h2>{{ user.fullName }}</h2>
                <el-tag type="info">{{ nameRole }}</el-tag>
            </div>
            <el-button type="primary" @click="showEdit = true" class="edit-button">Chỉnh sửa</el-button>
        </div>
        <el-divider></el-divider>
        <el-descriptions title="Thông tin hồ sơ" :column="1" border>
            <el-descriptions-item label="Email">{{ user.email }}</el-descriptions-item>
            <el-descriptions-item label="Birthday">{{ user?.birthday !== 'undefined' ? user?.birthday : "-"
                }}</el-descriptions-item>
            <el-descriptions-item label="Phone">{{ user.phone }}</el-descriptions-item>
        </el-descriptions>
    </el-card>
    <UpdateProfile @loadData="getProfile()" v-model="showEdit" :itemEdit="idEdit" v-if="user" />
</template>
<script lang="ts" setup>
import { useRoute } from "vue-router";
import { onBeforeMount, ref, watch } from 'vue'
import { IUser } from "../interface";
import { userServiceApi } from "../service/user.service";
import { roleServiceApi } from "../../role/service/role.service";
import UpdateProfile from "./UpdateProfile.vue"
const showEdit = ref<boolean>(false)
const route = useRoute();
const idEdit = ref();
onBeforeMount(async () => {
    await getProfile()
});
const nameRole = ref<string>('-')
const user = ref<IUser>();
async function getProfile() {
    showEdit.value = false;
    const res: any = await userServiceApi._getDetail(route.params.id);
    if (res.success) {
        user.value = res.data
        await getRole(user.value.roleId)
    }
}
async function getRole(roleId: string): Promise<string> {
    const res: any = await roleServiceApi._getDetail(roleId);
    if (res?.success) {
        nameRole.value = res.data.role.name
    }
    else
        nameRole.value = "-"
}
watch(showEdit, (newVal: any) => {
    if (newVal) {
        idEdit.value = user.value.id
    } else {
        idEdit.value = null
    }
})
</script>

<style scoped>
.user-profile-card {
    max-width: 600px;
    margin: 20px auto;
    padding: 20px;
    background: #ffffff;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.user-profile-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
}

.user-avatar {
    border: 3px solid #409eff;
}

.user-info {
    flex: 1;
    margin-left: 20px;
}

.user-info h2 {
    margin: 0;
    font-size: 24px;
    font-weight: 700;
}

.user-info .el-tag {
    margin-top: 5px;
}

.edit-button {
    margin-left: 20px;
}

.el-descriptions__label {
    font-weight: 700;
}
</style>