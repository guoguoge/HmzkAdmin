<template>
<div class="tableBox">
  <el-row style="margin-bottom:1rem" type="flex" justify="space-between" :gutter="20">
    <el-col>
      发券设置
    </el-col>
    <el-col :span="3">
      <el-button style="width:100%;" size="mini" type="default" @click.native="addCoupon">新 增</el-button>
    </el-col>
    <el-col :span="3">
      <el-button style="width:100%;" size="mini" type="default" @click="clearCoupon">清 空</el-button>
    </el-col>
  </el-row>
  <el-table empty-text="暂无优惠券设置" max-height="300" :data="tableData" stripe highlight-current-row size="mini" class="table" border>

    <el-table-column width="150" align="center" fixed="right" label="对应时长">
      <template slot-scope="scope">
        <el-select size="small" v-model="scope.row.scope" placeholder="请选择">
          <el-option v-for="item in scopes" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </template>
    </el-table-column>

    <el-table-column width="150" align="center" fixed="right" label="应用场景">
      <template slot-scope="scope">
        <el-select size="small" v-model="scope.row.scene" placeholder="请选择">
          <el-option v-for="item in scenes" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </template>
    </el-table-column>

    <el-table-column width="150" align="center" fixed="right" label="优惠方式">
      <template slot-scope="scope">
        <el-select size="small" v-model="scope.row.type" placeholder="请选择">
          <el-option v-for="item in type" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </template>
    </el-table-column>

    <el-table-column align="center" fixed="right" label="优惠数值">
      <template slot-scope="scope"> 
        <el-input-number size="mini" placeholder="送时长:请输入赠送时长"  :precision="0" :min="0" v-if="scope.row.type == 1" v-model.number="scope.row.day_agio" controls-position="right"></el-input-number>
        <el-input-number size="mini" placeholder="打折扣:请输入优惠数值(数值<1)" :precision="3" v-else :max="1" :min="0" v-model.number="scope.row.pay_agio" controls-position="right"></el-input-number>
      </template>
    </el-table-column>

    <el-table-column align="center" width="50" fixed="right" label="操作">
      <template slot-scope="scope">
        <i class="el-icon-delete" @click="deleteCoupon(scope)"></i>
      </template>
    </el-table-column>

  </el-table>
</div>
</template>

<script>
import {
  parseTime
} from '@/utils'

export default {
  components: {},
  props: {},
  data() {
    return {
      tableData: [],
      currentPage: 4,
      loading: true,
      tHeader: [], // 导出的Excel的头部
      filterVal: [], // 导出的Excel的value值
      visible: false,
      scopes: [{
        value: 30,
        label: '30天'
      }, {
        value: 720,
        label: '720天'
      }],
      scenes: [
      //   {
      //   value: 1,
      //   label: '所有订单'
      // },
      {
        value: 2,
        label: '新购订单'
      },
      // {
      //   value: 3,
      //   label: '续费订单'
      // }
    ],
      type: [{
        value: 1,
        label: '加天数'
      }, {
        value: 2,
        label: '打折'
      }],
    }
  },
  created() {},
  mounted() {},
  methods: {
    indexMethod(index) { // 序号方法
      return index + 1
    },
    addCoupon() {
      this.tableData.push({
        type: '', //1:赠送时长  2:打折
        scene: '', //1:所有 2:新订单 3: 续费订单
        day_agio: '',
        pay_agio: '',
        scope: '',
      })
    },
    deleteCoupon(scope) {
      this.tableData.splice(scope.$index, 1)
      this.$message({
        message: '已删除第' + (scope.$index + 1) + '条优惠券',
        type: 'success'
      })
    },
    clearCoupon() {
      this.tableData = []
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.tableBox {
    margin: 2rem 0;
    .el-icon-delete {
        font-size: 20px;
        color: red;
    }
    .el-icon-delete:hover {
        cursor: pointer;
        color: #f56c6c;
    }
}
</style>
