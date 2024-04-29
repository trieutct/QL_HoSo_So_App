import { ref } from "vue";
import { DEFAULT_COMMON_LIST_QUERY } from "../../common/contants/contants";
import { IHoso } from "./interface";
import { hosoServiceApi } from "./service/hoso.service";
import { showErrorNotification } from "../../common/helper/helpers";
import { useLoadingTableStore } from "../loading/store/loading_table";

export const useHoso = () => {
  const loading = useLoadingTableStore();
  const hosos = ref<IHoso[]>([]);
  const query = {
    ...DEFAULT_COMMON_LIST_QUERY,
  };
  const getDataHosos = async () => {
    try {
      const res = await hosoServiceApi._getList<IHoso>(query);
      loading.setLoading(true);
      if (res.success)
        return {
          data: res.data.items,
          totalItems: res.data.totalItems,
        };
      else {
        showErrorNotification(res.message);
        return null;
      }
    } catch (error) {
      console.error("Error getDataDay kho.ts:", error);
      return null;
    } finally {
      loading.setLoading(false);
    }
  };
  return {
    hosos,
    query,
    getDataHosos,
  };
};
