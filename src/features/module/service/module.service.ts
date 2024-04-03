import { IBodyResponse } from "../../../common/interface/interfaces";
import axiosInstance, { ApiService } from "../../../plugins/axios";

class ModuleApiService extends ApiService {
  async create(formData: FormData): Promise<IBodyResponse<any>> {
    return await this.client.post(`${this.baseUrl}`, formData);
  }
  async update(id: string, formData: FormData): Promise<IBodyResponse<any>> {
    return await this.client.patch(`${this.baseUrl}/${id}`, formData);
  }
  async getMouduleByToken(): Promise<IBodyResponse<any>> {
    return await this.client.get(`${this.baseUrl}`+'/getMoudlueByRoleId');
  }
}
export const moduleServiceApi = new ModuleApiService(
  { baseUrl: "/Module" },
  axiosInstance
);
