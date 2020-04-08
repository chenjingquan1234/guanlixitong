<template>
  <div id="two">
    <div class="pb-nav">
      <el-button size="mini" type="info" icon="el-icon-document" @click="member()">会员资料</el-button>
      <el-button size="mini" type="info" icon="el-icon-setting" @click="setUp()">更换客户经理</el-button>
      <el-button size="mini" type="info" icon="el-icon-download" @click="download()">打印</el-button>
      <el-input size="mini" style="width: 20rem;" v-model="key_name"><label slot="prepend">关键字</label></el-input>
      <el-select size="mini" v-model="store_name" placeholder="所属门店" @change="store_change">
        <el-option v-for="value in store_select" :key="value.sid" :label="value.store_name" :value="value.sid"></el-option>
      </el-select>
      <el-button size="mini" type="primary" @click="search()">查询</el-button>
    </div>
    <mytable :tableTitle="tableTitle" :tableData="tableData" :operation_mod="false" :operation="operation" @del="del" :operation_del="true" :check_box="check_box"
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
  </div>
</template>

<script>
import mytable from "./../../mytable.vue"
export default{
  name: "two",
  components:{
    mytable
  },
  data(){
    return{
      tableTitle: [
        {key: "name", title: "姓名", min_width: "100"},
        {key: "car", title: "车牌", min_width: "100"},
        {key: "tel", title: "手机", min_width: "100"},
        {key: "card_no", title: "卡号", min_width: "100"},
        {key: "card_name", title: "卡类型", min_width: "100"},
        {key: "card_balance", title: "实充余额", min_width: "100"},
        {key: "", title: "赠送余额", min_width: "100"},
        {key: "times", title: "卡剩余次数", min_width: "100"},
        {key: "", title: "计次卡余额", min_width: "100"},
        {key: "", title: "提成人员", min_width: "100"},
        {key: "ename", title: "客户经理", min_width: "100"},
        {key: "create_time", title: "办卡日期", min_width: "100"},
        {key: "validity_date", title: "截止日期", min_width: "100"},
        {key: "", title: "领卡方式", min_width: "100"},
        {key: "", title: "备注", min_width: "100"},
        {key: "oname", title: "操作人", min_width: "100"},
        {key: "store_name", title: "登记门店", min_width: "100"}
      ],
      tableData: [],
      operation: true,
      check_box: false,
      dialog: false,
      //数据
      key_name: "",
      store_name: "",
      store_id: "",
      people_name: "",
      people_id: "",
      dialog_id: "",
      dialog_member_id: ""
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
    del(scope) {
      let id = scope.row.id
      this.$api.HttpPost("/storeadmin/Integral/delMemberShipCard", {id})
      .then(v=> {
        if(v.data.code === 200) {
          this.$message.success(v.data.msg)
          this.handlePageChange()
        } else {
          this.$message.error(v.data.msg)
        }
      })
    },
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
    cell_click: function(row){
      this.dialog_id = row.row.id;
      this.dialog_member_id = row.row.member_id;
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
      this.$refs.mytable.findList(this.$store.state.domainName_http+"/StoreAdmin/Integral/getValidMemberShipCardList", data);
    }
  },
  mounted(){

  }
}
</script>

<style scoped>
#two{
  margin: 1rem 5rem;
}
</style>
