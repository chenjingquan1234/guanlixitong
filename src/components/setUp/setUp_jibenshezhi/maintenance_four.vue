<template>
  <div id="three">
    <el-button size="mini" type="primary" icon="el-icon-plus" @click="modify(null, 1)">新增</el-button>
    <mytable :tableTitle="tableTitle" :tableData="tableData" :number="number" :paging="paging" @modify="modify" @del="del"></mytable>
    <!-- 弹出框 -->
    <el-dialog title="工位操作" :visible.sync="dialog" close-on-click-modal>
      <el-input size="mini" v-model="dialog_a"><label slot="prepend">名称&#8194&#8194&#8194&#8194&#8194&#8194&#8194</label></el-input>
      <el-input size="mini" v-model="dialog_b"><label slot="prepend">工位成本(月)</label></el-input>
      <el-input size="mini" v-model="dialog_c"><label slot="prepend">LED_IP&#8194&#8194&#8194&#8194&#8194</label></el-input>
      <el-input size="mini" v-model="dialog_d"><label slot="prepend">LED_端口号&#160</label></el-input>
      <el-select size="mini" style="width: 100%;" v-model="dialog_e" clearable filterable placeholder="归属班组" @change="dialog_e_change">
        <el-option v-for="value in dialog_e_select" :key="value.id" :label="value.class_name" :value="value.id"></el-option>
      </el-select>
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
        {key: "station_name", title: "工位名称", min_width: "400"},
        {key: "cost", title: "工位成本", min_width: "200"},
        {key: "class_name", title: "归属班组", min_width: "200"},
        {key: "create_time", title: "创建时间", min_width: "200"},
        {key: "store_name", title: "所属门店", min_width: "200"}
      ],
      tableData: [],
      number: false,
      paging: false,
      dialog: false,
      //数据
      add_type: "",
      dialog_id: "",
      dialog_a: "",
      dialog_b: "",
      dialog_c: "",
      dialog_d: "",
      dialog_e: "",
      dialog_e_select: []
    }
  },
  methods:{
    dialog_e_change(s){
      this.dialog_e = s;
    },
    modify(row, key){
      this.dialog = true;
      this.add_type = key;
      this.dialog_id = "";
      this.dialog_a = "";
      this.dialog_b = "";
      this.dialog_c = "";
      this.dialog_d = "";
      this.dialog_e = "";
      if(key === 2){
        this.dialog_id = row.row.id;
        this.dialog_a = row.row.station_name;
        this.dialog_b = row.row.cost;
        this.dialog_c = row.row.LED_IP;
        this.dialog_d = row.row.LED_port;
        this.dialog_e = row.row.class_id;
      }
    },
    del(row){
      this.$api.HttpPost("/StoreAdmin/Repair/delRepairStation", {id: row.row.id})
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
      this.$api.HttpPost("/StoreAdmin/Repair/addOrUpdateRepairStation",
      {add_type: this.add_type,
      id: this.dialog_id,
      station_name: this.dialog_a,
      cost: this.dialog_b,
      LED_IP: this.dialog_c,
      LED_port: this.dialog_d,
      class_id: this.dialog_e})
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
      this.$api.HttpPost("/StoreAdmin/Repair/getRepairStationList", {})
      .then((data)=>{
        this.tableData = data.data.data;
      })
    },
    getSelect(){
      this.$api.HttpPost("/StoreAdmin/Repair/getStoreClassSelect", {})
      .then((data)=>{
        this.dialog_e_select = data.data.data;
      })
    }
  }
}
</script>

<style scoped>

</style>
