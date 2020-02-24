<template>
    <div class="layout" v-bind:class="{hideSidebar: isCollapse}">
        <div class="menu">
            <el-scrollbar wrap-class="scrollbar-wrapper">
                <el-menu
                  :collapse="isCollapse"
                  :default-active="activeMenu"
                  background-color="#304156"
                  text-color="#dee4eb"
                  v-bind:class="{activeWidth: !isCollapse}"
                  class="el-menu-vertical-demo"
                  :collapse-transition="false"
                >
                 <!-- 这个地方要重写  三级路由 和 实现 单条没有不带下拉 -->
                  <sidebar-item :isCollapse="isCollapse"  v-for="(route) in routesConfig" :key="route.path" :route="route" :base-path="route.path"/>
                </el-menu>
            </el-scrollbar>
        </div>
        <app-main :isCollapse="isCollapse" @fold="fold" />
    </div>
</template>

<script>

import { mapGetters } from 'vuex'
import AppMain from './appMain'
import SidebarItem from './SidebarItem'

export default {
  name: 'Home',
  components: { AppMain, SidebarItem },
  data () {
    return {
      isCollapse: false,
      route: this.$route,
      cachedViews: []
    }
  },
  computed: {
    ...mapGetters([
      'roles',
      'routesConfig'
    ]),
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    }
  },
  methods: {
    fold () {
      this.isCollapse = !this.isCollapse
    },
    isPower (powerCode) {
      if (powerCode === ' ') return true
      if (this.roles.indexOf(powerCode) !== -1) return true
      else return false
    }
  }
}
</script>

<style lang="less" scoped>
.mr10 {
  margin-right: 10px;
}
</style>
