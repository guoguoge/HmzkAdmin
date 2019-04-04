<template>
<article-detail :content="content" :type="type" @publish="publish" :is-edit="true" />
</template>

<script>
import ArticleDetail from './ArticleDetail'
import {
  jsonpReturn,
  checkRequest
} from '@/utils'

import {
  mapGetters
} from 'vuex'

import {
  ContractInfo,
  Contract,
  NewsEdit,
  NewsAdd
} from '@/api/beesbit'
export default {
  name: 'CreateForm',
  data() {
    return {
      content: ''
    }
  },
  props: {
    type: {
      type: Number,
      default: null
    },
    articleData: {
      type: Object,
      default: function() {
        return {}
      }
    },
  },
  computed: {
    ...mapGetters([
      'token'
    ])
  },
  watch: {
    articleData: {
      handler: function(val) {
        this.content = val.body
        console.log(this.content);
      },
      deep: true
    }
  },
  components: {
    ArticleDetail
  },
  methods: {
    init() {
      if (this.type == 1) {
        ContractInfo(this.token).then(res => {
          this.content = jsonpReturn(res.data).msg.contract
        })
      }
    },
    publish(val, title) {
      if (this.type == 1) { //发布算力合约
        Contract(
          this.token,
          val
        ).then(res => {
          if (checkRequest(res, true)) {
            this.$message({
              showClose: true,
              message: checkRequest(res, true),
              type: 'success'
            });
            this.$emit('closeArticle')
            this.init()
          }
        })
      } else if (this.type == 2) { //新建公告
        NewsAdd(
          this.token,
          title,
          val
        ).then(res => {
          checkRequest(res, true)
          this.$message({
            showClose: true,
            message: checkRequest(res, true),
            type: 'success'
          });
          this.$emit('closeArticle')
          // this.init()
          location.reload()
        })
      } else { //编辑公告
      }
    }
  },
  created() {},
  beforeMount() {},
  mounted() {
    this.init()
  }
}
</script>
