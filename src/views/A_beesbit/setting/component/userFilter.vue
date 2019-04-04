<template>
<div class="box">
  <el-row style="margin-bottom:1rem" type="flex" justify="space-between" :gutter="20">
    <el-col>
      筛选范围
    </el-col>
    <el-col class="right">
      <el-radio v-model="filterForm.have_user" label="1">所有用户</el-radio>
      <el-radio v-model="filterForm.have_user" label="2">指定用户</el-radio>
    </el-col>
  </el-row>
  <el-row v-if="filterForm.have_user == 1" type="flex" justify="center">
    <div class="allUser">
      当前优惠券对平台所有用户发放
    </div>
  </el-row>
  <el-row v-else style="margin-bottom:1rem" type="flex" justify="space-between" :gutter="20">
    <el-col :span="11">
      <el-card shadow="never">
        <el-row style="margin-bottom:1rem" type="flex" justify="space-between">
          <el-col>
            <el-radio v-model="filterForm.have_order" label="1">有订单用户</el-radio>
            <el-radio v-model="filterForm.have_order" label="2">无订单用户</el-radio>
          </el-col>
          <el-col :span="6">
            <el-button size="mini" class="beesbit-btn" @click="filter">确认筛选</el-button>
          </el-col>
        </el-row>订单类型 :
        <el-row style="margin:1rem 0">
          <el-col>
            <el-checkbox-group :disabled="filterForm.have_order == 2" v-model="checkbox" size="mini">
              <el-checkbox  v-for="(item,index) in checkboxList" :key="index" :label="item" border>{{item}} 天</el-checkbox>
            </el-checkbox-group>
          </el-col>
        </el-row>
        <div class="">
          <el-input :disabled="filterForm.have_order == 2" size="small" v-model="filterForm.end_order" placeholder="请输入天数">
            <template slot="prepend">用户距订单结束还剩最多:</template>
            <template slot="append" icon="el-icon-search">天</template>
          </el-input>
        </div>
      </el-card>
    </el-col>
    <el-col :span="13">
      <el-card shadow="never">
        <el-row style="margin-bottom:1rem" type="flex" justify="space-between">
          <el-col>
            投放优惠券用户列表:{{userTableData.length}}
          </el-col>
          <el-col :span="6">
            <el-button size="mini" class="beesbit-btn" @click="clear">清空列表</el-button>
          </el-col>
        </el-row>
        <el-row style="margin-bottom:1rem">
          <el-table empty-text="暂无已筛选用户" max-height="200" :data="userTableData" stripe highlight-current-row size="mini" class="table" border>
            <el-table-column align="center" :index="indexMethod" type="index" label="序号" fixed />
            <el-table-column prop="id" align="center" label="用户ID">
            </el-table-column>
            <el-table-column prop="telphone" align="center" label="手机号">
            </el-table-column>
            <el-table-column prop="name" align="center" label="姓名">
            </el-table-column>
            <el-table-column align="center" width="50" fixed="right" label="操作">
              <template slot-scope="scope">
                <i class="el-icon-delete" @click="deleteUser(scope)"></i>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
        <el-row type="flex" justify="space-between" :gutter="20">
          <el-col :span="18">
            <el-input size="small" v-model="telphone" placeholder="请输入手机号码"></el-input>
          </el-col>
          <el-col :span="6">
            <el-button style="width:100%;" size="small" type="default" @click="addTelphone">添加</el-button>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
  </el-row>
</div>
</template>

<script>
import {
  jsonpReturn,
  checkRequest,
  ArrayRemove
} from '@/utils'

import {
  mapGetters
} from 'vuex'

import {
  CouponScope,
  CouponUser,
  CouponUserTel
} from '@/api/beesbit'

export default {
  data() {
    return {
      checkbox: [],
      checkboxList: [],
      telphone: '',
      endDay: '',
      userTableData: [], //筛选出来的用户数组
      filterForm: {
        have_user: '1', //是否指定用户 1:全部用户 0:指定用户
        have_order: '1', //用户是否有订单 1:有订单 0:无订单
        order_scope: '', //拥有多少天的订单
        end_order: '' //订单距离到期时间 (单位:天)
      }
    }
  },
  computed: {
    ...mapGetters([
      'token'
    ])
  },
  watch: {
    'filterForm.have_user': { //  深度监听对象里的某个元素
      handler: async function(val) {
        if (val == 1) {
          await this.getAllUser()
        } else {
          this.userTableData = []
        }
      }
    }
  },
  methods: {
    init() {
      CouponScope(this.token).then(res => {
        let data = checkRequest(res, false)
        data.forEach(item => {
          this.checkboxList.push(item)
        })
        console.log(this.checkboxList);
      })
      this.getAllUser()
    },
    indexMethod(index) { // 序号方法
      return index + 1
    },
    clear() {
      this.userTableData = []
    },
    addUser(data) {
      this.userTableData.push({
        telphone: data.tel,
        name: data.name,
        id: data.id
      })
    },
    deleteUser(scope) {
      this.userTableData.splice(scope.$index, 1)
      this.$message({
        message: '已删除第' + (scope.$index + 1) + '位用户',
        type: 'success'
      })
    },
    getAllUser() {
      CouponUser(this.token,
        this.filterForm.have_user,
        '',
        '',
        ''
      ).then(res => {
        let data = checkRequest(res, false)
        console.log(data, "data");
        this.userTableData = []
        data.forEach(item => {
          this.userTableData.push({
            telphone: item.tel,
            name: item.name,
            id: item.id
          })
        })
      })
    },
    filter() { //优惠券--根据范围选择用户
      console.log(this.filterForm);
      this.userTableData = []
      CouponUser(
        this.token,
        this.filterForm.have_user,
        this.filterForm.have_order,
        this.checkbox,
        this.filterForm.end_order
      ).then(res => {
        let data = checkRequest(res, false)
        data.forEach(item => {
          this.addUser(item)
        })
      })
    },
    addTelphone() { //手动添加用户 已防止重复提交
      CouponUserTel(
        this.token,
        this.telphone
      ).then(res => {
        let data = checkRequest(res, true)
        if (checkRequest(res, true)) {
          let arr = []
          this.userTableData.forEach(item => {
            arr.push(item.id)
          })
          if (!arr) {
            this.addUser(data)
          } else {
            if (!arr.includes(data.id)) {
              this.addUser(data)
            } else {
              this.$message({
                message: '该用户已存在!',
                type: 'error'
              })
              return
            }
          }
        }
        this.telphone = ''
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
.box {
    margin: 2rem 0;
    .right {
        display: flex;
        justify-content: flex-end;
    }
    .el-checkbox.is-bordered {
        margin: 2px;
    }
    .el-checkbox.is-bordered.el-checkbox--mini {
        padding: 3px 7px 3px 4px;
    }
    /deep/.el-card__body {
        padding: 10px;
    }
    .el-icon-delete {
        font-size: 16px;
        color: red;
    }
    .el-icon-delete:hover {
        cursor: pointer;
        color: #f56c6c;
    }
    .allUser {
        width: 100%;
        text-align: center;
        padding: 1rem;
        color: #FF7B2A;
        border: 1px solid #ebeef5;
    }
}
</style>
