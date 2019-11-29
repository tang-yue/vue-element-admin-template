<template>
    <div class="title">Home 组件</div>
</template>


<script>
import { getData } from '../services/hello';
import axios from 'axios';

export default {
    name: 'Home',
    created() {
    //     axios('https://api.randomuser.me/?nat=US&results=5')
    // .then(response => {
    //     console.log(response)
    // })
    console.log(getData , '带return的')
    // console.log(ge)
        getData({
            method: 'get',
            params: {},
        }).then((res) => {
            // alert(res)
            if(res) {
                console.log(res, 'res')
            }
        })
    },
    mounted() {
        // this.get();
    },
    methods: {
        // get() {
            
        // }
    }
}
</script>

<style>
.title {
    color: red;
}
</style>
