<template>
<div class="app-container">
  <el-row type="flex" justify="end" style="marginBottom:1rem">
    <el-button type="primary" @click="showDialog(1)"><i class="el-icon-circle-plus"></i> 新增竞拍商品</el-button>
    <el-button type="primary" @click="visible = true">修改退款比例 当前 {{refund}} %</el-button>
  </el-row>
  <AGTable :rowData="rowData" :columnDefs="column" :defaultColDef="config" @operationDelete="operationDelete" @operationEdit="operationEdit"></AGTable>

  <el-dialog title="修改竞拍款退还比例" :visible.sync="visible" center width="20%">
    <el-input-number style="width:100%"  v-model="refund" :precision="0" :min="1" :max="99" label="请输入退还比例(1-100)" clearable></el-input-number>
    <el-button style="marginTop:1rem;width:100%" type="primary" @click.native="serRefund">确定</el-button>
  </el-dialog>


  <el-dialog :visible.sync="show" :title="title" width="70%" center>
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
            <el-form-item label="起拍价格" prop="bottom_price">
              <el-input-number style="width:100%" v-model.number="form.bottom_price" :min="1" label="起拍价格"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="单次加价价格" prop="raise_price">
              <el-input-number style="width:100%" v-model.number="form.raise_price" :min="1" label="单次加价价格"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" justify="space-between" :gutter="20">
          <el-col>
            <el-form-item label="马甲中奖id(非必填)" prop="vest_user">
              <el-select style="width:100%" v-model="form.vest_user" placeholder="马甲中奖人(非必填)">
                <el-option v-for="(item,index) in vestUserList" :key="index" :label="item.name" :value="String(item.id)" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="马甲号竞拍价格(非必填)" prop="vest_price">
              <el-input placeholder="马甲号竞拍价格(非必填)" v-model="form.vest_price"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="基础人气" prop="hot">
              <el-input-number style="width:100%" v-model="form.hot" :min="1" label="输入基础人气(非必填)"></el-input-number>
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

        <el-form-item>
          <el-upload class="upload-demo" action="#" :multiple="false" :limit="1" :before-upload="handleUpload" :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">封面图</div>
          </el-upload>
        </el-form-item>

        <el-form-item>
          <el-upload class="upload-demo" action="#" :before-upload="handleUpload2" :file-list="fileList2">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">详情图</div>
          </el-upload>
        </el-form-item>


      </el-form>
      <el-button size="large" style="width:100%;" type="primary" @click="submit">确 定</el-button>
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
  ACate,
  AddAuction,
  EditAuction,
  DelCategory,
  ListTreasure,
  DelTreasure,
  VestUser,
  AuctionList,
  ChangeAuction,
  SetRefund,
  Refund
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
          field: 'cate_name',
          cellStyle: {
            color: '#8D8D8D'
          }
        },
        {
          headerName: '分类id',
          field: 'cate_id',
          cellStyle: {
            color: '#8D8D8D'
          }
        },
        {
          headerName: '开始时间',
          field: 'start',
          cellStyle: {
            color: '#8D8D8D'
          }
        },
        {
          headerName: '结束时间',
          field: 'end',
          cellStyle: {
            color: '#8D8D8D'
          }
        },
        {
          headerName: '人气',
          field: 'hot',
          cellStyle: {
            color: '#8D8D8D'
          }
        },
        {
          headerName: '马甲号ID',
          field: 'vest_user',
          cellStyle: {
            color: '#8D8D8D'
          }
        },
        {
          headerName: '马甲号的出价',
          field: 'vest_price',
          cellStyle: {
            color: '#8D8D8D'
          }
        },
        {
          headerName: '起拍价',
          field: 'bottom_price',
          cellStyle: {
            color: '#8D8D8D'
          }
        },
        {
          headerName: '加价',
          field: 'raise_price',
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
          field: 'hot',
          cellStyle: {
            color: '#8D8D8D'
          }
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
          cellRendererFramework: 'actionOperationButton',
          cellStyle: {
            color: '#8D8D8D'
          },
          pinned: 'right',
          width: 200
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
        name: '', //商品名称
        price: 0,
        vest_user: '',
        vest_price: '', // 	选择马甲号ID则马甲号竞拍价格为必须  且不能低于 初始价格
        bottom_price: 1, // 起拍价
        raise_price: 1, // 加价
        hot: 1,
        start: '', // 开始时间
        end: '', // 结束时间
        status: 1,
        cover_img: '',
        detail_img: ''
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
          required: true,
          message: '请输入参与价格',
          trigger: 'blur'
        }],
        vest_user: [{
          message: '请输入马甲号',
          trigger: 'blur'
        }],
        vest_price: [{
          type: 'string',
          message: '请输入马甲号竞拍价格',
          trigger: 'blur'
        }],
        raise_price: [{
          required: true,
          type: 'number',
          message: '请输入单次加价',
          trigger: 'blur'
        }],
        bottom_price: [{
          required: true,
          type: 'number',
          message: '请输入起拍价格',
          trigger: 'blur'
        }],
        hot: [{
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
      visible: false, // 控制比例返还
      refund: '',

    }
  },
  computed: {
    ...mapGetters([
      'token'
    ])
  },
  components: {
    AGTable
  },
  methods: {
    init() {
      AuctionList(this.token, 4).then(res => {
        this.rowData = checkRequest(res, false)
        console.log(this.rowData);
      })
      ACate(this.token, 4).then(res => {
        let data = checkRequest(res, false)
        data.forEach((item) => {
          this.categoryList.push({
            value: item.cate_id,
            label: item.cat_name
          })
        })
        this.form.category = this.categoryList[0].value
        console.log(checkRequest(res, false));
      })
      VestUser(this.token).then(res => {
        let data = checkRequest(res, false)
        if (data) {
          this.vestUserList = data
        }
        console.log(data, '马甲用户');
      })
      Refund(this.token).then(res => {
        let data = checkRequest(res, false)
        if (data) {
          this.refund = data.refund
        }
        console.log(this.refund);
      })

    },
    operationEdit(row, index) {
      console.log(row, 'row');
      console.log(Date.parse(new Date(row.end)), "时间");
      this.cateId = row.id
      this.num = 2
      this.show = true
      this.title = '修改竞拍商品'


      this.form.category = row.cate_id
      this.form.name = row.name
      this.form.price = row.price
      this.form.vest_user = row.vest_user
      this.form.hot = row.hot
      this.form.start = Date.parse(new Date(row.start))
      this.form.end = Date.parse(new Date(row.end))
      this.form.status = row.status
    },
    operationDelete(row, index) {

      let FD = new FormData()

      FD.append('token', this.token)
      FD.append('method', 2)
      FD.append('id', row.id)
      FD.append('status', row.status == 1 ? 2 : 1)
      ChangeAuction(FD).then(res => {
        if (checkRequest(res, true)) {
          this.show = false
          this.init()
        }
      })
    },
    // upload(file) {
    //   console.log(file);
    //   this.img = file
    //   let img = this.$refs.img
    //   let freader = new FileReader();
    //   freader.readAsDataURL(file);
    //   freader.onload = function(e) {
    //     img.setAttribute('src', e.target.result);
    //   }
    // },
    handleUpload(file) {
      console.log(file);
      this.fileList = []
      this.fileList.push(file)
      return false
    },
    handleUpload2(file) {
      console.log(file);
      this.fileList2.push(file)
      return false
    },
    showDialog(num) {
      this.$refs['form'].resetFields();
      this.fileList = []
      this.fileList2 = []
      this.show = true
      this.num = 1
      if (num == 1) {
        this.title = '新建竞拍商品'
      }
    },
    submit() {
      console.log(this.form);
      console.log(this.fileList);
      console.log(this.fileList2);
      console.log(this.num);
      this.$refs['form'].validate((valid) => {
        if (valid) {
          let FD = new FormData()

          FD.append('token', this.token)
          FD.append('method', this.num == 1 ? 1 : 3)
          FD.append('name', this.form.name)
          FD.append('cate_id', this.form.category)
          FD.append('bottom_price', this.form.bottom_price)
          FD.append('raise_price', this.form.raise_price)
          FD.append('vest_user', this.form.vest_user)
          FD.append('vest_price', this.form.vest_price)
          FD.append('hot', this.form.hot)
          FD.append('start', this.form.start / 1000)
          FD.append('end', this.form.end / 1000)
          FD.append('status', this.form.status)
          if (this.fileList[0]) {
            FD.append('cover_img', this.fileList[0])
          }
          if (this.num == 2) {
            FD.append('id', this.cateId)
          }
          if (this.fileList2.length) {
            this.fileList2.forEach((item, index) => {
              FD.append('detail_img[]', item || '')
            })
          }
          if (this.form.name) {
            if (this.num == 1) { // 新增
              AddAuction(FD).then(res => {
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
              })
            } else { // 修改
              EditAuction(FD).then(res => {
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
    },
    serRefund() { // 设置返还比例
      SetRefund(this.token, this.refund).then(res => {
        if (checkRequest(res, true)) {
          this.visible = false
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
</style>
