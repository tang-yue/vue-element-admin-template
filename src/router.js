import Vue from 'vue'
import Router from 'vue-router'

import Layout from './views/Layout'

import Login from './views/Login'
// 共同拥有部分, 不需要任何的权限
import UserRelation from './views/UserRelation/UserRelation'
// 404 页面
import errorPage from './views/error-page/404'

// 产品运营部分
import PunchCard from './views/Card/PunchCard/PunchCard'
import GiftBanner from './views/Card/GiftBanner/GiftBanner'
import CardGroup from './views/Card/CardGroup/CardGroup'
// 邀请有礼活动管理部分
import CommonInvite from './views/Invite/CommonInvite'
// 创建/编辑邀请有礼活动
import InviteHead from './views/Invite/CreateInvite/CreateInvite'
import InviteActivityContent from './views/Invite/CreateInvite/ActivityContent'
import InvitePublicContent from './views/Invite/CreateInvite/PublicContent'
import InviteTemplateMsg from './views/Invite/CreateInvite/templateMsg'


import InviteList from './views/Invite/InviteList/InviteList'
import InviteTextList from './views/Invite/InviteTextList/InviteTextList'
import InvitePoster from './views/Invite/InvitePoster/InvitePoster'
import InviteCashbackOrders from './views/Invite/InviteCashbackOrders/InviteCashbackOrders'



Vue.use(Router);

export default new Router({
    mode: 'history',
    base: '/fe-user-growth',
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
            redirect: '/dashboard/userRelation',
            children: [
                {
                    path: 'userRelation',
                    component: UserRelation,
                    meta: {
                        title: '登录成功页',
                        menuPath: '/dashboard/userRelation',
                        powerCode: ' '
                    }
                }
            ]
        },
        {
            path: '/card',
            name: '产品运营',
            component: Layout,
            redirect: '/card/punchCard',
            children: [
                { 
                    path: 'punchCard',
                    component: PunchCard,
                    meta: {
                        title: '打卡分享页', 
                        menuPath: '/card/punchCard',
                        powerCode: 'punch_share:view'
                    } 
                },
                {
                    path: 'giftBanner',
                    component: GiftBanner,
                    meta: {
                        title: '打卡页礼物banner',
                        menuPath: '/card/giftBanner',
                        powerCode: 'punch_gift:view'
                    }
                },
                {
                    path: 'group',
                    component: CardGroup,
                    meta: {
                        title: '拼团管理',
                        menuPath: '/card/group',
                        powerCode: 'group:view'
                    }
                }
            ]
        },
        {
            path: '/invite',
            name: '邀请有礼活动',
            component: Layout,
            redirect: '/invite/create',
            children: [
                {
                    path: 'create',
                    component: CommonInvite,
                    redirect: '/invite/create/head/head',
                    meta: {
                        title: '创建活动',
                        menuPath: '/invite/create',
                        powerCode: 'inviteList:view'
                    },
                    children: [
                        {
                            path: 'head/:id',
                            component: InviteHead,
                        },
                        {
                            path: 'activityContent/:id',
                            component: CardGroup
                        },
                        {
                            path: 'publicContent/:id',
                            component: CardGroup
                        },
                        {
                            path: 'templateMsg/:id',
                            component: CardGroup
                        },
                        {
                            path: 'configurePage/:id',
                            component: CardGroup
                        }
                    ]
                },
                {
                    path: 'list',
                    component: InviteHead,
                    redirect: '/invite/list/table',
                    meta: {
                        title: '全部活动',
                        menuPath: '/invite/list',
                        powerCode: 'inviteList:view'
                    },
                    children: [
                        {
                            path: 'table',
                            component: InviteHead,
                        },
                        {
                            path: 'head/:id',
                            component: InviteHead,
                        },
                        {
                            path: 'activityContent/:id',
                            component: CardGroup
                        },
                        {
                            path: 'publicContent/:id',
                            component: CardGroup
                        },
                        {
                            path: 'templateMsg/:id',
                            component: CardGroup
                        },
                        {
                            path: 'configurePage/:id',
                            component: CardGroup
                        }
                    ]
                },
                {
                    path: 'text',
                    component: InviteTextList,
                    meta: {
                        title: '文案管理',
                        menuPath: '/invite/text',
                        powerCode: 'inviteTextLists:view'
                    }
                },
                {
                    path: 'poster',
                    component: InvitePoster,
                    meta: {
                        title: '海报管理',
                        menuPath: '/invite/poster',
                        powerCode: 'invitePosterList:view'
                    }
                },
                {
                    path: 'cashbackOrders',
                    component: InviteCashbackOrders,
                    meta: {
                        title: '返回订单',
                        menuPath: '/invite/cashbackOrders',
                        powerCode: 'inviteList:view'
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

