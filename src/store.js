import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        roleAdd: false,
        roleDelete: false,
        permissionMenu: false,
        userAdd: false,
        userDelete: false,
        userUpdate: false,
        permissionAdd: false,
        permissionUpdate: false
    },
    mutations: {
            /* eslint no-param-reassign: ["error", 
            { "props": true, "ignorePropertyModificationsFor": ["state"] }] */
        savePower(state, payload) {
            state.roleAdd = payload.indexOf('role:add') !== -1;
            state.roleDelete = payload.indexOf('role:delete') !== -1;
            state.permissionMenu = payload.indexOf('permission:menu') !== -1;
            state.userAdd = payload.indexOf('user:add') !== -1;
            state.userDelete = payload.indexOf('user:delete') !== -1;
            state.userUpdate = payload.indexOf('user:update') !== -1;
            state.permissionAdd = payload.indexOf('permission:add') !== -1;
            state.permissionUpdate = payload.indexOf('permission:update') !== -1;
        },
    },
    actions: {
        savePower({
            commit
        }, payload) {
            commit('savePower', payload);
        }
    }
})
