<template>
<div>
  <!-- <el-button
  v-if="params.data.cwcode != 3"
  @click.native="message(1)"
  slot="reference"
  title="会计确认"
  size="mini"
  :type="params.data.cwcode== 1?'info':'primary'">
  {{params.data.cwcode== 1?'会计未确认':'会计已确认' }}
  </el-button> -->
  <!-- <el-button
  v-if="params.data.status != 3"
  @click.native="message(2)"
  slot="reference"
  title="出纳确认"
  size="mini"
  :type="params.data.status== 1?'info':'success'">
  {{params.data.status== 1?'出纳未确认':'出纳已确认'}}
  </el-button> -->
  <el-tag
  v-if="params.data.cwcode != 3"
  title="会计确认"
  :type="params.data.cwcode== 1?'info':'primary'">
  {{params.data.cwcode== 1?'会计未确认':'会计已确认' }}
  </el-tag>
  <el-tag
  v-if="params.data.status != 3"
  title="出纳确认"
  :type="params.data.status== 1?'info':'success'">
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
      // if (num == 1) {
      //   if (this.params.data.cwcode == 2) {
      //     this.$message({
      //       showClose: true,
      //       message: '会计已确认',
      //       type: 'success'
      //     });
      //   } else {
      //     this.$message({
      //       showClose: true,
      //       message: '会计未确认',
      //       type: 'error'
      //     });
      //   }
      // } else {
      //   if (this.params.data.code == 2) {
      //     this.$message({
      //       showClose: true,
      //       message: '出纳已确认',
      //       type: 'success'
      //     });
      //   } else {
      //     this.$message({
      //       showClose: true,
      //       message: '出纳未确认',
      //       type: 'error'
      //     });
      //   }
      // }
    }
  },
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
