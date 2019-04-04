<template>
<div class="app-container">
  <AGTable
  :rowData="rowData"
  :columnDefs="column"
  :defaultColDef="config"
  @financChack="financChack"
  @operationDelete="operationDelete"
  @operationEdit="operationEdit"></AGTable>
  <el-dialog :visible.sync="show" title="修改公告" width="70%" center>
    <span slot="footer" class="dialog-footer">
      <div>
        {{ rowContent }}
      </div>
      <el-button size="large" style="width:100%;" type="primary" @click="show = false">确 定</el-button>
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
  Account,
  AccountCancle,
  AccountCw,
  AccountCn
} from '@/api/beesbit'

export default {
  data() {
    return {
      rowData: [], //表格源数据
      column: [
        {
          headerName: '用户姓名',
          field: 'username',
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
          headerName: '提现币种',
          field: 'coin',
          cellStyle: {
            color: '#8D8D8D'
          },
        },
        {
          headerName: '提现地址',
          field: 'address',
          cellStyle: {
            color: '#8D8D8D'
          },
          width:400
        },
        {
          headerName: '提现金额',
          field: 'num',
          cellStyle: {
            color: '#8D8D8D'
          },
        },
        {
          headerName: '提现后余额',
          field: 'surplus',
          cellStyle: {
            color: '#8D8D8D'
          },
          cellRenderer: params => {
            return Number(params.data.surplus)
          },
          valueGetter: params => {
            return Number(params.data.surplus)
          },
        },
        {
          headerName: '所属期',
          field: 'type',
          cellStyle: {
            color: '#8D8D8D'
          },
        },
        {
          headerName: '提现时间',
          field: 'time',
          cellStyle: {
            color: '#8D8D8D'
          },
          width:200
        },
        {
          headerName: '提现状态',
          field: 'age',
          cellRendererFramework: 'balancewithdrawBarButton',
          cellStyle: {
            color: '#8D8D8D'
          },
          pinned: 'right',
          width: 280,
        },
        {
          headerName: '操作',
          field: '',
          cellRendererFramework: 'balancewithdrawButton',
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
      Account(this.token).then(res => {
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
      AccountCancle(
        this.token,
        row.id).then(res => {
        checkRequest(res, true)
        this.show = false
        this.init()
      })
    },
    financChack(params, index) {
      console.log(params);
      /**
       * [res description]
       * 订单确认 params 数据源 index  数据索引
       *  "code": 1,    //会计确认 1:未确认  2:确认
       *  "cwcode": 1,   //出纳确认 1:未确认  2:确认
       * @type {[type]}
       */
      let auditing = (params.cwcode == 1 ? 1 : 2) //auditing 为 1 的时候
      if(auditing == 1){
        AccountCw(this.token, params.id).then(res => {
          if (checkRequest(res, true)) {
            this.init()
          }
        })
      }else{
        AccountCn(this.token, params.id).then(res => {
          if (checkRequest(res, true)) {
            this.init()
          }
        })
      }
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
