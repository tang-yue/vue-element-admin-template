<template>
    <div class="layout" v-bind:class="{hideSidebar: isCollapse}">
        <div class="menu">
            <el-scrollbar wrap-class="scrollbar-wrapper">
                <el-menu 
                    :collapse="isCollapse" 
                    :default-active="activeMenu"
                    background-color="#304156"
                    text-color="#bfcbd9"
                    v-bind:class="{activeWidth: !isCollapse}"
                    class="el-menu-vertical-demo"
                    :collapse-transition="false"
                >
                    <div v-for="(route, index) in routesConfig" :key="route.path">
                        <el-submenu :index="`${index}`" class="nest-menu" v-if="route.isPower">
                            <template slot="title">
                                <i class="el-icon-takeaway-box"></i>
                                <span v-if="!isCollapse" slot='title'>{{route.name}}</span>
                            </template>
                            <div v-if="route.children&&route.children.length > 0">
                                <router-link v-for="(item, v) in route.children" :to="item.meta.menuPath" :key="item.path">
                                    <el-menu-item :index="`${index}-${v}`" v-if="isPower(item.meta.powerCode)">{{item.meta.title}}</el-menu-item>
                                </router-link>
                            </div>
                        </el-submenu>
                    </div>
                </el-menu>
            </el-scrollbar>
        </div>
        <div class="main">
            <div class="header">
                <i class="el-icon-s-fold" v-if="!isCollapse" v-on:click="fold"></i>
                <i class="el-icon-s-unfold" v-on:click="fold" v-else></i>
                <el-dropdown class="user">
                    <div>{{ userName }}</div>
                    <el-dropdown-menu>
                        <el-dropdown-item>
                            <span v-on:click="signOut">sign out</span>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
            <div class="content">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>


<script>
// 要将这个Layout 组件，写成menu形式，点击弹框收缩，伸展。
import { mapGetters } from 'vuex'
import path from 'path'
import { judgePower } from '../utils/utils'
import { getStaffNickname } from '../utils/auth'
import { 
    removeStaffUserId, 
    removeStaffId, 
    removeStaffNickname, 
    removeToken
} from '../utils/auth'
export default {
    name: 'Home',
    data() {
        return {
            isCollapse: false,
            activeMenu: "0-0",
            route: this.$route,
            userName: getStaffNickname()
        }
    },
    created() {        
        for(let i = 0; i < this.routesConfig.length; i++) {
            // 也就是说上面的index是这里i
            if(this.routesConfig[i].children) {
                this.routesConfig[i].isPower = false;
                for(let j = 0; j < this.routesConfig[i].children.length; j++) {
                    // 下面设置 this.activeMenu 属性
                    if(this.route.path.indexOf(this.routesConfig[i].children[j].meta.menuPath) !== -1 ||
                    this.routesConfig[i].children[j].meta.menuPath.indexOf(this.route.path) !== -1) {
                        this.activeMenu = `${i}-${j}`
                    }
                    // 下面设置 this.routesConfig[i].isPower
                    if(this.roles.includes(this.routesConfig[i].children[j].meta.powerCode)
                     || this.routesConfig[i].children[j].meta.menuPath === '/dashboard/userRelation') {
                        this.routesConfig[i].isPower = true;
                    }
                }
            }
        }
        if(this.route.path === '/') {
            this.activeMenu = '0-0'
        }
    },
    computed: {
        ...mapGetters([
            "roles",
            "routesConfig"
        ])
    },
    methods: {
        fold() {
            this.isCollapse = !this.isCollapse;
        },
        isPower(powerCode) {
            if(powerCode === ' ') return true;
            if(this.roles.indexOf(powerCode) !== -1) return true
            else return false
        },
        signOut() {
            console.log('signOut')
            removeStaffUserId();
            removeStaffId();
            removeStaffNickname();
            removeToken();
            this.$router.push('/fe-user-growth/login')
        }
    }
}
</script>

<style lang="less" scoped>
    .content {
        padding: 16px 16px 0 24px;
    }
</style>
