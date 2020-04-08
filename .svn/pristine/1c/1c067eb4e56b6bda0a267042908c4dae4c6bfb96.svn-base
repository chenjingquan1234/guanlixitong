<template>
  <div id="three">
    <div class="pb-nav">
      <el-button size="mini" type="info" icon="el-icon-document" @click="member()">会员资料</el-button>
      <el-button size="mini" type="info" icon="el-icon-setting" @click="setUp()">更换客户经理</el-button>
      <el-button size="mini" type="info" icon="el-icon-setting" @click="cardDelay()">延长卡到期</el-button>
      <el-button size="mini" type="info" icon="el-icon-download" @click="download()">打印</el-button>
      <el-input size="mini" style="width: 20rem;" v-model="key_name"><label slot="prepend">关键字</label></el-input>
      <el-select size="mini" v-model="store_name" placeholder="所属门店" @change="store_change">
        <el-option v-for="value in store_select" :key="value.sid" :label="value.store_name" :value="value.sid"></el-option>
      </el-select>
      <el-button size="mini" type="primary" @click="search()">查询</el-button>
    </div>
    <mytable :tableTitle="tableTitle" :tableData="tableData" :operation="operation" :check_box="check_box"
    @resData="resData" @handlePageChange="handlePageChange" @cell_click="cell_click" ref="mytable"></mytable>

    <el-dialog title="更换客户经理" :visible.sync="dialog" :close-on-click-modal="false" width="30%">
      <el-select style="width: 100%;" size="mini" v-model="people_name" clearable placeholder="客户经理" @change="people_change">
        <el-option v-for="value in people_select" :key="value.eid" :label="value.name" :value="value.eid"></el-option>
      </el-select>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog=false">取 消</el-button>
        <el-button type="primary" @click="dialog_enter">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="延长卡到期" :visible.sync="dialog1" :close-on-click-modal="false" width="30%">
      <el-date-picker v-model="dialog1_time" size="mini" style="width: 100%;" type="date" placeholder="卡到期时间" align="right" :picker-options="pickerOptions"></el-date-picker>
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
  name: "three",
  components:{
    mytable
  },
  data(){
    return{
      pickerOptions: {
        disabledDate(time){return time.getTime() < Date.now();},
        shortcuts: [{text: '今天',onClick(picker) {picker.$emit('pick', new Date());}},
        {text: '后天',onClick(picker){const date = new Date();date.setTime(date.getTime() + 3600 * 1000 * 24);picker.$emit('pick', date);}},
        {text: '一周后',onClick(picker){const date = new Date();date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);picker.$emit('pick', date);}}]
      },
      tableTitle: [
        {key: "name", title: "姓名", min_width: "100"},
        {key: "car", title: "车牌", min_width: "100"},
        {key: "tel", title: "手机", min_width: "100"},
        {key: "card_no", title: "卡号", min_width: "100"},
        {key: "card_name", title: "卡类型", min_width: "100"},
        {key: "card_balance", title: "余额", min_width: "100"},
        {key: "", title: "赠送余额", min_width: "100"},
        {key: "times", title: "卡剩余次数", min_width: "100"},
        {key: "ename", title: "客户经理", min_width: "100"},
        {key: "", title: "提成人员", min_width: "100"},
        {key: "create_time", title: "办卡日期", min_width: "100"},
        {key: "validity_date", title: "截止日期", min_width: "100"},
        {key: "remark", title: "备注", min_width: "100"},
        {key: "store_name", title: "登记门店", min_width: "100"},
      ],
      tableData: [],
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
      dialog_id: "",
      dialog_member_id: "",
      dialog1_time: "",
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
    store_change: function(s){
      this.store_id = s;
    },
    people_change: function(s){
      this.people_id = s;
    },
    search: function(){
      this.handlePageChange({search: this.key_name, sid: this.store_id});
    },
    member: function(){
      if(this.dialog_id === ""){return this.$message.warning("请选客户")}
      this.$emit("member", this.dialog_id);
    },
    setUp: function(){
      if(this.dialog_member_id === ""){return this.$message.warning("请选客户")}
      this.people_name = "";
      this.dialog = true;
    },
    cardDelay: function(){
      if(this.dialog_id === ""){return this.$message.warning("请选客户")}
      this.dialog1_time = "";
      this.dialog1 = true;
    },
    download: function(){
      this.$refs.mytable.$refs.xTable.exportData({type: "csv"});
    },
    dialog_enter: function(){
      this.$api.HttpPost("/StoreAdmin/Integral/changeManager",
      {member_id: this.dialog_member_id,
      manager_id: this.people_id})
      .then((data)=>{
        if(data.data.code === 200){
          this.handlePageChange();
          this.$message.success(data.data.msg);
          this.dialog = false;
        }
        else{
          this.$message.error(data.data.msg);
        }
      })
    },
    dialog1_enter: function(){
      this.$api.HttpPost("/StoreAdmin/Integral/extendedValidityDate",
      {id: this.dialog_id,
      validity_date: this.dialog1_time})
      .then((data)=>{
        if(data.data.code === 200){
          this.handlePageChange();
          this.$message.success(data.data.msg);
          this.dialog = false;
        }
        else{
          this.$message.error(data.data.msg);
        }
      })
    },
    cell_click: function(row){
      this.dialog_id = row.row.id;
      this.dialog_member_id = rowr.row.member_id;
    },
    resData: function(data){
      this.tableData = data;
      for(let i in this.tableData){
        this.tableData[i].car = this.tableData[i].plate_id + this.tableData[i].license_plate_number;
      }
    },
    handlePageChange: function(data){
      if(data === undefined){data = {}}
      this.dialog_id = "";
      this.dialog_member_id = "";
      this.$refs.mytable.findList(this.$api.yuming + "/StoreAdmin/Integral/getExpirationMemberShipCardList", data);
    }
  },
  mounted(){

  }
}
</script>

<style scoped>
#three{
  margin: 1rem 5rem;
}
</style>
