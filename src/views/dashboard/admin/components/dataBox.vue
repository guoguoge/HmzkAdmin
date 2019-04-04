<template>
<div class="dataBox">
  <div class="content">
    <ul>
      <li>
        <b class="group">{{index + 1}}期 </b>
      </li>
      <li><span>{{index + 1}} 期总算力</span>
        <count-to :start-val="0" :end-val="res.power" :duration="2000" class="number power" />
      </li>
      <li><span>{{index + 1}} 期总金额</span>
        <count-to :start-val="0" :end-val="res.price" :duration="3000" class="number amount" />
      </li>
    </ul>
  </div>
</div>
</template>

<script>
import CountTo from 'vue-count-to'

export default {
  data() {
    return {

    }
  },
  props: {
    index: {
      type: Number,
      default: ''
    },
    res: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  components: {
    CountTo
  },
  created() {

  },
  beforeMount() {

  },
  mounted() {

  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dataBox {
    padding: 0.5rem 1rem;
    margin-top: 1rem;
    background: white;
    transition: all 0.3s;
    box-shadow: 0 4px 14px rgba(0,0,0,0.09);
    .content {
        ul {
            padding: 0;
            li {
                color: #8D8D8D;
                font-size: 14px;
                font-weight: 100;
                padding: 0.2rem 0;
                list-style: none;
                display: flex;
                align-items: center;
                justify-content: space-between;
                .number {
                    font-size: 25px;
                    font-weight: 900;
                }

                .number:hover {
                    cursor: pointer;
                }
            }
        }
        .group {
            // background-image: -webkit-linear-gradient(left, #ffb75e, #ed8f03);
            // -webkit-background-clip: text;
            // color: transparent;
            color: #4D4F5C;
            font-size: 25px;
            font-weight: 900;
        }
        .total {
            color: #FF7B2A;
        }
        .power {
            color: #02BD62;
        }
        .amount {
            color: #2680EB;
        }
    }
}
.dataBox:hover {
    background: #eee;
    box-shadow: inset 0 0 15px rgba(0,0,0,0.09);
}
</style>
