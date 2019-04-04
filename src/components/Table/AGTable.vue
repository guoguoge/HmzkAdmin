<template>
<div>
  <el-row v-if="defaultColDef.search" style="margin-bottom:1rem" type="flex" justify="space-between" :gutter="20">
    <!-- 搜索框 -->
    <el-col :span="4">
      <el-input v-model="input" placeholder="关键词搜索" @input="filter" prefix-icon="el-icon-search">
      </el-input>
    </el-col>
    <!-- 导出表格 -->
    <el-col class="right" :span="12">
      <el-button class="beesbit-btn" @click.native="onBtExport()">导出表格</el-button>
      <slot name="notice"></slot>
      <slot name="contract"></slot>
      <slot name="addagent"></slot>
    </el-col>
  </el-row>

  <!-- ag-gird表格 -->
    <div :style="height?height:'height:72vh'">
      <div style="height:100%;box-sizing:border-box">
        <div class="colorDiv"/>
        <ag-grid-vue
          style="width: 100%; height: 100%;"
          class="ag-theme-material"
          :gridOptions="gridOptions"
          :defaultColDef="defaultColDef"
          v-loading="loading"
          element-loading-text="数据获取中 ......"
          :column-defs="gridOptions.columnDefs"
          :row-data="gridOptions.rowData"
          :pagination="true"
          :localeText="localeText"
          :paginationPageSize="50"
          :paginationAutoPageSize="1"
          :animate-rows="true"
          :rowSelection="rowSelection"
          @grid-ready="onGridReady"
        />
      </div>
    </div>

    <el-row style="margin:1rem 0" type="flex" justify="end">
      <el-pagination
          background
          :small="width?false:true"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          @prev-click="prevClick"
          @next-click="nextClick"
          :current-page.sync="currentPage"
          :page-sizes="[50,100,500,1000,5000,10000]"
          :page-size="pageSize"
          :pager-count="5"
          layout="total, sizes, prev, pager, next"
          :total="gridOptions.rowData.length">
      </el-pagination>
    </el-row>

</div>
</template>

<script>
import {
  AgGridVue
} from 'ag-grid-vue'

import {
  mapGetters
} from 'vuex'

import statusButton from './component/statusButton'
import statusBarButton from './component/statusBarButton'
import financeButton from './component/financeButton'
import contractButton from './component/contractButton'
import comboButton from './component/comboButton'
import couponButton from './component/couponButton'
import collectionButton from './component/collectionButton'
import serviceButton from './component/serviceButton.vue'
import payImgButton from './component/payImgButton.vue'
import agentOperationButton from './component/agentOperationButton.vue'
import detailsButton from './component/detailsButton.vue'
import balancewithdrawButton from './component/balancewithdrawButton.vue'
import balancewithdrawBarButton from './component/balancewithdrawBarButton.vue'
import millOrderButton from './component/millOrderButton.vue'
import poptipButton from './component/poptipButton.vue'

export default {
  components: {
    AgGridVue,
    statusButton,
    statusBarButton,
    financeButton,
    contractButton,
    comboButton,
    couponButton,
    collectionButton,
    serviceButton,
    payImgButton,
    agentOperationButton,
    detailsButton,
    balancewithdrawButton,
    balancewithdrawBarButton,
    millOrderButton,
    poptipButton
  },
  props: {
    rowData: { //表格源数据
      type: Array,
      default: []
    },
    columnDefs: {
      type: Array,
      default: function() {
        return []
      }
    },
    defaultColDef: {
      type: Object,
      default: {}
    },
    height:{
      type: String,
      default: ''
    }
  },
  data() {
    return {
      gridApi: null,
      columnApi: null,
      gridOptions: {
        context: null,
        rowData: this.rowData, //表格总数据
        columnDefs: this.columnDefs,
      },
      input: '',
      rowSelection: null, //表格已选择项目
      currentPage: 1, //分页当前页数
      pageSize: null, //分页总显示页数
      loading: false, //loading特效开关
      localeText:null, //中文化
    }
  },
  computed: {
    ...mapGetters([
      'width',
    ])
  },
  watch: {
    rowData(val, old) {
      this.gridOptions.rowData = val
    }
  },
  methods: {
    onGridReady(params) {
      // console.log(params)
      // 获取gridApi
      this.gridApi = params.api
      this.columnApi = params.columnApi
      // 初始化表格的内容在这里放置
      // 调整表格列宽大小自适应
      // this.gridApi.sizeColumnsToFit()
      this.pageSize = this.gridApi.paginationGetPageSize()
      let box = document.querySelector('.ag-paging-panel')
      box.style.display = 'none'
    },
    onBtExport() {
      this.gridApi.exportDataAsExcel()
    },
    filter() {
      this.gridApi.setQuickFilter(this.input);
    },
    onPageSizeChanged(newPageSize) {
      this.gridApi.paginationSetPageSize(this.value);
      this.pageSize = this.gridApi.paginationGetPageSize()
    },
    handleSizeChange(val) {
      this.gridApi.paginationSetPageSize(val);
      this.pageSize = this.gridApi.paginationGetPageSize()
    },
    handleCurrentChange(val) {
      this.gridApi.paginationGoToPage(val - 1);
    },
    prevClick(val) {
      this.gridApi.paginationGoToPreviousPage();
    },
    nextClick() {
      this.gridApi.paginationGoToNextPage();
    },
    operationEdit(params, index, num) { //修改操作
      this.$emit('operationEdit', params, index, num)
    },
    operationDelete(row, index) { //删除操作
      this.$emit('operationDelete', row, index)
    },
    operationDetail(params, index) { //查看细节
      this.$emit('operationDetail', params, index)
      console.log(params, index)
    },
    financChack(params, index) { //查看细节
      this.$emit('financChack', params, index)
      console.log(params, index)
    },
    changeAgentStatus(params, index) { //改变代理商账号状态
      this.$emit('changeAgentStatus', params, index)
    },
    addItem(newItem) { //添加一条数据
      let res = this.gridApi.updateRowData({
        add: [newItem]
      });
    },
    removeItem() {
      let res = this.gridApi.updateRowData({
        remove: [this.rowData[0]]
      });
    },
  },
  beforeMount() {
    this.gridOptions.context = {
      componentParent: this
    }
    this.rowSelection = "multiple";
    console.log(this.gridOptions);
    this.localeText = {
      page: "daPage",
      more: "daMore",
      to: "daTo",
      of: "daOf",
      next: "daNexten",
      last: "daLasten",
      first: "daFirsten",
      previous: "daPreviousen",
      loadingOoo: "daLoading...",
      selectAll: "全选",
      searchOoo: "搜索...",
      blanks: "daBlanc",
      filterOoo: "搜索...",
      applyFilter: "daApplyFilter...",
      equals: "daEquals",
      notEqual: "daNotEqual",
      lessThan: "daLessThan",
      greaterThan: "daGreaterThan",
      lessThanOrEqual: "daLessThanOrEqual",
      greaterThanOrEqual: "daGreaterThanOrEqual",
      inRange: "daInRange",
      contains: "daContains",
      notContains: "daNotContains",
      startsWith: "daStarts dawith",
      endsWith: "daEnds dawith",
      group: "laGroup",
      columns: "laColumns",
      filters: "laFilters",
      rowGroupColumns: "laPivot Cols",
      rowGroupColumnsEmptyMessage: "la drag cols to group",
      valueColumns: "laValue Cols",
      pivotMode: "laPivot-Mode",
      groups: "laGroups",
      values: "laValues",
      pivots: "laPivots",
      valueColumnsEmptyMessage: "la drag cols to aggregate",
      pivotColumnsEmptyMessage: "la drag here to pivot",
      toolPanelButton: "la tool panel",
      noRowsToShow: `暂 无 数 据 ...`,
      pinColumn: "定位列栏目",
      valueAggregation: "laValue Agg",
      autosizeThiscolumn: "当前列自动宽度",
      autosizeAllColumns: "所有列自动宽度",
      groupBy: "laGroup by",
      ungroupBy: "laUnGroup by",
      resetColumns: "重置列设置",
      expandAll: "laOpen-em-up",
      collapseAll: "laClose-em-up",
      toolPanel: "laTool Panelo",
      export: "导出数据",
      csvExport: "导出.CSV格式",
      excelExport: "导出.Excel格式",
      pinLeft: "左定位 &lt;&lt;",
      pinRight: "右定位 &gt;&gt;",
      noPin: "取消定位 &lt;&gt;",
      sum: "laSum",
      min: "laMin",
      max: "laMax",
      none: "laNone",
      count: "laCount",
      average: "laAverage",
      copy: "复制",
      copyWithHeaders: "复制行信息",
      ctrlC: "ctrl + C",
      paste: "粘贴",
      ctrlV: "ctrl + V"
    };
  },
  mounted() {}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.right {
    display: flex;
    justify-content: flex-end;
}

.colorDiv {
    background: linear-gradient(90deg,rgba(255,124,42,1) 0%,rgba(255,144,51,1) 20%,rgba(255,170,62,1) 50%,rgba(255,185,69,1) 78%,rgba(255,191,72,1) 100%);
    height: 6px;
}

/deep/.ag-theme-material {
    box-shadow: 0 4px 14px rgba(0,0,0,0.09);
    .ag-header {
        background: #F2F2F2;
        .ag-header-cell-resize {
            width: 20px;
        }
    }
    .ag-row-hover {
        /* putting in !important so it overrides the theme's styling as it hovers the row also */
        background-color: #f1f1f1a6 !important;
        color: black;
        transition: all 0.2s;
    }

    // .ag-column-hover {
    //     background-color: #f1f1f1a6;
    //     color: black;
    //     transition: all 0.3s;
    // }

    .ag-pinned-right-cols-container {
        box-shadow: -2px -4px 9px #ccc;
    }
}
</style>
