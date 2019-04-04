<template>
<div>
  <el-button
    title="修改"
    size="mini"
    type="primary"
    @click="father.operationDetail(params.data,params.rowIndex)">
    查看发券用户
  </el-button>

  <el-popover
    placement="top-start"
    title="确定删除?"
    width="180"
    trigger="click"
    v-model="visible"
  >
    <div style="text-align: right; margin: 0">
      <el-button size="mini" type="text" @click="visible = false">取消</el-button>
      <el-button type="primary" size="mini" @click="father.operationDelete(params.data,params.rowIndex)">确定</el-button>
    </div>
    <el-button
      slot="reference"
      title="修改"
      size="mini"
      type="danger"
      @click="visible = true"
      >
      删除
    </el-button>
  </el-popover>

</div>
</template>

<script>
export default {
  data(){
    return{
      visible:false,
      visible2:false,
      father:null
    }
  },
  beforeMount(){
  },
  mounted(){
    this.father = this.params.context.componentParent
    // console.log(this.params.data);
    // this.params.context.componentParent.operationEdit()
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
