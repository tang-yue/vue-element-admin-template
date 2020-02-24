import router from '@/router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth'
import getPageTitle from '@/utils/get-page-title'
import path from 'path'

NProgress.configure({ showSpinner: false })

function getRoutePath(routes, _path) {
  var routerPath = ''
  routes.some((item) => {
    if (!item.hidden) {
      routerPath = _path ? path.resolve(_path, item.path) : item.path
      if (item.children) {
        routerPath = getRoutePath(item.children, routerPath)
      }
      return true
    }
  })
  return routerPath
}

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  document.title = to.meta.title ? getPageTitle(to.meta.title) : getPageTitle(to.name);
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasRoles = store.state.roles && store.state.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          store.dispatch('getInfo').then(roles => {
          // 根据roles  动态处理路由
           console.log('执行了吗？')
            store.dispatch('handleRoutes', { roles: roles }).then(() => {
              router.addRoutes(store.getters.addRouters)
              // 重定向到有权限的第一个菜单栏路由
              const authRouters = store.getters.addRouters
              if (to.path === '/') {
                const nextRoutePath = getRoutePath(authRouters)
                next({ path: nextRoutePath, replace: true })
              } else {
                next({ ...to, replace: true })
              }
            })
          })
        } catch (error) {
          await store.dispatch('resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next({ path: `/login?redirect=${to.path}` })
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
