<template>
  <div id="one">
    <div class="pb-nav">
      <el-button size="mini" type="primary" icon="el-icon-plus" @click="modify(null, 1)">新增</el-button>
      <el-button size="mini" type="info" icon="el-icon-setting" @click="setUp()">订单处理</el-button>
      <el-input size="mini" style="width: 20rem;" v-model="key_name" placeholder="可按姓名/手机/预约项目搜索"><label slot="prepend">关键字</label></el-input>
      <el-select size="mini" v-model="store_name" clearable placeholder="所属门店" @change="store_change">
        <el-option v-for="value in store_select" :key="value.sid" :label="value.store_name" :value="value.sid"></el-option>
      </el-select>
      <el-button size="mini" type="primary" @click="search()">查询</el-button>
    </div>
    <mytable :tableTitle="tableTitle" :tableData="tableData" :check_box="check_box"
    @resData="resData" @handlePageChange="handlePageChange" @cell_click="cell_click" @modify="modify" @del="del" ref="mytable"></mytable>

    <el-dialog :title="add_type===1?'订货新增':'订货修改'" :visible.sync="dialog" :close-on-click-modal="false" width="30%">
      <el-input size="mini" v-model="customer_name" @input="kh_input">
        <label slot="prepend">订货顾客</label>
        <el-dropdown slot="append" trigger="click" @visible-change="kh_Search" ref="kh_ref">
          <label class="el-icon-arrow-down el-icon--right"></label>
          <el-dropdown-menu slot="dropdown"><mytable :height="400" :tableTitle="tableTitle1" :tableData="tableData1" :check_box="check_box" :operation="operation"
          @resData="resData1" @handlePageChange="handlePageChange1" @cell_click="cell_click1" ref="mytable1"></mytable></el-dropdown-menu>
        </el-dropdown>
      </el-input>
      <el-input size="mini" v-model="dialog_name" disabled><label slot="prepend">姓名&#12288&#12288</label></el-input>
      <el-input size="mini" v-model="dialog_sex" disabled><label slot="prepend">性别&#12288&#12288</label></el-input>
      <el-input size="mini" v-model="dialog_tel" disabled><label slot="prepend">联系方式</label></el-input>
      <el-select style="width: 100%;" size="mini" v-model="people_name" clearable placeholder="负责人" @change="people_change">
        <el-option v-for="value in people_select" :key="value.eid" :label="value.name" :value="value.eid"></el-option>
      </el-select>
      <el-date-picker v-model="dialog_time" size="mini" style="width: 100%;" type="date" placeholder="预约时间" align="right" :picker-options="pickerOptions"></el-date-picker>
      <el-input size="mini" v-model="dialog_commodity"><label slot="prepend">预定商品名称</label></el-input>
      <el-input size="mini" v-model="dialog_address"><label slot="prepend">预约定金&#12288&#12288</label></el-input>
      <el-input size="mini" v-model="dialog_remark"><label slot="prepend">备注&#12288&#12288&#12288&#12288</label></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog=false">取 消</el-button>
        <el-button type="primary" @click="dialog_enter">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="商品领取" :visible.sync="dialog1" :close-on-click-modal="false" width="30%">
      <el-input size="mini" v-model="dialog1_car" disabled><label slot="prepend">车牌&#12288&#12288</label></el-input>
      <el-input size="mini" v-model="dialog1_commodity" disabled><label slot="prepend">预定商品</label></el-input>
      <el-input size="mini" v-model="dialog1_address" disabled><label slot="prepend">订金&#12288&#12288</label></el-input>
      <el-input size="mini" v-model="dialog1_remark"><label slot="prepend">备注&#12288&#12288</label></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog1=false">取 消</el-button>
        <el-button type="primary" @click="dialog1_enter">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import mytable from "./../../mytable.vue"
export default{
  name: "one",
  components: {
    mytable
  },
  data(){
    return{
      pickerOptions: {
        disabledDate(time){return time.getTime() < Date.now();},
        shortcuts: [{text: '后天',onClick(picker){const date = new Date();date.setTime(date.getTime() + 3600 * 1000 * 24);picker.$emit('pick', date);}},
        {text: '一周后',onClick(picker){const date = new Date();date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);picker.$emit('pick', date);}}]
      },
      tableTitle: [
        {key: "mname", title: "客户姓名", min_width: "100"},
        {key: "car", title: "车牌", min_width: "100"},
        {key: "tel", title: "联系方式", min_width: "100"},
        {key: "goods_name", title: "预定商品", min_width: "100"},
        {key: "money", title: "预付订金", min_width: "100"},
        {key: "ename", title: "负责人姓名", min_width: "100"},
        {key: "appoint_time", title: "预定时间", min_width: "100"},
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
      check_box: false,
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
      dialog_time: "",
      dialog_commodity: "",
      dialog_address: "",
      dialog_remark: "",

      dialog1_car: "",
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
    kh_Search(s){
      if(s){
        this.$nextTick(()=>{
          this.handlePageChange1();
        })
      }
    },
    kh_input(){
      this.$refs.kh_ref.show();
      this.kh_Search(true);
    },
    store_change(s){
      this.store_id = s;
    },
    people_change(s){
      this.people_id = s;
    },
    setUp(){
      if(this.id === ""){return this.$message.warning("请选择项")}
      this.dialog1 = true;
    },
    search(){
      this.handlePageChange();
    },
    cell_click1(row){
      this.dialog_id = row.row.member_id;
      this.customer_name = row.row.name;
      this.dialog_name = row.row.name;
      if(row.row.sex == 1){this.dialog_sex = "男"}
      else if(row.row.sex == 2){this.dialog_sex = "女"}
      this.dialog_tel = row.row.tel;
      this.$refs.kh_ref.hide();
    },
    resData1(data){
      this.tableData1 = data;
      for(let i in this.tableData1){
        this.tableData1[i].car = this.tableData1[i].plate_id + this.tableData1[i].license_plate_number;
      }
    },
    handlePageChange1(data){
      if(data === undefined){data = {search: this.customer_name}}
      this.$refs.mytable1.findList(this.$api.yuming + "/StoreAdmin/Order/getMemberSelect", data)
    },
    modify(row, key){
      this.dialog = true;
      this.add_type = 1;
      this.id = "";
      this.customer_name = "";
      this.people_name = "";
      this.dialog_name = "";
      this.dialog_sex = "";
      this.dialog_tel = "";
      this.prople_name = "";
      this.dialog_time = "";
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
        this.dialog_time = row.row.appoint_time;
        this.dialog_commodity = row.row.goods_name;
        this.dialog_address = row.row.money;
        this.dialog_id = row.row.member_id;
        this.dialog_name = row.row.mname;
        this.dialog_sex = row.row.sex_name;
        this.dialog_tel = row.row.tel;
        this.dialog_remark = row.row.remark;
      }
    },
    del(row){
      this.$api.HttpPost("/StoreAdmin/Client/delGoods", {id: this.id})
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
    dialog_enter(){
      this.$api.HttpPost("/StoreAdmin/Client/addGoods",
      {add_type: this.add_type,
      id: this.id,
      member_id: this.dialog_id,
      appoint_time: this.dialog_time,
      goods_name: this.dialog_commodity,
      money: this.dialog_address,
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
    dialog1_enter(){
      this.$api.HttpPost("/StoreAdmin/Client/settleGoods",
      {id: this.id,
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
    cell_click(row){
      this.dialog1_remark = "";
      this.id = row.row.id;
      this.dialog1_car = row.row.car;
      this.dialog1_commodity = row.row.goods_name;
      this.dialog1_address = row.row.money;
      this.dialog1_remark = row.row.remark;
    },
    resData(data){
      this.tableData = data;
      for(let i in this.tableData){
        this.tableData[i].car = this.tableData[i].plate_id + this.tableData[i].license_plate_number;
      }
    },
    handlePageChange(data){
      if(data === undefined){data = {search: this.key_name, sid: this.store_id}}
      this.$refs.mytable.findList(this.$api.yuming + "/StoreAdmin/Client/getGoodsList", data)
    }
  }
}
</script>

<style scoped>
#one{
  margin: 1rem 5rem;
}
</style>
