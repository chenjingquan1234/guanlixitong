<template>
  <div id="three">
    <div class="pb-nav">
      <el-button size="mini" @click="use()">使用优惠券</el-button>
      <el-input style="width: 25rem;" size="mini" placeholder="可按姓名,昵称,券名,卡号,手机等进行搜索" v-model="key_name"><label slot="prepend">关键字</label></el-input>
      <el-select size="mini" v-model="card_name" clearable placeholder="卡状态" @change="card_change">
        <el-option v-for="value in card_select" :key="value.id" :label="value.card_name" :value="value.id"></el-option>
      </el-select>
      <el-select size="mini" v-model="receive_name" clearable placeholder="领取状态" @change="receive_change">
        <el-option v-for="value in receive_select" :key="value.sid" :label="value.receive_name" :value="value.sid"></el-option>
      </el-select>
      <el-select size="mini" v-model="store_name" clearable placeholder="所属门店" @change="store_change">
        <el-option v-for="value in store_select" :key="value.sid" :label="value.store_name" :value="value.sid"></el-option>
      </el-select>
      <el-button size="mini" type="primary" @click="search()">查询</el-button>
    </div>
    <mytable :tableTitle="tableTitle" :tableData="tableData" :operation="operation" :check_box="check_box"
    @resData="resData" @handlePageChange="handlePageChange" ref="mytable"></mytable>

    <Dialog title="使用优惠券" width="30%" @enter="enter" ref="dialog">
      <template>
        <el-input size="mini" v-model="dialog_a"><label slot="prepend">使用数量</label><label slot="append">张</label></el-input>
        <el-input size="mini" v-model="dialog_b"><label slot="prepend">消费金额</label><label slot="append">元</label></el-input>
        <el-input size="mini" type="textarea" placeholder="备注" v-model="dialog_c"></el-input>
      </template>
    </Dialog>
  </div>
</template>

<script>
import mytable from "./../../mytable.vue"
import Dialog from "./../Dialog.vue"
export default{
	name: "three",
  components:{
    mytable,
    Dialog
  },
	data(){
		return{
      tableTitle: [
        {key: "name", title: "姓名", min_width: "100"},
        {key: "card_no", title: "卡号", min_width: "100"},
        {key: "tel", title: "手机", min_width: "100"},
        {key: "wechat_name", title: "微信昵称", min_width: "100"},
        {key: "is_follow", title: "是否关注", min_width: "100"},
        {key: "get_status", title: "领取状态", min_width: "100"},
        {key: "coupons_name", title: "优惠券名称", min_width: "100"},
        {key: "send_quantity", title: "优惠券数量", min_width: "100"},
        {key: "amount", title: "优惠券面值", min_width: "100"},
        {key: "num", title: "优惠券总额", min_width: "100"},
        {key: "coupons_sn", title: "券号", min_width: "100"},
        {key: "validity", title: "有效期", min_width: "100"},
        {key: "store_name", title: "门店", min_width: "100"}
      ],
      tableData: [],
      operation: false,
      check_box: false,
      //
      key_name: "",
      card_name: "",
      card_select: [
        {id: 3, card_name: "过期"},
        {id: 1, card_name: "有效"},
        {id: 2, card_name: "已用完"}
      ],
      receive_name: "",
      receive_select: [
        {id: 0, receive_name: "未领取"},
        {id: 1, receive_name: "已领取"}
      ],
      store_name: "",
      dialog_a: "",
      dialog_b: "",
      dialog_c: "",
		}
	},
  props:{
    "store_select": {
      type: Array,
      default: ()=>{}
    }
  },
  methods:{
    use(){
      let num = this.$refs.mytable.$refs.xTable.getRadioRow();
      if(num === null){return this.$message.warning("请选择一项")}
      this.$refs.dialog.init();
    },
    card_change(s){
      this.card_name = s;
    },
    receive_change(s){
      this.receive_name = s;
    },
    store_change(s){
      this.store_name = s;
    },
    search(){
      this.handlePageChange();
    },
    enter(){
      let num = this.$refs.mytable.$refs.xTable.getRadioRow();
      this.$api.HttpPost("/StoreAdmin/Coupons/useCouponsByPC",
      {id: num.id,
      quantity: this.dialog_a,
      amount: this.dialog_b,
      remark: this.dialog_c})
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
      for(let i in this.tableData){
        if(this.tableData[i].get_status == 0){
          this.tableData[i].get_status = "未领取";
        }
        else if(this.tableData[i].get_status == 1){
          this.tableData[i].get_status = "已领取";
        }
        this.tableData[i].num = this.tableData[i].send_quantity * this.tableData[i].amount;
      }
    },
    handlePageChange(){
      let data = {search: this.key_name, status: this.card_name, get_status: this.receive_name, sid: this.store_name};
      this.$refs.mytable.findList(this.$api.yuming + "/StoreAdmin/Coupons/getSendCouponsRecords", data);
    }
  }
}
</script>

<style scoped>
</style>
