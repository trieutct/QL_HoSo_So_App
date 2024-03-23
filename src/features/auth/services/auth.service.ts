import { IBodyResponse } from "../../../common/interface/interfaces";
import axiosInstance, { ApiService } from "../../../plugins/axios";
import { IBodyLogin, ILoginResponse } from "../interface";

class AuthApiService extends ApiService{
    async login(body: IBodyLogin): Promise<IBodyResponse<ILoginResponse>> {
        return await this.client.post(`${this.baseUrl}/login`, body);
    }
}


export const authServiceApi = new AuthApiService({ baseUrl: '/Auth' }, axiosInstance);