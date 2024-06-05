import { IBodyResponse } from "../../../common/interface/interfaces";
import axiosInstance, { ApiService } from "../../../plugins/axios";

class UserApiService extends ApiService {
  async create(formData: FormData): Promise<IBodyResponse<any>> {
    return await this.client.post(`${this.baseUrl}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
  async update(id: string, formData: FormData): Promise<IBodyResponse<any>> {
    return await this.client.put(`${this.baseUrl}/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
  async resetPassword(id: string): Promise<IBodyResponse<any>> {
    return await this.client.patch(`${this.baseUrl}/resetPassword/${id}`);
  }
}
export const userServiceApi = new UserApiService(
  { baseUrl: "/User" },
  axiosInstance
);
