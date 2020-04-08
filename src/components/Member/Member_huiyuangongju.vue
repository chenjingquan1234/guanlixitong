<template>
  <div id="Member_huiyuangongju">
	  <el-row class="row">
		<el-col :span="3"></el-col>
		<el-col :span="6" v-for="value in list" :key="value.key" class="column" :class="{'mouse-class': mouseClass===value.key}"
		@mouseenter.native="mouseClass=value.key" @mouseleave.native="mouseClass=false" @click.native="card(value.key)">
		  <img :src="value.img" alt="error">
		  <el-divider><h4>{{value.name}}</h4></el-divider>
		  <router-link :to="{name: value.url}"><el-button size="mini" round @click="seeForm(value.key, value.url)">{{value.bname}}</el-button></router-link>
		</el-col>
	  </el-row>
    <!-- 弹出框 -->
    <el-dialog title="重置密码" :visible.sync="dialog" :close-on-click-modal="false" width="30%" @close="close">
      <el-input size="mini" v-model="customer_name" @input="search(1)">
        <label slot="prepend">客户搜索</label>
        <el-dropdown slot="append" @visible-change="visibleChange" ref="dropdown_1">
          <label class="el-icon-arrow-down el-icon--right"></label>
          <el-dropdown-menu slot="dropdown"><mytable :tableTitle="tableTitle" :tableData="tableData" :operation="operation" @resData="resData" @handlePageChange="handlePageChange" @cell_click="cell_click" ref="mytable"></mytable></el-dropdown-menu>
        </el-dropdown>
      </el-input>
      <el-input size="mini" v-model="card_no" disabled><label slot="prepend">卡号&#12288&#12288</label></el-input>
      <el-input size="mini" v-model="name" disabled><label slot="prepend">姓名&#12288&#12288</label></el-input>
      <el-input size="mini" v-model="tel" disabled><label slot="prepend">手机&#12288&#12288</label></el-input>
      <el-input size="mini" v-model="dialog_a" type="password"><label slot="prepend">新密码&#12288</label></el-input>
      <el-input size="mini" v-model="dialog_b" type="password"><label slot="prepend">确认密码</label></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog=false">取 消</el-button>
        <el-button type="primary" @click="enter()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="变更卡类型" :visible.sync="dialog1" :close-on-click-modal="false" width="30%"  @close="close">
      <el-input size="mini" v-model="customer_name" @input="search(2)">
        <label slot="prepend">客户搜索</label>
        <el-dropdown slot="append" @visible-change="visibleChange" ref="dropdown_1">
          <label class="el-icon-arrow-down el-icon--right"></label>
          <el-dropdown-menu slot="dropdown"><mytable :tableTitle="tableTitle" :tableData="tableData" :operation="operation" @resData="resData" @handlePageChange="handlePageChange" @cell_click="cell_click" ref="mytable"></mytable></el-dropdown-menu>
        </el-dropdown>
      </el-input>
      <el-input size="mini" v-model="card_no" disabled><label slot="prepend">卡号&#12288&#12288</label></el-input>
      <el-input size="mini" v-model="name" disabled><label slot="prepend">姓名&#12288&#12288</label></el-input>
      <el-input size="mini" v-model="tel" disabled><label slot="prepend">手机&#12288&#12288</label></el-input>
      <el-input size="mini" v-model="old_card" disabled><label slot="prepend">原卡类型</label></el-input>
      <el-select size="mini" v-model="dialog1_a" placeholder="更换卡类型" @change="dialog1_a_change">
        <el-option v-for="value in dialog1_a_select" :key="value.card_id" :label="value.card_name" :value="value.card_id"></el-option>
      </el-select>
      <el-select size="mini" v-model="dialog1_b" placeholder="更换员工" @change="dialog1_b_change">
        <el-option v-for="value in dialog1_b_select" :key="value.eid" :label="value.name" :value="value.eid"></el-option>
      </el-select>
      <el-input v-model="dialog1_c" type="textarea" placeholder="备注"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog1=false">取 消</el-button>
        <el-button type="primary" @click="enter()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改卡到期时间" :visible.sync="dialog2" :close-on-click-modal="false" width="30%"  @close="close">
      <el-input size="mini" v-model="customer_name" @input="search(3)">
        <label slot="prepend">客户搜索</label>
        <el-dropdown slot="append" @visible-change="visibleChange" ref="dropdown_1">
          <label class="el-icon-arrow-down el-icon--right"></label>
          <el-dropdown-menu slot="dropdown"><mytable :tableTitle="tableTitle" :tableData="tableData" :operation="operation" @resData="resData" @handlePageChange="handlePageChange" @cell_click="cell_click" ref="mytable"></mytable></el-dropdown-menu>
        </el-dropdown>
      </el-input>
      <el-input size="mini" v-model="card_no" disabled><label slot="prepend">卡号&#12288&#12288</label></el-input>
      <el-input size="mini" v-model="name" disabled><label slot="prepend">姓名&#12288&#12288</label></el-input>
      <el-input size="mini" v-model="tel" disabled><label slot="prepend">手机&#12288&#12288</label></el-input>
      <el-input size="mini" v-model="dialog2_a" disabled><label slot="prepend">办理日期</label></el-input>
      <el-date-picker size="mini" style="width: 100%;"
        v-model="dialog2_b"
        align="right"
        type="date"
        placeholder="截止日期"
        :picker-options="pickerOptions">
      </el-date-picker>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog2=false">取 消</el-button>
        <el-button type="primary" @click="enter()">确 定</el-button>
      </div>
    </el-dialog>
<!--    <el-dialog title="卡冻结" :visible.sync="dialog3" :close-on-click-modal="false" width="30%">
      <el-select size="mini" v-model="dialog3_c_select" placeholder="会员查询">
        <el-option v-for="(value, key) in dialog3_select" :key="key" :label="value" :value="value"></el-option>
      </el-select>
      <el-input size="mini" disabled><label slot="prepend">卡号&#12288&#12288&#12288</label></el-input>
      <el-input size="mini" disabled><label slot="prepend">姓名&#12288&#12288&#12288</label></el-input>
      <el-input size="mini" disabled><label slot="prepend">手机&#12288&#12288&#12288</label></el-input>
      <el-input size="mini" disabled><label slot="prepend">余额&#12288&#12288&#12288</label></el-input>
      <el-input size="mini" disabled><label slot="prepend">卡内总余次</label></el-input>
      <el-input type="textarea" placeholder="冻结备注"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog3=false">取 消</el-button>
        <el-button type="primary" @click="enter()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="更换卡号" :visible.sync="dialog4" :close-on-click-modal="false" width="30%">
      <el-select size="mini" v-model="dialog4_c_select" placeholder="会员查询">
        <el-option v-for="(value, key) in dialog4_select" :key="key" :label="value" :value="value"></el-option>
      </el-select>
      <el-input size="mini" disabled><label slot="prepend">卡号&#12288&#12288</label></el-input>
      <el-input size="mini" disabled><label slot="prepend">姓名&#12288&#12288</label></el-input>
      <el-input size="mini" disabled><label slot="prepend">手机&#12288&#12288</label></el-input>
      <el-input size="mini"><label slot="prepend">新卡号&#12288</label></el-input>
      <el-input size="mini"><label slot="prepend">老卡密码</label></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog4=false">取 消</el-button>
        <el-button type="primary" @click="enter()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="卡取现" :visible.sync="dialog5" :close-on-click-modal="false" width="30%">
      <el-select size="mini" v-model="dialog5_c_select" placeholder="会员查询">
        <el-option v-for="(value, key) in dialog5_select" :key="key" :label="value" :value="value"></el-option>
      </el-select>
      <el-input size="mini" disabled><label slot="prepend">卡号&#12288&#12288</label></el-input>
      <el-input size="mini" disabled><label slot="prepend">姓名&#12288&#12288</label></el-input>
      <el-input size="mini" disabled><label slot="prepend">手机&#12288&#12288</label></el-input>
      <el-input size="mini" disabled><label slot="prepend">余额&#12288&#12288</label></el-input>
      <el-input size="mini"><label slot="prepend">现金余额</label></el-input>
      <el-input size="mini" disabled><label slot="prepend">剩余余额</label></el-input>
      <el-input size="mini"><label slot="prepend">密码&#12288&#12288</label></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog5=false">取 消</el-button>
        <el-button type="primary" @click="enter()">确 定</el-button>
      </div>
    </el-dialog> -->
  </div>
</template>

<script>
import mytable from "./../mytable.vue"
export default{
  name: "Member_huiyuangongju",
  components:{
    mytable
  },
  data(){
    return{
      pickerOptions: {
        // disabledDate(time){return time.getTime() > Date.now();},
        shortcuts: [{text: '今天',onClick(picker) {picker.$emit('pick', new Date());}},
        {text: '昨天',onClick(picker){const date = new Date();date.setTime(date.getTime() - 3600 * 1000 * 24);picker.$emit('pick', date);}},
        {text: '一周前',onClick(picker){const date = new Date();date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);picker.$emit('pick', date);}}]
      },
      list: [
        {key: 1, name: "重置密码", bname: "报表", url: "Member_huiyuangongjuOne", img: require("../../assets/img/member_password.png")},
        {key: 2, name: "变更卡类型", bname: "报表", url: "Member_huiyuangongjuOne", img: require("../../assets/img/member_change.png")},
        {key: 3, name: "修改卡到期时间", bname: "报表", url: "Member_huiyuangongjuOne", img: require("../../assets/img/member_time.png")},
        // {key: 4, ename: "卡冻结", bname: "报表", url: "Member_huiyuangongjuOne", img: require("../../assets/img/member_frozen.png")},
        // {key: 5, ename: "更换卡号", bname: "报表", url: "Member_huiyuangongjuOne", img: require("../../assets/img/member_change_card_number.png")},
        // {key: 6, ename: "卡取现", bname: "报表", url: "Member_huiyuangongjuOne", img: require("../../assets/img/member_take_money.png")}
      ],
      mouseClass: false,
      dialog: false,
      dialog1: false,
      dialog2: false,
      dialog3: false,
      dialog4: false,
      dialog5: false,
      tableTitle: [
        {key: "name", title: "会员姓名", min_width: "100"},
        {key: "card_no", title: "卡号", min_width: "100"},
        {key: "license_plate_number", title: "车牌", min_width: "100"},
        {key: "tel", title: "手机", min_width: "100"},
      ],
      tableData: [],
      operation: false,
      //数据
      customer_name: "",
      card_id: "",
      card_no: "",
      name: "",
      tel: "",

      dialog_a: "",
      dialog_b: "",

      old_card: "",
      dialog1_a: "",
      dialog1_a_id: "",
      dialog1_a_select: "",
      dialog1_b: "",
      dialog1_b_id: "",
      dialog1_b_select: "",
      dialog1_c: "",

      dialog2_a: "",
      dialog2_b: ""
    }
  },
  mounted() {
    this.$axios.all([
      this.$api.HttpPost("/StoreAdmin/Integral/getMemberCardSelect"),
      this.$api.HttpPost("/StoreAdmin/Common/getEmployeeSelect")
    ]).then(v => {
        this.dialog1_a_select = v[0].data.data
         this.dialog1_b_select = v[1].data
    })
    
  },
  methods:{
    close() {
      this.customer_name = ""
      this.card_no = ""
      this.name = ""
      this.tel = ""
    },
    search() {
      this.customer_name ? this.$refs.dropdown_1.show() : this.$refs.dropdown_1.hide()
      this.handlePageChange({
        search: this.customer_name
      })
    },
    visibleChange(val) {
      if(val && this.tableData.length == 0) {
        this.handlePageChange()
      }
    },
    card: function(key){
      switch(key){
        case 1:{
          // this.init();
          this.dialog = true;
          break;
        }
        case 2:{
          // this.init();
          this.dialog1 = true;
          break;
        }
        case 3:{
          // this.init();
          this.dialog2 = true;
          break;
        }
        case 4:{
          this.dialog3 = true;
          break;
        }
        case 5:{
          this.dialog4 = true;
          break;
        }
        case 6:{
          this.dialog5 = true;
          break;
        }
      }
    },
    seeForm: function(key, url){
      this.$router.push({name: url, query: {key: key}});
    },
    init: function(){
      this.$axios.post(this.$store.state.domainName_http+"/StoreAdmin/Customer/getMembershipCardSelect", {}, {withCredentials: true})
      .then((data)=>{
        if(data.data.code === 200){
          this.tableData = data.data.data.data;
          for(let i in this.tableData){
            this.tableData[i].license_plate_number = this.tableData[i].plate_id + this.tableData[i].license_plate_number;
          }
        }
        else{
          this.$message.error(data.data.msg);
        }
      })
      .catch((data)=>{
        this.$message.error("抱歉网络错误,请检查网络后重试！");
      })
    },
    enter: function(){
      if(this.dialog){
        this.$axios.post(this.$store.state.domainName_http+"/StoreAdmin/Customer/updateCardPassword",
        {id: this.card_id,
        password: this.dialog_a,
        confirm_password: this.dialog_b}, {withCredentials: true})
        .then((data)=>{
          if(data.data.code === 200){
            this.$message.success(data.data.msg);
          }
          else{
            this.$message.error(data.data.msg);
          }
        })
        .catch((data)=>{
          this.$message.error("抱歉网络错误,请检查网络后重试！");
        })
        Object.assign(this.$data, this.$options.data());
        this.dialog = false;
      }
      else if(this.dialog1){
        this.$axios.post(this.$store.state.domainName_http+"/StoreAdmin/Customer/updateCardType",
        {id: this.card_id,
        card_id: this.dialog1_a_id,
        operation_staff_id: this.dialog1_b_id,
        remark: this.dialog1_c}, {withCredentials: true})
        .then((data)=>{
          if(data.data.code === 200){
            this.$message.success(data.data.msg);
          }
          else{
            this.$message.error(data.data.msg);
          }
        })
        .catch((data)=>{
          this.$message.error("抱歉网络错误,请检查网络后重试！");
        })
        Object.assign(this.$data, this.$options.data());
        this.dialog1 = false;
      }
      else if(this.dialog2){
        this.$axios.post(this.$store.state.domainName_http+"/StoreAdmin/Customer/updateCardValidityDate",
        {id: this.card_id,
        validity_date: this.dialog2_b}, {withCredentials: true})
        .then((data)=>{
          if(data.data.code === 200){
            this.$message.success(data.data.msg);
          }
          else{
            this.$message.error(data.data.msg);
          }
        })
        .catch((data)=>{
          this.$message.error("抱歉网络错误,请检查网络后重试！");
        })
        Object.assign(this.$data, this.$options.data());
        this.dialog2 = false;
      }
    },
    dialog1_a_change: function(s){
      this.dialog1_a_id = s;
    },
    dialog1_b_change: function(s){
      this.dialog1_b_id = s;
    },
    cell_click: function(row, column){
      this.customer_name = row.row.name;
      this.card_id = row.row.id;
      this.card_no = row.row.card_no;
      this.name = row.row.name;
      this.tel = row.row.tel;
      this.old_card = row.row.card_name
    },
    resData: function(data){
      this.tableData = data;
      for(let i in this.tableData){
        this.tableData[i].license_plate_number = this.tableData[i].plate_id + this.tableData[i].license_plate_number;
      }
    },
    handlePageChange: function(data){
      if(data === undefined){data = {}}
      this.$refs.mytable.findList(this.$store.state.domainName_http+"/StoreAdmin/Customer/getMembershipCardSelect", data);
    }
  }
}
</script>

<style scoped>
#Member_huiyuangongju{
  margin-top: 10%;
}
.mouse-class{
  border: 1px solid #99ffff;
  cursor: pointer;
}
.el-divider{
  width: 60%;
}
.el-dialog .el-select{
  width: 100%;
}
</style>
