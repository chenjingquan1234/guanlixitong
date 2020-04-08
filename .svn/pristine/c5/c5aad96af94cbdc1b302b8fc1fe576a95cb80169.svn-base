<template>
  <div id="one">
    <div class="pb-nav">
      <el-button size="mini" type="primary" icon="el-icon-plus" @click="modify(null, 1)">新增</el-button>
    </div>
    <mytable :tableTitle="tableTitle" :tableData="tableData" :number="number" :paging="paging" @modify="modify" @del="del"></mytable>
    <!-- 弹出框 -->
    <el-dialog title="维修类别操作" :visible.sync="dialog" close-on-click-modal>
      <el-input size="mini" v-model="dialog_a"><label slot="prepend">名称&#12288&#12288</label></el-input>
      <el-input size="mini" disabled><label slot="prepend">设置默认</label><label slot="append"><el-checkbox v-model="dialog_b">默认</el-checkbox></label></el-input>
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
  name: "one",
  components:{
    mytable
  },
  data(){
    return{
      img_url: require("./../../../assets/img/setup_folder.png"),
      img__url: require("./../../../assets/img/setup_file.png"),
      tableTitle: [
        {key: "category_name", title: "名称", min_width: "400"},
        {key: "is_defalut", title: "默认", min_width: "200"},
        {key: "create_time", title: "创建时间", min_width: "200"}
      ],
      tableData: [],
      number: false,
      paging: false,
      dialog: false,
      //数据
      add_type: "",
      dialog_id: "",
      dialog_a: "",
      dialog_b: false,
      dialog_b_id: ""
    }
  },
  methods:{
    dialog_d_change(s){
      this.dialog_d_id = s;
    },
    modify(row, key){
      this.dialog = true;
      this.add_type = key;
      this.dialog_id = "";
      this.dialog_a = "";
      this.dialog_b = false;
      if(key === 2){
        if(row.row.is_defalut == 0){this.dialog_b = false}
        else if(row.row.is_defalut == 1){this.dialog_b = true}
        this.dialog_id = row.row.id;
        this.dialog_a = row.row.category_name;
        this.dialog_b_id = row.row.is_defalut;
      }
    },
    del(row){
      this.$api.HttpPost("/StoreAdmin/Repair/delRepairCategory", {id: row.row.id})
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
      this.$api.HttpPost("/StoreAdmin/Repair/addOrUpdateRepairCategory",
      {add_type: this.add_type,
      id: this.dialog_id,
      category_name: this.dialog_a,
      is_defalut: this.dialog_b_id,})
      .then((data)=>{
        if(data.data.code === 200){
          this.init();
          this.getSelect();
          this.$message.success(data.data.msg);
          this.dialog = false;
        }
        else{
          this.$message.error(data.data.msg);
        }
      })
    },
    init(){
      this.$api.HttpPost("/StoreAdmin/Repair/getRepairCategoryList", {})
      .then((data)=>{
        this.tableData = data.data.data;
        for(let i in this.tableData){
          if(this.tableData[i].is_defalut == 1){this.tableData[i].is_defalut = "是"}
          else if(this.tableData[i].is_defalut == 0){this.tableData[i].is_defalut = "否"}
          for(let j in this.tableData[i].children){
            if(this.tableData[i].children[j].is_defalut == 1){this.tableData[i].children[j].is_defalut = "是"}
            else if(this.tableData[i].children[j].is_defalut == 0){this.tableData[i].children[j].is_defalut = "否"}
          }
        }
      })
    },
    getSelect(){
      this.$api.HttpPost("/StoreAdmin/Repair/getAccountTypeSelect", {})
      .then((data)=>{
        this.dialog_d_select = data.data.data;
      })
    }
  }
}
</script>

<style scoped>
img{
  width: 1.5rem;
  height: 1.5rem;
}
.vxe-table{
  overflow: auto;
  height: 600px;
}
</style>
