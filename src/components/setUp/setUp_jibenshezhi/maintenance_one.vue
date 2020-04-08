<template>
  <div id="one">
    <div class="pb-nav">
      <el-button size="mini" type="primary" icon="el-icon-plus" @click="modify(null, 1)">新增</el-button>
    </div>
    <vxe-table size="mini" align="center" highlight-hover-row border
    :data="tableData"
    :checkbox-config="{reserve: true}"
    :tree-config="{children: 'children'}">
      <vxe-table-column field="account_type_name" title="名称" min-width="400" align="left" tree-node>
        <template v-slot="{row}"><label><img align="top" :src="row.level===0?img_url:img__url" alt="error">{{row.account_type_name}}</label></template>
      </vxe-table-column>
      <vxe-table-column v-for="(value, key) in tableTitle" :key="key" :field="value.key" :title="value.title" :min-width="value.min_width"></vxe-table-column>
      <vxe-table-column title="操作" width="150">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="modify(scope, 2)">修改</el-button>
          <el-button style="color: red;" size="mini" type="text" @click="del(scope)">删除</el-button>
        </template>
      </vxe-table-column>
    </vxe-table>
    <!-- 弹出框 -->
    <el-dialog title="账类操作" :visible.sync="dialog" close-on-click-modal>
      <el-input size="mini" v-model="dialog_a"><label slot="prepend">名称&#12288&#12288</label></el-input>
      <el-input size="mini" v-model="dialog_b"><label slot="prepend">项目折扣</label></el-input>
      <el-input size="mini" v-model="dialog_c"><label slot="prepend">配件折扣</label></el-input>
      <el-select size="mini" style="width: 100%;" v-model="dialog_d" clearable filterable placeholder="所属分类" @change="dialog_d_change">
        <el-option v-for="value in dialog_d_select" :key="value.id" :label="value.account_type_name" :value="value.id"></el-option>
      </el-select>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog=false">取 消</el-button>
        <el-button type="primary" @click="dialog_enter()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default{
  name: "one",
  data(){
    return{
      img_url: require("./../../../assets/img/setup_folder.png"),
      img__url: require("./../../../assets/img/setup_file.png"),
      tableTitle: [
        {key: "event_discount", title: "项目折扣", min_width: "200"},
        {key: "accessory_discount", title: "配件折扣", min_width: "200"},
        {key: "create_time", title: "创建时间", min_width: "200"},
        {key: "is_defalut", title: "默认", min_width: "200"}
      ],
      tableData: [],
      dialog: false,
      //数据
      add_type: "",
      dialog_id: "",
      dialog_a: "",
      dialog_b: "",
      dialog_c: "",
      dialog_d: "",
      dialog_d_select: []
    }
  },
  methods:{
    dialog_d_change(s){
      this.dialog_d = s;
    },
    modify(row, key){
      this.dialog = true;
      this.add_type = key;
      this.dialog_id = "";
      this.dialog_a = "";
      this.dialog_b = "";
      this.dialog_c = "";
      this.dialog_d = "";
      if(key === 2){
        this.dialog_id = row.row.id;
        this.dialog_a = row.row.account_type_name;
        this.dialog_b = row.row.event_discount;
        this.dialog_c = row.row.accessory_discount;
        this.dialog_d = row.row.level;
        if(this.dialog_d == 0){
          this.dialog_d = "顶级分类";
        }
      }
    },
    del(row){
      this.$confirm("确认要执行操作吗?", "提示", {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(() => {
        this.$api.HttpPost("/StoreAdmin/Repair/delAccountType", {id: row.row.id})
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
      })
      .catch(() => {
        this.$message.info("已取消操作");
      });
    },
    dialog_enter(){
      this.$api.HttpPost("/StoreAdmin/Repair/addOrUpdateAccountType",
      {add_type: this.add_type,
      id: this.dialog_id,
      account_type_name: this.dialog_a,
      pid: this.dialog_d,
      event_discount: this.dialog_b,
      accessory_discount: this.dialog_c})
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
      this.$api.HttpPost("/StoreAdmin/Repair/getAccountTypeList", {})
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
