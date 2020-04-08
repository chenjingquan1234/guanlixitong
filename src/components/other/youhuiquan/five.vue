<template>
  <div id="five">
    <div class="pb-nav">
      <el-input style="width: 20rem;" size="mini" placeholder="关键字搜索" v-model="key_name"><label slot="prepend">关键字</label></el-input>
      <el-select size="mini" v-model="people_name" clearable placeholder="发送员工" @change="people_change">
        <el-option v-for="value in people_select" :key="value.id" :label="value.name" :value="value.id"></el-option>
      </el-select>
      <el-select size="mini" v-model="send_name" clearable placeholder="发送方式" @change="send_change">
        <el-option v-for="value in send_select" :key="value.send_name" :label="value.send_name" :value="value.send_name"></el-option>
      </el-select>
      <el-select size="mini" v-model="store_name" clearable placeholder="所属门店" @change="store_change">
        <el-option v-for="value in store_select" :key="value.sid" :label="value.store_name" :value="value.sid"></el-option>
      </el-select>
      <el-button size="mini" type="primary" @click="search()">查询</el-button>
    </div>
    <mytable :tableTitle="tableTitle" :tableData="tableData" :operation="operation" :check_box="check_box"
    @handlePageChange="handlePageChange" ref="mytable"></mytable>
  </div>
</template>

<script>
import mytable from "./../../mytable.vue"
export default{
	name: "five",
  components:{
    mytable
  },
	data(){
		return{
      tableTitle: [
        {key: "create_time", title: "发送日期", min_width: "100"},
        {key: "coupons_name", title: "优惠券名称", min_width: "100"},
        {key: "amount", title: "优惠券价值", min_width: "100"},
        {key: "count", title: "共发送人数", min_width: "100"}
      ],
      tableData: [],
      operation: false,
      check_box: false,
      //
      key_name: "",
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
      state_select: [
        {id: 0, state_name: "停用"},
        {id: 1, state_name: "启用"}
      ],
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
    search(){
      this.handlePageChange();
    },
    people_change(s){
      this.people_name = s;
    },
    send_change(s){
      this.send_name = s;
    },
    store_change(s){
      this.store_name = s;
    },
    resData(data){
      this.tableData = data;
    },
    handlePageChange(){
      let data = {search: this.key_name, eid: this.people_name, type: this.send_name, sid: this.store_name};
      this.$refs.mytable.findList(this.$api.yuming + "/storeadmin/coupons/getCouponsSend", data);
    }
  }
}
</script>

<style scoped>
</style>
