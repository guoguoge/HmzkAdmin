(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-02dd"],{"7zPP":function(e,t,o){},W3mI:function(e,t,o){"use strict";var i=o("7zPP");o.n(i).a},jCNM:function(e,t,o){"use strict";o.r(t);var i=o("bS4n"),n=o.n(i),s=o("7Qib"),l=o("8t5x"),a=o("1Fam"),r=o("5axN"),c={data:function(){return{dialogTitle:"添加管理员",rowData:[],column:[{headerName:"管理员账号",field:"username",cellStyle:{color:"#8D8D8D"}},{headerName:"权限",field:"permission",cellStyle:{color:"#8D8D8D"},cellRenderer:function(e){var t=e.data;return 1==t.permission?"超级管理员":2==t.permission?"出纳管理员":3==t.permission?"会计管理员":"普通管理员"},valueGetter:function(e){var t=e.data;return 1==t.permission?"超级管理员":2==t.permission?"出纳管理员":3==t.permission?"会计管理员":"普通管理员"}},{headerName:"操作",field:"",cellRendererFramework:"serviceButton",cellStyle:{color:"#8D8D8D"},pinned:"right"}],config:{sortable:!0,resizable:!0,filter:!0,search:!0},rowContent:{},show:!1,form:{username:"",password:"",permission:""},permissionList:[{label:"超级管理员",value:1},{label:"出纳管理员",value:2},{label:"会计管理员",value:3},{label:"普通管理员",value:4}]}},computed:n()({},Object(l.b)(["token","roles"])),components:{AGTable:r.a},methods:{init:function(){var e=this;Object(a.AdminList)(this.token).then(function(t){e.rowData=Object(s.a)(t,!1),console.log(e.rowData)})},operationEdit:function(e,t){this.dialogTitle="修改管理员权限",this.show=!0,this.rowContent=e,console.log(e,t)},operationDelete:function(e,t){var o=this;Object(a.DelAdmin)(this.token,e.id).then(function(e){Object(s.a)(e,!0),o.show=!1,o.init()})},addAdmin:function(){this.dialogTitle="添加管理员",this.show=!0},submit:function(){var e=this;Object(a.AddAdmin)(this.token,this.form.username,this.form.password,this.form.permission).then(function(t){Object(s.a)(t,!0),e.show=!1,e.init()})}},created:function(){this.init(),console.log(this.roles)},beforeMount:function(){},mounted:function(){}},u=(o("W3mI"),o("ZrdR")),m=Object(u.a)(c,function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"app-container"},[o("AGTable",{attrs:{rowData:e.rowData,columnDefs:e.column,defaultColDef:e.config},on:{operationDelete:e.operationDelete,operationEdit:e.operationEdit},scopedSlots:e._u([{key:"notice",fn:function(t){return[o("el-button",{staticClass:"beesbit-sec-btn",nativeOn:{click:function(t){return e.addAdmin(t)}}},[e._v("添加管理员")])]}}])}),e._v(" "),o("el-dialog",{attrs:{visible:e.show,title:e.dialogTitle,width:"25%",center:""},on:{"update:visible":function(t){e.show=t}}},[o("el-form",{ref:"form",staticClass:"demo-ruleForm",attrs:{"status-icon":"","label-position":"top"}},[o("el-row",{attrs:{type:"flex",justify:"space-between",gutter:20}},[o("el-col",[o("el-form-item",{staticStyle:{width:"100%"},attrs:{label:"管理员账号",prop:"pass"}},[o("el-input",{attrs:{placeholder:"请输入管理账号",autocomplete:"off"},model:{value:e.form.username,callback:function(t){e.$set(e.form,"username",t)},expression:"form.username"}})],1)],1),e._v(" "),o("el-col",[o("el-form-item",{staticStyle:{width:"100%"},attrs:{label:"管理员密码",prop:"checkPass"}},[o("el-input",{attrs:{placeholder:"请输入管理密码",autocomplete:"off"},model:{value:e.form.password,callback:function(t){e.$set(e.form,"password",t)},expression:"form.password"}})],1)],1)],1),e._v(" "),o("el-form-item",{attrs:{label:"管理员角色",prop:"age"}},[o("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"管理员权限"},model:{value:e.form.permission,callback:function(t){e.$set(e.form,"permission",t)},expression:"form.permission"}},e._l(e.permissionList,function(e,t){return o("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1)],1),e._v(" "),o("el-button",{staticClass:"beesbit-btn",staticStyle:{width:"100%"},attrs:{size:"large"},on:{click:e.submit}},[e._v("确 定")])],1)],1)},[],!1,null,"fdf3c9de",null);m.options.__file="limit.vue";t.default=m.exports}}]);