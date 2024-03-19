import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../../HomeView.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/admin',
    name: "admin",
    component: () => import('../../layouts/AdminView.vue'),
    children: [
      {
        path: '',
        name:'dashboard',
        component: () => import('../../HomeView.vue'),
      }
    ]
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})

export default router
