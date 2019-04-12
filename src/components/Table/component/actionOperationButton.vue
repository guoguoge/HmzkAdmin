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
    :title="params.data.status == 1?'确认下架竞拍?':'确认上架竞拍?'"
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
      size="mini"
      :type="params.data.status == 1?'danger':'success'"
      v-if="data"
      @click="visible = true">
      {{ params.data.status == 1?'下架':'上架'}}
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
