<template>
<div class="app-container">
  <AGTable :rowData="rowData" :columnDefs="column" :defaultColDef="config" @operationDelete="operationDelete" @operationEdit="operationEdit" @operationDetail="operationDetail">
    <template slot="notice" slot-scope="props">
      <el-button class="beesbit-sec-btn" @click.native="addCoupon">新建优惠券</el-button>
    </template>
  </AGTable>
  <el-dialog :visible.sync="show" title="新建优惠券" width="50%" top="5vh" center>

    <!-- 基础表单信息 -->
    <baseForm ref="baseForm"></baseForm>

    <!-- 筛选用户 -->
    <userFilter ref="userFilter"></userFilter>

    <!-- 制定优惠券规则 -->
    <couponList ref="couponList"></couponList>

    <el-button class="beesbit-btn" style="width:100%;" @click="submit" :loading="loading">确 定</el-button>

  </el-dialog>

  <el-dialog :visible.sync="visible" title="查看发券用户" width="40%" top="5vh" center>
    <el-row class="chooseBox" type="flex" justify="space-between">
      <el-col @click.native="agtableNum = 1" :span="11" class="chooseItem" :class="agtableNum == 1?'active':''">
        <span>已使用用户</span>
        <span>{{rowUseData.length}}</span>
      </el-col>
      <el-col @click.native="agtableNum = 2" :span="11" class="chooseItem" :class="agtableNum == 2?'active':''">
        <span>未使用用户</span>
        <span>{{rowUnUseData.length}}</span>
      </el-col>
    </el-row>
    <AGTable :height="'height:50vh'" v-show="agtableNum == 1" :rowData="rowUseData" :columnDefs="columnDetails" :defaultColDef="configDetails">
    </AGTable>
    <AGTable :height="'height:50vh'" v-show="agtableNum == 2" :rowData="rowUnUseData" :columnDefs="columnDetails" :defaultColDef="configDetails">
    </AGTable>
    <el-button style="width:100%;" class="beesbit-btn" @click="visible = false">确 定</el-button>
  </el-dialog>
</div>
</template>

<script>
import AGTable from '@/components/Table/AGTable'
import couponList from './component/couponList'
import userFilter from './component/userFilter'
import baseForm from './component/baseForm'

import {
  jsonpReturn,
  checkRequest
} from '@/utils'

import {
  mapGetters
} from 'vuex'

import {
  CouponList,
  CouponListUser,
  SendCoupon,
  CouponUser,
  DelCoupon
} from '@/api/beesbit'

export default {
  data() {
    return {
      rowData: [], //表格源数据
      rowUseData: [], //已使用优惠券表格源数据
      rowUnUseData: [], //未使用优惠券表格源数据
      column: [{
          headerName: '优惠券ID',
          field: 'id',
          cellStyle: {
            color: '#8D8D8D'
          },
        },
        {
          headerName: '优惠券标题',
          field: 'title',
          cellStyle: {
            color: '#8D8D8D'
          },
        },
        {
          headerName: '说明',
          field: 'content',
          cellStyle: {
            color: '#8D8D8D'
          },
        },
        {
          headerName: '优惠详情',
          field: 'age',
          cellStyle: {
            color: '#8D8D8D'
          },
          cellRenderer: params => {
            return params.data.type == 1 ? '增加 ' + params.data.day_agio + ' 天' : '总价 ' + params.data.pay_agio + ' 折扣';
          },
          valueGetter: params => {
            return params.data.type == 1  ? '增加 ' + params.data.day_agio + ' 天' : '总价 ' + params.data.pay_agio + ' 折扣';
          }
        },
        {
          headerName: '发布时间',
          field: 'time',
          cellStyle: {
            color: '#8D8D8D'
          },
        },
        {
          headerName: '开始时间',
          field: 'start',
          cellStyle: {
            color: '#8D8D8D'
          },
        },
        {
          headerName: '过期时间',
          field: 'end',
          cellStyle: {
            color: '#8D8D8D'
          },
        },
        {
          headerName: '类型',
          field: 'type',
          cellStyle: {
            color: '#8D8D8D'
          },
          cellRenderer: params => {
            return params.data.type == 1 ? '时长券' : '打折券';
          },
          valueGetter: params => {
            return params.data.type == 1 ? '时长券' : '打折券';
          }
        },
        {
          headerName: '应用场景',
          field: 'scene',
          cellStyle: {
            color: '#8D8D8D'
          },
          cellRenderer: params => {
            return params.data.scene == 1 ? '全部订单' : (params.data.scene == 2 ? '新购订单' : '续费订单');
          },
          valueGetter: params => {
            return params.data.scene == 1 ? '全部订单' : (params.data.scene == 2 ? '新购订单' : '续费订单');
          }
        },
        {
          headerName: '对应时长',
          field: 'tc_scope',
          cellStyle: {
            color: '#8D8D8D'
          },
          cellRenderer: params => {
            return params.data.tc_scope + ' 天套餐专用';
          },
          valueGetter: params => {
            return params.data.tc_scope + ' 天套餐专用';
          }
        },
        {
          headerName: '操作',
          field: '',
          cellRendererFramework: 'couponButton',
          cellStyle: {
            color: '#8D8D8D'
          },
          pinned: 'right',
          width: 220
        },
      ],
      columnDetails: [{
          headerName: '电话号码',
          field: 'tel',
          cellStyle: {
            color: '#8D8D8D'
          },
        },
        {
          headerName: '姓名',
          field: 'name',
          cellStyle: {
            color: '#8D8D8D'
          },
        }
      ],
      config: {
        width: 200,
        sortable: true,
        resizable: true,
        filter: true,
        search: true, //是否显示搜索框
      },
      configDetails: {
        width: 260,
        sortable: true,
        resizable: true,
        filter: true,
        search: false, //是否显示搜索框
      },
      show: false,
      loading: false,
      visible: false,
      agtableNum: 1
    }
  },
  computed: {
    ...mapGetters([
      'token'
    ])
  },
  watch: {
    agtableNum: function() {
      this.$nextTick(() => {
        let box = document.querySelectorAll('.ag-paging-panel')
        box[1].style.display = 'none'
        box[2].style.display = 'none'
      })
    }
  },
  components: {
    AGTable,
    couponList,
    userFilter,
    baseForm
  },
  methods: {
    init() {
      CouponList(this.token).then(res => {
        this.rowData = checkRequest(res, false)
        console.log(this.rowData);
      })
    },
    operationDetail(row, index) {
      this.visible = true
      this.$nextTick(() => {
        let box = document.querySelectorAll('.ag-paging-panel')
        box[1].style.display = 'none'
        CouponListUser(
          this.token,
          row.id
        ).then(res => {
          checkRequest(res, false)
          this.$nextTick(() => {
            this.rowUseData = checkRequest(res, false).used
            this.rowUnUseData = checkRequest(res, false).unused
          })
          console.log(this.rowUseData);
          console.log(this.rowUnUseData);
        })
      })
    },
    operationEdit(row, index) {
      this.show = true
      console.log(row, index)
    },
    operationDelete(row, index) {
      DelCoupon(this.token, row.id).then(res => {
        if (checkRequest(res, true)) {
          this.rowData = checkRequest(res, false)
          this.init()
        }
      })
    },
    chooseDetails(num) {
      this.agtableNum = num
    },
    addCoupon() {
      this.show = true
    },
    clearData() {
      this.$refs.baseForm.clear()
      this.$refs.couponList.clearCoupon()
    },
    submit() {
      this.loading = true
      let userFilterData = []

      let baseForm = this.$refs.baseForm // 基本信息
      let baseFormData = this.$refs.baseForm._data.form // 基本信息


      this.$refs.userFilter._data.userTableData.forEach(item => {
        userFilterData.push(item.id)
      }) //用户ID数组

      let couponListData = this.$refs.couponList._data.tableData //优惠券信息

      console.log(baseForm);
      // console.log(userFilterData);
      // console.log(baseFormData);
      console.log(couponListData);
      console.log(baseFormData);
      console.log(userFilterData);
      baseForm.validate()
      if (baseForm._data.valid && couponListData.length) {
        SendCoupon( //优惠券--设定及发送优惠券
          this.token,
          baseFormData.title,
          baseFormData.content,
          baseFormData.start,
          baseFormData.end,
          userFilterData,
          couponListData
        ).then(res => {
          checkRequest(res, true)
          this.show = false
          this.clearData()
          this.init()
          this.loading = false
        })
      } else {
        this.loading = false
        this.$message({
          message: '请按要求填写表单',
          type: 'warning'
        })
      }
    }
  },
  created() {
    this.init()
  },
  beforeMount() {},
  mounted() {}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.chooseBox {
    margin: 2rem 0;
    .chooseItem {
        background: #F2F2F2;
        padding: 1rem;
        transition: all 0.3s;
        border-radius: 5px;
        display: flex;
        justify-content: space-between;
    }
    .chooseItem.active {
        background: #FFC049;
        color: white;
    }
    .chooseItem:hover {
        cursor: pointer;
        background: #FFC049;
        color: white;
    }
}
</style>
