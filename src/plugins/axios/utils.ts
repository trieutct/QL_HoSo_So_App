import { HttpStatus, PageName } from "../../common/contants/contants";
import localStorageAuthService from "../../common/storages/authStorage";
import axios from "axios";
import router from "../../plugins/vue-router/index";

export const logout = (redirectToLogin = true) => {
  localStorageAuthService.removeAll();
  const currentPage = router.currentRoute;
  if (redirectToLogin && currentPage.value.name !== PageName.LOGIN_PAGE) {
    sessionStorage.setItem("redirect", currentPage.value.fullPath);
    router.push({ name: PageName.LOGIN_PAGE }).catch(() => {});
  }
};

export const sendRefreshToken = async () => {
  let response;
  try {
    const API_URL = "http://localhost:5235/api";
    response = await axios.get(
      `${API_URL}/Auth/refresh/${localStorageAuthService.getRefreshToken()}`
    );
    if (response?.status === HttpStatus.OK) {
      localStorageAuthService.setAccessToken(
        response.data.data.accessToken.token
      );
      localStorageAuthService.setAccessTokenExpiredAt(
        response.data.data.accessToken.expiresIn
      );
      localStorageAuthService.setRefreshToken(
        response.data.data.refreshToken.token
      );
      localStorageAuthService.setRefresh_TokenExpiredAt(
        response.data.data.refreshToken.expiresIn
      );
      return;
    }
    logout(true);
  } catch (error) {
    logout(true);
    return;
  }
};
