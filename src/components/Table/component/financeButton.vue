<template>
<div>
  <el-popover v-if="params.data.cwcode == 1 || params.data.code == 1" placement="top-start" :title="params.data.cwcode == 1?'确认出纳确认?':'确认会计确认?'" width="180" trigger="click" v-model="visible">
    <div style="text-align: right; margin: 0">
      <el-button size="mini" type="text" @click="visible = false">取消</el-button>

      <el-button type="primary" size="mini" @click="father.financChack(params.data,params.rowIndex)">确定</el-button>
    </div>
    <el-button slot="reference" size="mini" type="primary" @click="visible = true">
      {{params.data.cwcode == 1?'出纳确认':'会计确认'}}
    </el-button>
  </el-popover>

  <el-popover v-if="params.data.cwcode == 1" placement="top-start" title="确定删除?" width="180" trigger="click" v-model="visible2">
    <div style="text-align: right; margin: 0">
      <el-button size="mini" type="text" @click="visible2 = false">取消</el-button>

      <el-button type="primary" size="mini" @click="father.operationDelete(params.data,params.rowIndex)">确定</el-button>

    </div>
    <el-button slot="reference" title="删除" size="mini" type="danger" @click="visible2 = true">
      删除订单
    </el-button>
  </el-popover>
  <el-tag type="success" v-if="params.data.cwcode == 2 && params.data.code == 2">
    正在运行
  </el-tag>
  <el-tag type="error" v-if="params.data.status == 3">
    订单已取消
  </el-tag>
</div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      visible2: false,
      father: null
    }
  },
  beforeMount() {},
  mounted() {
    this.father = this.params.context.componentParent
    // console.log(this.params.data);
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>{

}
