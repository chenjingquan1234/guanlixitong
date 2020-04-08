<template>
  <div id="two">
    <div class="pb-nav">
      <el-button size="mini" type="info" icon="el-icon-download" @click="download()">导出</el-button>
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
      store_name: "",
      tableTitle: [
        {key: "name", title: "员工姓名", min_width: "100"},
        {key: "basic_salary", title: "基本工资", min_width: "100"},
        {key: "deduct", title: "扣款", min_width: "100"},
        {key: "subsidy", title: "补贴/奖励", min_width: "100"},
        {key: "sales_commission", title: "销售提成", min_width: "100"},
        {key: "construction_commission", title: "施工提成", min_width: "100"},
        {key: "card_commission", title: "售卡提成", min_width: "100"},
        {key: "wage", title: "工资合计", min_width: "100"}
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
      this.handlePageChange();
    },
    resData(data){
      this.tableData = data;
    },
    handlePageChange(data){
      if(data === undefined){data = {sid: this.store_name}}
      this.$refs.mytable.findList(this.$api.yuming + "/storeadmin/staff/getStaffWageList", data);
    }
  }
}
</script>

<style scoped>
#two{
  margin: 1rem 5rem;
}
</style>
