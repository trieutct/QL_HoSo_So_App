import { ref } from "vue";
import { DEFAULT_COMMON_LIST_QUERY } from "../../common/contants/contants";
import { ILoaiVanBan } from "./interface";
import { loaiVanBanServiceApi } from "./service/loaivanban.service";
import { showErrorNotification } from "../../common/helper/helpers";
import { useLoadingTableStore } from "../loading/store/loading_table";

export const useLoaiVanBan = () => {
  const loading = useLoadingTableStore();
  const loaiVanBans = ref<ILoaiVanBan[]>([]);
  const query = DEFAULT_COMMON_LIST_QUERY;
  const getDataLoaiVanBan = async () => {
    try {
      const res: any = await loaiVanBanServiceApi._getList<ILoaiVanBan>(query);
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
    loaiVanBans,
    query,
    getDataLoaiVanBan,
  };
};
