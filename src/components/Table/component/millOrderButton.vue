<template>
<div>
  <el-tag v-if="params.data.tracking_number" type="success">
    运单号已填写
  </el-tag>
  <el-popover v-else-if="params.data.cw_status != 3" placement="top-start" title="填写矿机运单号" width="180" trigger="click" v-model="visible">
    <div style="text-align: right; margin: 0">
      <div style="margin-bottom:1rem">
        <el-input v-model="input" placeholder="输入运单号"></el-input>
      </div>
      <el-button size="mini" type="text" @click="visible = false">取消</el-button>
      <el-button type="primary" size="mini" @click="track">确定</el-button>
    </div>
    <el-button slot="reference" size="mini" type="warning" @click="visible = true">
      填写运单号
    </el-button>
  </el-popover>

  <el-tag type="success" v-if="params.data.cw_status == 2 &&  params.data.cn_status == 2">
    订单已确认
  </el-tag>

  <el-tag type="info" v-else-if="params.data.cw_status == 3">
    订单已取消
  </el-tag>

  <el-popover v-else placement="top-start" title="确认矿机订单?" width="180" trigger="click" v-model="visible2">
    <div style="text-align: right; margin: 0">
      <el-button size="mini" type="text" @click="visible2 = false">取消</el-button>
      <el-button type="primary" size="mini" @click="father.financChack(params.data,params.rowIndex)">确定</el-button>
    </div>
    <el-button slot="reference" size="mini" type="primary" @click="visible2 = true">
      确认订单
    </el-button>
  </el-popover>

  <el-popover v-if="params.data.cw_status == 1" placement="top-start" title="确认取消矿机订单?" width="180" trigger="click" v-model="visible3">
    <div style="text-align: right; margin: 0">
      <el-button size="mini" type="text" @click="visible3 = false">取消</el-button>
      <el-button type="primary" size="mini" @click="father.operationDelete(params.data,params.rowIndex)">确定</el-button>
    </div>
    <el-button slot="reference" size="mini" type="danger" @click="visible3 = true">
      取消订单
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
      visible3: false,
      father: null,
      input: '', //运单号
    }
  },
  methods: {
    track() {
      if (this.input) {
        this.father.operationDetail(this.params.data, this.input)
      } else {
        this.$message({
          message: '运单号不能为空',
          type: 'warning'
        })
      }
    }
  },
  beforeMount() {},
  mounted() {
    this.father = this.params.context.componentParent
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>{

}
