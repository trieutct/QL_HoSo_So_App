import { IBodyResponse } from "../../../common/interface/interfaces";
import axiosInstance, { ApiService } from "../../../plugins/axios";

class OperationApiService extends ApiService {
  async create(formData: FormData): Promise<IBodyResponse<any>> {
    return await this.client.post(`${this.baseUrl}`, formData);
  }
  async update(id: string, formData: FormData): Promise<IBodyResponse<any>> {
    return await this.client.patch(`${this.baseUrl}/${id}`, formData);
  }
  async getOperationByModuleId(id: string): Promise<IBodyResponse<any>> {
    return await this.client.get(`${this.baseUrl}/getOperationByModuleId/${id}`);
  }
}
export const operationerviceApi = new OperationApiService(
  { baseUrl: "/Operation" },
  axiosInstance
);
