<template>
  <div id="one">
    <div class="pb-nav">
      <el-button size="mini" icon="el-icon-printer" @click="print()">打印</el-button>
      <el-date-picker size="mini"
        v-model="begin_date"
        align="right"
        type="datetime"
        placeholder="开始日期|时间"
        :picker-options="pickerOptions">
      </el-date-picker>
      <el-date-picker size="mini"
        v-model="over_date"
        align="right"
        type="datetime"
        placeholder="结束日期|时间"
        :picker-options="pickerOptions">
      </el-date-picker>
      <el-input size="mini" style="width: 25rem;" v-model="key_work"><label slot="prepend">关键字</label></el-input>
      <el-select size="mini" clearable v-model="type_value" :placeholder="key===0||key===2?'卡类型':'卡套餐'" @change="change_type">
        <el-option v-for="value in type_value_select" :key="value.id" :label="value.card_name" :value="value.id"></el-option>
      </el-select>
      <el-select size="mini" clearable v-model="store_value" placeholder="所属门店" @change="change_store">
        <el-option v-for="value in store_value_select" :key="value.sid" :label="value.store_name" :value="value.sid"></el-option>
      </el-select>
      <el-button size="mini" type="primary" @click="search()">查询</el-button>
    </div>
    <el-row :gutter="10">
      <el-col :span="r">
      <h3 v-if="key === 4">计次卡套餐续费记录</h3>
      <mytable id="mytable" @handlePageChange="handlePageChange"  @resData="resData" :tableTitle="key===1||key===3?tableTitle1:tableTitle2" :tableData="key===1||key===3?tableData1:tableData2" :operation="operation" ref="mytable"></mytable></el-col>
      <el-col v-if="key === 4" :span="12">
      <h3>计次卡项目续费记录</h3>
      <mytable   @handlePageChange="handlePageChange1" @resData="resData1" :tableTitle="tableTitle2" :tableData="tableData3" :operation="operation" ref="mytable1"></mytable></el-col>
    </el-row>
  </div>
</template>

<script>
import mytable from "./../../mytable.vue"
export default{
	name: "one",
  components:{
    mytable
  },
  data(){
    return{
      r: 24,
      key: 0,
      key_work: "",
      type_value: "",
      type_id: "",
      type_value_select: [],
      store_value: "",
      store_id: "",
      store_value_select: "",
      begin_date: new Date(2019, 0, 1, 0, 0, 0),
      over_date: new Date,
      pickerOptions: {
        disabledDate(time){return time.getTime() > Date.now();},
        shortcuts: [{text: '今天',onClick(picker) {picker.$emit('pick', new Date());}},
        {text: '昨天',onClick(picker){const date = new Date();date.setTime(date.getTime() - 3600 * 1000 * 24);picker.$emit('pick', date);}},
        {text: '一周前',onClick(picker){const date = new Date();date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);picker.$emit('pick', date);}}]
      },
      //表格配置
      tableTitle1: [
        {key: "name", title: "姓名", min_width: "100"},
        {key: "license_plate_number", title: "车牌号", min_width: "100"},
        {key: "card_no", title: "卡号", min_width: "100"},
        {key: "card_name", title: "卡类型", min_width: "100"},
        {key: "recharge", title: "充值金额", min_width: "100"},
        {key: "giving", title: "赠送金额", min_width: "100"},
        {key: "cash", title: "现金", min_width: "100"},
        {key: "unionpay", title: "刷卡", min_width: "100"},
        {key: "pay_card_no", title: "扣款卡号", min_width: "100"},
        {key: "pay_card", title: "卡扣", min_width: "100"},
        {key: "credit", title: "挂账", min_width: "100"},
        {key: "wechat_pay", title: "微信支付", min_width: "100"},
        {key: "alipay", title: "支付宝支付", min_width: "100"},
        {key: "create_time", title: "办卡时间", min_width: "100"},
        {key: "commission_staff_name", title: "提成人员", min_width: "100"},
        {key: "remark", title: "备注", min_width: "100"},
        {key: "operation_staff_name", title: "操作人", min_width: "100"}
      ],
      tableData1: [],
      tableTitle2: [
        {key: "name", title: "姓名", min_width: "100"},
        {key: "license_plate_number", title: "车牌号", min_width: "100"},
        {key: "card_no", title: "卡号", min_width: "100"},
        {key: "package_name", title: "卡套餐", min_width: "100"},
        // {key: "recharge", title: "套餐售价", min_width: "100"},
        // {key: "giving", title: "优惠金额", min_width: "100"},
        {key: "cash", title: "现金", min_width: "100"},
        {key: "unionpay", title: "刷卡", min_width: "100"},
        {key: "pay_card_no", title: "扣款卡号", min_width: "100"},
        {key: "pay_card", title: "卡扣", min_width: "100"},
        {key: "credit", title: "挂账", min_width: "100"},
        {key: "wechat_pay", title: "微信支付", min_width: "100"},
        {key: "alipay", title: "支付宝支付", min_width: "100"},
        {key: "create_time", title: "办卡时间", min_width: "100"},
        {key: "commission_staff_name", title: "提成人员", min_width: "100"},
        {key: "remark", title: "备注", min_width: "100"},
        {key: "operation_staff_name", title: "操作人", min_width: "100"}
      ],
      tableData2: [],
      tableData3: [],
      operation: false
    }
	},
  methods:{
    resData: function(data){
       switch(this.key) {
        case 1:
          this.tableData1 = data
           break
        case 2:
          this.tableData2 = data
           break
        case 3:
          this.tableData1 = data
        break
        case 4:
          this.tableData2 = data
        break
      }
      this.tableData = data;
      // for(let i in this.tableData){
      //   this.tableData[i].license_plate_number = this.tableData[i].plate_id + this.tableData[i].license_plate_number;
      // }
    },
    handlePageChange: function(data){
      let url = ''

      switch(this.key) {
        case 1:
           url = `/StoreAdmin/Customer/getCardRechargeList`
           data = {search: this.key_work, sid: this.store_id, card_id: this.type_id, start_time: this.begin_date, end_time: this.over_date}
           break
        case 2:
           url = `/StoreAdmin/Customer/getTotalTimeCardTransactionList`
           data ={search: this.key_work, sid: this.store_id, card_id: this.type_id, start_time: this.begin_date, end_time: this.over_date}
           break
        case 3:
           url = `/StoreAdmin/Customer/getCardRenewalList`
           data = {search: this.key_work, sid: this.store_id, card_id: this.type_id, start_time: this.begin_date, end_time: this.over_date}
        break
        case 4:
           url = `/StoreAdmin/Customer/getTotalTimeCardRenewalList`
           data = {search: this.key_work, sid: this.store_id, card_id: this.type_id, start_time: this.begin_date, end_time: this.over_date}
        break
      }
     
      this.$refs.mytable.findList(
        this.$api.yuming + url,
        data
      );
    },
    handlePageChange1: function(data){
      data = {search: this.key_work, sid: this.store_id, card_id: this.type_id, start_time: this.begin_date, end_time: this.over_date}
      this.$refs.mytable1.findList(
        this.$api.yuming + "/StoreAdmin/Customer/getTotalTimeCardItemRenewalList",
        data
      );
    },
    resData1: function(data){
      this.tableData3 = data;
    },
    search: function(){
      this.key === 4 ? this.handlePageChange1() : this.handlePageChange()
    },
    init: function(){
      // let begin_date = parseInt(this.begin_date.getTime()/1000);
      // let over_date = parseInt(this.over_date.getTime()/1000);
      switch(this.key){
        case 1:{
          this.handlePageChange()
          this.$axios.all([
            this.$api.HttpPost("/StoreAdmin/Customer/getMemberCardSelect", {}),
            this.$api.HttpPost("/StoreAdmin/Common/getStoreSelect", {})
          ])
          .then((data)=>{
            if(data[0].data.code === 200){
              this.type_value_select = data[0].data.data;
              this.store_value_select = data[1].data;
              // this.tableData1 = data[2].data.data.data;
            }
            else{
              this.$message.error(data[1].data.msg);
            }
          })
          break;
        }
        case 2:{
          this.handlePageChange()
          this.$axios.all([
            this.$api.HttpPost("/StoreAdmin/Customer/getMemberCardSelect", {}),
            this.$api.HttpPost("/StoreAdmin/Common/getStoreSelect", {})
          ])
          .then((data)=>{
            if(data[0].data.code === 200){
              this.type_value_select = data[0].data.data;
              this.store_value_select = data[1].data;
              // this.tableData2 = data[2].data.data.data;
            }
            else{
              this.$message.error(data[0].data.msg);
            }
          })
          break;
        }
        case 3:{
          this.handlePageChange()
          this.$axios.all([
            this.$api.HttpPost("/StoreAdmin/Customer/getMemberCardSelect", {}),
            this.$api.HttpPost("/StoreAdmin/Common/getStoreSelect", {}),
          ])
          .then((data)=>{
            if(data[0].data.code === 200){
              this.type_value_select = data[0].data.data;
              this.store_value_select = data[1].data;
            }
            else{
              this.$message.error(data[0].data.msg);
            }
          })
          break;
        }
        case 4:{
         
          this.$axios.all([
            this.$api.HttpPost("/StoreAdmin/Customer/getMemberCardSelect", {}),
            this.$api.HttpPost("/StoreAdmin/Common/getStoreSelect", {})
          ])
          .then((data)=>{
            if(data[0].data.code === 200){
              this.type_value_select = data[0].data.data;
              this.store_value_select = data[1].data;
               this.handlePageChange1()
              this.handlePageChange()
              // this.tableData2 = data[2].data.data.data;
              // this.tableData3 = data[3].data.data.data;
              
            }
            else{
              this.$message.error(data[0].data.msg);
            }
          })
          break;
        }
      }
    },
    print: function(){
      var printHtml = document.getElementById("mytable").innerHTML;
      printHtml = "<link rel='stylesheet' href='https://unpkg.com/vxe-table/lib/index.css'>" + printHtml;
      var wind = window.open("",'newwindow', 'height=600, width=1200, top=100, left=100, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=n o, status=no');
      wind.document.body.innerHTML = printHtml;
      wind.print();
    },
    change_type: function(s){
      this.type_id = s;
    },
    change_store: function(s){
      this.store_id = s;
    }
  },
  mounted(){
    Object.assign(this.$data, this.$options.data());
    this.key = this.$route.query.key;
    console.log(this.key)
    if(this.key === 4)this.r = 12;
    this.init();
  }
}
</script>

<style scoped>
#one{
  margin: 1rem 5rem;
}
h3{
  margin: 10px 0;
  font-weight: bold;
  color: #33cccc;
}
</style>
