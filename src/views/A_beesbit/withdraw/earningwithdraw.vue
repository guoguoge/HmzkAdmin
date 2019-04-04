<template>
<div class="app-container">
  <el-row type="flex" justify="center">
    <h1>当前页面暂未开放</h1>
  </el-row>
  <!-- <AGTable :rowData="rowData" :columnDefs="column" :defaultColDef="config" @operationDelete="operationDelete" @operationEdit="operationEdit"></AGTable>
  <el-dialog :visible.sync="show" title="修改公告" width="70%" center>
    <span slot="footer" class="dialog-footer">
      <div>
        {{ rowContent }}
      </div>
      <el-button size="large" style="width:100%;" type="primary" @click="show = false">确 定</el-button>
    </span>
  </el-dialog> -->
</div>
</template>

<script>
import {
  json
} from '../db.js'

import AGTable from '@/components/Table/AGTable'

export default {
  data() {
    return {
      rowData: json, //表格源数据
      column: [
        {
          headerName: '用户姓名',
          field: 'name',
          cellStyle: {
            color: '#8D8D8D'
          },
        },
        {
          headerName: '用户电话',
          field: 'gender',
          cellStyle: {
            color: '#8D8D8D'
          },
        },
        {
          headerName: '提现币种',
          field: 'age',
          cellStyle: {
            color: '#8D8D8D'
          },
        },
        {
          headerName: '提现地址',
          field: 'age',
          cellStyle: {
            color: '#8D8D8D'
          },
        },
        {
          headerName: '提现金额',
          field: 'age',
          cellStyle: {
            color: '#8D8D8D'
          },
        },
        {
          headerName: '提现时间',
          field: 'age',
          cellStyle: {
            color: '#8D8D8D'
          },
        },
        {
          headerName: '提现状态',
          field: 'age',
          cellRendererFramework: 'statusBarButton',
          cellStyle: {
            color: '#8D8D8D'
          },
          pinned: 'right',
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
  components: {
    AGTable
  },
  methods: {
    operationEdit(row, index) {
      this.show = true
      this.rowContent = row
      console.log(row, index)
    },
    operationDelete(row, index) {
      console.log(row, index)
      console.log(this.rowData.splice(index, 1));
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
