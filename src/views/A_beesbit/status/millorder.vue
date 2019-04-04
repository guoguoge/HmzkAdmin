<template>
<div class="app-container">
  <AGTable :rowData="rowData" :columnDefs="column" :defaultColDef="config" @financChack="financChack" @operationDelete="operationDelete" @operationDetail="operationDetail"></AGTable>
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
  checkRequest,
  formatDate
} from '@/utils'

import {
  mapGetters
} from 'vuex'

import {
  ItcOrderList, //矿机订单itc
  ItcOrderEdit, //确认矿机订单
  ItcOrderCancle, //取消矿机订单
  ItcOrderSetTrackingNum //设置运单号
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
          width: 150
        },
        {
          headerName: '用户电话',
          field: 'tel',
          cellStyle: {
            color: '#8D8D8D'
          }
        },
        {
          headerName: '用户地址',
          field: 'address',
          cellStyle: {
            color: '#8D8D8D'
          },
        },
        {
          headerName: '矿机名',
          field: 'itc_name',
          cellStyle: {
            color: '#8D8D8D'
          },
        },
        {
          headerName: '订单总价',
          field: 'price',
          cellStyle: {
            color: '#8D8D8D'
          },
        },
        {
          headerName: '矿机单价',
          field: 'itc_price',
          cellStyle: {
            color: '#8D8D8D'
          },
          cellRenderer: params => {
            return Number(params.data.itc_price)
          },
          valueGetter: params => {
            return Number(params.data.itc_price)
          },
        },
        {
          headerName: '矿机数量',
          field: 'mc_num',
          cellStyle: {
            color: '#8D8D8D'
          },
        },
        {
          headerName: '运单号',
          field: 'tracking_number',
          cellStyle: {
            color: '#8D8D8D'
          },
          cellRenderer: params => {
            return params.data.tracking_number ? params.data.tracking_number : '等待发货';
          },
        },
        {
          headerName: '下单时间',
          field: 'createtime',
          cellStyle: {
            color: '#8D8D8D'
          },
          cellRenderer: params => {
            return formatDate(params.data.createtime);
          },
          valueGetter: params => {
            return formatDate(params.data.createtime);
          },
          width: 200
        },
        {
          headerName: '转账截图',
          field: 'pay_img',
          cellStyle: {
            color: 'red'
          },
          cellRendererFramework: 'payImgButton',
        },
        {
          headerName: '支付状态',
          field: 'pay_status',
          cellStyle: {
            color: '#8D8D8D'
          },
          cellRenderer: params => {
            return params.data.pay_status == 1 ? '已支付' : '未支付';
          },
          valueGetter: params => {
            return params.data.pay_status == 1 ? '已支付' : '未支付';
          }
        },
        {
          headerName: '操作',
          field: '',
          cellRendererFramework: 'millOrderButton',
          cellStyle: {
            color: '#8D8D8D'
          },
          pinned: 'right',
          width: 300,
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
      ItcOrderList(this.token).then(res => {
        this.rowData = checkRequest(res, false)
        console.log(this.rowData);
      })
    },
    operationEdit(row, index) {
      console.log(row, index)
    },
    operationDetail(row, input) {
      console.log(row, input)

      ItcOrderSetTrackingNum(this.token, row.id, input).then(res => {
        if (checkRequest(res, true)) {
          this.init()
        }
      })

    },
    financChack(row, index) {
      /**
       * [res description]
       * 订单确认 row 数据源 index  数据索引
       *  "code": 1,    //会计确认 1:未确认  2:确认
       *  "cwcode": 1,   //出纳确认 1:未确认  2:确认
       * @type {[type]}
       */
      ItcOrderEdit(this.token, row.id).then(res => {
        if (checkRequest(res, true)) {
          this.init()
        }
      })
    },
    operationDelete(row, index) {
      ItcOrderCancle(
        this.token,
        row.id).then(res => {
        if (checkRequest(res, true)) {
          this.init()
        }
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
