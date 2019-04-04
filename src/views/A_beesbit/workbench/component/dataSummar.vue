<template>
<!-- 代理商信息展示 -->
<div class="dataSummar">
  <el-row type="flex" justify="space-between" :gutter="20">
    <el-col :span="8">
      <label>算力收益</label>
      <div class="powerBox">
        <el-row class="power" type="flex" justify="space-between" style="margin-top:1rem">
          <el-col class="col">
            <div>
              <div class="img">
                <img :src="img" width="100%">
              </div>
              <p>ETH总收益</p>
              <h1>{{webData.total_agent_income || '0'}}</h1>
            </div>
          </el-col>
          <el-col class="col">
            <div>
              <div class="img">
                <img :src="img" width="100%">
              </div>
              <p>ETH总提现</p>
              <h1>{{webData.total_agent_payout || '0'}}</h1>
            </div>
          </el-col>
          <el-col class="col">
            <div>
              <div class="img">
                <img :src="img" width="100%">
              </div>
              <p>ETH总算力</p>
              <h1>{{webData.total_agent_power || '0'}}</h1>
            </div>
          </el-col>
        </el-row>
        <el-row class="rate">
          <el-row class="rateBox" type="flex" justify="space-between">
            <div>
              汇率
            </div>
            <div class="rateNumber">
              无数据
            </div>
          </el-row>
        </el-row>
      </div>
    </el-col>
    <el-col :span="16">
      <label>用户数据统计</label>
      <el-row class="userData" type="flex" justify="space-between" style="margin-top:1rem">
        <el-col :span="12" class="userDataBox">
          <el-row type="flex" justify="space-between" :gutter="20">
            <el-col>
              <div>
                <span>用户总数</span>
                <span class="number">{{webData.total_agent_user || '0'}}</span>
              </div>
            </el-col>
            <el-col>
              <div>
                <span>七日内用户注册数</span>
                <span class="number">8</span>
              </div>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between" :gutter="20" style="margin-top:1rem;">
            <el-col>
              <div>
                <span>订单总数</span>
                <span class="number">无数据</span>
              </div>
            </el-col>
            <el-col>
              <div>
                <span>总算力</span>
                <span class="number">无数据</span>
              </div>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between" style="margin-top:1rem;">
            <el-col>
              <div>
                <span>总金额</span>
                <span class="number">{{webData.total_agent_user || '0'}}</span>
              </div>
            </el-col>
          </el-row>
        </el-col>
        <!-- <el-col :span="12" class="earning">
          <el-row :gutter="20">
            <el-col :span="12">
              <div class="col">
                <p>ETH总收益 </p>
                <h2>5944.732910289027</h2>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="col">
                <p>ETH提现量</p>
                <h2>2134.3788000000004</h2>
              </div>
            </el-col>
            <el-col :span="12" style="margin-top:1rem;">
              <div class="col">
                <p>ETH账户总余额</p>
                <h2>2108.2447087903</h2>
              </div>
            </el-col>
            <el-col :span="12" style="margin-top:1rem;">
              <div class="col">
                <p>在运行总算力</p>
                <h2>382005</h2>
              </div>
            </el-col>
          </el-row>
        </el-col> -->
      </el-row>
    </el-col>
  </el-row>
</div>
</template>

<script>
export default {
  data() {
    return {
      img: require('@/assets/avatar.png')
    }
  },
  props: {
    webData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  created() {},
  mounted() {

  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dataSummar {
    margin-top: 2rem;
    label {
        color: #4D4F5C;
    }
    .powerBox {
        background: white;
        box-shadow: 0 4px 14px rgba(0, 0, 0, 0.09);
        .power {
            padding: 1rem 0 0;
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
                }
            }
        }
    }

    .userData {
        background: white;
        padding: 1rem;
        box-shadow: 0 4px 14px rgba(0, 0, 0, 0.09);
        .userDataBox {
            margin-right: 1rem;
            .el-col {
                div {
                    background: #f8f8f8;
                    padding: 1.5rem;
                    display: flex;
                    align-items: center;
                    transition: all 0.1s;
                    justify-content: space-between;
                    span {
                        font-size: 14px;
                        color: #7F87AB;
                    }
                    .number {
                        color: #FF7B2A;
                        font-size: 15px;
                    }
                }
                div:hover {
                    background: #fff;
                    box-shadow: inset 0 0 15px rgba(0,0,0,0.09);
                }
            }
        }
        .earning {
            .col {
                text-align: center;
                background: #F8F8F8;
                padding: 1.3rem 0;
                transition: all 0.1s;
                p {
                    color: #7F87AB;
                    font-size: 14px;
                    font-weight: lighter;
                }
                h2 {
                    color: #4896FF;
                    font-size: 18px;
                    margin: 0;
                }
            }
            .col:hover {
                background: #fff;
                box-shadow: inset 0 0 15px rgba(0,0,0,0.09);
            }
        }
    }
    .rate {
        background: white;
        padding: 1rem;
        .rateBox {
            background: #F8F8F8;
            padding: 1rem 2rem;
            transition: all 0.1s;
            .rateNumber {
                color: #FF7B2A;
            }
        }
        .rateBox:hover {
            background: #fff;
            box-shadow: inset 0 0 15px rgba(0,0,0,0.09);
        }
    }
}
</style>
