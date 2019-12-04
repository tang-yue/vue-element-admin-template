<template>
    <div>
        <div v-if="hasPower">
            <slot></slot>
        </div>
        <div v-else>抱歉，你没有权限访问</div>
    </div>
</template>


<script>
import { mapGetters } from 'vuex'
import { judgePower } from '@/utils/utils'

export default {
    name: 'PowerWrapper',
    computed: {
         ...mapGetters([
            "roles",
        ]),
        hasPower() {
            return judgePower(this.roles, 'xxxxx_management')
        }
    }
}
</script>

<style scoped>

</style>
