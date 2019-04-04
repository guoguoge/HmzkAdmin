<template>
<el-row class="earningBox" :gutter="20">
  <el-col class="earnings" :span="12">
    <div class="rowBox">
      <el-row :gutter="20">
        <el-col style="margin-bottom:1rem;" :span="12">
          <div class="earningItem">
            <h2>
              <count-to :start-val="0" :end-val="webData.total_income" :decimals="6" :duration="1000" />
            </h2>
            <p>惠民折扣用户总收益</p>
          </div>
        </el-col>
        <el-col style="margin-bottom:1rem;" :span="12">
          <div class="earningItem">
            <h2>
              <count-to :start-val="0" :end-val="webData.total_payout" :decimals="6" :duration="1000" />
            </h2>
            <p>惠民折扣用户总提现</p>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="earningItem">
            <h2>
              <count-to :start-val="0" :end-val="webData.total_agent_income" :decimals="6" :duration="1000" />
            </h2>
            <p>代理商用户总收益</p>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="earningItem">
            <h2>
              <count-to :start-val="0" :end-val="webData.total_agent_payout" :decimals="6" :duration="1000" />
            </h2>
            <p>代理商用户总提现</p>
          </div>
        </el-col>
      </el-row>
    </div>
  </el-col>
  <el-col class="users" :span="12">
    <div class="rowBox">
      <el-row :gutter="30">
        <el-col :span="12">
          <el-row>
            <div class="userItem" style="margin-bottom:1rem">
              <p>惠民折扣用户数</p>
              <count-to :start-val="0" :end-val="webData.total_user" :duration="1000" class="number" />
            </div>
          </el-row>
          <el-row>
            <div class="userItem" style="margin-bottom:1rem">
              <p>惠民折扣用户购买算力金额</p>
              <count-to :start-val="0" :end-val="webData.total_price" :duration="1000" class="number" />
            </div>
          </el-row>
          <el-row>
            <div class="userItem">
              <p>惠民折扣用户当前运行算力</p>
              <count-to :start-val="0" :end-val="webData.total_power" :duration="1000" class="number" />
            </div>
          </el-row>
        </el-col>
        <el-col :span="12">
          <el-row>
            <div class="userItem" style="margin-bottom:1rem">
              <p>代理商用户数</p>
              <count-to :start-val="0" :end-val="webData.total_agent_user" :duration="1000" class="number" />
            </div>
          </el-row>
          <el-row>
            <div class="userItem" style="margin-bottom:1rem">
              <p>代理商用户购买算力金额</p>
              <count-to :start-val="0" :end-val="webData.total_agent_price" :duration="1000" class="number" />
            </div>
          </el-row>
          <el-row>
            <div class="userItem">
              <p>代理商用户当前运行算力</p>
              <count-to :start-val="0" :end-val="webData.total_agent_power" :duration="1000" class="number" />
            </div>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </el-col>
</el-row>
</template>

<script>
import CountTo from 'vue-count-to'

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

export default {
  data() {
    return {
    }
  },
  props: {
    webData: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  methods: {},
  components: {
    CountTo
  },
  created() {},
  beforeMount() {},
  mounted() {}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.earningBox {
    margin-top: 1rem;
    transition: all 0.3s;
    .rowBox {
        background: white;
        padding: 1rem;
        box-shadow: 0 4px 14px rgba(0,0,0,0.09);
    }
    .earnings {
        .earningItem {
            transition: all 0.3s;
            padding: 1rem;
            background: #f2f2f2;
            text-align: center;
            h2 {
                color: #FF7B2A;
            }
            p {
                color: #8D8D8D;
                font-weight: 100;
            }
        }

        .earningItem:hover {
            background: #fff;
            box-shadow: inset 0 0 15px rgba(0,0,0,0.09);
        }
    }
    .users {
        .userItem {
            transition: all 0.3s;
            padding: 1rem 2rem;
            background: #f2f2f2;
            display: flex;
            width: 100%;
            align-items: center;
            justify-content: space-between;
            text-align: center;
            h2 {
                color: #FF7B2A;
            }
            p {
                color: #8D8D8D;
                font-weight: 100;
            }
            .number {
                color: #FF7B2A;
                font-size: 24px;
            }
        }

        .userItem:hover {
            background: #fff;
            box-shadow: inset 0 0 15px rgba(0,0,0,0.09);
        }
        .welcome {
            h2 {
                color: #4D4F5C;
            }
            p {
                font-size: 14px;
                color: #8D8D8D;
            }
        }
    }
}
</style>
