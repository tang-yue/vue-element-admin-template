<template>
    <div class="dialog">
        <el-dialog :title="title" :visible.sync="showVisible">
            <slot></slot>
            <div slot="footer" class="dialog-footer">
                <el-button @click="onCancel">
                 {{cancelText}}
                </el-button>
                <el-button type="primary" @click="handleOk">
                 {{okText}}
                </el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>

export default {
  name: 'Pagination',
  props: {
    title: {
        type: String,
        default: '标题'
    },
    show: {
      type: Boolean,
      default: false
    },
    okText: {
      type: String,
      default: '确定'
    },
    cancelText: {
        type: String,
        default: '取消'
    }
  },
  computed: {
    showVisible: {
      get() {
        return this.show
      },
      set(val) {
        this.$emit('update:show', val)
      }
    }
  },
  methods: {
      handleOk() {
          this.$emit('ok')
          this.$emit('update:show', false)
      },
      onCancel() {
          this.$emit('cancel')
          this.$emit('update:show', false)
      }
  }
}

</script>

<style scoped>

</style>