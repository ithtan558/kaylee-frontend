(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-f897f74e"],{"0feb":function(e,t,s){"use strict";s.d(t,"c",function(){return r}),s.d(t,"a",function(){return i}),s.d(t,"e",function(){return n}),s.d(t,"b",function(){return a}),s.d(t,"d",function(){return c});var o=s("b775");function r(e){return Object(o["a"])({url:"/user/permission",method:"get",params:e})}function i(e,t){return Object(o["a"])({url:"/user/permission/change-status/"+e,method:"put",data:t})}function n(e){return Object(o["a"])({url:"/user/permission/"+e,method:"get"})}function a(e,t){return Object(o["a"])({url:e?"/user/permission/"+t.id:"/user/permission",method:e?"put":"post",data:t})}function c(){return Object(o["a"])({url:"/user/permission/list-common",method:"get"})}},"8a99":function(e,t,s){"use strict";var o=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"createPost-container"},[s("el-form",{ref:"postForm",staticClass:"form-container",attrs:{model:e.postForm,rules:e.rules}},[s("div",{staticClass:"createPost-main-container"},[s("el-row",[s("el-col",{attrs:{span:10}},[s("el-form-item",{attrs:{label:"Email:",prop:"email"}},[s("el-input",{attrs:{size:"small",clearable:"",remote:"",placeholder:"Email"},model:{value:e.postForm.email,callback:function(t){e.$set(e.postForm,"email",t)},expression:"postForm.email"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"Username:",prop:"username"}},[s("el-input",{attrs:{size:"small",clearable:"",remote:"",placeholder:"Username"},model:{value:e.postForm.username,callback:function(t){e.$set(e.postForm,"username",t)},expression:"postForm.username"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"Name:",prop:"name"}},[s("el-input",{attrs:{size:"small",clearable:"",remote:"",placeholder:"Name"},model:{value:e.postForm.name,callback:function(t){e.$set(e.postForm,"name",t)},expression:"postForm.name"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"Password:",prop:"password"}},[s("el-input",{attrs:{type:"password",size:"small",clearable:"",remote:"",placeholder:"Password"},model:{value:e.postForm.password,callback:function(t){e.$set(e.postForm,"password",t)},expression:"postForm.password"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"Confirm password:",prop:"confirm_password"}},[s("el-input",{attrs:{type:"password",size:"small",clearable:"",remote:"",placeholder:"Confirm Password"},model:{value:e.postForm.confirm_password,callback:function(t){e.$set(e.postForm,"confirm_password",t)},expression:"postForm.confirm_password"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"Status:"}},[s("el-switch",{model:{value:e.postForm.is_active,callback:function(t){e.$set(e.postForm,"is_active",t)},expression:"postForm.is_active"}})],1)],1)],1),e._v(" "),s("el-form-item",{staticClass:"margin-bottom-10",attrs:{label:"Role:"}}),e._v(" "),s("el-checkbox-group",{on:{change:e.handleCheckedRolesChange},model:{value:e.roles_checked,callback:function(t){e.roles_checked=t},expression:"roles_checked"}},e._l(e.roles,function(t){return s("el-checkbox",{key:t.id,staticClass:"margin-bottom-10",attrs:{label:t.id}},[e._v(e._s(t.name))])}),1),e._v(" "),s("div",{staticClass:"clearfix"}),e._v(" "),s("el-form-item",{staticClass:"margin-bottom-10",attrs:{label:"Permission:"}}),e._v(" "),s("el-checkbox",{attrs:{indeterminate:e.is_indeterminate},on:{change:e.handleCheckAllChange},model:{value:e.check_all,callback:function(t){e.check_all=t},expression:"check_all"}},[e._v("Check all")]),e._v(" "),s("div",{staticStyle:{margin:"15px 0"}}),e._v(" "),s("el-checkbox-group",{on:{change:e.handleCheckedPermissionsChange},model:{value:e.permissions_checked,callback:function(t){e.permissions_checked=t},expression:"permissions_checked"}},e._l(e.permissions,function(t){return s("el-checkbox",{key:t.id,staticClass:"el-col-5 margin-bottom-10",attrs:{label:t.id}},[e._v(e._s(t.name))])}),1),e._v(" "),s("div",{staticClass:"clearfix"}),e._v(" "),s("br"),e._v(" "),s("el-form-item",{staticClass:"text-center"},[s("el-button",{attrs:{icon:"el-icon-check",size:"mini",type:"primary"},on:{click:e.submitForm}},[e._v("Submit")]),e._v(" "),s("router-link",{attrs:{to:"/user/list"}},[s("el-button",{attrs:{icon:"el-icon-back",size:"mini",type:"info"}},[e._v("Back")])],1)],1)],1)])],1)},r=[],i=(s("ac6a"),s("5176")),n=s.n(i),a=s("c24f"),c=s("0feb"),l=s("cc5e"),u=s("b775");function m(){return Object(u["a"])({url:"/user/role-permission/list-common",method:"get"})}var d={id:void 0,email:null,username:null,name:null,is_active:0},p={name:"UserDetail",props:{isEdit:{type:Boolean,default:!1}},data:function(){var e=this.isEdit?null:[{required:!0}],t=this.isEdit?null:[{required:!0}];return{postForm:n()({},d),roles:[],permissions:[],role_permissions:[],roles_checked:[],permissions_checked:[],check_all:!1,is_indeterminate:!0,loading:!1,rules:{email:[{required:!0},{type:"email"}],username:[{required:!0}],name:[{required:!0}],password:e,confirm_password:t},tempRoute:{}}},computed:{},created:function(){if(this.isEdit){var e=this.$route.params&&this.$route.params.id;this.fetchData(e)}else this.postForm=n()({},d);this.listRole(),this.listPermission(),this.listRolePermission(),this.tempRoute=n()({},this.$route)},methods:{fetchData:function(e){var t=this;Object(a["d"])(e).then(function(e){t.postForm=e.data,e.data.permissions.forEach(function(e){t.permissions_checked.push(e.id)}),e.data.roles.forEach(function(e){t.roles_checked.push(e.id)})}).catch(function(e){console.log(e)})},listRole:function(){var e=this;Object(l["d"])().then(function(t){e.roles=t.data}).catch(function(e){console.log(e)})},listPermission:function(){var e=this;Object(c["d"])().then(function(t){e.permissions=t.data}).catch(function(e){console.log(e)})},listRolePermission:function(){var e=this;m().then(function(t){e.role_permissions=t.data}).catch(function(e){console.log(e)})},submitForm:function(){var e=this;this.$refs.postForm.validate(function(t){if(!t)return console.log("error submit!!"),!1;e.loading=!0,e.postForm.is_active=e.postForm.is_active?1:0,e.postForm.roles=e.roles_checked,e.postForm.permissions=e.permissions_checked,Object(a["b"])(e.isEdit,e.postForm).then(function(t){e.$notify({dangerouslyUseHTMLString:!0,message:t.message,type:"success"}),e.$router.push({path:"/user/list"})}).catch(function(t){t.response&&e.$notify({dangerouslyUseHTMLString:!0,message:t.response.data.message,type:"error"})}).then(function(){e.loading=!1})})},handleCheckAllChange:function(e){var t=this;e?this.permissions.forEach(function(e){t.permissions_checked.push(e.id)}):this.permissions_checked=[],this.is_indeterminate=!1},handleCheckedPermissionsChange:function(e){var t=e.length;this.check_all=t===this.permissions.length,this.is_indeterminate=t>0&&t<this.permissions.length},handleCheckedRolesChange:function(e){var t=this;this.permissions_checked=[],e.forEach(function(e){t.role_permissions.forEach(function(s){e===s.role_id&&t.permissions_checked.push(s.permission_id)})})}}},h=p,f=(s("d1c4"),s("2877")),b=Object(f["a"])(h,o,r,!1,null,"5632ac36",null);t["a"]=b.exports},b4e7:function(e,t,s){},cc5e:function(e,t,s){"use strict";s.d(t,"c",function(){return r}),s.d(t,"a",function(){return i}),s.d(t,"e",function(){return n}),s.d(t,"b",function(){return a}),s.d(t,"d",function(){return c});var o=s("b775");function r(e){return Object(o["a"])({url:"/user/role",method:"get",params:e})}function i(e,t){return Object(o["a"])({url:"/user/role/change-status/"+e,method:"put",data:t})}function n(e){return Object(o["a"])({url:"/user/role/"+e,method:"get"})}function a(e,t){return Object(o["a"])({url:e?"/user/role/"+t.id:"/user/role",method:e?"put":"post",data:t})}function c(){return Object(o["a"])({url:"/user/role/list-common",method:"get"})}},d1c4:function(e,t,s){"use strict";var o=s("b4e7"),r=s.n(o);r.a},d344:function(e,t,s){"use strict";s.r(t);var o=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("user-detail",{attrs:{"is-edit":!0}})},r=[],i=s("8a99"),n={name:"EditForm",components:{UserDetail:i["a"]}},a=n,c=s("2877"),l=Object(c["a"])(a,o,r,!1,null,null,null);t["default"]=l.exports}}]);