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
  StatisticUser
} from '@/api/beesbit'
export default {
  data() {
    return {
      rowData: [], //表格源数据
      column: [
        {
          headerName: '用户姓名',
          field: 'name',
          cellStyle: {
            color: '#8D8D8D'
          },
          width:150
        },
        {
          headerName: '用户电话',
          field: 'tel',
          cellStyle: {
            color: '#8D8D8D'
          },
        },
        {
          headerName: '用户注册时间',
          field: 'regist_time',
          cellStyle: {
            color: '#8D8D8D'
          },
        },
        {
          headerName: '已花费金额（元）',
          field: 'price',
          cellStyle: {
            color: '#8D8D8D'
          },
        },
        {
          headerName: '当前运行算力',
          field: 'power',
          cellStyle: {
            color: '#8D8D8D'
          },
        },
        {
          headerName: '预计累积赚取（元）',
          field: 'power',
          cellStyle: {
            color: '#8D8D8D'
          },
        },
        {
          headerName: '已产生收益（ETH）',
          field: 'income',
          cellStyle: {
            color: '#8D8D8D'
          },
        },
        {
          headerName: '已提现量（ETH）',
          field: 'payout',
          cellStyle: {
            color: '#8D8D8D'
          },
        },
        {
          headerName: '邀请人',
          field: 'age',
          cellStyle: {
            color: '#8D8D8D'
          },
        },
        {
          headerName: 'ETH奖励量',
          field: 'income',
          cellStyle: {
            color: '#8D8D8D'
          },
        },
        {
          headerName: '代理商来源',
          field: 'agent_name',
          cellStyle: {
            color: '#8D8D8D'
          },
        }
      ],
      config: {
        width: 180,
        sortable: true,
        resizable: true,
        filter: true,search: true,
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
      StatisticUser(this.token).then(res => {
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
