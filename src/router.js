import Vue from 'vue'
import Router from 'vue-router'
import Layout from './views/Layout'
import Login from './views/Login'
// 共同拥有部分, 不需要任何的权限
import UserRelation from './views/UserRelation/UserRelation'
// 404 页面
import errorPage from './views/error-page/404'

import navigatorOneThree from './views/navigatorOne/itemThree/itemThree'
import navigatorOneTwo from './views/navigatorOne/itemTwo/itemTwo'
import navigatorOneOne from './views/navigatorOne/itemOne/itemOne'
import CommonInvite from './views/Invite/CommonInvite'

import navigatorTwoOne from './views/navigatorTwo/itemOne/itemOne'
import navigatorTwoTwo from './views/navigatorTwo/itemTwo/itemTwo'
import navigatorTwoThree from './views/navigatorTwo/itemThree/itemThree'
import navigatorTwoFour from './views/navigatorTwo/itemFour/itemFour'



Vue.use(Router);

export default new Router({
    mode: 'history',
    base: '/vue-element-admin-template',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Layout,
        },
        {
            path: '/dashboard',
            name: '登录',
            component: Layout,
            redirect: '/dashboard/login',
            icon: 'el-icon-suitcase',
            children: [
                {
                    path: 'login',
                    component: UserRelation,
                    meta: {
                        title: '登录成功页',
                        menuPath: '/dashboard/login',
                        powerCode: ' '
                    }
                }
            ]
        },
        {
            path: '/navigatorOne',
            name: 'navigator one',
            component: Layout,
            redirect: '/navigatorOne/itemOne',
            icon: 'el-icon-goods',
            children: [
                { 
                    path: 'itemOne',
                    component: navigatorOneOne,
                    meta: {
                        title: 'item one', 
                        menuPath: '/navigatorOne/itemOne',
                        powerCode: 'item-one:view'
                    } 
                },
                {
                    path: 'itemTwo',
                    component: navigatorOneTwo,
                    meta: {
                        title: 'item two',
                        menuPath: '/navigatorOne/itemTwo',
                        powerCode: 'item-two:view'
                    }
                },
                {
                    path: 'itemThree',
                    component: navigatorOneThree,
                    meta: {
                        title: 'itme three',
                        menuPath: '/navigatorOne/itemThree',
                        powerCode: 'item-three:view'
                    }
                }
            ]
        },
        {
            path: '/navigatorTwo',
            name: 'Navigator two',
            component: Layout,
            redirect: '/navigatorTwo/itemOne',
            icon: 'el-icon-takeaway-box',
            children: [
                {
                    path: 'itemOne',
                    component: CommonInvite,
                    redirect: '/navigatorTwo/itemOne/one/one',
                    meta: {
                        title: 'item one',
                        menuPath: '/navigatorTwo/itemOne',
                        powerCode: 'item-one:view'
                    },
                    children: [
                        {
                            path: 'one/:id',
                            component: navigatorTwoOne,
                        },
                        {
                            path: 'two/:id',
                            component: navigatorOneTwo
                        },
                        {
                            path: 'three/:id',
                            component: navigatorOneTwo
                        },
                        {
                            path: 'four/:id',
                            component: navigatorOneTwo
                        },
                        {
                            path: 'five/:id',
                            component: navigatorOneTwo
                        }
                    ]
                },
                {
                    path: 'itemTwo',
                    component: navigatorTwoOne,
                    redirect: '/navigatorTwo/itemTwo/table',
                    meta: {
                        title: 'item two',
                        menuPath: '/navigatorTwo/itemTwo',
                        powerCode: 'item-two:view'
                    },
                    children: [
                        {
                            path: 'table',
                            component: navigatorTwoOne,
                        },
                        {
                            path: 'one/:id',
                            component: navigatorTwoOne,
                        },
                        {
                            path: 'two/:id',
                            component: navigatorOneTwo
                        },
                        {
                            path: 'three/:id',
                            component: navigatorOneTwo
                        },
                        {
                            path: 'four/:id',
                            component: navigatorOneTwo
                        },
                        {
                            path: 'five/:id',
                            component: navigatorOneTwo
                        }
                    ]
                },
                {
                    path: 'itemThree',
                    component: navigatorTwoTwo,
                    meta: {
                        title: 'item three',
                        menuPath: '/navigatorTwo/itemThree',
                        powerCode: 'item-three:view'
                    }
                },
                {
                    path: 'itemFour',
                    component: navigatorTwoThree,
                    meta: {
                        title: 'item four',
                        menuPath: '/navigatorTwo/itemFour',
                        powerCode: 'item-four:view'
                    }
                },
                {
                    path: 'itemFive',
                    component: navigatorTwoFour,
                    meta: {
                        title: 'item five',
                        menuPath: '/navigatorTwo/itemFive',
                        powerCode: 'item-five:view'
                    }
                }
            ]
        },
        {
            path: '/login',
            name: "Login",
            component: Login
        },
        {
            path: '*',
            name: '404',
            component: errorPage
        }
    ]
})

