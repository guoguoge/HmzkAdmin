<template>
<div>
  <el-tag v-if="params.data.cwcode != 3" title="会计确认" :type="params.data.cwcode== 1?'info':'primary'">
    {{params.data.cwcode== 1?'会计未确认':'会计已确认' }}
  </el-tag>
  <el-tag v-if="params.data.status != 3" title="出纳确认" :type="params.data.status== 1?'info':'success'">
    {{params.data.status== 1?'出纳未确认':'出纳已确认'}}
  </el-tag>
  <el-tag type="danger" v-if="params.data.cwcode == 3 && params.data.status == 3">
    余额提现申请已取消
  </el-tag>
</div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    message(num) {

    }
  },
  beforeMount() {},
  mounted() {
    console.log(this.params.data);
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
