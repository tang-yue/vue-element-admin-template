<template>
    <div class="title">
        设置广告条件
    </div>
</template>


<script>
export default {
    name: 'AdvertiseCondition',
    created() {
        console.log(this.$route.params, this.$route.query, 'this.$router')
    },
    methods: {
        
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
