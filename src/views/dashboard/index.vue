<template>
<div class="app-container">
  <!--     <component :is="currentRole"/> -->
  订单总览
  <el-row :gutter="20">
    <el-col :span="6" v-for="(item,index) in totalList" :key="index">
      <dataBox :index="index + 1" :res="item"></dataBox>
    </el-col>
  </el-row>
  <earningBox :webData="webData"></earningBox>
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
  StatisticWeb
} from '@/api/beesbit'

import adminDashboard from './admin'
import editorDashboard from './editor'
import dataBox from './admin/components/dataBox'
import earningBox from './admin/components/earningBox'

export default {
  name: 'Dashboard',
  components: {
    adminDashboard,
    editorDashboard,
    dataBox,
    earningBox
  },
  data() {
    return {
      currentRole: 'adminDashboard',
      webData: {},
      totalList: []
    }
  },
  computed: {
    ...mapGetters([
      'token'
    ])
  },
  methods: {
    init() {
      StatisticWeb(this.token).then(res => {
        this.webData = checkRequest(res, false)
        console.log(this.webData);
        this.totalList = [{
          power: this.webData.total_power_2,
          price: this.webData.total_price_2,
        }, {
          power: this.webData.total_power_3,
          price: this.webData.total_price_3,
        }]
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
