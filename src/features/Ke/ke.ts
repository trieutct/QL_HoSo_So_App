import { ref } from "vue"
import { DEFAULT_COMMON_LIST_QUERY } from "../../common/contants/contants"
import { IKe } from "./interface"
import { keServiceApi } from "./service/ke.service" 
import { showErrorNotification } from "../../common/helper/helpers";
import { useLoadingTableStore } from "../loading/store/loading_table";


export const useKe = () => {
    const loading=useLoadingTableStore()
    const kes = ref<IKe[]>([])
    const query={
        ...DEFAULT_COMMON_LIST_QUERY,
        MaKho:''
    }
    const getDataKes = async () => {
        try {
          const res = await keServiceApi._getList<IKe>(query);
          loading.setLoading(true)
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
          console.error('Error getDataKes kho.ts:', error);
          return null
        }finally{
            loading.setLoading(false)
        }
      };
      return {
        kes,
        query,
        getDataKes
      };
};