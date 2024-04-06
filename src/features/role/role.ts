import { ref } from "vue"
import { DEFAULT_COMMON_LIST_QUERY } from "../../common/contants/contants"
import { IRole } from "./interface"
import { roleServiceApi } from "./service/role.service" 
import { showErrorNotification } from "../../common/helper/helpers";
import { useLoadingTableStore } from "../loading/store/loading_table";


export const useRole = () => {
    const loading=useLoadingTableStore()
    const roles = ref<IRole[]>([])
    const query=DEFAULT_COMMON_LIST_QUERY
    const getDataRoles = async () => {
        try {
          const res = await roleServiceApi._getList<IRole>(query);
          loading.setLoading(true)
        //   console.log(res)
          if(res.success)
            return {
              data:res.data.items,
              totalItems:res.data.totalItems
            }
            else
            {
                showErrorNotification(res.message)
                return null
            }
        } catch (error) {
          console.error('Error getDataRoles kho.ts:', error);
          return null
        }finally{
            loading.setLoading(false)
        }
      };
      return {
        roles,
        query,
        getDataRoles
      };
};