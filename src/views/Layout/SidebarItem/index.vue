<template>
  <div v-if="!route.hidden">
    <template v-if="hasOneShowingChild(route.children,route) && (!onlyOneChild.children)">
      <router-link v-if="onlyOneChild" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item v-if="onlyOneChild.meta" :index="resolvePath(onlyOneChild.path)">
           <svg-icon :iconName="(onlyOneChild.meta.icon || (route.meta&&route.meta.icon))"></svg-icon>
          <span slot='title'>{{onlyOneChild.meta.title}}</span>
        </el-menu-item>
      </router-link>
    </template>
    <el-submenu v-else :index="resolvePath(route.path)" popper-append-to-body>
      <template slot="title">
        <!-- <i :class="`iconfont ${route.meta&&route.meta.icon} mr10`"></i> -->
        <svg-icon :iconName="route.meta.icon"></svg-icon>
        <span slot='title' v-if="!isCollapse">{{route.meta.title}}</span>
      </template>
        <sidebar-item
          v-for="child in route.children"
          :key="child.path"
          :route="child"
          :is-nest="true"
          :base-path="resolvePath(child.path, 'str')"
        />
    </el-submenu>
  </div>
</template>

<script>
// 关于为什么写成组件的形式 sidebarItem 这个本身存在重复的部分
import path from 'path'
export default {
  name: 'sidebarItem',
  props: ['isCollapse', 'route', 'basePath'],
  data() {
    this.onlyOneChild = null
    return {
    }
  },
  methods: {
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          this.onlyOneChild = item
          return true
        }
      })
      if (showingChildren.length === 1) {
        return true
      }
      if (showingChildren.length === 0) {
        // 如果没有 children, 但是它的父级存在 children 那么将走下面el-submenu的流程
        this.onlyOneChild = { ...parent, path: '' }
        return true
      }
      return false
    },
    resolvePath(routePath, str) {
      return path.resolve(this.basePath, routePath)
      // 如果直接用字符串连接的方式，会导致，浏览器里显示争取，但是并没有匹配上，刷新浏览器才匹配上
    }
  }
}
</script>

<style scoped lang="less">
.mr10 {
  margin-right: 10px;
}
</style>
