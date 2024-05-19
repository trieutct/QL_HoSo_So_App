import { ref } from "vue";
import { DEFAULT_COMMON_LIST_QUERY } from "../../common/contants/contants";
import { IUser } from "./interface";
import { showErrorNotification } from "../../common/helper/helpers";
import { useLoadingTableStore } from "../loading/store/loading_table";
import { userServiceApi } from "./service/user.service";

export const useUser = () => {
  const loading = useLoadingTableStore();
  const users = ref<IUser[]>([]);
  const query = DEFAULT_COMMON_LIST_QUERY;
  const getDataUsers = async () => {
    try {
      const res = await userServiceApi._getList<IUser>(query);
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
      console.error("Error getDataUsers kho.ts:", error);
      return null;
    } finally {
      loading.setLoading(false);
    }
  };
  return {
    users,
    query,
    getDataUsers,
  };
};
