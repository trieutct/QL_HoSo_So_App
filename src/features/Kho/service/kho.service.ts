// import { IBodyResponse } from "../../../common/interface/interfaces";
import axiosInstance, { ApiService } from "../../../plugins/axios";

class KhoApiService extends ApiService{
    // async login(body: IBodyLogin): Promise<IBodyResponse<any>> {
    //     return await this.client.post(`${this.baseUrl}/login`, body);
    // }
}


export const KhoServiceApi = new KhoApiService({ baseUrl: '/Kho' }, axiosInstance);