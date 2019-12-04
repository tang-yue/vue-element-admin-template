<template>
  <div class="main">
      <div class="header">
          <i class="el-icon-s-fold" v-if="!isCollapse" @click="fold"></i>
          <i class="el-icon-s-unfold" @click="fold" v-else></i>
          <el-dropdown class="user">
              <div>{{ userName || ''}}</div>
              <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>
                      <span @click="signOut">注销</span>
                  </el-dropdown-item>
              </el-dropdown-menu>
          </el-dropdown>
      </div>
      <div class="content">
        <router-view :key="key" />
      </div>
  </div>
</template>

<script>
import {
  removeToken
} from '@/utils/auth'

export default {
  name: 'appMain',
  props: ['isCollapse'],
  data() {
    return {
      userName: this.$store.state.user.username
    }
  },
  computed: {
    key () {
      return this.$route.path
    }
  },
  methods: {
    fold() {
      this.$emit('fold')
    },
    signOut () {
      removeToken()
      this.$router.push({ path: '/login' })
    }
  }
}
</script>

<style scoped lang="less">
.main {
  .content {
    position: relative;
    margin: 10px;
    padding: 10px;
    background-color: #fff;
    border-radius: 5px;
  }
}
</style>
