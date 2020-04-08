<template>
  <div id="three">
    <div class="pb-nav">
      <el-button size="mini" type="info" icon="el-icon-download" @click="download()">导出</el-button>
      <el-input size="mini" style="width: 20rem;" v-model="key_name"><label slot="prepend">单据编号</label></el-input>
      <el-date-picker v-model="s_time" size="mini" type="datetimerange" clearable :picker-options="pickerOptions"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        align="right">
      </el-date-picker>
      <el-select size="mini" v-model="people_name" placeholder="提成人员" clearable @change="people_change">
        <el-option v-for="value in people_select" :key="value.eid" :label="value.name" :value="value.eid"></el-option>
      </el-select>
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
	name: "three",
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
      tableTitle: [],
      tableData: [],
      operation: false,
      s_time: ["", ""],
      key_name: "",
      people_name: "",
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
    },
    "num": {
      type: String,
      default: ""
    }
  },
  methods:{
    people_change(s){
      this.people_name = s;
    },
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
      this.handlePageChange({order_sn: this.key_name, sid: this.store_name, start_time: this.s_time[0], end_time: this.s_time[1]});
    },
    resData(data){
      this.tableData = data;
    },
    handlePageChange(data){
      let url = "";
      switch(this.num){
        case 3:{
          url = "/storeadmin/staff/productSalesPerformanceList";
          this.tableTitle = [
            {key: "order_sn", title: "单号", min_width: "100"},
            {key: "item_name", title: "商品", min_width: "100"},
            {key: "specification", title: "规格", min_width: "100"},
            {key: "amount", title: "业绩金额", min_width: "100"},
            {key: "count", title: "分摊人数", min_width: "100"},
            {key: "person_amount", title: "分摊后业绩", min_width: "100"},
            {key: "name", title: "提成人员", min_width: "100"}
          ]
          break;
        }
        case 4:{
          url = "/storeadmin/staff/productConstructionPerformanceList";
          this.tableTitle = [
            {key: "order_sn", title: "单号", min_width: "100"},
            {key: "item_name", title: "商品", min_width: "100"},
            {key: "specification", title: "规格", min_width: "100"},
            {key: "amount", title: "业绩金额", min_width: "100"},
            {key: "count", title: "分摊人数", min_width: "100"},
            {key: "person_amount", title: "分摊后业绩", min_width: "100"},
            {key: "name", title: "提成人员", min_width: "100"}
          ]
          break;
        }
        case 5:{
          url = "/storeadmin/staff/serviceSalesPerformanceList";
          this.tableTitle = [
            {key: "order_sn", title: "单号", min_width: "100"},
            {key: "item_name", title: "服务项目", min_width: "100"},
            {key: "specification", title: "规格", min_width: "100"},
            {key: "amount", title: "业绩金额", min_width: "100"},
            {key: "count", title: "分摊人数", min_width: "100"},
            {key: "person_amount", title: "分摊后业绩", min_width: "100"},
            {key: "name", title: "提成人员", min_width: "100"}
          ]
          break;
        }
        case 6:{
          url = "/storeadmin/staff/serviceConstructionPerformanceList";
          this.tableTitle = [
            {key: "order_sn", title: "单号", min_width: "100"},
            {key: "item_name", title: "服务项目", min_width: "100"},
            {key: "specification", title: "规格", min_width: "100"},
            {key: "amount", title: "业绩金额", min_width: "100"},
            {key: "count", title: "分摊人数", min_width: "100"},
            {key: "person_amount", title: "分摊后业绩", min_width: "100"},
            {key: "name", title: "提成人员", min_width: "100"}
          ]
          break;
        }
        case 7:{
          url = "/storeadmin/staff/memberCardSalesPerformanceList";
          this.tableTitle = [
            {key: "order_sn", title: "单号", min_width: "100"},
            {key: "card_no", title: "卡号", min_width: "100"},
            {key: "card_name", title: "卡类型", min_width: "100"},
            {key: "amount", title: "业绩金额", min_width: "100"},
            {key: "count", title: "分摊人数", min_width: "100"},
            {key: "person_amount", title: "分摊后业绩", min_width: "100"},
            {key: "name", title: "提成人员", min_width: "100"}
          ]
          break;
        }
        case 8:{
          url = "/storeadmin/staff/packageSalesPerformanceList";
          this.tableTitle = [
            {key: "order_sn", title: "单号", min_width: "100"},
            {key: "card_no", title: "卡号", min_width: "100"},
            {key: "package_name", title: "卡类型", min_width: "100"},
            {key: "amount", title: "业绩金额", min_width: "100"},
            {key: "count", title: "分摊人数", min_width: "100"},
            {key: "person_amount", title: "分摊后业绩", min_width: "100"},
            {key: "name", title: "提成人员", min_width: "100"}
          ]
          break;
        }
      }
      if(data === undefined){data = {}}
      this.$refs.mytable.findList(this.$api.yuming + url, data);
    }
  }
}
</script>

<style scoped>
#three{
  margin: 1rem 5rem;
}
</style>
