// 我们可以写得简单一些
import Vue from 'vue'
import Vuex from 'vuex'
import { login, getInfo } from '@/services/user'
import { setToken, removeToken } from '@/utils/auth'
import router from './router'


Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        roles: [],
        name: '',
        routes: router,
        uploadImages: {}
    },
    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_NAME: (state, name) => {
            state.name = name;
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles
        },
        SET_UPLOAD_IMG: (state, images) => {
            state.uploadImages = {...state.uploadImages, ...images}
        },
        REMOVE_UPLOAD_IMG: (state) => {
            state.uploadImages = {}
        }
    },
    // 下面这两个都是全局的
    actions: {
        getInfo({ commit, state }) {
            return new Promise((resolve, reject) => {
                getInfo(state.token).then(response => {
                    // const { data } = response.data
                    if(!response.data) {
                        reject(`Verification failed, please Login again.`)
                    }
                    const { permissionCodeList, userVo } = response.data.data
                    commit('SET_NAME', userVo.username)
                    commit('SET_ROLES', permissionCodeList)
                    resolve(permissionCodeList)
                })
            })
        },
        resetToken({ commit }) {
            return new Promise(resolve => {
                commit('SET_TOKEN', '')
                commit('SET_ROLES', [])
                removeToken()
                resolve()
            })
        },
        addUplaodImages({ commit, state }, imgUrlObj) {
            return new Promise((resolve) => {
                commit('SET_UPLOAD_IMG', imgUrlObj)
                resolve()
            })
        },
        removeUploadImages({ commit, state }) {
            return new Promise((resolve) => {
                commit('REMOVE_UPLOAD_IMG')
                resolve()
            })
        }
    },
    getters: {
        roles: state => state.roles,
        name: state => state.name,
        routesConfig: state => state.routes.options.routes,
        uploadImages: state => state.uploadImages
    }
})

export default store