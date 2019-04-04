<!-- 权限管理页面 -->
<template>
<div class="app-container">
  <AGTable :rowData="rowData" :columnDefs="column" :defaultColDef="config" @operationDelete="operationDelete" @operationEdit="operationEdit">
    <template slot="notice" slot-scope="props">
      <el-button class="beesbit-sec-btn" @click.native="addAdmin">添加管理员</el-button>
    </template>
  </AGTable>
  <el-dialog :visible.sync="show" :title="dialogTitle" width="25%" center>
    <el-form status-icon ref="form" label-position="top" class="demo-ruleForm">
      <el-row type="flex" justify="space-between" :gutter="20">
        <el-col>
          <el-form-item style="width:100%" label="管理员账号" prop="pass">
            <el-input placeholder="请输入管理账号" v-model="form.username" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item style="width:100%" label="管理员密码" prop="checkPass">
            <el-input placeholder="请输入管理密码" v-model="form.password" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="管理员角色" prop="age">
        <el-select style="width:100%" v-model="form.permission" placeholder="管理员权限">
          <el-option v-for="(item,index) in permissionList" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
    </el-form>
    <el-button class="beesbit-btn" size="large" style="width:100%;" @click="submit">确 定</el-button>
  </el-dialog>
</div>
</template>

<script>
import {
  jsonpReturn,
  checkRequest
} from '@/utils'

import {
  mapGetters
} from 'vuex'

import {
  AdminList,
  AddAdmin,
  DelAdmin
} from '@/api/beesbit'

import AGTable from '@/components/Table/AGTable'

export default {
  data() {
    return {
      dialogTitle: '添加管理员',
      rowData: [], //表格源数据
      column: [{
          headerName: '管理员账号',
          field: 'username',
          cellStyle: {
            color: '#8D8D8D'
          },
        },
        {
          headerName: '权限',
          field: 'permission',
          cellStyle: {
            color: '#8D8D8D'
          },
          cellRenderer: params => {
            let data = params.data
            if (data.permission == 1) {
              return "超级管理员";
            } else if (data.permission == 2) {
              return "出纳管理员";
            } else if (data.permission == 3) {
              return "会计管理员";
            } else {
              return "普通管理员";
            }
          },
          valueGetter: params => {
            let data = params.data
            if (data.permission == 1) {
              return "超级管理员";
            } else if (data.permission == 2) {
              return "出纳管理员";
            } else if (data.permission == 3) {
              return "会计管理员";
            } else {
              return "普通管理员";
            }
          }
        },
        {
          headerName: '操作',
          field: '',
          cellRendererFramework: 'serviceButton',
          cellStyle: {
            color: '#8D8D8D'
          },
          pinned: 'right',
        },
      ],
      config: {
        sortable: true,
        resizable: true,
        filter: true,
        search: true,
      },
      rowContent: {},
      show: false,
      form: {
        username: '',
        password: '',
        permission: ''
      },
      permissionList: [{
        label: '超级管理员',
        value: 1
      }, {
        label: '出纳管理员',
        value: 2
      }, {
        label: '会计管理员',
        value: 3
      }, {
        label: '普通管理员',
        value: 4
      }]
    }
  },
  computed: {
    ...mapGetters([
      'token',
      'roles'
    ])
  },
  components: {
    AGTable
  },
  methods: {
    init() {
      AdminList(this.token).then(res => {
        this.rowData = checkRequest(res, false)
        console.log(this.rowData);
      })
    },
    operationEdit(row, index) {
      this.dialogTitle = '修改管理员权限'
      this.show = true
      this.rowContent = row
      console.log(row, index)
    },
    operationDelete(row, index) {
      DelAdmin(
        this.token,
        row.id).then(res => {
        checkRequest(res, true)
        this.show = false
        this.init()
      })
    },
    addAdmin() {
      this.dialogTitle = '添加管理员'
      this.show = true
    },
    submit() {
      AddAdmin(
        this.token,
        this.form.username,
        this.form.password,
        this.form.permission
      ).then(res => {
        checkRequest(res, true)
        this.show = false
        this.init()
      })
    }
  },
  created() {
    this.init()
    console.log(this.roles);
  },
  beforeMount() {},
  mounted() {}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
