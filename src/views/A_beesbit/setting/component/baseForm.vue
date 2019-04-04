<template>
<el-form ref="form" :model="form" :rules="rules" label-position="top" class="demo-ruleForm">
  <el-row type="flex" justify="space-between" :gutter="10">
    <el-col>
      <el-form-item style="width:100%" label="优惠券名称" prop="title">
        <el-input placeholder="请输入优惠券名称" type="text" v-model="form.title" autocomplete="off"></el-input>
      </el-form-item>
    </el-col>
    <el-col>
      <el-form-item style="width:100%" label="开始时间" prop="start">
        <el-date-picker :picker-options="pickerOptions" style="width:100%" v-model="form.start" type="datetime" placeholder="选择开始时间" default-time="12:00:00">
        </el-date-picker>
      </el-form-item>
    </el-col>
    <el-col>
      <el-form-item style="width:100%" label="结束时间" prop="end">
        <el-date-picker :disabled="!form.start" :picker-options="pickerOptions1" style="width:100%" v-model="form.end" type="datetime" placeholder="选择结束时间" default-time="12:00:00">
        </el-date-picker>
      </el-form-item>
    </el-col>
  </el-row>
  <el-form-item style="width:100%" label="优惠券说明" prop="content">
    <el-input placeholder="请输入优惠券说明" type="textarea" v-model="form.content" autocomplete="off"></el-input>
  </el-form-item>
</el-form>
</template>

<script>
export default {
  data() {
    return {
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
      form: { //表单信息
        title: '',
        content: '',
        start: '',
        end: ''
      },
      rules: {
        title: [{
          type: 'string',
          required: true,
          message: '请输入优惠券标题',
          trigger: 'blur'
        }],
        content: [{
          type: 'string',
          required: true,
          message: '请输入优惠券说明',
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
          message: '请输入结束时间',
          trigger: 'blur'
        }]
      },
      valid: false
    }
  },
  watch: {
    form: {
      handler(val) {
        console.log(val);
        if (!val.start) {
          this.form.end = ''
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    clear() {
      this.$refs['form'].resetFields();
    },
    validate() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.valid = true
        } else {
          this.$message({
            message: '请按要求填写表单',
            type: 'warning'
          })
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
