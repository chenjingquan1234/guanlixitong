<template>
  <div id="three">
    <el-button size="mini" type="primary" icon="el-icon-plus" @click="modify(null, 1)">新增</el-button>
    <mytable :tableTitle="tableTitle" :tableData="tableData" :number="number" :paging="paging" @modify="modify" @del="del"></mytable>
    <!-- 弹出框 -->
    <el-dialog title="洗车类型操作" :visible.sync="dialog" close-on-click-modal>
      <el-input size="mini" v-model="dialog_a"><label slot="prepend">名称</label></el-input>
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
  name: "three",
  components:{
    mytable
  },
  data(){
    return{
      tableTitle: [
        {key: "wash_type_name", title: "名称", min_width: "400"},
        {key: "create_time", title: "创建时间", min_width: "200"}
      ],
      tableData: [],
      number: false,
      paging: false,
      dialog: false,
      //数据
      add_type: "",
      dialog_id: "",
      dialog_a: ""
    }
  },
  methods:{
    modify(row, key){
      this.dialog = true;
      this.add_type = key;
      this.dialog_id = "";
      this.dialog_a = "";
      if(key === 2){
        this.dialog_id = row.row.id;
        this.dialog_a = row.row.wash_type_name;
      }
    },
    del(row){
      this.$api.HttpPost("/StoreAdmin/Repair/delRepairWashType", {id: row.row.id})
      .then((data)=>{
        if(data.data.code === 200){
          this.init();
          this.$message.success(data.data.msg);
          this.dialog = false;
        }
        else{
          this.$message.error(data.data.msg);
        }
      })
    },
    dialog_enter(){
      this.$api.HttpPost("/StoreAdmin/Repair/addOrUpdateRepairWashType",
      {add_type: this.add_type,
      id: this.dialog_id,
      wash_type_name: this.dialog_a,}, {withCredentials: true})
      .then((data)=>{
        if(data.data.code === 200){
          this.init();
          this.$message.success(data.data.msg);
          this.dialog = false;
        }
        else{
          this.$message.error(data.data.msg);
        }
      })
    },
    init(){
      this.$api.HttpPost("/StoreAdmin/Repair/getRepairWashTypeList", {})
      .then((data)=>{
        this.tableData = data.data.data;
      })
    }
  }
}
</script>

<style scoped>

</style>
