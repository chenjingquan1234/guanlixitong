<template>
  <div id="three">
    <div class="pb-nav">
      <el-button size="mini" type="primary" icon="el-icon-plus" @click="modify(null, 1)">添加</el-button>
      <el-select style="margin-left: 10px" size="mini" v-model="store_name" placeholder="所属门店" @change="store_change" clearable>
        <el-option v-for="value in store_select" :key="value.sid" :label="value.store_name" :value="value.sid"></el-option>
      </el-select>
      <el-button size="mini" type="primary" @click="search()">查询</el-button>
    </div>
    <!-- 表格 -->
    <mytable :tableTitle="tableTitle" :tableData="tableData" :number="number"
    @modify="modify" @del="del" @resData="resData" @handlePageChange="handlePageChange" ref="mytable"></mytable>
    <!-- 增加修改框 -->
    <el-dialog title="仓库" :visible.sync="dialog" :close-on-click-modal="false">
      <el-input size="mini" v-model="dialog_a"><label slot="prepend" style="color: red;">名称</label></el-input>
      <el-select style="width: 100%" size="mini" v-model="dialog_b" placeholder="所属仓库" @change="dialog_b_change" clearable>
        <el-option v-for="value in dialog_b_select" :key="value.id" :label="value.repertory_name" :value="value.id"></el-option>
      </el-select>
      <el-select class="effective" style="width: 100%" size="mini" v-model="dialog_c" placeholder="所属门店" @change="dialog_c_change" clearable>
        <el-option v-for="value in dialog_c_select" :key="value.sid" :label="value.store_name" :value="value.sid"></el-option>
      </el-select>
      <el-input size="mini" v-model="dialog_d" type="textarea" placeholder="备注"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialog=false">取 消</el-button>
        <el-button size="mini" type="primary" @click="enter()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import mytable from "./../../mytable.vue"
export default{
  name: "three",
  components:{
    mytable
  },
  data(){
    return{
      //配置
      img_url: require("./../../../assets/img/setup_folder.png"),
      img__url: require("./../../../assets/img/setup_file.png"),
      tableTitle: [
        {key: "repertory_name", title: "名称", min_width: "100", tree: true},
        {key: "creat_time", title: "创建时间", min_width: "100"},
      ],
      tableData: [],
      number: false,
      dialog: false,
      loading: false,
      //数据
      add_type: "",
      id: "",
      store_name: "",
      store_select: [],
      dialog_a: "",
      dialog_b: "",
      dialog_b_select: [],
      dialog_c: "",
      dialog_c_select: [],
      dialog_d: ""
    }
  },
  methods:{
    search(){
      this.$api.HttpPost("/StoreAdmin/Inventory/getRepertoryList", {sid: this.store_name})
      .then((data)=>{
        this.tableData = data.data.data;
      })
    },
    store_change(s){
      this.store_name = s;
    },
    dialog_b_change(s){
      this.dialog_b = s;
    },
    dialog_c_change(s){
      this.dialog_c = s;
    },
    modify(row, key){
      this.dialog = true;
      this.add_type = key;
      this.dialog_b = "";
      this.dialog_c = "";
      this.dialog_a = "";
      this.dialog_d = "";
      if(row != null){
        this.id = row.row.id
        this.$api.HttpPost("/StoreAdmin/Inventory/getRepertoryDetail", {id: row.row.id})
        .then((data)=>{
          this.dialog_a = data.data.data.repertory_name;
          this.dialog_b = data.data.data.pid;
          this.dialog_c = data.data.data.sid;
          this.dialog_d = data.data.data.remark;
        })
      }
    },
    del(row){
      this.loading = true;
      this.$api.HttpPost("/StoreAdmin/Inventory/deleteRepertory", {id: row.row.id})
      .then((data)=>{
        if(data.data.code === 200){
          this.handlePageChange();
          this.loading = false;
          this.$message.success(data.data.msg);
        }
        else{
          this.loading = false;
          this.$message.error(data.data.msg);
        }
      })
      .catch((data)=>{
        this.loading = false;
      })
    },
    enter(){
      this.loading = true;
      if(this.add_type == 1){
        this.$api.HttpPost("/StoreAdmin/Inventory/addOrUpdateRepertory",
        {add_type: this.add_type,
        repertory_name: this.dialog_a,
        pid: this.dialog_b,
        sid: this.dialog_c,
        remark: this.dialog_d})
        .then((data)=>{
          if(data.data.code === 200){
            this.handlePageChange();
            this.loading = false;
            this.$message.success(data.data.msg);
          }
          else{
            this.loading = false;
            this.$message.error(data.data.msg);
          }
        })
        .catch((data)=>{
          this.loading = false;
        })
      }
      else if(this.add_type == 2){
        this.$api.HttpPost("/StoreAdmin/Inventory/addOrUpdateRepertory",
        {add_type: this.add_type,
        id: this.id,
        repertory_name: this.dialog_a,
        pid: this.dialog_b,
        sid: this.dialog_c,
        remark: this.dialog_d})
        .then((data)=>{
          if(data.data.code === 200){
            this.handlePageChange();
            this.loading = false;
            this.$message.success(data.data.msg);
          }
          else{
            this.loading = false;
            this.$message.error(data.data.msg);
          }
        })
        .catch((data)=>{
          this.loading = false;
        })
      }
      this.handlePageChange();
      this.dialog = false;
    },
    resData(data){
      this.tableData = data;
      this.dialog_b_select = data;
    },
    handlePageChange(data){
      if(data === undefined){data ={}}
      this.$refs.mytable.findList(this.$api.yuming + "/StoreAdmin/Inventory/getRepertoryList", {...data, ...{is_tree: true}});
    }
  },
  mounted(){
    this.$api.HttpPost("/StoreAdmin/Common/getStoreSelect", {})
    .then((data)=>{
      this.store_select = data.data;
      this.dialog_c_select = data.data;
    })
    this.handlePageChange();
  }
}
</script>

<style scoped>
#three{
  margin: 1rem 5rem;
}
img{
  width: 1.5rem;
  height: 1.5rem;
}
</style>
