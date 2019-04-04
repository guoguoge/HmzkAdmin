<template>
<article-detail :title="row.title" :content="row.content" :is-edit="false" @publish="publish" />
</template>

<script>
import ArticleDetail from '../components/ArticleDetail'

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
  name: 'EditForm',
  data() {
    return {
      row: ''
    }
  },
  methods: {
    publish(val, title) {
      NewsEdit(
        this.token,
        this.row.id,
        title,
        val
      ).then(res => {
        if (checkRequest(res, true)) {
          this.$router.push({
            name: 'notice'
          })
        }
      })
    }
  },
  computed: {
    ...mapGetters([
      'token'
    ])
  },
  components: {
    ArticleDetail
  },
  created() {},
  beforeMount() {},
  mounted() {
    this.row = this.$route.query
    console.log(this.content);
    console.log(this.title);
  }
}
</script>
