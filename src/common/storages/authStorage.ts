import { SupportLanguage } from "../contants/contants";
import { DEFAULT_LANGUAGE } from "../../common/contants/contants";
import { storage } from "./localStorage";
import { IUser } from "../../features/auth/interface";
import { isStringify } from "../helper/helpers";
const BUFFER_TIME = 60 * 1000; // 60s

export const enum AUTH_SERVICE_KEY {
  ACCESS_TOKEN = "ACCESS_TOKEN",
  REFRESH_TOKEN = "REFRESH_TOKEN",
  USER = "USER",
  ROLE = "ROLE",
  LANGUAGE = "LANGUAGE",
  ACCESS_TOKEN_EXPIRED_AT = "ACCESS_TOKEN_EXPIRED_AT",
  REFRESH_TOKEN_EXPIRED_AT = "REFRESH_TOKEN_EXPIRED_AT",
  AVATAR = "AVATAR",
}
class LocalStorageAuthService {
  setLoginUser(user: null | IUser): void {
    if (!user) {
      storage.setLocalStorage(AUTH_SERVICE_KEY.USER, "");
    }
    if (!isStringify(user)) {
      return;
    }
    storage.setLocalStorage(AUTH_SERVICE_KEY.USER, JSON.stringify(user));
  }
  getLoginUser(): IUser {
    return storage.getObjectFromKey(AUTH_SERVICE_KEY.USER) as IUser;
  }

  // LANGUAGE
  setLanguage(value: SupportLanguage): void {
    storage.setLocalStorage(AUTH_SERVICE_KEY.LANGUAGE, value);
  }
  getLanguage(): SupportLanguage {
    return (storage.getLocalStorage(AUTH_SERVICE_KEY.LANGUAGE) ||
      DEFAULT_LANGUAGE) as SupportLanguage;
  }

  setAccessToken(token: string): void {
    storage.setLocalStorage(AUTH_SERVICE_KEY.ACCESS_TOKEN, token);
  }
  getAccessToken(): string {
    return storage.getLocalStorage(AUTH_SERVICE_KEY.ACCESS_TOKEN);
  }
  removeAccessToken(): void {
    storage.removeLocalStorage(AUTH_SERVICE_KEY.ACCESS_TOKEN);
  }

  setAccessTokenExpiredAt(expiredIn: number): void {
    const expiredAt = new Date().getTime() + expiredIn * 1000 - BUFFER_TIME;
    storage.setLocalStorage(
      AUTH_SERVICE_KEY.ACCESS_TOKEN_EXPIRED_AT,
      String(expiredAt)
    );
  }
  getAccessTokenExpiredAt(): number {
    return +storage.getLocalStorage(AUTH_SERVICE_KEY.ACCESS_TOKEN_EXPIRED_AT);
  }
  removeAccessTokenExpiredAt(): void {
    storage.removeLocalStorage(AUTH_SERVICE_KEY.ACCESS_TOKEN_EXPIRED_AT);
  }

  setRefreshToken(token: string): void {
    storage.setLocalStorage(AUTH_SERVICE_KEY.REFRESH_TOKEN, token);
  }
  getRefreshToken(): string {
    return storage.getLocalStorage(AUTH_SERVICE_KEY.REFRESH_TOKEN);
  }
  removeRefreshToken(): void {
    storage.removeLocalStorage(AUTH_SERVICE_KEY.REFRESH_TOKEN);
  }

  setRefresh_TokenExpiredAt(expiredIn: number): void {
    const expiredAt = new Date().getTime() + expiredIn * 1000 - BUFFER_TIME;
    storage.setLocalStorage(
      AUTH_SERVICE_KEY.REFRESH_TOKEN_EXPIRED_AT,
      String(expiredAt)
    );
  }
  getRefresh_TokenExpiredAt(): number {
    return +storage.getLocalStorage(AUTH_SERVICE_KEY.REFRESH_TOKEN_EXPIRED_AT);
  }
  removeRefresh_TokenExpiredAt(): void {
    storage.removeLocalStorage(AUTH_SERVICE_KEY.REFRESH_TOKEN_EXPIRED_AT);
  }

  setUserRole(role: string): void {
    storage.setLocalStorage(AUTH_SERVICE_KEY.ROLE, role);
  }
  getUserRole(): string {
    return storage.getLocalStorage(AUTH_SERVICE_KEY.ROLE);
  }
  removeUserRole(): void {
    storage.removeLocalStorage(AUTH_SERVICE_KEY.ROLE);
  }

  setAvatarUrl(avatar: string): void {
    storage.setLocalStorage(AUTH_SERVICE_KEY.AVATAR, avatar);
  }
  getAvatarUrl(): string {
    return storage.getLocalStorage(AUTH_SERVICE_KEY.AVATAR);
  }
  removeAvatarUrl(): void {
    storage.removeLocalStorage(AUTH_SERVICE_KEY.AVATAR);
  }
  removeLoginUser(): void {
    storage.removeLocalStorage(AUTH_SERVICE_KEY.USER);
  }

  resetAccessToken(): void {
    storage.setLocalStorage(AUTH_SERVICE_KEY.ACCESS_TOKEN, "");
  }
  resetAccessTokenExpiredAt(): void {
    storage.setLocalStorage(AUTH_SERVICE_KEY.ACCESS_TOKEN_EXPIRED_AT, "");
  }

  resetAll(): void {
    this.resetAccessToken();
    this.resetAccessTokenExpiredAt();
    // this.setLoginUser(null, null);
  }
  removeAll(): void {
    this.removeAccessToken();
    this.removeAccessTokenExpiredAt();
    this.removeRefreshToken();
    this.removeRefresh_TokenExpiredAt();
    this.removeUserRole();
    this.removeAvatarUrl();
    this.removeLoginUser();
  }

  getHeader() {
    return {
      Authorization: `Bearer ${this.getAccessToken()}`,
    };
  }
}
export const localStorageAuthService = new LocalStorageAuthService();
export default localStorageAuthService;
