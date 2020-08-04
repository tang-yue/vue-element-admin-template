<template>
  <div class="icon-item">
    <svg class="icon mr10" aria-hidden="true">
      <use :xlink:href="`#${iconName}`"></use>
    </svg>
  </div>
</template>

<script>
export default ({
  name: 'svg-icon',
  data() {
    return {
      
    }
  },
  props: {
    iconName: {
      type: String,
      required: false
    }
  }
})
</script>

<style lang="less">
.icon-item {
  text-align: center;
  float: left;
  color: #24292e;
  cursor: pointer;
  .icon {
    width: 1.5em;
    height: 1.5em;
    fill: #fff;
  }
  .mr10 {
    margin-right: 5px;
  }
}
</style>
