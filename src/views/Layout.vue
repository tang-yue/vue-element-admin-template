<template>
    <div class="layout" v-if="hasPower" >
        <div class="aside">
            <div class="menu">
                <div v-show="powerUser"
                    :class="{ highlight:changeRed == 1 }"
                    @click="change(1)">
                    <router-link to="/fe-staff/power">成员管理</router-link>
                </div>
                <div v-show="powerRole"
                    :class="{ highlight:changeRed == 2 }"
                    @click="change(2)">
                    <router-link to="/fe-staff/control">角色管理</router-link>
                </div>
            </div>
        </div>
        <div class="main">
            <div class="header">
               <el-popover 
                class="nickname" 
                placement="bottom"
                width="200"
                trigger="click">
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
</template>

<script>
import { getUserInfo } from '@/services/login.js';
import { mapState, mapActions } from 'vuex';
import Cookie from "js-cookie";
import '../assets/iconfont.js';

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
                {'link': '/control', 'name': '成员管理'},
                {'link': '/power', 'name': "角色管理"}
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
      if (window.location.pathname.split('/')[2] === 'power') {
        this.changeRed = 1;
       } else {
        this.changeRed = 2;
       }
       getUserInfo({
         type: 'get',
         params: {userId: Cookie("staffUserId"), staffId: Cookie("staffId"), token: Cookie("staffToken")}
       }).then((res) => {
         if(res.errCode === 0) {
            this.savePower(res.data.permissionCodeList);
            this.powerUser = res&&res.data&&res.data.permissionCodeList.indexOf("user:menu") !== -1;
            this.powerRole = res&&res.data&&res.data.permissionCodeList.indexOf("role:menu") !== -1; 
            if(res.data && 
                res.data.permissionCodeList.indexOf("user:menu") !== -1 && 
                res.data.permissionCodeList.indexOf("role:menu") !== -1) {
                 this.hasPower = true;
            } else {
                this.$router.push('/fe-staff/login');
                 this.$message({message: "抱歉你权限登录进去查看页面", duration: 5000});
                 this.hasPower = false;
            }
         }
       })
    },
    methods: {
        ...mapActions([
            'savePower'
        ]),
        change(index) {
            this.changeRed = String(index);
        },
        logOut() {
            Cookie.remove('staffId');
            Cookie.remove('staffToken');
            Cookie.remove('staffNickname');
            Cookie.remove("staffUserId");
            this.$router.push('/fe-staff/login')
        }
    }
}
</script>

<style scoped>
.header {
    background-color: #fff;
    height: 70px;
    line-height: 70px; 
    padding-right: 60px;
}
.logout {
    cursor: pointer;
    text-align: center;
    width: 100px;
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
.nickname:hover {
    background-color: rgba(48, 65, 86, 0.3);
}
.highlight {
        background-color: #1f2d3d;
    }
    html,body,#app {
        height: 100%;
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
        text-indent: 40px;
        margin: 0 0 30px 0;
        padding: 10px 0 15px 0;    
    }
    .menu div:hover {
        background-color: #001528;
    }
    .menu div a {
        text-decoration: none;
        color: rgb(64, 158, 255);
    }
    .layout {
        display: flex;
        height: 100%;
        background-color: #eee;
        min-height: max-content;
        min-height: -moz-max-content;
    }
.body {
    margin-right: 100px;
    margin-left: 40px;
}
</style>



