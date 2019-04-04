<template>
<div class="app-container">
  <AGTable :rowData="rowData" :columnDefs="column" :defaultColDef="config" @operationDelete="operationDelete" @operationEdit="operationEdit">
    <template slot="notice" slot-scope="props">
      <el-button class="beesbit-sec-btn" @click.native="addNotice">新建收款信息</el-button>
    </template>
  </AGTable>
  <el-dialog :visible.sync="show" :title="dialogTitle" width="30%" center>
    <el-form :rules="rules" :model="form" status-icon ref="form" label-position="top">
      <el-form-item label="收款类型" prop="type">
        <el-select @change="typeChange" style="width:100%" v-model="form.type" placeholder="选择收款类型">
          <el-option v-for="(item,index) in bankList" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="开户名称/币种" prop="cardname">
        <el-input placeholder="输入开户名称/币种" type="text" v-model="form.cardname"></el-input>
      </el-form-item>
      <el-form-item label="开户银行(数字货币不填)" :prop="form.type == 1 ?'bank':''">
        <el-input placeholder="输入开户银行(数字货币不填)" type="text" v-model="form.bank" :disabled="form.type != 1"></el-input>
      </el-form-item>
      <el-form-item label="开户卡号/钱包地址" prop="cardnum">
        <el-input placeholder="输入开户卡号/钱包地址" type="text" v-model="form.cardnum"></el-input>
      </el-form-item>
    </el-form>
    <el-button class="beesbit-btn" size="large" style="width:100%;" @click="submit" :disabled="!show">确 定</el-button>
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
  CardList,
  AddCard,
  UpdateCard,
  UnlockCard,
  DelCard
} from '@/api/beesbit'

import {
  validateName,
  validateTel,
  validateEmail,
  validateChina,
  validateSpecial
} from '@/utils/validate'

export default {
  data() {
    return {
      dialogTitle: '新建收款信息',
      show: false,
      collectionId: '',
      bankList: [{
        label: '银行卡',
        value: 1
      }, {
        label: '数字货币',
        value: 2
      }],
      form: {
        cardname: '', //开户名/币种
        type: '', //1:银行卡 2:数字货币
        cardnum: '', //银行卡号/钱包地址
        bank: '' //银行名字(如果为数字货币则为null)
      },
      rules: {
        type: [{
          type: 'number',
          required: true,
          message: '请选择收款类型',
          trigger: 'blur'
        }],
        cardname: [{
          type: 'string',
          required: true,
          validator: validateSpecial,
          trigger: 'blur'
        }],
        cardnum: [{
          type: 'string',
          required: true,
          validator: validateSpecial,
          trigger: 'blur'
        }],
        bank: [{
          type: 'string',
          validator: validateSpecial,
          trigger: 'blur'
        }]
      },
      rowData: [], //表格源数据
      column: [{
          headerName: '支付方式',
          field: 'type',
          cellStyle: {
            color: '#8D8D8D'
          },
          cellRenderer: params => {
            return params.data.type == 1 ? '银行卡' : '数字货币';
          },
          valueGetter: params => {
            return params.data.type == 1 ? '银行卡' : '数字货币';
          }
        },
        {
          headerName: '开户名/币种',
          field: 'cardname',
          cellStyle: {
            color: '#8D8D8D'
          },
        },
        {
          headerName: '开户银行',
          field: 'bank',
          cellStyle: {
            color: '#8D8D8D'
          },
        },
        {
          headerName: '银行卡号/钱包地址',
          field: 'cardnum',
          cellStyle: {
            color: '#8D8D8D'
          },
          cellRenderer: params => {
            return params.data.cardnum;
          },
          valueGetter: params => {
            return params.data.cardnum;
          }
        },
        {
          headerName: '状态',
          field: 'age',
          cellStyle: {
            color: '#8D8D8D'
          },
          cellRenderer: params => {
            return params.data.status == 1 ? '可用' : '不可用';
          },
          valueGetter: params => {
            return params.data.status == 1 ? '可用' : '不可用';
          }
        },
        {
          headerName: '操作',
          field: '',
          cellRendererFramework: 'collectionButton',
          cellStyle: {
            color: '#8D8D8D'
          },
          pinned: 'right',
          width: 300,
        },
      ],
      config: {
        width: 200,
        sortable: true,
        resizable: true,
        filter: true,
        search: true,
      }
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
      CardList(this.token).then(res => {
        this.rowData = checkRequest(res, false)
        console.log(this.rowData);
      })
    },
    typeChange() {
      this.form.bank = ''
    },
    operationEdit(row, index, num) {
      this.collectionId = row.id
      if (num == 1) {
        this.dialogTitle = '修改收款信息'
        this.show = true
        this.form.cardname = row.cardname
        this.form.type = row.type
        this.form.cardnum = row.cardnum
        this.form.bank = row.bank
      } else {
        UnlockCard(
          this.token,
          row.status == 1 ? 2 : 1,
          this.collectionId
        ).then(res => {
          checkRequest(res, true)
          this.show = false
          this.init()
        })
      }
      console.log(row, index)
    },
    operationDelete(row, index) { // 删除订单||修改设定状态
      console.log(row);
      this.collectionId = row.id
      DelCard(
        this.token,
        this.collectionId).then(res => {
        checkRequest(res, true)
        this.show = false
        this.init()
      })
    },
    addNotice() {
      this.dialogTitle = '新建收款信息'
      this.show = true
    },
    submit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (this.dialogTitle == '新建收款信息') {
            AddCard(
              this.token,
              this.form.cardname,
              this.form.type,
              this.form.cardnum,
              this.form.bank).then(res => {
              if (checkRequest(res, true)) {
                this.$refs['form'].resetFields();
                this.form.bank = ''
                this.show = false
                this.init()
              }
            })
          } else {
            UpdateCard(
              this.token,
              this.collectionId,
              this.form.cardname,
              this.form.type,
              this.form.cardnum,
              this.form.bank).then(res => {
              if (checkRequest(res, true)) {
                this.$refs['form'].resetFields();
                this.show = false
                this.init()
              }
            })
          }
        } else {
          this.$message({
            message: '请按要求填写表单',
            type: 'warning'
          })
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
