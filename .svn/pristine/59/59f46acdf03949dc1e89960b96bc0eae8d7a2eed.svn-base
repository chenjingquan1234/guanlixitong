<template>
  <div id="two">
    <!-- 操作功能 -->
    <div class="row" style="padding-bottom: 10px; width: 100%; box-shadow: 5px 5px 20px #dcdfe6">
    	<el-tooltip content="添加角色"><el-button size="mini" type="primary" icon="el-icon-plus" @click="modify(null, 1)"></el-button></el-tooltip>
    	<el-select size="mini" v-model="store_name" placeholder="所属门店" @change="store_change">
        <el-option v-for="value in store_select" :key="value.sid" :label="value.store_name" :value="value.sid"></el-option>
    	</el-select>
    	<el-button size="mini" type="primary" @click="search()">查询</el-button>
    </div>
    <!-- left table -->
    <mytable class="left" :tableData="tableData" :tableTitle="tableTitle" :check_box="check_box" :number="number" :paging="paging" @modify="modify" @del="del" @cell_click="cell_click"></mytable>
    <!-- right checkbox -->
    <div class="right">
      <center><el-checkbox v-model="title" @change="checkall_change">全选</el-checkbox></center><hr>
      <div v-for="value in setCheckContent" :key="value.id">
        <el-checkbox-group v-model="checkList" @change="check_change">
          <el-checkbox :label="value.id">{{value.auth_name}}</el-checkbox><br>
          <el-checkbox v-for="value_ in value.levelTwoAuth" :key="value_.id" :label="value_.id">{{value_.auth_name}}</el-checkbox><hr>
        </el-checkbox-group>
      </div>
      <center><el-button size="mini" type="primary" @click="enter()">确认</el-button></center>
    </div>
    <!-- 弹出框 -->
    <el-dialog width="40%" title="添加角色" :visible.sync="dialog">
      <el-input size="mini" v-model="dialog_a"><label slot="prepend">角色名称</label></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog=false">取 消</el-button>
        <el-button type="primary" @click="dialog_enter()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import mytable from "./../../mytable.vue"

export default{
  name: "two",
  components:{
    mytable
  },
  data(){
    return{
      tableTitle: [
        {key: "role_name", title: "角色名称", min_width: "200"},
      ],
      tableData: [],
      number: false,
      paging: false,
      check_box: false,
      dialog: false,
      //数据
      store_name: JSON.parse(localStorage.date).data.sid,
      store_id: JSON.parse(localStorage.date).data.sid,
      title: [],
      setCheckContent: JSON.parse(localStorage.date).data.auth,
      checkList: [],
      add_type: "",
      dialog_id: "",
      dialog_a: ""
    }
  },
  props:{
    "store_select": {
      type: Array,
      default: ()=>{}
    }
  },
  search: function(){
    this.init_left();
  },
  methods:{
    store_change: function(s){
      this.store_id = s;
    },
    checkall_change: function(s){
      if(s){
        let data = [];
        for(let i in this.setCheckContent){
          data.splice(0, 0, this.setCheckContent[i].id);
          for(let j in this.setCheckContent[i].levelTwoAuth){
            data.splice(0, 0, this.setCheckContent[i].levelTwoAuth[j].id);
          }
        }
        this.checkList = data;
      }
      else{
        this.checkList = [];
      }
    },
    check_change: function(s){
      this.checkList = s;
    },
    modify: function(row, key){
      this.dialog = true;
      this.add_type = key;
      this.dialog_id = "";
      if(key == 2){
        this.dialog_id = row.row.id;
        this.dialog_a = row.row.role_name
      }
    },
    del: function(row){
      this.$axios.post(this.$store.state.domainName_http+"/StoreAdmin/User/delRole", {id: row.row.id}, {withCredentials: true})
      .then((data)=>{
        if(data.data.code === 200){
          this.init_left();
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
    init_left: function(){
      this.$axios.post(this.$store.state.domainName_http+"/StoreAdmin/User/getRoleList", {sid: this.store_id}, {withCredentials: true})
      .then((data)=>{
        this.tableData = data.data.data;
      })
      .catch((data)=>{
        this.$message.error("抱歉网络错误,请检查网络后重试！");
      })
    },
    cell_click: function(row){
      this.id = row.row.id;
      this.$axios.post(this.$store.state.domainName_http+"/StoreAdmin/User/getAuthListByRole", {id: this.id}, {withCredentials: true})
      .then((data)=>{
        this.checkList = data.data.data;
      })
      .catch((data)=>{
        this.$message.error("抱歉网络错误,请检查网络后重试！");
      })
    },
    enter: function(){
      this.$axios.post(this.$store.state.domainName_http+"/StoreAdmin/User/updateAuth", {id: this.id, role_auth: this.checkList}, {withCredentials: true})
      .then((data)=>{
        if(data.data.code === 200){
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
    dialog_enter: function(){
      this.$axios.post(this.$store.state.domainName_http+"/StoreAdmin/User/roleEdit", {add_type: this.add_type, id: this.dialog_id, role_name: this.dialog_a}, {withCredentials: true})
      .then((data)=>{
        if(data.data.code === 200){
          this.init_left();
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
    }
  },
  mounted(){
    this.init_left();
  }
}
</script>

<style scoped>
#two{
  margin: 1rem 5rem;
}
.left{
  float: left;
  width: 33%;
}
.right{
  float: right;
  width: 65%;
}
hr{
  margin-top: 10px;
  color: #c0c0c0;
}
.el-checkbox{
  margin-top: 10px;
}
</style>
