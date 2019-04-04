<template>
<!-- 代理商信息展示 -->
<div class="infobar">
  <el-row :gutter="20" class="agentTop" type="flex" justify="end">
    <el-col :span="2">
      <slot name="button"></slot>
    </el-col>
  </el-row>
  <el-row :gutter="20" class="agentCenter" type="flex" justify="space-between">
    <el-col v-for="item in 3" :span="12" :key="item">
      <div class="information">
        <div class="number">
          123
        </div>
        <div class="select">
          <el-select v-model="value" placeholder="请选择">
            <el-option v-for="(item,index) in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
      </div>
    </el-col>
  </el-row>
</div>
</template>

<script>
export default {
  data() {
    return {
      options: [{
        value: '0',
        label: '代理商-A'
      }, {
        value: '1',
        label: '代理商-B'
      }, {
        value: '2',
        label: '代理商-C'
      }],
      value: '0'
    }
  },
  created() {},
  mounted() {

  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.infobar {
    .agentTop {
        margin-bottom: 1rem;
        .agentName {
            color: #FF7B2A;
        }
        .selectAgent {
            float: right;
        }
    }
    .agentCenter {
        .information {
            display: flex;
            flex-direction: column;
            padding: 1rem;
            justify-content: space-between;
            background: white;
            box-shadow: 0 4px 14px rgba(0,0,0,0.09);
            .number {
                color: #FF7B2A;
                font-size: 2rem;
                margin-bottom: 1rem;
            }
            .select {
                .el-select {
                    float: right;
                }
            }
        }
    }
}
</style>
