<template>
  <div id="two">
    <div class="pb-nav">
		<el-button size="mini" :type="tp===1?'primary':''" @click="search(1)">今日</el-button>
		<el-button size="mini" :type="tp===2?'primary':''" @click="search(2)">今月</el-button>
		<el-button size="mini" :type="tp===3?'primary':''" @click="search(3)">今年</el-button>
    <el-select size="mini" v-model="store_name" placeholder="所属门店" @change="store_change">
      <el-option v-for="value in store_select" :key="value.sid" :label="value.store_name" :value="value.sid"></el-option>
    </el-select>
    <el-button size="mini" type="primary" @click="search()">查询</el-button>
    </div>

    <el-row :gutter="10">
      <el-col :span="8">
        <vxe-table size="mini" height="200" align="center" highlight-hover-row highlight-current-row border
        :data="tableData1"
        :loading="loading">
        <vxe-table-column :title="'实收金额(元)'+total1">
          <vxe-table-column type="seq" title="序号" width="50"></vxe-table-column>
          <vxe-table-column field="name" title="Name" min-width="100"></vxe-table-column>
          <vxe-table-column field="price" title="Money" min-width="100"></vxe-table-column>
          <vxe-table-column field="pre" title="%" min-width="100"></vxe-table-column>
        </vxe-table-column>
        </vxe-table>
      </el-col>
      <el-col :span="8">
        <vxe-table size="mini" height="200" align="center" highlight-hover-row highlight-current-row border
        :data="tableData2"
        :loading="loading">
        <vxe-table-column :title="'实收支付(元)'+total2">
          <vxe-table-column type="seq" title="序号" width="50"></vxe-table-column>
          <vxe-table-column field="name" title="Name" min-width="100"></vxe-table-column>
          <vxe-table-column field="price" title="Money" min-width="100"></vxe-table-column>
          <vxe-table-column field="pre" title="%" min-width="100"></vxe-table-column>
        </vxe-table-column>
        </vxe-table>
      </el-col>
      <el-col :span="8">
        <vxe-table size="mini" height="200" align="center" highlight-hover-row highlight-current-row border
        :data="tableData3"
        :loading="loading">
        <vxe-table-column :title="'非实收支付(元)'+total3">
          <vxe-table-column type="seq" title="序号" width="50"></vxe-table-column>
          <vxe-table-column field="name" title="Name" min-width="100"></vxe-table-column>
          <vxe-table-column field="price" title="Money" min-width="100"></vxe-table-column>
          <vxe-table-column field="pre" title="%" min-width="100"></vxe-table-column>
        </vxe-table-column>
        </vxe-table>
      </el-col>
    </el-row>

    <vxe-table size="mini" align="center" highlight-hover-row highlight-current-row border
    :data="tableData"
    :loading="loading">
      <vxe-table-column field="riqi" title="日期" min-width="100"></vxe-table-column>
      <vxe-table-column field="shishoujine" title="实收金额" min-width="100"></vxe-table-column>
        <vxe-table-column title="实收类型">
          <vxe-table-column field="huiyuanshouka" title="会员售卡"></vxe-table-column>
          <vxe-table-column field="jicishouka" title="计次售卡"></vxe-table-column>
          <vxe-table-column field="gongdanxianjie" title="工单现结"></vxe-table-column>
        </vxe-table-column>
        <vxe-table-column title="收款方式">
          <vxe-table-column field="zhifuxianjie" title="现结支付"></vxe-table-column>
          <vxe-table-column field="yinlian" title="银联支付"></vxe-table-column>
          <vxe-table-column field="weixin" title="微信支付"></vxe-table-column>
          <vxe-table-column field="zhifubao" title="支付宝支付"></vxe-table-column>
        </vxe-table-column>
    </vxe-table>
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
      tableData: [],
      tableData1: [
        {name: "会员卡充值", price: "", pre: ""},
        {name: "会员卡续费", price: "", pre: ""},
        {name: "计次卡充值", price: "", pre: ""},
        {name: "计次卡续费", price: "", pre: ""},
        {name: "工单现结", price: "", pre: ""}
      ],
      total1: 0,
      tableData2: [
        {name: "现金", price: "", pre: ""},
        {name: "银联", price: "", pre: ""},
        {name: "微信支付", price: "", pre: ""},
        {name: "支付宝支付", price: "", pre: ""}
      ],
      total2: 0,
      tableData3: [
        {name: "储值卡扣", price: "", pre: ""},
        {name: "计次卡扣", price: "", pre: ""}
      ],
      total3 : 0,
      loading: false,
      tp: 2,
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
    store_change(s){
      this.store_name = s;
    },
    search(s){
      if(s !== undefined){
        this.tp = s;
      }
      this.init({sid: this.store_name, time_type: this.tp});
    },
    init(s){
      this.loading = true;
      this.$axios.all([
        this.$api.HttpPost("/StoreAdmin/Financial/getSumReceivedList", s),
        this.$api.HttpPost("/StoreAdmin/Financial/getNonPaidInList", s),
        this.$api.HttpPost("/StoreAdmin/Financial/getReceivedList", s)
      ])
      .then((data)=>{
        this.loading = false;
        this.tableData1[0].price = data[0].data.data.membershipCardRechargeSum;
        this.tableData1[1].price = data[0].data.data.membershipCardRenewalSum;
        this.tableData1[2].price = data[0].data.data.packageRechargeSum;
        this.tableData1[3].price = data[0].data.data.packageRenewalSum;
        this.tableData1[4].price = data[0].data.data.orderSum;
        for(let i in this.tableData1){
          this.total1 = this.total1 + Number(this.tableData1[i].price);
        }
        this.tableData1[0].pre = (data[0].data.data.membershipCardRechargeSum/this.total1*100).toFixed(2) + "%";
        this.tableData1[1].pre = (data[0].data.data.membershipCardRenewalSum/this.total1*100).toFixed(2) + "%";
        this.tableData1[2].pre = (data[0].data.data.packageRechargeSum/this.total1*100).toFixed(2) + "%";
        this.tableData1[3].pre = (data[0].data.data.packageRenewalSum/this.total1*100).toFixed(2) + "%";
        this.tableData1[4].pre = (data[0].data.data.orderSum/this.total1*100).toFixed(2) + "%";
        //**//
        this.tableData2[0].price = data[0].data.data.all_cash_sum;
        this.tableData2[1].price = data[0].data.data.all_unionpay_sum;
        this.tableData2[2].price = data[0].data.data.all_wechat_pay_sum;
        this.tableData2[3].price = data[0].data.data.all_alipay_sum;
        for(let i in this.tableData2){
          this.total2 = this.total2 + Number(this.tableData2[i].price);
        }
        this.tableData2[0].pre = (data[0].data.data.all_cash_sum/this.total2*100).toFixed(2) + "%";
        this.tableData2[1].pre = (data[0].data.data.all_unionpay_sum/this.total2*100).toFixed(2) + "%";
        this.tableData2[2].pre = (data[0].data.data.all_wechat_pay_sum/this.total2*100).toFixed(2) + "%";
        this.tableData2[3].pre = (data[0].data.data.all_alipay_sum/this.total2*100).toFixed(2) + "%";
        //**//
        this.tableData3[0].price = data[1].data.data.all_pay_card_sum;
        this.tableData3[1].price = data[1].data.data.all_package_sum;
        for(let i in this.tableData3){
          this.total3 = this.total3 + Number(this.tableData3[i].price);
        }
        this.tableData3[0].pre = (data[1].data.data.all_pay_card_sum/this.total3*100).toFixed(2) + "%";
        this.tableData3[1].pre = (data[1].data.data.all_package_sum/this.total3*100).toFixed(2) + "%";
        //**//
        this.tableData = data[2].data.data;
      })
      .catch((data)=>{
        this.loading = false;
      })
    }
  }
}
</script>

<style scoped>
#two{
  margin: 1rem 5rem;
}
/deep/.vxe-table{
  margin: 10px 0;
  box-shadow: 5px 5px 20px #dcdfe6;
}
</style>
