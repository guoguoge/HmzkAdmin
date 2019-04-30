<template>
<div class="app-container">
  <el-row type="flex" justify="end">
    <el-col :span="4" style="text-align:right;marginBottom:1rem">
      <el-button type="primary" @click="showDialog(1)"><i class="el-icon-circle-plus"></i> 新增夺宝商品</el-button>
    </el-col>
  </el-row>
  <AGTable :rowData="rowData" :columnDefs="column" :defaultColDef="config" @operationDelete="operationDelete" @operationEdit="operationEdit"></AGTable>
  <el-dialog :visible.sync="show" :title="title" @closed="closed" top="5vh" width="70%" center>
    <span slot="footer" class="dialog-footer">
      <el-form status-icon ref="form" :rules="rules" :model="form" label-position="left" class="demo-ruleForm">
        <el-row type="flex" justify="space-between" :gutter="20">
          <el-col>
            <el-form-item style="width:100%" label="商品名称" prop="name">
              <el-input placeholder="请输入商品名称" v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item style="width:100%" label="商品分类" prop="category">
              <el-select style="width:100%" v-model="form.category" placeholder="选择商品分类">
                <el-option v-for="(item,index) in categoryList" :key="index" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="参与价格" prop="price">
              <el-input-number style="width:100%" v-model="form.price" :min="1" label="请输入参与价格"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" justify="space-between" :gutter="20">
          <el-col>
            <el-form-item label="马甲中奖id(非必填)">
              <el-select style="width:100%" v-model="form.vest_user" placeholder="马甲中奖人(非必填)" clearable>
                <el-option v-for="(item,index) in vestUserList" :key="index" :label="item.name" :value="item.id" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="基础人气(非必填)" prop="popular">
              <el-input-number style="width:100%" v-model="form.popular" :min="0" label="输入基础人气(非必填)"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="space-between" :gutter="20">
          <el-col>
            <el-form-item style="width:100%" label="开始时间" prop="start">
              <el-date-picker value-format="timestamp" style="width:100%" format="yyyy-MM-ddHH:mm:ss" :picker-options="pickerOptions" v-model="form.start" type="datetime" placeholder="选择开始时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item style="width:100%" label="结束时间(需选择开始时间)" prop="end">
              <el-date-picker value-format="timestamp" :disabled="!form.start" style="width:100%" format="yyyy-MM-ddHH:mm:ss" :picker-options="pickerOptions1" v-model="form.end" type="datetime" placeholder="选择结束时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="" prop="status">
          <div class="">
            <el-switch style="margin:1rem 0" v-model="form.status" :active-value="1" :inactive-value="2" active-color="#13ce66" inactive-color="#ff4949" active-text="上架" inactive-text="下架">
            </el-switch>
          </div>
        </el-form-item>


        <!-- 上传图片 -->

        <el-row type="flex" justify="start" style="marginBottom:1rem">
          <el-col :span="6">
            <el-form-item prop="age">
              <el-upload class="upload-demo" action="#" :multiple="false" :limit="1" :before-upload="handleUpload">
                <el-button size="small" type="primary">点击上传封面图</el-button>
                <div slot="tip" class="el-upload__tip">{{num == 1? '请上传封面图':'选择图片则替换封面图,不操作则不做改变'}}</div>
              </el-upload>
            </el-form-item>

            <div class="exhibition" v-viewer>
              <img class="superImg" ref="img" v-show="fileList.length" :src="url + fileList[0]" width="100%">
              <img class="superImg" v-show="!fileList.length" src="../../assets/noimg.png" width="100%">
            </div>
          </el-col>
          <el-col :span="18">
            <el-form-item prop="age">
              <el-upload class="upload-demo" action="#" :before-upload="handleUpload2">
                <el-button size="small" type="primary">点击上传详情图</el-button>
                <el-button v-if="num == 1" slot="tip" size="small" type="danger" @click.native="clearDetail" style="marginLeft:10px">清空</el-button>
                <div slot="tip" style="color:red" class="el-upload__tip">{{num == 1? '请上传详情图':'选择图片则替换之前所有的详情图,不操作则不做改变'}}</div>
              </el-upload>
            </el-form-item>


            <!-- 用户修改的时候出现 -->
            <div class="exhibition EditExhibition" v-viewer v-if="num == 2">
              <div class="imgBox"></div>
              <div class="" v-if="!fileList2.length">
                <img class="superImg" v-for="(item,index) in form.detail_img" :src="url+item" width="100%">
              </div>
            </div>

            <div class="exhibition addExhibition" v-viewer v-else-if="num == 1">
              <!-- 用户新建的时候出现 -->
              <div class="imgBox"></div>
              <img v-if="!fileList2.length" class="superImg noimg" src="../../assets/noimg.png" width="100%">
            </div>

            <div class="exhibition" v-viewer v-else>
              <img class="superImg" src="../../assets/noimg.png" width="100%">
            </div>

          </el-col>
        </el-row>

        <!-- 上传图片 -->

      </el-form>
      <el-button size="large" style="width:100%;" type="primary" @click="submit" :loading="loading">确 定</el-button>
    </span>
  </el-dialog>

  <el-dialog :visible.sync="dialogVisible">
    <img width="100%" :src="dialogImageUrl" alt="">
  </el-dialog>

</div>
</template>

<script>
import AGTable from '@/components/Table/AGTable'

import {
  jsonpReturn,
  checkRequest,
  formatDate
} from '@/utils'

import {
  mapGetters
} from 'vuex'

import {
  Category,
  AddTreasure,
  EditTreasure,
  DelCategory,
  ListTreasure,
  DelTreasure,
  VestUser
} from '@/api/beesbit'

export default {
  data() {
    return {
      rowData: [], //表格源数据
      column: [{
          headerName: '商品名',
          field: 'name',
          cellStyle: {
            color: '#8D8D8D'
          }
        },
        {
          headerName: '分类名',
          field: 'cat_name',
          cellStyle: {
            color: '#8D8D8D'
          }
        },
        {
          headerName: '参与价格',
          field: 'price',
          cellStyle: {
            color: '#8D8D8D'
          }
        },
        {
          headerName: '封面图',
          field: 'cat_name',
          cellStyle: {
            color: '#8D8D8D'
          }
        },
        {
          headerName: '详情图',
          field: 'cat_name',
          cellStyle: {
            color: '#8D8D8D'
          }
        },
        {
          headerName: '马甲中奖id',
          field: 'vest_user',
          cellStyle: {
            color: '#8D8D8D'
          },
          cellRenderer: params => {
            return params.data.vest_user || '暂无';
          },
          valueGetter: params => {
            return params.data.vest_user || '暂无';
          }
        },
        {
          headerName: '马甲中奖昵称',
          field: 'vest_name',
          cellStyle: {
            color: '#8D8D8D'
          }
        },
        {
          headerName: '人气',
          field: 'popular',
          cellStyle: {
            color: '#8D8D8D'
          }
        },
        {
          headerName: '开始时间',
          field: 'start',
          cellStyle: {
            color: '#8D8D8D'
          },
          cellRenderer: params => {
            return formatDate(params.data.start);
          },
          valueGetter: params => {
            return formatDate(params.data.start);
          },
        },
        {
          headerName: '结束时间',
          field: 'end',
          cellStyle: {
            color: '#8D8D8D'
          },
          cellRenderer: params => {
            return formatDate(params.data.end);
          },
          valueGetter: params => {
            return formatDate(params.data.end);
          },
        },
        {
          headerName: '运行',
          field: 'status',
          cellStyle: {
            color: '#8D8D8D'
          },
          cellRenderer: params => {
            return params.data.status == 1 ? '上架' : '下架';
          },
          valueGetter: params => {
            return params.data.status == 1 ? '上架' : '下架';
          }
        },
        {
          headerName: '操作',
          field: '',
          cellRendererFramework: 'agentOperationButton',
          cellStyle: {
            color: '#8D8D8D'
          },
          pinned: 'right',
        }
      ],
      config: {
        width: 150,
        sortable: true,
        resizable: true,
        filter: true,
        search: true,
      },
      pickerOptions: {
        disabledDate: (time) => {
          if (this.form.end != "") {
            return time.getTime() < Date.now() || time.getTime() < this.form.end;
          } else {
            return time.getTime() < Date.now();
          }
        }
      },
      pickerOptions1: {
        disabledDate: (time) => {
          return time.getTime() < this.form.start;
        }
      },
      rowContent: {},
      show: false,
      form: {
        category: '',
        name: '',
        price: 0,
        vest_user: '',
        popular: 0,
        start: '',
        end: '',
        status: 1,
        cover_img: '',
        detail_img: []
      },
      rules: {
        name: [{
          type: 'string',
          required: true,
          message: '请输入商品名称',
          trigger: 'blur'
        }],
        category: [{
          type: 'number',
          required: true,
          message: '请输入商品所属分类',
          trigger: 'blur'
        }],
        price: [{
          type: 'number',
          min: 1,
          required: true,
          message: '请输入正确参与价格',
          trigger: 'blur'
        }],
        vest_user: [{
          message: '请输入马甲中奖id',
          trigger: 'blur'
        }],
        popular: [{
          type: 'number',
          message: '基础人气',
          trigger: 'blur'
        }],
        start: [{
          type: 'date',
          required: true,
          message: '请输入开始时间',
          trigger: 'blur'
        }],
        end: [{
          type: 'date',
          required: true,
          message: '请输入结束时间',
          trigger: 'blur'
        }]
      },
      title: '',
      cateId: '', // 商品ID
      categoryList: [], // 商品列表
      dialogImageUrl: '',
      dialogVisible: false, //弹出框
      fileList: [], // 封面图
      fileList2: [], // 详情图列表
      num: '', // 判断新建或者修改的 1为新建 2为修改
      vestUserList: [], // 马甲用户列表
      loading: false
    }
  },
  computed: {
    ...mapGetters([
      'token',
      'url'
    ])
  },
  components: {
    AGTable
  },
  methods: {
    init() {
      ListTreasure(this.token, 4).then(res => {
        this.rowData = checkRequest(res, false)
        console.log(this.rowData);
      })
      Category(this.token, 4).then(res => {
        let data = checkRequest(res, false)
        data.forEach((item) => {
          this.categoryList.push({
            value: item.id,
            label: item.cat_name
          })
        })
        this.form.category = this.categoryList[0].value
      })
      VestUser(this.token).then(res => {
        let data = checkRequest(res, false)
        if (data) {
          this.vestUserList = data
        }
        console.log(data, '马甲用户');
      })

    },
    operationEdit(row, index) {
      this.cateId = row.id
      this.showDialog(2)
      this.show = true
      this.title = '修改夺宝商品'

      this.form.category = row.category
      this.form.name = row.name
      this.form.price = row.price
      this.form.vest_user = row.vest_user
      this.form.popular = row.popular
      this.form.start = row.start * 1000
      this.form.end = row.end * 1000
      this.form.status = row.status
      this.fileList = []
      this.fileList.push(row.cover_img)
      this.form.detail_img = row.detail_img
    },
    operationDelete(row, index) {
      DelTreasure(
        this.token,
        2,
        row.id).then(res => {
        if (checkRequest(res, true)) {
          this.show = false
          this.init()
        }
      })
    },
    handleUpload(file) {
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
    handleUpload2(file) {
      let freader = new FileReader();
      freader.readAsDataURL(file);
      let imgBox = document.querySelector('.imgBox')
      if (this.num == 2) {
        this.$message({
          message: '您已修改详情图,将替换之前的详情图!',
          type: 'warning'
        })
      }

      this.fileList2.push(file)
      var img = document.createElement('img')
      freader.onload = function(e) {
        img.setAttribute('src', e.target.result);
        img.setAttribute('width', '100%');
        img.classList.add('superImg');
        imgBox.appendChild(img)
      }
      return false
    },
    closed() {
      if (this.num == 1) {
        let imgBox = document.querySelector('.imgBox')
        let div = document.createElement('div')
        let addExhibition = document.querySelector('.addExhibition')
        div.classList.add('imgBox')
        addExhibition.appendChild(div)
        imgBox.parentNode.removeChild(imgBox)
      } else {
        let imgBox = document.querySelector('.imgBox')
        let div = document.createElement('div')
        let EditExhibition = document.querySelector('.EditExhibition')
        div.classList.add('imgBox')
        EditExhibition.appendChild(div)
        imgBox.parentNode.removeChild(imgBox)
      }
    },
    clearDetail() {
      if (this.fileList2.length) {
        let imgBox = document.querySelector('.imgBox')
        let div = document.createElement('div')
        let addExhibition = document.querySelector('.addExhibition')
        div.classList.add('imgBox')
        addExhibition.appendChild(div)
        imgBox.parentNode.removeChild(imgBox)
        this.fileList2 = []
        this.$message({
          message: '详情图已清空!',
          type: 'success'
        })
      } else {
        this.$message({
          message: '暂无详情图!',
          type: 'warning'
        })
      }

    },
    showDialog(num) {
      this.show = true
      this.num = num
      if (num == 1) {
        this.title = '新建夺宝商品'
      }
      this.$refs['form'].resetFields();
      this.fileList = []
      this.fileList2 = []
    },
    submit() {
      console.log(this.form);
      console.log(this.fileList);
      console.log(this.fileList2);
      console.log(this.num);
      this.loading = true
      this.$refs['form'].validate((valid) => {
        if (valid) {
          let FD = new FormData()

          FD.append('token', this.token)
          FD.append('method', this.num == 1 ? 1 : 3)
          FD.append('name', this.form.name)
          FD.append('category', this.form.category)
          FD.append('price', this.form.price)
          FD.append('vest_user', Number(this.form.vest_user))
          FD.append('popular', this.form.popular)
          FD.append('start', this.form.start / 1000)
          FD.append('end', this.form.end / 1000)
          FD.append('status', this.form.status)
          FD.append('cover_img', this.fileList[0])
          if (this.num == 2) {
            FD.append('id', this.cateId)
          }
          this.fileList2.forEach((item, index) => {
            FD.append('detail_img' + index, item)
          })
          if (this.form.name) {
            if (this.num == 1) { // 新增
              AddTreasure(FD).then(res => {
                if (checkRequest(res, false)) {
                  this.$message({
                    message: '新建商品成功!',
                    type: 'success'
                  })
                  this.$refs['form'].resetFields();
                  this.fileList = []
                  this.fileList2 = []
                  this.init()
                  this.show = false
                } else {
                  this.$message({
                    message: jsonpReturn(res.data).msg,
                    type: 'error'
                  })
                }
                this.loading = false
              })
            } else { // 修改
              EditTreasure(FD).then(res => {
                if (checkRequest(res, false)) {
                  this.$message({
                    message: '修改商品成功!',
                    type: 'success'
                  })
                  this.rowData = checkRequest(res, false)
                  this.$refs['form'].resetFields();
                  this.fileList = []
                  this.fileList2 = []
                  this.init()
                  this.show = false
                } else {
                  this.$message({
                    message: jsonpReturn(res.data).msg,
                    type: 'error'
                  })
                }
                this.loading = false
              })
            }
          } else {
            this.$message({
              message: jsonpReturn(res.data).msg,
              type: 'error'
            })
          }
        } else {
          this.$message({
            message: '请按要求填写表单',
            type: 'warning'
          })
        }
      })
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
.exhibition {
    display: flex;
    justify-content: center;
    /deep/.superImg {
        border: 1px solid #ccc;
        padding: 5px;
        width: 7rem;
        height: 7rem;
        margin: 0 5px;
        border-radius: 5px;
        cursor: zoom-in;
    }
    img {
        cursor: zoom-in;
    }
}
</style>
