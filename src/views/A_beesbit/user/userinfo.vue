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
  StatisticUser,
  FreezeUser
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
          width: 150
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
          headerName: '用户状态',
          field: 'is_allow',
          cellStyle: {
            color: '#8D8D8D'
          },
          cellRenderer: params => {
            return params.data.is_allow == 1 ? '正常' : '封号';
          },
          valueGetter: params => {
            return params.data.is_allow == 1 ? '正常' : '封号';
          }
        },
        {
          headerName: '账户余额',
          field: 'balance',
          cellStyle: {
            color: '#8D8D8D'
          },
          cellRendererFramework: 'statusButton',
          pinned: 'right',

        },
      ],
      config: {
        width: 180,
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
      StatisticUser(this.token).then(res => {
        console.log(checkRequest(res, false));
        this.rowData = checkRequest(res, false)
      })
    },
    operationEdit(row, index) {
      this.show = true
      this.rowContent = row
      console.log(row, index)
    },
    operationDelete(row, index) {
      let allow = row.is_allow == 1 ? 2 : 1
      FreezeUser(this.token, row.id, allow).then(res => {
        if (checkRequest(res, true)) {
          this.rowData = checkRequest(res, false)
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
