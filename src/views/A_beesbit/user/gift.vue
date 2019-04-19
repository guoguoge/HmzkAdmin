<template>
<div class="app-container">
  <el-row style="marginBottom:1rem" type="flex" justify="end">
    <el-select v-model="rowIndex" placeholder="请选择" @change="change">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
      </el-option>
    </el-select>
  </el-row>
  <AGTable :rowData="rowData[rowIndex]" :columnDefs="column" :defaultColDef="config" @operationDelete="operationDelete" @operationEdit="operationEdit"></AGTable>
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
  AwardList,
  FreezeUser
} from '@/api/beesbit'
export default {
  data() {
    return {
      rowData: [], //表格源数据
      column: [{
          headerName: '奖品名称',
          field: 'tre_name',
          cellStyle: {
            color: '#8D8D8D'
          },
        },
        {
          headerName: '奖品状态',
          field: 'provide',
          cellStyle: {
            color: '#8D8D8D'
          },
          cellRenderer: params => {
            return params.data.provide == 0 ? '未中奖' : params.data.provide == 1 ? '待发送' : '已发送';
          },
          valueGetter: params => {
            return params.data.provide == 0 ? '未中奖' : params.data.provide == 1 ? '待发送' : '已发送';
          }
        },
        {
          headerName: '中奖者姓名',
          field: 'user_name',
          cellStyle: {
            color: '#8D8D8D'
          },
          width: 150
        },
        {
          headerName: '中奖者手机号',
          field: 'tel',
          cellStyle: {
            color: '#8D8D8D'
          }
        },
        {
          headerName: '中奖时间',
          field: 'time',
          cellStyle: {
            color: '#8D8D8D'
          },
        },
        {
          headerName: '收货人姓名',
          field: 'add_name',
          cellStyle: {
            color: '#8D8D8D'
          },
        },
        {
          headerName: '中奖者手机号',
          field: 'add_tel',
          cellStyle: {
            color: '#8D8D8D'
          },
        },
        {
          headerName: '奖品所属分类',
          field: 'origin',
          cellStyle: {
            color: '#8D8D8D'
          },
        },
        {
          headerName: '操作',
          field: 'balance',
          cellStyle: {
            color: '#8D8D8D'
          },
          cellRendererFramework: 'couponButton',
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
      options: [{
        value: 0,
        label: '口红机奖品'
      }, {
        value: 1,
        label: '夺宝奖品'
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
      AwardList(this.token).then(res => {
        console.log(checkRequest(res, false));
        let data = checkRequest(res, false)
        if (data) {
          this.rowData[0] = data.rouge_info || []
          this.rowData[1] = data.treasure_info || []
        }
        this.rowIndex = 0
        console.log(this.rowData[0], 'rowDate');
      })
    },
    operationEdit(row, index) {
      this.show = true
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
    },
    change(val) {
      this.rowIndex = val
      this.$message({
        message: val == 0 ? '已切换到口红机奖品' : val == 1 ? '已切换到夺宝奖品' : '已切换到竞拍奖品',
        type: 'success'
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
