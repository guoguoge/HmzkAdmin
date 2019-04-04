<template>
<div>

  <el-popover
    placement="top-start"
    :title="params.data.tc_freeze == 1?'确定冻结套餐':'确定解冻结套餐'"
    width="180"
    trigger="click"
    v-model="visible"
  >
    <div style="text-align: right; margin: 0">
      <el-button size="mini" type="text" @click="visible = false">取消</el-button>
      <el-button type="primary" size="mini" @click="father.operationEdit(params.data,params.rowIndex)">确定</el-button>
    </div>
    <el-button
      slot="reference"
      title="删除"
      size="mini"
      :type="params.data.tc_freeze == 1?'success':'primary'"
      @click="visible = true">
       {{ params.data.tc_freeze == 1? "冻结" : "解冻" }}
    </el-button>
  </el-popover>

  <el-popover
    placement="top-start"
    title="确定删除套餐?"
    width="180"
    trigger="click"
    v-model="visible2"
  >
    <div style="text-align: right; margin: 0">
      <el-button size="mini" type="text" @click="visible2 = false">取消</el-button>
      <el-button type="primary" size="mini" @click="father.operationDelete(params.data,params.rowIndex)">确定</el-button>
    </div>
    <el-button
      slot="reference"
      title="删除"
      size="mini"
      type="danger"
      @click="visible2 = true">
      删除套餐
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
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
