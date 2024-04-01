import type { IBodyResponse, ICommonListQuery, IGetListResponse } from '../../common/interface/interfaces';
// import localStorageAuthService from '../../common/storages/authStorage';
import { type AxiosInstance } from 'axios';


interface IServiceOption {
    baseUrl: string;
}

export class ApiService {
    client: AxiosInstance;
    baseUrl: string;

    constructor(params: IServiceOption, axios: AxiosInstance) {
        this.client = axios;
        this.baseUrl = params.baseUrl;
    }

    get detailUrl(): string {
        return this.baseUrl;
    }

    get createUrl(): string {
        return this.baseUrl;
    }

    get updateUrl(): string {
        return this.baseUrl;
    }

    get deleteUrl(): string {
        return this.baseUrl;
    }

    useClient(axios: AxiosInstance): void {
        this.client = axios;
    }

    _getList<T>(
        queryString: ICommonListQuery,
    ): Promise<IBodyResponse<IGetListResponse<T>>> {
        // console.log(queryString)
        return this.client.get(`${this.baseUrl}`, {
            params: queryString,
            // headers: {
            //     'Authorization': 'Bearer '+localStorageAuthService.getAccessToken()
            //   }
            }
        );
    }

    _getDetail<R>(id: number | string): Promise<R> {
        return this.client.get<R, R>(this.detailUrl + '/' + id);
    }

    _create<P, R>(params: P): Promise<R> {
        return this.client.post(this.createUrl, params);
    }

    _update<P, R>(id: number | string, params: P): Promise<R> {
        return this.client.patch(this.updateUrl + '/' + id, params);
    }

    _delete<R>(id: number | string): Promise<R> {
        return this.client.delete<R, R>(this.deleteUrl + '/' + id,{
            // headers: {
            //     'Authorization': 'Bearer '+localStorageAuthService.getAccessToken()
            // }
        });
    }
    _softDelete<R>(id: number | string): Promise<R> {
        return this.client.delete<R, R>(this.deleteUrl + '/softDelete/' + id,{
            // headers: {
            //     'Authorization': 'Bearer '+localStorageAuthService.getAccessToken()
            // }
        });
    }
    _softDeleteMutiple<R>(id: number[] | string[]): Promise<R> {
        const ids=Object.values(id)
        return this.client.post<R, R>(this.deleteUrl + '/softDeleteMutiple',ids,{
            // headers: {
            //     'Authorization': 'Bearer '+localStorageAuthService.getAccessToken()
            // },
        });
    }
    _getDropDown<R>(): Promise<R> {
        return this.client.get<R, R>(this.baseUrl + '/getDropdown');
    }
    _getDropDownByMa<R>(ma:string): Promise<R> {
        return this.client.get<R, R>(this.baseUrl + '/getDropdown/'+ma);
    }
}
