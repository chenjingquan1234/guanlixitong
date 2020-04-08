<template>
  <div id="four">
    <div class="pb-nav">
      <el-button size="mini" type="info" icon="el-icon-download" @click="download()">打印</el-button>
      <el-input size="mini" style="width: 20rem;" v-model="key_name"><label slot="prepend">关键字</label></el-input>
      <el-select size="mini" v-model="store_name" placeholder="所属门店" @change="store_change">
        <el-option v-for="value in store_select" :key="value.sid" :label="value.store_name" :value="value.sid"></el-option>
      </el-select>
      <el-button size="mini" type="primary" @click="search()">查询</el-button>
    </div>

    <mytable :tableTitle="tableTitle" :tableData="tableData" :operation="operation" @resData="resData" @handlePageChange="handlePageChange" ref="mytable"></mytable>
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
        {key: "order_sn", title: "工单号", min_width: "100"},
        {key: "name", title: "姓名", min_width: "100"},
        {key: "chepai", title: "车牌", min_width: "100"},
        {key: "tel", title: "手机号", min_width: "100"},
        {key: "jieche_time", title: "接车时间", min_width: "100"},
        {key: "jiesuan_time", title: "结算时间", min_width: "100"},
        {key: "store_name", title: "消费门店", min_width: "100"},
        {key: "sc_name", title: "服务顾问", min_width: "100"},
        {key: "mileage", title: "本次里程", min_width: "100"},
        {key: "type_name", title: "客户来源", min_width: "100"},
        {key: "remark", title: "备注", min_width: "100"},
        {key: "card_no", title: "消费卡号", min_width: "100"},
        {key: "total_amount", title: "应结金额", min_width: "100"},
        {key: "preferential_amount", title: "优惠总额", min_width: "100"},
        {key: "intergal_pay", title: "积分优惠", min_width: "100"},
        {key: "credit", title: "挂账金额", min_width: "100"},
        {key: "pay_card", title: "卡扣金额", min_width: "100"},
        {key: "amount", title: "实收金额", min_width: "100"},
        {key: "cash", title: "现结", min_width: "100"},
        {key: "unionpay", title: "银联", min_width: "100"},
        {key: "wechat_pay", title: "微信支付", min_width: "100"},
        {key: "alipay", title: "支付宝支付", min_width: "100"},
      ],
      tableData: [],
      operation: false,
      //数据
      key_name: "",
      store_name: ""
    }
  },
  props:{
    "store_select": {
      type: Array,
      default: ()=>{}
    }
  },
  methods:{
    search(){
      this.handlePageChange();
    },
    download(){
      this.$refs.mytable.$refs.xTable.exportData({type: "csv"});
    },
    store_change(s){
      this.store_name = s;
    },
    resData(data){
      this.tableData = data;
    },
    handlePageChange(data){
      if(data === undefined){data = {search: this.key_name, sid: this.store_name}}
      this.$refs.mytable.findList(this.$api.yuming + "/storeadmin/Financial/getSettlementList", data);
    }
  }
}
</script>

<style scoped>
#four{
  margin: 1rem 5rem;
}
</style>
