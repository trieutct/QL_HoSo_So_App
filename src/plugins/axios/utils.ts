import { HttpStatus, PageName } from '../../common/contants/contants';
import localStorageAuthService from '../../common/storages/authStorage';
import axios from 'axios';
// import { showWarningsNotification } from '../../common/helper/helpers';
import router from '../../plugins/vue-router/index';

export const logout = (redirectToLogin = true) => {
  // showWarningsNotification("Hết phiên đăng nhập. Vui lòng đăng nhập lại")
  localStorageAuthService.removeAll();
  const currentPage = router.currentRoute;
  if (redirectToLogin && currentPage.value.name !== PageName.LOGIN_PAGE) {
    sessionStorage.setItem('redirect', currentPage.value.fullPath);
    router
      .push({ name: PageName.LOGIN_PAGE })
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      .catch(() => {});
  }
};

export const sendRefreshToken = async () => {
  let response;
  try {
    const API_URL = "http://localhost:5235/api";
    const formData=new FormData()
    formData.append("refresh_token",localStorageAuthService.getRefreshToken())
    response = await axios.post(
      `${API_URL}/auth/refresh`,
      formData,
      { 
        // withCredentials: true,
        headers: {
          'Content-Type': 'application/json' 
        }
      }
    );
    if (response?.status === HttpStatus.CREATA_AT) {
      localStorageAuthService.setAccessToken(response.data?.accessToken.token);
      localStorageAuthService.setAccessTokenExpiredAt(response.data?.accessToken.expiresIn);

      localStorageAuthService.setRefreshToken(response.data?.refreshToken.token);
      localStorageAuthService.setRefresh_TokenExpiredAt(response.data?.refreshToken.expiresIn);
      // alert("Lấy xong token và refresh token")
      return;
    }
    // alert("Lấy lại token lỗi khi gửi lên ko lấy về đc")
    logout(true);
    return;
  } catch (error) {
    // alert("lỗi lấy lại token")
    logout(true);
    return;
  }
};
