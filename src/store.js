import Vue from 'vue'
import Vuex from 'vuex'
import { fixedRoutes } from '@/router'
import { asyncRoutes } from '@/router/asyncRoutes'
// import { getInfor } from '@/services/user'
import {
  removeToken
} from '@/utils/auth'

Vue.use(Vuex)

function hasPermission (roles, route) {
  if (route.meta && route.meta.codes) {
    return roles.some(role => route.meta.codes.includes(role))
  } else {
    return true
  }
}

function filterAsyncRoutes(routes, roles) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })
  return res
}

const store = new Vuex.Store({
  state: {
    roles: [],
    name: '',
    routes: fixedRoutes,
    uploadImages: {},
    addRouters: [],
    user: { username: 'admin' }
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USER: (state, user) => {
      state.user = user
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_UPLOAD_IMG: (state, images) => {
      state.uploadImages = { ...state.uploadImages, ...images }
    },
    REMOVE_UPLOAD_IMG: (state) => {
      state.uploadImages = {}
    },
    SET_ROUTES: (state, routes) => {
      state.addRouters = routes
      state.routes = fixedRoutes.concat(routes)
    }
  },
  // 下面这两个都是全局的
  actions: {
    getInfo ({ commit, state }) {
      return new Promise((resolve) => {
        // getInfor(state.token).then(response => {
          // if (response.data && response.data.errCode === 0) {
            // const result = response.data.data
            // const { permissionCodeList, userVo } = result
            // commit('SET_USER', userVo)
            const permissionCodeList = ['item-one']
            commit('SET_ROLES', permissionCodeList)
            resolve(permissionCodeList)
          // } else {
            // removeToken()
            // window.location.href = window.location.origin + '/vue-element-admin/login'
          // }
        // })
      })
    },
    handleRoutes ({ commit }, { roles }) {
      return new Promise((resolve) => {
        let accessedRoutes = []
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
        // 再次筛选最外层如果存在children, 但是children 为空数组，那么也要从里面剔除掉，（只遍历一遍）
        const new_accessedRoutes = []
        accessedRoutes.map((item) => {
          if (item.children && item.children.length === 0) {
            // delete item.children
          } else {
            new_accessedRoutes.push(item)
          }
        })
        commit('SET_ROUTES', new_accessedRoutes)
        resolve()
      })
    },
    resetToken ({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resolve()
      })
    },
    addUplaodImages ({ commit }, imgUrlObj) {
      return new Promise((resolve) => {
        commit('SET_UPLOAD_IMG', imgUrlObj)
        resolve()
      })
    },
    removeUploadImages ({ commit }) {
      return new Promise((resolve) => {
        commit('REMOVE_UPLOAD_IMG')
        resolve()
      })
    }
  },
  getters: {
    roles: state => state.roles,
    name: state => state.name,
    routesConfig: state => state.routes,
    uploadImages: state => state.uploadImages,
    addRouters: state => state.addRouters
  }
})

export default store
