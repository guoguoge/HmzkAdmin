(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-0303"],{B8Nq:function(t,e,o){"use strict";var n=o("glbJ"),r=o("fL+G"),i=o("Grqa"),s=o("uARZ"),l=o("Yfch");o("t3Un");var a=o("ZrdR"),c=Object(a.a)({},function(){this.$createElement;this._self._c;return this._m(0)},[function(){var t=this.$createElement,e=this._self._c||t;return e("p",{staticClass:"warn-content"},[this._v("\n  创建和编辑页面是不能被keep-alive 缓存的，因为keep-alive 的include 目前不支持根据路由来缓存，所以目前都是基于component name 来缓存的，如果您想要实现缓存的效果，可以使用localstorage 等浏览器缓存方案。或者不要使用keep-alive\n  的include，直接缓存所有页面。详情见\n  "),e("a",{attrs:{href:"https://panjiachen.github.io/vue-element-admin-site/guide/essentials/tags-view.html",target:"_blank"}},[this._v("文档")])])}],!1,null,null,null);c.options.__file="Warning.vue";var u=c.exports,p={props:{value:{type:Boolean,default:!1}},computed:{comment_disabled:{get:function(){return this.value},set:function(t){this.$emit("input",t)}}}},m=Object(a.a)(p,function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("el-dropdown",{attrs:{"show-timeout":100,trigger:"click"}},[o("el-button",{attrs:{plain:""}},[t._v(t._s(t.comment_disabled?"评论已关闭":"评论已打开")+"\n    "),o("i",{staticClass:"el-icon-caret-bottom el-icon--right"})]),t._v(" "),o("el-dropdown-menu",{staticClass:"no-padding",attrs:{slot:"dropdown"},slot:"dropdown"},[o("el-dropdown-item",[o("el-radio-group",{staticStyle:{padding:"10px"},model:{value:t.comment_disabled,callback:function(e){t.comment_disabled=e},expression:"comment_disabled"}},[o("el-radio",{attrs:{label:!0}},[t._v("关闭评论")]),t._v(" "),o("el-radio",{attrs:{label:!1}},[t._v("打开评论")])],1)],1)],1)],1)},[],!1,null,null,null);m.options.__file="Comment.vue";var d=m.exports,f={props:{value:{required:!0,default:function(){return[]},type:Array}},data:function(){return{platformsOptions:[{key:"a-platform",name:"a-platform"},{key:"b-platform",name:"b-platform"},{key:"c-platform",name:"c-platform"}]}},computed:{platforms:{get:function(){return this.value},set:function(t){this.$emit("input",t)}}}},h=Object(a.a)(f,function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("el-dropdown",{attrs:{"hide-on-click":!1,"show-timeout":100,trigger:"click"}},[o("el-button",{attrs:{plain:""}},[t._v("\n    平台("+t._s(t.platforms.length)+")\n    "),o("i",{staticClass:"el-icon-caret-bottom el-icon--right"})]),t._v(" "),o("el-dropdown-menu",{staticClass:"no-border",attrs:{slot:"dropdown"},slot:"dropdown"},[o("el-checkbox-group",{staticStyle:{padding:"5px 15px"},model:{value:t.platforms,callback:function(e){t.platforms=e},expression:"platforms"}},t._l(t.platformsOptions,function(e){return o("el-checkbox",{key:e.key,attrs:{label:e.key}},[t._v("\n        "+t._s(e.name)+"\n      ")])}))],1)],1)},[],!1,null,null,null);h.options.__file="Platform.vue";var g=h.exports,_={props:{value:{type:String,default:""}},computed:{source_uri:{get:function(){return this.value},set:function(t){this.$emit("input",t)}}}},v=Object(a.a)(_,function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("el-dropdown",{attrs:{"show-timeout":100,trigger:"click"}},[o("el-button",{attrs:{plain:""}},[t._v("\n    外链\n    "),o("i",{staticClass:"el-icon-caret-bottom el-icon--right"})]),t._v(" "),o("el-dropdown-menu",{staticClass:"no-padding no-border",staticStyle:{width:"400px"},attrs:{slot:"dropdown"},slot:"dropdown"},[o("el-form-item",{staticStyle:{"margin-bottom":"0px"},attrs:{"label-width":"0px",prop:"source_uri"}},[o("el-input",{attrs:{placeholder:"请输入内容"},model:{value:t.source_uri,callback:function(e){t.source_uri=e},expression:"source_uri"}},[o("template",{slot:"prepend"},[t._v("填写url")])],2)],1)],1)],1)},[],!1,null,null,null);v.options.__file="SourceUrl.vue";var b=v.exports,w={name:"ArticleDetail",components:{Tinymce:n.a,MDinput:i.a,Upload:r.a,Sticky:s.a,Warning:u,CommentDropdown:d,PlatformDropdown:g,SourceUrlDropdown:b},props:{isEdit:{type:Boolean,default:!1},content:{type:String,default:""},title:{type:String,default:""},type:{type:Number,default:null}},data:function(){var t=this,e=function(e,o,n){""===o?(t.$message({message:e.field+"为必传项",type:"error"}),n(new Error(e.field+"为必传项"))):n()};return{postForm:{title:"",content:""},loading:!1,userListOptions:[],rules:{image_uri:[{validator:e}],title:[{validator:e}],content:[{validator:e}],source_uri:[{validator:function(e,o,n){o?Object(l.e)(o)?n():(t.$message({message:"外链url填写不正确",type:"error"}),n(new Error("外链url填写不正确"))):n()},trigger:"blur"}]},tempRoute:{},oldContent:""}},computed:{contentShortLength:function(){return this.postForm.content_short.length},lang:function(){return this.$store.getters.language}},watch:{content:function(t){this.postForm.content=t,this.oldContent=t,console.log(t),console.log(this.postForm.content)},title:function(t){this.postForm.title=t,console.log("title")},type:function(t){this.type=t}},created:function(){},methods:{submitForm:function(){var t=this,e=this.postForm.content==this.oldContent;console.log(e),this.postForm.display_time=parseInt(this.display_time/1e3),e?this.$message({message:"未做任何修改!",type:"error"}):this.$refs.postForm.validate(function(e){if(!e)return console.log("error submit!!"),!1;console.log(t.postForm.content.trim()),t.postForm.content.trim()?(t.loading=!0,t.$emit("publish",t.postForm.content,t.postForm.title?t.postForm.title:null),t.postForm.content="",t.postForm.title="",t.loading=!1):t.$message({message:"合同不能为空",type:"error"})})}}},y=(o("QLRP"),Object(a.a)(w,function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"createPost-container"},[o("el-form",{ref:"postForm",staticClass:"form-container",attrs:{model:t.postForm,rules:t.rules}},[o("div",{staticClass:"createPost-main-container"},[o("el-row",[o("el-col",{attrs:{span:24}},[1!=t.type?o("el-form-item",{staticStyle:{"margin-bottom":"40px"},attrs:{prop:"title"}},[o("MDinput",{attrs:{maxlength:100,name:"name",required:""},model:{value:t.postForm.title,callback:function(e){t.$set(t.postForm,"title",e)},expression:"postForm.title"}},[t._v("\r\n              标题\r\n            ")])],1):t._e()],1)],1),t._v(" "),o("el-form-item",{staticStyle:{"margin-bottom":"30px"},attrs:{prop:"content"}},[o("Tinymce",{ref:"editor",attrs:{height:400},model:{value:t.postForm.content,callback:function(e){t.$set(t.postForm,"content",e)},expression:"postForm.content"}})],1),t._v(" "),o("el-button",{staticClass:"beesbit-btn",staticStyle:{width:"100%"},attrs:{size:"large"},on:{click:t.submitForm}},[t._v("确 定")])],1)])],1)},[],!1,null,"a7c85172",null));y.options.__file="ArticleDetail.vue";e.a=y.exports},C41B:function(t,e,o){"use strict";o.r(e);var n=o("bS4n"),r=o.n(n),i=o("B8Nq"),s=o("7Qib"),l=o("8t5x"),a=o("1Fam"),c={name:"EditForm",data:function(){return{row:""}},methods:{publish:function(t,e){var o=this;Object(a.NewsEdit)(this.token,this.row.id,e,t).then(function(t){Object(s.a)(t,!0)&&o.$router.push({name:"notice"})})}},computed:r()({},Object(l.b)(["token"])),components:{ArticleDetail:i.a},created:function(){},beforeMount:function(){},mounted:function(){this.row=this.$route.query,console.log(this.content),console.log(this.title)}},u=o("ZrdR"),p=Object(u.a)(c,function(){var t=this.$createElement;return(this._self._c||t)("article-detail",{attrs:{title:this.row.title,content:this.row.content,"is-edit":!1},on:{publish:this.publish}})},[],!1,null,null,null);p.options.__file="edit.vue";e.default=p.exports},MSNs:function(t,e,o){"use strict";o.d(e,"a",function(){return r});var n=o("t3Un");function r(){return Object(n.a)({url:"/qiniu/upload/token",method:"get"})}},QLRP:function(t,e,o){"use strict";var n=o("h3MH");o.n(n).a},Yfch:function(t,e,o){"use strict";o.d(e,"e",function(){return n}),o.d(e,"b",function(){return r}),o.d(e,"d",function(){return i}),o.d(e,"a",function(){return s}),o.d(e,"c",function(){return l});function n(t){return/^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/.test(t)}var r=function(t,e,o){/^[\u4E00-\u9FA5]+$/.test(e)?e.length>8?o(new Error("姓名长度过长")):o():o(new Error("错误的姓名"))},i=function(t,e,o){/^[1][3,4,5,7,8][0-9]{9}$/.test(e)?o():o(new Error("手机号格式错误"))},s=function(t,e,o){e?/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(e)?o():o(new Error("邮箱地址格式错误")):o(new Error("邮箱地址不能为空"))},l=function(t,e,o){e.trim()?/[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im.test(e)||/[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im.test(e)?o(new Error("内容不能包含特殊字符")):o():o(new Error("内容不能为空"))}},h3MH:function(t,e,o){}}]);