<template>
  <div id="two">
    <div class="pb-nav">
      <el-button size="mini" @click="send()">微信发送优惠券</el-button>
      <el-input style="width: 20rem;" size="mini" placeholder="可按卡号,姓名,电话,微信昵称等进行搜索" v-model="key_name"><label slot="prepend">关键字</label></el-input>
      <el-select size="mini" v-model="card_name" clearable placeholder="卡类型" @change="card_change">
        <el-option v-for="value in card_select" :key="value.card_id" :label="value.card_name" :value="value.card_id"></el-option>
      </el-select>
      <el-select size="mini" v-model="follow_name" clearable placeholder="是否关注" @change="follow_change">
        <el-option v-for="value in follow_select" :key="value.id" :label="value.follow_name" :value="value.id"></el-option>
      </el-select>
      <el-select size="mini" v-model="sign_name" clearable placeholder="是否登录" @change="sign_change">
        <el-option v-for="value in sign_select" :key="value.id" :label="value.sign_name" :value="value.id"></el-option>
      </el-select>
      <el-select size="mini" v-model="collar_name" clearable placeholder="是否领卡" @change="collar_change">
        <el-option v-for="value in collar_select" :key="value.id" :label="value.collar_name" :value="value.id"></el-option>
      </el-select>
      <el-select size="mini" v-model="store_name" clearable placeholder="所属门店" @change="store_change">
        <el-option v-for="value in store_select" :key="value.sid" :label="value.store_name" :value="value.sid"></el-option>
      </el-select>
      <el-button size="mini" type="primary" @click="search()">查询</el-button>
    </div>
    <mytable :tableTitle="tableTitle" :tableData="tableData" :operation="operation"
    @resData="resData" @handlePageChange="handlePageChange" ref="mytable"></mytable>

    <Dialog title="微信发送优惠券" width="30%" @enter="enter" ref="dialog">
      <template>
        <el-input size="mini" v-model="dialog_a" @input="kh_input">
          <label slot="prepend">积客活动名称</label>
          <el-dropdown slot="append" trigger="click" @visible-change="kh_Search" ref="kh_ref">
            <label class="el-icon-arrow-down el-icon--right"></label>
            <el-dropdown-menu slot="dropdown"><mytable :height="400" :tableTitle="kh_tableTitle" :tableData="kh_tableData" :check_box="check_box" :operation="operation"
            @resData="kh_resData" @handlePageChange="kh_handlePageChange" @cell_click="kh_cell_click" ref="kh_mytable"></mytable></el-dropdown-menu>
          </el-dropdown>
        </el-input>
        <el-input size="mini" v-model="dialog_b" disabled><label slot="prepend">积客活动金额</label></el-input>
        <el-input size="mini" v-model="dialog_c"><label slot="prepend">可使用数量&#12288</label></el-input>
        <el-input size="mini" v-model="dialog_d" disabled><label slot="prepend">不能重复领取</label></el-input>
        <el-date-picker style="width: 100%;" v-model="s_time" size="mini" type="datetimerange" disabled :picker-options="s_pickerOptions"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right">
        </el-date-picker>
        <el-input size="mini" type="textarea" placeholder="备注" v-model="dialog_e"></el-input>
      </template>
    </Dialog>
  </div>
</template>

<script>
import mytable from "./../../mytable.vue"
import Dialog from "./../Dialog.vue"
export default{
	name: "two",
  components:{
    mytable,
    Dialog
  },
	data(){
		return{
      tableTitle: [
        {key: "total_number", title: "优惠券数量", min_width: "100"},
        {key: "total_amount", title: "优惠券总额", min_width: "100"},
        {key: "name", title: "姓名", min_width: "100"},
        {key: "card_name", title: "卡类型", min_width: "100"},
        {key: "login_type", title: "登录状态", min_width: "100"},
        {key: "wechat_name", title: "微信昵称", min_width: "100"},
        {key: "card_balance", title: "卡内余额", min_width: "100"},
        {key: "spending", title: "消费总额", min_width: "100"},
        {key: "times", title: "总到店次数", min_width: "100"},
        {key: "before_time", title: "距今日几天未到店", min_width: "100"},
        {key: "first_time", title: "首次到店时间", min_width: "100"},
        {key: "store_name", title: "客户门店", min_width: "100"}
      ],
      tableData: [],
      kh_tableTitle: [
        {key: "coupons_name", title: "积客活动名称", min_width: "100"},
        {key: "amount", title: "面值", min_width: "100"},
        {key: "validity_day", title: "有效期", min_width: "100"},
        {key: "quantity", title: "可使用数", min_width: "100"},
        {key: "x", title: "可分享数", min_width: "100"},
        {key: "is_repeat", title: "不可重复领取", min_width: "100"}
      ],
      kh_tableData: [],
      operation: false,
      check_box: false,
      //
      key_name: "",
      card_name: "",
      card_select: [],
      follow_name: "",
      follow_select: [
        {id: 0, follow_name: "未关注"},
        {id: 1, follow_name: "已关注"},
        {id: 2, follow_name: "已取消关注"}
      ],
      sign_name: "",
      sign_select: [
        {id: 0, sign_name: "已登录"},
        {id: 1, sign_name: "未登录"}
      ],
      collar_name: "",
      collar_select: [
        {id: 0, collar_name: "已领卡"},
        {id: 1, collar_name: "未领卡"}
      ],
      store_name: "",
      kh_id: "",
      dialog_a: "",
      dialog_b: "",
      dialog_c: "",
      dialog_d: "",
      dialog_e: "",
      s_time: ["", ""],
      s_pickerOptions: {
        shortcuts: [{text: '最近一周',onClick(picker){const end = new Date();const start = new Date();start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);picker.$emit('pick', [start, end]);}},
        {text: '最近一个月',onClick(picker) {const end = new Date();const start = new Date();start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);picker.$emit('pick', [start, end]);}},
        {text: '最近三个月',onClick(picker) {const end = new Date();const start = new Date();start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);picker.$emit('pick', [start, end]);}}]
      },
		}
	},
  props:{
    "store_select": {
      type: Array,
      default: ()=>{}
    }
  },
  methods:{
    send(){
      if(this.$refs.mytable.$refs.xTable.getSelectRecords().length == 0){return this.$message.warning("请选择一项")}
      this.$refs.dialog.init();
    },
    card_change(s){
      this.card_name = s;
    },
    follow_change(s){
      this.follow_name = s;
    },
    sign_change(s){
      this.sign_name = s;
    },
    collar_change(s){
      this.collar_name = s;
    },
    store_change(s){
      this.store_name = s;
    },
    search(){
      this.handlePageChange()
    },
    enter(){
      let id = [];
      for(let i in this.$refs.mytable.$refs.xTable.getSelectRecords()){
        id.splice(0, 0, this.$refs.mytable.$refs.xTable.getSelectRecords()[i].member_id);
      }
      this.$api.HttpPost("/StoreAdmin/Coupons/sendCoupons",
      {member_data: id,
      coupons_id: this.kh_id,
      quantity: this.dialog_c,
      remark: this.dialog_e,
      begin_time: this.s_time[0],
      end_time: this.s_time[1]})
      .then((data)=>{
        if(data.data.code === 200){
          this.$refs.dialog.cancel();
          this.$message.success(data.data.msg);
        }
        else{
          this.$message.error(data.data.msg);
        }
      })
    },
    resData(data){
      this.tableData = data;
    },
    handlePageChange(){
      let data = {sid: this.store_name, search: this.key_name};
      this.$refs.mytable.findList(this.$api.yuming + "/StoreAdmin/Coupons/getMemberList", data);
    },
    kh_Search(s){
      if(s){
        this.$nextTick(()=>{
          this.kh_handlePageChange();
        })
      }
    },
    kh_input(s){
      this.$refs.kh_ref.show();
      this.kh_Search(true);
    },
    kh_cell_click(row){
      this.dialog_a = row.row.coupons_name;
      this.dialog_b = row.row.amount;
      this.dialog_c = row.row.quantity;
      this.dialog_d = row.row.is_repeat;
      this.dialog_e = row.row.remark;
      this.kh_id = row.row.coupons_id;
    },
    kh_resData(data){
      this.kh_tableData = data;
      for(let i in this.kh_tableData){
        if(this.kh_tableData[i].is_repeat == 0){
          this.kh_tableData[i].is_repeat = "否";
        }
        else if(this.kh_tableData[i].is_repeat == 1){
          this.kh_tableData[i].is_repeat = "是";
        }
        this.tableData[i].num = this.tableData[i].send_quantity * this.tableData[i].amount;
      }
    },
    kh_handlePageChange(){
      let data = {search: this.dialog_a};
      this.$refs.kh_mytable.findList(this.$api.yuming + "/StoreAdmin/Coupons/getCouponsList", data);
    }
  },
  mounted(){
    this.$api.HttpPost("/StoreAdmin/Coupons/getCardTypeSelect", {})
    .then((data)=>{
      this.card_select = data.data.data;
    })
  }
}
</script>

<style scoped>
</style>
