<template>
<div>
  <el-button slot="reference" title="查看合同" size="mini" type="text" circle>
    查看合同
  </el-button>
</div>
</template>

<script>
export default {
  data() {
    return {}
  },
  beforeMount() {},
  mounted() {
    // console.log(this.params.data);
    // this.params.context.componentParent.operationEdit()
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.el-button--mini.is-circle {
    padding: 0;
    width: 2rem;
    height: 2rem;
    border: 2rem;
}
</style>
