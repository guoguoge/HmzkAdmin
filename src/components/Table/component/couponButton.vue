<template>
<div>
<div v-if="params.data.origin != '夺宝'">
  <el-tag type="info" v-if="params.data.provide== 0">不发送</el-tag>
  <el-popover
  v-else-if="params.data.provide== 1"
    placement="top-start"
      :title="'确认发送奖品?'"
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
      :title="'确认发送奖品?'"
      size="mini"
      type="success"
      @click="visible = true"
      >
      发送奖品
    </el-button>
  </el-popover>
  <el-tag type="success" v-else>该奖品已发送</el-tag>
</div>


  <el-popover
  v-else
    placement="top-start"
    :title="'确认发送奖品?'"
    width="180"
    trigger="click"
    v-model="visible"
  >
    <div style="text-align: right; margin: 0">
      <el-button size="mini" type="text" @click="father.operationDelete(params.data,0)">不发送</el-button>
      <el-button size="mini" type="text" @click="father.operationDelete(params.data,1)">待发送</el-button>
      <el-button size="mini" type="text" @click="father.operationDelete(params.data,2)">已发送</el-button>
    </div>
    <el-button
      slot="reference"
      :title="'确认发送奖品?'"
      size="mini"
      type="success"
      @click="visible = true"
      >
      修改状态
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
