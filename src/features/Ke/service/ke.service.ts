import { IBodyResponse } from "../../../common/interface/interfaces";
import axiosInstance, { ApiService } from "../../../plugins/axios";

class KeApiService extends ApiService{
    async create(formData: FormData): Promise<IBodyResponse<any>> {
        return await this.client.post(`${this.baseUrl}`, formData);
      }
      async update(
        id: string,
        formData: FormData
      ): Promise<IBodyResponse<any>> {
        return await this.client.patch(`${this.baseUrl}/${id}`, formData);
      }
}


export const keServiceApi = new KeApiService({ baseUrl: '/Ke' }, axiosInstance);