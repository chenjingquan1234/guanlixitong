<template>
  <div id="three">
    <!-- 操作功能 -->
    <div class="pb-nav">
      <el-button size="mini" type="primary" icon="el-icon-check" @click="start()">启用员工</el-button>
      <el-input style="margin-left: 10px; width: 25rem;" size="mini" placeholder="可输入员工姓名或手机号码进行搜索" v-model="key_word"><template slot="prepend">关键字</template></el-input>
      <el-select size="mini" :clearable="true" v-model="value" placeholder="所属门店" @change="selectStore_value" ref="s">
        <el-option v-for="value in search_sub_store" :key="value.sid" :label="value.store_name" :value="value.sid"></el-option>
      </el-select>
      <el-button size="mini" type="primary" @click="search()">查询</el-button>
    </div>

    <mytable :tableTitle="tableTitle" :tableData="tableData" :operation_del="operation_del" @modify="modify" @resData="resData" @handlePageChange="handlePageChange" ref="mytable"></mytable>
    <el-dialog title="员工资料" :visible.sync="dialog" :close-on-click-modal="false" :close-on-press-escape="false">
      <el-input size="mini" :disabled="true" v-model="store_name"><template slot="prepend">所属门店&#12288&#12288</template></el-input>
      <el-select size="mini" style="width: 100%;" v-model="type_name" placeholder="工种" @change="selectStore_type">
        <el-option v-for="value in modify_sub_type" :key="value.id" :label="value.work_type_name" :value="value.id"></el-option>
      </el-select>
      <el-input size="mini" clearable v-model="all_data.number"><template slot="prepend">员工编号&#12288&#12288</template></el-input>
      <el-input size="mini" clearable v-model="all_data.name"><template slot="prepend"><label style="color: red">员工姓名&#12288&#12288</label></template></el-input>
      <el-input size="mini" clearable v-model="all_data.tel"><template slot="prepend">手机号码&#12288&#12288</template></el-input>
      <el-input size="mini" clearable v-model="all_data.qq"><template slot="prepend">QQ&#12288&#12288&#12288&#12288&#160</template></el-input>
      <el-input size="mini" clearable v-model="all_data.wechat_name"><template slot="prepend">微信&#12288&#12288&#12288&#12288</template></el-input>
      <el-input size="mini" clearable v-model="all_data.basic_salary"><template slot="prepend"><label style="color: red">基本工资&#12288&#12288</label></template></el-input>
      <el-input size="mini" clearable v-model="all_data.idnumber"><template slot="prepend">身份证&#12288&#12288&#12288</template></el-input>
      <el-row>
        <el-col :span="20"><el-input size="mini" clearable v-model="all_data.idphoto"><template slot="prepend">身份证照片&#12288</template></el-input></el-col>
        <el-col :span="4"><el-button size="mini">上传</el-button></el-col>
      </el-row>
      <el-input size="mini" :disabled="true"><template><label slot="prepend">微信显示&#12288&#12288</label>
      <el-switch slot="append" v-model="all_data.eleven"></el-switch></template></el-input>
      <el-input size="mini" :disabled="true"><template><label slot="prepend">微信下单通知</label>
      <el-switch slot="append" v-model="all_data.wechat_order_inform"></el-switch></template></el-input>
      <el-input size="mini" :disabled="true"><template><label slot="prepend">微信预约通知</label>
      <el-switch slot="append" v-model="all_data.wechat_appointment_inform"></el-switch></template></el-input>
      <el-input size="mini" type="textarea" v-model="all_data.remarks" placeholder="备注"></el-input>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog=false">取消</el-button>
        <el-button type="primary" @click="confirm()">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import mytable from './../../mytable.vue'
export default{
  name: "three",
  components: {
    mytable
  },
  data(){
    return{
      value: "",//选中门店(搜索)
      value_sid: "",//选中门店id(搜索)
      search_sub_store: [],//门店列表(搜索)
      key_word: "",//关键字
      zero_id: "",//员工id
      type_id: "",//选中工种id
      modify_sub_type: [],//工种列表
      type_name: "",//选中工种
      store_name: "",
      url: this.$store.state.domainName_http+"/StoreAdmin/Staff/getDepartureStaffList",
      //分页器
      tableTitle: [
        {key: "name", title: "员工姓名", width: "100"},
        {key: "username", title: "关联账号", width: "100"},
        {key: "tel", title: "手机号码", width: "150"},
        {key: "work_type_name", title: "工种", width: "200"},
        {key: "basic_salary", title: "底薪", width: "150"},
        {key: "wechat_name", title: "微信", width: "200"},
        {key: "store_name", title: "所属门店", width: "200"},
        {key: "update_time", title: "离职时间", width: "200"},
      ],
      tableData: [],
      operation_del: false,
      //修改数据
      all_data: {
        number: "",
        name: "",
        tel: "",
        qq: "",
        wechat_name: "",
        basic_salary: "",
        idnumber: "",
        idphoto: "",
        eleven: 0,
        wechat_order_inform: 0,
        wechat_appointment_inform: 0,
        remark: "",
      },
      loading: false,
      dialog: false
    }
  },
  methods:{
    selectStore_value: function(data){
      if(this.value == ""){this.value_sid = "";}
      else{this.value_sid = data;}
    },
    selectStore_type: function(data){
      this.type_id = data;
    },
    search: function(){
      this.handlePageChange();
    },
    start: function(){
      this.loading = true;
      var value = this.$refs.mytable.$children[0].getSelectRecords();
      var lengths = this.$refs.mytable.$children[0].getSelectRecords().length;
      if(lengths === 0){
        this.$message.warning("请至少选择一项操作");
      }
      else{
        var sta = [];
        for(var key in value){
          sta.push(value[key].id);
        }
        var id = sta.join();
        this.$api.HttpPost("/StoreAdmin/Staff/departureStaff", {id: id, isdeparture: 0})
        .then((data)=>{
          this.$refs.mytable.findList(this.url, {});
          this.$message.success("启用成功");
          this.loading = false;
        })
        .catch((data)=>{
          this.loading = false;
        })
      }
    },
    modify: function(s){
      this.dialog = true;
      var id = s.row.id;
      this.$api.HttpPost("/StoreAdmin/Staff/workTypeSelect")//获取工种列表
      .then((data)=>{
        this.modify_sub_type = data.data;
      })
      this.$api.HttpPost(this.$store.state.domainName_http+"/StoreAdmin/Staff/getStaffDetail", {id: id})
      .then((data)=>{
        this.zero_id = data.data.data.id;
        this.type_id = data.data.data.wid;
        this.all_data = data.data.data;
      })
      .catch((data)=>{
        this.dialog = false;
      })
      this.store_name = s.row.store_name;
      this.type_name = s.row.work_type_name;
    },
    confirm: function(){
      this.$api.HttpPost("/StoreAdmin/Staff/staffEdit", {add_type: 2, id: this.zero_id, wid: this.type_id, number: this.all_data.number, name: this.all_data.name,
      tel: this.all_data.tel, qq: this.all_data.qq, wechat_name: this.all_data.wechat_name, basic_salary: this.all_data.basic_salary, idnumber: this.all_data.idnumber,
      idphoto: this.all_data.idphoto, wechat_order_inform: this.all_data.wechat_order_inform, wechat_appointment_inform: this.all_data.wechat_appointment_inform,
      remark: this.all_data.remark})
      .then((data)=>{
        this.$message.success("成功修改");
        this.dialog = false;
      })
      .catch((data)=>{
        this.dialog = false;
      })
    },
    resData(data){
      this.tableData = data;
    },
    handlePageChange(data){
      if(data === undefined){data = {sid: this.value_sid, search: this.key_word}};
      this.$refs.mytable.findList(this.$api.yuming + "/StoreAdmin/Staff/getDepartureStaffList", data);
    }
  },
  created(){
    this.$api.HttpPost("/StoreAdmin/Common/getStoreSelect", {})//获取搜索所属门店列表
    .then((data)=>{
      this.search_sub_store = data.data;
    })
  }
}
</script>

<style scoped>
#three{
  margin: 1rem 5rem;
}
</style>
