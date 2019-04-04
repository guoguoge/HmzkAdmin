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
  RenewOrderList,
  RenewOrderAuditing
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
          headerName: '币种',
          field: 'coin',
          cellStyle: {
            color: '#8D8D8D'
          },
        },
        {
          headerName: '算力',
          field: 'power',
          cellStyle: {
            color: '#8D8D8D'
          },
        },
        {
          headerName: '订单天数',
          field: 'day',
          cellStyle: {
            color: '#8D8D8D'
          },
        },
        {
          headerName: '下单时间',
          field: 'order_time',
          cellStyle: {
            color: '#8D8D8D'
          },
        },
        {
          headerName: '订单价格',
          field: 'price',
          cellStyle: {
            color: '#8D8D8D'
          },
        },
        {
          headerName: '支付状态',
          field: 'order_time',
          cellStyle: {
            color: '#8D8D8D'
          },
          cellRenderer: params => {
            return params.data.status == 1 ? '未支付' : (params.data.status == 2 ? '支付' : '取消');
          },
          valueGetter: params => {
            return params.data.status == 1 ? '未支付' : (params.data.status == 2 ? '支付' : '取消');
          }
        },
        {
          headerName: '付款方式',
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
          headerName: '下单时间',
          field: 'pay_img',
          cellStyle: {
            color: '#8D8D8D'
          },
        },
        {
          headerName: 'ETH抵扣数',
          field: 'mortgage_eth',
          cellStyle: {
            color: '#8D8D8D'
          },
        },
        {
          headerName: '抵扣的人民币数',
          field: 'discount',
          cellStyle: {
            color: '#8D8D8D'
          },
        },
        {
          headerName: '使用优惠券情况',
          field: 'coupon_info',
          cellStyle: {
            color: '#8D8D8D'
          },
        },
        {
          headerName: '代理商姓名',
          field: 'agent_name',
          cellStyle: {
            color: '#8D8D8D'
          },
        },
        {
          headerName: '状态',
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
      RenewOrderList(this.token).then(res => {
        this.rowData = checkRequest(res, false)
        console.log(this.rowData);
      })
    },
    operationEdit(row, index) {
      this.show = true
      this.rowContent = row
      console.log(row, index)
    },
    operationDelete(row, index) {
      console.log(row, index)
      console.log(this.rowData.splice(index, 1));
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
      RenewOrderAuditing(this.token, params.id, auditing).then(res => {
        if (checkRequest(res, true)) {
          this.init()
        }
      })
    },
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
