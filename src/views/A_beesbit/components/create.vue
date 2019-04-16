<template>
<div class="">
  <article-detail ref="article" :content="content" :type="type" @publish="publish" :is-edit="true" />
</div>
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
      type: String,
      default: ''
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
        this.content = val
        console.log(this.content);
      },
      deep: true,
      immediate: true
    }
  },
  components: {
    ArticleDetail
  },
  methods: {
    init() {
    },
    publish(val, title) {
      this.$emit('closeArticle', val)
    },
    clear() {
      this.$refs.article.clear()
    }
  },
  created() {},
  beforeMount() {},
  mounted() {
    this.init()
  }
}
</script>
