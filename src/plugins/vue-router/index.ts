import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { PageName } from "../../common/contants/contants";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/admin",
    name: PageName.ADMIN,
    component: () => import("../../layouts/AdminView.vue"),
    children: [
      {
        path: "",
        name: PageName.DASHBOARD_PAGE,
        component: () => import("../../HomeView.vue"),
      },
      {
        path: "user",
        name: PageName.USER_PAGE,
        component: () => import("../../features/user/pages/UserView.vue"),
      },
      {
        path: "kho",
        name: PageName.KHO_PAGE,
        component: () => import("../../features/Kho/pages/KhoView.vue"),
      },
      {
        path: "day",
        name: PageName.DAY_PAGE,
        component: () => import("../../features/Day/pages/DayView.vue"),
      },
      {
        path: "ke",
        name: PageName.KE_PAGE,
        component: () => import("../../features/Ke/pages/KeView.vue"),
      },
      {
        path: "module",
        name: PageName.MODULE_PAGE,
        component: () => import("../../features/module/pages/ModuleView.vue"),
      },
      {
        path: "role",
        name: PageName.ROLE_PAGE,
        component: () => import("../../features/role/pages/RoleView.vue"),
      },
      {
        path: "role_operation",
        name: PageName.ROLEOPERATION_PAGE,
        component: () => import("../../features/role/pages/RoleOperation.vue"),
      },
      {
        path: "hop",
        name: PageName.HOP_PAGE,
        component: () => import("../../features/Hop/pages/HopView.vue"),
      },
      {
        path: "hoso",
        name: PageName.HOSO_PAGE,
        component: () => import("../../features/HoSo/pages/HosoView.vue"),
      },
      {
        path: "loaihoso",
        name: PageName.LOAIHOSO_PAGE,
        component: () =>
          import("../../features/LoaiHoSo/pages/LoaiHoSoView.vue"),
      },
      {
        path: "loaivanban",
        name: PageName.LOAIVANBAN_PAGE,
        component: () =>
          import("../../features/LoaiVanBan/pages/LoaiVanBanView.vue"),
      },
      {
        path: "doc/:id",
        name: PageName.DOC_PAGE,
        component: () => import("../../features/Doc/pages/DocPage.vue"),
      },
    ],
  },
  {
    path: "/",
    name: PageName.LOGIN_PAGE,
    component: () => import("../../features/auth/pages/LoginForm.vue"),
  },
  {
    path: "/404",
    name: PageName.NOT_FOUND_PAGE,
    component: () => import("../../layouts/NotFoundPage.vue"),
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

export default router;
