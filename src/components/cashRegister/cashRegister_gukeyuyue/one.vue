<template>
  <div id="one">
    <div class="pb-nav">
      <el-button size="mini" type="primary" icon="el-icon-plus" @click="modify(null, 1)">新增</el-button>
      <el-button size="mini" type="info" icon="el-icon-setting" @click="setUp()">预约处理</el-button>
      <el-input size="mini" style="width: 20rem;" v-model="key_name" placeholder="可按姓名/手机/预约项目搜索"><label slot="prepend">关键字</label></el-input>
      <el-select size="mini" v-model="store_name" clearable placeholder="所属门店" @change="store_change">
        <el-option v-for="value in store_select" :key="value.sid" :label="value.store_name" :value="value.sid"></el-option>
      </el-select>
      <el-select size="mini" v-model="people_name" clearable placeholder="预约员工" @change="people_change">
        <el-option v-for="value in people_select" :key="value.eid" :label="value.name" :value="value.eid"></el-option>
      </el-select>
      <el-select size="mini" v-model="type_name" clearable placeholder="预约类型" @change="type_change">
        <el-option v-for="value in type_select" :key="value.id" :label="value.type_name" :value="value.id"></el-option>
      </el-select>
      <el-button size="mini" type="primary" @click="search()">查询</el-button>
    </div>
    <mytable :tableTitle="tableTitle" :tableData="tableData" :check_box="check_box"
    @resData="resData" @handlePageChange="handlePageChange" @cell_click="cell_click" @modify="modify" @del="del" ref="mytable"></mytable>

    <el-dialog :title="add_type===1?'预约新增':'预约修改'" :visible.sync="dialog" :close-on-click-modal="false" width="30%">
      <el-select style="width: 100%;" size="mini" v-model="dialog_store" clearable filterable placeholder="预约门店" @change="dialog_store_change">
        <el-option v-for="value in store_select" :key="value.sid" :label="value.store_name" :value="value.sid"></el-option>
      </el-select>
      <el-select style="width: 100%;" size="mini" v-model="dialog_people" clearable filterable placeholder="预约员工" @change="dialog_people_change">
        <el-option v-for="value in people_select" :key="value.eid" :label="value.name" :value="value.eid"></el-option>
      </el-select>
      <el-select style="width: 100%;" size="mini" v-model="dialog_project" clearable filterable placeholder="预约项目" @change="dialog_project_change">
        <el-option v-for="value in project_select" :key="value.id" :label="value.service_item_name" :value="value.service_item_name"></el-option>
      </el-select>
      <el-date-picker v-model="dialog_time" size="mini" style="width: 100%;" type="datetime" placeholder="预约时间" align="right" :picker-options="pickerOptions"></el-date-picker>
      <el-input size="mini" v-model="customer_name" @input="kh_input">
        <label slot="prepend">预约顾客</label>
        <el-dropdown slot="append" trigger="click" @visible-change="kh_Search" ref="kh_ref">
          <label class="el-icon-arrow-down el-icon--right"></label>
          <el-dropdown-menu slot="dropdown"><mytable :height="400" :tableTitle="tableTitle1" :tableData="tableData1" :check_box="check_box" :operation="operation"
          @resData="resData1" @handlePageChange="handlePageChange1" @cell_click="cell_click1" ref="mytable1"></mytable></el-dropdown-menu>
        </el-dropdown>
      </el-input>
      <el-input size="mini" v-model="dialog_name" disabled><label slot="prepend">姓名&#12288&#12288</label></el-input>
      <el-input size="mini" v-model="dialog_sex" disabled><label slot="prepend">性别&#12288&#12288</label></el-input>
      <el-input size="mini" v-model="dialog_tel" disabled><label slot="prepend">联系方式</label></el-input>
      <el-input size="mini" v-model="dialog_remark"><label slot="prepend">备注&#12288&#12288</label></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog=false">取 消</el-button>
        <el-button type="primary" @click="dialog_enter">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="预约处理" :visible.sync="dialog1" :close-on-click-modal="false" width="30%">
      <el-input size="mini" v-model="dialog1_remark"><label slot="prepend">处理备注</label></el-input>
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
        {key: "ename", title: "预约员工", min_width: "100"},
        {key: "item_name", title: "预约项目", min_width: "100"},
        {key: "appoint_time", title: "预约时间", min_width: "100"},
        {key: "name", title: "顾客姓名", min_width: "100"},
        {key: "sex_name", title: "性别", min_width: "100"},
        {key: "tel", title: "联系方式", min_width: "100"},
        {key: "appoint_type_name", title: "预约类型", min_width: "100"},
        {key: "status_name", title: "预约状态", min_width: "100"},
        {key: "remark", title: "备注", min_width: "100"}
      ],
      tableData: [],
      tableTitle1: [
        {key: "name", title: "姓名", min_width: "100"},
        {key: "car", title: "车牌号", min_width: "100"},
        {key: "tel", title: "手机号码", min_width: "100"},
      ],
      tableData1: [],
      check_box: false,
      operation: false,
      dialog: false,
      dialog1: false,
      //数据
      key_name: "",
      store_name: "",
      people_name: "",
      type_name: "",
      type_select: [{id: 1, type_name: "电脑预约"}, {id: 2, type_name: "微信预约"}],

      customer_name: "",
      dialog_store: "",
      dialog_people: "",
      dialog_project: "",
      dialog_time: "",
      dialog_id: "",
      dialog_name: "",
      dialog_sex: "",
      dialog_tel: "",
      dialog_remark: "",
      add_type: "",
      id: "",
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
    },
    "project_select": {
      type: Array,
      default: ()=>{}
    }
  },
  methods:{
    store_change(s){
      this.store_name = s;
    },
    people_change(s){
      this.people_name = s;
    },
    type_change(s){
      this.type_name = s;
    },
    dialog_store_change(s){
      this.dialog_store = s;
    },
    dialog_people_change(s){
      this.dialog_people = s;
    },
    dialog_project_change(s){
      this.dialog_project = s;
    },
    search(){
      this.handlePageChange()
    },
    modify(row, key){
      this.dialog = true;
      this.add_type = 1;
      this.id = "";
      this.customer_name = "";
      this.dialog_store = "";
      this.dialog_people = "";
      this.dialog_project = "";
      this.dialog_time = "";
      this.dialog_id = "";
      this.dialog_name = "";
      this.dialog_sex = "";
      this.dialog_tel = "";
      this.dialog_remark = "";
      this.$nextTick(()=>{
        this.handlePageChange1();
      })
      if(key == 2){
        this.add_type = 2;
        this.id = row.row.id;
        this.customer_name = row.row.name;
        this.dialog_store = row.row.sid;
        this.dialog_people = row.row.eid;
        this.dialog_project = row.row.item_name;
        this.dialog_time = row.row.appoint_time;
        this.dialog_id = row.row.member_id;
        this.dialog_name = row.row.name;
        this.dialog_sex = row.row.sex_name;
        this.dialog_tel = row.row.tel;
        this.dialog_remark = row.row.remark;
      }
    },
    del(row){
      this.$api.HttpPost("/StoreAdmin/Client/deleteReservationService", {id: this.id})
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
    setUp(){
      if(this.id === ""){return this.$message.warning("请选择项")}
      this.dialog1 = true;
    },
    kh_Search(s){
      if(s){
        this.$nextTick(()=>{
          this.handlePageChange1({search: this.customer_name});
        })
      }
    },
    kh_input(){
      this.$refs.kh_ref.show();
      this.kh_Search(true);
    },
    dialog_enter(){
      this.$api.HttpPost("/StoreAdmin/Client/addOrUpdateReservationService",
      {add_type: this.add_type,
      member_id: this.dialog_id,
      sid: this.dialog_store,
      eid: this.dialog_people,
      id: this.id,
      appoint_time: this.dialog_time,
      item_name: this.dialog_project,
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
      this.$api.HttpPost("/StoreAdmin/Client/changeReservationServiceStatus", {id: this.id, remark: this.dialog1_remark})
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
    cell_click1(row){
      this.dialog_id = row.row.member_id;
      this.customer_name = row.row.name;
      this.dialog_name = row.row.name;
      if(row.row.sex == 1){this.dialog_sex = "男"}
      else if(row.row.sex == 2){this.dialog_sex = "女"}
      this.dialog_tel = row.row.tel;
    },
    resData1(data){
      this.tableData1 = data;
      for(let i in this.tableData1){
        this.tableData1[i].car = this.tableData1[i].plate_id + this.tableData1[i].license_plate_number;
      }
    },
    handlePageChange1(data){
      if(data === undefined){data = {search: this.key_name, sid: this.store_name, eid: this.people_name, appoint_type: this.type_name}}
      this.$refs.mytable1.findList(this.$api.yuming + "/StoreAdmin/Order/getMemberSelect", data)
    },
    cell_click(row){
      this.id = row.row.id;
    },
    resData(data){
      this.tableData = data;
      for(let i in this.tableData){
        if(this.tableData[i].sex == 1){
          this.tableData[i].sex_name = "男";
        }
        else if(this.tableData[i].sex == 2){
          this.tableData[i].sex_name = "女";
        }
        if(this.tableData[i].appoint_type == 1){
          this.tableData[i].appoint_type_name = "电脑预约";
        }
        else if(this.tableData[i].appoint_type == 2){
          this.tableData[i].appoint_type_name = "微信预约";
        }
        if(this.tableData[i].status == 0){
          this.tableData[i].status_name = "未支付";
        }
        else if(this.tableData[i].status == 1){
          this.tableData[i].status_name = "已处理";
        }
      }
    },
    handlePageChange(data){
      if(data === undefined){data = {}}
      this.$refs.mytable.findList(this.$api.yuming + "/StoreAdmin/Client/getReservationServiceList", data)
    }
  }
}

</script>

<style scoped>
#one{
  margin: 1rem 5rem;
}
</style>
