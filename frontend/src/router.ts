import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'

const routes: any = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },

  {
    path: '/keycounter',
    name: 'Keycounter',
    component: () => import('@/views/KeyCounter.vue')
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
