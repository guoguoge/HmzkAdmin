<template>
<div class="app-container">
  <el-row type="flex" justify="end">
    <el-col :span="4" style="text-align:right;marginBottom:1rem">
      <el-button type="primary" @click="visible  = true"><i class="el-icon-circle-plus"></i> 新增马甲用户</el-button>
    </el-col>
  </el-row>
  <AGTable :rowData="rowData" :columnDefs="column" :defaultColDef="config" @financChack="financChack"></AGTable>
  <el-dialog :visible.sync="show" title="修改公告" width="30%" center>
    <span slot="footer" class="dialog-footer">
      <div>
        {{ rowContent }}
      </div>
      <el-button type="primary" @click="show = false">确 定</el-button>
    </span>
  </el-dialog>

  <el-dialog title="新增马甲用户" :visible.sync="visible" width="20%" center>
    <el-input placeholder="请输入内容" v-model="name" clearable></el-input>
    <el-row>
      <el-col style="text-align:center;marginTop:1rem">
        <el-button type="primary" @click="operation"> 确定</el-button>
      </el-col>
    </el-row>
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
  AddVestUser,
  VestUser
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
      }],
      config: {
        width: 150,
        sortable: true,
        resizable: true,
        filter: true,
        search: true,
      },
      rowContent: {},
      show: false,
      visible: false,
      name: ''
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
      VestUser(this.token).then(res => {
        if (checkRequest(res, false)) {
          console.log(checkRequest(res, false));
          this.rowData = checkRequest(res, false)
        }
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
    operation(row, index) {
      if (this.name) {
        AddVestUser(
          this.token,
          this.name
        ).then(res => {
          if (checkRequest(res, true)) {
            this.init()
            this.visible = false
          }
        })
      } else {
        this.$message({
          message: '请输入代理商马甲名',
          type: 'error'
        })
      }
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
