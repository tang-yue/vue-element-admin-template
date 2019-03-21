<template>
    <div class="layout-wrapper">
        <div class="layout" v-if="hasPower" >
            <div class="aside">
                <div class="menu">
                    <div v-show="powerUser"
                        :class="{ highlight:changeRed == 1 }"
                        @click="change(1)">
                        成员管理
                    </div>
                    <div v-show="powerRole"
                        :class="{ highlight:changeRed == 2 }"
                        @click="change(2)">
                        角色管理
                    </div>
                </div>
            </div>
            <div class="main">
                <div class="header">
                   <el-popover 
                    class="nickname" 
                    placement="bottom"
                    width="200"
                    trigger="hover">
                    <p @click="logOut" class="logout">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-log-out"></use>
                        </svg>
                        退出登录
                    </p>
                    <el-button slot="reference">{{nickname ? nickname : ''}}</el-button>
                   </el-popover>
                </div>
                <div class="body">
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getUserInfo } from '@/services/login';
import { mapState, mapActions } from 'vuex';
import Cookie from 'js-cookie';
import '../assets/iconfont';

export default {
    name: 'Power',
    computed: {
        ...mapState([
            'permissionList'
        ])
    },
    data() {
        return {
            list: [
                { link: '/control', name: '成员管理' },
                { link: '/power', name: '角色管理' }
            ],
            changeRed: -1,
            nickname: Cookie('staffNickname'),
            hasPower: false,
            powerUser: false,
            powerRole: false
        }
    },
    components: {

    },
    created() {
      if (window.location.pathname.split('/')[2] === 'control') {
        this.changeRed = 2;
        this.$router.push('/fe-staff/control');
      } else if (window.location.pathname.split('/')[2] === 'power') {
        this.changeRed = 1;
        this.$router.push('/fe-staff/power');
      } else if (window.location.pathname.split('/')[2] === 'authority') {
        this.changeRed = 2;
      }
      this.getUserData();
    },
    methods: {
        ...mapActions([
            'savePower'
        ]),
        getUserData() {
            getUserInfo({
                type: 'get',
                params: { userId: Cookie('staffUserId'), staffId: Cookie('staffId'), token: Cookie('staffToken') }
            }).then((res) => {
                if (res.errCode === 0) {
                    this.savePower(res.data.permissionCodeList);
                    this.powerUser = res&&res.data&&res.data.permissionCodeList.indexOf('user:menu') !== -1;
                    this.powerRole = res&&res.data&&res.data.permissionCodeList.indexOf('role:menu') !== -1; 
                    if (res.data 
                     && res.data.permissionCodeList.indexOf('user:menu') !== -1
                     || res.data.permissionCodeList.indexOf('role:menu') !== -1) {
                         this.hasPower = true;
                    } else {
                         this.$router.push('/fe-staff/login');
                         this.$message({ message: '抱歉你没有权限登录进去查看页面', duration: 5000 });
                         this.hasPower = false;
                    }
                } else if (res.errCode === 10110002) {
                    this.$router.push('/fe-staff/login');
                }
            }) 
        },
        change(index) {
            this.changeRed = String(index);
            if (index === 1) {
                this.$router.push('/fe-staff/power');
            } else {
                this.$router.push('/fe-staff/control');
            }
        },
        logOut() {
            Cookie.remove('staffId');
            Cookie.remove('staffToken');
            Cookie.remove('staffNickname');
            Cookie.remove('staffUserId');
            this.$router.push('/fe-staff/login')
        }
    }
}
</script>

<style scoped>

.layout-wrapper {
  background-color: #eee;  
}
.layout {
    display: flex;
    height: 100%;
    background-color: #eee;
    min-height: 100vh;
}
.body {
    margin: 20px 100px 0 40px;
}
.header {
    background-color: #fff;
    height: 70px;
    line-height: 70px; 
    padding-right: 60px;
}
.logout {
    cursor: pointer;
    text-align: center;
    width: 80px;
}
.icon {
   width: 1em; height: 1em;
   vertical-align: -0.15em;
   fill: currentColor;
   overflow: hidden;
}
.nickname {
    float: right;
}
.highlight {
        background-color: #1f2d3d;
    }
.aside {
    background-color: rgb(48, 65, 86);
    width: 250px;
    min-height: max-content;
    min-height: -moz-max-content;
}
.main {
    flex: 1;
}
.menu {
    margin-top: 250px;
    font-size: 26px;
}
.menu div {
    cursor: pointer;
    text-indent: 40px;
    margin: 0 0 30px 0;
    padding: 10px 0 15px 0;
    color: rgb(64, 158, 255);  
}
.menu div:hover {
   background-color: #001528; 
}
</style>
