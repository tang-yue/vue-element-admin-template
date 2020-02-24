import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/Layout'
import Login from '@/views/Login'

Vue.use(Router)

export const fixedRoutes = [
  {
    path: '/',
    name: 'home',
    component: Layout,
    hidden: true
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    hidden: true
  }
]

const createRouter = () => new Router({
  mode: 'history',
  base: '/vue-element-admin-template',
  scrollBehavior: () => ({ y: 0 }),
  routes: fixedRoutes
})

const router = createRouter()

export default router
