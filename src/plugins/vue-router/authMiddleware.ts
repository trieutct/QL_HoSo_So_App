import { PageName, Role } from "../../common/contants/contants";
import localStorageAuthService from "../../common/storages/authStorage";
import { authServiceApi } from "../../features/auth/services/auth.service";
import dayjs from "../../plugins/dayjs/index";
import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

export default async (
  to: RouteLocationNormalized,
  _: RouteLocationNormalized,
  next: NavigationGuardNext
): Promise<void> => {
  const isPublic = to?.meta?.public || false;
  const hasToken = localStorageAuthService.getAccessToken() ? true : false;
  const tokenExpiredAt = localStorageAuthService.getAccessTokenExpiredAt();
  // const isExpired = dayjs().isAfter(dayjs(tokenExpiredAt), "second");
  const IS_AUTHENTICATED = tokenExpiredAt && hasToken;
  const name = to?.name;
  if (!name) {
    return next({ path: "/404" });
  }
  if (!IS_AUTHENTICATED && to.name !== PageName.LOGIN_PAGE && !isPublic) {
    sessionStorage.setItem("redirect", to.fullPath);
    return next({ name: PageName.LOGIN_PAGE });
  }
  if (isPublic) {
    return next();
  }
  if (IS_AUTHENTICATED && !isPublic) {
    const requiredPermissions =
      (to?.meta?.requiredPermissions as string[]) || [];
    if (await hasPermissionToAccessRoute(requiredPermissions)) return next();
    return next({ path: "/404" });
  }
  next();
};

export async function hasPermissionToAccessRoute(
  requiredPermissions: string[]
): Promise<boolean> {
  if (!requiredPermissions || requiredPermissions.length === 0) return true;
  // const user = localStorageAuthService.getLoginUser();
  // if (user.role === Role.SYSADMIN) return true;
  const res = await authServiceApi.checkPermisionRouter(requiredPermissions);
  if (!res) return false;
  return res.success;
}
