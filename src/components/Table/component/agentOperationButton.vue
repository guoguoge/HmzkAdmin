<template>
<div>

  <el-button
    title="修改"
    size="mini"
    type="success"
    @click="father.operationEdit(params.data,params.rowIndex,1)">
    修改
  </el-button>

  <el-popover
    placement="top-start"
    :title="data.is_allow==1?'确认禁用代理商账号?':'确认启用代理商账号?'"
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
      :title="data.is_allow==1?'确认禁用代理商账号?':'确认启用代理商账号?'"
      size="mini"
      type="danger"
      v-if="data"
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
      visible:false,
      data:null,
      father:null
    }
  },
  beforeMount(){
    console.log(this.params.data);
    this.data = this.params.data
  },
  mounted(){
    this.father = this.params.context.componentParent
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
