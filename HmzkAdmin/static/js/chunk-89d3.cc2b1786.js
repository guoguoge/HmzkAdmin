(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-89d3"],{"1XvC":function(e,t,a){},agUd:function(e,t,a){"use strict";var r=a("1XvC");a.n(r).a},lAbF:function(e,t,a){"use strict";a.r(t);var r=a("Q2cO"),l=a.n(r),o=a("bS4n"),i=a.n(o),s=a("5axN"),n=a("7Qib"),c=a("8t5x"),m=a("1Fam"),u={data:function(){var e=this;return{rowData:[],column:[{headerName:"商品名",field:"name",cellStyle:{color:"#8D8D8D"}},{headerName:"分类名",field:"cat_name",cellStyle:{color:"#8D8D8D"}},{headerName:"参与价格",field:"price",cellStyle:{color:"#8D8D8D"}},{headerName:"封面图",field:"cat_name",cellStyle:{color:"#8D8D8D"}},{headerName:"详情图",field:"cat_name",cellStyle:{color:"#8D8D8D"}},{headerName:"马甲中奖id",field:"vest_user",cellStyle:{color:"#8D8D8D"},cellRenderer:function(e){return e.data.vest_user||"暂无"},valueGetter:function(e){return e.data.vest_user||"暂无"}},{headerName:"马甲中奖昵称",field:"vest_name",cellStyle:{color:"#8D8D8D"}},{headerName:"人气",field:"popular",cellStyle:{color:"#8D8D8D"}},{headerName:"开始时间",field:"start",cellStyle:{color:"#8D8D8D"},cellRenderer:function(e){return Object(n.b)(e.data.start)},valueGetter:function(e){return Object(n.b)(e.data.start)}},{headerName:"结束时间",field:"end",cellStyle:{color:"#8D8D8D"},cellRenderer:function(e){return Object(n.b)(e.data.end)},valueGetter:function(e){return Object(n.b)(e.data.end)}},{headerName:"运行",field:"status",cellStyle:{color:"#8D8D8D"},cellRenderer:function(e){return 1==e.data.status?"上架":"下架"},valueGetter:function(e){return 1==e.data.status?"上架":"下架"}},{headerName:"操作",field:"",cellRendererFramework:"agentOperationButton",cellStyle:{color:"#8D8D8D"},pinned:"right"}],config:{width:150,sortable:!0,resizable:!0,filter:!0,search:!0},pickerOptions:{disabledDate:function(t){return""!=e.form.end?t.getTime()<Date.now()||t.getTime()<e.form.end:t.getTime()<Date.now()}},pickerOptions1:{disabledDate:function(t){return t.getTime()<e.form.start}},rowContent:{},show:!1,form:{category:"",name:"",price:0,vest_user:"",popular:0,start:"",end:"",status:1,cover_img:"",detail_img:""},rules:{category:[{type:"number",required:!0,message:"请输入商品所属分类",trigger:"blur"}],price:[{type:"number",required:!0,message:"请输入参与价格",trigger:"blur"}],vest_user:[{message:"请输入马甲中奖id",trigger:"blur"}],popular:[{type:"number",message:"基础人气",trigger:"blur"}],start:[{type:"date",required:!0,message:"请输入开始时间",trigger:"blur"}],end:[{type:"date",required:!0,message:"请输入结束时间",trigger:"blur"}]},title:"",cateId:"",categoryList:[],dialogImageUrl:"",dialogVisible:!1,fileList:[],fileList2:[],num:"",vestUserList:[]}},computed:i()({},Object(c.b)(["token"])),components:{AGTable:s.a},methods:{init:function(){var e=this;Object(m.P)(this.token,4).then(function(t){e.rowData=Object(n.a)(t,!1),console.log(e.rowData)}),Object(m.n)(this.token,4).then(function(t){Object(n.a)(t,!1).forEach(function(t){e.categoryList.push({value:t.id,label:t.cat_name})}),e.form.category=e.categoryList[0].value,console.log(Object(n.a)(t,!1)),console.log(l()(e.categoryList[0].value))}),Object(m.cb)(this.token).then(function(t){var a=Object(n.a)(t,!1);a&&(e.vestUserList=a),console.log(a,"马甲用户")})},operationEdit:function(e,t){this.cateId=e.id,this.num=2,this.show=!0,this.title="修改夺宝商品",this.form.category=e.category,this.form.name=e.name,this.form.price=e.price,this.form.vest_user=e.vest_user,this.form.popular=e.popular,this.form.start=1e3*e.start,this.form.end=1e3*e.end,this.form.status=e.status},operationDelete:function(e,t){var a=this;Object(m.F)(this.token,2,e.id).then(function(e){Object(n.a)(e,!0)&&(a.show=!1,a.init())})},handleUpload:function(e){return console.log(e),this.fileList=[],this.fileList.push(e),!1},handleUpload2:function(e){return console.log(e),this.fileList2.push(e),!1},showDialog:function(e){this.$refs.form.resetFields(),this.fileList=[],this.fileList2=[],this.show=!0,this.num=1,1==e&&(this.title="新建夺宝商品")},submit:function(){var e=this;console.log(this.form),console.log(this.fileList),console.log(this.fileList2),console.log(this.num),this.$refs.form.validate(function(t){if(t){var a=new FormData;a.append("token",e.token),a.append("method",1==e.num?1:3),a.append("name",e.form.name),a.append("category",e.form.category),a.append("price",e.form.price),a.append("vest_user",Number(e.form.vest_user)),a.append("popular",e.form.popular),a.append("start",e.form.start/1e3),a.append("end",e.form.end/1e3),a.append("status",e.form.status),a.append("cover_img",e.fileList[0]),2==e.num&&a.append("id",e.cateId),e.fileList2.forEach(function(e,t){a.append("detail_img"+t,e)}),e.form.name?1==e.num?Object(m.i)(a).then(function(t){Object(n.a)(t,!1)&&(e.$message({message:"新建商品成功!",type:"success"}),e.$refs.form.resetFields(),e.fileList=[],e.fileList2=[],e.init(),e.show=!1)}):Object(m.J)(a).then(function(t){Object(n.a)(t,!1)?(e.$message({message:"修改商品成功!",type:"success"}),e.rowData=Object(n.a)(t,!1),e.$refs.form.resetFields(),e.fileList=[],e.fileList2=[],e.init(),e.show=!1):e.$message({message:Object(n.f)(t).msg,type:"error"})}):e.$message({message:Object(n.f)(res).msg,type:"error"})}else e.$message({message:"请按要求填写表单",type:"warning"})})}},created:function(){this.init()},beforeMount:function(){},mounted:function(){}},p=(a("agUd"),a("ZrdR")),f=Object(p.a)(u,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-container"},[a("el-row",{attrs:{type:"flex",justify:"end"}},[a("el-col",{staticStyle:{"text-align":"right",marginBottom:"1rem"},attrs:{span:4}},[a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.showDialog(1)}}},[a("i",{staticClass:"el-icon-circle-plus"}),e._v(" 新增夺宝商品")])],1)],1),e._v(" "),a("AGTable",{attrs:{rowData:e.rowData,columnDefs:e.column,defaultColDef:e.config},on:{operationDelete:e.operationDelete,operationEdit:e.operationEdit}}),e._v(" "),a("el-dialog",{attrs:{visible:e.show,title:e.title,width:"50%",center:""},on:{"update:visible":function(t){e.show=t}}},[a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-form",{ref:"form",staticClass:"demo-ruleForm",attrs:{"status-icon":"",rules:e.rules,model:e.form,"label-position":"left"}},[a("el-row",{attrs:{type:"flex",justify:"space-between",gutter:20}},[a("el-col",[a("el-form-item",{staticStyle:{width:"100%"},attrs:{label:"商品名称",prop:"name"}},[a("el-input",{attrs:{placeholder:"请输入商品名称",autocomplete:"off"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1)],1),e._v(" "),a("el-col",[a("el-form-item",{staticStyle:{width:"100%"},attrs:{label:"商品分类",prop:"category"}},[a("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"选择商品分类"},model:{value:e.form.category,callback:function(t){e.$set(e.form,"category",t)},expression:"form.category"}},e._l(e.categoryList,function(e,t){return a("el-option",{key:t,attrs:{label:e.label,value:e.value}})}))],1)],1),e._v(" "),a("el-col",[a("el-form-item",{attrs:{label:"参与价格",prop:"price"}},[a("el-input-number",{staticStyle:{width:"100%"},attrs:{min:0,label:"请输入参与价格"},model:{value:e.form.price,callback:function(t){e.$set(e.form,"price",t)},expression:"form.price"}})],1)],1)],1),e._v(" "),a("el-row",{attrs:{type:"flex",justify:"space-between",gutter:20}},[a("el-col",[a("el-form-item",{attrs:{label:"马甲中奖id(非必填)",prop:"vest_user"}},[a("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"马甲中奖人(非必填)"},model:{value:e.form.vest_user,callback:function(t){e.$set(e.form,"vest_user",t)},expression:"form.vest_user"}},e._l(e.vestUserList,function(e,t){return a("el-option",{key:t,attrs:{label:e.name,value:e.id}})}))],1)],1),e._v(" "),a("el-col",[a("el-form-item",{attrs:{label:"基础人气(非必填)",prop:"popular"}},[a("el-input-number",{staticStyle:{width:"100%"},attrs:{min:0,label:"输入基础人气(非必填)"},model:{value:e.form.popular,callback:function(t){e.$set(e.form,"popular",t)},expression:"form.popular"}})],1)],1)],1),e._v(" "),a("el-row",{attrs:{type:"flex",justify:"space-between",gutter:20}},[a("el-col",[a("el-form-item",{staticStyle:{width:"100%"},attrs:{label:"开始时间",prop:"start"}},[a("el-date-picker",{staticStyle:{width:"100%"},attrs:{"value-format":"timestamp",format:"yyyy-MM-ddHH:mm:ss","picker-options":e.pickerOptions,type:"datetime",placeholder:"选择开始时间"},model:{value:e.form.start,callback:function(t){e.$set(e.form,"start",t)},expression:"form.start"}})],1)],1),e._v(" "),a("el-col",[a("el-form-item",{staticStyle:{width:"100%"},attrs:{label:"结束时间(需选择开始时间)",prop:"end"}},[a("el-date-picker",{staticStyle:{width:"100%"},attrs:{"value-format":"timestamp",disabled:!e.form.start,format:"yyyy-MM-ddHH:mm:ss","picker-options":e.pickerOptions1,type:"datetime",placeholder:"选择结束时间"},model:{value:e.form.end,callback:function(t){e.$set(e.form,"end",t)},expression:"form.end"}})],1)],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"",prop:"status"}},[a("div",{},[a("el-switch",{staticStyle:{margin:"1rem 0"},attrs:{"active-value":1,"inactive-value":2,"active-color":"#13ce66","inactive-color":"#ff4949","active-text":"上架","inactive-text":"下架"},model:{value:e.form.status,callback:function(t){e.$set(e.form,"status",t)},expression:"form.status"}})],1)]),e._v(" "),a("el-form-item",{attrs:{label:"",prop:"age"}},[a("el-upload",{staticClass:"upload-demo",attrs:{action:"#",multiple:!1,limit:1,"before-upload":e.handleUpload,"file-list":e.fileList}},[a("el-button",{attrs:{size:"small",type:"primary"}},[e._v("点击上传")]),e._v(" "),a("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[e._v("封面图")])],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"",prop:"age"}},[a("el-upload",{staticClass:"upload-demo",attrs:{action:"#","before-upload":e.handleUpload2,"file-list":e.fileList2}},[a("el-button",{attrs:{size:"small",type:"primary"}},[e._v("点击上传")]),e._v(" "),a("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[e._v("详情图")])],1)],1)],1),e._v(" "),a("el-button",{staticStyle:{width:"100%"},attrs:{size:"large",type:"primary"},on:{click:e.submit}},[e._v("确 定")])],1)]),e._v(" "),a("el-dialog",{attrs:{visible:e.dialogVisible},on:{"update:visible":function(t){e.dialogVisible=t}}},[a("img",{attrs:{width:"100%",src:e.dialogImageUrl,alt:""}})])],1)},[],!1,null,"84025a20",null);f.options.__file="index.vue";t.default=f.exports}}]);