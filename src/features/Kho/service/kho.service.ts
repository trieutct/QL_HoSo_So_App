import { IBodyResponse } from "../../../common/interface/interfaces";
import axiosInstance, { ApiService } from "../../../plugins/axios";

class KhoApiService extends ApiService{
    async create(formData: FormData): Promise<IBodyResponse<any>> {
        return await this.client.post(`${this.baseUrl}`, formData);
      }

      async update(
        id: string,
        formData: FormData
      ): Promise<IBodyResponse<any>> {
        return await this.client.put(`${this.baseUrl}/${id}`, formData);
      }
}


export const KhoServiceApi = new KhoApiService({ baseUrl: '/Kho' }, axiosInstance);