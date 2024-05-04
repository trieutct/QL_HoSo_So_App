import { IBodyResponse } from "../../../common/interface/interfaces";
import axiosInstance, { ApiService } from "../../../plugins/axios";

class LoaiVanBanApiService extends ApiService {
  async getAll() {
    return await this.client.get(`${this.baseUrl}`);
  }
  async create(formData: FormData): Promise<IBodyResponse<any>> {
    return await this.client.post(`${this.baseUrl}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
  async update(id: string, formData: FormData): Promise<IBodyResponse<any>> {
    return await this.client.patch(`${this.baseUrl}/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
}

export const loaiVanBanServiceApi = new LoaiVanBanApiService(
  { baseUrl: "/LoaiVanBan" },
  axiosInstance
);
