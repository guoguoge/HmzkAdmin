<template>
<div class="app-container">
  <el-row type="flex" justify="end">
    <el-col :span="4" style="text-align:right;marginBottom:1rem">
      <el-button type="primary" @click="showDialog(1)"><i class="el-icon-circle-plus"></i> 新增分类</el-button>
    </el-col>
  </el-row>
  <AGTable :rowData="rowData" :columnDefs="column" :defaultColDef="config" @financChack="financChack" @operationDelete="operationDelete" @operationEdit="operationEdit"></AGTable>
  <el-dialog :visible.sync="show" :title="title" width="20%" center>
    <span slot="footer" class="dialog-footer">
      <el-input placeholder="请输入内容" v-model="form.cat_name" clearable></el-input>
      <el-select style="width:100%;marginTop:1rem" v-model="form.belong" placeholder="请选择">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-switch style="margin:1rem 0" v-model="form.cat_status" :active-value="1" :inactive-value="2" active-color="#13ce66" inactive-color="#ff4949" active-text="上架" inactive-text="下架">
      </el-switch>
      <el-button size="large" style="width:100%;" type="primary" @click="submit">确 定</el-button>
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
  AccountCn,
  Category,
  AddCategory,
  EditCategory,
  DelCategory
} from '@/api/beesbit'

export default {
  data() {
    return {
      rowData: [], //表格源数据
      column: [{
          headerName: '分类名',
          field: 'cat_name',
          cellStyle: {
            color: '#8D8D8D'
          }
        },
        {
          headerName: '运行',
          field: 'cat_status',
          cellStyle: {
            color: '#8D8D8D'
          },
          cellRenderer: params => {
            return params.data.cat_status == 1 ? '上架' : '下架';
          },
          valueGetter: params => {
            return params.data.cat_status == 1 ? '上架' : '下架';
          }
        },
        {
          headerName: '所属游戏',
          field: 'cat_status',
          cellStyle: {
            color: '#8D8D8D'
          },
          cellRenderer: params => {
            return params.data.belong == 1 ? '夺宝' : params.data.belong == 2 ? '竞猜' : '口红机';
          },
          valueGetter: params => {
            return params.data.belong == 1 ? '夺宝' : params.data.belong == 2 ? '竞猜' : '口红机';
          }
        },
        {
          headerName: '操作',
          field: '',
          cellRendererFramework: 'agentOperationButton',
          cellStyle: {
            color: '#8D8D8D'
          },
          pinned: 'right',
        }
      ],
      config: {
        width: 150,
        sortable: true,
        resizable: true,
        filter: true,
        search: true,
      },
      rowContent: {},
      show: false,
      options: [{
          value: '1',
          label: '夺宝'
        }, {
          value: '2',
          label: '竞猜'
        },
        {
          value: '2',
          label: '口红机'
        }
      ],
      form: {
        cat_name: '',
        belong: '1',
        cat_status: ''
      },
      title: '',
      cateId: ''

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
      Category(this.token, 4).then(res => {
        this.rowData = checkRequest(res, false)
        console.log(this.rowData);
      })
    },
    operationEdit(row, index) {
      this.cateId = row.id
      this.num = 2
      this.show = true
      this.title = '修改分类'
      this.form.cat_name = row.cat_name
      this.form.belong = row.belong.toString()
      this.form.cat_status = row.cat_status
    },
    operationDelete(row, index) {
      DelCategory(
        this.token,
        2,
        row.id).then(res => {
        if(checkRequest(res, true)){
          this.show = false
          this.init()
        }
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
      if (auditing == 1) {
        AccountCw(this.token, params.id).then(res => {
          if (checkRequest(res, true)) {
            this.init()
          }
        })
      } else {
        AccountCn(this.token, params.id).then(res => {
          if (checkRequest(res, true)) {
            this.init()
          }
        })
      }
    },
    clear() {
      this.form = {
        cat_name: '',
        belong: '1',
        cat_status: ''
      }
    },
    showDialog(num) {
      this.clear()
      this.show = true
      this.num = num
      if (num == 1) {
        this.title = '新建分类'
      }
    },
    submit() {
      if (this.form.cat_name) {
        if (this.num == 1) {
          console.log(1);
          AddCategory(
            this.token,
            1,
            this.form.cat_name,
            this.form.belong,
            this.form.cat_status,
          ).then(res => {
            if (checkRequest(res, false)) {
              this.rowData = checkRequest(res, false)
              this.clear()
              this.init()
              this.show = false
            }
          })
        } else {
          EditCategory(
            this.token,
            3,
            this.cateId,
            this.form.cat_name,
            this.form.belong,
            this.form.cat_status,
          ).then(res => {
            if (checkRequest(res, false)) {
              this.rowData = checkRequest(res, false)
              this.clear()
              this.init()
              this.show = false
            }
          })
        }
      } else {
        this.$message({
          message: '请确认分类名已填写',
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
