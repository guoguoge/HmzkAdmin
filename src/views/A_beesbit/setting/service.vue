<template>
<div class="app-container">
  <AGTable :rowData="rowData" :columnDefs="column" :defaultColDef="config" @operationDelete="operationDelete" @operationEdit="operationEdit">
    <template slot="notice" slot-scope="props">
      <el-button class="beesbit-sec-btn" @click.native="addService">新建客服信息</el-button>
    </template>
  </AGTable>
  <el-dialog :visible.sync="show" :title="dialogTitle" width="25%" center>
    <el-form :rules="rules" :model="form" :inline="true" status-icon ref="form" label-position="top" class="demo-ruleForm">
      <el-row :gutter="20" type="flex">
        <el-col>
          <el-form-item label="姓名" prop="name">
            <el-input placeholder="请输入姓名" type="text" v-model="form.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="电话" prop="tel">
            <el-input placeholder="请输入电话" type="text" v-model="form.tel"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" type="flex">
        <el-col>
          <el-form-item label="QQ" prop="qq">
            <el-input placeholder="请输入QQ" type="text" v-model.number="form.qq"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="Email" prop="mail">
            <el-input placeholder="请输入Email" type="text" v-model="form.mail"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-button class="beesbit-btn" size="large" style="width:100%;" @click="submit">确 定</el-button>
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
  CustomerList,
  SetCustomer,
  DelCustomer
} from '@/api/beesbit'

import {
  validateName,
  validateTel,
  validateEmail
} from '@/utils/validate'

export default {
  data() {
    return {
      dialogTitle: '新建客服信息',
      rowData: [], //表格源数据
      column: [{
          headerName: '客服ID',
          field: 'id',
          cellStyle: {
            color: '#8D8D8D'
          },
        },
        {
          headerName: '客服名称',
          field: 'name',
          cellStyle: {
            color: '#8D8D8D'
          },
        },
        {
          headerName: '客服电话',
          field: 'tel',
          cellStyle: {
            color: '#8D8D8D'
          },
        },
        {
          headerName: '客服QQ',
          field: 'qq',
          cellStyle: {
            color: '#8D8D8D'
          },
        },
        {
          headerName: '客服邮件',
          field: 'mail',
          cellStyle: {
            color: '#8D8D8D'
          },
        },
        {
          headerName: '操作',
          field: '',
          cellRendererFramework: 'serviceButton',
          cellStyle: {
            color: '#8D8D8D'
          },
          pinned: 'right'
        },
      ],
      config: {
        width: 200,
        sortable: true,
        resizable: true,
        filter: true,
        search: true,
      },
      rowContent: {},
      show: false,
      form: {
        name: '',
        tel: '',
        qq: '',
        mail: ''
      },
      rules: {
        name: [{
          required: true,
          validator: validateName,
          trigger: 'blur'
        }],
        tel: [{
          required: true,
          validator: validateTel,
          trigger: 'blur'
        }],
        qq: [{
          type: 'number',
          required: true,
          message: '请输入qq号',
          trigger: 'blur'
        }],
        mail: [{
          required: true,
          validator: validateEmail,
          trigger: 'blur'
        }]
      },
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
      CustomerList(this.token).then(res => {
        this.rowData = checkRequest(res, false)
        console.log(this.rowData);
      })
    },
    operationEdit(row, index) {
      this.dialogTitle = '修改客服信息'
      this.show = true
      this.form.name = row.name
      this.form.tel = row.tel
      this.form.qq = row.qq
      this.form.mail = row.mail
    },
    operationDelete(row, index) { //修改
      DelCustomer(
        this.token,
        row.id).then(res => {
        checkRequest(res, true)
        this.show = false
        this.init()
      })
    },
    addService() {
      this.dialogTitle = '新建客服信息'
      this.show = true
    },
    submit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          SetCustomer(
            this.token,
            this.form.name,
            this.form.tel,
            this.form.qq,
            this.form.mail).then(res => {
            if (checkRequest(res, true)) {
              this.$refs['form'].resetFields();
              this.show = false
              this.init()
            }
          })
        } else {
          this.$message({
            message: '请按要求填写表单',
            type: 'warning'
          })
        }
      });
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
