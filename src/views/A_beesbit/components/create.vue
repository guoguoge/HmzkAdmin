<template>
<div class="">
  <article-detail :content="content" :type="type" @publish="publish" :is-edit="true" />
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
        console.log(this.content);
        this.content = val
      },
      deep: true
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
    }
  },
  created() {},
  beforeMount() {},
  mounted() {
    this.init()
  }
}
</script>
