<template>
<div class="app-container">
  <AGTable :rowData="rowData" :columnDefs="column" :defaultColDef="config" @operationDelete="operationDelete" @operationEdit="operationEdit">
    <template slot="notice" slot-scope="props">
      <el-button class="beesbit-sec-btn" @click.native="addNotice">新建公告</el-button>
    </template>
  </AGTable>
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
  NewsEdit
} from '@/api/beesbit'

export default {
  data() {
    return {
      dialogTitle: '新建公告',
      rowData: [], //表格源数据
      column: [{
          headerName: '公告ID',
          field: 'id',
          cellStyle: {
            color: '#8D8D8D'
          },
        },
        {
          headerName: '公告标题',
          field: 'title',
          cellStyle: {
            color: '#8D8D8D'
          },
          width: 580
        },
        {
          headerName: '公告内容',
          field: 'body',
          cellRendererFramework: 'detailsButton',
          // cellRenderer: params => {
          //   let data = params.data.body.replace(/&lt;/g, "<")
          //   let data1 = data.replace(/&nbsp;/g, " ")
          //   let data2 = data1.replace(/&gt;/g, ">")
          //   return data2
          // },
          valueGetter: params => {
            let data = params.data.body.replace(/&lt;/g, "<")
            let data1 = data.replace(/&nbsp;/g, " ")
            let data2 = data1.replace(/&gt;/g, ">")
            return data2
          },
          cellStyle: {
            color: '#8D8D8D'
          },
          pinned: 'right',
          width: 180
        },
        {
          headerName: '发布时间',
          field: 'time',
          cellStyle: {
            color: '#8D8D8D'
          },
        },
        {
          headerName: '操作',
          field: '',
          cellRendererFramework: 'statusButton',
          cellStyle: {
            color: '#8D8D8D'
          },
          pinned: 'right',
        },
      ],
      config: {
        width: 200,
        sortable: true,
        resizable: true,
        filter: true,
        search: true,
      },
      show: false,
      articleData: {}
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
      NewsList(this.token).then(res => {
        this.rowData = checkRequest(res, false)
      })
    },
    operationEdit(row, index) {
      this.dialogTitle = '编辑公告'
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
    addNotice() {
      this.dialogTitle = '新建公告'
      this.show = true
    },
    reflash() {
      this.show = false
      this.init()
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
