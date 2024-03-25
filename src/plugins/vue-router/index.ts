import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { PageName } from '../../common/contants/contants'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/admin',
    name: PageName.ADMIN,
    component: () => import('../../layouts/AdminView.vue'),
    children: [
      {
        path: '',
        name:PageName.DASHBOARD_PAGE,
        component: () => import('../../HomeView.vue'),
      },
      {
        path: 'user',
        name:PageName.ADMIN_USER,
        component: () => import('../../features/user/pages/UserView.vue'),
      }
    ]
    },
    {
      path: '/',
      name: 'login',
      component: () => import('../../features/auth/pages/LoginForm.vue'),
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})

export default router