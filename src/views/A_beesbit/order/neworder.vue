<template>
<div class="app-container">
  <AGTable :rowData="rowData" :columnDefs="column" :defaultColDef="config" @financChack="financChack" @operationDelete="operationDelete"></AGTable>
  <el-dialog :visible.sync="show" title="修改公告" width="70%" center>
    <span slot="footer" class="dialog-footer">
      <div>
        {{ rowContent }}
      </div>
      <el-button type="primary" @click="show = false">确 定</el-button>
    </span>
  </el-dialog>
</div>
</template>

<script>
import AGTable from '@/components/Table/AGTable'

import {
  jsonpReturn,
  checkRequest
} from '@/utils'

import {
  mapGetters
} from 'vuex'

import {
  PowerOrderList,
  PowerOrderAuditing,
  PowerOrderCancle
} from '@/api/beesbit'

export default {
  data() {
    return {
      rowData: [], //表格源数据
      column: [{
          headerName: '用户姓名',
          field: 'name',
          cellStyle: {
            color: '#8D8D8D'
          },
        },
        {
          headerName: '用户电话',
          field: 'tel',
          cellStyle: {
            color: '#8D8D8D'
          },
        },
        {
          headerName: '订单币种',
          field: 'coin',
          cellStyle: {
            color: '#8D8D8D'
          },
        },
        {
          headerName: '订单算力',
          field: 'power',
          cellStyle: {
            color: '#8D8D8D'
          },
        },
        {
          headerName: '订单周期',
          field: 'day',
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
          width: 200
        },
        {
          headerName: '结束时间',
          field: 'end',
          cellStyle: {
            color: '#8D8D8D'
          },
          width: 200
        },
        {
          headerName: '下单时间',
          field: 'order_time',
          cellStyle: {
            color: '#8D8D8D'
          },
          width: 200
        },
        {
          headerName: '订单价格',
          field: 'price',
          cellStyle: {
            color: '#8D8D8D'
          },
          cellRenderer: params => {
            return Number(params.data.price)
          },
          valueGetter: params => {
            return Number(params.data.price)
          },
        },
        {
          headerName: '支付状态',
          field: 'status',
          cellStyle: {
            color: '#8D8D8D'
          },
          cellRenderer: params => {
            return params.data.status == 1 ? '未支付' : (params.data.status == 2 ? '已支付' : '已取消');
          },
          valueGetter: params => {
            return params.data.status == 1 ? '未支付' : (params.data.status == 2 ? '已支付' : '已取消');
          }
        },
        {
          headerName: '订单种类',
          field: 'retype',
          cellStyle: {
            color: '#8D8D8D'
          },
          cellRenderer: params => {
            return params.data.retype == 1 ? '全款' : '分期';
          },
          valueGetter: params => {
            return params.data.retype == 1 ? '全款' : '分期';
          }
        },
        {
          headerName: '订单期数',
          field: 'stages',
          cellStyle: {
            color: '#8D8D8D'
          },
        },
        {
          headerName: '支付方式',
          field: 'stages',
          cellStyle: {
            color: '#8D8D8D'
          },
          cellRenderer: params => {
            return params.data.pay_type == 1 ? '全款' : '分期';
          },
          valueGetter: params => {
            return params.data.pay_type == 1 ? '全款' : '分期';
          }
        },
        {
          headerName: '支付币种',
          field: 'price_type',
          cellStyle: {
            color: '#8D8D8D'
          },
          cellRenderer: params => {
            return params.data.price_type == 1 ? '人民币' : 'USDT';
          },
          valueGetter: params => {
            return params.data.price_type == 1 ? '人民币' : 'USDT';
          }
        },
        {
          headerName: '订单号',
          field: 'order_id',
          cellStyle: {
            color: '#8D8D8D'
          },
        },
        {
          headerName: '转账截图',
          field: '',
          cellStyle: {
            color: 'red'
          },
          cellRendererFramework: 'payImgButton',
        },
        {
          headerName: '优惠券',
          field: 'coupon_info',
          cellStyle: {
            color: '#8D8D8D'
          },
          cellRenderer: params => {
            let data = params.data.coupon_info
            return data ? data.title + (data.day_agio ? data.day_agio + '天时长券' : data.pay_agio * 10 + '折扣券' ): '未使用优惠券';
          },
          valueGetter: params => {
            let data = params.data.coupon_info
            return data ? data.title + (data.day_agio ? data.day_agio + '天时长券' : data.pay_agio * 10 + '折扣券' ): '未使用优惠券';
          }
        },
        {
          headerName: 'ETH抵扣量',
          field: 'mortgage_eth',
          cellStyle: {
            color: '#8D8D8D'
          },
        },
        {
          headerName: '抵扣人民币量',
          field: 'discount',
          cellStyle: {
            color: '#8D8D8D'
          },
        },
        {
          headerName: '订单所属套餐',
          field: 'tc_info',
          cellStyle: {
            color: '#8D8D8D'
          },
          cellRenderer: params => {
            return params.data.tc_info.tc_title;
          },
          valueGetter: params => {
            return params.data.tc_info.tc_title;
          }
        },
        {
          headerName: '代理商姓名',
          field: 'agent_name',
          cellStyle: {
            color: '#8D8D8D'
          },
        },
        {
          headerName: '订单状态',
          field: 'age',
          cellRendererFramework: 'statusBarButton',
          cellStyle: {
            color: '#8D8D8D'
          },
          pinned: 'right',
          width: 260,
        },
        {
          headerName: '操作',
          field: '',
          cellRendererFramework: 'financeButton',
          cellStyle: {
            color: '#8D8D8D'
          },
          pinned: 'right',
          width: 200,
        },
      ],
      config: {
        width: 150,
        sortable: true,
        resizable: true,
        filter: true,
        search: true,
      },
      rowContent: {},
      show: false
    }
  },
  computed: {
    ...mapGetters([
      'token'
    ])
  },
  components: {
    AGTable
  },
  methods: {
    init() {
      PowerOrderList(this.token).then(res => {
        this.rowData = checkRequest(res, false)
        console.log(this.rowData);
      })
    },
    operationEdit(row, index) {
      console.log(row, index)
    },
    financChack(params, index) {
      /**
       * [res description]
       * 订单确认 params 数据源 index  数据索引
       *  "code": 1,    //会计确认 1:未确认  2:确认
       *  "cwcode": 1,   //出纳确认 1:未确认  2:确认
       * @type {[type]}
       */
      let auditing = (params.cwcode == 1 ? 1 : 2) //auditing 为 1 的时候
      console.log(params, index, auditing);
      PowerOrderAuditing(this.token, params.id, auditing).then(res => {
        if (checkRequest(res, true)) {
          this.init()
        }
      })
    },
    operationDelete(row, index) {
      PowerOrderCancle(
        this.token,
        row.id).then(res => {
        checkRequest(res, true)
        this.init()
      })
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
</style>
