<template>
<div class="app-container">
  <el-row type="flex" justify="space-between" :gutter="20" align="middle">
    <el-col :span="12">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>夺宝规则</span>
          <el-button type="success" style="float: right" size="mini" @click.native="EditNotice(1)">修改夺宝规则</el-button>
          <!-- <el-button type="danger" style="float: right;margin-right:1rem" size="mini">删除规则</el-button> -->
        </div>
        <div v-html="ruleD">
        </div>
      </el-card>
    </el-col>
    <el-col :span="12">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>竞拍规则</span>
          <el-button type="success" style="float: right" size="mini" @click.native="EditNotice(1)">修改竞拍规则</el-button>
          <!-- <el-button type="danger" style="float: right;margin-right:1rem" size="mini">删除规则</el-button> -->
        </div>
        <div v-for="o in 4" :key="o" class="text item">
          {{'列表内容 ' + o }}
        </div>
      </el-card>
    </el-col>
  </el-row>

  <el-dialog :visible.sync="show" :title="dialogTitle" width="50%" center top="5vh">
    <Article :articleData="articleData" :type="2" @closeArticle="reflash" />
  </el-dialog>
</div>
</template>

<script>
import AGTable from '@/components/Table/AGTable'
import Article from '../components/create'

import {
  jsonpReturn,
  checkRequest
} from '@/utils'

import {
  mapGetters
} from 'vuex'

import {
  NewsList,
  NewsAdd,
  NewsDel,
  NewsEdit,
  AddRule,
  DelRule,
  EditRule,
  SeeRule
} from '@/api/beesbit'

export default {
  data() {
    return {
      dialogTitle: '新建规则',
      show: false,
      articleData: '',
      ruleD: '',
      ruleDid: '',
      ruleJ: '',
      ruleJid: '',
      type: 1 // 1为夺宝 2为竞拍
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
      SeeRule(this.token, 4).then(res => {
        let data = checkRequest(res, false)
        this.ruleD = data[0].rules
        this.ruleDid = data[0].id

        this.ruleJ = data[0].rules
        this.ruleJid = data[0].rules
      })
    },
    operationEdit(row, index) {
      this.dialogTitle = '编辑规则'
      this.articleData = row
      this.show = true
      this.$router.push({
        path: 'edit/' + row.id,
        query: {
          content: row.body,
          title: row.title,
          id: row.id,
        }
      })
    },
    operationDelete(row, index) {
      NewsDel(
        this.token,
        row.id).then(res => {
        checkRequest(res, true)
        this.show = false
        this.init()
      })
    },
    EditNotice(num) {
      this.type = num
      if (num == 1) {
        this.dialogTitle = '更新夺宝规则'
        this.articleData = this.ruleD
        console.log(this.articleData);
      } else {
        this.dialogTitle = '更新竞拍规则'
        this.articleData = this.ruleJ
      }
      this.show = true
    },
    reflash(val) {
      EditRule(
        this.token,
        val,
        3,
        this.type,
        this.ruleDid
      ).then(res => {
        if (checkRequest(res, true)) {
          this.show = false
          this.init()
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
.el-card__header {
    .clearfix {}
}
</style>
