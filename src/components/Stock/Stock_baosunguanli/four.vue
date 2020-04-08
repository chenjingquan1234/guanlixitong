<template>
  <div id="four">
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
      <el-button size="small" type="primary" @click="search()">查询</el-button>
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
      begin_date: new Date(),
      over_date: new Date(2019, 0, 1, 0, 0),
      pickerOptions: {
        disabledDate(time){return time.getTime() > Date.now();},
        shortcuts: [{text: '今天',onClick(picker) {picker.$emit('pick', new Date());}},
        {text: '昨天',onClick(picker){const date = new Date();date.setTime(date.getTime() - 3600 * 1000 * 24);picker.$emit('pick', date);}},
        {text: '一周前',onClick(picker){const date = new Date();date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);picker.$emit('pick', date);}}]
      },
      tableTitle: [  
        {key: "order_number", title: "单号", min_width: "100"},
        {key: "product_name", title: "商品名称", min_width: "100"},
        {key: "product_type", title: "规格", min_width: "100"},
        {key: "product_code", title: "商品编码", min_width: "100"},
        {key: "quantity", title: "数量", min_width: "100"},
        {key: "wholesale_price", title: "成本", min_width: "100"},
        {key: "total", title: "合计", min_width: "100"},
        {key: "name", title: "负责人", min_width: "100"},
        {key: "repertory_name", title: "仓库", min_width: "100"},
        {key: "create_time", title: "时间", min_width: "100"},
        {key: "remark", title: "备注", min_width: "100"}
      ],
      tableData: [],
      operation: false,
      //数据
      key_name: "",
      store_name: "",
      store_id: ""
    }
  },
  props:{
    "store_select": {
      type: Array,
      default: ()=>{}
    }
  },
  methods:{
    search: function(){
      this.handlePageChange({search: this.key_name, sid: this.store_id});
    },
    download: function(){
      this.$refs.mytable.$refs.xTable.exportData({type: "csv"});
    },
    store_change: function(s){
      this.store_id = s;
    },
    resData: function(data){
      this.tableData = data;
      for(let i in this.tableData){
        this.tableData[i].total = this.tableData[i].quantity * this.tableData[i].wholesale_price;
      }
    },
    handlePageChange: function(data){
      if(data === undefined){data = {}}
      this.$refs.mytable.findList(this.$store.state.domainName_http+"/StoreAdmin/Statistics/getBreakageOrderDetailList", data);
    }
  }
}
</script>

<style scoped>
#four{
  margin: 1rem 5rem;
}
</style>
