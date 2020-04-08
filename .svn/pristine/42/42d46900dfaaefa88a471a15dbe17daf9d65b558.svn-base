<template>
  <div id="four">
    <div class="pb-nav">
      <el-input style="width: 20rem;" size="mini" placeholder="可按卡号,姓名,手机,昵称,券名,券号等进行搜索" v-model="key_name"><label slot="prepend">关键字</label></el-input>
      <el-select size="mini" v-model="bill_name" clearable placeholder="单据状态" @change="bill_change">
        <el-option v-for="value in bill_select" :key="value.id" :label="value.bill_name" :value="value.id"></el-option>
      </el-select>
      <el-select size="mini" v-model="people_name" clearable placeholder="发送员工" @change="people_change">
        <el-option v-for="value in people_select" :key="value.id" :label="value.name" :value="value.id"></el-option>
      </el-select>
      <el-select size="mini" v-model="send_name" clearable placeholder="发送方式" @change="send_change">
        <el-option v-for="value in send_select" :key="value.id" :label="value.send_name" :value="value.id"></el-option>
      </el-select>
      <el-select size="mini" v-model="sstore_name" clearable placeholder="发送门店" @change="sstore_change">
        <el-option v-for="value in store_select" :key="value.sid" :label="value.store_name" :value="value.sid"></el-option>
      </el-select>
      <el-select size="mini" v-model="store_name" clearable placeholder="消费门店" @change="store_change">
        <el-option v-for="value in store_select" :key="value.sid" :label="value.store_name" :value="value.sid"></el-option>
      </el-select>
      <el-button size="mini" type="primary" @click="search()">查询</el-button>
    </div>
    <mytable :tableTitle="tableTitle" :tableData="tableData" :operation="operation" :check_box="check_box"
    @resData="resData" @handlePageChange="handlePageChange" ref="mytable"></mytable>
  </div>
</template>

<script>
import mytable from "./../../mytable.vue"
export default{
	name: "four",
  components:{
    mytable
  },
	data(){
		return{
      tableTitle: [
        {key: "name", title: "姓名", min_width: "100"},
        {key: "wechat_name", title: "微信昵称", min_width: "100"},
        {key: "is_follow", title: "是否关注", min_width: "100"},
        {key: "order_sn", title: "单号", min_width: "100"},
        {key: "coupons_name", title: "优惠券名称", min_width: "100"},
        {key: "amount", title: "抵扣金额", min_width: "100"},
        {key: "remark", title: "备注", min_width: "100"},
        {key: "coupons_sn", title: "券号", min_width: "100"},
        {key: "create_time", title: "使用日期", min_width: "100"},
        {key: "ename", title: "发送员工", min_width: "100"},
        {key: "type", title: "发送方式", min_width: "100"},
        {key: "send_store", title: "发送门店", min_width: "100"},
        {key: "comsume_store", title: "消费门店", min_width: "100"}
      ],
      tableData: [],
      operation: false,
      check_box: false,
      //
      key_name: "",
      bill_name: "",
      bill_select: [
        {id: 0, bill_name: "作废"},
        {id: 1, bill_name: "正常"}
      ],
      people_name: "",
      send_name: "",
      send_select: [
        {id: 0, send_name: "电脑发券"},
        {id: 1, send_name: "扫码发券"},
        {id: 2, send_name: "手机发券"},
        {id: 3, send_name: "微信分享"},
        {id: 4, send_name: "定时发券"},
        {id: 5, send_name: "领卡赠送"}
      ],
      sstore_name: "",
      store_name: "",
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
    bill_change(s){
      this.bill_name = s;
    },
    people_change(s){
      this.people_name = s;
    },
    send_change(s){
      this.send_name = s;
    },
    sstore_change(s){
      this.sstore_name = s;
    },
    store_change(s){
      this.store_name = s;
    },
    search(){
      this.handlePageChange();
    },
    resData(data){
      this.tableData = data;
    },
    handlePageChange(){
      let data = {search: this.key_name, sid: this.store_name, eid: this.people_name};
      this.$refs.mytable.findList(this.$api.yuming + "/StoreAdmin/Coupons/getCouponsUsedRecord", data);
    }
  }
}
</script>

<style scoped>
</style>
