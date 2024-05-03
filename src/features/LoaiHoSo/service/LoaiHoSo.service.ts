// import { IBodyResponse } from "../../../common/interface/interfaces";
import axiosInstance, { ApiService } from "../../../plugins/axios";

class LoaiHoSoApiService extends ApiService {
  async getAll() {
    return await this.client.get(`${this.baseUrl}`);
  }
}

export const loaiHoSoHoSoServiceApi = new LoaiHoSoApiService(
  { baseUrl: "/LoaiHoSo" },
  axiosInstance
);
