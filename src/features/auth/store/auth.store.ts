import { defineStore } from "pinia";
import localStorageAuthService from "../../../common/storages/authStorage";
import { authServiceApi } from "../services/auth.service";
import { IBodyLogin } from "../interface";
// import { showErrorNotification } from "../../../common/helper/helpers";

export const AuthStore = defineStore("authStore", () => {
  async function login(body: IBodyLogin) {
    const res = await authServiceApi.login(body);
    const { profile } = res.data;
    if (res.success && res.data != null) {
      localStorageAuthService.setAccessToken(res.data.accessToken.token);
      localStorageAuthService.setAccessTokenExpiredAt(
        res.data.accessToken.expiresIn
      );
      localStorageAuthService.setRefreshToken(res.data.refreshToken.token);
      localStorageAuthService.setRefresh_TokenExpiredAt(
        res.data.refreshToken.expiresIn
      );
      localStorageAuthService.setLoginUser(profile);
      return true;
    }
    return false;
  }
  return {
    login,
  };
});
