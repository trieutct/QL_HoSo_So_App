import { fa } from "element-plus/es/locales.mjs";
import { PageName, Role } from "../../common/contants/contants";
import localStorageAuthService from "../../common/storages/authStorage";
import { authServiceApi } from "../../features/auth/services/auth.service";
import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

export default async (
  to: RouteLocationNormalized,
  _: RouteLocationNormalized,
  next: NavigationGuardNext
): Promise<void> => {
  const isPublic = to?.meta?.public || false;
  const hasToken = !!localStorageAuthService.getAccessToken();
  const tokenExpiredAt = localStorageAuthService.getAccessTokenExpiredAt();
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
    try {
      const hasPermission = await hasPermissionToAccessRoute(
        requiredPermissions
      );
      if (!hasPermission) {
        alert(1);
        next({ name: PageName.NOT_FOUND_PAGE });
        return;
      }
    } catch (error) {
      return next({ name: PageName.NOT_FOUND_PAGE });
    }
  }
  next();
};

async function hasPermissionToAccessRoute(
  requiredPermissions: string[]
): Promise<boolean> {
  if (!requiredPermissions || requiredPermissions.length === 0) return true;
  const res = await authServiceApi.checkPermisionRouter(requiredPermissions);
  return res.success;
}
