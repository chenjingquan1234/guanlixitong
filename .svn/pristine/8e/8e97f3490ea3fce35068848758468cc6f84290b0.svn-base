<template>
  <div id="five">
    <div class="pb-nav">
      <el-button size="small" type="info" icon="el-icon-download" @click="download()">打印</el-button>
      <el-input size="small" style="width: 20rem;" v-model="key_name"><label slot="prepend">单据编号</label></el-input>
      <el-date-picker size="small"
        v-model="begin_date"
        align="right"
        type="date"
        placeholder="开始日期|时间"
        :picker-options="pickerOptions">
      </el-date-picker>
      <el-date-picker size="small"
        v-model="over_date"
        align="right"
        type="date"
        placeholder="结束日期|时间"
        :picker-options="pickerOptions">
      </el-date-picker>
      <el-select size="small" v-model="store_name" clearable placeholder="所属门店" @change="store_change">
        <el-option v-for="value in store_select" :key="value.sid" :label="value.store_name" :value="value.sid"></el-option>
      </el-select>
      <el-select size="small" v-model="supplier_name" clearable placeholder="供应商" @change="supplier_change">
        <el-option v-for="value in supplier_select" :key="value.id" :label="value.supplier_name" :value="value.id"></el-option>
      </el-select>
      <el-button size="small" type="primary" @click="search()">查询</el-button>
    </div>

    <mytable :tableTitle="tableTitle" :tableData="tableData" :operation="operation" @resData="resData" @handlePageChange="handlePageChange" ref="mytable"></mytable>
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
      begin_date: new Date(2019, 0, 1, 0, 0),
      over_date: new Date(),
      pickerOptions: {
        disabledDate(time){return time.getTime() > Date.now();},
        shortcuts: [{text: '今天',onClick(picker) {picker.$emit('pick', new Date());}},
        {text: '昨天',onClick(picker){const date = new Date();date.setTime(date.getTime() - 3600 * 1000 * 24);picker.$emit('pick', date);}},
        {text: '一周前',onClick(picker){const date = new Date();date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);picker.$emit('pick', date);}}]
      },
      tableTitle: [
        {key: "order_number", title: "单号", min_width: "100"},
        {key: "total_number", title: "数量", min_width: "100"},
        {key: "total_price", title: "金额", min_width: "100"},
        {key: "ename", title: "采购员", min_width: "100"},
        {key: "supplier_name", title: "供应商", min_width: "100"},
        {key: "create_time", title: "采购时间", min_width: "100"},
        {key: "update_time", title: "作废时间", min_width: "100"},
        {key: "invalid_person", title: "作废人", min_width: "100"},
        {key: "store_name", title: "门店", min_width: "100"},
        {key: "remark", title: "作废备注", min_width: "100"}
      ],
      tableData: [],
      operation: false,
      //数据
      key_name: "",
      store_name: "",
      store_id: "",
      supplier_name: "",
      supplier_id: ""
    }
  },
  props:{
    "store_select": {
      type: Array,
      default: ()=>{}
    },
    "supplier_select": {
      type: Array,
      default: ()=>{}
    }
  },
  methods:{
    search: function(){
      this.handlePageChange({search: this.key_name, sid: this.store_id, repertory_id: this.supplier_id});
    },
    download: function(){
      this.$refs.mytable.$refs.xTable.exportData({type: "csv"});
    },
    store_change: function(s){
      this.store_id = s;
    },
    supplier_change: function(s){
      this.supplier_id = s;
    },
    resData: function(data){
      this.tableData = data;
      for(let i in this.tableData){
        this.tableData[i].total = this.tableData[i].quantity * this.tableData[i].price;
      }
    },
    handlePageChange: function(data){
      if(data === undefined){data = {}}
      this.$refs.mytable.findList(this.$store.state.domainName_http+"/StoreAdmin/Statistics/getCancelledPurchaseOrderList", data);
    }
  },
  mounted(){
    this.handlePageChange();
  }
}
</script>

<style scoped>
#five{
  margin: 1rem 5rem;
}
</style>
