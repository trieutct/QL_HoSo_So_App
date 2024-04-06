import { ref } from "vue";
import { DEFAULT_COMMON_LIST_QUERY } from "../../common/contants/contants";
import { IOperation } from "./interface";
import { showErrorNotification } from "../../common/helper/helpers";
import { useLoadingTableStore } from "../loading/store/loading_table";
import { operationerviceApi } from "./service/operation.service";
export const useOpearation = () => {
  const loading = useLoadingTableStore();
  const operations = ref<IOperation[]>([]);
  const query = DEFAULT_COMMON_LIST_QUERY;
  const getDataOperations = async (id: string) => {
    try {
      const res = await operationerviceApi.getOperationByModuleId(id);
      if (res.success) return res.data;
      else {
        showErrorNotification(res.message);
        return null;
      }
    } catch (error) {
      console.error("Error getDataOperations operation.ts:", error);
      return null;
    } finally {
      loading.setLoading(false);
    }
  };
  return {
    operations,
    query,
    getDataOperations,
  };
};
