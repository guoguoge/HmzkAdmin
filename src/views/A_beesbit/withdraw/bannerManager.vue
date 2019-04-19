<template>
<div class="app-container">
  <el-row type="flex" justify="space-between" :gutter="20" align="middle">
    <el-col :span="12">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>夺宝轮播管理</span>
          <el-button type="success" style="float: right" size="mini" @click.native="EditNotice(1)">新增夺宝轮播图 + </el-button>
        </div>
        <el-row :gutter="20">
          <el-col :span="12" v-for="(item,index) in 2">
            <div class="bannerBox">
              <img src="https://wx2.sinaimg.cn/mw690/737af861gy1g1vfkpi99xj20eg0kg16q.jpg" width="100%">
              <div class="mask">
                <el-button icon="el-icon-search" circle></el-button>
                <el-button icon="el-icon-edit" circle></el-button>
                <el-button icon="el-icon-delete" circle></el-button>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
    <el-col :span="12">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>竞拍轮播管理</span>
          <el-button type="success" style="float: right" size="mini" @click.native="EditNotice(2)">新增竞拍轮播图 + </el-button>
        </div>
        <el-row :gutter="20">
          <el-col :span="12" v-for="(item,index) in 2">
            <div class="bannerBox">
              <img src="https://wx3.sinaimg.cn/mw690/737af861gy1g1vhenxo1ej20eg0kgtt0.jpgs" width="100%">
              <div class="mask">
                <el-button icon="el-icon-search" circle></el-button>
                <el-button icon="el-icon-edit" circle></el-button>
                <el-button icon="el-icon-delete" circle></el-button>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
  </el-row>

  <el-dialog :visible.sync="show" :title="dialogTitle" width="50%" center top="5vh">
    <el-row type="flex" justify="space-between">
      <el-col>
        <el-select v-model="value" clearable placeholder="请选择轮播图对应商品">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col>
        <el-upload class="upload-demo" action="#" :multiple="false" :limit="1" :before-upload="handleUpload">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">请上传banner</div>
        </el-upload>
        <div class="exhibition">
          <img src="" alt="">
        </div>
      </el-col>
    </el-row>
    <el-row style="marginTop:1rem" type="flex" justify="space-between">
      <el-button>确 定</el-button>
    </el-row>
  </el-dialog>
</div>
</template>

<script>
import AGTable from '@/components/Table/AGTable'
import Article from '../components/create'

import {
  jsonpReturn,
  checkRequest
} from '@/utils'

import {
  mapGetters
} from 'vuex'

import {} from '@/api/beesbit'

export default {
  data() {
    return {
      dialogTitle: '新建轮播图',
      show: false,
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: ''
    }
  },
  computed: {
    ...mapGetters([
      'token'
    ])
  },
  components: {
    AGTable,
    Article
  },
  methods: {
    init() {

    },
    operationEdit(row, index) {},
    EditNotice(num) {

      this.show = true
    },
    reflash(val) {

    },
    handleUpload(file) {
      console.log(file);
      this.img = file
      let img = this.$refs.img
      let freader = new FileReader();
      freader.readAsDataURL(file);
      freader.onload = function(e) {
        img.setAttribute('src', e.target.result);
      }
      this.fileList = []
      this.fileList.push(file)
      return false
    },
  },
  created() {
    this.init()
  },
  beforeMount() {},
  mounted() {}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.box-card {
    .bannerBox {
        border: 1px solid #ccc;
        margin-bottom: 1rem;
        border-radius: 5px;
        padding: 1rem;
        overflow: hidden;
        position: relative;
        .mask {
            background: rgba(0,0,0,0.5);
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            position: absolute;
            opacity: 0;
            transition: all 0.3s;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }

    .bannerBox:hover {
        .mask {
            opacity: 1;
        }
    }

    .exhibition {
        display: flex;
        justify-content: center;
        img {
            width: 10rem;
            height: 10rem;
        }
    }
}
</style>
