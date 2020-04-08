<template>
  <div id="four">
    <el-tabs v-model="activeName" @tab-click="tab_click()">
      <el-tab-pane label="套餐信息" name="one"><mytable :tableTitle="tableTitle1" :tableData="tableData1" :operation="operation"
      @resData="resData" @handlePageChange="handlePageChange" ref="mytable1"></mytable></el-tab-pane>
      <el-tab-pane label="消费查询" name="two"><mytable :tableTitle="tableTitle2" :tableData="tableData2" :operation="operation"
      @resData="resData" @handlePageChange="handlePageChange" ref="mytable2"></mytable></el-tab-pane>
      <!-- <el-tab-pane label="办卡记录" name="three" disabled><mytable :tableTitle="tableTitle3" :tableData="tableData3" :operation="operation"
      @resData="resData" @handlePageChange="handlePageChange" ref="mytable3"></mytable></el-tab-pane>
      <el-tab-pane label="充值记录" name="four" disabled><mytable :tableTitle="tableTitle4" :tableData="tableData4" :operation="operation"
      @resData="resData" @handlePageChange="handlePageChange" ref="mytable4"></mytable></el-tab-pane> -->
    </el-tabs>
  </div>
</template>

<script>
import mytable from "./../../mytable.vue"
export default{
  name: "huiyuanziliao",
  components:{
    mytable
  },
  data(){
    return{
      activeName: "one",
      tableTitle1: [
        {key: "car", title: "车牌", min_width: "100"},
        {key: "name", title: "姓名", min_width: "100"},
        {key: "card_no", title: "卡号", min_width: "100"},
        {key: "service_item_name", title: "套餐项目", min_width: "100"},
        {key: "total_times", title: "总次数", min_width: "100"},
        {key: "", title: "消费", min_width: "100"},
        {key: "remaining_times", title: "剩余", min_width: "100"},
        {key: "", title: "是否共享", min_width: "100"},
      ],
      tableData1: [],
      tableTitle2: [
        {key: "ename", title: "服务顾问", min_width: "100"},
        {key: "order_sn", title: "单号", min_width: "100"},
        {key: "card_no", title: "卡号", min_width: "100"},
        {key: "car", title: "车牌", min_width: "100"},
        {key: "p_chexingmingcheng", title: "品牌车型", min_width: "100"},
        {key: "name", title: "客户", min_width: "100"},
        {key: "tel", title: "手机", min_width: "100"},
        {key: "category_name", title: "维修类别", min_width: "100"},
        {key: "mileage", title: "本次里程", min_width: "100"},
        {key: "amount", title: "应收", min_width: "100"},
        {key: "cash", title: "现金", min_width: "100"},
        {key: "unionpay", title: "银联", min_width: "100"},
        {key: "credit", title: "挂账", min_width: "100"},
        {key: "pay_card", title: "卡扣金额", min_width: "100"},
        {key: "preferential_amount", title: "优惠金额", min_width: "100"},
        {key: "mileage", title: "本次里程", min_width: "100"},
        {key: "wechat_pay", title: "微信支付", min_width: "100"},
        {key: "intergal_pay", title: "积分抵用金额", min_width: "100"},
        {key: "alipay", title: "支付宝支付", min_width: "100"},
        {key: "remark", title: "备注", min_width: "100"},
        {key: "create_time", title: "创建时间", min_width: "100"},
      ],
      tableData2: [],
      tableTitle3: [
        {key: "", title: "车牌", min_width: "100"},
        {key: "", title: "客户", min_width: "100"},
        {key: "", title: "卡号", min_width: "100"},
        {key: "", title: "售卡类型", min_width: "100"},
        {key: "", title: "卡类型", min_width: "100"},
        {key: "", title: "充值金额", min_width: "100"},
        {key: "", title: "套餐售价", min_width: "100"},
        {key: "", title: "赠送金额", min_width: "100"},
        {key: "", title: "优惠金额", min_width: "100"},
        {key: "", title: "现金", min_width: "100"},
        {key: "", title: "刷卡", min_width: "100"},
        {key: "", title: "扣款卡号", min_width: "100"},
        {key: "", title: "卡扣", min_width: "100"},
        {key: "", title: "挂账", min_width: "100"},
        {key: "", title: "微信支付", min_width: "100"},
        {key: "", title: "支付宝支付", min_width: "100"},
        {key: "", title: "办卡时间", min_width: "100"},
        {key: "", title: "提成人员", min_width: "100"},
        {key: "", title: "备注", min_width: "100"},
        {key: "", title: "操作人", min_width: "100"}
      ],
      tableData3: [],
      tableTitle4: [
        {key: "", title: "车牌", min_width: "100"},
        {key: "", title: "客户", min_width: "100"},
        {key: "", title: "卡号", min_width: "100"},
        {key: "", title: "售卡类型", min_width: "100"},
        {key: "", title: "卡类型", min_width: "100"},
        {key: "", title: "充值金额", min_width: "100"},
        {key: "", title: "套餐售价", min_width: "100"},
        {key: "", title: "赠送金额", min_width: "100"},
        {key: "", title: "优惠金额", min_width: "100"},
        {key: "", title: "现金", min_width: "100"},
        {key: "", title: "刷卡", min_width: "100"},
        {key: "", title: "扣款卡号", min_width: "100"},
        {key: "", title: "卡扣", min_width: "100"},
        {key: "", title: "挂账", min_width: "100"},
        {key: "", title: "微信支付", min_width: "100"},
        {key: "", title: "支付宝支付", min_width: "100"},
        {key: "", title: "办卡时间", min_width: "100"},
        {key: "", title: "提成人员", min_width: "100"},
        {key: "", title: "备注", min_width: "100"},
        {key: "", title: "操作人", min_width: "100"}
      ],
      tableData4: [],
      operation: false
    }
  },
  props:{
    "id": {
      type: Number,
    },
  },
  methods:{
    tab_click: function(){
      this.handlePageChange();
    },
    resData: function(data){
      if(this.activeName === "one"){
        console.log(data)
        this.tableData1 = data;
        for(let i in this.tableData1){
          this.tableData1[i].car = this.tableData1[i].plate_id + this.tableData1[i].license_plate_number;
        }
      }
      else if(this.activeName === "two"){
        this.tableData2 = data;
        for(let i in this.tableData1){
          this.tableData1[i].car = this.tableData1[i].plate_id + this.tableData1[i].license_plate_number;
        }
      }
      else if(this.activeName === "three"){this.tableData3 = data;}
      else if(this.activeName === "four"){this.tableData4 = data;}
    },
    handlePageChange: function(data){
      if(data === undefined){data = {id: this.id}}
      if(this.activeName === "one") {data.is_tree = true}
      if(this.activeName === "one"){this.$refs.mytable1.findList(this.$store.state.domainName_http+"/StoreAdmin/Integral/getPackageDetail", data);}
      else if(this.activeName === "two"){this.$refs.mytable2.findList(this.$store.state.domainName_http+"/StoreAdmin/Integral/getConsumptionForm", data);}
    }
  }
}
</script>

<style scoped>
#four{
  margin: 1rem 5rem;
}
</style>
