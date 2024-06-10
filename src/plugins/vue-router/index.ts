import {
  createRouter,
  createWebHistory,
  NavigationGuardWithThis,
  RouteRecordRaw,
} from "vue-router";
import { PageName, Role } from "../../common/contants/contants";
import VueRouteMiddleware, { GLOBAL_MIDDLEWARE_NAME } from "./middleware";
import authMiddleware from "./authMiddleware";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/admin",
    name: PageName.ADMIN,
    component: () => import("../../layouts/AdminView.vue"),
    children: [
      {
        path: "",
        name: "sss",
        component: () => import("../../HomeView.vue"),
        meta: {
          role: Role.SYSADMIN,
          public: false,
        },
      },
      {
        path: "change_password",
        name: PageName.CHANGEPASSWORD_PAGE,
        component: () => import("../../features/user/pages/ChangePassword.vue"),
        meta: {
          public: true,
        },
      },
      {
        path: "user",
        name: PageName.USER_PAGE,
        component: () => import("../../features/user/pages/UserView.vue"),
        meta: {
          requiredPermissions: [`${Role.SYSADMIN}`],
        },
      },
      {
        path: "user/:id",
        name: PageName.USERDETAIL_PAGE,
        component: () => import("../../features/user/pages/UserDetailPage.vue"),
        meta: {
          public: true,
        },
      },
      {
        path: "kho",
        name: PageName.KHO_PAGE,
        component: () => import("../../features/Kho/pages/KhoView.vue"),
        meta: {
          requiredPermissions: [`${Role.SYSADMIN}`, `${Role.THUKHO}`],
        },
      },
      {
        path: "day",
        name: PageName.DAY_PAGE,
        component: () => import("../../features/Day/pages/DayView.vue"),
        meta: {
          requiredPermissions: [`${Role.SYSADMIN}`, `${Role.THUKHO}`],
        },
      },
      {
        path: "ke",
        name: PageName.KE_PAGE,
        component: () => import("../../features/Ke/pages/KeView.vue"),
        meta: {
          requiredPermissions: [`${Role.SYSADMIN}`, `${Role.THUKHO}`],
        },
      },
      {
        path: "module",
        name: PageName.MODULE_PAGE,
        component: () => import("../../features/module/pages/ModuleView.vue"),
        meta: {
          requiredPermissions: [`${Role.SYSADMIN}`],
        },
      },
      {
        path: "role",
        name: PageName.ROLE_PAGE,
        component: () => import("../../features/role/pages/RoleView.vue"),
        meta: {
          requiredPermissions: [`${Role.SYSADMIN}`],
        },
      },
      {
        path: "role_operation",
        name: PageName.ROLEOPERATION_PAGE,
        component: () => import("../../features/role/pages/RoleOperation.vue"),
        meta: {
          requiredPermissions: [`${Role.SYSADMIN}`],
        },
      },
      {
        path: "hop",
        name: PageName.HOP_PAGE,
        component: () => import("../../features/Hop/pages/HopView.vue"),
        meta: {
          requiredPermissions: [`${Role.SYSADMIN}`, `${Role.THUKHO}`],
        },
      },
      {
        path: "hoso",
        name: PageName.HOSO_PAGE,
        component: () => import("../../features/HoSo/pages/HosoView.vue"),
        meta: {
          requiredPermissions: [`${Role.SYSADMIN}`, `${Role.THUKHO}`],
        },
      },
      {
        path: "loaihoso",
        name: PageName.LOAIHOSO_PAGE,
        component: () =>
          import("../../features/LoaiHoSo/pages/LoaiHoSoView.vue"),
        meta: {
          requiredPermissions: [`${Role.SYSADMIN}`, `${Role.THUKHO}`],
        },
      },
      {
        path: "loaivanban",
        name: PageName.LOAIVANBAN_PAGE,
        component: () =>
          import("../../features/LoaiVanBan/pages/LoaiVanBanView.vue"),
        meta: {
          requiredPermissions: [`${Role.SYSADMIN}`, `${Role.THUKHO}`],
        },
      },
      {
        path: "doc/:id",
        name: PageName.DOC_PAGE,
        component: () => import("../../features/Doc/pages/DocPage.vue"),
        meta: {
          requiredPermissions: [
            `${Role.SYSADMIN}`,
            `${Role.THUKHO}`,
            `${Role.NHANVIEN}`,
          ],
        },
      },
      {
        path: "dashboard",
        name: PageName.DASHBOARD_PAGE,
        component: () =>
          import("../../features/dashboard/pages/DashboardView.vue"),
        meta: {
          requiredPermissions: [`${Role.SYSADMIN}`],
        },
      },
      {
        path: "tracuu",
        name: PageName.TRACUU_PAGE,
        component: () => import("../../features/HoSo/pages/TraCuuHoSo.vue"),
        meta: {
          requiredPermissions: [
            `${Role.SYSADMIN}`,
            `${Role.THUKHO}`,
            `${Role.NHANVIEN}`,
          ],
        },
      },
    ],
  },
  {
    path: "/",
    name: PageName.LOGIN_PAGE,
    component: () => import("../../features/auth/pages/LoginForm.vue"),
    meta: {
      public: true,
    },
  },
  {
    path: "/404",
    name: PageName.NOT_FOUND_PAGE,
    component: () => import("../../layouts/NotFoundPage.vue"),
    meta: {
      public: true,
    },
  },
  {
    path: "/:catchAll(.*)*",
    redirect: "/404",
  },
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(
  VueRouteMiddleware({
    [GLOBAL_MIDDLEWARE_NAME]: authMiddleware,
  }) as NavigationGuardWithThis<unknown>
);
export default router;
