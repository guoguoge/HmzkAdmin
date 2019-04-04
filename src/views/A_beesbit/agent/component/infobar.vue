<template>
<!-- 代理商信息展示 -->
<div class="infobar">
  <el-row :gutter="20" class="agentTop" type="flex" justify="space-between">
    <el-col :span="6">
      <div class="agentName">
        代理商: {{agentName}}
        <el-tag v-if="pay != -1" style="margin-left:1rem" :type="pay==0?'danger':'success'" size="small">{{pay==0?'未采购算力':'已采购算力'}}</el-tag>
      </div>
    </el-col>
    <el-col :span="6">
      <div class="selectAgent">
        <el-select @change="agentChange" v-model="agent" placeholder="请选择代理商">
          <el-option v-for="(item,index) in agentList" :key="item.id" :label="item.label" :value="item.id" />
        </el-select>
      </div>
    </el-col>
  </el-row>
  <el-row :gutter="20" class="agentCenter" type="flex" justify="space-between">
    <el-col :span="8">
      <div class="information">
        <div class="number">
          {{comboList[comboIndex].num?comboList[comboIndex].num:0}} 份
        </div>
        <div class="select">
          <el-select @change="comboChange" v-model="value" placeholder="默认显示30天套餐">
            <el-option v-for="(item,index) in comboList" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
      </div>
    </el-col>
    <el-col :span="8">
      <div class="information">
        <div class="number">
          {{comboList[comboIndex].univalent?comboList[comboIndex].univalent:0}} 元
        </div>
        <div class="select">
          <span class="text">算力单价</span>
        </div>
      </div>
    </el-col>
    <el-col :span="8">
      <div class="information">
        <div class="number">
          {{agentInfo.price?agentInfo.price:0}} 元
        </div>
        <div class="select">
          <span class="text">应收帐款</span>
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
      agent: '',
      pay: '-1', //判断是否购买算力
      agentName: '暂未选择代理商',
      value: 1,
      comboList: [{
        value: 1,
        label: "30天算力套餐",
        num: '',
        univalent: '',
      }, {
        value: 2,
        label: "720天算力套餐",
        num: '',
        univalent: '',
      }],
      comboIndex: 1
    }
  },
  props: {
    agentList: {
      type: Array,
      default: []
    },
    agentInfo: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  watch: {
    agentInfo(val) {
      this.comboList[0].num = this.agentInfo.num_30
      this.comboList[1].num = this.agentInfo.num_2
      this.comboList[0].univalent = this.agentInfo.univalent_30
      this.comboList[1].univalent = this.agentInfo.univalent_2
      this.pay = val.is_pay
      console.log(this.pay);
    }
  },
  methods: {
    agentChange(val) {
      this.agentList.forEach((item, index) => { //代理商名字变化
        if (item.id == val) {
          this.agentName = item.label
        }
      })
      this.$emit('agentChange', val)
    },
    comboChange(val) {
      console.log(val);
      this.comboIndex = (val - 1)
    }
  },
  created() {},
  mounted() {
    console.log(this.agentList);
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.infobar {
    .agentTop {
        margin-bottom: 1rem;
        .agentName {
            color: #FF7B2A;
            display: flex;
            align-items: center;
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
                font-weight: 900;
            }
            .select {
                .el-select {
                    float: right;
                }
                .text {
                    float: right;
                    color: white;
                    text-align: left;
                    border-radius: 4px;
                    padding: 0.55rem 2rem;
                    background: #02BD62;
                }
            }
        }
    }
}
</style>
