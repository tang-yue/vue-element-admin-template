import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth'
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login', '/auth-redirect']

router.beforeEach(async(to, from, next) => {
    NProgress.start()

    document.title = getPageTitle(to.meta.title)

    const hasToken = getToken()
    if (hasToken) {
       if (to.path === '/login') {
           next({ path: '/' })
           NProgress.done()
       } else {
         const hasRoles = store.state.roles && store.state.roles.length > 0
         if(hasRoles) {
             next()
         } else {
             try {
                await store.dispatch('getInfo')  // 这里需要注意下请求接口需要变成异步的，如果同步，那么将会报错。
                next({ ...to, replace: true})
             } catch (error) {
                await store.dispatch('resetToken')
                Message.error(error || 'Has Error')
                next(`/login?redirect=${to.path}`)
                NProgress.done()
             }
         }
       }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            next(`/login`) // 这里只需要写login 就可以了
            NProgress.done()
        }
    }
})

router.afterEach(() => {
    NProgress.done()
})



