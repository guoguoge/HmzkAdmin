<template>
<div>

  <el-popover
  v-if="params.data.status == 1"
    placement="top-start"
    title="确认提现申请"
    width="180"
    trigger="click"
    v-model="visible"
  >
    <div style="text-align: right; margin: 0">
      <el-button size="mini" type="text" @click= "visible = false">取消</el-button>
      <el-button type="primary" size="mini" @click="father.operationEdit(params.data,params.rowIndex)">确定</el-button>
    </div>
    <el-button
      slot="reference"
      size="mini"
      type="primary"
      @click="visible = true">
      同意提现
    </el-button>
  </el-popover>

  <el-popover
  v-if="params.data.status == 1"
    placement="top-start"
    title="确定拒绝?"
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
      拒绝申请
    </el-button>
  </el-popover>

  <el-tag type="success" v-if="params.data.status != 1">
   {{params.data.status == 1 ? '未处理' : params.data.status == 2 ? '已到账' : '已被拒绝'}}
  </el-tag>
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
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
