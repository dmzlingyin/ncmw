import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Main from '../views/Main.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'main',
    component: Main,
    children: [
      {
        path: '/discovery',
        name: 'discovery',
        component: () => import('../views/Discovery.vue')
      },
      {
        path: '/video',
        name: 'video',
        component: () => import('../views/Video.vue')
      },
      {
        path: '/pfm',
        name: 'pfm',
        component: () => import('../views/Pfm.vue')
      },
      {
        path: '/favourite',
        name: 'favourite',
        component: () => import('../views/Favourite.vue')
      },
    ]
  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
