<template>
  <div id="two">
    <div class="pb-nav">
      <el-button size="mini" type="info" icon="el-icon-download" @click="download()">导出</el-button>
      <el-date-picker v-model="s_time" size="mini" type="datetimerange" clearable :picker-options="pickerOptions"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        align="right">
      </el-date-picker>
      <el-select size="mini" v-model="store_name" placeholder="所属门店" clearable @change="store_change">
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
	name: "two",
	components:{
		mytable
	},
	data(){
		return{
			pickerOptions: {
			  shortcuts: [{text: '最近一周',onClick(picker){const end = new Date();const start = new Date();start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);picker.$emit('pick', [start, end]);}},
			  {text: '最近一个月',onClick(picker) {const end = new Date();const start = new Date();start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);picker.$emit('pick', [start, end]);}},
			  {text: '最近三个月',onClick(picker) {const end = new Date();const start = new Date();start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);picker.$emit('pick', [start, end]);}}]
			},
      s_time: ["", ""],
      store_name: "",
      tableTitle: [
        {key: "name", title: "员工姓名", min_width: "100"},
        {key: "sales_performance", title: "销售业绩", min_width: "100"},
        {key: "construction_performance", title: "施工业绩", min_width: "100"},
        {key: "card_performance", title: "会员卡业绩", min_width: "100"},
        {key: "all_performance", title: "业绩合计", min_width: "100"}
      ],
      tableData: [],
      operation: false
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
    download(){
      this.$refs.mytable.$refs.xTable.exportData({type: "csv"});
    },
    search(){
      if(this.s_time === null){
        this.s_time = [];
        this.s_time[0] = "";
        this.s_time[1] = "";
      }
      this.handlePageChange();
    },
    resData(data){
      this.tableData = data;
    },
    handlePageChange(data){
      if(data === undefined){data = {start_time: this.s_time[0], end_time: this.s_time[1], sid: this.store_name}}
      this.$refs.mytable.findList(this.$api.yuming + "/storeadmin/staff/getStaffPerformanceList", data);
    }
  }
}
</script>

<style scoped>
#two{
  margin: 1rem 5rem;
}
</style>
