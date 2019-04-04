<template>
<div class="app-container">

  <!-- <Infobar :agentList="agentList" :agentInfo="agentInfo" @agentChange="agentChange" /> -->

  <Controlbar :agentInfo="agentInfo" />

  <div class="choose">
    <span :class="num==1? 'active':'' " @click="chooseList(1)">代理商列表</span>
    <!-- <span :class="num!=1? 'active':'' " @click="chooseList(2)">代理商采购算力列表</span> -->
  </div>

  <keep-alive>
    <AGTable ref="agentTable" v-show="num == 1" style="margin-top:1rem" :rowData="rowData" :columnDefs="columnAgentList" :defaultColDef="config" @operationEdit="operationEdit" @changeAgentStatus="changeAgentStatus" @operationDetail="operationDetail">
      <template slot="addagent">
        <el-button class="beesbit-sec-btn" type="primary" @click="addAgent">添加代理商</el-button>
      </template>
    </AGTable>
  </keep-alive>

  <keep-alive>
    <!-- <AGTable v-show="num == 2" style="margin-top:1rem" @financChack="financChack" :rowData="orderRowData" :columnDefs="columnOrderList" :defaultColDef="config">
    </AGTable> -->
  </keep-alive>

  <el-dialog :visible.sync="show" :title="dialogTitle" @close="closeDialog" width="30%" center top="10vh">
    <el-form status-icon ref="form" :model="form" :rules="rules" label-position="top" class="demo-ruleForm">
      <el-row type="flex" justify="space-between" :gutter="20">
        <el-col>
          <el-form-item style="width:100%" label="代理商登录名" prop="username">
            <el-input placeholder="请输入代理商登录名" type="text" v-model="form.username"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item style="width:100%" label="代理商登录密码" :prop="edit?'':'password'">
            <el-input placeholder="请输入代理商登录密码" type="text" v-model="form.password"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="space-between" :gutter="20">
        <el-col>
          <el-form-item style="width:100%" label="代理商姓名" prop="name">
            <el-input placeholder="代理商姓名" type="text" v-model="form.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item style="width:100%" label="代理商电话" prop="tel">
            <el-input placeholder="代理商电话" type="text" v-model="form.tel"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="space-between" :gutter="20">
        <el-col>
          <el-form-item style="width:100%" label="代理商地址" prop="address">
            <el-input placeholder="代理商地址" type="text" v-model="form.address"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="space-between" :gutter="20">
        <el-col>
          <el-form-item style="width:100%" label="代理商网站域名" prop="domain_name">
            <el-input placeholder="代理商网站域名" type="text" v-model="form.domain_name"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="space-between" :gutter="20">
        <el-col>
          <el-form-item style="width:100%" label="合同开始时间" prop="contract_start">
            <el-date-picker value-format="timestamp" style="width:100%" :picker-options="pickerOptions" v-model="form.contract_start" type="datetime" placeholder="选择开始时间">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item style="width:100%" label="合同结束时间" prop="contract_end">
            <el-date-picker value-format="timestamp" :disabled="!form.contract_start" :picker-options="pickerOptions1" style="width:100%" v-model="form.contract_end" type="datetime" placeholder="选择结束时间">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-button class="beesbit-btn" type="primary" style="width:100%" @click="submit">确 定</el-button>

  </el-dialog>
</div>
</template>

<script>
// import Infobar from './component/infobar.vue'
import Controlbar from './component/Controlbar.vue'
import AGTable from '@/components/Table/AGTable'

import {
  parseTime,
  jsonpReturn,
  checkRequest
} from '@/utils'

import {
  mapGetters
} from 'vuex'

import {
  AgentList,
  AorderList,
  AddAgent,
  AgentPassword,
  AgentChangeStatus,
  AgentInfo,
  OrderAuditing
} from '@/api/beesbit'

import {
  validateName,
  validateTel,
  validateEmail,
  validatePassword,
  validateSpecial
} from '@/utils/validate'

export default {
  data() {
    return {
      rowData: [], // 表格源数据
      orderRowData: [],
      pickerOptions: {
        disabledDate: (time) => {
          if (this.form.contract_end != "") {
            return time.getTime() < Date.now() || time.getTime() < this.form.contract_end;
          } else {
            return time.getTime() < Date.now();
          }
        }
      },
      pickerOptions1: {
        disabledDate: (time) => {
          return time.getTime() < this.form.contract_start;
        }
      },
      columnAgentList: [{
          headerName: '代理商登录名',
          field: 'username',
          cellStyle: {
            color: '#8D8D8D'
          },
        },
        {
          headerName: '代理商姓名',
          field: 'name',
          cellStyle: {
            color: '#8D8D8D'
          },
        },
        {
          headerName: '代理商电话',
          field: 'tel',
          cellStyle: {
            color: '#8D8D8D'
          },
        },
        {
          headerName: '代理商网站域名',
          field: 'domain_name',
          cellStyle: {
            color: '#8D8D8D'
          },
        },
        {
          headerName: '代理商地址',
          field: 'address',
          cellStyle: {
            color: '#8D8D8D'
          },
        },
        {
          headerName: '合同开始时间',
          field: 'contract_start',
          cellStyle: {
            color: '#8D8D8D'
          },
          width: 180
        },
        {
          headerName: '合同结束时间',
          field: 'contract_end',
          cellStyle: {
            color: '#8D8D8D'
          },
          width: 180
        },
        {
          headerName: '是否采购算力',
          field: 'is_pay',
          cellRenderer: params => {
            return params.data.is_pay == 1 ? '购买' : '未购买';
          },
          valueGetter: params => {
            return params.data.is_pay == 1 ? '购买' : '未购买';
          },
          cellStyle: {
            color: '#8D8D8D'
          },
        },
        {
          headerName: '是否停用',
          field: 'is_allow',
          cellRenderer: params => {
            return params.data.is_allow == 1 ? '未停用' : '停用';
          },
          valueGetter: params => {
            return params.data.is_allow == 1 ? '未停用' : '停用';
          },
          cellStyle: {
            color: '#8D8D8D'
          },
        },
        {
          headerName: '操作',
          field: '',
          cellRendererFramework: 'agentOperationButton',
          cellStyle: {
            color: '#8D8D8D'
          },
          pinned: 'right',
          width: 260,
        }
      ],
      columnOrderList: [{
          headerName: '代理商姓名',
          field: 'name',
          cellStyle: {
            color: '#8D8D8D'
          },
        },
        {
          headerName: '代理商电话',
          field: 'tel',
          cellStyle: {
            color: '#8D8D8D'
          },
        },
        {
          headerName: '采购算力份数',
          field: 'num',
          cellStyle: {
            color: '#8D8D8D'
          },
        },
        {
          headerName: '算力套餐类型',
          field: 'day',
          cellStyle: {
            color: '#8D8D8D'
          },
        },
        {
          headerName: '采购时间',
          field: 'start_time',
          cellStyle: {
            color: '#8D8D8D'
          },
          width: 180
        },
        {
          headerName: '结束时间',
          field: 'end_time',
          cellStyle: {
            color: '#8D8D8D'
          },
          width: 180
        },
        {
          headerName: '购买价格',
          field: 'price',
          cellStyle: {
            color: '#8D8D8D'
          },
          width: 180
        },
        {
          headerName: '支付截图',
          field: 'pay_img',
          cellRendererFramework: 'payImgButton',
          cellStyle: {
            color: '#8D8D8D'
          },
          pinned: 'right',
          width: 120
        },
        {
          headerName: '支付状态',
          field: '',
          cellStyle: {
            color: '#FF7D2A'
          },
          cellRenderer: params => {
            return "已支付"
          },
          valueGetter: params => {
            return "已支付";
          },
          width: 120
        },
        {
          headerName: '后台确认',
          field: 'age',
          cellRendererFramework: 'statusBarButton',
          cellStyle: {
            color: '#8D8D8D'
          },
          pinned: 'right',
          width: 250,
        },
        {
          headerName: '操作',
          field: '',
          cellRendererFramework: 'financeButton',
          cellStyle: {
            color: '#8D8D8D'
          },
          pinned: 'right',
          width: 300,
        },
      ],
      config: {
        width: 150,
        sortable: true,
        resizable: true,
        filter: true,
        search: true,
      },
      form: {
        username: '',
        password: '',
        password_confirm: this.password,
        name: '',
        tel: '',
        address: '',
        domain_name: '',
        contract_start: '',
        contract_end: '',
      },
      rules: {
        username: [{
          required: true,
          type: 'string',
          validator: validateSpecial,
          trigger: 'blur'
        }],
        password: [{
          required: true,
          type: 'string',
          validator: validatePassword,
          trigger: 'blur'
        }],
        name: [{
          required: true,
          type: 'string',
          validator: validateName,
          trigger: 'blur'
        }],
        address: [{
          required: true,
          type: 'string',
          min: 3,
          message: '代理商地址内容过少',
          trigger: 'blur'
        }],
        tel: [{
          required: true,
          type: 'number',
          validator: validateTel,
          trigger: 'blur'
        }],
        domain_name: [{
          required: true,
          type: 'string',
          min: 6,
          message: '请输入不低于六个字母的网站域名',
          trigger: 'blur'
        }],
        contract_start: [{
          required: true,
          message: '请选择开始时间',
          trigger: 'blur'
        }],
        contract_end: [{
          required: true,
          message: '请选择结束时间',
          trigger: 'blur'
        }]
      },
      num: 1, //表格种类控制
      agentList: [], //子组件的代理商数据
      show: false, //弹出框显示控制
      dialogTitle: '', //弹出框表头
      agentInfo: {}, //代理商信息
      edit: false, //是否修改代理商信息
      editId: '', //代理商修改的ID
    }
  },
  computed: {
    ...mapGetters([
      'token'
    ])
  },
  components: {
    // Infobar,
    Controlbar,
    AGTable
  },
  methods: {
    init() { //数据初始化
      this.getAgentList()
      this.getAorderList()
    },
    getAgentList() { //获取代理商列表
      AgentList(this.token).then((res) => {
        let data = jsonpReturn(res.data).msg
        this.rowData = data
        this.agentList = []
        this.rowData.forEach(item => {
          this.agentList.push({
            id: item.id,
            label: item.name
          })
        })
        console.log(this.rowData);
      })
    },
    getAorderList() { //获取代理商采购算力列表
      AorderList(this.token).then((res) => {
        let data = jsonpReturn(res.data).msg
        this.orderRowData = data
        console.log(data, "data");
      })
    },
    agentChange(id) { //选择查看代理商明细
      console.log(id);
      AgentInfo(this.token, id).then(res => {
        this.agentInfo = checkRequest(res, false)
        this.$message({
          message: '查看代理商 ' + this.agentInfo.name + ' 信息',
          type: 'success',
          showClose: true
        })
        console.log(this.agentInfo);
      })
    },
    chooseList(num) { //切换表格
      console.log(num);
      this.$nextTick(() => {
        let box = document.querySelectorAll('.ag-paging-panel')
        box[1].style.display = 'none'
      })
      if (num === 1) {
        this.num = 1
      } else {
        this.num = 2
      }
    },
    addAgent() { //新增代理商
      this.dialogTitle = '新增代理商'
      this.show = true
    },
    operationEdit(row, index, num) { //修改代理商信息
      console.log(Date.parse(this.rowData[index].contract_start));
      this.edit = true
      this.editId = row.id
      this.dialogTitle = '修改代理商'
      this.show = true
      this.form.username = this.rowData[index].username
      this.form.password = this.rowData[index].password
      this.form.password_confirm = this.rowData[index].password
      this.form.name = this.rowData[index].name
      this.form.tel = this.rowData[index].tel
      this.form.address = this.rowData[index].address
      this.form.domain_name = this.rowData[index].domain_name
      this.form.contract_start = Date.parse(this.rowData[index].contract_start)
      this.form.contract_end = Date.parse(this.rowData[index].contract_end)
    },
    operationDetail(row, index, num) {
      this.agentChange(row.id)
    },
    changeAgentStatus(params, index) { //更改代理商管理员状态
      console.log(params);
      let is_allow = (params.is_allow == 1 ? 0 : 1)
      let agent_id = params.id
      AgentChangeStatus(
        this.token,
        is_allow,
        agent_id
      ).then(res => {
        if (checkRequest(res, true)) {
          this.init()
        }
      })
    },
    closeDialog() {
      this.form = {
        username: '',
        password: '',
        password_confirm: this.password,
        name: '',
        tel: '',
        address: '',
        domain_name: '',
        contract_start: '',
        contract_end: '',
      }
      this.edit = false
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
      console.log(params, index);
      OrderAuditing(this.token, params.id, auditing).then(res => {
        if (checkRequest(res, true)) {
          this.getAorderList()
        }
      })
    },
    submit() {
      let a = this.form.contract_start
      let b = this.form.contract_end
      console.log(a, b);
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (this.edit) {
            AgentPassword(
              this.token,
              this.form.username,
              this.form.password,
              this.editId,
              this.form.domain_name,
              this.form.address,
              this.form.tel,
              this.form.name,
              this.form.contract_start / 1000,
              this.form.contract_end  / 1000
            ).then(res => {
              if (checkRequest(res, true)) {
                this.show = false
                this.init()
                this.$refs['form'].resetFields();
              }
            })
          } else {
            AddAgent(
              this.token,
              this.form.username,
              this.form.password,
              this.form.password,
              this.form.name,
              this.form.tel,
              this.form.address,
              this.form.domain_name,
              this.form.contract_start / 1000,
              this.form.contract_end / 1000).then(res => {
              if (checkRequest(res, true)) {
                this.show = false
                this.init()
                this.$refs['form'].resetFields();
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
    },
  },
  created() {
    this.init()
  },
  beforeMount() {},
  mounted() {}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.choose {
    margin-top: 2rem;
    span {
        transition: all 0.1s;
    }
    span:hover {
        cursor: pointer;
        color: #FF7B2A;
    }
    .active {
        color: #FF7B2A;
    }
}
</style>
