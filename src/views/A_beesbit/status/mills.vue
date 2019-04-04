<template>
<div class="app-container">
  <AGTable :rowData="rowData" :columnDefs="column" :defaultColDef="config"></AGTable>
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
  MachineList
} from '@/api/beesbit'

export default {
  data() {
    return {
      rowData: [], //表格源数据
      column: [{
          headerName: '矿机编号',
          field: 'num',
          cellStyle: {
            color: '#8D8D8D'
          },
        },
        {
          headerName: '运行状态',
          field: 'gender',
          cellStyle: {
            color: '#8D8D8D'
          },
          cellRenderer: params => {
            return params.data.status == 1 ? '运行' : '故障';
          },
          valueGetter: params => {
            return params.data.status == 1 ? '运行' : '故障';
          }
        },
        {
          headerName: '矿机算力',
          field: 'power',
          cellStyle: {
            color: '#8D8D8D'
          },
        },
        {
          headerName: '使用用户',
          field: 'tel',
          cellStyle: {
            color: '#8D8D8D'
          },
        },
        {
          headerName: '订单编号',
          field: 'orderid',
          cellStyle: {
            color: '#8D8D8D'
          },
        }
      ],
      config: {
        width: 250,
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
      MachineList(this.token).then(res => {
        this.rowData = checkRequest(res, false)
        console.log(this.rowData);
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
