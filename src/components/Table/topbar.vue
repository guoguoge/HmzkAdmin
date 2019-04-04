<template>
<div>
  <el-row class="tabbar" type="flex" justify="start">
    <el-col>
      <div class="toolBar">
        <el-row type="flex" justify="space-between" :gutter="10">
          <el-col :span="3">
            <el-input v-model="input" placeholder="请输入关键词搜索" suffix-icon="el-icon-search"></el-input>
          </el-col>
          <el-col class="right" :span="2">
            <el-button size="small" type="warning" :loading="downloadLoading" @click="handleDownload">导出表格</el-button>
            <slot :downloadLoading="downloadLoading"></slot>
          </el-col>
        </el-row>
      </div>
    </el-col>
  </el-row>
</div>
</template>

<script>
export default {
  data() {
    return {
      value: '0',
      input: '',
      num: 1,
      downloadLoading: false,
    }
  },
  computed: {
    router() {
      return this.$route
    }
  },
  methods: {
    choose(num) {
      this.num = num
      this.$emit('chooseList', num)
    },
    handleDownload() {
      this.$emit('handleDownload')
    }
  },
  mounted() {}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.tabbar {
    .choose {
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
    margin: 2rem 0;
    .toolBar {}
}

.right {
    display: flex;
    justify-content: flex-end;
}
</style>
