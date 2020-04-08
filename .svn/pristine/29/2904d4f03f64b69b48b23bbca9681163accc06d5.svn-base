<template>
  <div id="one">
    <div class="pb-nav">
      <el-button size="mini" type="primary" icon="el-icon-plus" @click="modify(null, 1)">新增</el-button>
      <el-button size="mini" type="info" icon="el-icon-setting" @click="setUp()">客户领取</el-button>
      <el-input size="mini" style="width: 20rem;" v-model="key_name" placeholder="可按姓名/手机/预约项目搜索"><label slot="prepend">关键字</label></el-input>
      <el-select size="mini" v-model="store_name" clearable placeholder="所属门店" @change="store_change">
        <el-option v-for="value in store_select" :key="value.sid" :label="value.store_name" :value="value.sid"></el-option>
      </el-select>
      <el-button size="mini" type="primary" @click="search()">查询</el-button>
    </div>
    <mytable :tableTitle="tableTitle" :tableData="tableData" :check_box="check_box" :operation_="operation_" :operation_del="operation_del" :operation_name="operation_name"
    @resData="resData" @handlePageChange="handlePageChange" @cell_click="cell_click" @modify="modify" @operat="operat" ref="mytable"></mytable>

    <el-dialog :title="add_type===1?'寄存新增':'寄存修改'" :visible.sync="dialog" :close-on-click-modal="false" width="30%">
      <!-- <el-input size="mini" v-model="customer_name">
        <label slot="prepend">寄存顾客</label>
        <el-dropdown slot="append" trigger="click">
          <label class="el-icon-arrow-down el-icon--right"></label>
          <el-dropdown-menu slot="dropdown"><mytable :tableTitle="tableTitle1" :tableData="tableData1" :check_box="check_box" :operation="operation"
          @resData="resData1" @handlePageChange="handlePageChange1" @cell_click="cell_click1" ref="mytable1"></mytable></el-dropdown-menu>
        </el-dropdown>
      </el-input> -->
      <base-search v-model="customer_name" :callback="callback" url="/StoreAdmin/Order/getMemberSelect" :tableTitle="tableTitle1"   @getCellData="cell_click1" />
      <el-input size="mini" v-model="dialog_name" disabled><label slot="prepend">姓名&#12288&#12288</label></el-input>
      <el-input size="mini" v-model="dialog_sex" disabled><label slot="prepend">性别&#12288&#12288</label></el-input>
      <el-input size="mini" v-model="dialog_tel" disabled><label slot="prepend">联系方式</label></el-input>
      <el-select style="width: 100%;" size="mini" v-model="people_name" clearable placeholder="负责人" @change="people_change">
        <el-option v-for="value in people_select" :key="value.eid" :label="value.name" :value="value.eid"></el-option>
      </el-select>
      <el-input size="mini" v-model="dialog_commodity"><label slot="prepend">寄存商品名称</label></el-input>
      <el-input size="mini" v-model="dialog_address"><label slot="prepend">存放位置&#12288&#12288</label></el-input>
      <el-input size="mini" v-model="dialog_remark"><label slot="prepend">备注&#12288&#12288&#12288&#12288</label></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog=false">取 消</el-button>
        <el-button type="primary" @click="dialog_enter">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="商品领取" :visible.sync="dialog1" :close-on-click-modal="false" width="30%">
      <el-input size="mini" v-model="dialog1_commodity" disabled><label slot="prepend">寄存商品名称</label></el-input>
      <el-input size="mini" v-model="dialog1_address" disabled><label slot="prepend">存放位置&#12288&#12288</label></el-input>
      <el-select style="width: 100%;" size="mini" v-model="people1_name" clearable placeholder="负责人" @change="people1_change">
        <el-option v-for="value in people_select" :key="value.eid" :label="value.name" :value="value.eid"></el-option>
      </el-select>
      <el-input size="mini" v-model="dialog1_remark"><label slot="prepend">备注</label></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog1=false">取 消</el-button>
        <el-button type="primary" @click="dialog1_enter">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import mytable from "./../../mytable.vue"
import BaseSearch from '../../BaseComponets/BaseSearch'
export default{
  name: "one",
  components: {
    mytable,
    BaseSearch
  },
  data(){
    return{
      tableTitle: [
        {key: "mname", title: "姓名", min_width: "100"},
        {key: "car", title: "车牌", min_width: "100"},
        {key: "tel", title: "联系方式", min_width: "100"},
        {key: "goods", title: "寄存商品", min_width: "100"},
        {key: "location", title: "存放位置", min_width: "100"},
        {key: "ename", title: "负责人", min_width: "100"},
        {key: "create_time", title: "寄存时间", min_width: "100"},
        {key: "remark", title: "备注", min_width: "100"}
      ],
      tableData: [],
      tableTitle1: [
        {key: "name", title: "姓名", min_width: "100"},
        {key: "car", title: "车牌号", min_width: "100"},
        {key: "tel", title: "手机号码", min_width: "100"},
      ],
      tableData1: [],
      operation: false,
      operation_: true,
      operation_del: false,
      check_box: false,
      operation_name: "作废",
      dialog: false,
      dialog1: false,
      //数据
      key_name: "",
      store_name: "",
      store_id: "",
      people_name: "",
      people_id: "",
      people1_name: "",
      people1_id: "",

      add_type: "",
      id: "",
      customer_name: "",
      dialog_id: "",
      dialog_name: "",
      dialog_sex: "",
      dialog_tel: "",
      dialog_commodity: "",
      dialog_address: "",
      dialog_remark: "",

      dialog1_commodity: "",
      dialog1_address: "",
      dialog1_remark: "",
    }
  },
  props:{
    "store_select": {
      type: Array,
      default: ()=>{}
    },
    "people_select": {
      type: Array,
      default: ()=>{}
    }
  },
  methods:{
    callback(data) {
       for(let i in data){
        data[i].car = data[i].plate_id + data[i].license_plate_number;
      }
      return data
    },
    store_change: function(s){
      this.store_id = s;
    },
    people_change: function(s){
      this.people_id = s;
    },
    people1_change: function(s){
      this.people1_id = s;
    },
    setUp: function(){
      if(this.id === ""){return this.$message.warning("请选择项")}
      this.prople1_name = "";
      this.dialog1_remark = "";
      this.dialog1 = true;
    },
    search: function(){
      this.handlePageChange();
    },
    cell_click1: function(row){
      this.dialog_id = row.row.member_id;
      this.customer_name = row.row.name;
      this.dialog_name = row.row.name;
      if(row.row.sex == 1){this.dialog_sex = "男"}
      else if(row.row.sex == 2){this.dialog_sex = "女"}
      this.dialog_tel = row.row.tel;
    },
    resData1: function(data){
      this.tableData1 = data;
      for(let i in this.tableData1){
        this.tableData1[i].car = this.tableData1[i].plate_id + this.tableData1[i].license_plate_number;
      }
    },
    handlePageChange1: function(data){
      if(data === undefined){data = {}}
      // this.$refs.mytable1.findList(this.$store.state.domainName_http+"/StoreAdmin/Order/getMemberSelect", data)
    },
    modify: function(row, key){
      this.dialog = true;
      this.add_type = 1;
      this.id = "";
      this.customer_name = "";
      this.people_name = "";
      this.dialog_name = "";
      this.dialog_sex = "";
      this.dialog_tel = "";
      this.prople_name = "";
      this.dialog_commodity = "";
      this.dialog_address = "";
      this.dialog_remark = "";
      this.$nextTick(()=>{
        this.handlePageChange1();
      })
      if(key == 2){
        this.add_type = 2;
        this.id = row.row.id;
        this.customer_name = row.row.mname;
        this.people_name = row.row.eid;
        this.dialog_commodity = row.row.goods;
        this.dialog_address = row.row.location;
        this.dialog_id = row.row.member_id;
        this.dialog_name = row.row.mname;
        this.dialog_sex = row.row.sex_name;
        this.dialog_tel = row.row.tel;
        this.dialog_remark = row.row.remark;
      }
    },
    operat: function(row){
      this.$api.HttpPost("/StoreAdmin/Client/delDeposit", {id: this.id},)
      .then((data)=>{
        if(data.data.code === 200){
          this.dialog = false;
          this.$message.success(data.data.msg);
          this.handlePageChange();
        }
        else{
          this.$message.error(data.data.msg);
        }
      })
    },
    dialog_enter: function(){
      this.$api.HttpPost("/StoreAdmin/Client/addDeposit",
      {add_type: this.add_type,
      id: this.id,
      member_id: this.dialog_id,
      goods: this.dialog_commodity,
      location: this.dialog_address,
      eid: this.people_id,
      remark: this.dialog_remark})
      .then((data)=>{
        if(data.data.code === 200){
          this.dialog = false;
          this.$message.success(data.data.msg);
          this.handlePageChange();
        }
        else{
          this.$message.error(data.data.msg);
        }
      })
    },
    dialog1_enter: function(){
      this.$api.HttpPost("/StoreAdmin/Client/receiveDeposit",
      {id: this.id,
      member_id: this.people1_id,
      remark: this.dialog1_remark})
      .then((data)=>{
        if(data.data.code === 200){
          this.dialog1 = false;
          this.$message.success(data.data.msg);
          this.handlePageChange();
        }
        else{
          this.$message.error(data.data.msg);
        }
      })
    },
    cell_click: function(row){
      this.id = row.row.id;
      this.dialog1_commodity = row.row.goods;
      this.dialog1_address = row.row.location;
    },
    resData: function(data){
      this.tableData = data;
      for(let i in this.tableData){
        this.tableData[i].car = this.tableData[i].plate_id + this.tableData[i].license_plate_number;
      }
    },
    handlePageChange: function(data){
      if(data === undefined){data = {search: this.key_name, sid: this.store_id}}
      this.$refs.mytable.findList(this.$store.state.domainName_http+"/StoreAdmin/Client/getDepositList", data)
    }
  }
}
</script>

<style scoped>
#one{
  margin: 1rem 5rem;
}
</style>
