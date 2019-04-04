<template>
<div class="app-container">
  <AGTable :rowData="rowData" :columnDefs="column" :defaultColDef="config" @operationDelete="operationDelete" @operationEdit="operationEdit">
    <template slot="contract" slot-scope="props">
      <el-button type="primary" @click.native="visible  = true">合同设置</el-button>
    </template>
    <template slot="notice" slot-scope="props">
      <el-button class="beesbit-sec-btn" @click.native="addCombo">新建套餐</el-button>
    </template>
  </AGTable>
  <el-dialog :visible.sync="show" title="新" width="50%" center>
    <el-form :rules="rules" :model="form" status-icon ref="form" label-position="top" class="demo-ruleForm">
      <el-form-item style="width:100%" label="套餐标题" prop="title">
        <el-input placeholder="请输入套餐标题" v-model="form.title" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item style="width:100%" label="套餐说明" prop="explain">
        <el-input placeholder="请输入套餐说明" type="textarea" v-model="form.explain" autocomplete="off"></el-input>
      </el-form-item>
      <el-row type="flex" justify="space-between" :gutter="20">
        <el-col>
          <el-form-item style="width:100%" label="人民币单价" prop="rmb">
            <el-input-number size="small" v-model.number="form.rmb" :min="1" :precision="2" placeholder="请输入人民币单价"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item style="width:100%" label="USDT单价" prop="usdt">
            <el-input-number size="small" v-model.number="form.usdt" :min="1" :precision="4" placeholder="请输入USDT单价"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item style="width:100%" label="最大份额" prop="maxnum">
            <el-input placeholder="请输入最大份额" v-model.number="form.maxnum" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item style="width:100%" label="最小份额" prop="minnum">
            <el-input placeholder="请输入最小份额" v-model.number="form.minnum" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item style="width:100%" label="套餐库存" prop="total_num">
            <el-input placeholder="请输入套餐库存" v-model.number="form.total_num" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="space-between" :gutter="20">
        <el-col>
          <el-form-item style="width:100%" label="挖矿币种" prop="coin">
            <el-select style="width:100%" v-model="form.coin" placeholder="请输入选择币种">
              <el-option v-for="(item,index) in coinList" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item style="width:100%" label="挖矿天数" prop="day">
            <el-input placeholder="请输入挖矿天数" v-model.number="form.day" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item style="width:100%" label="付款方式" prop="payway">
            <el-select style="width:100%" v-model="form.payway" placeholder="请输入选择币种">
              <el-option v-for="(item,index) in payWayList" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="space-between" :gutter="20">
        <el-col>
          <el-form-item style="width:100%" label="开始时间" prop="start">
            <el-date-picker style="width:100%" format="yyyy-MM-ddHH:mm:ss" :picker-options="pickerOptions" v-model="form.start" type="datetime" placeholder="选择开始时间">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item style="width:100%" label="结束时间(需选择开始时间)" prop="end">
            <el-date-picker :disabled="!form.start" style="width:100%" format="yyyy-MM-ddHH:mm:ss" :picker-options="pickerOptions1" v-model="form.end" type="datetime" placeholder="选择结束时间">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-button class="beesbit-btn" size="large" style="width:100%;" @click="submit">确 定</el-button>
  </el-dialog>
  <el-dialog :visible.sync="visible" title="合同设置" width="70%" center>
    <Article :type="1" @closeArticle="visible = false"></Article>
  </el-dialog>
</div>
</template>

<script>
import AGTable from '@/components/Table/AGTable'
import Article from '../components/create'

import {
  jsonpReturn,
  checkRequest,
  formatDate
} from '@/utils'

import {
  mapGetters
} from 'vuex'

import {
  ContractInfo,
  Contract,
  CombinationList,
  CombinationFreeze,
  AddCombination,
  DelCombination
} from '@/api/beesbit'

import {
  validateName,
  validateTel,
  validateEmail
} from '@/utils/validate'

export default {
  data() {
    return {
      rowData: [], //表格源数据
      pickerOptions: {
        disabledDate: (time) => {
          if (this.form.end != "") {
            return time.getTime() < Date.now() || time.getTime() < this.form.end;
          } else {
            return time.getTime() < Date.now();
          }
        }
      },
      pickerOptions1: {
        disabledDate: (time) => {
          return time.getTime() < this.form.start;
        }
      },
      column: [{
          headerName: '套餐标题',
          field: 'tc_title',
          cellStyle: {
            color: '#8D8D8D'
          },
        },
        {
          headerName: '套餐说明',
          field: 'tc_explain',
          cellStyle: {
            color: '#8D8D8D'
          },
        },
        {
          headerName: '套餐支付方式',
          field: 'tc_payway',
          cellStyle: {
            color: '#8D8D8D'
          },
          cellRenderer: params => {
            return params.data.tc_payway == 1 ? '全款' : '分期';
          },
          valueGetter: params => {
            return params.data.tc_payway == 1 ? '全款' : '分期';
          }
        },
        {
          headerName: '单价（RMB)',
          field: 'tc_rmb',
          cellStyle: {
            color: '#8D8D8D'
          },
          cellRenderer: params => {
            return Number(params.data.tc_rmb)
          },
          valueGetter: params => {
            return Number(params.data.tc_rmb)
          },
        },
        {
          headerName: '单价（USDT)',
          field: 'tc_usdt',
          cellStyle: {
            color: '#8D8D8D'
          },
          cellRenderer: params => {
            return Number(params.data.tc_usdt)
          },
          valueGetter: params => {
            return Number(params.data.tc_usdt)
          },
        },
        {
          headerName: '套餐库存',
          field: 'total_num',
          cellStyle: {
            color: '#8D8D8D'
          },
        },
        {
          headerName: '最大份额',
          field: 'tc_maxnum',
          cellStyle: {
            color: '#8D8D8D'
          },
        },
        {
          headerName: '最小份额',
          field: 'tc_minnum',
          cellStyle: {
            color: '#8D8D8D'
          },
        },
        {
          headerName: '挖矿天数',
          field: 'tc_day',
          cellStyle: {
            color: '#8D8D8D'
          },
        },
        {
          headerName: '套餐有效天数',
          field: 'tc_mealtime',
          cellStyle: {
            color: '#8D8D8D'
          },
        },
        {
          headerName: '开始时间',
          field: 'tc_time',
          cellStyle: {
            color: '#8D8D8D'
          },
          cellRenderer: params => {
            return formatDate(params.data.tc_time);
          },
          valueGetter: params => {
            return formatDate(params.data.tc_time);
          }
        },
        {
          headerName: '结束时间',
          field: 'tc_time_end',
          cellStyle: {
            color: '#8D8D8D'
          },
          cellRenderer: params => {
            return formatDate(params.data.tc_time_end);
          },
          valueGetter: params => {
            return formatDate(params.data.tc_time_end);
          }
        },
        {
          headerName: '运行状态',
          field: 'tc_freeze',
          cellStyle: {
            color: '#8D8D8D'
          },
          cellRenderer: params => {
            let now = Date.parse(new Date()) / 1000
            return params.data.tc_freeze == 1 ? (params.data.tc_time_end > now ? '运行中' : '已过期') : '已冻结';
            return;
          },
          valueGetter: params => {
            let now = Date.parse(new Date()) / 1000
            return params.data.tc_freeze == 1 ? (params.data.tc_time_end > now ? '运行中' : '已过期') : '已冻结';
            return;
          },
          pinned: 'right',
        },
        {
          headerName: '所属代理商id',
          field: 'tc_freeze',
          cellStyle: {
            color: '#8D8D8D'
          },
          pinned: 'right'
        },
        // {
        //   headerName: '合同',
        //   field: '',
        //   cellRendererFramework: 'contractButton',
        //   cellStyle: {
        //     color: '#8D8D8D'
        //   },
        //   pinned: 'right',
        // },
        {
          headerName: '操作',
          field: '',
          cellRendererFramework: 'comboButton',
          cellStyle: {
            color: '#8D8D8D'
          },
          pinned: 'right',
          width: 200,
        },
      ],
      config: {
        width: 180,
        sortable: true,
        resizable: true,
        filter: true,
        search: true,
      },
      show: false,
      visible: false,
      form: { //表单信息
        title: '', //套餐标题
        explain: '', //套餐描述
        payway: '', //支付方式 1:全款 2:分期
        rmb: '', //rmb单价
        usdt: '', //usdt单价
        minnum: '', //购买套餐最小份数
        maxnum: '', //购买套餐最大份数
        total_num: '', //该套餐总库存
        day: '', //套餐时间
        start: '', //套餐开始时间
        end: '', //套餐结束时间
        coin: 'eth' //选择币种
      },
      rules: {
        title: [{
          type: 'string',
          required: true,
          message: '请输入套餐标题',
          trigger: 'blur'
        }],
        explain: [{
          type: 'string',
          required: true,
          message: '请输入套餐说明',
          trigger: 'blur'
        }],
        rmb: [{
          type: 'number',
          required: true,
          message: '请输入正确数字',
          trigger: 'blur'
        }],
        usdt: [{
          type: 'number',
          required: true,
          message: '请输入正确数字',
          trigger: 'blur'
        }],
        maxnum: [{
          type: 'number',
          required: true,
          message: '请输入正确最大值',
          trigger: 'blur'
        }],
        minnum: [{
          type: 'number',
          required: true,
          message: '请输入正确最小值',
          trigger: 'blur'
        }],
        total_num: [{
          type: 'number',
          required: true,
          message: '请输入正确最小值',
          trigger: 'blur'
        }],
        coin: [{
          type: 'string',
          required: true,
          message: '请选择挖矿币种',
          trigger: 'blur'
        }],
        day: [{
          type: 'number',
          required: true,
          message: '请输入挖矿天数',
          trigger: 'blur'
        }],
        payway: [{
          type: 'string',
          required: true,
          message: '请选择支付方式',
          trigger: 'blur'
        }],
        start: [{
          type: 'date',
          required: true,
          message: '请选择开始时间',
          trigger: 'blur'
        }],
        end: [{
          type: 'date',
          required: true,
          message: '请选择结束时间',
          trigger: 'blur'
        }]
      },
      coinList: [{
        label: '以太币',
        value: 'eth',
        disabled: false
      }, {
        label: '比特币',
        value: 'btc',
        disabled: true
      }, {
        label: '莱特币',
        value: 'late',
        disabled: true
      }],
      payWayList: [{
        label: '全款支付',
        value: '1',
        disabled: false
      }, {
        label: '分期支付',
        value: '2',
        disabled: true
      }]
    }
  },
  watch: {
    form: {
      handler(val) {
        console.log(val);
        if (!val.start) {
          this.form.end = ''
        }
      },
      deep: true,
      immediate: true
    }
  },
  computed: {
    ...mapGetters([
      'token'
    ])
  },
  components: {
    AGTable,
    Article
  },
  methods: {
    init() {
      CombinationList(this.token).then(res => {
        this.rowData = checkRequest(res, false)
      })
    },
    operationEdit(row, index) {
      console.log(row);
      CombinationFreeze(
        this.token,
        row.id,
        row.tc_freeze == 1 ? 0 : 1
      ).then(res => {
        checkRequest(res, true)
        this.show = false
        this.init()
      })
    },
    operationDelete(row, index) {
      DelCombination(
        this.token,
        row.id
      ).then(res => {
        checkRequest(res, true)
        this.show = false
        this.init()
      })
    },
    addCombo() {
      this.show = true
    },
    submit() {
      console.log(123);
      this.$refs['form'].validate((valid) => {
        if (valid) {
          AddCombination(
            this.token,
            this.form.title,
            this.form.explain,
            this.form.payway,
            this.form.rmb,
            this.form.usdt,
            this.form.minnum,
            this.form.maxnum,
            this.form.total_num,
            this.form.day,
            Date.parse(this.form.start) / 1000,
            Date.parse(this.form.end) / 1000,
            this.form.coin,
          ).then(res => {
            if (checkRequest(res, true)) {
              this.show = false
              this.$refs['form'].resetFields();
              this.init()
            }
          })
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
