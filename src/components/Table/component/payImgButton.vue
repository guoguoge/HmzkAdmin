<template>
<div>
  <!-- <el-button @click.native="message(1)" title="查看支付截图" icon="el-icon-search" size="mini" circle /> -->
  <a :href=" 'http://'+ params.data.pay_img" target="_blank">查看截图</a>


  <!-- <el-dialog :append-to-body="true" title="查看支付截图" :visible.sync="show" width="60%" center>
    <img :src="'http://'+ params.data.pay_img" width="100%">
    <el-row type="flex" justify="center" style="margin-top:2rem">
      <el-button style="width:100%" class="beesbit-btn" type="primary" @click="show = false">确 定</el-button>
    </el-row>
  </el-dialog> -->
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
    message(num) {
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
