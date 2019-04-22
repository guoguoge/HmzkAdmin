<template>
<div class="app-container">
  <el-row type="flex" justify="space-between" :gutter="20" align="middle">
    <el-col :span="12">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>夺宝轮播管理</span>
          <el-button type="success" style="float: right" size="mini" @click.native="showModal(1)">新增夺宝轮播图 + </el-button>
        </div>
        <el-row :gutter="20">
          <el-col :span="12" v-for="(item,index) in treasureList" :key="index">
            <div class="bannerBox">
              <img :src="url + item.carousel" width="100%">
              <div class="mask">
                <el-button icon="el-icon-edit" circle @click.native="operationEdit(1,item)"></el-button>
                <el-button icon="el-icon-delete" circle @click.native="operationDelete(1,item)"></el-button>
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
          <el-button type="success" style="float: right" size="mini" @click.native="showModal(2)">新增竞拍轮播图 + </el-button>
        </div>
        <el-row :gutter="20">
          <el-col :span="12" v-for="(item,index) in actionList" :key="index">
            <div class="bannerBox">
              <img :src="url + item.carousel" width="100%">
              <div class="mask">
                <el-button icon="el-icon-edit" circle @click.native="operationEdit(2,item)"></el-button>
                <el-button icon="el-icon-delete" circle @click.native="operationDelete(2,item)"></el-button>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
  </el-row>


  <el-dialog :visible.sync="show" :title="dialogTitle" @closed="closed" @open="open" width="50%" center top="5vh">
    <el-row type="flex" justify="space-between">
      <el-col>
        <el-select v-model="goods_id" clearable placeholder="请选择轮播图对应商品">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col>
        <el-upload class="upload-demo" action="#" :multiple="false" :limit="1" :before-upload="handleUpload">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip" style="marginBottom:1rem">{{img?img.name:'请上传banner'}}</div>
        </el-upload>
        <div class="exhibition">
          <img class="img" ref="img" width="100%">
        </div>
      </el-col>
    </el-row>
    <el-row style="marginTop:1rem" type="flex" justify="center">
      <el-button @click.native="submit">确 定</el-button>
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

import {
  CarouselList,
  AddCarousel,
  DelCarousel,
  EditCarousel,
  ListTreasure,
  AuctionList
} from '@/api/beesbit'

export default {
  data() {
    return {
      dialogTitle: '新建轮播图',
      show: false,
      type: '',
      options: [],
      goods_id: '',
      img: '',
      edit: false,
      treasureList: [],
      actionList: [],
      carouselId: ''
    }
  },
  computed: {
    ...mapGetters([
      'token',
      'url'
    ])
  },
  components: {
    AGTable,
    Article
  },
  methods: {
    init() {
      CarouselList(4).then(res => {
        this.treasureList = []
        this.actionList = []
        let data = checkRequest(res, false)
        if (checkRequest(res, false)) {
          data.forEach(item => {
            if (item.type == 1) {
              this.treasureList.push({
                carousel: item.carousel,
                goods_id: item.goods_id,
                id: item.id,
                time: item.time,
                type: item.type,
              })
            } else {
              this.actionList.push({
                carousel: item.carousel,
                goods_id: item.goods_id,
                id: item.id,
                time: item.time,
                type: item.type,
              })
            }
          })
        }
      })
    },
    operationPreview(type, id) {
      console.log(type);
    },
    operationEdit(type, item) {
      this.dialogTitle = '修改轮播图'
      let img = this.$refs.img
      this.show = true
      this.edit = true
      this.type = type
      this.carouselId = item.id
      this.goods_id = Number(item.goods_id)
      if (img) {
        img.setAttribute('src', this.url + item.carousel);
      }
      console.log(type);
      console.log(this.goods_id, this.img);
    },
    operationDelete(type, item) {
      console.log(type);
      DelCarousel(this.token, 2, item.id).then(res => {
        if (checkRequest(res, true)) {
          this.show = false
          this.init()
        }
      })
    },
    showModal(num) {
      this.type = num
      this.show = true
    },
    reflash(val) {},
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
    open() {
      if (this.type == 1) {
        ListTreasure(this.token, 4).then(res => {
          let data = checkRequest(res, false)
          console.log(data);
          data.forEach(item => {
            this.options.push({
              label: item.cat_name,
              value: item.id,
            })
          })
        })
      } else {
        AuctionList(this.token, 4).then(res => {
          let data = checkRequest(res, false)
          console.log(data);
          data.forEach(item => {
            this.options.push({
              label: item.cate_name,
              value: item.id,
            })
          })
        })
      }
    },
    closed() { //初始化
      this.img = ''
      this.goods_id = ''
      this.options = []
      this.edit = false
      this.carouselId = ''
      let img = this.$refs.img
      img.setAttribute('src', '');
    },
    submit() {
      console.log(this.goods_id);
      if (this.goods_id) {

        let FD = new FormData()

        FD.append('token', this.token)
        FD.append('method', this.edit ? 3 : 1)
        FD.append('type', this.type)
        if (this.edit) {
          FD.append('car_id', this.carouselId)
        }
        FD.append('img', this.img ? this.img : '')
        FD.append('goods_id', this.goods_id)
        if (this.edit) {
          EditCarousel(FD).then(res => {
            if (checkRequest(res, true)) {
              this.show = false
              this.init()
            }
          })
        } else {
          AddCarousel(FD).then(res => {
            if (checkRequest(res, true)) {
              this.show = false
              this.init()
            }
          })
        }
      } else {
        this.$message({
          message: '请确认轮播图信息完整',
          type: 'error'
        })
      }
    }
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

    /deep/.exhibition {
        display: flex;
        justify-content: center;
        /deep/.img {
            width: 8rem;
            height: 8rem;
            margin: 1rem;
        }
    }
}
</style>
