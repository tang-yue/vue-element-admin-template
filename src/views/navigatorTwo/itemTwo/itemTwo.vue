<template>
    <div class="title">
       /navigatorTwo/itemTwo
        <el-button @click="tohiddenPath()">跳转隐藏自路由</el-button>
    </div>
</template>


<script>

export default {
    name: 'itemTwo',
     methods: {
        tohiddenPath() {
            this.$router.push({ path: '/navigatorTwo/itemTwo/two/1'})
        }
    }
}
</script>

<style lang="less">
.title {
    color: blue;
    .subTitle {
        color: red;
    }
}
</style>
