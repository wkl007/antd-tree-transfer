import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import type { App } from 'vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/options'
  },
  {
    path: '/options',
    name: 'options',
    component: () => import(/* webpackChunkName: "options" */ '@/views/options.vue')
  },
  {
    path: '/composition',
    name: 'composition',
    component: () => import(/* webpackChunkName: "composition" */ '@/views/composition.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

/**
 * vue-router 配置
 * @param app
 */
export function setupRouter (app: App): void {
  app.use(router)
}

export default router
