import { ref } from "vue";
import { DEFAULT_COMMON_LIST_QUERY } from "../../common/contants/contants";
import { IHop } from "./interface";
import { hopServiceApi } from "./service/hop.service";
import { showErrorNotification } from "../../common/helper/helpers";
import { useLoadingTableStore } from "../loading/store/loading_table";

export const useHop = () => {
  const loading = useLoadingTableStore();
  const kes = ref<IHop[]>([]);
  const query = {
    ...DEFAULT_COMMON_LIST_QUERY,
    MaKho: "",
  };
  const getDataHops = async () => {
    try {
      const res = await hopServiceApi._getList<IHop>(query);
      console.log(res);

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
      console.error("Error getDataKes kho.ts:", error);
      return null;
    } finally {
      loading.setLoading(false);
    }
  };
  return {
    kes,
    query,
    getDataHops,
  };
};
