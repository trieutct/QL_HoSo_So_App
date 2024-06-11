import { IBodyResponse } from "../../../common/interface/interfaces";
import axiosInstance, { ApiService } from "../../../plugins/axios";
import { IBodyLogin, ILoginResponse, IChangePassword } from "../interface";

class AuthApiService extends ApiService {
  async login(body: IBodyLogin): Promise<IBodyResponse<ILoginResponse>> {
    return await this.client.post(`${this.baseUrl}/login`, body);
  }
  async loginGoogle(email: string): Promise<IBodyResponse<ILoginResponse>> {
    return await this.client.get(`${this.baseUrl}/login/google/${email}`);
  }
  async changePassword(
    body: IChangePassword
  ): Promise<IBodyResponse<IChangePassword>> {
    return await this.client.post(`${this.baseUrl}/changePassword`, body);
  }
  async checkPermisionRouter(
    permisions: string[]
  ): Promise<IBodyResponse<IChangePassword>> {
    return await this.client.post(`${this.baseUrl}/user-permision`, permisions);
  }
}

export const authServiceApi = new AuthApiService(
  { baseUrl: "/Auth" },
  axiosInstance
);
