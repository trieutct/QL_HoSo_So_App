import { defineStore } from "pinia";
import { ref } from "vue";
import { dashboardSoHoSoServiceApi } from "../service/dashboard.service";
import { IHoso } from "../../HoSo/interface";
export interface ITem {
  name: string;
  count: number;
}
export const useDashboardDocStore = defineStore("dashboardDocStore", () => {
  const totalKho = ref<number>(0);
  const totalUser = ref<number>(0);
  const totalHoso = ref<number>(0);
  const hosoTheoLoaiHoSo = ref<ITem[]>([]);
  const hosoTheoLoaiVanBan = ref<ITem[]>([]);
  const expricedHoSo = ref<IHoso[]>([]);
  const userByRole = ref<IHoso[]>([]);

  async function getInfoDashboard() {
    const res: any = await dashboardSoHoSoServiceApi.get();
    if (res.success) {
      totalKho.value = res.data.totalKho;
      totalUser.value = res.data.totalUser;
      totalHoso.value = res.data.totalHoso;
      hosoTheoLoaiHoSo.value = res.data.hosoTheoLoaiHoSo;
      hosoTheoLoaiVanBan.value = res.data.hosoTheoLoaiVanBan;
      expricedHoSo.value = res.data.expricedHoSo;
      userByRole.value = res.data.userByRole;
    }
  }
  return {
    totalKho,
    totalUser,
    totalHoso,
    getInfoDashboard,
    hosoTheoLoaiVanBan,
    hosoTheoLoaiHoSo,
    expricedHoSo,
    userByRole,
  };
});
