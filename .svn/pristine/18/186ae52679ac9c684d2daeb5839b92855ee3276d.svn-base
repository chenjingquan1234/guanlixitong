<template>
	<div id="one">
    <!-- 操作功能 -->
    <div class="pb-nav">
      <el-tooltip content="添加"><el-button size="mini" type="primary" icon="el-icon-plus" @click="modify(null, 1)"></el-button></el-tooltip>
      <el-input style="margin-left: 10px; width: 25rem;" size="mini" placeholder="可输入登录名.员工姓名.手机号码进行搜索" v-model="key_name"><template slot="prepend">关键字</template></el-input>
      <el-select size="mini" v-model="store_name" clearable placeholder="所属门店" @change="store_change">
        <el-option v-for="value in store_select" :key="value.sid" :label="value.store_name" :value="value.sid"></el-option>
      </el-select>
      <el-button size="mini" type="primary" @click="search()">查询</el-button>
    </div>
    <!-- 表格 -->
    <mytable :tableData="tableData" :tableTitle="tableTitle" :number="number" :operation_="operation_" :operation_name="operation_name"
		@modify="modify" @del="del" @operat="operat" @resData="resData" @handlePageChange="handlePageChange" ref="mytable"></mytable>
    <!-- 弹出框 -->
    <el-dialog title="员工资料" :visible.sync="dialog" :close-on-click-modal="false" :close-on-press-escape="false">
      <el-input size="mini" v-model="dialog_a" :disabled="add_type==2?true:false"><label slot="prepend" style="color: red">* </label><label slot="prepend">用户名</label></el-input>
      <el-input size="mini" v-model="dialog_b" type="password" v-if="add_type==2?false:true"><label slot="prepend" style="color: red">* </label><label slot="prepend">密&#12288码</label></el-input>
      <el-select size="mini" style="width: 100%;" v-model="dialog_c" clearable :disabled="add_type==2?true:false" placeholder="所属部门" @change="dialog_c_change">
        <template><label slot="prefix" style="color: red; line-height: 32px;">* </label></template>
        <el-option v-for="value in store_select" :key="value.sid" :label="value.store_name" :value="value.sid"></el-option>
      </el-select>
      <el-select size="mini" style="width: 100%;" v-model="dialog_d" clearable :disabled="add_type==2?true:false" placeholder="关联员工" @change="dialog_d_change">
        <template><label slot="prefix" style="color: red; line-height: 32px;">* </label></template>
        <el-option v-for="value in dialog_d_select" :key="value.id" :label="value.name" :value="value.id"></el-option>
      </el-select>
      <el-select size="mini" style="width: 100%;" v-model="dialog_e" clearable placeholder="关联角色" @change="dialog_e_change">
        <template><label slot="prefix" style="color: red; line-height: 32px;">* </label></template>
        <el-option v-for="value in dialog_e_select" :key="value.id" :label="value.role_name" :value="value.id"></el-option>
      </el-select>
      <el-ipnut>
        <template>
          <el-divider content-position="left">可查看门店</el-divider>
          <el-checkbox-group v-model="dialog_f" @change="dialog_f_change">
          <el-checkbox v-for="value in store_select" :key="value.sid" :label="value.sid">{{value.store_name}}</el-checkbox>
          </el-checkbox-group>
          <el-divider content-position="left">设置移动端权限</el-divider>
          <el-checkbox-group v-model="dialog_g" @change="dialog_g_change">
          <el-checkbox v-for="value in mobile_select" :key="value.id" :label="value.id">{{value.name}}</el-checkbox>
          </el-checkbox-group>
          <el-divider content-position="left">是否显示客户手机号</el-divider>
          <el-radio-group v-model="dialog_h">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
          <el-divider content-position="left">是否显示库存成本</el-divider>
          <el-radio-group v-model="dialog_j">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </template>
      </el-ipnut>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog=false">取 消</el-button>
        <el-button type="primary" @click="dialog_enter()">确 定</el-button>
      </div>
    </el-dialog>

    <Dialog title="密码修改" @enter="enter_pw" ref="dialog_pw">
      <template>
        <el-input size="mini" v-model="dialog_new_pw" type="password"><label slot="prepend">新密码&#12288</label></el-input>
        <el-input size="mini" v-model="dialog_enter_pw" type="password"><label slot="prepend">确认密码</label></el-input>
      </template>
    </Dialog>
	</div>
</template>

<script>
import mytable from "./../../mytable.vue"
import Dialog from "./../../other/Dialog.vue"
export default{
  name: "one",
  components:{
    mytable,
    Dialog
  },
  data(){
    return{
      tableTitle: [
        {key: "username", title: "登录账号", min_width: "100"},
        {key: "name", title: "员工姓名", min_width: "100"},
        {key: "tel", title: "手机号码", min_width: "100"},
        {key: "store_name", title: "所属门店", min_width: "100"},
        {key: "role_name", title: "角色", min_width: "100"},
        {key: "last_ip", title: "最后登录ip", min_width: "100"}
      ],
      tableData: [],
      number: false,
			operation_: true,
			operation_name: "修改密码",
      dialog: false,
      //数据
      key_name: "",
      store_name: JSON.parse(localStorage.date).data.sid,
      store_id: JSON.parse(localStorage.date).data.sid,

      add_type: "",
      dialog_id: "",
      dialog_a: "",
      dialog_b: "",
      dialog_c: "",
      dialog_c_select: [],
      dialog_d: "",
      dialog_d_select: [],
      dialog_e: "",
      dialog_e_select: [],
      dialog_f: [],
      dialog_g: [],
      mobile_select: [],
      dialog_h: '1',
      dialog_j: '1',

      dialog_id_pw: "",
      dialog_new_pw: "",
      dialog_enter_pw: "",
    }
  },
  props:{
    "store_select": {
      type: Array,
      default: ()=>{}
    }
  },
  methods:{
    store_change: function(s){
      this.store_id = s;
    },
    dialog_c_change: function(s){
      this.dialog_c = s;
    },
    dialog_d_change: function(s){
      this.dialog_d = s;
    },
    dialog_e_change: function(s){
      this.dialog_e = s;
    },
    dialog_f_change: function(s){
      this.dialog_f = s;
    },
    dialog_g_change: function(s){
      this.dialog_g = s;
    },
    search: function(){
      this.handlePageChange({search: this.key_name, sid: this.store_id});
    },
    modify: function(scope, key){
      this.add_type = key;
      this.dialog_a = "";
      this.dialog_b = "";
      this.dialog_c = "";
      this.dialog_d = "";
      this.dialog_e = "";
      this.dialog_f = [];
      this.dialog_g = [];
      this.dialog_h = "";
      this.dialog_j = "";
      this.$axios.all([
        this.$axios.post(this.$store.state.domainName_http+"/StoreAdmin/User/getUserByStore", {sid: this.store_id}, {withCredentials: true}),
        this.$axios.post(this.$store.state.domainName_http+"/StoreAdmin/User/getRoleByStore", {sid: this.store_id}, {withCredentials: true}),
      ])
      .then((data)=>{
        this.dialog_d_select = data[0].data.data;
        this.dialog_e_select = data[1].data.data;
      })
      .catch((data)=>{
        this.$message.error("抱歉网络错误,请检查网络后重试！");
      })
      if(key === 2){
        this.$axios.post(this.$store.state.domainName_http+"/StoreAdmin/User/getUserDetail", {id: scope.row.id}, {withCredentials: true})
        .then((data)=>{
          this.dialog_id = data.data.data.id;
          this.dialog_a = data.data.data.username;
          this.dialog_c = data.data.data.sid;
          this.dialog_d = data.data.data.eid;
          this.dialog_e = data.data.data.rid;
          this.dialog_f = data.data.data.view_store;
          this.dialog_g = data.data.data.mobile_auth;
          this.dialog_h = data.data.data.is_tel;
          this.dialog_j = data.data.data.is_cost;
          console.log(this.dialog_j)
        })
        .catch((data)=>{
          this.$message.error("抱歉网络错误,请检查网络后重试！");
        })
      }
      this.dialog = true;
    },
    del: function(scope){
      this.$axios.post(this.$store.state.domainName_http+"/StoreAdmin/User/delUser", {id: scope.row.id}, {withCredentials: true})
      .then((data)=>{
        if(data.data.code === 200){
          this.handlePageChange();
          this.$message.success(data.data.msg);
        }
        else{
          this.$message.error(data.data.msg);
        }
      })
      .catch((data)=>{
        this.$message.error("抱歉网络错误,请检查网络后重试！");
      })
    },
    operat(row){
      this.dialog_id_pw = row.row.id;
      this.$refs.dialog_pw.init();
    },
    dialog_enter: function(){
      this.$axios.post(this.$store.state.domainName_http+"/StoreAdmin/User/userEdit",
      {add_type: this.add_type,
      id: this.dialog_id,
      username: this.dialog_a,
      password: this.dialog_b,
      sid: this.dialog_c,
      eid: this.dialog_d,
      rid: this.dialog_e,
      view_store: this.dialog_f,
      mobile_auth: this.dialog_g,
      is_tel: this.dialog_h,
      is_cost: this.dialog_j}, {withCredentials: true})
      .then((data)=>{
        if(data.data.code === 200){
          this.handlePageChange();
          this.$message.success(data.data.msg);
          this.dialog = false;
        }
        else{
          this.$message.error(data.data.msg);
        }
      })
      .catch((data)=>{
        this.$message.error("抱歉网络错误,请检查网络后重试！");
      })
    },
    enter_pw(){
      this.$api.HttpPost("/storeadmin/User/updatePwd",
      {id: this.dialog_id_pw,
      pwd: this.dialog_new_pw,
      rpwd: this.dialog_enter_pw})
      .then((data)=>{
        if(data.data.code === 200){
          this.$refs.dialog_pw.cancel();
          this.$message.success(data.data.msg);
        }
        else{
          this.$message.error(data.data.msg);
        }
      })
    },
    resData: function(data){
      this.tableData = data;
    },
    handlePageChange: function(data){
      if(data === undefined){data = {}};
      this.$refs.mytable.findList(this.$store.state.domainName_http+"/StoreAdmin/User/getUserList", data);
    }
  },
  mounted(){
    this.$nextTick(()=>{
      this.$api.HttpPost("/storeadmin/user/getMobileAuth", {})
      .then((data)=>{
        this.mobile_select = data.data.data;
      })
    })
    this.handlePageChange();
  }
}
</script>

<style scoped>
#one{
  margin: 1rem 5rem;
}
</style>
