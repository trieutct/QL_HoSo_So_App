import axiosInstance, { ApiService } from "../../../plugins/axios";

class DashboardSoApiService extends ApiService {
  async get() {
    return await this.client.get(`${this.baseUrl}`);
  }
}
export const dashboardSoHoSoServiceApi = new DashboardSoApiService(
  { baseUrl: "/Dashboard" },
  axiosInstance
);
