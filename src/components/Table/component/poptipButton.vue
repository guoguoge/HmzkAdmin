<template>
<div>
  <el-button @click.native="message" title="查看公告详情" icon="el-icon-search" size="mini" circle />
  <el-dialog :append-to-body="true" title="查看公告详情" :visible.sync="show" width="70%" center>
    <div v-html="params.data.body"></div>
    <el-row type="flex" justify="center" style="margin-top:2rem">
      <el-button style="width:100%" class="beesbit-btn" type="primary" @click="show = false">关 闭</el-button>
    </el-row>
  </el-dialog>
</div>
</template>

<script>
export default {
  data() {
    return {
      show: false
    }
  },
  methods: {
    message() {
      this.show = true
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
</style>
