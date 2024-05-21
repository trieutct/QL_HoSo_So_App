import { IBodyResponse } from "../../../common/interface/interfaces";
import axiosInstance, { ApiService } from "../../../plugins/axios";

export interface ICreate {
  docCode: string;
  codeNumber: string;
  codeNotation: string;
  issuedDate: string;
  organName: string;
  subject: string;
  note: string;
  keyword: string;
  FileCode: string;
  LoaiVanBanId: string;
  file: any;
}
class DocApiService extends ApiService {
  async create(formData: FormData): Promise<IBodyResponse<any>> {
    return await this.client.post(`${this.baseUrl}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
  async getAllDocByFileCode(id: string): Promise<IBodyResponse<any>> {
    return await this.client.get(`${this.baseUrl}/${id}`);
  }
  async getDetail(id: string): Promise<IBodyResponse<any>> {
    return await this.client.get(`${this.baseUrl}/detail/${id}`);
  }
  async dowloadFile(filename: string): Promise<IBodyResponse<any>> {
    return await this.client.get(`${this.baseUrl}/dowload/${filename}`, {
      responseType: "blob",
    });
  }
  async update(id: string, formData: FormData): Promise<IBodyResponse<any>> {
    return await this.client.put(`${this.baseUrl}/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
}

export const docServiceApi = new DocApiService(
  { baseUrl: "/Doc" },
  axiosInstance
);
