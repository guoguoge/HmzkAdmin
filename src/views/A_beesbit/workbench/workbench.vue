<template>
<div class="app-container">

  <!-- <Infobar>
    <template slot="button">
      <div class="selectAgent">
        <el-button disabled class="beesbit-btn" type="warning" style="width:100%" @click="show = true">采购算力(未开放)</el-button>
      </div>
    </template>
  </Infobar> -->

  <dataSummar :webData="webData" />

  <el-dialog :visible.sync="show" title="采购算力明细单" width="25%" center top="20vh">
    <div class="input">
      <el-form label-position="top" :model="form">
        <el-row :gutter="20" type="flex" justify="space-between">
          <el-col>
            <el-form-item label="采购人姓名">
              <el-input placeholder="输入采购人姓名" v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="采购人电话">
              <el-input placeholder="输入采购人电话" v-model="form.region"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" type="flex" justify="space-between">
          <el-col>
            <el-form-item label="采购套餐类型">
              <el-input placeholder="输入采购套餐类型" v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="采购算力份数">
              <el-input placeholder="输入采购算力份数" v-model="form.region"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" type="flex" justify="space-between">
          <el-col>
            <div class="contentBox">
              <span>采购套餐类型</span>
              <span class="number">12312312</span>
            </div>
          </el-col>
          <el-col>
            <div class="contentBox">
              <span>采购算力份数</span>
              <span class="number">12312312</span>
            </div>
          </el-col>
        </el-row>
        <el-row style="margin-top:1rem">
          <el-col>
            <div class="contentBox">
              <span>采购时间</span>
              <span class="number">{{timeNow}}</span>
            </div>
          </el-col>
        </el-row>
        <el-row type="flex" justify="end">
          <el-col :span="10">
            <h2 class="right">总价: 123123</h2>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-row style="margin-bottom:1rem">
      <el-button class="beesbit-btn" style="width:100%" @click="show = false">选择上传支付凭证</el-button>
    </el-row>
    <el-row>
      <el-button type="info" style="width:100%" @click="show = false">取消支付</el-button>
    </el-row>
  </el-dialog>
</div>
</template>

<script>
import Infobar from './component/infobar.vue'
import dataSummar from './component/dataSummar.vue'

import {
  jsonpReturn,
  checkRequest
} from '@/utils'

import {
  parseTime
} from '@/utils'

import {
  mapGetters
} from 'vuex'

import {
  StatisticWeb
} from '@/api/beesbit'

export default {
  data() {
    return {
      form: {
        name: '',
        type: '123'
      },
      num: 1,
      input: '',
      show: false,
      timeNow: new Date().toLocaleString(),
      webData: {}
    }
  },
  computed: {
    ...mapGetters([
      'token'
    ])
  },
  components: {
    Infobar,
    dataSummar
  },
  methods: {
    init() {
      StatisticWeb(this.token).then(res => {
        if (checkRequest(res, false)) {
          this.webData = checkRequest(res, false)
          console.log(this.webData);
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
h2 {
    color: #FF7B2A;
}
.right {
    float: right;
}
.contentBox {
    display: flex;
    background: #F2F2F2;
    border-radius: 5px;
    padding: 1rem;
    justify-content: space-between;
    .number {
        color: #FF7B2A;
    }
}
</style>
