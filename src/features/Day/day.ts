import { ref } from "vue"
import { DEFAULT_COMMON_LIST_QUERY } from "../../common/contants/contants"
import { IDay } from "./interface"
import { dayServiceApi } from "./service/day.service" 
import { showErrorNotification } from "../../common/helper/helpers";
import { useLoadingTableStore } from "../loading/store/loading_table";


export const useDay = () => {
    const loading=useLoadingTableStore()
    const days = ref<IDay[]>([])
    const query={
      ...DEFAULT_COMMON_LIST_QUERY,
      MaKho: ""
    }
    const getDataDays = async () => {
        try {
          const res = await dayServiceApi._getList<IDay>(query);
          // console.log(query)
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
          console.error('Error getDataDay kho.ts:', error);
          return null
        }finally{
            loading.setLoading(false)
        }
      };
      return {
        days,
        query,
        getDataDays
      };
};