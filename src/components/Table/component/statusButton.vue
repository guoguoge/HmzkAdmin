<template>
<div>
  <el-button
    title="修改"
    size="mini"
    type="success"
    @click="params.context.componentParent.operationEdit(params.data,params.rowIndex)">
    修改
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
      <el-button type="primary" size="mini" @click="params.context.componentParent.operationDelete(params.data,params.rowIndex)">确定</el-button>
    </div>
    <el-button
      slot="reference"
      title="删除"
      size="mini"
      type="danger"
      @click="visible = true">
      删除
    </el-button>
  </el-popover>
</div>
</template>

<script>
export default {
  data(){
    return{
      visible:false
    }
  },
  beforeMount(){
  },
  mounted(){
    // console.log(this.params.data);
    // this.params.context.componentParent.operationEdit()
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
