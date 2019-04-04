<template>
  <div class="tableBox">
    <topbar v-if="tableData.options.topbar" @handleDownload="handleDownload" >
      <template slot-scope="props">
        <slot :currentPage="{data:props.downloadLoading}"/>
      </template>
    </topbar>
    <div class="colorDiv"/>

    <el-table
      :data="tableData.data"
      :stripe="tableData.options.stripe"
      :highlight-current-row="tableData.options.highlight"
      size="mini"
      class="table"
      border
    >
      <el-table-column
        v-if="tableData.options.select"
        type="selection"
        width="55"/>
      <el-table-column
        :index="indexMethod"
        width="80"
        align="center"
        type="index"
        label="序号"
        fixed/>

      <el-table-column v-for="(item,index) in tableData.column" :width="item.width" :align="item.align" :prop="item.prop" :label="item.label" :key="index"/>

      <!-- 新建公告 -->
      <el-table-column
        v-if="tableData.options.name=='notice'"
        label="操作"
        align="center"
        width="180">
        <template slot-scope="scope">
          <el-button
            icon="el-icon-edit"
            title="修改"
            size="mini"
            circle
            @click="handleEdit(scope.$index, scope.row)"/>

          <el-popover
            placement="top-start"
            title="确定删除?"
            width="180"
            trigger="click"
          >
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="visible2 = false">取消</el-button>
              <el-button type="primary" size="mini" @click="visible2 = false">确定</el-button>
            </div>
            <el-button
              slot="reference"
              icon="el-icon-delete"
              title="删除"
              size="mini"
              circle
              @click="handleDelete(scope.$index, scope.row)"/>
          </el-popover>

        </template>
      </el-table-column>

      <!-- 余额提现 -->
      <el-table-column
        v-if="tableData.options.name=='balancewithdraw'"
        label="操作"
        align="center"
        width="180">
        <template slot-scope="scope">
          <el-button
            icon="el-icon-edit"
            title="修改"
            size="mini"
            circle
            @click="handleEdit(scope.$index, scope.row)"/>

          <el-popover
            placement="top-start"
            title="确定删除?"
            width="180"
            trigger="click"
          >
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="visible2 = false">取消</el-button>
              <el-button type="primary" size="mini" @click="visible2 = false">确定</el-button>
            </div>
            <el-button
              slot="reference"
              icon="el-icon-delete"
              title="删除"
              size="mini"
              circle
              @click="handleDelete(scope.$index, scope.row)"/>
          </el-popover>

        </template>
      </el-table-column>

    </el-table>
    <el-row type="flex" justify="end">
      <el-pagination
        :current-page="currentPage"
        :page-sizes="[20, 50, 100]"
        :page-size="10"
        background
        style="margin-top:2rem"
        :total="tableData.data.length"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"/>
    </el-row>
  </div>
</template>

<script>

import topbar from './topbar.vue'

import {
  parseTime
} from '@/utils'

export default {
  components: {
    topbar
  },
  props: {
    tableData: {
      type: Object,
      default: []
    }
  },
  data() {
    return {
      currentPage: 4,
      loading: true,
      tHeader: [], // 导出的Excel的头部
      filterVal: [], // 导出的Excel的value值
      visible: false
    }
  },
  created() {
    const column = this.tableData.column
    column.forEach(item => {
      if (item.excel) {
        console.log(item)
        this.tHeader.push(item.label)
        this.filterVal.push(item.prop)
      }
    })
  },
  mounted() {
  },
  methods: {
    indexMethod(index) { // 序号方法
      return index
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    handleEdit(index, row) {
      console.log(index, row)
      this.$emit('dialog', row, index)
    },
    handleDelete(index, row) {
      console.log(index, row)
      this.$emit('deleteRow', row, index)
    },
    handleDownload() { // 导出Excel表格方法
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = this.tHeader
        const filterVal = this.filterVal
        const data = this.formatJson(filterVal, this.tableData.data)
        console.log(data)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list',
          autoWidth: true
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.tableBox {
    margin-top: 2rem;
    .colorDiv {
        background: linear-gradient(90deg,rgba(255,124,42,1) 0%,rgba(255,144,51,1) 20%,rgba(255,170,62,1) 50%,rgba(255,185,69,1) 78%,rgba(255,191,72,1) 100%);
        height: 6px;
    }
    .table {
        width: 100%;
        box-shadow: 0 4px 14px rgba(0,0,0,0.09);
        .el-table {
            border-top: 1px solid red;
        }

    }
}
</style>
