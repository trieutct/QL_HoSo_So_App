import { defineStore } from "pinia";
import { ref } from "vue";
import { dashboardSoHoSoServiceApi } from "../service/dashboard.service";
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

  async function getInfoDashboard() {
    const res: any = await dashboardSoHoSoServiceApi.get();
    if (res.success) {
      totalKho.value = res.data.totalKho;
      totalUser.value = res.data.totalUser;
      totalHoso.value = res.data.totalHoso;
      hosoTheoLoaiHoSo.value = res.data.hosoTheoLoaiHoSo;
      hosoTheoLoaiVanBan.value = res.data.hosoTheoLoaiVanBan;
    }
  }
  return {
    totalKho,
    totalUser,
    totalHoso,
    getInfoDashboard,
    hosoTheoLoaiVanBan,
    hosoTheoLoaiHoSo,
  };
});
