<template>
<div>
  <!-- <el-button @click.native="message(1)" slot="reference" size="mini" :type="params.data.cwcode== 1?'info':'primary'">
    {{params.data.cwcode== 1?'出纳未确认':'出纳已确认'}}
  </el-button> -->
  <el-tag :type="params.data.cwcode== 1?'info':'primary'">
    {{params.data.cwcode== 1?'出纳未确认':'出纳已确认'}}
  </el-tag>
  <el-tag :type="params.data.code== 1?'info':'success'">
    {{params.data.code== 1?'会计未确认':'会计已确认'}}
  </el-tag>
  <!-- <el-button @click.native="message(2)" slot="reference" size="mini" :type="params.data.cwcode== 1?'info':'success'">
    {{params.data.code== 1?'会计未确认':'会计已确认'}}
  </el-button> -->
</div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {},
  beforeMount() {},
  mounted() {
    console.log(this.params.data);
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
    line-height: 2rem;
    text-align: center;
    display: inline-flex;
}
</style>
