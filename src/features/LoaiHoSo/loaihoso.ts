import { ref } from "vue";
import { DEFAULT_COMMON_LIST_QUERY } from "../../common/contants/contants";
import { ILoaiHoSo } from "./interface";
import { loaiHoSoHoSoServiceApi } from "./service/LoaiHoSo.service";
import { showErrorNotification } from "../../common/helper/helpers";
import { useLoadingTableStore } from "../loading/store/loading_table";

export const useLoaiHoSo = () => {
  const loading = useLoadingTableStore();
  const loaiHosSos = ref<ILoaiHoSo[]>([]);
  const query = DEFAULT_COMMON_LIST_QUERY;
  const getDataLoaiHoSo = async () => {
    try {
      const res: any = await loaiHoSoHoSoServiceApi._getList<ILoaiHoSo>(query);
      loading.setLoading(true);
      if (res.success)
        return {
          data: res.data,
          totalItems: res.data.length,
        };
      else {
        showErrorNotification(res.message);
        return null;
      }
    } catch (error) {
      console.error("Error getDataLoaiHoSo kho.ts:", error);
      return null;
    } finally {
      loading.setLoading(false);
    }
  };
  return {
    loaiHosSos,
    query,
    getDataLoaiHoSo,
  };
};
