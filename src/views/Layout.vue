<template>
    <div class="layout">
        <div class="aside">
            <div class="menu">
                <div
                    :class="{ highlight:changeRed == 1 }"
                    @click="change(1)">
                    <router-link to="/power">成员管理</router-link>
                </div>
                <div
                    :class="{ highlight:changeRed == 2 }"
                    @click="change(2)">
                    <router-link to="/control">角色管理</router-link>
                </div>
            </div>
        </div>
        <div class="main">
            <div class="header"></div>
            <div class="body">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
import Cookie from "js-cookie";
export default {
    name: "Power",
    data() {
        return {
            list: [
                {"link": '/control', "name": '成员管理'},
                {"link": '/power', "name": "角色管理"}
            ],
            changeRed: -1
        }
    },
    components: {

    },
    created() {
     
    },
    methods: {
        change(index) {
            this.changeRed = String(index);
        },
    }
}
</script>

<style>
.highlight {
        background-color: #1f2d3d;
    }
    html,body,#app {
        height: 100%;
    }
    .aside {
        background-color: rgb(48, 65, 86);
        width: 250px;
        height: 100%;
        margin: 0 55px 0 0;
    }
    .main {
        flex: 1;
        margin-right: 100px;
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
    }
</style>



