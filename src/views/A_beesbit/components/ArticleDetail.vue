<template>
<div class="createPost-container">
  <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">
    <div class="createPost-main-container">
      <!-- <el-row>

        <el-col :span="24">
          <el-form-item v-if="type != 1" style="margin-bottom: 40px;" prop="title">
            <MDinput v-model="postForm.title" :maxlength="100" name="name" required>
              标题
            </MDinput>
          </el-form-item>
        </el-col>
      </el-row> -->

      <el-form-item prop="content" style="margin-bottom: 30px;">
        <Tinymce ref="editor" :height="400" v-model="postForm.content" />
      </el-form-item>
      <el-button class="beesbit-btn" size="large" style="width:100%;" @click="submitForm">确 定</el-button>

    </div>
  </el-form>

</div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import Upload from '@/components/Upload/singleImage3'
import MDinput from '@/components/MDinput'
import Sticky from '@/components/Sticky' // 粘性header组件
import {
  validateURL
} from '@/utils/validate'
import {
  fetchArticle
} from '@/api/article'
import {
  userSearch
} from '@/api/remoteSearch'
import Warning from './Warning'
import {
  CommentDropdown,
  PlatformDropdown,
  SourceUrlDropdown
} from './Dropdown'

export default {
  name: 'ArticleDetail',
  components: {
    Tinymce,
    MDinput,
    Upload,
    Sticky,
    Warning,
    CommentDropdown,
    PlatformDropdown,
    SourceUrlDropdown
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    content: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    type: {
      type: Number,
      default: null
    }
  },
  data() {
    const validateRequire = (rule, value, callback) => {
      if (value === '') {
        this.$message({
          message: rule.field + '为必传项',
          type: 'error'
        })
        callback(new Error(rule.field + '为必传项'))
      } else {
        callback()
      }
    }
    const validateSourceUri = (rule, value, callback) => {
      if (value) {
        if (validateURL(value)) {
          callback()
        } else {
          this.$message({
            message: '外链url填写不正确',
            type: 'error'
          })
          callback(new Error('外链url填写不正确'))
        }
      } else {
        callback()
      }
    }
    return {
      postForm: {
        title: '', // 文章题目
        content: '', // 文章内容
      },
      loading: false,
      userListOptions: [],
      rules: {
        image_uri: [{
          validator: validateRequire
        }],
        title: [{
          validator: validateRequire
        }],
        content: [{
          validator: validateRequire
        }],
        source_uri: [{
          validator: validateSourceUri,
          trigger: 'blur'
        }]
      },
      tempRoute: {},
      oldContent: '' // 文章旧数据
    }
  },
  computed: {
    contentShortLength() {
      return this.postForm.content_short.length
    },
    lang() {
      return this.$store.getters.language
    }
  },
  watch: {
    content: function(val) {
      this.postForm.content = val
      this.oldContent = val
      console.log(val);
      console.log(this.postForm.content);
    },
    title: function(val) {
      this.postForm.title = val
      console.log("title");
    },
    type: function(val) {
      this.type = val
    }
  },
  created() {},
  methods: {
    submitForm() {
      const Check = this.postForm.content == this.oldContent
      console.log(Check);
      this.postForm.display_time = parseInt(this.display_time / 1000)
      if (!Check) {
        this.$refs.postForm.validate(valid => {
          if (valid) {
            if ((this.postForm.content).trim()) {
              this.loading = true
              this.$emit('publish', this.postForm.content)
              this.postForm.content = ''
              this.postForm.title = ''
              this.loading = false
              this.$refs.editor.clear()
            } else {
              this.$message({
                message: '合同不能为空',
                type: 'error'
              })
            }
          } else {
            console.log('error submit!!')
            return false
          }
        })
      } else {
        this.$message({
          message: '未做任何修改!',
          type: 'error'
        })
      }

    },
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "~@/styles/mixin.scss";
.createPost-container {
    position: relative;
    .createPost-main-container {
        padding: 10px;
        .postInfo-container {
            position: relative;
            @include clearfix;
            margin-bottom: 10px;
            .postInfo-container-item {
                float: left;
            }
        }
    }
    .word-counter {
        width: 40px;
        position: absolute;
        right: -10px;
        top: 0;
    }
}
</style>
