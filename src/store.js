import Vue from 'vue'
import Vuex from 'vuex'
// import { getInfo } from '@/services/user'
import { 
    removeToken, 
} from '@/utils/auth'
import router from './router'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        roles: ['item-one:view', 'item-two:view', 'item-three:view', 'item-four:view', 'item-five:view'],
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
                // 
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
