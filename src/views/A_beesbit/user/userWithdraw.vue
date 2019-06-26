<template>
<div class="app-container">
  <AGTable :rowData="rowData" :columnDefs="column" :defaultColDef="config" @operationDelete="operationDelete" @operationEdit="operationEdit"></AGTable>
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
  WithdrawList,
  AwardStatus,
  WithdrawRefuse,
  WithdrawStatus
} from '@/api/beesbit'
export default {
  data() {
    return {
      rowData: [], //表格源数据
      column: [{
          headerName: '用户昵称',
          field: 'name',
          cellStyle: {
            color: '#8D8D8D'
          },
        },
        {
          headerName: '用户昵称',
          field: 'name',
          cellStyle: {
            color: '#8D8D8D'
          },
        },
        {
          headerName: '用户手机号',
          field: 'tel',
          cellStyle: {
            color: '#8D8D8D'
          }
        },
        {
          headerName: '提现金额',
          field: 'num',
          cellStyle: {
            color: '#8D8D8D'
          }
        },
        {
          headerName: '提现时间',
          field: 'time',
          cellStyle: {
            color: '#8D8D8D'
          }
        },
        {
          headerName: '用户当前账户余额',
          field: 'balance',
          cellStyle: {
            color: '#8D8D8D'
          }
        },
        {
          headerName: '提现申请状态',
          field: 'provide',
          cellStyle: {
            color: '#8D8D8D'
          },
          cellRenderer: params => {
            return params.data.status == 1 ? '未处理' : params.data.status == 2 ? '已到账' : '已被拒绝';
          },
          valueGetter: params => {
            return params.data.status == 1 ? '未处理' : params.data.status == 2 ? '已到账' : '已被拒绝';
          }
        },
        {
          headerName: '操作',
          field: 'balance',
          cellStyle: {
            color: '#8D8D8D'
          },
          width: 260,
          cellRendererFramework: 'balancewithdrawButton'
        },
      ],
      config: {
        width: 180,
        sortable: true,
        resizable: true,
        filter: true,
        search: true,
      },
      options: [{
        value: 0,
        label: '夺宝奖品'
      }, {
        value: 1,
        label: '口红机奖品'
      }, {
        value: 2,
        label: '竞拍奖品'
      }],
      show: false,
      rowIndex: null
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
      WithdrawList(this.token).then(res => {
        let data = checkRequest(res, false)
        console.log(data);
        this.rowData = data
      })
    },
    operationEdit(row, index) {
      console.log(row, index)
      WithdrawStatus(this.token, row.id).then(res => {
        let data = checkRequest(res, true)
        this.init()
      })
    },
    operationDelete(row, index) {
      console.log(index);
      WithdrawRefuse(this.token, row.id).then(res => {
        let data = checkRequest(res, true)
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
