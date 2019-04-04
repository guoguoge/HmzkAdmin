<template>
<div class="controlbar">
  <el-row type="flex" justify="space-between" :gutter="20">
    <el-col class="left" :span="10">
      <div class="card" v-loading="loading">
        <div class="power">
          <el-row type="flex" justify="space-between" :gutter="20">
            <el-col :span="8">
              <div class="col username">
                <p>
                  <svg-icon icon-class="people" /> {{agent.name || '请选择代理商'}}</p>
              </div>
            </el-col>
            <el-col :span="16">
              <div class="col">
                <el-row>
                  <h1>1312</h1>
                </el-row>
                <el-row type="flex" justify="end">
                  <el-select v-model="value" placeholder="销售算力份数（份）">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-row>
              </div>
            </el-col>
          </el-row>
        </div>

        <div class="number">
          <el-row type="flex" justify="space-between" :gutter="20">
            <el-col class="col">
              <div>
                <h2>0</h2> 算力单价（元）
              </div>
            </el-col>
            <el-col class="col">
              <div>
                <h2>0</h2> 应收账款
              </div>
            </el-col>
          </el-row>
        </div>

      </div>
      <div class="card" style="margin-top:1rem" v-loading="loading">
        <label>代理商控制模块(暂未开放)</label>
        <el-row class="control" type="flex" justify="space-between" :gutter="20">
          <el-col class="col">
            <div class="controlBar">
              <span>算力单价控制</span>
              <span class="setting" disabled>立即设置</span>
            </div>
          </el-col>
          <el-col class="col">
            <div>
              <span>代理商权限管理</span>
              <span>
                <el-switch disabled v-model="value2" active-color="#FF7B2A" inactive-color="#d0d0d0" :width="35" />
              </span>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-col>

    <el-col class="right" :span="14">
      <div class="card" v-loading="loading">
        <el-row class="data" type="flex" justify="space-between" :gutter="20">
          <el-col class="col">
            <div>
              <div class="img">
                <img :src="img" width="100%">
              </div>
              <p>ETH总收益</p>
              <h1>{{agent.num_total || 0}} ETH</h1>
            </div>
          </el-col>
          <el-col class="col">
            <div>
              <div class="img">
                <img :src="img" width="100%">
              </div>
              <p>ETH提现量</p>
              <h1>{{agent.payout_total || 0}} ETH</h1>
            </div>
          </el-col>
          <el-col class="col">
            <div>
              <div class="img">
                <img :src="img" width="100%">
              </div>
              <p>ETH账户总余额</p>
              <h1>{{(agent.num_total - agent.payout_total) || 0}} ETH</h1>
            </div>
          </el-col>
          <el-col class="col">
            <div>
              <div class="img">
                <img :src="img" width="100%">
              </div>
              <p>在运行总算力</p>
              <h1>{{agent.power_total || 0}} MH/S</h1>
            </div>
          </el-col>
        </el-row>
        <el-row class="users" :gutter="20">
          <el-col class="col" :span="8">
            <div class="controlBar">
              <span>用户总数</span>
              <span class="setting">{{agent.user_total || 0}}</span>
            </div>
          </el-col>
          <el-col class="col" :span="8">
            <div class="controlBar">
              <span>订单总数</span>
              <span class="setting">{{agent.count_total || 0}}</span>
            </div>
          </el-col>
          <el-col class="col" :span="8">
            <div class="controlBar">
              <span>运行订单总金额</span>
              <span class="setting">{{agent.price_total || 0}}</span>
            </div>
          </el-col>
          <el-col class="col" :span="8" style="margin-top:1rem">
            <div class="controlBar">
              <span>是否采购算力</span>
              <span class="setting">{{agent.is_pay == 0?'未购买':'已购买'}}</span>
            </div>
          </el-col>
          <el-col class="col" :span="8" style="margin-top:1rem">
            <div class="controlBar">
              <span>账户状态</span>
              <span class="setting">{{agentInfo?(agent.is_allow == 0 ?'已冻结':'未冻结'):'暂无'}}</span>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-col>
  </el-row>
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
  CardList,
  AddCard,
  UpdateCard,
  UnlockCard,
  DelCard
} from '@/api/beesbit'

export default {
  data() {
    return {
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }],
      value: '',
      value2: true,
      img: require('@/assets/avatar.png')
    }
  },
  props: {
    agentInfo: {
      type: Object,
      default: function() {
        return {}
      }
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    agent() {
      return this.agentInfo
    }
  },
  methods: {

  },
  created() {},
  beforeMount() {},
  mounted() {}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.controlbar {

    .card {
        background: white;
        padding: 1rem;
        box-shadow: 0 4px 14px rgba(0, 0, 0, 0.09);
        label {
            color: #4D4F5C;
            font-size: 14px;
        }
    }

    .left {
        .power {
            transition: all 0.1s;
            .col {
                background: #F2F2F2;
                padding: 1rem;
                h1 {
                    margin: 5px 0;
                    color: #FF7B2A;
                }
            }

            .username {
                text-align: center;
                padding: 2rem 0;
                p {
                    margin: 0.9rem 0;
                    color: #FF7B2A;
                    font-size: 18px;
                }
            }

            .col:hover {
                background: #fff;
                box-shadow: inset 0 0 15px rgba(0,0,0,0.09);
            }
        }
        .number {
            margin-top: 1rem;
            .col {
                text-align: center;
                div {
                    background: #F2F2F2;
                    padding: 12px 0;
                    transition: all 0.1s;
                    font-size: 14px;
                    color: #8D8D8D;
                    h2 {
                        margin: 10px 0;
                        color: #FF7B2A;
                    }
                }
                div:hover {
                    background: #fff;
                    box-shadow: inset 0 0 15px rgba(0,0,0,0.09);
                }

            }
        }
        .control {
            margin-top: 1rem;
            .col {
                div {
                    background: #F2F2F2;
                    padding: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    span {
                        font-size: 14px;
                        color: #8D8D8D;
                    }
                }
                div:hover {
                    background: #fff;
                    box-shadow: inset 0 0 15px rgba(0,0,0,0.09);
                }
                .controlBar {
                    padding: 12px;
                    .setting {
                        color: #FF7B2A;
                    }
                    .setting:hover {
                        cursor: pointer;
                    }
                }
            }
        }
    }
    .right {
        .data {
            margin-top: 1rem;
            margin-bottom: 0.5rem;
            .col {
                text-align: center;
                .img {
                    border-radius: 10rem;
                    overflow: hidden;
                    width: 5rem;
                    height: 5rem;
                    margin: 0 auto;
                    background: #E8F2FF;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    img {
                        width: 3rem;
                        height: 3rem;
                    }
                }
                p {
                    color: #8D8D8D;
                    font-size: 14px;
                    font-weight: lighter;
                }
                h1 {
                    color: #4896FF;
                    font-size: 20px;
                    font-weight: normal;
                }
            }
        }
        .users {
            .col {
                .controlBar {
                    display: flex;
                    background: #F2F2F2;
                    padding: 1.5rem;
                    justify-content: space-between;
                    transition: all 0.1s;
                    span {
                        font-size: 14px;
                        color: #8D8D8D;
                    }
                    .setting {
                        color: #FF7B2A;
                        font-weight: 900;
                        font-size: 18px;
                        font-weight: normal;
                    }
                }
                .controlBar:hover {
                    background: #fff;
                    box-shadow: inset 0 0 15px rgba(0,0,0,0.09);
                }
            }
        }
    }

}
</style>
