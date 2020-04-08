<template>
  <div id="five">
  <el-tabs v-model="activeName" @tab-click="tab_click">
    <el-tab-pane label="检查项目" name="one">
      <div class="pb-nav">
        <el-button size="mini" type="primary" icon="el-icon-plus" @click="modify(null ,1)">新增</el-button>
        <el-select size="mini" v-model="type_id" filterable placeholder="所属分类" @change="type_change">
          <el-option v-for="value in type_select" :key="value.check_type_id" :label="value.check_type_name" :value="value.check_type_id"></el-option>
        </el-select>
      </div>
      <vxe-table size="mini" align="center" highlight-hover-row border
      :data="tableData"
      :checkbox-config="{reserve: true}"
      :tree-config="{children: 'children'}">
        <vxe-table-column type="checkbox" width="50"></vxe-table-column>
        <vxe-table-column field="check_even_name" title="名称" min-width="400" align="left" tree-node>
          <template v-slot="{row}"><label><img align="top" :src="row.level===0?img_url:img__url" alt="error">{{row.check_even_name}}</label></template>
        </vxe-table-column>
        <vxe-table-column v-for="(value, key) in tableTitle" :key="key" :field="value.key" :title="value.title" :width="value.min_width"></vxe-table-column>
        <vxe-table-column title="操作" width="150">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="modify(scope, 2)">修改</el-button>
            <el-button style="color: red;" size="mini" type="text" @click="del(scope)">删除</el-button>
          </template>
        </vxe-table-column>
      </vxe-table>
      <!-- 弹出框 -->
      <el-dialog title="检查项目操作" :visible.sync="dialog" close-on-click-modal>
        <el-select size="mini" style="width: 100%;" v-model="dialog_a" filterable placeholder="所属分类" @change="dialog_a_change">
          <el-option v-for="value in type_select" :key="value.check_type_id" :label="value.check_type_name" :value="value.check_type_id"></el-option>
        </el-select>
        <el-select size="mini" style="width: 100%;" v-model="dialog_b" clearable filterable placeholder="上级分类" @change="dialog_b_change">
          <el-option v-for="value in dialog_b_select" :key="value.id" :label="value.check_even_name" :value="value.id"></el-option>
        </el-select>
        <el-input size="mini" v-model="dialog_c"><label slot="prepend">名称</label></el-input>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialog=false">取 消</el-button>
          <el-button type="primary" @click="dialog_enter()">确 定</el-button>
        </div>
      </el-dialog>
    </el-tab-pane>

    <el-tab-pane label="检查类型" name="two">
      <el-button size="mini" type="primary" icon="el-icon-plus" @click="modify1(null, 1)">新增</el-button>
      <mytable :tableTitle="tableTitle1" :tableData="tableData1" :number="number" :paging="paging" @modify="modify1" @del="del1"></mytable>
    </el-tab-pane>
    <!-- 弹出框 -->
    <el-dialog title="检查类型操作" :visible.sync="dialog1" close-on-click-modal>
      <el-input size="mini" v-model="dialog1_a"><label slot="prepend">名称</label></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog1=false">取 消</el-button>
        <el-button type="primary" @click="dialog1_enter()">确 定</el-button>
      </div>
    </el-dialog>
  </el-tabs>
  </div>
</template>

<script>
import mytable from "./../../mytable.vue"
export default{
  name: "five",
  components:{
    mytable
  },
  data(){
    return{
      activeName: "one",
      img_url: require("./../../../assets/img/setup_folder.png"),
      img__url: require("./../../../assets/img/setup_file.png"),
      tableTitle: [
        {key: "create_time", title: "创建时间", min_width: "200"},
      ],
      tableData: [],
      tableTitle1: [
        {key: "check_type_name", title: "类型名称", min_width: "400"},
        {key: "create_time", title: "创建时间", min_width: "200"},
      ],
      tableData1: [],
      number: false,
      paging: false,
      dialog: false,
      dialog1: false,
      //数据
      add_type: "",
      type_id: "",
      type_select: [],
      dialog_id: "",
      dialog_a: "",
      dialog_b: "",
      dialog_b_select: [],
      dialog_c: "",
      dialog1_id: "",
      dialog1_a: ""
    }
  },
  methods:{
    tab_click(){
      if(this.activeName === "one"){
        this.init();
      }
      else if(this.activeName === "two"){
        this.init1();
      }
    },
    type_change(s){
      this.type_id = s;
      this.$api.HttpPost("/StoreAdmin/Repair/getRepairCheckEventList", {check_type_id: this.type_id})
      .then((data)=>{
        this.tableData = data.data.data;
      })
    },
    dialog_a_change(s){
      this.dialog_a = s;
      this.$api.HttpPost("/StoreAdmin/Repair/getRepairCheckEventSelect", {check_type_id: this.dialog_a})
      .then((data)=>{
        this.dialog_b_select = data.data.data;
        this.dialog_b = "";
      })
    },
    dialog_b_change(s){
      this.dialog_b = s;
    },
    modify(row, key){
      this.dialog = true;
      this.add_type = key;
      this.dialog_id = "";
      this.dialog_a = "";
      this.dialog_b = "";
      this.dialog_c = "";
      if(key == 2){
        this.dialog_id = row.row.id;
        this.dialog_a = row.row.check_type_id;
        this.dialog_b = row.row.pid;
        this.dialog_c = row.row.check_even_name;
        if(this.dialog_b == 0){
          this.dialog_b = "顶级分类";
        }
        this.$api.HttpPost("/StoreAdmin/Repair/getRepairCheckEventSelect", {check_type_id: this.dialog_a})
        .then((data)=>{
          this.dialog_b_select = data.data.data;
        })
      }
    },
    del(row){
      this.$confirm("确认要执行操作吗?", "提示", {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(() => {
        this.$api.HttpPost("/StoreAdmin/Repair/delRepairCheckEvent", {id: row.row.id})
        .then((data)=>{
          if(data.data.code === 200){
            this.type_change(this.type_id);
            this.$message.success(data.data.msg);
            this.dialog = false;
          }
          else{
            this.$message.error(data.data.msg);
          }
        })
      })
      .catch(() => {
        this.$message.info("已取消操作");
      });
    },
    dialog_enter(){
      this.$api.HttpPost("/StoreAdmin/Repair/addOrUpdateRepairCheckEvent",
      {add_type: this.add_type,
      id: this.dialog_id,
      check_type_id: this.dialog_a,
      pid: this.dialog_b,
      check_even_name: this.dialog_c})
      .then((data)=>{
        if(data.data.code === 200){
          this.type_change(this.type_id);
          this.$message.success(data.data.msg);
          this.dialog = false;
        }
        else{
          this.$message.error(data.data.msg);
        }
      })
    },
    modify1(row, key){
      this.dialog1 = true;
      this.add_type = key;
      this.dialog1_id = "";
      this.dialog1_a = "";
      if(key === 2){
        this.dialog1_id = row.row.id;
        this.dialog1_a = row.row.check_type_name;
      }
    },
    del1(row){
      this.$confirm("确认要执行操作吗?", "提示", {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(() => {
        this.$api.HttpPost("/StoreAdmin/Repair/delRepairCheckType", {id: row.row.id})
        .then((data)=>{
          if(data.data.code === 200){
            this.init1();
            this.$message.success(data.data.msg);
            this.dialog1 = false;
          }
          else{
            this.$message.error(data.data.msg);
          }
        })
      })
      .catch(() => {
        this.$message.info("已取消操作");
      });
    },
    dialog1_enter(){
      this.$api.HttpPost("/StoreAdmin/Repair/addOrUpdateRepairCheckType",
      {add_type: this.add_type,
      id: this.dialog1_id,
      check_type_name: this.dialog1_a})
      .then((data)=>{
        if(data.data.code === 200){
          this.init1();
          this.$message.success(data.data.msg);
          this.dialog1 = false;
        }
        else{
          this.$message.error(data.data.msg);
        }
      })
    },
    init(){
      this.$api.HttpPost("/StoreAdmin/Repair/getRepairCheckTypeSelect", {})
      .then((data)=>{
        this.type_select = data.data.data;
        this.type_change(this.type_select[0].check_type_id);
      })
    },
    init1(){
      this.$api.HttpPost("/StoreAdmin/Repair/getRepairCheckTypeList", {})
      .then((data)=>{
        this.tableData1 = data.data.data;
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
</style>
