<template>
<div>

  <el-button
   size="mini"
   type="success"
   @click="father.operationEdit(params.data,params.rowIndex,1)">
    修改
  </el-button>

  <el-popover
    placement="top-start"
    :title="params.data.status == 1?'确定禁用收款设定':'确定启用收款设定'"
    width="180"
    trigger="click"
    v-model="visible"
  >
    <div style="text-align: right; margin: 0">
      <el-button size="mini" type="text" @click="visible = false">取消</el-button>
      <el-button type="primary" size="mini" @click="father.operationEdit(params.data,params.rowIndex,2)">确定</el-button>
    </div>
    <el-button
      slot="reference"
      title="删除"
      size="mini"
      :type="params.data.status == 1?'danger':'primary'"
      @click="visible = true">
      {{params.data.status == 1?'禁用':'启用'}}
    </el-button>
  </el-popover>

  <el-popover
    placement="top-start"
    title="确定删除收款信息?"
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
      删除
    </el-button>
  </el-popover>

</div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      visible2: false,
      father:null
    }
  },
  beforeMount() {},
  mounted() {
    this.father = this.params.context.componentParent
    // this.params.context.componentParent.operationEdit()
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
