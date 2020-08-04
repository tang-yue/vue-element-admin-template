import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/Layout'
import Login from '@/views/Login'
// 共同拥有部分, 不需要任何的权限
// 404 页面
import errorPage from '@/views/error-page/404'

import navigatorOneThree from '@/views/navigatorOne/itemThree/itemThree'
import navigatorOneTwo from '@/views/navigatorOne/itemTwo/itemTwo'
import navigatorOneOne from '@/views/navigatorOne/itemOne/itemOne'
import Common from '@/views/navigatorTwo/CommonInvite'

import navigatorTwoOne from '@/views/navigatorTwo/itemOne/itemOne'
import navigatorTwoTwo from '@/views/navigatorTwo/itemTwo/itemTwo'
import navigatorTwoThree from '@/views/navigatorTwo/itemThree/itemThree'
import navigatorTwoFour from '@/views/navigatorTwo/itemFour/itemFour'

export const asyncRoutes = [
    {
        path: '/navigatorOne',
        name: 'one',
        component: Layout,
        redirect: '/navigatorOne/itemOne',
        meta: {
            icon: 'icon-suger',
            title: 'navigatorOne'
        },
        children: [
            {
                name: '1-itemOne', 
                path: 'itemOne',
                component: navigatorOneOne,
                meta: {
                    title: 'item one', 
                    // codes: ['item-one']
                } 
            },
            {
                name: '1-itemTwo',
                path: 'itemTwo',
                component: navigatorOneTwo,
                meta: {
                    title: 'item two',
                    codes: ['item-two'] // 无权限
                }
            },
            {
                name: '1-itemThree',
                path: 'itemThree',
                component: navigatorOneThree,
                meta: {
                    title: 'itme three',
                    codes: ['item-three'] // 无权限
                }
            }
        ]
    },
    {
        path: '/navigatorTwo',
        name: 'two',
        component: Layout,
        redirect: '/navigatorTwo/itemOne',
        meta: {
            icon: 'icon-yueliang',
            title: 'navigatorTwo'
        },
        // hidden: true,
        children: [
            {
                path: 'itemOne',
                component: navigatorTwoOne,
                meta: {
                    title: 'example',
                    codes: ['item-one']
                }
            },
            {
                path: 'itemTwo',
                name: 'itemTwo',
                component: Common,
                meta: {
                    title: 'item two',
                },
                children: [
                    {
                        path: 'table1',
                        name: 'table1',
                        component: navigatorTwoOne,
                        meta: {
                            title: 'table1'
                        }
                    },
                    {
                        path: 'table2',
                        name: 'table2',
                        component: navigatorTwoTwo,
                        meta: {
                            title: 'table2',
                        }
                    },
                    {
                        name: 'two/id',
                        path: 'two/:id',
                        component: navigatorTwoThree,
                        hidden: true,
                        meta: {
                            activeMenu: '/navigatorTwo/itemTwo/table2'
                        }
                    },
                ]
            },
            {
                path: 'itemThree',
                component: navigatorTwoThree,
                meta: {
                    title: 'item three',
                }
            },
            {
                path: 'itemFour',
                component: navigatorTwoFour,
                meta: {
                    title: 'item four',
                }
            },
        ]
    },
    {
        path: '*',
        name: '404',
        component: errorPage,
        hidden: true
    }
]


