import { ref } from "vue";
import { DEFAULT_COMMON_LIST_QUERY } from "../../common/contants/contants";
import { IKho } from "./interface";
import { KhoServiceApi } from "./service/kho.service";
import { showErrorNotification } from "../../common/helper/helpers";
import { useLoadingTableStore } from "../loading/store/loading_table";

export const useKho = () => {
  const loading = useLoadingTableStore();
  const khos = ref<IKho[]>([]);
  const query = DEFAULT_COMMON_LIST_QUERY;
  const getDataKhos = async () => {
    try {
      const res = await KhoServiceApi._getList<IKho>(query);
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
      console.error("Error getDataKhos kho.ts:", error);
      return null;
    } finally {
      loading.setLoading(false);
    }
  };
  return {
    khos,
    query,
    getDataKhos,
  };
};
